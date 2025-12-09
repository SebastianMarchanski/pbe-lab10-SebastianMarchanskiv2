import Image from "next/image"
import { getCartWithItems, getCartTotal } from "../lib/actions/cart"

export default async function Basket() {
  // Tymczasowy userId z .env
  const userId = Number(process.env.USER_ID)

  // Pobranie koszyka i sumy
  const cart = await getCartWithItems(userId)
  const total = await getCartTotal(userId)

  // Obsługa pustego koszyka
  if (!cart || cart.items.length === 0) {
    return <p>Twój koszyk jest pusty.</p>
  }

  return (
    <div className="basket">
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
      </div>
    </div>
  )
}