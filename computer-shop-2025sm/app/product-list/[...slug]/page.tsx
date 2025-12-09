import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductsAlphabetically,
  getProductsByCategory,
  getProductById,
} from "../../lib/products";

// ⬅️ async, bo params jest Promise
export default async function ProductListPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params; // ⬅️ rozpakowanie Promise

  // 🔹 0 segmentów → główna lista produktów
  if (slug.length === 0) {
    const products = getProductsAlphabetically();

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Lista produktów</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700"
            >
              <Link href={`/product-list/${p.type}/${p.id}`}>
                {p.name} ({p.type}) — {p.price} zł
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 🔹 1 segment → lista kategorii
  if (slug.length === 1) {
    const category = slug[0];
    const products = getProductsByCategory(category);

    if (!products || products.length === 0) {
      notFound();
    }

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Produkty w kategorii: {category}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700"
            >
              <Link href={`/product-list/${category}/${p.id}`}>
                {p.name} — {p.price} zł
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 🔹 2 segmenty → szczegóły produktu
  if (slug.length === 2) {
    const [category, productIdStr] = slug;
    const productId = Number(productIdStr);
    const product = getProductById(productId);

    if (!product) {
      notFound();
    }

    return (
      <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p>Kategoria: {category}</p>
        <p>Ilość: {product.amount}</p>
        <p>Cena: {product.price} zł</p>
        <p>Dostępność: {product.amount > 0 ? "Dostępny" : "Niedostępny"}</p>
        <p className="mt-4">{product.description}</p>
        <img
          src={product.image}
          alt={product.name}
          width={300}
          className="mt-6 rounded shadow-lg"
        />
      </div>
    );
  }

  // 🔹 inne przypadki → 404
  notFound();
}
