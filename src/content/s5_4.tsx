import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AreaAccumulationWidget,
  FTCLoopDiagram,
  IntegralMVTWidget,
  LeibnizRuleDiagram,
  TotalAreaSplitWidget,
  VelocityDisplacementWidget,
} from '../components/Widgets54';
import type { Page } from './s1_1';

export const S5_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Az integrálszámítás középértéktétele',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a teljes kalkulus egyik legnagyobb pillanatához: a <strong>Newton–Leibniz-tételhez</strong> (az analízis alaptételéhez), amely összeköti a deriválást és az integrálást, és pillanatok alá rövidíti a Riemann-összegek hosszadalmas számolását. Mielőtt kimondanánk, szükségünk van egy elegáns kis kulcs-tételre az 5.3-ban megismert átlagértékről!
          </p>
        </Story>
        <Def title="3. Tétel — Az integrálszámítás középértéktétele">
          <p>
            Ha az <M t="f" /> függvény <strong>folytonos</strong> az <M t="[a;\,b]" /> zárt intervallumon, akkor létezik legalább egy olyan <M t="c \in [a;\,b]" /> pont, amelyben a függvény pontosan felveszi az átlagértékét:
          </p>
          <M block t="f(c) \;=\; \frac{1}{b-a}\int_{a}^{b} f(x)\,dx \qquad\Longleftrightarrow\qquad \int_{a}^{b} f(x)\,dx \;=\; f(c)\,(b-a)." />
        </Def>
        <h3>Háromsoros bizonyítás (5.3 + 2.6 összekapcsolása)</h3>
        <ol className="steps">
          <li>
            Az 5.3-as szakasz max–min egyenlőtlensége (6. szabály) szerint: <M t="\min f\cdot(b-a) \le \int_a^b f(x)\,dx \le \max f\cdot(b-a)" />.
          </li>
          <li>
            Osszuk el mindhárom oldalt <M t="(b-a) > 0" />-val:
            <M block t="\min f \;\le\; \frac{1}{b-a}\int_{a}^{b} f(x)\,dx \;\le\; \max f." />
          </li>
          <li>
            Mivel <M t="f" /> <strong>folytonos</strong>, a <em>közbensőérték-tétel</em> (2.6) garantálja, hogy a minimuma és maximuma között <em>minden</em> értéket felvesz — tehát az átlagértéket is legalább egy <M t="c\in[a;\,b]" /> helyen!
          </li>
        </ol>
        <p>
          Próbáld ki az alábbi ábrán mind a négy esetet — különösen az utolsót (a szakadásos lépcsős függvényt), ahol világosan látszik, miért elengedhetetlen a folytonosság!
        </p>
        <IntegralMVTWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Határozd meg az <M t="f(x)=3x^2" /> függvény átlagértékét a <M t="[0;\,2]" /> intervallumon, majd keresd meg azt a <M t="c\in[0;\,2]" /> pontot, ahol ezt az átlagértéket felveszi!
            </>
          }
        >
          <p>
            Az 5.3 alapképletével: <M t="\int_0^2 3x^2\,dx = 3\cdot\frac{2^3-0}{3} = 8" />, így <M t="f_{\text{átlag}} = \frac{8}{2-0} = 4" />.
          </p>
          <p>
            Oldjuk meg az <M t="f(c)=4" /> egyenletet: <M t="3c^2 = 4 \implies c = \dfrac{2}{\sqrt{3}} = \mathbf{\dfrac{2\sqrt{3}}{3}} \approx 1{,}155 \in [0;\,2]" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Miért nem mond ellent a középértéktételnek az, hogy a <M t="g(x)=\begin{cases}0 & (0\le x < 1)\\ 2 & (1\le x\le 2)\end{cases}" /> függvény a <M t="[0;\,2]" /> intervallumon sehol sem veszi fel az <M t="1" />-es átlagértékét?
            </>
          }
        >
          <p>
            Mert <M t="g(x)" /> az <M t="x=1" /> pontban <strong>ugrási szakadással</strong> rendelkezik, tehát nem folytonos a <M t="[0;\,2]" /> intervallumon — nem teljesül a tétel előfeltétele!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A területfüggvény és a Newton–Leibniz-tétel 1. része',
    body: (
      <>
        <Story>
          <p>
            Rögzítsük az integrál alsó határát egy <M t="a" /> pontban, a felső határt viszont hagyjuk szabadon mozogni egy <M t="x" /> változóval! Így egy teljesen új függvényt kapunk:
          </p>
        </Story>
        <M block t="F(x) \;=\; \int_{a}^{x} f(t)\,dt." />
        <p>
          Ez az úgynevezett <strong>területfüggvény</strong> (vagy akkumulációs függvény): megmondja, mekkora előjeles terület gyűlt össze <M t="a" />-tól <M t="x" />-ig. Tegyük fel a milliódolláros kérdést: <strong>milyen gyorsan növekszik <M t="F(x)" />, amikor <M t="x" />-et egy picit jobbra mozdítjuk?</strong>
        </p>
        <p>
          Ha <M t="x" />-ről <M t="x+h" />-ra lépünk, a terület megváltozása (<M t="F(x+h)-F(x)" />) egyetlen keskeny, <M t="h" /> széles és körülbelül <M t="f(x)" /> magas csík! Tehát:
        </p>
        <M block t="F(x+h) - F(x) \;\approx\; f(x)\cdot h \quad\Longrightarrow\quad \frac{F(x+h)-F(x)}{h} \;\approx\; f(x)." />
        <AreaAccumulationWidget />
        <Def title="4. Tétel — A Newton–Leibniz-tétel 1. része">
          <p>
            Ha <M t="f" /> folytonos az <M t="[a;\,b]" /> zárt intervallumon, akkor az <M t="F(x)=\int_a^x f(t)\,dt" /> függvény folytonos <M t="[a;\,b]" />-n, differenciálható <M t="(a;\,b)" />-n, és a deriváltja maga <M t="f(x)" />:
          </p>
          <M block t="F'(x) \;=\; \frac{d}{dx}\int_{a}^{x} f(t)\,dt \;=\; f(x)." />
        </Def>
        <h3>A pontos bizonyítás (a középértéktétellel!)</h3>
        <ol className="steps">
          <li>
            Az integrál additivitása miatt <M t="F(x+h)-F(x) = \int_a^{x+h} f(t)\,dt - \int_a^x f(t)\,dt = \int_x^{x+h} f(t)\,dt" />.
          </li>
          <li>
            Az 1. oldalon bizonyított <em>integrál-középértéktétel</em> szerint az <M t="x" /> és <M t="x+h" /> között van olyan <M t="c_h" /> pont, amelyre:
            <M block t="\frac{F(x+h)-F(x)}{h} \;=\; \frac{1}{h}\int_{x}^{x+h} f(t)\,dt \;=\; f(c_h)." />
          </li>
          <li>
            Amint <M t="h\to 0" />, a közrefogott <M t="c_h" /> pont kénytelen <M t="x" />-hez tartani (<M t="c_h\to x" />). Mivel <M t="f" /> <strong>folytonos</strong> <M t="x" />-ben, <M t="f(c_h)\to f(x)" />, vagyis <M t="F'(x)=f(x)" />! ∎
          </li>
        </ol>
        <p>
          <strong>Óriási elméleti következmény:</strong> minden folytonos függvénynek <em>létezik</em> primitív függvénye (éppen az <M t="F(x)=\int_a^x f(t)\,dt" />), még akkor is, ha azt nem tudjuk elemi függvényekkel felírni (ilyen pl. az <M t="e^{-t^2}" /> vagy a <M t="\frac{\sin t}{t}" />)!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Határozd meg a deriváltat integrálás nélkül: <M t="\dfrac{d}{dx}\displaystyle\int_{2}^{x}\sqrt{1+t^3}\,dt" />!
            </>
          }
        >
          <p>
            Az integrandus <M t="f(t)=\sqrt{1+t^3}" /> folytonos <M t="t > -1" /> esetén, így a Newton–Leibniz-tétel 1. része azonnal adja: <M t="\mathbf{\sqrt{1+x^3}}" />! (Észre sem kell venni, hogy az alsó határ <M t="2" /> — bármely állandó <M t="a" /> ugyanezt a deriváltat adja.)
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki: <M t="\dfrac{d}{dx}\displaystyle\int_{0}^{x}\dfrac{\sin t}{t^2+1}\,dt" />!
            </>
          }
        >
          <p>
            Mivel <M t="\frac{\sin t}{t^2+1}" /> mindenhol folytonos, a derivált egyszerűen <M t="\mathbf{\dfrac{\sin x}{x^2+1}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Változó határok deriválása és függvények konstruálása',
    body: (
      <>
        <Story>
          <p>
            A gyakorlatban az integrál határa gyakran nem puszta <M t="x" />, hanem például <M t="x^2" />, <M t="\sin x" />, vagy éppen az <em>alsó</em> határon ül a változó. Semmi gond: a Newton–Leibniz-tétel 1. része a <strong>láncszabállyal</strong> (3.5) és a <strong>határcserével</strong> (5.3) kombinálva minden esetet pillanatok alatt elintéz!
          </p>
        </Story>
        <LeibnizRuleDiagram />
        <h3>Hogyan működik a 3. és 4. eset?</h3>
        <p>
          Ha <M t="y = \int_a^{u(x)} f(t)\,dt" />, akkor ez két függvény összetétele: <M t="y = F(u)" /> és <M t="u = u(x)" />. A láncszabály szerint:
        </p>
        <M block t="\frac{dy}{dx} \;=\; \frac{dy}{du}\cdot\frac{du}{dx} \;=\; f(u)\cdot u'(x) \;=\; f\bigl(u(x)\bigr)\cdot u'(x)." />
        <p>
          Ha <em>mindkét</em> határ függ <M t="x" />-től, iktassunk be egy tetszőleges állandó <M t="c" /> pontot (additivitás!):
        </p>
        <M block t="\int_{v(x)}^{u(x)} f(t)\,dt = \int_{c}^{u(x)} f(t)\,dt - \int_{c}^{v(x)} f(t)\,dt \;\xrightarrow{\;\frac{d}{dx}\;}\; f\bigl(u(x)\bigr)u'(x) - f\bigl(v(x)\bigr)v'(x)." />
        <h3>Kezdetiérték-feladat (IVP) megoldása integrállal</h3>
        <p>
          Tegyük fel, hogy olyan <M t="y(x)" /> függvényt keresünk, amelyre <M t="y' = f(x)" /> és <M t="y(x_0) = y_0" />. Még ha nem is ismerjük <M t="f" /> elemi primitív függvényét, a 4. tétel alapján azonnal felírhatjuk a pontos megoldást:
        </p>
        <M block t="y(x) \;=\; y_0 + \int_{x_0}^{x} f(t)\,dt." />
        <p>
          Ellenőrizzük! (1) Deriváltja: <M t="y'(x) = 0 + f(x) = f(x)" />. (2) Kezdeti értéke <M t="x=x_0" />-nál: <M t="y(x_0) = y_0 + \int_{x_0}^{x_0} f(t)\,dt = y_0 + 0 = y_0" />! Mindkét feltétel hajszálpontosan teljesül!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Deriváld: (a) <M t="\dfrac{d}{dx}\displaystyle\int_{1}^{x^3}\cos(t^2)\,dt" />, (b) <M t="\dfrac{d}{dx}\displaystyle\int_{x}^{7}\dfrac{1}{1+t^4}\,dt" />!
            </>
          }
        >
          <p>
            (a) <M t="u(x)=x^3" />, <M t="u'(x)=3x^2" />, ezért <M t="\cos\bigl((x^3)^2\bigr)\cdot 3x^2 = \mathbf{3x^2\cos(x^6)}" />.<br />
            (b) Határcserével <M t="-\frac{d}{dx}\int_7^x \frac{1}{1+t^4}\,dt = \mathbf{-\dfrac{1}{1+x^4}}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              (a) Írd fel határozott integrállal annak az <M t="y'=\sqrt{1+x^4}" /> egyenletnek a megoldását, amelyre <M t="y(2)=5" />!<br />
              (b) Számítsd ki: <M t="\dfrac{d}{dx}\displaystyle\int_{x}^{x^2}\sin t\,dt" />!
            </>
          }
        >
          <p>
            (a) <M t="y(x) = 5 + \displaystyle\int_{2}^{x}\sqrt{1+t^4}\,dt" />.<br />
            (b) Mindkét határ változó: <M t="\sin(x^2)\cdot(2x) - \sin(x)\cdot 1 = \mathbf{2x\sin(x^2)-\sin x}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A Newton–Leibniz-tétel 2. része (a kiértékelési tétel)',
    body: (
      <>
        <Story>
          <p>
            Most jön a csattanó, ami miatt a kalkulus megváltoztatta a fizikát és a mérnöki tudományokat! Eddig egyetlen <M t="\int_a^b x^2\,dx" /> kiszámításához is hatványösszegekre és határértékre volt szükség. A tétel 2. része megmutatja, hogy elég megkeresni <strong>bármelyik primitív függvényt</strong> (4.8), és két helyettesítéssel megvan a pontos integrál!
          </p>
        </Story>
        <Def title="5. Tétel — A Newton–Leibniz-tétel 2. része (kiértékelési tétel)">
          <p>
            Ha <M t="f" /> folytonos az <M t="[a;\,b]" /> zárt intervallumon, és <M t="G" /> az <M t="f" /> függvény <strong>bármelyik</strong> primitív függvénye (<M t="G'(x)=f(x)" />), akkor:
          </p>
          <M block t="\int_{a}^{b} f(x)\,dx \;=\; G(b) - G(a) \;=\; \Bigl[G(x)\Bigr]_{a}^{b}." />
        </Def>
        <h3>A varázslatosan rövid bizonyítás</h3>
        <ol className="steps">
          <li>
            Az 1. rész szerint az <M t="F(x)=\int_a^x f(t)\,dt" /> területfüggvénynek is <M t="f(x)" /> a deriváltja: <M t="F'(x)=f(x)=G'(x)" />.
          </li>
          <li>
            A Lagrange-féle középértéktétel következménye (4.2) miatt két azonos deriváltú függvény csak egy <strong>állandóban</strong> különbözhet: <M t="G(x) = F(x) + C" />.
          </li>
          <li>
            Számoljuk ki a <M t="G(b)-G(a)" /> különbséget:
            <M block t="G(b) - G(a) = \bigl(F(b)+C\bigr) - \bigl(F(a)+C\bigr) = F(b) - F(a) = \int_{a}^{b} f(t)\,dt - \underbrace{\int_{a}^{a} f(t)\,dt}_{0} = \int_{a}^{b} f(x)\,dx. \quad \blacksquare" />
          </li>
        </ol>
        <FTCLoopDiagram />
        <h3>Kidolgozott mintapéldák</h3>
        <ul>
          <li>
            <strong>Trigonometrikus:</strong> <M t="\displaystyle\int_{0}^{\pi/3}\sec x\operatorname{tg} x\,dx = \Bigl[\sec x\Bigr]_{0}^{\pi/3} = \sec\frac{\pi}{3} - \sec 0 = 2 - 1 = \mathbf{1}" />.
          </li>
          <li>
            <strong>Hatványalak:</strong> <M t="\displaystyle\int_{1}^{4}\left(\frac{3}{2}\sqrt{x} - \frac{4}{x^2}\right)dx = \Bigl[x^{3/2} + \frac{4}{x}\Bigr]_{1}^{4} = \bigl(8 + 1\bigr) - \bigl(1 + 4\bigr) = 9 - 5 = \mathbf{4}" />.
          </li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki a Newton–Leibniz-tétellel: (a) <M t="\int_{0}^{\pi}\sin x\,dx" />, (b) <M t="\int_{1}^{4}\left(3\sqrt{x}-2\right)dx" />!
            </>
          }
        >
          <p>
            (a) <M t="\Bigl[-\cos x\Bigr]_0^\pi = (-\cos\pi)-(-\cos 0) = 1 - (-1) = \mathbf{2}" />.<br />
            (b) <M t="\Bigl[2x^{3/2}-2x\Bigr]_1^4 = (2\cdot 8 - 8) - (2\cdot 1 - 2) = 8 - 0 = \mathbf{8}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{2}\dfrac{x^3+1}{x^2}\,dx" />! <em>(Tipp: előbb bontsd fel a törtet!)</em>
            </>
          }
        >
          <p>
            <M t="\dfrac{x^3+1}{x^2} = x + x^{-2}" />. Így:
          </p>
          <M block t="\int_{1}^{2}\left(x+x^{-2}\right)dx = \left[\frac{x^2}{2}-\frac{1}{x}\right]_{1}^{2} = \left(2-\frac{1}{2}\right)-\left(\frac{1}{2}-1\right) = \frac{3}{2}-\left(-\frac{1}{2}\right) = \mathbf{2}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Teljes geometriai terület és Arkhimédész tétele',
    body: (
      <>
        <Story>
          <p>
            A Newton–Leibniz-tétel villámgyorsan adja az <strong>előjeles</strong> integrált — de ha egy görbe és az <M t="x" />-tengely által közrezárt <strong>teljes (valódi) geometriai területet</strong> kérdezik, akkor az <M t="x" />-tengely alatti darabok <em>nem</em> vonódhatnak le a fölsőkből!
          </p>
        </Story>
        <Def title="3 lépéses recept a teljes területhez [a; b]-n">
          <ol className="steps">
            <li>
              <strong>Keresd meg a zérushelyeket:</strong> oldd meg az <M t="f(x)=0" /> egyenletet az <M t="(a;\,b)" /> intervallumban!
            </li>
            <li>
              <strong>Oszd fel az intervallumot</strong> a zérushelyeknél olyan részintervallumokra, amelyeken <M t="f(x)" /> már nem vált előjelet!
            </li>
            <li>
              <strong>Integrálj szakaszonként, és add össze az abszolút értékeket:</strong>
              <M block t="A_{\text{teljes}} \;=\; \int_{a}^{b} |f(x)|\,dx \;=\; \sum_{i} \left|\int_{x_{i-1}}^{x_i} f(x)\,dx\right|." />
            </li>
          </ol>
        </Def>
        <TotalAreaSplitWidget />
        <h3>Ókori csoda 3 sorban: Arkhimédész parabolaszelete</h3>
        <p>
          Arkhimédész i. e. 250 körül kimerítési módszerrel, rendkívüli munkával bizonyította be, hogy egy parabolaszelet területe pontosan <strong>kétharmada</strong> az alapja és magassága szorzatának! Nézd meg az <M t="y = 6 - x - x^2" /> parabolát: zérushelyei <M t="x=-3" /> és <M t="x=2" /> (alap: <M t="5" />), csúcspontja <M t="x=-0{,}5" />-nél (magasság: <M t="25/4" />). A Newton–Leibniz-tétellel:
        </p>
        <M block t="\int_{-3}^{2}(6-x-x^2)\,dx = \left[6x - \frac{x^2}{2} - \frac{x^3}{3}\right]_{-3}^{2} = \left(12-2-\frac{8}{3}\right)-\left(-18-\frac{9}{2}+9\right) = \frac{125}{6}." />
        <p>
          És valóban: <M t="\dfrac{2}{3}\cdot 5 \cdot \dfrac{25}{4} = \dfrac{125}{6}" />! (A 22. gyakorlófeladatban ezt általánosan is bebizonyíthatod!)
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki az <M t="y=x^2-4" /> görbe és az <M t="x" />-tengely által közrezárt <em>teljes</em> területet a <M t="[0;\,3]" /> intervallumon!
            </>
          }
        >
          <p>
            Zérushely <M t="(0;\,3)" />-ban: <M t="x=2" />. Primitív függvény: <M t="G(x)=\frac{x^3}{3}-4x" />.
          </p>
          <ul>
            <li><M t="[0;\,2]" />-n: <M t="G(2)-G(0) = \left(\frac{8}{3}-8\right)-0 = -\frac{16}{3}" />.</li>
            <li><M t="[2;\,3]" />-on: <M t="G(3)-G(2) = (9-12)-\left(-\frac{16}{3}\right) = \frac{7}{3}" />.</li>
          </ul>
          <p>
            Teljes terület: <M t="\left|-\dfrac{16}{3}\right| + \left|\dfrac{7}{3}\right| = \mathbf{\dfrac{23}{3}}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Hasonlítsd össze az <M t="f(x)=\cos x" /> függvény (a) határozott integrálját és (b) teljes területét a <M t="[0;\,\pi]" /> intervallumon!
            </>
          }
        >
          <p>
            (a) Nettó integrál: <M t="\Bigl[\sin x\Bigr]_0^\pi = 0 - 0 = \mathbf{0}" />.<br />
            (b) Zérushely <M t="x=\frac{\pi}{2}" />-nél: <M t="\left|\int_0^{\pi/2}\cos x\,dx\right| + \left|\int_{\pi/2}^\pi\cos x\,dx\right| = |1| + |-1| = \mathbf{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A nettó változás elve (fizika és közgazdaságtan)',
    body: (
      <>
        <Story>
          <p>
            Ha a Newton–Leibniz-tétel 2. részében <M t="f(t)" /> helyére egy mennyiség változási sebességét — vagyis <M t="F'(t)" />-t — írjuk, egy univerzális természettudományos törvényt kapunk:
          </p>
        </Story>
        <Def title="A nettó változás elve (Net Change Theorem)">
          <M block t="\int_{a}^{b} F'(t)\,dt \;=\; F(b) - F(a)." />
          <p>
            Egy mennyiség <strong>változási sebességének határozott integrálja</strong> az <M t="[a;\,b]" /> intervallumon pontosan megegyezik a mennyiség <strong>teljes nettó megváltozásával</strong>!
          </p>
        </Def>
        <h3>Három klasszikus alkalmazás</h3>
        <ul>
          <li>
            <strong>Kinematika:</strong> a sebesség (<M t="v(t)=s'(t)" />) integrálja az <strong>elmozdulás</strong> (<M t="\Delta s = s(t_2)-s(t_1)" />), míg a <em>sebesség nagyságának</em> (<M t="|v(t)|" />) integrálja a <strong>teljes megtett út</strong>!
          </li>
          <li>
            <strong>Tartály / áramlás:</strong> ha <M t="Q'(t)" /> liter/perc sebességgel folyik be (vagy ki) a víz, akkor <M t="\int_{t_1}^{t_2} Q'(t)\,dt" /> a tartály vízmennyiségének nettó változása.
          </li>
          <li>
            <strong>Közgazdaságtan:</strong> a határköltség <M t="C'(x)" /> integrálja <M t="x_1" />-től <M t="x_2" />-ig pontosan a gyártás <M t="x_1" />-ről <M t="x_2" /> darabra növelésének <strong>többletköltsége</strong>: <M t="C(x_2)-C(x_1)" />!
          </li>
        </ul>
        <VelocityDisplacementWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Egy nyomda határköltsége <M t="x" /> poszter nyomtatásánál <M t="c'(x)=\dfrac{1}{2\sqrt{x}}" /> euró/db. Mennyi a többletköltség az 1. posztertől a 100. poszterig (<M t="c(100)-c(1)" />)?
            </>
          }
        >
          <p>
            A nettó változás elve alapján:
          </p>
          <M block t="c(100)-c(1) = \int_{1}^{100}\frac{1}{2\sqrt{x}}\,dx = \Bigl[\sqrt{x}\Bigr]_{1}^{100} = 10 - 1 = \mathbf{9\text{ euró}}." />
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy részecske sebessége <M t="v(t)=2t-4\;\text{(m/s)}" /> a <M t="[0;\,5]" /> időintervallumon. Határozd meg (a) az elmozdulását, (b) a teljes megtett útját!
            </>
          }
        >
          <p>
            (a) Elmozdulás: <M t="\int_0^5(2t-4)\,dt = \Bigl[t^2-4t\Bigr]_0^5 = (25-20)-0 = \mathbf{5\text{ m}}" />.<br />
            (b) A sebesség <M t="t=2" />-nél vált előjelet: <M t="[0;\,2]" />-n hátrafelé megy (<M t="|2^2-8| = 4\text{ m}" />), <M t="[2;\,5]" />-ön előre (<M t="|5-(-4)| = 9\text{ m}" />). Teljes megtett út: <M t="4+9 = \mathbf{13\text{ m}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Integrálfüggvények elemzése: grafikonolvasás és határértékek',
    body: (
      <>
        <Story>
          <p>
            A vizsgák egyik kedvenc, igazán mély gondolkodást igénylő feladattípusa, amikor egy <M t="g(x)=\int_a^x f(t)\,dt" /> függvényt kell elemezni kizárólag az <M t="f" /> függvény grafikonjából vagy tulajdonságaiból! A Newton–Leibniz-tétel 1. része adja a teljes kódfejtő kulcsot.
          </p>
        </Story>
        <Def title="Kódfejtő táblázat a g(x) = ∫ₐˣ f(t) dt függvényhez">
          <ul>
            <li><strong>Függvényérték (<M t="g(x)" />):</strong> az <M t="f" /> alatti előjeles terület <M t="a" />-tól <M t="x" />-ig (speciálisan <M t="g(a)=0" />).</li>
            <li><strong>Első derivált (<M t="g'(x)=f(x)" />):</strong> ahol <M t="f(x)>0" />, ott <M t="g" /> <em>növekszik</em>; ahol <M t="f(x)<0" />, ott <M t="g" /> <em>csökken</em>; ahol <M t="f" /> előjelet vált, ott <M t="g" />-nek <strong>lokális szélsőértéke</strong> van!</li>
            <li><strong>Második derivált (<M t="g''(x)=f'(x)" />):</strong> ahol <M t="f" /> növekszik, ott <M t="g" /> <em>konvex</em> (alulról); ahol <M t="f" /> csökken, ott <M t="g" /> <em>konkáv</em>; ahol <M t="f" />-nek szélsőértéke van, ott <M t="g" />-nek <strong>inflexiós pontja</strong> van!</li>
          </ul>
        </Def>
        <h3>Integrálos egyenletek és L’Hospital-szabály</h3>
        <p>
          Ha egy egyenletben ismeretlen függvény szerepel az integráljel alatt — például <M t="\int_0^x f(t)\,dt = x\cos(\pi x)" /> —, egyszerűen <strong>deriváljuk mindkét oldalt <M t="x" /> szerint</strong>! A bal oldalon az 1. tétel miatt eltűnik az integráljel, és azonnal megkapjuk <M t="f(x)" />-et:
        </p>
        <M block t="f(x) = \frac{d}{dx}\bigl(x\cos(\pi x)\bigr) = \cos(\pi x) - \pi x\sin(\pi x)." />
        <p>
          Hasonlóan, egy <M t="\frac{0}{0}" /> alakú határértékben (ahol a számlálóban <M t="\int_a^x f(t)\,dt" /> áll) a <strong>L’Hospital-szabály</strong> (4.6) és a Newton–Leibniz-tétel 1. része tökéletes párost alkot!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Tegyük fel, hogy <M t="f" /> mindenhol differenciálható, <M t="f'(x) > 0" /> minden <M t="x" />-re, és <M t="f(1) = 0" />. Milyen jellegű pontja van a <M t="g(x)=\int_0^x f(t)\,dt" /> függvénynek <M t="x=1" />-nél (lokális minimum, maximum vagy inflexiós pont)?
            </>
          }
        >
          <p>
            Mivel <M t="g'(x)=f(x)" />, <M t="g'(1)=f(1)=0" /> (vízszintes érintő). Továbbá <M t="g''(1)=f'(1) > 0" /> (vagy: <M t="f" /> szigorúan növekvő, tehát <M t="1" /> előtt negatív, <M t="1" /> után pozitív). Ezért <M t="g" />-nek <M t="x=1" />-nél <strong>lokális minimuma</strong> van!
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Határozd meg a folytonos <M t="f(x)" /> függvényt, ha minden <M t="x" />-re <M t="\displaystyle\int_{1}^{x} f(t)\,dt = x^2 - 2x + 1" />!
            </>
          }
        >
          <p>
            Deriváljuk mindkét oldalt <M t="x" /> szerint: <M t="f(x) = \mathbf{2x - 2}" />. (Gyors ellenőrzés <M t="x=1" />-nél: a bal oldal <M t="0" />, a jobb oldal <M t="1-2+1=0" />, stimmel!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="5.4 Puskakártya">
          <ul>
            <li><strong>Középértéktétel:</strong> folytonos <M t="f" />-re <M t="\exists\,c\in[a;\,b]:\; f(c)=\frac{1}{b-a}\int_a^b f(x)\,dx" />.</li>
            <li><strong>Newton–Leibniz 1. rész:</strong> <M t="\frac{d}{dx}\int_a^x f(t)\,dt = f(x)" />.</li>
            <li><strong>Változó határok:</strong> <M t="\frac{d}{dx}\int_{v(x)}^{u(x)} f(t)\,dt = f(u(x))u'(x) - f(v(x))v'(x)" />.</li>
            <li><strong>Newton–Leibniz 2. rész:</strong> <M t="\int_a^b f(x)\,dx = \bigl[G(x)\bigr]_a^b = G(b)-G(a)" />, ahol <M t="G'=f" />.</li>
            <li><strong>Teljes terület:</strong> zérushelyeknél felbontani és <M t="\sum\left|\int_{x_{i-1}}^{x_i} f\right|" />.</li>
            <li><strong>Nettó változás:</strong> <M t="\int_a^b F'(t)\,dt = F(b)-F(a)" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Elfelejtett láncszabály változó határnál:</strong> <M t="\frac{d}{dx}\int_0^{x^2}\sin t\,dt = \mathbf{2x}\sin(x^2)" />, NEM puszta <M t="\sin(x^2)" />!
            </li>
            <li>
              <strong>Folytonossági feltétel átugrása:</strong> a <M t="\int_{-1}^1 \frac{1}{x^2}\,dx" /> integrálra <em>tilos</em> alkalmazni a <M t="[-1/x]_{-1}^1 = -2" /> képletet! Egy pozitív függvény integrálja nem lehet negatív — az <M t="x=0" />-beli végtelen szakadás miatt a 2. tétel nem alkalmazható!
            </li>
            <li>
              <strong>Előjelhibák a <M t="G(b)-G(a)" /> kivonásnál:</strong> mindig tegyél zárójelet a teljes <M t="G(a)" /> köré: <M t="\bigl(G(b)\bigr) - \bigl(G(a)\bigr)" />!
            </li>
            <li>
              <strong>Teljes terület vs. integrál összekeverése:</strong> ha a feladat <em>területet</em> kér, mindig ellenőrizd, van-e zérushely az intervallum belsejében!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{2}\left(3x^2 - 4x + 5\right)dx" />!
            </>
          }
        >
          <p>
            <M t="\Bigl[x^3 - 2x^2 + 5x\Bigr]_0^2 = (8 - 8 + 10) - 0 = \mathbf{10}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2}\left(2\cos x + \sin x\right)dx" />!
            </>
          }
        >
          <p>
            <M t="\Bigl[2\sin x - \cos x\Bigr]_0^{\pi/2} = (2\cdot 1 - 0) - (0 - 1) = 2 + 1 = \mathbf{3}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Deriváld: (a) <M t="\dfrac{d}{dx}\displaystyle\int_{3}^{x}(t^4-5t+1)\,dt" />, (b) <M t="\dfrac{d}{dx}\displaystyle\int_{x}^{3}\cos(t^2)\,dt" />!
            </>
          }
        >
          <p>
            (a) <M t="\mathbf{x^4 - 5x + 1}" />. (b) Határcsere miatt mínuszjel: <M t="\mathbf{-\cos(x^2)}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{9}\dfrac{x+1}{\sqrt{x}}\,dx" />!
            </>
          }
        >
          <p>
            Írjuk át hatványokra: <M t="\frac{x+1}{\sqrt{x}} = x^{1/2} + x^{-1/2}" />. Primitív függvény: <M t="\frac{2}{3}x^{3/2} + 2x^{1/2}" />.
          </p>
          <M block t="\left[\frac{2}{3}x^{3/2} + 2\sqrt{x}\right]_{1}^{9} = \left(\frac{2}{3}\cdot 27 + 6\right) - \left(\frac{2}{3} + 2\right) = 24 - \frac{8}{3} = \mathbf{\frac{64}{3}}." />
        </Task>
        <Task
          n={19}
          q={
            <>
              Deriváld: <M t="\dfrac{d}{dx}\displaystyle\int_{2x}^{x^2}\sqrt{t^2+1}\,dt" />!
            </>
          }
        >
          <p>
            A 4. szabály alapján (<M t="u=x^2,\;v=2x" />):
          </p>
          <M block t="\sqrt{(x^2)^2+1}\cdot(2x) - \sqrt{(2x)^2+1}\cdot 2 = \mathbf{2x\sqrt{x^4+1} - 2\sqrt{4x^2+1}}." />
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki az <M t="y=x^3-4x" /> görbe és az <M t="x" />-tengely által közrezárt <em>teljes</em> területet a <M t="[-2;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            Zérushelyek: <M t="x(x^2-4)=0 \implies x=-2,\;0,\;2" />. Primitív függvény: <M t="G(x)=\frac{x^4}{4}-2x^2" />.
          </p>
          <ul>
            <li><M t="[-2;\,0]" />-n: <M t="G(0)-G(-2) = 0 - (4-8) = +4" />.</li>
            <li><M t="[0;\,2]" />-n: <M t="G(2)-G(0) = (4-8) - 0 = -4" />.</li>
          </ul>
          <p>
            Teljes terület: <M t="|4| + |-4| = \mathbf{8}" />. (A nettó integrál <M t="0" /> lenne!)
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>L’Hospital + FTC 1:</em> számítsd ki a <M t="\displaystyle\lim_{x\to 0}\frac{1}{x^3}\int_{0}^{x}\frac{t^2}{t^4+1}\,dt" /> határértéket!
            </>
          }
        >
          <p>
            <M t="x\to 0" /> esetén mind a számláló (<M t="\int_0^0 = 0" />), mind a nevező (<M t="0" />) nullához tart (<M t="\frac{0}{0}" />). Alkalmazzuk a L’Hospital-szabályt és a Newton–Leibniz-tétel 1. részét:
          </p>
          <M block t="\lim_{x\to 0}\frac{\dfrac{x^2}{x^4+1}}{3x^2} = \lim_{x\to 0}\frac{1}{3(x^4+1)} = \mathbf{\frac{1}{3}}." />
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Arkhimédész tétele általánosan:</em> igazold, hogy az <M t="y = h - \dfrac{4h}{b^2}x^2" /> (<M t="b,h > 0" />) parabolaív és az <M t="x" />-tengely által közrefogott tartomány területe pontosan <M t="\dfrac{2}{3}bh" />!
            </>
          }
        >
          <p>
            A zérushelyek: <M t="h = \frac{4h}{b^2}x^2 \implies x^2 = \frac{b^2}{4} \implies x = \pm\frac{b}{2}" />. Mivel a függvény páros, elég <M t="[0;\,b/2]" />-n integrálni és megduplázni:
          </p>
          <M block t="A = 2\int_{0}^{b/2}\left(h-\frac{4h}{b^2}x^2\right)dx = 2\left[hx - \frac{4h}{3b^2}x^3\right]_{0}^{b/2} = 2\left(\frac{bh}{2} - \frac{4h}{3b^2}\cdot\frac{b^3}{8}\right) = 2\left(\frac{bh}{2}-\frac{bh}{6}\right) = \mathbf{\frac{2}{3}bh}." />
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Linearizáció integrálfüggvényhez:</em> határozd meg az <M t="f(x) = 3 + \displaystyle\int_{1}^{x^2}\frac{4}{1+t}\,dt" /> függvény érintőegyenesének (linearizációjának) egyenletét az <M t="x=1" /> pontban!
            </>
          }
        >
          <p>
            Először a függvényérték: <M t="f(1) = 3 + \int_1^1 \frac{4}{1+t}\,dt = 3 + 0 = 3" />.<br />
            Ezután a derivált láncszabállyal: <M t="f'(x) = \dfrac{4}{1+x^2}\cdot 2x = \dfrac{8x}{1+x^2}" />, tehát <M t="f'(1) = \dfrac{8}{2} = 4" />.
          </p>
          <p>
            A linearizáció: <M t="L(x) = f(1) + f'(1)(x-1) = 3 + 4(x-1) = \mathbf{4x - 1}" />.
          </p>
        </Task>
      </>
    ),
  },
];
