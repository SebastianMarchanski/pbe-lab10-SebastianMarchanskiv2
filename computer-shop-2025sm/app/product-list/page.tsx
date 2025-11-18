import { 
  getProductsAlphabetically, 
  getProductsByNewest, 
  getProductsInStock, 
  getProductsOutOfStock, 
  getProductsByCategory, 
  getProductById, 
  updateProductAmount 
} from "../lib/products";



export default function ProductList() {
  const productsAlpha = getProductsAlphabetically();
  const productsNewest = getProductsByNewest();
  const productsByStock = getProductsInStock();
  const productsOutOfStock = getProductsOutOfStock();
  const productsByCategory = getProductsByCategory("procesor"); // przykładowa kategoria
  const singleProduct = getProductById(1); // przykładowe ID produktu
  const updatedProduct = updateProductAmount(1, 10); // ustaw ilość produktu o ID=1 na 10 sztuk

  return (
    <div>
      <h2>Produkty alfabetycznie</h2>
      <ul>
        {productsAlpha.map(p => (
          <li key={p.id}>{p.name} - {p.price} zł</li>
        ))}
      </ul>

      <h2>Produkty od najnowszego</h2>
      <ul>
        {productsNewest.map(p => (
          <li key={p.id}>{p.name} - {p.date}</li>
        ))}
      </ul>

      <h2>Produkty posiadające przynajmniej jeden element na stanie</h2>
      <ul>
        {productsByStock.map(p => (
          <li key={p.id}>{p.name} - {p.amount} szt.</li>
        ))}
      </ul>

      <h2>Produkty wyprzedane</h2>
      <ul>
        {productsOutOfStock.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <h2>Produkty z kategorii procesor</h2>
      <ul>
        {productsByCategory.map(p => (
          <li key={p.id}>{p.name} - {p.price} zł</li>
        ))}
      </ul>

      <h2>Pojedynczy produkt (ID=1)</h2>
      <p>{singleProduct.name} - {singleProduct.price} zł - {singleProduct.amount} szt.</p>

      <h2>Produkt po aktualizacji ilości</h2>
      <p>{updatedProduct.name} - {updatedProduct.price} zł - {updatedProduct.amount} szt.</p>
    </div>
  );
}
