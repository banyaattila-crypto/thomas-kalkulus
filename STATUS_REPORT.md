# Állapotjelentés – Kalkulus (látványos tananyag)

**Aktuális verzió:** `v1.1.0`  
**Dátum:** 2026-11-23  
**Összesített haladás:** **31 / 120 szakasz kész** (25,8%) — az I. kötet teljes (30/30), a II. kötetben `5.1` kész.

## Haladás kötetenként és fejezetenként

| Kötet | Fejezet | Elkészült szakaszok | Állapot |
|---|---|---|---|
| **I. kötet** | 1. Bevezetés | 7 / 7 (`1.1`–`1.7`) | **Kész** |
| **I. kötet** | 2. Határérték és folytonosság | 7 / 7 (`2.1`–`2.7`) | **Kész** |
| **I. kötet** | 3. Differenciálás | 8 / 8 (`3.1`–`3.8`) | **Kész** |
| **I. kötet** | 4. A derivált alkalmazásai | 8 / 8 (`4.1`–`4.8`) | **Kész** *(I. kötet teljes!)* |
| **II. kötet** | 5. Integrálszámítás | 1 / 6 (`5.1`) | Folyamatban (következő: `5.2`) |
| **II. kötet** | 6–9. fejezet | 0 / 28 | Tervezett |
| **III. kötet** | 10–16. fejezet | 0 / 56 | Tervezett |

## Legutóbbi mérföldkövek (`v0.21.0` – `v0.25.0`)

- **`3.4` (`v0.21.0`):** A trigonometrikus függvények deriváltja — 7 oldal, 4 ábra (`Widgets34.tsx`), 19 megoldott feladat.
- **`3.5` (`v0.22.0`):** A láncszabály. Paraméteres egyenletek — 8 oldal, 5 ábra (`Widgets35.tsx`), 21 megoldott feladat.
- **`3.6` (`v0.23.0`):** Implicit függvény deriváltja — 7 oldal, 5 ábra (`Widgets36.tsx`), 19 megoldott feladat.
- **`3.7` (`v0.24.0`):** Kapcsolt deriváltak — 7 oldal, 4 ábra (`Widgets37.tsx`), 19 megoldott feladat.
- **`3.8` (`v0.25.0`):** Linearizáció és differenciálok — 7 oldal, 5 ábra (`Widgets38.tsx`), 19 megoldott feladat. *(A 3. fejezet ezzel teljes.)*
- **`v0.26.0`:** Szakaszonkénti code-splitting + automatikus GitHub Pages deploy (`.github/workflows/deploy.yml`).
- **`4.1` (`v0.27.0`):** Függvény szélsőértékei — 7 oldal, 5 ábra (`Widgets41.tsx`), 19 megoldott feladat.
- **`4.2` (`v0.28.0`):** A Lagrange-féle középértéktétel — 7 oldal, 5 ábra (`Widgets42.tsx`), 19 megoldott feladat.
- **`4.3` (`v0.29.0`):** Monoton függvények és az első derivált teszt — 7 oldal, 5 ábra (`Widgets43.tsx`), 19 megoldott feladat.
- **`4.4` (`v0.30.0`):** Konvexitás és a függvénygörbe felrajzolása — 10 oldal, 6 ábra (`Widgets44.tsx`), 25 megoldott feladat (elmélyített elmélettel és két kidolgozott nagypéldával).
- **`4.5` (`v0.31.0`):** Alkalmazott optimalizációs problémák — 8 oldal, 6 ábra (`Widgets45.tsx`), 21 megoldott feladat.
- **`4.6` (`v0.32.0`):** Határozatlan alakok és a L’Hospital-szabály — 7 oldal, 5 ábra (`Widgets46.tsx`), 19 megoldott feladat.
- **`4.7` (`v0.33.0`):** A Newton-módszer — 7 oldal, 5 ábra (`Widgets47.tsx`), 19 megoldott feladat.
- **`4.8` (`v1.0.0`):** Primitív függvények — 8 oldal, 5 ábra (`Widgets48.tsx`), 21 megoldott feladat. *(A 4. fejezet és a teljes I. kötet ezzel elkészült!)*
- **`5.1` (`v1.1.0`):** Közelítés véges összegekkel — 7 oldal, 5 ábra (`Widgets51.tsx`), 19 megoldott feladat. *(A II. kötet nyitószakasza.)*

## Technikai állapot

- **Build:** `npm run build` (`tsc --noEmit && vite build`) hibamentes; szakaszonkénti code-splitting a `dist/` mappába (opcionális offline egyfájlos build: `npm run build:single`).
- **Deploy:** automatikus GitHub Pages publikálás (`.github/workflows/deploy.yml`).
- **Forrásmunka:** a háromkötetes *Thomas-féle Kalkulus* PDF-ek lokálisan elérhetők (`.gitignore` védi őket a commitolástól); a tananyag a könyv tematikáját követi, saját szövegekkel, ábrákkal és feladatokkal.

## Következő lépések és irányelvek

1. Gazdagabb magyarázó SVG-ábrák és interaktív diagramok az elméleti részekben is.
2. Rugalmas oldalszám (a tananyag terjedelméhez igazodva).
3. Szakaszvégi lépcsőzetes gyakorlóblokk: 3 könnyebb + 3 közepes + 3 nehezebb feladat megoldással.
4. Következő modul: **5.2 A véges összegek határértéke és a szumma jel**.
