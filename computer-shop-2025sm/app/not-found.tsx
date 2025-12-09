import Link from "next/link";


export default function NotFound(){
    return(
        <main className="not-found">
            <h1>Nie znaleziono strony</h1>
            <p>Strona, której szukasz, nie istnieje.</p>
            <p>Sprawdź adres URL lub wróć na jedną z dostępnych stron</p>

        </main>
    )
}