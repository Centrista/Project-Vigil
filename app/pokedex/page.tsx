import PageIntro from "@/components/PageIntro";
import PokemonGrid from "@/components/pokedex/PokemonGrid";
import { POKEDEX_ENTRY_COUNT, POKEDEX_ENTRIES } from "@/lib/pokedex";
import { assertPokedexCatalog } from "@/lib/pokedex.server";

export const metadata = {
  title: "Scam Pokédex — Project Vigil",
  description:
    "Explore every scam card in the Project Vigil Pokédex, from Passal and Akmon to Peitho, with premium animations and exact source copy.",
};

export default function PokedexPage() {
  assertPokedexCatalog();

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid-soft">
        <div
          className="orb orb-drift absolute -top-32 left-0 h-[360px] w-[360px] opacity-[0.15]"
          style={{ backgroundColor: "#ff1744" }}
        />
        <div
          className="orb orb-drift absolute top-12 right-0 h-[420px] w-[420px] opacity-[0.11]"
          style={{ backgroundColor: "#00d4ff", animationDelay: "4s" }}
        />

        <div className="page-frame relative z-10 pb-10">
          <PageIntro
            eyebrow="Interactive Scam Field Guide"
            title={
              <>
                Premium Scam
                <br />
                <span className="gradient-text-red">Pokédex.</span>
              </>
            }
            description="Every card is powered by the PDF source, with exact scam copy, collectible styling, and a premium reveal flow built for exploration."
            className="fade-up"
          />
        </div>
      </section>

      <div className="page-section">
        <div className="page-frame pt-8">
          <PokemonGrid entries={POKEDEX_ENTRIES} />
        </div>
      </div>
    </div>
  );
}
