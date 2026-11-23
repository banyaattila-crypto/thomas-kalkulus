import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  PlateCentroidExplorerWidget,
  SeesawBalanceWidget,
  StripCentroidDiagram,
  VariableDensityRodWidget,
  WireVsPlateCentroidDiagram,
} from '../components/Widgets64';
import type { Page } from './s1_1';

export const S6_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Libikóka, nyomaték és diszkrét tömegközéppont',
    body: (
      <>
        <Story>
          <p>
            Ha feldobsz egy csavarkulcsot a levegőbe, őrülten pörög — mégis van benne egyetlen mágikus pont, a <strong>tömegközéppont</strong>, amely tökéletes, sima parabolapályán repül! Hasonlóképp, ha egy rúdra különböző tömegeket akasztunk, hol kell alátámasztani, hogy tökéletes egyensúlyban maradjon?
          </p>
        </Story>
        <p>
          Egy <M t="x_k" /> helyen lévő <M t="m_k" /> tömeg forgató hatása (forgatónyomatéka) az <M t="\bar{x}" /> alátámasztási pontra nézve <M t="(x_k - \bar{x})m_k g" />. Az egyensúly feltétele, hogy ezek összege nulla legyen: <M t="\sum (x_k - \bar{x})m_k = 0" />, amiből azonnal kijön <M t="\bar{x}" />!
        </p>
        <Def title="Diszkrét pontrendszer nyomatéka és tömegközéppontja">
          <ul>
            <li>
              <strong>Egyenes mentén (<M t="x" />-tengely):</strong> össztömeg <M t="M = \sum m_k" />, origóra vett (elsőrendű) nyomaték <M t="M_0 = \sum m_k x_k" />, tömegközéppont:
              <M block t="\bar{x} \;=\; \frac{M_0}{M} \;=\; \frac{\sum m_k x_k}{\sum m_k}." />
            </li>
            <li>
              <strong>Síkban (<M t="(x_k;\,y_k)" /> pontok):</strong> az <M t="y" />-tengelyre vett nyomaték <M t="M_y = \sum m_k x_k" />, az <M t="x" />-tengelyre vett nyomaték <M t="M_x = \sum m_k y_k" />, és:
              <M block t="\bar{x} = \frac{M_y}{M}, \qquad \bar{y} = \frac{M_x}{M}." />
            </li>
          </ul>
        </Def>
        <p>
          <em>Elnevezési megjegyzés:</em> a fizika az <M t="\sum m_k x_k" /> mennyiséget gyakran <em>elsőrendű (statikai) tömegnyomatéknak</em> nevezi, míg a tankönyv magyar kiadása egyszerűen <em>nyomaték / tehetetlenségi nyomaték</em> néven említi. A lényeg a képlet: <strong>tömeg × előjeles távolság a tengelytől</strong>!
        </p>
        <SeesawBalanceWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Az <M t="x" />-tengelyen az <M t="x=-3,\;1,\;4" /> pontokban rendre <M t="2\text{ kg},\;5\text{ kg},\;3\text{ kg}" /> tömegek vannak. Hol van a rendszer tömegközéppontja?
            </>
          }
        >
          <p>
            <M t="M = 2+5+3 = 10\text{ kg}" />, <M t="M_0 = 2(-3)+5(1)+3(4) = -6+5+12 = 11" />, így <M t="\bar{x} = \dfrac{11}{10} = \mathbf{1{,}1}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              A síkon a <M t="(0;\,0)" />, <M t="(4;\,0)" />, <M t="(0;\,5)" /> pontokban <M t="2\text{ kg},\;3\text{ kg},\;5\text{ kg}" /> tömegek ülnek. Határozd meg a <M t="(\bar{x};\,\bar{y})" /> tömegközéppontot!
            </>
          }
        >
          <p>
            <M t="M = 2+3+5 = 10" />.<br />
            <M t="M_y = 2(0)+3(4)+5(0) = 12 \implies \bar{x} = \mathbf{1{,}2}" />.<br />
            <M t="M_x = 2(0)+3(0)+5(5) = 25 \implies \bar{y} = \mathbf{2{,}5}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Vékony rudak és huzalok (változó sűrűség δ(x))',
    body: (
      <>
        <Story>
          <p>
            Most lépjünk tovább a ponttömegektől egy valódi, folytonos tárgyhoz: egy <M t="[a;\,b]" /> szakaszon fekvő fémrúdhoz, amely akár az egyik végén vastagabb vagy sűrűbb is lehet! Egy <M t="\Delta x" /> hosszú darabka tömege <M t="\Delta m \approx \delta(x)\,\Delta x" />, ahol <M t="\delta(x)" /> a hosszúságegységre jutó tömeg (vonalmenti sűrűség).
          </p>
        </Story>
        <Def title="Vékony rúd tömege, nyomatéka és tömegközéppontja [a; b]-n">
          <M block t="M = \int_{a}^{b} \delta(x)\,dx, \qquad M_0 = \int_{a}^{b} x\,\delta(x)\,dx, \qquad \bar{x} = \frac{M_0}{M}." />
        </Def>
        <p>
          Ha a rúd <strong>homogén</strong> (<M t="\delta(x) = \delta" /> állandó), akkor <M t="\delta" /> kiegyszerűsödik a számlálóból és nevezőből, és pontosan a felezőpontot kapjuk: <M t="\bar{x} = \frac{a+b}{2}" />! Ha viszont jobbra nehezedik, <M t="\bar{x}" /> jobbra tolódik:
        </p>
        <VariableDensityRodWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy <M t="[0;\,6]" /> szakaszon fekvő rúd sűrűsége <M t="\delta(x) = 2 + x\;\text{(kg/m)}" />. Számítsd ki a tömegét és a tömegközéppontját!
            </>
          }
        >
          <p>
            <M t="M = \int_0^6(2+x)\,dx = \left[2x+\frac{x^2}{2}\right]_0^6 = 12+18 = \mathbf{30\text{ kg}}" />.<br />
            <M t="M_0 = \int_0^6(2x+x^2)\,dx = \left[x^2+\frac{x^3}{3}\right]_0^6 = 36+72 = 108" />.<br />
            <M t="\bar{x} = \dfrac{108}{30} = \mathbf{3{,}6\text{ m}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Egy <M t="[1;\,4]" /> szakaszon fekvő rúd sűrűsége <M t="\delta(x)=\dfrac{1}{\sqrt{x}}" />. Hol van a tömegközéppontja?
            </>
          }
        >
          <p>
            <M t="M = \int_1^4 x^{-1/2}\,dx = \Bigl[2\sqrt{x}\Bigr]_1^4 = 4-2 = 2" />.<br />
            <M t="M_0 = \int_1^4 x^{1/2}\,dx = \left[\frac{2}{3}x^{3/2}\right]_1^4 = \frac{14}{3}" />.<br />
            <M t="\bar{x} = \dfrac{14/3}{2} = \mathbf{\dfrac{7}{3}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Síkbeli vékony lemezek (2D tömegközéppont és súlypont)',
    body: (
      <>
        <Story>
          <p>
            Hogyan találjuk meg egy kartonlapból kivágott síkidom (egy vékony lemez) egyensúlyi pontját, ahol egyetlen tű hegyén megáll? Vágjuk fel a lemezt vékony függőleges csíkokra! Minden csík tömege <M t="dm = \delta(x)[f(x)-g(x)]\,dx" />, a csík saját közepe pedig az <M t="\tilde{x}=x,\; \tilde{y}=\frac{f(x)+g(x)}{2}" /> pontban van!
          </p>
        </Story>
        <StripCentroidDiagram />
        <Def title="Vékony síklemez tömegközéppontja (f(x) ≥ g(x) az [a; b]-n)">
          <M block t="M = \int_{a}^{b} \delta(x)\bigl[f(x)-g(x)\bigr]\,dx, \qquad M_y = \int_{a}^{b} x\,\delta(x)\bigl[f(x)-g(x)\bigr]\,dx," />
          <M block t="M_x = \frac{1}{2}\int_{a}^{b} \delta(x)\Bigl(\bigl[f(x)\bigr]^2 - \bigl[g(x)\bigr]^2\Bigr)\,dx, \qquad \bar{x}=\frac{M_y}{M},\quad \bar{y}=\frac{M_x}{M}." />
          <p>
            Ha a lemez <strong>homogén</strong> (állandó <M t="\delta" />), a sűrűség kiesik, és a geometriai <strong>súlypontot (centroidot)</strong> kapjuk: itt <M t="M" /> helyére egyszerűen a tartomány <M t="A" /> területe lép!
          </p>
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg az <M t="y=4-x^2" /> parabola és az <M t="x" />-tengely által bezárt homogén lemez súlypontját!
            </>
          }
        >
          <p>
            Szimmetria miatt <M t="\bar{x} = \mathbf{0}" />. A terület: <M t="A = 2\int_0^2(4-x^2)\,dx = \frac{32}{3}" />.
          </p>
          <M block t="M_x = \frac{1}{2}\cdot 2\int_{0}^{2}(4-x^2)^2\,dx = \int_{0}^{2}(16-8x^2+x^4)\,dx = \left[16x-\frac{8}{3}x^3+\frac{x^5}{5}\right]_{0}^{2} = \frac{256}{15}." />
          <p>
            Tehát <M t="\bar{y} = \dfrac{256/15}{32/3} = \mathbf{\dfrac{8}{5} = 1{,}6}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Határozd meg a <M t="(0;\,0),\;(b;\,0),\;(0;\,h)" /> csúcsú derékszögű háromszög súlypontját integrálással!
            </>
          }
        >
          <p>
            Az átfogó egyenlete <M t="f(x)=h\left(1-\frac{x}{b}\right)" />, terület <M t="A=\frac{bh}{2}" />:
          </p>
          <M block t="M_y = \int_{0}^{b} x\cdot h\left(1-\frac{x}{b}\right)dx = h\left[\frac{x^2}{2}-\frac{x^3}{3b}\right]_{0}^{b} = \frac{b^2 h}{6} \implies \bar{x} = \frac{b^2 h/6}{bh/2} = \mathbf{\frac{b}{3}}." />
          <p>
            Hasonlóan <M t="\bar{y} = \mathbf{\dfrac{h}{3}}" /> — azaz a háromszög súlypontja a csúcsok számtani közepe!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Szimmetria és híres síkidomok súlypontja',
    body: (
      <>
        <Story>
          <p>
            Mielőtt integrálni kezdenél egy homogén lemez súlypontjához, mindig állj meg két másodpercre és keress <strong>szimmetriát</strong>! Ha a síkidom szimmetrikus egy egyenesre, a súlypontja <em>garantáltan</em> rajta fekszik ezen a tengelyen — ezzel egy egész integrált megspórolsz!
          </p>
        </Story>
        <PlateCentroidExplorerWidget />
        <h3>Hogyan jön ki a félkör híres <M t="\frac{4r}{3\pi}" /> képlete?</h3>
        <p>
          Az <M t="y=\sqrt{r^2-x^2}" /> (<M t="[-r;\,r]" />) félkör <M t="y" />-tengelyre szimmetrikus (<M t="\bar{x}=0" />), területe <M t="A=\frac{\pi r^2}{2}" />. Az <M t="M_x" /> integrálban a négyzetre emelés eltünteti a gyököt:
        </p>
        <M block t="M_x = \frac{1}{2}\int_{-r}^{r}\left(\sqrt{r^2-x^2}\right)^2 dx = \int_{0}^{r}(r^2-x^2)\,dx = \frac{2}{3}r^3 \implies \bar{y} = \frac{2r^3/3}{\pi r^2/2} = \mathbf{\frac{4r}{3\pi}}." />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy <M t="r=6\text{ cm}" /> sugarú homogén félkörlemez milyen magasan egyensúlyozható az alapátmérőjétől mérve?
            </>
          }
        >
          <p>
            <M t="\bar{y} = \dfrac{4\cdot 6}{3\pi} = \mathbf{\dfrac{8}{\pi} \approx 2{,}55\text{ cm}}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Igazold a 4. ábra eredményét: határozd meg az <M t="y=x" /> és <M t="y=x^2" /> közötti homogén lemez súlypontját!
            </>
          }
        >
          <p>
            Terület: <M t="A = \int_0^1(x-x^2)\,dx = \frac{1}{6}" />.<br />
            <M t="M_y = \int_0^1 x(x-x^2)\,dx = \frac{1}{3}-\frac{1}{4}=\frac{1}{12} \implies \bar{x} = \mathbf{\dfrac{1}{2}}" />.<br />
            <M t="M_x = \frac{1}{2}\int_0^1(x^2-x^4)\,dx = \frac{1}{2}\left(\frac{1}{3}-\frac{1}{5}\right)=\frac{1}{15} \implies \bar{y} = \mathbf{\dfrac{2}{5}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Görbe huzalok tömegközéppontja és változó sűrűségű lemezek',
    body: (
      <>
        <Story>
          <p>
            Mi a különbség egy teli fém félkörlemez és egy félkör alakúra meghajlított vékony drót tömegközéppontja között? A drótnál az összes tömeg kint van a <strong>peremen</strong> — a tömegközéppont tehát feljebb kúszik, és <em>az üres levegőben lebeg</em>!
          </p>
        </Story>
        <Def title="Görbe huzal (ív) tömegközéppontja a 6.3-as ds elemmel">
          <M block t="M = \int \delta\,ds, \qquad M_y = \int x\,\delta\,ds, \qquad M_x = \int y\,\delta\,ds \qquad \bigl(ds = \sqrt{dx^2+dy^2}\bigr)." />
        </Def>
        <WireVsPlateCentroidDiagram />
        <h3>A félkörhuzal levezetése</h3>
        <p>
          Az <M t="x=r\cos t,\; y=r\sin t" /> (<M t="0\le t\le\pi" />) homogén félkörhuzalnál <M t="ds = r\,dt" />, teljes hossz <M t="L=\pi r" />:
        </p>
        <M block t="M_x = \int_{0}^{\pi} (r\sin t)\,r\,dt = r^2\Bigl[-\cos t\Bigr]_{0}^{\pi} = 2r^2 \implies \bar{y} = \frac{2r^2}{\pi r} = \mathbf{\frac{2r}{\pi}}." />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Hol van egy <M t="r=5\text{ cm}" /> sugarú homogén félkör alakú huzal tömegközéppontja?
            </>
          }
        >
          <p>
            <M t="\bar{x}=0" />, <M t="\bar{y} = \dfrac{2\cdot 5}{\pi} = \mathbf{\dfrac{10}{\pi} \approx 3{,}18\text{ cm}}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Határozd meg az <M t="y=x" /> és <M t="y=x^2" /> (<M t="[0;\,1]" />) közötti vékony lemez tömegközéppontját, ha a sűrűsége <M t="\delta(x) = 12x" />!
            </>
          }
        >
          <p>
            <M t="M = \int_0^1 12x(x-x^2)\,dx = 12\left(\frac{1}{3}-\frac{1}{4}\right) = 1" />.<br />
            <M t="M_y = \int_0^1 12x^2(x-x^2)\,dx = 12\left(\frac{1}{4}-\frac{1}{5}\right) = \mathbf{\dfrac{3}{5}}" />.<br />
            <M t="M_x = \frac{1}{2}\int_0^1 12x(x^2-x^4)\,dx = 6\left(\frac{1}{4}-\frac{1}{6}\right) = \mathbf{\dfrac{1}{2}}" />. Mivel <M t="M=1" />, <M t="(\bar{x};\,\bar{y}) = \left(\dfrac{3}{5};\,\dfrac{1}{2}\right)" />.
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
        <Def title="6.4 Puskakártya">
          <ul>
            <li><strong>1D rúd:</strong> <M t="M=\int\delta\,dx,\; M_0=\int x\delta\,dx,\; \bar{x}=M_0/M" />.</li>
            <li><strong>2D lemez:</strong> <M t="M_y=\int x\delta(f-g)\,dx" />, <M t="M_x=\frac{1}{2}\int\delta(f^2-g^2)\,dx" />, <M t="\bar{x}=M_y/M,\; \bar{y}=M_x/M" />.</li>
            <li><strong>Görbe huzal:</strong> <M t="dm = \delta\,ds" /> (<M t="ds=\sqrt{dx^2+dy^2}" />).</li>
            <li><strong>Klasszikus súlypontok:</strong> háromszög <M t="\frac{h}{3}" />; félkörlemez <M t="\frac{4r}{3\pi}" />; félkörhuzal <M t="\frac{2r}{\pi}" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong><M t="M_x" /> és <M t="M_y" /> összecserélése!</strong> Az <M t="y" />-tengelytől mért távolság <strong><M t="x" /></strong>, ezért <M t="\bar{x}=M_y/M" />; az <M t="x" />-tengelytől mért távolság <strong><M t="y" /></strong>, ezért <M t="\bar{y}=M_x/M" />!
            </li>
            <li>
              <strong>A <M t="\frac{1}{2}" /> és a <M t="f^2-g^2" /> elrontása:</strong> <M t="M_x" /> képletében <M t="\frac{1}{2}(f^2-g^2)" /> áll (mert a csík közepe <M t="\frac{f+g}{2}" /> magasságban van), NEM <M t="(f-g)^2" />!
            </li>
            <li>
              <strong>Elfelejtett osztás <M t="M" />-mel (vagy <M t="A" />-val):</strong> a nyomaték még nem koordináta — a végén mindig ossz a teljes tömeggel/területtel!
            </li>
            <li>
              <strong>Felesleges számolás szimmetriánál:</strong> ha van szimmetriatengely, azonnal írd le a szimmetriából adódó koordinátát!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Az <M t="x=-2" /> helyen <M t="4\text{ kg}" />, az <M t="x=3" /> helyen <M t="6\text{ kg}" /> tömeg van. Hol a tömegközéppont?
            </>
          }
        >
          <p>
            <M t="\bar{x} = \dfrac{4(-2)+6(3)}{4+6} = \dfrac{10}{10} = \mathbf{1}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy <M t="[0;\,4]" /> rúd sűrűsége <M t="\delta(x)=3x" />. Számítsd ki <M t="M" />-et és <M t="\bar{x}" />-et!
            </>
          }
        >
          <p>
            <M t="M = \int_0^4 3x\,dx = 24" />, <M t="M_0 = \int_0^4 3x^2\,dx = 64 \implies \bar{x} = \dfrac{64}{24} = \mathbf{\dfrac{8}{3}}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Hol van a <M t="(-1;\,0),\;(1;\,0),\;(0;\,3)" /> csúcsú homogén háromszög súlypontja?
            </>
          }
        >
          <p>
            A csúcsok számtani közepe: <M t="\left(\dfrac{-1+1+0}{3};\,\dfrac{0+0+3}{3}\right) = \mathbf{(0;\,1)}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="y=x^2" /> parabola és az <M t="y=4" /> egyenes által bezárt homogén lemez súlypontját!
            </>
          }
        >
          <p>
            Szimmetria miatt <M t="\bar{x}=0" />. Terület: <M t="A = 2\int_0^2(4-x^2)\,dx = \frac{32}{3}" />.
          </p>
          <M block t="M_x = \frac{1}{2}\cdot 2\int_{0}^{2}(4^2 - x^4)\,dx = \left[16x-\frac{x^5}{5}\right]_{0}^{2} = \frac{128}{5} \implies \bar{y} = \frac{128/5}{32/3} = \mathbf{\frac{12}{5} = 2{,}4}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Határozd meg az <M t="y=\cos x" /> (<M t="-\frac{\pi}{2}\le x\le\frac{\pi}{2}" />) és az <M t="x" />-tengely által határolt homogén lemez súlypontját!
            </>
          }
        >
          <p>
            Szimmetria miatt <M t="\bar{x}=0" />. Terület: <M t="A = \int_{-\pi/2}^{\pi/2}\cos x\,dx = 2" />.
          </p>
          <M block t="M_x = \frac{1}{2}\int_{-\pi/2}^{\pi/2}\cos^2 x\,dx = \int_{0}^{\pi/2}\frac{1+\cos 2x}{2}\,dx = \frac{\pi}{4} \implies \bar{y} = \mathbf{\frac{\pi}{8}}." />
        </Task>
        <Task
          n={16}
          q={
            <>
              Az <M t="y=\dfrac{2}{x^2}" /> (<M t="1\le x\le 2" />) és az <M t="x" />-tengely közötti lemez sűrűsége <M t="\delta(x)=x^2" />. Határozd meg a tömegközéppontját!
            </>
          }
        >
          <p>
            <M t="dm = x^2\cdot\frac{2}{x^2}\,dx = 2\,dx \implies M = \int_1^2 2\,dx = 2" />.<br />
            <M t="M_y = \int_1^2 2x\,dx = 3 \implies \bar{x} = \mathbf{\dfrac{3}{2}}" />.<br />
            <M t="M_x = \int_1^2 \frac{1}{2}\left(\frac{2}{x^2}\right)\cdot 2\,dx = \int_1^2 \frac{2}{x^2}\,dx = \left[-\frac{2}{x}\right]_1^2 = 1 \implies \bar{y} = \mathbf{\dfrac{1}{2}}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Határozd meg az első síknegyedbeli <M t="r" /> sugarú <strong>negyedkörlemez</strong> (<M t="x^2+y^2\le r^2,\; x,y\ge 0" />) súlypontját!
            </>
          }
        >
          <p>
            Az <M t="y=x" /> egyenesre való szimmetria miatt <M t="\bar{x}=\bar{y}" />. Terület: <M t="A=\frac{\pi r^2}{4}" />.
          </p>
          <M block t="M_x = \frac{1}{2}\int_{0}^{r}(r^2-x^2)\,dx = \frac{r^3}{3} \implies \bar{x}=\bar{y}=\frac{r^3/3}{\pi r^2/4} = \mathbf{\frac{4r}{3\pi}}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              Határozd meg az <M t="y=x-x^2" /> parabola és az <M t="y=-x" /> egyenes által közrezárt homogén lemez súlypontját!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="x=0,\;2" />. <M t="A = \int_0^2(2x-x^2)\,dx = \frac{4}{3}" />.<br />
            <M t="M_y = \int_0^2 x(2x-x^2)\,dx = \frac{4}{3} \implies \bar{x} = \mathbf{1}" />.<br />
            <M t="M_x = \frac{1}{2}\int_0^2\bigl((x-x^2)^2-(-x)^2\bigr)\,dx = \frac{1}{2}\int_0^2(x^4-2x^3)\,dx = -\frac{4}{5} \implies \bar{y} = \mathbf{-\dfrac{3}{5}}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Általános háromszög súlypontja vízszintes szeleteléssel:</em> igazold <M t="dy" />-nal, hogy egy tetszőleges <M t="b" /> alapú és <M t="h" /> magasságú homogén háromszög súlypontja az alaptól pontosan <M t="\bar{y}=\dfrac{h}{3}" /> magasságban van!
            </>
          }
        >
          <p>
            Hasonló háromszögekkel az <M t="y\in[0;\,h]" /> magasságban a vízszintes szelet hossza <M t="L(y)=\frac{b}{h}(h-y)" />, a terület <M t="A=\frac{bh}{2}" />:
          </p>
          <M block t="M_x = \int_{0}^{h} y\cdot\frac{b}{h}(h-y)\,dy = \frac{b}{h}\left[\frac{h}{2}y^2 - \frac{y^3}{3}\right]_{0}^{h} = \frac{bh^2}{6} \implies \bar{y} = \frac{bh^2/6}{bh/2} = \mathbf{\frac{h}{3}}. \quad\blacksquare" />
        </Task>
      </>
    ),
  },
];
