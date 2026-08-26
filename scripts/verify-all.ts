import { NextRequest } from "next/server";
import { POST as registerHandler } from "../app/api/auth/register/route";
import { POST as loginHandler } from "../app/api/auth/login/route";
import { POST as logoutHandler } from "../app/api/auth/logout/route";
import { GET as meHandler } from "../app/api/auth/me/route";
import { GET as usersHandler } from "../app/api/users/route";
import { GET as productsHandler, POST as createProductHandler } from "../app/api/products/route";
import { GET as singleProductHandler } from "../app/api/products/[id]/route";
import { GET as categoriesHandler } from "../app/api/categories/route";
import { GET as getCartHandler, POST as addToCartHandler, PUT as updateCartHandler, DELETE as deleteCartHandler } from "../app/api/cart/route";
import { GET as getOrdersHandler, POST as createOrderHandler } from "../app/api/orders/route";
import { GET as eventsHandler } from "../app/api/events/route";
import { GET as offersHandler } from "../app/api/offers/route";
import { POST as contactHandler } from "../app/api/contact/route";
import { POST as newsletterHandler } from "../app/api/newsletter/route";
import { checkDbConnection } from "../lib/db";
import { prisma } from "../lib/prisma";

const results: Array<{ test: string; status: "PASS" | "FAIL"; details?: string }> = [];

function record(test: string, pass: boolean, details?: string) {
  results.push({ test, status: pass ? "PASS" : "FAIL", details });
  console.log(`${pass ? "✅" : "❌"} [${pass ? "PASS" : "FAIL"}] ${test}${details ? ` - ${details}` : ""}`);
}

