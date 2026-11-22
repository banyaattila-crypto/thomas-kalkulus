import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  BolzanoWidget,
  CompositeLimitWidget,
  ContinuityCheckWidget,
  DiscontinuityCatalogWidget,
  ExtensionWidget,
} from '../components/Widgets26';
import type { Page } from './s1_1';

export const S2_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Pontbeli folytonosság és a hármas feltétel',
    body: (
      <>
        <Story>
          <p>
            Egy meteorológiai állomás óránként méri a hőmérsékletet: 8 órakor 6 °C, 9 órakor 9 °C. Amikor a két pontot összekötjük egy görbével, hallgatólagosan feltesszük, hogy a hőmérséklet nem ugrott át egyetlen értéket sem, hanem <em>folytonosan</em> változott. A fizikában és a mérnöki gyakorlatban a legtöbb folyamat ilyen — a kalkulus ennek ad pontos matematikai nevet.
          </p>
        </Story>
        <p>
          Szemléletesen egy görbe akkor folytonos, ha a ceruza felemelése nélkül meg tudjuk rajzolni. Precízen ahhoz, hogy egy függvény valamely pontban ne szakadjon meg, a határértéknek pontosan egybe kell esnie a függvényértékkel.
        </p>
        <Def title="Pontbeli folytonosság">
          <p>
            <strong>Belső pontban:</strong> az <M t="f" /> függvény értelmezési tartománya egy belső <M t="c" /> pontjában folytonos, ha
          </p>
          <M block t="\lim_{x\to c}f(x)=f(c)." />
          <p>
            <strong>Végpontban:</strong> bal oldali <M t="a" /> végpontban (<em>jobbról folytonos</em>), ha <M t="\lim_{x\to a^+}f(x)=f(a)" />; jobb oldali <M t="b" /> végpontban (<em>balról folytonos</em>), ha <M t="\lim_{x\to b^-}f(x)=f(b)" />.
          </p>
        </Def>
        <p>
          A gyakorlatban egyetlen belső pont ellenőrzése <strong>három egymásra épülő feltételt</strong> jelent:
        </p>
        <Def title="A pontbeli folytonosság hármas feltétele">
          <ol>
            <li><M t="f(c)" /> létezik (vagyis <M t="c" /> eleme az értelmezési tartománynak);</li>
            <li><M t="\lim_{x\to c}f(x)" /> létezik (véges szám);</li>
            <li><M t="\lim_{x\to c}f(x)=f(c)" />.</li>
          </ol>
        </Def>
        <p>
          Ha bármelyik feltétel sérül, akkor <M t="f" />-nek <M t="c" />-ben <strong>szakadása</strong> van. Például a <M t="\sqrt{9-x^2}" /> félkör a teljes <M t="[-3;\,3]" /> intervallumon folytonos (a végpontokban féloldalról), míg az <M t="\lfloor x\rfloor" /> alsó egészrészfüggvény minden nem egész helyen folytonos, az egész számoknál viszont csak <em>jobbról</em> folytonos.
        </p>
        <ContinuityCheckWidget />
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Az <M t="f(x)=\begin{cases}x^2+1,&x<2\\ 3,&x=2\\ 7-x,&x>2\end{cases}" /> függvény folytonos-e az <M t="x=2" /> helyen? A hármas feltétel melyik pontja sérül?
            </>
          }
        >
          <p>
            1. <M t="f(2)=3" /> (létezik). 2. Balról <M t="2^2+1=5" />, jobbról <M t="7-2=5" />, tehát <M t="\lim_{x\to 2}f(x)=5" /> (létezik).
          </p>
          <p>
            3. Mivel <M t="5\ne 3" />, a harmadik feltétel sérül: <M t="f" /> <strong>nem folytonos</strong> <M t="x=2" />-ben.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Igaz-e, hogy az <M t="f(x)=\lfloor x\rfloor" /> alsó egészrészfüggvény folytonos az <M t="x=2{,}7" /> helyen? És az <M t="x=3" /> helyen?
            </>
          }
        >
          <p>
            Az <M t="x=2{,}7" /> egy nyílt környezetében (<M t="(2;\,3)" />) a függvény állandóan 2, tehát <M t="\lim_{x\to 2{,}7}\lfloor x\rfloor=2=\lfloor 2{,}7\rfloor" />: itt folytonos.
          </p>
          <p>
            Az <M t="x=3" /> helyen balról 2, jobbról 3 a határérték, így kétoldali határérték nincs: itt nem folytonos (csak jobbról folytonos).
          </p>
        </Task>
        <Task
          n={3}
          q={
            <>
              Folytonos-e a <M t="g(x)=\sqrt{x-5}" /> függvény az <M t="x=5" /> pontban?
            </>
          }
        >
          <p>
            Az értelmezési tartomány <M t="[5;\,\infty)" />, tehát <M t="x=5" /> bal oldali végpont. Mivel <M t="\lim_{x\to 5^+}\sqrt{x-5}=0=g(5)" />, a függvény <strong>folytonos</strong> <M t="x=5" />-ben (jobbról folytonos).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A szakadási helyek katalógusa',
    body: (
      <>
        <p>
          Nem minden szakadás egyforma: van, amelyiket egyetlen pont megváltoztatásával el lehet tüntetni, és van, amelyik alapvető törést vagy végtelenbe futást jelent. Négy alaptípust különböztetünk meg:
        </p>
        <ul>
          <li>
            <strong>Megszüntethető szakadás:</strong> a kétoldali határérték létezik és véges, csak <M t="f(c)" /> hiányzik (lyuk) vagy más értéket vesz fel (kiugró pont).
          </li>
          <li>
            <strong>Ugrás:</strong> a bal és a jobb oldali határérték is létezik és véges, de nem egyenlők (pl. <M t="\lfloor x\rfloor" /> vagy az egységugrás).
          </li>
          <li>
            <strong>Végtelen szakadás:</strong> legalább az egyik féloldali határérték <M t="+\infty" /> vagy <M t="-\infty" /> (függőleges aszimptota, pl. <M t="1/x^2" />).
          </li>
          <li>
            <strong>Oszcilláló szakadás:</strong> a függvény olyan gyorsan rezeg a pont körül, hogy féloldali határértéke sincs (pl. <M t="\sin(2/x)" />).
          </li>
        </ul>
        <DiscontinuityCatalogWidget />
        <p>
          Fontos megjegyzés: egy <M t="c" /> pont akkor is lehet szakadási hely, ha <em>nem eleme az értelmezési tartománynak</em> (például <M t="1/x^2" /> esetén <M t="x=0" />).
        </p>
        <h3>Feladatok</h3>
        <Task
          n={4}
          q={
            <>
              Osztályozd az <M t="x=0" /> helyen fellépő szakadást: (a) <M t="\dfrac{\sin(2x)}{x}" />, (b) <M t="\dfrac{|x|}{x}" />, (c) <M t="\dfrac{1}{x}" />!
            </>
          }
        >
          <p>
            (a) Mivel <M t="\lim_{x\to 0}\dfrac{\sin(2x)}{x}=2" /> véges, de 0-ban nincs értelmezve: <strong>megszüntethető szakadás</strong>.
          </p>
          <p>
            (b) Balról <M t="-1" />, jobbról <M t="+1" />: <strong>ugrásszakadás</strong>. (c) Balról <M t="-\infty" />, jobbról <M t="+\infty" />: <strong>végtelen szakadás</strong>.
          </p>
        </Task>
        <Task
          n={5}
          q={
            <>
              Keresd meg és osztályozd az <M t="f(x)=\dfrac{x-3}{x^2-9}" /> függvény összes szakadási helyét!
            </>
          }
        >
          <p>
            A nevező zérushelyei <M t="x=3" /> és <M t="x=-3" />. Egyszerűsítve: <M t="f(x)=\dfrac{1}{x+3}" /> (<M t="x\ne 3" />).
          </p>
          <p>
            Az <M t="x=3" /> helyen a határérték véges (<M t="1/6" />): <strong>megszüntethető szakadás</strong>. Az <M t="x=-3" /> helyen a határérték <M t="\pm\infty" />: <strong>végtelen szakadás</strong>.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Milyen típusú szakadása van a <M t="g(x)=\cos\!\left(\tfrac{1}{x-1}\right)" /> függvénynek az <M t="x=1" /> helyen?
            </>
          }
        >
          <p>
            Ahogy <M t="x\to 1" />, az <M t="\frac{1}{x-1}" /> végtelenbe tart, így a koszinusz végtelen sokszor befutja a <M t="[-1;\,1]" /> intervallumot: <strong>oszcilláló szakadás</strong>.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Folytonos függvények, műveletek és kompozíció',
    body: (
      <>
        <p>
          Egy függvényt <strong>folytonosnak</strong> nevezünk egy intervallumon, ha annak minden pontjában folytonos. Ha azt mondjuk röviden, hogy „<M t="f" /> folytonos függvény”, az azt jelenti, hogy <em>értelmezési tartománya minden pontjában</em> folytonos. Így például <M t="y=1/x" /> folytonos függvény (a <M t="(-\infty;\,0)\cup(0;\,\infty)" /> halmazon mindenhol folytonos), de nem folytonos a <M t="[-1;\,1]" /> intervallumon!
        </p>
        <Def title="Tétel (folytonos függvények algebrai műveletei)">
          <p>
            Ha <M t="f" /> és <M t="g" /> folytonos <M t="c" />-ben, akkor ugyanott folytonos <M t="f+g" />, <M t="f-g" />, <M t="f\cdot g" />, <M t="k\cdot f" />, továbbá <M t="f/g" /> (ha <M t="g(c)\ne 0" />) és <M t="f^{r/s}" /> (ahol értelmezve van).
          </p>
        </Def>
        <p>
          Ebből azonnal következik, hogy minden <strong>polinom</strong> mindenütt folytonos, minden <strong>racionális törtfüggvény</strong> folytonos ott, ahol a nevezője nem nulla, és az <strong>abszolútérték</strong> (<M t="|x|" />) valamint a <strong>trigonometrikus függvények</strong> is folytonosak az értelmezési tartományuk minden pontjában.
        </p>
        <Def title="Tétel (összetett függvények folytonossága)">
          <p>
            Ha <M t="f" /> folytonos <M t="c" />-ben, és <M t="g" /> folytonos az <M t="f(c)" /> pontban, akkor a <M t="g\circ f" /> összetett függvény folytonos <M t="c" />-ben. Következésképp:
          </p>
          <M block t="\lim_{x\to c} g\big(f(x)\big) = g\!\left(\lim_{x\to c} f(x)\right) = g\big(f(c)\big)." />
        </Def>
        <p>
          Ez a gyakorlatban hatalmas könnyebbség: ha a külső függvény folytonos a belső határértékében, a határérték-képzés egyszerűen „bevihető” a külső függvény alá!
        </p>
        <CompositeLimitWidget />
        <h3>Feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Mely pontokban folytonosak az alábbi függvények? (a) <M t="y=\dfrac{x+4}{x^2-5x+6}" />, (b) <M t="y=\dfrac{\sqrt{x+1}}{1+\sin^2 x}" />.
            </>
          }
        >
          <p>
            (a) A nevező <M t="(x-2)(x-3)=0 \iff x=2" /> vagy <M t="x=3" />. Minden más valós számban folytonos.
          </p>
          <p>
            (b) A nevező <M t="1+\sin^2 x\ge 1>0" /> sosem 0, a gyök <M t="x\ge -1" /> esetén értelmezett és folytonos: a függvény a <M t="[-1;\,\infty)" /> intervallumon mindenütt folytonos.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki a kompozíció folytonosságával: <M t="\lim_{x\to \pi}\sin\!\big(x-\sin x\big)" />!
            </>
          }
        >
          <p>
            A belső <M t="x-\sin x" /> és a külső <M t="\sin" /> is mindenütt folytonos, tehát elég behelyettesíteni: <M t="\sin(\pi-\sin\pi)=\sin(\pi-0)=0" />.
          </p>
        </Task>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: <M t="\lim_{t\to 0}\cos\!\left(\dfrac{\pi}{\sqrt{19-3\sec(2t)}}\right)" />!
            </>
          }
        >
          <p>
            Mivel <M t="\sec(0)=1/\cos(0)=1" />, a gyök alatt <M t="19-3=16>0" />, így a tört <M t="\pi/\sqrt{16}=\pi/4" />-hez tart. A koszinusz folytonossága miatt a határérték <M t="\cos(\pi/4)=\dfrac{\sqrt{2}}{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Függvény folytonos kiterjesztése',
    body: (
      <>
        <p>
          Ha egy függvénynek valamely <M t="c" /> pontban <em>megszüntethető szakadása</em> van, egyetlen új függvényérték megadásával „befoltozhatjuk” a lyukat.
        </p>
        <Def title="Folytonos kiterjesztés">
          <p>
            Ha az <M t="f" /> függvény <M t="x=c" />-ben nincs értelmezve, de létezik a véges <M t="L=\lim_{x\to c}f(x)" /> határérték, akkor az
          </p>
          <M block t="F(x)=\begin{cases}f(x),&x\ne c\\ L,&x=c\end{cases}" />
          <p>
            függvény már folytonos <M t="x=c" />-ben; ezt nevezzük <M t="f" /> <strong><M t="c" />-re való folytonos kiterjesztésének</strong>.
          </p>
        </Def>
        <p>
          Klasszikus példa a <M t="\frac{\sin x}{x}" /> függvény, amely <M t="0" />-ban nincs értelmezve, de <M t="F(0)=1" /> kiegészítéssel mindenütt folytonossá válik. Racionális törteknél pedig az egyszerűsített képlet azonnal megadja az <M t="F(x)" /> kiterjesztést:
        </p>
        <M block t="f(x)=\frac{x^2-x-6}{x^2-9}=\frac{(x-3)(x+2)}{(x-3)(x+3)}=\frac{x+2}{x+3}\quad(x\ne 3) \;\Longrightarrow\; F(3)=\frac{5}{6}." />
        <ExtensionWidget />
        <h3>Feladatok</h3>
        <Task
          n={10}
          q={
            <>
              Milyen <M t="g(2)" /> értékkel válik folytonossá a <M t="g(x)=\dfrac{x^2+3x-10}{x-2}" /> függvény az <M t="x=2" /> helyen?
            </>
          }
        >
          <p>
            Szorzattá bontva: <M t="\dfrac{(x-2)(x+5)}{x-2}=x+5" /> (<M t="x\ne 2" />). A határérték <M t="2+5=7" />, tehát <M t="g(2)=7" />.
          </p>
        </Task>
        <Task
          n={11}
          q={
            <>
              Milyen <M t="k" /> valós szám esetén lesz mindenütt folytonos az <M t="f(x)=\begin{cases}kx^2+2,&x\le 1\\ 3x-k,&x>1\end{cases}" /> függvény?
            </>
          }
        >
          <p>
            Mindkét darab polinom, így csak <M t="x=1" />-ben lehet gond. Balról és <M t="f(1)" />-ben az érték <M t="k+2" />, jobbról <M t="3-k" />.
          </p>
          <p>
            A folytonossághoz <M t="k+2=3-k \iff 2k=1 \iff k=\dfrac{1}{2}" /> szükséges.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A Bolzano-tétel és a zérushelyek keresése',
    body: (
      <>
        <p>
          A zárt intervallumon folytonos függvények egyik legfontosabb tulajdonsága, hogy <strong>nem tudnak „átugrani” egyetlen közbenső értéket sem</strong>: ha elindulnak egy magasságból és egy másik magasságba jutnak, közben minden közbülső szintet érinteniük kell.
        </p>
        <Def title="Bolzano-tétel (közbenső értékek tétele)">
          <p>
            Ha az <M t="f" /> függvény folytonos az <M t="[a;\,b]" /> zárt intervallumon, és <M t="y_0" /> bármely <M t="f(a)" /> és <M t="f(b)" /> közötti szám, akkor létezik legalább egy olyan <M t="c\in[a;\,b]" />, amelyre
          </p>
          <M block t="f(c)=y_0." />
        </Def>
        <p>
          A tételnek két azonnali, rendkívül hasznos következménye van:
        </p>
        <ul>
          <li>
            <strong>Összefüggőség:</strong> egy zárt intervallumon folytonos görbe egyetlen összefüggő darabból áll — nem szakadhat két ágra és nem ugorhat.
          </li>
          <li>
            <strong>Zérushely létezése:</strong> ha <M t="f" /> folytonos <M t="[a;\,b]" />-n, és <M t="f(a)" /> valamint <M t="f(b)" /> <em>ellentétes előjelű</em>, akkor az <M t="y_0=0" /> értéket biztosan felveszi, vagyis az <M t="f(x)=0" /> egyenletnek van legalább egy gyöke <M t="(a;\,b)" />-ben!
          </li>
        </ul>
        <p>
          Erre épül a <strong>felező (biszekciós) módszer</strong>: felezzük az intervallumot, és mindig azt a felét tartjuk meg, amelynek a végpontjain továbbra is ellentétes az előjel. Így bármilyen pontossággal bezárhatjuk a gyököt!
        </p>
        <BolzanoWidget />
        <h3>Feladatok</h3>
        <Task
          n={12}
          q={
            <>
              Igazold a Bolzano-tétellel, hogy az <M t="x^3-4x+1=0" /> egyenletnek van gyöke a <M t="[0;\,1]" /> intervallumon!
            </>
          }
        >
          <p>
            Az <M t="f(x)=x^3-4x+1" /> polinom, tehát folytonos <M t="[0;\,1]" />-en. A végpontokban <M t="f(0)=1>0" /> és <M t="f(1)=-2<0" />.
          </p>
          <p>
            Mivel <M t="0" /> a két érték közé esik, a Bolzano-tétel garantálja, hogy van <M t="c\in(0;\,1)" />, ahol <M t="f(c)=0" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Igazold, hogy létezik olyan <M t="x\in(0;\,\pi/2)" /> szög, amelyre <M t="\cos x = x" />!
            </>
          }
        >
          <p>
            Tekintsük a <M t="g(x)=\cos x - x" /> függvényt! Folytonos <M t="[0;\,\pi/2]" />-n, továbbá <M t="g(0)=1>0" /> és <M t="g(\pi/2)=0-\pi/2<0" />.
          </p>
          <p>
            A Bolzano-tétel szerint van olyan <M t="c\in(0;\,\pi/2)" />, amelyre <M t="g(c)=0" />, vagyis <M t="\cos c = c" /> (ez kb. <M t="0{,}739" /> rad).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és vegyes gyakorlás',
    body: (
      <>
        <p>
          A folytonosság vizsgálata minden későbbi tétel (deriválás, szélsőértékek, integrálás) alapfeltétele. A legfontosabb szempontok egy helyen:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>kérdés</th>
              <th>ellenőrzés</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Folytonos-e <M t="f" /> egy belső <M t="c" /> pontban?</td>
              <td>Hármas feltétel: <M t="f(c)" /> létezik, <M t="\lim_{x\to c}f(x)" /> létezik, és a kettő egyenlő</td>
            </tr>
            <tr>
              <td>Folytonos-e végpontban (<M t="a" /> vagy <M t="b" />)?</td>
              <td>Csak a belső oldal felőli féloldali határértéknek kell egyeznie a függvényértékkel</td>
            </tr>
            <tr>
              <td>Megszüntethető-e a szakadás?</td>
              <td>Csak akkor, ha a kétoldali határérték létezik és véges</td>
            </tr>
            <tr>
              <td>Van-e gyök <M t="[a;\,b]" />-n?</td>
              <td>Folytonosság <M t="[a;\,b]" />-n + <M t="f(a)" /> és <M t="f(b)" /> ellentétes előjelű (Bolzano-tétel)</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy gyakori hiba</h3>
        <Warn>
          <p>
            <strong>1. „Folytonos függvény” ≠ „mindenütt folytonos”:</strong> az <M t="1/x" /> folytonos a saját értelmezési tartományán, de az <M t="x=0" /> helyen szakadása van — ezért nem alkalmazható rá a Bolzano-tétel a <M t="[-1;\,1]" /> intervallumon!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Csak a határérték ellenőrzése:</strong> attól, hogy <M t="\lim_{x\to c}f(x)" /> létezik, a függvény még nem biztos, hogy folytonos <M t="c" />-ben — ellenőrizni kell azt is, hogy <M t="f(c)" /> megegyezik vele!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. A Bolzano-tétel szakadásos függvényre:</strong> <M t="f(x)=1/x" /> esetén <M t="f(-1)=-1<0" /> és <M t="f(1)=1>0" />, még sincs zérushelye, mert <M t="0" />-ban szakadása van.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Azonos előjel ≠ nincs gyök:</strong> ha <M t="f(a)" /> és <M t="f(b)" /> azonos előjelű, a Bolzano-tétel <em>nem zárja ki</em> a gyököt (pl. <M t="x^2-0{,}25" /> a <M t="[-1;\,1]" />-en mindkét végpontban pozitív, mégis két gyöke van).
          </p>
        </Warn>
        <h3>Vegyes feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="a" /> és <M t="b" /> valós számokat úgy, hogy az
              <M block t="f(x)=\begin{cases}2x-1,&x<1\\ ax+b,&1\le x\le 3\\ x^2-2,&x>3\end{cases}" />
              függvény mindenütt folytonos legyen!
            </>
          }
        >
          <p>
            Az <M t="x=1" /> csatlakozásnál: <M t="2(1)-1=1" /> és <M t="a(1)+b=a+b" />, tehát <M t="a+b=1" />.
          </p>
          <p>
            Az <M t="x=3" /> csatlakozásnál: <M t="3a+b" /> és <M t="3^2-2=7" />, tehát <M t="3a+b=7" />. A két egyenletet kivonva <M t="2a=6 \Rightarrow a=3" />, amiből <M t="b=1-3=-2" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Igazold, hogy minden páratlan fokú polinomnak (pl. <M t="P(x)=x^5-3x^2+2x-10" />) van legalább egy valós zérushelye!
            </>
          }
        >
          <p>
            A <M t="P(x)" /> polinom mindenütt folytonos. Nagy pozitív <M t="x" />-re a domináns <M t="x^5" /> tag miatt <M t="P(x)\to +\infty" /> (így van <M t="b" />, ahol <M t="P(b)>0" />), nagy negatív <M t="x" />-re pedig <M t="P(x)\to -\infty" /> (van <M t="a" />, ahol <M t="P(a)<0" />).
          </p>
          <p>
            A Bolzano-tétel szerint az <M t="[a;\,b]" /> intervallumon biztosan létezik olyan <M t="c" />, amelyre <M t="P(c)=0" />.
          </p>
        </Task>
      </>
    ),
  },
];
