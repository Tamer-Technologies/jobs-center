import { appNavData } from "@/constants/pagesContent/global";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentPropsWithRef } from "react";

const AppNav = ({ className, ...props }: ComponentPropsWithRef<"header">) => {
  return (
    <header className={cn("p-5 border-b bg-background", className)} {...props}>
      <nav className="container flex justify-center gap-25 mx-auto">
        {appNavData.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="hover:bg-transparent hover:text-primary transform duration-150"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default AppNav;
