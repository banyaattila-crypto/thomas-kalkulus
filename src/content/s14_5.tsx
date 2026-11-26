import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  DirectionalSlopeCompassWidget,
  Gradient3DSurfaceNormalWidget,
  GradientDescentSimWidget,
  GradientDotProductWidget,
  GradientMasterSummaryDiagram,
  GradientRulesCardDiagram,
  LevelCurveNormalWidget,
  SteepestAscent3DWidget,
} from '../components/Widgets145';
import type { Page } from './s1_1';

export const S14_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Iránymenti derivált: meredekség bármely irányban',
    body: (
      <>
        <Story>
          <p>
            Ha egy topográfiai térképen megnézed a hegyi patakokat (Thomas 14.23. ábra), észreveszed, hogy a víz
            mindig <strong>merőlegesen</strong> metszi a szintvonalakat — mert arra folyik, amerre a legmeredekebben
            tud lefelé haladni! Ahhoz, hogy megértsük ezt a csodálatos geometriai törvényt, meg kell tanulnunk
            mérni egy függvény meredekségét <em>bármely</em> <M t="\mathbf{u}" /> irányban!
          </p>
        </Story>

        <Def title="Iránymenti derivált (egységvektor irányában!)">
          <p>
            Legyen <M t="\mathbf{u} = u_1\mathbf{i} + u_2\mathbf{j}" /> <strong>egységvektor</strong> (<M t="|\mathbf{u}| = 1" />).
            Az <M t="f(x, y)" /> függvény <M t="\mathbf{u}" /> irányú iránymenti deriváltja a <M t="P_0(x_0, y_0)" /> pontban:
          </p>
          <M block t="D_{\mathbf{u}} f(x_0, y_0) = \left(\frac{df}{ds}\right)_{\mathbf{u}, P_0} = \lim_{s\to 0}\frac{f(x_0 + su_1,\, y_0 + su_2) - f(x_0, y_0)}{s}." />
        </Def>

        <DirectionalSlopeCompassWidget />

        <Quiz
          q={<>Ha a feladat az <M t="\mathbf{v} = \langle 3, 4\rangle" /> vektor irányában kéri <M t="f" /> iránymenti deriváltját, mi a kötelező 0. lépés?</>}
          options={[
            { label: <>Közvetlenül beszorozzuk <M t="\mathbf{v}" />-vel</> },
            { label: <>Normáljuk egységvektorrá: <M t="\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|} = \langle \frac{3}{5}, \frac{4}{5}\rangle" /></>, ok: true },
            { label: <>Elosztjuk a vektor összegével (<M t="7" />-tel)</> },
          ]}
          explain={
            <>
              Az iránymenti derivált <strong>mindig egységvektorra</strong> vonatkozik! Ha elfelejted elosztani{' '}
              <M t="|\mathbf{v}| = 5" />-tel, ötszörösére torzítod a meredekséget!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Mivel egyenlő <M t="D_{\mathbf{i}} f" /> és <M t="D_{\mathbf{j}} f" />?</>}
        >
          <p>
            <M t="\mathbf{i} = \langle 1, 0\rangle" /> irányban <M t="D_{\mathbf{i}} f = \mathbf{f_x}" />,{' '}
            <M t="\mathbf{j} = \langle 0, 1\rangle" /> irányban <M t="D_{\mathbf{j}} f = \mathbf{f_y}" />!
          </p>
        </Task>
        <Task
          n={2}
          q={<>Ha <M t="D_{\mathbf{u}} f(P_0) = 3" />, mennyi <M t="D_{-\mathbf{u}} f(P_0)" />?</>}
        >
          <p>
            Az ellentétes irányban pontosan a negatívja: <M t="\mathbf{-3}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A gradiens vektor (∇f) és a skalárszorzatos képlet',
    body: (
      <>
        <Def title="Gradiens vektor és a 9. tétel">
          <p>
            Az <M t="f(x, y)" /> differenciálható függvény <strong>gradiens vektora</strong>:
          </p>
          <M block t="\nabla f(x, y) = \frac{\partial f}{\partial x}\mathbf{i} + \frac{\partial f}{\partial y}\mathbf{j} = \langle f_x,\, f_y \rangle." />
          <p>
            A láncszabályból azonnal adódik, hogy bármely <M t="\mathbf{u} = \langle u_1, u_2\rangle" /> egységvektorra:
          </p>
          <M block t="D_{\mathbf{u}} f(x_0, y_0) = \nabla f(x_0, y_0) \cdot \mathbf{u} = f_x(x_0, y_0)\,u_1 + f_y(x_0, y_0)\,u_2." />
        </Def>

        <GradientDotProductWidget />

        <Steps
          title="Thomas 2. példa — Iránymenti derivált számítása"
          problem={<>Számítsuk ki <M t="f(x, y) = x e^y + \cos(xy)" /> iránymenti deriváltját a <M t="P(2, 0)" /> pontban a <M t="\mathbf{v} = 3\mathbf{i} - 4\mathbf{j}" /> irányában!</>}
          steps={[
            {
              title: 'Gradiens kiszámítása P(2, 0)-ban',
              body: (
                <>
                  <M t="f_x = e^y - y\sin(xy) \Rightarrow f_x(2,0) = 1" />;{' '}
                  <M t="f_y = x e^y - x\sin(xy) \Rightarrow f_y(2,0) = 2" />. Így{' '}
                  <M t="\nabla f(2, 0) = \langle 1, 2\rangle" />.
                </>
              ),
            },
            {
              title: 'Irányvektor normálása',
              body: (
                <>
                  <M t="|\mathbf{v}| = \sqrt{3^2 + (-4)^2} = 5 \implies \mathbf{u} = \langle \frac{3}{5},\, -\frac{4}{5}\rangle" />.
                </>
              ),
            },
            {
              title: 'Skalárszorzat',
              body: (
                <>
                  <M t="D_{\mathbf{u}} f(2, 0) = 1\cdot\frac{3}{5} + 2\cdot\left(-\frac{4}{5}\right) = \mathbf{-1}" />!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Számítsd ki <M t="D_{\mathbf{u}} f(1, 2)" /> értékét, ha <M t="f(x, y) = x^2 y^3" /> és <M t="\mathbf{v} = \langle 1, 1\rangle" />!</>}
        >
          <p>
            <M t="\nabla f = \langle 2xy^3, 3x^2 y^2\rangle \Rightarrow \nabla f(1,2) = \langle 16, 12\rangle" />.{' '}
            <M t="\mathbf{u} = \langle \frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}\rangle \implies D_{\mathbf{u}} f = \frac{28}{\sqrt{2}} = \mathbf{14\sqrt{2}}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={<>Számítsd ki <M t="\nabla f(2, -1)" />-et, ha <M t="f(x, y) = \ln(x^2 + y^2)" />!</>}
        >
          <p>
            <M t="\nabla f = \left\langle \frac{2x}{x^2+y^2},\, \frac{2y}{x^2+y^2}\right\rangle \Rightarrow \nabla f(2, -1) = \mathbf{\left\langle \frac{4}{5},\, -\frac{2}{5}\right\rangle}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A legmeredekebb emelkedés és süllyedés irányai',
    body: (
      <>
        <p>
          Mivel <M t="D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u} = |\nabla f|\cdot 1\cdot \cos\varphi = |\nabla f|\cos\varphi" />,
          ahol <M t="\varphi" /> a <M t="\nabla f" /> és <M t="\mathbf{u}" /> közötti szög, három aranyigazság
          következik egyetlen sorból:
        </p>
        <Def title="A gradiens geometriai jelentése">
          <ol style={{ margin: '4px 0 0 18px' }}>
            <li>
              <strong>Leggyorsabb növekedés:</strong> a <M t="+\nabla f" /> irányában (<M t="\cos 0^\circ = 1" />),
              maximális meredeksége <M t="\mathbf{+|\nabla f|}" />!
            </li>
            <li>
              <strong>Leggyorsabb csökkenés:</strong> a <M t="-\nabla f" /> irányában (<M t="\cos 180^\circ = -1" />),
              meredeksége <M t="\mathbf{-|\nabla f|}" />!
            </li>
            <li>
              <strong>Nulla változás:</strong> minden <M t="\nabla f" />-re <strong>merőleges</strong> irányban
              (<M t="\cos 90^\circ = 0" />)!
            </li>
          </ol>
        </Def>

        <SteepestAscent3DWidget />

        <Quiz
          q={<>Egy hegyoldalon a <M t="P" /> pontban <M t="\nabla f(P) = \langle 3, -4\rangle" />. Mekkora a <strong>legnagyobb lehetséges emelkedés</strong> ebben a pontban?</>}
          options={[
            { label: <><M t="7" /></> },
            { label: <><M t="5" /></>, ok: true },
            { label: <><M t="-1" /></> },
            { label: <><M t="25" /></> },
          ]}
          explain={
            <>
              A legnagyobb iránymenti derivált mindig <M t="|\nabla f(P)| = \sqrt{3^2 + (-4)^2} = \mathbf{5}" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Add meg a leggyorsabb növekedés és csökkenés egységvektorát, valamint a nulla változás irányait az <M t="f(x, y) = \frac{x^2}{2} + \frac{y^2}{2}" /> függvényre az <M t="(1, 1)" /> pontban (Thomas 3. példa)!</>}
        >
          <p>
            <M t="\nabla f(1,1) = \langle 1, 1\rangle,\; |\nabla f| = \sqrt{2}" />. Növekedés:{' '}
            <M t="\langle \frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}\rangle" />; csökkenés:{' '}
            <M t="\langle -\frac{1}{\sqrt{2}}, -\frac{1}{\sqrt{2}}\rangle" />; nulla változás:{' '}
            <M t="\pm\langle -\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}\rangle" />!
          </p>
        </Task>
        <Task
          n={6}
          q={<>Egy fémlemez hőmérséklete <M t="T(x, y) = 80 - x^2 - 2y^2" />. Melyik irányba induljon egy hangya a <M t="(2, 1)" /> pontból, ha a lehető leggyorsabban szeretne <strong>melegedni</strong>?</>}
        >
          <p>
            <M t="\nabla T(2, 1) = \langle -2x, -4y\rangle|_{(2,1)} = \mathbf{\langle -4, -4\rangle}" /> (azaz az origó
            felé, egységvektora <M t="\langle -\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2}\rangle" />)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Gradiens ⊥ szintvonal: érintőegyenes egyetlen sorban!',
    body: (
      <>
        <p>
          Ha <M t="\mathbf{r}(t) = \langle g(t), h(t)\rangle" /> egy <M t="f(x, y) = c" /> szintvonal
          paraméterezése, akkor <M t="f(g(t), h(t)) \equiv c" />. Deriválva <M t="t" /> szerint a láncszabállyal:
        </p>
        <M block t="\nabla f \cdot \mathbf{r}'(t) = 0 \quad\Longrightarrow\quad \mathbf{\nabla f \perp \text{szintvonal}}!" />
        <p>
          Ezért a szintvonal <M t="(x_0, y_0)" /> pontbeli érintőegyenesének normálvektora pontosan{' '}
          <M t="\nabla f(x_0, y_0)" />, így az érintő egyenlete:
        </p>
        <M block t="f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0) = 0." />

        <LevelCurveNormalWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Írd fel az <M t="x^2 + y^2 = 25" /> kör érintőjét a <M t="(3, -4)" /> pontban gradienssel!</>}
        >
          <p>
            <M t="\nabla f(3,-4) = \langle 6, -8\rangle \Rightarrow 6(x-3) - 8(y+4) = 0 \iff \mathbf{3x - 4y = 25}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={<>Írd fel az <M t="xy = 6" /> hiperbola érintőjét a <M t="(2, 3)" /> pontban gradienssel!</>}
        >
          <p>
            <M t="\nabla(xy) = \langle y, x\rangle \Rightarrow \langle 3, 2\rangle" />. Érintő:{' '}
            <M t="3(x-2) + 2(y-3) = 0 \iff \mathbf{3x + 2y = 12}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A gradiens algebrai szabályai',
    body: (
      <>
        <p>
          A <M t="\nabla" /> operátor ugyanazokat a szabályokat követi, mint a 3. fejezetbeli egyváltozós
          deriválás — ezért bonyolult kombinációk gradiensét is villámgyorsan kiszámolhatjuk!
        </p>

        <GradientRulesCardDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Ha <M t="\nabla f(P) = \langle 1, 2\rangle" />, <M t="f(P) = 3" />, <M t="\nabla g(P) = \langle -1, 4\rangle" />, <M t="g(P) = 2" />, mennyi <M t="\nabla(fg)(P)" />?</>}
        >
          <p>
            <M t="f\nabla g + g\nabla f = 3\langle -1, 4\rangle + 2\langle 1, 2\rangle = \mathbf{\langle -1, 16\rangle}" />!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Használd a láncszabályt (<M t="\nabla(h(f)) = h'(f)\nabla f" />): mennyi <M t="\nabla(e^{x^2+y^2})" />?</>}
        >
          <p>
            <M t="e^{x^2+y^2}\cdot \nabla(x^2+y^2) = \mathbf{e^{x^2+y^2}\langle 2x, 2y\rangle}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Háromváltozós gradiens és iránymenti derivált',
    body: (
      <>
        <p>
          Három változóban pontosan ugyanúgy működik minden: <M t="\nabla f = \langle f_x, f_y, f_z\rangle" />, és{' '}
          <M t="D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}" /> (<M t="|\mathbf{u}| = 1" />). És itt jön a 3D
          geometria egyik legszebb ténye: <strong><M t="\nabla f(x_0, y_0, z_0)" /> merőleges az{' '}
          <M t="f(x, y, z) = c" /> szintfelületre!</strong>
        </p>

        <Gradient3DSurfaceNormalWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Számítsd ki <M t="f(x, y, z) = x^3 - xy^2 - z" /> iránymenti deriváltját a <M t="P(1, 1, 0)" /> pontban a <M t="\mathbf{v} = \langle 2, -3, 6\rangle" /> irányában (Thomas 6. példa)!</>}
        >
          <p>
            <M t="\nabla f = \langle 3x^2 - y^2, -2xy, -1\rangle \Rightarrow \nabla f(1,1,0) = \langle 2, -2, -1\rangle" />.
            Mivel <M t="|\mathbf{v}| = \sqrt{4+9+36} = 7" />,{' '}
            <M t="D_{\mathbf{u}} f = \frac{2(2) + (-2)(-3) + (-1)(6)}{7} = \mathbf{\frac{4}{7}}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Melyik irányba nő leggyorsabban <M t="f(x, y, z) = x^2 + y^2 + z^2" /> a <M t="(1, 2, 2)" /> pontban, és mekkora ez a növekedési ütem?</>}
        >
          <p>
            <M t="\nabla f(1,2,2) = \langle 2, 4, 4\rangle" />, hossza <M t="\sqrt{4+16+16} = \mathbf{6}" />.
            Egységvektora: <M t="\langle \frac{1}{3}, \frac{2}{3}, \frac{2}{3}\rangle" /> (sugárirányban kifelé!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Gradiens ereszkedés: hogyan tanul a mesterséges intelligencia?',
    body: (
      <>
        <Story>
          <p>
            A modern neurális hálózatok betanítása pontosan egy sokmillió változós <strong>gradiens ereszkedés</strong>:
            a program kiszámolja a hiba (veszteségfüggvény) gradiensét <M t="\nabla L" />, majd apró{' '}
            <M t="\eta" /> lépésekkel elindul a <strong><M t="-\nabla L" /> legmeredekebb süllyedés</strong> irányába!
          </p>
        </Story>

        <GradientDescentSimWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Ha <M t="L(x, y) = 0{,}5x^2 + 2y^2" />, <M t="p_0 = (2, 1)" /> és <M t="\eta = 0{,}25" />, hova jutunk 1 gradiens-ereszkedési lépés után?</>}
        >
          <p>
            <M t="\nabla L(2, 1) = \langle 2, 4\rangle" />. Így{' '}
            <M t="p_1 = (2, 1) - 0{,}25(2, 4) = \mathbf{(1{,}5;\; 0)}" />!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Miért robban szét a szimulátorban az ereszkedés, ha <M t="\eta > 0{,}5" />?</>}
        >
          <p>
            Az <M t="y" /> koordinátában <M t="y_{k+1} = (1 - 4\eta)y_k" /> — ha <M t="\eta > 0{,}5" />, akkor{' '}
            <M t="|1 - 4\eta| > 1" />, így az algoritmus átugorja a völgyet és egyre nagyobbat lendül (pont mint a
            9.3 Euler-instabilitása)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok (100. szakasz mérföldkő!)',
    body: (
      <>
        <GradientMasterSummaryDiagram />

        <Def title="14.5 Puskakártya — Minden képlet egy helyen">
          <ul>
            <li><strong>Gradiens:</strong> <M t="\nabla f = \langle f_x, f_y\rangle" /> (3D-ben <M t="\langle f_x, f_y, f_z\rangle" />).</li>
            <li><strong>Iránymenti derivált:</strong> <M t="D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}" />, ahol <M t="\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|}" />!</li>
            <li><strong>Szélső irányok:</strong> max emelkedés <M t="+\nabla f" /> (<M t="+|\nabla f|" />), max süllyedés <M t="-\nabla f" /> (<M t="-|\nabla f|" />), nulla változás <M t="\perp \nabla f" />.</li>
            <li><strong>Szintvonal érintője:</strong> <M t="f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0) = 0" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 14.5-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li><strong>Elfelejteni normálni</strong> az irányvektort (<M t="|\mathbf{u}| = 1" /> kötelező!).</li>
            <li>A gradienset <em>számnak</em> hinni — a gradiens <strong>vektor</strong>, az iránymenti derivált pedig <strong>skalár</strong>!</li>
            <li>A <M t="\nabla f" /> vektort az <M t="xyz" />-térbe rajzolni 2D függvénynél: <M t="\nabla f(x,y)" /> az <strong><M t="xy" />-síkban</strong> fekvő 2D vektor!</li>
            <li>Összekeverni a legnagyobb növekedés <em>irányát</em> (<M t="\nabla f / |\nabla f|" />) az <em>ütemével</em> (<M t="|\nabla f|" />).</li>
            <li>Az <M t="f(x, y) = c" /> szintvonalat először <M t="y(x)" />-re próbálni megoldani az érintőhöz — a gradiens-képlet sokkal gyorsabb!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki <M t="\nabla f(2, 3)" />-at, ha <M t="f(x, y) = x^2 y - y^2" />!</>}
        >
          <p>
            <M t="\nabla f = \langle 2xy, x^2 - 2y\rangle \Rightarrow \nabla f(2, 3) = \mathbf{\langle 12, -2\rangle}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számítsd ki <M t="D_{\mathbf{u}} f(1, 0)" />-t, ha <M t="f(x, y) = e^x \cos y" /> és <M t="\mathbf{u} = \langle \frac{3}{5}, \frac{4}{5}\rangle" />!</>}
        >
          <p>
            <M t="\nabla f(1,0) = \langle e, 0\rangle \implies D_{\mathbf{u}} f = \mathbf{\frac{3e}{5}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Mekkora a maximális iránymenti deriváltja az <M t="f(x, y) = 3x - 4y + 7" /> síknak bármely pontban?</>}
        >
          <p>
            <M t="\nabla f = \langle 3, -4\rangle \implies |\nabla f| = \mathbf{5}" /> minden pontban!
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Számítsd ki <M t="f(x, y) = x^2 + xy + y^2" /> iránymenti deriváltját a <M t="P(1, 2)" /> pontból a <M t="Q(4, -2)" /> pont felé!</>}
        >
          <p>
            <M t="\overrightarrow{PQ} = \langle 3, -4\rangle \Rightarrow \mathbf{u} = \langle \frac{3}{5}, -\frac{4}{5}\rangle" />.{' '}
            <M t="\nabla f(1,2) = \langle 2x+y, x+2y\rangle|_{(1,2)} = \langle 4, 5\rangle" />.{' '}
            <M t="D_{\mathbf{u}} f = \frac{12 - 20}{5} = \mathbf{-\frac{8}{5}}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Írd fel a <M t="x^2 - y^2 = 16" /> hiperbola érintő- és normálisegyenesét az <M t="(5, 3)" /> pontban!</>}
        >
          <p>
            <M t="\nabla f(5, 3) = \langle 10, -6\rangle" /> (párhuzamos <M t="\langle 5, -3\rangle" />-mal). Érintő:{' '}
            <M t="5(x-5) - 3(y-3) = 0 \iff \mathbf{5x - 3y = 16}" />. Normális:{' '}
            <M t="3(x-5) + 5(y-3) = 0 \iff \mathbf{3x + 5y = 30}" />!
          </p>
        </Task>
        <Task
          n={20}
          q={<>Számítsd ki <M t="f(x, y, z) = \ln(x^2 + y^2 + z^2)" /> gradiensét az <M t="(1, 1, 1)" /> pontban és maximális növekedési ütemét!</>}
        >
          <p>
            <M t="\nabla f(1,1,1) = \langle \frac{2}{3}, \frac{2}{3}, \frac{2}{3}\rangle" />, maximális ütem:{' '}
            <M t="|\nabla f| = \mathbf{\frac{2\sqrt{3}}{3}}" />.
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Egy <M t="f(x, y)" /> differenciálható függvényről tudjuk, hogy egy <M t="P" /> pontban <M t="D_{\mathbf{u}} f = 2" /> az <M t="\mathbf{u} = \langle \frac{3}{5}, \frac{4}{5}\rangle" /> irányban, és <M t="D_{\mathbf{v}} f = -1" /> a <M t="\mathbf{v} = \langle -\frac{4}{5}, \frac{3}{5}\rangle" /> irányban. Határozd meg <M t="\nabla f(P)" />-t!</>}
        >
          <p>
            Mivel <M t="\mathbf{u} \perp \mathbf{v}" /> ortonormált bázis, azonnal{' '}
            <M t="\nabla f = (D_{\mathbf{u}} f)\mathbf{u} + (D_{\mathbf{v}} f)\mathbf{v} = 2\langle \frac{3}{5}, \frac{4}{5}\rangle - 1\langle -\frac{4}{5}, \frac{3}{5}\rangle = \mathbf{\langle 2, 1\rangle}" />!
          </p>
        </Task>
        <Task
          n={22}
          q={<>Egy hőforrás körül a hőmérséklet <M t="T(x, y) = 200 e^{-x^2 - 3y^2}" />. Milyen <M t="y(x)" /> görbén halad a hőáramlás (amely mindig <M t="-\nabla T" /> irányú) a <M t="(1, 1)" /> pontból indulva?</>}
        >
          <p>
            <M t="\nabla T \parallel \langle -2x, -6y\rangle \parallel \langle x, 3y\rangle" />, tehát a pálya
            differenciálegyenlete <M t="\frac{dy}{dx} = \frac{3y}{x}" />! Szétválasztva <M t="\ln|y| = 3\ln|x| + C" />,
            és <M t="(1,1)" />-ből <M t="\mathbf{y = x^3}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Igazold, hogy az <M t="r = \sqrt{x^2 + y^2 + z^2}" /> távolságfüggvény gradiense bármely nem-origó pontban a sugárirányú egységvektor: <M t="\nabla r = \frac{\mathbf{r}}{r}" />, és így <M t="|\nabla r| \equiv 1" />!</>}
        >
          <p>
            <M t="\frac{\partial r}{\partial x} = \frac{x}{r}" />, hasonlón <M t="y" />-ra és <M t="z" />-re, tehát{' '}
            <M t="\nabla r = \frac{1}{r}\langle x, y, z\rangle = \frac{\mathbf{r}}{r}" />, amelynek hossza{' '}
            <M t="\frac{|\mathbf{r}|}{r} = \mathbf{1}" />!
          </p>
        </Task>
      </>
    ),
  },
];
