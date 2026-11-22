# Állapotjelentés – Kalkulus (látványos tananyag)

**Aktuális verzió:** `v0.25.0`  
**Dátum:** 2026-11-22  
**Összesített haladás:** **22 / 120 szakasz kész** (18,3%) — az I. kötet 1., 2. és 3. fejezete teljes.

## Haladás kötetenként és fejezetenként

| Kötet | Fejezet | Elkészült szakaszok | Állapot |
|---|---|---|---|
| **I. kötet** | 1. Bevezetés | 7 / 7 (`1.1`–`1.7`) | **Kész** |
| **I. kötet** | 2. Határérték és folytonosság | 7 / 7 (`2.1`–`2.7`) | **Kész** |
| **I. kötet** | 3. Differenciálás | 8 / 8 (`3.1`–`3.8`) | **Kész** |
| **I. kötet** | 4. A derivált alkalmazásai | 0 / 8 | Következő (`4.1`) |
| **II. kötet** | 5–9. fejezet | 0 / 34 | Tervezett |
| **III. kötet** | 10–16. fejezet | 0 / 56 | Tervezett |

## Legutóbbi mérföldkövek (`v0.21.0` – `v0.25.0`)

- **`3.4` (`v0.21.0`):** A trigonometrikus függvények deriváltja — 7 oldal, 4 ábra (`Widgets34.tsx`), 19 megoldott feladat.
- **`3.5` (`v0.22.0`):** A láncszabály. Paraméteres egyenletek — 8 oldal, 5 ábra (`Widgets35.tsx`), 21 megoldott feladat.
- **`3.6` (`v0.23.0`):** Implicit függvény deriváltja — 7 oldal, 5 ábra (`Widgets36.tsx`), 19 megoldott feladat.
- **`3.7` (`v0.24.0`):** Kapcsolt deriváltak — 7 oldal, 4 ábra (`Widgets37.tsx`), 19 megoldott feladat.
- **`3.8` (`v0.25.0`):** Linearizáció és differenciálok — 7 oldal, 5 ábra (`Widgets38.tsx`), 19 megoldott feladat. *(A 3. fejezet ezzel teljes.)*

## Technikai állapot

- **Build:** `npm run build` (`tsc --noEmit && vite build && node scripts/finish.mjs`) hibamentes.
- **Kimenet:** önálló `index.html` és `docs/index.html` (beágyazott KaTeX-betűkkel).
- **Forrásmunka:** a háromkötetes *Thomas-féle Kalkulus* PDF-ek lokálisan elérhetők (`.gitignore` védi őket a commitolástól); a tananyag a könyv tematikáját követi, saját szövegekkel, ábrákkal és feladatokkal.

## Következő lépések és irányelvek

1. Gazdagabb magyarázó SVG-ábrák és interaktív diagramok az elméleti részekben is.
2. Rugalmas oldalszám (a tananyag terjedelméhez igazodva).
3. Szakaszvégi lépcsőzetes gyakorlóblokk: 3 könnyebb + 3 közepes + 3 nehezebb feladat megoldással.
4. Következő modul: **4.1 Függvény szélsőértékei** (4. fejezet: A derivált alkalmazásai).
