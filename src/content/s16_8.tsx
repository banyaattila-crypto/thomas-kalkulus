import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CapTrickClosedDome3DWidget,
  Div3DSourceSinkWidget,
  GaussElectrostaticsShellWidget,
  GaussGrandFinaleDiagram,
  GaussShortcutStepsWidget,
  MaxwellFourEquationsWidget,
  UnifiedFundamentalTheoremsWidget,
  VoxelFluxCancel3DWidget,
} from '../components/Widgets168';
import type { Page } from './s1_1';

export const S16_8: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A 3D divergencia (∇ · F): a térbeli forráserősség',
    body: (
      <>
        <Story>
          <p>
            Elérkeztünk a háromkötetes <em>Thomas-féle Kalkulus</em> <strong>120., utolsó alfejezetéhez</strong>! A
            nagy finálé hőse a <strong>Gauss–Osztrogradszkij-tétel</strong> (divergenciatétel), amely egy zárt 3D
            felületen kiáramló <em>fluxust</em> alakít át a test belsejében vett <em>hármas integrállá</em>!
          </p>
        </Story>

        <Def title="Vektormező 3D divergenciája">
          <p>
            Az <M t="\mathbf{F}(x, y, z) = \langle M, N, P \rangle" /> differenciálható vektormező{' '}
            <strong>divergenciája</strong> egy <em>skalárfüggvény</em>:
          </p>
          <M block t="\operatorname{div}\mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial M}{\partial x} + \frac{\partial N}{\partial y} + \frac{\partial P}{\partial z}." />
          <p>
            <strong>Fizikai jelentés:</strong> az adott pont körüli térfogategységre jutó nettó kiáramlás (forrás{' '}
            <M t="> 0" />, nyelő <M t="< 0" />, összenyomhatatlan áramlás <M t="= 0" />).
          </p>
        </Def>

        <Div3DSourceSinkWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\mathbf{F}(x, y, z) = \langle x^2 y,\; yz^2,\; zx^2 \rangle" /> vektormező divergenciáját!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 2xy + z^2 + x^2" />.
          </p>
        </Task>

        <Task n={2} q={<>Összenyomhatatlan-e (forrásmentes-e) az <M t="\mathbf{F}(x, y, z) = \langle 2x + y,\; -y + z,\; -z + x^2 \rangle" /> áramlás?</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 2 + (-1) + (-1) = 0" /> mindenhol → <strong>igen</strong>,
            forrásmentes!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A Gauss–Osztrogradszkij-tétel (divergenciatétel)',
    body: (
      <>
        <p>
          Ahogy Green tétele a 2D kis cellák élein oltotta ki a belső áramlást, úgy a 3D térben az apró voxelek közös
          falain oltódik ki minden belső fluxus — és csak a külső zárt burok marad!
        </p>

        <Def title="A Gauss–Osztrogradszkij-tétel (divergenciatétel)">
          <p>
            Legyen <M t="D" /> zárt, korlátos 3D test, amelynek határa a szakaszonként sima, zárt,{' '}
            <strong>kifelé irányított</strong> <M t="S = \partial D" /> felület (<M t="\mathbf{n}" /> kifelé mutató
            egységnormális). Ha <M t="\mathbf{F}" /> folytonosan differenciálható <M t="D" /> egy nyílt környezetében:
          </p>
          <M block t="\iint_S \mathbf{F}\cdot\mathbf{n}\,d\sigma = \iiint_D (\nabla\cdot\mathbf{F})\,dV." />
        </Def>

        <VoxelFluxCancel3DWidget />

        <Quiz
          q={<>Mennyi az <M t="\mathbf{F} = \langle x,\; y,\; z \rangle" /> mező kifelé irányuló fluxusa egy tetszőleges, <M t="V = 10" /> térfogatú zárt test felszínén át?</>}
          options={[
            { label: <M t="10" /> },
            { label: <M t="20" /> },
            { label: <M t="30" />, ok: true },
            { label: <>A test alakjától függ</> },
          ]}
          explain={
            <>
              <M t="\operatorname{div}\langle x, y, z \rangle = 1 + 1 + 1 = 3" />, így a Gauss–Osztrogradszkij-tétel
              szerint <M t="\iint_S \mathbf{F}\cdot\mathbf{n}\,d\sigma = \iiint_D 3\,dV = 3V = 30" />!
            </>
          }
        />

        <Task n={3} q={<>Ellenőrizd a 16.5 fejezet zárt hengerének (<M t="x^2+y^2\le 1,\; 0\le z\le 2" />) <M t="6\pi" /> fluxusát <M t="\mathbf{F} = \langle x, y, z \rangle" /> esetén egyetlen sorban!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 3" />, a henger térfogata <M t="V = \pi(1^2)(2) = 2\pi" />, így a
            fluxus <M t="3 \cdot 2\pi = 6\pi" />! (Három külön felület helyett 1 másodperc!)
          </p>
        </Task>

        <Task n={4} q={<>Mennyi az <M t="\mathbf{F} = \langle 2x,\; 3y,\; 4z \rangle" /> mező kifelé fluxusa az <M t="R" /> sugarú gömbön?</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 9 \Rightarrow 9 \cdot \frac{4}{3}\pi R^3 = 12\pi R^3" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Bonyolult felületi fluxus → egyetlen hármas integrál!',
    body: (
      <>
        <p>
          Akárcsak Green tételénél, a Gauss–Osztrogradszkij-tétel is varázsütésre eltünteti a „kevert” szörnyeteg
          tagokat, és 6 kockalap vagy egy teljes gömb helyett egyetlen sima hármas integrált ad!
        </p>

        <GaussShortcutStepsWidget />

        <Steps
          title="Gömb kifelé fluxusa Gauss–Osztrogradszkij-tétellel"
          problem={
            <>
              Számítsd ki az <M t="\mathbf{F} = \langle x^3 + \sin(yz),\; y^3 - e^{xz},\; z^3 + x^2 y \rangle" /> mező
              kifelé irányuló fluxusát az <M t="x^2 + y^2 + z^2 = R^2" /> gömbön!
            </>
          }
          steps={[
            {
              title: 'Számítsuk ki a divergenciát',
              body: (
                <>
                  <M t="\nabla\cdot\mathbf{F} = 3x^2 + 3y^2 + 3z^2 = 3\rho^2" /> (a <M t="\sin(yz), e^{xz}, x^2 y" />{' '}
                  tagok mind kiesnek!).
                </>
              ),
            },
            {
              title: 'Alkalmazzuk a Gauss–Osztrogradszkij-tételt gömbi koordinátákban',
              body: (
                <>
                  <M t="\iiint_D 3\rho^2\,dV = \int_0^{2\pi}\!d\theta \int_0^\pi \sin\phi\,d\phi \int_0^R 3\rho^2\cdot\rho^2\,d\rho" />.
                </>
              ),
            },
            {
              title: 'Értékeljük ki az 1D integrálokat',
              body: (
                <>
                  <M t="4\pi \cdot \Big[\frac{3\rho^5}{5}\Big]_0^R = \dfrac{12\pi}{5}R^5" />!
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x^2,\; y^2,\; z^2 \rangle" /> mező kifelé fluxusát a <M t="[0, 1]^3" /> egységkockán át!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 2x + 2y + 2z" />. Integrálva <M t="[0, 1]^3" />-on:{' '}
            <M t="1 + 1 + 1 = 3" /> (6 lap helyett 1 sor!).
          </p>
        </Task>

        <Task n={6} q={<>Számítsd ki az <M t="\mathbf{F} = \langle xy,\; yz,\; zx \rangle" /> mező kifelé fluxusát az <M t="x^2 + y^2 \le 4,\; 0 \le z \le 3" /> zárt hengeren át!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = y + z + x" />. Szimmetriából <M t="\iiint x\,dV = \iiint y\,dV = 0" />,
            így marad <M t="(4\pi)\int_0^3 z\,dz = 4\pi \cdot \frac{9}{2} = 18\pi" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Nyitott felület lezárása: a „fedőlap-trükk”',
    body: (
      <>
        <p>
          Mi a teendő, ha a feladat <strong>nyitott</strong> felületen (pl. egy alsó lap nélküli paraboloid-kupolán)
          kér fluxust? Ne add fel Gauss tételét! Egyszerűen <strong>zárd le egy lapos fedőlappal</strong> (<M t="S_2" />),
          számold ki a zárt test hármas integrálját, és vond ki a lapos fedőlap kifelé fluxusát!
        </p>

        <CapTrickClosedDome3DWidget />

        <Quiz
          q={<>Egy felfelé irányított, nyitott <M t="z = 4 - x^2 - y^2" /> (<M t="z \ge 0" />) kupolát lezárunk a <M t="z = 0" /> síkbeli körlemezzel (<M t="S_2" />), hogy alkalmazhassuk Gauss tételét. Merre kell mutatnia <M t="S_2" /> normálvektorának?</>}
          options={[
            { label: <>Felfelé (<M t="+\mathbf{k}" />)</> },
            { label: <>Lefelé (<M t="-\mathbf{k}" />), hogy a zárt felület mindenhol kifelé legyen irányítva</>, ok: true },
            { label: <>Mindegy, a fluxus nem függ az iránytól</> },
            { label: <>Radiálisan kifelé az <M t="xy" />-síkban</> },
          ]}
          explain={
            <>
              A zárt test belsejéből <em>kifelé</em> mutató normális az alaplapon <strong>lefelé</strong> (<M t="-\mathbf{k}" />)
              mutat!
            </>
          }
        />

        <Task n={7} q={<>Számítsd ki a fedőlap-trükkel az <M t="\mathbf{F} = \langle x,\; y,\; z^2 \rangle" /> mező felfelé fluxusát a nyitott <M t="z = 1 - x^2 - y^2" /> (<M t="z \ge 0" />) paraboloidon!</>}>
          <p>
            Az <M t="S_2" /> (<M t="z = 0,\; \mathbf{n} = -\mathbf{k}" />) alaplapon <M t="\mathbf{F}\cdot(-\mathbf{k}) = -z^2 = 0" />!
            Így <M t="\text{Flux}(S_1) = \iiint_D (2 + 2z)\,dV = 2\pi\int_0^1 r\big[2(1-r^2) + (1-r^2)^2\big]\,dr = \pi\int_0^1 (2u + u^2)\,du = \frac{4\pi}{3}" />!
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 2x,\; y,\; z \rangle" /> mező kifelé fluxusát a <M t="[0, 1]^3" /> kocka felső és oldalsó 5 lapján (az alsó <M t="z = 0" /> lap hiányzik)!</>}>
          <p>
            Az alsó <M t="z = 0" /> lapon <M t="\mathbf{F}\cdot(-\mathbf{k}) = -z = 0" />! A teljes zárt kockán{' '}
            <M t="\operatorname{div}\mathbf{F} = 4 \Rightarrow 4\cdot 1 = 4" />, így az 5 lap fluxusa pontosan{' '}
            <M t="4 - 0 = 4" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Üreges testek és Gauss törvénye az elektrosztatikában',
    body: (
      <>
        <p>
          Az origóban lévő <M t="+q" /> ponttöltés <M t="\mathbf{E} = \frac{q}{4\pi\varepsilon_0}\frac{\mathbf{r}}{r^3}" />{' '}
          elektromos mezeje szinguláris az origóban (<M t="r = 0" />), de <strong>mindenhol máshol <M t="\operatorname{div}\mathbf{E} = 0" /></strong>!
          A Gauss–Osztrogradszkij-tételt az üreges héjra alkalmazva bebizonyítottuk a fizika egyik alaptörvényét:
        </p>

        <GaussElectrostaticsShellWidget />

        <Task n={9} q={<>Mennyi az <M t="\mathbf{F} = \dfrac{\mathbf{r}}{|\mathbf{r}|^3}" /> mező kifelé fluxusa az origót magába foglaló <M t="[-2, 2]^3" /> kocka felszínén át?</>}>
          <p>
            Mivel a kocka körülveszi az origót, a fluxus megegyezik az egységgömb fluxusával: pontosan <M t="4\pi" />!
          </p>
        </Task>

        <Task n={10} q={<>Mennyi ugyanennek a mezőnek a fluxusa az <M t="(x - 5)^2 + y^2 + z^2 = 1" /> gömbön át?</>}>
          <p>
            Ez a gömb <em>nem</em> tartalmazza az origót, a belsejében <M t="\operatorname{div}\mathbf{F} = 0" /> sima,
            így a Gauss–Osztrogradszkij-tétel alapján a fluxus <M t="0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'A 4 Maxwell-egyenlet és a fizika megmaradási törvényei',
    body: (
      <>
        <p>
          A 16.7 és 16.8 fejezet két nagy tétele (Stokes és Gauss) nem csupán matematikai ékszerek: őrájuk épül az
          egész elektrodinamika (<strong>Maxwell-egyenletek</strong>), az áramlástan (<strong>kontinuitási egyenlet</strong>)
          és a <strong>hővezetési egyenlet</strong> is!
        </p>

        <MaxwellFourEquationsWidget />

        <Task n={11} q={<>Mit jelent fizikailag a II. Maxwell-egyenlet (<M t="\nabla\cdot\mathbf{B} = 0" />) a Gauss–Osztrogradszkij-tétel nyelvén?</>}>
          <p>
            Bármely zárt felületen a mágneses fluxus <M t="\iint_S \mathbf{B}\cdot\mathbf{n}\,d\sigma = 0" /> — vagyis
            ahány mágneses erővonal belép egy tartományba, pontosan annyi ki is lép: <strong>nem léteznek mágneses
            monopólusok</strong>!
          </p>
        </Task>

        <Task n={12} q={<>Igazold Green első azonosságát: <M t="\iint_S u(\nabla v\cdot\mathbf{n})\,d\sigma = \iiint_D (u\nabla^2 v + \nabla u\cdot\nabla v)\,dV" />!</>}>
          <p>
            Alkalmazzuk a Gauss–Osztrogradszkij-tételt az <M t="\mathbf{F} = u\,\nabla v" /> mezőre! A szorzatszabállyal{' '}
            <M t="\nabla\cdot(u\nabla v) = \nabla u\cdot\nabla v + u(\nabla\cdot\nabla v) = \nabla u\cdot\nabla v + u\nabla^2 v" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'A NAGY EGYESÍTÉS: a kalkulus 4 alaptétele',
    body: (
      <>
        <p>
          Nézz vissza az I. kötettől (5.4 fejezet) idáig megtett útra! Mind a négy nagy alaptétel — Newton–Leibniz, a
          vonalintegrálok alaptétele, Green/Stokes és Gauss–Osztrogradszkij — <strong>egy és ugyanaz a mély igazság</strong>{' '}
          1, 2 és 3 dimenzióban!
        </p>

        <UnifiedFundamentalTheoremsWidget />

        <Warn>
          A felsőbb differenciálgeometriában mind a négy tétel egyetlen sorba sűrűsödik (<strong>általánosított
          Stokes-tétel</strong>): <M t="\int_M d\omega = \int_{\partial M} \omega" />!
        </Warn>

        <Quiz
          q={<>Melyik tétel köti össze egy 3D test (<M t="D" />) belsejében vett hármas integrált a zárt felszínén (<M t="\partial D" />) vett fluxussal?</>}
          options={[
            { label: <>A vonalintegrálok alaptétele (16.3)</> },
            { label: <>Green-tétel (16.4)</> },
            { label: <>Stokes-tétel (16.7)</> },
            { label: <>A Gauss–Osztrogradszkij-tétel (16.8)</>, ok: true },
          ]}
          explain={
            <>
              <M t="\iiint_D (\nabla\cdot\mathbf{F})\,dV = \iint_{\partial D} \mathbf{F}\cdot\mathbf{n}\,d\sigma" /> —
              ez a 3D divergenciatétel (Gauss–Osztrogradszkij-tétel)!
            </>
          }
        />

        <Task n={13} q={<>Mutasd meg, hogy bármely <M t="D" /> test térfogata kiszámítható pusztán a felszínén vett fluxussal: <M t="V(D) = \dfrac{1}{3}\iint_{\partial D} \mathbf{r}\cdot\mathbf{n}\,d\sigma" />!</>}>
          <p>
            Mivel <M t="\nabla\cdot\mathbf{r} = \nabla\cdot\langle x, y, z \rangle = 3" />, Gauss tétele alapján{' '}
            <M t="\iint_{\partial D} \mathbf{r}\cdot\mathbf{n}\,d\sigma = \iiint_D 3\,dV = 3V(D)" /> — 3-mal osztva
            készen vagyunk!
          </p>
        </Task>

        <Task n={14} q={<>Bizonyítsd be két sorban a Gauss–Osztrogradszkij-tétellel, hogy bármely zárt <M t="S" /> felületen <M t="\iint_S (\nabla\times\mathbf{G})\cdot\mathbf{n}\,d\sigma = 0" />!</>}>
          <p>
            <M t="\iint_S (\nabla\times\mathbf{G})\cdot\mathbf{n}\,d\sigma = \iiint_D \nabla\cdot(\nabla\times\mathbf{G})\,dV = \iiint_D 0\,dV = 0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Záró mester-képlettár (120/120!) és gyakorlófeladatok',
    body: (
      <>
        <GaussGrandFinaleDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 4x,\; -2y,\; 7z \rangle" /> mező divergenciáját!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 4 - 2 + 7 = 9" />.
          </p>
        </Task>

        <Task n={16} q={<>Mennyi a 15. feladat mezőjének kifelé fluxusa egy <M t="V = 5" /> térfogatú zárt test felszínén át?</>}>
          <p>
            <M t="9 \cdot 5 = 45" />.
          </p>
        </Task>

        <Task n={17} q={<>Mennyi az <M t="\mathbf{F} = \langle \sin y,\; e^z,\; x^3 \rangle" /> mező kifelé fluxusa bármely zárt felületen át?</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 0 + 0 + 0 = 0 \Rightarrow \text{Fluxus} = 0" />!
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x^3,\; y^3,\; z^3 \rangle" /> mező kifelé fluxusát az egységgömbön (<M t="R = 1" />)!</>}>
          <p>
            A 3. oldal képletével <M t="R = 1" />-re: <M t="\frac{12\pi}{5}" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 2xz,\; yz,\; z^2 \rangle" /> mező kifelé fluxusát a <M t="[0, 1]\times[0, 2]\times[0, 3]" /> téglatesten át!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 2z + z + 2z = 5z" />. Integrálva:{' '}
            <M t="(1\cdot 2)\int_0^3 5z\,dz = 2\cdot \frac{45}{2} = 45" />.
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x^2,\; -2xy,\; 3xz \rangle" /> mező kifelé fluxusát az <M t="x^2 + y^2 + z^2 \le 4,\; x \ge 0" /> jobb félgömbön!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 2x - 2x + 3x = 3x" />. Gömbi koordinátákban (<M t="-\frac{\pi}{2}\le\theta\le\frac{\pi}{2}" />):{' '}
            <M t="3\int_{-\pi/2}^{\pi/2}\cos\theta\,d\theta \int_0^\pi \sin^2\phi\,d\phi \int_0^2 \rho^3\,d\rho = 3\cdot 2\cdot \frac{\pi}{2}\cdot 4 = 12\pi" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki a fedőlap-trükkel az <M t="\mathbf{F} = \langle x + y^2,\; y - z^2,\; 2z + x^2 \rangle" /> mező felfelé fluxusát a nyitott <M t="z = \sqrt{4 - x^2 - y^2}" /> félgömbön!</>}>
          <p>
            <M t="\operatorname{div}\mathbf{F} = 4" />, a félgömb térfogata <M t="\frac{16\pi}{3}" />, így a zárt fluxus{' '}
            <M t="\frac{64\pi}{3}" />. A <M t="z = 0" /> alaplapon (<M t="\mathbf{n} = -\mathbf{k}" />):{' '}
            <M t="\mathbf{F}\cdot(-\mathbf{k}) = -x^2" />, integrálja az <M t="R = 2" /> körlemezen{' '}
            <M t="-\frac{1}{2}\cdot 2\pi\int_0^2 r^3\,dr = -4\pi" />. Kivonva:{' '}
            <M t="\frac{64\pi}{3} - (-4\pi) = \frac{76\pi}{3}" />!
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x(x^2+y^2+z^2),\; y(x^2+y^2+z^2),\; z(x^2+y^2+z^2) \rangle" /> mező kifelé fluxusát az <M t="R" /> sugarú gömbön!</>}>
          <p>
            Közvetlenül a gömbön <M t="\mathbf{F} = R^2\mathbf{r} \Rightarrow \mathbf{F}\cdot\mathbf{n} = R^3 \Rightarrow 4\pi R^5" />!
            (Ellenőrzés Gauss-tétellel: <M t="\operatorname{div}(\rho^2\mathbf{r}) = 5\rho^2 \Rightarrow 4\pi\int_0^R 5\rho^4\,d\rho = 4\pi R^5" />!)
          </p>
        </Task>

        <Task n={23} q={<>Igazold, hogy egy állandó <M t="\mathbf{c}" /> vektorra és sima <M t="f" /> skalármezőre <M t="\iint_S f\,(\mathbf{c}\cdot\mathbf{n})\,d\sigma = \mathbf{c}\cdot\iiint_D \nabla f\,dV" /> (amiből <M t="\iint_S f\,\mathbf{n}\,d\sigma = \iiint_D \nabla f\,dV" /> következik)!</>}>
          <p>
            Alkalmazzuk a Gauss–Osztrogradszkij-tételt az <M t="\mathbf{F} = f\,\mathbf{c}" /> mezőre:{' '}
            <M t="\nabla\cdot(f\,\mathbf{c}) = \nabla f\cdot\mathbf{c} + f(\nabla\cdot\mathbf{c}) = \mathbf{c}\cdot\nabla f" />!
            (Gratulálunk — ezzel befejezted a teljes 120 szakaszos <em>Thomas-féle Kalkulus</em> tananyagot!)
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Mi a <M t="\nabla\cdot(\nabla\times\mathbf{G})" /> (egy rotáció divergenciájának) értéke bármely kétszer folytonosan differenciálható <M t="\mathbf{G}" /> vektormezőre?</>}
          options={[
            { label: <>Mindig <M t="0" /></>, ok: true },
            { label: <>Mindig <M t="1" /></> },
            { label: <><M t="|\mathbf{G}|" /></> },
            { label: <><M t="\nabla^2\mathbf{G}" /></> },
          ]}
          explain={
            <>
              A vegyes parciális deriváltak felcserélhetősége (Clairaut-tétel) miatt minden tag páronként kiejti egymást:{' '}
              <M t="\operatorname{div}(\operatorname{rot}\mathbf{G}) \equiv 0" />.
            </>
          }
        />
      </>
    ),
  },
];
