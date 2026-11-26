# Állapotjelentés – Kalkulus (látványos tananyag)

**Aktuális verzió:** `v2.54.0`  
**Dátum:** 2026-11-26  
**Összesített haladás:** **117 / 120 szakasz kész** (97,5%) — Az I. és II. kötet teljes (64/64), a III. kötetből a 10–15. fejezet teljes, a záró **16. fejezet** 5/8-a kész (`16.1`–`16.5`) — már csak **3 szakasz** van hátra!

## Haladás kötetenként és fejezetenként

| Kötet | Fejezet | Elkészült szakaszok | Állapot |
|---|---|---|---|
| **I. kötet** | 1. Bevezetés | 7 / 7 (`1.1`–`1.7`) | **Kész** |
| **I. kötet** | 2. Határérték és folytonosság | 7 / 7 (`2.1`–`2.7`) | **Kész** |
| **I. kötet** | 3. Differenciálás | 8 / 8 (`3.1`–`3.8`) | **Kész** |
| **I. kötet** | 4. A derivált alkalmazásai | 8 / 8 (`4.1`–`4.8`) | **Kész** *(I. kötet teljes!)* |
| **II. kötet** | 5. Integrálszámítás | 6 / 6 (`5.1`–`5.6`) | **Kész** |
| **II. kötet** | 6. A határozott integrál alkalmazásai | 7 / 7 (`6.1`–`6.7`) | **Kész** |
| **II. kötet** | 7. Transzcendens függvények | 8 / 8 (`7.1`–`7.8`) | **Kész** |
| **II. kötet** | 8. Integrálási technikák | 8 / 8 (`8.1`–`8.8`) | **Kész** |
| **II. kötet** | 9. Az integrálás további alkalmazásai | 5 / 5 (`9.1`–`9.5`) | **Kész** *(II. kötet teljes!)* |
| **III. kötet** | 10. Kúpszeletek és polárkoordináták | 8 / 8 (`10.1`–`10.8`) | **Kész** |
| **III. kötet** | 11. Végtelen sorozatok és sorok | 11 / 11 (`11.1`–`11.11`) | **Kész** |
| **III. kötet** | 12. Vektorok és a tér geometriája | 6 / 6 (`12.1`–`12.6`) | **Kész** |
| **III. kötet** | 13. Vektor értékű függvények, mozgás a térben | 6 / 6 (`13.1`–`13.6`) | **Kész** |
| **III. kötet** | 14. Parciális deriváltak | 10 / 10 (`14.1`–`14.10`) | **Kész** *(14. fejezet teljes!)* |
| **III. kötet** | 15. Többes integrálok | 7 / 7 (`15.1`–`15.7`) | **Kész** *(15. fejezet teljes!)* |
| **III. kötet** | 16. Integrálás vektormezőben | 5 / 8 (`16.1`–`16.5`) | **Folyamatban** |

## Legutóbbi mérföldkövek (`v2.1.0` – `v2.32.0`)

