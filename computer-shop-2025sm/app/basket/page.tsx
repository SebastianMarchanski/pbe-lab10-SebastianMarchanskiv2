import Image from "next/image"
import { auth } from "../lib/auth"
import { getCartWithItems, getCartTotal } from "../lib/actions/cart"
import { AuthButtons } from "../../components/auth-components"
import { fillTestCart } from "@/app/lib/actions/cart"
import { revalidatePath } from "next/cache"

async function handleFillTestCart(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user?.id) return

  await fillTestCart(session.user.id as string)
  revalidatePath("/basket")
}

export default async function Basket() {
  const session = await auth()
  const userId = session?.user?.id

  // Jeśli nie zalogowany – tylko prośba o logowanie
  if (!userId) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Twój koszyk</h1>
        <p className="text-lg mb-8">Musisz być zalogowany, aby zobaczyć zawartość koszyka.</p>
        <AuthButtons />
      </div>
    )
  }

  // Zalogowany – pobieramy dane koszyka
  const cart = await getCartWithItems(userId)
  const total = await getCartTotal(userId)

  const isEmpty = !cart || cart.items.length === 0

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Twój koszyk</h1>
        <p>Zalogowany jako: {session.user?.email}</p>
      </div>

      {isEmpty ? (
        <div className="text-center py-12">
          <p className="text-xl mb-8">Twój koszyk jest pusty.</p>

          {/* Przycisk testowy – tylko w development */}
          {process.env.NODE_ENV === "development" && (
            <form action={handleFillTestCart}>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                🧪 Wypełnij testowy koszyk
              </button>
            </form>
          )}
        </div>
      ) : (
        <>
          <ul className="basket-items space-y-6 mb-8">
            {cart.items.map((item) => (
              <li key={item.id} className="basket-item flex gap-6 bg-white p-4 rounded-lg shadow">
                <Image
                  src={item.product.imagePath ? `/${item.product.imagePath}` : "/placeholder.png"}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">Cena: {Number(item.product.price)} zł</p>
                  <p className="text-gray-600">Ilość: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="basket-summary bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Podsumowanie</h3>
            <p className="text-lg mb-6">Całkowita wartość: {total} zł</p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Przejdź do kasy
            </button>
          </div>
        </>
      )}
    </div>
  )
}