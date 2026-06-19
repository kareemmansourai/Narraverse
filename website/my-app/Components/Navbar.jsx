"use client";

import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import logo from "@/public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${outfit.className} flex justify-between py-5 items-center fixed top-0 left-0 right-0 z-50 px-12 transition-all duration-300`}
      style={{
        background: scrolled ? "rgba(5, 0, 20, 0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="Logo"
          width={65}
          height={63}
          className="rotate-[0.5deg]"
        />
        <p className="uppercase text-2xl">Narraverse</p>
      </div>

      <div>
        {!loading && user && (
          <ul className="flex gap-25">
            <li>
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? "font-bold border rounded-full px-4 py-1 border-[#ff9408]"
                    : ""
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/services"
                className={
                  [
                    "/services",
                    "/audioBook",
                    "/bookGeneration",
                    "/visual",
                  ].includes(pathname)
                    ? "font-bold border rounded-full px-4 py-1 border-[#ff9408]"
                    : ""
                }
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={
                  pathname === "/contact"
                    ? "font-bold border rounded-full px-4 py-1 border-[#ff9408]"
                    : ""
                }
              >
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Auth buttons */}
      <div className="flex gap-5">
        {loading ? null : user ? (
          <button
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className={`${outfit.className} cursor-pointer px-8 py-2 rounded-full text-white font-medium`}
            style={{
              background: "linear-gradient(to right, #FF3A93, #FFC120)",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className={`${outfit.className} cursor-pointer px-8 py-2 rounded-full text-white font-medium`}
              style={{
                background: "linear-gradient(to right, #FF3A93, #FFC120)",
              }}
            >
              <Link href="/login">Log In</Link>
            </button>

            <button
              className={`${outfit.className} cursor-pointer border-[1px] border-[#ff9408] rounded-full px-8 py-2`}
            >
              <Link href="/signup">Sign Up</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
