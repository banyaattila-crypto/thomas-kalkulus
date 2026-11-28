import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  Helicoid3DWidget,
  ParamFluxOrientWidget,
  ParamSurfaceGallery3DWidget,
  ParamSurfaceMasterMapDiagram,
  SurfaceOfRevolution3DWidget,
  TangentPatchNormal3DWidget,
  TorusArea3DWidget,
  UnifyExplicitParamWidget,
} from '../components/Widgets166';
import type { Page } from './s1_1';

export const S16_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Paraméteresen adott felületek: r(u, v)',
    body: (
      <>
        <Story>
          <p>
            A 16.5 fejezetben <M t="z = f(x, y)" /> alakú felületeken integráltunk — de egy teljes gömböt, egy
            függőleges hengert vagy egy fánkot (tóruszt) <em>nem</em> lehet egyetlen <M t="z = f(x, y)" /> függvénnyel
            felírni! Ahogy az 1D térgörbét egyetlen <M t="t" /> paraméterrel adtuk meg (<M t="\mathbf{r}(t)" />), úgy a
            2D felületet <strong>két paraméterrel</strong> (<M t="u, v" />) írjuk le!
          </p>
        </Story>

        <Def title="Paraméteresen adott felület">
          <M block t="\mathbf{r}(u, v) = f(u, v)\,\mathbf{i} + g(u, v)\,\mathbf{j} + h(u, v)\,\mathbf{k}, \qquad (u, v) \in R." />
          <p>
            Ha <M t="u" />-t rögzítjük és <M t="v" />-t futtatjuk, egy <strong>paramétervonalat</strong> kapunk a
            felületen; ha <M t="v" />-t rögzítjük, a keresztező paramétervonalat. A kettő együtt alkotja a felület 3D
            hálóját!
          </p>
        </Def>

        <ParamSurfaceGallery3DWidget />

        <Task n={1} q={<>Paraméterezd az <M t="x^2 + y^2 = 9,\; 0 \le z \le 5" /> körhenger palástját!</>}>
          <p>
            <M t="\mathbf{r}(\theta, z) = \langle 3\cos\theta,\; 3\sin\theta,\; z \rangle" />, ahol{' '}
            <M t="0 \le \theta \le 2\pi,\; 0 \le z \le 5" />.
          </p>
        </Task>

        <Task n={2} q={<>Írd fel annak a síknak a paraméteres egyenletét, amely átmegy a <M t="P_0(1; 2; 0)" /> ponton, és az <M t="\mathbf{a} = \langle 1, 0, 2 \rangle" />, <M t="\mathbf{b} = \langle 0, 3, -1 \rangle" /> vektorok feszítik ki!</>}>
          <p>
            <M t="\mathbf{r}(u, v) = \langle 1 + u,\; 2 + 3v,\; 2u - v \rangle" /> (<M t="u, v \in \mathbb{R}" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Forgásfelületek és a négy standard paraméterezés',
    body: (
      <>
        <p>
          A gyakorlatban a felületek 90%-a négy alaprecept valamelyike: henger, kúp, gömb vagy{' '}
          <strong>forgásfelület</strong> (egy <M t="r = f(z)" /> profilgörbe körbeforgatása a <M t="z" />-tengely
          körül)!
        </p>

        <SurfaceOfRevolution3DWidget />

        <Quiz
          q={<>Milyen felületet ír le az <M t="\mathbf{r}(\phi, \theta) = \langle 4\sin\phi\cos\theta,\; 4\sin\phi\sin\theta,\; 4\cos\phi \rangle" /> (<M t="0\le\phi\le\frac{\pi}{2},\; 0\le\theta\le 2\pi" />) paraméterezés?</>}
          options={[
            { label: <>A 4 sugarú teljes gömböt</> },
            { label: <>A 4 sugarú felső félgömböt (<M t="z \ge 0" />)</>, ok: true },
            { label: <>Egy 4 sugarú körhengert</> },
            { label: <>Egy 45°-os kúpot</> },
          ]}
          explain={
            <>
              <M t="x^2 + y^2 + z^2 = 16" />, és mivel <M t="0 \le \phi \le \frac{\pi}{2}" />,{' '}
              <M t="z = 4\cos\phi \ge 0" /> — pontosan a felső félgömb!
            </>
          }
        />

        <Task n={3} q={<>Paraméterezd polárparaméterekkel (<M t="r, \theta" />) a <M t="z = x^2 + y^2" /> paraboloid <M t="z \le 4" /> részét!</>}>
          <p>
            <M t="\mathbf{r}(r, \theta) = \langle r\cos\theta,\; r\sin\theta,\; r^2 \rangle" />,{' '}
            <M t="0 \le r \le 2,\; 0 \le \theta \le 2\pi" />.
          </p>
        </Task>

        <Task n={4} q={<>Paraméterezd az <M t="y = e^x" /> (<M t="0 \le x \le 1" />) görbe <M t="x" />-tengely körüli forgatásával kapott forgásfelületet!</>}>
          <p>
            <M t="\mathbf{r}(x, \theta) = \langle x,\; e^x\cos\theta,\; e^x\sin\theta \rangle" />,{' '}
            <M t="0 \le x \le 1,\; 0 \le \theta \le 2\pi" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Érintővektorok (r_u, r_v), normálvektor és érintősík',
    body: (
      <>
        <p>
          Ha <M t="\mathbf{r}(u, v)" />-t parciálisan deriváljuk <M t="u" /> illetve <M t="v" /> szerint, megkapjuk a
          két paramétervonal érintővektorát: <M t="\mathbf{r}_u" /> és <M t="\mathbf{r}_v" />. Keresztszorzatuk,{' '}
          <M t="\mathbf{r}_u \times \mathbf{r}_v" />, egyszerre adja meg a felület <strong>normálvektorát</strong> és
          a felszínelem <strong>területét</strong>!
        </p>

        <Def title="Sima paraméteres felület, érintősík és felszínelem">
          <ul>
            <li><strong>Sima felület:</strong> <M t="\mathbf{r}_u \times \mathbf{r}_v \neq \mathbf{0}" /> minden pontban.</li>
            <li><strong>Érintősík:</strong> <M t="(\mathbf{r}_u \times \mathbf{r}_v)\cdot(\mathbf{r} - \mathbf{r}(u_0, v_0)) = 0" />.</li>
            <li><strong>Felszínelem:</strong> <M t="d\sigma = |\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv" />.</li>
          </ul>
        </Def>

        <TangentPatchNormal3DWidget />

        <Task n={5} q={<>Számítsd ki az <M t="\mathbf{r}(\phi, \theta) = \langle a\sin\phi\cos\theta,\; a\sin\phi\sin\theta,\; a\cos\phi \rangle" /> gömb <M t="|\mathbf{r}_\phi \times \mathbf{r}_\theta|" /> felszínelem-tényezőjét!</>}>
          <p>
            <M t="\mathbf{r}_\phi = a\langle \cos\phi\cos\theta, \cos\phi\sin\theta, -\sin\phi \rangle" />,{' '}
            <M t="\mathbf{r}_\theta = a\langle -\sin\phi\sin\theta, \sin\phi\cos\theta, 0 \rangle" />.
            Keresztszorzatuk <M t="\mathbf{r}_\phi\times\mathbf{r}_\theta = a^2\sin\phi\langle \sin\phi\cos\theta, \sin\phi\sin\theta, \cos\phi \rangle" />,
            hossza <M t="a^2\sin\phi" />!
          </p>
        </Task>

        <Task n={6} q={<>Írd fel az <M t="\mathbf{r}(u, v) = \langle u\cos v,\; u\sin v,\; v \rangle" /> helikoid érintősíkját az <M t="(u, v) = (1, 0)" /> pontban!</>}>
          <p>
            Pont: <M t="(1; 0; 0)" />. <M t="\mathbf{r}_u(1,0) = \langle 1, 0, 0 \rangle" />,{' '}
            <M t="\mathbf{r}_v(1,0) = \langle 0, 1, 1 \rangle" />, normálvektor{' '}
            <M t="\mathbf{r}_u\times\mathbf{r}_v = \langle 0, -1, 1 \rangle" />. Érintősík: <M t="-y + z = 0 \Rightarrow z = y" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Paraméteres felület felszíne: a tórusz diadala',
    body: (
      <>
        <p>
          Az <M t="\text{Felszín}(S) = \iint_R |\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv" /> képlet erejét semmi sem
          mutatja jobban, mint a tórusz (úszógumi) felszínének 4 soros kiszámítása!
        </p>

        <TorusArea3DWidget />

        <Steps
          title="A tórusz felszínének kiszámítása"
          problem={
            <>
              Számítsd ki az <M t="\mathbf{r}(u, v) = \langle (R + a\cos u)\cos v,\; (R + a\cos u)\sin v,\; a\sin u \rangle" />{' '}
              (<M t="0 \le u, v \le 2\pi,\; R > a" />) tórusz felszínét!
            </>
          }
          steps={[
            {
              title: 'Számítsuk ki r_u-t és r_v-t',
              body: (
                <>
                  <M t="\mathbf{r}_u = \langle -a\sin u\cos v,\; -a\sin u\sin v,\; a\cos u \rangle" /> (hossza <M t="a" />),{' '}
                  <M t="\mathbf{r}_v = \langle -(R+a\cos u)\sin v,\; (R+a\cos u)\cos v,\; 0 \rangle" /> (hossza <M t="R+a\cos u" />).
                </>
              ),
            },
            {
              title: 'Vegyük észre, hogy r_u ⊥ r_v!',
              body: (
                <>
                  Skalárszorzatuk <M t="0" />, ezért <M t="|\mathbf{r}_u \times \mathbf{r}_v| = |\mathbf{r}_u||\mathbf{r}_v| = a(R + a\cos u)" />!
                </>
              ),
            },
            {
              title: 'Integráljunk [0, 2π] × [0, 2π]-n',
              body: (
                <>
                  <M t="\int_0^{2\pi} dv \int_0^{2\pi} a(R + a\cos u)\,du = 2\pi \cdot (2\pi aR + 0) = 4\pi^2 aR" />!
                </>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Vezesd le az <M t="a" /> sugarú gömb felszínét az 5. feladat <M t="|\mathbf{r}_\phi \times \mathbf{r}_\theta| = a^2\sin\phi" /> képletével!</>}>
          <p>
            <M t="\int_0^{2\pi} d\theta \int_0^\pi a^2\sin\phi\,d\phi = 2\pi \cdot 2a^2 = 4\pi a^2" />!
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki a <M t="\mathbf{r}(u, v) = \langle u\cos v,\; u\sin v,\; v \rangle" /> helikoid felszínét <M t="0 \le u \le 1,\; 0 \le v \le 2\pi" /> esetén!</>}>
          <p>
            <M t="|\mathbf{r}_u\times\mathbf{r}_v| = \sqrt{1 + u^2}" />. Így{' '}
            <M t="2\pi\int_0^1 \sqrt{1+u^2}\,du = \pi\big(\sqrt{2} + \ln(1 + \sqrt{2})\big)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Skalárfüggvény integrálása paraméteres felületen',
    body: (
      <>
        <p>
          Egy skalárfüggvény felületi integrálja paraméteres alakban egységesíti az összes 16.5-ös képletet:
        </p>
        <M block t="\iint_S g(x, y, z)\,d\sigma = \iint_R g\big(\mathbf{r}(u, v)\big)\,|\mathbf{r}_u \times \mathbf{r}_v|\,du\,dv." />

        <UnifyExplicitParamWidget />

        <Quiz
          q={<>Mennyi az <M t="a" /> sugarú gömb <M t="d\sigma" /> felszíneleme gömbi paraméterekkel (<M t="\phi, \theta" />)?</>}
          options={[
            { label: <M t="a\,d\phi\,d\theta" /> },
            { label: <M t="a^2\,d\phi\,d\theta" /> },
            { label: <M t="a^2\sin\phi\,d\phi\,d\theta" />, ok: true },
            { label: <M t="a^2\cos\phi\,d\phi\,d\theta" /> },
          ]}
          explain={
            <>
              <M t="|\mathbf{r}_\phi \times \mathbf{r}_\theta| = a^2\sin\phi" />, tehát{' '}
              <M t="d\sigma = a^2\sin\phi\,d\phi\,d\theta" />!
            </>
          }
        />

        <Task n={9} q={<>Számítsd ki az <M t="\iint_S z^2\,d\sigma" /> integrált az <M t="a" /> sugarú teljes gömbön!</>}>
          <p>
            <M t="\int_0^{2\pi} d\theta \int_0^\pi (a^2\cos^2\phi)(a^2\sin\phi)\,d\phi = 2\pi a^4\big[-\frac{\cos^3\phi}{3}\big]_0^\pi = \frac{4\pi a^4}{3}" />.
          </p>
        </Task>

        <Task n={10} q={<>Értékeld ki az <M t="\iint_S z\,d\sigma" /> integrált az <M t="x^2 + y^2 = a^2,\; 0 \le z \le h" /> hengerpaláston!</>}>
          <p>
            <M t="d\sigma = a\,d\theta\,dz \Rightarrow \int_0^{2\pi} d\theta \int_0^h az\,dz = 2\pi a\cdot\frac{h^2}{2} = \pi ah^2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Fluxus paraméteres felületen: ∬ F · (r_u × r_v) du dv',
    body: (
      <>
        <p>
          Ha fluxust számolunk paraméteres felületen, a <M t="\mathbf{n} = \pm\frac{\mathbf{r}_u\times\mathbf{r}_v}{|\mathbf{r}_u\times\mathbf{r}_v|}" />{' '}
          és a <M t="d\sigma = |\mathbf{r}_u\times\mathbf{r}_v|\,du\,dv" /> szorzatából megint{' '}
          <strong>eltűnik a hossztényező</strong>!
        </p>

        <Def title="Fluxus paraméteres felületen">
          <M block t="\iint_S \mathbf{F}\cdot\mathbf{n}\,d\sigma = \pm\iint_R \mathbf{F}\big(\mathbf{r}(u, v)\big)\cdot(\mathbf{r}_u \times \mathbf{r}_v)\,du\,dv." />
        </Def>

        <ParamFluxOrientWidget />

        <Task n={11} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 0, 0, z \rangle" /> mező kifelé fluxusát az <M t="a" /> sugarú gömbön paraméteresen!</>}>
          <p>
            <M t="\mathbf{F}\cdot(\mathbf{r}_\phi\times\mathbf{r}_\theta) = (a\cos\phi)(a^2\sin\phi\cos\phi) = a^3\cos^2\phi\sin\phi" />.
            Integrálva: <M t="2\pi a^3 \cdot \frac{2}{3} = \frac{4\pi a^3}{3}" />!
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki az <M t="\mathbf{F} = \langle y,\; -x,\; 1 \rangle" /> mező felfelé fluxusát a <M t="\mathbf{r}(u, v) = \langle u\cos v, u\sin v, v \rangle" /> (<M t="0\le u\le 1,\; 0\le v\le 2\pi" />) helikoidon!</>}>
          <p>
            <M t="\mathbf{r}_u\times\mathbf{r}_v = \langle \sin v, -\cos v, u \rangle" /> (felfelé, mert <M t="u \ge 0" />).{' '}
            <M t="\mathbf{F}\cdot(\mathbf{r}_u\times\mathbf{r}_v) = u\sin^2 v + u\cos^2 v + u = 2u" />!
            Integrál: <M t="\int_0^{2\pi} dv \int_0^1 2u\,du = 2\pi" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Helikoid és a 3D számítógépes grafika alapjai',
    body: (
      <>
        <p>
          A helikoid (csigalépcső-felület) a természet egyik kedvenc <strong>minimálfelülete</strong> (szappanhártya
          feszül ki rá két csavarvonal közé!). A paraméteres <M t="\mathbf{r}(u, v)" /> leírás egyben minden 3D
          grafikus motor és CAD-rendszer (NURBS, Bézier-felületek) matematikai alapja is.
        </p>

        <Helicoid3DWidget />

        <Quiz
          q={<>Ha egy paraméteres felület fluxusánál <M t="\mathbf{r}_u \times \mathbf{r}_v" /> a kért iránnyal <em>ellentétesen</em> (befelé) mutat, mit kell tennünk?</>}
          options={[
            { label: <>Új paraméterezést kell keresni</> },
            { label: <>Elé teszünk egy mínuszjelet (azaz <M t="\mathbf{r}_v \times \mathbf{r}_u" />-t használjuk)</>, ok: true },
            { label: <>Abszolút értéket veszünk a skalárszorzatból</> },
            { label: <>Nem változtat a fluxus előjelén</> },
          ]}
          explain={
            <>
              <M t="\mathbf{r}_v \times \mathbf{r}_u = -(\mathbf{r}_u \times \mathbf{r}_v)" />, így egyetlen
              előjelváltás azonnal megfordítja a felület orientációját!
            </>
          }
        />

        <Task n={13} q={<>Számítsd ki az <M t="\mathbf{r}(r, \theta) = \langle r\cos\theta,\; r\sin\theta,\; kr \rangle" /> (<M t="0 \le r \le R,\; 0 \le \theta \le 2\pi,\; k > 0" />) kúp felszínét paraméteresen!</>}>
          <p>
            <M t="\mathbf{r}_r\times\mathbf{r}_\theta = \langle -kr\cos\theta, -kr\sin\theta, r \rangle" />, hossza{' '}
            <M t="r\sqrt{1 + k^2}" />. Felszín: <M t="2\pi\sqrt{1+k^2}\int_0^R r\,dr = \pi R^2\sqrt{1+k^2}" />!
          </p>
        </Task>

        <Task n={14} q={<>Miért egyszerűsödik az <M t="\mathbf{r}_u \cdot \mathbf{r}_v = 0" /> (ortogonális paraméterháló) esetén a felszínelem <M t="|\mathbf{r}_u||\mathbf{r}_v|\,du\,dv" />-re?</>}>
          <p>
            Mert <M t="|\mathbf{r}_u\times\mathbf{r}_v| = |\mathbf{r}_u||\mathbf{r}_v|\sin 90^\circ = |\mathbf{r}_u||\mathbf{r}_v|" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglaló mester-képlettár és gyakorlófeladatok',
    body: (
      <>
        <ParamSurfaceMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Milyen felület az <M t="\mathbf{r}(u, v) = \langle 2\cos u,\; 2\sin u,\; v \rangle" /> (<M t="0\le u\le 2\pi,\; 0\le v\le 4" />), és mekkora a felszíne?</>}>
          <p>
            2 sugarú, 4 magas körhenger palástja; <M t="|\mathbf{r}_u\times\mathbf{r}_v| = 2 \Rightarrow \text{Felszín} = 2\cdot 2\pi\cdot 4 = 16\pi" />.
          </p>
        </Task>

        <Task n={16} q={<>Add meg az <M t="\mathbf{r}(u, v) = \langle u,\; v,\; 3u + 4v \rangle" /> sík normálvektorát és <M t="|\mathbf{r}_u\times\mathbf{r}_v|" /> értékét!</>}>
          <p>
            <M t="\mathbf{r}_u\times\mathbf{r}_v = \langle -3, -4, 1 \rangle" />, hossza <M t="\sqrt{26}" />.
          </p>
        </Task>

        <Task n={17} q={<>Paraméterezd az <M t="x^2 + y^2 + z^2 = 25" /> gömböt!</>}>
          <p>
            <M t="\mathbf{r}(\phi, \theta) = \langle 5\sin\phi\cos\theta,\; 5\sin\phi\sin\theta,\; 5\cos\phi \rangle" />{' '}
            (<M t="0\le\phi\le\pi,\; 0\le\theta\le 2\pi" />).
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="R = 5,\; a = 2" /> sugarú tórusz felszínét!</>}>
          <p>
            <M t="4\pi^2 aR = 4\pi^2(2)(5) = 40\pi^2" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\iint_S (x^2 + y^2)\,d\sigma" /> integrált a <M t="2" /> sugarú, <M t="3" /> magas körhenger palástján!</>}>
          <p>
            A paláston <M t="x^2+y^2 = 4" />, <M t="d\sigma = 2\,d\theta\,dz" />:{' '}
            <M t="4 \cdot (2\pi \cdot 2 \cdot 3) = 48\pi" />.
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x, y, 0 \rangle" /> mező kifelé fluxusát a <M t="3" /> sugarú gömbön paraméteresen!</>}>
          <p>
            <M t="\mathbf{F}\cdot(\mathbf{r}_\phi\times\mathbf{r}_\theta) = 3^3\sin^3\phi" />. Integrálva:{' '}
            <M t="2\pi \cdot 27 \cdot \frac{4}{3} = 72\pi" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="a" /> sugarú gömb <M t="\phi_1 \le \phi \le \phi_2" /> gömbövének felszínét, és mutasd meg, hogy csak a <M t="h = a(\cos\phi_1 - \cos\phi_2)" /> magasságtól függ (Arkhimédész tétele)!</>}>
          <p>
            <M t="2\pi a^2 \int_{\phi_1}^{\phi_2} \sin\phi\,d\phi = 2\pi a^2(\cos\phi_1 - \cos\phi_2) = 2\pi a h" />!
            Pontosan annyi, mint az őt körülvevő henger azonos magasságú övének felszíne!
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="\mathbf{r}(u, v) = \langle u\cos v,\; u\sin v,\; u^2 \rangle" /> (<M t="0 \le u \le 1,\; 0 \le v \le 2\pi" />) paraboloidon az <M t="\mathbf{F} = \langle -y, x, z \rangle" /> mező felfelé fluxusát!</>}>
          <p>
            <M t="\mathbf{r}_u\times\mathbf{r}_v = \langle -2u^2\cos v, -2u^2\sin v, u \rangle" /> (felfelé!).{' '}
            <M t="\mathbf{F}\cdot(\mathbf{r}_u\times\mathbf{r}_v) = 2u^3\sin v\cos v - 2u^3\sin v\cos v + u^3 = u^3" />!
            Integrál: <M t="2\pi\int_0^1 u^3\,du = \frac{\pi}{2}" />!
          </p>
        </Task>

        <Task n={23} q={<>Igazold a 4. feladat forgásfelületére (<M t="\mathbf{r}(x, \theta) = \langle x, f(x)\cos\theta, f(x)\sin\theta \rangle" />), hogy <M t="|\mathbf{r}_x \times \mathbf{r}_\theta| = f(x)\sqrt{1 + [f'(x)]^2}" />!</>}>
          <p>
            <M t="\mathbf{r}_x = \langle 1, f'\cos\theta, f'\sin\theta \rangle" />,{' '}
            <M t="\mathbf{r}_\theta = \langle 0, -f\sin\theta, f\cos\theta \rangle" />. Merőlegesek, így{' '}
            <M t="|\mathbf{r}_x\times\mathbf{r}_\theta| = |\mathbf{r}_x||\mathbf{r}_\theta| = \sqrt{1+(f')^2}\cdot f(x)" />!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Mit reprezentál geometriailag az <M t="|\mathbf{r}_u \times \mathbf{r}_v|\,\Delta u\,\Delta v" /> mennyiség egy paraméteres felületen?</>}
          options={[
            { label: <>Az érintősíkban lévő, <M t="\Delta u\,\mathbf{r}_u" /> és <M t="\Delta v\,\mathbf{r}_v" /> által kifeszített elemi paralelogramma területét</>, ok: true },
            { label: 'A felület görbületét' },
            { label: 'A felület alatti térfogatot' },
            { label: 'A paramétervonal hosszát' },
          ]}
          explain={
            <>
              Két vektor vektoriális szorzatának hossza pontosan az általuk kifeszített paralelogramma területe.
            </>
          }
        />
      </>
    ),
  },
];
