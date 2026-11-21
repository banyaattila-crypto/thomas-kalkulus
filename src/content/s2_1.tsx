import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import { SecantWidget, LimitTableWidget, ApproachWidget, ValueWidget, NoLimitWidget, FloatTrapWidget } from '../components/Widgets21';
import type { Page } from './s1_1';

export const S2_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Átlagos változási sebesség és a szelő',
    body: (
      <>
        <Story>
          <p>
            Felfelé hajítasz egy labdát. Az út első másodpercében gyorsan emelkedik, a csúcs közelében szinte megáll, aztán visszaesik. Hány méter per másodperces „a” sebessége? A kérdés addig nem értelmes,
            amíg nem mondjuk meg, <em>mikor</em>, vagy <em>mely időszakra</em> vonatkozik.
          </p>
        </Story>
        <p>
          Az átlagsebesség egyszerű: az idő alatt befutott távolságot elosztjuk az időtartammal. Ez az ötlet minden olyan mennyiségre átvihető, amely egy másiktól függ.
        </p>
        <Def title="Átlagos változási sebesség">
          <p>
            Az <M t="[x_1;x_2]" /> intervallumon az <M t="y=f(x)" /> változásának átlagos üteme:
          </p>
          <M block t="\dfrac{\Delta y}{\Delta x}=\dfrac{f(x_2)-f(x_1)}{x_2-x_1}=\dfrac{f(x_1+h)-f(x_1)}{h},\qquad h=x_2-x_1\neq0." />
        </Def>
        <p>
          Geometriailag ez a grafikon két pontját, <M t="P(x_1;f(x_1))" />-et és <M t="Q(x_2;f(x_2))" />-t összekötő egyenes, a <strong>szelő</strong> meredeksége (1.2). Az átlag csak a két végpontot nézi,
          arról nem árul el semmit, mi történt közben.
        </p>
        <SecantWidget />
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              A felhajított labda magassága <M t="h(t)=20t-5t^2" /> méter (<M t="t" /> másodpercben). Mekkora az átlagos változási sebessége a <M t="[0;1]" />, az <M t="[1;3]" /> és a <M t="[0;4]" />{' '}
              intervallumon? Miért lehet 0 az átlag, ha a labda közben mozog?
            </>
          }
        >
          <p>
            <M t="h(0)=0" />, <M t="h(1)=15" />, <M t="h(3)=15" />, <M t="h(4)=0" />. Így <M t="[0;1]" />-en <M t="\dfrac{15-0}{1}=15" /> m/s, <M t="[1;3]" />-on <M t="\dfrac{15-15}{2}=0" /> m/s, <M t="[0;4]" />-en{' '}
            <M t="\dfrac{0-0}{4}=0" /> m/s.
          </p>
          <p>
            Az átlag csak a végpontokat hasonlítja össze: a labda felmegy, majd visszaesik, és a két végponton azonos magasságban van, ezért a szelő vízszintes. A pillanatnyi mozgásról az átlag semmit sem mond.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy víztározóban a vízszint a <M t="t=0" /> órában 120 cm, <M t="t=6" />-nál 150 cm, <M t="t=10" />-nél 140 cm. Határozd meg az átlagos változási sebességet a <M t="[0;6]" />, a <M t="[6;10]" /> és a{' '}
              <M t="[0;10]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="[0;6]" />: <M t="\dfrac{150-120}{6}=5" /> cm/óra. <M t="[6;10]" />: <M t="\dfrac{140-150}{4}=-2{,}5" /> cm/óra. <M t="[0;10]" />: <M t="\dfrac{140-120}{10}=2" /> cm/óra.
          </p>
          <p>A negatív előjel csökkenést jelent. A három szelő meredeksége különböző, mert a vízszint változásának üteme időben nem állandó.</p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Pillanatnyi sebesség: átlagok határértéke',
    body: (
      <>
        <p>
          A <M t="t_0" /> pillanatbeli sebességet nem számíthatjuk ki az átlagsebesség képletével, mert <M t="h=0" /> esetén 0-val kellene osztani. Azt viszont megtehetjük, hogy a <M t="t_0" />-val kezdődő, egyre
          rövidebb intervallumokon számolunk átlagot, és megnézzük, merre tartanak az eredmények.
        </p>
        <LimitTableWidget />
        <p>
          A táblázatból szám szerint is látszik, hogy hová tartanak az átlagok. Az algebrai átalakítás ennél többet ad: megmutatja, hogy a tendencia nem véletlen. A labda példájánál, <M t="h(t)=20t-5t^2" /> esetén:
        </p>
        <M block t="\dfrac{h(t_0+h)-h(t_0)}{h}=\dfrac{20h-10t_0h-5h^2}{h}=20-10t_0-5h\qquad(h\neq0)." />
        <p>
          Ha <M t="h\neq0" />, az egyenlőség két oldalán azonos mennyiség áll, és a jobb oldalon h már „nullára engedhető”: az átlag <M t="20-10t_0" />-hoz tart. Ez a <M t="t_0" /> pillanatbeli sebesség. Így{' '}
          <M t="t_0=1" />-nél 10 m/s, <M t="t_0=2" />-nél 0 m/s (a pálya csúcsa).
        </p>
        <Def title="Pillanatnyi változási sebesség és érintő">
          <p>
            A pillanatnyi változási sebesség az átlagos változási sebességek határértéke, miközben az intervallum hossza nullához tart. Geometriailag: a <M t="P" />-n átmenő szelők határhelyzete a görbe{' '}
            <strong>érintője</strong> <M t="P" />-ben, és az érintő meredeksége a pillanatnyi változási sebesség.
          </p>
        </Def>
        <h3>Feladatok</h3>
        <Task
          n={3}
          q={
            <>
              A labdánál (<M t="h(t)=20t-5t^2" />) számítsd ki a sebességet a <M t="t_0=3" /> pillanatban! Mit jelent az előjel?
            </>
          }
        >
          <p>
            Az átlagok: <M t="20-10\cdot3-5h=-10-5h" />, ha <M t="h\ne0" />. Ahogy <M t="h\to0" />, ez <M t="-10" /> m/s. A negatív előjel azt jelenti, hogy a labda a 3. másodpercben lefelé mozog, magassága csökken.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Az <M t="f(x)=x^2" /> függvényre számold ki az átlagos változási sebességet <M t="[3;3+h]" />-n, olvasd le a határértéket, és írd fel a grafikon <M t="(3;9)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            <M t="\dfrac{(3+h)^2-9}{h}=\dfrac{6h+h^2}{h}=6+h" />, ha <M t="h\ne0" />. A határérték 6, ez az érintő meredeksége.
          </p>
          <p>
            Az érintő egyenlete: <M t="y-9=6(x-3)" />, azaz <M t="y=6x-9" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A határérték szemléletes fogalma',
    body: (
      <>
        <p>
          Az előző oldalon mindig ugyanaz történt: egy kifejezés, amelyet <M t="h=0" />-nál nem lehet kiszámolni, <M t="h" /> kis értékeinél viszont szépen viselkedik. Ezt a viselkedést általánosítjuk.
        </p>
        <Def title="A határérték (szemléletes, nem precíz)">
          <p>
            Legyen <M t="f" /> értelmezve <M t="x_0" /> egy környezetében, esetleg <M t="x_0" /> kivételével. Ha az <M t="f(x)" /> értékek tetszőlegesen közel kerülhetnek egy <M t="L" /> számhoz azzal, hogy{' '}
            <M t="x" />-et elég közel választjuk <M t="x_0" />-hoz (mindkét oldalról), akkor <M t="L" /> az <M t="f" /> határértéke <M t="x_0" />-ban:
          </p>
          <M block t="\lim_{x\to x_0}f(x)=L." />
        </Def>
        <p>
          A „tetszőlegesen közel” és az „elég közel” még nincs pontosan definiálva, ezt a 2.3-ban pótoljuk. Egyelőre elég, hogy táblázatból és grafikonról meg tudjuk jósolni a határértéket.
        </p>
        <ApproachWidget />
        <Warn>
          A határérték arról szól, mi történik <M t="x_0" /> <em>közelében</em>. Éppen azért hasznos, mert olyan helyen is működik, ahol a függvény nincs értelmezve.
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Becsüld meg <M t="\lim_{x\to3}\dfrac{x^3-27}{x-3}" /> értékét táblázattal, majd egyszerűsítéssel ellenőrizd!
            </>
          }
        >
          <p>
            Az egyszerűsített alak <M t="x^2+3x+9" /> (<M t="x\ne3" />). Értékei: <M t="x=2{,}9" />-nél 26,11; <M t="2{,}99" />-nél 26,9101; <M t="3{,}01" />-nél 27,0901; <M t="3{,}1" />-nél 27,91. Mindkét oldalról
            27-hez közelítenek.
          </p>
          <p>
            Az egyszerűsítés után behelyettesítve: <M t="3^2+3\cdot3+9=27" />. A határérték 27.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Határozd meg <M t="\lim_{x\to0}\dfrac{\sqrt{x+9}-3}{x}" /> értékét! (Tipp: bővíts a számláló konjugáltjával.)
            </>
          }
        >
          <p>
            <M t="\dfrac{\sqrt{x+9}-3}{x}\cdot\dfrac{\sqrt{x+9}+3}{\sqrt{x+9}+3}=\dfrac{(x+9)-9}{x(\sqrt{x+9}+3)}=\dfrac{1}{\sqrt{x+9}+3}" />, ha <M t="x\ne0" />.
          </p>
          <p>
            Ha <M t="x\to0" />, ez <M t="\dfrac{1}{3+3}=\dfrac16\approx0{,}1667" />. Ellenőrzés: <M t="x=0{,}1" />-nél 0,16621, <M t="x=-0{,}1" />-nél 0,16713.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Határérték és függvényérték: két külön dolog',
    body: (
      <>
        <p>
          Az <M t="f(x_0)" /> és a <M t="\lim_{x\to x_0}f(x)" /> két különböző kérdésre válaszol. Az első: mekkora az érték <em>pontosan</em> <M t="x_0" />-ban. A második: merre tartanak az értékek, ha <M t="x_0" /> felé haladunk.
          Három eset lehetséges: a függvény x₀-ban nincs értelmezve, értelmezve van, de más értéket vesz fel, vagy a két érték egyenlő.
        </p>
        <ValueWidget />
        <p>
          A harmadik esetet, amikor a határérték egyenlő a függvényértékkel, <strong>folytonosságnak</strong> nevezzük, ezt a 2.6-ban tárgyaljuk. Szemléletesen: a grafikon nem szakad meg.
        </p>
        <h3>Két alapeset</h3>
        <ul>
          <li>
            Az identikus függvény határértéke: <M t="\lim_{x\to x_0}x=x_0" />.
          </li>
          <li>
            A konstans függvényé a konstans: <M t="\lim_{x\to x_0}k=k" />.
          </li>
        </ul>
        <p>
          Ha a függvényt polinomokból és trigonometrikus függvényekből művelettel állítjuk elő, és <M t="x_0" /> az értelmezési tartományban van, a határérték gyakran egyszerű behelyettesítéssel kapható (például{' '}
          <M t="\lim_{x\to2}(5x-3)=7" />). Ezeket az állításokat a 2.2-ben pontosítjuk, és a 2.3-ban be is bizonyítjuk.
        </p>
        <h3>Feladat</h3>
        <Task
          n={7}
          q={
            <>
              Legyen <M t="g(x)=x^2+2" />, ha <M t="x\ne1" />, és <M t="g(1)=7" />. Mennyi <M t="\lim_{x\to1}g(x)" />, és mennyi <M t="g(1)" />? Következik-e abból, hogy <M t="\lim_{x\to a}f(x)=5" />, hogy <M t="f(a)=5" />?
            </>
          }
        >
          <p>
            <M t="x\ne1" /> esetén <M t="g(x)=x^2+2" />, és az értékei <M t="x" />-nek <M t="1" />-hez közeli értékeinél <M t="3" />-hoz tartanak: <M t="\lim_{x\to1}g(x)=3" />. A függvényérték viszont <M t="g(1)=7" />.
          </p>
          <p>
            Tehát a határértékből nem következik a függvényérték: <M t="f" /> lehet <M t="a" />-ban nem értelmezett, vagy ott más értéket is felvehet. Csak az <M t="a" /> közeli, <M t="a" />-tól különböző helyek számítanak.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Amikor nincs határérték',
    body: (
      <>
        <p>
          Nem minden függvénynek van határértéke minden helyen. Három tipikus ok van, és mindhárom a „közelít valamihez” követelményt sérti.
        </p>
        <ol>
          <li>
            <strong>Ugrás.</strong> A bal és a jobb oldali közelítés két különböző számhoz tart, nincs egyetlen közös érték.
          </li>
          <li>
            <strong>Korlátlan növekedés.</strong> Az értékek minden határon túl nőnek (vagy csökkennek), így nincs olyan valós szám, amelyhez tartanának.
          </li>
          <li>
            <strong>Gyors oszcilláció.</strong> Bármely kis környezetben az értékek ismétlődően végigjárnak egy egész tartományt, így semmilyen szám nem „vonzza” őket.
          </li>
        </ol>
        <NoLimitWidget />
        <p>
          Az ugrásnál hasznos az egyoldali közelítés külön vizsgálata: a bal oldali határérték (<M t="x\to x_0^-" />) és a jobb oldali (<M t="x\to x_0^+" />) lehet különböző. A kétoldali határérték akkor és csak akkor
          létezik, ha a két egyoldali határérték létezik és egyenlő. Ezt a 2.4-ben tárgyaljuk részletesen.
        </p>
        <Warn>
          A „nem létezik” nem azt jelenti, hogy a függvény nincs értelmezve. Az <M t="x/|x|" /> minden <M t="x\ne0" />-ra értelmezett, mégsincs határértéke 0-ban.
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={8}
          q={
            <>
              Vizsgáld az <M t="f(x)=\dfrac{|x-2|}{x-2}" /> függvényt <M t="x_0=2" />-nél! Mit kapsz balról és jobbról közeledve? Van-e határérték?
            </>
          }
        >
          <p>
            Ha <M t="x>2" />: <M t="|x-2|=x-2" />, így <M t="f(x)=1" />. Ha <M t="x<2" />: <M t="|x-2|=-(x-2)" />, így <M t="f(x)=-1" />.
          </p>
          <p>Balról −1-hez, jobbról +1-hez tart, ezért <M t="\lim_{x\to2}f(x)" /> nem létezik (ugrás).</p>
        </Task>
        <Task
          n={9}
          q={
            <>
              Indokold, miért nincs valós határértéke az <M t="f(x)=\dfrac1{(x-1)^2}" /> függvénynek az <M t="x=1" /> helyen!
            </>
          }
        >
          <p>
            Ha <M t="|x-1|=\delta" />, akkor <M t="f(x)=1/\delta^2" />: <M t="\delta=0{,}1" />-nél 100, <M t="\delta=0{,}01" />-nél 10 000, <M t="\delta=0{,}001" />-nél 1 000 000.
          </p>
          <p>
            Bármilyen <M t="K" /> számot mondunk, <M t="\delta<1/\sqrt K" />-ra az érték nagyobb <M t="K" />-nál. Az értékek nem közelednek egyetlen számhoz sem, a határérték (valós számként) nem létezik. Az ilyen „végtelenhez tartást” a 2.5-ben írjuk le pontosan.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Határérték becslése géppel: óvatosan',
    body: (
      <>
        <p>
          A táblázat és a grafikon jó eszköz a határérték megsejtéséhez. A gép azonban véges pontossággal számol, és kis <M t="x" /> esetén két majdnem egyenlő számot kell kivonnia egymásból. Ilyenkor a pontosság
          elvész, és a végeredmény teljesen hamis is lehet.
        </p>
        <FloatTrapWidget />
        <p>
          A táblázatból látszik, hogy az eredeti képlet értékei eleinte jól közelítik az ½-et, majd egyre pontatlanabbak, végül <M t="x=10^{-8}" />-nál a gép 0-t ad. Ennek oka, hogy <M t="x^2=10^{-16}" /> már
          kisebb a gép tizedesjegyekben mért pontosságánál, ezért <M t="1+x^2" /> kerekítve pontosan 1, és a számláló 0 lesz. A határérték viszont ½.
        </p>
        <Warn>
          A numerikus becslés sejtést ad, nem bizonyítékot. Ha a táblázat a végén „átfordul”, vagy két különböző értéket sugall, a számolásra, nem az értékekre kell hagyatkozni: algebrai átalakítással (2.2) a pontos érték
          megkapható.
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={10}
          q={
            <>
              Határozd meg algebrailag <M t="\lim_{x\to0}\dfrac{\sqrt{x^2+1}-1}{x^2}" /> értékét, és indokold, miért ad a gép kis <M t="x" />-nél 0-t!
            </>
          }
        >
          <p>
            Bővítés a konjugálttal: <M t="\dfrac{(x^2+1)-1}{x^2(\sqrt{x^2+1}+1)}=\dfrac{1}{\sqrt{x^2+1}+1}" />, ha <M t="x\ne0" />. Ha <M t="x\to0" />, ez <M t="\dfrac1{1+1}=\dfrac12" />.
          </p>
          <p>
            Dupla pontosságú számolásnál 1-hez 10<sup>−16</sup> alatti szám hozzáadása már nem változtat semmit, ezért <M t="x=10^{-8}" />-nél <M t="1+x^2" /> pontosan 1, a számláló 0, és a gép 0-t ír ½ helyett.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Add meg az <M t="f(x)=\dfrac1x" /> átlagos változási sebességét a <M t="[2;2+h]" /> intervallumon, és olvasd le a határértéket <M t="h\to0" />-ra! Mit jelent ez az érintő meredekségeként?
            </>
          }
        >
          <p>
            <M t="\dfrac{\frac1{2+h}-\frac12}{h}=\dfrac{2-(2+h)}{2(2+h)h}=\dfrac{-h}{2(2+h)h}=-\dfrac{1}{2(2+h)}" />, ha <M t="h\ne0" />.
          </p>
          <p>
            Ha <M t="h\to0" />: <M t="-\dfrac{1}{2\cdot2}=-\dfrac14" />. A <M t="y=1/x" /> grafikon <M t="(2;\tfrac12)" /> pontbeli érintőjének meredeksége <M t="-\tfrac14" />, az érintő lefelé hajlik.
          </p>
        </Task>

        <h3>Mi következik?</h3>
        <p>
          Eddig táblázatokból és ábrákról sejtettük a határértékeket. A következő szakaszban (2.2) szabályokat kapunk: összeg, szorzat, hányados határértéke, és ezekkel már kiszámolhatjuk őket, találgatás nélkül.
        </p>
      </>
    ),
  },
];
