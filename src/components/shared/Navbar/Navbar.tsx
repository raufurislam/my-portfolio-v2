"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut, User, Settings } from "lucide-react";
import { ModeToggle } from "../ModeToggler";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

// Example roles (replace with your constants)
// const role = {
//   superAdmin: "SUPER_ADMIN",
//   user: "USER",
// };

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/blogs", label: "Blogs", role: "PUBLIC" },
  { href: "/projects", label: "Projects", role: "PUBLIC" },
  // { href: "/dashboard", label: "Dashboard", role: "PUBLIC" },
  { href: "/dashboard", label: "Dashboard", role: "SUPER_ADMIN" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated, isSuperAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitial = (name: string) => name.charAt(0).toUpperCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const publicLinks = navigationLinks.filter((l) => l.role === "PUBLIC");
  const superAdminLinks = navigationLinks.filter(
    (l) => l.role === "SUPER_ADMIN" && isSuperAdmin
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4 relative">
        {/* Left side */}
        <div className="flex items-center gap-6">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 lg:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 6H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 lg:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks
                    .filter(
                      (link) =>
                        link.role === "PUBLIC" ||
                        (link.role === "SUPER_ADMIN" && isSuperAdmin)
                    )
                    .map((link) => (
                      <NavigationMenuItem key={link.href} className="w-full">
                        <NavigationMenuLink asChild className="w-full">
                          <Link
                            href={link.href}
                            className={`flex items-center gap-3 py-2 px-3 rounded-md transition-colors
                              ${
                                pathname === link.href
                                  ? "bg-primary/10 border-primary font-semibold text-primary"
                                  : "text-muted-foreground hover:bg-accent/10"
                              }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <Link href="/" className="text-primary hover:text-primary/90">
            <span className="inline-flex items-center gap-2">
              <Image
                src="https://i.ibb.co.com/qYC6YkKw/logo-12.png"
                alt="GitHub"
                className="w-5 h-5"
                width={20}
                height={20}
              />
              <span className="hidden sm:inline text-base font-semibold text-foreground">
                Raufur Islam
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="gap-2">
            {[...publicLinks, ...superAdminLinks].map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className="py-1.5 font-medium transition-colors"
                >
                  <Link
                    href={link.href}
                    className={`relative 
                      ${
                        pathname === link.href
                          ? "text-foreground font-semibold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {isAuthenticated && user ? (
            <TooltipProvider>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full p-0 hover:bg-accent transition-colors"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                            {getUserInitial(user?.name || user?.email || "U")}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user?.name || user?.email}</p>
                  </TooltipContent>
                </Tooltip>

                <DropdownMenuContent className="w-80 p-4" align="end">
                  <div className="flex items-center gap-3 pb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                        {getUserInitial(user?.name || user?.email || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="py-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href="/settings">Account</Link>
                    </Button>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
