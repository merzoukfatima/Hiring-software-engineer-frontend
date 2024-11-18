import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
// import { signIn } from "@/auth";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";

export function Header({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={clsx(
        "border-b border-gray-200", // Replace border-gray-200 with your custom Tailwind color
        className
      )}
      {...props}>
      <div className="flex justify-between items-center max-w-5xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <BookText />
        </Link>

        {/* Sign In Button */}
        <Link href="/login">
          <Button>
            <LogIn />
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}
