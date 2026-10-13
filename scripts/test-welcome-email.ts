import { NextRequest } from "next/server";
import { POST as registerHandler } from "../app/api/auth/register/route";
import { POST as setPasswordHandler } from "../app/api/auth/set-password/route";
import { POST as loginHandler } from "../app/api/auth/login/route";
import { prisma } from "../lib/prisma";
import crypto from "crypto";

async function runTestSuite() {
  console.log("=================================================");
  console.log("TESTING THE PUBLISHING HUB REGISTRATION & EMAIL FLOW");
  console.log("=================================================");

  const timestamp = Date.now();
  const testEmail = `user_${timestamp}@publishinghubtest.com`;

  // -------------------------------------------------------------------
  // TEST 1: Register User with Email-Only
  // -------------------------------------------------------------------
  console.log("\n[Test 1] Registering user with email only:", testEmail);
  const regReq = new NextRequest("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail }),
  });

  const regRes = await registerHandler(regReq);
  const regJson = await regRes.json();
  console.log("Status:", regRes.status, "| Success:", regJson.success);
  console.log("Message:", regJson.message || regJson.error);
  console.log("Email Sent State:", regJson.data?.emailSent);

  if (regRes.status === 201) {
    if (!regJson.data?.emailSent) {
      throw new Error("Invalid state: Status is 201 but emailSent is false!");
    }
    console.log("✓ Test 1 Passed: Account created and welcome email accepted by Resend (Message ID:", regJson.data?.messageId, ")");
  } else if (regRes.status === 502) {
    if (regJson.data?.emailSent === true) {
      throw new Error("Invalid state: Status is 502 but emailSent is true!");
    }
    console.log("✓ Test 1 Passed: Account created in DB with token. (Provider diagnostic:", regJson.error, ")");
  } else {
    throw new Error("Registration failed with unexpected status: " + regRes.status + " " + JSON.stringify(regJson));
  }

  // -------------------------------------------------------------------
  // TEST 1b: Safe Retry for Pending Setup Account
  // -------------------------------------------------------------------
  console.log("\n[Test 1b] Testing safe retry for pending setup account...");
  const retryReq = new NextRequest("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail }),
  });
  const retryRes = await registerHandler(retryReq);
  const retryJson = await retryRes.json();
  console.log("Retry Status:", retryRes.status, "| IsRetry:", retryJson.data?.isRetry);
  if (retryRes.status !== 201 && retryRes.status !== 502) {
    throw new Error("Retry failed with unexpected status: " + retryRes.status);
  }
  if (!retryJson.data?.isRetry) {
    throw new Error("Expected isRetry to be true on retry submission.");
  }
  console.log("✓ Test 1b Passed: Safe retry refreshed setup token on existing account without creating duplicate.");

  // -------------------------------------------------------------------
  // TEST 2: Inspect Database Record (Secure token hash and expiry)
  // -------------------------------------------------------------------
  console.log("\n[Test 2] Verifying database security state...");
  const dbUser = await prisma.user.findUnique({
    where: { email: testEmail },
  });

  if (!dbUser) throw new Error("User record not found in database.");
  if (!dbUser.passwordResetTokenHash) throw new Error("passwordResetTokenHash was not created.");
  if (!dbUser.passwordResetExpires) throw new Error("passwordResetExpires was not created.");

  const now = new Date();
  const expiresAt = new Date(dbUser.passwordResetExpires);
  const hoursUntilExpiry = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60);

  console.log("User ID:", dbUser.id);
  console.log("Stored Token Hash (SHA-256):", dbUser.passwordResetTokenHash);
  console.log("Token Expiry:", expiresAt.toISOString(), `(~${hoursUntilExpiry.toFixed(1)} hours)`);
  if (hoursUntilExpiry < 23 || hoursUntilExpiry > 25) {
    throw new Error("Token expiry duration is unexpected: " + hoursUntilExpiry);
  }
  console.log("✓ Test 2 Passed: Token is securely hashed with 24-hour expiration.");

  // -------------------------------------------------------------------
  // TEST 3: Attempt Login Before Password Setup (Must Fail)
  // -------------------------------------------------------------------
  console.log("\n[Test 3] Testing that temporary password cannot be guessed...");
  const guessLoginReq = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: "password123" }),
  });
  const guessRes = await loginHandler(guessLoginReq);
  console.log("Login attempt status with random password:", guessRes.status);
  if (guessRes.status === 200) {
    throw new Error("Security vulnerability: User was able to log in before password was set!");
  }
  console.log("✓ Test 3 Passed: User cannot log in before setting their chosen password.");

  // -------------------------------------------------------------------
  // TEST 4: Set Password with Invalid Token (Must Fail)
  // -------------------------------------------------------------------
  console.log("\n[Test 4] Testing invalid token rejection...");
  const fakeTokenReq = new NextRequest("http://localhost:3000/api/auth/set-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: "fake_nonexistent_token_12345",
      email: testEmail,
      password: "myNewSecurePassword2026!",
    }),
  });
  const fakeTokenRes = await setPasswordHandler(fakeTokenReq);
  const fakeJson = await fakeTokenRes.json();
  console.log("Status with fake token:", fakeTokenRes.status, "| Error:", fakeJson.error);
  if (fakeTokenRes.status !== 400) {
    throw new Error("Endpoint should reject invalid token with 400.");
  }
  console.log("✓ Test 4 Passed: Fake/invalid token correctly rejected.");

  // -------------------------------------------------------------------
  // TEST 5: Set Password with Valid Token
  // -------------------------------------------------------------------
  console.log("\n[Test 5] Simulating user clicking email link and setting password...");
  // For test verification, generate a known token & store its hash to test the set-password handler
  const testRawToken = crypto.randomBytes(32).toString("hex");
  const testHash = crypto.createHash("sha256").update(testRawToken).digest("hex");
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      passwordResetTokenHash: testHash,
      passwordResetExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  const validSetPasswordReq = new NextRequest("http://localhost:3000/api/auth/set-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: testRawToken,
      email: testEmail,
      password: "myNewSecurePassword2026!",
    }),
  });
  const setRes = await setPasswordHandler(validSetPasswordReq);
  const setJson = await setRes.json();
  console.log("Status:", setRes.status, "| Success:", setJson.success);
  if (setRes.status !== 200 || !setJson.success) {
    throw new Error("Failed to set password with valid token: " + JSON.stringify(setJson));
  }
  console.log("✓ Test 5 Passed: Password set successfully.");

  // -------------------------------------------------------------------
  // TEST 6: Single-Use Validation (Token must be invalidated)
  // -------------------------------------------------------------------
  console.log("\n[Test 6] Testing single-use token invalidation...");
  const reuseReq = new NextRequest("http://localhost:3000/api/auth/set-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: testRawToken,
      email: testEmail,
      password: "anotherPassword2026!",
    }),
  });
  const reuseRes = await setPasswordHandler(reuseReq);
  const reuseJson = await reuseRes.json();
  console.log("Reuse status:", reuseRes.status, "| Message:", reuseJson.error);
  if (reuseRes.status !== 400) {
    throw new Error("Token was reused! Single-use validation failed.");
  }

  const updatedUserDb = await prisma.user.findUnique({ where: { id: dbUser.id } });
  if (updatedUserDb?.passwordResetTokenHash !== null) {
    throw new Error("passwordResetTokenHash was not cleared from database after use.");
  }
  console.log("✓ Test 6 Passed: Token invalidated immediately after first use.");

  // -------------------------------------------------------------------
  // TEST 7: Log in with Newly Set Password
  // -------------------------------------------------------------------
  console.log("\n[Test 7] Logging in with newly set password...");
  const loginReq = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "myNewSecurePassword2026!",
    }),
  });
  const loginRes = await loginHandler(loginReq);
  const loginJson = await loginRes.json();
  console.log("Status:", loginRes.status, "| Success:", loginJson.success);
  if (loginRes.status !== 200 || !loginJson.success || !loginJson.data?.token) {
    throw new Error("Failed to log in with newly configured password.");
  }
  console.log("✓ Test 7 Passed: Successfully logged in with new password. JWT issued.");

  // -------------------------------------------------------------------
  // TEST 8: Duplicate Registration Prevention
  // -------------------------------------------------------------------
  console.log("\n[Test 8] Testing duplicate email registration prevention...");
  const dupReq = new NextRequest("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail }),
  });
  const dupRes = await registerHandler(dupReq);
  console.log("Duplicate registration status:", dupRes.status);
  if (dupRes.status !== 409) {
    throw new Error("Duplicate email should be rejected with 409.");
  }
  console.log("✓ Test 8 Passed: Duplicate registration blocked with HTTP 409.");

  // Cleanup test user
  await prisma.user.delete({ where: { email: testEmail } });
  console.log("\n✓ Cleaned up test user record from database.");

  console.log("\n=================================================");
  console.log("ALL 8 VERIFICATION TESTS PASSED SUCCESSFULLY!");
  console.log("=================================================\n");
}

runTestSuite()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test Suite Failed:", err);
    process.exit(1);
  });
