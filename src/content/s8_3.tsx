import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  FourCasesTemplateDiagram,
  FullPipelineFlowDiagram,
  HeavisideCoverUpWidget,
  HiddenRationalCheatDiagram,
  LogisticCurvePreviewWidget,
  PartialFractionSumWidget,
  QuadraticFactorSplitDiagram,
  RepeatedRootCompareWidget,
} from '../components/Widgets83';
import type { Page } from './s1_1';

export const S8_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Mi az a parciális törtekre bontás? — A közös nevező megfordítása',
    body: (
      <>
        <Story>
          <p>
            Közös nevezőre hozni két törtet már általános iskolában megtanultál: <M t="\frac{2}{x+1} + \frac{3}{x-3} = \frac{5x-3}{x^2-2x-3}" />. Az integrálásban viszont épp az ellenkezőjére van szükségünk: a bonyolult törtet <strong>visszabontjuk egyszerű résztörtek (parciális törtek) összegére</strong>, mert minden résztört azonnal integrálható!
          </p>
        </Story>

        <Def title="A parciális törtekre bontás alapelve">
          <ul>
            <li><strong>0. lépés (kötelező ellenőrzés!):</strong> Ha a racionális tört <M t="\frac{P(x)}{Q(x)}" /> nem valódi (<M t="\deg P \ge \deg Q" />), akkor <strong>először végezz maradékos polinomosztást!</strong></li>
            <li><strong>1. lépés:</strong> Bontsd a <M t="Q(x)" /> nevezőt valós lineáris (<M t="x-r" />) és valós gyök nélküli másodfokú (<M t="ax^2+bx+c,\; \Delta < 0" />) tényezők szorzatára!</li>
            <li><strong>2. lépés:</strong> Írd fel a résztörtek összegét ismeretlen <M t="A, B, C, \dots" /> együtthatókkal, majd határozd meg őket!</li>
          </ul>
        </Def>

        <PartialFractionSumWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Bontsd parciális törtekre és integráld: <M t="\displaystyle\int \frac{5x - 3}{x^2 - 2x - 3}\,dx" />!
            </>
          }
        >
          <p>
            <M t="x^2 - 2x - 3 = (x+1)(x-3)" />. Felbontás: <M t="\frac{2}{x+1} + \frac{3}{x-3}" />. Integrálva:
            <M block t="\mathbf{2\ln|x + 1| + 3\ln|x - 3| + C}." />
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{x^2 - 4}" />!
            </>
          }
        >
          <p>
            <M t="\dfrac{1}{(x-2)(x+2)} = \dfrac{1/4}{x-2} - \dfrac{1/4}{x+2}" />. Integrálva: <M t="\mathbf{\dfrac{1}{4}\ln\left|\dfrac{x - 2}{x + 2}\right| + C}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A 4 felbontási eset teljes térképe',
    body: (
      <>
        <Story>
          <p>
            Az algebra alaptétele garantálja, hogy <strong>minden</strong> valós együtthatós polinom felbontható elsőfokú és irreducibilis (<M t="\Delta < 0" />) másodfokú tényezőkre — tehát a parciális törtekre bontásnak <strong>összesen csak 4 alapesete</strong> létezik!
          </p>
        </Story>

        <FourCasesTemplateDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Írd fel a parciális törtekre bontás sablonját (az együtthatók kiszámítása nélkül!): <M t="\dfrac{x^2 + 1}{x(x - 2)^2(x^2 + 9)}" />!
            </>
          }
        >
          <p>
            <M block t="\frac{A}{x} + \frac{B}{x - 2} + \frac{C}{(x - 2)^2} + \frac{Dx + E}{x^2 + 9}." />
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Miért <em>nem</em> szabad rögtön a 4 esettel kezdeni a <M t="\dfrac{x^3 + 5}{x^2 - 1}" /> törtet? Mi az első lépés?
            </>
          }
        >
          <p>
            Mert <M t="\deg P = 3 \ge \deg Q = 2" /> (nem valódi tört!). Először maradékos polinomosztás: <M t="\dfrac{x^3 + 5}{x^2 - 1} = x + \dfrac{x + 5}{x^2 - 1}" />, és csak a <M t="\frac{x+5}{(x-1)(x+1)}" /> maradékot bontjuk parciális törtekre!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A Heaviside-féle „letakarásos módszer”',
    body: (
      <>
        <Story>
          <p>
            Ha a nevező csupa <strong>különböző elsőfokú tényezőből</strong> áll, egyáltalán nem kell hosszadalmas lineáris egyenletrendszert megoldanod! Oliver Heaviside angol mérnök zseniális „letakarásos” trükkjével <strong>fejben, 5 másodperc alatt</strong> megkapod az összes együtthatót!
          </p>
        </Story>

        <Def title="A Heaviside-féle letakarásos szabály">
          <p>Ha <M t="\dfrac{P(x)}{(x - r_1)(x - r_2)\cdots(x - r_n)} = \dfrac{A_1}{x - r_1} + \dots + \dfrac{A_n}{x - r_n}" /> (valódi tört, különböző <M t="r_i" /> gyökökkel), akkor:</p>
          <p>
            Az <M t="A_i" /> együtthatót úgy kapod meg, hogy az eredeti tört nevezőjében <strong>letakarod az <M t="(x - r_i)" /> tényezőt</strong>, a megmaradó kifejezésbe pedig behelyettesíted <M t="x = r_i" />-t!
          </p>
        </Def>

        <HeavisideCoverUpWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Használd a Heaviside-letakarásos módszert az <M t="\displaystyle\int \frac{x + 5}{(x - 1)(x + 2)}\,dx" /> integrálhoz!
            </>
          }
        >
          <p>
            <M t="x = 1" />-nél (<M t="x-1" /> letakarva): <M t="A = \frac{1+5}{1+2} = 2" />. <M t="x = -2" />-nél (<M t="x+2" /> letakarva): <M t="B = \frac{-2+5}{-2-1} = -1" />. Integrálva: <M t="\mathbf{2\ln|x - 1| - \ln|x + 2| + C}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki Heaviside-dal: <M t="\displaystyle\int \frac{6}{x(x + 2)(x + 3)}\,dx" />!
            </>
          }
        >
          <p>
            <M t="x=0 \implies A = \frac{6}{2\cdot 3} = 1" />; <M t="x=-2 \implies B = \frac{6}{(-2)(1)} = -3" />; <M t="x=-3 \implies C = \frac{6}{(-3)(-1)} = 2" />. Eredmény:
            <M block t="\mathbf{\ln|x| - 3\ln|x + 2| + 2\ln|x + 3| + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Többszörös lineáris tényezők: (x − r)ᵐ',
    body: (
      <>
        <Story>
          <p>
            Ha egy gyök többszörösen szerepel a nevezőben (pl. <M t="(x + 2)^2" /> vagy <M t="(x - 1)^3" />), akkor az összes alacsonyabb hatványt is fel kell venni a sablonba (<M t="\frac{A}{x+2} + \frac{B}{(x+2)^2}" />). A jó hír: a magasabb hatványok integrálja nem is logaritmus, hanem <strong>pofonegyszerű hatványintegrál</strong>!
          </p>
        </Story>

        <RepeatedRootCompareWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{6x + 7}{(x + 2)^2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="\frac{6x+7}{(x+2)^2} = \frac{A}{x+2} + \frac{B}{(x+2)^2} \implies 6x + 7 = A(x + 2) + B" />. Ebből <M t="x = -2 \implies B = -5" />, az <M t="x" />-es együtthatóból <M t="A = 6" />. Integrálva:
            <M block t="\int\left(\frac{6}{x+2} - \frac{5}{(x+2)^2}\right)dx = \mathbf{6\ln|x + 2| + \frac{5}{x + 2} + C}." />
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{2x + 1}{x(x - 1)^2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="\frac{A}{x} + \frac{B}{x-1} + \frac{C}{(x-1)^2}" />. Beszorozva: <M t="2x + 1 = A(x-1)^2 + Bx(x-1) + Cx" />. Behelyettesítve <M t="x=0 \implies A=1" />; <M t="x=1 \implies C=3" />; <M t="x^2" /> együtthatója: <M t="A + B = 0 \implies B = -1" />. Integrálva:
            <M block t="\mathbf{\ln|x| - \ln|x - 1| - \frac{3}{x - 1} + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Irreducibilis másodfokú tényezők: (Ax + B) / (x² + a²)',
    body: (
      <>
        <Story>
          <p>
            Ha a nevezőben olyan másodfokú tényező van, amelynek nincs valós gyöke (pl. <M t="x^2 + 1" /> vagy <M t="x^2 + 4" />), akkor a fölé írt számláló <strong>elsőfokú (<M t="Ax + B" />)</strong>! Integráláskor ez gyönyörűen kettéválik egy <strong><M t="\ln" /></strong> és egy <strong><M t="\operatorname{arctg}" /></strong> tagra!
          </p>
        </Story>

        <QuadraticFactorSplitDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x + 4}{x(x^2 + 4)}\,dx" />!
            </>
          }
        >
          <p>
            <M t="\frac{A}{x} + \frac{Bx+C}{x^2+4} \implies x + 4 = A(x^2+4) + (Bx+C)x" />. <M t="x=0 \implies 4A = 4 \implies A = 1" />; <M t="x^2" />-ből <M t="B = -1" />; <M t="x" />-ből <M t="C = 1" />. Integrálva:
            <M block t="\int\left(\frac{1}{x} - \frac{x}{x^2+4} + \frac{1}{x^2+4}\right)dx = \mathbf{\ln|x| - \frac{1}{2}\ln(x^2 + 4) + \frac{1}{2}\operatorname{arctg}\!\left(\frac{x}{2}\right) + C}." />
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Igazold a 4. példa együtthatóit: <M t="\dfrac{-2x + 4}{(x^2+1)(x-1)^2} = \dfrac{2x+1}{x^2+1} - \dfrac{2}{x-1} + \dfrac{1}{(x-1)^2}" />, az <M t="x = 0" /> és <M t="x = 2" /> próbaértékekkel!
            </>
          }
        >
          <p>
            <M t="x=0" />-nál: bal oldal <M t="\frac{4}{1\cdot 1} = 4" />, jobb oldal <M t="1 - (-2) + 1 = 4" /> ✓. <M t="x=2" />-nél: bal oldal <M t="\frac{0}{5\cdot 1} = 0" />, jobb oldal <M t="\frac{5}{5} - \frac{2}{1} + \frac{1}{1} = 1 - 2 + 1 = 0" /> ✓.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'A teljes 5 lépéses mester-algoritmus és többszörös másodfokú tényezők',
    body: (
      <>
        <Story>
          <p>
            Foglaljuk össze a teljes munkamenetet egyetlen 5 lépéses algoritmusba — és nézzük meg, hogyan működik a legritkább, 4. eset is (többszörös másodfokú tényező, Thomas 5. példa)!
          </p>
        </Story>

        <FullPipelineFlowDiagram />

        <p>
          <strong>Thomas 5. példája (<M t="\int \frac{dx}{x(x^2+1)^2}" />):</strong> a sablon <M t="\frac{A}{x} + \frac{Bx+C}{x^2+1} + \frac{Dx+E}{(x^2+1)^2}" />. Együttható-összehasonlítással <M t="A=1,\; B=-1,\; C=0,\; D=-1,\; E=0" />, tehát:
        </p>
        <M block t="\int\left(\frac{1}{x} - \frac{x}{x^2+1} - \frac{x}{(x^2+1)^2}\right)dx = \ln|x| - \frac{1}{2}\ln(x^2+1) + \frac{1}{2(x^2+1)} + C!" />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x^3 + 2}{x^2 - 1}\,dx" />!
            </>
          }
        >
          <p>
            0. lépés (polinomosztás): <M t="\frac{x^3 + 2}{x^2 - 1} = x + \frac{x + 2}{(x-1)(x+1)}" />. Heaviside-dal: <M t="\frac{3/2}{x-1} - \frac{1/2}{x+1}" />. Integrálva:
            <M block t="\mathbf{\frac{x^2}{2} + \frac{3}{2}\ln|x - 1| - \frac{1}{2}\ln|x + 1| + C}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x^3 + x}{(x^2 + 1)^2}\,dx" />! <em>(Figyeld a számlálót!)</em>
            </>
          }
        >
          <p>
            <M t="x^3 + x = x(x^2 + 1)" />, tehát egyszerűsíthető <M t="\dfrac{x}{x^2 + 1}" />-re! Integrálja egyetlen sor: <M t="\mathbf{\frac{1}{2}\ln(x^2 + 1) + C}" />! <em>(Mindig nézd meg, nem egyszerűsíthető-e a tört!)</em>
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Álcázott parciális törtek és a logisztikus növekedés',
    body: (
      <>
        <Story>
          <p>
            A parciális törtekre bontás nemcsak polinomtörteknél működik! Egyetlen ügyes helyettesítéssel sok trigonometrikus és exponenciális integrál is parciális törtté válik — ráadásul a <strong>logisztikus populációnövekedés</strong> (S-görbe) differenciálegyenletét is pontosan ez a módszer oldja meg!
          </p>
        </Story>

        <HiddenRationalCheatDiagram />
        <LogisticCurvePreviewWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{\cos x}{\sin^2 x - \sin x}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = \sin x,\; du = \cos x\,dx \implies \int\frac{du}{u(u-1)} = \int\left(\frac{1}{u-1} - \frac{1}{u}\right)du = \mathbf{\ln\left|\dfrac{\sin x - 1}{\sin x}\right| + C}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki a logisztikus integrált: <M t="\displaystyle\int \frac{dy}{y(10 - y)}" /> (<M t="0 < y < 10" />)!
            </>
          }
        >
          <p>
            <M t="\dfrac{1}{y(10-y)} = \dfrac{1}{10}\left(\dfrac{1}{y} + \dfrac{1}{10-y}\right)" />. Integrálva:
            <M block t="\frac{1}{10}\bigl(\ln y - \ln(10 - y)\bigr) + C = \mathbf{\frac{1}{10}\ln\!\left(\frac{y}{10 - y}\right) + C}." />
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
        <Def title="8.3 Puskakártya">
          <ul>
            <li><strong>0. lépés:</strong> ha <M t="\deg P \ge \deg Q" />, mindig <strong>polinomosztás</strong> először!</li>
            <li><strong>4 sablon:</strong> <M t="(x-r)\to\frac{A}{x-r}" /> · <M t="(x-r)^m\to\sum \frac{A_k}{(x-r)^k}" /> · <M t="(ax^2+bx+c)\to\frac{Ax+B}{ax^2+bx+c}" /> · <M t="(ax^2+bx+c)^m\to\sum \frac{A_k x+B_k}{(ax^2+bx+c)^k}" />.</li>
            <li><strong>Heaviside-letakarás:</strong> különböző lineáris tényezőknél 5 mp alatt megadja <M t="A, B, C" />-t!</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong>Polinomosztás elfelejtése</strong>, ha <M t="\deg P \ge \deg Q" />!</li>
            <li><strong>Többszörös gyök közbenső hatványainak kihagyása</strong> (<M t="(x-1)^3" />-hoz 1., 2. ÉS 3. hatvány is kell!).</li>
            <li><strong>Másodfokú tényező fölé csak <M t="A" /> írása <M t="Ax + B" /> helyett!</strong></li>
            <li><strong>Előjel-hiba <M t="\int \frac{dy}{10 - y} = -\ln|10 - y|" />-nél:</strong> ne felejtsd a mínuszjelet a <M t="-y" /> miatt!</li>
            <li><strong>Heaviside-letakarás többszörös gyökre:</strong> ott csak a <em>legmagasabb</em> hatvány együtthatóját adja meg!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{x^2 - 1}" />!
            </>
          }
        >
          <p>
            <M t="\frac{1}{2}\int\left(\frac{1}{x-1} - \frac{1}{x+1}\right)dx = \mathbf{\frac{1}{2}\ln\left|\frac{x - 1}{x + 1}\right| + C}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki Heaviside-dal: <M t="\displaystyle\int \frac{5x - 1}{x^2 - x - 2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="x^2 - x - 2 = (x-2)(x+1)" />. <M t="x=2 \implies A = \frac{9}{3} = 3" />; <M t="x=-1 \implies B = \frac{-6}{-3} = 2" />. Eredmény: <M t="\mathbf{3\ln|x - 2| + 2\ln|x + 1| + C}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1} \frac{dx}{(x + 1)(x + 2)}" />!
            </>
          }
        >
          <p>
            <M t="\int_0^1 \left(\frac{1}{x+1} - \frac{1}{x+2}\right)dx = \left[\ln\frac{x+1}{x+2}\right]_0^1 = \ln\frac{2}{3} - \ln\frac{1}{2} = \mathbf{\ln\!\left(\frac{4}{3}\right)}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki a 6. példa integrálját: <M t="\displaystyle\int \frac{x^2 + 1}{(x - 1)(x - 2)(x - 3)}\,dx" />!
            </>
          }
        >
          <p>
            A Heaviside-ábrából <M t="A=1,\; B=-5,\; C=5" />, így:
            <M block t="\mathbf{\ln|x - 1| - 5\ln|x - 2| + 5\ln|x - 3| + C}." />
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{3x + 5}{(x + 1)^2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="3x + 5 = 3(x + 1) + 2 \implies \frac{3}{x+1} + \frac{2}{(x+1)^2}" />. Integrálva: <M t="\mathbf{3\ln|x + 1| - \dfrac{2}{x + 1} + C}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x^2 + 2}{x(x^2 + 1)}\,dx" />!
            </>
          }
        >
          <p>
            <M t="\frac{A}{x} + \frac{Bx+C}{x^2+1} \implies A = 2,\; B = -1,\; C = 0" />. Integrálva: <M t="\mathbf{2\ln|x| - \dfrac{1}{2}\ln(x^2 + 1) + C}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Polinomosztás + parciális törtek:</em> Számítsd ki <M t="\displaystyle\int \frac{x^3 + 2x}{x^2 - 1}\,dx" /> értékét!
            </>
          }
        >
          <p>
            Polinomosztással <M t="\frac{x^3+2x}{x^2-1} = x + \frac{3x}{x^2-1}" />. Mivel a maradékban <M t="(x^2-1)' = 2x" />, egyetlen sorban:
            <M block t="\mathbf{\frac{x^2}{2} + \frac{3}{2}\ln|x^2 - 1| + C}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Álcázott parciális tört:</em> Számítsd ki <M t="\displaystyle\int \frac{e^x}{e^{2x} - 4}\,dx" /> értékét!
            </>
          }
        >
          <p>
            <M t="u = e^x,\; du = e^x\,dx \implies \int\frac{du}{u^2 - 4} = \frac{1}{4}\ln\left|\frac{u-2}{u+2}\right| + C = \mathbf{\frac{1}{4}\ln\left|\frac{e^x - 2}{e^x + 2}\right| + C}" />.
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Két irreducibilis tényező:</em> Számítsd ki <M t="\displaystyle\int \frac{3}{(x^2 + 1)(x^2 + 4)}\,dx" /> értékét!
            </>
          }
        >
          <p>
            Figyeld meg a gyönyörű szimmetriát: <M t="\dfrac{1}{x^2+1} - \dfrac{1}{x^2+4} = \dfrac{(x^2+4) - (x^2+1)}{(x^2+1)(x^2+4)} = \dfrac{3}{(x^2+1)(x^2+4)}" />! Integrálva 1 sorban:
            <M block t="\mathbf{\operatorname{arctg} x - \frac{1}{2}\operatorname{arctg}\!\left(\frac{x}{2}\right) + C}!" />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi a helyes parciális törtes alakja az <M t="\dfrac{x + 3}{x(x - 1)^2}" /> kifejezésnek?
            </>
          }
          options={[
            { label: <M t="\dfrac{A}{x} + \dfrac{B}{x - 1} + \dfrac{C}{(x - 1)^2}" />, ok: true },
            { label: <M t="\dfrac{A}{x} + \dfrac{B}{(x - 1)^2}" /> },
            { label: <M t="\dfrac{A}{x} + \dfrac{Bx + C}{(x - 1)^2}" /> },
            { label: <M t="\dfrac{A}{x} + \dfrac{B}{x - 1}" /> },
          ]}
          explain={
            <>
              Kétszeres lineáris tényezőnél mind az első, mind a második hatványnak szerepelnie kell a nevezők között.
            </>
          }
        />
      </>
    ),
  },
];
