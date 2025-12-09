"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getProductsAlphabetically,
  getProductsByNewest,
  getProductsInStock,
  getProductsOutOfStock,
  getProductsByCategory,
  getProductById,
} from "../lib/products"; 
import { notFound } from "next/navigation";

export default function ProductListPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];

  // hooki zawsze na górze
  const [sortOption, setSortOption] = useState("alphabetical");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // 🔹 0 segmentów → główna lista produktów
  if (slug.length === 0) {
    let products;
    if (sortOption === "alphabetical") {
      products = getProductsAlphabetically();
    } else if (sortOption === "newest") {
      products = getProductsByNewest();
    } else if (sortOption === "inStock") {
      products = getProductsInStock();
    } else if (sortOption === "outOfStock") {
      products = getProductsOutOfStock();
    } else {
      products = getProductsAlphabetically();
    }

    if (onlyAvailable) {
      products = products.filter((p) => p.amount > 0);
    }

    return (
      <div className="flex flex-col gap-8">
        <div className="mb-4 flex items-center gap-2">
          <label>
            Sortuj:
            <select
              className="px-3 py-2 rounded border border-gray-400 bg-gray-900 text-gray-200 text-base"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="alphabetical">Alfabetycznie</option>
              <option value="newest">Najnowsze</option>
              <option value="inStock">Na stanie</option>
              <option value="outOfStock">Wyprzedane</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            Tylko dostępne
          </label>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 list-none p-0">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-gray-900 rounded-lg p-4 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-gray-700"
            >
              <Link href={`/product-list/${p.type}/${p.id}`}>
                <div className="bg-gray-900 p-4 rounded-md mt-2">
                  {p.name} ({p.type}) — {p.amount} szt. — {p.price} zł
                </div>
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
        <h2 className="text-2xl font-bold mb-4">Kategoria: {category}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <li key={p.id} className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700">
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
        <p>{product.description}</p>
        <p>Cena: {product.price} zł</p>
        <p>Dostępność: {product.amount > 0 ? "Dostępny" : "Niedostępny"}</p>
      </div>
    );
  }

  notFound();
}
