import { getProductById } from "../../lib/products";
import Image from "next/image";

export default function ProductPage({ params }: { params: { "product-id": string } }) {
  const productId = parseInt(params["product-id"], 10);
  const product = getProductById(productId);

  if (!product) {
    return <div>Produkt nie znaleziony</div>;
  }

  const isAvailable = product.amount > 0;

  return (
    <div>
      <h2>{product.name}</h2>
      <Image src={product.image} alt={product.name} width={200} height={200} />
      <p><strong>Typ:</strong> {product.type}</p>
      <p><strong>Ilość:</strong> {product.amount}</p>
      <p><strong>Cena:</strong> {product.price} zł</p>
      <p><strong>Dostępność:</strong> {isAvailable ? "Dostępny" : "Niedostępny"}</p>
    </div>
  );
}
