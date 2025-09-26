"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        }
      );
    }, element);
    return () => ctx.revert();
  }, []);

  return ref;
}

export default useGsapReveal;


