import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  VoxelGrid3DWidget,
  ShadowAndSpear3DWidget,
  SixOrdersTetrahedronWidget,
  HorizontalParaboloid3DWidget,
  TripleOrderSwapWidget,
  AverageTempCubeWidget,
  SteinmetzSolidWidget,
  TripleIntegralRoadmapDiagram,
} from '../components/Widgets154';

export const S15_4: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. A hármas integrál fogalma: 3D voxelek és térfogat',
    body: (
      <>
        <Story>
          Egy dimenzióban szakaszokra (<M t="dx" />), két dimenzióban kis négyzetekre (<M t="dA = dx\,dy" />) bontottuk
          a tartományt. Három dimenzióban egy <M t="D \subset \mathbb{R}^3" /> testet apró <strong>téglatest-cellákra
          (voxelekre)</strong> bontunk (<M t="\Delta V_k = \Delta x_k \Delta y_k \Delta z_k" />), és összegezzük rajtuk
          az <M t="F(x,y,z)" /> függvény értékeit — így kapunk tömeget változó sűrűségű 3D testre, össztöltést vagy
          éppen pontos térfogatot!
        </Story>

        <Def title="Hármas integrál és térfogat">
          <M block t="\iiint_D F(x,y,z)\,dV = \lim_{\|P\|\to 0} \sum_{k=1}^n F(x_k, y_k, z_k)\,\Delta V_k." />
          <ul>
            <li>Ha <M t="F(x,y,z) \equiv 1" />, akkor <M t="\operatorname{Térf}(D) = \iiint_D 1\,dV" />.</li>
            <li>
              <strong>Téglatesten (<M t="B = [a,b]\times[c,d]\times[p,q]" />):</strong> Fubini tétele szerint mind a
              <M t="3! = 6" /> integrálási sorrend ugyanazt az eredményt adja; szorzatfüggvénynél
              <M t="F(x,y,z) = g(x)h(y)k(z)" /> három 1D integrál szorzatára esik szét!
            </li>
          </ul>
        </Def>

        <VoxelGrid3DWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\iiint_B x y^2 z^3\,dV" /> integrált a <M t="B = [0, 1] \times [0, 2] \times [0, 1]" /> téglatesten!</>}>
          <p>
            Szorzatfüggvény téglatesten! Három 1D integrál szorzata:
            <M block t="\left(\int_0^1 x\,dx\right)\left(\int_0^2 y^2\,dy\right)\left(\int_0^1 z^3\,dz\right) = \frac{1}{2} \cdot \frac{8}{3} \cdot \frac{1}{4} = \frac{1}{3}." />
          </p>
        </Task>

        <Task n={2} q={<>Számítsd ki az <M t="\int_0^1 \int_0^2 \int_0^3 (x + y + z)\,dz\,dy\,dx" /> hármas integrált!</>}>
          <p>
            Linearitással a 3 tag külön-külön szorzat:
            <M t="\int_0^1 x\,dx \cdot 2 \cdot 3 = 3" />, <M t="1 \cdot \int_0^2 y\,dy \cdot 3 = 6" />, <M t="1 \cdot 2 \cdot \int_0^3 z\,dz = 9" />.
            Összegük: <M t="3 + 6 + 9 = 18" />! (Vagy átlagértékkel: a téglatest térfogata <M t="6" />, középpontja <M t="(0{,}5;\; 1;\; 1{,}5)" />, ahol <M t="x+y+z = 3 \implies 6 \cdot 3 = 18" />!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. A 3D határok felírása: az „Árnyék + Lándzsa” módszer',
    body: (
      <>
        <Story>
          Hogyan írjuk fel a 6 integrálhatárt egy görbe felületekkel határolt 3D testen úgy, hogy ne vesszünk el a
          térben? Felejtsd el a találgatást, és használd az <strong>Árnyék + Lándzsa</strong> módszert: előbb egy
          függőleges lándzsával mérd meg a test alját és tetejét (<M t="z" />), majd a padlóra vetített 2D árnyékon
          már csak egy sima 15.1-es kettős integrált kell felírnod!
        </Story>

        <Def title="Hármas integrál felírása dz dy dx sorrendben">
          <M block t="\iiint_D F(x,y,z)\,dV = \iint_R \left(\int_{u_1(x,y)}^{u_2(x,y)} F(x,y,z)\,dz\right) dA," />
          <ol>
            <li><strong>Lándzsa (belső <M t="dz" />):</strong> adott <M t="(x,y)" /> felett hol lép be a függőleges lándzsa (<M t="z = u_1(x,y)" />) és hol lép ki (<M t="z = u_2(x,y)" />)?</li>
            <li><strong>Árnyék (külső <M t="dA" />):</strong> vetítsd le <M t="D" />-t az <M t="xy" />-síkra (<M t="R" />), és írd fel a 2D határokat!</li>
          </ol>
        </Def>

        <ShadowAndSpear3DWidget />

        <Quiz
          q={<>Ha a hármas integrál sorrendje <M t="dz\,dy\,dx" />, melyik változók szerepelhetnek a <em>középső</em> (<M t="dy" />) integrál határaiban?</>}
          options={[
            { label: 'x és z is' },
            { label: 'Kizárólag x (és konstansok)!', ok: true },
            { label: 'Kizárólag konstansok' },
          ]}
          explain={<>A belső dz már kiintegrálta z-t, a középső dy éppen y-t integrálja ki ⇒ a középső határokban csak a külső változó (x) szerepelhet!</>}
        />

        <Task n={3} q={<>Számítsd ki az első oktánsban az <M t="x + y + z = 2" /> sík és a koordinátasíkok által határolt tetraéder térfogatát hármas integrállal!</>}>
          <p>
            Lándzsa: <M t="0 \le z \le 2 - x - y" />. Árnyék az <M t="xy" />-síkon: <M t="0 \le x \le 2, \; 0 \le y \le 2 - x" />.
            <M block t="V = \int_0^2 \int_0^{2-x} \int_0^{2-x-y} 1\,dz\,dy\,dx = \int_0^2 \int_0^{2-x} (2 - x - y)\,dy\,dx = \frac{1}{2}\int_0^2 (2-x)^2\,dx = \frac{8}{6} = \frac{4}{3}." />
          </p>
        </Task>

        <Task n={4} q={<>Határozd meg a <M t="z = 1 - x^2" /> parabolikus henger, a <M t="z = 0, \; x = 0, \; y = 0" /> és az <M t="y = 3" /> síkok által határolt test térfogatát (<M t="x \ge 0" />)!</>}>
          <p>
            Lándzsa: <M t="0 \le z \le 1 - x^2" />. Árnyék: <M t="[0, 1] \times [0, 3]" /> téglalap!
            <M block t="V = \int_0^3 \int_0^1 \int_0^{1-x^2} 1\,dz\,dx\,dy = 3\int_0^1 (1 - x^2)\,dx = 3\cdot\frac{2}{3} = 2." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. A 3! = 6 integrálási sorrend: melyik síkra vetítsünk?',
    body: (
      <>
        <Story>
          Egy 3D testet nem csak lefelé (az <M t="xy" />-síkra) vetíthetünk! Szúrhatjuk a lándzsát elölről hátrafelé
          (<M t="dx" /> legbelül → vetítés az <M t="yz" />-síkra) vagy balról jobbra (<M t="dy" /> legbelül → vetítés
          az <M t="xz" />-síkra). Összesen <M t="3! = 6" /> lehetséges sorrend létezik — és egy okos sorrendválasztás
          gyakran megkímél minden törttől és négyzetgyöktől!
        </Story>

        <SixOrdersTetrahedronWidget />

        <Task n={5} q={<>Számítsd ki az <M t="x + 2y + 3z = 6" /> sík által az első oktánsban levágott tetraéder térfogatát a törtmentes <M t="dx\,dy\,dz" /> sorrenddel!</>}>
          <p>
            <M t="0 \le z \le 2" />, <M t="0 \le y \le \frac{6-3z}{2}" />, <M t="0 \le x \le 6 - 2y - 3z" />:
            <M block t="V = \int_0^2 \int_0^{3 - 3z/2} (6 - 3z - 2y)\,dy\,dz = \int_0^2 \left[(6-3z)y - y^2\right]_0^{3-3z/2} dz = \int_0^2 \frac{(6-3z)^2}{4}\,dz = \frac{1}{4}\left[-\frac{(6-3z)^3}{9}\right]_0^2 = \frac{216}{36} = 6." />
          </p>
        </Task>

        <Task n={6} q={<>Írd fel a <M t="D" /> térrész <M t="\iiint_D F\,dV" /> integrálját <M t="dy\,dz\,dx" /> sorrendben, ha <M t="D" /> az <M t="x \ge 0, \; y \ge 0, \; z \ge 0" /> és <M t="x + y + z \le 1" /> tetraéder!</>}>
          <p>
            <M t="y" />-lándzsa: <M t="0 \le y \le 1 - x - z" />. Az <M t="xz" />-árnyék: <M t="0 \le x \le 1, \; 0 \le z \le 1 - x" />:
            <M block t="\int_0^1 \int_0^{1-x} \int_0^{1-x-z} F(x,y,z)\,dy\,dz\,dx." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Vetítés az xz- és yz-síkra (amikor dy vagy dx van legbelül)',
    body: (
      <>
        <Story>
          Ha egy paraboloid vagy kúp tengelye <strong>nem a <M t="z" />-tengely, hanem az <M t="y" />-tengely</strong>
          (pl. <M t="y = x^2 + z^2" />), akkor a testet ne fentről nézd, hanem az <M t="y" />-tengely irányából!
          Azonnal látod, hogy a belső integrál <M t="dy" />, az <M t="xz" />-árnyék pedig egy gyönyörű körlap!
        </Story>

        <HorizontalParaboloid3DWidget />

        <Task n={7} q={<>Számítsd ki az <M t="y = x^2 + z^2" /> paraboloid és az <M t="y = 4" /> sík által határolt test térfogatát!</>}>
          <p>
            <M t="y" />-lándzsa: <M t="x^2 + z^2 \le y \le 4" />. Az <M t="xz" />-árnyék az <M t="x^2 + z^2 \le 4" /> körlap!
            A belső <M t="dy" /> után térjünk át polárkoordinátákra az <M t="xz" />-síkban (<M t="x^2+z^2 = r^2" />):
            <M block t="V = \iint_{x^2+z^2 \le 4} (4 - x^2 - z^2)\,dA = \int_0^{2\pi} \int_0^2 (4 - r^2)\,r\,dr\,d\theta = 2\pi\left[2r^2 - \frac{r^4}{4}\right]_0^2 = 8\pi." />
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki az <M t="\iiint_D y\,dV" /> integrált a <M t="0 \le x \le 4 - y^2 - z^2" /> test felett (tipp: <M t="dx" /> legbelül, vetítés <M t="yz" />-re)!</>}>
          <p>
            Az <M t="yz" />-árnyék az <M t="y^2 + z^2 \le 4" /> körlap, amely szimmetrikus a <M t="z" />-tengelyre (<M t="y \mapsto -y" />),
            a határok (<M t="4 - y^2 - z^2" />) párosak <M t="y" />-ban, míg az integrandus (<M t="y" />) páratlan <M t="y" />-ban ⇒
            szimmetriából azonnal <M t="\iiint_D y\,dV = 0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Hármas integrálok sorrendcseréje',
    body: (
      <>
        <Story>
          Ahogy 2D-ben, úgy 3D-ben is sokszor egy adott sorrendű integrált kell átírnunk egy másik sorrendbe. A titok
          itt is ugyanaz: <strong>írd ki a határokból a 3 egyenlőtlenséget</strong>, azonosítsd a 3D testet és a
          szükséges vetítési síkot, majd olvasd le az új határokat!
        </Story>

        <Steps
          title="Sorrendcsere 3D-ben: 0 ≤ z ≤ y ≤ x ≤ 1"
          problem={<>Írd át az <M t="\int_0^1 \int_0^x \int_0^y F(x,y,z)\,dz\,dy\,dx" /> integrált <M t="dx\,dy\,dz" /> sorrendbe!</>}
          steps={[
            {
              title: '1. Egyenlőtlenség-lánc kiolvasása',
              body: (
                <>
                  <M t="0 \le x \le 1" />, <M t="0 \le y \le x" />, <M t="0 \le z \le y" /> — ez egyetlen tömör lánc:
                  <M block t="0 \le z \le y \le x \le 1." />
                </>
              ),
            },
            {
              title: '2. Visszafelé olvasás (külső z, középső y, belső x)',
              body: (
                <>
                  • Külső <M t="z" />: <M t="0 \le z \le 1" />.
                  <br />• Középső <M t="y" />: a láncból <M t="z \le y \le 1" />.
                  <br />• Belső <M t="x" />: a láncból <M t="y \le x \le 1" />.
                </>
              ),
            },
            {
              title: '3. Az átírt integrál',
              body: (
                <>
                  <M block t="\int_0^1 \int_z^1 \int_y^1 F(x,y,z)\,dx\,dy\,dz." />
                </>
              ),
            },
          ]}
        />

        <TripleOrderSwapWidget />

        <Quiz
          q={<>Ha a tartomány <M t="0 \le x \le 1, \; 0 \le y \le 1, \; 0 \le z \le x" />, mennyi a térfogata?</>}
          options={[
            { label: '1/6' },
            { label: '1/2 (mert egy 1×1×1-es kocka átlósan kettévágott fele!)', ok: true },
            { label: '1/3' },
          ]}
          explain={<>Az y nem korlátozza sem x-et, sem z-t (0 ≤ y ≤ 1); az xz-síkban pedig a 0 ≤ z ≤ x ≤ 1 háromszög (területe 1/2) van ⇒ térfogat 1 · 1/2 = 1/2!</>}
        />

        <Task n={9} q={<>Számítsd ki sorrendcserével az <M t="\int_0^1 \int_0^1 \int_z^1 e^{x^2}\,dx\,dz\,dy" /> integrált!</>}>
          <p>
            Az <M t="y" /> független (<M t="[0,1]" />, szorzója <M t="1" />). Az <M t="xz" />-síkban <M t="0 \le z \le x \le 1" />,
            megfordítva <M t="0 \le x \le 1, \; 0 \le z \le x" />:
            <M block t="1 \cdot \int_0^1 \int_0^x e^{x^2}\,dz\,dx = \int_0^1 x e^{x^2}\,dx = \frac{e - 1}{2}." />
          </p>
        </Task>

        <Task n={10} q={<>Írd át <M t="dy\,dx\,dz" /> sorrendbe az <M t="\int_0^1 \int_0^{1-x} \int_0^{1-x-y} F(x,y,z)\,dz\,dy\,dx" /> integrált!</>}>
          <p>
            Ez az <M t="x, y, z \ge 0, \; x + y + z \le 1" /> szimmetrikus tetraéder!
            Külső <M t="z \in [0, 1]" />, középső <M t="x \in [0, 1 - z]" />, belső <M t="y \in [0, 1 - x - z]" />:
            <M block t="\int_0^1 \int_0^{1-z} \int_0^{1-x-z} F(x,y,z)\,dy\,dx\,dz." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. Háromdimenziós átlagérték és 3D szimmetria',
    body: (
      <>
        <Story>
          A 3D átlagérték pontosan ugyanúgy működik, mint az 1D és 2D: elosztjuk a hármas integrált a test
          térfogatával! Így kapjuk meg egy szoba átlaghőmérsékletét, egy bolygó átlagsűrűségét vagy egy tartály
          átlagos koncentrációját.
        </Story>

        <Def title="Háromváltozós átlagérték">
          <M block t="\bar{F} = \frac{1}{\operatorname{Térf}(D)} \iiint_D F(x,y,z)\,dV." />
          <p>
            <strong>3D szimmetria-szabály:</strong> ha <M t="D" /> szimmetrikus az <M t="yz" />-síkra (<M t="x \mapsto -x" />)
            és <M t="F(-x,y,z) = -F(x,y,z)" />, akkor <M t="\iiint_D F\,dV = 0" /> (hasonlóan <M t="y" />-ra és <M t="z" />-re!).
          </p>
        </Def>

        <AverageTempCubeWidget />

        <Task n={11} q={<>Mi az <M t="F(x,y,z) = x^2 + y^2 + z^2" /> (origótól való távolság négyzete) átlagértéke az <M t="[0, 1]^3" /> egységkockán?</>}>
          <p>
            Térfogat <M t="V = 1" />. Mindhárom tag integrálja azonos: <M t="\int_0^1 x^2\,dx = \frac{1}{3}" />.
            Így <M t="\bar{F} = \frac{1}{3} + \frac{1}{3} + \frac{1}{3} = 1" />!
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki számolás nélkül az <M t="\iiint_B \bigl(4 + x^3 y^2 \cos z - 7z e^{x^2+y^2}\bigr)\,dV" /> integrált a <M t="B = [-1, 1]^3" /> kockán!</>}>
          <p>
            A kocka minden koordinátasíkra szimmetrikus. Az <M t="x^3 y^2 \cos z" /> páratlan <M t="x" />-ben, a
            <M t="-7z e^{x^2+y^2}" /> páratlan <M t="z" />-ben ⇒ mindkettő integrálja <M t="0" />!
            Marad <M t="4 \cdot \operatorname{Térf}(B) = 4 \cdot 2^3 = 32" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. A Steinmetz-test: két merőleges henger metszete',
    body: (
      <>
        <Story>
          Íme a 3D geometria egyik legmeglepőbb eredménye (már Arkhimédész is ismerte!): ha két egyforma, <M t="a" />
          sugarú henger (<M t="x^2 + y^2 \le a^2" /> és <M t="x^2 + z^2 \le a^2" />) derékszögben metszi egymást,
          a közös részük térfogatában <strong>egyáltalán nincs benne <M t="\pi" /></strong>! Miért? Mert az
          <M t="x" />-re merőleges minden egyes szelet pontosan egy <strong>négyzet</strong>!
        </Story>

        <SteinmetzSolidWidget />

        <Quiz
          q={<>A két <M t="a = 1" /> sugarú merőleges henger metszete (térfogata <M t="\frac{16}{3}" />) nagyobb vagy kisebb, mint az <M t="a = 1" /> sugarú gömb (<M t="\frac{4}{3}\pi" />)?</>}
          options={[
            { label: 'Nagyobb (16/3 ≈ 5,33 > 4π/3 ≈ 4,19 — a gömb teljesen belefér a metszetbe!)', ok: true },
            { label: 'Kisebb' },
            { label: 'Pontosan egyenlő' },
          ]}
          explain={<>Mivel x² + y² + z² ≤ 1 esetén automatikusan x²+y² ≤ 1 és x²+z² ≤ 1 is teljesül, az egységgömb teljesen benne van a Steinmetz-testben!</>}
        />

        <Task n={13} q={<>Számítsd ki hármas integrállal az <M t="x^2 + y^2 \le a^2" /> és <M t="x^2 + z^2 \le a^2" /> hengerek metszetének térfogatát!</>}>
          <p>
            Adott <M t="x \in [-a, a]" /> mellett <M t="|y| \le \sqrt{a^2-x^2}" /> és <M t="|z| \le \sqrt{a^2-x^2}" />:
            <M block t="V = \int_{-a}^a \int_{-\sqrt{a^2-x^2}}^{\sqrt{a^2-x^2}} \int_{-\sqrt{a^2-x^2}}^{\sqrt{a^2-x^2}} 1\,dz\,dy\,dx = \int_{-a}^a 4(a^2 - x^2)\,dx = 8\left[a^2 x - \frac{x^3}{3}\right]_0^a = \frac{16}{3}a^3." />
          </p>
        </Task>

        <Task n={14} q={<>Mennyi a Steinmetz-test és a belsejében lévő <M t="a" /> sugarú gömb térfogatának aránya?</>}>
          <p>
            <M block t="\frac{V_{\text{Steinmetz}}}{V_{\text{gömb}}} = \frac{\frac{16}{3}a^3}{\frac{4}{3}\pi a^3} = \frac{4}{\pi} \approx 1{,}273." />
            (Pontosan ugyanaz az arány, mint a négyzet és a beleírt kör területének aránya: <M t="\frac{4a^2}{\pi a^2} = \frac{4}{\pi}" /> — Cavalieri elve!)
          </p>
        </Task>
      </>
    ),
  },

  /* ── 8. OLDAL ── */
  {
    title: '8. Összefoglalás, buktatók és 9 lépcsőzetes gyakorlófeladat',
    body: (
      <>
        <TripleIntegralRoadmapDiagram />

        <Def title="Puskakártya — 15.4 Hármas integrál derékszögű koordinátákban">
          <ul>
            <li><strong>Térfogat:</strong> <M t="V = \iiint_D 1\,dV" /> · <strong>Átlagérték:</strong> <M t="\bar{F} = \frac{1}{V}\iiint_D F\,dV" />.</li>
            <li><strong>Árnyék + Lándzsa:</strong> belső integrál = lándzsa (<M t="u_1 \to u_2" />), külső kettő = 2D árnyék!</li>
            <li><strong>Határ-hierarchia:</strong> külső = konstansok, középső = max 1 változó, belső = max 2 változó.</li>
            <li><strong>6 sorrend:</strong> válaszd azt a belső változót, amelyre a felületek könnyen kifejezhetők törtek és gyökök nélkül!</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>Téves árnyék:</strong> Az <M t="xy" />-árnyék NEM mindig a <M t="z = 0" /> síkkal való metszet! Két paraboloid metszeténél pl. a legszélesebb „has” (<M t="z_{\text{alsó}} = z_{\text{felső}}" />) adja az árnyék határát!</li>
            <li><strong>Tiltott változó a határokban:</strong> A <M t="dz\,dy\,dx" /> sorrend középső (<M t="dy" />) határában soha nem lehet <M t="z" />, a külső (<M t="dx" />) határában pedig sem <M t="y" />, sem <M t="z" />!</li>
            <li><strong>3D szimmetria csak egyik változóra:</strong> <M t="[-1,1]^3" /> kockán <M t="x^2 y^2" /> NEM nulla, csak a páratlan kitevőjű tagok tűnnek el!</li>
            <li><strong>Szorzat-szétválasztás tetraéderen:</strong> <M t="\iiint g(x)h(y)k(z)\,dV = (\int g)(\int h)(\int k)" /> kizárólag téglatesten igaz!</li>
            <li><strong>Integrandus elfelejtése térfogatnál:</strong> Ha a feladat <em>térfogatot</em> kér, az integrandus <M t="1" /> (<M t="\iiint_D 1\,dV" />), nem pedig a felső felület egyenlete (az már a <M t="z" /> felső határában van!).</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\int_0^1 \int_0^2 \int_0^1 6xyz\,dz\,dy\,dx" /> hármas integrált!</>}>
          <p>
            Szorzatfüggvény téglatesten: <M t="6 \cdot \frac{1}{2} \cdot 2 \cdot \frac{1}{2} = 3" />.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="\int_0^1 \int_0^x \int_0^{x+y} 1\,dz\,dy\,dx" /> integrált!</>}>
          <p>
            Belső: <M t="x + y" />. Középső: <M t="\int_0^x (x+y)\,dy = x^2 + \frac{x^2}{2} = \frac{3}{2}x^2" />.
            Külső: <M t="\int_0^1 \frac{3}{2}x^2\,dx = \frac{1}{2}" />.
          </p>
        </Task>

        <Task n={17} q={<>Mennyi az <M t="\iiint_B e^{x+y+z}\,dV" /> integrál a <M t="B = [0, \ln 2]^3" /> kockán?</>}>
          <p>
            <M block t="\left(\int_0^{\ln 2} e^x\,dx\right)^3 = (2 - 1)^3 = 1." />
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Számítsd ki az <M t="y = x^2" />, <M t="y = 4" />, <M t="z = 0" /> és <M t="z = 3 - y/2" /> felületek által határolt test térfogatát!</>}>
          <p>
            <M t="z" />-lándzsa: <M t="0 \le z \le 3 - \frac{y}{2}" />. Árnyék: <M t="-2 \le x \le 2, \; x^2 \le y \le 4" /> (vagy <M t="0 \le y \le 4, \; -\sqrt{y} \le x \le \sqrt{y}" /> — ez gyorsabb!):
            <M block t="V = \int_0^4 \int_{-\sqrt{y}}^{\sqrt{y}} \left(3 - \frac{y}{2}\right) dx\,dy = \int_0^4 2\sqrt{y}\left(3 - \frac{y}{2}\right) dy = \left[4y^{3/2} - \frac{2}{5}y^{5/2}\right]_0^4 = 32 - \frac{64}{5} = \frac{96}{5}." />
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\iiint_D z\,dV" /> integrált az <M t="x, y, z \ge 0, \; x + y + z \le 1" /> tetraéderen!</>}>
          <p>
            A <M t="dx\,dy\,dz" /> sorrendben adott <M t="z" />-nél a vízszintes szelet egy <M t="(1-z)" /> befogójú
            derékszögű háromszög, amelynek területe <M t="\frac{1}{2}(1-z)^2" />! Így 1 sor:
            <M block t="\int_0^1 z \cdot \frac{1}{2}(1 - z)^2\,dz = \frac{1}{2}\int_0^1 (z - 2z^2 + z^3)\,dz = \frac{1}{2}\left(\frac{1}{2} - \frac{2}{3} + \frac{1}{4}\right) = \frac{1}{24}." />
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="x = 0, \; y = 0, \; z = 0" /> és <M t="2x + y + z = 4" /> síkok által bezárt tetraéder térfogatát hármas integrállal!</>}>
          <p>
            <M t="0 \le x \le 2, \; 0 \le y \le 4 - 2x, \; 0 \le z \le 4 - 2x - y" />:
            <M block t="V = \int_0^2 \int_0^{4-2x} (4 - 2x - y)\,dy\,dx = \frac{1}{2}\int_0^2 (4 - 2x)^2\,dx = \frac{1}{2}\left[-\frac{(4-2x)^3}{6}\right]_0^2 = \frac{64}{12} = \frac{16}{3}." />
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Határozd meg a <M t="z = x^2 + 3y^2" /> és <M t="z = 8 - x^2 - y^2" /> paraboloidok által közbezárt test térfogatát! (Thomas klasszikus feladat)</>}>
          <p>
            A két paraboloid metszése: <M t="x^2 + 3y^2 = 8 - x^2 - y^2 \implies 2x^2 + 4y^2 = 8 \implies \frac{x^2}{4} + \frac{y^2}{2} = 1" /> (ellipszis árnyék!).
            Mivel a magasság <M t="8 - 2x^2 - 4y^2" />, skálázzuk <M t="x = 2u, \; y = \sqrt{2}\,v" /> (<M t="dA = 2\sqrt{2}\,du\,dv" />, <M t="u^2+v^2 \le 1" />):
            <M block t="V = 2\sqrt{2}\iint_{u^2+v^2 \le 1} 8(1 - u^2 - v^2)\,du\,dv = 16\sqrt{2}\int_0^{2\pi}\int_0^1 (1-r^2)r\,dr\,d\theta = 16\sqrt{2}\cdot 2\pi \cdot \frac{1}{4} = 8\pi\sqrt{2}." />
          </p>
        </Task>

        <Task n={22} q={<>Írd fel <M t="dx\,dy\,dz" /> sorrendben az <M t="\int_0^1 \int_0^{1-x^2} \int_0^{1-x} F(x,y,z)\,dy\,dz\,dx" /> integrált! (Vigyázat: az <M t="y" /> és <M t="z" /> határok egyszerre függenek <M t="x" />-től!)</>}>
          <p>
            Az egyenlőtlenségek: <M t="0 \le x \le 1" />, <M t="0 \le z \le 1 - x^2 \implies x \le \sqrt{1-z}" />,
            <M t="0 \le y \le 1 - x \implies x \le 1 - y" />.
            Tehát <M t="x \le \min\bigl(\sqrt{1-z}, \; 1 - y\bigr)" />! A két felső határ egyenlő, ha <M t="1 - z = (1-y)^2 \iff z = 2y - y^2" />.
            Ezért <M t="dx\,dy\,dz" /> sorrendben két részre bomlik az <M t="yz" />-négyzet (<M t="[0,1]^2" />):
            <M block t="\int_0^1 \int_0^{1-\sqrt{1-z}} \int_0^{\sqrt{1-z}} F\,dx\,dy\,dz + \int_0^1 \int_{1-\sqrt{1-z}}^1 \int_0^{1-y} F\,dx\,dy\,dz." />
          </p>
        </Task>

        <Task n={23} q={<>Bizonyítsd be, hogy az <M t="x_1, \dots, x_n \ge 0, \; x_1 + \dots + x_n \le 1" /> <M t="n" />-dimenziós egységszimplex „térfogata” <M t="n = 1, 2, 3" /> esetén rendre <M t="1, \frac{1}{2}, \frac{1}{6}" /> (<M t="\frac{1}{n!}" />), és add meg a 3D tetraéder térfogatát <M t="x/a + y/b + z/c \le 1" /> (<M t="a,b,c > 0" />) esetén!</>}>
          <p>
            • <M t="n=1" />: <M t="\int_0^1 1\,dx = 1 = \frac{1}{1!}" />.
            <br />• <M t="n=2" />: <M t="\int_0^1 (1-x)\,dx = \frac{1}{2} = \frac{1}{2!}" />.
            <br />• <M t="n=3" />: <M t="\int_0^1 \frac{1}{2}(1-z)^2\,dz = \frac{1}{6} = \frac{1}{3!}" />.
            Ha az éleket <M t="a, b, c" /> arányban nyújtjuk, minden koordinátánál kiemelkedik egy-egy <M t="a, b, c" /> tényező, így <M t="V = \frac{abc}{6}" />!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Hány különböző integrálási sorrendben írható fel egy derékszögű hármas integrál?</>}
          options={[
            { label: <><M t="6" /> (<M t="3! = 6" />)</>, ok: true },
            { label: <><M t="3" /></> },
            { label: <><M t="2" /></> },
            { label: <><M t="8" /></> },
          ]}
          explain={
            <>
              A <M t="dx, dy, dz" /> differenciálok <M t="3! = 6" /> féle permutációba rendezhetők.
            </>
          }
        />
      </>
    ),
  },
];
