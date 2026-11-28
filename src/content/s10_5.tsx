import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  BasicPolarGraphsWidget,
  MultiplePolarNamesWidget,
  PolarCartesianBridgeWidget,
  PolarCircleConverterWidget,
  PolarLineConverterWidget,
  PolarPointExplorerWidget,
  PolarRegionsWidget,
  PolarSummaryDiagram,
} from '../components/Widgets105';
import type { Page } from './s1_1';

export const S10_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Pólus, polártengely és az (r; θ) polárkoordináták',
    body: (
      <>
        <Story>
          <p>
            A derékszögű (Descartes-) koordináta-rendszer olyan, mint egy sakktábla: „menj 3-at jobbra, 4-et fel”. A
            radar, a hajózás, a robotkarok és a csillagászat viszont természetesebben gondolkodik <strong>távolságban és
            irányban</strong>: „fordulj 53°-ot, és menj 5 kilométert előre”. Pontosan erre szolgál a{' '}
            <strong>polárkoordináta-rendszer</strong>!
          </p>
        </Story>

        <Def title="Polárkoordináták definíciója">
          <p>
            Rögzítünk a síkon egy <M t="O" /> kezdőpontot (<strong>pólus</strong>) és egy belőle induló félegyenest (
            <strong>polártengely</strong>). Minden <M t="P" /> ponthoz hozzárendelünk egy <M t="(r;\,\theta)" />{' '}
            számpárt:
          </p>
          <ul>
            <li><M t="\theta" /> (<strong>irányszög</strong>): a polártengelytől mért irányított szög (óramutatóval ellentétesen pozitív, azonos irányban negatív);</li>
            <li><M t="r" /> (<strong>irányított sugár</strong>): a <M t="P" /> pont irányított távolsága a pólustól. Ha <M t="r > 0" />, a <M t="\theta" /> félegyenesen haladunk előre; ha <M t="r < 0" />, az ellenkező (<M t="\theta + \pi" />) irányba lépünk <M t="|r|" /> távolságot!</li>
          </ul>
        </Def>

        <PolarPointExplorerWidget />

        <Quiz
          q={<>Melyik síknegyedben fekszik a <M t="P\left(-2;\,\tfrac{\pi}{3}\right)" /> polárkoordinátájú pont?</>}
          options={[
            { label: 'I. síknegyed' },
            { label: 'II. síknegyed' },
            { label: 'III. síknegyed', ok: true },
            { label: 'IV. síknegyed' },
          ]}
          explain={
            <>
              A <M t="\theta = \tfrac{\pi}{3} = 60^\circ" /> irány az I. negyedbe mutat, de mivel <M t="r = -2 < 0" />,
              a póluson át az ellenkező (<M t="240^\circ" />) irányba lépünk 2 egységet — ez a <strong>III. síknegyed</strong>!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Melyik pontot adja meg a <M t="\left(0;\,\tfrac{5\pi}{7}\right)" /> koordinátapár?</>}>
          <p>
            Mivel <M t="r = 0" />, a pont bármilyen <M t="\theta" /> szög esetén maga a <strong>pólus</strong> (az
            origó)!
          </p>
        </Task>
        <Task n={2} q={<>Azonos pontot jelöl-e a <M t="\left(4;\,\tfrac{\pi}{4}\right)" /> és a <M t="\left(-4;\,-\tfrac{3\pi}{4}\right)" />?</>}>
          <p>
            <strong>Igen!</strong> A <M t="-\tfrac{3\pi}{4}" /> (<M t="-135^\circ" />) irány a III. negyedbe mutat; ezen
            visszafelé (<M t="r = -4" />) haladva pontosan az I. negyedbeli <M t="45^\circ" />-os félegyenesen, 4
            egységre a pólustól kötünk ki.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Egy pont végtelen sok polárkoordinátája',
    body: (
      <>
        <p>
          A Descartes-rendszerben minden pontnak pontosan egy <M t="(x;\,y)" /> címe van. A polárrendszerben viszont{' '}
          <strong>minden pontnak végtelen sok</strong> <M t="(r;\,\theta)" /> koordinátapárja létezik — két okból is:
        </p>
        <ol>
          <li>A szöghez bármely <M t="2k\pi" /> (<M t="k \in \mathbb{Z}" />) egész fordulatot hozzáadhatunk.</li>
          <li>Megfordíthatjuk <M t="r" /> előjelét, ha közben a szöget eltoljuk egy félfordulattal (<M t="\pi" />-vel).</li>
        </ol>

        <Def title="Egy P(r; θ) pont összes polárkoordinátája">
          <p>
            Ha <M t="r \neq 0" />, akkor a <M t="P(r;\,\theta)" /> pont pontosan az alábbi két családdal adható meg (
            <M t="n \in \mathbb{Z}" />):
          </p>
          <M block t="(r;\,\theta + 2n\pi) \qquad \text{és} \qquad \big(-r;\,\theta + (2n+1)\pi\big)." />
          <p>
            A pólus minden <M t="(0;\,\theta)" /> alakú párral megadható (<M t="\theta \in \mathbb{R}" />).
          </p>
        </Def>

        <MultiplePolarNamesWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Add meg a <M t="P\left(5;\,\tfrac{2\pi}{3}\right)" /> pont négy különböző polárkoordináta-párját úgy, hogy kettőnél <M t="r > 0" />, kettőnél <M t="r < 0" />, és <M t="-2\pi \le \theta \le 2\pi" />!</>}>
          <ul>
            <li><M t="r = 5" />: <M t="\left(5;\,\tfrac{2\pi}{3}\right)" /> és <M t="\left(5;\,-\tfrac{4\pi}{3}\right)" />.</li>
            <li><M t="r = -5" />: <M t="\left(-5;\,\tfrac{5\pi}{3}\right)" /> és <M t="\left(-5;\,-\tfrac{\pi}{3}\right)" />.</li>
          </ul>
        </Task>
        <Task n={4} q={<>Melyik pontnak <em>nem</em> egyedi még a <M t="0 \le \theta < 2\pi,\ r \ge 0" /> megkötéssel sem a polárkoordinátája?</>}>
          <p>
            Kizárólag a <strong>pólusnak</strong> (<M t="r = 0" />), mert hozzá továbbra is bármely{' '}
            <M t="\theta \in [0;\,2\pi)" /> szög megadható. Minden más pont <M t="r > 0,\ \theta \in [0;\,2\pi)" />{' '}
            mellett már egyértelmű!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Alapvető poláregyenletek és tartományok',
    body: (
      <>
        <p>
          Ahogy a Descartes-rendszerben az <M t="x = c" /> és <M t="y = d" /> egyenletek a rács egyeneseit adják, a
          polárrendszerben a legegyszerűbb egyenletek a <strong>körök</strong> és a <strong>póluson átmenő egyenesek</strong>:
        </p>
        <ul>
          <li><M t="r = a" /> (<M t="a \neq 0" />): origó középpontú, <M t="|a|" /> sugarú <strong>kör</strong>.</li>
          <li><M t="\theta = \theta_0" />: a póluson átmenő, a polártengellyel <M t="\theta_0" /> szöget bezáró teljes <strong>egyenes</strong> (mivel <M t="r" /> negatív is lehet!).</li>
        </ul>

        <BasicPolarGraphsWidget />

        <p>
          Ezeket egyenlőtlenségekkel kombinálva körgyűrűket, körcikkeket és félegyeneseket tudunk egyetlen sorban leírni
          — ez a kettős integráloknál (III. kötet, 15. fejezet) hatalmas előny lesz!
        </p>

        <PolarRegionsWidget />

        <Quiz
          q={<>Melyik tartományt írja le a <M t="2 \le r \le 4,\ 0 \le \theta \le \pi" /> poláris egyenlőtlenségrendszer?</>}
          options={[
            { label: 'Teljes körgyűrű 2 és 4 sugár között' },
            { label: 'Felső félkörgyűrű 2 és 4 sugár között (y ≥ 0)', ok: true },
            { label: 'Félkörlap 4 sugárral' },
            { label: 'Jobb oldali félkörgyűrű (x ≥ 0)' },
          ]}
          explain={
            <>
              A <M t="2 \le r \le 4" /> feltétel a 2 és 4 közötti körgyűrűt adja, a <M t="0 \le \theta \le \pi" /> pedig
              a felső félsíkra (<M t="y \ge 0" />) korlátozza.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Írd le poláregyenlőtlenségekkel az <M t="x^2 + y^2 \le 9" /> körlap első síknegyedbe eső részét!</>}>
          <p>
            <M t="0 \le r \le 3" /> és <M t="0 \le \theta \le \dfrac{\pi}{2}" />.
          </p>
        </Task>
        <Task n={6} q={<>Mi a különbség a <M t="\theta = \tfrac{\pi}{6},\ r \ge 0" /> és a <M t="\theta = \tfrac{\pi}{6}" /> (megkötés nélkül) halmaz között?</>}>
          <p>
            Az első csak a pólusból kiinduló, <M t="30^\circ" />-os <strong>félegyenes</strong> az I. negyedben; a
            második az <M t="r < 0" /> pontokkal kiegészített teljes <strong>egyenes</strong> (I. és III. negyed)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Átváltás polár- és Descartes-koordináták között',
    body: (
      <>
        <p>
          Ha a pólust az origóba, a polártengelyt pedig a pozitív <M t="x" />-tengelyre helyezzük, a két rendszer
          közötti kapcsolat egyetlen derékszögű háromszögből leolvasható:
        </p>

        <Def title="Kapcsolat a polár- és Descartes-koordináták között">
          <M block t="\text{Polár} \to \text{Descartes:}\quad x = r\cos\theta,\qquad y = r\sin\theta." />
          <M block t="\text{Descartes} \to \text{Polár:}\quad r^2 = x^2 + y^2,\qquad \tan\theta = \frac{y}{x}\ \ (x \neq 0)." />
        </Def>

        <PolarCartesianBridgeWidget />

        <p>
          <strong>Fontos szabály <M t="\theta" /> meghatározásakor:</strong> a <M t="\tan\theta = y/x" /> egyenletnek
          két különböző megoldása van <M t="[0;\,2\pi)" />-ben (egy a jobb, egy a bal félsíkban)! Mindig nézd meg,{' '}
          <em>melyik síknegyedben</em> fekszik <M t="(x;\,y)" />:
        </p>
        <ul>
          <li>Ha <M t="x > 0" />: <M t="\theta = \arctan(y/x)" /> jó (az I. vagy IV. negyedbe mutat).</li>
          <li>Ha <M t="x < 0" />: <M t="\theta = \arctan(y/x) + \pi" /> kell (II. vagy III. negyed)!</li>
          <li>Ha <M t="x = 0" />: <M t="y > 0 \Rightarrow \theta = \tfrac{\pi}{2}" />, <M t="y < 0 \Rightarrow \theta = \tfrac{3\pi}{2}" />.</li>
        </ul>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Váltsd át Descartes-koordinátákra a <M t="\left(6;\,\tfrac{5\pi}{6}\right)" /> és a <M t="\left(-4;\,\tfrac{\pi}{3}\right)" /> pontokat!</>}>
          <ul>
            <li>
              <M t="\left(6;\,\tfrac{5\pi}{6}\right)" />: <M t="x = 6\left(-\tfrac{\sqrt{3}}{2}\right) = -3\sqrt{3}" />,{' '}
              <M t="y = 6\cdot\tfrac{1}{2} = 3" /> <M t="\Rightarrow (-3\sqrt{3};\,3)" />.
            </li>
            <li>
              <M t="\left(-4;\,\tfrac{\pi}{3}\right)" />: <M t="x = -4\cdot\tfrac{1}{2} = -2" />,{' '}
              <M t="y = -4\cdot\tfrac{\sqrt{3}}{2} = -2\sqrt{3}" /> <M t="\Rightarrow (-2;\,-2\sqrt{3})" />.
            </li>
          </ul>
        </Task>
        <Task n={8} q={<>Add meg a Descartes-féle <M t="(-2;\,-2)" /> pont polárkoordinátáit <M t="r > 0,\ 0 \le \theta < 2\pi" /> feltétellel!</>}>
          <p>
            <M t="r = \sqrt{(-2)^2 + (-2)^2} = 2\sqrt{2}" />. Mivel a pont a III. negyedben van (<M t="x < 0" />), és{' '}
            <M t="\tan\theta = 1" />, ezért <M t="\theta = \tfrac{\pi}{4} + \pi = \tfrac{5\pi}{4}" />. Tehát{' '}
            <M t="\left(2\sqrt{2};\,\tfrac{5\pi}{4}\right)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Descartes-egyenletből poláregyenlet',
    body: (
      <>
        <p>
          Egy <M t="(x;\,y)" />-egyenletet egyszerűen úgy írunk át poláralakba, hogy behelyettesítjük{' '}
          <M t="x = r\cos\theta" />, <M t="y = r\sin\theta" /> és <M t="x^2 + y^2 = r^2" />, majd egyszerűsítünk.
        </p>

        <h3>1. példa — Origón átmenő kör</h3>
        <p>Írjuk fel polárkoordinátákkal az <M t="x^2 + (y - 3)^2 = 9" /> kört!</p>
        <M block t="x^2 + y^2 - 6y + 9 = 9 \ \Longrightarrow\ x^2 + y^2 = 6y \ \Longrightarrow\ r^2 = 6r\sin\theta \ \Longrightarrow\ r(r - 6\sin\theta) = 0." />
        <p>
          Mivel az <M t="r = 6\sin\theta" /> egyenlet <M t="\theta = 0" />-nál maga is tartalmazza az <M t="r = 0" />{' '}
          pólust, az egész kör egyenlete röviden: <M t="r = 6\sin\theta" />!
        </p>

        <PolarCircleConverterWidget />

        <h3>2. példa — Egyenlő szárú hiperbola</h3>
        <p>Írjuk fel polárkoordinátákkal az <M t="x^2 - y^2 = 1" /> hiperbolát!</p>
        <M block t="r^2\cos^2\theta - r^2\sin^2\theta = 1 \ \Longrightarrow\ r^2\cos(2\theta) = 1." />

        <Quiz
          q={<>Melyik poláregyenlet felel meg az <M t="(x - 2)^2 + y^2 = 4" /> körnek?</>}
          options={[
            { label: <M t="r = 2\cos\theta" /> },
            { label: <M t="r = 4\cos\theta" />, ok: true },
            { label: <M t="r = 4\sin\theta" /> },
            { label: <M t="r = 2" /> },
          ]}
          explain={
            <>
              Kifejtve <M t="x^2 - 4x + 4 + y^2 = 4 \Rightarrow x^2 + y^2 = 4x \Rightarrow r^2 = 4r\cos\theta" />,
              innen <M t="r = 4\cos\theta" /> (ez <M t="\theta = \tfrac{\pi}{2}" />-nél az <M t="r = 0" /> pólust is
              tartalmazza).
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Írd át poláralakba az <M t="y = 5" /> vízszintes egyenest és az <M t="xy = 2" /> hiperbolát!</>}>
          <ul>
            <li><M t="y = 5 \Longrightarrow r\sin\theta = 5" /> (azaz <M t="r = \dfrac{5}{\sin\theta}" />).</li>
            <li><M t="xy = 2 \Longrightarrow r^2\cos\theta\sin\theta = 2 \Longrightarrow r^2\sin(2\theta) = 4" />.</li>
          </ul>
        </Task>
        <Task n={10} q={<>Írd át poláralakba az <M t="x^2 + y^2 + 4x - 2y = 0" /> kört!</>}>
          <p>
            <M t="r^2 + 4r\cos\theta - 2r\sin\theta = 0 \Longrightarrow r = -4\cos\theta + 2\sin\theta" /> (a pólus{' '}
            <M t="\tan\theta = 2" />-nél benne van).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Poláregyenletből Descartes-egyenlet',
    body: (
      <>
        <p>
          Visszafelé a célunk az, hogy mindenhol az <M t="r\cos\theta" />, <M t="r\sin\theta" /> vagy <M t="r^2" />{' '}
          blokkokat hozzuk elő — sokszor egyetlen <strong><M t="r" />-rel való szorzás</strong> vagy{' '}
          <strong>nevezővel való átszorzás</strong> azonnal megoldja a feladatot!
        </p>

        <Steps
          title="Poláregyenlet átírása és azonosítása"
          problem={
            <>
              Alakítsuk át Descartes-egyenletté az <M t="r = 4\cos\theta - 2\sin\theta" /> poláregyenletet, és
              azonosítsuk a görbét!
            </>
          }
          steps={[
            {
              title: 'Szorzás r-rel',
              body: (
                <>
                  Mindkét oldalt szorozzuk <M t="r" />-rel, hogy megjelenjenek az <M t="r^2,\,r\cos\theta,\,r\sin\theta" />{' '}
                  kifejezések:
                  <M block t="r^2 = 4r\cos\theta - 2r\sin\theta." />
                  (Ellenőrzés: az eredeti egyenlet is tartalmazza az <M t="r = 0" /> pólust, amikor{' '}
                  <M t="\tan\theta = 2" />, tehát az <M t="r" />-rel szorzás nem hozott be idegen pontot!)
                </>
              ),
            },
            {
              title: 'Behelyettesítés x-szel és y-nal',
              body: (
                <>
                  <M block t="x^2 + y^2 = 4x - 2y \ \Longrightarrow\ x^2 - 4x + y^2 + 2y = 0." />
                </>
              ),
            },
            {
              title: 'Teljes négyzetté kiegészítés',
              body: (
                <>
                  <M block t="(x - 2)^2 - 4 + (y + 1)^2 - 1 = 0 \ \Longrightarrow\ (x - 2)^2 + (y + 1)^2 = 5." />
                  A görbe egy <M t="(2;\,-1)" /> középpontú, <M t="\sqrt{5}" /> sugarú, origón átmenő <strong>kör</strong>!
                </>
              ),
            },
          ]}
        />

        <PolarLineConverterWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Alakítsd át Descartes-alakra az <M t="r = \dfrac{6}{2\cos\theta + \sin\theta}" /> egyenletet!</>}>
          <p>
            Átszorozva a nevezővel: <M t="2r\cos\theta + r\sin\theta = 6 \Longrightarrow 2x + y = 6" />, vagyis{' '}
            <M t="y = -2x + 6" /> — egy <M t="-2" /> meredekségű egyenes!
          </p>
        </Task>
        <Task n={12} q={<>Milyen görbét ír le az <M t="r = \dfrac{2}{1 - \cos\theta}" /> poláregyenlet?</>}>
          <p>
            Átszorozva: <M t="r - r\cos\theta = 2 \Rightarrow r = x + 2" />. Négyzetre emelve:{' '}
            <M t="x^2 + y^2 = (x + 2)^2 = x^2 + 4x + 4 \Longrightarrow y^2 = 4(x + 1)" /> — ez egy jobbra nyíló{' '}
            <strong>parabola</strong>! (A 10.8-as szakaszban látni fogjuk, hogy minden kúpszeletnek ilyen szép a
            poláregyenlete.)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló és tipikus hibák',
    body: (
      <>
        <PolarSummaryDiagram />

        <h3>Összefoglaló képlettáblázat</h3>
        <table className="tbl">
          <thead>
            <tr><th>Kapcsolat / Görbe</th><th>Képlet</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Polár → Descartes</strong></td>
              <td><M t="x = r\cos\theta,\quad y = r\sin\theta" /></td>
            </tr>
            <tr>
              <td><strong>Descartes → Polár</strong></td>
              <td><M t="r^2 = x^2 + y^2,\quad \tan\theta = \tfrac{y}{x}" /> (síknegyed ellenőrzéssel!)</td>
            </tr>
            <tr>
              <td><strong>Egy pont összes neve</strong></td>
              <td><M t="(r;\,\theta + 2n\pi)" /> és <M t="(-r;\,\theta + (2n+1)\pi)" /></td>
            </tr>
            <tr>
              <td><strong>Körök</strong></td>
              <td><M t="r = a" /> (origó körüli), <M t="r = 2a\cos\theta" /> és <M t="r = 2b\sin\theta" /> (origón átmenő)</td>
            </tr>
            <tr>
              <td><strong>Egyenesek</strong></td>
              <td><M t="\theta = \theta_0" /> (origón át), <M t="r\cos(\theta-\alpha) = d" /> (általános)</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. Az <M t="\arctan(y/x)" /> síknegyed-csapdája:</strong> a <M t="(-1;\,-1)" /> pontnál{' '}
          <M t="y/x = 1" />, de <M t="\theta" /> <em>nem</em> <M t="\tfrac{\pi}{4}" />, hanem{' '}
          <M t="\tfrac{5\pi}{4}" /> (vagy <M t="-\tfrac{3\pi}{4}" />)! Mindig ellenőrizd <M t="x" /> és <M t="y" />{' '}
          előjelét!
        </Warn>
        <Warn>
          <strong>2. Az <M t="r = 2a\cos\theta" /> kör kétszeri bejárása:</strong> ez a kör már{' '}
          <M t="0 \le \theta \le \pi" /> alatt <em>teljesen</em> bezárul! A <M t="[0;\,2\pi]" /> tartományon kétszer
          járja körbe (a <M t="(\pi/2;\,3\pi/2)" /> szakaszon <M t="r < 0" /> miatt). Területszámításnál ez kritikus
          lesz a 10.7-ben!
        </Warn>
        <Warn>
          <strong>3. Negatív <M t="r" /> elfelejtése <M t="\theta = \theta_0" /> egyenesnél:</strong> a{' '}
          <M t="\theta = \tfrac{\pi}{4}" /> egyenlet nem félegyenes, hanem a teljes <M t="y = x" /> egyenes. Ha csak a
          félegyenest akarod, külön ki kell írni, hogy <M t="r \ge 0" />.
        </Warn>
        <Warn>
          <strong>4. Idegen pólus vagy négyzetre emelés:</strong> amikor <M t="r = f(\theta)" />-t négyzetre emelsz (pl.{' '}
          <M t="r = 3 \to r^2 = 9" />), mindig ellenőrizd, nem hoztál-e be extra pontokat (pl. <M t="r = -3" /> itt
          ugyanazt a kört adja, de <M t="r = 1+\cos\theta" />-nál vigyázni kell!).
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Miért járja körbe kétszer az <M t="r = 2\cos\theta" /> kört a <M t="0 \le \theta \le 2\pi" /> intervallum?</>}>
          <p>
            <M t="\theta \in [0;\,\tfrac{\pi}{2}]" /> a felső félkört, <M t="\theta \in [\tfrac{\pi}{2};\,\pi]" />{' '}
            (negatív <M t="r" />-rel!) az alsó félkört rajzolja meg — tehát <M t="\theta = \pi" />-re már teljes a kör.
            A <M t="[\pi;\,2\pi]" /> szakaszon pontosan újra végigmegy rajta!
          </p>
        </Task>
        <Task n={14} q={<>Igaz-e, hogy a <M t="(2;\,\pi)" /> és a <M t="(-2;\,0)" /> polárpontok ugyanazon a Descartes-ponton vannak?</>}>
          <p>
            <strong>Igen!</strong> Mindkettő a Descartes-féle <M t="(-2;\,0)" /> pont.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <h3>Könnyű</h3>

        <Task n={15} q={<>Váltsd át Descartes-koordinátákra: (a) <M t="\left(4;\,\tfrac{\pi}{3}\right)" />, (b) <M t="\left(3;\,-\tfrac{\pi}{2}\right)" />, (c) <M t="\left(-2;\,\tfrac{3\pi}{4}\right)" />!</>}>
          <ul>
            <li>(a) <M t="(4\cdot\tfrac{1}{2};\,4\cdot\tfrac{\sqrt{3}}{2}) = (2;\,2\sqrt{3})" />.</li>
            <li>(b) <M t="(0;\,-3)" />.</li>
            <li>(c) <M t="\big(-2(-\tfrac{\sqrt{2}}{2});\,-2(\tfrac{\sqrt{2}}{2})\big) = (\sqrt{2};\,-\sqrt{2})" />.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Add meg a Descartes-féle <M t="(-3;\,\sqrt{3})" /> pont polárkoordinátáit <M t="r > 0,\ 0 \le \theta < 2\pi" /> mellett!</>}>
          <p>
            <M t="r = \sqrt{9 + 3} = \sqrt{12} = 2\sqrt{3}" />. Mivel a pont a II. negyedben van (<M t="x < 0, y > 0" />)
            és <M t="\tan\theta = -\tfrac{\sqrt{3}}{3} = -\tfrac{1}{\sqrt{3}}" />, ezért{' '}
            <M t="\theta = \pi - \tfrac{\pi}{6} = \tfrac{5\pi}{6}" />. Megoldás:{' '}
            <M t="\left(2\sqrt{3};\,\tfrac{5\pi}{6}\right)" />.
          </p>
        </Task>

        <Task n={17} q={<>Azonosítsd a görbét: (a) <M t="r\cos\theta = -5" />, (b) <M t="r = -8\sin\theta" />!</>}>
          <ul>
            <li>(a) <M t="x = -5" /> függőleges egyenes.</li>
            <li>(b) <M t="r^2 = -8r\sin\theta \Rightarrow x^2 + y^2 + 8y = 0 \Rightarrow x^2 + (y+4)^2 = 16" />, <M t="(0;\,-4)" /> középpontú, 4 sugarú kör.</li>
          </ul>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Alakítsd át Descartes-egyenletté és vázold fejben: <M t="r = \dfrac{10}{3\cos\theta - 4\sin\theta}" />! Mekkora a távolsága az origótól?</>}>
          <p>
            <M t="3r\cos\theta - 4r\sin\theta = 10 \Longrightarrow 3x - 4y = 10" /> (egyenes). Távolsága az origótól:{' '}
            <M t="d = \dfrac{|10|}{\sqrt{3^2 + (-4)^2}} = \dfrac{10}{5} = 2" />!
          </p>
        </Task>

        <Task n={19} q={<>Írd át poláralakba az <M t="y^2 = 4x" /> parabolát, és fejezd ki belőle <M t="r" />-et (ha <M t="\sin\theta \neq 0" />)!</>}>
          <p>
            <M t="r^2\sin^2\theta = 4r\cos\theta \Longrightarrow r = \dfrac{4\cos\theta}{\sin^2\theta} = 4\cot\theta\csc\theta" />{' '}
            (a <M t="\theta = \tfrac{\pi}{2}" /> helyen <M t="r = 0" />, tehát az origó is rajta van).
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg a <M t="P_1\left(3;\,\tfrac{\pi}{6}\right)" /> és <M t="P_2\left(4;\,\tfrac{\pi}{2}\right)" /> polárpontok távolságát a koszinusztétellel!</>}>
          <p>
            A két sugár bezárt szöge <M t="\Delta\theta = \tfrac{\pi}{2} - \tfrac{\pi}{6} = \tfrac{\pi}{3}" />. A
            poláris távolságképlettel:
            <M block t="d = \sqrt{r_1^2 + r_2^2 - 2r_1 r_2\cos(\theta_2 - \theta_1)} = \sqrt{9 + 16 - 2\cdot 3\cdot 4\cdot\tfrac{1}{2}} = \sqrt{13}." />
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Alakítsd át Descartes-egyenletté az <M t="r = 2\cos\theta + 2\sqrt{3}\,\sin\theta" /> görbét, és add meg a
              középpontjának <em>polárkoordinátáit</em>!
            </>
          }
        >
          <p>
            <M t="r" />-rel szorozva <M t="x^2 + y^2 = 2x + 2\sqrt{3}\,y \Longrightarrow (x-1)^2 + (y-\sqrt{3})^2 = 4" />.
            Ez egy 2 sugarú kör, amelynek Descartes-középpontja <M t="(1;\,\sqrt{3})" />. Ennek polárkoordinátái:{' '}
            <M t="r_0 = \sqrt{1 + 3} = 2" />, <M t="\theta_0 = \tfrac{\pi}{3}" />, azaz <M t="\left(2;\,\tfrac{\pi}{3}\right)" />!
            (És valóban: a görbe <M t="r = 4\cos\left(\theta - \tfrac{\pi}{3}\right)" /> alakban is írható!)
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Mutasd meg, hogy az <M t="r = 2a\cos\theta" /> és az <M t="r = 2b\sin\theta" /> körök (<M t="a, b > 0" />)
              mindig <strong>merőlegesen</strong> metszik egymást mindkét metszéspontjukban!
            </>
          }
        >
          <p>
            Az első kör középpontja <M t="C_1(a;\,0)" />, sugara <M t="a" />; a második középpontja{' '}
            <M t="C_2(0;\,b)" />, sugara <M t="b" />. A középpontok távolságának négyzete:
            <M block t="C_1C_2^2 = a^2 + b^2 = R_1^2 + R_2^2." />
            A Pitagorasz-tétel megfordítása miatt a két kör sugarai minden metszéspontban derékszöget zárnak be — így
            az érintőik is merőlegesek egymásra!
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Azonosítsd az <M t="r^2\cos(2\theta) + 2r\cos\theta = 0" /> poláregyenletet, és vizsgáld meg, mi történik,
              ha elosztjuk <M t="r" />-rel!
            </>
          }
        >
          <p>
            <M t="r = 0" /> (a pólus) megoldás, de már a második tényezőben is benne van (<M t="\theta = \tfrac{\pi}{2}" />-nél).
            Az <M t="r\cos(2\theta) + 2\cos\theta = 0" /> egyenletet <M t="r" />-rel szorozva és{' '}
            <M t="\cos(2\theta) = \cos^2\theta - \sin^2\theta" />-t írva:
            <M block t="r^2(\cos^2\theta - \sin^2\theta) + 2r\cos\theta = 0 \ \Longrightarrow\ x^2 - y^2 + 2x = 0 \ \Longrightarrow\ (x+1)^2 - y^2 = 1." />
            Ez egy <M t="(-1;\,0)" /> középpontú, origón átmenő egyenlő szárú <strong>hiperbola</strong>!
          </p>
        </Task>
      </>
    ),
  },
];
