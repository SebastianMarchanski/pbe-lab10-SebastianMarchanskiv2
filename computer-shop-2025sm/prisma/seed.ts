import { PrismaClient } from "@prisma/client";
import products from "../app/data/products.json";
import "dotenv/config";

const prisma = new PrismaClient(); // <- bez żadnych opcji

async function main() {
  // 1. Kategorie
  const categories = [...new Set(products.map((p) => p.type))];
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  }

  // 2. Produkty
  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: {},
      create: {
        code: product.code,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.amount,
        imagePath: product.image,
        createdAt: new Date(product.date),
        category: {
          connect: { name: product.type },
        },
      },
    });
  }

  // 3. Użytkownik
  const user = await prisma.user.upsert({
    where: { email: "test@shop.com" },
    update: {},
    create: {
      email: "test@shop.com",
      name: "Test User",
      password: "hashedpassword123",
    },
  });

  // 4. Koszyk
  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId: 1 } },
    update: { quantity: 2 },
    create: {
      cartId: cart.id,
      productId: 1,
      quantity: 2,
    },
  });

  // 5. Zamówienia
  for (let i = 1; i <= 4; i++) {
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${i}`,
        status: "DELIVERED",
        totalAmount: 199.99 * i,
        userId: user.id,
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: 1,
        quantity: i,
        price: 199.99,
        productName: "Intel Core i5-12400F",
        productCode: "PRC1234567",
      },
    });
  }

  console.log("✅ Seeding zakończony pomyślnie");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
