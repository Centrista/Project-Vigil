"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import PokemonRarityStars from "@/components/pokedex/PokemonRarityStars";
import { playWhooshSound } from "@/lib/sounds";
import type { PokemonScam } from "@/lib/pokedex";
import { POKEDEX_TYPE_META } from "@/lib/pokedex";

const SECTION_META = [
  { icon: "🔥", label: "Strengths", color: "#ff1744" },
  { icon: "🛡️", label: "Weaknesses", color: "#00d4ff" },
  { icon: "📍", label: "Habitat", color: "#ff6d00" },
  { icon: "📖", label: "Description", color: "#ffffff" },
];

function Section({
  title,
  accentColor,
  children,
  delay,
}: {
  title: string;
  accentColor: string;
  children: ReactNode;
  delay: string;
}) {
  return (
    <section
      className="pokedex-section-card pokedex-section-cascade"
      style={{ "--cascade-delay": delay, borderLeft: `3px solid ${accentColor}80` } as CSSProperties}
    >
      <div className="pokedex-section-title-row">
        <span className="pokedex-section-title-accent" style={{ background: `${accentColor}22`, borderColor: `${accentColor}40` }} />
        <h3 className="mono-label pokedex-section-title" style={{ color: accentColor }}>
          {title}
        </h3>
      </div>
      <div className="pokedex-section-content">{children}</div>
    </section>
  );
}

