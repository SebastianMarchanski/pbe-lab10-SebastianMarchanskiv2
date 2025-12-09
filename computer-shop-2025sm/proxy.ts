import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/app/lib/auth"

// Funkcja proxy (middleware) – uruchamiana przy każdym żądaniu
export async function middleware(req: NextRequest) {
  // Sprawdź sesję użytkownika
  const session = await auth()

  // Jeśli brak sesji i użytkownik próbuje wejść na chronioną trasę
  if (!session && req.nextUrl.pathname.startsWith("/basket")) {
    // Przekieruj na stronę logowania
    return NextResponse.redirect(new URL("/api/auth/signin", req.url))
  }

  // Jeśli użytkownik zalogowany – przepuść dalej
  return NextResponse.next()
}

// Konfiguracja – określamy, które trasy mają być chronione
export const config = {
  matcher: ["/basket/:path*", "/order-history/:path*"], 
}
