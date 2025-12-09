'use server'

import { prisma } from '../prisma'

/**
 * Pobiera koszyk użytkownika wraz z wszystkimi powiązanymi danymi
 */
export async function getCartWithItems(userId: number) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  return cart
}

export async function getCartTotal(userId: number): Promise<number> {
  const cart = await getCartWithItems(userId)

  if (!cart) return 0

  return cart.items.reduce((sum, item) => {
    const price = Number(item.product.price)
    return sum + price * item.quantity
  }, 0)
}

