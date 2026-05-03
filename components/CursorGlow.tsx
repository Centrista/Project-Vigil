"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsGlow =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsGlow) return;

    document.body.classList.add("cursor-glow-enabled");

    let mx = -999, my = -999;
    let rx = -999, ry = -999;
    let raf: number;
    let visible = false;

    const show = () => {
      if (!visible) {
        visible = true;
        dotRef.current  && (dotRef.current.style.opacity  = "1");
        ringRef.current && (ringRef.current.style.opacity = "1");
        glowRef.current && (glowRef.current.style.opacity = "1");
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${mx}px,${my}px)`;
    };

    const onLeave = () => {
      dotRef.current  && (dotRef.current.style.opacity  = "0");
      ringRef.current && (ringRef.current.style.opacity = "0");
      glowRef.current && (glowRef.current.style.opacity = "0");
      visible = false;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.13);
      ry = lerp(ry, my, 0.13);
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("cursor-glow-enabled");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    willChange: "transform",
    opacity: 0,
    transition: "opacity 0.25s ease",
  };

  return (
    <>
      {/* ambient glow */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          ...base,
          width: 550,
          height: 550,
          marginLeft: -275,
          marginTop: -275,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.07) 0%, rgba(0,212,255,0.025) 40%, transparent 70%)",
          zIndex: 9997,
        }}
      />

      {/* lagging outer ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          ...base,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.28)",
          zIndex: 9998,
        }}
      />

      {/* dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          ...base,
          width: 7,
          height: 7,
          marginLeft: -3.5,
          marginTop: -3.5,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.88)",
          zIndex: 9999,
        }}
      />
    </>
  );
}
