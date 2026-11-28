// A három kötet fejezet- és szakaszsorrendje (a tartalomjegyzék szerkezete).
export type Section = { id: string; title: string };
export type Chapter = { n: number; volume: 1 | 2 | 3; title: string; sections: Section[] };

const s = (ch: number, titles: string[]): Section[] =>
  titles.map((title, i) => ({ id: `${ch}.${i + 1}`, title }));

export const TOC: Chapter[] = [
  {
    n: 1, volume: 1, title: 'Bevezetés',
    sections: s(1, [
      'A valós számok és a valós számegyenes',
      'Egyenesek, körök és parabolák',
      'Függvények és grafikonok',
      'Alapvető függvénytípusok és matematikai modellek',
      'Műveletek függvényekkel és függvénytranszformációk',
      'Trigonometrikus függvények',
      'Grafikus módszerek',
    ]),
  },
  {
    n: 2, volume: 1, title: 'Határérték és folytonosság',
    sections: s(2, [
      'Változási sebesség, a határérték szemléletes fogalma',
      'Határértékek kiszámítása',
      'A határérték precíz definíciója',
      'Jobb és bal oldali határérték. Határérték a végtelenben',
      'Végtelen határértékek és függőleges aszimptoták',
      'Folytonosság',
      'Érintő és derivált',
    ]),
  },
  {
    n: 3, volume: 1, title: 'Differenciálás',
    sections: s(3, [
      'A deriváltfüggvény',
      'Deriválási szabályok',
      'A derivált mint változási sebesség',
      'A trigonometrikus függvények deriváltja',
      'A láncszabály. Paraméteres egyenletek',
      'Implicit függvény deriváltja',
      'Kapcsolt deriváltak',
      'Linearizáció és differenciálok',
    ]),
  },
  {
    n: 4, volume: 1, title: 'A derivált alkalmazásai',
    sections: s(4, [
      'Függvény szélsőértékei',
      'A Lagrange-féle középértéktétel',
      'Monoton függvények és az első derivált teszt',
      'Konvexitás és a függvénygörbe felrajzolása',
      'Alkalmazott optimalizációs problémák',
      'Határozatlan alakok és a L’Hôpital-szabály',
      'A Newton-módszer',
      'Primitív függvények',
    ]),
  },
  {
    n: 5, volume: 2, title: 'Integrálszámítás',
    sections: s(5, [
      'Közelítés véges összegekkel',
      'A véges összegek határértéke és a szumma jel',
      'A határozott integrál',
      'Newton–Leibniz-tétel (az analízis alaptétele)',
      'A határozatlan integrál és a helyettesítési szabály',
      'Helyettesítés és görbék által közbezárt terület',
    ]),
  },
  {
    n: 6, volume: 2, title: 'A határozott integrál alkalmazásai',
    sections: s(6, [
      'Szeletelés és tengely körüli forgatás',
      'Térfogatszámítás hengerhéj-módszerrel',
      'Síkgörbék hossza',
      'Tehetetlenségi nyomaték és tömegközéppont',
      'Forgásfelületek és Papposz tételei',
      'Munka',
      'A folyadék nyomása és a folyadékra ható erők',
    ]),
  },
  {
    n: 7, volume: 2, title: 'Transzcendens függvények',
    sections: s(7, [
      'Inverz függvény deriváltja',
      'A természetes logaritmusfüggvény',
      'Az exponenciális függvény',
      'Az aˣ és logₐx függvények',
      'Exponenciális növekedés és csökkenés',
      'Relatív növekedési ütem',
      'Inverz trigonometrikus függvények',
      'Hiperbolikus függvények',
    ]),
  },
  {
    n: 8, volume: 2, title: 'Integrálási technikák',
    sections: s(8, [
      'Egyszerű integrációs formulák',
      'Parciális integrálás',
      'Racionális törtfüggvények integrálása parciális törtekre bontással',
      'Trigonometrikus integrálok',
      'Trigonometrikus helyettesítések',
      'Integráltáblázatok és matematikai programcsomagok',
      'Numerikus integrálás',
      'Improprius integrálok',
    ]),
  },
  {
    n: 9, volume: 2, title: 'Az integrálás további alkalmazásai',
    sections: s(9, [
      'Iránymező és szétválasztható változójú differenciálegyenletek',
      'Elsőrendű lineáris differenciálegyenletek',
      'Euler-módszer',
      'Autonóm differenciálegyenletek grafikus megoldása',
      'Elsőrendű differenciálegyenletek alkalmazásai',
    ]),
  },
  {
    n: 10, volume: 3, title: 'Kúpszeletek és polárkoordináták',
    sections: s(10, [
      'Kúpszeletek és másodfokú egyenletek',
      'Kúpszeletek osztályozása excentricitásuk alapján',
      'Másodfokú egyenletek és forgatások',
      'Kúpszeletek és paraméteres egyenletek, a ciklois',
      'Polárkoordináták',
      'Ábrázolás polárkoordinátákban',
      'Terület és hosszúság polárkoordinátákban',
      'Kúpszeletek polárkoordinátákban',
    ]),
  },
  {
    n: 11, volume: 3, title: 'Sorozatok és végtelen sorok',
    sections: s(11, [
      'Sorozatok',
      'Végtelen sorok',
      'Az integrálkritérium',
      'Összehasonlító kritériumok',
      'A hányados- és a gyökkritérium',
      'Alternáló sorok, abszolút és feltételes konvergencia',
      'Hatványsorok',
      'Taylor- és Maclaurin-sorok',
      'A Taylor-sorok konvergenciája, Taylor tétele',
      'Hatványsorok alkalmazása',
      'Fourier-sorok',
    ]),
  },
  {
    n: 12, volume: 3, title: 'Vektorok és a tér geometriája',
    sections: s(12, [
      'Háromdimenziós koordináta-rendszerek',
      'Vektorok',
      'Skalárszorzat',
      'Vektoriális szorzat',
      'Egyenesek és síkok a térben',
      'Hengerek és másodrendű felületek',
    ]),
  },
  {
    n: 13, volume: 3, title: 'Vektor értékű függvények, mozgás a térben',
    sections: s(13, [
      'Vektorfüggvények',
      'Egy lövedék röppályájának leírása',
      'Ívhossz és a normált érintővektor',
      'Görbület és a normált főnormális',
      'Torzió és a normált binormális',
      'Bolygómozgás és műholdpályák',
    ]),
  },
  {
    n: 14, volume: 3, title: 'Parciális deriváltak',
    sections: s(14, [
      'Többváltozós függvények',
      'Határérték és folytonosság magasabb dimenzióban',
      'Parciális deriváltak',
      'A láncszabály',
      'Iránymenti deriváltak és gradiens vektor',
      'Érintősíkok és differenciálok',
      'Szélsőértékek és nyeregpontok',
      'Lagrange-multiplikátorok',
      'Feltételes parciális deriváltak',
      'Kétváltozós Taylor-formula',
    ]),
  },
  {
    n: 15, volume: 3, title: 'Többes integrálok',
    sections: s(15, [
      'Kettős integrál',
      'Terület, nyomaték, tömegközéppont',
      'Kettős integrálás polárkoordinátákkal',
      'Hármas integrál derékszögű koordináta-rendszerben',
      'Tömeg és nyomaték három dimenzióban',
      'Hármas integrálok henger- és gömbi koordináta-rendszerben',
      'Helyettesítés többes integráloknál',
    ]),
  },
  {
    n: 16, volume: 3, title: 'Integrálás vektormezőben',
    sections: s(16, [
      'Vonalintegrál',
      'Vektormezők, cirkuláció, munka, áramlás',
      'Útfüggetlenség, potenciálfüggvény, konzervatív vektormező',
      'Green-tétel a síkban',
      'Felület felszíne és felületi integrál',
      'Paraméteresen adott felületek',
      'Stokes-tétel',
      'A Gauss–Osztrogradszkij-tétel',
    ]),
  },
];

export const VOLUME_TITLES: Record<number, string> = {
  1: 'I. kötet',
  2: 'II. kötet',
  3: 'III. kötet',
};
