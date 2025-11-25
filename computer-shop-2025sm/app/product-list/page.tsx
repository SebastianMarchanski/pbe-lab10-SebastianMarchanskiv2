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
    <div className={styles.container}>
      <h2 className={styles.title}>Lista produktów</h2>

      <div className={styles.sortBox}>
        <label>
          Sortuj:
          <select
            className={styles.select}
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

      <ul className={styles.list}>
        {products.map(p => (
          <li key={p.id} className={styles.item}>
            <Link href={`/product-list/${p.id}`}>
              <div className={styles.single}>
                {p.name} ({p.type}) — {p.amount} szt. — {p.price} zł
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
