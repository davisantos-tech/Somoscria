"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// Rede de partículas — pontinhos que flutuam devagar e se conectam com
// linhas finas quando ficam perto, reagindo sutilmente ao mouse. Efeito
// clássico de site institucional de tech, feito à mão em canvas (sem lib
// externa) pra ficar leve: poucas partículas, pausa quando a aba não está
// visível, para de rodar se o navegador prefere menos movimento.
export default function ParticleField({
  className = "",
  density = 0.00008,
  maxParticles = 70,
  linkDistance = 130,
}: {
  className?: string;
  density?: number;
  maxParticles?: number;
  linkDistance?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let running = true;

    // Cor do traço/ponto varia com o tema — lê a variável CSS já definida
    // em globals.css em vez de fixar uma cor (funciona em claro e escuro).
    function readColor() {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue("--foreground").trim() || "#171310";
    }
    let color = readColor();

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round(width * height * density), maxParticles);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Empurrão bem sutil na direção oposta ao cursor, só quando perto.
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distM = Math.hypot(dxm, dym);
        if (distM < 90) {
          p.x += (dxm / distM) * 0.6;
          p.y += (dym / distM) * 0.6;
        }
      }

      ctx!.fillStyle = color;
      for (const p of particles) {
        ctx!.globalAlpha = 0.35;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.strokeStyle = color;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            ctx!.globalAlpha = (1 - dist / linkDistance) * 0.15;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1;

      rafId = requestAnimationFrame(step);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouse = { x: -9999, y: -9999 };
    }

    function handleVisibility() {
      running = document.visibilityState === "visible";
      if (running) rafId = requestAnimationFrame(step);
      else cancelAnimationFrame(rafId);
    }

    // Recalcula a cor se o usuário trocar de tema (classe .dark no <html>).
    const themeObserver = new MutationObserver(() => {
      color = readColor();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    rafId = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
    };
  }, [density, maxParticles, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    />
  );
}
