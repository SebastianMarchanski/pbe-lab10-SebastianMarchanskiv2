"use client"

import { signIn, signOut } from "next-auth/react"

// 🔑 Komponent logowania przez GitHub
export function LoginButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Zaloguj się przez GitHub
    </button>
  )
}

// 🚪 Komponent wylogowania
export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
    >
      Wyloguj się
    </button>
  )
}
