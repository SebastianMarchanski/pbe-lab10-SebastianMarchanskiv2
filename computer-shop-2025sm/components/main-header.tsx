"use client";
import NavLink from "./nav-link";
import "../app/global.css";

export default function MainHeader() {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li><NavLink href="/"><img src="/politechnika-krakowska-logo.svg" alt="Logo PK"/></NavLink></li>
          <li><NavLink href="/about">About</NavLink></li>
          <li><NavLink href="/basket">Basket</NavLink></li>
          <li><NavLink href="/order-history">Order History</NavLink></li>
          <li><NavLink href="/product-list">Product List</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}