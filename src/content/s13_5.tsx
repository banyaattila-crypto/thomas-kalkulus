import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AccelDecompositionWidget,
  CoasterGForceWidget,
  FrenetFrame3DWidget,
  FrenetSerretMatrixDiagram,
  ThreePlanes3DWidget,
  TorsionDeterminantWidget,
  TorsionFrenetMapDiagram,
  TorsionHelix3DWidget,
} from '../components/Widgets135';
import type { Page } from './s1_1';

export const S13_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A normált binormális vektor B és a Frenet-triéder',
    body: (
      <>
        <Story>
          <p>
            Egy műrepülő pilóta számára nem az észak–kelet–fel koordináták a legfontosabbak, hanem a saját gépe körüli
            három merőleges irány: <strong>előre</strong> (<M t="\mathbf{T}" />), <strong>a kanyar közepe felé</strong>{' '}
            (<M t="\mathbf{N}" />), és <strong>a kettőre merőlegesen „felfelé”</strong> (<M t="\mathbf{B}" />). Ez a
            három egységvektor alkotja a térgörbék legfontosabb eszközét: a <strong>Frenet-féle TNB triédert</strong>!
          </p>
        </Story>

        <Def title="A normált binormális vektor B">
          <M block t="\mathbf{B}(t) = \mathbf{T}(t) \times \mathbf{N}(t)." />
          <p>
            Mivel <M t="\mathbf{T}" /> és <M t="\mathbf{N}" /> merőleges egységvektorok, <M t="\mathbf{B}" /> is{' '}
            <strong>egységvektor</strong>, amely merőleges mindkettőre (tehát a simulósík normálvektora!). A{' '}
            <M t="\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}" /> hármas <strong>jobbsodrású ortonormált bázis</strong>:
          </p>
          <M block t="\mathbf{T} \times \mathbf{N} = \mathbf{B}, \qquad \mathbf{N} \times \mathbf{B} = \mathbf{T}, \qquad \mathbf{B} \times \mathbf{T} = \mathbf{N}." />
        </Def>

        <FrenetFrame3DWidget />

        <Task n={1} q={<>Számítsd ki a <M t="\mathbf{B}(t)" /> normált binormális vektort az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonalon!</>}>
          <p>
            A 13.4 fejezetből <M t="\mathbf{T}(t) = \frac{1}{5}\langle -3\sin t,\; 3\cos t,\; 4 \rangle" /> és{' '}
            <M t="\mathbf{N}(t) = \langle -\cos t,\; -\sin t,\; 0 \rangle" />. Vektoriális szorzatuk:{' '}
            <M t="\mathbf{B}(t) = \mathbf{T}\times\mathbf{N} = \frac{1}{5}\langle 4\sin t,\; -4\cos t,\; 3 \rangle" />.
          </p>
        </Task>

        <Task n={2} q={<>Ellenőrizd az 1. feladat <M t="\mathbf{B}(t)" /> vektorán, hogy <M t="|\mathbf{B}(t)| = 1" /> és <M t="\mathbf{B}(t)\cdot\mathbf{T}(t) = 0" />!</>}>
          <p>
            <M t="|\mathbf{B}|^2 = \frac{1}{25}(16\sin^2 t + 16\cos^2 t + 9) = \frac{25}{25} = 1" />, és{' '}
            <M t="\mathbf{B}\cdot\mathbf{T} = \frac{1}{25}(-12\sin^2 t - 12\cos^2 t + 12) = 0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Mi a torzió (τ)? — Kicsavarodás a síkból',
    body: (
      <>
        <p>
          Ha egy görbe egyetlen síkban fekszik, a simulósíkja nem változik, így a normálvektora (<M t="\mathbf{B}" />)
          állandó: <M t="\frac{d\mathbf{B}}{ds} = \mathbf{0}" />. Ha viszont a görbe <em>kicsavarodik a síkjából</em>,
          akkor <M t="\mathbf{B}" /> elfordul! Méghozzá mindig <M t="\mathbf{N}" /> irányában, mert{' '}
          <M t="\frac{d\mathbf{B}}{ds}" /> merőleges mind <M t="\mathbf{B}" />-re, mind <M t="\mathbf{T}" />-re!
        </p>

        <Def title="A görbe torziója (csavarodása) τ">
          <M block t="\frac{d\mathbf{B}}{ds} = -\tau\,\mathbf{N} \qquad \Longleftrightarrow \qquad \tau = -\frac{d\mathbf{B}}{ds}\cdot\mathbf{N}." />
          <p>
            A görbülettel (<M t="\kappa \ge 0" />) ellentétben a <strong>torzió előjeles szám</strong>:
          </p>
          <ul>
            <li><M t="\tau \equiv 0" />: a görbe <strong>síkgörbe</strong> (egy síkban fekszik).</li>
            <li><M t="\tau > 0" />: <strong>jobbsodrású</strong> csavarodás (mint egy normál csavar menete).</li>
            <li><M t="\tau < 0" />: <strong>balsodrású</strong> csavarodás.</li>
          </ul>
        </Def>

        <TorsionHelix3DWidget />

        <Quiz
          q={<>Melyik állítás igaz egy sima térgörbe torziójára (<M t="\tau" />)?</>}
          options={[
            { label: <>A torzió mindig nemnegatív (<M t="\tau \ge 0" />)</> },
            { label: <>Ha <M t="\tau(t) = 0" /> minden <M t="t" />-re (és <M t="\kappa > 0" />), akkor a görbe síkgörbe</>, ok: true },
            { label: <>A torzió a sebességnagyság deriváltja</> },
            { label: <>Egy csavarvonal torziója mindig 0</> },
          ]}
          explain={
            <>
              Ha <M t="\tau \equiv 0" />, akkor <M t="d\mathbf{B}/ds = \mathbf{0}" />, tehát <M t="\mathbf{B}" />{' '}
              állandó — a görbe végig ugyanabban a <M t="\mathbf{B}" />-re merőleges síkban marad!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki az 1. feladat <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonalának torzióját a definícióból (<M t="\tau = -\frac{d\mathbf{B}}{ds}\cdot\mathbf{N}" />)!</>}>
          <p>
            <M t="\mathbf{B}'(t) = \frac{4}{5}\langle \cos t, \sin t, 0 \rangle" />, <M t="ds/dt = 5" />, így{' '}
            <M t="\frac{d\mathbf{B}}{ds} = \frac{4}{25}\langle \cos t, \sin t, 0 \rangle = -\frac{4}{25}\mathbf{N}(t)" />.
            Tehát <M t="\tau = \dfrac{4}{25}" /> (valóban <M t="\frac{b}{a^2+b^2} = \frac{4}{9+16}" />!).
          </p>
        </Task>

        <Task n={4} q={<>Mennyi az <M t="\mathbf{r}(t) = \langle 2\cos t,\; 2\sin t,\; -2t \rangle" /> balsodrású csavarvonal görbülete és torziója?</>}>
          <p>
            <M t="a = 2,\; b = -2" />, tehát <M t="\kappa = \frac{2}{4+4} = \frac{1}{4}" /> és{' '}
            <M t="\tau = \frac{-2}{4+4} = -\frac{1}{4}" /> (negatív a balsodrás miatt!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A 3D determinánsos torzióképlet',
    body: (
      <>
        <p>
          Általános térgörbénél a <M t="\mathbf{B}'(t)" /> kézi kiszámítása hosszadalmas. A keresztszorzatos
          görbületképlet párja a <strong>vegyes szorzatos (determinánsos) torzióképlet</strong>, amely közvetlenül{' '}
          <M t="\mathbf{r}', \mathbf{r}'', \mathbf{r}'''" />-ből dolgozik!
        </p>

        <Def title="Torzió közvetlen 3D képlete">
          <M block t="\tau(t) = \frac{(\mathbf{v}(t) \times \mathbf{a}(t)) \cdot \mathbf{r}'''(t)}{|\mathbf{v}(t) \times \mathbf{a}(t)|^2} = \frac{\det\big[\mathbf{r}'(t),\; \mathbf{r}''(t),\; \mathbf{r}'''(t)\big]}{|\mathbf{r}'(t) \times \mathbf{r}''(t)|^2}." />
        </Def>

        <TorsionDeterminantWidget />

        <Steps
          title="A térbeli köbös görbe torziójának kiszámítása"
          problem={
            <>
              Határozd meg az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> görbe <M t="\tau(t)" />{' '}
              torzióját általánosan, valamint <M t="t = 0" /> és <M t="t = 1" /> esetén!
            </>
          }
          steps={[
            {
              title: 'Számítsuk ki az első három deriváltat',
              body: (
                <>
                  <M t="\mathbf{r}'(t) = \langle 1, 2t, 3t^2 \rangle" />,{' '}
                  <M t="\mathbf{r}''(t) = \langle 0, 2, 6t \rangle" />,{' '}
                  <M t="\mathbf{r}'''(t) = \langle 0, 0, 6 \rangle" />.
                </>
              ),
            },
            {
              title: 'Vektoriális szorzat és négyzete',
              body: (
                <>
                  <M t="\mathbf{r}'\times\mathbf{r}'' = \langle 6t^2,\; -6t,\; 2 \rangle" />, hossznégyzete:{' '}
                  <M t="|\mathbf{r}'\times\mathbf{r}''|^2 = 36t^4 + 36t^2 + 4" />.
                </>
              ),
            },
            {
              title: 'Vegyes szorzat a számlálóban',
              body: (
                <>
                  <M t="(\mathbf{r}'\times\mathbf{r}'')\cdot\mathbf{r}''' = 6t^2\cdot 0 + (-6t)\cdot 0 + 2\cdot 6 = 12" />.
                </>
              ),
            },
            {
              title: 'Hányados és helyettesítés',
              body: (
                <>
                  <M t="\tau(t) = \dfrac{12}{36t^4 + 36t^2 + 4} = \dfrac{3}{9t^4 + 9t^2 + 1}" />. Így{' '}
                  <M t="\tau(0) = 3" /> és <M t="\tau(1) = \dfrac{3}{19}" />.
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; \frac{2}{3}t^3 \rangle" /> görbe torzióját <M t="t = 1" />-nél!</>}>
          <p>
            <M t="\mathbf{v}(1) = \langle 1, 2, 2 \rangle" />, <M t="\mathbf{a}(1) = \langle 0, 2, 4 \rangle" />,{' '}
            <M t="\mathbf{r}'''(1) = \langle 0, 0, 4 \rangle" />. <M t="\mathbf{v}\times\mathbf{a} = \langle 4, -4, 2 \rangle" />,
            hossznégyzete <M t="36" />, vegyes szorzat <M t="2\cdot 4 = 8" />. Tehát{' '}
            <M t="\tau(1) = \frac{8}{36} = \frac{2}{9}" />! (Érdekesség: itt <M t="\kappa(1) = \tau(1) = \frac{2}{9}" />!)
          </p>
        </Task>

        <Task n={6} q={<>Miért nulla a torziója minden olyan görbének, amely az <M t="x + 2y - z = 5" /> síkban fekszik?</>}>
          <p>
            Mert az <M t="\mathbf{n} = \langle 1, 2, -1 \rangle" /> síknormálisra <M t="\mathbf{r}'\cdot\mathbf{n} = \mathbf{r}''\cdot\mathbf{n} = \mathbf{r}'''\cdot\mathbf{n} = 0" />.
            A három derivált egy síkban (komplanáris) van, így a vegyes szorzatuk <M t="0 \Rightarrow \tau = 0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A gyorsulás érintőleges és normális összetevői',
    body: (
      <>
        <p>
          Egy kanyarodó, közben gyorsító vagy fékező jármű gyorsulása két független hatás összege: a <em>tempó</em>{' '}
          változásáé (<M t="\mathbf{T}" /> irányban) és az <em>irány</em> változásáé (<M t="\mathbf{N}" /> irányban)!
          Deriváljuk a <M t="\mathbf{v} = \frac{ds}{dt}\mathbf{T}" /> képletet:
        </p>

        <Def title="A gyorsulás tangenciális–normális felbontása">
          <M block t="\mathbf{a}(t) = a_T\,\mathbf{T} + a_N\,\mathbf{N}, \qquad\text{ahol}\qquad a_T = \frac{d^2s}{dt^2} = \frac{d}{dt}|\mathbf{v}|, \quad a_N = \kappa\left(\frac{ds}{dt}\right)^2 = \kappa|\mathbf{v}|^2." />
          <p>
            <strong>Villámgyors számítási képletek (<M t="\mathbf{N}" /> nélkül!):</strong>
          </p>
          <M block t="a_T = \frac{\mathbf{v}\cdot\mathbf{a}}{|\mathbf{v}|}, \qquad a_N = \sqrt{|\mathbf{a}|^2 - a_T^2} = \frac{|\mathbf{v}\times\mathbf{a}|}{|\mathbf{v}|}." />
        </Def>

        <AccelDecompositionWidget />

        <Warn>
          Figyeld meg a csodát: a képletben <strong>egyáltalán nem szerepel <M t="\mathbf{B}" /></strong>! Vagyis egy
          mozgó test gyorsulásvektora <em>minden pillanatban a simulósíkban fekszik</em> (<M t="\mathbf{a}\cdot\mathbf{B} = 0" />).
          Továbbá <M t="a_T" /> lehet negatív is (fékezés), míg <M t="a_N \ge 0" /> mindig nemnegatív!
        </Warn>

        <Task n={7} q={<>Számítsd ki <M t="a_T" /> és <M t="a_N" /> értékét az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> pályán a <M t="t = 1" /> pillanatban!</>}>
          <p>
            <M t="\mathbf{v}(1) = \langle 1, 2, 3 \rangle" /> (<M t="|\mathbf{v}| = \sqrt{14}" />),{' '}
            <M t="\mathbf{a}(1) = \langle 0, 2, 6 \rangle" /> (<M t="|\mathbf{a}|^2 = 40" />). Így{' '}
            <M t="a_T = \frac{0+4+18}{\sqrt{14}} = \frac{22}{\sqrt{14}}" /> és{' '}
            <M t="a_N = \sqrt{40 - \frac{484}{14}} = \sqrt{\frac{76}{14}} = \sqrt{\frac{38}{7}}" />.
          </p>
        </Task>

        <Task n={8} q={<>Ha egy részecske <M t="t_0" />-ban <M t="a_T = -3\text{ m/s}^2" /> és <M t="a_N = 4\text{ m/s}^2" /> összetevőkkel mozog, mekkora a gyorsulásának nagysága, és gyorsul vagy lassul a tempója?</>}>
          <p>
            <M t="|\mathbf{a}| = \sqrt{(-3)^2 + 4^2} = 5\text{ m/s}^2" />. Mivel <M t="a_T < 0" />, a részecske{' '}
            <strong>lassul (fékez)</strong> kanyarodás közben!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A Frenet–Serret-egyenletek',
    body: (
      <>
        <p>
          A térgörbék differenciálgeometriájának koronája a <strong>Frenet–Serret-egyenletrendszer</strong>, amely
          egyetlen elegáns, ferdeszimmetrikus rendszerben adja meg mindhárom bázisvektor (<M t="\mathbf{T}, \mathbf{N}, \mathbf{B}" />)
          ívhossz szerinti deriváltját!
        </p>

        <FrenetSerretMatrixDiagram />

        <Quiz
          q={<>Melyik összetevője <em>mindig nulla</em> egy tetszőleges sima térgörbe mentén mozgó test <M t="\mathbf{a}(t)" /> gyorsulásvektorának a <M t="\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}" /> bázisban?</>}
          options={[
            { label: <>Az érintőleges <M t="a_T" /> összetevő</> },
            { label: <>A normális <M t="a_N" /> összetevő</> },
            { label: <>A binormális <M t="a_B" /> összetevő</>, ok: true },
            { label: <>Egyik sem mindig nulla</> },
          ]}
          explain={
            <>
              Mivel <M t="\mathbf{a} = a_T\mathbf{T} + a_N\mathbf{N} + 0\,\mathbf{B}" />, a gyorsulás mindig a{' '}
              <M t="\mathbf{T}" />–<M t="\mathbf{N}" /> simulósíkban marad, tehát <M t="a_B = \mathbf{a}\cdot\mathbf{B} = 0" />!
            </>
          }
        />

        <Task n={9} q={<>Igazold a <M t="d\mathbf{N}/ds = -\kappa\mathbf{T} + \tau\mathbf{B}" /> egyenletet a <M t="\mathbf{N} = \mathbf{B}\times\mathbf{T}" /> azonosság deriválásával!</>}>
          <p>
            Szorzatszabállyal:{' '}
            <M t="\frac{d\mathbf{N}}{ds} = \frac{d\mathbf{B}}{ds}\times\mathbf{T} + \mathbf{B}\times\frac{d\mathbf{T}}{ds} = (-\tau\mathbf{N})\times\mathbf{T} + \mathbf{B}\times(\kappa\mathbf{N}) = \tau\mathbf{B} - \kappa\mathbf{T}" />!
          </p>
        </Task>

        <Task n={10} q={<>Egy pont <M t="R" /> sugarú körpályán mozog gyorsulva: <M t="\mathbf{r}(t) = \langle R\cos(t^2),\; R\sin(t^2) \rangle" /> (<M t="t > 0" />). Add meg <M t="a_T" /> és <M t="a_N" /> értékét!</>}>
          <p>
            <M t="|\mathbf{v}(t)| = 2Rt" />, tehát <M t="a_T = \frac{d}{dt}(2Rt) = 2R" />. Mivel a kör görbülete{' '}
            <M t="\kappa = \frac{1}{R}" />, a normális gyorsulás <M t="a_N = \frac{1}{R}(2Rt)^2 = 4Rt^2" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'A három nevezetes sík egy térgörbe pontjában',
    body: (
      <>
        <p>
          A <M t="\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}" /> ortonormált bázis minden pontban három egymásra páronként
          merőleges síkot határoz meg — mindegyiknek pontosan a harmadik vektor a normálvektora!
        </p>

        <ThreePlanes3DWidget />

        <Task n={11} q={<>Írd fel az <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle" /> csavarvonal simuló-, normál- és egyenesítő síkját a <M t="t = 0" /> (<M t="(1; 0; 0)" />) pontban!</>}>
          <p>
            <M t="t = 0" />-nál: <M t="\mathbf{T} = \frac{1}{\sqrt{2}}\langle 0, 1, 1 \rangle" />,{' '}
            <M t="\mathbf{N} = \langle -1, 0, 0 \rangle" />, <M t="\mathbf{B} = \frac{1}{\sqrt{2}}\langle 0, -1, 1 \rangle" />.
          </p>
          <ul>
            <li><strong>Simulósík</strong> (<M t="\perp\mathbf{B}" />): <M t="-y + z = 0 \Rightarrow z = y" />.</li>
            <li><strong>Normálsík</strong> (<M t="\perp\mathbf{T}" />): <M t="y + z = 0 \Rightarrow z = -y" />.</li>
            <li><strong>Egyenesítő sík</strong> (<M t="\perp\mathbf{N}" />): <M t="x = 1" />.</li>
          </ul>
        </Task>

        <Task n={12} q={<>Melyik síkban fekszik mindig a gyorsulásvektor <M t="\mathbf{a}(t_0)" /> és a sebességvektor <M t="\mathbf{v}(t_0)" /> is?</>}>
          <p>
            A <strong>simulósíkban</strong> (oszkulációs síkban), hiszen <M t="\mathbf{v}" /> párhuzamos{' '}
            <M t="\mathbf{T}" />-vel, <M t="\mathbf{a}" /> pedig <M t="\mathbf{T}" /> és <M t="\mathbf{N}" /> lineáris
            kombinációja!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Hullámvasutak, űrhajók és a TNB keret a gyakorlatban',
    body: (
      <>
        <p>
          A hullámvasút-tervezők és az űrhajózási mérnökök nap mint nap a TNB keretben gondolkodnak: az utas
          kényelmét és biztonságát közvetlenül az <M t="a_T" />, <M t="a_N" /> értékek és a sín <M t="\tau" />{' '}
          csavarodása határozza meg!
        </p>

        <CoasterGForceWidget />

        <Quiz
          q={<>Egy test gyorsulásának nagysága <M t="|\mathbf{a}| = 10\text{ m/s}^2" />, érintőleges gyorsulása <M t="a_T = -6\text{ m/s}^2" />. Mennyi a normális gyorsulása (<M t="a_N" />)?</>}
          options={[
            { label: <M t="4\text{ m/s}^2" /> },
            { label: <M t="8\text{ m/s}^2" />, ok: true },
            { label: <M t="-8\text{ m/s}^2" /> },
            { label: <M t="16\text{ m/s}^2" /> },
          ]}
          explain={
            <>
              Pitagorasz-tétellel <M t="a_N = \sqrt{|\mathbf{a}|^2 - a_T^2} = \sqrt{100 - 36} = \sqrt{64} = 8\text{ m/s}^2" />{' '}
              (és <M t="a_N \ge 0" />).
            </>
          }
        />

        <Task n={13} q={<>Egy űrszonda állandó <M t="10\text{ m/s}" /> sebességnagysággal halad egy pályán, és a gyorsulásának nagysága egy pontban <M t="|\mathbf{a}| = 5\text{ m/s}^2" />. Mekkora itt a pálya görbülete és görbületi sugara?</>}>
          <p>
            Állandó sebességnagyságnál <M t="a_T = 0" />, így <M t="a_N = |\mathbf{a}| = 5 = \kappa|\mathbf{v}|^2 = 100\kappa" />.
            Tehát <M t="\kappa = \frac{5}{100} = 0{,}05\text{ m}^{-1}" /> és <M t="\rho = 20\text{ m}" />.
          </p>
        </Task>

        <Task n={14} q={<>Igaz-e, hogy ha egy mozgás során <M t="a_N \equiv 0" />, akkor a pálya egyenes?</>}>
          <p>
            Ha <M t="|\mathbf{v}| > 0" />, akkor <M t="a_N = \kappa|\mathbf{v}|^2 = 0 \Rightarrow \kappa \equiv 0" />,
            ami pontosan azt jelenti, hogy <M t="\mathbf{T}" /> állandó — tehát a pálya valóban <strong>egyenes</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglaló képlettár és gyakorlófeladatok',
    body: (
      <>
        <TorsionFrenetMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Ha <M t="\mathbf{T} = \langle 1, 0, 0 \rangle" /> és <M t="\mathbf{N} = \langle 0, 0, -1 \rangle" />, mennyi a <M t="\mathbf{B}" /> binormális vektor?</>}>
          <p>
            <M t="\mathbf{B} = \mathbf{T}\times\mathbf{N} = \mathbf{i}\times(-\mathbf{k}) = \mathbf{j} = \langle 0,\; 1,\; 0 \rangle" />.
          </p>
        </Task>

        <Task n={16} q={<>Mennyi a torziója az <M t="\mathbf{r}(t) = \langle t,\; \sin t,\; 3 \rangle" /> görbének?</>}>
          <p>
            Mivel <M t="z = 3" /> állandó (síkgörbe), a torziója minden pontban <M t="\tau(t) = 0" />.
          </p>
        </Task>

        <Task n={17} q={<>Egy mozgásnál <M t="|\mathbf{v}| = 4" />, <M t="\mathbf{v}\cdot\mathbf{a} = 12" /> és <M t="|\mathbf{a}| = 5" />. Határozd meg <M t="a_T" /> és <M t="a_N" /> értékét!</>}>
          <p>
            <M t="a_T = \frac{12}{4} = 3" />, <M t="a_N = \sqrt{5^2 - 3^2} = 4" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Írd fel a gyorsulás <M t="a_T\mathbf{T} + a_N\mathbf{N}" /> felbontását az <M t="\mathbf{r}(t) = \langle 3t,\; t^2,\; 0 \rangle" /> pályán <M t="t = 2" />-nél!</>}>
          <p>
            <M t="\mathbf{v}(2) = \langle 3, 4, 0 \rangle" /> (<M t="|\mathbf{v}| = 5" />),{' '}
            <M t="\mathbf{a}(2) = \langle 0, 2, 0 \rangle" /> (<M t="|\mathbf{a}| = 2" />). Így{' '}
            <M t="a_T = \frac{8}{5} = 1{,}6" /> és <M t="a_N = \sqrt{4 - 2{,}56} = \sqrt{1{,}44} = 1{,}2" />. Tehát{' '}
            <M t="\mathbf{a}(2) = 1{,}6\,\mathbf{T} + 1{,}2\,\mathbf{N}" />!
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle \cos t,\; \sin t,\; 2t \rangle" /> csavarvonal görbületét és torzióját!</>}>
          <p>
            <M t="a = 1,\; b = 2 \Rightarrow \kappa = \frac{1}{1+4} = \frac{1}{5}" /> és{' '}
            <M t="\tau = \frac{2}{1+4} = \frac{2}{5}" />.
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="\mathbf{r}(t) = \langle e^t,\; e^{-t},\; \sqrt{2}\,t \rangle" /> görbe <M t="a_T" /> és <M t="a_N" /> összetevőit <M t="t = 0" />-nál!</>}>
          <p>
            <M t="\mathbf{v}(0) = \langle 1, -1, \sqrt{2} \rangle" /> (<M t="|\mathbf{v}| = 2" />),{' '}
            <M t="\mathbf{a}(0) = \langle 1, 1, 0 \rangle" /> (<M t="|\mathbf{a}| = \sqrt{2}" />). Mivel{' '}
            <M t="\mathbf{v}(0)\cdot\mathbf{a}(0) = 1 - 1 + 0 = 0" />, kapjuk: <M t="a_T = 0" /> és{' '}
            <M t="a_N = \sqrt{2}" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Melyik <M t="b > 0" /> menetemelkedés esetén maximális az <M t="\mathbf{r}(t) = \langle a\cos t,\; a\sin t,\; bt \rangle" /> csavarvonal torziója adott <M t="a > 0" /> sugár mellett?</>}>
          <p>
            <M t="\tau(b) = \frac{b}{a^2 + b^2}" />. Deriválva:{' '}
            <M t="\tau'(b) = \frac{a^2 - b^2}{(a^2+b^2)^2} = 0 \Rightarrow b = a" />! Ekkor{' '}
            <M t="\tau_{\max} = \frac{1}{2a}" /> (pontosan ekkor <M t="\kappa = \tau = \frac{1}{2a}" />!).
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle e^t\cos t,\; e^t\sin t,\; e^t \rangle" /> kúpspirál torzióját általános <M t="t" />-re!</>}>
          <p>
            <M t="\mathbf{r}' = e^t\langle c-s, s+c, 1 \rangle" />,{' '}
            <M t="\mathbf{r}'' = e^t\langle -2s, 2c, 1 \rangle" />,{' '}
            <M t="\mathbf{r}''' = e^t\langle -2c-2s, -2s+2c, 1 \rangle" /> (ahol <M t="c=\cos t, s=\sin t" />).
            <M t="\mathbf{r}'\times\mathbf{r}'' = e^{2t}\langle s-c, -s-c, 2 \rangle" />, hossznégyzete{' '}
            <M t="6e^{4t}" />. A vegyes szorzat <M t="2e^{3t}" />, így{' '}
            <M t="\tau(t) = \dfrac{2e^{3t}}{6e^{4t}} = \dfrac{1}{3e^t}" />!
          </p>
        </Task>

        <Task n={23} q={<>Bizonyítsd be, hogy egy állandó sebességnagysággal mozgó részecskénél (<M t="|\mathbf{v}| = v_0" />) az <M t="\mathbf{a}'(t)" /> vektor <M t="\mathbf{B}" />-irányú komponense pontosan <M t="\kappa\tau v_0^3" />!</>}>
          <p>
            Mivel <M t="a_T = 0" />, <M t="\mathbf{a} = \kappa v_0^2\,\mathbf{N}" />. Deriváljuk <M t="t" /> szerint:{' '}
            <M t="\mathbf{a}' = \kappa' v_0^2\mathbf{N} + \kappa v_0^2\frac{d\mathbf{N}}{ds}v_0 = \kappa' v_0^2\mathbf{N} + \kappa v_0^3(-\kappa\mathbf{T} + \tau\mathbf{B})" />.
            Skalárszorozva <M t="\mathbf{B}" />-vel: <M t="\mathbf{a}'\cdot\mathbf{B} = \kappa\tau v_0^3" />!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda</h3>
        <Steps
          title="Az általános csavarvonal görbülete és torziója"
          source="Analízis-labor"
          problem={
            <>
              Adjuk meg az <M t="\mathbf{r}(t) = \langle a\cos t,\; a\sin t,\; bt \rangle" /> (<M t="a, b > 0" />)
              csavarvonal görbületét és torzióját!
            </>
          }
          steps={[
            {
              title: 'Első három derivált kiszámítása',
              body: (
                <p>
                  <M t="\mathbf{v} = \langle -a\sin t,\; a\cos t,\; b \rangle" />,{' '}
                  <M t="\mathbf{a} = \langle -a\cos t,\; -a\sin t,\; 0 \rangle" />,{' '}
                  <M t="\mathbf{a}' = \langle a\sin t,\; -a\cos t,\; 0 \rangle" />.
                </p>
              ),
            },
            {
              title: 'Vektoriális szorzat és hosszak',
              body: (
                <p>
                  <M t="\mathbf{v}\times\mathbf{a} = \langle ab\sin t,\; -ab\cos t,\; a^2 \rangle" />, hossza{' '}
                  <M t="|\mathbf{v}\times\mathbf{a}| = a\sqrt{a^2 + b^2}" />, míg{' '}
                  <M t="|\mathbf{v}| = \sqrt{a^2 + b^2}" />.
                </p>
              ),
            },
            {
              title: 'Görbület kiszámítása',
              body: (
                <M block t="\kappa = \frac{a\sqrt{a^2 + b^2}}{(a^2 + b^2)^{3/2}} = \frac{a}{a^2 + b^2}." />
              ),
            },
            {
              title: 'Vegyes szorzat és torzió',
              body: (
                <>
                  <p>
                    <M t="(\mathbf{v}\times\mathbf{a})\cdot\mathbf{a}' = a^2 b\sin^2 t + a^2 b\cos^2 t + 0 = a^2 b" />,
                    innen a torzió:
                  </p>
                  <M block t="\tau = \frac{a^2 b}{a^2(a^2 + b^2)} = \frac{b}{a^2 + b^2}." />
                </>
              ),
            },
          ]}
        />
      </>
    ),
  },
];
