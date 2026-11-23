import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  CompleteSquareVisualWidget,
  IntegralToolkitOverviewDiagram,
  IntegrationStrategyLabWidget,
  MultiplyByOneCheatDiagram,
  PolyDivVisualWidget,
  SecantAreaWidget,
  SplitFractionDiagram,
  SqrtAbsSignWidget,
} from '../components/Widgets81';
import type { Page } from './s1_1';

export const S8_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A 8. fejezet nyitánya és az integrálási eszköztár',
    body: (
      <>
        <Story>
          <p>
            Elkezdjük a <strong>8. fejezetet (Integrálási technikák)</strong>! Míg a deriválás olyan, mint egy jól olajozott gép (minden szabály mechanikusan működik), az <strong>integrálás igazi nyomozómunka</strong>: a célunk mindig az, hogy okos algebrai átalakításokkal és helyettesítésekkel visszavezessük a kapott kifejezést a már ismert <strong>alapintegrálok</strong> egyikére!
          </p>
        </Story>

        <Def title="Az alapintegrálok 5 fő családja (8.1. táblázat)">
          <ul>
            <li><strong>Hatvány &amp; logaritmus:</strong> <M t="\int u^n\,du = \frac{u^{n+1}}{n+1}+C\;(n\ne -1)" />, <M t="\int \frac{du}{u} = \ln|u|+C" />.</li>
            <li><strong>Exponenciális:</strong> <M t="\int e^u\,du = e^u+C" />, <M t="\int a^u\,du = \frac{a^u}{\ln a}+C" />.</li>
            <li><strong>Trigonometrikus:</strong> <M t="\sin, \cos, \sec^2, \csc^2, \sec\operatorname{tg}, \csc\operatorname{ctg}, \operatorname{tg}, \operatorname{ctg}" /> — és ezen a szakaszon két új: <M t="\mathbf{\sec u}" /> és <M t="\mathbf{\csc u}" />!</li>
            <li><strong>Hiperbolikus:</strong> <M t="\operatorname{sh}, \operatorname{ch}, \operatorname{sech}^2, \operatorname{csch}^2" />.</li>
            <li><strong>Inverz trig. &amp; hiperbolikus:</strong> <M t="\frac{1}{\sqrt{a^2-u^2}}\to\arcsin" />, <M t="\frac{1}{a^2+u^2}\to\frac{1}{a}\operatorname{arctg}" />, <M t="\frac{1}{u\sqrt{u^2-a^2}}\to\frac{1}{a}\operatorname{arcsec}" />, <M t="\frac{1}{\sqrt{a^2+u^2}}\to\operatorname{arsh}" />, <M t="\frac{1}{\sqrt{u^2-a^2}}\to\operatorname{arch}" />.</li>
          </ul>
        </Def>

        <IntegralToolkitOverviewDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki <M t="u" />-helyettesítéssel: <M t="\displaystyle\int \frac{2x - 9}{\sqrt{x^2 - 9x + 1}}\,dx" /> (Thomas 1. példa)!
            </>
          }
        >
          <p>
            Legyen <M t="u = x^2 - 9x + 1 \implies du = (2x - 9)\,dx" />:
            <M block t="\int u^{-1/2}\,du = 2u^{1/2} + C = \mathbf{2\sqrt{x^2 - 9x + 1} + C}." />
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{\sqrt{x}(\sqrt{x} + 1)}" /> (Thomas 6. feladat)!
            </>
          }
        >
          <p>
            Legyen <M t="u = \sqrt{x} + 1 \implies du = \frac{dx}{2\sqrt{x}} \implies \frac{dx}{\sqrt{x}} = 2\,du" />:
            <M block t="2\int\frac{du}{u} = \mathbf{2\ln(\sqrt{x} + 1) + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: '1–2. technika: Okos helyettesítés és kiegészítés teljes négyzetté',
    body: (
      <>
        <Story>
          <p>
            Ha egy másodfokú kifejezésben <M t="x" />-es (elsőfokú) tag is van — például <M t="8x - x^2" /> vagy <M t="x^2 - 6x + 10" /> —, a sima alapintegrál-táblázat még nem illik rá. Egyetlen algebrai lépés, a <strong>teljes négyzetté alakítás</strong> azonnal felfedi mögötte az <M t="\arcsin" /> vagy <M t="\operatorname{arctg}" /> képletet!
          </p>
        </Story>

        <Def title="Teljes négyzetté alakítás két alapesete">
          <ul>
            <li><strong>Pozitív főegyüttható:</strong> <M t="x^2 + bx + c = \left(x + \frac{b}{2}\right)^2 + \left(c - \frac{b^2}{4}\right)" /> → gyakran <M t="\mathbf{\operatorname{arctg}}" /> vagy <M t="\mathbf{\operatorname{arsh}}" />!</li>
            <li><strong>Negatív főegyüttható (vigyázz az előjelre!):</strong> először emeld ki a mínuszt: <M t="bx - x^2 = -(x^2 - bx) = \left(\frac{b}{2}\right)^2 - \left(x - \frac{b}{2}\right)^2" /> → <M t="\mathbf{\arcsin}" />!</li>
          </ul>
        </Def>

        <CompleteSquareVisualWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{2}^{4} \frac{2\,dx}{x^2 - 6x + 10}" /> (Thomas 38. feladat)!
            </>
          }
        >
          <p>
            <M t="x^2 - 6x + 10 = (x - 3)^2 + 1" /> (<M t="u = x - 3,\; a = 1" />):
            <M block t="2\Big[\operatorname{arctg}(x - 3)\Big]_{2}^{4} = 2\bigl(\operatorname{arctg}(1) - \operatorname{arctg}(-1)\bigr) = 2\left(\frac{\pi}{4} + \frac{\pi}{4}\right) = \mathbf{\pi}." />
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dt}{\sqrt{-t^2 + 4t - 3}}" /> (Thomas 39. feladat)!
            </>
          }
        >
          <p>
            <M t="-t^2 + 4t - 3 = -(t^2 - 4t + 4) + 1 = 1 - (t - 2)^2" />:
            <M block t="\int\frac{dt}{\sqrt{1 - (t-2)^2}} = \mathbf{\arcsin(t - 2) + C}." />
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: '3–4. technika: Trigonometrikus azonosságok és a gyökjel eltüntetése',
    body: (
      <>
        <Story>
          <p>
            Két különösen hasznos trigonometrikus fogás: (1) a <M t="\operatorname{tg}^2 x = \sec^2 x - 1" /> típusú átírások, amelyek ismeretlen négyzetekből azonnal integrálható tagokat csinálnak; (2) a félszög-képletekkel (<M t="1 + \cos 2\theta = 2\cos^2\theta" />, <M t="1 - \cos 2\theta = 2\sin^2\theta" />) való <strong>gyökjel-eltüntetés</strong> — ahol azonban <em>halálos csapda</em> leselkedik, ha elfelejted az abszolútértéket!
          </p>
        </Story>

        <Def title="Gyökjel eltüntetése — az abszolútérték aranyszabálya">
          <M block t="1 + \cos 2\theta = 2\cos^2\theta, \qquad 1 - \cos 2\theta = 2\sin^2\theta, \qquad \sqrt{u^2} \;=\; |u|!" />
          <p>
            Határozott integrálnál <strong>mindig ellenőrizd</strong>, hogy az integrálási intervallumon <M t="u" /> pozitív, negatív vagy előjelet vált-e! Ha előjelet vált, bontsd ketté az integrált a zérushelynél!
          </p>
        </Def>

        <SqrtAbsSignWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} \sqrt{1 + \cos 4x}\,dx" /> (Thomas 4. példa)!
            </>
          }
        >
          <p>
            <M t="1 + \cos 4x = 2\cos^2(2x)" />. A <M t="[0;\,\pi/4]" /> intervallumon <M t="2x \in [0;\,\pi/2]" />, tehát <M t="\cos 2x \ge 0" />:
            <M block t="\sqrt{2}\int_{0}^{\pi/4}\cos 2x\,dx = \sqrt{2}\left[\frac{\sin 2x}{2}\right]_{0}^{\pi/4} = \mathbf{\frac{\sqrt{2}}{2}}." />
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int (\sin 3x\cos 2x - \cos 3x\sin 2x)\,dx" /> (Thomas 46. feladat)!
            </>
          }
        >
          <p>
            Addíciós tétellel <M t="\sin(3x - 2x) = \sin x" />! Így <M t="\int \sin x\,dx = \mathbf{-\cos x + C}" /> (1 sorban!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: '5. technika: Maradékos polinomosztás',
    body: (
      <>
        <Story>
          <p>
            Ha két polinom hányadosát integrálod, és a <strong>számláló fokszáma nagyobb vagy egyenlő</strong>, mint a nevezőé (pl. <M t="\frac{3x^2 - 7x}{3x + 2}" /> vagy <M t="\frac{x^2}{x^2 + 1}" />), az első lépés <em>mindig</em> a maradékos polinomosztás! Ezzel egy könnyen integrálható polinomra és egy „valódi” (kisebb fokú számlálójú) törtrészre bontod!
          </p>
        </Story>

        <PolyDivVisualWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x^2}{x^2 + 1}\,dx" /> (Thomas 48. feladat)!
            </>
          }
        >
          <p>
            <M t="\dfrac{x^2}{x^2+1} = \dfrac{(x^2+1) - 1}{x^2+1} = 1 - \dfrac{1}{x^2+1}" />. Integrálva: <M t="\mathbf{x - \operatorname{arctg} x + C}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{2x^3}{x^2 - 1}\,dx" /> (Thomas 49. feladat)!
            </>
          }
        >
          <p>
            Polinomosztással <M t="\dfrac{2x^3}{x^2 - 1} = 2x + \dfrac{2x}{x^2 - 1}" />. Integrálva: <M t="\mathbf{x^2 + \ln|x^2 - 1| + C}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: '6. technika: Tört szétbontása a számláló összege mentén',
    body: (
      <>
        <Story>
          <p>
            Ha a számlálóban több tag összege van (pl. <M t="3x + 2" /> vagy <M t="1 + \sin x" />), ne próbáld egyben erőltetni! Vágd szét a törtet a számláló összege mentén — az egyik tag szinte mindig sima <M t="u" />-helyettesítés, a másik pedig azonnali alapintegrál!
          </p>
        </Story>

        <SplitFractionDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/4} \frac{1 + \sin x}{\cos^2 x}\,dx" /> (Thomas 55. feladat)!
            </>
          }
        >
          <p>
            Szétbontva: <M t="\dfrac{1}{\cos^2 x} + \dfrac{\sin x}{\cos^2 x} = \sec^2 x + \sec x\operatorname{tg} x" />. Integrálva:
            <M block t="\Big[\operatorname{tg} x + \sec x\Big]_{0}^{\pi/4} = (1 + \sqrt{2}) - (0 + 1) = \mathbf{\sqrt{2}}." />
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{1 - x}{\sqrt{1 - x^2}}\,dx" /> (Thomas 53. feladat)!
            </>
          }
        >
          <p>
            Szétbontva: <M t="\int\frac{dx}{\sqrt{1-x^2}} - \int\frac{x\,dx}{\sqrt{1-x^2}} = \mathbf{\arcsin x + \sqrt{1 - x^2} + C}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: '7. technika: Szorzás 1-gyel — és a sec x, csc x integrálja!',
    body: (
      <>
        <Story>
          <p>
            Vannak integrálok, amelyek makacsul ellenállnak minden megszokott próbálkozásnak — amíg meg nem szorozzuk őket egy <strong>zseniálisan megválasztott 1-gyel</strong>! Így kapjuk meg a hiányzó utolsó két trigonometrikus alapintegrált (<M t="\sec x" /> és <M t="\csc x" />), és így szelídítjük meg az <M t="\frac{1}{1\pm\sin x}" /> törteket is!
          </p>
        </Story>

        <Def title="A szekáns és a koszekáns integrálja (8.2. táblázat)">
          <M block t="\int \sec x\,dx \;=\; \ln|\sec x + \operatorname{tg} x| + C, \qquad \int \csc x\,dx \;=\; -\ln|\csc x + \operatorname{ctg} x| + C." />
          <p>
            <strong>A trükk:</strong> <M t="\sec x = \sec x\cdot\dfrac{\sec x + \operatorname{tg} x}{\sec x + \operatorname{tg} x} = \dfrac{\sec^2 x + \sec x\operatorname{tg} x}{\sec x + \operatorname{tg} x}" />, ahol a számláló pontosan a nevező deriváltja (<M t="u = \sec x + \operatorname{tg} x" />)!
          </p>
        </Def>

        <MultiplyByOneCheatDiagram />
        <SecantAreaWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{1}{1 + \sin x}\,dx" /> (Thomas 57. feladat)!
            </>
          }
        >
          <p>
            Szorozzunk <M t="\frac{1-\sin x}{1-\sin x}" />-szel:
            <M block t="\int\frac{1-\sin x}{1-\sin^2 x}\,dx = \int\frac{1-\sin x}{\cos^2 x}\,dx = \int(\sec^2 x - \sec x\operatorname{tg} x)\,dx = \mathbf{\operatorname{tg} x - \sec x + C}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int x\sec(x^2 - 5)\,dx" /> (Thomas 10. feladat)!
            </>
          }
        >
          <p>
            <M t="u = x^2 - 5,\; x\,dx = \frac{du}{2} \implies \mathbf{\frac{1}{2}\ln|\sec(x^2-5) + \operatorname{tg}(x^2-5)| + C}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Stratégiai edzőterem — melyik technikát válaszd?',
    body: (
      <>
        <Story>
          <p>
            Gyakoroljuk be a gyors minta-felismerést! Ha egy új integrállal találkozol, fuss végig ezen a sorrenden: <strong>(1) alapintegrál? → (2) <M t="u" />-helyettesítés? → (3) polinomosztás? → (4) tört szétbontása? → (5) teljes négyzet? → (6) trig. azonosság / 1-gyel szorzás!</strong>
          </p>
        </Story>

        <IntegrationStrategyLabWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{\ln x}{x + 4x\ln^2 x}\,dx" /> (Thomas 35. feladat)!
            </>
          }
        >
          <p>
            Emeld ki <M t="x" />-et a nevezőben: <M t="\frac{\ln x}{x(1 + 4\ln^2 x)}" />. Legyen <M t="u = 1 + 4\ln^2 x \implies du = \frac{8\ln x}{x}\,dx" />:
            <M block t="\frac{1}{8}\int\frac{du}{u} = \mathbf{\frac{1}{8}\ln(1 + 4\ln^2 x) + C}!" />
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{1}{\sec\theta + \operatorname{tg}\theta}\,d\theta" /> (Thomas 59. feladat)!
            </>
          }
        >
          <p>
            Szorozzunk a konjugálttal (<M t="\sec\theta - \operatorname{tg}\theta" />): a nevező <M t="\sec^2\theta - \operatorname{tg}^2\theta = 1" />! Így csak <M t="\int(\sec\theta - \operatorname{tg}\theta)\,d\theta = \mathbf{\ln|\sec\theta + \operatorname{tg}\theta| + \ln|\cos\theta| + C = \ln|1 + \sin\theta| + C}" />!
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
        <Def title="8.1 Puskakártya">
          <ul>
            <li><strong>2 új alapintegrál:</strong> <M t="\int \sec x\,dx = \ln|\sec x + \operatorname{tg} x| + C" /> · <M t="\int \csc x\,dx = -\ln|\csc x + \operatorname{ctg} x| + C" />.</li>
            <li><strong>7 átalakítás:</strong> (1) <M t="u" />-helyettesítés, (2) teljes négyzet, (3) trig. azonosság, (4) gyökjel eltüntetése (<M t="\sqrt{u^2}=|u|" />), (5) polinomosztás (<M t="\deg P \ge \deg Q" />), (6) számláló szétbontása, (7) szorzás ügyes 1-gyel.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li><strong><M t="\sqrt{u^2} = |u|" />, NEM <M t="u" />!</strong> Határozott integrálban mindig nézd meg az előjelet!</li>
            <li><strong>Nevezőt SOHA nem szabad szétszedni:</strong> <M t="\frac{1}{a+b} \ne \frac{1}{a} + \frac{1}{b}" /> — csak a <em>számláló</em> bontható szét!</li>
            <li><strong>Polinomosztás elfelejtése:</strong> ha <M t="\deg P \ge \deg Q" />, először mindig ossz!</li>
            <li><strong>Negatív <M t="x^2" /> teljes négyzetnél:</strong> <M t="8x - x^2 = 16 - (x-4)^2" /> (előjelre vigyázz!).</li>
            <li><strong>Abszolútérték és <M t="+C" />:</strong> határozatlan integrál végén mindig ott legyen a <M t="+C" /> és a logaritmusban a <M t="| \cdot |" />!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{16x}{\sqrt{8x^2 + 1}}\,dx" /> (Thomas 1. feladat)!
            </>
          }
        >
          <p>
            <M t="u = 8x^2 + 1,\; du = 16x\,dx \implies \int u^{-1/2}\,du = \mathbf{2\sqrt{8x^2 + 1} + C}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{x}{x + 1}\,dx" /> (Thomas 47. feladat)!
            </>
          }
        >
          <p>
            <M t="\frac{x}{x+1} = 1 - \frac{1}{x+1} \implies \mathbf{x - \ln|x + 1| + C}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int (\sec x + \operatorname{tg} x)^2\,dx" /> (Thomas 3. példa)!
            </>
          }
        >
          <p>
            <M t="\sec^2 x + 2\sec x\operatorname{tg} x + (\sec^2 x - 1) = 2\sec^2 x + 2\sec x\operatorname{tg} x - 1 \implies \mathbf{2\operatorname{tg} x + 2\sec x - x + C}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{1}^{2} \frac{8\,dx}{x^2 - 2x + 2}" /> (Thomas 37. feladat)!
            </>
          }
        >
          <p>
            <M t="x^2 - 2x + 2 = (x-1)^2 + 1 \implies 8\bigl[\operatorname{arctg}(x-1)\bigr]_{1}^{2} = 8\left(\frac{\pi}{4} - 0\right) = \mathbf{2\pi}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{1/2} \frac{2 - 8x}{1 + 4x^2}\,dx" /> (Thomas 56. feladat)!
            </>
          }
        >
          <p>
            Szétbontva: <M t="\int \frac{2\,dx}{1 + (2x)^2} - \int \frac{8x\,dx}{1 + 4x^2} = \Big[\operatorname{arctg}(2x) - \ln(1 + 4x^2)\Big]_{0}^{1/2} = \mathbf{\dfrac{\pi}{4} - \ln 2}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \frac{dx}{1 + \cos x}" /> (Thomas 58. feladat)!
            </>
          }
        >
          <p>
            Szorozzunk <M t="\frac{1-\cos x}{1-\cos x}" />-szel: <M t="\int\frac{1-\cos x}{\sin^2 x}\,dx = \int(\csc^2 x - \csc x\operatorname{ctg} x)\,dx = \mathbf{-\operatorname{ctg} x + \csc x + C}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Gyökjel eltüntetése (Thomas 64. feladat):</em> Számítsd ki <M t="\displaystyle\int_{0}^{\pi} \sqrt{1 - \cos 2x}\,dx" /> pontos értékét!
            </>
          }
        >
          <p>
            <M t="\sqrt{1 - \cos 2x} = \sqrt{2\sin^2 x} = \sqrt{2}\,|\sin x|" />. Mivel <M t="[0;\,\pi]" />-n <M t="\sin x \ge 0" />, ezért:
            <M block t="\sqrt{2}\int_{0}^{\pi}\sin x\,dx = \sqrt{2}\bigl[-\cos x\bigr]_{0}^{\pi} = \sqrt{2}(1 - (-1)) = \mathbf{2\sqrt{2}}." />
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Teljes négyzet + <M t="\operatorname{arcsec}" /> (Thomas 41. feladat):</em> Számítsd ki <M t="\displaystyle\int \frac{dx}{(x + 1)\sqrt{x^2 + 2x}}" /> (<M t="x > 0" />)!
            </>
          }
        >
          <p>
            <M t="x^2 + 2x = (x + 1)^2 - 1" />. Legyen <M t="u = x + 1 > 1,\; du = dx" />:
            <M block t="\int\frac{du}{u\sqrt{u^2 - 1}} = \mathbf{\operatorname{arcsec}(x + 1) + C}." />
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>1-gyel szorzás exponenciálissal (Thomas 33. feladat):</em> Számítsd ki <M t="\displaystyle\int \frac{dx}{e^x + e^{-x}}" /> értékét!
            </>
          }
        >
          <p>
            Szorozzunk <M t="\frac{e^x}{e^x}" />-szel, majd <M t="u = e^x,\; du = e^x\,dx" />:
            <M block t="\int\frac{e^x\,dx}{e^{2x} + 1} = \int\frac{du}{u^2 + 1} = \mathbf{\operatorname{arctg}(e^x) + C}!" />
          </p>
        </Task>
      </>
    ),
  },
];
