import Link from "next/link";


export default function NotFound(){
    return(
        <main className="not-found">
            <h1>Nie znaleziono strony</h1>
            <p>Strona, której szukasz, nie istnieje.</p>
            <p>Sprawdź adres URL lub wróć na jedną z dostępnych stron:</p>
            <ul>
                <li><Link href="/">Strona główna</Link></li>
                <li><Link href="/basket">Koszyk</Link></li>
                <li><Link href="/about">O nas</Link></li>
                <li><Link href="/order-history">Historia zamówień</Link></li>
                <li><Link href="/product-list">Lista produktów</Link></li>
            </ul>
        </main>
    )
}