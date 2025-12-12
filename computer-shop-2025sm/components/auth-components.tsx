"use client"

import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

//  Komponent logowania przez GitHub
export function LoginButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/basket" })}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Zaloguj się przez GitHub
    </button>
  )
}

//  Komponent wylogowania
export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
    >
      Wyloguj się
    </button>
  )
}

//  Komponent pokazujący odpowiedni przycisk w zależności od sesji
export function AuthButtons() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        <p>Zalogowany jako: {session.user?.email}</p>
        <LogoutButton />
      </div>
    )
  }
  return <LoginButton />
}
