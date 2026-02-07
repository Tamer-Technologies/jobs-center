"use client";

import { Button } from "@/components/ui/button";
import { homePageContent } from "@/constants/pagesContent/homeContent";
import Link from "next/link";
import { ComponentRef, useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Home() {
  const titleRef = useRef<ComponentRef<"div">>(null);

  useEffect(() => {
    const typed = new Typed(titleRef.current, {
      strings: homePageContent.titles,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      loopCount: 4,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-14">
      <h1>
        <span className="sr-only">{homePageContent.titles[0]}</span>
        <span aria-hidden="true" ref={titleRef} />
      </h1>
      <p className="max-w-130 text-center">{homePageContent.description}</p>
      <Button className="inline-block" asChild>
        <Link href={homePageContent.cta.url}>{homePageContent.cta.label}</Link>
      </Button>
    </div>
  );
}
