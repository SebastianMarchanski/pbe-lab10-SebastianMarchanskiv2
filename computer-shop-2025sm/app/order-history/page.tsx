export const dynamic = "force-dynamic"; // <--- ta linia wyłącza statyczne prerenderowanie

export default function OrderHistory() {
  // Tu możesz zostawić placeholder, bo strona jest niegotowa
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Historia zamówień</h1>
      <p className="text-gray-600">To nie jest jeszcze obsługiwane 👷‍♂️</p>
      {/* Lub tymczasowo przekieruj: */}
      {/* <redirect to="/" /> jeśli chcesz */}
    </div>
  );

  // Alternatywnie – jeśli chcesz rzucić błąd tylko w runtime (po wejściu użytkownika):
  // throw new Error("To nie jest jeszcze obsługiwane");
}