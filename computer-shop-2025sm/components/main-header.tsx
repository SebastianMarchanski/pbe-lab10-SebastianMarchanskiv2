"use client";
import NavLink from "./nav-link";
import "../app/global.css";

export default function MainHeader() {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li className="active"><NavLink href="/"><img src="/politechnika-krakowska-logo.svg" alt="Logo PK"/></NavLink></li>
          <li className="active"><NavLink href="/about">About</NavLink></li>
          <li className="active"><NavLink href="/basket">Basket</NavLink></li>
          <li className="active"><NavLink href="/order-history">Order History</NavLink></li>
          <li className="active"><NavLink href="/product-list">Product List</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}