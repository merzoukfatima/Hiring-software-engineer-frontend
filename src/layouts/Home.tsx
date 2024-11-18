import clsx from "clsx";
import { ComponentProps } from "react";
import { Header } from "@/components/Header";

export function HomeLayout({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={clsx(className, "flex flex-col min-h-screen")} {...props}>
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
