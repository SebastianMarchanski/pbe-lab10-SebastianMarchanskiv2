import Image from "next/image"
import { auth } from "../lib/auth"
import { getCartWithItems, getCartTotal } from "../lib/actions/cart"
import { AuthButtons } from "../../components/auth-components"
import { fillTestCart } from "@/app/lib/actions/cart"
import { revalidatePath } from "next/cache"

async function handleFillTestCart() {
  "use server"
  const session = await auth()
  if (!session?.user?.id) return

  await fillTestCart(session.user.id as string)
  revalidatePath("/basket")
}

export default async function Basket() {
  const session = await auth()
  const userId = session?.user?.id

  // Niezalogowany – prośba o logowanie
  if (!userId) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Koszyk</h1>
        <p className="text-lg mb-8">Zaloguj się, aby zobaczyć swój koszyk.</p>
        <AuthButtons />
      </div>
    )
  }

  // Zalogowany – pobieramy koszyk
  const cart = await getCartWithItems(userId)
  const total = await getCartTotal(userId)
  const isEmpty = !cart || cart.items.length === 0

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Koszyk</h1>
        <p className="text-gray-600">Zalogowany jako: {session.user?.email}</p>
      </div>

      <form action={handleFillTestCart} className="mb-8">
        <button
          type="submit"
          className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition"
        >
          🧪 Wypełnij testowy koszyk (3 przykładowe produkty)
        </button>
      </form>

      {isEmpty ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-8">Twój koszyk jest pusty.</p>
          <p className="text-sm text-gray-500">
            Kliknij przycisk powyżej, aby dodać przykładowe produkty i sprawdzić działanie strony.
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-6 mb-10">
            {cart.items.map((item) => (
              <li key={item.id} className="flex gap-6 bg-white p-6 rounded-lg shadow">
                <Image
                  src={item.product.imagePath ? `/${item.product.imagePath}` : "/placeholder.png"}
                  alt={item.product.name}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600 mt-1">Cena: {Number(item.product.price)} zł</p>
                  <p className="text-gray-600">Ilość: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {Number(item.product.price) * item.quantity} zł
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-lg text-right">
            <p className="text-2xl font-bold mb-6">Razem: {total} zł</p>
            <button className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition">
              Przejdź do kasy
            </button>
          </div>
        </>
      )}
    </div>
  )
}