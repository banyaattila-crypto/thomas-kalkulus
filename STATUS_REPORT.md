# Állapotjelentés – Kalkulus (látványos tananyag)

**Aktuális verzió:** `v0.21.0`  
**Dátum:** 2026-11-22  
**Összesített haladás:** **18 / 120 szakasz kész** (15,0%) — az I. kötet 1. és 2. fejezete teljes, a 3. fejezetben `3.1`–`3.4` kész.

## Haladás kötetenként és fejezetenként

| Kötet | Fejezet | Elkészült szakaszok | Állapot |
|---|---|---|---|
| **I. kötet** | 1. Bevezetés | 7 / 7 (`1.1`–`1.7`) | **Kész** |
| **I. kötet** | 2. Határérték és folytonosság | 7 / 7 (`2.1`–`2.7`) | **Kész** |
| **I. kötet** | 3. Differenciálás | 4 / 8 (`3.1`–`3.4`) | Folyamatban (következő: `3.5`) |
| **I. kötet** | 4. A derivált alkalmazásai | 0 / 8 | Tervezett |
| **II. kötet** | 5–9. fejezet | 0 / 34 | Tervezett |
| **III. kötet** | 10–16. fejezet | 0 / 56 | Tervezett |

## Legutóbbi mérföldkövek (`v0.14.0` – `v0.18.0`)

- **`2.4` (`v0.14.0`):** Jobb és bal oldali határérték. Határérték a végtelenben — 6 oldal, 5 interaktív ábra (`Widgets24.tsx`), 15 megoldott feladat.
- **`2.5` (`v0.15.0`):** Végtelen határértékek és függőleges aszimptoták — 6 oldal, 5 interaktív ábra (`Widgets25.tsx`), 15 megoldott feladat.
- **`2.6` (`v0.16.0`):** Folytonosság — 6 oldal, 5 interaktív ábra (`Widgets26.tsx`), 15 megoldott feladat.
- **`2.7` (`v0.17.0`):** Érintő és derivált — 6 oldal, 4 interaktív ábra (`Widgets27.tsx`), 15 megoldott feladat. *(A 2. fejezet ezzel teljes.)*
- **`3.1` (`v0.18.0`):** A deriváltfüggvény — 6 oldal, 4 interaktív ábra (`Widgets31.tsx`), 15 megoldott feladat.

## Technikai állapot

- **Build:** `npm run build` (`tsc --noEmit && vite build && node scripts/finish.mjs`) hibamentes.
- **Kimenet:** önálló `index.html` és `docs/index.html` (~2367 kB, beágyazott KaTeX-betűkkel).
- **Forrásmunka:** a háromkötetes *Thomas-féle Kalkulus* PDF-ek lokálisan elérhetők (`.gitignore` védi őket a commitolástól); a tananyag a könyv tematikáját követi, saját szövegekkel, ábrákkal és feladatokkal.

## Következő lépések és irányelvek (`3.2`-től)

1. Gazdagabb magyarázó SVG-ábrák és vizuális diagramok az elméleti részekben is.
2. Rugalmas oldalszám (a tananyag terjedelméhez igazodva, nem kötelező 6–7 oldalra szorítani).
3. Szakaszvégi lépcsőzetes gyakorlóblokk: 3 könnyebb + 3 közepes + 3 nehezebb feladat megoldással.
4. Következő modul: **3.2 Deriválási szabályok**.