- **I. és II. kötet (`v0.1.0` – `v2.0.0`, 64 / 64 szakasz):** Teljes I. és II. kötet (`1.1`–`9.5`), plusz kombinált 3-kötetes animált Canvas-borító (`v2.0.1`).
- **10. fejezet (`v2.1.0` – `v2.8.0`, `10.1`–`10.8`):** Kúpszeletek és polárkoordináták — mind a 8 szakasz kész (8×8 oldal, 8×8 SVG widget, 8×23 feladat).
- **11. fejezet (`v2.9.0` – `v2.20.0`, `11.1`–`11.11`):** Végtelen sorozatok és sorok — mind a 11 szakasz kész (benne `11.8` = **80 / 120 = 66,7%** mérföldkő, `11.11` Fourier-sorok).
- **Modernizáció (`v2.20.1` – `v2.20.4`, `9960662`):** Interaktív multi-layer Canvas 2D `HeroCanvas` a főoldalon + az 1. fejezet (`1.2`–`1.7`) modernizálása `<Quiz />` és `<Steps />` komponensekkel.
- **12. fejezet (`v2.21.0` – `v2.26.0`, `12.1`–`12.6`):** Vektorok és a tér geometriája — mind a 6 szakasz kész (`12.1` = **84 / 120 = 70,0%** mérföldkő, 3D koordináták, vektorok, skalár- és vektoriális szorzat, egyenesek/síkok, hengerek és kvadrikok).
- **13. fejezet (`v2.27.0` – `v2.32.0`, `13.1`–`13.6`):** Vektor értékű függvények, mozgás a térben — mind a 6 szakasz kész (`13.1` = **90 / 120 = 75,0% háromnegyed mérföldkő!**, lövedék röppályája, ívhossz és $\mathbf{T}$, görbület és $\mathbf{N}$, torzió, $\mathbf{B}$ és gyorsulás-felbontás, Kepler törvényei és műholdpályák).
- **`14.1` (`v2.33.0`):** Többváltozós függvények — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets141.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(A 14. fejezet nyitószakasza — **96 / 120 = 80,0% mérföldkő!**)*
- **`14.2` (`v2.34.0`):** Határérték és folytonosság magasabb dimenzióban — 8 oldal, 8 interaktív ábra (`Widgets142.tsx`), `Quiz`/`Steps`, 23 megoldott feladat.
- **`14.3` (`v2.35.0`):** Parciális deriváltak — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets143.tsx`), `Quiz`/`Steps`, 23 megoldott feladat.
- **`14.4` (`v2.36.0`):** A láncszabály — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets144.tsx`), `Quiz`/`Steps`, 23 megoldott feladat.
- **`14.5` (`v2.37.0`):** Iránymenti deriváltak és gradiens vektor — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets145.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**100. elkészült szakasz mérföldkő: 100 / 120 = 83,3%**, a 14. fejezet fele kész!)*
- **`14.6` (`v2.38.0`):** Érintősíkok és differenciálok — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets146.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(Szintfelület és grafikon érintősíkja, $\nabla f\times\nabla g$ metszésgörbe-érintő, linearizáció, maradéktag-becslés, teljes differenciál, érzékenység és hibaterjedés.)*
- **`14.7` (`v2.39.0`):** Szélsőértékek és nyeregpontok — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets147.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**85,0%-os mérföldkő: 102 / 120!** Kritikus pontok, Hesse-determináns, $D=0$ és Peano-csapda, zárt tartományok Weierstrass-módszere, 3D doboz-optimalizálás, legkisebb négyzetek regresszió.)*
- **`14.8` (`v2.40.0`):** Lagrange-multiplikátorok — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets148.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(Ortogonális gradiens tétel, 2D/3D egy és két mellékfeltételes optimalizálás, árnyékár $df^*/dc=\lambda$, zárt tartományok, szinguláris $\nabla g = \mathbf{0}$ pontok.)*
- **`14.9` (`v2.41.0`):** Feltételes parciális deriváltak — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets149.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(Alsó index jelölés, behelyettesítés és totális differenciálos módszer, szabadsági fokok, polár-paradoxon, ciklikus szabály $= -1$, termodinamikai hőkapacitások és Mayer-reláció.)*
- **`14.10` (`v2.42.0`):** Kétváltozós Taylor-formula — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets1410.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**A 14. fejezet TELJES (10/10) és 87,5% = 105/120 hétnyolcad mérföldkő!** 1D szakasz-trükk, kvadratikus közelítés és Hesse-mátrix, Pascal-derivált operátor, 1D sorok szorzata, a Hesse-próba bizonyítása, hibabecslés, 2D Newton-módszer vs. gradiens ereszkedés, 14. fejezet nagy szintézise.)*
- **`15.1` (`v2.43.0`):** Kettős integrál — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets151.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(A 15. fejezet nyitószakasza! 3D Riemann-hasábok, Fubini-szeletelés, I./II. típusú tartományok, nyíl-módszer, sorrendcsere, térfogat és 2D átlagérték, szimmetria.)*
- **`15.2` (`v2.44.0`):** Terület, nyomaték, tömegközéppont — 8 oldal, 8 interaktív 2D ábra (`Widgets152.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(Terület kettős integrállal, változó sűrűségű lemezek, $M_x, M_y$, tömegközéppont és szimmetria, tehetetlenségi nyomatékok $I_x, I_y, I_0$, inerciálissugár, Steiner-tétel, Pappus-tétel és 2D valószínűségszámítás.)*
- **`15.3` (`v2.45.0`):** Kettős integrálás polárkoordinátákkal — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets153.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**90,0%-OS NAGY MÉRFÖLDKŐ: 108 / 120!** $dA = r\,dr\,d\theta$, sugárnyíl-módszer, derékszögű → polár átváltás, paraboloid és kifúrt gömb térfogata, eltolt körök, a Gauss-integrál $\int_{-\infty}^\infty e^{-x^2}\,dx=\sqrt{\pi}$, lendkerék-tehetetlenség.)*
- **`15.4` (`v2.46.0`):** Hármas integrál derékszögű koordináta-rendszerben — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets154.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(3D voxelek, Árnyék + Lándzsa módszer, $3!=6$ sorrend, $xz/yz$-vetítés, 3D sorrendcsere, 3D átlagérték, Steinmetz-test térfogata $\frac{16}{3}a^3$.)*
- **`15.5` (`v2.47.0`):** Tömeg és nyomaték három dimenzióban — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets155.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**110 / 120 = 91,7%!** 3D tömeg, $M_{yz}, M_{xz}, M_{xy}$, klasszikus 3D súlypontok, $I_x, I_y, I_z$, 3D Steiner-tétel, lejtő-verseny, bolygófizikai belső sűrűség-modell.)*
- **`15.6` (`v2.48.0`):** Hármas integrálok henger- és gömbi koordináta-rendszerben — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets156.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**111 / 120 = 92,5%!** Henger- és gömbi $dV$, fagylalttölcsér, koordináta-választó, gömb/gömbhéj $I_z$, szalvétagyűrű-paradoxon, 3D Gauss-integrál.)*
- **`15.7` (`v2.49.0`):** Helyettesítés többes integráloknál — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets157.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**A 15. fejezet TELJES (7/7), 112 / 120 = 93,3%!** 2D/3D Jacobi-determináns, reciprok szabály, ellipszoid térfogata és $I_z$, orientáció és trapéz-szimmetria.)*
- **`16.1` (`v2.50.0`):** Vonalintegrál — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets161.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**A 16. fejezet nyitószakasza, 113 / 120 = 94,2%!** 3D függöny, $ds=|\mathbf{v}|dt$, drót súlypontja és $I_z$, kör-szimmetria, irányfüggetlenség.)*
- **`16.2` (`v2.51.0`):** Vektormezők, cirkuláció, munka, áramlás — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets162.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**95,0% MÉRFÖLDKŐ: 114 / 120!** Vektormezők, munka $\int \mathbf{F}\cdot d\mathbf{r}$, cirkuláció $\oint M\,dx+N\,dy$, fluxus $\oint M\,dy-N\,dx$, 3D munka, pontforrás/örvény.)*
- **`16.3` (`v2.52.0`):** Útfüggetlenség, potenciálfüggvény, konzervatív vektormező — 8 oldal, 8 interaktív ábra (`Widgets163.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**115 / 120 = 95,8%!** Vonalintegrálok alaptétele, komponens-teszt, 3D potenciál-keresés, lyukas tartomány csapdája, egzakt differenciálformák, energiamegmaradás.)*
- **`16.4` (`v2.53.0`):** Green-tétel a síkban — 8 oldal, 8 interaktív ábra (`Widgets164.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**16. fejezet fele kész, 116 / 120 = 96,7%!** 2D div/rot, Green cirkulációs és fluxus-alakja, planiméter területképletek, lyukas tartományok és deformációs elv.)*
- **`16.5` (`v2.54.0`):** Felület felszíne és felületi integrál — 8 oldal, 8 interaktív 2D/3D ábra (`Widgets165.tsx`), `Quiz`/`Steps`, 23 megoldott feladat. *(**117 / 120 = 97,5%!** Implicit és grafikon felszín, skalár felületi integrál, 3D fluxus, Coulomb $4\pi$, gömbhéj súlypontja és $I_z$.)*

## Technikai állapot

- **Build:** `npm run build` (`tsc --noEmit && vite build`) hibamentes; szakaszonkénti code-splitting a `dist/` mappába (opcionális offline egyfájlos build: `npm run build:single`).
- **Deploy:** automatikus GitHub Pages publikálás (`.github/workflows/deploy.yml`).
- **Forrásmunka:** a háromkötetes *Thomas-féle Kalkulus* PDF-ek lokálisan elérhetők (`.gitignore` védi őket a commitolástól); a tananyag a könyv tematikáját követi, 100%-ban saját szövegekkel, ábrákkal és feladatokkal.

## Következő lépések és irányelvek

1. Gazdagabb magyarázó SVG-ábrák és interaktív 2D/3D diagramok minden új szakaszban (8 widget / szakasz).
2. `<Quiz />` önellenőrző tesztek és `<Steps />` lépésenkénti levezetések minden szakaszban.
3. Szakaszvégi lépcsőzetes gyakorlóblokk: 3 könnyebb + 3 közepes + 3 nehezebb feladat megoldással (összesen 23 feladat / szakasz).
4. Következő modul: **16.6 Paraméteresen adott felületek**.
