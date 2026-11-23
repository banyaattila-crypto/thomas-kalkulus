import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  ACVoltageRMSWidget,
  AlgebraicSubStepDiagram,
  EquivalentPrimitivesWidget,
  SubstitutionFlowDiagram,
  USubstitutionMatcherWidget,
} from '../components/Widgets55';
import type { Page } from './s1_1';

export const S5_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A határozatlan integrál és az u-helyettesítés alapgondolata',
    body: (
      <>
        <Story>
          <p>
            Az 5.4-es szakaszban a Newton–Leibniz-tétel megmutatta, hogy a határozott integrál kiszámításának kulcsa a <strong>primitív függvény</strong> megtalálása. Eddig csak egyszerű alapfüggvényeket integráltunk — de hogyan integráljunk egy összetett kifejezést, mint például <M t="\int 2x\sqrt{1+x^2}\,dx" />? A válasz: a <strong>láncszabály megfordítása</strong>, vagyis a helyettesítéses integrálás!
          </p>
        </Story>
        <Def title="Határozott vs. határozatlan integrál — ne keverd össze!">
          <ul>
            <li>
              <strong>Határozott integrál</strong> (<M t="\int_a^b f(x)\,dx" />): egy <strong>konkrét szám</strong> (előjeles terület).
            </li>
            <li>
              <strong>Határozatlan integrál</strong> (<M t="\int f(x)\,dx = F(x)+C" />): egy <strong>függvénycsalád</strong> (<M t="f" /> összes primitív függvénye, a tetszőleges <M t="+C" /> állandóval!).
            </li>
          </ul>
        </Def>
        <Def title="5. Tétel — A helyettesítési szabály (u-helyettesítés)">
          <p>
            Ha <M t="u = g(x)" /> differenciálható függvény, és <M t="f" /> folytonos <M t="g" /> értékkészletén, akkor a <M t="du = g'(x)\,dx" /> jelöléssel:
          </p>
          <M block t="\int f\bigl(g(x)\bigr)\cdot g'(x)\,dx \;=\; \int f(u)\,du." />
          <p>Speciálisan a hatványfüggvény integrálása <M t="u" />-val:</p>
          <M block t="\int u^n\,du \;=\; \frac{u^{n+1}}{n+1} + C \qquad (n \neq -1)." />
        </Def>
        <SubstitutionFlowDiagram />
        <h3>Első mintapélda: <M t="\int 2x\sqrt{1+x^2}\,dx" /></h3>
        <ol className="steps">
          <li><strong>Választás:</strong> <M t="u = 1 + x^2" /> (a gyök belseje).</li>
          <li><strong>Differenciál:</strong> <M t="du = 2x\,dx" /> — ez <em>pontosan</em> ott áll az integrálban!</li>
          <li><strong>Integrálás <M t="u" />-ra:</strong> <M t="\int \sqrt{u}\,du = \int u^{1/2}\,du = \frac{2}{3}u^{3/2} + C" />.</li>
          <li><strong>Visszahelyettesítés:</strong> <M t="\mathbf{\dfrac{2}{3}(1+x^2)^{3/2} + C}" />. <em>(Ellenőrzés deriválással: <M t="\frac{2}{3}\cdot\frac{3}{2}(1+x^2)^{1/2}\cdot 2x = 2x\sqrt{1+x^2}" /> ✓)</em></li>
        </ol>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki <M t="u = x^3+1" /> helyettesítéssel: <M t="\displaystyle\int 3x^2(x^3+1)^4\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x^3+1 \implies du = 3x^2\,dx" />. Így <M t="\int u^4\,du = \frac{u^5}{5} + C = \mathbf{\dfrac{1}{5}(x^3+1)^5 + C}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \cos(5x)\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = 5x \implies du = 5\,dx \implies dx = \frac{1}{5}\,du" />. Így <M t="\frac{1}{5}\int \cos u\,du = \mathbf{\dfrac{1}{5}\sin(5x) + C}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Hogyan válassz jó u-t? A „hiányzó konstans” trükk',
    body: (
      <>
        <Story>
          <p>
            A legtöbben nem az integráláson akadnak el, hanem azon: <em>„De honnan tudjam, mit válasszak <M t="u" />-nak?”</em> A jó hír az, hogy az integrandus szinte mindig „árulkodik”: keresd meg azt a belső részt, amelynek a <strong>deriváltja</strong> (legfeljebb egy konstans szorzótól eltekintve!) ott mosolyog mellette!
          </p>
        </Story>
        <h3>A konstans-igazítás szabadsága (és a változó tilalma!)</h3>
        <p>
          Ha <M t="u = 4x - 1" />, akkor <M t="du = 4\,dx" />. Ha az integrálban nincs ott a <M t="4" />-es szorzó, egyszerűen kifejezzük <M t="dx" />-et: <M t="dx = \frac{1}{4}\,du" />, és az <M t="\frac{1}{4}" /> konstanst kiemeljük az integráljel elé!
        </p>
        <p>
          <strong>Vigyázat!</strong> Csak <em>állandó számot</em> szabad kiemelni vagy pótolni! Ha <M t="\int \cos(x^2)\,dx" />-nél hiányzik az <M t="x" />, azt <strong>nem</strong> szabad <M t="\frac{1}{2x}" />-ként kiemelni az integráljel elé, mert <M t="x" /> változó!
        </p>
        <USubstitutionMatcherWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \sqrt{4x-1}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = 4x-1 \implies du = 4\,dx \implies dx = \frac{1}{4}\,du" />.
          </p>
          <M block t="\frac{1}{4}\int u^{1/2}\,du = \frac{1}{4}\cdot\frac{2}{3}u^{3/2} + C = \mathbf{\frac{1}{6}(4x-1)^{3/2} + C}." />
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int x^2\sin(x^3)\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x^3 \implies du = 3x^2\,dx \implies x^2\,dx = \frac{1}{3}\,du" />.
          </p>
          <M block t="\frac{1}{3}\int \sin u\,du = -\frac{1}{3}\cos u + C = \mathbf{-\frac{1}{3}\cos(x^3) + C}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Algebrai trükk: amikor „marad egy x” az integrálban',
    body: (
      <>
        <Story>
          <p>
            Néha megválasztjuk a természetes <M t="u" />-t (például a gyök belsejét), elvégezzük a <M t="du" /> cserét — és hoppá, még mindig marad egy kóbor <M t="x" /> az integrandusban! Ne add fel: sokszor egyszerűen <strong>ki tudjuk fejezni <M t="x" />-et <M t="u" />-val</strong>!
          </p>
        </Story>
        <AlgebraicSubStepDiagram />
        <h3>Kidolgozott példa — <M t="\int x\sqrt{2x+1}\,dx" /> befejezése</h3>
        <ol className="steps">
          <li>
            Az ábra szerint <M t="u = 2x+1" />, <M t="x = \frac{u-1}{2}" />, <M t="dx = \frac{1}{2}\,du" />:
            <M block t="\int x\sqrt{2x+1}\,dx = \frac{1}{4}\int (u-1)u^{1/2}\,du = \frac{1}{4}\int \left(u^{3/2} - u^{1/2}\right)du." />
          </li>
          <li>
            Tagokra bontva, hatványszabállyal integrálunk:
            <M block t="\frac{1}{4}\left(\frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2}\right) + C = \frac{1}{10}u^{5/2} - \frac{1}{6}u^{3/2} + C." />
          </li>
          <li>
            Visszaírjuk <M t="u = 2x+1" />-et:
            <M block t="\mathbf{\frac{1}{10}(2x+1)^{5/2} - \frac{1}{6}(2x+1)^{3/2} + C}." />
          </li>
        </ol>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki algebrai visszahelyettesítéssel: <M t="\displaystyle\int x\sqrt{x+3}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x+3 \implies x = u-3,\; dx = du" />:
          </p>
          <M block t="\int (u-3)u^{1/2}\,du = \int\left(u^{3/2}-3u^{1/2}\right)du = \frac{2}{5}u^{5/2} - 2u^{3/2} + C = \mathbf{\frac{2}{5}(x+3)^{5/2} - 2(x+3)^{3/2} + C}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int x^3\sqrt{x^2+1}\,dx" />! <em>(Tipp: bontsd <M t="x^3 = x^2\cdot x" /> alakra!)</em>
            </>
          }
        >
          <p>
            <M t="u = x^2+1 \implies x^2 = u-1" /> és <M t="du = 2x\,dx \implies x\,dx = \frac{1}{2}\,du" />:
          </p>
          <M block t="\frac{1}{2}\int (u-1)u^{1/2}\,du = \frac{1}{2}\left(\frac{2}{5}u^{5/2}-\frac{2}{3}u^{3/2}\right)+C = \mathbf{\frac{1}{5}(x^2+1)^{5/2}-\frac{1}{3}(x^2+1)^{3/2}+C}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Trigonometrikus integrálok és a sin² x, cos² x képletek',
    body: (
      <>
        <Story>
          <p>
            A trigonometrikus integráloknál néha furcsa jelenséggel találkozol: két diák két különböző helyettesítéssel két <em>teljesen másképp kinéző</em> eredményt kap ugyanarra az integrálra — és <strong>mindkettőjüké hibátlan</strong>! Hogyan lehetséges ez?
          </p>
        </Story>
        <h3>Egy integrál — három különbözőnek tűnő, mégis azonos válasz!</h3>
        <p>Tekintsük az <M t="\int 2\sin x\cos x\,dx" /> integrált:</p>
        <ul>
          <li><M t="u = \sin x" /> helyettesítéssel: <M t="\int 2u\,du = \mathbf{\sin^2 x + C_1}" />.</li>
          <li><M t="u = \cos x" /> helyettesítéssel: <M t="\int (-2u)\,du = \mathbf{-\cos^2 x + C_2}" />.</li>
          <li>A <M t="2\sin x\cos x = \sin(2x)" /> azonossággal: <M t="\int \sin(2x)\,dx = \mathbf{-\frac{1}{2}\cos(2x) + C_3}" />.</li>
        </ul>
        <p>
          Miért jó mindhárom? Mert a Pitagorasz-azonosság (<M t="\sin^2 x + \cos^2 x = 1" />) miatt <strong>csak egy állandóban különböznek</strong> (<M t="\sin^2 x - (-\cos^2 x) = 1" />), amit a <M t="+C" /> elnyel!
        </p>
        <EquivalentPrimitivesWidget />
        <h3>Hogyan integráljuk a <M t="\sin^2 x" /> és <M t="\cos^2 x" /> függvényeket?</h3>
        <p>
          Itt hiányzik a külső <M t="\cos x" /> vagy <M t="\sin x" /> szorzó, ezért a sima <M t="u=\sin x" /> nem működik! A trükk a <strong>félszög-azonosság</strong>, amely első hatványra csökkenti a fokszámot:
        </p>
        <Def title="Félszög-azonosságok és a sin² x, cos² x integráljai">
          <M block t="\sin^2 x = \frac{1-\cos 2x}{2} \quad\Longrightarrow\quad \int \sin^2 x\,dx = \frac{x}{2} - \frac{\sin 2x}{4} + C" />
          <M block t="\cos^2 x = \frac{1+\cos 2x}{2} \quad\Longrightarrow\quad \int \cos^2 x\,dx = \frac{x}{2} + \frac{\sin 2x}{4} + C" />
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \sin^4(2x)\cos(2x)\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = \sin(2x) \implies du = 2\cos(2x)\,dx \implies \cos(2x)\,dx = \frac{1}{2}\,du" />.
          </p>
          <M block t="\frac{1}{2}\int u^4\,du = \frac{1}{10}u^5 + C = \mathbf{\frac{1}{10}\sin^5(2x) + C}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki a félszög-azonossággal: <M t="\displaystyle\int \cos^2(3x)\,dx" />!
            </>
          }
        >
          <p>
            <M t="\cos^2(3x) = \dfrac{1+\cos(6x)}{2}" />, ezért:
          </p>
          <M block t="\int \frac{1+\cos(6x)}{2}\,dx = \mathbf{\frac{x}{2} + \frac{\sin(6x)}{12} + C}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Alkalmazás: miért 325 V a „230 voltos” konnektor csúcsa?',
    body: (
      <>
        <Story>
          <p>
            A fali konnektorból érkező váltakozó áram feszültsége másodpercenként 50-szer vált irányt (<M t="50\text{ Hz}" />): <M t="V(t) = V_{\max}\sin(100\pi t)" />. Ha egy teljes periódusra (<M t="T = \frac{1}{50}\text{ s}" />) kiszámítjuk az átlagfeszültséget, pontosan <strong>nullát</strong> kapunk! Akkor mit jelent mégis a „230 volt”?
          </p>
        </Story>
        <p>
          A hőhatás és a teljesítmény a feszültség <em>négyzetével</em> arányos (<M t="P = V^2/R" />), ami mindig nemnegatív! Ezért a mérnökök a feszültségnégyzet átlagának négyzetgyökét, az úgynevezett <strong>effektív (RMS) feszültséget</strong> használják:
        </p>
        <M block t="V_{\text{eff}} \;=\; \sqrt{(V^2)_{\text{átlag}}} \;=\; \sqrt{\frac{1}{1/50}\int_{0}^{1/50} V_{\max}^2 \sin^2(100\pi t)\,dt}." />
        <p>
          Az előző oldalon tanult félszög-azonossággal (<M t="\sin^2(100\pi t) = \frac{1-\cos(200\pi t)}{2}" />) a koszinusz egy teljes periódus alatt eltűnik, így marad:
        </p>
        <M block t="(V^2)_{\text{átlag}} = \frac{V_{\max}^2}{2} \quad\Longrightarrow\quad V_{\text{eff}} = \frac{V_{\max}}{\sqrt{2}} \quad\Longrightarrow\quad V_{\max} = \sqrt{2}\,V_{\text{eff}}." />
        <p>
          Európában <M t="V_{\text{eff}} = 230\text{ V}" />, ezért a konnektorban a valós feszültségcsúcs <strong><M t="V_{\max} = 230\sqrt{2} \approx 325{,}3\text{ V}" /></strong>!
        </p>
        <ACVoltageRMSWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki az <M t="\displaystyle\int_{0}^{\pi}\sin^2 x\,dx" /> határozott integrált!
            </>
          }
        >
          <p>
            <M t="\left[\dfrac{x}{2} - \dfrac{\sin 2x}{4}\right]_{0}^{\pi} = \left(\dfrac{\pi}{2} - 0\right) - (0 - 0) = \mathbf{\dfrac{\pi}{2}}" />. (Átlagértéke a <M t="[0;\,\pi]" />-n éppen <M t="\frac{1}{2}" />!)
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Az Egyesült Államokban a hálózati effektív feszültség <M t="110\text{ V}" />. Mekkora ott a csúcsfeszültség (<M t="V_{\max}" />)?
            </>
          }
        >
          <p>
            <M t="V_{\max} = 110\sqrt{2} \approx \mathbf{155{,}6\text{ V}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Kezdetiérték-feladatok (IVP) helyettesítéssel',
    body: (
      <>
        <Story>
          <p>
            A 4.8-as szakaszban már megoldottunk egyszerű kezdetiérték-feladatokat (<M t="y'=f(x)" />, <M t="y(x_0)=y_0" />). Az <M t="u" />-helyettesítés birtokában most sokkal gazdagabb fizikai és műszaki mozgásegyenleteket tudunk zárt alakban megoldani!
          </p>
        </Story>
        <h3>Kidolgozott példa</h3>
        <p>
          Oldjuk meg az <M t="\dfrac{ds}{dt} = 12t(3t^2-1)^3" /> egyenletet az <M t="s(1) = 3" /> kezdeti feltétellel!
        </p>
        <ol className="steps">
          <li>
            <strong>Általános megoldás <M t="u" />-helyettesítéssel:</strong> legyen <M t="u = 3t^2-1 \implies du = 6t\,dt \implies 12t\,dt = 2\,du" />.
            <M block t="s(t) = \int 12t(3t^2-1)^3\,dt = 2\int u^3\,du = \frac{1}{2}u^4 + C = \frac{1}{2}(3t^2-1)^4 + C." />
          </li>
          <li>
            <strong>A <M t="C" /> meghatározása az <M t="s(1)=3" /> feltételből:</strong>
            <M block t="3 = \frac{1}{2}(3\cdot 1^2 - 1)^4 + C = \frac{1}{2}\cdot 16 + C = 8 + C \implies C = -5." />
          </li>
          <li>
            <strong>Végső válasz:</strong> <M t="s(t) = \mathbf{\dfrac{1}{2}(3t^2-1)^4 - 5}" />.
          </li>
        </ol>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Oldd meg a kezdetiérték-feladatot: <M t="\dfrac{dy}{dx} = 4x(x^2+8)^{-1/3}" />, <M t="y(0) = 0" />!
            </>
          }
        >
          <p>
            <M t="u = x^2+8 \implies du = 2x\,dx \implies 4x\,dx = 2\,du" />:
            <M block t="y = 2\int u^{-1/3}\,du = 2\cdot\frac{3}{2}u^{2/3} + C = 3(x^2+8)^{2/3} + C." />
            <M t="y(0)=0 \implies 3\cdot 8^{2/3}+C = 3\cdot 4 + C = 0 \implies C = -12" />, tehát <M t="y(x) = \mathbf{3(x^2+8)^{2/3} - 12}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy részecske sebessége <M t="v(t) = 6\sin(2t)\;\text{m/s}" />, kezdeti helye <M t="s(0)=0" />. Hol van a részecske <M t="t = \frac{\pi}{2}" /> másodperckor?
            </>
          }
        >
          <p>
            <M t="s(t) = \int 6\sin(2t)\,dt = -3\cos(2t) + C" />. Mivel <M t="s(0)=-3+C=0 \implies C=3" />, ezért <M t="s(t) = 3 - 3\cos(2t)" />. Behelyettesítve: <M t="s\left(\frac{\pi}{2}\right) = 3 - 3\cos\pi = 3 - (-3) = \mathbf{6\text{ m}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="5.5 Puskakártya">
          <ul>
            <li><strong>Helyettesítési szabály:</strong> <M t="\int f(g(x))g'(x)\,dx = \int f(u)\,du" /> (<M t="u=g(x),\;du=g'(x)\,dx" />).</li>
            <li><strong>Hatványszabály <M t="u" />-val:</strong> <M t="\int u^n\,du = \frac{u^{n+1}}{n+1}+C" /> (<M t="n\ne -1" />).</li>
            <li><strong>Algebrai trükk:</strong> ha marad <M t="x" />, fejezd ki <M t="u" />-ból (pl. <M t="u=2x+1 \implies x=\frac{u-1}{2}" />).</li>
            <li><strong>Félszög-integrálok:</strong> <M t="\int\sin^2 x\,dx=\frac{x}{2}-\frac{\sin 2x}{4}+C" />, <M t="\int\cos^2 x\,dx=\frac{x}{2}+\frac{\sin 2x}{4}+C" />.</li>
            <li><strong>Effektív feszültség:</strong> <M t="V_{\text{eff}} = \frac{V_{\max}}{\sqrt{2}}" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Változót (<M t="x" />-et) TILOS kiemelni az integráljel elé!</strong> Csak állandó szorzót szabad kivinni — ha változó marad, vagy fejezd ki <M t="u" />-val, vagy rossz <M t="u" />-t választottál.
            </li>
            <li>
              <strong>Elfelejtett konstansszorzó a <M t="du" />-ból:</strong> <M t="\int \cos(5x)\,dx" /> eredménye <M t="\frac{1}{5}\sin(5x)+C" />, NEM <M t="\sin(5x)+C" /> és NEM <M t="5\sin(5x)+C" />!
            </li>
            <li>
              <strong>Félbehagyott válasz (<M t="u" />-ban hagyva vagy <M t="+C" /> nélkül):</strong> határozatlan integrálnál mindig írd vissza <M t="x" />-re és tedd oda a <M t="+C" />-t!
            </li>
            <li>
              <strong>Mindig ellenőrizz visszaderiválással!</strong> Ha a válaszod deriváltja nem adja vissza pontosan az integrandust, valahol elcsúszott egy előjel vagy konstans.
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int (2x+1)^5\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = 2x+1,\; dx = \frac{1}{2}\,du \implies \frac{1}{2}\cdot\frac{u^6}{6}+C = \mathbf{\dfrac{1}{12}(2x+1)^6 + C}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int 6x^2\sqrt{x^3-2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x^3-2,\; du = 3x^2\,dx \implies 6x^2\,dx = 2\,du \implies 2\cdot\frac{2}{3}u^{3/2}+C = \mathbf{\dfrac{4}{3}(x^3-2)^{3/2} + C}" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \sec^2(3x+2)\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = 3x+2,\; dx = \frac{1}{3}\,du \implies \frac{1}{3}\int\sec^2 u\,du = \mathbf{\dfrac{1}{3}\operatorname{tg}(3x+2) + C}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \dfrac{\cos\sqrt{x}}{\sqrt{x}}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = \sqrt{x} \implies du = \dfrac{1}{2\sqrt{x}}\,dx \implies \dfrac{dx}{\sqrt{x}} = 2\,du" />.
          </p>
          <M block t="2\int \cos u\,du = 2\sin u + C = \mathbf{2\sin\sqrt{x} + C}." />
        </Task>
        <Task
          n={17}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \dfrac{\sin(2t+1)}{\cos^2(2t+1)}\,dt" />!
            </>
          }
        >
          <p>
            <M t="u = \cos(2t+1) \implies du = -2\sin(2t+1)\,dt \implies \sin(2t+1)\,dt = -\frac{1}{2}\,du" />.
          </p>
          <M block t="-\frac{1}{2}\int u^{-2}\,du = -\frac{1}{2}\left(-\frac{1}{u}\right) + C = \mathbf{\frac{1}{2\cos(2t+1)} + C} = \frac{1}{2}\sec(2t+1) + C." />
        </Task>
        <Task
          n={18}
          q={
            <>
              Számítsd ki algebrai visszahelyettesítéssel: <M t="\displaystyle\int x\sqrt{3x-2}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = 3x-2 \implies x = \frac{u+2}{3},\; dx = \frac{1}{3}\,du" />:
          </p>
          <M block t="\frac{1}{9}\int (u+2)u^{1/2}\,du = \frac{1}{9}\left(\frac{2}{5}u^{5/2} + \frac{4}{3}u^{3/2}\right)+C = \mathbf{\frac{2}{45}(3x-2)^{5/2} + \frac{4}{27}(3x-2)^{3/2} + C}." />
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int \dfrac{1}{x^2}\cos\left(\dfrac{1}{x}\right)\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = \frac{1}{x} = x^{-1} \implies du = -\frac{1}{x^2}\,dx \implies \frac{1}{x^2}\,dx = -du" />.
          </p>
          <M block t="-\int \cos u\,du = -\sin u + C = \mathbf{-\sin\left(\frac{1}{x}\right) + C}." />
        </Task>
        <Task
          n={20}
          q={
            <>
              Számítsd ki az <M t="\displaystyle\int \sec^2 x\operatorname{tg} x\,dx" /> integrált kétféleképpen: (a) <M t="u=\operatorname{tg} x" />, (b) <M t="u=\sec x" /> helyettesítéssel! Igazold, hogy mindkét eredmény helyes!
            </>
          }
        >
          <p>
            (a) <M t="u = \operatorname{tg} x,\; du = \sec^2 x\,dx \implies \int u\,du = \dfrac{\operatorname{tg}^2 x}{2} + C_1" />.<br />
            (b) <M t="u = \sec x,\; du = \sec x\operatorname{tg} x\,dx \implies \int u\,du = \dfrac{\sec^2 x}{2} + C_2" />.<br />
            Mindkettő helyes, mert a különbségük állandó: <M t="\dfrac{\sec^2 x}{2} - \dfrac{\operatorname{tg}^2 x}{2} = \dfrac{1 + \operatorname{tg}^2 x - \operatorname{tg}^2 x}{2} = \mathbf{\dfrac{1}{2}}" />!
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              <em>Másodrendű IVP:</em> egy részecske gyorsulása <M t="a(t) = \pi^2\cos(\pi t)\;\text{m/s}^2" />, kezdeti értékei <M t="s(0)=0" /> és <M t="v(0)=8\;\text{m/s}" />. Határozd meg a helyét <M t="t=1\;\text{s}" /> időpontban!
            </>
          }
        >
          <p>
            Először a sebesség (<M t="u=\pi t" />): <M t="v(t) = \int \pi^2\cos(\pi t)\,dt = \pi\sin(\pi t) + C_1" />. Mivel <M t="v(0)=8 \implies C_1 = 8" />, így <M t="v(t) = \pi\sin(\pi t) + 8" />.
          </p>
          <p>
            Másodszor a hely: <M t="s(t) = \int (\pi\sin(\pi t)+8)\,dt = -\cos(\pi t) + 8t + C_2" />. Mivel <M t="s(0) = -1 + C_2 = 0 \implies C_2 = 1" />, tehát <M t="s(t) = 1 - \cos(\pi t) + 8t" />.
          </p>
          <p>
            <M t="t=1" /> esetén: <M t="s(1) = 1 - \cos\pi + 8 = 1 - (-1) + 8 = \mathbf{10\text{ m}}" />.
          </p>
        </Task>
      </>
    ),
  },
];
