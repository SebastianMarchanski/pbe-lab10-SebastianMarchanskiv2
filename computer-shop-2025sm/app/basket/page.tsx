import Image from "next/image"
import { auth } from "../lib/auth"
import { getCartWithItems, getCartTotal } from "../lib/actions/cart"
import { AuthButtons } from "../../components/auth-components"

export default async function Basket() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return (
      <div>
        <p>Musisz być zalogowany, aby zobaczyć koszyk.</p>
        <AuthButtons />
      </div>
    )
  }

  const cart = await getCartWithItems(userId)   // przekazujemy string
  const total = await getCartTotal(userId)

  if (!cart || cart.items.length === 0) {
    return <p>Twój koszyk jest pusty.</p>
  }

  return (
    <div className="basket">
      <p>Zalogowany jako: {session?.user?.email}</p>
      <ul className="basket-items">
        {cart.items.map((item) => (
          <li key={item.id} className="basket-item">
            <Image
              src={item.product.imagePath ? `/${item.product.imagePath}` : "/placeholder.png"}
              alt={item.product.name}
              width={100}
              height={100}
            />
            <div>
              <h3>{item.product.name}</h3>
              <p>Cena: {Number(item.product.price)} zł</p>
              <p>Ilość: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="basket-summary">
        <h3>Podsumowanie</h3>
        <p>Całkowita wartość: {total} zł</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Przejdź do kasy
        </button>
      </div>
    </div>
  )
}
