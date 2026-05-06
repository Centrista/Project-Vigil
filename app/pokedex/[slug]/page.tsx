import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import PokemonStandalone from "@/components/pokedex/PokemonStandalone";
import {
  getPokedexEntryBySlug,
  getPokedexRelatedEntry,
  POKEDEX_ENTRIES,
} from "@/lib/pokedex";
import { assertPokedexCatalog } from "@/lib/pokedex.server";

export async function generateStaticParams() {
  return POKEDEX_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPokedexEntryBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.name} — Scam Pokédex`,
    description: entry.description,
  };
}

export default async function PokedexEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  assertPokedexCatalog();

  const { slug } = await params;
  const entry = getPokedexEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const relatedEntry = getPokedexRelatedEntry(entry);

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid-soft">
        <div
          className="orb absolute -top-24 left-0 h-[320px] w-[320px] opacity-[0.12]"
          style={{ backgroundColor: "#ff6d00" }}
        />

        <div className="page-frame page-frame-narrow relative z-10 pb-8">
          <PageIntro
            eyebrow="Standalone Card"
            title={entry.name}
            description={entry.scamLabel}
            stats={[
              { label: `#${String(entry.number).padStart(3, "0")}`, tone: "default" },
              { label: entry.type, tone: "danger" },
            ]}
            className="fade-up"
          />
        </div>
      </section>

      <div className="page-section">
        <div className="page-frame page-frame-narrow pt-6">
          <PokemonStandalone entry={entry} relatedEntry={relatedEntry} />
        </div>
      </div>
    </div>
  );
}
