import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  BernoulliTransformDiagram,
  FirstOrderDEChoiceDiagram,
  HomogeneousInhomogeneousDiagram,
  IntegratingFactorFlowDiagram,
  LinearVsNonlinearDiagram,
  MixingTankSimulatorWidget,
  RLCircuitSimulatorWidget,
  TransientVsSteadyWidget,
} from '../components/Widgets92';
import type { Page } from './s1_1';

export const S9_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Elsőrendű lineáris differenciálegyenletek és a standard alak',
    body: (
      <>
        <Story>
          <p>
            A 9.1-ben láttuk, hogy az <M t="y' = y - x" /> vagy az <M t="xy' = x^2 + 3y" /> egyenletet nem lehet
            szétválasztani — mégis pontos, elegáns képlettel megoldhatók! Mindkettő az{' '}
            <strong>elsőrendű lineáris differenciálegyenletek</strong> családjába tartozik, amelyek az áramkörök,
            a keverési feladatok és a fizikai rendszerek alapkövei.
          </p>
        </Story>

        <Def title="Standard alak">
          <M block t="\frac{dy}{dx} + P(x)y = Q(x)" />
          <p>
            ahol <M t="P(x)" /> és <M t="Q(x)" /> folytonos függvények egy intervallumon. Fontos: az{' '}
            <M t="y'" /> együtthatója a standard alakban mindig <strong>1</strong>!
          </p>
        </Def>

        <p>
          <strong>Thomas 1. példa:</strong> Hozzuk standard alakra az <M t="x\frac{dy}{dx} = x^2 + 3y" /> (<M t="x>0" />)
          egyenletet! Először elosztunk <M t="x" />-szel, majd az <M t="y" />-os tagot balra rendezzük:
        </p>
        <M block t="\frac{dy}{dx} - \frac{3}{x}y = x \qquad\Longrightarrow\qquad P(x) = -\frac{3}{x}, \quad Q(x) = x." />

        <LinearVsNonlinearDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Hozd standard alakra, és olvasd le <M t="P(x)" />-et és <M t="Q(x)" />-et: <M t="x^2 y' + 2xy = \sin x" /> (<M t="x>0" />)!</>}
        >
          <p>
            <M t="x^2" />-tel osztva: <M t="y' + \frac{2}{x}y = \frac{\sin x}{x^2}" />, tehát{' '}
            <M t="P(x) = \frac{2}{x}" /> és <M t="Q(x) = \frac{\sin x}{x^2}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={<>Melyik lineáris az alábbiak közül: (a) <M t="y' + e^x y = x^3" />, (b) <M t="y' + x e^y = 1" />, (c) <M t="(\cos x)y' - y = \operatorname{tg} x" />?</>}
        >
          <p>
            <strong>(a) és (c) lineáris</strong> (mert <M t="y" /> és <M t="y'" /> csak 1. hatványon szerepel);{' '}
            <strong>(b) nemlineáris</strong> az <M t="e^y" /> tag miatt!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Az integráló tényező: a szorzatszabály megfordítása',
    body: (
      <>
        <p>
          Hogyan oldjuk meg az <M t="y' + P(x)y = Q(x)" /> egyenletet? A trükk lélegzetelállítóan szép: szorozzuk
          meg mindkét oldalt egy olyan <M t="v(x) > 0" /> <strong>integráló tényezővel</strong>, hogy a bal oldal
          pontosan a <M t="v(x)\cdot y" /> szorzat deriváltja legyen!
        </p>
        <M block t="v y' + v P y = (v y)' = v y' + v' y \;\iff\; v' = P(x) v \;\iff\; \frac{dv}{v} = P(x)\,dx \;\Longrightarrow\; \mathbf{v(x) = e^{\int P(x)\,dx}}." />

        <IntegratingFactorFlowDiagram />

        <p>
          <strong>Thomas 2–3. példa:</strong> Oldjuk meg az <M t="xy' = x^2 + 3y,\; x>0,\; y(1) = 2" />{' '}
          kezdetiérték-problémát! Standard alak: <M t="y' - \frac{3}{x}y = x" />, innen <M t="P(x) = -\frac{3}{x}" />:
        </p>
        <M block t="v(x) = e^{\int -\frac{3}{x}\,dx} = e^{-3\ln x} = x^{-3} = \frac{1}{x^3}." />
        <p>
          Beszorozva <M t="\frac{1}{x^3}" />-nel a bal oldal automatikusan <M t="\left(\frac{y}{x^3}\right)'" /> lesz:
        </p>
        <M block t="\left(\frac{y}{x^3}\right)' = \frac{1}{x^2} \;\Longrightarrow\; \frac{y}{x^3} = -\frac{1}{x} + C \;\Longrightarrow\; y = -x^2 + Cx^3." />
        <p>
          Végül <M t="y(1) = 2 \implies -1 + C = 2 \implies C = 3" />, tehát{' '}
          <M t="\mathbf{y = -x^2 + 3x^3}" />!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Oldd meg az <M t="y' + 3y = 6" /> egyenletet integráló tényezővel!</>}
        >
          <p>
            <M t="P=3 \Rightarrow v(x)=e^{3x}" />. Szorozva: <M t="(e^{3x}y)' = 6e^{3x}" />, integrálva{' '}
            <M t="e^{3x}y = 2e^{3x} + C \implies \mathbf{y = 2 + Ce^{-3x}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={<>Oldd meg az <M t="xy' + 2y = x^3,\; x>0,\; y(2) = 1" /> kezdetiérték-problémát (Thomas 16. feladat)!</>}
        >
          <p>
            Standard alak: <M t="y' + \frac{2}{x}y = x^2" />, <M t="v(x) = e^{2\ln x} = x^2" />.{' '}
            <M t="(x^2 y)' = x^4 \implies x^2 y = \frac{x^5}{5} + C \implies y = \frac{x^3}{5} + \frac{C}{x^2}" />.
            Mivel <M t="y(2)=1" />, <M t="1 = \frac{8}{5} + \frac{C}{4} \Rightarrow C = -\frac{12}{5}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Parciális integrálás, állandósult állapot és a +C szerepe',
    body: (
      <>
        <p>
          <strong>Thomas 4. példa:</strong> Oldjuk meg a <M t="3xy' - y = \ln x + 1,\; x>0,\; y(1) = -2" />{' '}
          egyenletet! Standard alak: <M t="y' - \frac{1}{3x}y = \frac{\ln x + 1}{3x}" />, így{' '}
          <M t="v(x) = e^{-\frac{1}{3}\ln x} = x^{-1/3}" />. Ezzel:
        </p>
        <M block t="x^{-1/3} y = \frac{1}{3}\int (\ln x + 1)x^{-4/3}\,dx = -x^{-1/3}(\ln x + 1) - 3x^{-1/3} + C." />
        <p>
          Mindkét oldalt <M t="x^{1/3}" />-dal megszorozva (<strong>a <M t="+C" />-t is!</strong>):{' '}
          <M t="y = -\ln x - 4 + Cx^{1/3}" />. Mivel <M t="y(1) = -2" />, <M t="C = 2" />, tehát{' '}
          <M t="\mathbf{y = 2x^{1/3} - \ln x - 4}" />.
        </p>

        <TransientVsSteadyWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Oldd meg az <M t="y' - y = x" /> egyenletet (<M t="y(0) = 1" />) parciális integrálással!</>}
        >
          <p>
            <M t="v(x) = e^{-x}" />: <M t="e^{-x}y = \int x e^{-x}\,dx = -xe^{-x} - e^{-x} + C" />, innen{' '}
            <M t="y = -x - 1 + Ce^x" />. Mivel <M t="y(0)=1" />, <M t="C=2" />, tehát{' '}
            <M t="\mathbf{y = 2e^x - x - 1}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Miért végzetes hiba az <M t="e^{2x}y = e^{2x} + C" /> egyenletből <M t="y = 1 + C" />-t írni?</>}
        >
          <p>
            Mert a <M t="C" /> konstansot is el kell osztani <M t="e^{2x}" />-szel! A helyes eredmény{' '}
            <M t="y = 1 + Ce^{-2x}" /> (ellenőrzés: <M t="y=1+C" /> nem is elégíti ki az <M t="y'+2y=2" /> egyenletet!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Alkalmazás: RL-áramkör és az időállandó',
    body: (
      <>
        <p>
          Egy <M t="R" /> ellenállást, <M t="L" /> induktivitást és állandó <M t="V" /> feszültségforrást
          tartalmazó soros áramkörben Kirchhoff huroktörvénye elsőrendű lineáris egyenletet ad az <M t="i(t)" />{' '}
          áramerősségre:
        </p>
        <M block t="L\frac{di}{dt} + Ri = V \;\Longrightarrow\; \frac{di}{dt} + \frac{R}{L}i = \frac{V}{L}." />
        <p>
          Az integráló tényező <M t="v(t) = e^{(R/L)t}" />. A kapcsoló zárásakor <M t="i(0) = 0" />, amiből:
        </p>
        <M block t="i(t) = \frac{V}{R}\left(1 - e^{-(R/L)t}\right) = I_\infty\left(1 - e^{-t/\tau}\right), \qquad \tau = \frac{L}{R}." />

        <RLCircuitSimulatorWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Mennyi idő múlva éri el az RL-kör áramerőssége az egyensúlyi <M t="V/R" /> érték pontosan a <strong>felét</strong> (Thomas 29. feladat)?</>}
        >
          <p>
            <M t="1 - e^{-t/\tau} = \frac{1}{2} \iff e^{-t/\tau} = \frac{1}{2} \implies t = \tau\ln 2 = \mathbf{\frac{L}{R}\ln 2}" />{' '}
            (független a <M t="V" /> feszültségtől!).
          </p>
        </Task>
        <Task
          n={8}
          q={<>Egy RL-körben <M t="R = 10\;\Omega" />, <M t="L = 2\text{ H}" />, <M t="V = 50\text{ V}" />. Mennyi az időállandó <M t="\tau" /> és az egyensúlyi áram <M t="I_\infty" />?</>}
        >
          <p>
            <M t="\tau = \frac{L}{R} = \frac{2}{10} = \mathbf{0{,}2\text{ s}}" />,{' '}
            <M t="I_\infty = \frac{V}{R} = \mathbf{5\text{ A}}" /> (0,6 s alatt már 4,75 A folyik!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Alkalmazás: keverési feladatok (tartályok)',
    body: (
      <>
        <Def title="A keverési alapegyenlet">
          <p>
            Ha <M t="y(t)" /> az oldott anyag (pl. só) mennyisége a tartályban <M t="t" /> időpontban, akkor:
          </p>
          <M block t="\frac{dy}{dt} = \text{beáramlás üteme} - \text{kiáramlás üteme} = r_{\text{be}}\,c_{\text{be}} - r_{\text{ki}}\,\frac{y(t)}{V(t)}." />
          <p>
            Mivel a kiáramlás lineáris <M t="y" />-ban, ez mindig <strong>elsőrendű lineáris egyenlet</strong>!
          </p>
        </Def>

        <p>
          <strong>Kidolgozott példa:</strong> Egy <M t="100\text{ L}" />-es tartályban kezdetben tiszta víz van
          (<M t="y(0)=0" />). Percenként <M t="5\text{ L}" /> olyan sóoldat folyik be, amelyben{' '}
          <M t="0{,}2\text{ kg/L}" /> só van, és ugyanilyen ütemben folyik ki a jól elkevert oldat. Ekkor{' '}
          <M t="V(t) \equiv 100" />, és:
        </p>
        <M block t="\frac{dy}{dt} = 5\cdot 0{,}2 - 5\cdot\frac{y}{100} \;\Longrightarrow\; \frac{dy}{dt} + \frac{1}{20}y = 1 \;\Longrightarrow\; y(t) = 20\left(1 - e^{-t/20}\right)." />

        <MixingTankSimulatorWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Ha a fenti 100 L-es tartályban kezdetben <strong>30 kg</strong> só van, és tiszta vizet (<M t="c_{\text{be}}=0" />) engedünk be 5 L/perc sebességgel, mennyi só marad 20 perc múlva?</>}
        >
          <p>
            <M t="y' + \frac{1}{20}y = 0 \implies y(t) = 30e^{-t/20}" />. <M t="t=20" />-nál{' '}
            <M t="y(20) = 30e^{-1} \approx \mathbf{11{,}04\text{ kg}}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={<>Ha a tartályban kezdetben 400 L víz van, percenként 20 L folyik be és 12 L folyik ki (Thomas 26. feladat), mennyi a <M t="V(t)" /> térfogat, és mikor telik meg a 800 L-es tartály?</>}
        >
          <p>
            <M t="V(t) = 400 + (20-12)t = 400 + 8t" />. A tartály <M t="400+8t = 800 \implies \mathbf{t = 50\text{ perc}}" />{' '}
            múlva telik meg!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Homogén és inhomogén szerkezet (szuperpozíció)',
    body: (
      <>
        <p>
          Az <M t="y' + P(x)y = Q(x)" /> egyenlet megoldásában mindig két jól elkülönülő rész jelenik meg:
        </p>
        <ul>
          <li>
            <strong>Homogén rész (<M t="Q \equiv 0" />):</strong> <M t="y_h(x) = \frac{C}{v(x)} = C e^{-\int P(x)\,dx}" />{' '}
            — ez tartalmazza a tetszőleges <M t="C" /> konstanst!
          </li>
          <li>
            <strong>Partikuláris rész (<M t="y_p" />):</strong> egyetlen konkrét megoldása a teljes egyenletnek,
            amely a külső gerjesztés (<M t="Q(x)" />) hatását mutatja.
          </li>
        </ul>

        <HomogeneousInhomogeneousDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Ha tudod, hogy az <M t="y' + 4y = 12" /> egyenlet egy partikuláris megoldása az <M t="y_p \equiv 3" /> konstans, írd fel integrálás nélkül az <strong>általános megoldást</strong>!</>}
        >
          <p>
            A homogén <M t="y'+4y=0" /> megoldása <M t="y_h = Ce^{-4x}" />, így az általános megoldás azonnal{' '}
            <M t="\mathbf{y = 3 + Ce^{-4x}}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Ha <M t="y_1" /> és <M t="y_2" /> két különböző megoldása ugyanannak az <M t="y'+P(x)y=Q(x)" /> egyenletnek, milyen egyenletet elégít ki a különbségük (<M t="w = y_1 - y_2" />)?</>}
        >
          <p>
            <M t="w' + P w = (y_1'+Py_1) - (y_2'+Py_2) = Q - Q = \mathbf{0}" /> — tehát a különbségük a{' '}
            <strong>homogén egyenlet</strong> megoldása!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Bónusz: a Bernoulli-egyenlet (rejtett linearitás)',
    body: (
      <>
        <p>
          Vannak olyan első ránézésre <em>nemlineáris</em> egyenletek, amelyek egyetlen ügyes helyettesítéssel
          elsőrendű lineáris egyenletté válnak! A leghíresebb a <strong>Bernoulli-egyenlet</strong> (Thomas 9.2):
        </p>
        <M block t="\frac{dy}{dx} + P(x)y = Q(x)y^n \qquad (n \neq 0, 1)." />
        <p>
          Az <M t="u = y^{1-n}" /> helyettesítéssel <M t="u' = (1-n)y^{-n}y'" />, amiből a szuper-tiszta lineáris
          egyenlet adódik:
        </p>
        <M block t="\frac{du}{dx} + (1-n)P(x)u = (1-n)Q(x)." />

        <BernoulliTransformDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Milyen <M t="u" /> helyettesítéssel válik lineárissá az <M t="y' + \frac{1}{x}y = x y^3" /> Bernoulli-egyenlet, és mi lesz a lineáris egyenlet <M t="u" />-ra?</>}
        >
          <p>
            <M t="n=3 \implies u = y^{1-3} = y^{-2}" />. Mivel <M t="1-n = -2" />, a lineáris egyenlet:{' '}
            <M t="\mathbf{u' - \frac{2}{x}u = -2x}" />!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Oldd meg az <M t="y' - y = e^{-x} y^2" /> Bernoulli-egyenletet (Thomas példája)!</>}
        >
          <p>
            <M t="n=2 \Rightarrow u = y^{-1}" />, innen <M t="u' + u = -e^{-x}" />. Integráló tényező{' '}
            <M t="v=e^x" />: <M t="(e^x u)' = -1 \implies e^x u = -x + C \implies u = (C-x)e^{-x}" />.
            Visszaírva: <M t="\mathbf{y = \frac{e^x}{C-x}}" /> (plusz az <M t="y\equiv 0" /> egyensúly!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <FirstOrderDEChoiceDiagram />

        <Def title="9.2 Puskakártya — Minden képlet egy helyen">
          <ul>
            <li>
              <strong>Standard alak:</strong> <M t="y' + P(x)y = Q(x)" /> (először oszd le <M t="y'" /> együtthatóját!).
            </li>
            <li>
              <strong>Integráló tényező:</strong> <M t="v(x) = e^{\int P(x)\,dx}" /> (a kitevőben +0 elég!).
            </li>
            <li>
              <strong>Megoldás:</strong> <M t="(v(x)y)' = v(x)Q(x) \implies y(x) = \frac{1}{v(x)}\left(\int v(x)Q(x)\,dx + C\right)" />.
            </li>
            <li>
              <strong>RL-kör:</strong> <M t="i(t) = \frac{V}{R}(1 - e^{-t/\tau}),\; \tau = L/R" />.
            </li>
            <li>
              <strong>Bernoulli (<M t="y'+Py=Qy^n" />):</strong> <M t="u = y^{1-n} \implies u' + (1-n)Pu = (1-n)Q" />.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 9.2-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Elfelejteni standard alakra hozni az egyenletet (pl. <M t="xy'+3y=x^2" />-nél <M t="P=3" />-at venni <M t="3/x" /> helyett!).</li>
            <li>Elfelejteni a negatív előjelet <M t="P(x)" />-ben (pl. <M t="y'-2y=e^x" />-nél <M t="P = -2" />, nem <M t="+2" />!).</li>
            <li>Az <M t="e^{-\ln x} = \frac{1}{x}" /> egyszerűsítés elrontása (gyakori hiba: <M t="-x" />-et írni helyette!).</li>
            <li>A <M t="+C" /> konstanst nem elosztani <M t="v(x)" />-szel a végső lépésben.</li>
            <li>A keverési feladatnál nem észrevenni, ha a térfogat változik (<M t="r_{\text{be}}\neq r_{\text{ki}}" />).</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Oldd meg az <M t="y' + y = e^x" /> egyenletet!</>}
        >
          <p>
            <M t="v(x)=e^x" />: <M t="(e^x y)' = e^{2x} \implies e^x y = \frac{1}{2}e^{2x} + C \implies \mathbf{y = \frac{1}{2}e^x + Ce^{-x}}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Oldd meg az <M t="y' - 2y = 4,\; y(0) = 1" /> kezdetiérték-problémát!</>}
        >
          <p>
            <M t="v(x)=e^{-2x}" />: <M t="e^{-2x}y = -2e^{-2x} + C \implies y = -2 + Ce^{2x}" />. Mivel{' '}
            <M t="y(0)=1" />, <M t="C=3" />, tehát <M t="\mathbf{y = 3e^{2x} - 2}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Oldd meg az <M t="xy' + y = 2x,\; x>0,\; y(1) = 3" /> egyenletet!</>}
        >
          <p>
            Már kész a szorzatszabály: <M t="(xy)' = 2x \implies xy = x^2 + C \implies y = x + \frac{C}{x}" />.
            Mivel <M t="y(1)=3" />, <M t="C=2" />, tehát <M t="\mathbf{y = x + \frac{2}{x}}" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Oldd meg az <M t="y' + (\operatorname{tg} x)y = \cos^2 x,\; -\frac{\pi}{2}<x<\frac{\pi}{2}" /> egyenletet!</>}
        >
          <p>
            <M t="v(x) = e^{\int \operatorname{tg} x\,dx} = e^{-\ln\cos x} = \sec x" />. Szorozva:{' '}
            <M t="(y\sec x)' = \cos x \implies y\sec x = \sin x + C \implies \mathbf{y = \sin x\cos x + C\cos x}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={<>Oldd meg a <M t="\theta\frac{dy}{d\theta} + y = \sin\theta,\; \theta>0,\; y(\pi/2) = 1" /> egyenletet (Thomas 17. feladat)!</>}
        >
          <p>
            <M t="(\theta y)' = \sin\theta \implies \theta y = -\cos\theta + C" />. Mivel <M t="y(\pi/2)=1" />,{' '}
            <M t="\frac{\pi}{2} = 0 + C \Rightarrow C = \frac{\pi}{2}" />, tehát{' '}
            <M t="\mathbf{y = \frac{\pi/2 - \cos\theta}{\theta}}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={<>Oldd meg az <M t="y' + 2xy = 2x,\; y(0) = 4" /> egyenletet!</>}
        >
          <p>
            <M t="v(x) = e^{x^2}" />: <M t="(e^{x^2}y)' = 2xe^{x^2} \implies e^{x^2}y = e^{x^2} + C \implies y = 1 + Ce^{-x^2}" />.
            Mivel <M t="y(0)=4" />, <M t="C=3" />, tehát <M t="\mathbf{y = 1 + 3e^{-x^2}}" />.
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Oldd meg a <M t="\theta\frac{dy}{d\theta} - 2y = \theta^3\sec\theta\operatorname{tg}\theta,\; \theta>0,\; y(\pi/3) = 2" /> egyenletet (Thomas 18. feladat)!</>}
        >
          <p>
            Standard alak: <M t="y' - \frac{2}{\theta}y = \theta^2\sec\theta\operatorname{tg}\theta" />,{' '}
            <M t="v(\theta) = \theta^{-2}" />. Ekkor <M t="(\theta^{-2}y)' = \sec\theta\operatorname{tg}\theta \implies \theta^{-2}y = \sec\theta + C" />.
            <M t="\theta=\pi/3" />-nál <M t="\sec(\pi/3)=2" />, így <M t="\frac{2}{\pi^2/9} = 2 + C \Rightarrow C = \frac{18}{\pi^2} - 2" />,{' '}
            <M t="y = \theta^2\left(\sec\theta + \frac{18}{\pi^2} - 2\right)" />.
          </p>
        </Task>
        <Task
          n={22}
          q={<>Oldd meg az <M t="y' + y = \cos x" /> egyenletet!</>}
        >
          <p>
            <M t="v(x)=e^x" />: <M t="e^x y = \int e^x\cos x\,dx = \frac{1}{2}e^x(\sin x + \cos x) + C" /> (8.2 bumeráng-trükk!),
            innen <M t="\mathbf{y = \frac{1}{2}(\sin x + \cos x) + Ce^{-x}}" />.
          </p>
        </Task>
        <Task
          n={23}
          q={<>Oldd meg a <M t="xy' + y = x^2 y^2,\; x>0,\; y(1) = 1" /> Bernoulli-egyenletet!</>}
        >
          <p>
            Standard alak: <M t="y' + \frac{1}{x}y = x y^2" /> (<M t="n=2" />). <M t="u = y^{-1}" /> adja{' '}
            <M t="u' - \frac{1}{x}u = -x" />. Integráló tényező <M t="v=x^{-1}" />:{' '}
            <M t="(u/x)' = -1 \implies u = -x^2 + Cx" />. Mivel <M t="u(1)=1" />, <M t="C=2" />, tehát{' '}
            <M t="\mathbf{y = \frac{1}{2x - x^2}}" />.
          </p>
        </Task>

        <h3>Kiegészítő mintapélda és gyorsteszt</h3>
        <Steps
          title="Lineáris kezdetiérték-probléma exponenciális gerjesztéssel"
          source="Analízis-labor"
          problem={
            <>
              Oldjuk meg az <M t="y' + 2y = 6e^x" />, <M t="y(0) = 5" /> lineáris kezdetiérték-problémát!
            </>
          }
          steps={[
            {
              title: 'Integráló tényező meghatározása',
              body: (
                <p>
                  Itt <M t="P(x) = 2" />, így az integráló tényező <M t="v(x) = e^{\int 2\,dx} = e^{2x}" />.
                </p>
              ),
            },
            {
              title: 'Beszorzás és integrálás',
              body: (
                <p>
                  <M t="(e^{2x}y)' = 6e^{3x} \implies e^{2x}y = 2e^{3x} + C \implies y = 2e^x + Ce^{-2x}" />.
                </p>
              ),
            },
            {
              title: 'Kezdeti feltétel alkalmazása',
              body: (
                <p>
                  <M t="y(0) = 5 \implies 5 = 2 + C \implies C = 3" />, tehát a megoldás <M t="\mathbf{y(x) = 2e^x + 3e^{-2x}}" />.
                </p>
              ),
            },
          ]}
        />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="xy' + 3y = x^2" /> (<M t="x > 0" />) egyenlet standard alakjának integráló tényezője?
            </>
          }
          options={[
            { label: <M t="v(x) = x^3" />, ok: true },
            { label: <M t="v(x) = e^{3x}" /> },
            { label: <M t="v(x) = 3\ln x" /> },
            { label: <M t="v(x) = x^{-3}" /> },
          ]}
          explain={
            <>
              Standard alak: <M t="y' + \dfrac{3}{x}y = x" />, így <M t="v(x) = e^{\int (3/x)\,dx} = e^{3\ln x} = x^3" />.
            </>
          }
        />
      </>
    ),
  },
];
