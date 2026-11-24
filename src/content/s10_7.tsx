import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CardioidArcLengthWidget,
  CardioidAreaWidget,
  PolarArcElementDiagram,
  PolarBetweenCurvesWidget,
  PolarIntegralsSummaryDiagram,
  PolarSectorRiemannWidget,
  PolarSurfaceRevolutionWidget,
  RoseAndLoopAreaWidget,
} from '../components/Widgets107';
import type { Page } from './s1_1';

export const S10_7: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Poláris terület: téglalapok helyett körszektorok',
    body: (
      <>
        <Story>
          <p>
            A Descartes-rendszerben a görbe alatti területet vékony, függőleges téglalapokra szeleteltük. Egy polárgörbét
            (mint a kardioid vagy a rózsagörbe) viszont sokkal természetesebb a pólusból kiinduló, legyezőszerű{' '}
            <strong>körszektorokra</strong> bontani — mintha egy tortát vágnánk nagyon vékony szeletekre!
          </p>
        </Story>

        <Def title="Poláris tartomány területe">
          <p>
            Ha <M t="r = f(\theta)" /> folytonos és nem vált előjelet (vagy egyszer járja be a tartományt) a{' '}
            <M t="\alpha \le \theta \le \beta" /> (<M t="0 < \beta - \alpha \le 2\pi" />) intervallumon, akkor a
            pólus, a <M t="\theta = \alpha" /> és <M t="\theta = \beta" /> félegyenesek, valamint a görbe által
            határolt tartomány területe:
          </p>
          <M block t="A = \int_\alpha^\beta \frac{1}{2}r^2\,d\theta = \int_\alpha^\beta \frac{1}{2}\big(f(\theta)\big)^2\,d\theta." />
        </Def>

        <PolarSectorRiemannWidget />

        <p>
          <em>Gyors próba körön:</em> ha <M t="r = R" /> állandó a <M t="[0;\,2\pi]" /> intervallumon, akkor{' '}
          <M t="A = \int_0^{2\pi} \tfrac{1}{2}R^2\,d\theta = \tfrac{1}{2}R^2 \cdot 2\pi = \pi R^2" /> — pontosan a kör
          területe!
        </p>

        <Quiz
          q={<>Melyik integrál adja meg az <M t="r = 3\cos\theta" /> kör <strong>teljes</strong> területét?</>}
          options={[
            { label: <M t="\tfrac{1}{2}\int_0^{2\pi} 9\cos^2\theta\,d\theta" /> },
            { label: <M t="\tfrac{1}{2}\int_0^{\pi} 9\cos^2\theta\,d\theta" />, ok: true },
            { label: <M t="\int_0^{\pi} 3\cos\theta\,d\theta" /> },
            { label: <M t="\tfrac{1}{2}\int_0^{\pi/2} 9\cos^2\theta\,d\theta" /> },
          ]}
          explain={
            <>
              Az <M t="r = 3\cos\theta" /> kör már <M t="[0;\,\pi]" />-n (vagy <M t="[-\tfrac{\pi}{2};\,\tfrac{\pi}{2}]" />-n)
              <strong>egyszer</strong> bezárul, és területe <M t="\tfrac{9\pi}{4}" /> (<M t="R = 1{,}5" />). Ha{' '}
              <M t="0" />-tól <M t="2\pi" />-ig integrálnál, a <em>kétszeresét</em> kapnád!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Számítsd ki az <M t="r = \sqrt{\theta}" /> spirál <M t="0 \le \theta \le 2\pi" /> szakasza által kisöpört területet!</>}>
          <p>
            <M t="A = \dfrac{1}{2}\int_0^{2\pi} \theta\,d\theta = \dfrac{1}{2}\left[\dfrac{\theta^2}{2}\right]_0^{2\pi} = \pi^2" />.
          </p>
        </Task>
        <Task n={2} q={<>Mennyi az <M t="r = e^\theta" /> logaritmikus spirál által <M t="0 \le \theta \le \pi" /> között kisöpört terület?</>}>
          <p>
            <M t="A = \dfrac{1}{2}\int_0^{\pi} e^{2\theta}\,d\theta = \dfrac{1}{4}\left[e^{2\theta}\right]_0^{\pi} = \dfrac{e^{2\pi} - 1}{4}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Kardioid, rózsaszirom és belső hurok területe',
    body: (
      <>
        <p>
          A poláris területszámításnál a leggyakoribb integrandus a <M t="\cos^2(n\theta)" /> és <M t="\sin^2(n\theta)" />,
          ezért a két félszög-azonosság igazi munkaeszköz:
        </p>
        <M block t="\cos^2 u = \frac{1 + \cos(2u)}{2}, \qquad \sin^2 u = \frac{1 - \cos(2u)}{2}." />

        <CardioidAreaWidget />

        <h3>1. példa — Az r = 2(1 + cos θ) kardioid területe</h3>
        <M block t="A = \int_0^{2\pi} \frac{1}{2}\cdot 4(1 + \cos\theta)^2\,d\theta = 2\int_0^{2\pi} \left(1 + 2\cos\theta + \frac{1 + \cos 2\theta}{2}\right)d\theta = \int_0^{2\pi} (3 + 4\cos\theta + \cos 2\theta)\,d\theta = 6\pi." />
        <p>
          (Általánosan az <M t="r = a(1 \pm \cos\theta)" /> vagy <M t="a(1 \pm \sin\theta)" /> kardioid területe mindig{' '}
          <M t="A = \dfrac{3}{2}\pi a^2" />!)
        </p>

        <RoseAndLoopAreaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Számítsd ki az <M t="r = 2\sin(2\theta)" /> négyszirmú rózsa egyetlen szirmának, majd az egész rózsának a területét!</>}>
          <p>
            Az első szirom <M t="0 \le \theta \le \tfrac{\pi}{2}" />-n keletkezik:
            <M block t="A_1 = \frac{1}{2}\int_0^{\pi/2} 4\sin^2(2\theta)\,d\theta = \int_0^{\pi/2}(1 - \cos 4\theta)\,d\theta = \frac{\pi}{2}." />
            A 4 szirom együtt: <M t="A = 4 \cdot \dfrac{\pi}{2} = 2\pi" /> (pontosan a körbefoglaló <M t="R=2" /> kör
            területének a fele!).
          </p>
        </Task>
        <Task n={4} q={<>Határozd meg az <M t="r^2 = 9\cos(2\theta)" /> lemniszkáta mindkét hurkának együttes területét!</>}>
          <p>
            A jobb hurok <M t="-\tfrac{\pi}{4} \le \theta \le \tfrac{\pi}{4}" />-n van, és szimmetria miatt a teljes
            terület ennek kétszerese:
            <M block t="A = 2\cdot\frac{1}{2}\int_{-\pi/4}^{\pi/4} 9\cos(2\theta)\,d\theta = 9\left[\frac{\sin 2\theta}{2}\right]_{-\pi/4}^{\pi/4} = 9." />
            (Általánosan <M t="r^2 = a^2\cos(2\theta)" /> teljes területe pontosan <M t="a^2" /> — nincs benne <M t="\pi" />!)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Két polárgörbe közötti terület',
    body: (
      <>
        <p>
          Ha egy tartományt kívülről az <M t="r_2(\theta)" />, belülről pedig az <M t="r_1(\theta)" /> polárgörbe
          határol (<M t="0 \le r_1(\theta) \le r_2(\theta)" />) az <M t="\alpha \le \theta \le \beta" /> szögtartományban,
          akkor a külső szektorból egyszerűen kivonjuk a belsőt:
        </p>

        <Def title="Két polárgörbe közötti terület">
          <M block t="A = \int_\alpha^\beta \frac{1}{2}\Big(\big(r_{\text{külső}}(\theta)\big)^2 - \big(r_{\text{belső}}(\theta)\big)^2\Big)\,d\theta." />
        </Def>

        <PolarBetweenCurvesWidget />

        <Quiz
          q={<>Melyik képlet helyes az <M t="r_1(\theta)" /> (belső) és <M t="r_2(\theta)" /> (külső) polárgörbe közötti területre?</>}
          options={[
            { label: <M t="\tfrac{1}{2}\int_\alpha^\beta (r_2 - r_1)^2\,d\theta" /> },
            { label: <M t="\tfrac{1}{2}\int_\alpha^\beta (r_2^2 - r_1^2)\,d\theta" />, ok: true },
            { label: <M t="\int_\alpha^\beta (r_2 - r_1)\,d\theta" /> },
            { label: <M t="\int_\alpha^\beta (r_2^2 - r_1^2)\,d\theta" /> },
          ]}
          explain={
            <>
              Két koncentrikus körszektor területének különbsége <M t="\tfrac{1}{2}r_2^2\Delta\theta - \tfrac{1}{2}r_1^2\Delta\theta = \tfrac{1}{2}(r_2^2 - r_1^2)\Delta\theta" />,
              soha nem <M t="(r_2 - r_1)^2" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Számítsd ki az <M t="r = 2\cos\theta" /> körön <em>belül</em>, de az <M t="r = 1" /> körön <em>kívül</em> eső félhold területét!</>}>
          <p>
            Metszéspontok: <M t="2\cos\theta = 1 \Rightarrow \theta = \pm\tfrac{\pi}{3}" />. Szimmetriával:
            <M block t="A = 2\cdot\frac{1}{2}\int_0^{\pi/3} (4\cos^2\theta - 1)\,d\theta = \int_0^{\pi/3} (1 + 2\cos 2\theta)\,d\theta = \Big[\theta + \sin 2\theta\Big]_0^{\pi/3} = \frac{\pi}{3} + \frac{\sqrt{3}}{2}." />
          </p>
        </Task>
        <Task n={6} q={<>Mennyi az <M t="r = 2\sin\theta" /> és <M t="r = 2\cos\theta" /> körök közös belső részének területe?</>}>
          <p>
            A két kör <M t="\theta = \tfrac{\pi}{4}" />-nél metszi egymást. Szimmetriával a <M t="0 \le \theta \le \tfrac{\pi}{4}" />{' '}
            sávon <M t="r = 2\sin\theta" /> a kisebbik sugár, és ennek kétszerese a teljes metszet:
            <M block t="A = 2\cdot\frac{1}{2}\int_0^{\pi/4} 4\sin^2\theta\,d\theta = 2\int_0^{\pi/4}(1 - \cos 2\theta)\,d\theta = \Big[2\theta - \sin 2\theta\Big]_0^{\pi/4} = \frac{\pi}{2} - 1." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Ívhossz polárkoordinátákban',
    body: (
      <>
        <p>
          Hogyan mérjük meg egy <M t="r = f(\theta)" /> polárgörbe hosszát <M t="\alpha \le \theta \le \beta" /> között?
          Írjuk fel paraméteresen: <M t="x = r\cos\theta,\ y = r\sin\theta" />. Deriválva és négyzetre emelve:
        </p>
        <M block t="(x')^2 + (y')^2 = (r'\cos\theta - r\sin\theta)^2 + (r'\sin\theta + r\cos\theta)^2 = (r')^2(\cos^2\theta + \sin^2\theta) + r^2(\sin^2\theta + \cos^2\theta) = r^2 + (r')^2!" />
        <p>
          A vegyes <M t="\pm 2rr'\sin\theta\cos\theta" /> tagok pontosan kiejtik egymást!
        </p>

        <Def title="Polárgörbe ívhossza">
          <p>
            Ha <M t="r = f(\theta)" /> folytonosan differenciálható az <M t="[\alpha;\,\beta]" /> intervallumon, és a
            görbe nem járja be többször önmagát, akkor az ívhossz:
          </p>
          <M block t="L = \int_\alpha^\beta \sqrt{r^2 + \left(\frac{dr}{d\theta}\right)^2}\,d\theta." />
        </Def>

        <PolarArcElementDiagram />

        <h3>Kidolgozott példa — Logaritmikus spirál hossza</h3>
        <p>Számítsuk ki az <M t="r = e^\theta" /> spirál hosszát <M t="0 \le \theta \le \pi" /> között!</p>
        <p>
          Mivel <M t="r' = e^\theta" />, ezért <M t="\sqrt{r^2 + (r')^2} = \sqrt{e^{2\theta} + e^{2\theta}} = \sqrt{2}\,e^\theta" />.
          Így:
        </p>
        <M block t="L = \int_0^{\pi} \sqrt{2}\,e^\theta\,d\theta = \sqrt{2}(e^\pi - 1) \approx 31{,}31." />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Ellenőrizd az ívhosszképlettel az <M t="r = 2a\cos\theta" /> (<M t="0 \le \theta \le \pi" />) kör kerületét!</>}>
          <p>
            <M t="r' = -2a\sin\theta" />, így <M t="\sqrt{r^2 + (r')^2} = \sqrt{4a^2\cos^2\theta + 4a^2\sin^2\theta} = 2a" />.
            Tehát <M t="L = \int_0^\pi 2a\,d\theta = 2\pi a" /> — pontosan az <M t="a" /> sugarú kör kerülete!
          </p>
        </Task>
        <Task n={8} q={<>Számítsd ki az <M t="r = e^{2\theta}" /> spirál hosszát <M t="0 \le \theta \le \ln 2" /> között!</>}>
          <p>
            <M t="r' = 2e^{2\theta}" />, <M t="\sqrt{r^2 + (r')^2} = \sqrt{5}\,e^{2\theta}" />. Integrálva:{' '}
            <M t="L = \sqrt{5}\left[\dfrac{e^{2\theta}}{2}\right]_0^{\ln 2} = \dfrac{\sqrt{5}}{2}(4 - 1) = \dfrac{3\sqrt{5}}{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A kardioid ívhossza (L = 8a) — lépésről lépésre',
    body: (
      <>
        <p>
          A poláris ívhossz egyik legszebb klasszikus számolása a kardioid teljes kerülete — pontosan ugyanazzal a
          félszög-trükkel működik, mint a cikloisé a 10.4-es szakaszban!
        </p>

        <CardioidArcLengthWidget />

        <Steps
          title="Az r = a(1 − cos θ) kardioid teljes kerülete"
          problem={
            <>
              Számítsuk ki az <M t="r = a(1 - \cos\theta)" /> (<M t="a > 0,\ 0 \le \theta \le 2\pi" />) kardioid pontos
              ívhosszát!
            </>
          }
          steps={[
            {
              title: '1. Az r² + (r′)² kifejezés egyszerűsítése',
              body: (
                <>
                  <M t="r' = a\sin\theta" />, ezért:
                  <M block t="r^2 + (r')^2 = a^2\big((1 - \cos\theta)^2 + \sin^2\theta\big) = a^2(1 - 2\cos\theta + \cos^2\theta + \sin^2\theta) = 2a^2(1 - \cos\theta)." />
                </>
              ),
            },
            {
              title: '2. Félszög-azonosság és gyökvonás',
              body: (
                <>
                  Mivel <M t="1 - \cos\theta = 2\sin^2(\theta/2)" />, ezért <M t="2a^2(1 - \cos\theta) = 4a^2\sin^2(\theta/2)" />.
                  A <M t="[0;\,2\pi]" /> intervallumon <M t="0 \le \theta/2 \le \pi" />, ahol{' '}
                  <M t="\sin(\theta/2) \ge 0" />, így a gyök:
                  <M block t="\sqrt{r^2 + (r')^2} = 2a\sin\left(\frac{\theta}{2}\right)." />
                </>
              ),
            },
            {
              title: '3. Integrálás 0-tól 2π-ig',
              body: (
                <>
                  <M block t="L = \int_0^{2\pi} 2a\sin\left(\frac{\theta}{2}\right)d\theta = \Big[-4a\cos\left(\frac{\theta}{2}\right)\Big]_0^{2\pi} = (-4a)(-1) - (-4a)(1) = 8a." />
                </>
              ),
            },
          ]}
        />

        <Quiz
          q={<>Ha az <M t="r = 1 + \cos\theta" /> kardioid ívhosszát számoljuk <M t="0 \le \theta \le 2\pi" />-n, mire kell figyelni a <M t="\sqrt{4\cos^2(\theta/2)}" /> gyöknél?</>}
          options={[
            { label: <>Semmire, <M t="\cos(\theta/2) \ge 0" /> végig a <M t="[0;\,2\pi]" />-n.</> },
            { label: <>A <M t="[\pi;\,2\pi]" /> szakaszon <M t="\cos(\theta/2) \le 0" />, ezért szimmetriával <M t="2\int_0^\pi 2\cos(\theta/2)\,d\theta" /> kell!</>, ok: true },
            { label: <>A teljes kerület 0 lesz.</> },
            { label: <>Csak <M t="0" />-tól <M t="\pi/2" />-ig kell integrálni.</> },
          ]}
          explain={
            <>
              A <M t="[0;\,2\pi]" /> tartományon <M t="\theta/2 \in [0;\,\pi]" />, tehát <M t="\cos(\theta/2)" /> a{' '}
              <M t="(\pi/2;\,\pi]" /> szakaszon <strong>negatív</strong>! Abszolútérték nélkül{' '}
              <M t="\int_0^{2\pi} 2\cos(\theta/2)\,d\theta = 0" /> jönne ki. Szimmetriával (vagy <M t="|\cos(\theta/2)|" />-vel)
              helyesen <M t="L = 8" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Számítsd ki az <M t="r = \cos^2(\theta/2)" /> görbe teljes hosszát (<M t="0 \le \theta \le 2\pi" />)!</>}>
          <p>
            Vegyük észre, hogy <M t="\cos^2(\theta/2) = \dfrac{1 + \cos\theta}{2}" />, tehát ez egy{' '}
            <M t="a = \dfrac{1}{2}" /> paraméterű kardioid! Így teljes hossza <M t="L = 8a = 4" />.
          </p>
        </Task>
        <Task n={10} q={<>Számítsd ki az <M t="r = \sin^3(\theta/3)" /> görbe hosszát a <M t="0 \le \theta \le \pi" /> szakaszon!</>}>
          <p>
            <M t="r' = \sin^2(\theta/3)\cos(\theta/3)" />, így <M t="r^2 + (r')^2 = \sin^4(\theta/3)\big(\sin^2(\theta/3)+\cos^2(\theta/3)\big) = \sin^4(\theta/3)" />.
            A gyök <M t="\sin^2(\theta/3) = \tfrac{1 - \cos(2\theta/3)}{2}" />. Integrálva <M t="0" />-tól <M t="\pi" />-ig:
            <M block t="L = \int_0^\pi \frac{1 - \cos(2\theta/3)}{2}\,d\theta = \left[\frac{\theta}{2} - \frac{3}{4}\sin\left(\frac{2\theta}{3}\right)\right]_0^\pi = \frac{\pi}{2} - \frac{3\sqrt{3}}{8}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Forgástestek felszíne polárkoordinátákban',
    body: (
      <>
        <p>
          Ha egy <M t="r = f(\theta)" /> polárgörbe-ívet (<M t="\alpha \le \theta \le \beta" />) megforgatunk a
          polártengely (<M t="x" />-tengely) vagy a rá merőleges <M t="\theta = \tfrac{\pi}{2}" /> (<M t="y" />-tengely)
          körül, a 6.5-ös szakaszból ismert <M t="S = \int 2\pi(\text{forgási sugár})\,ds" /> képlet azonnal átírható:
        </p>

        <Def title="Forgásfelszín polárkoordinátákban">
          <ul>
            <li>
              <strong>A polártengely (<M t="x" />-tengely) körül</strong> (<M t="y = r\sin\theta \ge 0" />):
              <M block t="S = \int_\alpha^\beta 2\pi r\sin\theta\,\sqrt{r^2 + \left(\frac{dr}{d\theta}\right)^2}\,d\theta." />
            </li>
            <li>
              <strong>Az <M t="y" />-tengely (<M t="\theta = \tfrac{\pi}{2}" />) körül</strong> (<M t="x = r\cos\theta \ge 0" />):
              <M block t="S = \int_\alpha^\beta 2\pi r\cos\theta\,\sqrt{r^2 + \left(\frac{dr}{d\theta}\right)^2}\,d\theta." />
            </li>
          </ul>
        </Def>

        <PolarSurfaceRevolutionWidget />

        <h3>Kidolgozott példa — A kardioid-forgástest felszíne</h3>
        <p>
          Forgassuk meg az <M t="r = 1 + \cos\theta" /> kardioid felső felét (<M t="0 \le \theta \le \pi" />) az{' '}
          <M t="x" />-tengely körül! Tudjuk, hogy <M t="ds = 2\cos(\theta/2)\,d\theta" />, továbbá{' '}
          <M t="r = 2\cos^2(\theta/2)" /> és <M t="\sin\theta = 2\sin(\theta/2)\cos(\theta/2)" />. Behelyettesítve:
        </p>
        <M block t="S = \int_0^\pi 2\pi \cdot 2\cos^2\frac{\theta}{2} \cdot 2\sin\frac{\theta}{2}\cos\frac{\theta}{2} \cdot 2\cos\frac{\theta}{2}\,d\theta = 16\pi\int_0^\pi \cos^4\left(\frac{\theta}{2}\right)\sin\left(\frac{\theta}{2}\right)d\theta." />
        <p>
          Az <M t="u = \cos(\theta/2)" /> (<M t="du = -\tfrac{1}{2}\sin(\theta/2)\,d\theta" />) helyettesítéssel:
        </p>
        <M block t="S = 32\pi\int_0^1 u^4\,du = \frac{32\pi}{5}." />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Számítsd ki az <M t="r = 2a\cos\theta" /> (<M t="0 \le \theta \le \tfrac{\pi}{2}" />) felső félkör <M t="x" />-tengely körüli megforgatásából keletkező gömb felszínét!</>}>
          <p>
            <M t="ds = 2a\,d\theta" />, így:
            <M block t="S = \int_0^{\pi/2} 2\pi (2a\cos\theta)\sin\theta \cdot 2a\,d\theta = 4\pi a^2 \int_0^{\pi/2} \sin(2\theta)\,d\theta = 4\pi a^2\left[-\frac{\cos 2\theta}{2}\right]_0^{\pi/2} = 4\pi a^2!" />
          </p>
        </Task>
        <Task n={12} q={<>Milyen határok között kell integrálni az <M t="r = 2\sin\theta" /> kört az <M t="y" />-tengely körüli megforgatásnál, hogy ne számoljuk kétszer a gömböt?</>}>
          <p>
            Csak a jobb félkört forgatjuk meg: <M t="0 \le \theta \le \dfrac{\pi}{2}" /> (ekkor <M t="x = r\cos\theta \ge 0" />)!
            A <M t="[0;\,\pi]" /> intervallum kétszer fedné le a gömböt.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló és tipikus hibák',
    body: (
      <>
        <PolarIntegralsSummaryDiagram />

        <h3>Poláris integrálképletek összefoglalása</h3>
        <table className="tbl">
          <thead>
            <tr><th>Mennyiség</th><th>Képlet</th><th>Nevezetes példa</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Terület (egy görbe)</strong></td>
              <td><M t="A = \tfrac{1}{2}\int_\alpha^\beta r^2\,d\theta" /></td>
              <td>Kardioid: <M t="\tfrac{3}{2}\pi a^2" />; lemniszkáta: <M t="a^2" /></td>
            </tr>
            <tr>
              <td><strong>Terület (két görbe közt)</strong></td>
              <td><M t="A = \tfrac{1}{2}\int_\alpha^\beta (r_2^2 - r_1^2)\,d\theta" /></td>
              <td>Külső négyzete mínusz belső négyzete</td>
            </tr>
            <tr>
              <td><strong>Ívhossz</strong></td>
              <td><M t="L = \int_\alpha^\beta \sqrt{r^2 + (r')^2}\,d\theta" /></td>
              <td>Kardioid: <M t="8a" /></td>
            </tr>
            <tr>
              <td><strong>Felszín (<M t="x" />-tengely körül)</strong></td>
              <td><M t="S = 2\pi\int_\alpha^\beta r\sin\theta\sqrt{r^2+(r')^2}\,d\theta" /></td>
              <td><M t="r = 1+\cos\theta" />: <M t="\tfrac{32\pi}{5}" /></td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. Kétszeres bejárás miatti dupla terület:</strong> az <M t="r = 2\cos\theta" /> kör és a páratlan
          szirmú rózsák (pl. <M t="r = \cos 3\theta" />) már <M t="[0;\,\pi]" />-n bezárulnak! Mindig ellenőrizd a
          bejárási intervallumot, mielőtt <M t="0" />-tól <M t="2\pi" />-ig integrálsz!
        </Warn>
        <Warn>
          <strong>2. Az <M t="(r_2 - r_1)^2" /> tévedés:</strong> két görbe közötti területnél{' '}
          <M t="r_2^2 - r_1^2" /> kell, soha nem <M t="(r_2 - r_1)^2" />!
        </Warn>
        <Warn>
          <strong>3. Az <M t="\tfrac{1}{2}" /> tényező lefelejtése:</strong> a körszektor területe{' '}
          <M t="\tfrac{1}{2}r^2\Delta\theta" />, nem <M t="r^2\Delta\theta" />.
        </Warn>
        <Warn>
          <strong>4. Abszolútérték elhagyása az ívhossz gyökéből:</strong> <M t="\sqrt{\cos^2(\theta/2)} = |\cos(\theta/2)|" />!
          Szimmetrikus görbéknél mindig biztonságosabb a féltartományon (<M t="[0;\,\pi]" />) integrálni és 2-vel szorozni.
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Miért ad <M t="\tfrac{1}{2}\int_0^{2\pi} \cos^2(3\theta)\,d\theta" /> pont <em>kétszer</em> akkora eredményt, mint az <M t="r = \cos(3\theta)" /> rózsa valódi területe?</>}>
          <p>
            Mert a 3 szirmú rózsa <M t="0 \le \theta \le \pi" /> alatt már teljesen bezárul, és{' '}
            <M t="\pi \le \theta \le 2\pi" /> alatt újra végigmegy mindhárom szirmon. Valódi területe{' '}
            <M t="\tfrac{\pi}{4}" /> (nem <M t="\tfrac{\pi}{2}" />).
          </p>
        </Task>
        <Task n={14} q={<>Hányad része a körbefoglaló <M t="r = a" /> kör területének az <M t="r = a\cos(n\theta)" /> rózsagörbe területe páratlan, illetve páros <M t="n" /> esetén?</>}>
          <p>
            Páratlan <M t="n" /> esetén (integrál <M t="[0;\,\pi]" />-n): <M t="\dfrac{\pi a^2}{4}" />, vagyis a kör{' '}
            <strong>negyede</strong>! Páros <M t="n" /> esetén (integrál <M t="[0;\,2\pi]" />-n):{' '}
            <M t="\dfrac{\pi a^2}{2}" />, vagyis a kör <strong>fele</strong> — teljesen függetlenül <M t="n" /> nagyságától!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <h3>Könnyű</h3>

        <Task n={15} q={<>Számítsd ki az <M t="r = 3(1 - \sin\theta)" /> kardioid teljes területét és kerületét!</>}>
          <p>
            Itt <M t="a = 3" />, tehát a terület <M t="A = \dfrac{3}{2}\pi a^2 = \dfrac{27\pi}{2}" />, a kerület pedig{' '}
            <M t="L = 8a = 24" />.
          </p>
        </Task>

        <Task n={16} q={<>Határozd meg az <M t="r = 4\cos(2\theta)" /> négyszirmú rózsa összes szirmának együttes területét!</>}>
          <p>
            Páros <M t="n = 2" />, tehát <M t="[0;\,2\pi]" />-n egyszer járja be mind a 4 szirmot:
            <M block t="A = \frac{1}{2}\int_0^{2\pi} 16\cos^2(2\theta)\,d\theta = 4\int_0^{2\pi}(1 + \cos 4\theta)\,d\theta = 8\pi." />
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="r = 5" /> köríven a <M t="\theta = 0" /> és <M t="\theta = \tfrac{2\pi}{3}" /> közötti szakasz hosszát és az általa határolt körcikk területét!</>}>
          <p>
            <M t="r' = 0 \Rightarrow L = \int_0^{2\pi/3} 5\,d\theta = \dfrac{10\pi}{3}" />, és{' '}
            <M t="A = \dfrac{1}{2}\int_0^{2\pi/3} 25\,d\theta = \dfrac{25\pi}{3}" />.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Számítsd ki az <M t="r = 2 + \cos\theta" /> behorpadt csigavonal által bezárt területet!</>}>
          <p>
            <M t="r > 0" /> minden <M t="\theta" />-ra, így egyszer járja be <M t="[0;\,2\pi]" />-n:
            <M block t="A = \frac{1}{2}\int_0^{2\pi}(4 + 4\cos\theta + \cos^2\theta)\,d\theta = \frac{1}{2}\left(8\pi + 0 + \pi\right) = \frac{9\pi}{2}." />
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg az <M t="r = 3\sin\theta" /> körön <em>belül</em> és az <M t="r = 1 + \sin\theta" /> kardioidon <em>kívül</em> eső tartomány területét!</>}>
          <p>
            Metszéspontok: <M t="3\sin\theta = 1 + \sin\theta \Rightarrow \sin\theta = \tfrac{1}{2} \Rightarrow \theta = \tfrac{\pi}{6},\,\tfrac{5\pi}{6}" />.
            Szimmetriával (<M t="\tfrac{\pi}{6} \le \theta \le \tfrac{\pi}{2}" /> kétszerese):
            <M block t="A = 2\cdot\frac{1}{2}\int_{\pi/6}^{\pi/2}\big(9\sin^2\theta - (1+\sin\theta)^2\big)\,d\theta = \int_{\pi/6}^{\pi/2}(8\sin^2\theta - 2\sin\theta - 1)\,d\theta." />
            Mivel <M t="8\sin^2\theta - 1 = 3 - 4\cos 2\theta" />:
            <M block t="A = \Big[3\theta - 2\sin 2\theta + 2\cos\theta\Big]_{\pi/6}^{\pi/2} = \left(\frac{3\pi}{2}\right) - \left(\frac{\pi}{2} - \sqrt{3} + \sqrt{3}\right) = \pi!" />
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="r = \theta" /> arkhimédészi spirál első fordulatának (<M t="0 \le \theta \le 2\pi" />) pontos ívhosszát!</>}>
          <p>
            <M t="r' = 1 \Rightarrow L = \int_0^{2\pi}\sqrt{\theta^2 + 1}\,d\theta" />. Az{' '}
            <M t="\int\sqrt{u^2+1}\,du = \tfrac{1}{2}\big(u\sqrt{u^2+1} + \ln(u+\sqrt{u^2+1})\big)" /> integrállal:
            <M block t="L = \pi\sqrt{4\pi^2 + 1} + \frac{1}{2}\ln\left(2\pi + \sqrt{4\pi^2 + 1}\right) \approx 21{,}26." />
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Az <M t="r = 1 + 2\cos\theta" /> hurkos csigavonal <em>külső hurka</em> és <em>belső hurka</em> közötti
              „hold” területét határozd meg!
            </>
          }
        >
          <p>
            A teljes integrál <M t="\tfrac{1}{2}\int_0^{2\pi}(1 + 2\cos\theta)^2\,d\theta = \tfrac{1}{2}(2\pi + 4\pi) = 3\pi" />{' '}
            az <em>összegét</em> adja a külső hurok területének (<M t="A_{\text{külső}}" />) és a belső hurok területének
            (<M t="A_{\text{belső}}" />), mert a belső hurok pozitívként szerepel az <M t="r^2" /> integrálban!
          </p>
          <p>
            Tudjuk (2. oldalról), hogy <M t="A_{\text{belső}} = \pi - \tfrac{3\sqrt{3}}{2}" />. Mivel{' '}
            <M t="A_{\text{külső}} = 3\pi - A_{\text{belső}} = 2\pi + \tfrac{3\sqrt{3}}{2}" />, a kettő közötti rész
            területe:
            <M block t="A_{\text{közti}} = A_{\text{külső}} - A_{\text{belső}} = \pi + 3\sqrt{3} \approx 8{,}34." />
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Számítsd ki az <M t="r^2 = 2\cos(2\theta)" /> lemniszkáta jobb hurkának felső felét (
              <M t="0 \le \theta \le \tfrac{\pi}{4}" />) az <M t="y" />-tengely körül megforgatva keletkező forgásfelszínt!
            </>
          }
        >
          <p>
            Implicit deriválva: <M t="2rr' = -4\sin(2\theta) \Rightarrow r' = -\dfrac{2\sin(2\theta)}{r}" />. Így:
            <M block t="r^2 + (r')^2 = \frac{r^4 + 4\sin^2(2\theta)}{r^2} = \frac{4\cos^2(2\theta) + 4\sin^2(2\theta)}{r^2} = \frac{4}{r^2} \ \Longrightarrow\ \sqrt{r^2 + (r')^2} = \frac{2}{r}!" />
            Behelyettesítve a felszínképletbe az <M t="r" /> gyönyörűen kiejti magát:
            <M block t="S = \int_0^{\pi/4} 2\pi r\cos\theta \cdot \frac{2}{r}\,d\theta = 4\pi\int_0^{\pi/4}\cos\theta\,d\theta = 4\pi\cdot\frac{\sqrt{2}}{2} = 2\sqrt{2}\,\pi!" />
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Bizonyítsd be, hogy az <M t="r = e^{-k\theta}" /> (<M t="k > 0,\ \theta \ge 0" />) logaritmikus spirál
              végtelen sokszor megkerüli a pólust, mégis <strong>véges</strong> a teljes ívhossza és az első fordulat
              által határolt területe is!
            </>
          }
        >
          <p>
            <M t="r' = -k e^{-k\theta}" />, így <M t="\sqrt{r^2 + (r')^2} = \sqrt{1+k^2}\,e^{-k\theta}" />. Az
            improprius integrál konvergens:
            <M block t="L = \int_0^\infty \sqrt{1+k^2}\,e^{-k\theta}\,d\theta = \frac{\sqrt{1+k^2}}{k} < \infty!" />
            (A teljes kisöpört szektor-összeg is véges: <M t="\tfrac{1}{2}\int_0^\infty e^{-2k\theta}\,d\theta = \tfrac{1}{4k}" />!)
          </p>
        </Task>
      </>
    ),
  },
];
