import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  ConcavityTangentWidget,
  CurveSketchStepsDiagram,
  FourShapesDiagram,
  FullAnalysisWidget,
  InflectionGalleryWidget,
  SecondDerivTestWidget,
} from '../components/Widgets44';
import type { Page } from './s1_1';

export const S4_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Konvexitás: merre hajlik a görbe?',
    body: (
      <>
        <Story>
          <p>
            Képzeld el, hogy egy kanyargós hegyi úton vezetsz felülnézetből, balról jobbra haladva. Az első derivált (<M t="f'" />) azt mondja meg, merre néz az autód orra (északkeletre vagy délkeletre). A <strong>második derivált (<M t="f''" />)</strong> viszont azt árulja el, merre tekered a <strong>kormányt</strong>: balra kanyarodsz (az út felfelé ível), vagy jobbra kanyarodsz (az út lefelé ível)! Ezt a hajlási irányt nevezzük <strong>konvexitásnak</strong>.
          </p>
        </Story>
        <p>
          Az előző szakaszban (4.3) az első derivált előjeléből már meg tudtuk mondani, hol emelkedik és hol süllyed egy függvény. Két emelkedő görbe azonban teljesen másképp görbülhet: az egyik egyre <em>meredekebben</em> emelkedik (mint a kamatos kamat), a másik egyre <em>laposabban</em> (mint a <M t="\sqrt{x}" />). A különbség az, hogy az <M t="f'" /> meredekség maga <strong>növekszik</strong> vagy <strong>csökken</strong>!
        </p>
        <Def title="Konvex és konkáv függvény (görbe)">
          <p>
            Legyen <M t="f" /> differenciálható egy <M t="I" /> nyílt intervallumon:
          </p>
          <ul>
            <li>
              <M t="f" /> <strong>konvex</strong> (alulról konvex / felfelé hajló, „mosolygós” <M t="\cup" />) az <M t="I" /> intervallumon, ha <M t="f'" /> <strong>növekvő</strong> <M t="I" />-n. Geometriailag: a görbe az érintői <em>felett</em> halad (az érintők alulról támasztják).
            </li>
            <li>
              <M t="f" /> <strong>konkáv</strong> (alulról konkáv / lefelé hajló, „szomorú” <M t="\cap" />) az <M t="I" /> intervallumon, ha <M t="f'" /> <strong>csökkenő</strong> <M t="I" />-n. Geometriailag: a görbe az érintői <em>alatt</em> halad (az érintők felülről borulnak rá).
            </li>
          </ul>
        </Def>
        <p>
          Honnan tudjuk a legegyszerűbben, hogy <M t="f'" /> növekszik vagy csökken? Pontosan a 4.3 monotonitási kritériumával — csak most <M t="f'" /> deriváltját, vagyis a <strong>második deriváltat (<M t="f''" />)</strong> vizsgáljuk!
        </p>
        <Def title="Második derivált teszt konvexitásra">
          <p>
            Ha <M t="f" /> kétszer differenciálható egy <M t="I" /> intervallumon:
          </p>
          <M block t="f''(x) > 0 \;\Longrightarrow\; f \text{ konvex } (\cup), \qquad f''(x) < 0 \;\Longrightarrow\; f \text{ konkáv } (\cap)." />
        </Def>
        <p>
          <em>Szóhasználati megjegyzés:</em> a magyar irodalomban a „konvex” rövidítés mindig az <strong>alulról konvex</strong> (felfelé nyíló, angolul <em>concave up</em>) alakot jelenti, a „konkáv” pedig a <strong>lefelé nyíló</strong> (<em>concave down</em>) alakot.
        </p>
        <ConcavityTangentWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Hol konvex és hol konkáv az <M t="f(x)=x^3 - 6x^2 + 9x + 1" /> függvény?
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-12x+9" />, <M t="f''(x)=6x-12=6(x-2)" />.
          </p>
          <p>
            Ha <M t="x < 2" />, akkor <M t="f''(x) < 0" /> → <strong>konkáv</strong> a <M t="(-\infty;\,2)" /> intervallumon. Ha <M t="x > 2" />, akkor <M t="f''(x) > 0" /> → <strong>konvex</strong> a <M t="(2;\,\infty)" /> intervallumon!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Igazold a második deriválttal, hogy az <M t="f(x)=ax^2+bx+c" /> (<M t="a\ne 0" />) parabola mindenütt konvex, ha <M t="a>0" />, és mindenütt konkáv, ha <M t="a<0" />!
            </>
          }
        >
          <p>
            <M t="f'(x)=2ax+b \Rightarrow f''(x)=2a" /> (állandó!). Ha <M t="a>0" />, <M t="f''>0" /> mindenütt (konvex); ha <M t="a<0" />, <M t="f''<0" /> mindenütt (konkáv).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A 4 alapforma: f′ és f″ előjele együtt',
    body: (
      <>
        <p>
          Egy függvénygrafikon teljes alakját minden egyes részintervallumon <strong>kétetlen előjel</strong> határozza meg: <M t="f'" /> (merre megy?) és <M t="f''" /> (merre görbül?). E kettő pontosan <strong>négyféle</strong> görbe-alapelemet ad — ha ezt a négyet ismered, bármilyen függvényt meg tudsz rajzolni, mint egy kirakóst!
        </p>
        <FourShapesDiagram />
        <p>
          Nézzük meg, hogyan jelenik meg mind a négy a valóságban:
        </p>
        <ul>
          <li>
            <strong><M t="f'>0,\; f''>0" /> (gyorsuló növekedés):</strong> egy járvány kezdeti szakasza, vagy kamatos kamat — nemcsak nő az érték, hanem a növekedés üteme is gyorsul!
          </li>
          <li>
            <strong><M t="f'>0,\; f''<0" /> (lassuló növekedés):</strong> új készség tanulása vagy növekvő növény — még mindig nő, de a „lendülete” már fogy, közeledik egy plafonhoz.
          </li>
          <li>
            <strong><M t="f'<0,\; f''>0" /> (fékeződő csökkenés):</strong> forró tea hűlése a szobahőmérséklet felé — eleinte gyorsan hűl, majd egyre lassabban.
          </li>
          <li>
            <strong><M t="f'<0,\; f''<0" /> (gyorsuló zuhanás):</strong> szabadesésben lefelé eső kő magassága (<M t="h(t)=h_0-\frac{1}{2}gt^2" />) — nemcsak csökken, hanem egyre meredekebben esik!
          </li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy gyárban a napi termelés emelkedik, de a növekedés üteme napról napra csökken. Milyen előjelű <M t="f'" /> és <M t="f''" />?
            </>
          }
        >
          <p>
            Mivel a termelés emelkedik, <M t="f' > 0" />. Mivel a növekedés üteme (<M t="f'" />) csökken, annak deriváltja negatív: <M t="f'' < 0" /> (növekvő és konkáv!).
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Melyik a 4 alapforma közül az <M t="f(x)=\dfrac{1}{x}" /> görbe a <M t="(0;\,\infty)" /> intervallumon?
            </>
          }
        >
          <p>
            <M t="f'(x)=-\dfrac{1}{x^2} < 0" /> (csökkenő) és <M t="f''(x)=\dfrac{2}{x^3} > 0" /> (konvex) → <strong>csökkenő és konvex</strong> (fékeződő csökkenés)!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Inflexiós pontok: ahol a görbe átfordul',
    body: (
      <>
        <p>
          Ha az autód a szerpentinen bal kanyarból jobb kanyarba vált, van egy pontos pillanat, amikor a kormány egyenesen áll — ez a kanyar <strong>fordulópontja</strong>. A függvényeknél ugyanezt a pontot nevezzük <strong>inflexiós pontnak</strong>!
        </p>
        <Def title="Inflexiós pont">
          <p>
            Egy <M t="f" /> függvény grafikonjának <M t="(c;\,f(c))" /> pontja <strong>inflexiós pont</strong>, ha:
          </p>
          <ol>
            <li><M t="f" /> folytonos <M t="c" />-ben és a grafikonnak van (akár függőleges) érintője <M t="c" />-ben, ÉS</li>
            <li>a grafikon konvexitása <M t="c" />-nél <strong>megváltozik</strong> (konvexből konkávba, vagy konkávból konvexbe vált).</li>
          </ol>
        </Def>
        <p>
          <strong>Hol keressük az inflexiós pontokat?</strong> Ahol <M t="f''" /> előjelet válthat — vagyis ahol <strong><M t="f''(c) = 0" /></strong>, vagy ahol <strong><M t="f''(c)" /> nem létezik</strong>!
        </p>
        <p>
          <strong>Két kulcsfontosságú elméleti finomság:</strong>
        </p>
        <ul>
          <li>
            <strong>1. <M t="f''(c)=0" /> csak jelölt, nem garancia!</strong> Az <M t="f(x)=x^4" /> függvénynél <M t="f''(0)=0" />, mégsem inflexiós pont, mert <M t="f''(x)=12x^2 \ge 0" /> mindkét oldalon pozitív (nem vált konvexitást!). Mindig ellenőrizzük az <strong>előjelváltást</strong>!
          </li>
          <li>
            <strong>2. Az inflexiós pont a maximális meredekség helye!</strong> Mivel az inflexiós pontban <M t="f''" /> előjelet vált, ott <M t="f'" />-nek lokális szélsőértéke van — vagyis a függvény <em>ott növekszik vagy csökken a leggyorsabban</em>! (Gondolj egy járványgörbére: az inflexiós pont az a nap, amikor a napi új fertőzések száma tetőzik!)
          </li>
        </ul>
        <InflectionGalleryWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg az <M t="f(x)=x^3 - 3x^2 + 2" /> függvény inflexiós pontját és az ottani érintő meredekségét!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-6x" />, <M t="f''(x)=6x-6=0 \Rightarrow x=1" />. Balra <M t="f''<0" />, jobbra <M t="f''>0" /> → valódi inflexiós pont!
          </p>
          <p>
            Koordináták: <M t="f(1)=0" />, tehát az inflexiós pont <M t="(1;\,0)" />, és az ottani érintő meredeksége <M t="f'(1)=-3" /> (itt csökken a legmeredekebben a görbe!).
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Van-e inflexiós pontja az <M t="f(x)=\sin x" /> függvénynek a <M t="[0;\,2\pi]" /> intervallumon?
            </>
          }
        >
          <p>
            <M t="f''(x)=-\sin x = 0 \Rightarrow x=\pi \in (0;\,2\pi)" />. Mivel <M t="(0;\,\pi)" />-n <M t="f''<0" /> (konkáv), <M t="(\pi;\,2\pi)" />-n <M t="f''>0" /> (konvex), a <M t="(\pi;\,0)" /> pont inflexiós pont! (Általánosan minden <M t="k\pi" /> tengelymetszéspont inflexiós pont!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A második derivált teszt lokális szélsőértékekre',
    body: (
      <>
        <p>
          Ha már kiszámoltunk egy <M t="c" /> pontot, ahol az érintő vízszintes (<M t="f'(c)=0" />), gyakran előjeltáblázat <em>nélkül</em> is azonnal eldönthetjük, hogy csúcsról vagy völgyről van-e szó! Gondolj bele:
        </p>
        <ul>
          <li>Ha az érintő vízszintes, ÉS a görbe <strong>felfelé hajlik</strong> (<M t="f''(c) > 0" />, tál alakú), akkor a pont csak a tál alja lehet → <strong>lokális minimum</strong>!</li>
          <li>Ha az érintő vízszintes, ÉS a görbe <strong>lefelé hajlik</strong> (<M t="f''(c) < 0" />, kupola alakú), akkor a pont csak a kupola teteje lehet → <strong>lokális maximum</strong>!</li>
        </ul>
        <Def title="Második derivált teszt lokális szélsőértékekre">
          <p>
            Tegyük fel, hogy <M t="f''" /> folytonos egy <M t="c" /> pont környezetében, és <strong><M t="f'(c) = 0" /></strong>:
          </p>
          <ul>
            <li>Ha <M t="f''(c) < 0" />, akkor <M t="f" />-nek <strong>lokális maximuma</strong> van <M t="c" />-ben.</li>
            <li>Ha <M t="f''(c) > 0" />, akkor <M t="f" />-nek <strong>lokális minimuma</strong> van <M t="c" />-ben.</li>
            <li>Ha <strong><M t="f''(c) = 0" /></strong>, akkor a teszt <strong>nem dönt!</strong> (Lehet maximum, minimum, vagy egyik sem — ilyenkor használd az első derivált tesztet!)</li>
          </ul>
        </Def>
        <p>
          <strong>Miért nem dönt <M t="f''(c)=0" /> esetén?</strong> Nézd meg ezt a három egyszerű függvényt <M t="c=0" />-nál (mindháromra <M t="f'(0)=0" /> és <M t="f''(0)=0" />!):
        </p>
        <ul>
          <li><M t="f(x)=x^4" /> → lokális <strong>minimum</strong></li>
          <li><M t="f(x)=-x^4" /> → lokális <strong>maximum</strong></li>
          <li><M t="f(x)=x^3" /> → <strong>nincs szélsőérték</strong> (inflexiós teraszpont)!</li>
        </ul>
        <p>
          <strong>Gyakorlati tipp:</strong> polinomoknál és trigonometrikus függvényeknél a második derivált teszt szupergyors. Bonyolult hányadosoknál és gyököknél viszont gyakran egyszerűbb megmaradni az <em>első derivált tesztnél</em>, mert <M t="f''" /> kiszámolása sokkal több munka lenne!
        </p>
        <SecondDerivTestWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Alkalmazd a második derivált tesztet az <M t="f(x)=x^3 - 3x^2 - 9x + 5" /> függvényre!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-6x-9=3(x+1)(x-3)=0 \Rightarrow x=-1,\; x=3" />.
          </p>
          <p>
            <M t="f''(x)=6x-6" />. Ekkor <M t="f''(-1)=-12 < 0" /> → <strong>lokális maximum</strong> (<M t="f(-1)=10" />); <M t="f''(3)=12 > 0" /> → <strong>lokális minimum</strong> (<M t="f(3)=-22" />)!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Mit mond a második derivált teszt az <M t="f(x)=x^5" /> függvény <M t="x=0" /> kritikus pontjára, és mi a valóság?
            </>
          }
        >
          <p>
            <M t="f'(0)=0" /> és <M t="f''(0)=0" />, tehát a második derivált teszt <strong>nem dönt</strong>. Az első derivált <M t="f'(x)=5x^4 \ge 0" /> nem vált előjelet (<M t="+\to +" />), így <M t="x=0" />-nál <strong>nincs szélsőérték</strong> (inflexiós pont).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Teljes függvényvizsgálat: a 7 lépéses nagy recept',
    body: (
      <>
        <p>
          Most már minden eszköz a kezünkben van (határértékek és aszimptoták a 2. fejezetből, első és második derivált a 3–4. fejezetből), hogy <strong>bármilyen függvény grafikonját</strong> pontosan, meglepetések nélkül fel tudjuk rajzolni!
        </p>
        <CurveSketchStepsDiagram />
        <Def title="A teljes függvényvizsgálat 7 lépése">
          <ol>
            <li><strong>Értelmezési tartomány és szimmetria:</strong> hol értelmezett <M t="f" />? Páros (<M t="f(-x)=f(x)" />, <M t="y" />-tengelyre szimmetrikus) vagy páratlan (<M t="f(-x)=-f(x)" />, origóra szimmetrikus)? Periodikus?</li>
            <li><strong>Tengelymetszéspontok:</strong> <M t="y" />-tengely (<M t="f(0)" />) és <M t="x" />-tengely (<M t="f(x)=0" />, ha algebrailag könnyű).</li>
            <li><strong>Aszimptoták és végtelenbeli viselkedés:</strong> függőleges aszimptoták (nevező <M t="=0" />), vízszintes vagy ferde aszimptoták (<M t="x\to\pm\infty" />).</li>
            <li><strong>Első derivált (<M t="f'" />):</strong> kritikus pontok, növekvő/csökkenő szakaszok, lokális szélsőértékek.</li>
            <li><strong>Második derivált (<M t="f''" />):</strong> konvex/konkáv szakaszok, inflexiós pontok.</li>
            <li><strong>Közös előjeltáblázat:</strong> egyetlen táblázatba tesszük <M t="f'" /> és <M t="f''" /> előjelét minden szakaszra, és kiolvassuk a 4 alapformát (⤴, ↱, ↳, ⤵).</li>
            <li><strong>Felrajzolás:</strong> berajzoljuk az aszimptotákat, tengelymetszeteket, szélsőértékeket és inflexiós pontokat, majd összekötjük a megfelelő görbülettel!</li>
          </ol>
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Miért érdemes már az 1. lépésben ellenőrizni, hogy <M t="f" /> páros vagy páratlan-e?
            </>
          }
        >
          <p>
            Mert ezzel <strong>megfelezed a munkádat!</strong> Elég csak az <M t="x \ge 0" /> félre megvizsgálni és felrajzolni a görbét, a negatív oldalt pedig egyszerű tükrözéssel kapod meg!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Lehet-e egy polinomnak függőleges vagy vízszintes aszimptotája?
            </>
          }
        >
          <p>
            Függőleges aszimptotája <strong>soha</strong> (mindenütt folytonos). Vízszintes aszimptotája is csak a konstans polinomnak van; minden legalább elsőfokú polinom <M t="\pm\infty" />-be tart, ha <M t="x\to\pm\infty" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Kidolgozott nagypélda 1: Negyedfokú polinom teljes vizsgálata',
    body: (
      <>
        <p>
          Végezzük el a teljes függvényvizsgálatot az <strong><M t="f(x) = x^4 - 4x^3 + 10" /></strong> polinomra! Ez a példa azért zseniális, mert minden fontos jelenség (teraszpont, inflexió, abszolút minimum) egyszerre szerepel benne.
        </p>
        <ul>
          <li><strong>1–3. Tartomány, tengelymetszet, végtelen:</strong> <M t="D=\mathbb{R}" />, nem szimmetrikus, <M t="f(0)=10" />, nincs aszimptota, <M t="\lim_{x\to\pm\infty} f(x) = +\infty" />.</li>
          <li><strong>4. Első derivált:</strong> <M t="f'(x)=4x^3-12x^2 = 4x^2(x-3)" />. Kritikus pontok: <M t="x=0" /> és <M t="x=3" />.</li>
          <li><strong>5. Második derivált:</strong> <M t="f''(x)=12x^2-24x = 12x(x-2)" />. Jelöltek: <M t="x=0" /> és <M t="x=2" />.</li>
        </ul>
        <p>
          <strong>6. Közös előjeltáblázat</strong> (minden kritikus és inflexiós pontot növekvő sorrendben felveszünk: <M t="0,\; 2,\; 3" />):
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>intervallum</th>
              <th><M t="f'" /> előjele</th>
              <th><M t="f''" /> előjele</th>
              <th>a görbe alakja</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="(-\infty;\,0)" /></td>
              <td><M t="-" /> (csökken)</td>
              <td><M t="+" /> (konvex)</td>
              <td>fékeződve csökken (↳)</td>
            </tr>
            <tr>
              <td><M t="(0;\,2)" /></td>
              <td><M t="-" /> (csökken)</td>
              <td><M t="-" /> (konkáv)</td>
              <td>gyorsulva csökken (⤵)</td>
            </tr>
            <tr>
              <td><M t="(2;\,3)" /></td>
              <td><M t="-" /> (csökken)</td>
              <td><M t="+" /> (konvex)</td>
              <td>fékeződve csökken (↳)</td>
            </tr>
            <tr>
              <td><M t="(3;\,\infty)" /></td>
              <td><M t="+" /> (növekszik)</td>
              <td><M t="+" /> (konvex)</td>
              <td>gyorsulva nő (⤴)</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Kulcspontok:</strong> <M t="(0;\,10)" /> vízszintes érintős <em>inflexiós (terasz)pont</em>; <M t="(2;\,-6)" /> <em>inflexiós pont</em>; <M t="(3;\,-17)" /> <strong>lokális és abszolút minimum</strong>!
        </p>
        <FullAnalysisWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              A fenti táblázatból olvasd le: melyik pontban csökken a <strong>leggyorsabban</strong> az <M t="f(x)=x^4-4x^3+10" /> függvény?
            </>
          }
        >
          <p>
            Az <M t="x=2" /> inflexiós pontban (ahol <M t="f''" /> előjelet vált <M t="-\to +" />, így <M t="f'" />-nek itt van a minimuma: <M t="f'(2)=-16" />)!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Hány valós gyöke van az <M t="x^4 - 4x^3 + 10 = 0" /> egyenletnek a teljes vizsgálat alapján?
            </>
          }
        >
          <p>
            <strong>Pontosan 2!</strong> A görbe <M t="+\infty" />-ből süllyed <M t="f(3)=-17 < 0" />-ig (tehát egyszer metszi az <M t="x" />-tengelyt <M t="(0;\,2)" />-ben), majd <M t="-17" />-től szigorúan növekszik <M t="+\infty" />-be (így még egyszer metszi <M t="x>3" />-nál)!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Kidolgozott nagypélda 2: Racionális törtfüggvény aszimptotákkal',
    body: (
      <>
        <p>
          Most vizsgáljunk meg egy aszimptotás törtfüggvényt: <strong><M t="f(x) = \dfrac{x^2}{x^2 - 1}" /></strong>!
        </p>
        <ul>
          <li>
            <strong>1. Tartomány és szimmetria:</strong> <M t="x \ne \pm 1" />. Mivel <M t="f(-x)=f(x)" />, a függvény <strong>páros</strong> (szimmetrikus az <M t="y" />-tengelyre!).
          </li>
          <li>
            <strong>2. Tengelymetszet:</strong> <M t="f(0)=0" /> (az origó az egyetlen tengelymetszéspont).
          </li>
          <li>
            <strong>3. Aszimptoták:</strong> függőleges aszimptoták <M t="x=-1" /> és <M t="x=1" />. Vízszintes aszimptota: <M t="\lim_{x\to\pm\infty}\dfrac{x^2}{x^2-1} = 1" />, tehát <M t="y=1" />!
          </li>
          <li>
            <strong>4. Első derivált:</strong> <M t="f'(x) = \dfrac{2x(x^2-1) - x^2(2x)}{(x^2-1)^2} = \dfrac{-2x}{(x^2-1)^2}" />. Egyetlen kritikus pont: <M t="x=0" />!
          </li>
          <li>
            <strong>5. Második derivált:</strong> <M t="f''(x) = \dfrac{-2(x^2-1)^2 - (-2x)\cdot 2(x^2-1)(2x)}{(x^2-1)^4} = \dfrac{6x^2 + 2}{(x^2-1)^3}" />. Mivel <M t="6x^2+2 > 0" /> mindig, <M t="f''" /> <em>sehol nem nulla</em> — csak a <M t="x=\pm 1" /> aszimptotáknál vált előjelet!
          </li>
        </ul>
        <table className="tbl">
          <thead>
            <tr>
              <th>intervallum</th>
              <th><M t="f'" /></th>
              <th><M t="f''" /></th>
              <th>viselkedés</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="(-\infty;\,-1)" /></td>
              <td><M t="+" /></td>
              <td><M t="+" /></td>
              <td><M t="y=1" />-ről indulva növekszik <M t="+\infty" />-be (konvex)</td>
            </tr>
            <tr>
              <td><M t="(-1;\,0)" /></td>
              <td><M t="+" /></td>
              <td><M t="-" /></td>
              <td><M t="-\infty" />-ből emelkedik <M t="(0;\,0)" />-ig (konkáv)</td>
            </tr>
            <tr>
              <td><M t="(0;\,1)" /></td>
              <td><M t="-" /></td>
              <td><M t="-" /></td>
              <td><M t="(0;\,0)" />-tól süllyed <M t="-\infty" />-be (konkáv)</td>
            </tr>
            <tr>
              <td><M t="(1;\,\infty)" /></td>
              <td><M t="-" /></td>
              <td><M t="+" /></td>
              <td><M t="+\infty" />-ből csökken <M t="y=1" />-hez (konvex)</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Eredmény:</strong> <M t="(0;\,0)" /> <strong>lokális maximum</strong>, inflexiós pont <strong>nincs</strong> (mert <M t="x=\pm 1" /> nincs az értelmezési tartományban)!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              A fenti <M t="f(x)=\dfrac{x^2}{x^2-1}" /> függvénynek miért <em>nincs</em> inflexiós pontja, pedig <M t="f''" /> előjelet vált <M t="x=-1" />-nél és <M t="x=1" />-nél?
            </>
          }
        >
          <p>
            Mert az inflexiós pontnak a függvény <strong>értelmezési tartományához</strong> kell tartoznia (és ott folytonosnak kell lennie)! <M t="x=\pm 1" />-nél függőleges aszimptota van, <M t="f(\pm 1)" /> nem is létezik!
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Mely <M t="y" /> értékeket NEM veszi fel soha az <M t="f(x)=\dfrac{x^2}{x^2-1}" /> függvény? (Azaz mi az értékkészlete?)
            </>
          }
        >
          <p>
            A középső ág <M t="(-\infty;\,0]" />, a két szélső ág <M t="(1;\,\infty)" /> értékeket vesz fel — tehát a <M t="(0;\,1]" /> intervallumból <strong>egyetlen értéket sem</strong> vesz fel!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'A nagy fordítókulcs: f, f′ és f″ kapcsolata',
    body: (
      <>
        <p>
          Ha megérted a következő táblázatot, akkor bármilyen grafikon-összepárosító vagy elméleti vizsgakérdést csukott szemmel megoldasz:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>tulajdonság <M t="f" />-en</th>
              <th>mit látok <M t="f'" />-n?</th>
              <th>mit látok <M t="f''" />-n?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="f" /> növekvő</td>
              <td><M t="f' > 0" /> (<M t="x" />-tengely felett)</td>
              <td>bármi lehet</td>
            </tr>
            <tr>
              <td><M t="f" /> lokális maximum</td>
              <td><M t="f'" /> metszi a tengelyt <M t="+\to -" /></td>
              <td>általában <M t="f'' \le 0" /></td>
            </tr>
            <tr>
              <td><M t="f" /> lokális minimum</td>
              <td><M t="f'" /> metszi a tengelyt <M t="-\to +" /></td>
              <td>általában <M t="f'' \ge 0" /></td>
            </tr>
            <tr>
              <td><M t="f" /> <strong>konvex (<M t="\cup" />)</strong></td>
              <td><M t="f'" /> <strong>növekvő</strong></td>
              <td><M t="f'' > 0" /> (<M t="x" />-tengely felett)</td>
            </tr>
            <tr>
              <td><M t="f" /> <strong>konkáv (<M t="\cap" />)</strong></td>
              <td><M t="f'" /> <strong>csökkenő</strong></td>
              <td><M t="f'' < 0" /> (<M t="x" />-tengely alatt)</td>
            </tr>
            <tr>
              <td><M t="f" /> <strong>inflexiós pont</strong></td>
              <td><M t="f'" />-nek <strong>lokális szélsőértéke</strong> van!</td>
              <td><M t="f''" /> <strong>előjelet vált</strong>!</td>
            </tr>
          </tbody>
        </table>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={15}
          q={
            <>
              Ha egy sima <M t="f" /> függvény deriváltjának (<M t="f'" />) lokális maximuma van <M t="x=4" />-nél, mit jelent ez az eredeti <M t="f" /> függvényre nézve?
            </>
          }
        >
          <p>
            Azt, hogy <M t="x=4" />-nél <M t="f'" /> növekvőből csökkenőbe vált — tehát <M t="f" /> <strong>konvexből konkávba</strong> vált: <M t="(4;\,f(4))" /> <strong>inflexiós pont</strong>!
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Lehet-e egy függvény egyszerre <em>csökkenő</em> és <em>konvex</em>? Adj egy egyszerű példát!
            </>
          }
        >
          <p>
            Igen! Például <M t="f(x)=x^2" /> a <M t="(-\infty;\,0)" /> intervallumon (vagy <M t="f(x)=1/x" /> a <M t="(0;\,\infty)" />-n): <M t="f'<0" /> és <M t="f''>0" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 9
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <p>
          Foglaljuk össze a 4.4 legfontosabb tanulságait egyetlen pillantásra:
        </p>
        <ul>
          <li><strong>Konvexitás:</strong> <M t="f''>0 \Rightarrow" /> konvex (<M t="\cup" />, érintő alulról); <M t="f''<0 \Rightarrow" /> konkáv (<M t="\cap" />, érintő felülről).</li>
          <li><strong>Inflexiós pont:</strong> folytonos pont (érintővel), ahol <M t="f''" /> <strong>előjelet vált</strong>!</li>
          <li><strong>Második derivált teszt:</strong> <M t="f'(c)=0" /> mellett <M t="f''(c)<0 \Rightarrow" /> lok. max; <M t="f''(c)>0 \Rightarrow" /> lok. min; <M t="f''(c)=0 \Rightarrow" /> nem dönt!</li>
          <li><strong>Függvényvizsgálat:</strong> tartomány/szimmetria → metszéspontok → aszimptoták → <M t="f'" /> → <M t="f''" /> → közös táblázat → rajz!</li>
        </ul>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. <M t="f''(c)=0" /> ≠ biztos inflexió!</strong> Mindig ellenőrizd, hogy <M t="f''" /> valóban <em>előjelet vált-e</em> (<M t="x^4" />-nél <M t="f''(0)=0" />, mégsem inflexiós pont!).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A második derivált teszt erőltetése <M t="f''(c)=0" />-nál:</strong> ha <M t="f''(c)=0" />, sose mondd, hogy „nincs szélsőérték”! Térj vissza az első derivált teszthez!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Szakadási hely kinevezése inflexiós pontnak:</strong> ha <M t="f''" /> előjelet vált egy aszimptotánál (pl. <M t="1/x" /> az <M t="x=0" />-nál), az <strong>nem</strong> inflexiós pont, mert a függvény nincs is ott értelmezve!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Növekvő ≠ konvex:</strong> a növekedést <M t="f'>0" />, a konvexitást <M t="f''>0" /> dönti el! A kettő teljesen független egymástól (mind a 4 kombináció létezik).
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 10
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Határozd meg az <M t="f(x)=x^3 - 3x + 2" /> függvény konvex/konkáv intervallumait és inflexiós pontját!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-3" />, <M t="f''(x)=6x" />.
          </p>
          <p>
            Konkáv: <M t="(-\infty;\,0)" />; konvex: <M t="(0;\,\infty)" />; inflexiós pont: <M t="(0;\,2)" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Használd a második derivált tesztet az <M t="f(x)=2x^3 - 6x^2 + 5" /> függvény lokális szélsőértékeinek meghatározására!
            </>
          }
        >
          <p>
            <M t="f'(x)=6x^2-12x=6x(x-2)=0 \Rightarrow x=0,\; x=2" />.
          </p>
          <p>
            <M t="f''(x)=12x-12" />. <M t="f''(0)=-12 < 0" /> → <strong>lok. max:</strong> <M t="f(0)=5" />; <M t="f''(2)=12 > 0" /> → <strong>lok. min:</strong> <M t="f(2)=-3" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Hol konvex az <M t="f(x)=\cos x" /> függvény a <M t="[0;\,2\pi]" /> intervallumon?
            </>
          }
        >
          <p>
            <M t="f''(x)=-\cos x > 0 \iff \cos x < 0 \iff x \in \left(\dfrac{\pi}{2};\,\dfrac{3\pi}{2}\right)" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={20}
          q={
            <>
              Határozd meg az <M t="f(x)=x^4 - 6x^2 + 4" /> függvény lokális szélsőértékeit és inflexiós pontjait!
            </>
          }
        >
          <p>
            <M t="f'(x)=4x^3-12x=4x(x^2-3)=0 \Rightarrow x=0,\; \pm\sqrt{3}" />.
          </p>
          <p>
            <M t="f''(x)=12x^2-12=12(x^2-1)" />. Teszt: <M t="f''(0)=-12 < 0" /> → <strong>lok. max</strong> <M t="(0;\,4)" />; <M t="f''(\pm\sqrt{3})=24 > 0" /> → <strong>lok. min</strong> <M t="(\pm\sqrt{3};\,-5)" />.
          </p>
          <p>
            Inflexiós pontok (<M t="f''=0" />, előjelváltással): <M t="x=\pm 1" />, vagyis <M t="(-1;\,-1)" /> és <M t="(1;\,-1)" />!
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              Vizsgáld meg az <M t="f(x)=\dfrac{1}{x^2+3}" /> függvény konvexitását és inflexiós pontjait!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{-2x}{(x^2+3)^2}" />, <M t="f''(x)=\dfrac{-2(x^2+3)^2 - (-2x)\cdot 2(x^2+3)(2x)}{(x^2+3)^4}=\dfrac{6x^2-6}{(x^2+3)^3}=\dfrac{6(x^2-1)}{(x^2+3)^3}" />.
          </p>
          <p>
            Konvex: <M t="(-\infty;\,-1)" /> és <M t="(1;\,\infty)" />; konkáv: <M t="(-1;\,1)" />; inflexiós pontok: <M t="\left(\pm 1;\,\dfrac{1}{4}\right)" />!
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              Határozd meg az <M t="f(x)=x^{5/3}-5x^{2/3}" /> függvény inflexiós pontját!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{5}{3}x^{2/3}-\dfrac{10}{3}x^{-1/3}" />, <M t="f''(x)=\dfrac{10}{9}x^{-1/3}+\dfrac{10}{9}x^{-4/3}=\dfrac{10(x+1)}{9x^{4/3}}" />.
          </p>
          <p>
            Mivel <M t="x^{4/3}>0" />, <M t="x=0" />-nál nincs előjelváltás (<M t="+\to +" />), viszont <M t="x=-1" />-nél <M t="-\to +" /> vált → az egyetlen inflexiós pont: <M t="(-1;\,-6)" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={23}
          q={
            <>
              Mutasd meg, hogy <strong>minden</strong> <M t="f(x)=ax^3+bx^2+cx+d" /> (<M t="a\ne 0" />) harmadfokú polinomnak <em>pontosan egy</em> inflexiós pontja van, és a grafikon szimmetrikus erre a pontra!
            </>
          }
        >
          <p>
            <M t="f''(x)=6ax+2b" /> egy elsőfokú lineáris függvény (<M t="6a\ne 0" />), ezért <strong>pontosan egy</strong> zérushelye van, <M t="x_0=-\dfrac{b}{3a}" />, ahol biztosan előjelet vált!
          </p>
          <p>
            (Ha az origót eltoljuk <M t="(x_0;\,f(x_0))" />-be, a másodfokú tag eltűnik, így páratlan függvényt kapunk — tehát a görbe középpontosan szimmetrikus az inflexiós pontjára!)
          </p>
        </Task>
        <Task
          n={24}
          q={
            <>
              Határozd meg az <M t="a, b" /> valós számokat úgy, hogy az <M t="f(x)=x^3 + ax^2 + bx" /> függvénynek lokális szélsőértéke legyen <M t="x=1" />-nél és inflexiós pontja <M t="x=2" />-nél! Maximum vagy minimum van <M t="x=1" />-nél?
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2+2ax+b" />, <M t="f''(x)=6x+2a" />.
          </p>
          <p>
            1) Inflexió <M t="x=2" />-nél: <M t="f''(2)=12+2a=0 \Rightarrow a=-6" />.
          </p>
          <p>
            2) Szélsőérték <M t="x=1" />-nél: <M t="f'(1)=3+2(-6)+b=0 \Rightarrow b=9" />.
          </p>
          <p>
            3) Teszt: <M t="f''(1)=6-12=-6 < 0" /> → <strong>lokális maximum</strong> van <M t="x=1" />-nél!
          </p>
        </Task>
        <Task
          n={25}
          q={
            <>
              Végezd el az <M t="f(x)=\dfrac{x^2+1}{x} = x + \dfrac{1}{x}" /> függvény teljes vizsgálatát (szimmetria, ferde és függőleges aszimptota, szélsőértékek, konvexitás)!
            </>
          }
        >
          <p>
            <strong>1. Tartomány és szimmetria:</strong> <M t="x\ne 0" />, páratlan (<M t="f(-x)=-f(x)" />).
          </p>
          <p>
            <strong>2. Aszimptoták:</strong> függőleges <M t="x=0" />; ferde aszimptota <M t="y=x" /> (mert <M t="1/x \to 0" />).
          </p>
          <p>
            <strong>3. Deriváltak:</strong> <M t="f'(x)=1-\dfrac{1}{x^2}=0 \Rightarrow x=\pm 1" />; <M t="f''(x)=\dfrac{2}{x^3}" />.
          </p>
          <p>
            <strong>4. Eredmény:</strong> <M t="f''(-1)=-2<0" /> → lok. max <M t="(-1;\,-2)" />; <M t="f''(1)=2>0" /> → lok. min <M t="(1;\,2)" />. <M t="(-\infty;\,0)" />-n konkáv, <M t="(0;\,\infty)" />-n konvex, inflexiós pont nincs!
          </p>
        </Task>
      </>
    ),
  },
];
