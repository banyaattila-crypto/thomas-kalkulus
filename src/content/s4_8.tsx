import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  AntiderivFamilyWidget,
  InitialValueWidget,
  IntegralAnatomyDiagram,
  PowerRuleReverseWidget,
  ProjectileAntiderivWidget,
} from '../components/Widgets48';
import type { Page } from './s1_1';

export const S4_8: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Visszafele deriválás: mi az a primitív függvény?',
    body: (
      <>
        <Story>
          <p>
            Az eddigi fejezetekben az útból kiszámoltuk a sebességet, a sebességből a gyorsulást — vagyis <em>deriváltunk</em>. A való életben azonban gyakran épp fordítva áll a kérdés: a repülőgép gyorsulásmérője rögzíti <M t="a(t)" />-t, és ebből kell kiszámítanunk a sebességét (<M t="v(t)" />) és a helyzetét (<M t="s(t)" />)! Meg kell tehát fordítanunk a deriválást — ez a <strong>primitív függvények</strong> elmélete, amely egyenesen átvezet a II. kötet <strong>integrálszámításához</strong>!
          </p>
        </Story>
        <Def title="Primitív függvény (antiderivált)">
          <p>
            Az <M t="F" /> függvény az <M t="f" /> függvény <strong>primitív függvénye</strong> egy <M t="I" /> intervallumon, ha minden <M t="x \in I" /> esetén:
          </p>
          <M block t="F'(x) = f(x)." />
        </Def>
        <p>
          Például <M t="f(x)=2x" /> egyik primitív függvénye <M t="F(x)=x^2" />, de ugyanúgy jó az <M t="x^2+5" /> vagy az <M t="x^2-100" /> is, mert a konstans deriváltja nulla! Létezik-e más, teljesen eltérő primitív függvény? A <strong>Lagrange-féle középértéktétel 2. következménye</strong> (4.2) megadja a megnyugtató választ: <strong>NEM!</strong>
        </p>
        <Def title="Az összes primitív függvény alakja">
          <p>
            Ha <M t="F" /> egy primitív függvénye <M t="f" />-nek az <M t="I" /> intervallumon, akkor <M t="f" /> <strong>minden</strong> primitív függvénye az <M t="I" /> intervallumon:
          </p>
          <M block t="G(x) = F(x) + C \qquad (C \in \mathbb{R} \text{ tetszőleges állandó})." />
        </Def>
        <AntiderivFamilyWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Add meg az <M t="f(x)=3x^2" /> és a <M t="g(x)=\sin x" /> függvények <em>legáltalánosabb</em> primitív függvényét!
            </>
          }
        >
          <p>
            <M t="F(x) = x^3 + C" /> (mert <M t="(x^3+C)'=3x^2" />), és <M t="G(x) = -\cos x + C" /> (mert <M t="(-\cos x + C)' = \sin x" /> — vigyázz a mínuszjelre!).
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Ellenőrizd deriválással, hogy <M t="F(x) = x\sin x + \cos x" /> primitív függvénye-e az <M t="f(x) = x\cos x" /> függvénynek!
            </>
          }
        >
          <p>
            Szorzatszabállyal: <M t="F'(x) = (1\cdot\sin x + x\cos x) - \sin x = x\cos x = f(x)" /> → <strong>igen!</strong>
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Alap-primitívfüggvények és a hatványszabály visszafelé',
    body: (
      <>
        <p>
          Minden deriválási szabályt visszafelé olvasva azonnal kapunk egy primitívfüggvény-szabályt! A leggyakoribb a <strong>hatványszabály</strong>: deriváláskor szoroztunk a kitevővel és csökkentettük 1-gyel — visszafelé tehát <strong>növeljük a kitevőt 1-gyel, és osztunk az új kitevővel</strong>:
        </p>
        <M block t="\int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad (n \ne -1)." />
        <PowerRuleReverseWidget />
        <p>
          Íme az I. kötet végére összegyűjtött <strong>alap-táblázat</strong> (a konstansszoros <M t="k\ne 0" /> tényezőt mindig <em>osztással</em> kompenzáljuk!):
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>függvény <M t="f(x)" /></th>
              <th>legáltalánosabb primitív függvény <M t="F(x)+C" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><M t="x^n \;(n \ne -1)" /></td>
              <td><M t="\dfrac{x^{n+1}}{n+1} + C" /></td>
            </tr>
            <tr>
              <td><M t="\sin(kx)" /></td>
              <td><M t="-\dfrac{1}{k}\cos(kx) + C" /></td>
            </tr>
            <tr>
              <td><M t="\cos(kx)" /></td>
              <td><M t="\dfrac{1}{k}\sin(kx) + C" /></td>
            </tr>
            <tr>
              <td><M t="\sec^2(kx)" /></td>
              <td><M t="\dfrac{1}{k}\operatorname{tg}(kx) + C" /></td>
            </tr>
            <tr>
              <td><M t="\csc^2(kx)" /></td>
              <td><M t="-\dfrac{1}{k}\operatorname{ctg}(kx) + C" /></td>
            </tr>
            <tr>
              <td><M t="\sec(kx)\operatorname{tg}(kx)" /></td>
              <td><M t="\dfrac{1}{k}\sec(kx) + C" /></td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Linearitás:</strong> konstans szorzó kiemelhető (<M t="\int c\,f = c\int f" />), összeg és különbség pedig tagonként integrálható (<M t="\int (f\pm g) = \int f \pm \int g" />)!
        </p>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mi az <M t="\int (6x^2 + \sec^2 x)\,dx" /> határozatlan integrál?
            </>
          }
          options={[
            { label: <M t="2x^3 + \operatorname{tg} x + C" />, ok: true },
            { label: <M t="12x + \operatorname{tg} x + C" /> },
            { label: <M t="2x^3 + \sec x + C" /> },
            { label: <M t="3x^3 + \operatorname{tg} x + C" /> },
          ]}
          explain={
            <>
              Deriválással azonnal ellenőrizhető: <M t="(2x^3 + \operatorname{tg} x + C)' = 6x^2 + \sec^2 x" />.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Határozd meg az <M t="f(x) = 4x^3 - 6\sqrt{x} + \dfrac{2}{x^2}" /> függvény legáltalánosabb primitív függvényét!
            </>
          }
        >
          <p>
            Írjuk át hatványalakra: <M t="4x^3 - 6x^{1/2} + 2x^{-2}" />. Tagonként:
          </p>
          <p>
            <M t="F(x) = 4\cdot\dfrac{x^4}{4} - 6\cdot\dfrac{2}{3}x^{3/2} + 2\cdot\dfrac{x^{-1}}{-1} + C = x^4 - 4x^{3/2} - \dfrac{2}{x} + C" />!
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Add meg a <M t="g(x) = 3\cos(2x) - 5\sin(5x)" /> függvény legáltalánosabb primitív függvényét!
            </>
          }
        >
          <p>
            <M t="G(x) = \dfrac{3}{2}\sin(2x) + \cos(5x) + C" />. (Ellenőrzés: <M t="\frac{3}{2}\cdot 2\cos(2x) - 5\sin(5x) = 3\cos(2x) - 5\sin(5x)" /> ✓!)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A határozatlan integrál jelölése és a deriválás inverze',
    body: (
      <>
        <p>
          Az <M t="f" /> függvény összes primitív függvényének halmazát Leibniz zseniális jelölésével <strong>határozatlan integrálnak</strong> nevezzük:
        </p>
        <IntegralAnatomyDiagram />
        <p>
          A deriválás és a határozatlan integrálás <strong>egymás inverz műveletei</strong> (egy <M t="+C" /> konstans erejéig):
        </p>
        <M block t="\frac{d}{dx}\left[\int f(x)\,dx\right] = f(x), \qquad \int F'(x)\,dx = F(x) + C." />
        <p>
          <strong>Lineáris belső függvény (<M t="kx+b" />):</strong> a láncszabály megfordításával, ha <M t="F'=f" />, akkor bármely <M t="k\ne 0" /> esetén:
        </p>
        <M block t="\int f(kx+b)\,dx = \frac{1}{k}F(kx+b) + C." />
        <p>
          Például <M t="\int (3x-1)^4\,dx = \dfrac{1}{3}\cdot\dfrac{(3x-1)^5}{5} + C = \dfrac{(3x-1)^5}{15} + C" />!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki: <M t="\int \sqrt{2x+5}\,dx" />!
            </>
          }
        >
          <p>
            <M t="\int (2x+5)^{1/2}\,dx = \dfrac{1}{2}\cdot\dfrac{(2x+5)^{3/2}}{3/2} + C = \dfrac{1}{3}(2x+5)^{3/2} + C" />!
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\int \sec^2(4x-1)\,dx" />!
            </>
          }
        >
          <p>
            <M t="\dfrac{1}{4}\operatorname{tg}(4x-1) + C" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Kezdetiérték-feladatok (IVP) és differenciálegyenletek',
    body: (
      <>
        <p>
          Amikor egy olyan egyenletet oldunk meg, amelyben az ismeretlen függvény deriváltja szerepel — például <M t="\dfrac{dy}{dx} = f(x)" /> —, azt <strong>differenciálegyenletnek</strong> nevezzük. Az integrálás egy egész <em>görbecsaládot</em> (<M t="y = F(x)+C" />) ad. Ha viszont megadunk egyetlen pontot (<M t="y(x_0)=y_0" />), amelyen a görbének át kell haladnia, az egyértelműen kiválasztja az egyetlen megoldást!
        </p>
        <Def title="Kezdetiérték-feladat (Initial Value Problem)">
          <p>
            Az <M t="\dfrac{dy}{dx} = f(x)" /> differenciálegyenlet és az <M t="y(x_0) = y_0" /> kezdeti feltétel együttese. Megoldása két lépésben:
          </p>
          <ol>
            <li>Keresd meg az általános megoldást: <M t="y(x) = F(x) + C" />.</li>
            <li>Helyettesítsd be <M t="x=x_0,\; y=y_0" />-t, és számold ki <M t="C" /> pontos értékét!</li>
          </ol>
        </Def>
        <InitialValueWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Oldd meg a kezdetiérték-feladatot: <M t="\dfrac{dy}{dx} = 3x^2 - 4x + 2" />, <M t="y(1) = 5" />!
            </>
          }
        >
          <p>
            1) <M t="y(x) = x^3 - 2x^2 + 2x + C" />.
          </p>
          <p>
            2) <M t="y(1) = 1 - 2 + 2 + C = 5 \Rightarrow C = 4" />, tehát <M t="y(x) = x^3 - 2x^2 + 2x + 4" />!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Oldd meg a <strong>másodrendű</strong> kezdetiérték-feladatot: <M t="y''(x) = 6x" />, <M t="y'(0) = -2" />, <M t="y(0) = 3" />!
            </>
          }
        >
          <p>
            1. integrálás: <M t="y'(x) = 3x^2 + C_1" />. Mivel <M t="y'(0)=-2 \Rightarrow C_1=-2" />, így <M t="y'(x)=3x^2-2" />.
          </p>
          <p>
            2. integrálás: <M t="y(x) = x^3 - 2x + C_2" />. Mivel <M t="y(0)=3 \Rightarrow C_2=3" />, tehát <M t="y(x)=x^3 - 2x + 3" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Fizikai alkalmazás: mozgásegyenletek levezetése',
    body: (
      <>
        <p>
          A középiskolában meg kellett tanulni fejből az <M t="s(t) = s_0 + v_0 t - \frac{1}{2}gt^2" /> képletet. A kalkulussal viszont <strong>2 sorban levezetjük</strong> a szabadesés <M t="a(t) = -g" /> állandó gyorsulásából:
        </p>
        <M block t="v(t) = \int (-g)\,dt = -gt + C_1 \;\xrightarrow{\;v(0)=v_0\;}\; v(t) = v_0 - gt," />
        <M block t="s(t) = \int (v_0 - gt)\,dt = v_0 t - \frac{1}{2}gt^2 + C_2 \;\xrightarrow{\;s(0)=s_0\;}\; s(t) = s_0 + v_0 t - \frac{1}{2}gt^2!" />
        <ProjectileAntiderivWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Egy autó <M t="20" /> m/s (<M t="72" /> km/h) sebességgel halad, majd állandó <M t="a = -5\;\text{m/s}^2" /> lassulással fékez. Mennyi idő alatt és hány méter fékúton áll meg?
            </>
          }
        >
          <p>
            <M t="v(t) = 20 - 5t = 0 \Rightarrow t = 4" /> s alatt áll meg!
          </p>
          <p>
            Fékút: <M t="s(t) = 20t - 2{,}5t^2 \Rightarrow s(4) = 80 - 40 = \mathbf{40}" /> m!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy rakéta gyorsulása <M t="a(t) = 12t" /> (<M t="\text{m/s}^2" />), és nyugalomból (<M t="v(0)=0,\; s(0)=0" />) indul. Milyen magasra jut <M t="t=5" /> másodperc alatt?
            </>
          }
        >
          <p>
            <M t="v(t) = 6t^2" />, <M t="s(t) = 2t^3 \Rightarrow s(5) = 2\cdot 125 = 250" /> m!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Algebrai és trigonometrikus átírások integrálás előtt',
    body: (
      <>
        <p>
          Nagyon fontos különbség a deriváláshoz képest: <strong>nincs egyszerű szorzat- vagy hányadosszabály az integrálásra!</strong> Ha szorzatot vagy törtet látsz, előbb <em>alakítsd át összeggé</em>:
        </p>
        <ul>
          <li>
            <strong>1. Szorzat kibontása:</strong> <M t="\int x(2x^2-3)\,dx = \int (2x^3-3x)\,dx = \dfrac{x^4}{2} - \dfrac{3x^2}{2} + C" />.
          </li>
          <li>
            <strong>2. Tört szétbontása tagonként:</strong> <M t="\int \dfrac{x^2+3}{\sqrt{x}}\,dx = \int \left(x^{3/2} + 3x^{-1/2}\right)\,dx = \dfrac{2}{5}x^{5/2} + 6\sqrt{x} + C" />.
          </li>
          <li>
            <strong>3. Trigonometrikus azonosság:</strong> <M t="\int \operatorname{tg}^2 x\,dx = \int (\sec^2 x - 1)\,dx = \operatorname{tg} x - x + C" />!
          </li>
        </ul>
        <p>
          <strong>Az ellenőrzés szuperereje:</strong> bármelyik integrálási feladatodnál deriváld vissza a kapott eredményt! Ha visszakapod az integrandust, <strong>100%-ig biztosan jó a megoldásod!</strong>
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki: <M t="\int \dfrac{x^3 - 2x^2 + 1}{x^2}\,dx" />!
            </>
          }
        >
          <p>
            Szétbontva: <M t="\int (x - 2 + x^{-2})\,dx = \dfrac{x^2}{2} - 2x - \dfrac{1}{x} + C" />!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki: <M t="\int (1 + \operatorname{ctg}^2 x)\,dx" />! (Tipp: <M t="1+\operatorname{ctg}^2 x = \csc^2 x" />!)
            </>
          }
        >
          <p>
            <M t="\int \csc^2 x\,dx = -\operatorname{ctg} x + C" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglalás, az I. kötet lezárása és a 4 buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>fogalom / szabály</th>
              <th>képlet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Határozatlan integrál</td>
              <td><M t="\int f(x)\,dx = F(x) + C \quad (F'=f)" /></td>
            </tr>
            <tr>
              <td>Hatványszabály (<M t="n\ne -1" />)</td>
              <td><M t="\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C" /></td>
            </tr>
            <tr>
              <td>Lineáris belső (<M t="k\ne 0" />)</td>
              <td><M t="\int f(kx+b)\,dx = \dfrac{1}{k}F(kx+b) + C" /></td>
            </tr>
            <tr>
              <td>Kezdetiérték-feladat</td>
              <td><M t="y(x_0)=y_0" /> egyértelműen rögzíti <M t="C" />-t!</td>
            </tr>
          </tbody>
        </table>
        <Def title="Gratulálunk — befejezted a teljes I. kötetet!">
          <p>
            Ezzel a szakasszal lezárult a <strong>4. fejezet (A derivált alkalmazásai)</strong> és az egész <strong>I. kötet</strong> (mind a 30 szakasz: <em>1. Bevezetés → 2. Határérték és folytonosság → 3. Differenciálás → 4. A derivált alkalmazásai</em>)! A II. kötet az <strong>5. fejezettel (Integrálszámítás)</strong> folytatódik, ahol a primitív függvények és a görbe alatti területek a Newton–Leibniz-tételben forrnak össze!
          </p>
        </Def>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. A <M t="+C" /> lehagyása:</strong> határozatlan integrálnál <em>soha</em> ne felejtsd le a <M t="+C" /> integrációs állandót — különben csak egyetlen függvényt adsz meg a végtelen család helyett!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Szorzat/tört tényezőnkénti integrálása:</strong> <M t="\int f(x)g(x)\,dx \ne \left(\int f\right)\left(\int g\right)" />! Előbb mindig bontsd fel a zárójelet vagy a törtet!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. A <M t="\sin/\cos" /> előjelek felcserélése:</strong> <M t="\int \sin x\,dx = \mathbf{-}\cos x + C" />, míg <M t="\int \cos x\,dx = \mathbf{+}\sin x + C" />! Mindig ellenőrizd deriválással!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Az <M t="n=-1" /> tiltott eset:</strong> a <M t="\int x^{-1}\,dx" /> integrálra NEM alkalmazható a hatványszabály (nullával osztanál!).
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\int (5x^4 - 3x^2 + 7)\,dx" />!
            </>
          }
        >
          <p>
            <M t="x^5 - x^3 + 7x + C" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\int \left(\sqrt[3]{x} + \dfrac{4}{x^3}\right)\,dx" />!
            </>
          }
        >
          <p>
            <M t="\int (x^{1/3} + 4x^{-3})\,dx = \dfrac{3}{4}x^{4/3} - \dfrac{2}{x^2} + C" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\int (2\sin x - 3\cos x)\,dx" />!
            </>
          }
        >
          <p>
            <M t="-2\cos x - 3\sin x + C" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\int (2x - 1)^2\,dx" /> (kétféleképpen: kibontva ÉS a lineáris belső szabállyal)!
            </>
          }
        >
          <p>
            1) Kibontva: <M t="\int (4x^2 - 4x + 1)\,dx = \dfrac{4}{3}x^3 - 2x^2 + x + C_1" />.
          </p>
          <p>
            2) Lineáris szabállyal: <M t="\dfrac{(2x-1)^3}{6} + C_2 = \dfrac{8x^3-12x^2+6x-1}{6} + C_2 = \dfrac{4}{3}x^3 - 2x^2 + x + \left(C_2 - \dfrac{1}{6}\right)" /> — csak a konstansban különböznek!
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Oldd meg a kezdetiérték-feladatot: <M t="f'(x) = \dfrac{3}{\sqrt{x}} - 2" /> (<M t="x>0" />), <M t="f(4) = 10" />!
            </>
          }
        >
          <p>
            <M t="f(x) = 6\sqrt{x} - 2x + C" />. <M t="f(4) = 12 - 8 + C = 10 \Rightarrow C = 6" />, tehát <M t="f(x) = 6\sqrt{x} - 2x + 6" />!
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Számítsd ki: <M t="\int \dfrac{\sin x}{\cos^2 x}\,dx" />! (Tipp: írd át <M t="\sec x \operatorname{tg} x" /> alakra!)
            </>
          }
        >
          <p>
            <M t="\dfrac{\sin x}{\cos^2 x} = \dfrac{1}{\cos x}\cdot\dfrac{\sin x}{\cos x} = \sec x\operatorname{tg} x \;\Longrightarrow\; \int \sec x\operatorname{tg} x\,dx = \sec x + C" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              Oldd meg a másodrendű kezdetiérték-feladatot: <M t="y''(x) = \cos x + 2" />, <M t="y'(0) = 1" />, <M t="y(0) = -3" />!
            </>
          }
        >
          <p>
            1) <M t="y'(x) = \sin x + 2x + C_1" />; <M t="y'(0) = 0 + 0 + C_1 = 1 \Rightarrow C_1 = 1" />.
          </p>
          <p>
            2) <M t="y(x) = -\cos x + x^2 + x + C_2" />; <M t="y(0) = -1 + C_2 = -3 \Rightarrow C_2 = -2" />.
          </p>
          <p>
            Megoldás: <M t="y(x) = -\cos x + x^2 + x - 2" />!
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Egy kútba ejtett kő <M t="3" /> másodperc múlva csobban a vízbe (<M t="g = 9{,}8\;\text{m/s}^2" />, kezdősebesség <M t="0" />). Milyen mély a kút?
            </>
          }
        >
          <p>
            Lefelé választva a pozitív irányt: <M t="s(t) = \dfrac{1}{2}gt^2 = 4{,}9t^2 \Rightarrow s(3) = 4{,}9\cdot 9 = 44{,}1" /> m!
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              Számítsd ki: <M t="\int \cos^2 x\,dx" />! (Tipp: használd a félszög-azonosságot: <M t="\cos^2 x = \dfrac{1+\cos(2x)}{2}" />!)
            </>
          }
        >
          <p>
            <M t="\int \dfrac{1+\cos(2x)}{2}\,dx = \dfrac{1}{2}x + \dfrac{1}{4}\sin(2x) + C" />! (Ellenőrzés deriválással: <M t="\frac{1}{2} + \frac{1}{2}\cos(2x) = \cos^2 x" /> ✓!)
          </p>
        </Task>
      </>
    ),
  },
];
