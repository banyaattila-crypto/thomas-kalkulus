import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ApplicationsMapDiagram,
  ArcsinDerivationDiagram,
  BinomialSeriesWidget,
  NonElementaryIntegralWidget,
  PiConvergenceRaceWidget,
  PowerSeriesODEWidget,
  RelativityEnergyWidget,
  SeriesLimitVisualWidget,
} from '../components/Widgets1110';
import type { Page } from './s1_1';

export const S11_10: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A binomiális sor: Newton általánosítása',
    body: (
      <>
        <Story>
          <p>
            A középiskolai binomiális tétel egész <M t="m \ge 0" /> kitevőre adja meg <M t="(1+x)^m" /> kifejtését.
            Isaac Newton 1665-ben zseniális merészséggel megkérdezte: <em>mi történik, ha <M t="m" /> tört vagy negatív
            szám, például <M t="m = \frac{1}{2}" /> vagy <M t="m = -\frac{1}{2}" />?</em> A véges összeg végtelen
            hatványsorrá válik — ez a <strong>binomiális sor</strong>!
          </p>
        </Story>

        <Def title="A binomiális sor (|x| < 1)">
          <p>
            Minden valós <M t="m" /> kitevőre és <M t="|x| < 1" /> esetén:
            <M block t="(1 + x)^m = 1 + \sum_{k=1}^{\infty} \binom{m}{k} x^k = 1 + m x + \frac{m(m-1)}{2!}x^2 + \frac{m(m-1)(m-2)}{3!}x^3 + \cdots" />
            ahol az <strong>általánosított binomiális együttható</strong>:
            <M block t="\binom{m}{k} = \frac{m(m-1)(m-2)\cdots(m-k+1)}{k!}." />
            (Ha <M t="m" /> nemnegatív egész, akkor <M t="k > m" />-re minden együttható <M t="0" />, és visszakapjuk a
            szokásos binomiális tételt!)
          </p>
        </Def>

        <BinomialSeriesWidget />

        <Task n={1} q={<>Írd fel a <M t="\sqrt{1 + x} = (1+x)^{1/2}" /> binomiális sorának első négy tagját!</>}>
          <p>
            <M t="m = \frac{1}{2}" />: <M t="\binom{1/2}{1} = \frac{1}{2}" />,{' '}
            <M t="\binom{1/2}{2} = \frac{\frac{1}{2}(-\frac{1}{2})}{2} = -\frac{1}{8}" />,{' '}
            <M t="\binom{1/2}{3} = \frac{\frac{1}{2}(-\frac{1}{2})(-\frac{3}{2})}{6} = \frac{1}{16}" />. Így:
            <M block t="\sqrt{1 + x} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \frac{1}{16}x^3 - \cdots \qquad (|x| \le 1)." />
          </p>
        </Task>

        <Task n={2} q={<>Írd fel a <M t="\frac{1}{\sqrt{1 + x}} = (1+x)^{-1/2}" /> binomiális sorának első négy tagját!</>}>
          <p>
            <M t="m = -\frac{1}{2}" />: <M t="\binom{-1/2}{1} = -\frac{1}{2}" />,{' '}
            <M t="\binom{-1/2}{2} = \frac{(-\frac{1}{2})(-\frac{3}{2})}{2} = \frac{3}{8}" />,{' '}
            <M t="\binom{-1/2}{3} = -\frac{5}{16}" />. Tehát:
            <M block t="\frac{1}{\sqrt{1+x}} = 1 - \frac{1}{2}x + \frac{3}{8}x^2 - \frac{5}{16}x^3 + \cdots \qquad (-1 < x \le 1)." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Binomiális sor a fizikában és az arcsin x sora',
    body: (
      <>
        <p>
          Einstein speciális relativitáselméletében egy <M t="v" /> sebességgel mozgó <M t="m" /> tömegű test mozgási
          energiája:
          <M block t="E_k = mc^2\left(\frac{1}{\sqrt{1 - v^2/c^2}} - 1\right)." />
          Ha <M t="\beta = v/c" />, akkor a <M t="(1 - \beta^2)^{-1/2}" /> binomiális sorából egyetlen csapásra
          előbukkan Newton klasszikus <M t="\frac{1}{2}mv^2" /> képlete, plusz a relativisztikus korrekciók!
          <M block t="E_k = mc^2\left(\frac{1}{2}\beta^2 + \frac{3}{8}\beta^4 + \frac{5}{16}\beta^6 + \cdots\right) = \frac{1}{2}mv^2 + \frac{3}{8}m\frac{v^4}{c^2} + \cdots" />
        </p>

        <RelativityEnergyWidget />

        <p>
          Ugyanez az <M t="m = -\frac{1}{2}" /> binomiális sor adja az <M t="\arcsin x" /> Maclaurin-sorát is, tagonkénti
          integrálással:
        </p>

        <ArcsinDerivationDiagram />

        <Task n={3} q={<>Add meg a <M t="\sqrt[3]{1 + x^2}" /> függvény Maclaurin-sorának első három nem nulla tagját!</>}>
          <p>
            <M t="m = \frac{1}{3}" /> és <M t="x \mapsto x^2" />: <M t="\binom{1/3}{1} = \frac{1}{3}" />,{' '}
            <M t="\binom{1/3}{2} = \frac{\frac{1}{3}(-\frac{2}{3})}{2} = -\frac{1}{9}" />. Tehát:
            <M block t="\sqrt[3]{1 + x^2} = 1 + \frac{1}{3}x^2 - \frac{1}{9}x^4 + \cdots \qquad (|x| \le 1)." />
          </p>
        </Task>

        <Task n={4} q={<>Írd fel a <M t="\frac{1}{(1 - x)^3}" /> függvény Maclaurin-sorát a binomiális sorral (<M t="m = -3" />)!</>}>
          <p>
            <M t="\binom{-3}{k} = (-1)^k \frac{(k+2)(k+1)}{2} = (-1)^k \binom{k+2}{2}" />. Mivel <M t="-x" /> áll
            belül, a <M t="(-1)^k" /> kiejti egymást:{' '}
            <M t="(1-x)^{-3} = \sum_{k=0}^\infty \binom{k+2}{2} x^k = 1 + 3x + 6x^2 + 10x^3 + \cdots" /> (pontosan
            ugyanaz, amit a 11.7-ben kétszeri deriválással kaptunk!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Differenciálegyenletek megoldása hatványsorral',
    body: (
      <>
        <p>
          A 9. fejezetben csak speciális differenciálegyenleteket tudtunk zárt alakban megoldani. A fizikában (optika,
          kvantummechanika, hullámtan) azonban hemzsegnek az olyan egyenletek (pl. <strong>Airy-</strong> vagy{' '}
          <strong>Bessel-egyenlet</strong>), amelyeknek <em>nincs elemi függvényes megoldásuk</em> — viszont
          hatványsorként (<M t="y = \sum c_n x^n" />) egzaktul felírhatók!
        </p>

        <PowerSeriesODEWidget />

        <Steps
          title="Hatványsoros megoldás: az Airy-egyenlet (y″ = x·y)"
          problem={<>Oldd meg az <M t="y'' = x y" /> differenciálegyenletet az <M t="y(0) = 1,\; y'(0) = 0" /> kezdeti feltételekkel!</>}
          steps={[
            {
              title: 'Hatványsor-próba és második derivált',
              body: (
                <p>
                  Keressük a megoldást <M t="y = \sum_{n=0}^\infty c_n x^n" /> alakban! A kezdeti feltételekből{' '}
                  <M t="c_0 = y(0) = 1" /> és <M t="c_1 = y'(0) = 0" />. Kétszer deriválva:
                  <M block t="y'' = \sum_{n=2}^\infty n(n-1)c_n x^{n-2} = 2c_2 + \sum_{k=1}^\infty (k+2)(k+1)c_{k+2} x^k." />
                </p>
              ),
            },
            {
              title: 'Jobb oldal felírása azonos hatványokra',
              body: (
                <p>
                  <M t="x y = \sum_{n=0}^\infty c_n x^{n+1} = \sum_{k=1}^\infty c_{k-1} x^k" /> (itt <M t="k = n + 1" />).
                </p>
              ),
            },
            {
              title: 'Együtthatók összehasonlítása (rekurzió)',
              body: (
                <p>
                  A konstans tagból <M t="2c_2 = 0 \implies c_2 = 0" />. Minden <M t="k \ge 1" />-re:
                  <M block t="(k+2)(k+1)c_{k+2} = c_{k-1} \implies c_{k+2} = \frac{c_{k-1}}{(k+2)(k+1)}." />
                </p>
              ),
            },
            {
              title: 'A megoldássor felírása',
              body: (
                <p>
                  Mivel <M t="c_1 = c_2 = 0" />, csak a 3-mal osztható indexek élnek túl! <M t="c_3 = \frac{1}{3\cdot 2} = \frac{1}{6}" />,{' '}
                  <M t="c_6 = \frac{1/6}{6\cdot 5} = \frac{1}{180}" />, <M t="c_9 = \frac{1}{12960}" />:
                  <M block t="y(x) = 1 + \frac{x^3}{6} + \frac{x^6}{180} + \frac{x^9}{12960} + \cdots" />
                </p>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Oldd meg hatványsorral az <M t="y' = 2x y,\; y(0) = 1" /> kezdetiérték-problémát, és ismerd fel a kapott elemi függvényt!</>}>
          <p>
            <M t="\sum_{n=1}^\infty n c_n x^{n-1} = \sum_{n=0}^\infty 2c_n x^{n+1}" />. Ebből <M t="c_1 = 0" /> és{' '}
            <M t="(k+1)c_{k+1} = 2c_{k-1}" />. Mivel <M t="c_0 = 1" />, minden páratlan együttható 0, a párosak pedig{' '}
            <M t="c_{2m} = \frac{1}{m!}" />. Tehát <M t="y(x) = \sum_{m=0}^\infty \frac{x^{2m}}{m!} = e^{x^2}" />!
          </p>
        </Task>

        <Task n={6} q={<>Határozd meg az <M t="y' - y = x,\; y(0) = 0" /> differenciálegyenlet hatványsoros megoldását!</>}>
          <p>
            <M t="c_0 = 0" />. Behelyettesítve: <M t="(c_1 - c_0) + (2c_2 - c_1)x + (3c_3 - c_2)x^2 + \cdots = x" />.
            Innen <M t="c_1 = 0" />, <M t="2c_2 = 1 \implies c_2 = \frac{1}{2!}" />, <M t="c_3 = \frac{1}{3!}" />,{' '}
            <M t="c_n = \frac{1}{n!}" /> (<M t="n \ge 2" />). Azaz <M t="y(x) = e^x - 1 - x" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Nem elemi integrálok kiszámítása hatványsorral',
    body: (
      <>
        <p>
          A statisztika haranggörbéjének integrálja (<M t="\int e^{-x^2}\,dx" />), a jelfeldolgozás szinusz-integrálja
          (<M t="\int \frac{\sin x}{x}\,dx" />) és az optika Fresnel-integrálja (<M t="\int \cos(x^2)\,dx" />){' '}
          <strong>nem fejezhető ki elemi függvényekkel</strong>. Hatványsorral viszont 3–4 tag összeadásával gyerekjáték
          őket tetszőleges pontossággal kiszámítani!
        </p>

        <NonElementaryIntegralWidget />

        <Quiz
          q={<>A <M t="\int_0^{0{,}5} e^{-x^2}\,dx" /> integrált az <M t="e^{-x^2} \approx 1 - x^2 + \frac{x^4}{2}" /> sorral közelítjük. Melyik a Leibniz-féle hibakorlát?</>}
          options={[
            { label: <M t="\frac{0{,}5^6}{6}" /> },
            { label: <M t="\frac{0{,}5^7}{42}" />, ok: true },
            { label: <M t="\frac{0{,}5^5}{10}" /> },
            { label: <>Nem alkalmazható, mert <M t="e^{-x^2} > 0" /></> },
          ]}
          explain={
            <>
              Az első elhagyott tag az integrandusban <M t="-\frac{x^6}{3!}" />, ennek integrálja <M t="0" />-tól{' '}
              <M t="0{,}5" />-ig: <M t="\frac{0{,}5^7}{6 \cdot 7} = \frac{0{,}5^7}{42} \approx 0{,}000186" />!
            </>
          }
        />

        <Task n={7} q={<>Számítsd ki a <M t="\int_0^{0{,}2} \frac{\sin x}{x}\,dx" /> integrált <M t="10^{-6}" /> pontossággal!</>}>
          <p>
            <M t="\frac{\sin x}{x} = 1 - \frac{x^2}{6} + \frac{x^4}{120} - \cdots" />. Integrálva:
            <M block t="\int_0^{0{,}2} \frac{\sin x}{x}\,dx = 0{,}2 - \frac{0{,}2^3}{18} + \frac{0{,}2^5}{600} - \cdots" />
            Mivel a 3. tag <M t="\frac{0{,}00032}{600} \approx 5{,}3\cdot 10^{-7} < 10^{-6}" />, már az első két tag elég:{' '}
            <M t="0{,}2 - 0{,}000444 = 0{,}199556" />!
          </p>
        </Task>

        <Task n={8} q={<>Add meg a <M t="\int_0^1 \frac{\ln(1+x)}{x}\,dx" /> integrált numerikus végtelen sorként!</>}>
          <p>
            <M t="\frac{\ln(1+x)}{x} = \sum_{n=1}^\infty (-1)^{n-1}\frac{x^{n-1}}{n}" />. Tagonként integrálva{' '}
            <M t="0" />-tól <M t="1" />-ig:
            <M block t="\int_0^1 \frac{\ln(1+x)}{x}\,dx = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n^2} = 1 - \frac{1}{4} + \frac{1}{9} - \frac{1}{16} + \cdots = \frac{\pi^2}{12}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Határozatlan határértékek villámgyorsan (L’Hôpital nélkül)',
    body: (
      <>
        <p>
          Emlékszel a 4.6-os L’Hôpital-szabályra, amikor egy <M t="0/0" /> alakú határértéknél 4–5-ször kellett
          deriválni a számlálót és a nevezőt? A Maclaurin-sorokkal ez <strong>egyetlen algebrai lépésre</strong>{' '}
          rövidül: behelyettesítjük az első néhány tagot, leegyszerűsítjük a legkisebb hatvánnyal, és leolvassuk a
          választ!
        </p>

        <SeriesLimitVisualWidget />

        <Task n={9} q={<>Számítsd ki hatványsorral a <M t="\lim_{x\to 0} \frac{1 - \cos x - \frac{1}{2}x^2}{x^4}" /> határértéket!</>}>
          <p>
            <M t="\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots" />. Így a számláló{' '}
            <M t="1 - \left(1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots\right) - \frac{x^2}{2} = -\frac{x^4}{24} + \cdots" />.
            Osztva <M t="x^4" />-nel a határérték <strong><M t="-\frac{1}{24}" /></strong>!
          </p>
        </Task>

        <Task n={10} q={<>Határozd meg a <M t="\lim_{x\to 0} \frac{\ln(1 + x^2)}{1 - \cos x}" /> határértéket!</>}>
          <p>
            Számláló: <M t="\ln(1+x^2) = x^2 - \frac{x^4}{2} + \cdots" />. Nevező:{' '}
            <M t="1 - \cos x = \frac{x^2}{2} - \frac{x^4}{24} + \cdots" />. Osztva <M t="x^2" />-tel:
            <M block t="\lim_{x\to 0} \frac{1 - \frac{x^2}{2} + \cdots}{\frac{1}{2} - \frac{x^2}{24} + \cdots} = \frac{1}{1/2} = 2." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'A π számítási versenye: Leibniztől Machinig',
    body: (
      <>
        <p>
          Az <M t="\operatorname{arctg} x = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots" /> sorba <M t="x = 1" />-et
          írva megkapjuk Leibniz formuláját (<M t="\pi/4" />), de ez fájdalmasan lassú. Ha viszont{' '}
          <strong>kisebb <M t="x" />-ekkel</strong> fejezzük ki <M t="\pi/4" />-et (pl. John Machin 1706-os
          trigonometrikus azonosságával: <M t="\frac{\pi}{4} = 4\operatorname{arctg}\frac{1}{5} - \operatorname{arctg}\frac{1}{239}" />),
          a konvergencia villámgyorssá válik!
        </p>

        <PiConvergenceRaceWidget />

        <Quiz
          q={<>Miért konvergál ezerszer gyorsabban a <M t="6\operatorname{arctg}\!\left(\frac{1}{\sqrt{3}}\right)" /> sor <M t="\pi" />-hez, mint a <M t="4\operatorname{arctg}(1)" /> Leibniz-sor?</>}
          options={[
            { label: <>Mert a nevezőkben faktoriálisok jelennek meg</> },
            { label: <>Mert minden új tagban az <M t="x^2 = \frac{1}{3}" /> tényező exponenciálisan zsugorítja a maradékot</>, ok: true },
            { label: <>Mert a sor nem alternáló</> },
            { label: <>Mert <M t="\frac{1}{\sqrt{3}} > 1" /></> },
          ]}
          explain={
            <>
              <M t="x = 1" /> esetén a tagok csak <M t="1/(2n+1)" /> ütemben csökkennek, míg <M t="x = 1/\sqrt{3}" />{' '}
              esetén minden lépésben <M t="1/3" />-dal szorzódnak (<M t="3^{-n}" /> geometriai gyorsítás!).
            </>
          }
        />

        <Task n={11} q={<>Igazold a tangens addíciós tételével, hogy <M t="\operatorname{arctg}\frac{1}{2} + \operatorname{arctg}\frac{1}{3} = \frac{\pi}{4}" />!</>}>
          <p>
            Legyen <M t="\alpha = \operatorname{arctg}\frac{1}{2}" /> és <M t="\beta = \operatorname{arctg}\frac{1}{3}" />.
            Ekkor <M t="\operatorname{tg}(\alpha + \beta) = \frac{\frac{1}{2} + \frac{1}{3}}{1 - \frac{1}{6}} = \frac{5/6}{5/6} = 1" />.
            Mivel <M t="0 < \alpha + \beta < \frac{\pi}{2}" />, következik, hogy <M t="\alpha + \beta = \frac{\pi}{4}" />!
          </p>
        </Task>

        <Task n={12} q={<>Hány tag kell a <M t="\operatorname{arctg}\frac{1}{5}" /> sorából, hogy a hiba kisebb legyen, mint <M t="10^{-5}" />?</>}>
          <p>
            Leibniz-korlát: <M t="\frac{(1/5)^{2n+1}}{2n+1} < 10^{-5}" />. Próba: <M t="n=3" />-nál{' '}
            <M t="\frac{1}{7 \cdot 5^7} = \frac{1}{546\,875} \approx 1{,}8\cdot 10^{-6} < 10^{-5}" /> — mindössze{' '}
            <strong>3 tag</strong> (<M t="k=0, 1, 2" />) elég!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: a 11.10 négy pillére és 4 tipikus hiba',
    body: (
      <>
        <ApplicationsMapDiagram />

        <Warn>
          Négy tipikus hiba hatványsorok alkalmazásánál:
          <ol>
            <li>
              <strong>Binomiális sor <M t="|x| \ge 1" /> esetén:</strong> a <M t="(1+x)^m" /> sor csak{' '}
              <M t="|x| < 1" />-re garantált! Ha <M t="\sqrt{4 + x}" />-et fejted ki, előbb emeld ki a 4-et:{' '}
              <M t="2\sqrt{1 + x/4}" />!
            </li>
            <li>
              <strong>Túl korai csonkolás határértéknél:</strong> ha a számlálóban <M t="x^2" />-es tagok kiejtik
              egymást, legalább a következő nem nulla hatványig (<M t="x^4" />) ki kell írni a sort!
            </li>
            <li>
              <strong>Indexeltolás elrontása DE-knél:</strong> <M t="y'" /> és <M t="y''" /> összehasonlítása előtt
              mindig hozz minden szummát közös <M t="x^k" /> hatványra!
            </li>
            <li>
              <strong>Integrálási határ a konvergenciasugáron kívül:</strong> pl. <M t="\int_0^2 \frac{dx}{1+x^2}" />{' '}
              nem számolható az origó körüli <M t="\sum (-1)^n x^{2n}" /> sorral, mert <M t="x = 2 > R = 1" />!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Hogyan kezded a <M t="\sqrt{9 + x}" /> függvény Maclaurin-sorának felírását a binomiális sor segítségével?</>}
          options={[
            { label: <>Közvetlenül beírom <M t="x" /> helyére <M t="8 + x" />-et</> },
            { label: <>Kiemelem a 9-et: <M t="3\left(1 + \frac{x}{9}\right)^{1/2}" />, így <M t="|x| < 9" />-re konvergens</>, ok: true },
            { label: <>Nem fejthető ki, mert <M t="9 > 1" /></> },
            { label: <>Deriválom kilencszer</> },
          ]}
          explain={
            <>
              Mindig <M t="(1 + u)^m" /> alakra hozzuk a főkonstans kiemelésével: <M t="\sqrt{9+x} = 3(1 + x/9)^{1/2}" />,
              így <M t="|x/9| < 1 \iff |x| < 9" />!
            </>
          }
        />

        <Task n={13} q={<>Írd fel a <M t="\sqrt{4 - x}" /> függvény Maclaurin-sorának első három tagját és konvergenciasugarát!</>}>
          <p>
            <M t="\sqrt{4 - x} = 2\left(1 - \frac{x}{4}\right)^{1/2} = 2\left(1 - \frac{1}{2}\cdot\frac{x}{4} - \frac{1}{8}\cdot\frac{x^2}{16} - \cdots\right) = 2 - \frac{x}{4} - \frac{x^2}{64} - \cdots" />{' '}
            (<M t="R = 4" />).
          </p>
        </Task>

        <Task n={14} q={<>Számítsd ki hatványsorral a <M t="\lim_{x\to 0} \frac{e^x - 1 - x - \frac{1}{2}x^2}{x^3}" /> határértéket!</>}>
          <p>
            <M t="e^x - 1 - x - \frac{x^2}{2} = \frac{x^3}{6} + \frac{x^4}{24} + \cdots" />. Osztva <M t="x^3" />-nel a
            határérték <strong><M t="\frac{1}{6}" /></strong>.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorlófeladatok (könnyű · közepes · nehéz)',
    body: (
      <>
        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Add meg a <M t="(1 + x)^{-1/3}" /> binomiális sorának első három tagját!</>}>
          <p>
            <M t="1 - \frac{1}{3}x + \frac{(-\frac{1}{3})(-\frac{4}{3})}{2}x^2 - \cdots = 1 - \frac{1}{3}x + \frac{2}{9}x^2 - \cdots" />{' '}
            (<M t="|x| < 1" />).
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki hatványsorral: <M t="\lim_{x\to 0} \frac{\sin(2x) - 2x}{x^3}" />!</>}>
          <p>
            <M t="\sin(2x) = 2x - \frac{(2x)^3}{6} + \cdots = 2x - \frac{4}{3}x^3 + \cdots" />. Így a határérték{' '}
            <strong><M t="-\frac{4}{3}" /></strong>.
          </p>
        </Task>

        <Task n={17} q={<>Írd fel a <M t="\int_0^x e^{-t^3}\,dt" /> függvény Maclaurin-sorának első három nem nulla tagját!</>}>
          <p>
            <M t="e^{-t^3} = 1 - t^3 + \frac{t^6}{2} - \cdots" />. Integrálva: <M t="x - \frac{x^4}{4} + \frac{x^7}{14} - \cdots" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki a <M t="\int_0^{0{,}5} \cos(x^2)\,dx" /> Fresnel-integrált <M t="10^{-4}" /> pontossággal!</>}>
          <p>
            <M t="\cos(x^2) = 1 - \frac{x^4}{2!} + \frac{x^8}{4!} - \cdots" />. Integrálva <M t="0" />-tól{' '}
            <M t="0{,}5" />-ig: <M t="0{,}5 - \frac{0{,}5^5}{10} + \frac{0{,}5^9}{216} - \cdots" />. Mivel a 3. tag{' '}
            <M t="\frac{1}{512\cdot 216} \approx 9\cdot 10^{-6} < 10^{-4}" />, elég az első két tag:{' '}
            <M t="0{,}5 - 0{,}003125 = 0{,}496875" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki hatványsorral a <M t="\lim_{x\to 0} \frac{\operatorname{arctg} x - \sin x}{x^3}" /> határértéket!</>}>
          <p>
            <M t="\operatorname{arctg} x = x - \frac{x^3}{3} + \cdots" /> és{' '}
            <M t="\sin x = x - \frac{x^3}{6} + \cdots" />. Különbségük: <M t="\left(-\frac{1}{3} + \frac{1}{6}\right)x^3 + \cdots = -\frac{1}{6}x^3 + \cdots" />.
            A határérték <strong><M t="-\frac{1}{6}" /></strong>!
          </p>
        </Task>

        <Task n={20} q={<>Oldd meg hatványsorral az <M t="y' + 3y = 0,\; y(0) = 2" /> egyenletet!</>}>
          <p>
            <M t="(n+1)c_{n+1} + 3c_n = 0 \implies c_{n+1} = \frac{-3}{n+1}c_n" />. Mivel <M t="c_0 = 2" />, kapjuk{' '}
            <M t="c_n = 2\frac{(-3)^n}{n!}" />, azaz <M t="y(x) = 2e^{-3x}" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Határozd meg az <M t="y'' + y = 0,\; y(0) = 0,\; y'(0) = 1" /> harmonikus rezgőmozgás egyenletének hatványsoros megoldását!</>}>
          <p>
            <M t="c_0 = 0, c_1 = 1" />. A <M t="\sum (n+2)(n+1)c_{n+2}x^n + \sum c_n x^n = 0" /> egyenletből{' '}
            <M t="c_{n+2} = -\frac{c_n}{(n+2)(n+1)}" />. Minden páros együttható 0, a páratlanok:{' '}
            <M t="c_{2k+1} = \frac{(-1)^k}{(2k+1)!}" />, tehát <M t="y(x) = \sin x" />!
          </p>
        </Task>

        <Task n={22} q={<>Írd fel az <M t="f(x) = \operatorname{arsh} x = \ln(x + \sqrt{1+x^2})" /> Maclaurin-sorának első három nem nulla tagját az <M t="f'(x) = \frac{1}{\sqrt{1+x^2}}" /> binomiális sorának integrálásával!</>}>
          <p>
            <M t="\frac{1}{\sqrt{1+t^2}} = 1 - \frac{1}{2}t^2 + \frac{3}{8}t^4 - \cdots" />. Integrálva <M t="0" />-tól{' '}
            <M t="x" />-ig (<M t="\operatorname{arsh} 0 = 0" />):
            <M block t="\operatorname{arsh} x = x - \frac{x^3}{6} + \frac{3}{40}x^5 - \cdots \qquad (|x| \le 1)." />
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki hatványsorral a <M t="\lim_{x\to 0} \frac{e^{x^2} - 1 - x^2}{\cos(x^2) - 1}" /> határértéket!</>}>
          <p>
            Számláló: <M t="e^{x^2} - 1 - x^2 = \frac{x^4}{2!} + \frac{x^6}{3!} + \cdots" />. Nevező:{' '}
            <M t="\cos(x^2) - 1 = -\frac{x^4}{2!} + \frac{x^8}{4!} - \cdots" />. Osztva <M t="x^4" />-nel a határérték{' '}
            <M t="\frac{1/2}{-1/2} = -1" />!
          </p>
        </Task>
      </>
    ),
  },
];
