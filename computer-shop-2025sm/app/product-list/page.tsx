"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  getProductsAlphabetically,
  getProductsByNewest,
  getProductsInStock,
  getProductsOutOfStock,
} from "../lib/products";

export default function ProductListPage() {
  const [sortOption, setSortOption] = useState("alphabetical");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

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
    products = products.filter(p => p.amount > 0);
  }

  return (
    <div className="flex flex-col gap-8">

  <div className="mb-4 flex items-center gap-2">
    <label>
      Sortuj:
      <select
        className="px-3 py-2 rounded border border-gray-400 bg-gray-900 text-gray-200 text-base"
        value={sortOption}
        onChange={e => setSortOption(e.target.value)}
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
        onChange={e => setOnlyAvailable(e.target.checked)}
      />
      Tylko dostępne
    </label>
  </div>

  <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 list-none p-0">
    {products.map(p => (
      <li
        key={p.id}
        className="bg-gray-900 rounded-lg p-4 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-gray-700"
      >
        <Link href={`/product-list/${p.id}`}>
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
