import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Nie znaleziono strony</h1>
      <p className="mb-2">Strona, której szukasz, nie istnieje.</p>
      <p className="mb-6">Sprawdź adres URL lub wróć na jedną z dostępnych stron:</p>
      <ul className="space-y-2 text-center">
        <li>
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Strona główna
          </Link>
        </li>
        <li>
          <Link
            href="/basket"
            className="inline-block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Koszyk
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="inline-block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            O nas
          </Link>
        </li>
        <li>
          <Link
            href="/order-history"
            className="inline-block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Historia zamówień
          </Link>
        </li>
        <li>
          <Link
            href="/product-list"
            className="inline-block px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Lista produktów
          </Link>
        </li>
      </ul>
    </main>
  );
}
