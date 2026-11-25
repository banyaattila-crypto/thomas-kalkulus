import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CurvatureCircleCompareWidget,
  CurvatureMapDiagram,
  GraphCurvaturePlotWidget,
  HelixCurvature3DWidget,
  HighwayTurnPhysicsWidget,
  OsculatingCircleWidget,
  PrincipalNormalWidget,
  TNFrameOscPlane3DWidget,
} from '../components/Widgets134';
import type { Page } from './s1_1';

export const S13_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Mi a görbület (κ)?',
    body: (
      <>
        <Story>
          <p>
            Egy autópályán szinte alig kell elfordítanod a kormányt, egy hegyi szerpentin hajtűkanyarjában viszont
            ütközésig tekered! A <strong>görbület</strong> (<M t="\kappa" />, „kappa”) pontosan azt méri számszerűen,
            hogy egységnyi megtett út (<M t="ds" />) alatt <em>mennyire gyorsan fordul el</em> a görbe érintőiránya.
          </p>
        </Story>

        <Def title="Egy sima görbe görbülete">
          <p>
            Ha <M t="\mathbf{T}" /> a normált érintővektor és <M t="s" /> az ívhosszparaméter, akkor a görbe{' '}
            <strong>görbülete</strong>:
          </p>
          <M block t="\kappa = \left|\frac{d\mathbf{T}}{ds}\right| = \frac{1}{|\mathbf{v}(t)|}\left|\frac{d\mathbf{T}}{dt}\right|." />
          <ul>
            <li><strong>Egyenes:</strong> <M t="\mathbf{T}" /> állandó, így <M t="\kappa = 0" />.</li>
            <li><strong><M t="a" /> sugarú kör:</strong> minden pontban állandó, <M t="\kappa = \dfrac{1}{a}" />!</li>
          </ul>
        </Def>

        <CurvatureCircleCompareWidget />

        <Task n={1} q={<>Mekkora az <M t="\mathbf{r}(t) = \langle 5\cos t,\; 5\sin t \rangle" /> kör görbülete minden pontban?</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle -5\sin t, 5\cos t \rangle" />, <M t="|\mathbf{v}| = 5" />, így{' '}
            <M t="\mathbf{T}(t) = \langle -\sin t, \cos t \rangle" />. Deriválva:{' '}
            <M t="\mathbf{T}'(t) = \langle -\cos t, -\sin t \rangle" />, hossza <M t="1" />. Tehát{' '}
            <M t="\kappa = \frac{1}{5}" /> (valóban <M t="1/a" />!).
          </p>
        </Task>

        <Task n={2} q={<>Egy 20 méter sugarú és egy 80 méter sugarú kör közül melyiknek nagyobb a görbülete, és hányszor nagyobb?</>}>
          <p>
            A 20 m sugarú köré: <M t="\kappa_1 = \frac{1}{20}" />, a 80 m-esé <M t="\kappa_2 = \frac{1}{80}" />. A
            kisebb kör görbülete pontosan <strong>négyszer nagyobb</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A normált főnormális vektor N(t)',
    body: (
      <>
        <p>
          A 13.3 fejezetben már láttuk, hogy mivel <M t="|\mathbf{T}(t)| = 1" /> állandó, a deriváltja{' '}
          <M t="\mathbf{T}'(t)" /> mindig <strong>merőleges <M t="\mathbf{T}(t)" />-re</strong>! Ha{' '}
          <M t="\mathbf{T}'(t) \neq \mathbf{0}" /> (vagyis <M t="\kappa \neq 0" />), és leosztjuk a hosszával,
          megkapjuk a kanyarodás irányába mutató egységvektort.
        </p>

        <Def title="Normált főnormális vektor">
          <M block t="\mathbf{N}(t) = \frac{1}{\kappa}\frac{d\mathbf{T}}{ds} = \frac{d\mathbf{T}/dt}{|d\mathbf{T}/dt|}." />
          <p>
            Két fontos tulajdonság: <M t="|\mathbf{N}| = 1" />, <M t="\mathbf{T}\cdot\mathbf{N} = 0" />, és{' '}
            <M t="\mathbf{N}" /> mindig a görbe <strong>konkáv (belső) oldala felé</strong>, a kanyar középpontja
            irányába mutat!
          </p>
        </Def>

        <PrincipalNormalWidget />

        <Quiz
          q={<>Merre mutat a <M t="\mathbf{N}(t)" /> normált főnormális vektor egy síkbeli vagy térbeli görbén (ahol <M t="\kappa > 0" />)?</>}
          options={[
            { label: <>A mozgás (érintő) irányába</> },
            { label: <>Merőlegesen <M t="\mathbf{T}" />-re, a görbe konkáv (befelé kanyarodó) oldala felé</>, ok: true },
            { label: <>Mindig az origó felé</> },
            { label: <>A görbe domború (külső) oldala felé</> },
          ]}
          explain={
            <>
              Mivel <M t="\mathbf{T}" /> a kanyar belső oldala felé fordul el, <M t="d\mathbf{T}/dt" /> (és így{' '}
              <M t="\mathbf{N}" />) mindig merőlegesen, befelé mutat.
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki <M t="\mathbf{T}(t)" />, <M t="\mathbf{N}(t)" /> és <M t="\kappa" /> értékét az <M t="\mathbf{r}(t) = \langle 3\cos t,\; 3\sin t,\; 4t \rangle" /> csavarvonalon!</>}>
          <p>
            <M t="|\mathbf{v}| = 5" />, <M t="\mathbf{T}(t) = \frac{1}{5}\langle -3\sin t, 3\cos t, 4 \rangle" />.
            Deriválva: <M t="\mathbf{T}'(t) = \frac{3}{5}\langle -\cos t, -\sin t, 0 \rangle" />, hossza{' '}
            <M t="|\mathbf{T}'| = \frac{3}{5}" />. Tehát <M t="\mathbf{N}(t) = \langle -\cos t,\; -\sin t,\; 0 \rangle" />{' '}
            (vízszintesen a <M t="z" />-tengely felé mutat!), és{' '}
            <M t="\kappa = \frac{3/5}{5} = \frac{3}{25}" />.
          </p>
        </Task>

        <Task n={4} q={<>Miért nem értelmezett az <M t="\mathbf{N}" /> vektor egy egyenes mentén vagy egy inflexiós pontban?</>}>
          <p>
            Mert ott <M t="\kappa = 0" />, azaz <M t="\mathbf{T}'(t) = \mathbf{0}" />, a nullvektort pedig nem lehet
            egységnyi hosszúságúra normálni!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Simulókör és görbületi sugár (ρ = 1/κ)',
    body: (
      <>
        <p>
          Az érintőegyenes a görbe legjobb <em>egyenes</em> közelítése egy pontban. De mi a legjobb <em>kör</em>{' '}
          közelítés? Az a kör, amely ugyanott érinti a görbét, ugyanarra görbül, és pontosan ugyanakkora a görbülete!
          Ezt nevezzük <strong>simulókörnek</strong> (oszkulációs körnek).
        </p>

        <Def title="Görbületi sugár és simulókör">
          <p>
            Egy <M t="\kappa > 0" /> pontban a <strong>görbületi sugár</strong>:
          </p>
          <M block t="\rho = \frac{1}{\kappa}." />
          <p>
            A <strong>simulókör középpontja</strong> (görbületi középpont):{' '}
            <M t="\mathbf{c} = \mathbf{r}(t_0) + \rho\,\mathbf{N}(t_0)" />.
          </p>
        </Def>

        <OsculatingCircleWidget />

        <Task n={5} q={<>Határozd meg az <M t="y = x^2" /> parabola simulókörének egyenletét az origóban (<M t="x = 0" />)!</>}>
          <p>
            <M t="y' = 2x,\; y'' = 2" />. Az origóban <M t="y'(0) = 0,\; y''(0) = 2" />, így{' '}
            <M t="\kappa(0) = \frac{2}{(1+0)^{3/2}} = 2 \Rightarrow \rho = \frac{1}{2}" />. Mivel felfelé nyílik, a
            középpont <M t="(0;\, \frac{1}{2})" />. A simulókör: <M t="x^2 + \big(y - \frac{1}{2}\big)^2 = \frac{1}{4}" />.
          </p>
        </Task>

        <Task n={6} q={<>Mekkora az <M t="\mathbf{r}(t) = \langle 4\cos t,\; 2\sin t \rangle" /> ellipszis görbületi sugara a <M t="(4;\, 0)" /> csúcspontban (<M t="t = 0" />)?</>}>
          <p>
            <M t="x' = -4\sin t,\; y' = 2\cos t,\; x'' = -4\cos t,\; y'' = -2\sin t" />. <M t="t = 0" />-nál:{' '}
            <M t="\kappa = \frac{|0 - 2\cdot(-4)|}{(0 + 4)^{3/2}} = \frac{8}{8} = 1" />, így{' '}
            <M t="\rho = 1" /> (általánosan a nagytengely végpontjában <M t="\rho = b^2/a = 4/4 = 1" />!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Síkbeli függvénygrafikonok görbülete',
    body: (
      <>
        <p>
          Ha egy síkgörbét egyszerűen <M t="y = f(x)" /> alakban ismerünk, nem kell külön <M t="\mathbf{T}(x)" />-et
          számolnunk: egyetlen zárt képlettel azonnal megkapjuk a görbületet az első és második deriváltból!
        </p>

        <Def title="Függvénygrafikon és 2D paraméteres görbe görbülete">
          <M block t="\kappa(x) = \frac{|f''(x)|}{\big(1 + [f'(x)]^2\big)^{3/2}}, \qquad \kappa(t) = \frac{|x'(t)y''(t) - y'(t)x''(t)|}{\big([x'(t)]^2 + [y'(t)]^2\big)^{3/2}}." />
        </Def>

        <GraphCurvaturePlotWidget />

        <Steps
          title="Hol a legnagyobb az y = eˣ görbe görbülete?"
          problem={
            <>
              Határozd meg azt az <M t="x" /> pontot, ahol az <M t="y = e^x" /> exponenciális görbe a legélesebben
              kanyarodik (vagyis <M t="\kappa(x)" /> maximális)!
            </>
          }
          steps={[
            {
              title: 'Írjuk fel κ(x)-et',
              body: (
                <>
                  Mivel <M t="f'(x) = f''(x) = e^x" />, kapjuk:{' '}
                  <M t="\kappa(x) = \dfrac{e^x}{(1 + e^{2x})^{3/2}}" />.
                </>
              ),
            },
            {
              title: 'Vezessük be az u = eˣ > 0 helyettesítést',
              body: (
                <>
                  A <M t="g(u) = \dfrac{u}{(1 + u^2)^{3/2}}" /> függvény maximumát keressük (<M t="u > 0" />).
                </>
              ),
            },
            {
              title: 'Deriváljuk g(u)-t és tegyük egyenlővé nullával',
              body: (
                <>
                  <M t="g'(u) = \dfrac{(1+u^2)^{3/2} - 3u^2(1+u^2)^{1/2}}{(1+u^2)^3} = \dfrac{1 - 2u^2}{(1+u^2)^{5/2}} = 0 \;\Rightarrow\; u = \dfrac{1}{\sqrt{2}}" />.
                </>
              ),
            },
            {
              title: 'Visszahelyettesítés x-re',
              body: (
                <>
                  <M t="e^x = 2^{-1/2} \Rightarrow x = -\frac{1}{2}\ln 2 \approx -0{,}347" />, ahol{' '}
                  <M t="\kappa_{\max} = \dfrac{2}{3\sqrt{3}} \approx 0{,}385" />.
                </>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Számítsd ki az <M t="y = \cos x" /> görbe görbületét <M t="x = 0" />-nál és <M t="x = \frac{\pi}{2}" />-nél!</>}>
          <p>
            <M t="y' = -\sin x,\; y'' = -\cos x" />. <M t="x = 0" />-nál:{' '}
            <M t="\kappa(0) = \frac{1}{(1+0)^{3/2}} = 1" />. <M t="x = \frac{\pi}{2}" />-nél:{' '}
            <M t="\kappa(\pi/2) = \frac{0}{(1+1)^{3/2}} = 0" /> (inflexiós pont!).
          </p>
        </Task>

        <Task n={8} q={<>Mennyi az <M t="y = x^3" /> görbe görbülete az <M t="x = 1" /> pontban?</>}>
          <p>
            <M t="y'(1) = 3,\; y''(1) = 6" />, így{' '}
            <M t="\kappa(1) = \frac{6}{(1 + 9)^{3/2}} = \frac{6}{10\sqrt{10}} = \frac{3}{5\sqrt{10}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A 3D keresztszorzatos görbületképlet és a csavarvonal',
    body: (
      <>
        <p>
          Térbeli görbéknél a <M t="\mathbf{T}'(t)" /> kiszámítása sokszor kellemetlen gyökös törtek deriválásával
          jár. Szerencsére a 12.4 fejezet <strong>vektoriális szorzata</strong> ad egy villámgyors, teljesen gyökmentes
          deriválású képletet!
        </p>

        <Def title="3D görbület képlete vektoriális szorzattal">
          <M block t="\kappa(t) = \frac{|\mathbf{v}(t) \times \mathbf{a}(t)|}{|\mathbf{v}(t)|^3}." />
          <p>
            Alkalmazva az általános <M t="\mathbf{r}(t) = \langle a\cos t,\; a\sin t,\; bt \rangle" /> csavarvonalra:{' '}
            <M t="\kappa = \dfrac{a}{a^2 + b^2}" /> (minden pontban állandó!).
          </p>
        </Def>

        <HelixCurvature3DWidget />

        <Quiz
          q={<>Mi történik az <M t="\mathbf{r}(t) = \langle a\cos t,\; a\sin t,\; bt \rangle" /> csavarvonal görbületével, ha a sugár <M t="a" /> változatlan, de a menetemelkedés <M t="b" /> egyre nő?</>}
          options={[
            { label: <>A görbület növekszik</> },
            { label: <>A görbület csökken és <M t="0" />-hoz tart</>, ok: true },
            { label: <>A görbület állandó marad (<M t="1/a" />)</> },
            { label: <>A görbület periodikusan változik <M t="t" />-vel</> },
          ]}
          explain={
            <>
              <M t="\kappa = \frac{a}{a^2 + b^2}" />: ha <M t="b \to \infty" />, a csavarvonal egyre jobban
              kiegyenesedik, így <M t="\kappa \to 0" />.
            </>
          }
        />

        <Task n={9} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; t^3 \rangle" /> térugörbe görbületét <M t="t = 0" />-nál a keresztszorzatos képlettel!</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 1, 2t, 3t^2 \rangle \Rightarrow \mathbf{v}(0) = \langle 1, 0, 0 \rangle" />,{' '}
            <M t="\mathbf{a}(t) = \langle 0, 2, 6t \rangle \Rightarrow \mathbf{a}(0) = \langle 0, 2, 0 \rangle" />.
            Keresztszorzat: <M t="\mathbf{v}(0)\times\mathbf{a}(0) = \langle 0, 0, 2 \rangle" />, hossza <M t="2" />.
            Így <M t="\kappa(0) = \frac{2}{1^3} = 2" />!
          </p>
        </Task>

        <Task n={10} q={<>Mennyi a 9. feladat görbéjének görbülete <M t="t = 1" />-nél?</>}>
          <p>
            <M t="\mathbf{v}(1) = \langle 1, 2, 3 \rangle" /> (<M t="|\mathbf{v}| = \sqrt{14}" />),{' '}
            <M t="\mathbf{a}(1) = \langle 0, 2, 6 \rangle" />.{' '}
            <M t="\mathbf{v}\times\mathbf{a} = \langle 6,\; -6,\; 2 \rangle" />, hossza{' '}
            <M t="\sqrt{36+36+4} = \sqrt{76} = 2\sqrt{19}" />. Tehát{' '}
            <M t="\kappa(1) = \dfrac{2\sqrt{19}}{14\sqrt{14}} = \dfrac{\sqrt{19}}{7\sqrt{14}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Kanyarodás, útépítés és a normális gyorsulás',
    body: (
      <>
        <p>
          Miért érzünk oldalirányú nyomást az autó ülésében kanyarodáskor? A 13.5 fejezetben pontosan levezetjük, hogy
          a gyorsulás <M t="\mathbf{N}" /> irányú összetevője pontosan <M t="a_N = \kappa|\mathbf{v}|^2 = \dfrac{v^2}{\rho}" />!
        </p>

        <HighwayTurnPhysicsWidget />

        <Warn>
          Az autópályák és vasúti sínek nem csatlakoztatnak egyenes szakaszt (<M t="\kappa = 0" />) közvetlenül
          körívhez (<M t="\kappa = 1/R" />), mert a görbület hirtelen ugrása rántást okozna! Ehelyett{' '}
          <strong>átmeneti ívet (klotoidot)</strong> építenek be, amelyen <M t="\kappa(s) = c\cdot s" /> egyenletesen nő!
        </Warn>

        <Task n={11} q={<>Egy autó <M t="v = 20\text{ m/s}" /> (<M t="72\text{ km/h}" />) sebességgel halad egy <M t="\rho = 100\text{ m}" /> sugarú kanyarban. Mekkora a centripetális (normális) gyorsulása?</>}>
          <p>
            <M t="a_N = \frac{v^2}{\rho} = \frac{400}{100} = 4\text{ m/s}^2" /> (kb. <M t="0{,}41\,g" />).
          </p>
        </Task>

        <Task n={12} q={<>Legfeljebb mekkora sebességgel szabad bevenni egy <M t="\rho = 90\text{ m}" /> sugarú kanyart, ha a biztonságos oldalirányú gyorsulás legfeljebb <M t="4\text{ m/s}^2" />?</>}>
          <p>
            <M t="\frac{v^2}{90} \le 4 \Rightarrow v^2 \le 360 \Rightarrow v \le \sqrt{360} \approx 19{,}0\text{ m/s} \approx 68{,}3\text{ km/h}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'A T–N sík (simulósík) a háromdimenziós térben',
    body: (
      <>
        <p>
          Egy háromdimenziós görbe minden <M t="\kappa > 0" /> pontjában a <M t="\mathbf{T}(t_0)" /> és{' '}
          <M t="\mathbf{N}(t_0)" /> ortogonális egységvektorok kifeszítenek egy síkot: ez a{' '}
          <strong>simulósík (oszkulációs sík)</strong>. Ez az a sík, amely a legjobban illeszkedik a görbéhez a{' '}
          <M t="t_0" /> pont közelében — benne fekszik a simulókör is!
        </p>

        <TNFrameOscPlane3DWidget />

        <Quiz
          q={<>Mely két vektor feszíti ki egy térgörbe simulósíkját (oszkulációs síkját) a <M t="P_0" /> pontban?</>}
          options={[
            { label: <><M t="\mathbf{r}(t_0)" /> és <M t="\mathbf{T}(t_0)" /></> },
            { label: <><M t="\mathbf{T}(t_0)" /> és <M t="\mathbf{N}(t_0)" /></>, ok: true },
            { label: <>Csak a <M t="\mathbf{T}(t_0)" /> vektor</> },
            { label: <>A koordinátatengelyek <M t="\mathbf{i}" /> és <M t="\mathbf{j}" /> vektorai</> },
          ]}
          explain={
            <>
              A <M t="\mathbf{T}" /> (haladási irány) és <M t="\mathbf{N}" /> (kanyarodási irány) feszíti ki a
              simulósíkot; normálvektora pedig <M t="\mathbf{B} = \mathbf{T}\times\mathbf{N}" /> (13.5 fejezet!).
            </>
          }
        />

        <Task n={13} q={<>Add meg <M t="\mathbf{T}(1)" /> és <M t="\mathbf{N}(1)" /> értékét az <M t="\mathbf{r}(t) = \langle t,\; \frac{1}{2}t^2 \rangle" /> parabolán!</>}>
          <p>
            <M t="\mathbf{v}(1) = \langle 1, 1 \rangle \Rightarrow \mathbf{T}(1) = \frac{1}{\sqrt{2}}\langle 1, 1 \rangle" />.
            A merőleges egységvektorok <M t="\pm\frac{1}{\sqrt{2}}\langle -1, 1 \rangle" />; mivel a parabola felfelé
            konkáv (<M t="y'' > 0" />), a befelé mutató főnormális{' '}
            <M t="\mathbf{N}(1) = \frac{1}{\sqrt{2}}\langle -1,\; 1 \rangle" />.
          </p>
        </Task>

        <Task n={14} q={<>Írd fel a 9. feladat <M t="\mathbf{r}(t) = \langle t, t^2, t^3 \rangle" /> görbéjének simulósíkját <M t="t = 0" />-nál!</>}>
          <p>
            A 9. feladatból <M t="\mathbf{v}(0) = \langle 1, 0, 0 \rangle" />,{' '}
            <M t="\mathbf{a}(0) = \langle 0, 2, 0 \rangle" />, tehát a simulósík normálvektora{' '}
            <M t="\mathbf{v}(0)\times\mathbf{a}(0) = \langle 0, 0, 2 \rangle \parallel \mathbf{k}" />. Az origón
            átmenő sík: <M t="z = 0" /> (az <M t="xy" />-sík!).
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
        <CurvatureMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Mekkora a görbülete az <M t="\mathbf{r}(t) = \langle 1 + 3t,\; 2 - t,\; 5t \rangle" /> egyenesnek?</>}>
          <p>
            <M t="\mathbf{a}(t) = \mathbf{0}" />, tehát <M t="\kappa = 0" /> minden pontban.
          </p>
        </Task>

        <Task n={16} q={<>Mennyi az <M t="\mathbf{r}(t) = \langle 6\cos t,\; 6\sin t,\; 0 \rangle" /> kör görbülete és görbületi sugara?</>}>
          <p>
            <M t="\kappa = \frac{1}{6}" />, görbületi sugár <M t="\rho = 6" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az <M t="y = 3x^2 - 1" /> parabola görbületét a csúcspontjában (<M t="x = 0" />)!</>}>
          <p>
            <M t="y'(0) = 0,\; y''(0) = 6 \Rightarrow \kappa(0) = \frac{6}{1^{3/2}} = 6" /> (és <M t="\rho = \frac{1}{6}" />).
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\mathbf{r}(t) = \langle 2\cos t,\; 2\sin t,\; 2t \rangle" /> csavarvonal görbületét és <M t="\mathbf{N}(t)" /> főnormálisát!</>}>
          <p>
            <M t="a = 2,\; b = 2 \Rightarrow \kappa = \frac{2}{4 + 4} = \frac{1}{4}" />, és{' '}
            <M t="\mathbf{N}(t) = \langle -\cos t,\; -\sin t,\; 0 \rangle" />.
          </p>
        </Task>

        <Task n={19} q={<>Add meg az <M t="y = \ln(\cos x)" /> görbe görbületét a <M t="-\frac{\pi}{2} < x < \frac{\pi}{2}" /> intervallumon!</>}>
          <p>
            <M t="y' = -\tan x,\; y'' = -\frac{1}{\cos^2 x}" />. Mivel <M t="1 + \tan^2 x = \frac{1}{\cos^2 x}" />,
            kapjuk: <M t="\kappa(x) = \dfrac{1/\cos^2 x}{(1/\cos^2 x)^{3/2}} = \cos x" />!
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="\mathbf{r}(t) = \langle t,\; t^2,\; \frac{2}{3}t^3 \rangle" /> görbe görbületét <M t="t = 1" />-nél!</>}>
          <p>
            <M t="\mathbf{v}(1) = \langle 1, 2, 2 \rangle" /> (<M t="|\mathbf{v}| = 3" />),{' '}
            <M t="\mathbf{a}(1) = \langle 0, 2, 4 \rangle" />.{' '}
            <M t="\mathbf{v}\times\mathbf{a} = \langle 4,\; -4,\; 2 \rangle" />, hossza <M t="\sqrt{16+16+4} = 6" />.
            Így <M t="\kappa(1) = \frac{6}{3^3} = \frac{6}{27} = \frac{2}{9}" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Hol maximális az <M t="y = \ln x" /> görbe görbülete (<M t="x > 0" />)?</>}>
          <p>
            <M t="y' = \frac{1}{x},\; y'' = -\frac{1}{x^2}" />, így{' '}
            <M t="\kappa(x) = \frac{1/x^2}{(1 + 1/x^2)^{3/2}} = \frac{x}{(x^2 + 1)^{3/2}}" />. A 4. oldal{' '}
            <M t="g(u)" /> függvényével teljesen azonos! Maximuma <M t="x = \frac{1}{\sqrt{2}}" />-nél van (mert{' '}
            <M t="\ln x" /> az <M t="e^x" /> tükörképe!).
          </p>
        </Task>

        <Task n={22} q={<>Melyik <M t="a > 0" /> sugár esetén maximális az <M t="\mathbf{r}(t) = \langle a\cos t,\; a\sin t,\; bt \rangle" /> csavarvonal görbülete rögzített <M t="b > 0" /> mellett?</>}>
          <p>
            <M t="\kappa(a) = \frac{a}{a^2 + b^2}" />. Deriválva:{' '}
            <M t="\kappa'(a) = \frac{(a^2+b^2) - 2a^2}{(a^2+b^2)^2} = \frac{b^2 - a^2}{(a^2+b^2)^2} = 0 \Rightarrow a = b" />!
            Ekkor <M t="\kappa_{\max} = \frac{1}{2b}" />.
          </p>
        </Task>

        <Task n={23} q={<>Mutasd meg, hogy a <M t="\mathbf{r}(t) = \langle a\cos^3 t,\; a\sin^3 t \rangle" /> asztroid (<M t="0 < t < \frac{\pi}{2}" />) görbülete <M t="\kappa(t) = \dfrac{1}{3a\sin t\cos t}" />!</>}>
          <p>
            <M t="x' = -3a\cos^2 t\sin t,\; y' = 3a\sin^2 t\cos t \Rightarrow |\mathbf{v}| = 3a\sin t\cos t" />.
            <M t="x'y'' - y'x'' = 9a^2\sin^2 t\cos^2 t" />. Elosztva <M t="|\mathbf{v}|^3 = 27a^3\sin^3 t\cos^3 t" />-vel:
            <M t="\kappa(t) = \dfrac{1}{3a\sin t\cos t}" />!
          </p>
        </Task>
      </>
    ),
  },
];
