"use client";
import NavLink from "./nav-link";
import "../app/global.css";

export default function MainHeader() {
  return (
    <header className="bg-purple-700 p-3">
      <nav>
        <ul className="flex items-center gap-6 font-bold text-white">
          <li>
            <NavLink href="/">
              <img
                src="/politechnika-krakowska-logo.svg"
                alt="Logo PK"
                className="w-6 h-6 hover:brightness-110"
              />
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/about"
              className="hover:text-yellow-400 transition-colors"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/basket"
              className="hover:text-yellow-400 transition-colors"
            >
              Basket
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/order-history"
              className="hover:text-yellow-400 transition-colors"
            >
              Order History
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/product-list"
              className="hover:text-yellow-400 transition-colors"
            >
              Product List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
