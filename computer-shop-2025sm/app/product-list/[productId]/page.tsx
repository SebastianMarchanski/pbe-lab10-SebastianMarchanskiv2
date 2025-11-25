import { getProductById } from "../../lib/products";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;   // <- odpakowanie Promise
  const product = getProductById(Number(productId));

  if (!product) {
    notFound();
  }

  const isAvailable = product.amount > 0;

  return (
    <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p><strong>Typ:</strong> {product.type}</p>
      <p><strong>Ilość:</strong> {product.amount}</p>
      <p><strong>Cena:</strong> {product.price} zł</p>
      <p><strong>Dostępność:</strong> {isAvailable ? "Dostępny" : "Niedostępny"}</p>
      <p className="mt-4"><strong>Opis:</strong> {product.description}</p>
      <img src={product.image} alt={product.name} width={300} className="mt-6 rounded shadow-lg" />
    </div>
  );
}
