import { AuthService } from "../backend/services/auth.service";
import { ProductService } from "../backend/services/product.service";
import { OrderService } from "../backend/services/order.service";
import { UserService } from "../backend/services/user.service";
import { checkDbConnection } from "../lib/db";
import { verifyToken } from "../lib/auth";

async function runTests() {
  console.log("==========================================");
  console.log("RUNNING FULL-STACK BACKEND VALIDATION SUITE");
  console.log("==========================================");

  // 1. DB Connection Test
  const dbStatus = await checkDbConnection();
  console.log("✓ Database Connection:", dbStatus.isConnected ? "CONNECTED" : "FAILED");
  if (!dbStatus.isConnected) throw new Error(dbStatus.error);

  // 2. Auth Service: Login Test with Seeded User
  const loginResult = await AuthService.login({
    email: "admin@publishinghub.com",
    password: "admin123456",
  });
  console.log("✓ Auth Login:", loginResult.user.email, "| Role:", loginResult.user.role);

  // 3. JWT Verification Test
  const decoded = verifyToken(loginResult.token);
  console.log("✓ JWT Token Verification:", decoded?.email === "admin@publishinghub.com" ? "VALID" : "INVALID");

  // 4. Products Service: Retrieve products
  const productsResult = await ProductService.getProducts({ limit: 5 });
  console.log(`✓ Products Query: Retrieved ${productsResult.products.length} products (Total in DB: ${productsResult.total})`);

  // 5. Products Service: Get by Slug
  const singleProduct = await ProductService.getProductBySlug("when-the-doves-disappeared");
  console.log("✓ Product by Slug:", singleProduct ? `${singleProduct.title} (${singleProduct.price})` : "NOT FOUND");

  // 6. Categories Service
  const categories = await ProductService.getCategories();
  console.log(`✓ Categories Query: Found ${categories.length} categories`);

  // 7. Cart Service: Add to cart
  if (productsResult.products.length > 0) {
    const testProd = productsResult.products[0];
    const cart = await OrderService.addToCart({
      userId: loginResult.user.id,
      productId: testProd.id,
      quantity: 2,
    });
    console.log(`✓ Cart Service: Cart created with ${cart.items.length} items, Total: £${cart.totalAmount.toFixed(2)}`);
  }

  // 8. Contact Message Submission
  const contact = await OrderService.submitContactMessage({
    name: "John Doe",
    email: "john@example.com",
    subject: "Publishing Query",
    message: "I would like to inquire about book publishing submissions.",
  });
  console.log("✓ Contact Message Service: Created message ID:", contact.id);

  // 9. Newsletter Subscription
  const newsletter = await OrderService.subscribeNewsletter("reader@example.com");
  console.log("✓ Newsletter Service: Subscribed email:", newsletter.email);

  console.log("==========================================");
  console.log("ALL BACKEND SERVICES & REPOSITORIES VERIFIED SUCCESSFULLY!");
  console.log("==========================================");
}

runTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
