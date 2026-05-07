"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const conformedTo = useRef<Element | null>(null);

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
    let dirty = false;

    const show = () => {
      if (!visible) {
        visible = true;
        dotRef.current  && (dotRef.current.style.opacity  = "1");
        ringRef.current && (ringRef.current.style.opacity = "1");
        glowRef.current && (glowRef.current.style.opacity = "1");
      }
    };

    const conformRing = (el: Element) => {
      const ring = ringRef.current;
      if (!ring) return;
      const r = el.getBoundingClientRect();
      ring.style.transition =
        "width 180ms ease, height 180ms ease, margin 180ms ease, border-radius 180ms ease, opacity 0.25s ease";
      ring.style.width        = `${r.width}px`;
      ring.style.height       = `${r.height}px`;
      ring.style.marginLeft   = `${-r.width  / 2}px`;
      ring.style.marginTop    = `${-r.height / 2}px`;
      ring.style.borderRadius = "14px";
      // lock lerp target to element centre
      rx = r.left + r.width  / 2;
      ry = r.top  + r.height / 2;
    };

    const resetRing = () => {
      const ring = ringRef.current;
      if (!ring) return;
      ring.style.transition =
        "width 180ms ease, height 180ms ease, margin 180ms ease, border-radius 180ms ease, opacity 0.25s ease";
      ring.style.width        = "36px";
      ring.style.height       = "36px";
      ring.style.marginLeft   = "-18px";
      ring.style.marginTop    = "-18px";
      ring.style.borderRadius = "50%";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();

      dirty = true;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${mx}px,${my}px,0)`;

      const navLink = (e.target as Element).closest(".nav-link");
      if (navLink) {
        if (conformedTo.current !== navLink) {
          conformedTo.current = navLink;
          conformRing(navLink);
        } else {
          // keep ring centred as element may scroll/resize
          const r = navLink.getBoundingClientRect();
          rx = r.left + r.width  / 2;
          ry = r.top  + r.height / 2;
        }
      } else if (conformedTo.current) {
        conformedTo.current = null;
        resetRing();
      }
    };

    const onLeave = () => {
      dotRef.current  && (dotRef.current.style.opacity  = "0");
      ringRef.current && (ringRef.current.style.opacity = "0");
      glowRef.current && (glowRef.current.style.opacity = "0");
      visible = false;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const EPS = 0.08;
    const tick = () => {
      if (dirty || Math.abs(rx - mx) > EPS || Math.abs(ry - my) > EPS) {
        dirty = false;
        if (!conformedTo.current) {
          rx = lerp(rx, mx, 0.2);
          ry = lerp(ry, my, 0.2);
        }
        if (ringRef.current)
          ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave, { passive: true });
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
      {/* ambient spotlight */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          ...base,
          width: 320,
          height: 320,
          marginLeft: -160,
          marginTop: -160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.045) 0%, transparent 70%)",
          zIndex: 9997,
        }}
      />

      {/* lagging morphing ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          ...base,
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.52)",
          boxShadow:
            "0 0 10px rgba(255,255,255,0.14), 0 0 22px rgba(0,212,255,0.12), inset 0 0 8px rgba(255,255,255,0.04)",
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
          background: "rgba(255,255,255,0.95)",
          boxShadow:
            "0 0 8px rgba(255,255,255,0.7), 0 0 18px rgba(255,255,255,0.35)",
          zIndex: 9999,
        }}
      />
    </>
  );
}
