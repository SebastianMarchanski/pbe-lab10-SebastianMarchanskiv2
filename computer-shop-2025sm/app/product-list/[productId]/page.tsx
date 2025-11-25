import { getProductById } from "../../lib/products";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;   // <- odpakowanie Promise
  const product = getProductById(Number(productId));

  if (!product) {
    return <div>Produkt nie znaleziony</div>;
  }

  const isAvailable = product.amount > 0;

  return (
    <div>
      <h2>{product.name}</h2>
      <p><strong>Typ:</strong> {product.type}</p>
      <p><strong>Ilość:</strong> {product.amount}</p>
      <p><strong>Cena:</strong> {product.price} zł</p>
      <p><strong>Dostępność:</strong> {isAvailable ? "Dostępny" : "Niedostępny"}</p>
      <p><strong>Opis:</strong> {product.description}</p>
      <img src={product.image} alt={product.name} width={300} />
    </div>
  );
}
