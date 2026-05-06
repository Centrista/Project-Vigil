import "server-only";

import fs from "node:fs";
import path from "node:path";
import { POKEDEX_ENTRIES } from "@/lib/pokedex";

let hasValidatedPokedex = false;

export function assertPokedexCatalog() {
  if (hasValidatedPokedex) {
    return;
  }

  if (POKEDEX_ENTRIES.length !== 9) {
    throw new Error(`Expected 9 Pokedex entries, found ${POKEDEX_ENTRIES.length}.`);
  }

  const ids = new Set<number>();
  const numbers = new Set<number>();
  const slugs = new Set<string>();
  const validIds = new Set(POKEDEX_ENTRIES.map((entry) => entry.id));

  for (const entry of POKEDEX_ENTRIES) {
    if (ids.has(entry.id)) {
      throw new Error(`Duplicate Pokedex id detected: ${entry.id}`);
    }

    if (numbers.has(entry.number)) {
      throw new Error(`Duplicate Pokedex number detected: ${entry.number}`);
    }

    if (slugs.has(entry.slug)) {
      throw new Error(`Duplicate Pokedex slug detected: ${entry.slug}`);
    }

    ids.add(entry.id);
    numbers.add(entry.number);
    slugs.add(entry.slug);

    if (entry.relatedScamId && !validIds.has(entry.relatedScamId)) {
      throw new Error(
        `Invalid relatedScamId ${entry.relatedScamId} on entry ${entry.slug}.`,
      );
    }

    const imagePath = path.join(process.cwd(), "public", "images", "pokedex", entry.image);

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Missing Pokedex image asset: ${imagePath}`);
    }
  }

  hasValidatedPokedex = true;
}
