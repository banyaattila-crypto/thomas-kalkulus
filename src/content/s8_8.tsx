import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  DirectComparisonWidget,
  ImproperDecisionTreeDiagram,
  InteriorAsymptoteTrapWidget,
  LimitComparisonRatioWidget,
  PIntegralInfinityWidget,
  PIntegralZeroWidget,
  SixImproperTypesDiagram,
  Type1LimitAreaWidget,
} from '../components/Widgets88';
import type { Page } from './s1_1';

export const S8_8: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'I. típusú improprius integrálok: végtelen intervallumok',
    body: (
      <>
        <Story>
          <p>
            Az eddigi határozott integrálok két szigorú szabályt követeltek: az <M t="[a, b]" /> intervallum
            legyen <strong>véges</strong>, és az <M t="f(x)" /> függvény legyen <strong>korlátos</strong>.
            De a fizikában, valószínűségszámításban és mérnöki modellekben állandóan előkerülnek végtelenig
            futó területek (pl. normális eloszlás) és függőleges aszimptoták. Ezeket az{' '}
            <strong>improprius integrálok</strong> kezelik határérték segítségével!
          </p>
        </Story>

        <Def title="I. típusú improprius integrál (végtelen határ)">
          <ol style={{ margin: '4px 0 0 18px' }}>
            <li>
              Ha <M t="f" /> folytonos <M t="[a, \infty)" />-n:{' '}
              <M t="\displaystyle\int_a^{\infty} f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx" />.
            </li>
            <li>
              Ha <M t="f" /> folytonos <M t="(-\infty, b]" />-n:{' '}
              <M t="\displaystyle\int_{-\infty}^{b} f(x)\,dx = \lim_{a\to-\infty}\int_a^b f(x)\,dx" />.
            </li>
            <li>
              Ha <M t="f" /> folytonos <M t="(-\infty, \infty)" />-n:{' '}
              <M t="\displaystyle\int_{-\infty}^{\infty} f(x)\,dx = \int_{-\infty}^{c} f(x)\,dx + \int_c^{\infty} f(x)\,dx" />{' '}
              (tetszőleges <M t="c" />-re, és <strong>mindkét</strong> fél-integrálnak külön konvergensnek kell lennie!).
            </li>
          </ol>
          <p style={{ marginTop: 6 }}>
            Ha a határérték létezik és véges, az integrál <strong>konvergens</strong>; különben{' '}
            <strong>divergens</strong>.
          </p>
        </Def>

        <p>
          <strong>Thomas 2. példa:</strong> Számítsuk ki az <M t="\int_{-\infty}^{\infty} \frac{dx}{1+x^2}" />{' '}
          integrált (<M t="c=0" />-nál bontva):
        </p>
        <M block t="\int_{-\infty}^{0}\frac{dx}{1+x^2} + \int_0^{\infty}\frac{dx}{1+x^2} = \lim_{a\to-\infty}(0 - \operatorname{arctg} a) + \lim_{b\to\infty}(\operatorname{arctg} b - 0) = \frac{\pi}{2} + \frac{\pi}{2} = \mathbf{\pi}." />

        <Type1LimitAreaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Számítsd ki az <M t="\int_0^{\infty} e^{-3x}\,dx" /> improprius integrált!</>}
        >
          <p>
            <M t="\lim_{b\to\infty}\left[-\frac{1}{3}e^{-3x}\right]_0^b = \lim_{b\to\infty}\left(-\frac{1}{3}e^{-3b} + \frac{1}{3}\right) = \mathbf{\frac{1}{3}}" />{' '}
            (konvergens).
          </p>
        </Task>
        <Task
          n={2}
          q={<>Konvergens-e az <M t="\int_0^{\infty} \cos x\,dx" /> integrál?</>}
        >
          <p>
            <strong>Divergens:</strong> <M t="\lim_{b\to\infty}\int_0^b \cos x\,dx = \lim_{b\to\infty} \sin b" />,
            amely <M t="-1" /> és <M t="1" /> között oszcillál, nem tart semmilyen határértékhez!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A p-integrál végtelenben és Gábriel kürtje',
    body: (
      <>
        <Def title="Thomas 3. példa — A végtelenbeli p-skála">
          <M block t="\int_1^{\infty} \frac{dx}{x^p} = \begin{cases} \dfrac{1}{p-1} & \text{ha } p > 1 \text{ (konvergens),} \\[8pt] +\infty & \text{ha } p \le 1 \text{ (divergens).} \end{cases}" />
        </Def>

        <p>
          <strong>Miért pontosan <M t="p=1" /> a határ?</strong> Ha <M t="p\neq 1" />, akkor{' '}
          <M t="\int_1^b x^{-p}\,dx = \frac{1}{1-p}\left(\frac{1}{b^{p-1}} - 1\right)" />, ami{' '}
          <M t="p>1" />-nél <M t="\frac{1}{p-1}" />-hez tart, <M t="p<1" />-nél viszont <M t="b^{1-p}\to\infty" />.
          A határértéken, <M t="p=1" />-nél pedig <M t="\int_1^b \frac{dx}{x} = \ln b \to \infty" />!
        </p>

        <PIntegralInfinityWidget />

        <Story>
          <p>
            <strong>Gábriel kürtje (Torricelli-paradoxon):</strong> Forgassuk meg az <M t="y = \frac{1}{x}" />{' '}
            (<M t="x\ge 1" />) görbét az <M t="x" />-tengely körül! A térfogata{' '}
            <M t="V = \pi\int_1^{\infty}\frac{dx}{x^2} = \pi" /> (<strong>véges</strong> — egyetlen bögre festék
            megtölti!), de a felszíne <M t="A = 2\pi\int_1^{\infty}\frac{\sqrt{1+x^{-4}}}{x}\,dx \ge 2\pi\int_1^{\infty}\frac{dx}{x} = \infty" />{' '}
            (<strong>végtelen</strong> — kívülről nem lehetne kifesteni egyetlen rétegben sem!).
          </p>
        </Story>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>A <M t="p" />-skála segítségével mondd meg azonnal, konvergens-e, és ha igen, mennyi: (a) <M t="\int_1^\infty \frac{dx}{x^3}" />, (b) <M t="\int_1^\infty \frac{dx}{\sqrt{x}}" />, (c) <M t="\int_1^\infty \frac{dx}{x^{1{,}01}}" />!</>}
        >
          <p>
            (a) <M t="p=3>1" /> → konvergens, <M t="\frac{1}{2}" />. (b) <M t="p=0{,}5\le 1" /> → <strong>divergens</strong>.
            (c) <M t="p=1{,}01>1" /> → konvergens, <M t="\frac{1}{0{,}01} = 100" />!
          </p>
        </Task>
        <Task
          n={4}
          q={<>Számítsd ki az <M t="\int_2^{\infty} \frac{dx}{x(\ln x)^2}" /> integrált!</>}
        >
          <p>
            <M t="u = \ln x,\; du = \frac{dx}{x}" />, határok <M t="\ln 2 \to \infty" />:{' '}
            <M t="\int_{\ln 2}^{\infty} \frac{du}{u^2} = \left[-\frac{1}{u}\right]_{\ln 2}^{\infty} = \mathbf{\frac{1}{\ln 2}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'II. típusú improprius integrálok: függőleges aszimptoták',
    body: (
      <>
        <p>
          Az improprius integrálok másik nagy családja az, amikor az intervallum <em>véges</em>, de a függvény
          valahol <strong>végtelenbe szökik</strong> (függőleges aszimptotája van). Ilyenkor egy apró{' '}
          <M t="c" /> távolsággal visszalépünk az aszimptotától, integrálunk, majd határértéket veszünk!
        </p>

        <Def title="II. típusú improprius integrál és a 0-beli p-skála">
          <p>
            Ha <M t="f" /> folytonos <M t="(a, b]" />-n, de <M t="a^+" />-nál nem korlátos:{' '}
            <M t="\displaystyle\int_a^b f(x)\,dx = \lim_{c\to a^+}\int_c^b f(x)\,dx" />.
          </p>
          <M block t="\int_0^1 \frac{dx}{x^p} = \begin{cases} \dfrac{1}{1-p} & \text{ha } p < 1 \text{ (konvergens),} \\[8pt] +\infty & \text{ha } p \ge 1 \text{ (divergens).} \end{cases}" />
        </Def>

        <p>
          Figyeld meg a <strong>tükörszimmetriát</strong>: végtelenben <M t="p > 1" /> kell a konvergenciához,
          <M t="0" />-ban pedig <M t="p < 1" />! A <M t="p=1" /> (<M t="\frac{1}{x}" />) az egyetlen kitevő,
          amely <strong>mindkét</strong> végén divergens!
        </p>

        <PIntegralZeroWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Számítsd ki az <M t="\int_0^1 \frac{dx}{\sqrt{1-x}}" /> improprius integrált!</>}
        >
          <p>
            Az aszimptota <M t="x=1^-" />-nél van:{' '}
            <M t="\lim_{c\to 1^-}\left[-2\sqrt{1-x}\right]_0^c = \lim_{c\to 1^-}(-2\sqrt{1-c} + 2) = \mathbf{2}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Számítsd ki az <M t="\int_0^1 \ln x\,dx" /> improprius integrált! (Segítség: <M t="\lim_{c\to 0^+} c\ln c = 0" />.)</>}
        >
          <p>
            <M t="\lim_{c\to 0^+}\big[x\ln x - x\big]_c^1 = (0 - 1) - \lim_{c\to 0^+}(c\ln c - c) = \mathbf{-1}" />{' '}
            (konvergens!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A belső aszimptota csapdája',
    body: (
      <>
        <Warn>
          <strong>Az egész 8. fejezet legveszélyesebb vizsgacsapdája:</strong> ha egy integrálban az intervallum{' '}
          <em>belsejében</em> van szakadás (pl. <M t="\int_{-1}^1 \frac{dx}{x^2}" />), és elfelejted észrevenni,
          a vakon alkalmazott Newton–Leibniz-tétel <strong>teljesen hamis, véges számot</strong> ad!
        </Warn>

        <p>
          <strong>Helyes eljárás belső <M t="c\in(a,b)" /> aszimptotánál:</strong> mindig vágd ketté az integrált:{' '}
          <M t="\int_a^b f = \int_a^c f + \int_c^b f" />. Az egész integrál csak akkor konvergens, ha{' '}
          <strong>mindkét</strong> fél külön-külön véges!
        </p>

        <p>
          <strong>Thomas 5. példa:</strong> Az <M t="\int_0^3 \frac{dx}{(x-1)^{2/3}}" /> integrálnak{' '}
          <M t="x=1" />-nél van aszimptotája. Kettévágva:
        </p>
        <M block t="\lim_{b\to 1^-}\big[3(x-1)^{1/3}\big]_0^b + \lim_{c\to 1^+}\big[3(x-1)^{1/3}\big]_c^3 = (0 - (-3)) + (3\sqrt[3]{2} - 0) = \mathbf{3 + 3\sqrt[3]{2}}." />

        <InteriorAsymptoteTrapWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Konvergens vagy divergens az <M t="\int_{-2}^2 \frac{dx}{x}" /> integrál? Miért nem 0 (a páratlanság ellenére)?</>}
        >
          <p>
            <strong>Divergens!</strong> <M t="x=0" />-nál kettévágva <M t="\int_0^2 \frac{dx}{x} = +\infty" />,
            és mivel a jobb fél divergens, az egész integrál is divergens (a <M t="-\infty + \infty" /> nem értelmezett!).
          </p>
        </Task>
        <Task
          n={8}
          q={<>Számítsd ki az <M t="\int_0^4 \frac{dx}{\sqrt{|x-1|}}" /> improprius integrált!</>}
        >
          <p>
            <M t="x=1" />-nél vágjuk ketté: <M t="\int_0^1 \frac{dx}{\sqrt{1-x}} + \int_1^4 \frac{dx}{\sqrt{x-1}} = 2 + 2\sqrt{3}" />{' '}
            (mindkét fél konvergens!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Direkt összehasonlító kritérium',
    body: (
      <>
        <p>
          A 8.6-ban láttuk, hogy az <M t="\int_1^{\infty} e^{-x^2}\,dx" /> integrálnak nincs elemi primitív
          függvénye — tehát nem tudjuk kiszámolni <M t="F(b)-F(1)" />-et. Mégis hogyan bizonyítjuk be, hogy a
          görbe alatti terület <strong>véges</strong>? Egy ismert, egyszerűbb függvénnyel való{' '}
          <strong>összehasonlítással</strong>!
        </p>

        <Def title="1. tétel — Direkt összehasonlító kritérium">
          <p>
            Ha <M t="f" /> és <M t="g" /> folytonosak <M t="[a, \infty)" />-n, és minden <M t="x\ge a" />-ra{' '}
            <M t="0 \le f(x) \le g(x)" />, akkor:
          </p>
          <ol style={{ margin: '4px 0 0 18px' }}>
            <li>
              Ha <M t="\int_a^\infty g(x)\,dx" /> <strong>konvergens</strong>, akkor a kisebb{' '}
              <M t="\int_a^\infty f(x)\,dx" /> is <strong>konvergens</strong>.
            </li>
            <li>
              Ha <M t="\int_a^\infty f(x)\,dx" /> <strong>divergens</strong>, akkor a nagyobb{' '}
              <M t="\int_a^\infty g(x)\,dx" /> is <strong>divergens</strong>.
            </li>
          </ol>
        </Def>

        <DirectComparisonWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>A direkt összehasonlító kritériummal igazold, hogy az <M t="\int_1^{\infty} \frac{\cos^2 x}{x^3}\,dx" /> integrál konvergens!</>}
        >
          <p>
            Minden <M t="x\ge 1" />-re <M t="0 \le \frac{\cos^2 x}{x^3} \le \frac{1}{x^3}" />, és{' '}
            <M t="\int_1^{\infty} \frac{dx}{x^3}" /> konvergens (<M t="p=3>1" />), így a kisebb is konvergens!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Igazold, hogy az <M t="\int_2^{\infty} \frac{dx}{\ln x}" /> integrál divergens! (Segítség: <M t="\ln x < x" />.)</>}
        >
          <p>
            Mivel <M t="0 < \ln x < x" /> (<M t="x\ge 2" />), a reciprok megfordítja a jelet:{' '}
            <M t="\frac{1}{\ln x} > \frac{1}{x} > 0" />. Mivel <M t="\int_2^\infty \frac{dx}{x} = \infty" />, a
            nagyobb is <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Hányadosteszt (határérték-összehasonlítás)',
    body: (
      <>
        <p>
          Mi történik, ha az <M t="\int_2^{\infty} \frac{dx}{x^2 - 1}" /> integrált akarjuk vizsgálni? Intuitíve
          a nagy <M t="x" />-ekre olyan, mint <M t="\frac{1}{x^2}" /> (tehát konvergens), de{' '}
          <M t="\frac{1}{x^2-1} > \frac{1}{x^2}" /> — az egyenlőtlenség „rossz irányba” áll a direkt teszthez!
          Ezt oldja meg elegánsan a <strong>hányadosteszt</strong>.
        </p>

        <Def title="2. tétel — Hányadosteszt">
          <p>
            Ha <M t="f" /> és <M t="g" /> pozitív és folytonos <M t="[a, \infty)" />-n, és
          </p>
          <M block t="\lim_{x\to\infty}\frac{f(x)}{g(x)} = L, \qquad \text{ahol } 0 < L < \infty," />
          <p>
            akkor <M t="\int_a^\infty f(x)\,dx" /> és <M t="\int_a^\infty g(x)\,dx" />{' '}
            <strong>egyszerre konvergensek vagy egyszerre divergensek</strong>!
          </p>
        </Def>

        <p>
          <strong>Ökölszabály a <M t="g(x)" /> kiválasztásához:</strong> törteknél tartsd meg csak a számláló
          és a nevező <em>legmagasabb fokú</em> (domináns) tagját! Pl.{' '}
          <M t="\frac{3x+1}{\sqrt{x^5+4x+9}} \sim \frac{3x}{x^{5/2}} = \frac{3}{x^{3/2}}" /> → hasonlítsd{' '}
          <M t="\frac{1}{x^{3/2}}" />-hez (<M t="p=1{,}5>1" /> → konvergens!).
        </p>

        <LimitComparisonRatioWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Hányadosteszttel döntsd el, konvergens-e az <M t="\int_2^{\infty} \frac{dx}{x^2-1}" /> integrál!</>}
        >
          <p>
            Hasonlítsuk <M t="g(x)=\frac{1}{x^2}" />-hez:{' '}
            <M t="\lim_{x\to\infty}\frac{1/(x^2-1)}{1/x^2} = \lim_{x\to\infty}\frac{x^2}{x^2-1} = 1 \in (0,\infty)" />.
            Mivel <M t="\int_2^\infty \frac{dx}{x^2}" /> konvergens, az eredeti is <strong>konvergens</strong>!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Hányadosteszttel döntsd el: <M t="\int_1^{\infty} \frac{2x+1}{\sqrt{x^4 + 5x}}\,dx" /> konvergens vagy divergens?</>}
        >
          <p>
            Domináns viselkedés: <M t="\frac{2x}{x^2} = \frac{2}{x}" />. Hasonlítsuk <M t="g(x)=\frac{1}{x}" />-hez:
            a hányados határértéke <M t="L = 2 \in (0,\infty)" />. Mivel <M t="\int_1^\infty \frac{dx}{x}" /> divergens,
            ez is <strong>divergens</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Mind a 6 improprius típus és vegyes esetek',
    body: (
      <>
        <p>
          Egyetlen integrálban egyszerre is jelen lehet az I. és a II. típusú improprius viselkedés! Nézzük az{' '}
          <M t="\int_0^{\infty} \frac{dx}{\sqrt{x}(1+x)}" /> integrált: <M t="x=0" />-nál függőleges aszimptotája
          van (II. típus), a felső határa pedig <M t="+\infty" /> (I. típus).
        </p>

        <p>
          <strong>Megoldás kettévágással (<M t="c=1" />):</strong>
        </p>
        <M block t="\int_0^{\infty} \frac{dx}{\sqrt{x}(1+x)} = \int_0^1 \frac{dx}{\sqrt{x}(1+x)} + \int_1^{\infty} \frac{dx}{\sqrt{x}(1+x)}." />
        <p>
          Az első darabnál <M t="\frac{1}{\sqrt{x}(1+x)} \le \frac{1}{\sqrt{x}}" /> (<M t="p=1/2 < 1" /> → konvergens),
          a másodiknál <M t="\frac{1}{\sqrt{x}(1+x)} \le \frac{1}{x^{3/2}}" /> (<M t="p=3/2 > 1" /> → konvergens).
          Sőt, az <M t="u=\sqrt{x}" /> helyettesítéssel a pontos értéke is kijön:{' '}
          <M t="2\big[\operatorname{arctg}\sqrt{x}\big]_0^\infty = 2\cdot\frac{\pi}{2} = \mathbf{\pi}" />!
        </p>

        <SixImproperTypesDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Vizsgáld az <M t="\int_0^{\infty} \frac{dx}{x^2}" /> integrált! Konvergens-e bármelyik fele?</>}
        >
          <p>
            <M t="\int_0^1 \frac{dx}{x^2} + \int_1^\infty \frac{dx}{x^2}" />: a jobb fél konvergens (<M t="=1" />),
            de a bal fél <strong>divergens</strong> (<M t="p=2\ge 1" /> nullában!), így az egész integrál{' '}
            <strong>divergens</strong>!
          </p>
        </Task>
        <Task
          n={14}
          q={<>A híres <strong>Gamma-függvény</strong> <M t="\Gamma(n) = \int_0^{\infty} x^{n-1}e^{-x}\,dx" />. Számítsd ki <M t="\Gamma(1)" />-et és <M t="\Gamma(2)" />-t!</>}
        >
          <p>
            <M t="\Gamma(1) = \int_0^\infty e^{-x}\,dx = \mathbf{1}" />. Parciális integrálással{' '}
            <M t="\Gamma(2) = \int_0^\infty x e^{-x}\,dx = \big[-xe^{-x}\big]_0^\infty + \int_0^\infty e^{-x}\,dx = 0 + 1 = \mathbf{1}" />{' '}
            (általában <M t="\Gamma(n) = (n-1)!" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok (8. fejezet vége!)',
    body: (
      <>
        <ImproperDecisionTreeDiagram />

        <Def title="8.8 Puskakártya — Minden, ami a vizsgára kell">
          <ul>
            <li>
              <strong>Végtelenbeli <M t="p" />-skála:</strong> <M t="\int_1^\infty \frac{dx}{x^p}" /> konvergens{' '}
              <M t="\iff p > 1" /> (értéke <M t="\frac{1}{p-1}" />).
            </li>
            <li>
              <strong>Nullabeli <M t="p" />-skála:</strong> <M t="\int_0^1 \frac{dx}{x^p}" /> konvergens{' '}
              <M t="\iff p < 1" /> (értéke <M t="\frac{1}{1-p}" />).
            </li>
            <li>
              <strong>Direkt teszt (<M t="0\le f\le g" />):</strong> nagyobb konvergens ⇒ kisebb is; kisebb
              divergens ⇒ nagyobb is.
            </li>
            <li>
              <strong>Hányadosteszt:</strong> <M t="\lim_{x\to\infty}\frac{f(x)}{g(x)} = L \in (0,\infty)" /> ⇒
              azonos konvergencia-viselkedés.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 8.8-ban:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Belső aszimptota figyelmen kívül hagyása (pl. <M t="\int_{-1}^1 x^{-2}\,dx = -2" /> hiba!).</li>
            <li>A két <M t="p" />-skála felcserélése (<M t="\infty" />-nél <M t="p>1" />, <M t="0" />-nál <M t="p<1" />!).</li>
            <li>Szimmetrikus határérték (<M t="\lim_{R\to\infty}\int_{-R}^R x\,dx = 0" />) használata kétoldali integrálra — tilos, külön-külön kell!</li>
            <li>Direkt összehasonlítás rossz irányú egyenlőtlenséggel (pl. „kisebb a divergensnél” → nem bizonyít semmit!).</li>
            <li>Azt hinni, hogy a hányadostesztben <M t="L=1" /> esetén a két integrál <em>értéke</em> is egyenlő (nem!).</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki az <M t="\int_1^{\infty} \frac{dx}{x^4}" /> integrált!</>}
        >
          <p>
            <M t="p=4>1" />: <M t="\frac{1}{4-1} = \mathbf{\frac{1}{3}}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számítsd ki az <M t="\int_0^8 \frac{dx}{\sqrt[3]{x}}" /> improprius integrált!</>}
        >
          <p>
            <M t="\lim_{c\to 0^+}\left[\frac{3}{2}x^{2/3}\right]_c^8 = \frac{3}{2}\cdot 4 - 0 = \mathbf{6}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Számítsd ki az <M t="\int_{-\infty}^0 e^{2x}\,dx" /> improprius integrált!</>}
        >
          <p>
            <M t="\lim_{a\to-\infty}\left[\frac{1}{2}e^{2x}\right]_a^0 = \frac{1}{2} - 0 = \mathbf{\frac{1}{2}}" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Számítsd ki az <M t="\int_1^{\infty} \frac{\ln x}{x^2}\,dx" /> integrált parciális integrálással és L’Hospital-szabállyal!</>}
        >
          <p>
            Primitív (<M t="u=\ln x,\; dv=x^{-2}dx" />): <M t="-\frac{\ln x + 1}{x}" />. Mivel{' '}
            <M t="\lim_{b\to\infty}\frac{\ln b}{b}=0" />, az eredmény <M t="0 - (-1) = \mathbf{1}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={<>Számítsd ki az <M t="\int_0^1 \frac{dx}{\sqrt{1-x^2}}" /> integrált!</>}
        >
          <p>
            Aszimptota <M t="x=1^-" />-nél: <M t="\lim_{c\to 1^-}\big[\arcsin x\big]_0^c = \mathbf{\frac{\pi}{2}}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={<>Hányadosteszttel döntsd el, konvergens-e az <M t="\int_1^{\infty} \frac{x+2}{x^3+5x+1}\,dx" /> integrál!</>}
        >
          <p>
            Hasonlítsuk <M t="g(x)=\frac{1}{x^2}" />-hez: <M t="\lim_{x\to\infty}\frac{(x+2)x^2}{x^3+5x+1} = 1 \in (0,\infty)" />.
            Mivel <M t="\int_1^\infty \frac{dx}{x^2}" /> konvergens, ez is <strong>konvergens</strong>!
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Milyen <M t="p" /> valós értékekre konvergens az <M t="\int_e^{\infty} \frac{dx}{x(\ln x)^p}" /> integrál?</>}
        >
          <p>
            Az <M t="u = \ln x" /> helyettesítés az <M t="\int_1^{\infty} \frac{du}{u^p}" /> integrálra viszi,
            így pontosan <strong><M t="p > 1" /></strong> esetén konvergens (értéke <M t="\frac{1}{p-1}" />)!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Számítsd ki az <M t="\int_0^{\infty} e^{-sx}\,dx" /> Laplace-transzformáltat, és add meg, milyen <M t="s" /> paraméterekre konvergens!</>}
        >
          <p>
            Ha <M t="s > 0" />, akkor <M t="\lim_{b\to\infty}\left[-\frac{1}{s}e^{-sx}\right]_0^b = \mathbf{\frac{1}{s}}" />{' '}
            (konvergens). Ha <M t="s \le 0" />, akkor <M t="e^{-sx}\ge 1" />, így <strong>divergens</strong>.
          </p>
        </Task>
        <Task
          n={23}
          q={<>Döntsd el, konvergens-e az <M t="\int_0^{\infty} \frac{dx}{x^2 + \sqrt{x}}" /> vegyes improprius integrál!</>}
        >
          <p>
            Vágjuk ketté <M t="x=1" />-nél! (1) <M t="[0,1]" />-en <M t="\frac{1}{x^2+\sqrt{x}} \le \frac{1}{\sqrt{x}}" />,
            ami <M t="p=1/2<1" /> miatt konvergens. (2) <M t="[1,\infty)" />-n{' '}
            <M t="\frac{1}{x^2+\sqrt{x}} \le \frac{1}{x^2}" />, ami <M t="p=2>1" /> miatt konvergens. Mindkét
            fél véges ⇒ az egész integrál <strong>konvergens</strong>!
          </p>
        </Task>
      </>
    ),
  },
];
