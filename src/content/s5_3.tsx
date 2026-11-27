import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AverageValueWidget,
  IntegrabilityCompareDiagram,
  IntegralAnatomyDiagram,
  IntegralRulesVisualWidget,
  SignedAreaExplorerWidget,
} from '../components/Widgets53';
import type { Page } from './s1_1';

export const S5_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A határozott integrál definíciója és anatómiája',
    body: (
      <>
        <Story>
          <p>
            Az 5.2-es szakaszban láttuk, hogyan közelítjük egy görbe alatti előjeles területet Riemann-összegekkel (<M t="\sum f(c_k)\Delta x_k" />). Most megérkeztünk a kalkulus egyik legfontosabb fogalmához: amikor a felosztás normája nullához tart (<M t="\|P\|\to 0" />), és a Riemann-összegek egyetlen biztos <M t="I" /> számhoz tartanak — függetlenül attól, hogyan osztottuk fel az intervallumot és hol választottuk meg a <M t="c_k" /> mintapontokat —, ezt a határértéket <strong>határozott integrálnak</strong> nevezzük.
          </p>
        </Story>
        <Def title="A határozott integrál (Riemann-integrál)">
          <p>
            Legyen <M t="f" /> korlátos függvény az <M t="[a;\,b]" /> zárt intervallumon. Azt mondjuk, hogy az <M t="I" /> szám az <M t="f" /> függvény <M t="[a;\,b]" /> intervallumon vett <strong>határozott integrálja</strong>, ha bármely <M t="\varepsilon > 0" /> tűréshez létezik olyan <M t="\delta > 0" /> finomság, hogy az <M t="[a;\,b]" /> minden <M t="\|P\| < \delta" /> normájú felosztására és a <M t="c_k \in [x_{k-1};\,x_k]" /> pontok tetszőleges megválasztására:
          </p>
          <M block t="\left|\sum_{k=1}^{n} f(c_k)\Delta x_k - I\right| < \varepsilon." />
          <p>Ekkor <M t="f" /> <strong>Riemann-integrálható</strong> az <M t="[a;\,b]" /> intervallumon, és ezt így jelöljük:</p>
          <M block t="\int_{a}^{b} f(x)\,dx \;=\; \lim_{\|P\|\to 0}\sum_{k=1}^{n} f(c_k)\Delta x_k \;=\; I." />
        </Def>
        <IntegralAnatomyDiagram />
        <h3>Mit üzen az ε–δ definíció hétköznapi nyelven?</h3>
        <p>
          Képzeld el, hogy valaki megad egy tetszőlegesen szűk hibasávot (mondjuk <M t="\varepsilon = 0{,}0001" />). A függvény akkor integrálható, ha mindig találunk egy olyan maximális téglalapszélességet (<M t="\delta" />), amelynél keskenyebb oszlopokkal dolgozva <em>minden</em> lehetséges Riemann-összeg (bal oldali, jobb oldali, középpontos, sőt összevissza szélességű is!) garantáltan beleesik az <M t="(I-\varepsilon;\,I+\varepsilon)" /> csőbe.
        </p>
        <h3>A „néma változó” (dummy variable)</h3>
        <p>
          A határozott integrál végeredménye egy <strong>konkrét szám</strong> — nem függ attól, milyen betűvel nevezzük a változót a képletben:
        </p>
        <M block t="\int_{a}^{b} f(x)\,dx \;=\; \int_{a}^{b} f(t)\,dt \;=\; \int_{a}^{b} f(u)\,du." />
        <p>
          Ugyanúgy, ahogy a szummánál a futó index neve (<M t="\sum_{k=1}^n k^2 = \sum_{j=1}^n j^2" />) sem változtatja meg az összeg értékét.
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Írd fel határozott integrálként a következő határértéket az <M t="[1;\,4]" /> intervallumon:
              <M block t="\lim_{\|P\|\to 0}\sum_{k=1}^{n}\left(3c_k^2 - 2c_k + 5\right)\Delta x_k." />
            </>
          }
        >
          <p>
            A <M t="c_k" /> helyére <M t="x" />, a <M t="\Delta x_k" /> helyére <M t="dx" />, a határérték és a <M t="\sum" /> helyére az <M t="\int_1^4" /> kerül:
          </p>
          <M block t="\int_{1}^{4}\left(3x^2 - 2x + 5\right)\,dx." />
        </Task>
        <Task
          n={2}
          q={
            <>
              Igaz-e, hogy <M t="\int_0^2 x^3\,dx = \int_0^2 t^3\,dt = \int_0^2 u^3\,du" />? Miért?
            </>
          }
        >
          <p>
            <strong>Igaz!</strong> Az integrálási változó csak „néma változó”: mindhárom integrál ugyanannak a görbének a <M t="[0;\,2]" /> intervallum feletti területét (értékét) jelöli.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Mikor integrálható egy függvény? (Folytonosság és szakadások)',
    body: (
      <>
        <Story>
          <p>
            Az integrál definíciója ijesztően szigorúnak tűnik: <em>minden</em> felosztásra és <em>minden</em> mintapont-választásra ugyanazt a határértéket kell kapni! Honnan tudjuk előre, hogy egy függvény „jól viselkedik-e”, és létezik-e a határozott integrálja? Szerencsére a kalkulus ad egy kőkemény garanciát.
          </p>
        </Story>
        <Def title="1. Tétel — Folytonos függvények integrálhatósága">
          <p>
            Ha az <M t="f" /> függvény <strong>folytonos</strong> az <M t="[a;\,b]" /> zárt intervallumon, akkor <M t="f" /> garantáltan <strong>Riemann-integrálható</strong> az <M t="[a;\,b]" /> intervallumon — azaz létezik az <M t="\int_a^b f(x)\,dx" /> határérték.
          </p>
        </Def>
        <p>
          Miért működik ez? A szélsőértéktétel (4.1) miatt minden <M t="[x_{k-1};\,x_k]" /> részintervallumon van egy legkisebb (<M t="m_k" />) és egy legnagyobb (<M t="M_k" />) függvényérték. Bármilyen Riemann-összeg beszorul az <strong>alsó</strong> (<M t="L" />) és a <strong>felső</strong> (<M t="U" />) közelítő összeg közé:
        </p>
        <M block t="L \;\le\; \sum_{k=1}^{n} f(c_k)\Delta x_k \;\le\; U." />
        <p>
          Folytonos függvénynél a <M t="\|P\|\to 0" /> finomítás során a felső és alsó összeg különbsége nullához tart (<M t="U - L \to 0" />), így a rendőrelv miatt <em>minden</em> köztes Riemann-összeg ugyanoda szorul be!
        </p>
        <h3>Mi a helyzet a szakadásos függvényekkel?</h3>
        <p>
          Egy függvénynek <em>nem kötelező</em> mindenhol folytonosnak lennie ahhoz, hogy integrálható legyen! Ha korlátos, és csak <strong>véges sok ugrási vagy megszüntethető szakadása</strong> van (<em>szakaszonként folytonos</em>), akkor is integrálható: egy-egy ugrási pontot lefedő keskeny téglalap területe <M t="\|P\|\to 0" /> esetén eltűnik.
        </p>
        <p>
          Akkor létezik egyáltalán <em>nem</em> integrálható korlátos függvény? Igen — a híres <strong>Dirichlet-függvény</strong> a <M t="[0;\,1]" /> intervallumon:
        </p>
        <M block t="D(x) = \begin{cases} 1, & \text{ha } x \text{ racionális,} \\ 0, & \text{ha } x \text{ irracionális.} \end{cases}" />
        <p>
          Mivel bármely apró részintervallumban van racionális és irracionális szám is, a felső összeg <em>mindig</em> <M t="U = \sum 1\cdot\Delta x_k = 1" />, az alsó összeg pedig <em>mindig</em> <M t="L = \sum 0\cdot\Delta x_k = 0" />. Soha nem találkoznak, tehát <M t="D(x)" /> <strong>nem Riemann-integrálható</strong>!
        </p>
        <IntegrabilityCompareDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Döntsd el, melyik függvény Riemann-integrálható a <M t="[0;\,2]" /> intervallumon: (a) <M t="f(x)=x^2+\cos x" />, (b) a lépcsős <M t="g(x)=\begin{cases}1 & (0\le x<1)\\ 3 & (1\le x\le 2)\end{cases}" />, (c) a Dirichlet-függvény!
            </>
          }
        >
          <p>
            (a) <strong>Igen</strong>, mert folytonos a <M t="[0;\,2]" />-n. (b) <strong>Igen</strong>, mert korlátos és csak egyetlen ugrási szakadása van (<M t="x=1" />-nél); az integrálja egyszerűen a két téglalap területe: <M t="1\cdot 1 + 3\cdot 1 = 4" />. (c) <strong>Nem</strong>, mert <M t="U=2" />, <M t="L=0" /> minden felosztásra.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Legyen <M t="f(x)=5" /> a <M t="[0;\,3]" /> intervallumon, kivéve az <M t="x=1" /> pontot, ahol <M t="f(1)=100" />. Megváltozik-e ettől az <M t="\int_0^3 f(x)\,dx" /> értéke?
            </>
          }
        >
          <p>
            <strong>Nem!</strong> Az <M t="x=1" /> pontot tartalmazó részintervallum szélessége legfeljebb <M t="\|P\|" />, így az eltérés a Riemann-összegben legfeljebb <M t="(100-5)\|P\| = 95\|P\| \to 0" />. Egyetlen (sőt véges sok) pont megváltoztatása nem változtatja meg a határozott integrált: értéke marad <M t="5\cdot 3 = 15" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A határozott integrál 7 alaptulajdonsága',
    body: (
      <>
        <Story>
          <p>
            Ahogy a szumma jelnek és a deriváltaknak is megvannak a maguk „játékszabályai”, a határozott integrál is 7 rendkívül hasznos tulajdonsággal bír. Ezekkel bonyolult integrálokat darabolhatunk fel, fordíthatunk meg, kombinálhatunk vagy becsülhetünk meg anélkül, hogy egyetlen Riemann-összeget is kiszámítanánk!
          </p>
        </Story>
        <Def title="2. Tétel — A határozott integrál 7 szabálya">
          <ol className="steps">
            <li>
              <strong>Határok felcserélése:</strong> <M t="\displaystyle\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx" />. <em>(Jobbról balra haladva minden <M t="\Delta x_k" /> negatív lesz!)</em>
            </li>
            <li>
              <strong>Nulla hosszúságú intervallum:</strong> <M t="\displaystyle\int_a^a f(x)\,dx = 0" />. <em>(Egyetlen pont fölött nulla terület van.)</em>
            </li>
            <li>
              <strong>Konstanssal való szorzás:</strong> <M t="\displaystyle\int_a^b k\,f(x)\,dx = k\int_a^b f(x)\,dx" /> &nbsp;(különösen <M t="k=-1" />-re: <M t="\int_a^b (-f) = -\int_a^b f" />).
            </li>
            <li>
              <strong>Összeg és különbség:</strong> <M t="\displaystyle\int_a^b \bigl(f(x)\pm g(x)\bigr)\,dx = \int_a^b f(x)\,dx \pm \int_a^b g(x)\,dx" />.
            </li>
            <li>
              <strong>Additivitás (intervallum-összefűzés):</strong> <M t="\displaystyle\int_a^b f(x)\,dx + \int_b^c f(x)\,dx = \int_a^c f(x)\,dx" />. <em>(Akkor is igaz, ha <M t="b" /> nem esik <M t="a" /> és <M t="c" /> közé!)</em>
            </li>
            <li>
              <strong>Maximum–minimum egyenlőtlenség:</strong> ha <M t="f" />-nek létezik minimuma és maximuma <M t="[a;\,b]" />-n (<M t="a\le b" />), akkor:
              <M block t="\min f \cdot (b-a) \;\le\; \int_a^b f(x)\,dx \;\le\; \max f \cdot (b-a)." />
            </li>
            <li>
              <strong>Domináció:</strong> ha <M t="f(x)\ge g(x)" /> minden <M t="x\in[a;\,b]" />-re, akkor <M t="\displaystyle\int_a^b f(x)\,dx \ge \int_a^b g(x)\,dx" />. Speciálisan, ha <M t="f(x)\ge 0" />, akkor <M t="\displaystyle\int_a^b f(x)\,dx \ge 0" />.
            </li>
          </ol>
        </Def>
        <IntegralRulesVisualWidget />
        <h3>Hogyan bizonyítható a 6. szabály (max–min korlát)?</h3>
        <p>
          Elképesztően egyszerűen! Minden <M t="c_k" /> mintapontra igaz, hogy <M t="\min f \le f(c_k) \le \max f" />. Szorozzuk meg ezt <M t="\Delta x_k > 0" />-val és összegezzük <M t="k=1" />-től <M t="n" />-ig:
        </p>
        <M block t="\min f\cdot(b-a) = \sum_{k=1}^n \min f\,\Delta x_k \;\le\; \sum_{k=1}^n f(c_k)\Delta x_k \;\le\; \sum_{k=1}^n \max f\,\Delta x_k = \max f\cdot(b-a)." />
        <p>
          Mivel ez <em>minden</em> Riemann-összegre teljesül, a <M t="\|P\|\to 0" /> határértékre — vagyis magára az integrálra — is megmarad!
        </p>
        <Steps
          source="Analízis-labor"
          title="Additivitás, határcsere és linearitás együtt"
          problem={
            <>
              Adott <M t="\int_0^3 f(x)\,dx = 7" /> és <M t="\int_3^5 f(x)\,dx = -2" />. Számítsuk ki az <M t="\int_5^0 \bigl(2f(x) - 1\bigr)\,dx" /> integrál értékét!
            </>
          }
          steps={[
            {
              title: 'Additivitás',
              body: (
                <p>
                  <M t="\int_0^5 f(x)\,dx = \int_0^3 f(x)\,dx + \int_3^5 f(x)\,dx = 7 + (-2) = 5" />.
                </p>
              ),
            },
            {
              title: 'Határfelcserélés',
              body: (
                <p>
                  <M t="\int_5^0 f(x)\,dx = -\int_0^5 f(x)\,dx = -5" />.
                </p>
              ),
            },
            {
              title: 'Linearitás és konstans integrálja',
              body: (
                <M block t="\int_5^0 \bigl(2f(x) - 1\bigr)\,dx = 2\int_5^0 f(x)\,dx - \int_5^0 1\,dx = 2(-5) - (0 - 5) = -10 + 5 = -5." />
              ),
            },
          ]}
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Tudjuk, hogy <M t="\int_1^5 f(x)\,dx = 8" />, <M t="\int_1^3 f(x)\,dx = 5" /> és <M t="\int_1^5 g(x)\,dx = -2" />. Számítsd ki: (a) <M t="\int_5^1 f(x)\,dx" />, (b) <M t="\int_3^5 f(x)\,dx" />, (c) <M t="\int_1^5 (2f(x)-3g(x))\,dx" />!
            </>
          }
        >
          <p>
            (a) Határcsere (1. szabály): <M t="-8" />.<br />
            (b) Additivitás (5. szabály): <M t="\int_1^3 f + \int_3^5 f = \int_1^5 f \implies \int_3^5 f = 8 - 5 = 3" />.<br />
            (c) Linearitás (3–4. szabály): <M t="2\cdot 8 - 3\cdot(-2) = 16 + 6 = 22" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              A max–min egyenlőtlenség (6. szabály) segítségével adj alsó és felső korlátot az <M t="\int_0^2 \dfrac{1}{1+x^2}\,dx" /> integrál értékére!
            </>
          }
        >
          <p>
            A <M t="[0;\,2]" /> intervallumon <M t="f(x)=\frac{1}{1+x^2}" /> szigorúan csökkenő, így <M t="\max f = f(0) = 1" /> és <M t="\min f = f(2) = \frac{1}{5}" />. Az intervallum hossza <M t="2-0=2" />, tehát:
          </p>
          <M block t="\frac{1}{5}\cdot 2 \;\le\; \int_0^2 \frac{1}{1+x^2}\,dx \;\le\; 1\cdot 2 \quad\Longrightarrow\quad 0{,}4 \;\le\; \int_0^2 \frac{1}{1+x^2}\,dx \;\le\; 2." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Határozott integrál = előjeles terület (geometriai számítás)',
    body: (
      <>
        <Story>
          <p>
            Még nem tanultuk meg a Newton–Leibniz-tételt (az jön az 5.4-ben!), mégis meglepően sok határozott integrált ki tudunk számítani <strong>egyetlen másodperc alatt</strong> — ha felismerjük, milyen ismert síkidom (téglalap, háromszög, trapéz, félkör) rejtőzik a görbe alatt!
          </p>
        </Story>
        <Def title="Geometriai jelentés: előjeles (nettó) terület">
          <ul>
            <li>
              Ha <M t="f(x) \ge 0" /> az <M t="[a;\,b]" /> intervallumon, akkor a görbe alatti és az <M t="x" />-tengely fölötti tartomány pontos <strong>területe</strong>:
              <M block t="A = \int_a^b f(x)\,dx." />
            </li>
            <li>
              Ha <M t="f(x)" /> <strong>előjelet vált</strong> az <M t="[a;\,b]" /> intervallumon, akkor a határozott integrál az <M t="x" />-tengely fölötti és alatti területek <strong>különbsége</strong> (előjeles vagy nettó terület):
              <M block t="\int_a^b f(x)\,dx \;=\; A_{\text{fent}} - A_{\text{lent}}." />
            </li>
          </ul>
        </Def>
        <p>
          Próbáld ki az alábbi interaktív ábrán! Figyeld meg, ahogy az <M t="f(x)=x-1" /> függvénynél <M t="b=3" />-nál a negatív (piros) és a pozitív (kék) háromszög pontosan <strong>kiejti egymást</strong>: a határozott integrál <M t="0" />, miközben a befestett teljes geometriai terület <M t="4" />!
        </p>
        <SignedAreaExplorerWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="f(x) = \sin x" /> függvény integrálja a <M t="[0;\,2\pi]" /> intervallumon, és mi a görbe által közrezárt teljes geometriai terület?
            </>
          }
          options={[
            { label: <>Integrál: <M t="0" />, teljes terület: <M t="4" /></>, ok: true },
            { label: <>Integrál: <M t="4" />, teljes terület: <M t="4" /></> },
            { label: <>Integrál: <M t="0" />, teljes terület: <M t="2" /></> },
            { label: <>Integrál: <M t="2" />, teljes terület: <M t="0" /></> },
          ]}
          explain={
            <>
              A <M t="[0;\,\pi]" /> feletti <M t="+2" /> és a <M t="[\pi;\,2\pi]" /> alatti <M t="-2" /> nettó összege <M t="0" />, míg az abszolút területek összege <M t="|2| + |-2| = 4" />.
            </>
          }
        />
        <h3>Hogyan számolj geometriával? (3 klasszikus alakzat)</h3>
        <ul>
          <li><strong>Konstans függvény</strong> (<M t="f(x)=c" />): téglalap, előjeles területe <M t="c(b-a)" />.</li>
          <li><strong>Lineáris vagy abszolútérték-függvény</strong>: háromszögek és trapézok — mindig keresd meg előbb a zérushelyet (ahol a görbe metszi az <M t="x" />-tengelyt)!</li>
          <li><strong><M t="f(x)=\sqrt{r^2-x^2}" /></strong>: origó középpontú, <M t="r" /> sugarú <strong>félkör</strong>! A <M t="[-r;\,r]" /> intervallumon a területe <M t="\frac{1}{2}\pi r^2" />, a <M t="[0;\,r]" /> intervallumon (negyedkör) pedig <M t="\frac{1}{4}\pi r^2" />.</li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki geometriailag az <M t="\int_{-2}^{4}(x-1)\,dx" /> határozott integrált, majd add meg a görbe és az <M t="x" />-tengely közötti <em>teljes</em> geometriai területet is!
            </>
          }
        >
          <p>
            Az <M t="y=x-1" /> egyenes <M t="x=1" />-nél metszi az <M t="x" />-tengelyt:
          </p>
          <ul>
            <li><M t="[-2;\,1]" />-en az <M t="x" />-tengely <em>alatt</em> egy <M t="3" /> alapú, <M t="3" /> magasságú háromszög van: <M t="A_{\text{lent}}=\frac{3\cdot 3}{2}=4{,}5" />.</li>
            <li><M t="[1;\,4]" />-en az <M t="x" />-tengely <em>fölött</em> szintén egy <M t="3" /> alapú, <M t="3" /> magasságú háromszög van: <M t="A_{\text{fent}}=\frac{3\cdot 3}{2}=4{,}5" />.</li>
          </ul>
          <p>
            Határozott integrál: <M t="A_{\text{fent}}-A_{\text{lent}}=4{,}5-4{,}5=\mathbf{0}" />. Teljes geometriai terület: <M t="4{,}5+4{,}5=\mathbf{9}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki geometriai úton: (a) <M t="\int_{-3}^{3}\sqrt{9-x^2}\,dx" />, (b) <M t="\int_{0}^{3}\left(2+\sqrt{9-x^2}\right)\,dx" />!
            </>
          }
        >
          <p>
            (a) Egy <M t="r=3" /> sugarú félkör területe: <M t="\dfrac{1}{2}\pi\cdot 3^2 = \mathbf{\dfrac{9\pi}{2}}" />.<br />
            (b) Az összegszabállyal szétbontva: <M t="\int_0^3 2\,dx + \int_0^3 \sqrt{9-x^2}\,dx" /> = egy <M t="3\times 2" />-es téglalap + egy <M t="r=3" /> sugarú negyedkör = <M t="\mathbf{6+\dfrac{9\pi}{4}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Három alapintegrál képlete és polinomok integrálása',
    body: (
      <>
        <Story>
          <p>
            Az 5.2-es szakaszban kiszámítottuk véges összegek határértékével a <M t="c" />, az <M t="x" /> és az <M t="x^2" /> görbe alatti területét. Ha ezeket összekapcsoljuk a határozott integrál linearitásával (3. és 4. szabály), már most — az 5.4-es alaptétel előtt — <strong>minden másodfokú polinomot</strong> pillanatok alatt pontosan tudunk integrálni!
          </p>
        </Story>
        <Def title="Három alapvető határozott integrál képlete (a < b)">
          <M block t="\int_{a}^{b} c\,dx \;=\; c(b-a) \qquad (c\text{ tetszőleges állandó})" />
          <M block t="\int_{a}^{b} x\,dx \;=\; \frac{b^2}{2} - \frac{a^2}{2}" />
          <M block t="\int_{a}^{b} x^2\,dx \;=\; \frac{b^3}{3} - \frac{a^3}{3}" />
        </Def>
        <h3>Honnan jön a trapézképlet (és miért igaz negatív határokra is)?</h3>
        <p>
          Pozitív <M t="0 < a < b" /> esetén az <M t="y=x" /> alatti terület egy trapéz, amelynek párhuzamos oldalai <M t="a" /> és <M t="b" />, magassága <M t="b-a" />:
        </p>
        <M block t="A = \frac{a+b}{2}\cdot(b-a) = \frac{b^2 - a^2}{2}." />
        <p>
          És ha <M t="a < 0 < b" />? Az additivitással és az 1. szabállyal szétbonthatjuk <M t="0" />-nál:
          <M t="\int_a^b x\,dx = \int_a^0 x\,dx + \int_0^b x\,dx = -\int_0^a x\,dx + \frac{b^2}{2} = \frac{b^2}{2} - \frac{a^2}{2}" />. A képlet <strong>minden valós <M t="a, b" />-re</strong> (akár negatívakra, sőt <M t="a>b" />-re is!) változatlanul működik!
        </p>
        <h3>Kidolgozott példa — Másodfokú polinom integrálása</h3>
        <p>Számítsuk ki az <M t="\int_{1}^{3}(2x^2 - 6x + 4)\,dx" /> integrált a három alapképlet és a linearitás segítségével!</p>
        <ol className="steps">
          <li>
            <strong>Szétbontjuk tagokra (3–4. szabály):</strong>
            <M block t="2\int_1^3 x^2\,dx \;-\; 6\int_1^3 x\,dx \;+\; \int_1^3 4\,dx." />
          </li>
          <li>
            <strong>Behelyettesítjük a három alapképletet:</strong>
            <M block t="2\left(\frac{3^3-1^3}{3}\right) - 6\left(\frac{3^2-1^2}{2}\right) + 4(3-1) = 2\cdot\frac{26}{3} - 6\cdot 4 + 8." />
          </li>
          <li>
            <strong>Összevonunk:</strong>
            <M block t="\frac{52}{3} - 24 + 8 = \frac{52}{3} - 16 = \frac{52-48}{3} = \mathbf{\frac{4}{3}}." />
          </li>
        </ol>
        <p>
          <em>Figyeld meg a csodát:</em> a végeredményben megjelenő <M t="\frac{x^3}{3}" />, <M t="\frac{x^2}{2}" />, <M t="cx" /> éppen az <M t="x^2" />, <M t="x" />, <M t="c" /> <strong>primitív függvényei</strong> a 4.8-as szakaszból! Ez nem véletlen — erről fog szólni az 5.4-es szakasz nagy tétele!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki a három alapképlettel: <M t="\int_{1}^{4}(3x^2 - 4x + 2)\,dx" />!
            </>
          }
        >
          <p>
            <M t="3\cdot\dfrac{4^3-1^3}{3} - 4\cdot\dfrac{4^2-1^2}{2} + 2(4-1) = (64-1) - 2(16-1) + 6 = 63 - 30 + 6 = \mathbf{39}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki: <M t="\int_{-2}^{2}(x^2 - 3x + 1)\,dx" />! Mit veszel észre a <M t="-3x" /> tag integráljánál?
            </>
          }
        >
          <p>
            <M t="\dfrac{2^3-(-2)^3}{3} - 3\cdot\dfrac{2^2-(-2)^2}{2} + 1\cdot\bigl(2-(-2)\bigr) = \dfrac{16}{3} - 0 + 4 = \mathbf{\dfrac{28}{3}}" />.
          </p>
          <p>
            A <M t="-3x" /> páratlan függvény szimmetrikus <M t="[-2;\,2]" /> intervallumon <strong>nullát</strong> ad, mert a bal és jobb oldal előjelesen kioltja egymást!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Folytonos függvény átlagértéke (középértéke)',
    body: (
      <>
        <Story>
          <p>
            Hogyan számoljuk ki egy egész napos hőmérséklet-görbe pontos <em>átlaghőmérsékletét</em>? Nem elég 2 vagy 3 óránként mérni — egy folytonos függvénynek végtelen sok értéke van! Az átlagérték pontos definíciója közvetlenül a Riemann-összegekből születik.
          </p>
        </Story>
        <p>
          Ha az <M t="[a;\,b]" /> intervallumot <M t="n" /> egyenlő <M t="\Delta x = \frac{b-a}{n}" /> részre bontjuk, és minden darabban mérünk egy <M t="f(c_k)" /> értéket, a klasszikus számtani közepük:
        </p>
        <M block t="\frac{f(c_1)+f(c_2)+\dots+f(c_n)}{n} = \frac{1}{n}\sum_{k=1}^{n} f(c_k) = \frac{1}{b-a}\sum_{k=1}^{n} f(c_k)\Delta x." />
        <p>
          Ha <M t="n\to\infty" />, a jobb oldal éppen az integrál osztva az intervallum hosszával!
        </p>
        <Def title="Integrálható függvény átlagértéke (középértéke)">
          <p>
            Ha <M t="f" /> integrálható az <M t="[a;\,b]" /> intervallumon (<M t="a < b" />), akkor az <M t="[a;\,b]" /> intervallumon vett <strong>átlagértéke</strong>:
          </p>
          <M block t="f_{\text{átlag}} \;=\; \frac{1}{b-a}\int_{a}^{b} f(x)\,dx." />
        </Def>
        <h3>Geometriai kép: a „vízszint-kiegyenlítés”</h3>
        <p>
          Képzeld el, hogy a görbe alatti terület egy akváriumban hullámzó víz! Ha megállítjuk a hullámokat és hagyjuk kisimulni a felszínt, a víz egyetlen vízszintes <M t="y = f_{\text{átlag}}" /> szinten állapodik meg — pontosan ott, ahol a téglalap területe (<M t="f_{\text{átlag}}\cdot(b-a)" />) megegyezik a görbe alatti területtel (<M t="\int_a^b f(x)\,dx" />), azaz a vonal fölé nyúló „hegy” pontosan kitölti a vonal alatti „völgyet”.
        </p>
        <AverageValueWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Határozd meg az <M t="f(x)=3x^2-1" /> függvény átlagértékét a <M t="[0;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            Először az integrál: <M t="\int_0^2(3x^2-1)\,dx = 3\cdot\frac{2^3-0}{3} - 1\cdot(2-0) = 8 - 2 = 6" />.<br />
            Majd osztunk az intervallum hosszával (<M t="2-0=2" />): <M t="f_{\text{átlag}} = \dfrac{6}{2} = \mathbf{3}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Mennyi az <M t="f(x)=\sqrt{16-x^2}" /> függvény átlagértéke a <M t="[-4;\,4]" /> intervallumon?
            </>
          }
        >
          <p>
            A grafikon egy <M t="r=4" /> sugarú félkör, tehát <M t="\int_{-4}^4 \sqrt{16-x^2}\,dx = \frac{1}{2}\pi\cdot 4^2 = 8\pi" />. Az intervallum hossza <M t="4-(-4)=8" />, így:
          </p>
          <M block t="f_{\text{átlag}} = \frac{8\pi}{8} = \mathbf{\pi}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="5.3 Puskakártya">
          <ul>
            <li><strong>Definíció:</strong> <M t="\int_a^b f(x)\,dx = \lim_{\|P\|\to 0}\sum_{k=1}^n f(c_k)\Delta x_k" /> (minden folytonos vagy szakaszonként folytonos korlátos függvényre létezik).</li>
            <li><strong>7 szabály:</strong> határcsere (<M t="-" />), azonos határ (<M t="0" />), konstansszorzó, összeg/különbség, additivitás (<M t="\int_a^b+\int_b^c=\int_a^c" />), max–min korlát, domináció (<M t="f\ge g \implies \int f \ge \int g" />).</li>
            <li><strong>Geometria:</strong> <M t="\int_a^b f(x)\,dx = A_{\text{fent}} - A_{\text{lent}}" /> (előjeles terület).</li>
            <li><strong>Alapintegrálok:</strong> <M t="\int_a^b c\,dx=c(b-a)" />, <M t="\int_a^b x\,dx=\frac{b^2-a^2}{2}" />, <M t="\int_a^b x^2\,dx=\frac{b^3-a^3}{3}" />.</li>
            <li><strong>Átlagérték:</strong> <M t="f_{\text{átlag}} = \dfrac{1}{b-a}\int_a^b f(x)\,dx" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Integrál ≠ teljes terület!</strong> Ha <M t="f(x)" /> az <M t="x" />-tengely alá is bemegy, a határozott integrál az alsó részt <em>levonja</em>. Teljes területhez az <M t="|f(x)|" />-et kell integrálni (zérushelyeknél szétbontva).
            </li>
            <li>
              <strong>Fordított határok előjele:</strong> ha az alsó határ nagyobb a felsőnél (<M t="a > b" />), akkor <M t="\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx" /> — ne felejtsd el a mínuszjelet!
            </li>
            <li>
              <strong>Szorzat és hányados NEM bontható szét!</strong> Bár az összeg szétbontható, általában <M t="\int_a^b f(x)g(x)\,dx \neq \left(\int_a^b f(x)\,dx\right)\left(\int_a^b g(x)\,dx\right)" />!
            </li>
            <li>
              <strong>Átlagértéknél ne felejtsd le az <M t="\frac{1}{b-a}" />-t!</strong> Különösen vigyázz negatív alsó határnál: <M t="[-4;\,4]" /> hossza <M t="4-(-4)=8" />, nem <M t="0" />!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki fejből a szabályok alapján: (a) <M t="\int_2^2 (x^5+\sin x)\,dx" />, (b) <M t="\int_5^2 4\,dx" />!
            </>
          }
        >
          <p>
            (a) Nulla hosszúságú intervallum (2. szabály): <M t="\mathbf{0}" />.<br />
            (b) Határcsere (1. szabály): <M t="-\int_2^5 4\,dx = -4(5-2) = \mathbf{-12}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Ha <M t="\int_0^4 f(x)\,dx = 6" /> és <M t="\int_0^4 g(x)\,dx = -1" />, mennyi <M t="\int_0^4 \bigl(3f(x)+2g(x)-5\bigr)\,dx" />?
            </>
          }
        >
          <p>
            <M t="3\int_0^4 f + 2\int_0^4 g - \int_0^4 5\,dx = 3(6) + 2(-1) - 5(4-0) = 18 - 2 - 20 = \mathbf{-4}" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki az <M t="\int_0^3 (2x+1)\,dx" /> integrált kétféleképpen: (a) trapéz területével, (b) az alapképletekkel!
            </>
          }
        >
          <p>
            (a) Az <M t="y=2x+1" /> egyenes <M t="x=0" />-nál <M t="1" />, <M t="x=3" />-nál <M t="7" /> magas; a trapéz területe <M t="\frac{1+7}{2}\cdot 3 = \mathbf{12}" />.<br />
            (b) <M t="2\cdot\frac{3^2-0^2}{2} + 1\cdot(3-0) = 9 + 3 = \mathbf{12}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Számítsd ki az <M t="\int_{-2}^{3} |x|\,dx" /> integrált az additivitás segítségével!
            </>
          }
        >
          <p>
            Bontsuk fel <M t="x=0" />-nál: <M t="[-2;\,0]" />-n <M t="|x|=-x" />, <M t="[0;\,3]" />-n <M t="|x|=x" />. Geometriailag két háromszög az <M t="x" />-tengely fölött:
          </p>
          <M block t="\int_{-2}^{3}|x|\,dx = \int_{-2}^{0}(-x)\,dx + \int_{0}^{3} x\,dx = \frac{2\cdot 2}{2} + \frac{3\cdot 3}{2} = 2 + 4{,}5 = \mathbf{6{,}5}." />
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki az <M t="\int_{-1}^{2}(6x^2 - 2x + 5)\,dx" /> integrált, majd add meg <M t="f(x)=6x^2-2x+5" /> átlagértékét a <M t="[-1;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="6\cdot\dfrac{2^3-(-1)^3}{3} - 2\cdot\dfrac{2^2-(-1)^2}{2} + 5\cdot\bigl(2-(-1)\bigr) = 6\cdot 3 - 2\cdot\dfrac{3}{2} + 15 = 18 - 3 + 15 = \mathbf{30}" />.
          </p>
          <p>
            Az intervallum hossza <M t="2-(-1)=3" />, így <M t="f_{\text{átlag}} = \dfrac{30}{3} = \mathbf{10}" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Mutasd meg a max–min egyenlőtlenséggel, hogy <M t="2\sqrt{2} \le \int_0^1 \sqrt{x+8}\,dx \le 3" />!
            </>
          }
        >
          <p>
            A <M t="[0;\,1]" /> intervallumon <M t="f(x)=\sqrt{x+8}" /> szigorúan növekvő, ezért <M t="\min f = f(0)=\sqrt{8}=2\sqrt{2}" /> és <M t="\max f = f(1)=\sqrt{9}=3" />. Mivel <M t="b-a=1" />, a 6. szabály azonnal adja:
          </p>
          <M block t="2\sqrt{2}\cdot 1 \;\le\; \int_0^1 \sqrt{x+8}\,dx \;\le\; 3\cdot 1." />
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              A domináció (7. szabály) és a <M t="\sin u \le u\;(u\ge 0)" /> egyenlőtlenség segítségével igazold, hogy (a) <M t="\int_0^1 \sin x\,dx \le \frac{1}{2}" />, és (b) <M t="\int_0^1 \sin(x^2)\,dx" /> értéke biztosan kisebb <M t="1" />-nél!
            </>
          }
        >
          <p>
            (a) A <M t="[0;\,1]" /> intervallumon <M t="\sin x \le x" />, így dominációból:
            <M block t="\int_0^1 \sin x\,dx \le \int_0^1 x\,dx = \frac{1^2-0^2}{2} = \frac{1}{2}." />
            (b) Ugyanúgy <M t="u=x^2\ge 0" /> helyettesítéssel <M t="\sin(x^2) \le x^2" />, tehát:
            <M block t="\int_0^1 \sin(x^2)\,dx \le \int_0^1 x^2\,dx = \frac{1^3-0^3}{3} = \frac{1}{3} < 1." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Melyik <M t="b > 0" /> számra lesz az <M t="f(x)=3x^2-2x" /> függvény átlagértéke a <M t="[0;\,b]" /> intervallumon pontosan <M t="2" />?
            </>
          }
        >
          <p>
            Az integrál: <M t="\int_0^b(3x^2-2x)\,dx = 3\cdot\frac{b^3}{3} - 2\cdot\frac{b^2}{2} = b^3 - b^2" />.
          </p>
          <p>
            Az átlagérték: <M t="\dfrac{b^3-b^2}{b} = b^2 - b" />. Ennek kell <M t="2" />-vel egyenlőnek lennie:
          </p>
          <M block t="b^2 - b - 2 = 0 \implies (b-2)(b+1) = 0." />
          <p>
            Mivel <M t="b > 0" />, az egyetlen megoldás <M t="\mathbf{b = 2}" />.
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              <em>Az átlagsebesség csapdája:</em> egy <M t="120\text{ km}" />-es útszakaszon odafelé <M t="40\text{ km/h}" />, visszafelé <M t="60\text{ km/h}" /> állandó sebességgel haladunk. Mennyi az oda-vissza út átlagsebessége? Miért <em>nem</em> <M t="50\text{ km/h}" />?
            </>
          }
        >
          <p>
            Odafelé <M t="t_1 = \frac{120}{40} = 3" /> óra, visszafelé <M t="t_2 = \frac{120}{60} = 2" /> óra az utazási idő, tehát a teljes idő <M t="T = 5" /> óra. Az idő szerinti átlagsebesség:
          </p>
          <M block t="v_{\text{átlag}} = \frac{1}{5}\int_{0}^{5} v(t)\,dt = \frac{40\cdot 3 + 60\cdot 2}{5} = \frac{240}{5} = \mathbf{48\text{ km/h}}." />
          <p>
            Azért kisebb <M t="50" />-nél, mert a lassabb (<M t="40\text{ km/h}" />) sebességgel <em>több ideig</em> (<M t="3" /> órán át) haladtunk, mint a gyorsabbal (<M t="2" /> órán át) — az integrál tehát nagyobb súllyal számítja a lassabb szakaszt!
          </p>
        </Task>
      </>
    ),
  },
];
