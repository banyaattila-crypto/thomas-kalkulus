import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CrossProduct3DWidget,
  CrossZeroTestsDiagram,
  DeterminantCrossWidget,
  DotVsCrossDiagram,
  IjkCycleDiagram,
  ParallelepipedVolumeWidget,
  ParallelogramAreaWidget,
  TorqueWrenchWidget,
} from '../components/Widgets124';
import type { Page } from './s1_1';

export const S12_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A vektoriális szorzat és a jobbkéz-szabály',
    body: (
      <>
        <Story>
          <p>
            A háromdimenziós térben gyakran van szükségünk egy olyan vektorra, amely egyszerre <strong>merőleges két
            adott vektorra</strong> (például egy sík normálvektorára, egy csavar forgástengelyére vagy egy mágneses
            erő irányára). Erre született a <strong>vektoriális szorzat</strong> (<M t="\mathbf{u}\times\mathbf{v}" />),
            amely két 3D vektorból egy <em>harmadik 3D vektort</em> készít!
          </p>
        </Story>

        <Def title="Vektoriális szorzat (keresztszorzat)">
          <p>
            Az <M t="\mathbf{u}" /> és <M t="\mathbf{v}" /> térbeli vektorok <strong>vektoriális szorzata</strong>:
            <M block t="\mathbf{u} \times \mathbf{v} = \big(|\mathbf{u}|\,|\mathbf{v}|\sin\theta\big)\mathbf{n}," />
            ahol <M t="\theta \in [0, \pi]" /> a hajlásszögük, és <M t="\mathbf{n}" /> az az egységvektor, amely
            merőleges <M t="\mathbf{u}" />-ra és <M t="\mathbf{v}" />-re is, irányát pedig a{' '}
            <strong>jobbkéz-szabály</strong> adja meg (<M t="\mathbf{u}" />-tól <M t="\mathbf{v}" /> felé hajlítva
            jobb kezed ujjait, a hüvelykujjad mutatja <M t="\mathbf{n}" /> irányát).
          </p>
        </Def>

        <CrossProduct3DWidget />

        <Task n={1} q={<>Ha <M t="|\mathbf{u}| = 4" />, <M t="|\mathbf{v}| = 5" /> és hajlásszögük <M t="30^\circ" />, mekkora <M t="|\mathbf{u}\times\mathbf{v}|" />?</>}>
          <p>
            <M t="|\mathbf{u}\times\mathbf{v}| = 4\cdot 5\cdot \sin 30^\circ = 20 \cdot \frac{1}{2} = 10" />.
          </p>
        </Task>

        <Task n={2} q={<>Mikor lesz két nem nulla vektor vektoriális szorzata a <M t="\mathbf{0}" /> nullvektor?</>}>
          <p>
            Akkor és csak akkor, ha <M t="\sin\theta = 0 \iff \theta = 0^\circ" /> vagy <M t="180^\circ" />, vagyis ha
            a két vektor <strong>párhuzamos</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Algebrai tulajdonságok és az i, j, k körforgás',
    body: (
      <>
        <p>
          A vektoriális szorzatnak van egy nagyon fontos, elsőre szokatlan tulajdonsága: a sorrend felcserélése{' '}
          <strong>előjelet vált</strong>!
        </p>
        <ul>
          <li><strong>Antikommutatív:</strong> <M t="\mathbf{v}\times\mathbf{u} = -(\mathbf{u}\times\mathbf{v})" />.</li>
          <li><strong>Önmagával nulla:</strong> <M t="\mathbf{u}\times\mathbf{u} = \mathbf{0}" />.</li>
          <li><strong>Disztributív:</strong> <M t="\mathbf{u}\times(\mathbf{v}+\mathbf{w}) = \mathbf{u}\times\mathbf{v} + \mathbf{u}\times\mathbf{w}" />.</li>
          <li><strong>Skalár kiemelhető:</strong> <M t="(r\mathbf{u})\times(s\mathbf{v}) = (rs)(\mathbf{u}\times\mathbf{v})" />.</li>
          <li><strong>NEM asszociatív:</strong> általában <M t="(\mathbf{u}\times\mathbf{v})\times\mathbf{w} \ne \mathbf{u}\times(\mathbf{v}\times\mathbf{w})" />!</li>
        </ul>

        <IjkCycleDiagram />

        <Quiz
          q={<>Mennyi az <M t="(\mathbf{i} \times \mathbf{j}) \times \mathbf{j}" /> kifejezés értéke?</>}
          options={[
            { label: <M t="\mathbf{i}" /> },
            { label: <M t="-\mathbf{i}" />, ok: true },
            { label: <M t="\mathbf{0}" /> },
            { label: <M t="\mathbf{k}" /> },
          ]}
          explain={
            <>
              Először <M t="\mathbf{i}\times\mathbf{j} = \mathbf{k}" />, majd <M t="\mathbf{k}\times\mathbf{j} = -\mathbf{i}" />{' '}
              (mert fordított irányban haladunk a körön)! (Viszont <M t="\mathbf{i}\times(\mathbf{j}\times\mathbf{j}) = \mathbf{0}" /> — ez
              rögtön bizonyítja, hogy nem asszociatív!)
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki: (a) <M t="(2\mathbf{i})\times(-3\mathbf{k})" />, (b) <M t="(\mathbf{i} + \mathbf{j})\times\mathbf{j}" />!</>}>
          <p>
            (a) <M t="-6(\mathbf{i}\times\mathbf{k}) = -6(-\mathbf{j}) = 6\mathbf{j}" />. (b){' '}
            <M t="\mathbf{i}\times\mathbf{j} + \mathbf{j}\times\mathbf{j} = \mathbf{k} + \mathbf{0} = \mathbf{k}" />.
          </p>
        </Task>

        <Task n={4} q={<>Egyszerűsítsd: <M t="(\mathbf{u} + \mathbf{v}) \times (\mathbf{u} - \mathbf{v})" />!</>}>
          <p>
            Kibontva: <M t="\mathbf{u}\times\mathbf{u} - \mathbf{u}\times\mathbf{v} + \mathbf{v}\times\mathbf{u} - \mathbf{v}\times\mathbf{v} = -(\mathbf{u}\times\mathbf{v}) - (\mathbf{u}\times\mathbf{v}) = -2(\mathbf{u}\times\mathbf{v})" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A 3×3-as determinánsképlet',
    body: (
      <>
        <p>
          Komponensekkel a vektoriális szorzatot legkönnyebben a <M t="3\times 3" />-as{' '}
          <strong>szimbolikus determinánssal</strong> jegyezhetjük meg és számíthatjuk ki:
        </p>

        <Def title="Vektoriális szorzat determináns-alakja">
          <M block t="\mathbf{u}\times\mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = \begin{vmatrix} u_2 & u_3 \\ v_2 & v_3 \end{vmatrix}\mathbf{i} - \begin{vmatrix} u_1 & u_3 \\ v_1 & v_3 \end{vmatrix}\mathbf{j} + \begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix}\mathbf{k}." />
        </Def>

        <DeterminantCrossWidget />

        <Steps
          title="Vektoriális szorzat kiszámítása és ellenőrzése"
          problem={<>Számítsd ki az <M t="\mathbf{u} = \langle 2, 1, -1 \rangle" /> és <M t="\mathbf{v} = \langle -3, 4, 1 \rangle" /> vektorok vektoriális szorzatát!</>}
          steps={[
            {
              title: 'A 3×3-as determináns felírása',
              body: (
                <p>
                  <M block t="\mathbf{u}\times\mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & 1 & -1 \\ -3 & 4 & 1 \end{vmatrix}." />
                </p>
              ),
            },
            {
              title: 'A három 2×2-es aldetermináns (figyelj a −j-re!)',
              body: (
                <p>
                  <M t="\mathbf{i}" />: <M t="1\cdot 1 - (-1)\cdot 4 = 5" />.<br />
                  <M t="-\mathbf{j}" />: <M t="-[2\cdot 1 - (-1)(-3)] = -(2 - 3) = +1" />.<br />
                  <M t="+\mathbf{k}" />: <M t="2\cdot 4 - 1(-3) = 8 + 3 = 11" />.
                </p>
              ),
            },
            {
              title: 'Eredmény és villámellenőrzés skalárszorzattal',
              body: (
                <p>
                  <strong><M t="\mathbf{u}\times\mathbf{v} = \langle 5, 1, 11 \rangle" /></strong>. Ellenőrzés:{' '}
                  <M t="\langle 5,1,11 \rangle \cdot \langle 2,1,-1 \rangle = 10+1-11 = 0" /> ✓ és{' '}
                  <M t="\langle 5,1,11 \rangle \cdot \langle -3,4,1 \rangle = -15+4+11 = 0" /> ✓!
                </p>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\mathbf{a} = \langle 1, 2, 0 \rangle" /> és <M t="\mathbf{b} = \langle 0, 3, -1 \rangle" /> vektorok vektoriális szorzatát!</>}>
          <p>
            <M t="\mathbf{a}\times\mathbf{b} = \langle 2(-1)-0,\; -(1(-1)-0),\; 1\cdot 3 - 0 \rangle = \langle -2, 1, 3 \rangle" />.
          </p>
        </Task>

        <Task n={6} q={<>Adj meg egy egységvektort, amely merőleges az <M t="\mathbf{u} = \langle 1, 0, 1 \rangle" /> és <M t="\mathbf{v} = \langle 0, 1, 1 \rangle" /> vektorokra is!</>}>
          <p>
            <M t="\mathbf{u}\times\mathbf{v} = \langle -1, -1, 1 \rangle" />, hossza <M t="\sqrt{3}" />. Két megfelelő
            egységvektor van: <M t="\pm\frac{1}{\sqrt{3}}\langle -1, -1, 1 \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Paralelogramma és háromszög területe 3D-ben',
    body: (
      <>
        <p>
          Mivel egy paralelogramma területe <M t="\text{alap} \times \text{magasság} = |\mathbf{u}|\cdot(|\mathbf{v}|\sin\theta)" />,
          a vektoriális szorzat <strong>hossza</strong> pontosan a kifeszített paralelogramma területe! A háromszögé
          pedig ennek pontosan a fele:
          <M block t="T_{\text{paralelogramma}} = |\mathbf{u}\times\mathbf{v}|, \qquad T_{\triangle PQR} = \frac{1}{2}|\overrightarrow{PQ}\times\overrightarrow{PR}|." />
        </p>

        <ParallelogramAreaWidget />

        <Quiz
          q={<>Mekkora az <M t="A(1;\,0;\,0)" />, <M t="B(0;\,2;\,0)" /> és <M t="C(0;\,0;\,2)" /> csúcsú háromszög területe?</>}
          options={[
            { label: <M t="3" /> },
            { label: <M t="6" /> },
            { label: <M t="2\sqrt{6}" /> },
            { label: <M t="\sqrt{6}" />, ok: true },
          ]}
          explain={
            <>
              <M t="\overrightarrow{AB} = \langle -1, 2, 0 \rangle" />, <M t="\overrightarrow{AC} = \langle -1, 0, 2 \rangle" />.
              Szorzatuk <M t="\langle 4, 2, 2 \rangle" />, hossza <M t="\sqrt{16+4+4} = \sqrt{24} = 2\sqrt{6}" />, így
              a háromszög területe ennek a fele: <M t="T = \frac{1}{2}\cdot 2\sqrt{6} = \sqrt{6}" />!
            </>
          }
        />

        <Task n={7} q={<>Számítsd ki a <M t="P(1;\,1;\,1)" />, <M t="Q(2;\,3;\,4)" /> és <M t="R(3;\,0;\,-1)" /> csúcsú háromszög területét!</>}>
          <p>
            <M t="\overrightarrow{PQ} = \langle 1, 2, 3 \rangle" />, <M t="\overrightarrow{PR} = \langle 2, -1, -2 \rangle" />.
            <M t="\overrightarrow{PQ}\times\overrightarrow{PR} = \langle -4+3,\; -(-2-6),\; -1-4 \rangle = \langle -1, 8, -5 \rangle" />.
            Terület: <M t="T = \frac{1}{2}\sqrt{1 + 64 + 25} = \frac{\sqrt{90}}{2} = \frac{3\sqrt{10}}{2}" />.
          </p>
        </Task>

        <Task n={8} q={<>Hogyan ellenőrizheted vektoriális szorzattal, hogy három térbeli pont (<M t="P, Q, R" />) egy egyenesen fekszik-e (kollineáris-e)?</>}>
          <p>
            Pontosan akkor esnek egy egyenesre, ha az általuk alkotott háromszög területe nulla, vagyis{' '}
            <M t="\overrightarrow{PQ}\times\overrightarrow{PR} = \mathbf{0}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Fizikai alkalmazás: forgatónyomaték (τ = r × F)',
    body: (
      <>
        <p>
          Amikor egy <M t="r" /> hosszú villáskulcs végére <M t="\mathbf{F}" /> erőt fejtesz ki, a csavarra ható{' '}
          <strong>forgatónyomaték</strong> vektor pontosan <M t="\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F}" />!
          Nagysága <M t="|\boldsymbol{\tau}| = |\mathbf{r}|\,|\mathbf{F}|\sin\theta" />, iránya pedig a csavar tengelye
          mentén mutat (jobbkéz-szabály: kifelé csavarod vagy befelé).
        </p>

        <TorqueWrenchWidget />

        <Task n={9} q={<>Egy <M t="0{,}25\text{ m}" /> hosszú kulcsot <M t="60\text{ N}" /> erővel húzunk a kulcs szárához képest <M t="60^\circ" />-os szögben. Mekkora a forgatónyomaték?</>}>
          <p>
            <M t="|\boldsymbol{\tau}| = 0{,}25 \cdot 60 \cdot \sin 60^\circ = 15 \cdot \frac{\sqrt{3}}{2} \approx 13{,}0\text{ N}\cdot\text{m}" />.
          </p>
        </Task>

        <Task n={10} q={<>Az origóban lévő csuklóhoz képest az <M t="\mathbf{r} = \langle 0, 2, 1 \rangle" /> m pontban hat az <M t="\mathbf{F} = \langle 10, 0, -5 \rangle" /> N erő. Mi a <M t="\boldsymbol{\tau}" /> nyomatékvektor?</>}>
          <p>
            <M t="\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F} = \langle -10 - 0,\; -(0 - 10),\; 0 - 20 \rangle = \langle -10, 10, -20 \rangle\text{ N}\cdot\text{m}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Vegyes szorzat és a paralelepipedon térfogata',
    body: (
      <>
        <p>
          Ha két vektor vektoriális szorzatát (<M t="\mathbf{u}\times\mathbf{v}" />) skalárisan megszorozzuk egy
          harmadik <M t="\mathbf{w}" /> vektorral, megkapjuk a <strong>vegyes szorzatot</strong> (skaláris hármas
          szorzatot)!
        </p>

        <Def title="Vegyes szorzat és térfogat">
          <M block t="(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w} = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix}." />
          <p>
            A három vektor által kifeszített <strong>paralelepipedon térfogata</strong>{' '}
            <M t="V = |(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w}|" /> (a tetraéder térfogata ennek hatoda:{' '}
            <M t="\frac{1}{6}V" />). A három vektor pontosan akkor <strong>egy síkban fekszik (komplanáris)</strong>,
            ha <M t="(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w} = 0" />!
          </p>
        </Def>

        <ParallelepipedVolumeWidget />

        <Task n={11} q={<>Számítsd ki az <M t="\mathbf{u} = \langle 1, 2, -1 \rangle" />, <M t="\mathbf{v} = \langle -2, 0, 3 \rangle" /> és <M t="\mathbf{w} = \langle 0, 7, -4 \rangle" /> vektorok által kifeszített paralelepipedon térfogatát!</>}>
          <p>
            <M t="\mathbf{u}\times\mathbf{v} = \langle 6, -1, 4 \rangle" />. Skalárszorzat <M t="\mathbf{w}" />-vel:{' '}
            <M t="6(0) + (-1)(7) + 4(-4) = -23" />. Tehát a térfogat <M t="V = |-23| = 23" />!
          </p>
        </Task>

        <Task n={12} q={<>Milyen <M t="c" /> értékre fekszik egy síkban az <M t="\mathbf{u} = \langle 1, 0, 1 \rangle" />, <M t="\mathbf{v} = \langle 2, 1, 0 \rangle" /> és <M t="\mathbf{w} = \langle 0, 1, c \rangle" /> vektor?</>}>
          <p>
            <M t="\mathbf{u}\times\mathbf{v} = \langle -1, 2, 1 \rangle" />. Komplanarítás feltétele:{' '}
            <M t="(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w} = 0 + 2 + c = 0 \implies c = -2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: u · v vs. u × v és 4 tipikus hiba',
    body: (
      <>
        <DotVsCrossDiagram />

        <CrossZeroTestsDiagram />

        <Warn>
          Négy tipikus hiba vektoriális szorzatnál:
          <ol>
            <li>
              <strong>A középső <M t="-\mathbf{j}" /> mínuszjel elfelejtése:</strong> a <M t="3\times 3" />-as
              determináns kifejtésekor a <M t="\mathbf{j}" /> komponens előtt mindig <strong>mínusz</strong> áll!
            </li>
            <li>
              <strong>Sorrend felcserélése:</strong> <M t="\mathbf{v}\times\mathbf{u} = -(\mathbf{u}\times\mathbf{v})" />{' '}
              — nem kommutatív!
            </li>
            <li>
              <strong>A <M t="\frac{1}{2}" /> elhagyása háromszög területénél:</strong> <M t="|\mathbf{u}\times\mathbf{v}|" />{' '}
              a <em>paralelogramma</em> területe, a háromszögé a fele!
            </li>
            <li>
              <strong>Értelmetlen zárójelezés vegyes szorzatnál:</strong> <M t="\mathbf{u}\times(\mathbf{v}\cdot\mathbf{w})" />{' '}
              értelmetlen, mert vektor és skalár nem szorozható vektoriálisan — mindig előbb a <M t="\times" />, utána a <M t="\cdot" />!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Ha három nem nulla térbeli vektorra teljesül, hogy <M t="(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w} = 0" />, mit jelent ez geometriailag?</>}
          options={[
            { label: <>A három vektor páronként merőleges</> },
            { label: <>A három vektor egy közös síkban fekszik (komplanárisak)</>, ok: true },
            { label: <>A három vektor biztosan párhuzamos</> },
            { label: <>A kifeszített paralelepipedon kocka</> },
          ]}
          explain={
            <>
              A kifeszített paralelepipedon térfogata <M t="V = |(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w}| = 0" />,
              ami pontosan azt jelenti, hogy a három vektor egy síkba lapul (komplanáris)!
            </>
          }
        />

        <Task n={13} q={<>Miért igaz minden térbeli vektorra, hogy <M t="(\mathbf{u}\times\mathbf{v})\cdot\mathbf{u} = 0" />?</>}>
          <p>
            Mert <M t="\mathbf{u}\times\mathbf{v}" /> definíció szerint merőleges <M t="\mathbf{u}" />-ra (és{' '}
            <M t="\mathbf{v}" />-re is), két merőleges vektor skalárszorzata pedig nulla!
          </p>
        </Task>

        <Task n={14} q={<>Ha <M t="|\mathbf{u}| = 3" />, <M t="|\mathbf{v}| = 4" /> és <M t="\mathbf{u}\cdot\mathbf{v} = 6" />, mennyi <M t="|\mathbf{u}\times\mathbf{v}|" />?</>}>
          <p>
            Használjuk a <M t="|\mathbf{u}\times\mathbf{v}|^2 + (\mathbf{u}\cdot\mathbf{v})^2 = |\mathbf{u}|^2|\mathbf{v}|^2" />{' '}
            Lagrange-azonosságot (<M t="\sin^2\theta + \cos^2\theta = 1" />):{' '}
            <M t="|\mathbf{u}\times\mathbf{v}| = \sqrt{9\cdot 16 - 36} = \sqrt{108} = 6\sqrt{3}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorlófeladatok (könnyű · közepes · nehéz)',
    body: (
      <>
        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki: <M t="\langle 1, 0, 2 \rangle \times \langle 0, 3, -1 \rangle" />!</>}>
          <p>
            <M t="\langle 0 - 6,\; -(-1 - 0),\; 3 - 0 \rangle = \langle -6, 1, 3 \rangle" />.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="\mathbf{u} = \langle 3, -1, 0 \rangle" /> és <M t="\mathbf{v} = \langle 1, 2, 0 \rangle" /> vektorok által kifeszített paralelogramma területét!</>}>
          <p>
            <M t="\mathbf{u}\times\mathbf{v} = \langle 0, 0, 6 - (-1) \rangle = \langle 0, 0, 7 \rangle" />, tehát a
            terület <M t="|\mathbf{u}\times\mathbf{v}| = 7" />!
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki: <M t="\mathbf{j}\times(\mathbf{i} + 2\mathbf{k})" />!</>}>
          <p>
            <M t="\mathbf{j}\times\mathbf{i} + 2(\mathbf{j}\times\mathbf{k}) = -\mathbf{k} + 2\mathbf{i} = \langle 2, 0, -1 \rangle" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Határozd meg az <M t="A(1;\,2;\,0)" />, <M t="B(3;\,1;\,4)" />, <M t="C(0;\,-1;\,2)" /> pontokon átmenő síkra merőleges egyik vektort és a háromszög területét!</>}>
          <p>
            <M t="\overrightarrow{AB} = \langle 2, -1, 4 \rangle" />, <M t="\overrightarrow{AC} = \langle -1, -3, 2 \rangle" />.
            Normálvektor: <M t="\overrightarrow{AB}\times\overrightarrow{AC} = \langle -2+12,\; -(4+4),\; -6-1 \rangle = \langle 10, -8, -7 \rangle" />.
            Terület: <M t="\frac{1}{2}\sqrt{100 + 64 + 49} = \frac{\sqrt{213}}{2}" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\mathbf{u} = \langle 2, 1, 0 \rangle" />, <M t="\mathbf{v} = \langle 1, -1, 2 \rangle" />, <M t="\mathbf{w} = \langle 3, 0, 1 \rangle" /> vektorok által kifeszített paralelepipedon térfogatát!</>}>
          <p>
            <M t="\mathbf{u}\times\mathbf{v} = \langle 2, -4, -3 \rangle" />.{' '}
            <M t="(\mathbf{u}\times\mathbf{v})\cdot\mathbf{w} = 6 + 0 - 3 = 3" />, tehát a térfogat <M t="V = 3" />.
          </p>
        </Task>

        <Task n={20} q={<>Egy síkban fekszik-e az <M t="A(1;\,0;\,1)" />, <M t="B(2;\,1;\,2)" />, <M t="C(3;\,2;\,1)" /> és <M t="D(0;\,-1;\,3)" /> négy pont?</>}>
          <p>
            <M t="\overrightarrow{AB} = \langle 1, 1, 1 \rangle" />, <M t="\overrightarrow{AC} = \langle 2, 2, 0 \rangle" />,{' '}
            <M t="\overrightarrow{AD} = \langle -1, -1, 2 \rangle" />.{' '}
            <M t="\overrightarrow{AB}\times\overrightarrow{AC} = \langle -2, 2, 0 \rangle" />, ennek skalárszorzata{' '}
            <M t="\overrightarrow{AD}" />-vel: <M t="(-2)(-1) + 2(-1) + 0 = 0" /> → <strong>igen, egy síkban fekszenek</strong>!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki a <M t="P(1;\,2;\,3)" /> pont távolságát az <M t="A(0;\,0;\,0)" /> és <M t="B(2;\,1;\,2)" /> pontokon átmenő egyenestől vektoriális szorzattal!</>}>
          <p>
            A paralelogramma területe <M t="|\overrightarrow{AP}\times\overrightarrow{AB}| = d\cdot|\overrightarrow{AB}|" />,
            innen <M t="d = \frac{|\overrightarrow{AP}\times\overrightarrow{AB}|}{|\overrightarrow{AB}|}" />!{' '}
            <M t="\langle 1,2,3 \rangle \times \langle 2,1,2 \rangle = \langle 1, 4, -3 \rangle" />, hossza{' '}
            <M t="\sqrt{26}" />. Mivel <M t="|\overrightarrow{AB}| = 3" />, a távolság{' '}
            <strong><M t="d = \frac{\sqrt{26}}{3}" /></strong>!
          </p>
        </Task>

        <Task n={22} q={<>Igazold a <strong>Lagrange-azonosságot</strong>: <M t="|\mathbf{u}\times\mathbf{v}|^2 + (\mathbf{u}\cdot\mathbf{v})^2 = |\mathbf{u}|^2|\mathbf{v}|^2" />!</>}>
          <p>
            Geometriai alakokkal egyetlen sor:
            <M block t="|\mathbf{u}\times\mathbf{v}|^2 + (\mathbf{u}\cdot\mathbf{v})^2 = |\mathbf{u}|^2|\mathbf{v}|^2\sin^2\theta + |\mathbf{u}|^2|\mathbf{v}|^2\cos^2\theta = |\mathbf{u}|^2|\mathbf{v}|^2(\sin^2\theta + \cos^2\theta) = |\mathbf{u}|^2|\mathbf{v}|^2." />
          </p>
        </Task>

        <Task n={23} q={<>Ellenőrizd az <M t="\mathbf{u} = \langle 1, 1, 0 \rangle" />, <M t="\mathbf{v} = \langle 0, 1, 1 \rangle" />, <M t="\mathbf{w} = \langle 1, 0, 1 \rangle" /> vektorokra a híres <strong>BAC–CAB szabályt</strong>: <M t="\mathbf{u}\times(\mathbf{v}\times\mathbf{w}) = (\mathbf{u}\cdot\mathbf{w})\mathbf{v} - (\mathbf{u}\cdot\mathbf{v})\mathbf{w}" />!</>}>
          <p>
            Bal oldal: <M t="\mathbf{v}\times\mathbf{w} = \langle 1, 1, -1 \rangle" />, majd{' '}
            <M t="\mathbf{u}\times\langle 1,1,-1 \rangle = \langle -1, 1, 0 \rangle" />.
            <br />
            Jobb oldal: <M t="\mathbf{u}\cdot\mathbf{w} = 1" />, <M t="\mathbf{u}\cdot\mathbf{v} = 1" />, így{' '}
            <M t="1\cdot\langle 0,1,1 \rangle - 1\cdot\langle 1,0,1 \rangle = \langle -1, 1, 0 \rangle" /> — pontosan
            egyezik!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda</h3>
        <Steps
          title="Térbeli háromszög területe vektoriális szorzattal"
          source="Analízis-labor"
          problem={
            <>
              Számítsuk ki a <M t="P(1;\,0;\,0)" />, <M t="Q(1;\,2;\,1)" /> és <M t="R(0;\,1;\,2)" /> csúcsú térbeli
              háromszög területét!
            </>
          }
          steps={[
            {
              title: 'Oldalvektorok felírása',
              body: (
                <p>
                  <M t="\overrightarrow{PQ} = \langle 0, 2, 1 \rangle" />,{' '}
                  <M t="\overrightarrow{PR} = \langle -1, 1, 2 \rangle" />.
                </p>
              ),
            },
            {
              title: 'Vektoriális szorzat kiszámítása',
              body: (
                <M block t="\overrightarrow{PQ}\times\overrightarrow{PR} = \begin{vmatrix}\mathbf{i} & \mathbf{j} & \mathbf{k} \\ 0 & 2 & 1 \\ -1 & 1 & 2\end{vmatrix} = 3\mathbf{i} - \mathbf{j} + 2\mathbf{k}." />
              ),
            },
            {
              title: 'Háromszög területe',
              body: (
                <p>
                  A háromszög területe a paralelogramma területének fele:{' '}
                  <M t="T = \dfrac{1}{2}\sqrt{3^2 + (-1)^2 + 2^2} = \dfrac{\sqrt{14}}{2}" />.
                </p>
              ),
            },
          ]}
        />
      </>
    ),
  },
];
