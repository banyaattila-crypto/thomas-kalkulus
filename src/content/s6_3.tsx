import { M } from '../components/M';
import { Def, Quiz, Story, Task, Warn } from '../components/ui';
import {
  ArcDifferentialDiagram,
  ArcLengthComparisonWidget,
  ParametricCurvesShowcaseWidget,
  PolygonApproxArcWidget,
  VerticalTangentSwitchWidget,
} from '../components/Widgets63';
import type { Page } from './s1_1';

export const S6_3: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Töröttvonalas közelítés és a paraméteres ívhossz-képlet',
    body: (
      <>
        <Story>
          <p>
            Egy egyenes szakasz hosszát a Pitagorasz-tétellel bárki kiszámolja. De milyen hosszú egy <strong>görbe</strong> — például egy híd kábele, egy hullámvasút sínje vagy egy bolygópálya íve? Már Arkhimédész rájött a trükkre: bontsuk a görbét sok apró egyenes szakaszra (töröttvonalra), adjuk össze a hosszukat, majd finomítsuk a felosztást a végtelenségig!
          </p>
        </Story>
        <p>
          Egy paraméteresen adott <M t="x=f(t),\; y=g(t)" /> (<M t="a\le t\le b" />) görbe két szomszédos pontja közötti húr hossza a Pitagorasz-tétellel <M t="\sqrt{(\Delta x_k)^2+(\Delta y_k)^2}" />. A középértéktétellel <M t="\Delta x_k = f'(t_k^*)\Delta t_k" /> és <M t="\Delta y_k = g'(t_k^{**})\Delta t_k" />, így <M t="\|P\|\to 0" /> esetén a határérték:
        </p>
        <Def title="Paraméteresen adott sima görbe ívhossza">
          <p>
            Ha <M t="f'" /> és <M t="g'" /> folytonosak az <M t="[a;\,b]" /> intervallumon, egyszerre nem nullák, és a görbe pontosan egyszer fut végig az íven, akkor az ívhossz:
          </p>
          <M block t="L \;=\; \int_{a}^{b} \sqrt{\bigl[f'(t)\bigr]^2 + \bigl[g'(t)\bigr]^2}\,dt \;=\; \int_{a}^{b} \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt." />
        </Def>
        <PolygonApproxArcWidget />
        <h3>Első ellenőrzés: a kör kerülete</h3>
        <p>
          Az <M t="r" /> sugarú kör <M t="x=r\cos t,\; y=r\sin t" /> (<M t="0\le t\le 2\pi" />): <M t="(x')^2+(y')^2 = r^2\sin^2 t + r^2\cos^2 t = r^2" />, így <M t="L = \int_0^{2\pi} r\,dt = \mathbf{2\pi r}" />!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki az <M t="x=1+3t,\; y=2+4t" /> (<M t="0\le t\le 2" />) szakasz hosszát a paraméteres ívhossz-képlettel!
            </>
          }
        >
          <p>
            <M t="x'=3,\; y'=4 \implies \sqrt{3^2+4^2}=5" />, így <M t="L = \int_0^2 5\,dt = \mathbf{10}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Határozd meg az <M t="x=\dfrac{t^2}{2},\; y=\dfrac{t^3}{3}" /> (<M t="0\le t\le\sqrt{3}" />) görbe ívhosszát!
            </>
          }
        >
          <p>
            <M t="x'=t,\; y'=t^2 \implies \sqrt{t^2+t^4} = t\sqrt{1+t^2}" /> (<M t="t\ge 0" />). Az <M t="u=1+t^2,\; du=2t\,dt" /> (<M t="1\to 4" />) cserével:
          </p>
          <M block t="L = \frac{1}{2}\int_{1}^{4} u^{1/2}\,du = \frac{1}{3}\Bigl[u^{3/2}\Bigr]_{1}^{4} = \mathbf{\frac{7}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Híres paraméteres görbék: csillaggörbe és ciklois',
    body: (
      <>
        <Story>
          <p>
            A paraméteres ívhossz-képlet igazi ereje olyan gyönyörű görbéknél mutatkozik meg, amelyeket hagyományos <M t="y=f(x)" /> alakban nagyon nehéz kezelni — ilyen a négyágú <strong>csillaggörbe (asztroida)</strong> és a gördülő kerék által rajzolt <strong>ciklois</strong>!
          </p>
        </Story>
        <h3>Csillaggörbe (<M t="x=\cos^3 t,\; y=\sin^3 t,\; 0\le t\le 2\pi" />)</h3>
        <p>
          Szimmetria miatt elég az első síknegyedbeli darabot (<M t="0\le t\le\frac{\pi}{2}" />) kiszámolni és megszorozni <M t="4" />-gyel:
        </p>
        <M block t="\sqrt{(x')^2+(y')^2} = \sqrt{9\cos^4 t\sin^2 t + 9\sin^4 t\cos^2 t} = \sqrt{9\cos^2 t\sin^2 t(\cos^2 t+\sin^2 t)} = 3|\cos t\sin t|." />
        <p>
          Mivel <M t="[0;\,\frac{\pi}{2}]" />-n <M t="\cos t\sin t\ge 0" />, elhagyhatjuk az abszolút értéket:
          <M t="L = 4\int_0^{\pi/2} 3\sin t\cos t\,dt = 12\left[\frac{\sin^2 t}{2}\right]_0^{\pi/2} = \mathbf{6}" />!
        </p>
        <ParametricCurvesShowcaseWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Mekkora az <M t="x=a\cos^3 t,\; y=a\sin^3 t" /> (<M t="a>0,\; 0\le t\le 2\pi" />) általános csillaggörbe teljes hossza?
            </>
          }
        >
          <p>
            Mindkét deriváltban kiemelhető az <M t="a" />, így a teljes ívhossz egyszerűen <M t="\mathbf{6a}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Miért ad hibás (<M t="0" />) eredményt, ha a csillaggörbénél az abszolút érték nélkül integráljuk a <M t="3\sin t\cos t" /> kifejezést <M t="0" />-tól <M t="2\pi" />-ig?
            </>
          }
        >
          <p>
            Mert a II. és IV. síknegyedben <M t="\sin t\cos t < 0" />, így a <M t="\sqrt{\sin^2 t\cos^2 t} = |\sin t\cos t|" /> helyett negatív előjellel vennénk a hosszat, és a négy negyed kioltaná egymást!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Függvénygrafikon (y = f(x)) ívhossza és a teljes négyzet trükk',
    body: (
      <>
        <Story>
          <p>
            Ha a görbét <M t="y = f(x)" /> alakban kapjuk meg, egyszerűen válasszuk <M t="x = t" /> paraméterezést! Ekkor <M t="dx/dt = 1" /> és <M t="dy/dt = f'(x)" />, így máris megvan a klasszikus függvény-ívhossz képlet!
          </p>
        </Story>
        <Def title="Az y = f(x) görbe ívhossza az [a; b] intervallumon">
          <p>Ha <M t="f'" /> folytonos <M t="[a;\,b]" />-n, akkor:</p>
          <M block t="L \;=\; \int_{a}^{b} \sqrt{1 + \left(\frac{dy}{dx}\right)^2}\,dx \;=\; \int_{a}^{b} \sqrt{1 + \bigl[f'(x)\bigr]^2}\,dx." />
        </Def>
        <ArcDifferentialDiagram />
        <h3>A híres „teljes négyzet” algebrai trükk!</h3>
        <p>
          A négyzetgyök miatt a legtöbb ívhossz-integrál nehéz — a tankönyvi feladatokban viszont van egy gyönyörű minta, amit azonnal felismerhetsz: ha <M t="f'(x) = A - B" /> úgy, hogy <M t="4AB = 1" />, akkor a <M t="+1" /> pontosan <strong>megfordítja a középső előjelet</strong>:
        </p>
        <M block t="1 + (A - B)^2 \;=\; 1 + A^2 - 2AB + B^2 \;=\; A^2 + 2AB + B^2 \;=\; (A + B)^2 \;\Longrightarrow\; \sqrt{1+(A-B)^2} = A + B!" />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg az <M t="y = \dfrac{4\sqrt{2}}{3}x^{3/2} - 1" /> görbe hosszát a <M t="[0;\,1]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y' = 2\sqrt{2}\,x^{1/2} \implies (y')^2 = 8x" />. Így <M t="u = 1+8x,\; dx = \frac{1}{8}\,du" /> (<M t="1\to 9" />):
          </p>
          <M block t="L = \int_{0}^{1}\sqrt{1+8x}\,dx = \frac{1}{8}\cdot\frac{2}{3}\Bigl[u^{3/2}\Bigr]_{1}^{9} = \frac{27-1}{12} = \mathbf{\frac{13}{6}}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki a teljes négyzet trükkel az <M t="y = \dfrac{x^3}{12} + \dfrac{1}{x}" /> görbe hosszát az <M t="[1;\,4]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y' = \dfrac{x^2}{4} - \dfrac{1}{x^2}" />. Itt <M t="2AB = 2\cdot\frac{x^2}{4}\cdot\frac{1}{x^2} = \frac{1}{2}" />, tehát <M t="1+(y')^2 = \left(\dfrac{x^2}{4}+\dfrac{1}{x^2}\right)^2" />:
          </p>
          <M block t="L = \int_{1}^{4}\left(\frac{x^2}{4}+\frac{1}{x^2}\right)dx = \left[\frac{x^3}{12}-\frac{1}{x}\right]_{1}^{4} = \left(\frac{16}{3}-\frac{1}{4}\right)-\left(\frac{1}{12}-1\right) = \mathbf{6}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Függőleges érintő és változócsere (x = g(y))',
    body: (
      <>
        <Story>
          <p>
            Mi a teendő, ha egy görbének valamelyik pontban <strong>függőleges érintője</strong> van — azaz <M t="dy/dx \to \infty" />? Ilyenkor az <M t="x" /> szerinti ívhossz-integrál elromlik. A megoldás zseniálisan egyszerű: <strong>cserélj szerepet, és fejezd ki <M t="x" />-et <M t="y" /> függvényeként</strong>!
          </p>
        </Story>
        <Def title="Az x = g(y) görbe ívhossza a [c; d] intervallumon">
          <p>Ha <M t="g'" /> folytonos <M t="[c;\,d]" />-n, akkor:</p>
          <M block t="L \;=\; \int_{c}^{d} \sqrt{1 + \left(\frac{dx}{dy}\right)^2}\,dy \;=\; \int_{c}^{d} \sqrt{1 + \bigl[g'(y)\bigr]^2}\,dy." />
        </Def>
        <VerticalTangentSwitchWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Határozd meg az <M t="x = \dfrac{y^3}{3} + \dfrac{1}{4y}" /> görbe hosszát az <M t="[1;\,3]" /> (<M t="y" />) intervallumon!
            </>
          }
        >
          <p>
            <M t="x' = y^2 - \dfrac{1}{4y^2} \implies 1+(x')^2 = \left(y^2 + \dfrac{1}{4y^2}\right)^2" />:
          </p>
          <M block t="L = \int_{1}^{3}\left(y^2+\frac{1}{4y^2}\right)dy = \left[\frac{y^3}{3}-\frac{1}{4y}\right]_{1}^{3} = \left(9-\frac{1}{12}\right)-\left(\frac{1}{3}-\frac{1}{4}\right) = \mathbf{\frac{53}{6}}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Igazold a 4. ábra eredményét: számítsd ki az <M t="x = 2y^{3/2}" /> görbe hosszát a <M t="[0;\,1]" /> (<M t="y" />) intervallumon!
            </>
          }
        >
          <p>
            <M t="dx/dy = 3y^{1/2} \implies 1+(dx/dy)^2 = 1+9y" />. Az <M t="u=1+9y,\; dy=\frac{1}{9}\,du" /> (<M t="1\to 10" />) cserével:
          </p>
          <M block t="L = \frac{1}{9}\int_{1}^{10} u^{1/2}\,du = \frac{2}{27}\Bigl[u^{3/2}\Bigr]_{1}^{10} = \mathbf{\frac{2}{27}\left(10\sqrt{10}-1\right)}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Ívhossz-függvény és numerikus valóság',
    body: (
      <>
        <Story>
          <p>
            Őszintén szólva: a valódi mérnöki gyakorlatban a legtöbb görbe (még a legegyszerűbb <M t="y=\sin x" /> vagy egy ellipszis is!) olyan <M t="\sqrt{1+[f'(x)]^2}" /> integrált ad, amelynek <strong>nincs elemi primitív függvénye</strong>! Ilyenkor felírjuk a pontos integrált, majd numerikusan (pl. számítógéppel vagy a 8. fejezet szabályaival) közelítjük — és a max–min egyenlőtlenséggel gyorsan meg is becsülhetjük!
          </p>
        </Story>
        <ArcLengthComparisonWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Adj meg olyan <M t="y=f(x)" /> görbét, amely átmegy az <M t="(1;\,1)" /> ponton, és a hossza az <M t="[1;\,4]" /> intervallumon <M t="L = \displaystyle\int_1^4 \sqrt{1+\dfrac{1}{4x}}\,dx" />! Hány ilyen görbe létezik?
            </>
          }
        >
          <p>
            <M t="[f'(x)]^2 = \frac{1}{4x} \implies f'(x) = \pm\frac{1}{2\sqrt{x}} \implies f(x) = \pm\sqrt{x} + C" />. Az <M t="f(1)=1" /> feltételből <strong>két</strong> ilyen görbe létezik: <M t="f_1(x)=\sqrt{x}" /> és <M t="f_2(x)=2-\sqrt{x}" />!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Írd fel az <M t="y=\sin x" /> görbe ívhossz-integrálját a <M t="[0;\,\pi]" /> intervallumon, majd a max–min egyenlőtlenséggel igazold, hogy <M t="\pi \le L \le \pi\sqrt{2}" />!
            </>
          }
        >
          <p>
            <M t="L = \displaystyle\int_0^\pi \sqrt{1+\cos^2 x}\,dx" />. Mivel <M t="0\le\cos^2 x\le 1" />, ezért <M t="1 \le \sqrt{1+\cos^2 x} \le \sqrt{2}" />, amiből azonnal következik <M t="\mathbf{\pi \le L \le \pi\sqrt{2}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="6.3 Puskakártya">
          <ul>
            <li><strong>Paraméteres:</strong> <M t="L = \int_a^b \sqrt{(x')^2+(y')^2}\,dt" />.</li>
            <li><strong>Függvény (<M t="y=f(x)" />):</strong> <M t="L = \int_a^b \sqrt{1+[f'(x)]^2}\,dx" />.</li>
            <li><strong>Változócsere (<M t="x=g(y)" />):</strong> <M t="L = \int_c^d \sqrt{1+[g'(y)]^2}\,dy" /> (függőleges érintőnél!).</li>
            <li><strong>Teljes négyzet trükk:</strong> ha <M t="4AB=1" />, akkor <M t="1+(A-B)^2 = (A+B)^2" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Elfelejtett „1 +” vagy négyzet:</strong> a gyök alatt <em>mindig</em> <M t="1 + [f'(x)]^2" /> áll, nem <M t="1+f'(x)" /> és nem <M t="1+[f(x)]^2" />!
            </li>
            <li>
              <strong><M t="\sqrt{u^2} = |u|" /> előjelcsapda:</strong> ha a gyök alatti kifejezés teljes négyzet, ellenőrizd, hogy az alap nem vált-e előjelet az integrálási intervallumon (pl. csillaggörbe)!
            </li>
            <li>
              <strong>Többszöri bejárás:</strong> paraméteres görbénél győződj meg róla, hogy <M t="[a;\,b]" /> alatt a pont <em>egyszer</em> futja be a görbét!
            </li>
            <li>
              <strong>Függőleges érintő (<M t="f'\to\infty" />):</strong> ha a derivált végtelenbe tart, ne erőltesd <M t="x" /> szerint — válts <M t="x=g(y)" />-ra!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki az <M t="y=2x+3" /> egyenes <M t="[0;\,4]" /> szakaszának hosszát az ívhossz-integrállal, majd ellenőrizd Pitagorasz-tétellel!
            </>
          }
        >
          <p>
            <M t="y'=2 \implies L = \int_0^4 \sqrt{1+4}\,dx = \mathbf{4\sqrt{5}}" />. Pitagorasz: <M t="\sqrt{(4-0)^2+(11-3)^2}=\sqrt{16+64}=\sqrt{80}=4\sqrt{5}" /> ✓
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki az <M t="x=3\cos t,\; y=3\sin t" /> (<M t="0\le t\le\frac{\pi}{2}" />) körív hosszát!
            </>
          }
        >
          <p>
            <M t="\sqrt{9\sin^2 t+9\cos^2 t}=3 \implies L = \int_0^{\pi/2} 3\,dt = \mathbf{\dfrac{3\pi}{2}}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Számítsd ki az <M t="y=\dfrac{2}{3}x^{3/2}" /> görbe hosszát a <M t="[0;\,3]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y'=x^{1/2} \implies L = \int_0^3 \sqrt{1+x}\,dx = \left[\frac{2}{3}(1+x)^{3/2}\right]_0^3 = \frac{2}{3}(8-1) = \mathbf{\dfrac{14}{3}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Számítsd ki az <M t="y = \dfrac{x^3}{6} + \dfrac{1}{2x}" /> görbe hosszát az <M t="[1;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="y' = \frac{x^2}{2} - \frac{1}{2x^2} \implies 1+(y')^2 = \left(\frac{x^2}{2}+\frac{1}{2x^2}\right)^2" />:
          </p>
          <M block t="L = \int_{1}^{2}\left(\frac{x^2}{2}+\frac{1}{2x^2}\right)dx = \left[\frac{x^3}{6}-\frac{1}{2x}\right]_{1}^{2} = \left(\frac{4}{3}-\frac{1}{4}\right)-\left(\frac{1}{6}-\frac{1}{2}\right) = \mathbf{\frac{17}{12}}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Határozd meg az <M t="x=\dfrac{1}{3}t^3,\; y=\dfrac{1}{2}t^2" /> (<M t="0\le t\le\sqrt{3}" />) paraméteres görbe hosszát!
            </>
          }
        >
          <p>
            <M t="x'=t^2,\; y'=t \implies \sqrt{t^4+t^2} = t\sqrt{t^2+1}" />. Az <M t="u=t^2+1" /> (<M t="1\to 4" />) cserével:
          </p>
          <M block t="L = \frac{1}{2}\int_{1}^{4} u^{1/2}\,du = \frac{1}{3}(8-1) = \mathbf{\frac{7}{3}}." />
        </Task>
        <Task
          n={16}
          q={
            <>
              Határozd meg az <M t="x = \dfrac{y^4}{8} + \dfrac{1}{4y^2}" /> görbe hosszát az <M t="[1;\,2]" /> (<M t="y" />) intervallumon!
            </>
          }
        >
          <p>
            <M t="x' = \frac{y^3}{2}-\frac{1}{2y^3} \implies 1+(x')^2 = \left(\frac{y^3}{2}+\frac{1}{2y^3}\right)^2" />:
          </p>
          <M block t="L = \int_{1}^{2}\left(\frac{y^3}{2}+\frac{1}{2y^3}\right)dy = \left[\frac{y^4}{8}-\frac{1}{4y^2}\right]_{1}^{2} = \left(2-\frac{1}{16}\right)-\left(\frac{1}{8}-\frac{1}{4}\right) = \mathbf{\frac{33}{16}}." />
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              <em>Ciklois ívhossza:</em> igazold, hogy az <M t="x=a(\theta-\sin\theta),\; y=a(1-\cos\theta)" /> (<M t="a>0,\; 0\le\theta\le 2\pi" />) ciklois egy ívének hossza pontosan <M t="8a" />!
            </>
          }
        >
          <p>
            <M t="(x')^2+(y')^2 = a^2\bigl((1-\cos\theta)^2+\sin^2\theta\bigr) = a^2(2-2\cos\theta) = 4a^2\sin^2\left(\frac{\theta}{2}\right)" />. Mivel <M t="\frac{\theta}{2}\in[0;\,\pi]" />-n <M t="\sin(\frac{\theta}{2})\ge 0" />:
          </p>
          <M block t="L = \int_{0}^{2\pi} 2a\sin\left(\frac{\theta}{2}\right)d\theta = \left[-4a\cos\left(\frac{\theta}{2}\right)\right]_{0}^{2\pi} = 4a - (-4a) = \mathbf{8a}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              <em>A kör evolvens görbéje:</em> számítsd ki az <M t="x=\cos t + t\sin t,\; y=\sin t - t\cos t" /> (<M t="0\le t\le\pi" />) görbe pontos hosszát!
            </>
          }
        >
          <p>
            Szorzatszabállyal: <M t="x' = -\sin t + \sin t + t\cos t = t\cos t" /> és <M t="y' = \cos t - \cos t + t\sin t = t\sin t" />! Így <M t="\sqrt{(x')^2+(y')^2} = \sqrt{t^2(\cos^2 t+\sin^2 t)} = t" /> (<M t="t\ge 0" />):
          </p>
          <M block t="L = \int_{0}^{\pi} t\,dt = \mathbf{\frac{\pi^2}{2}}." />
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Skálázási tétel:</em> ha az <M t="y=f(x)" /> (<M t="[a;\,b]" />) görbét mindkét irányban <M t="k>0" /> arányban nagyítjuk (<M t="Y(X) = k\,f(X/k)" /> a <M t="[ka;\,kb]" />-n), igazold integrál-helyettesítéssel, hogy az új görbe hossza pontosan <M t="kL" />!
            </>
          }
        >
          <p>
            Láncszabállyal <M t="Y'(X) = k\,f'(X/k)\cdot\frac{1}{k} = f'(X/k)" />. Az <M t="x = X/k,\; dX = k\,dx" /> (<M t="ka\mapsto a,\; kb\mapsto b" />) cserével:
          </p>
          <M block t="L_{\text{új}} = \int_{ka}^{kb}\sqrt{1+\bigl[f'(X/k)\bigr]^2}\,dX = k\int_{a}^{b}\sqrt{1+\bigl[f'(x)\bigr]^2}\,dx = \mathbf{kL}. \quad\blacksquare" />
        </Task>

        <h3>Gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Miért szükséges az <M t="f'" /> folytonossága (simaság) az ívhosszképlet alkalmazásához?
            </>
          }
          options={[
            { label: <>Hogy a függvény pozitív legyen</> },
            { label: <>Hogy a <M t="\sqrt{1 + [f'(x)]^2}" /> integrandus folytonos és integrálható legyen</>, ok: true },
            { label: <>Hogy a görbe zárt legyen</> },
            { label: <>Hogy <M t="f''(x) = 0" /> legyen</> },
          ]}
          explain={
            <>
              Ha <M t="f'" /> folytonos <M t="[a;\,b]" />-n, akkor a gyökös integrandus is folytonos, így a Riemann-integrál biztosan létezik.
            </>
          }
        />
      </>
    ),
  },
];
