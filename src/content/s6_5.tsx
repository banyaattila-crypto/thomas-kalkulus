import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  FrustumBandDiagram,
  PappusReverseDiagram,
  PappusTorusWidget,
  SphereBandSliceWidget,
  SurfaceFormulasCardDiagram,
} from '../components/Widgets65';
import type { Page } from './s1_1';

export const S6_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Csonkakúp-övek és a forgásfelület felszínképlete',
    body: (
      <>
        <Story>
          <p>
            A 6.1–6.2-ben kiszámoltuk egy forgástest <em>térfogatát</em>, a 6.3-ban pedig egy görbe <em>hosszát</em>. Most egyesítjük a kettőt: ha egy ugrókötelet megpörgetünk, mekkora a megfestett <strong>forgásfelület felszíne</strong>? A titok az, hogy egy ferde kis görbeszakasz megforgatva nem hengerpalástot, hanem egy vékony <strong>csonkakúp-övet</strong> söpör ki!
          </p>
        </Story>
        <FrustumBandDiagram />
        <Def title="Forgásfelület felszíne (x-tengely körüli forgatás)">
          <p>
            Ha <M t="f(x)\ge 0" /> folytonosan differenciálható az <M t="[a;\,b]" /> intervallumon, akkor az <M t="y=f(x)" /> görbe <M t="x" />-tengely körüli forgatásával keletkező felület felszíne:
          </p>
          <M block t="S \;=\; \int_{a}^{b} 2\pi\,f(x)\sqrt{1 + \bigl[f'(x)\bigr]^2}\,dx \;=\; \int_{a}^{b} 2\pi y\,ds." />
        </Def>
        <h3>Mintapélda: <M t="y=2\sqrt{x}" /> az <M t="[1;\,2]" /> intervallumon</h3>
        <p>
          <M t="y'=\frac{1}{\sqrt{x}}" />, így <M t="y\sqrt{1+(y')^2} = 2\sqrt{x}\sqrt{1+\frac{1}{x}} = 2\sqrt{x+1}" />! A gyökök csodásan összevonódnak:
        </p>
        <M block t="S = 2\pi\int_{1}^{2} 2\sqrt{x+1}\,dx = 4\pi\cdot\frac{2}{3}\Bigl[(x+1)^{3/2}\Bigr]_{1}^{2} = \mathbf{\frac{8\pi}{3}\left(3\sqrt{3}-2\sqrt{2}\right)}." />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Igazold a felszínintegrállal, hogy az <M t="y=\dfrac{r}{h}x" /> (<M t="0\le x\le h" />) szakasz <M t="x" />-tengely körüli forgatásával kapott kúppalást felszíne <M t="\pi r\sqrt{r^2+h^2}" />!
            </>
          }
        >
          <p>
            <M t="y'=\frac{r}{h} \implies \sqrt{1+(y')^2}=\frac{\sqrt{h^2+r^2}}{h}" /> (állandó!):
          </p>
          <M block t="S = 2\pi\int_{0}^{h}\frac{r}{h}x\cdot\frac{\sqrt{r^2+h^2}}{h}\,dx = \frac{2\pi r\sqrt{r^2+h^2}}{h^2}\cdot\frac{h^2}{2} = \mathbf{\pi r\sqrt{r^2+h^2}}." />
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki az <M t="y=\dfrac{x^3}{3}" /> görbe <M t="[0;\,1]" /> darabjának <M t="x" />-tengely körüli forgatásával kapott felület felszínét!
            </>
          }
        >
          <p>
            <M t="y'=x^2 \implies S = 2\pi\int_0^1 \frac{x^3}{3}\sqrt{1+x^4}\,dx" />. Az <M t="u=1+x^4,\; du=4x^3\,dx" /> (<M t="1\to 2" />) cserével:
          </p>
          <M block t="S = \frac{\pi}{6}\int_{1}^{2} u^{1/2}\,du = \frac{\pi}{9}\Bigl[u^{3/2}\Bigr]_{1}^{2} = \mathbf{\frac{\pi}{9}\left(2\sqrt{2}-1\right)}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A kerek cipó csodája és forgatás az y-tengely körül',
    body: (
      <>
        <Story>
          <p>
            Ha egy tökéletesen gömb alakú cipót párhuzamos, egyforma vastagságú szeletekre vágsz, melyik szeleten lesz a legtöbb ropogós héj — a közepén lévő nagy szeleten, vagy a szélén lévő kicsi sarkon? A megdöbbentő válasz: <strong>mindegyiken pontosan ugyanannyi!</strong>
          </p>
        </Story>
        <p>
          Nézzük a matekot! Az <M t="y=\sqrt{R^2-x^2}" /> körívnél <M t="y'=\frac{-x}{\sqrt{R^2-x^2}}" />, ezért <M t="\sqrt{1+(y')^2} = \frac{R}{\sqrt{R^2-x^2}}" />. A sugár (<M t="y" />) és a nevező <strong>pontosan kiejti egymást</strong>:
        </p>
        <M block t="y\sqrt{1+(y')^2} = \sqrt{R^2-x^2}\cdot\frac{R}{\sqrt{R^2-x^2}} = R \quad\Longrightarrow\quad S_{\text{öv}} = \int_{x_1}^{x_1+h} 2\pi R\,dx = \mathbf{2\pi R h}!" />
        <SphereBandSliceWidget />
        <Def title="Forgatás az y-tengely körül (x = g(y) ≥ 0 a [c; d]-n)">
          <M block t="S \;=\; \int_{c}^{d} 2\pi\,g(y)\sqrt{1 + \bigl[g'(y)\bigr]^2}\,dy \;=\; \int_{c}^{d} 2\pi x\,ds." />
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Forgassuk meg az <M t="x=1-y" /> (<M t="0\le y\le 1" />) szakaszt az <strong><M t="y" />-tengely</strong> körül! Mekkora a keletkező kúp palástja?
            </>
          }
        >
          <p>
            <M t="x'=-1 \implies \sqrt{1+(-1)^2}=\sqrt{2}" />:
          </p>
          <M block t="S = 2\pi\int_{0}^{1}(1-y)\sqrt{2}\,dy = 2\pi\sqrt{2}\left[y-\frac{y^2}{2}\right]_{0}^{1} = \mathbf{\pi\sqrt{2}}." />
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki az <M t="y=\sqrt{x+1}" /> (<M t="1\le x\le 5" />) görbe <M t="x" />-tengely körüli forgatásával kapott felület felszínét!
            </>
          }
        >
          <p>
            <M t="y'=\frac{1}{2\sqrt{x+1}} \implies y\sqrt{1+(y')^2}=\sqrt{x+1+\frac{1}{4}}=\sqrt{x+\frac{5}{4}}" />:
          </p>
          <M block t="S = 2\pi\int_{1}^{5}\sqrt{x+\frac{5}{4}}\,dx = \frac{4\pi}{3}\left[\left(x+\frac{5}{4}\right)^{3/2}\right]_{1}^{5} = \frac{4\pi}{3}\left(\frac{125}{8}-\frac{27}{8}\right) = \mathbf{\frac{49\pi}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Paraméteres forgásfelületek és az univerzális 2πρ ds képlet',
    body: (
      <>
        <Story>
          <p>
            Akár <M t="y=f(x)" />, akár <M t="x=g(y)" />, akár paraméteres <M t="(x(t);\,y(t))" /> alakban van megadva a görbe, valójában <strong>egyetlen</strong> képletet kell megjegyezned: <M t="S = \int 2\pi\rho\,ds" />, ahol <M t="\rho" /> a forgástengelytől mért sugár, <M t="ds" /> pedig a 6.3-ból ismert ívhossz-differenciál!
          </p>
        </Story>
        <SurfaceFormulasCardDiagram />
        <h3>Mintapélda: paraméteres kör forgatása (szarv-tórusz)</h3>
        <p>
          Forgassuk meg az <M t="x=\cos t,\; y=1+\sin t" /> (<M t="0\le t\le 2\pi" />) kört az <M t="x" />-tengely körül! Itt <M t="ds = \sqrt{(-\sin t)^2+\cos^2 t}\,dt = dt" /> és <M t="\rho = y(t) = 1+\sin t \ge 0" />:
        </p>
        <M block t="S = \int_{0}^{2\pi} 2\pi(1+\sin t)\,dt = 2\pi\Bigl[t - \cos t\Bigr]_{0}^{2\pi} = \mathbf{4\pi^2}." />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Igazold a paraméteres képlettel, hogy az <M t="x=R\cos t,\; y=R\sin t" /> (<M t="0\le t\le\pi" />) félkör <M t="x" />-tengely körüli forgatásával keletkező gömb felszíne <M t="4\pi R^2" />!
            </>
          }
        >
          <p>
            <M t="ds = R\,dt" />, <M t="\rho = y(t) = R\sin t" />:
          </p>
          <M block t="S = \int_{0}^{\pi} 2\pi(R\sin t)\cdot R\,dt = 2\pi R^2\Bigl[-\cos t\Bigr]_{0}^{\pi} = \mathbf{4\pi R^2}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki az <M t="x=t^2,\; y=2t" /> (<M t="0\le t\le\sqrt{3}" />) paraméteres görbe <strong><M t="x" />-tengely</strong> körüli forgatásával kapott felület felszínét!
            </>
          }
        >
          <p>
            <M t="x'=2t,\; y'=2 \implies ds = 2\sqrt{t^2+1}\,dt" />, <M t="\rho = y(t)=2t" />. Az <M t="u=t^2+1,\; du=2t\,dt" /> (<M t="1\to 4" />) cserével:
          </p>
          <M block t="S = 2\pi\int_{0}^{\sqrt{3}}(2t)\cdot 2\sqrt{t^2+1}\,dt = 4\pi\int_{1}^{4}\sqrt{u}\,du = \frac{8\pi}{3}(8-1) = \mathbf{\frac{56\pi}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Papposz I. és II. tétele (térfogat és felszín integrálás nélkül!)',
    body: (
      <>
        <Story>
          <p>
            Több mint 1700 évvel ezelőtt az alexandriai <strong>Papposz</strong> két lenyűgözően elegáns tételt fedezett fel: ha ismered egy síkidom (vagy görbe) <strong>súlypontját</strong>, akkor a belőle forgatott test térfogatát és felszínét <em>egyetlen szorzással</em> megkaphatod — integrálás nélkül!
          </p>
        </Story>
        <Def title="Papposz tételei (feltétel: a tengely NEM metszi a síkidomot / görbét)">
          <ul>
            <li>
              <strong>I. tétel (Térfogat):</strong> ha egy <M t="A" /> területű síkidomot megforgatunk egy síkjában fekvő, őt nem metsző tengely körül, és a súlypontja <M t="\rho" /> távolságra van a tengelytől:
              <M block t="V \;=\; 2\pi\rho \cdot A \;=\; (\text{súlypont megtett útja}) \times (\text{terület})." />
            </li>
            <li>
              <strong>II. tétel (Felszín):</strong> ha egy <M t="L" /> hosszúságú síkgörbét megforgatunk egy őt nem metsző tengely körül, és a görbe súlypontja <M t="\rho" /> távolságra van a tengelytől:
              <M block t="S \;=\; 2\pi\rho \cdot L \;=\; (\text{súlypont megtett útja}) \times (\text{ívhossz})." />
            </li>
          </ul>
        </Def>
        <PappusTorusWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Egy <M t="a=2" /> sugarú körlap középpontja <M t="b=5" /> távolságra van a forgástengelytől. Számítsd ki a tórusz térfogatát és felszínét Papposz tételeivel!
            </>
          }
        >
          <p>
            <M t="V = (2\pi\cdot 5)(\pi\cdot 2^2) = \mathbf{40\pi^2}" /> és <M t="S = (2\pi\cdot 5)(2\pi\cdot 2) = \mathbf{40\pi^2}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Forgassuk meg a <M t="(2;\,0),\;(5;\,0),\;(2;\,3)" /> csúcsú háromszöget az <M t="y" />-tengely körül! Határozd meg a forgástest térfogatát Papposz I. tételével!
            </>
          }
        >
          <p>
            A háromszög területe <M t="A = \frac{3\cdot 3}{2} = 4{,}5" />. Súlypontjának <M t="x" />-koordinátája (távolsága az <M t="y" />-tengelytől): <M t="\rho = \bar{x} = \frac{2+5+2}{3} = 3" />.
          </p>
          <M block t="V = 2\pi(3)(4{,}5) = \mathbf{27\pi}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Papposz „visszafelé” — súlypont kiszámítása 1 sorban!',
    body: (
      <>
        <Story>
          <p>
            Papposz tételei kétirányúak: ha eleve ismerjük a forgástest térfogatát vagy felszínét (például a gömbét vagy a kúpét), akkor egyetlen osztással megkapjuk a generáló alakzat <strong>súlypontját</strong> — integrálás nélkül!
          </p>
        </Story>
        <PappusReverseDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Használd Papposz I. tételét <em>visszafelé</em> a <M t="(0;\,0),\;(r;\,0),\;(0;\,h)" /> derékszögű háromszög <M t="y" />-tengely körüli forgatására (amely egy <M t="V=\frac{1}{3}\pi r^2 h" /> térfogatú kúpot ad), és igazold, hogy <M t="\bar{x} = \dfrac{r}{3}" />!
            </>
          }
        >
          <p>
            A háromszög területe <M t="A=\frac{rh}{2}" />. Papposz I. alapján <M t="\frac{1}{3}\pi r^2 h = 2\pi\bar{x}\cdot\frac{rh}{2} = \pi r h\bar{x} \implies \bar{x} = \mathbf{\dfrac{r}{3}}" />!
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Használd Papposz II. tételét <em>visszafelé</em> egy kúp <M t="l" /> hosszú alkotójára (<M t="S_{\text{palást}}=\pi r l" />), és ellenőrizd, milyen messze van a szakasz súlypontja a tengelytől!
            </>
          }
        >
          <p>
            <M t="\pi r l = 2\pi\rho\cdot l \implies \rho = \mathbf{\dfrac{r}{2}}" /> — pontosan a szakasz felezőpontjának távolsága a tengelytől!
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
        <Def title="6.5 Puskakártya">
          <ul>
            <li><strong>Univerzális felszínképlet:</strong> <M t="S = \int 2\pi\rho\,ds" /> (<M t="x" />-tengely körül <M t="\rho=y" />, <M t="y" />-tengely körül <M t="\rho=x" />).</li>
            <li><strong>Gömböv:</strong> bármely <M t="h" /> széles szelet felszíne <M t="2\pi R h" />.</li>
            <li><strong>Papposz I. (térfogat):</strong> <M t="V = 2\pi\rho\cdot A" />.</li>
            <li><strong>Papposz II. (felszín):</strong> <M t="S = 2\pi\rho\cdot L" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong><M t="ds" /> helyett <M t="dx" /> írása:</strong> a <M t="\sqrt{1+(y')^2}" /> gyökös tényező kötelező — nélküle hibás lesz a felszín!
            </li>
            <li>
              <strong>Rossz sugár (<M t="\rho" />):</strong> <M t="x" />-tengely körül mindig <M t="\rho=y" />, <M t="y" />-tengely körül mindig <M t="\rho=x" />!
            </li>
            <li>
              <strong>Papposznál átmetszett tengely:</strong> ha a forgástengely átvágja a síkidomot vagy görbét, a két oldal átfedi egymást, és Papposz képlete <em>nem</em> érvényes!
            </li>
            <li>
              <strong>Dupla bejárás:</strong> gömbnél csak a <em>félkört</em> (<M t="0\le t\le\pi" />) forgasd meg, különben <M t="8\pi R^2" />-t kapsz <M t="4\pi R^2" /> helyett!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Számítsd ki az <M t="y=\dfrac{x}{2}" /> (<M t="0\le x\le 4" />) szakasz <M t="x" />-tengely körüli forgatásával keletkező kúppalást felszínét!
            </>
          }
        >
          <p>
            <M t="y'=\frac{1}{2} \implies \sqrt{1+\frac{1}{4}}=\frac{\sqrt{5}}{2}" />:
            <M block t="S = 2\pi\int_{0}^{4}\frac{x}{2}\cdot\frac{\sqrt{5}}{2}\,dx = \frac{\pi\sqrt{5}}{2}\left[\frac{x^2}{2}\right]_{0}^{4} = \mathbf{4\pi\sqrt{5}}." />
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki az <M t="y=\dfrac{x^3}{9}" /> (<M t="0\le x\le 2" />) görbe <M t="x" />-tengely körüli forgatásával kapott felület felszínét!
            </>
          }
        >
          <p>
            <M t="y'=\frac{x^2}{3} \implies S = 2\pi\int_0^2 \frac{x^3}{9}\sqrt{1+\frac{x^4}{9}}\,dx" />. Az <M t="u=1+\frac{x^4}{9},\; du=\frac{4x^3}{9}\,dx" /> (<M t="1\to\frac{25}{9}" />) cserével:
          </p>
          <M block t="S = \frac{\pi}{2}\cdot\frac{2}{3}\Bigl[u^{3/2}\Bigr]_{1}^{25/9} = \frac{\pi}{3}\left(\frac{125}{27}-1\right) = \mathbf{\frac{98\pi}{81}}." />
        </Task>
        <Task
          n={13}
          q={
            <>
              Forgassuk meg az <M t="(x-4)^2+y^2=1" /> kört az <M t="y" />-tengely körül! Add meg a tórusz térfogatát és felszínét Papposz tételeivel!
            </>
          }
        >
          <p>
            <M t="a=1,\; b=4 \implies V = (2\pi\cdot 4)(\pi\cdot 1^2) = \mathbf{8\pi^2}" /> és <M t="S = (2\pi\cdot 4)(2\pi\cdot 1) = \mathbf{16\pi^2}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Számítsd ki az <M t="y=\sqrt{x}" /> (<M t="\frac{3}{4}\le x\le\frac{15}{4}" />) görbe <M t="x" />-tengely körüli forgatásával kapott felület felszínét!
            </>
          }
        >
          <p>
            <M t="y\sqrt{1+(y')^2} = \sqrt{x}\sqrt{1+\frac{1}{4x}} = \sqrt{x+\frac{1}{4}}" />:
          </p>
          <M block t="S = 2\pi\int_{3/4}^{15/4}\sqrt{x+\frac{1}{4}}\,dx = \frac{4\pi}{3}\left[\left(x+\frac{1}{4}\right)^{3/2}\right]_{3/4}^{15/4} = \frac{4\pi}{3}(8-1) = \mathbf{\frac{28\pi}{3}}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki az <M t="x=\dfrac{y^3}{3}" /> (<M t="0\le y\le 1" />) görbe <strong><M t="y" />-tengely</strong> körüli forgatásával kapott felület felszínét!
            </>
          }
        >
          <p>
            <M t="x'=y^2 \implies S = 2\pi\int_0^1 \frac{y^3}{3}\sqrt{1+y^4}\,dy = \mathbf{\dfrac{\pi}{9}\left(2\sqrt{2}-1\right)}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Forgassuk meg a <M t="(2;\,0),\;(6;\,0),\;(6;\,4),\;(2;\,4)" /> négyzetet az <M t="y" />-tengely körül! Számítsd ki a keletkező gyűrűs henger térfogatát és teljes felszínét Papposz tételeivel!
            </>
          }
        >
          <p>
            A négyzet középpontja <M t="(4;\,2)" />, így <M t="\rho=4" />. Területe <M t="A=16" />, kerülete <M t="L=16" />:
            <M block t="V = 2\pi(4)(16) = \mathbf{128\pi}, \qquad S = 2\pi(4)(16) = \mathbf{128\pi}." />
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              <em>Csillagtest felszíne:</em> forgassuk meg az <M t="x=\cos^3 t,\; y=\sin^3 t" /> (<M t="0\le t\le\pi" />) felső csillaggörbét az <M t="x" />-tengely körül!
            </>
          }
        >
          <p>
            Szimmetria miatt duplázzuk a <M t="[0;\,\frac{\pi}{2}]" /> részt, ahol <M t="ds = 3\sin t\cos t\,dt" /> (6.3):
          </p>
          <M block t="S = 2\int_{0}^{\pi/2} 2\pi(\sin^3 t)(3\sin t\cos t)\,dt = 12\pi\int_{0}^{\pi/2}\sin^4 t\cos t\,dt = 12\pi\left[\frac{\sin^5 t}{5}\right]_{0}^{\pi/2} = \mathbf{\frac{12\pi}{5}}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              <em>Gömböv felszíne:</em> igazold az <M t="y=\sqrt{R^2-x^2}" /> ívvel, hogy egy <M t="R" /> sugarú gömb bármely két párhuzamos, egymástól <M t="h" /> távolságra lévő síkja közötti gömböv felszíne pontosan <M t="2\pi R h" />!
            </>
          }
        >
          <p>
            <M t="y'=\frac{-x}{\sqrt{R^2-x^2}} \implies \sqrt{1+(y')^2} = \frac{R}{\sqrt{R^2-x^2}} \implies y\sqrt{1+(y')^2}=R" />. Így bármely <M t="[x_1;\,x_1+h]\subseteq[-R;\,R]" /> esetén <M t="S = \int_{x_1}^{x_1+h} 2\pi R\,dx = \mathbf{2\pi R h}" />! ∎
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Forgassuk meg az <M t="y=\dfrac{1}{3}(x^2+2)^{3/2}" /> (<M t="0\le x\le 2" />) görbét az <strong><M t="y" />-tengely</strong> körül, és számítsd ki a felszínét <M t="x" /> szerint integrálva (<M t="S=\int 2\pi x\,ds" />)!
            </>
          }
        >
          <p>
            <M t="y' = x\sqrt{x^2+2} \implies 1+(y')^2 = 1+x^4+2x^2 = (x^2+1)^2 \implies ds = (x^2+1)\,dx" />!
          </p>
          <M block t="S = 2\pi\int_{0}^{2} x(x^2+1)\,dx = 2\pi\left[\frac{x^4}{4}+\frac{x^2}{2}\right]_{0}^{2} = 2\pi(4+2) = \mathbf{12\pi}." />
        </Task>
      </>
    ),
  },
];
