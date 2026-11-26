import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CoordSystemChooserWidget,
  CylindricalCoord3DWidget,
  CylSphMasterMapDiagram,
  IceCreamCone3DWidget,
  ParaboloidCyl3DWidget,
  SphereInertiaShellWidget,
  SphericalCoord3DWidget,
  SphericalWedge3DWidget,
} from '../components/Widgets156';
import type { Page } from './s1_1';

export const S15_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Hengerkoordináták (r, θ, z) és a térfogatelem',
    body: (
      <>
        <Story>
          <p>
            A 15.3 fejezetben láttuk, milyen csodát tesznek a polárkoordináták a síkbeli körökön. Ha ezt a gondolatot
            egyszerűen megemeljük a <M t="z" />-tengely mentén a háromdimenziós térbe, megkapjuk a{' '}
            <strong>hengerkoordináta-rendszert</strong> — a hengerek, paraboloidok és kúpok természetes nyelvét!
          </p>
        </Story>

        <Def title="Hengerkoordináták és térfogatelem">
          <M block t="x = r\cos\theta, \qquad y = r\sin\theta, \qquad z = z \qquad (r \ge 0,\; r^2 = x^2 + y^2)." />
          <p>
            A három koordinátafelület: <M t="r = c" /> (körhenger a <M t="z" />-tengely körül),{' '}
            <M t="\theta = \theta_0" /> (függőleges félsík) és <M t="z = z_0" /> (vízszintes sík). Mivel az alaplap
            poláris területeleme <M t="dA = r\,dr\,d\theta" />, a <strong>hengerkoordinátás térfogatelem</strong>:
          </p>
          <M block t="dV = r\,dz\,dr\,d\theta." />
        </Def>

        <CylindricalCoord3DWidget />

        <Task n={1} q={<>Alakítsd át a <M t="(x; y; z) = (1;\; \sqrt{3};\; 5)" /> pontot hengerkoordinátákba!</>}>
          <p>
            <M t="r = \sqrt{1^2 + (\sqrt{3})^2} = 2" />, <M t="\tan\theta = \sqrt{3}" /> (I. síknegyed) <M t="\Rightarrow \theta = \frac{\pi}{3}" />,
            és <M t="z = 5" />. Tehát <M t="(r; \theta; z) = \big(2;\; \frac{\pi}{3};\; 5\big)" />.
          </p>
        </Task>

        <Task n={2} q={<>Írd fel hengerkoordinátákban az <M t="x^2 + y^2 = 2z" /> és az <M t="x^2 + y^2 + z^2 = 9" /> felület egyenletét!</>}>
          <p>
            Mivel <M t="x^2 + y^2 = r^2" />: az első <M t="z = \frac{1}{2}r^2" /> (paraboloid), a második{' '}
            <M t="r^2 + z^2 = 9" /> (gömb).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Hármas integrál hengerkoordinátákban',
    body: (
      <>
        <p>
          Hengerkoordinátákban a 15.4 fejezet <em>„Árnyék + Lándzsa”</em> módszere változatlan marad — csak a síkbeli
          árnyékot polárkoordinátákkal írjuk le!
        </p>

        <Def title="Hármas integrál hengerkoordinátákban">
          <M block t="\iiint_D f(x, y, z)\,dV = \int_\alpha^\beta \int_{r_1(\theta)}^{r_2(\theta)} \int_{z_1(r,\theta)}^{z_2(r,\theta)} f(r\cos\theta,\; r\sin\theta,\; z)\,r\,dz\,dr\,d\theta." />
        </Def>

        <ParaboloidCyl3DWidget />

        <Quiz
          q={<>Melyik integrál adja meg pontosan az <M t="x^2 + y^2 \le 4" />, <M t="0 \le z \le 3" /> körhenger térfogatát hengerkoordinátákban?</>}
          options={[
            { label: <M t="\int_0^{2\pi}\!\int_0^2\!\int_0^3 dz\,dr\,d\theta" /> },
            { label: <M t="\int_0^{2\pi}\!\int_0^2\!\int_0^3 r\,dz\,dr\,d\theta" />, ok: true },
            { label: <M t="\int_0^{2\pi}\!\int_0^4\!\int_0^3 r\,dz\,dr\,d\theta" /> },
            { label: <M t="\int_0^\pi\!\int_0^2\!\int_0^3 r^2\,dz\,dr\,d\theta" /> },
          ]}
          explain={
            <>
              A körhenger sugara <M t="R = \sqrt{4} = 2" />, és a térfogatelemben <strong>soha nem szabad elfelejteni az <M t="r" /> szorzót</strong>:{' '}
              <M t="2\pi \cdot \big[\frac{r^2}{2}\big]_0^2 \cdot 3 = 12\pi" />!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki a <M t="z = x^2 + y^2" /> paraboloid és a <M t="z = 4" /> sík által bezárt test térfogatát!</>}>
          <p>
            Hengerkoordinátákban <M t="r^2 \le z \le 4" />, az árnyék <M t="r^2 \le 4 \Rightarrow 0 \le r \le 2" />.
            Így <M t="V = \int_0^{2\pi}\!d\theta \int_0^2 (4 - r^2)\,r\,dr = 2\pi\big[2r^2 - \frac{r^4}{4}\big]_0^2 = 2\pi(8 - 4) = 8\pi" />.
          </p>
        </Task>

        <Task n={4} q={<>Mekkora a tömege az <M t="x^2 + y^2 \le 9" />, <M t="0 \le z \le 2" /> hengernek, ha a sűrűsége <M t="\delta(x,y,z) = \sqrt{x^2+y^2}" />?</>}>
          <p>
            <M t="\delta = r" />, így <M t="M = \int_0^{2\pi}\!d\theta \int_0^3 \int_0^2 r \cdot r\,dz\,dr = 2\pi \cdot 2 \cdot \big[\frac{r^3}{3}\big]_0^3 = 4\pi \cdot 9 = 36\pi" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Gömbi koordináták (ρ, φ, θ)',
    body: (
      <>
        <p>
          Ha a testünk középpontosan szimmetrikus az origóra (gömb, gömbhéj, kúp csúccsal az origóban), akkor a{' '}
          <strong>gömbi koordináták</strong> a földgömb szélességi–hosszúsági hálójához hasonlóan teszik gyerekjátékká
          az integrálást!
        </p>

        <Def title="Gömbi koordináták (Thomas-konvenció)">
          <ul>
            <li><M t="\rho \ge 0" />: a pont távolsága az origótól (<M t="\rho^2 = x^2 + y^2 + z^2" />).</li>
            <li><M t="\phi \in [0, \pi]" />: a <strong>polárszög</strong> a pozitív <M t="z" />-tengelytől mérve (Északi-sark: <M t="0" />, Egyenlítő: <M t="\frac{\pi}{2}" />, Déli-sark: <M t="\pi" />).</li>
            <li><M t="\theta \in [0, 2\pi]" />: az <strong>azimutszög</strong> az <M t="xy" />-síkban (ugyanaz, mint polárban!).</li>
          </ul>
          <M block t="x = \rho\sin\phi\cos\theta, \qquad y = \rho\sin\phi\sin\theta, \qquad z = \rho\cos\phi, \qquad r = \rho\sin\phi." />
        </Def>

        <SphericalCoord3DWidget />

        <Task n={5} q={<>Alakítsd át a <M t="(\rho; \phi; \theta) = \big(4;\; \frac{\pi}{3};\; \frac{\pi}{6}\big)" /> pontot derékszögű koordinátákba!</>}>
          <p>
            <M t="r = 4\sin\frac{\pi}{3} = 2\sqrt{3}" />. Így{' '}
            <M t="x = 2\sqrt{3}\cos\frac{\pi}{6} = 3" />, <M t="y = 2\sqrt{3}\sin\frac{\pi}{6} = \sqrt{3}" />,{' '}
            <M t="z = 4\cos\frac{\pi}{3} = 2" />. Tehát <M t="(3;\; \sqrt{3};\; 2)" />.
          </p>
        </Task>

        <Task n={6} q={<>Írd fel gömbi koordinátákban a <M t="z = \sqrt{x^2+y^2}" /> kúpot és az <M t="x^2 + y^2 + (z - a)^2 = a^2" /> eltolt gömböt!</>}>
          <p>
            Kúp: <M t="\rho\cos\phi = \rho\sin\phi \Rightarrow \tan\phi = 1 \Rightarrow \phi = \frac{\pi}{4}" />!
            Eltolt gömb: <M t="x^2+y^2+z^2 = 2az \Rightarrow \rho^2 = 2a\rho\cos\phi \Rightarrow \rho = 2a\cos\phi" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A gömbi térfogatelem: dV = ρ² sin φ dρ dφ dθ',
    body: (
      <>
        <p>
          Polárkoordinátákban egyetlen <M t="r" /> szorzó jelent meg. Gömbi koordinátákban egy apró „gömbi téglatest”
          három merőleges élhossza <M t="d\rho" />, <M t="\rho\,d\phi" /> és <M t="(\rho\sin\phi)\,d\theta" /> — ezek
          szorzata adja a híres <strong>gömbi térfogatelemet</strong>!
        </p>

        <Def title="Hármas integrál gömbi koordinátákban">
          <M block t="dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta," />
          <M block t="\iiint_D f(x,y,z)\,dV = \int_\alpha^\beta \int_{\phi_1}^{\phi_2} \int_{\rho_1(\phi,\theta)}^{\rho_2(\phi,\theta)} f(\rho\sin\phi\cos\theta,\; \rho\sin\phi\sin\theta,\; \rho\cos\phi)\,\rho^2\sin\phi\,d\rho\,d\phi\,d\theta." />
        </Def>

        <SphericalWedge3DWidget />

        <Quiz
          q={<>Mi a teljes <M t="R" /> sugarú gömb helyes határbeállítása gömbi koordinátákban?</>}
          options={[
            { label: <M t="0 \le \rho \le R,\; 0 \le \phi \le 2\pi,\; 0 \le \theta \le 2\pi" /> },
            { label: <M t="0 \le \rho \le R,\; 0 \le \phi \le \pi,\; 0 \le \theta \le 2\pi" />, ok: true },
            { label: <M t="-R \le \rho \le R,\; 0 \le \phi \le \pi,\; 0 \le \theta \le \pi" /> },
            { label: <M t="0 \le \rho \le R,\; -\frac{\pi}{2} \le \phi \le \frac{\pi}{2},\; 0 \le \theta \le \pi" /> },
          ]}
          explain={
            <>
              A <M t="\phi" /> polárszög mindig csak <M t="0" />-tól <M t="\pi" />-ig fut (Északi-sarktól Déli-sarkig),
              mert <M t="\theta \in [0, 2\pi]" /> már körbeforgatja a teljes gömböt! (Ha <M t="\phi" />-t <M t="2\pi" />-ig
              integrálnánk, a <M t="\sin\phi" /> negatív fele kinullázná az egészet!)
            </>
          }
        />

        <Task n={7} q={<>Vezesd le az <M t="R" /> sugarú gömb térfogatát gömbi koordinátákban!</>}>
          <p>
            <M t="V = \int_0^{2\pi}\!d\theta \int_0^\pi \sin\phi\,d\phi \int_0^R \rho^2\,d\rho = (2\pi)\cdot[-\cos\phi]_0^\pi \cdot \frac{R^3}{3} = 2\pi \cdot 2 \cdot \frac{R^3}{3} = \frac{4}{3}\pi R^3" />!
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki az <M t="\iiint_B e^{(x^2+y^2+z^2)^{3/2}}\,dV" /> integrált az <M t="x^2+y^2+z^2 \le 1" /> egységgömbön!</>}>
          <p>
            Gömbi koordinátákban <M t="(x^2+y^2+z^2)^{3/2} = \rho^3" />:{' '}
            <M t="\int_0^{2\pi}\!d\theta \int_0^\pi \sin\phi\,d\phi \int_0^1 e^{\rho^3}\rho^2\,d\rho = 4\pi \big[\frac{1}{3}e^{\rho^3}\big]_0^1 = \frac{4\pi}{3}(e - 1)" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A „fagylalttölcsér”: kúp és gömb metszete',
    body: (
      <>
        <p>
          A gömbi koordináták leglátványosabb diadala az a test, amelyet alulról egy <M t="\phi = \phi_0" /> kúp,
          felülről pedig egy <M t="\rho = R" /> gömb határol. Derékszögű koordinátákban rémálom — gömbi
          koordinátákban viszont <strong>mindhárom határ konstans</strong>!
        </p>

        <IceCreamCone3DWidget />

        <Steps
          title="A fagylalttölcsér térfogatának kiszámítása"
          problem={
            <>
              Számítsd ki az alulról a <M t="z = \sqrt{x^2+y^2}" /> kúp, felülről az <M t="x^2+y^2+z^2 = R^2" /> gömb
              által határolt test térfogatát!
            </>
          }
          steps={[
            {
              title: 'Írjuk át a határoló felületeket gömbi koordinátákra',
              body: (
                <>
                  A gömb <M t="\rho = R" />, a kúp pedig <M t="\phi = \frac{\pi}{4}" /> (a 6. feladatból).
                </>
              ),
            },
            {
              title: 'Olvassuk le a konstans határokat',
              body: (
                <>
                  <M t="0 \le \rho \le R" />, <M t="0 \le \phi \le \frac{\pi}{4}" />, <M t="0 \le \theta \le 2\pi" />.
                </>
              ),
            },
            {
              title: 'Bontsuk három független 1D integrál szorzatára',
              body: (
                <>
                  <M t="V = \left(\int_0^{2\pi} d\theta\right)\!\left(\int_0^{\pi/4}\sin\phi\,d\phi\right)\!\left(\int_0^R \rho^2\,d\rho\right)" />.
                </>
              ),
            },
            {
              title: 'Számítsuk ki a végeredményt',
              body: (
                <>
                  <M t="V = 2\pi \cdot \Big(1 - \frac{\sqrt{2}}{2}\Big) \cdot \frac{R^3}{3} = \dfrac{\pi R^3}{3}(2 - \sqrt{2})" />!
                </>
              ),
            },
          ]}
        />

        <Task n={9} q={<>Mennyi a térfogata az <M t="R = 3" /> sugarú, <M t="\phi_0 = \frac{\pi}{3}" /> félnyílásszögű fagylalttölcsérnek?</>}>
          <p>
            <M t="V = \frac{2\pi \cdot 3^3}{3}\big(1 - \cos\frac{\pi}{3}\big) = 18\pi\big(1 - \frac{1}{2}\big) = 9\pi" />.
          </p>
        </Task>

        <Task n={10} q={<>Vezesd le gömbi koordinátákban a homogén <M t="R" /> sugarú felső félgömb <M t="\bar{z}" /> súlypontját!</>}>
          <p>
            <M t="M_{xy} = \int_0^{2\pi}\!d\theta \int_0^{\pi/2} \cos\phi\sin\phi\,d\phi \int_0^R \rho^3\,d\rho = 2\pi \cdot \frac{1}{2} \cdot \frac{R^4}{4} = \frac{\pi R^4}{4}" />.
            Mivel <M t="V = \frac{2\pi R^3}{3}" />, kapjuk: <M t="\bar{z} = \frac{\pi R^4/4}{2\pi R^3/3} = \frac{3}{8}R" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Mikor melyik koordináta-rendszert válasszuk?',
    body: (
      <>
        <p>
          Egy hármas integrál nehézségének 80%-át az dönti el, hogy az elején a megfelelő koordináta-rendszert
          választjuk-e! A lenti tanácsadó a 4 leggyakoribb vizsgafeladat-típust mutatja be.
        </p>

        <CoordSystemChooserWidget />

        <Warn>
          Sokan automatikusan gömbi koordinátát választanak, ha „gömb” szerepel a feladatban. De ha egy gömböt{' '}
          <strong>hengerrel fúrnak ki</strong> (<M t="r = a" />), akkor a <strong>hengerkoordináta</strong> sokkal
          egyszerűbb, mert a gömb ott csak <M t="z = \pm\sqrt{R^2 - r^2}" />!
        </Warn>

        <Task n={11} q={<>Írd át hengerkoordinátákra és számítsd ki: <M t="\int_{-2}^2 \int_{-\sqrt{4-x^2}}^{\sqrt{4-x^2}} \int_{\sqrt{x^2+y^2}}^2 dz\,dy\,dx" />!</>}>
          <p>
            A tartomány az <M t="r \le z \le 2" /> kúp, <M t="0 \le r \le 2" /> körlemezen:{' '}
            <M t="\int_0^{2\pi}\!d\theta \int_0^2 (2 - r)\,r\,dr = 2\pi\big[r^2 - \frac{r^3}{3}\big]_0^2 = \frac{8\pi}{3}" />{' '}
            (pontosan a 2 sugarú, 2 magas kúp térfogata!).
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki: <M t="\iiint_{x^2+y^2+z^2 \le 4} \sqrt{x^2+y^2+z^2}\,dV" />!</>}>
          <p>
            Gömbi koordinátákban az integrandus <M t="\rho" />, a térfogatelem <M t="\rho^2\sin\phi" />:{' '}
            <M t="4\pi \int_0^2 \rho^3\,d\rho = 4\pi \big[\frac{\rho^4}{4}\big]_0^2 = 16\pi" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Tehetetlenségi nyomaték és fizikai alkalmazások',
    body: (
      <>
        <p>
          A 15.5 fejezetben megígértük, hogy a gömb híres <M t="I_z = \frac{2}{5}MR^2" /> tehetetlenségi nyomatékát
          gömbi koordinátákban három sor alatt bizonyítjuk! Íme: mivel a <M t="z" />-tengelytől mért távolság négyzete{' '}
          <M t="x^2 + y^2 = r^2 = \rho^2\sin^2\phi" />, kapjuk:
        </p>
        <M block t="I_z = \delta \int_0^{2\pi}\!d\theta \int_0^\pi \sin^3\phi\,d\phi \int_0^R \rho^4\,d\rho = \delta(2\pi)\!\left(\frac{4}{3}\right)\!\left(\frac{R^5}{5}\right) = \frac{8\pi\delta R^5}{15} = \frac{2}{5}MR^2." />

        <SphereInertiaShellWidget />

        <Quiz
          q={<>Hogyan írható fel a <M t="z" />-tengelytől mért távolság négyzete (<M t="x^2 + y^2" />) gömbi koordinátákban?</>}
          options={[
            { label: <M t="\rho^2" /> },
            { label: <M t="\rho^2\cos^2\phi" /> },
            { label: <M t="\rho^2\sin^2\phi" />, ok: true },
            { label: <M t="\rho\sin\phi" /> },
          ]}
          explain={
            <>
              Mivel <M t="r = \rho\sin\phi" />, a <M t="z" />-tengelytől mért távolság négyzete{' '}
              <M t="x^2 + y^2 = r^2 = \rho^2\sin^2\phi" />!
            </>
          }
        />

        <Task n={13} q={<>Vezesd le hengerkoordinátákban egy homogén <M t="R" /> sugarú, <M t="h" /> magas, <M t="M" /> tömegű henger <M t="I_z" /> tehetetlenségi nyomatékát!</>}>
          <p>
            <M t="I_z = \delta \int_0^{2\pi}\!d\theta \int_0^h dz \int_0^R r^2 \cdot r\,dr = \delta(2\pi h)\frac{R^4}{4} = \frac{1}{2}(\delta\pi R^2 h)R^2 = \frac{1}{2}MR^2" />!
          </p>
        </Task>

        <Task n={14} q={<>Egy <M t="R" /> sugarú gömb sűrűsége arányos a középponttól mért távolsággal: <M t="\delta = k\rho" />. Mekkora a teljes tömege?</>}>
          <p>
            <M t="M = \int_0^{2\pi}\!d\theta \int_0^\pi \sin\phi\,d\phi \int_0^R (k\rho)\,\rho^2\,d\rho = 4\pi k\big[\frac{\rho^4}{4}\big]_0^R = \pi k R^4" />.
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
        <CylSphMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Alakítsd át a <M t="(r; \theta; z) = \big(3;\; \frac{\pi}{2};\; -2\big)" /> hengerkoordinátájú pontot derékszögűre!</>}>
          <p>
            <M t="x = 3\cos\frac{\pi}{2} = 0" />, <M t="y = 3\sin\frac{\pi}{2} = 3" />, <M t="z = -2" />, azaz{' '}
            <M t="(0;\; 3;\; -2)" />.
          </p>
        </Task>

        <Task n={16} q={<>Milyen felületet ír le a <M t="\rho = 5" /> és a <M t="\phi = \frac{\pi}{2}" /> egyenlet gömbi koordinátákban?</>}>
          <p>
            <M t="\rho = 5" /> az origó középpontú, 5 sugarú <strong>gömb</strong>; <M t="\phi = \frac{\pi}{2}" /> az{' '}
            <strong><M t="xy" />-sík</strong> (<M t="z = 0" />).
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki: <M t="\int_0^{2\pi}\!\int_0^1\!\int_0^4 r\,dz\,dr\,d\theta" />!</>}>
          <p>
            <M t="2\pi \cdot \big[\frac{r^2}{2}\big]_0^1 \cdot 4 = 4\pi" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki a <M t="z = 9 - x^2 - y^2" /> paraboloid és a <M t="z = 0" /> sík közötti térfogatot hengerkoordinátákban!</>}>
          <p>
            <M t="0 \le z \le 9 - r^2" />, <M t="0 \le r \le 3" />:{' '}
            <M t="V = 2\pi \int_0^3 (9r - r^3)\,dr = 2\pi\big[\frac{9}{2}r^2 - \frac{r^4}{4}\big]_0^3 = 2\pi\big(\frac{81}{2} - \frac{81}{4}\big) = \frac{81\pi}{2}" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki a <M t="1 \le x^2 + y^2 + z^2 \le 4" /> gömbhéjon az <M t="\iiint \frac{1}{x^2+y^2+z^2}\,dV" /> integrált!</>}>
          <p>
            <M t="\frac{1}{\rho^2} \cdot \rho^2\sin\phi = \sin\phi" />! Így{' '}
            <M t="4\pi \int_1^2 1\,d\rho = 4\pi" />!
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="x^2 + y^2 + z^2 \le R^2" /> gömbnek az <M t="x^2 + y^2 \ge a^2" /> (<M t="0 < a < R" />) hengerrel kifúrt részének (szalvétagyűrű!) térfogatát!</>}>
          <p>
            Hengerkoordinátákban <M t="a \le r \le R" />, <M t="-\sqrt{R^2-r^2} \le z \le \sqrt{R^2-r^2}" />:{' '}
            <M t="V = 2\pi \int_a^R 2\sqrt{R^2-r^2}\,r\,dr = 4\pi\big[-\frac{1}{3}(R^2-r^2)^{3/2}\big]_a^R = \frac{4\pi}{3}(R^2-a^2)^{3/2}" />!
            (Híres paradoxon: mivel a gyűrű magassága <M t="h = 2\sqrt{R^2-a^2}" />, a térfogat{' '}
            <M t="V = \frac{\pi}{6}h^3" /> — független a gömb <M t="R" /> sugarától!)
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="\rho = 2a\cos\phi" /> gömbnek a <M t="\phi = \frac{\pi}{4}" /> kúpon belüli (<M t="0 \le \phi \le \frac{\pi}{4}" />) térfogatát!</>}>
          <p>
            <M t="V = 2\pi \int_0^{\pi/4}\sin\phi \int_0^{2a\cos\phi} \rho^2\,d\rho\,d\phi = \frac{16\pi a^3}{3}\int_0^{\pi/4}\cos^3\phi\sin\phi\,d\phi = \frac{16\pi a^3}{3}\big[-\frac{\cos^4\phi}{4}\big]_0^{\pi/4} = \frac{4\pi a^3}{3}\big(1 - \frac{1}{4}\big) = \pi a^3" />!
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="\iiint_{\mathbb{R}^3} e^{-(x^2+y^2+z^2)}\,dV" /> 3D Gauss-integrált gömbi koordinátákban (a 15.3 fejezet <M t="\int_0^\infty e^{-\rho^2}\,d\rho = \frac{\sqrt{\pi}}{2}" /> eredményét felhasználva)!</>}>
          <p>
            <M t="4\pi \int_0^\infty \rho^2 e^{-\rho^2}\,d\rho" />. Parciális integrálással (<M t="u = \rho,\; dv = \rho e^{-\rho^2}d\rho" />):{' '}
            <M t="\int_0^\infty \rho^2 e^{-\rho^2}\,d\rho = \frac{1}{2}\int_0^\infty e^{-\rho^2}\,d\rho = \frac{\sqrt{\pi}}{4}" />.
            Így az eredmény <M t="4\pi \cdot \frac{\sqrt{\pi}}{4} = \pi^{3/2}" />!
          </p>
        </Task>

        <Task n={23} q={<>Igazold, hogy egy <M t="R_1" /> belső és <M t="R_2" /> külső sugarú homogén gömbhéj tehetetlenségi nyomatéka a <M t="z" />-tengelyre <M t="I_z = \frac{2}{5}M\dfrac{R_2^5 - R_1^5}{R_2^3 - R_1^3}" />, és <M t="R_1 \to R_2" /> határesetben <M t="\frac{2}{3}MR_2^2" />!</>}>
          <p>
            A 7. oldal integráljában csak <M t="\int_{R_1}^{R_2} \rho^4\,d\rho = \frac{R_2^5-R_1^5}{5}" /> változik, a
            tömeg pedig <M t="M = \frac{4\pi\delta}{3}(R_2^3 - R_1^3)" />. Elosztva megkapjuk a képletet!{' '}
            <M t="R_1 \to R_2" />-nél L’Hospital-szabállyal:{' '}
            <M t="\lim_{q\to 1}\frac{2}{5}\frac{1-q^5}{1-q^3} = \frac{2}{5}\cdot\frac{5}{3} = \frac{2}{3}" />!
          </p>
        </Task>
      </>
    ),
  },
];
