import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  Angle3DCalcWidget,
  CauchySchwarzDiagram,
  DotAngleSignWidget,
  DotProductFiveUsesDiagram,
  OrthogonalSearchWidget,
  PointLineDistDotWidget,
  VectorProjectionWidget,
  WorkDotProductWidget,
} from '../components/Widgets123';
import type { Page } from './s1_1';

export const S12_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A skalárszorzat két arca (algebrai és geometriai)',
    body: (
      <>
        <Story>
          <p>
            Két vektort már tudunk összeadni — de hogyan „szorozzuk” össze őket? Két különböző, egyaránt zseniális
            szorzás létezik a térben: az első egy <strong>egyetlen számot (skalárt)</strong> ad vissza, és megméri,
            mennyire mutatnak egy irányba a vektorok. Ez a <strong>skalárszorzat</strong> (pont-szorzat)!
          </p>
        </Story>

        <Def title="Skalárszorzat (1. tétel — algebrai és geometriai alak)">
          <p>
            Az <M t="\mathbf{u} = \langle u_1, u_2, u_3 \rangle" /> és <M t="\mathbf{v} = \langle v_1, v_2, v_3 \rangle" />{' '}
            vektorok <strong>skalárszorzata</strong>:
            <M block t="\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\mathbf{u}|\,|\mathbf{v}|\cos\theta," />
            ahol <M t="\theta \in [0, \pi]" /> a két vektor hajlásszöge! (A két alak egyenlősége közvetlenül a
            koszinusztételből következik a <M t="|\mathbf{u}-\mathbf{v}|^2" /> oldalra felírva.)
          </p>
        </Def>

        <DotAngleSignWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\mathbf{u} = \langle 2, -3, 4 \rangle" /> és <M t="\mathbf{v} = \langle -1, 5, 2 \rangle" /> vektorok skalárszorzatát! Hegyesszöget vagy tompaszöget zárnak be?</>}>
          <p>
            <M t="\mathbf{u}\cdot\mathbf{v} = 2(-1) + (-3)(5) + 4(2) = -2 - 15 + 8 = -9 < 0" />. Mivel a skalárszorzat
            negatív, <strong>tompaszöget</strong> zárnak be!
          </p>
        </Task>

        <Task n={2} q={<>Ha <M t="|\mathbf{u}| = 6" />, <M t="|\mathbf{v}| = 5" /> és a hajlásszögük <M t="\theta = 60^\circ" />, mennyi <M t="\mathbf{u}\cdot\mathbf{v}" />?</>}>
          <p>
            <M t="\mathbf{u}\cdot\mathbf{v} = 6 \cdot 5 \cdot \cos 60^\circ = 30 \cdot \frac{1}{2} = 15" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Két vektor hajlásszöge és iránykoszinuszok',
    body: (
      <>
        <p>
          A skalárszorzat két alakját összevetve a tér bármely két nemnulla vektorának hajlásszögét pillanatok alatt
          kiszámíthatjuk:
          <M block t="\theta = \arccos\!\left(\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{u}|\,|\mathbf{v}|}\right) \qquad (0 \le \theta \le \pi)." />
        </p>

        <Angle3DCalcWidget />

        <Quiz
          q={<>Melyik vektorpár zár be <strong>hegyesszöget</strong> egymással?</>}
          options={[
            { label: <M t="\langle 1, -2, 3 \rangle \text{ és } \langle -2, 1, 0 \rangle" /> },
            { label: <M t="\langle 2, 1, -1 \rangle \text{ és } \langle 1, 0, 2 \rangle" /> },
            { label: <M t="\langle 3, -1, 2 \rangle \text{ és } \langle 1, 1, 2 \rangle" />, ok: true },
            { label: <M t="\langle 4, 0, -2 \rangle \text{ és } \langle -1, 5, 1 \rangle" /> },
          ]}
          explain={
            <>
              Hegyesszöghöz <M t="\mathbf{u}\cdot\mathbf{v} > 0" /> kell: a harmadiknál{' '}
              <M t="3\cdot 1 + (-1)\cdot 1 + 2\cdot 2 = 6 > 0" />! (A másodiknál 0 — derékszög, az elsőnél és negyediknél negatív — tompaszög.)
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki az <M t="\mathbf{u} = \mathbf{i} - 2\mathbf{j} - 2\mathbf{k}" /> és <M t="\mathbf{v} = 6\mathbf{i} + 3\mathbf{j} + 2\mathbf{k}" /> vektorok hajlásszögét!</>}>
          <p>
            <M t="\mathbf{u}\cdot\mathbf{v} = 6 - 6 - 4 = -4" />, <M t="|\mathbf{u}| = \sqrt{1+4+4} = 3" />,{' '}
            <M t="|\mathbf{v}| = \sqrt{36+9+4} = 7" />. Így <M t="\cos\theta = -\frac{4}{21}" />,{' '}
            <M t="\theta = \arccos(-4/21) \approx 101^\circ" />.
          </p>
        </Task>

        <Task n={4} q={<>Mekkora szöget zár be egy kocka testátlója az egyik élével?</>}>
          <p>
            Vegyük a <M t="\mathbf{d} = \langle 1, 1, 1 \rangle" /> testátlót és a <M t="\mathbf{i} = \langle 1, 0, 0 \rangle" />{' '}
            élt! <M t="\cos\theta = \frac{1}{\sqrt{3}\cdot 1} = \frac{1}{\sqrt{3}} \implies \theta \approx 54{,}7^\circ" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Merőlegesség (ortogonalitás) és algebrai szabályok',
    body: (
      <>
        <Def title="Merőleges (ortogonális) vektorok">
          <p>
            Az <M t="\mathbf{u}" /> és <M t="\mathbf{v}" /> vektorok pontosan akkor <strong>merőlegesek (ortogonálisak)</strong>,
            ha skalárszorzatuk nulla:
            <M block t="\mathbf{u} \perp \mathbf{v} \iff \mathbf{u} \cdot \mathbf{v} = 0." />
          </p>
        </Def>

        <p>
          A skalárszorzat szinte pontosan úgy viselkedik, mint a rendes szorzás:
        </p>
        <ul>
          <li><M t="\mathbf{u}\cdot\mathbf{v} = \mathbf{v}\cdot\mathbf{u}" /> (kommutatív),</li>
          <li><M t="\mathbf{u}\cdot(\mathbf{v}+\mathbf{w}) = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{w}" /> (disztributív),</li>
          <li><M t="(c\mathbf{u})\cdot\mathbf{v} = c(\mathbf{u}\cdot\mathbf{v})" /> (skalár kiemelhető),</li>
          <li><M t="\mathbf{v}\cdot\mathbf{v} = |\mathbf{v}|^2" /> (önmagával vett skalárszorzat = hossz négyzete!).</li>
        </ul>

        <OrthogonalSearchWidget />

        <Task n={5} q={<>Milyen <M t="c" /> számra merőleges az <M t="\mathbf{u} = \langle c, 2, -1 \rangle" /> vektor a <M t="\mathbf{v} = \langle 3, -c, 4 \rangle" /> vektorra?</>}>
          <p>
            <M t="\mathbf{u}\cdot\mathbf{v} = 3c - 2c - 4 = c - 4 = 0 \implies c = 4" />.
          </p>
        </Task>

        <Task n={6} q={<>Igazold a skalárszorzat szabályaival, hogy ha <M t="|\mathbf{u}| = |\mathbf{v}|" />, akkor <M t="\mathbf{u} + \mathbf{v}" /> és <M t="\mathbf{u} - \mathbf{v}" /> merőlegesek egymásra (a rombusz átlói merőlegesek!)!</>}>
          <p>
            <M t="(\mathbf{u}+\mathbf{v})\cdot(\mathbf{u}-\mathbf{v}) = \mathbf{u}\cdot\mathbf{u} - \mathbf{u}\cdot\mathbf{v} + \mathbf{v}\cdot\mathbf{u} - \mathbf{v}\cdot\mathbf{v} = |\mathbf{u}|^2 - |\mathbf{v}|^2 = 0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Merőleges vektorvetület és ortogonális felbontás',
    body: (
      <>
        <p>
          Gyakran fel kell bontanunk egy <M t="\mathbf{u}" /> vektort (pl. egy erőt vagy sebességet) két egymásra
          merőleges darabra: egy <M t="\mathbf{v}" />-vel <strong>párhuzamos</strong> és egy <M t="\mathbf{v}" />-re{' '}
          <strong>merőleges</strong> komponensre!
        </p>

        <Def title="Skalárkomponens és merőleges vektorvetület">
          <p>
            Az <M t="\mathbf{u}" /> vektor <M t="\mathbf{v} \ne \mathbf{0}" /> irányú (előjeles){' '}
            <strong>skalárkomponense</strong>:
            <M block t="\operatorname{comp}_{\mathbf{v}}\mathbf{u} = |\mathbf{u}|\cos\theta = \frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{v}|}." />
            Az <M t="\mathbf{u}" /> vektor <M t="\mathbf{v}" />-re vett <strong>merőleges vektorvetülete</strong>:
            <M block t="\operatorname{proj}_{\mathbf{v}}\mathbf{u} = \left(\frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{v}\cdot\mathbf{v}}\right)\mathbf{v} = \left(\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{v}|^2}\right)\mathbf{v}." />
            A maradék <M t="\mathbf{u}_\perp = \mathbf{u} - \operatorname{proj}_{\mathbf{v}}\mathbf{u}" /> mindig
            merőleges <M t="\mathbf{v}" />-re!
          </p>
        </Def>

        <VectorProjectionWidget />

        <Steps
          title="Ortogonális felbontás 3D-ben lépésről lépésre"
          problem={<>Bontsd fel az <M t="\mathbf{u} = \langle 6, 3, 2 \rangle" /> vektort egy <M t="\mathbf{v} = \langle 1, -2, -2 \rangle" />-vel párhuzamos és egy rá merőleges komponensre!</>}
          steps={[
            {
              title: 'Skalárszorzat és |v|² kiszámítása',
              body: (
                <p>
                  <M t="\mathbf{u}\cdot\mathbf{v} = 6\cdot 1 + 3(-2) + 2(-2) = 6 - 6 - 4 = -4" />, és{' '}
                  <M t="|\mathbf{v}|^2 = 1^2 + (-2)^2 + (-2)^2 = 9" />.
                </p>
              ),
            },
            {
              title: 'Párhuzamos komponens (vektorvetület)',
              body: (
                <p>
                  <M block t="\mathbf{u}_\parallel = \operatorname{proj}_{\mathbf{v}}\mathbf{u} = \frac{-4}{9}\langle 1, -2, -2 \rangle = \left\langle -\frac{4}{9},\; \frac{8}{9},\; \frac{8}{9} \right\rangle." />
                </p>
              ),
            },
            {
              title: 'Merőleges komponens és ellenőrzés',
              body: (
                <p>
                  <M t="\mathbf{u}_\perp = \mathbf{u} - \mathbf{u}_\parallel = \left\langle \frac{58}{9},\; \frac{19}{9},\; \frac{10}{9} \right\rangle" />.
                  Ellenőrzés: <M t="\mathbf{u}_\perp \cdot \mathbf{v} = \frac{58 - 38 - 20}{9} = 0" /> ✓!
                </p>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Számítsd ki az <M t="\mathbf{u} = \langle 3, 4 \rangle" /> vektor vetületét a <M t="\mathbf{v} = \langle 1, 0 \rangle" /> vektorra!</>}>
          <p>
            <M t="\operatorname{proj}_{\mathbf{v}}\mathbf{u} = \frac{3}{1}\langle 1, 0 \rangle = \langle 3, 0 \rangle" />{' '}
            (pontosan az <M t="x" />-komponens!).
          </p>
        </Task>

        <Task n={8} q={<>Mi a <M t="\operatorname{proj}_{\mathbf{v}}\mathbf{u}" /> értéke, ha <M t="\mathbf{u} \perp \mathbf{v}" />?</>}>
          <p>
            Mivel <M t="\mathbf{u}\cdot\mathbf{v} = 0" />, a vetület a <strong><M t="\mathbf{0}" /> nullvektor</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Fizikai alkalmazás: állandó erő munkája (W = F · D)',
    body: (
      <>
        <p>
          Ha egy állandó <M t="\mathbf{F}" /> erő egy egyenes mentén <M t="\mathbf{D}" /> elmozdulással mozgat egy
          testet, akkor az erő által végzett <strong>munka</strong> pontosan a két vektor skalárszorzata:
          <M block t="W = \mathbf{F}\cdot\mathbf{D} = |\mathbf{F}|\,|\mathbf{D}|\cos\theta." />
          Ezért a centripetális erő (amely mindig merőleges a sebességre) <strong>nulla munkát</strong> végez!
        </p>

        <WorkDotProductWidget />

        <Quiz
          q={<>Egy <M t="\mathbf{F} = \langle 4, -2, 6 \rangle" /> N nagyságú állandó erő egy testet a <M t="P(1;\,0;\,2)" /> pontból a <M t="Q(3;\,4;\,2)" /> pontba mozgat (méterben). Mennyi a végzett munka?</>}
          options={[
            { label: <M t="0\text{ J}" />, ok: true },
            { label: <M t="16\text{ J}" /> },
            { label: <M t="-8\text{ J}" /> },
            { label: <M t="28\text{ J}" /> },
          ]}
          explain={
            <>
              Az elmozdulásvektor <M t="\mathbf{D} = \overrightarrow{PQ} = \langle 2, 4, 0 \rangle" />. A munka:{' '}
              <M t="W = \mathbf{F}\cdot\mathbf{D} = 4\cdot 2 + (-2)\cdot 4 + 6\cdot 0 = 8 - 8 + 0 = 0\text{ J}" />{' '}
              (az erő merőleges az elmozdulásra!).
            </>
          }
        />

        <Task n={9} q={<>Egy szánkót <M t="40\text{ N}" /> erővel húznak a vízszintessel <M t="30^\circ" />-os szöget bezáró kötélen <M t="20\text{ m}" /> távolságra. Mekkora munkát végeznek?</>}>
          <p>
            <M t="W = 40 \cdot 20 \cdot \cos 30^\circ = 800 \cdot \frac{\sqrt{3}}{2} = 400\sqrt{3} \approx 692{,}8\text{ J}" />.
          </p>
        </Task>

        <Task n={10} q={<>Mennyi munkát végez a <M t="\mathbf{F} = 3\mathbf{i} + 2\mathbf{j} - \mathbf{k}" /> erő, ha az elmozdulás <M t="\mathbf{D} = 2\mathbf{i} - \mathbf{j} + 4\mathbf{k}" />?</>}>
          <p>
            <M t="W = 3(2) + 2(-1) + (-1)(4) = 6 - 2 - 4 = 0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Egyenes normálvektora és pont–egyenes távolság',
    body: (
      <>
        <p>
          A skalárszorzat egy meglepően gyors geometriai trükköt ad a síkban: az <M t="Ax + By = C" /> egyenesre mindig
          merőleges az <strong><M t="\mathbf{n} = \langle A, B \rangle" /> normálvektor</strong>! (Ugyanis két pontjára{' '}
          <M t="A(x_2-x_1) + B(y_2-y_1) = 0 \iff \mathbf{n}\cdot\overrightarrow{P_1P_2} = 0" />.)
        </p>

        <Def title="Pont és egyenes távolsága a síkban">
          <p>
            A <M t="P(x_1;\,y_1)" /> pont távolsága az <M t="Ax + By + D = 0" /> egyenestől az egyenes egy tetszőleges{' '}
            <M t="Q" /> pontjából <M t="P" />-be mutató vektor <M t="\mathbf{n}" />-re vett vetületének hossza:
            <M block t="d = \frac{|Ax_1 + By_1 + D|}{\sqrt{A^2 + B^2}}." />
          </p>
        </Def>

        <PointLineDistDotWidget />

        <Task n={11} q={<>Számítsd ki a <M t="P(2;\,-1)" /> pont távolságát az <M t="5x - 12y + 4 = 0" /> egyenestől!</>}>
          <p>
            <M t="d = \frac{|5\cdot 2 - 12(-1) + 4|}{\sqrt{5^2 + (-12)^2}} = \frac{|10 + 12 + 4|}{13} = \frac{26}{13} = 2" />.
          </p>
        </Task>

        <Task n={12} q={<>Add meg a <M t="2x - 5y = 7" /> és <M t="4x + y = 3" /> egyenesek hajlásszögét a normálvektoraik segítségével!</>}>
          <p>
            <M t="\mathbf{n}_1 = \langle 2, -5 \rangle" />, <M t="\mathbf{n}_2 = \langle 4, 1 \rangle" />.{' '}
            <M t="\cos\theta = \frac{|2\cdot 4 + (-5)\cdot 1|}{\sqrt{29}\sqrt{17}} = \frac{3}{\sqrt{493}} \approx 0{,}135 \implies \theta \approx 82{,}2^\circ" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: 5 alkalmazás, Cauchy–Schwarz és 4 hiba',
    body: (
      <>
        <DotProductFiveUsesDiagram />

        <CauchySchwarzDiagram />

        <Warn>
          Négy tipikus hiba skalárszorzatnál:
          <ol>
            <li>
              <strong>Vektor helyett skalár / skalár helyett vektor:</strong> <M t="\mathbf{u}\cdot\mathbf{v}" />{' '}
              mindig <em>szám</em>, <M t="\operatorname{proj}_{\mathbf{v}}\mathbf{u}" /> viszont <em>vektor</em>!
            </li>
            <li>
              <strong><M t="\operatorname{proj}_{\mathbf{v}}\mathbf{u}" /> nevezőjének elrontása:</strong> a képletben{' '}
              <M t="\frac{\mathbf{u}\cdot\mathbf{v}}{|\mathbf{v}|^2}\mathbf{v}" /> van (<strong>négyzet</strong> a
              nevezőben, nem <M t="|\mathbf{v}|" />!).
            </li>
            <li>
              <strong>„Egyszerűsítés” skalárszorzatban:</strong> <M t="\mathbf{u}\cdot\mathbf{v} = \mathbf{u}\cdot\mathbf{w}" />{' '}
              <em>nem</em> jelenti azt, hogy <M t="\mathbf{v} = \mathbf{w}" /> (elég, ha <M t="\mathbf{v}-\mathbf{w} \perp \mathbf{u}" />)!
            </li>
            <li>
              <strong>Sorrend felcserélése vetületnél:</strong> <M t="\operatorname{proj}_{\mathbf{v}}\mathbf{u}" />{' '}
              a <M t="\mathbf{v}" /> vektor irányába mutat, nem <M t="\mathbf{u}" />-éba!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Melyik vektor irányával párhuzamos a <M t="\operatorname{proj}_{\mathbf{b}}\mathbf{a}" /> vektorvetület?</>}
          options={[
            { label: <>Az <M t="\mathbf{a}" /> vektorral</> },
            { label: <>A <M t="\mathbf{b}" /> vektorral</>, ok: true },
            { label: <>Az <M t="\mathbf{a} + \mathbf{b}" /> vektorral</> },
            { label: <>Merőleges <M t="\mathbf{b}" />-re</> },
          ]}
          explain={
            <>
              Az alsó indexben álló <M t="\mathbf{b}" /> a „vetítési alap” — tehát <M t="\operatorname{proj}_{\mathbf{b}}\mathbf{a}" />{' '}
              mindig a <M t="\mathbf{b}" /> skalárszorosa!
            </>
          }
        />

        <Task n={13} q={<>Adj példát három különböző nemnulla vektorra, amelyekre <M t="\mathbf{u}\cdot\mathbf{v} = \mathbf{u}\cdot\mathbf{w}" />, mégis <M t="\mathbf{v} \ne \mathbf{w}" />!</>}>
          <p>
            Legyen <M t="\mathbf{u} = \langle 1, 0 \rangle" />, <M t="\mathbf{v} = \langle 2, 1 \rangle" />,{' '}
            <M t="\mathbf{w} = \langle 2, 5 \rangle" />. Mindkét skalárszorzat <M t="2" />, pedig <M t="\mathbf{v}\ne\mathbf{w}" />.
          </p>
        </Task>

        <Task n={14} q={<>Ha <M t="|\mathbf{u}| = 3" />, <M t="|\mathbf{v}| = 4" /> és <M t="\mathbf{u}\cdot\mathbf{v} = -5" />, mennyi <M t="|\mathbf{u} + \mathbf{v}|" />?</>}>
          <p>
            <M t="|\mathbf{u}+\mathbf{v}|^2 = (\mathbf{u}+\mathbf{v})\cdot(\mathbf{u}+\mathbf{v}) = |\mathbf{u}|^2 + 2\mathbf{u}\cdot\mathbf{v} + |\mathbf{v}|^2 = 9 - 10 + 16 = 15" />.
            Így <M t="|\mathbf{u}+\mathbf{v}| = \sqrt{15}" />!
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

        <Task n={15} q={<>Számítsd ki: <M t="\langle 3, -1, 2 \rangle \cdot \langle -2, 4, 5 \rangle" />!</>}>
          <p>
            <M t="3(-2) + (-1)(4) + 2(5) = -6 - 4 + 10 = 0" /> (a két vektor merőleges!).
          </p>
        </Task>

        <Task n={16} q={<>Határozd meg az <M t="\mathbf{u} = \langle 1, 1, 0 \rangle" /> és <M t="\mathbf{v} = \langle 0, 1, 1 \rangle" /> vektorok hajlásszögét!</>}>
          <p>
            <M t="\cos\theta = \frac{1}{\sqrt{2}\cdot\sqrt{2}} = \frac{1}{2} \implies \theta = 60^\circ = \frac{\pi}{3}" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="\mathbf{u} = \langle 4, 2 \rangle" /> vektor <M t="\mathbf{v} = \langle 1, 1 \rangle" /> irányú skalárkomponensét és vektorvetületét!</>}>
          <p>
            <M t="\mathbf{u}\cdot\mathbf{v} = 6" />, <M t="|\mathbf{v}| = \sqrt{2}" />. Skalárkomponens:{' '}
            <M t="\frac{6}{\sqrt{2}} = 3\sqrt{2}" />. Vektorvetület: <M t="\frac{6}{2}\langle 1, 1 \rangle = \langle 3, 3 \rangle" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Milyen <M t="t" /> értékekre merőleges az <M t="\mathbf{a} = \langle t, 2, -1 \rangle" /> és <M t="\mathbf{b} = \langle t, -t, 3 \rangle" /> vektor?</>}>
          <p>
            <M t="\mathbf{a}\cdot\mathbf{b} = t^2 - 2t - 3 = (t - 3)(t + 1) = 0 \implies t = 3" /> vagy <M t="t = -1" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki a <M t="P(-1;\,3)" /> pont távolságát a <M t="3x + 4y - 7 = 0" /> egyenestől!</>}>
          <p>
            <M t="d = \frac{|-3 + 12 - 7|}{\sqrt{9 + 16}} = \frac{2}{5} = 0{,}4" />.
          </p>
        </Task>

        <Task n={20} q={<>Bontsd fel az <M t="\mathbf{u} = \langle 2, -1, 3 \rangle" /> vektort a <M t="\mathbf{v} = \langle 1, 1, 1 \rangle" /> vektorral párhuzamos és rá merőleges komponensre!</>}>
          <p>
            <M t="\mathbf{u}\cdot\mathbf{v} = 4" />, <M t="|\mathbf{v}|^2 = 3" />. Így{' '}
            <M t="\mathbf{u}_\parallel = \left\langle \frac{4}{3}, \frac{4}{3}, \frac{4}{3} \right\rangle" /> és{' '}
            <M t="\mathbf{u}_\perp = \mathbf{u} - \mathbf{u}_\parallel = \left\langle \frac{2}{3}, -\frac{7}{3}, \frac{5}{3} \right\rangle" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Igazold skalárszorzattal a <strong>paralelogramma-azonosságot</strong>: <M t="|\mathbf{u}+\mathbf{v}|^2 + |\mathbf{u}-\mathbf{v}|^2 = 2|\mathbf{u}|^2 + 2|\mathbf{v}|^2" />!</>}>
          <p>
            <M t="|\mathbf{u}+\mathbf{v}|^2 = |\mathbf{u}|^2 + 2\mathbf{u}\cdot\mathbf{v} + |\mathbf{v}|^2" /> és{' '}
            <M t="|\mathbf{u}-\mathbf{v}|^2 = |\mathbf{u}|^2 - 2\mathbf{u}\cdot\mathbf{v} + |\mathbf{v}|^2" />.
            Összeadva a <M t="\pm 2\mathbf{u}\cdot\mathbf{v}" /> tagok kiesnek, marad <M t="2|\mathbf{u}|^2 + 2|\mathbf{v}|^2" />!
          </p>
        </Task>

        <Task n={22} q={<>Igazold a Cauchy–Schwarz-egyenlőtlenséggel, hogy bármely <M t="a, b, c \in \mathbb{R}" /> számra <M t="(a + b + c)^2 \le 3(a^2 + b^2 + c^2)" />!</>}>
          <p>
            Válasszuk <M t="\mathbf{u} = \langle a, b, c \rangle" /> és <M t="\mathbf{v} = \langle 1, 1, 1 \rangle" />!
            Ekkor <M t="(\mathbf{u}\cdot\mathbf{v})^2 \le |\mathbf{u}|^2|\mathbf{v}|^2" /> pontosan{' '}
            <M t="(a + b + c)^2 \le (a^2 + b^2 + c^2)(1^2 + 1^2 + 1^2) = 3(a^2 + b^2 + c^2)" />!
          </p>
        </Task>

        <Task n={23} q={<>Bizonyítsd be skalárszorzattal <strong>Thalész tételét</strong>: ha <M t="AB" /> egy kör átmérője és <M t="P" /> a kör egy harmadik pontja, akkor <M t="\overrightarrow{AP} \perp \overrightarrow{BP}" />!</>}>
          <p>
            Legyen a kör középpontja az origó, sugara <M t="r" />, <M t="A" /> helyvektora <M t="\mathbf{a}" />, akkor{' '}
            <M t="B" /> helyvektora <M t="-\mathbf{a}" />, <M t="P" />-é <M t="\mathbf{p}" />, és{' '}
            <M t="|\mathbf{a}| = |\mathbf{p}| = r" />. Ekkor{' '}
            <M t="\overrightarrow{AP}\cdot\overrightarrow{BP} = (\mathbf{p}-\mathbf{a})\cdot(\mathbf{p}+\mathbf{a}) = |\mathbf{p}|^2 - |\mathbf{a}|^2 = r^2 - r^2 = 0" />!
          </p>
        </Task>
      </>
    ),
  },
];
