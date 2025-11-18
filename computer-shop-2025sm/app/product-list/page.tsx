"use client";

import { 
  getProductsAlphabetically, 
  getProductsByNewest, 
  getProductsInStock, 
  getProductsOutOfStock, 
  getProductsByCategory, 
  getProductById, 
  updateProductAmount 
} from "../lib/products";

import { useState } from "react";
import styles from "./page.module.css";

export default function ProductList() {
  const [sortOption, setSortOption] = useState("alphabetical");

  // pobieramy dane w zależności od wybranej opcji
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
    products = getProductsByCategory("procesor");
  }

  const singleProduct = getProductById(1);
  const updatedProduct = updateProductAmount(1, 10);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista produktów</h2>

      <div className={styles.sortBox}>
        <label htmlFor="sort">Sortuj według: </label>
        <select 
          id="sort" 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.select}
        >
          <option value="alphabetical">Alfabetycznie</option>
          <option value="newest">Najnowsze</option>
          <option value="inStock">Na stanie</option>
          <option value="outOfStock">Wyprzedane</option>
          <option value="category">Kategoria: procesor</option>
        </select>
      </div>

      <ul className={styles.list}>
        {products.map(p => (
          <li key={p.id} className={styles.item}>
            {p.name} - {p.price} zł {p.amount !== undefined && `(${p.amount} szt.)`}
          </li>
        ))}
      </ul>

      <h2 className={styles.title}>Pojedynczy produkt (ID=1)</h2>
      <p className={styles.single}>
        {singleProduct.name} - {singleProduct.price} zł - {singleProduct.amount} szt.
      </p>

      <h2 className={styles.title}>Produkt po aktualizacji ilości</h2>
      <p className={styles.single}>
        {updatedProduct.name} - {updatedProduct.price} zł - {updatedProduct.amount} szt.
      </p>
    </div>
  );
}
