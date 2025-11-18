import { 
  getProductsAlphabetically, 
  getProductsByNewest, 
  getProductsInStock, 
  getProductsOutOfStock, 
  getProductsByCategory, 
  getProductById, 
  updateProductAmount 
} from "../lib/products";

import styles from "./page.module.css";

export default function ProductList() {
  const productsAlpha = getProductsAlphabetically();
  const productsNewest = getProductsByNewest();
  const productsByStock = getProductsInStock();
  const productsOutOfStock = getProductsOutOfStock();
  const productsByCategory = getProductsByCategory("procesor");
  const singleProduct = getProductById(1);
  const updatedProduct = updateProductAmount(1, 10);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produkty alfabetycznie</h2>
      <ul className={styles.list}>
        {productsAlpha.map(p => (
          <li key={p.id} className={styles.item}>{p.name} - {p.price} zł</li>
        ))}
      </ul>

      <h2 className={styles.title}>Produkty od najnowszego</h2>
      <ul className={styles.list}>
        {productsNewest.map(p => (
          <li key={p.id} className={styles.item}>{p.name} - {p.date}</li>
        ))}
      </ul>

      <h2 className={styles.title}>Produkty posiadające przynajmniej jeden element na stanie</h2>
      <ul className={styles.list}>
        {productsByStock.map(p => (
          <li key={p.id} className={styles.item}>{p.name} - {p.amount} szt.</li>
        ))}
      </ul>

      <h2 className={styles.title}>Produkty wyprzedane</h2>
      <ul className={styles.list}>
        {productsOutOfStock.map(p => (
          <li key={p.id} className={styles.item}>{p.name}</li>
        ))}
      </ul>

      <h2 className={styles.title}>Produkty z kategorii procesor</h2>
      <ul className={styles.list}>
        {productsByCategory.map(p => (
          <li key={p.id} className={styles.item}>{p.name} - {p.price} zł</li>
        ))}
      </ul>

      <h2 className={styles.title}>Pojedynczy produkt (ID=1)</h2>
      <p className={styles.single}>{singleProduct.name} - {singleProduct.price} zł - {singleProduct.amount} szt.</p>

      <h2 className={styles.title}>Produkt po aktualizacji ilości</h2>
      <p className={styles.single}>{updatedProduct.name} - {updatedProduct.price} zł - {updatedProduct.amount} szt.</p>
    </div>
  );
}
