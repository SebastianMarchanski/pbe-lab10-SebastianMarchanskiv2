import products from "../data/products.json";

// wszystkie produkty alfabetycznie
export function getProductsAlphabetically() {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

// wszystkie produkty od najnowszego
export function getProductsByNewest() {
  return [...products].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// wszystkie produkty posiadające przynajmniej jeden element na stanie
export function getProductsInStock() {
  return products.filter(p => p.amount > 0);
}

// wszystkie produkty bez stanu
export function getProductsOutOfStock() {
  return products.filter(p => p.amount === 0);
}

// wszystkie produkty danej kategorii
export function getProductsByCategory(category: string) {
  return products.filter(p => p.type === category);
}

// wybrany produkt (po id)
export function getProductById(id: number) {
  return products.find(p => p.id === id);
}

// zmiana ilości produktu o podanym id
export function updateProductAmount(id: number, newAmount: number) {
  const product = products.find(p => p.id === id);
  if (product) {
    product.amount = newAmount;
  }
  return product;
}