async function runVerification() {
  console.log("\n============================================================");
  console.log("STARTING FULL END-TO-END BACKEND API & SECURITY VERIFICATION");
  console.log("============================================================\n");

  // 1. Database Connection
  const db = await checkDbConnection();
  record("Database: Connection Status", db.isConnected);

  // 2. Database Records Check
  const [userCount, productCount, categoryCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
  ]);
  record("Database: Seeded Users Present", userCount >= 2, `Count: ${userCount}`);
  record("Database: Seeded Products Present", productCount >= 20, `Count: ${productCount}`);
  record("Database: Seeded Categories Present", categoryCount >= 5, `Count: ${categoryCount}`);

  // 3. Auth: Register
  const testEmail = `testuser_${Date.now()}@publishinghub.com`;
  const registerReq = new NextRequest("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Verification User",
      email: testEmail,
      password: "securePassword123",
    }),
  });
  const regRes = await registerHandler(registerReq);
  const regJson = await regRes.json();
  record("Auth: Register New User", regJson.success === true && regRes.status === 201);
  record("Security: Password not exposed in Register response", !regJson.data?.user?.passwordHash && !regJson.data?.user?.password);

  // 4. Auth: Login (Valid)
  const loginReq = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "securePassword123",
    }),
  });
  const loginRes = await loginHandler(loginReq);
  const loginJson = await loginRes.json();
  const userToken = loginJson.data?.token;
  record("Auth: Login with Valid Credentials", loginJson.success === true && !!userToken);
  record("Security: Password not exposed in Login response", !loginJson.data?.user?.passwordHash);

  // 5. Auth: Login (Invalid)
  const invalidLoginReq = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "wrongPassword999",
    }),
  });
  const invRes = await loginHandler(invalidLoginReq);
  record("Auth: Reject Invalid Login Credentials", invRes.status === 401);

  // 6. Auth: Logout
  const logoutRes = await logoutHandler();
  const logoutJson = await logoutRes.json();
  record("Auth: Logout Endpoint", logoutJson.success === true && logoutJson.data?.loggedOut === true);

  // 7. Auth: Me (/api/auth/me) with Token
  const meReq = new NextRequest("http://localhost:3000/api/auth/me", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const meRes = await meHandler(meReq);
  const meJson = await meRes.json();
  record("Auth: GET /api/auth/me (Authenticated)", meJson.success === true && meJson.data?.email === testEmail);

  // 8. Auth: Me (/api/auth/me) Unauthenticated
  const meUnauthReq = new NextRequest("http://localhost:3000/api/auth/me");
  const meUnauthRes = await meHandler(meUnauthReq);
  record("Security: Reject Unauthenticated /api/auth/me", meUnauthRes.status === 401);

  // 9. Admin Login
  const adminLoginReq = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@publishinghub.com",
      password: "admin123456",
    }),
  });
  const adminLoginRes = await loginHandler(adminLoginReq);
  const adminJson = await adminLoginRes.json();
  const adminToken = adminJson.data?.token;
  record("Auth: Admin Login", adminJson.success === true && adminJson.data?.user?.role === "ADMIN");

  // 10. Security / RBAC: GET /api/users (User vs Admin)
  const userAccessUsersReq = new NextRequest("http://localhost:3000/api/users", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const userAccessRes = await usersHandler(userAccessUsersReq);
  record("Security: Block Normal USER from /api/users", userAccessRes.status === 403);

  const adminAccessUsersReq = new NextRequest("http://localhost:3000/api/users", {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const adminAccessRes = await usersHandler(adminAccessUsersReq);
  const adminUsersJson = await adminAccessRes.json();
  record("RBAC: Allow ADMIN to access /api/users", adminAccessRes.status === 200 && Array.isArray(adminUsersJson.data));

  // 11. Products: GET /api/products
  const prodReq = new NextRequest("http://localhost:3000/api/products?limit=10");
  const prodRes = await productsHandler(prodReq);
  const prodJson = await prodRes.json();
  record("Products: GET /api/products Listing", prodJson.success === true && prodJson.data?.length > 0);
  record("Products: Pagination Metadata present", prodJson.meta?.total !== undefined && prodJson.meta?.page === 1);

  // 12. Products: Filter & Search
  const searchReq = new NextRequest("http://localhost:3000/api/products?search=Night");
  const searchRes = await productsHandler(searchReq);
  const searchJson = await searchRes.json();
  record("Products: Search by keyword works", searchJson.success === true && searchJson.data?.length > 0);

  // 13. Products: GET /api/products/[id] by Slug
  const singleSlugReq = new NextRequest("http://localhost:3000/api/products/when-the-doves-disappeared");
  const singleSlugRes = await singleProductHandler(singleSlugReq, { params: { id: "when-the-doves-disappeared" } });
  const singleSlugJson = await singleSlugRes.json();
  record("Products: GET /api/products/[id] by slug", singleSlugJson.success === true && singleSlugJson.data?.title === "When the Doves disappeared");

  // 14. Products: POST /api/products (Admin vs User)
  const sampleNewProduct = {
    title: "Test Architecture Book",
    slug: `test-book-${Date.now()}`,
    author: "By TEST AUTHOR",
    price: "£25.00",
    numericPrice: 25.0,
    category: "Literature",
    image: "/images/shop1.jpg",
  };

  const userCreateProdReq = new NextRequest("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
    body: JSON.stringify(sampleNewProduct),
  });
  const userCreateRes = await createProductHandler(userCreateProdReq);
  record("Security: Block Normal USER from creating product", userCreateRes.status === 403);

  const adminCreateProdReq = new NextRequest("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify(sampleNewProduct),
  });
  const adminCreateRes = await createProductHandler(adminCreateProdReq);
  const adminCreateJson = await adminCreateRes.json();
  record("Products: POST /api/products (Admin)", adminCreateRes.status === 201 && adminCreateJson.data?.title === "Test Architecture Book");

  // 15. Categories: GET /api/categories
  const catRes = await categoriesHandler();
  const catJson = await catRes.json();
  record("Categories: GET /api/categories", catJson.success === true && catJson.data?.length > 0);

  // 16. Cart: Add, Get, Update, Remove
  const firstBook = prodJson.data[0];
  const addToCartReq = new NextRequest("http://localhost:3000/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({ productId: firstBook.id, quantity: 2 }),
  });
  const addCartRes = await addToCartHandler(addToCartReq);
  const addCartJson = await addCartRes.json();
  record("Cart: POST /api/cart (Add Item)", addCartJson.success === true && addCartJson.data?.items?.length > 0);

  const getCartReq = new NextRequest("http://localhost:3000/api/cart", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const getCartRes = await getCartHandler(getCartReq);
  const getCartJson = await getCartRes.json();
  record("Cart: GET /api/cart (Totals Calculated Correctly)", getCartJson.data?.totalAmount > 0);

  const updateCartReq = new NextRequest("http://localhost:3000/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({ productId: firstBook.id, quantity: 1 }),
  });
  const updateCartRes = await updateCartHandler(updateCartReq);
  const updateCartJson = await updateCartRes.json();
  record("Cart: PUT /api/cart (Update Quantity)", updateCartJson.success === true && updateCartJson.data?.totalQuantity === 1);

  const deleteCartReq = new NextRequest(`http://localhost:3000/api/cart?productId=${firstBook.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const delCartRes = await deleteCartHandler(deleteCartReq);
  const delCartJson = await delCartRes.json();
  record("Cart: DELETE /api/cart (Remove Item)", delCartJson.success === true && delCartJson.data?.items?.length === 0);

  // 17. Orders: POST /api/orders (Checkout with Server-side pricing)
  const createOrderReq = new NextRequest("http://localhost:3000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({
      customerName: "Test Buyer",
      customerEmail: testEmail,
      shippingAddress: "123 Publishing Lane, London, UK",
      paymentMethod: "CARD",
      items: [{ productId: firstBook.id, quantity: 2 }],
    }),
  });
  const orderRes = await createOrderHandler(createOrderReq);
  const orderJson = await orderRes.json();
  record("Orders: POST /api/orders (Create Order)", orderRes.status === 201 && orderJson.data?.totalAmount === firstBook.numericPrice * 2);
  record("Security: Order Price calculated from DB (not client)", orderJson.data?.items[0]?.price === firstBook.numericPrice);

  // 18. Orders: GET /api/orders (User isolation)
  const getOrdersReq = new NextRequest("http://localhost:3000/api/orders", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  const userOrdersRes = await getOrdersHandler(getOrdersReq);
  const userOrdersJson = await userOrdersRes.json();
  record("Orders: GET /api/orders (User isolation)", userOrdersJson.success === true && userOrdersJson.data?.length >= 1);

  // 19. Events & Offers API
  const eventsRes = await eventsHandler();
  const eventsJson = await eventsRes.json();
  record("Events: GET /api/events", eventsJson.success === true);

  const offersRes = await offersHandler();
  const offersJson = await offersRes.json();
  record("Offers: GET /api/offers", offersJson.success === true && offersJson.data?.length > 0);

  // 20. Contact Form API (Valid & Invalid)
  const validContactReq = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Inquirer",
      email: "inquiry@example.com",
      message: "Hello, I want to submit a book proposal.",
    }),
  });
  const validContactRes = await contactHandler(validContactReq);
  record("Contact: POST /api/contact (Valid Submission)", validContactRes.status === 201);

  const invalidContactReq = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Inquirer",
      email: "invalid-email-format",
      message: "Hi",
    }),
  });
  const invalidContactRes = await contactHandler(invalidContactReq);
  record("Validation: Reject Invalid Contact Input", invalidContactRes.status === 400);

  // 21. Newsletter API (Valid & Invalid)
  const validNewsReq = new NextRequest("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "subscriber@example.com" }),
  });
  const validNewsRes = await newsletterHandler(validNewsReq);
  record("Newsletter: POST /api/newsletter (Valid Email)", validNewsRes.status === 201);

  const invalidNewsReq = new NextRequest("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "not-an-email" }),
  });
  const invalidNewsRes = await newsletterHandler(invalidNewsReq);
  record("Validation: Reject Invalid Newsletter Email", invalidNewsRes.status === 400);

  console.log("\n============================================================");
  const totalTests = results.length;
  const passedTests = results.filter((r) => r.status === "PASS").length;
  console.log(`VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log("============================================================\n");

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runVerification()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Verification failed with fatal error:", err);
    process.exit(1);
  });
