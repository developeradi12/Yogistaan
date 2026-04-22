"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="w-full sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Image
            src={"/image.png"}
            alt="Yogistaan Logo"
            width={32}
            height={32}
          />
          <span className="font-serif text-xl font-bold text-white tracking-tight">
            Yogi<span className="text-amber-400">staan</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${active
                    ? "text-amber-400"
                    : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                  }
                `}
              >
                {label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex h-9 px-5 text-sm font-medium border-stone-700 text-stone-300 bg-transparent hover:bg-stone-800 hover:text-white hover:border-stone-600 rounded-lg transition-all duration-200"
          >
            Login
          </Button>
          <Button
            className="hidden sm:inline-flex h-9 px-5 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-white rounded-lg shadow-md shadow-amber-900/30 transition-all duration-200 hover:-translate-y-px"
          >
            Sign Up
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden h-9 w-9 border-stone-700 bg-transparent hover:bg-stone-800 text-stone-300"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 bg-stone-900 border-stone-800 p-0">
              {/* Sheet header */}
              <div className="flex items-center gap-2 p-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                  <Mountain className="w-4 h-4 text-white" />
                </div>
                <span className="font-serif text-xl font-bold text-white">
                  Yogi<span className="text-amber-400">staan</span>
                </span>
              </div>

              <Separator className="bg-stone-800" />

              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map(({ href, label }) => {
                  const active = pathname === href
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                        ${active
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "text-stone-400 hover:text-white hover:bg-stone-800"
                        }
                      `}
                    >
                      {label}
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 flex flex-col gap-2 mt-auto">
                <Separator className="bg-stone-800 mb-2" />
                <Button variant="outline" className="w-full border-stone-700 text-stone-300 bg-transparent hover:bg-stone-800">
                  Login
                </Button>
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold">
                  Sign Up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}