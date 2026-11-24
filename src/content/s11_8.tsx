import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ExpMaclaurinWidget,
  FlatFunctionWarningWidget,
  HyperbolicMaclaurinWidget,
  MaclaurinCheatSheetDiagram,
  NonZeroCenterWidget,
  OsculatingPolynomialWidget,
  TaylorMatchingWidget,
  TrigDerivativeCycleWidget,
} from '../components/Widgets118';
import type { Page } from './s1_1';

export const S11_8: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Honnan jönnek az együtthatók? Taylor- és Maclaurin-sor',
    body: (
      <>
        <Story>
          <p>
            A 11.7-ben ügyes trükkökkel (mértani sor deriválásával és integrálásával) gyártottunk hatványsorokat. De mi
            a helyzet egy tetszőleges, végtelen sokszor differenciálható függvénnyel, például <M t="e^x" />-szel vagy{' '}
            <M t="\sin x" />-szel? Brook Taylor (1715) és Colin Maclaurin megmutatta: ha egy függvénynek létezik
            hatványsora, annak együtthatóit <strong>egyértelműen meghatározzák a középpontbeli deriváltak</strong>!
          </p>
        </Story>

        <p>
          Tegyük fel, hogy <M t="f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n" /> az <M t="(a - R, a + R)" /> intervallumon.
          Behelyettesítve <M t="x = a" />-t kapjuk <M t="c_0 = f(a)" />. Tagonként deriválva (19. tétel), majd újra{' '}
          <M t="x = a" />-t írva:
          <M block t="f'(a) = c_1,\qquad f''(a) = 2!\,c_2,\qquad f'''(a) = 3!\,c_3,\qquad \dots,\qquad f^{(n)}(a) = n!\,c_n." />
          Innen egyetlen osztással adódik az univerzális képlet: <M t="c_n = \dfrac{f^{(n)}(a)}{n!}" />!
        </p>

        <Def title="Taylor-sor és Maclaurin-sor definíciója">
          <p>
            Ha az <M t="f" /> függvény az <M t="x = a" /> pontban minden rendben differenciálható, akkor az{' '}
            <M t="f" /> által generált <strong><M t="x = a" /> körüli Taylor-sor</strong>:
            <M block t="\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \cdots" />
            A speciális <M t="a = 0" /> esetet <strong>Maclaurin-sornak</strong> nevezzük:
            <M block t="\sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots" />
          </p>
        </Def>

        <TaylorMatchingWidget />

        <Task n={1} q={<>Egy <M t="f" /> függvényre <M t="f(2) = 5" />, <M t="f'(2) = -3" />, <M t="f''(2) = 8" /> és <M t="f'''(2) = -12" />. Írd fel az <M t="x = 2" /> körüli Taylor-sorának első 4 tagját!</>}>
          <p>
            A <M t="c_n = f^{(n)}(2)/n!" /> képlettel:
            <M block t="5 - 3(x-2) + \frac{8}{2!}(x-2)^2 - \frac{12}{3!}(x-2)^3 = 5 - 3(x-2) + 4(x-2)^2 - 2(x-2)^3." />
          </p>
        </Task>

        <Task n={2} q={<>Ha egy <M t="f" /> függvény Maclaurin-sora <M t="\sum_{n=0}^\infty \frac{3^n}{n+1} x^n" />, mennyi <M t="f^{(4)}(0)" />?</>}>
          <p>
            Az <M t="x^4" /> együtthatója egyrészt <M t="\frac{f^{(4)}(0)}{4!}" />, másrészt <M t="\frac{3^4}{4+1} = \frac{81}{5}" />.
            Így <M t="f^{(4)}(0) = 24 \cdot \frac{81}{5} = \frac{1944}{5}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Taylor-polinomok és a legjobb lokális közelítés',
    body: (
      <>
        <p>
          Ha a Taylor-sort az <M t="n" />-edfokú tagnál elvágjuk, megkapjuk az <M t="n" />-edrendű{' '}
          <strong>Taylor-polinomot</strong>:
          <M block t="P_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k." />
          Ez közvetlenül általánosítja a 3.8. szakaszból ismert <strong>linearizációt</strong>:
        </p>
        <ul>
          <li><M t="P_0(x) = f(a)" /> — állandó közelítés (csak a függvényérték egyezik meg).</li>
          <li><M t="P_1(x) = f(a) + f'(a)(x-a)" /> — az <strong>érintőegyenes</strong> (érték és meredekség egyezik).</li>
          <li><M t="P_2(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2}(x-a)^2" /> — <strong>kvadratikus közelítés</strong> (már a görbület is egyezik!).</li>
        </ul>

        <OsculatingPolynomialWidget />

        <Quiz
          q={<>Melyik tulajdonság jellemzi pontosan az <M t="f" /> függvény <M t="x = a" /> körüli <M t="n" />-edrendű <M t="P_n(x)" /> Taylor-polinomját?</>}
          options={[
            { label: <>Az <M t="x = a" /> pontban értéke és első <M t="n" /> deriváltja megegyezik <M t="f" />-ével</>, ok: true },
            { label: <>Minden <M t="x \in \mathbb{R}" />-re pontosan megegyezik <M t="f(x)" />-szel</> },
            { label: <>Az <M t="(a-1, a+1)" /> intervallumon minimális az integrálja</> },
            { label: <>Csak páratlan hatványokat tartalmazhat</> },
          ]}
          explain={
            <>
              A Taylor-polinom definíciója szerint <M t="P_n^{(k)}(a) = f^{(k)}(a)" /> minden <M t="k = 0, 1, \dots, n" />{' '}
              esetén — ezért ez a legjobb lokális polinomközelítés az <M t="a" /> környezetében.
            </>
          }
        />

        <Task n={3} q={<>Határozd meg a <M t="f(x) = \sqrt{1 + x}" /> függvény <M t="P_2(x)" /> kvadratikus Maclaurin-polinomját, és közelítsd vele <M t="\sqrt{1{,}1}" /> értékét!</>}>
          <p>
            <M t="f(0) = 1" />, <M t="f'(x) = \frac{1}{2}(1+x)^{-1/2} \implies f'(0) = \frac{1}{2}" />,{' '}
            <M t="f''(x) = -\frac{1}{4}(1+x)^{-3/2} \implies f''(0) = -\frac{1}{4}" />. Így:
            <M block t="P_2(x) = 1 + \frac{1}{2}x - \frac{1}{8}x^2." />
            Behelyettesítve <M t="x = 0{,}1" />-et: <M t="\sqrt{1{,}1} \approx 1 + 0{,}05 - 0{,}00125 = 1{,}04875" />{' '}
            (a pontos érték <M t="1{,}04881" />!).
          </p>
        </Task>

        <Task n={4} q={<>Add meg a <M t="f(x) = \sec x = \frac{1}{\cos x}" /> függvény <M t="P_2(x)" /> Maclaurin-polinomját!</>}>
          <p>
            <M t="f(0) = 1" />, <M t="f'(x) = \sec x \operatorname{tg} x \implies f'(0) = 0" />,{' '}
            <M t="f''(x) = \sec x(\operatorname{tg}^2 x + \sec^2 x) \implies f''(0) = 1" />. Tehát{' '}
            <M t="P_2(x) = 1 + \frac{1}{2}x^2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Az exponenciális sor és lépésenkénti Taylor-fejtés',
    body: (
      <>
        <p>
          Az <M t="f(x) = e^x" /> függvény minden deriváltja önmaga (<M t="f^{(n)}(x) = e^x" />), ezért{' '}
          <M t="f^{(n)}(0) = 1" /> minden <M t="n \ge 0" /> esetén. A Maclaurin-sora a kalkulus talán legszebb képlete:
          <M block t="e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots \qquad (x \in \mathbb{R})." />
        </p>

        <ExpMaclaurinWidget />

        <Steps
          title="Taylor-sor levezetése nem-nulla középpont körül"
          problem={<>Határozd meg a <M t="f(x) = \frac{1}{x}" /> függvény <M t="a = 2" /> körüli Taylor-sorát és konvergenciaintervallumát!</>}
          steps={[
            {
              title: 'Első néhány derivált kiszámítása',
              body: (
                <p>
                  <M t="f(x) = x^{-1}" />, <M t="f'(x) = -x^{-2}" />, <M t="f''(x) = 2x^{-3}" />,{' '}
                  <M t="f'''(x) = -6x^{-4}" />. Általában: <M t="f^{(n)}(x) = (-1)^n n!\, x^{-(n+1)}" />.
                </p>
              ),
            },
            {
              title: 'Kiértékelés az a = 2 középpontban',
              body: (
                <p>
                  Behelyettesítve <M t="x = 2" />-t: <M t="f^{(n)}(2) = \frac{(-1)^n n!}{2^{n+1}}" />.
                </p>
              ),
            },
            {
              title: 'Együtthatók és Taylor-sor felírása',
              body: (
                <p>
                  Az <M t="n!" /> kiejti egymást! <M t="c_n = \frac{f^{(n)}(2)}{n!} = \frac{(-1)^n}{2^{n+1}}" />, tehát:
                  <M block t="\frac{1}{x} = \sum_{n=0}^{\infty} \frac{(-1)^n}{2^{n+1}}(x - 2)^n = \frac{1}{2} - \frac{x-2}{4} + \frac{(x-2)^2}{8} - \cdots" />
                </p>
              ),
            },
            {
              title: 'Konvergenciaintervallum ellenőrzése',
              body: (
                <p>
                  Mértani sor <M t="r = -\frac{x-2}{2}" /> hányadossal: <M t="|r| < 1 \iff |x - 2| < 2 \iff x \in (0, 4)" />.
                  Az <M t="R = 2" /> sugár pontosan az <M t="x = 0" /> pólusig ér el!
                </p>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki a <M t="\sum_{n=0}^\infty \frac{(-1)^n}{n!}" /> és a <M t="\sum_{n=0}^\infty \frac{2^n}{n!}" /> sorok pontos összegét!</>}>
          <p>
            Az <M t="e^x = \sum_{n=0}^\infty \frac{x^n}{n!}" /> sorba <M t="x = -1" />-et, illetve <M t="x = 2" />-t
            írva azonnal kapjuk: <M t="e^{-1} = \frac{1}{e}" />, illetve <M t="e^2" />.
          </p>
        </Task>

        <Task n={6} q={<>Határozd meg a <M t="f(x) = e^x" /> függvény <M t="a = 1" /> körüli Taylor-sorát!</>}>
          <p>
            Mivel <M t="f^{(n)}(1) = e^1 = e" /> minden <M t="n" />-re:
            <M block t="e^x = \sum_{n=0}^{\infty} \frac{e}{n!}(x - 1)^n = e\left(1 + (x-1) + \frac{(x-1)^2}{2!} + \cdots\right)." />
            (Ugyanez kijön az <M t="e^x = e\cdot e^{x-1}" /> azonosságból is!)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A sin x és cos x Maclaurin-sora',
    body: (
      <>
        <p>
          A <M t="\sin x" /> és <M t="\cos x" /> deriváltjai <strong>4-es ciklussal</strong> ismétlődnek:{' '}
          <M t="\sin x \to \cos x \to -\sin x \to -\cos x \to \sin x" />. Az origóban (<M t="x = 0" />) a{' '}
          <M t="\sin 0 = 0" /> és <M t="\cos 0 = 1" /> miatt minden második tag eltűnik!
        </p>

        <Def title="A szinusz és koszinusz Maclaurin-sora">
          <p>
            Minden valós <M t="x \in \mathbb{R}" /> esetén (<M t="R = \infty" />):
            <M block t="\sin x = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots" />
            <M block t="\cos x = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots" />
          </p>
        </Def>

        <p>
          Figyeld meg a <strong>paritást</strong> és a <strong>deriválást</strong>: a páratlan <M t="\sin x" /> csak
          páratlan hatványokat, a páros <M t="\cos x" /> csak páros hatványokat tartalmaz — és ha tagonként deriválod a{' '}
          <M t="\sin x" /> sorát, pontosan a <M t="\cos x" /> sorát kapod vissza!
        </p>

        <TrigDerivativeCycleWidget />

        <Task n={7} q={<>Add meg a <M t="\sin x" /> sorából a <M t="\lim_{x\to 0} \frac{\sin x - x}{x^3}" /> határértéket L’Hôpital-szabály nélkül!</>}>
          <p>
            <M t="\sin x - x = -\frac{x^3}{6} + \frac{x^5}{120} - \cdots" />. Osztva <M t="x^3" />-nel:{' '}
            <M t="\frac{\sin x - x}{x^3} = -\frac{1}{6} + \frac{x^2}{120} - \cdots \to -\frac{1}{6}" />.
          </p>
        </Task>

        <Task n={8} q={<>Melyik függvény értéke a <M t="1 - \frac{\pi^2}{4\cdot 2!} + \frac{\pi^4}{16\cdot 4!} - \frac{\pi^6}{64\cdot 6!} + \cdots" /> sor?</>}>
          <p>
            Írjuk át <M t="\sum_{n=0}^\infty (-1)^n \frac{(\pi/2)^{2n}}{(2n)!}" /> alakra! Ez pontosan{' '}
            <M t="\cos(\pi/2) = 0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Taylor-sor tetszőleges a ≠ 0 pont körül és polinomok átírása',
    body: (
      <>
        <p>
          Sok fontos függvénynek (<M t="\ln x" />, <M t="\sqrt{x}" />, <M t="1/x" />) <strong>nincs Maclaurin-sora</strong>,
          mert <M t="x = 0" />-ban nem értelmezett vagy nem differenciálható. Ilyenkor egy kényelmes <M t="a \ne 0" />{' '}
          pont (pl. <M t="a = 1" />) körül fejtjük ki!
        </p>

        <NonZeroCenterWidget />

        <Def title="Polinomok Taylor-sora = egzakt átírás">
          <p>
            Ha <M t="f(x)" /> egy <M t="d" />-edfokú polinom, akkor minden <M t="n > d" /> esetén{' '}
            <M t="f^{(n)}(x) \equiv 0" />. Ezért a Taylor-sora <strong>véges</strong>, és pontosan megegyezik{' '}
            <M t="f(x)" />-szel minden <M t="x \in \mathbb{R}" />-re — egyszerűen átírja a polinomot{' '}
            <M t="(x - a)" /> hatványai szerint!
          </p>
        </Def>

        <Quiz
          q={<>Mi a <M t="f(x) = \ln x" /> függvény <M t="a = 1" /> körüli Taylor-sorának konvergenciasugara?</>}
          options={[
            { label: <M t="R = 0" /> },
            { label: <M t="R = 1" />, ok: true },
            { label: <M t="R = e" /> },
            { label: <M t="R = \infty" /> },
          ]}
          explain={
            <>
              <M t="\ln x = \sum_{n=1}^\infty (-1)^{n-1}\frac{(x-1)^n}{n}" />. A sugár <M t="R = 1" /> (az{' '}
              <M t="x=0" /> szingularitásig), a konvergenciaintervallum pedig <M t="(0, 2]" />.
            </>
          }
        />

        <Task n={9} q={<>Írd fel a <M t="f(x) = x^3 - 2x + 4" /> polinom Taylor-sorát az <M t="a = 2" /> pont körül!</>}>
          <p>
            <M t="f(2) = 8 - 4 + 4 = 8" />, <M t="f'(x) = 3x^2 - 2 \implies f'(2) = 10" />,{' '}
            <M t="f''(x) = 6x \implies f''(2) = 12" />, <M t="f'''(x) = 6 \implies f'''(2) = 6" />, a magasabb
            deriváltak 0-k. Tehát:
            <M block t="x^3 - 2x + 4 = 8 + 10(x-2) + 6(x-2)^2 + (x-2)^3." />
          </p>
        </Task>

        <Task n={10} q={<>Határozd meg a <M t="f(x) = \cos x" /> függvény <M t="a = \frac{\pi}{2}" /> körüli Taylor-sorát!</>}>
          <p>
            Használhatjuk a <M t="\cos x = -\sin(x - \tfrac{\pi}{2})" /> azonosságot (vagy a deriváltakat):
            <M block t="\cos x = -\sum_{n=0}^{\infty} (-1)^n \frac{(x - \pi/2)^{2n+1}}{(2n+1)!} = -\left(x-\frac{\pi}{2}\right) + \frac{(x-\pi/2)^3}{3!} - \cdots" />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Hiperbolikus sorok és gyors Maclaurin-gyártás',
    body: (
      <>
        <p>
          A <M t="\operatorname{ch} x = \frac{e^x + e^{-x}}{2}" /> és{' '}
          <M t="\operatorname{sh} x = \frac{e^x - e^{-x}}{2}" /> definíciókból azonnal megkapjuk a hiperbolikus
          függvények Maclaurin-sorát — az <M t="e^x" /> sorát egyszerűen szétválogatjuk páros és páratlan hatványokra:
          <M block t="\operatorname{ch} x = \sum_{n=0}^{\infty} \frac{x^{2n}}{(2n)!} = 1 + \frac{x^2}{2!} + \frac{x^4}{4!} + \cdots, \qquad \operatorname{sh} x = \sum_{n=0}^{\infty} \frac{x^{2n+1}}{(2n+1)!} = x + \frac{x^3}{3!} + \frac{x^5}{5!} + \cdots" />
        </p>

        <HyperbolicMaclaurinWidget />

        <p>
          <strong>Profi taktika:</strong> ha egy összetett függvény (pl. <M t="e^{-x^2}" />, <M t="x^2 \sin(3x)" />,{' '}
          <M t="\cos^2 x" />) Maclaurin-sorát keresed, <em>ne deriválj ötször</em> — használd az ismert alapsorokat
          helyettesítéssel és trigonometrikus azonosságokkal!
        </p>

        <Task n={11} q={<>Add meg a <M t="f(x) = e^{-x^2}" /> és a <M t="g(x) = x\sin(2x)" /> függvények Maclaurin-sorát!</>}>
          <p>
            Az <M t="e^u" /> sorba <M t="u = -x^2" />-et írva:{' '}
            <M t="e^{-x^2} = \sum_{n=0}^\infty \frac{(-1)^n x^{2n}}{n!} = 1 - x^2 + \frac{x^4}{2!} - \frac{x^6}{3!} + \cdots" />.
            A <M t="\sin u" /> sorba <M t="u = 2x" />-et írva és <M t="x" />-szel szorozva:{' '}
            <M t="x\sin(2x) = \sum_{n=0}^\infty (-1)^n \frac{2^{2n+1}}{(2n+1)!} x^{2n+2}" />.
          </p>
        </Task>

        <Task n={12} q={<>Határozd meg a <M t="f(x) = \cos^2 x" /> függvény Maclaurin-sorát a félszög-képlettel!</>}>
          <p>
            Mivel <M t="\cos^2 x = \frac{1 + \cos(2x)}{2}" />, az <M t="u = 2x" /> helyettesítéssel:
            <M block t="\cos^2 x = \frac{1}{2} + \frac{1}{2}\sum_{n=0}^\infty (-1)^n \frac{(2x)^{2n}}{(2n)!} = 1 + \sum_{n=1}^\infty (-1)^n \frac{2^{2n-1}}{(2n)!} x^{2n} = 1 - x^2 + \frac{x^4}{3} - \cdots" />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: 6 kanonikus sor és híd a 11.9-hez',
    body: (
      <>
        <MaclaurinCheatSheetDiagram />

        <p>
          Felmerül egy mély, döntő kérdés: ha egy függvény végtelen sokszor differenciálható, és felírjuk a
          Taylor-sorát, <strong>biztosan visszakonvergál-e az eredeti <M t="f(x)" /> függvényhez</strong>? A válasz:
          nem mindig! Íme Cauchy híres ellenpéldája, amely közvetlenül átvezet a 11.9. szakaszba (Taylor tétele):
        </p>

        <FlatFunctionWarningWidget />

        <Warn>
          Négy tipikus hiba Taylor- és Maclaurin-soroknál:
          <ol>
            <li>
              <strong>A <M t="n!" /> osztó elfelejtése:</strong> a képlet <M t="\frac{f^{(n)}(a)}{n!}(x-a)^n" />, nem{' '}
              <M t="f^{(n)}(a)(x-a)^n" />!
            </li>
            <li>
              <strong><M t="x" /> helyett <M t="(x-a)" /> kihagyása:</strong> ha <M t="a \ne 0" />, a hatványok{' '}
              <M t="(x-a)^n" /> alakúak, nem <M t="x^n" />!
            </li>
            <li>
              <strong>Láncszabály-faktor elhagyása deriváláskor:</strong> pl. <M t="\frac{d^n}{dx^n} e^{2x} = 2^n e^{2x}" />,
              nem <M t="e^{2x}" />.
            </li>
            <li>
              <strong>Felesleges többszörös deriválás:</strong> pl. <M t="e^{-x^2}" /> 6. deriváltja rémálom, míg
              helyettesítéssel 1 másodperc!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Mennyi a <M t="f(x) = e^{-x^2}" /> függvény hatodik deriváltja az origóban, azaz <M t="f^{(6)}(0)" />?</>}
          options={[
            { label: <M t="-1" /> },
            { label: <M t="-120" />, ok: true },
            { label: <M t="120" /> },
            { label: <M t="-720" /> },
          ]}
          explain={
            <>
              Az <M t="e^{-x^2} = 1 - x^2 + \frac{x^4}{2!} - \frac{x^6}{3!} + \cdots" /> sorban <M t="x^6" />{' '}
              együtthatója <M t="-\frac{1}{6}" />. Mivel ez egyenlő <M t="\frac{f^{(6)}(0)}{6!}" />-val, kapjuk:{' '}
              <M t="f^{(6)}(0) = -\frac{720}{6} = -120" />.
            </>
          }
        />

        <Task n={13} q={<>Határozd meg a <M t="f(x) = \frac{\sin x}{x}" /> (<M t="f(0) = 1" />) függvény Maclaurin-sorát!</>}>
          <p>
            A <M t="\sin x" /> sorát tagonként elosztva <M t="x" />-szel:
            <M block t="\frac{\sin x}{x} = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n+1)!} = 1 - \frac{x^2}{3!} + \frac{x^4}{5!} - \cdots \qquad (x \in \mathbb{R})." />
          </p>
        </Task>

        <Task n={14} q={<>Melyik nevezetes szám a <M t="\sum_{n=0}^\infty \frac{(-1)^n \pi^{2n+1}}{(2n+1)!}" /> sor összege?</>}>
          <p>
            Ez pontosan a <M t="\sin x" /> Maclaurin-sora <M t="x = \pi" /> helyen, tehát összege <M t="\sin \pi = 0" />.
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

        <Task n={15} q={<>Írd fel a <M t="f(x) = e^{3x}" /> függvény Maclaurin-sorát és első négy tagját!</>}>
          <p>
            <M t="u = 3x" /> helyettesítéssel:{' '}
            <M t="e^{3x} = \sum_{n=0}^\infty \frac{3^n x^n}{n!} = 1 + 3x + \frac{9}{2}x^2 + \frac{9}{2}x^3 + \cdots" />.
          </p>
        </Task>

        <Task n={16} q={<>Add meg a <M t="f(x) = \sin(2x)" /> függvény <M t="P_5(x)" /> Maclaurin-polinomját!</>}>
          <p>
            <M t="P_5(x) = (2x) - \frac{(2x)^3}{3!} + \frac{(2x)^5}{5!} = 2x - \frac{4}{3}x^3 + \frac{4}{15}x^5" />.
          </p>
        </Task>

        <Task n={17} q={<>Írd fel a <M t="f(x) = 2x^2 - 5x + 1" /> polinom Taylor-sorát az <M t="a = 1" /> pont körül!</>}>
          <p>
            <M t="f(1) = -2" />, <M t="f'(1) = -1" />, <M t="f''(1) = 4" />. Így:{' '}
            <M t="2x^2 - 5x + 1 = -2 - (x-1) + 2(x-1)^2" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Határozd meg a <M t="f(x) = \sqrt{x}" /> függvény <M t="a = 4" /> körüli <M t="P_2(x)" /> Taylor-polinomját, és közelítsd vele <M t="\sqrt{4{,}2}" />-t!</>}>
          <p>
            <M t="f(4) = 2" />, <M t="f'(4) = \frac{1}{2\sqrt{4}} = \frac{1}{4}" />,{' '}
            <M t="f''(4) = -\frac{1}{4\cdot 4^{3/2}} = -\frac{1}{32}" />. Így:
            <M block t="P_2(x) = 2 + \frac{1}{4}(x-4) - \frac{1}{64}(x-4)^2." />
            <M t="x = 4{,}2" />-nél: <M t="2 + 0{,}05 - 0{,}000625 = 2{,}049375" /> (pontos érték: <M t="2{,}049390" />).
          </p>
        </Task>

        <Task n={19} q={<>Írd fel a <M t="f(x) = \ln(x)" /> függvény <M t="a = 2" /> körüli Taylor-sorát és konvergenciasugarát!</>}>
          <p>
            <M t="\ln x = \ln(2 + (x-2)) = \ln 2 + \ln\!\left(1 + \frac{x-2}{2}\right) = \ln 2 + \sum_{n=1}^\infty (-1)^{n-1}\frac{(x-2)^n}{n\cdot 2^n}" />.
            A konvergenciasugár <M t="R = 2" />, az intervallum <M t="(0, 4]" />.
          </p>
        </Task>

        <Task n={20} q={<>Add meg a <M t="f(x) = \sin^2 x" /> függvény Maclaurin-sorát!</>}>
          <p>
            <M t="\sin^2 x = \frac{1 - \cos(2x)}{2} = \frac{1}{2}\sum_{n=1}^\infty (-1)^{n-1}\frac{(2x)^{2n}}{(2n)!} = \sum_{n=1}^\infty (-1)^{n-1}\frac{2^{2n-1}}{(2n)!} x^{2n} = x^2 - \frac{x^4}{3} + \frac{2x^6}{45} - \cdots" />
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Határozd meg a <M t="f(x) = \frac{1}{(1+x)^2}" /> függvény <M t="a = 0" /> körüli Maclaurin-sorát, és add meg belőle <M t="f^{(10)}(0)" /> értékét!</>}>
          <p>
            A <M t="\frac{1}{1+x} = \sum_{n=0}^\infty (-1)^n x^n" /> sort deriválva:{' '}
            <M t="-\frac{1}{(1+x)^2} = \sum_{n=1}^\infty (-1)^n n x^{n-1}" />, innen{' '}
            <M t="\frac{1}{(1+x)^2} = \sum_{k=0}^\infty (-1)^k (k+1) x^k" />. Az <M t="x^{10}" /> együtthatója{' '}
            <M t="c_{10} = (-1)^{10}\cdot 11 = 11 = \frac{f^{(10)}(0)}{10!}" />, tehát{' '}
            <M t="f^{(10)}(0) = 11 \cdot 10! = 11!" />.
          </p>
        </Task>

        <Task n={22} q={<>Add meg a <M t="f(x) = e^x \cos x" /> függvény Maclaurin-sorának első négy nem-nulla tagját Cauchy-szorzattal!</>}>
          <p>
            Szorozzuk össze a két sort <M t="x^4" />-ig:
            <M block t="\left(1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \frac{x^4}{24} + \cdots\right)\left(1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots\right)" />
            <M block t="= 1 + x + \left(\frac{1}{2}-\frac{1}{2}\right)x^2 + \left(\frac{1}{6}-\frac{1}{2}\right)x^3 + \left(\frac{1}{24}-\frac{1}{4}+\frac{1}{24}\right)x^4 + \cdots = 1 + x - \frac{1}{3}x^3 - \frac{1}{6}x^4 + \cdots" />
            (Megjegyzés: az <M t="x^2" /> tag kiesik!)
          </p>
        </Task>

        <Task n={23} q={<>Igazold a Maclaurin-sorok segítségével (formálisan), hogy az <M t="e^{ix} = \cos x + i\sin x" /> Euler-formula teljesül (<M t="i^2 = -1" />)!</>}>
          <p>
            Írjuk be <M t="ix" />-et az <M t="e^u = \sum \frac{u^n}{n!}" /> sorba, használva <M t="i^2=-1, i^3=-i, i^4=1" />:
            <M block t="e^{ix} = 1 + ix - \frac{x^2}{2!} - i\frac{x^3}{3!} + \frac{x^4}{4!} + i\frac{x^5}{5!} - \cdots = \left(1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots\right) + i\left(x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots\right) = \cos x + i\sin x." />
            Innen <M t="x = \pi" />-re kapjuk a matematika leghíresebb azonosságát: <M t="e^{i\pi} + 1 = 0" />!
          </p>
        </Task>
      </>
    ),
  },
];
