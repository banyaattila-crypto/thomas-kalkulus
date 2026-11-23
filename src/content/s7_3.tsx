import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  EulerLimitWidget,
  ExpAreaWidget,
  ExpCurvesGalleryWidget,
  ExpFamilyGrowthWidget,
  ExpLnMirrorWidget,
  ExpSelfDerivativeWidget,
  PowerVsExpVsXXWidget,
  ThreeCasesCheatDiagram,
} from '../components/Widgets73';
import type { Page } from './s1_1';

export const S7_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Az exponenciális függvény mint az ln x inverze (eˣ = ln⁻¹ x)',
    body: (
      <>
        <Story>
          <p>
            A 7.2-ben kőszilárdan felépítettük a természetes logaritmust (<M t="\ln x" />), és bebizonyítottuk, hogy <M t="(0;\,\infty)" />-n szigorúan növekvő, értékkészlete pedig a teljes <M t="(-\infty;\,\infty)" />. A 7.1-es elméletünk szerint tehát létezik az egyértelmű inverze — és ezzel megszületik az analízis legfontosabb függvénye: az <strong>exponenciális függvény (<M t="e^x" />)</strong>!
          </p>
        </Story>

        <Def title="A természetes alapú exponenciális függvény definíciója">
          <p>
            Minden <M t="x \in \mathbb{R}" /> valós számra:
          </p>
          <M block t="e^x \;=\; \exp(x) \;=\; \ln^{-1}(x) \qquad \Longleftrightarrow \qquad \bigl(y = e^x \iff \ln y = x\bigr)." />
          <ul>
            <li><strong>Értelmezési tartomány és értékkészlet:</strong> <M t="D_{e^x} = (-\infty;\,\infty)" />, <M t="R_{e^x} = (0;\,\infty)" /> — tehát <M t="e^x > 0" /> <em>minden</em> valós <M t="x" />-re!</li>
            <li><strong>Kétoldali inverz azonosságok:</strong>
              <M block t="e^{\ln x} = x \quad (x > 0), \qquad \ln(e^x) = x \quad (\forall\,x \in \mathbb{R})." />
            </li>
            <li><strong>Határértékek:</strong> <M t="\displaystyle\lim_{x\to +\infty} e^x = +\infty" />, <M t="\displaystyle\lim_{x\to -\infty} e^x = 0" /> (az <M t="x" />-tengely bal oldali vízszintes aszimptota!).</li>
          </ul>
        </Def>

        <p>
          Miért zseniális ez a definíció? Racionális <M t="r" /> kitevőkre <M t="\ln(e^r) = r\ln e = r \implies e^r = \ln^{-1}(r)" />, tehát pontosan megegyezik a megszokott hatványozással — de az <M t="\ln^{-1}(x)" /> függvény <em>minden irracionális <M t="x" />-re is</em> definiált, így most először pontos értelmet kaptak az olyan kifejezések, mint <M t="e^{\sqrt{2}}" /> vagy <M t="e^\pi" />! (Érdekesség: maga az <M t="e \approx 2{,}718281828\ldots" /> szám is transzcendens — ezt Charles Hermite bizonyította 1873-ban.)
        </p>

        <ExpLnMirrorWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Egyszerűsítsd a kifejezéseket: (a) <M t="e^{\ln 7{,}2}" />, (b) <M t="e^{-\ln 0{,}5}" />, (c) <M t="\ln\!\bigl(e^{\sin x}\bigr)" />, (d) <M t="e^{3\ln 2}" />!
            </>
          }
        >
          <p>
            (a) <M t="\mathbf{7{,}2}" />; (b) <M t="e^{\ln(0{,}5^{-1})} = \mathbf{2}" />; (c) <M t="\mathbf{\sin x}" />; (d) <M t="e^{\ln(2^3)} = \mathbf{8}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Oldd meg <M t="k" />-ra az <M t="e^{2k} = 10" /> egyenletet!
            </>
          }
        >
          <p>
            Vegyük mindkét oldal természetes logaritmusát: <M t="\ln(e^{2k}) = \ln 10 \implies 2k = \ln 10 \implies k = \mathbf{\frac{1}{2}\ln 10} \approx 1{,}151" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Általános exponenciális függvény (aˣ = eˣ·ˡⁿ ᵃ) és kitevőszabályok',
    body: (
      <>
        <Story>
          <p>
            Ha már megvan <M t="e^x" /> minden valós számra, egyetlen trükkel <strong>tetszőleges pozitív <M t="a" /> alapra</strong> is kiterjeszthetjük a hatványozást! Mivel <M t="a = e^{\ln a}" />, természetesen <M t="a^x = (e^{\ln a})^x = e^{x\ln a}" />!
          </p>
        </Story>

        <Def title="Általános exponenciális függvény és a 3. Tétel (kitevőszabályok)">
          <p>Tetszőleges <M t="a > 0" /> alap és bármely valós <M t="x" /> esetén:</p>
          <M block t="a^x \;=\; e^{x\ln a}." />
          <p><strong>3. Tétel (Kitevőszabályok — minden valós <M t="x, x_1, x_2" /> számra):</strong></p>
          <ol className="steps">
            <li><M t="e^{x_1}\cdot e^{x_2} = e^{x_1 + x_2}" /></li>
            <li><M t="e^{-x} = \dfrac{1}{e^x}" /></li>
            <li><M t="\dfrac{e^{x_1}}{e^{x_2}} = e^{x_1 - x_2}" /></li>
            <li><M t="(e^{x_1})^{x_2} = e^{x_1 x_2}" /></li>
          </ol>
        </Def>

        <p>
          <strong>Hogyan bizonyítjuk az 1. szabályt a logaritmusból?</strong> Legyen <M t="y_1 = e^{x_1}" /> és <M t="y_2 = e^{x_2}" />, ekkor definícióból <M t="x_1 = \ln y_1" /> és <M t="x_2 = \ln y_2" />. A logaritmus szorzatszabályával:
        </p>
        <M block t="x_1 + x_2 = \ln y_1 + \ln y_2 = \ln(y_1 y_2) \;\implies\; e^{x_1 + x_2} = e^{\ln(y_1 y_2)} = y_1 y_2 = e^{x_1} e^{x_2}!" />
        <p>
          Az <M t="a^x = e^{x\ln a}" /> definíció miatt ugyanez a négy kitevőszabály automatikusan igaz minden <M t="a > 0" /> alapú exponenciális függvényre is! Nézd meg az alábbi interaktív ábrán, hogyan függ a görbe alakja az <M t="a" /> alaptól (és a <M t="\ln a" /> előjelétől!):
        </p>

        <ExpFamilyGrowthWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egyszerűsítsd: (a) <M t="e^{x + \ln 5}" />, (b) <M t="e^{\ln x - \ln y}" /> (<M t="x, y > 0" />)!
            </>
          }
        >
          <p>
            (a) <M t="e^x\cdot e^{\ln 5} = \mathbf{5e^x}" />; (b) <M t="\dfrac{e^{\ln x}}{e^{\ln y}} = \mathbf{\dfrac{x}{y}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Fejezd ki <M t="y" />-t <M t="t" /> függvényeként, ha <M t="\ln(y - 40) = 5t" />!
            </>
          }
        >
          <p>
            Emeljük <M t="e" /> alapú hatványra mindkét oldalt: <M t="y - 40 = e^{5t} \implies \mathbf{y = 40 + e^{5t}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Az eˣ deriváltja — a függvény, amely saját magának a deriváltja!',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a kalkulus egyik legvarázslatosabb képletéhez! Használjuk a 7.1-es <strong>1. Tételt</strong> az <M t="f(x) = \ln x" /> függvény <M t="f^{-1}(x) = e^x" /> inverzére — és nézzük meg, mi történik!
          </p>
        </Story>

        <p>
          Tudjuk, hogy <M t="f(x) = \ln x" /> mindenütt differenciálható, és <M t="f'(z) = \dfrac{1}{z} \ne 0" />. Az 1. Tétel szerint:
        </p>
        <M block t="\frac{d}{dx}(e^x) = \frac{d}{dx}\bigl(f^{-1}(x)\bigr) = \frac{1}{f'\!\bigl(f^{-1}(x)\bigr)} = \frac{1}{f'(e^x)} = \frac{1}{\;1/e^x\;} = \mathbf{e^x}!" />

        <Def title="Az exponenciális függvény deriválási szabályai">
          <M block t="\frac{d}{dx}\bigl(e^x\bigr) \;=\; e^x, \qquad\text{láncszabállyal:}\qquad \frac{d}{dx}\bigl(e^u\bigr) \;=\; e^u \cdot \frac{du}{dx}." />
          <ul>
            <li><strong>Minden rendű deriváltja önmaga:</strong> <M t="(e^x)' = (e^x)'' = \dots = (e^x)^{(n)} = e^x" />.</li>
            <li><strong>Geometriai jelentése:</strong> az <M t="y = e^x" /> görbe minden <M t="(x_0;\,e^{x_0})" /> pontjában a meredekség pontosan egyenlő a görbe magasságával — ezért az érintő mindig pontosan <M t="1" /> egységgel balra (<M t="x_0 - 1" />-nél) metszi az <M t="x" />-tengelyt!</li>
          </ul>
        </Def>

        <ExpSelfDerivativeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Deriváld: (a) <M t="y = e^{-5x}" />, (b) <M t="y = e^{\sin x}" />, (c) <M t="y = e^{x^2 + 4\sqrt{x}}" />!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{-5e^{-5x}}" />; (b) <M t="y' = \mathbf{\cos x \cdot e^{\sin x}}" />; (c) <M t="y' = \mathbf{\left(2x + \frac{2}{\sqrt{x}}\right)e^{x^2 + 4\sqrt{x}}}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Írd fel az <M t="y = e^x" /> görbéhez a <M t="(0;\,1)" /> pontban húzott érintő egyenletét! Mit jelent ez a kis <M t="x" />-ekre való közelítésre?
            </>
          }
        >
          <p>
            <M t="f(0) = 1,\; f'(0) = e^0 = 1 \implies y - 1 = 1(x - 0) \implies \mathbf{y = 1 + x}" />. Mivel <M t="(e^x)'' = e^x > 0" /> (alulról konvex), a görbe mindig az érintője felett fut: <M t="e^x \ge 1 + x" /> minden <M t="x\in\mathbb{R}" />-re, és kis <M t="x" />-re <M t="e^x \approx 1 + x" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Összetett exponenciális deriváltak és függvényelemzés (xe⁻ˣ, e⁻ˣ²)',
    body: (
      <>
        <Story>
          <p>
            A fizikában, valószínűségszámításban és mérnöki modellekben az <M t="e^u" /> leggyakrabban szorzatban vagy négyzetes kitevővel jelenik meg — mint a csillapodó impulzus (<M t="xe^{-x}" />) vagy a híres <strong>Gauss-féle haranggörbe (<M t="e^{-x^2}" />)</strong>. Lássuk a legfontosabb trükköt az elemzésükhöz!
          </p>
        </Story>

        <Def title="Az aranytrükk exponenciális függvények elemzésénél">
          <p>
            Deriválás után <strong>mindig emeld ki közös tényezőként az <M t="e^u" />-t!</strong> Mivel <M t="e^u > 0" /> <em>soha nem nulla és soha nem negatív</em>, a kritikus pontokat, a monotonitást és az inflexiós pontokat kizárólag a mellette maradó polinom-tényező határozza meg!
          </p>
          <ul>
            <li>
              <strong>Csillapodó impulzus (<M t="f(x) = xe^{-x}" />):</strong> <M t="f'(x) = (1 - x)e^{-x}" /> (maximum <M t="x=1" />-nél), <M t="f''(x) = (x - 2)e^{-x}" /> (inflexió <M t="x=2" />-nél).
            </li>
            <li>
              <strong>Gauss-haranggörbe (<M t="g(x) = e^{-x^2}" />):</strong> <M t="g'(x) = -2xe^{-x^2}" /> (maximum <M t="x=0" />-nál), <M t="g''(x) = (4x^2 - 2)e^{-x^2}" /> (inflexió <M t="x = \pm \frac{1}{\sqrt{2}}" />-nél!).
            </li>
          </ul>
        </Def>

        <ExpCurvesGalleryWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Deriváld és egyszerűsítsd teljesen: <M t="y = (x^2 - 2x + 2)e^x" />!
            </>
          }
        >
          <p>
            Szorzatszabállyal:
            <M block t="y' = (2x - 2)e^x + (x^2 - 2x + 2)e^x = (2x - 2 + x^2 - 2x + 2)e^x = \mathbf{x^2 e^x}!" />
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Határozd meg implicit deriválással <M t="\dfrac{dy}{dx}" /> értékét, ha <M t="e^{2x} = \sin(x + 3y)" />!
            </>
          }
        >
          <p>
            Mindkét oldalt <M t="x" /> szerint deriválva: <M t="2e^{2x} = \cos(x+3y)\cdot(1 + 3y')" />. Ebből kifejezve <M t="y'" />-t:
            <M block t="y' = \mathbf{\frac{2e^{2x} - \cos(x+3y)}{3\cos(x+3y)}}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Az exponenciális függvény integrálja és kezdetiérték-problémák',
    body: (
      <>
        <Story>
          <p>
            Ha <M t="e^x" /> deriváltja saját maga, akkor a primitív függvénye is saját maga! Ez az analízis legkönnyebben integrálható transzcendens függvénye — és <M t="u" />-helyettesítéssel rengeteg összetett integrált is pillanatok alatt megold!
          </p>
        </Story>

        <Def title="Az exponenciális függvény integrálási szabályai">
          <M block t="\int e^x\,dx \;=\; e^x + C, \qquad \int e^u\,du \;=\; e^u + C, \qquad \int e^{kx}\,dx \;=\; \frac{1}{k}e^{kx} + C \;\;(k \ne 0)." />
          <p>
            <strong>Helyettesítési minta:</strong> ha az integrandusban <M t="e^{g(x)} \cdot g'(x)" /> szerepel, akkor <M t="u = g(x),\; du = g'(x)\,dx" /> választással az integrál azonnal <M t="e^{g(x)} + C" />!
          </p>
        </Def>

        <ExpAreaWidget />

        <p>
          <strong>Kidolgozott kezdetiérték-probléma (Thomas 8. példa):</strong> Oldjuk meg az <M t="e^y\dfrac{dy}{dx} = 2x" /> (<M t="x > \sqrt{3}" />), <M t="y(2) = 0" /> feladatot!
        </p>
        <p>
          A bal oldal pontosan <M t="\dfrac{d}{dx}(e^y)" />! Mindkét oldalt <M t="x" /> szerint integrálva: <M t="e^y = x^2 + C" />. A kezdeti feltételből <M t="e^0 = 2^2 + C \implies 1 = 4 + C \implies C = -3" />, tehát <M t="e^y = x^2 - 3" />. Logaritmust véve: <M t="\mathbf{y = \ln(x^2 - 3)}" />!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: (a) <M t="\displaystyle\int_{0}^{\ln 2} e^{3x}\,dx" />, (b) <M t="\displaystyle\int_{0}^{\pi/2} e^{\sin x}\cos x\,dx" />!
            </>
          }
        >
          <p>
            (a) <M t="\left[\frac{1}{3}e^{3x}\right]_{0}^{\ln 2} = \frac{1}{3}(e^{3\ln 2} - e^0) = \frac{1}{3}(8 - 1) = \mathbf{\dfrac{7}{3}}" />.
          </p>
          <p>
            (b) <M t="u = \sin x,\; du = \cos x\,dx \implies \bigl[e^{\sin x}\bigr]_{0}^{\pi/2} = e^1 - e^0 = \mathbf{e - 1}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki a <M t="\displaystyle\int \frac{e^{\sqrt{r}}}{\sqrt{r}}\,dr" /> határozatlan integrált!
            </>
          }
        >
          <p>
            Legyen <M t="u = \sqrt{r} \implies du = \frac{1}{2\sqrt{r}}\,dr \implies \frac{dr}{\sqrt{r}} = 2\,du" />:
            <M block t="\int 2e^u\,du = 2e^u + C = \mathbf{2e^{\sqrt{r}} + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Az e szám mint határérték: e = lim (1 + x)¹/ˣ (4. Tétel)',
    body: (
      <>
        <Story>
          <p>
            Honnan lehet kiszámolni az <M t="e \approx 2{,}718281828\ldots" /> számot, és mi köze van a banki <strong>kamatos kamathoz</strong>? A 4. Tétel egy csodálatos híddal köti össze az <M t="\ln x" /> deriváltját és a híres <M t="(1 + 1/n)^n" /> határértéket!
          </p>
        </Story>

        <Def title="4. Tétel — Az e szám mint határérték">
          <M block t="e \;=\; \lim_{x\to 0}(1 + x)^{1/x} \;=\; \lim_{y\to\infty}\left(1 + \frac{1}{y}\right)^{y}." />
          <p>Általánosabb, nagyon gyakori alak (tetszőleges <M t="r \in \mathbb{R}" /> esetén):</p>
          <M block t="\lim_{y\to\infty}\left(1 + \frac{r}{y}\right)^{y} \;=\; e^r." />
        </Def>

        <p>
          <strong>Az elegáns, 4 soros bizonyítás (Thomas II., 162. oldal):</strong> Tekintsük az <M t="f(t) = \ln t" /> függvényt! Tudjuk, hogy <M t="f'(1) = \frac{1}{1} = 1" />. A derivált definíciója szerint:
        </p>
        <M block t="1 = f'(1) = \lim_{x\to 0}\frac{\ln(1+x) - \ln 1}{x} = \lim_{x\to 0}\frac{1}{x}\ln(1+x) = \lim_{x\to 0}\ln\!\left((1+x)^{1/x}\right) = \ln\!\left(\lim_{x\to 0}(1+x)^{1/x}\right)," />
        <p>
          ahol az utolsó lépésben felhasználtuk, hogy <M t="\ln" /> folytonos. Mivel <M t="\ln e = 1" /> és <M t="\ln" /> injektív, azonnal adódik: <M t="\displaystyle\lim_{x\to 0}(1+x)^{1/x} = e" />! Az <M t="y = 1/x" /> helyettesítéssel kapjuk a <M t="\lim_{y\to\infty}(1+1/y)^y = e" /> alakot.
        </p>

        <EulerLimitWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki a határértéket: <M t="\displaystyle\lim_{n\to\infty}\left(1 + \frac{1}{n}\right)^{3n}" />!
            </>
          }
        >
          <p>
            <M t="\displaystyle\lim_{n\to\infty}\left[\left(1 + \frac{1}{n}\right)^n\right]^3 = \mathbf{e^3}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki a határértéket: <M t="\displaystyle\lim_{x\to 0}(1 + 2x)^{1/x}" />!
            </>
          }
        >
          <p>
            Legyen <M t="u = 2x \implies 1/x = 2/u" /> (<M t="u \to 0" />):
            <M block t="\lim_{u\to 0}\left[(1+u)^{1/u}\right]^2 = \mathbf{e^2}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Az általános hatványszabály (bármely valós kitevőre!) és a 3 eset',
    body: (
      <>
        <Story>
          <p>
            A 3. fejezetben megígértük, hogy a <M t="(x^n)' = nx^{n-1}" /> hatványszabály nemcsak egész és racionális, hanem <strong>bármely valós (akár irracionális!) <M t="n" /> kitevőre</strong> igaz — most az <M t="x^n = e^{n\ln x}" /> definícióval 2 sorban bebizonyítjuk!
          </p>
        </Story>

        <Def title="Az általános hatványszabály (tetszőleges valós kitevőre)">
          <p>Ha <M t="u(x) > 0" /> differenciálható függvény és <M t="n \in \mathbb{R}" /> <strong>tetszőleges valós szám</strong>, akkor:</p>
          <M block t="\frac{d}{dx}\bigl(x^n\bigr) \;=\; nx^{n-1} \;\;(x > 0), \qquad\text{láncszabállyal:}\qquad \frac{d}{dx}\bigl(u^n\bigr) \;=\; nu^{n-1}\frac{du}{dx}." />
          <p>
            <strong>2 soros bizonyítás:</strong> Mivel <M t="x^n = e^{n\ln x}" />, a láncszabállyal:
            <M block t="\frac{d}{dx}(x^n) = \frac{d}{dx}\bigl(e^{n\ln x}\bigr) = e^{n\ln x}\cdot\frac{n}{x} = x^n\cdot\frac{n}{x} = nx^{n-1}!" />
          </p>
        </Def>

        <p>
          Ezen a ponton a vizsgázók leggyakoribb hibája, hogy összekeverik a <strong>hatványfüggvényt</strong> (<M t="x^n" />), az <strong>exponenciális függvényt</strong> (<M t="e^x" />) és a <strong>kettős változós esetet</strong> (<M t="x^x" />)! Nézd meg a kettőjük (háromjuk!) összehasonlítását a két ábrán:
        </p>

        <ThreeCasesCheatDiagram />
        <PowerVsExpVsXXWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Deriváld: (a) <M t="y = x^{\sqrt{2}}" /> (<M t="x > 0" />), (b) <M t="y = (2 + \sin 3x)^{\pi}" /> (Thomas 9. példa)!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{\sqrt{2}\,x^{\sqrt{2}-1}}" />.
          </p>
          <p>
            (b) Általános hatványszabály + láncszabály: <M t="y' = \pi(2+\sin 3x)^{\pi - 1}\cdot(\cos 3x)\cdot 3 = \mathbf{3\pi(2+\sin 3x)^{\pi-1}\cos 3x}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Deriváld az <M t="y = x^x" /> (<M t="x > 0" />) függvényt az <M t="x^x = e^{x\ln x}" /> átírással!
            </>
          }
        >
          <p>
            <M t="y = e^{x\ln x} \implies y' = e^{x\ln x}\cdot(x\ln x)' = x^x\left(1\cdot\ln x + x\cdot\frac{1}{x}\right) = \mathbf{x^x(\ln x + 1)}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Összefoglalás, buktatók és lépcsőzetes gyakorlófeladatok',
    body: (
      <>
        <Def title="7.3 Puskakártya">
          <ul>
            <li><strong>Definíció és inverz azonosságok:</strong> <M t="e^x = \ln^{-1} x > 0" />, <M t="e^{\ln x} = x\;(x>0)" />, <M t="\ln(e^x) = x" />.</li>
            <li><strong>Általános hatvány &amp; kitevőszabályok:</strong> <M t="a^x = e^{x\ln a}" /> · <M t="e^{a+b}=e^a e^b,\; e^{-x}=1/e^x,\; (e^a)^b = e^{ab}" />.</li>
            <li><strong>Deriválás és integrálás:</strong> <M t="(e^u)' = e^u u'" /> · <M t="\int e^u\,du = e^u + C" /> · <M t="\int e^{kx}\,dx = \frac{1}{k}e^{kx}+C" />.</li>
            <li><strong>Az <M t="e" /> szám határértéke:</strong> <M t="e = \lim_{x\to 0}(1+x)^{1/x} = \lim_{y\to\infty}(1+1/y)^y" />.</li>
            <li><strong>Általános hatványszabály (<M t="n\in\mathbb{R}" />):</strong> <M t="(u^n)' = nu^{n-1}u'" /> · kettős változó: <M t="u^v = e^{v\ln u}" />!</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong><M t="(e^x)' \ne x e^{x-1}" />!</strong> A hatványszabály csak állandó kitevőnél (<M t="x^n" />) érvényes — állandó alapnál (<M t="e^x" />) a derivált önmaga!
            </li>
            <li>
              <strong>Láncszabály elhagyása:</strong> <M t="(e^{3x})' = 3e^{3x}" />, nem <M t="e^{3x}" />! Integrálásnál ugyanígy osztani kell a konstanssal: <M t="\int e^{3x}\,dx = \frac{1}{3}e^{3x} + C" />.
            </li>
            <li>
              <strong>Változóval nem oszthatunk integrálásnál:</strong> <M t="\int e^{x^2}\,dx \ne \frac{1}{2x}e^{x^2}" />! Az <M t="e^{x^2}" />-nek nincs elemi primitív függvénye (ellenőrizd deriválással!).
            </li>
            <li>
              <strong><M t="e^{a+b} = e^a\cdot e^b" />, NEM <M t="e^a + e^b" />!</strong>
            </li>
            <li>
              <strong><M t="e^x > 0" /> minden valós <M t="x" />-re:</strong> az <M t="e^x = 0" /> vagy <M t="e^x = -3" /> egyenletnek nincs valós megoldása!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Egyszerűsítsd: (a) <M t="e^{-2\ln 3}" />, (b) <M t="\ln\!\bigl(\ln(e^e)\bigr)" />, (c) <M t="\ln\!\bigl(e^{2\ln x}\bigr)" /> (<M t="x > 0" />)!
            </>
          }
        >
          <p>
            (a) <M t="e^{\ln(3^{-2})} = \mathbf{\frac{1}{9}}" />; (b) <M t="\ln(e) = \mathbf{1}" />; (c) <M t="2\ln x = \mathbf{\ln(x^2)}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Deriváld: <M t="y = (1 + 2x)e^{-2x}" />!
            </>
          }
        >
          <p>
            Szorzatszabály: <M t="y' = 2e^{-2x} + (1+2x)(-2e^{-2x}) = (2 - 2 - 4x)e^{-2x} = \mathbf{-4xe^{-2x}}" />!
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\ln 3} (e^x + 2e^{-x})\,dx" />!
            </>
          }
        >
          <p>
            <M t="\big[e^x - 2e^{-x}\big]_{0}^{\ln 3} = \left(3 - \frac{2}{3}\right) - (1 - 2) = \frac{7}{3} + 1 = \mathbf{\frac{10}{3}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Fejezd ki <M t="y" />-t <M t="x" /> segítségével, ha <M t="\ln(y - 1) - \ln 2 = x + \ln x" /> (<M t="x > 0" />)!
            </>
          }
        >
          <p>
            <M t="\ln\!\left(\frac{y-1}{2}\right) = x + \ln x \implies \frac{y-1}{2} = e^{x + \ln x} = xe^x \implies \mathbf{y = 2xe^x + 1}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: (a) <M t="\displaystyle\int \frac{e^{1/x}}{x^2}\,dx" />, (b) <M t="\displaystyle\int_{0}^{\pi/4} e^{\operatorname{tg}\theta}\sec^2\theta\,d\theta" />!
            </>
          }
        >
          <p>
            (a) <M t="u = 1/x \implies du = -\frac{1}{x^2}\,dx \implies -\int e^u\,du = \mathbf{-e^{1/x} + C}" />.
          </p>
          <p>
            (b) <M t="u = \operatorname{tg}\theta \implies du = \sec^2\theta\,d\theta" />, határok <M t="0 \to 1" />: <M t="\bigl[e^u\bigr]_{0}^{1} = \mathbf{e - 1}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Deriváld: <M t="y = \ln\!\left(\dfrac{e^\theta}{1 + e^\theta}\right)" />!
            </>
          }
        >
          <p>
            Először bontsuk szét logaritmusszabállyal: <M t="y = \ln(e^\theta) - \ln(1 + e^\theta) = \theta - \ln(1 + e^\theta)" />. Deriválva:
            <M block t="y' = 1 - \frac{e^\theta}{1 + e^\theta} = \mathbf{\frac{1}{1 + e^\theta}}!" />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Kezdetiérték-feladat:</em> Oldd meg az <M t="e^y\dfrac{dy}{dx} = 3x^2" />, <M t="y(1) = 0" /> differenciálegyenletet, és add meg a megoldás értelmezési tartományát!
            </>
          }
        >
          <p>
            Integrálva: <M t="e^y = x^3 + C" />. Mivel <M t="y(1) = 0 \implies 1 = 1 + C \implies C = 0" />, így <M t="e^y = x^3 \implies \mathbf{y = \ln(x^3) = 3\ln x}" />, amely az <M t="\mathbf{x > 0}" /> tartományon érvényes!
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Határérték az <M t="e" /> számmal:</em> Számítsd ki <M t="\displaystyle\lim_{n\to\infty}\left(1 - \frac{3}{n}\right)^{n}" /> pontos értékét!
            </>
          }
        >
          <p>
            Legyen <M t="u = -\frac{3}{n} \to 0" />, ekkor <M t="n = -\frac{3}{u}" />:
            <M block t="\lim_{u\to 0}(1 + u)^{-3/u} = \left[\lim_{u\to 0}(1 + u)^{1/u}\right]^{-3} = \mathbf{e^{-3} = \frac{1}{e^3}}." />
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Az <M t="f(x) = x^x" /> (<M t="x > 0" />) minimuma:</em> Hol veszi fel abszolút minimumát az <M t="f(x) = x^x" /> függvény, és mekkora ez a minimumérték?
            </>
          }
        >
          <p>
            A 14. feladatból <M t="f'(x) = x^x(\ln x + 1)" />. Mivel <M t="x^x > 0" /> mindig, ezért <M t="f'(x) = 0 \iff \ln x + 1 = 0 \iff \ln x = -1 \iff x = \mathbf{\frac{1}{e}} \approx 0{,}368" />.
          </p>
          <p>
            <M t="0 < x < 1/e" /> esetén <M t="\ln x + 1 < 0" /> (csökken), <M t="x > 1/e" /> esetén pozitív (nő), tehát <M t="x = 1/e" /> abszolút minimumhely, a minimumérték pedig <M t="f(1/e) = (1/e)^{1/e} = \mathbf{e^{-1/e} \approx 0{,}692}" />!
          </p>
        </Task>
      </>
    ),
  },
];
