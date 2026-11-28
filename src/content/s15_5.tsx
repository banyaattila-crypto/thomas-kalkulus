import type { Page } from './s1_1';
import { M } from '../components/M';
import { Def, Story, Task, Warn, Quiz, Steps } from '../components/ui';
import {
  DensityCube3DWidget,
  MissingLetterPlanesWidget,
  Classic3DCentroidsWidget,
  AxisDistance3DWidget,
  BoxSpinAxisWidget,
  RollingRaceWidget,
  PlanetaryCoreDensityWidget,
  Moments3DMasterDiagram,
} from '../components/Widgets155';

export const S15_5: Page[] = [
  /* ── 1. OLDAL ── */
  {
    title: '1. Háromdimenziós testek tömege változó sűrűséggel',
    body: (
      <>
        <Story>
          A 15.2-ben vékony síklemezek tömegét és súlypontját számoltuk kettős integrállal. A valós mérnöki és
          fizikai tárgyak azonban háromdimenziósak: egy repülőgép törzse, egy csillag belső rétegei vagy egy
          betonpillér térfogati sűrűsége (<M t="\delta(x,y,z)" />, pl. <M t="\text{kg/m}^3" />) pontról pontra változhat!
        </Story>

        <Def title="3D test tömege hármas integrállal">
          <p>
            Ha egy <M t="D \subset \mathbb{R}^3" /> térrészt kitöltő test térfogati tömegsűrűsége a folytonos
            <M t="\delta(x,y,z) \ge 0" /> függvény, akkor az össztömeg:
          </p>
          <M block t="M = \iiint_D \delta(x,y,z)\,dV." />
        </Def>

        <DensityCube3DWidget />

        <Task n={1} q={<>Számítsd ki az <M t="[0, 2]^3" /> kocka tömegét, ha sűrűsége <M t="\delta(x,y,z) = 1 + z" />!</>}>
          <p>
            <M block t="M = \int_0^2 \int_0^2 \int_0^2 (1 + z)\,dz\,dy\,dx = 2 \cdot 2 \cdot \left[z + \frac{z^2}{2}\right]_0^2 = 4 \cdot (2 + 2) = 16." />
          </p>
        </Task>

        <Task n={2} q={<>Egy <M t="D" /> téglatest (<M t="0 \le x \le 1, \; 0 \le y \le 2, \; 0 \le z \le 3" />) sűrűsége <M t="\delta(x,y,z) = 2xyz" />. Mennyi a tömege?</>}>
          <p>
            Szorzatfüggvény téglatesten:
            <M block t="M = 2\left(\int_0^1 x\,dx\right)\left(\int_0^2 y\,dy\right)\left(\int_0^3 z\,dz\right) = 2 \cdot \frac{1}{2} \cdot 2 \cdot \frac{9}{2} = 9." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 2. OLDAL ── */
  {
    title: '2. Elsőrendű nyomatékok és 3D tömegközéppont',
    body: (
      <>
        <Story>
          2D-ben két tengelyre vettünk nyomatékot (<M t="M_x, M_y" />). Három dimenzióban a három <strong>koordinátasíkra</strong>
          (<M t="yz, xz, xy" />) vesszük az elsőrendű nyomatékokat — és egyetlen zseniális emlékeztetővel soha nem
          kevered össze őket: <strong>a képletben mindig a „hiányzó betű” áll!</strong>
        </Story>

        <Def title="3D elsőrendű nyomatékok és tömegközéppont">
          <M block t="M_{yz} = \iiint_D x\,\delta\,dV, \qquad M_{xz} = \iiint_D y\,\delta\,dV, \qquad M_{xy} = \iiint_D z\,\delta\,dV." />
          <M block t="\bar{x} = \frac{M_{yz}}{M}, \qquad \bar{y} = \frac{M_{xz}}{M}, \qquad \bar{z} = \frac{M_{xy}}{M}." />
        </Def>

        <MissingLetterPlanesWidget />

        <Steps
          title="Thomas 1. példa mintájára: parabolikus henger súlypontja"
          problem={<>Határozd meg a <M t="z = 4 - x^2" />, <M t="z = 0" />, <M t="y = 0" />, <M t="y = 3" /> felületek által határolt homogén (<M t="\delta = 1" />) test súlypontját!</>}
          steps={[
            {
              title: '1. Szimmetria kihasználása (2 koordináta azonnal megvan!)',
              body: (
                <>
                  A test szimmetrikus az <M t="yz" />-síkra (<M t="x \in [-2, 2]" />) ⇒ <strong><M t="\bar{x} = 0" /></strong>!
                  Az <M t="y \in [0, 3]" /> irányban egyenletes ⇒ <strong><M t="\bar{y} = \frac{3}{2}" /></strong>!
                </>
              ),
            },
            {
              title: '2. Tömeg (térfogat) M kiszámítása',
              body: (
                <>
                  <M block t="M = \int_0^3 \int_{-2}^2 \int_0^{4-x^2} 1\,dz\,dx\,dy = 3 \cdot 2\int_0^2 (4 - x^2)\,dx = 6\left(8 - \frac{8}{3}\right) = 32." />
                </>
              ),
            },
            {
              title: '3. M_xy nyomaték és z̄',
              body: (
                <>
                  <M block t="M_{xy} = \int_0^3 \int_{-2}^2 \int_0^{4-x^2} z\,dz\,dx\,dy = 3 \cdot \frac{1}{2} \cdot 2\int_0^2 (4 - x^2)^2\,dx = 3\left(32 - \frac{64}{3} + \frac{32}{5}\right) = \frac{256}{5}." />
                  Így <M t="\bar{z} = \frac{256/5}{32} = \frac{8}{5} = 1{,}6" />. A súlypont <M t="\left(0,\; \frac{3}{2},\; \frac{8}{5}\right)" />!
                </>
              ),
            },
          ]}
        />

        <Quiz
          q={<>Melyik nyomatékot kell elosztani <M t="M" />-mel ahhoz, hogy megkapjuk a <M t="\bar{z}" /> koordinátát?</>}
          options={[
            { label: 'M_yz' },
            { label: 'M_xz' },
            { label: 'M_xy (mert a hiányzó betű a z!)', ok: true },
          ]}
          explain={<>Az xy-síktól való távolság a z koordináta, ezért M_xy = ∭ z·δ dV és z̄ = M_xy / M!</>}
        />

        <Task n={3} q={<>Számítsd ki az 1. feladatbeli <M t="[0, 2]^3" /> kocka (<M t="\delta = 1 + z" />) tömegközéppontját!</>}>
          <p>
            Szimmetriából <M t="\bar{x} = 1, \; \bar{y} = 1" />. Az 1. feladatból <M t="M = 16" />.
            <M block t="M_{xy} = 4\int_0^2 z(1 + z)\,dz = 4\left[\frac{z^2}{2} + \frac{z^3}{3}\right]_0^2 = 4\left(2 + \frac{8}{3}\right) = \frac{56}{3}." />
            Így <M t="\bar{z} = \frac{56/3}{16} = \frac{7}{6}" />, a tömegközéppont <M t="\left(1, 1, \frac{7}{6}\right)" />.
          </p>
        </Task>

        <Task n={4} q={<>Határozd meg a 2. feladatbeli téglatest (<M t="[0,1]\times[0,2]\times[0,3]" />, <M t="\delta = 2xyz" />) tömegközéppontját!</>}>
          <p>
            Szorzatfüggvénynél minden koordináta külön 1D súlypont!
            <M t="\bar{x} = \frac{\int_0^1 x^2 dx}{\int_0^1 x dx} = \frac{2}{3}" />,
            <M t="\bar{y} = \frac{\int_0^2 y^2 dy}{\int_0^2 y dy} = \frac{4}{3}" />,
            <M t="\bar{z} = \frac{\int_0^3 z^2 dz}{\int_0^3 z dz} = 2" />!
            A tömegközéppont <M t="\left(\frac{2}{3}, \frac{4}{3}, 2\right)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 3. OLDAL ── */
  {
    title: '3. Klasszikus 3D testek súlypontja',
    body: (
      <>
        <Story>
          A 2D háromszög súlypontja a magasság <M t="1/3" />-ánál van. Mi a helyzet 3D-ben egy tetraéderrel vagy
          egy kúppal? Egy dimenzióval feljebb a súlypont lejjebb csúszik: pontosan a magasság <strong><M t="1/4" />-énél</strong>
          lesz! Nézzük meg a négy legfontosabb klasszikust!
        </Story>

        <Classic3DCentroidsWidget />

        <Task n={5} q={<>Igazold hármas integrállal, hogy az <M t="x, y, z \ge 0, \; x + y + z \le 1" /> homogén tetraéder súlypontja <M t="\left(\frac{1}{4}, \frac{1}{4}, \frac{1}{4}\right)" />!</>}>
          <p>
            Térfogata <M t="V = \frac{1}{6}" />. A 15.4 19. feladatából <M t="M_{xy} = \iiint_D z\,dV = \frac{1}{24}" />.
            Így <M t="\bar{z} = \frac{1/24}{1/6} = \frac{1}{4}" />. Teljes szimmetriából <M t="\bar{x} = \bar{y} = \bar{z} = \frac{1}{4}" />!
          </p>
        </Task>

        <Task n={6} q={<>Határozd meg a <M t="z = x^2 + y^2" /> és <M t="z = h" /> közötti homogén paraboloid súlypontjának <M t="\bar{z}" /> koordinátáját (adott <M t="z" />-nél a szelet <M t="\pi z" /> területű kör)!</>}>
          <p>
            Vízszintes szeletekkel: <M t="V = \int_0^h \pi z\,dz = \frac{1}{2}\pi h^2" />,
            <M t="M_{xy} = \int_0^h z \cdot (\pi z)\,dz = \frac{1}{3}\pi h^3" />.
            Így <M t="\bar{z} = \frac{\pi h^3/3}{\pi h^2/2} = \frac{2}{3}h" /> a csúcstól (azaz <M t="\frac{1}{3}h" /> a sík tetejétől)!
          </p>
        </Task>
      </>
    ),
  },

  /* ── 4. OLDAL ── */
  {
    title: '4. Tehetetlenségi nyomatékok 3D-ben (I_x, I_y, I_z)',
    body: (
      <>
        <Story>
          A 15.2-ben egy síklemez pontjának az <M t="x" />-tengelytől való távolsága egyszerűen <M t="|y|" /> volt.
          Három dimenzióban egy <M t="P(x, y, z)" /> pontnak az <M t="x" />-tengelytől való távolsága a Pitagorasz-tétel
          szerint <M t="\sqrt{y^2 + z^2}" /> — ezért a 3D tehetetlenségi nyomatékban mindig a <strong>másik két
          koordináta négyzetösszege</strong> szerepel!
        </Story>

        <Def title="Tehetetlenségi nyomatékok a 3 koordinátatengelyre">
          <M block t="I_x = \iiint_D (y^2 + z^2)\,\delta\,dV, \qquad I_y = \iiint_D (x^2 + z^2)\,\delta\,dV, \qquad I_z = \iiint_D (x^2 + y^2)\,\delta\,dV." />
        </Def>

        <AxisDistance3DWidget />

        <Quiz
          q={<>Melyik integrál adja meg egy 3D test <M t="y" />-tengelyre vett tehetetlenségi nyomatékát (<M t="I_y" />)?</>}
          options={[
            { label: '∭ y² δ dV' },
            { label: '∭ (x² + z²) δ dV (mert az y-tengelytől való távolság négyzete x² + z²!)', ok: true },
            { label: '∭ (x² + y² + z²) δ dV' },
          ]}
          explain={<>Az y-tengelyen lévő legközelebbi pont (0, y, 0), ennek távolságnégyzete (x, y, z)-től pontosan x² + z²!</>}
        />

        <Task n={7} q={<>Számítsd ki egy <M t="[-a/2, a/2] \times [-b/2, b/2] \times [-c/2, c/2]" /> homogén téglatest (<M t="M = \delta abc" />) <M t="I_x" /> tehetetlenségi nyomatékát! (Thomas 2. példa)</>}>
          <p>
            <M block t="I_x = \delta \int_{-a/2}^{a/2} \int_{-b/2}^{b/2} \int_{-c/2}^{c/2} (y^2 + z^2)\,dz\,dy\,dx = \delta a\left(\frac{b^3 c}{12} + \frac{b c^3}{12}\right) = \frac{M}{12}(b^2 + c^2)." />
            Hasonlóan <M t="I_y = \frac{M}{12}(a^2 + c^2)" /> és <M t="I_z = \frac{M}{12}(a^2 + b^2)" />!
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki az <M t="[0, 1]^3" /> homogén (<M t="\delta = 1" />) egységkocka <M t="I_z" /> tehetetlenségi nyomatékát a <M t="z" />-tengelyre!</>}>
          <p>
            <M block t="I_z = \int_0^1 \int_0^1 \int_0^1 (x^2 + y^2)\,dz\,dy\,dx = \frac{1}{3} + \frac{1}{3} = \frac{2}{3}." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 5. OLDAL ── */
  {
    title: '5. Tetszőleges tengely, inerciálissugár és 3D Steiner-tétel',
    body: (
      <>
        <Story>
          A 3D Steiner-tétel ugyanolyan elegáns, mint a 2D-s: ha már ismered egy test tömegközéppontján átmenő tengelyre
          vett tehetetlenségi nyomatékát (<M t="I_{\text{cm}}" />), akkor bármely vele párhuzamos, <M t="d" /> távolságra
          lévő <M t="L" /> tengelyre azonnal <M t="I_L = I_{\text{cm}} + M d^2" />!
        </Story>

        <BoxSpinAxisWidget />

        <Task n={9} q={<>Ellenőrizd a 8. feladat eredményét (<M t="I_z = \frac{2}{3}" /> az <M t="[0,1]^3" /> egységkockára) a 3D Steiner-tétellel!</>}>
          <p>
            A súlypont <M t="(\frac{1}{2}, \frac{1}{2}, \frac{1}{2})" /> távolsága a <M t="z" />-tengelytől
            <M t="d^2 = \frac{1}{4} + \frac{1}{4} = \frac{1}{2}" />. A 7. feladatból <M t="I_{\text{cm}} = \frac{1}{12}(1^2 + 1^2) = \frac{1}{6}" />.
            Steiner-tétellel: <M t="I_z = \frac{1}{6} + 1 \cdot \frac{1}{2} = \frac{4}{6} = \frac{2}{3}" />!
          </p>
        </Task>

        <Task n={10} q={<>Mennyi az <M t="[0, 1]^3" /> egységkocka <M t="R_z" /> inerciálissugara a <M t="z" />-tengelyre?</>}>
          <p>
            Mivel <M t="M = 1" /> és <M t="I_z = \frac{2}{3}" />, az inerciálissugár <M t="R_z = \sqrt{\frac{2}{3}} \approx 0{,}816" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ── 6. OLDAL ── */
  {
    title: '6. A lejtő-verseny: miért nyer mindig a tömör gömb?',
    body: (
      <>
        <Story>
          A mechanika egyik leghíresebb kísérlete: tegyünk egy lejtő tetejére egy <strong>tömör gömböt</strong>, egy
          <strong>tömör hengert</strong> és egy <strong>üreges csövet</strong>, és engedjük el őket egyszerre!
          Nem számít, melyik nagyobb vagy nehezebb — a <strong>tömör gömb MINDIG nyer</strong>, mert neki a legkisebb
          a dimenziótlan <M t="k = \frac{I}{MR^2}" /> alaktényezője!
        </Story>

        <RollingRaceWidget />

        <Quiz
          q={<>Ha a lejtőn lefelé guruló testek energiamegmaradása <M t="mgh = \frac{1}{2}mv^2 + \frac{1}{2}I\omega^2" /> (<M t="\omega = v/R" />), miért gyorsul jobban a kisebb <M t="I/(mR^2)" />-ű test?</>}
          options={[
            { label: 'Mert kisebb a légellenállása' },
            { label: 'Mert kevesebb helyzeti energiát kell forgásra fordítania, így több marad a haladó sebességre!', ok: true },
            { label: 'Mert nagyobb a tömege' },
          ]}
          explain={<>mgh = ½ m v² (1 + k), ahonnan v = √(2gh / (1 + k))! Minél kisebb k = I/(mR²), annál nagyobb a sebesség!</>}
        />

        <Task n={11} q={<>Számítsd ki a tömör henger (<M t="x^2 + y^2 \le R^2, \; 0 \le z \le h" />, homogén) <M t="I_z" /> tehetetlenségi nyomatékát!</>}>
          <p>
            Polárkoordinátákban <M t="M = \delta \pi R^2 h" />:
            <M block t="I_z = \delta \int_0^h \int_0^{2\pi} \int_0^R r^2 \cdot r\,dr\,d\theta\,dz = \delta h \cdot 2\pi \cdot \frac{R^4}{4} = \frac{1}{2}(\delta \pi R^2 h)R^2 = \frac{1}{2}MR^2." />
          </p>
        </Task>

        <Task n={12} q={<>Mennyivel gyorsabb a lejtő alján egy tömör gömb (<M t="k = \frac{2}{5}" />), mint egy üreges cső (<M t="k = 1" />)?</>}>
          <p>
            <M block t="\frac{v_{\text{gömb}}}{v_{\text{cső}}} = \sqrt{\frac{1 + 1}{1 + 2/5}} = \sqrt{\frac{10}{7}} \approx 1{,}195 \quad (\text{közel }20\%\text{-kal gyorsabb!})." />
          </p>
        </Task>
      </>
    ),
  },

  /* ── 7. OLDAL ── */
  {
    title: '7. Fizikai kitekintés: bolygók belső szerkezete és töltéseloszlás',
    body: (
      <>
        <Story>
          Honnan tudják a geofizikusok és csillagászok anélkül, hogy lefúrnának 6000 km mélyre, hogy a Földnek
          sűrű vasmagja van? Pontosan a <strong>tehetetlenségi nyomaték</strong> hármas integráljából! Egy homogén
          gömbre <M t="\frac{I}{MR^2} = 0{,}400" />, a Föld műholdakkal mért értéke viszont csak <M t="0{,}331" /> —
          vagyis a tömeg erősen a középpont felé koncentrálódik!
        </Story>

        <PlanetaryCoreDensityWidget />

        <Task n={13} q={<>Egy <M t="[0, 1]^3" /> kockában az elektromos térfogati töltéssűrűség <M t="\rho(x,y,z) = x^2 + y^2 + z^2" /> (<M t="\text{C/m}^3" />). Mennyi a teljes töltés <M t="Q" />?</>}>
          <p>
            <M block t="Q = \iiint_{[0,1]^3} (x^2 + y^2 + z^2)\,dV = \frac{1}{3} + \frac{1}{3} + \frac{1}{3} = 1\text{ C}." />
          </p>
        </Task>

        <Task n={14} q={<>Miért csökken az <M t="I / (MR^2)" /> arány <M t="0{,}4" /> alá, ha egy bolygó magja sűrűbb a kérgénél?</>}>
          <p>
            Mert a középpont közelében lévő tömegelemek távolsága (<M t="r" />) kicsi a forgástengelytől, így <M t="r^2" />-tel
            súlyozva sokkal kevésbé járulnak hozzá az <M t="I = \iiint r^2 \delta\,dV" /> tehetetlenségi nyomatékhoz, mint
            a felszín közeli rétegek!
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
        <Moments3DMasterDiagram />

        <Def title="Puskakártya — 15.5 Tömeg és nyomaték három dimenzióban">
          <ul>
            <li><strong>Tömeg:</strong> <M t="M = \iiint_D \delta(x,y,z)\,dV" />.</li>
            <li><strong>Tömegközéppont:</strong> <M t="\bar{x} = \frac{1}{M}\iiint x\delta\,dV" />, <M t="\bar{y} = \frac{1}{M}\iiint y\delta\,dV" />, <M t="\bar{z} = \frac{1}{M}\iiint z\delta\,dV" />.</li>
            <li><strong>Tehetetlenségi nyomatékok:</strong> <M t="I_x = \iiint (y^2+z^2)\delta\,dV" />, <M t="I_y = \iiint (x^2+z^2)\delta\,dV" />, <M t="I_z = \iiint (x^2+y^2)\delta\,dV" />.</li>
            <li><strong>Steiner & Inerciálissugár:</strong> <M t="I_L = I_{\text{cm}} + Md^2" />, <M t="R_L = \sqrt{I_L / M}" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 klasszikus vizsgabuktató:</strong>
          <ol>
            <li><strong>2D-s <M t="I_x = \iint y^2\delta" /> átemelése 3D-be:</strong> 3D-ben az <M t="x" />-tengelytől való távolság négyzete <strong><M t="y^2 + z^2" /></strong> (NEM csak <M t="y^2" />)!</li>
            <li><strong>Nyomatékindexek felcserélése:</strong> <M t="M_{xy}" />-ban a hiányzó betű (<M t="z" />) szerepel, ezért <M t="\bar{z} = M_{xy}/M" />!</li>
            <li><strong>Szimmetria elfelejtése:</strong> 3D-ben egy szimmetriasík rögtön megspórol egy teljes hármas integrált — de mindig ellenőrizd, hogy <M t="\delta(x,y,z)" /> is szimmetrikus-e!</li>
            <li><strong>Steiner-tétel rossz irányban:</strong> A súlyponti tengelyre vett <M t="I_{\text{cm}}" /> mindig a <em>legkisebb</em>: ha nem a súlypontból indulsz, előbb vonj ki <M t="Md_1^2" />-et, és csak utána adj hozzá <M t="Md_2^2" />-et!</li>
            <li><strong>Kúp vs. háromszög súlypontja:</strong> 2D háromszögnél <M t="h/3" />, de 3D kúpnál és tetraéderben már <strong><M t="h/4" /></strong>!</li>
          </ol>
        </Warn>

        <h3>Könnyebb feladatok (15–17.)</h3>

        <Task n={15} q={<>Számítsd ki az <M t="R = [0, 1] \times [0, 2] \times [0, 2]" /> téglatest tömegét, ha <M t="\delta(x,y,z) = 3x" />!</>}>
          <p>
            <M block t="M = 3\left(\int_0^1 x\,dx\right)\cdot 2 \cdot 2 = 3 \cdot \frac{1}{2} \cdot 4 = 6." />
          </p>
        </Task>

        <Task n={16} q={<>Határozd meg a 15. feladatbeli téglatest tömegközéppontját!</>}>
          <p>
            Szimmetriából <M t="\bar{y} = 1, \; \bar{z} = 1" />. <M t="\bar{x} = \frac{\int_0^1 x^2 dx}{\int_0^1 x dx} = \frac{2}{3}" /> ⇒ <M t="\left(\frac{2}{3}, 1, 1\right)" />.
          </p>
        </Task>

        <Task n={17} q={<>Egy homogén, <M t="M = 24" /> tömegű kocka élhossza <M t="a = 2" />. Mennyi a középpontján átmenő tengelyre vett tehetetlenségi nyomatéka?</>}>
          <p>
            <M block t="I_{\text{cm}} = \frac{M}{12}(a^2 + a^2) = \frac{M a^2}{6} = \frac{24 \cdot 4}{6} = 16." />
          </p>
        </Task>

        <h3>Közepes feladatok (18–20.)</h3>

        <Task n={18} q={<>Számítsd ki az <M t="x, y, z \ge 0, \; x + y + z \le 1" /> tetraéder tömegét, ha <M t="\delta(x,y,z) = 1 + 2z" />!</>}>
          <p>
            A <M t="z" /> magasságú szelet területe <M t="\frac{1}{2}(1-z)^2" />:
            <M block t="M = \int_0^1 (1 + 2z)\cdot\frac{1}{2}(1-z)^2\,dz = \frac{1}{2}\left(\frac{1}{3} + 2\cdot\frac{1}{12}\right) = \frac{1}{4}." />
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="[0, 1] \times [0, 2] \times [0, 3]" /> homogén (<M t="\delta = 1" />) téglatest <M t="I_x" /> tehetetlenségi nyomatékát!</>}>
          <p>
            <M block t="I_x = \int_0^1 \int_0^2 \int_0^3 (y^2 + z^2)\,dz\,dy\,dx = 1\cdot\left(\frac{8}{3}\cdot 3 + 2\cdot\frac{27}{3}\right) = 8 + 18 = 26." />
          </p>
        </Task>

        <Task n={20} q={<>Egy <M t="R = 2" /> sugarú, <M t="h = 5" /> magasságú homogén tömör henger tömege <M t="M = 10" />. Mennyi a tehetetlenségi nyomatéka a palástján futó alkotóegyenesre (Steiner-tétellel)?</>}>
          <p>
            Középponti tengelyre <M t="I_{\text{cm}} = \frac{1}{2}MR^2 = \frac{1}{2}\cdot 10 \cdot 4 = 20" />.
            Az alkotó <M t="d = R = 2" /> távolságra van ⇒ <M t="I_L = \frac{1}{2}MR^2 + MR^2 = \frac{3}{2}MR^2 = 60" />!
          </p>
        </Task>

        <h3>Haladó feladatok (21–23.)</h3>

        <Task n={21} q={<>Határozd meg a <M t="z = 0" />, <M t="x^2 + y^2 \le 1" /> és <M t="z = 1 - \sqrt{x^2+y^2}" /> homogén kúp (<M t="h = 1, R = 1" />) súlypontját!</>}>
          <p>
            Adott <M t="z \in [0, 1]" /> magasságban a körlap sugara <M t="1 - z" />, területe <M t="\pi(1-z)^2" />.
            <M t="V = \int_0^1 \pi(1-z)^2\,dz = \frac{\pi}{3}" />,
            <M t="M_{xy} = \int_0^1 \pi z(1-z)^2\,dz = \pi\left(\frac{1}{2} - \frac{2}{3} + \frac{1}{4}\right) = \frac{\pi}{12}" />.
            Így <M t="\bar{z} = \frac{\pi/12}{\pi/3} = \frac{1}{4}" /> (és szimmetriából <M t="\bar{x} = \bar{y} = 0" />)!
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="x, y, z \ge 0, \; x + y + z \le 1" /> homogén (<M t="\delta = 1" />) tetraéder <M t="I_z" /> tehetetlenségi nyomatékát!</>}>
          <p>
            Szimmetriából <M t="\iiint x^2\,dV = \iiint y^2\,dV = \iiint z^2\,dV" />! Elég <M t="\iiint z^2\,dV" />-t kiszámolni:
            <M block t="\int_0^1 z^2 \cdot \frac{1}{2}(1-z)^2\,dz = \frac{1}{2}\left(\frac{1}{3} - \frac{2}{4} + \frac{1}{5}\right) = \frac{1}{60}." />
            Így <M t="I_z = \iiint (x^2 + y^2)\,dV = \frac{1}{60} + \frac{1}{60} = \frac{1}{30}" />!
          </p>
        </Task>

        <Task n={23} q={<>Igazold, hogy egy tetszőleges 3D testre a három koordinátatengelyre vett tehetetlenségi nyomaték összege: <M t="I_x + I_y + I_z = 2\iiint_D (x^2 + y^2 + z^2)\,\delta\,dV" />, és ebből olvasd le egy homogén gömb <M t="I_z" /> értékét!</>}>
          <p>
            Összeadva: <M t="(y^2+z^2) + (x^2+z^2) + (x^2+y^2) = 2(x^2+y^2+z^2) = 2\rho^2" />.
            Homogén gömbnél (<M t="\rho \le R" />) szimmetriából <M t="I_x = I_y = I_z" />, tehát:
            <M block t="3 I_z = 2\delta \int_0^R \rho^2 \cdot (4\pi\rho^2)\,d\rho = \frac{8\pi\delta R^5}{5} \implies I_z = \frac{8\pi\delta R^5}{15} = \frac{2}{5}\left(\frac{4}{3}\pi R^3\delta\right)R^2 = \frac{2}{5}MR^2!" />
            (Zseniális 2 soros levezetés gömbi koordináták nélkül is!)
          </p>
        </Task>
      </>
    ),
  },
];