export default function PokemonDetailPanel({
  entry,
  relatedEntry,
  isLearned,
  onToggleLearned,
  onShare,
  shareFeedback,
  primaryHref,
  primaryLabel,
  relatedHref,
  onOpenRelated,
  variant = "modal",
}: {
  entry: PokemonScam;
  relatedEntry?: PokemonScam;
  isLearned: boolean;
  onToggleLearned?: () => void;
  onShare: () => void;
  shareFeedback?: string | null;
  primaryHref: string;
  primaryLabel: string;
  relatedHref?: string;
  onOpenRelated?: () => void;
  variant?: "modal" | "standalone";
}) {
  const [threatReady, setThreatReady] = useState(false);
  const typeMeta = POKEDEX_TYPE_META[entry.type];
  const threatPercent = `${entry.threatLevel * 20}%`;

  useEffect(() => {
    setThreatReady(false);
    const timer = window.setTimeout(() => {
      setThreatReady(true);
      // Play smoosh sound for high threat levels
      if (entry.threatLevel >= 4) {
        try {
          playWhooshSound('smoosh');
        } catch (error) {
          // Silently ignore sound errors
        }
      }
    }, 90);

    return () => window.clearTimeout(timer);
  }, [entry.slug]);

  return (
    <article
      className={`pokedex-detail-panel ${
        variant === "standalone" ? "pokedex-detail-panel-standalone" : ""
      }`}
      style={
        {
          "--pokedex-accent": typeMeta.color,
          "--pokedex-glow": typeMeta.glow,
        } as CSSProperties
      }
    >
      <div className="pokedex-detail-noise" aria-hidden="true" />
      <div className="pokedex-detail-foil" aria-hidden="true" />

      <header className="pokedex-detail-header">
        <div className="pokedex-detail-meta">
          <span className="mono-label pokedex-detail-number">
            #{String(entry.number).padStart(3, "0")}
          </span>
          <span
            className="mono-label pokedex-detail-type"
            style={{
              color: typeMeta.color,
              background: typeMeta.badgeBackground,
              borderColor: `${typeMeta.color}50`,
            }}
          >
            {entry.type}
          </span>
        </div>
        <PokemonRarityStars rarity={entry.rarity} />
      </header>

      <div className="pokedex-detail-titlebar pokedex-section-cascade" style={{ "--cascade-delay": "0.02s" } as CSSProperties}>
        <div>
          <p className="mono-label pokedex-detail-scam-label">{entry.scamLabel}</p>
          <h2 className="pokedex-detail-name">{entry.name}</h2>
        </div>
        <div className="pokedex-detail-threat-chip">
          <span className="mono-label pokedex-detail-threat-label">TL</span>
          <span className="pokedex-detail-threat-value">{entry.threatLevel}</span>
        </div>
      </div>

      <div className="pokedex-detail-image-panel pokedex-section-cascade" style={{ "--cascade-delay": "0.05s" } as CSSProperties}>
        <div className="pokedex-detail-image-frame-top">
          <span className="mono-label">Illustration</span>
          <span className="mono-label">{entry.pokemonType.join(" / ")}</span>
        </div>
        <div className="pokedex-detail-image-glow" aria-hidden="true" />
        <div className="pokedex-detail-image-shimmer" aria-hidden="true" />
        <img
          src={`/images/pokedex/${entry.image}`}
          alt={entry.name}
          className="pokedex-detail-image"
        />
      </div>

      <div className="pokedex-detail-identity pokedex-section-cascade" style={{ "--cascade-delay": "0.12s" } as CSSProperties}>
        <p className="pokedex-detail-subline">{entry.pokemonType.join(" • ")}</p>
      </div>

      <div className="pokedex-threat-card pokedex-section-cascade" style={{ "--cascade-delay": "0.18s" } as CSSProperties}>
        <div className="pokedex-threat-heading">
          <span className="mono-label">Threat Level</span>
          <span className="mono-label">{entry.threatLevel}/5</span>
        </div>
        <div className="pokedex-threat-track">
          <div
            className={`pokedex-threat-fill ${threatReady ? "pokedex-threat-fill-ready" : ""} ${
              entry.threatLevel >= 4 ? "pokedex-threat-fill-high" : ""
            }`}
            style={
              {
                "--threat-width": threatPercent,
                "--threat-color": typeMeta.color,
              } as CSSProperties
            }
          />
        </div>
      </div>

      <div className="pokedex-section-rail pokedex-section-cascade" style={{ "--cascade-delay": "0.22s" } as CSSProperties}>
        {SECTION_META.map((item) => (
          <div
            key={item.label}
            className="pokedex-rail-pill"
            style={{ "--rail-accent": item.color } as CSSProperties}
          >
            <span className="mono-label pokedex-rail-text">{item.label}</span>
          </div>
        ))}
      </div>

      <Section title="STRENGTHS" accentColor="#ff1744" delay="0.28s">
        <ul className="pokedex-list">
          {entry.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      </Section>

      <Section title="WEAKNESSES" accentColor="#00d4ff" delay="0.34s">
        <ul className="pokedex-list">
          {entry.weaknesses.map((weakness) => (
            <li key={weakness}>{weakness}</li>
          ))}
        </ul>
      </Section>

      <Section title="HABITAT" accentColor="#ff6d00" delay="0.4s">
        <p>{entry.habitat}</p>
      </Section>

      <Section title="DESCRIPTION" accentColor="#ffffff" delay="0.46s">
        <p>{entry.description}</p>
      </Section>

      {entry.aiPowerup ? (
        <Section title="AI POWERUP" accentColor={typeMeta.color} delay="0.52s">
          <p>{entry.aiPowerup}</p>
        </Section>
      ) : null}

      <div className="pokedex-detail-actions pokedex-section-cascade" style={{ "--cascade-delay": "0.58s" } as CSSProperties}>
        <Link href={primaryHref} className="btn-red pokedex-detail-action-main">
          {primaryLabel}
        </Link>
        <button type="button" className="btn-ghost pokedex-detail-action-secondary" onClick={onShare}>
          Share to IG
        </button>
        {onToggleLearned ? (
          <button
            type="button"
            className={`btn-ghost pokedex-detail-action-secondary ${
              isLearned ? "pokedex-detail-action-learned" : ""
            }`}
            onClick={onToggleLearned}
          >
            {isLearned ? "Marked Learned" : "Mark Learned"}
          </button>
        ) : null}
      </div>

      <div className="pokedex-detail-footer pokedex-section-cascade" style={{ "--cascade-delay": "0.64s" } as CSSProperties}>
        <div className="pokedex-share-feedback" aria-live="polite">
          {shareFeedback ?? "Share the scam card or keep exploring the catalogue."}
        </div>
        {relatedEntry ? (
          onOpenRelated ? (
            <button type="button" className="link-inline" onClick={onOpenRelated}>
              {`← Related: ${relatedEntry.name}`}
            </button>
          ) : relatedHref ? (
            <Link href={relatedHref} className="link-inline">
              {`← Related: ${relatedEntry.name}`}
            </Link>
          ) : null
        ) : null}
      </div>
    </article>
  );
}
