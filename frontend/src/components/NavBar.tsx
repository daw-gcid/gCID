"use client";
import { useContext } from "react";

import NavLogo from "./NavLogo";
import { AuthContext } from "../context/authContext";
import Link from "next/link";

export default function NavBar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);


  const linkHomeUser = (): string => {
    if (user?.userType === 1) {
      return "/client";
    }
    if (user?.userType === 2) {
      return "/instituto";
    }
    if (user?.userType === 3) {
      return "/talento";
    }
    return "";
  };

  return (
    <nav className="w-full h-14 bg-white top-0 fixed z-50">
      <div className="relative mx-10 h-full bg-white flex justify-between items-center">
        {!isAuthenticated ?

          <Link href="/">
          <span>
            <NavLogo />
          </span>
        </Link>
        : 
        <Link href={linkHomeUser()}>
          <span>
            <NavLogo />
          </span>
        </Link>
        }
        <span>
          {isAuthenticated ? (
            <button
              className="uppercase bg-custom-green px-10 text-white rounded-full font-semibold py-2"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="uppercase bg-custom-green px-10 text-white rounded-full font-semibold py-2"
            >
              Login
            </a>
          )}
        </span>
      </div>
    </nav>
  );
}
