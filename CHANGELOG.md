# Változásnapló

A verziószámozás a [Szemantikus Verziózás 2.0.0](https://semver.org/lang/hu/) szerint történik (MAJOR.MINOR.PATCH).
Amíg a három kötet nincs végigvíve, a MAJOR 0. A tartalmi modulok és új funkciók MINOR, a hibajavítások PATCH emelést adnak.
Az 1.0.0 az I. kötet teljes anyagával jelenik meg.

## [0.18.0] - 2026-11-22

### Hozzáadva
- 3.1 A deriváltfüggvény (6 oldal, 4 interaktív ábra, 15 feladat megoldással): a deriváltfüggvény fogalma és két ekvivalens alakja (h → 0 és z → x), Newton- és Leibniz-jelölések, deriválás definícióból lépésről lépésre (polinom, tört, négyzetgyök), a derivált grafikonjának leolvasása (szinkronizált kettős grafikon és töröttvonal), féloldali deriváltak és a nem differenciálhatóság 4 oka, differenciálhatóság ⇒ folytonosság bizonyítással, Darboux tétele, összefoglalás és gyakori hibák.

## [0.17.0] - 2026-11-22

### Hozzáadva
- 2.7 Érintő és derivált (6 oldal, 4 interaktív ábra, 15 feladat megoldással): dinamikus érintőfogalom és tévhitek cáfolata, görbe meredeksége és érintő egyenlete, differenciahányados, pillanatnyi változási sebesség és pontbeli derivált, függőleges érintők és nem létező érintők (tüske, töréspont, oszcilláció), az érem öt oldala, valamint a 2. fejezet összefoglalása.
- A 2. fejezet (Határérték és folytonosság) ezzel teljes.

## [0.16.0] - 2026-11-22

### Hozzáadva
- 2.6 Folytonosság (6 oldal, 5 interaktív ábra, 15 feladat megoldással): pontbeli folytonosság és a hármas feltétel (belső pont és végpontok), a szakadási helyek katalógusa (megszüntethető, ugrás, végtelen, oszcilláló), folytonos függvények algebrai műveletei és kompozíciója, folytonos kiterjesztés, a Bolzano-tétel és a felező zérushelykeresés, összefoglalás és gyakori hibák.

## [0.15.0] - 2026-11-22

### Hozzáadva
- 2.5 Végtelen határértékek és függőleges aszimptoták (6 oldal, 5 interaktív ábra, 15 feladat megoldással): féloldali és kétoldali végtelen határértékek, racionális függvények a nevező zérushelyei közelében (lyuk vs. pólus), a végtelen határérték precíz (B–δ) definíciója, függőleges aszimptoták (racionális és trigonometrikus görbék), domináns tagok (közeli és távoli viselkedés, polinomok nagy léptékben), összefoglalás és gyakori hibák.

## [0.14.0] - 2026-11-22

### Hozzáadva
- 2.4 Jobb és bal oldali határérték. Határérték a végtelenben (6 oldal, 5 interaktív ábra, 15 feladat megoldással): jobb és bal oldali határértékek és a kétoldali határértékkel való kapcsolat, féloldali ε–δ definíció, a (sin θ)/θ nevezetes határérték geometriai szendvicsbizonyítása és alkalmazásai, véges határérték a végtelenben (ε–M és ε–N definíció), racionális függvények, vízszintes és ferde aszimptoták, összefoglalás és gyakori hibák.

## [0.13.0] - 2026-11-21

### Hozzáadva
- 2.3 A határérték precíz definíciója (6 oldal, 4 interaktív ábra, 15 feladat megoldással): hibahatár-játék (ε–δ), a definíció és a 0 < |x − x₀| szerepe, a δ megkeresése két lépésben, pontos és biztonságos δ nem lineáris függvényeknél, az összegszabály és az egyenlőtlenség-megőrzés bizonyítása a definícióból, összefoglalás és gyakori hibák.
- Kötetközi számoló segédfüggvények (firstBad, maxDelta) az ε–δ ábrákhoz.

## [0.12.0] - 2026-11-21

### Módosítva
- A bal oldali tartalomjegyzék (oldalsáv) újratervezése: haladáskártya a tetején (kattintásra a teljes tartalomjegyzék), kötetfejlécek római számmal és haladásszámlálóval, fejezetek színes jelvénnyel, szakaszszámlálóval és nyíllal.
- A szakaszlista időtengelyes: a kész szakaszok színes ponttal, az aktuális kiemelt, pulzáló ponttal; a készülők halványak.
- A jelenlegi fejezet automatikusan nyitva, színes bal szegéllyel.

## [0.11.1] - 2026-11-21

### Javítva
- A gradiens címekben (tartalomjegyzék, szakaszcímek) a betűk lelógó részei (j, gy, p) levágódtak; a sormagasság és a belső alsó térköz növelve.

## [0.11.0] - 2026-11-21

### Módosítva
- A tartalomjegyzék teljes újratervezése: animált nyitóblokk (önmagát megrajzoló görbe, rajta futó érintő), haladásgyűrű és statisztika, „Folytatás" gomb.
- Kötetfejlécek nagy számmal és haladássávval; fejezetkártyák saját színnel, fejezetenkénti animált emblémával (hoverre újrarajzolódik), szakaszonkénti haladásjelzővel.
- Szakaszlista időtengelyként: a kész szakaszok pulzáló ponttal és oldalszámmal, a készülők üres ponttal.
- „Csak a kész szakaszok" szűrő; lépcsőzetes belépő animáció; a mozgáscsökkentés beállítás figyelembevétele.

## [0.10.0] – 2026-11-21
### Új
- 2.2 Határértékek kiszámítása (6 oldal, 14 feladat): határérték és alapműveletek, polinomok és racionális törtfüggvények, a nullává váló nevező kiküszöbölése (szorzattá bontás, konjugált, közös nevező), szendvicstétel, egyenlőtlenségek és a szabályok határai, módszerválasztás. Hat új interaktív ábra.

## [0.9.0] – 2026-11-21
### Új
- 2.1 Változási sebesség, a határérték szemléletes fogalma (6 oldal, 11 feladat): átlagos változási sebesség és szelő, pillanatnyi sebesség és érintő, a határérték szemléletes fogalma, határérték és függvényérték, nem létező határérték, géppel való becslés csapdái. Hat új interaktív ábra.

## [0.8.0] – 2026-11-21
### Új
- 1.7 Grafikus módszerek (6 oldal, 9 feladat): ablak és mintavétel, négyzetes ablak, hamis függőleges vonalak a pólusoknál, gyors oszcilláció, hiányzó ág törtkitevős hatványnál, regresszió és az extrapoláció veszélye. Hat új interaktív ábra.
- Az 1. fejezet ezzel teljes.

## [0.7.0] – 2026-11-21
- Új: 1.6. Trigonometrikus függvények (6 oldal, 6 interaktív eszköz, 9 feladat megoldással): radián, egységkör és a hat szögfüggvény, periodicitás és grafikonok, általános szinuszgörbe, azonosságok (levezetéssel), koszinusztétel.

## [0.6.0] – 2026-11-21
- Új: 1.5. Műveletek függvényekkel és függvénytranszformációk (6 oldal, 5 interaktív eszköz, 8 feladat megoldással): függvények számtana, összetett függvények, eltolás, méretezés és tükrözés, a transzformációk sorrendje, ellipszis.

## [0.5.1] – 2026-11-21
- Javítás: a verziószám a tartalomjegyzék nézetben, keskeny képernyőn (telefon) is látszik a fejlécben.
- Módosítás: az Előző/Következő gombok új, konzervatív acélkék 3D kivitelt kaptak vékony arany szegéllyel, lenyomódó állapottal.

## [0.5.0] – 2026-11-21
- Új: 1.4. Alapvető függvénytípusok és matematikai modellek (6 oldal, 7 interaktív eszköz, 8 feladat megoldással).
- Javítás: az előző/következő gomb lila színátmenete kékre cserélve.

## [0.4.0] – 2026-11-21
- Új: 1.3. Függvények és grafikonok (6 oldal, 5 interaktív eszköz, 8 feladat megoldással).

## [0.3.0] – 2026-11-21
- Új: animált nyitóoldal (borító) és egységes, tervezett tartalomjegyzék-oldal kötetenkénti haladásjelzéssel.
- Új: verziószám a nyitóoldalon és a láblécben.
- Változás: új, visszafogottabb színvilág (grafitkék háttér, ciánkék és borostyán kiemelések).

## [0.2.0] – 2026-11-21
- Új: 1.2. Egyenesek, körök és parabolák (8 oldal, 6 interaktív ábra, 8 feladat).

## [0.1.0] – 2026-11-20
- Első kiadás: 1.1. A valós számok és a valós számegyenes (7 oldal, 4 interaktív eszköz, 6 feladat).
