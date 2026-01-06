'use server'

import products from "@/app//data/products.json"
import { prisma } from '../prisma'

// userId powinien być typu string, bo User.id = String
export async function getCartWithItems(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: { include: { category: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

export async function getCartTotal(userId: string): Promise<number> {
  const cart = await getCartWithItems(userId)
  if (!cart) return 0
  return cart.items.reduce((sum: number, item: { product: { price: any }; quantity: number }) => {
    const price = Number(item.product.price)
    return sum + price * item.quantity
  }, 0)
}

// 🔎 Pobiera wszystkich użytkowników z koszykami
export async function getAllUsersWithCarts() {
  return prisma.user.findMany({
    include: {
      cart: { include: { items: true } },
    },
  })
}

// 🔄 Przenosi koszyk między użytkownikami
export async function transferCart(fromUserId: string, toUserId: string) {
  if (fromUserId === toUserId) {
    throw new Error("Nie można przenieść koszyka do tego samego użytkownika")
  }

  const fromCart = await getCartWithItems(fromUserId)
  if (!fromCart) return

  // upewnij się, że docelowy koszyk istnieje
  let toCart = await prisma.cart.findUnique({ where: { userId: toUserId } })
  if (!toCart) {
    toCart = await prisma.cart.create({ data: { userId: toUserId } })
  }

  for (const item of fromCart.items) {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: toCart.id,
          productId: item.productId,
        },
      },
      update: { quantity: { increment: item.quantity } },
      create: {
        cartId: toCart.id,
        productId: item.productId,
        quantity: item.quantity,
      },
    })
  }

  await prisma.cartItem.deleteMany({ where: { cartId: fromCart.id } })
}
export async function fillTestCart(userId: string) {
  // Pobieramy koszyk lub tworzymy nowy, jeśli nie istnieje
  let cart = await prisma.cart.findUnique({
    where: { userId },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    })
  }

  // ID produktów z bazy – zmień na prawdziwe ID z Twojej tabeli products w Supabase
  const testProductIds = [1, 2, 3] // ←←← tu wpisz istniejące ID produktów (np. 5, 8, 12)

  // Dodajemy/updatujemy produkty w koszyku
  for (const productId of testProductIds) {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    })
  }
}