import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AxIntegralAreaWidget,
  AxSlopeAtZeroWidget,
  BaseEandBaseAMatrixDiagram,
  GeneralPowerLabWidget,
  LogBaseFamilyWidget,
  LogBaseMirrorWidget,
  LogScalesRealWorldWidget,
  X2vs2XIntersectionWidget,
} from '../components/Widgets74';
import type { Page } from './s1_1';

export const S7_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Az aᵘ exponenciális függvény deriváltja — miért jelenik meg az ln a szorzó?',
    body: (
      <>
        <Story>
          <p>
            Az informatika a <M t="2^x" />-et szereti, a kémia és a mérnökök a <M t="10^x" />-et, a matematika pedig az <M t="e^x" />-et. A 7.3-ban már megadtuk az <M t="a^x = e^{x\ln a}" /> hidat — most egyetlen sorban levezetjük belőle bármely <M t="a > 0" /> alapú exponenciális függvény deriváltját, és kiderül, miért pont az <M t="e" /> szám a „természetes” alap!
          </p>
        </Story>

        <Def title="Az aˣ és aᵘ deriválási szabálya (a > 0)">
          <p>Mivel <M t="a^x = e^{x\ln a}" />, a láncszabály szerint <M t="\dfrac{d}{dx}(a^x) = e^{x\ln a}\cdot\ln a = a^x\ln a" />. Általánosabban, differenciálható <M t="u(x)" /> esetén:</p>
          <M block t="\frac{d}{dx}\bigl(a^x\bigr) \;=\; a^x\ln a, \qquad \frac{d}{dx}\bigl(a^u\bigr) \;=\; a^u\ln a\cdot\frac{du}{dx}." />
          <ul>
            <li><strong>Monotonitás:</strong> ha <M t="a > 1" />, akkor <M t="\ln a > 0 \implies (a^x)' > 0" /> (szigorúan növekvő); ha <M t="0 < a < 1" />, akkor <M t="\ln a < 0 \implies (a^x)' < 0" /> (szigorúan csökkenő).</li>
            <li><strong>Konvexitás:</strong> <M t="(a^x)'' = (\ln a)^2 a^x > 0" /> minden <M t="a \ne 1" /> esetén ⇒ a grafikon <em>mindkét esetben</em> alulról konvex!</li>
          </ul>
        </Def>

        <AxSlopeAtZeroWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Deriváld: (a) <M t="y = 3^x" />, (b) <M t="y = 3^{-x}" />, (c) <M t="y = 3^{\sin x}" /> (Thomas 1. példa)!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{3^x\ln 3}" />; (b) <M t="y' = \mathbf{-3^{-x}\ln 3}" />; (c) <M t="y' = \mathbf{3^{\sin x}(\ln 3)\cos x}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Írd fel az <M t="f(x) = 2^x" /> függvény linearizációját (érintőjét) az <M t="x = 0" /> helyen (Thomas 85. feladat)!
            </>
          }
        >
          <p>
            <M t="f(0) = 1" />, <M t="f'(0) = 2^0\ln 2 = \ln 2 \approx 0{,}69" />. Tehát <M t="L(x) = \mathbf{1 + (\ln 2)x \approx 1 + 0{,}69x}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Az aᵘ függvény integrálja',
    body: (
      <>
        <Story>
          <p>
            Ha deriváláskor megszorozzuk <M t="a^u" />-t az <M t="\ln a" /> konstanssal, akkor integráláskor (visszafelé!) pontosan <strong>el kell osztanunk</strong> <M t="\ln a" />-val!
          </p>
        </Story>

        <Def title="Az aˣ és aᵘ integrálási szabálya (a > 0, a ≠ 1)">
          <M block t="\int a^x\,dx \;=\; \frac{a^x}{\ln a} + C, \qquad \int a^u\,du \;=\; \frac{a^u}{\ln a} + C." />
          <p><em>(Ellenőrzés deriválással: <M t="\left(\frac{a^u}{\ln a}\right)' = \frac{a^u\ln a\cdot u'}{\ln a} = a^u u'" /> ✓)</em></p>
        </Def>

        <AxIntegralAreaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: (a) <M t="\displaystyle\int 2^{\sin x}\cos x\,dx" />, (b) <M t="\displaystyle\int_{1}^{4} \frac{2^{\sqrt{x}}}{\sqrt{x}}\,dx" />!
            </>
          }
        >
          <p>
            (a) <M t="u = \sin x,\; du = \cos x\,dx \implies \mathbf{\dfrac{2^{\sin x}}{\ln 2} + C}" />.
          </p>
          <p>
            (b) <M t="u = \sqrt{x} \implies \frac{dx}{\sqrt{x}} = 2\,du" />, határok <M t="1 \to 2" />:
            <M block t="2\int_{1}^{2} 2^u\,du = 2\left[\frac{2^u}{\ln 2}\right]_{1}^{2} = \frac{2(4 - 2)}{\ln 2} = \mathbf{\frac{4}{\ln 2}}." />
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki az <M t="y = 2^{1-x}" /> görbe és az <M t="x" />-tengely közötti területet a <M t="[-1;\,1]" /> intervallumon (Thomas 76. feladat)!
            </>
          }
        >
          <p>
            <M t="u = 1 - x \implies dx = -du" />, határok <M t="2 \to 0" />:
            <M block t="\int_{-1}^{1} 2^{1-x}\,dx = \int_{0}^{2} 2^u\,du = \left[\frac{2^u}{\ln 2}\right]_{0}^{2} = \mathbf{\frac{3}{\ln 2}} \approx 4{,}33." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Az a alapú logaritmus (logₐ x) és az alapváltási képlet',
    body: (
      <>
        <Story>
          <p>
            Mivel az <M t="y = a^x" /> függvény minden <M t="a > 0,\; a \ne 1" /> alapra szigorúan monoton (tehát injektív!), a 7.1 alapján létezik az egyértelmű, differenciálható inverze — ez az <strong><M t="a" /> alapú logaritmusfüggvény (<M t="\log_a x" />)</strong>!
          </p>
        </Story>

        <Def title="A logₐ x definíciója és az alapváltási képlet (a > 0, a ≠ 1)">
          <ul>
            <li><strong>Definíció:</strong> <M t="\log_a x" /> az <M t="a^x" /> exponenciális függvény inverze, tehát:
              <M block t="a^{\log_a x} = x \;\;(x > 0), \qquad \log_a(a^x) = x \;\;(\forall\,x \in \mathbb{R})." />
            </li>
            <li><strong>Alapváltási képlet:</strong> vegyük az <M t="a^{\log_a x} = x" /> mindkét oldalának természetes logaritmusát (<M t="\log_a x \cdot \ln a = \ln x" />):
              <M block t="\log_a x \;=\; \frac{\ln x}{\ln a} \;=\; \frac{1}{\ln a}\cdot\ln x." />
            </li>
          </ul>
        </Def>

        <p>
          Az alapváltási képlet hihetetlenül erős: megmutatja, hogy <strong>bármely <M t="\log_a x" /> függvény egyszerűen az <M t="\ln x" /> függvény <M t="\frac{1}{\ln a}" />-szorosa!</strong> Emiatt a 7.2-ben bizonyított 4 logaritmusszabály (szorzat, hányados, reciprok, hatvány) egyetlen osztással öröklődik minden <M t="a" /> alapra!
        </p>

        <LogBaseMirrorWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki: (a) <M t="\log_2(2^5)" />, (b) <M t="10^{\log_{10} 4}" />, (c) igazold, hogy <M t="\log_a b = \dfrac{1}{\log_b a}" /> (<M t="a,b > 0,\; a,b \ne 1" />, Thomas 82. feladat)!
            </>
          }
        >
          <p>
            (a) <M t="\mathbf{5}" />; (b) <M t="\mathbf{4}" />; (c) az alapváltási képlettel: <M t="\log_a b = \dfrac{\ln b}{\ln a} = \dfrac{1}{\ln a / \ln b} = \mathbf{\dfrac{1}{\log_b a}}" /> ✓
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Fejezd ki <M t="\ln" />-nel és becsüld meg: <M t="\log_3 8" /> (ha <M t="\ln 2 \approx 0{,}693,\; \ln 3 \approx 1{,}099" />)!
            </>
          }
        >
          <p>
            <M t="\log_3 8 = \dfrac{\ln 8}{\ln 3} = \dfrac{3\ln 2}{\ln 3} \approx \dfrac{2{,}079}{1{,}099} \approx \mathbf{1{,}893}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A logₐ u deriválása és logaritmusos integrálok',
    body: (
      <>
        <Story>
          <p>
            Mivel <M t="\log_a u = \dfrac{1}{\ln a}\cdot\ln u" />, az <M t="\frac{1}{\ln a}" /> egyszerű konstans szorzó — így deriváláskor és integráláskor is csak ki kell emelnünk elé!
          </p>
        </Story>

        <Def title="A logₐ u deriváltja (u > 0, a > 0, a ≠ 1)">
          <M block t="\frac{d}{dx}\bigl(\log_a x\bigr) \;=\; \frac{1}{x\ln a}, \qquad \frac{d}{dx}\bigl(\log_a u\bigr) \;=\; \frac{1}{\ln a}\cdot\frac{1}{u}\cdot\frac{du}{dx}." />
          <p>
            <strong>Aranyszabály integráláshoz:</strong> ha az integrandusban <M t="\log_a u" /> szerepel, első lépésként mindig írd át <M t="\dfrac{\ln u}{\ln a}" /> alakra!
          </p>
        </Def>

        <LogBaseFamilyWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Deriváld: (a) <M t="y = \log_{10}(3x + 1)" />, (b) <M t="y = \log_2\sqrt{x^2 + 1}" />!
            </>
          }
        >
          <p>
            (a) <M t="y' = \dfrac{1}{\ln 10}\cdot\dfrac{3}{3x+1} = \mathbf{\dfrac{3}{(3x+1)\ln 10}}" />.
          </p>
          <p>
            (b) Először hatványszabály: <M t="y = \frac{1}{2}\log_2(x^2+1) \implies y' = \frac{1}{2\ln 2}\cdot\frac{2x}{x^2+1} = \mathbf{\dfrac{x}{(x^2+1)\ln 2}}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki a <M t="\displaystyle\int \frac{\log_2 x}{x}\,dx" /> integrált (Thomas 5b példa)!
            </>
          }
        >
          <p>
            Átírva <M t="\log_2 x = \frac{\ln x}{\ln 2}" />, majd <M t="u = \ln x,\; du = \frac{1}{x}\,dx" />:
            <M block t="\frac{1}{\ln 2}\int \frac{\ln x}{x}\,dx = \frac{1}{\ln 2}\int u\,du = \frac{u^2}{2\ln 2} + C = \mathbf{\frac{(\ln x)^2}{2\ln 2} + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Kettős változós hatványok (u(x)ᵛ⁽ˣ⁾) — két biztos módszer',
    body: (
      <>
        <Story>
          <p>
            Mi van az olyan „hibrid” függvényekkel, mint <M t="y = x^x" />, <M t="y = x^{\sin x}" /> vagy <M t="y = (x+1)^x" />, ahol <strong>az alap is és a kitevő is függ <M t="x" />-től</strong>? Sem a hatványszabály, sem az exponenciális szabály nem működik önmagában — de két biztos módszerünk is van!
          </p>
        </Story>

        <Def title="Két egyenértékű módszer y = u(x)ᵛ⁽ˣ⁾ (u > 0) deriválására">
          <ol className="steps">
            <li>
              <strong>Exponenciális átírás:</strong> írd fel <M t="y = e^{v(x)\ln u(x)}" /> alakban, és deriváld láncszabállyal + szorzatszabállyal!
            </li>
            <li>
              <strong>Logaritmusos deriválás:</strong> vedd mindkét oldal <M t="\ln" />-jét (<M t="\ln y = v(x)\ln u(x)" />), deriválj implicit módon (<M t="\frac{y'}{y} = v'\ln u + v\frac{u'}{u}" />), majd szorozz be <M t="y" />-nal!
            </li>
          </ol>
        </Def>

        <GeneralPowerLabWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Deriváld az <M t="y = x^{\ln x}" /> (<M t="x > 0" />) függvényt!
            </>
          }
        >
          <p>
            <M t="\ln y = (\ln x)\cdot(\ln x) = (\ln x)^2" />. Mindkét oldalt deriválva:
            <M block t="\frac{y'}{y} = 2\ln x\cdot\frac{1}{x} \;\implies\; y' = \mathbf{\frac{2\ln x}{x}\,x^{\ln x}}." />
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Igaz-e, hogy létezik olyan <M t="x > 0" />, amelyre <M t="x^{\ln 2} = 2^{\ln x}" /> (Thomas 84. feladat)?
            </>
          }
        >
          <p>
            Nemcsak hogy létezik — <strong>MINDEN <M t="x > 0" />-ra azonosan igaz!</strong> Ugyanis <M t="x^{\ln 2} = e^{(\ln 2)(\ln x)}" /> és <M t="2^{\ln x} = e^{(\ln x)(\ln 2)}" />, a szorzás kommutativitása miatt a kettő pontosan ugyanaz a függvény!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A 10-es alapú logaritmus a való életben: Richter, decibel és pH',
    body: (
      <>
        <Story>
          <p>
            Miért nem lineáris skálán mérjük a földrengéseket, a hangerőt vagy a kémiai savasságot? Mert egy nagy földrengés nem 2-szer, hanem akár <strong>milliószor</strong> erősebb egy kicsinél! A 10-es alapú logaritmus (<M t="\log_{10}" />) a hatalmas szorzókat kezelhető, 1-től 10-ig terjedő számokká szelídíti!
          </p>
        </Story>

        <Def title="Három klasszikus logaritmikus skála">
          <ul>
            <li><strong>Richter-skála (földrengés):</strong> <M t="R = \log_{10}\!\left(\dfrac{a}{T}\right) + B" /> — minden <strong>+1 fokozat = 10×</strong> nagyobb kilengés!</li>
            <li><strong>Decibel-skála (hangerősség):</strong> <M t="\beta = 10\log_{10}\!\left(\dfrac{I}{I_0}\right)" /> — minden <strong>+10 dB = 10×</strong> nagyobb hangintenzitás!</li>
            <li><strong>pH-skála (kémiai savasság):</strong> <M t="\text{pH} = -\log_{10}[\text{H}_3\text{O}^+]" /> — minden <strong>−1 pH = 10×</strong> nagyobb savkoncentráció!</li>
          </ul>
        </Def>

        <LogScalesRealWorldWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Hányszorosára kell növelni egy hang intenzitását ahhoz, hogy a hangerősség <strong>20 decibellel</strong> nőjön (vö. Thomas 79. feladat)?
            </>
          }
        >
          <p>
            <M t="\Delta\beta = 10\log_{10}(I_2/I_1) = 20 \implies \log_{10}(I_2/I_1) = 2 \implies I_2/I_1 = 10^2 = \mathbf{100}" />-szorosára!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Az agyfolyadék oxóniumion-koncentrációja <M t="[\text{H}_3\text{O}^+] \approx 4{,}8\cdot 10^{-8}" /> mol/l. Mennyi a pH-ja (Thomas 78. feladat, <M t="\log_{10}(4{,}8)\approx 0{,}68" />)?
            </>
          }
        >
          <p>
            <M t="\text{pH} = -\log_{10}(4{,}8\cdot 10^{-8}) = -(\log_{10} 4{,}8 - 8) = 8 - 0{,}68 = \mathbf{7{,}32}" /> (enyhén lúgos).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Szimmetria-mátrix és a híres x² = 2ˣ egyenlet három megoldása',
    body: (
      <>
        <Story>
          <p>
            Mielőtt az összefoglaló gyakorlóblokkba ugranánk, tegyük egymás mellé egyetlen átlátható táblázatba az összes <M t="e" />-alapú és <M t="a" />-alapú képletet — majd nézzünk meg egy híres grafikus meglepetést (<M t="x^2 = 2^x" />)!
          </p>
        </Story>

        <BaseEandBaseAMatrixDiagram />
        <X2vs2XIntersectionWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{2} \frac{\log_2(x + 2)}{x + 2}\,dx" /> (Thomas 65. feladat)!
            </>
          }
        >
          <p>
            Legyen <M t="u = \ln(x+2) \implies du = \frac{dx}{x+2}" />, a határok <M t="\ln 2 \to \ln 4 = 2\ln 2" />:
            <M block t="\frac{1}{\ln 2}\int_{\ln 2}^{2\ln 2} u\,du = \frac{1}{2\ln 2}\bigl[4(\ln 2)^2 - (\ln 2)^2\bigr] = \mathbf{\frac{3}{2}\ln 2}." />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Igazold, hogy <M t="\displaystyle\int \frac{1}{x\log_{10} x}\,dx = (\ln 10)\ln|\ln x| + C" /> (Thomas 68. feladat)!
            </>
          }
        >
          <p>
            Mivel <M t="\frac{1}{\log_{10} x} = \frac{\ln 10}{\ln x}" />, az <M t="u = \ln x,\; du = \frac{dx}{x}" /> helyettesítéssel:
            <M block t="\int \frac{\ln 10}{x\ln x}\,dx = (\ln 10)\int\frac{du}{u} = \mathbf{(\ln 10)\ln|\ln x| + C}." />
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
        <Def title="7.4 Puskakártya">
          <ul>
            <li><strong><M t="a^u" /> deriválása és integrálása:</strong> <M t="(a^u)' = a^u(\ln a)u'" /> · <M t="\int a^u\,du = \dfrac{a^u}{\ln a} + C" /> (<M t="a>0, a\ne 1" />).</li>
            <li><strong>Alapváltás és <M t="\log_a u" /> deriválása:</strong> <M t="\log_a u = \dfrac{\ln u}{\ln a}" /> · <M t="(\log_a u)' = \dfrac{u'}{u\ln a}" />.</li>
            <li><strong>Kettős változós hatvány:</strong> <M t="u(x)^{v(x)} = e^{v(x)\ln u(x)}" /> (vagy logaritmusos deriválás!).</li>
            <li><strong>10-es alapú skálák:</strong> Richter, decibel (<M t="10\log_{10}(I/I_0)" />), pH (<M t="-\log_{10}[\text{H}_3\text{O}^+]" />).</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Elfelejtett <M t="\ln a" /> tényező:</strong> <M t="(2^x)' = 2^x\ln 2" />, NEM <M t="2^x" />! Csak <M t="a = e" />-nél egyenlő <M t="\ln a" /> eggyel!
            </li>
            <li>
              <strong>Szorzás vs. osztás <M t="\ln a" />-val:</strong> <M t="(a^x)'" />-nél <em>szorzol</em>, <M t="\int a^x" />-nél és <M t="(\log_a x)'" />-nél <em>osztasz</em> <M t="\ln a" />-val!
            </li>
            <li>
              <strong><M t="0 < a < 1" /> esetén <M t="\ln a < 0" />:</strong> ilyenkor <M t="a^x" /> és <M t="\log_a x" /> is csökkenő, negatív deriváltú!
            </li>
            <li>
              <strong><M t="\log_a x" /> integrálja NEM <M t="\frac{1}{x\ln a}" />:</strong> az a deriváltja! Az integrálja <M t="\frac{x\ln x - x}{\ln a} + C" />.
            </li>
            <li>
              <strong><M t="(x+1)^x" /> nem hatványfüggvény és nem sima exponenciális:</strong> mindig írd át <M t="e^{x\ln(x+1)}" />-re vagy vegyél <M t="\ln" />-t!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Deriváld: (a) <M t="y = 5^{2x}" />, (b) <M t="y = \log_3(1 + \theta\ln 3)" />!
            </>
          }
        >
          <p>
            (a) <M t="y' = \mathbf{2\cdot 5^{2x}\ln 5}" />; (b) <M t="y' = \frac{1}{\ln 3}\cdot\frac{\ln 3}{1 + \theta\ln 3} = \mathbf{\dfrac{1}{1 + \theta\ln 3}}" />!
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1} 2^{-\theta}\,d\theta" /> (Thomas 49. feladat)!
            </>
          }
        >
          <p>
            <M t="\left[-\dfrac{2^{-\theta}}{\ln 2}\right]_{0}^{1} = -\dfrac{1/2}{\ln 2} + \dfrac{1}{\ln 2} = \mathbf{\dfrac{1}{2\ln 2}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Egyszerűsítsd: <M t="y = \log_2(8^t)" />, majd deriváld <M t="t" /> szerint!
            </>
          }
        >
          <p>
            <M t="8^t = 2^{3t} \implies y = \log_2(2^{3t}) = 3t \implies y' = \mathbf{3}" />!
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{4} \frac{\log_2 x}{x}\,dx" /> (Thomas 62. feladat)!
            </>
          }
        >
          <p>
            A 8. feladat primitív függvényével:
            <M block t="\left[\frac{(\ln x)^2}{2\ln 2}\right]_{1}^{4} = \frac{(\ln 4)^2 - 0}{2\ln 2} = \frac{(2\ln 2)^2}{2\ln 2} = \mathbf{2\ln 2 = \ln 4}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2} 7^{\cos t}\sin t\,dt" /> (Thomas 52. feladat)!
            </>
          }
        >
          <p>
            Legyen <M t="u = \cos t \implies du = -\sin t\,dt" />, határok <M t="1 \to 0" />:
            <M block t="-\int_{1}^{0} 7^u\,du = \int_{0}^{1} 7^u\,du = \left[\frac{7^u}{\ln 7}\right]_{0}^{1} = \mathbf{\frac{6}{\ln 7}}." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Deriváld logaritmusos deriválással: <M t="y = (\sin x)^x" /> (<M t="0 < x < \pi" />, Thomas 43. feladat)!
            </>
          }
        >
          <p>
            <M t="\ln y = x\ln(\sin x) \implies \dfrac{y'}{y} = \ln(\sin x) + x\dfrac{\cos x}{\sin x} = \ln(\sin x) + x\operatorname{ctg} x" />. Beszorozva <M t="y" />-nal:
            <M block t="y' = \mathbf{(\sin x)^x\bigl(\ln(\sin x) + x\operatorname{ctg} x\bigr)}." />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Integrál logaritmus-négyzettel (Thomas 70. feladat):</em> Számítsd ki <M t="\displaystyle\int \frac{dx}{x(\log_8 x)^2}" /> értékét!
            </>
          }
        >
          <p>
            Írjuk át <M t="\log_8 x = \frac{\ln x}{\ln 8}" />, így <M t="\frac{1}{(\log_8 x)^2} = \frac{(\ln 8)^2}{(\ln x)^2}" />. Legyen <M t="u = \ln x,\; du = \frac{dx}{x}" />:
            <M block t="(\ln 8)^2\int u^{-2}\,du = -(\ln 8)^2 u^{-1} + C = \mathbf{-\frac{(\ln 8)^2}{\ln x} + C = -\frac{\ln 8}{\log_8 x} + C}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Miért pH = 7 a semleges pont? (Thomas 81. feladat):</em> Minden vizes oldatban <M t="[\text{H}_3\text{O}^+]\cdot[\text{OH}^-] = 10^{-14}" />. Melyik <M t="x = [\text{H}_3\text{O}^+]" /> koncentrációnál (és pH-nál) lesz minimális az <M t="S(x) = x + \dfrac{10^{-14}}{x}" /> összeg?
            </>
          }
        >
          <p>
            <M t="S'(x) = 1 - \dfrac{10^{-14}}{x^2} = 0 \implies x^2 = 10^{-14} \implies x = \mathbf{10^{-7}\text{ mol/l}}" /> (mivel <M t="S''(x) = \frac{2\cdot 10^{-14}}{x^3} > 0" />, ez abszolút minimum!). Ekkor <M t="\text{pH} = -\log_{10}(10^{-7}) = \mathbf{7}" />, és <M t="[\text{H}_3\text{O}^+]/[\text{OH}^-] = \mathbf{1}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Linearizáció (Thomas 86. feladat):</em> Add meg az <M t="f(x) = \log_3 x" /> függvény linearizációját az <M t="x = 3" /> helyen, és becsüld meg vele <M t="\log_3(3{,}1)" /> értékét (<M t="\ln 3 \approx 1{,}0986" />)!
            </>
          }
        >
          <p>
            <M t="f(3) = \log_3 3 = 1" />, <M t="f'(x) = \dfrac{1}{x\ln 3} \implies f'(3) = \dfrac{1}{3\ln 3} \approx 0{,}3034" />. A linearizáció:
            <M block t="L(x) = 1 + \frac{1}{3\ln 3}(x - 3) \approx 1 + 0{,}3034(x - 3)." />
            Így <M t="\log_3(3{,}1) \approx 1 + 0{,}3034\cdot 0{,}1 = \mathbf{1{,}0303}" /> (a pontos érték <M t="1{,}0298" />!).
          </p>
        </Task>
      </>
    ),
  },
];
