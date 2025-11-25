"use client";
import Link from "next/link";
import "../app/global.css";

export default function MainHeader() {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li><Link href="/"><img src="/politechnika-krakowska-logo.svg" alt="Logo PK"/></Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/basket">Basket</Link></li>
          <li><Link href="/order-history">Order History</Link></li>
          <li><Link href="/product-list">Product List</Link></li>
        </ul>
      </nav>
    </header>
  );
}