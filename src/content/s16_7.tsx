import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ClosedSphereCancel3DWidget,
  Curl3DDetectorWidget,
  MaxwellFaradayWidget,
  StokesDomeRightHand3DWidget,
  StokesMasterMapDiagram,
  SurfaceIndependence3DWidget,
  TiltedPlaneStokes3DWidget,
  VectorIdentitiesChainWidget,
} from '../components/Widgets167';
import type { Page } from './s1_1';

export const S16_7: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A 3D rotáció (∇ × F): az örvényesség vektora',
    body: (
      <>
        <Story>
          <p>
            A 16.4 fejezetben a síkbeli örvényességet egyetlen szám (<M t="N_x - M_y" />) mérte. Három dimenzióban egy
            apró lapátkerék <em>bármely irányú</em> tengely körül foroghat! Ezért a 3D örvényességet egy{' '}
            <strong>vektor</strong> írja le: a <strong>rotáció</strong> (<M t="\operatorname{rot}\mathbf{F} = \nabla\times\mathbf{F}" />),
            amely a forgástengely irányába mutat!
          </p>
        </Story>

        <Def title="Vektormező 3D rotációja (curl)">
          <p>
            Az <M t="\mathbf{F} = \langle M, N, P \rangle" /> differenciálható 3D vektormező <strong>rotációja</strong>:
          </p>
          <M block t="\operatorname{rot}\mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ M & N & P \end{vmatrix} = \left\langle \frac{\partial P}{\partial y} - \frac{\partial N}{\partial z},\;\; \frac{\partial M}{\partial z} - \frac{\partial P}{\partial x},\;\; \frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} \right\rangle." />
        </Def>

        <Curl3DDetectorWidget />

        <Task n={1} q={<>Számítsd ki az <M t="\mathbf{F}(x, y, z) = \langle yz,\; xz,\; xy \rangle" /> mező rotációját!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle x - x,\; y - y,\; z - z \rangle = \mathbf{0}" /> (nem csoda, hiszen{' '}
            <M t="\mathbf{F} = \nabla(xyz)" /> konzervatív!).
          </p>
        </Task>

        <Task n={2} q={<>Számítsd ki az <M t="\mathbf{F}(x, y, z) = \langle -y,\; x,\; z^2 \rangle" /> mező rotációját!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle 0 - 0,\; 0 - 0,\; 1 - (-1) \rangle = \langle 0,\; 0,\; 2 \rangle = 2\mathbf{k}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Stokes-tétel: Green-tétel 3D-s általánosítása',
    body: (
      <>
        <p>
          Green tétele egy lapos síktartomány <M t="R" /> peremét kötötte össze a belsejével. George Gabriel Stokes
          zseniális tétele pontosan ugyanezt teszi egy <strong>térbeli, görbült <M t="S" /> felülettel</strong> és
          annak <M t="C" /> peremgörbéjével!
        </p>

        <Def title="Stokes-tétel">
          <p>
            Legyen <M t="S" /> irányított, szakaszonként sima felület <M t="\mathbf{n}" /> egységnormálissal, amelyet
            az egyszerű, zárt, szakaszonként sima <M t="C" /> görbe határol a <strong>jobbkéz-szabály</strong> szerinti
            pozitív irányítással. Ekkor minden folytonosan differenciálható <M t="\mathbf{F}" /> vektormezőre:
          </p>
          <M block t="\oint_C \mathbf{F}\cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F})\cdot\mathbf{n}\,d\sigma." />
        </Def>

        <StokesDomeRightHand3DWidget />

        <Quiz
          q={<>Ha a felfelé irányított (<M t="\mathbf{n} = +\mathbf{k}" />) <M t="xy" />-síkban fekvő síklapra alkalmazzuk Stokes tételét, melyik korábbi tételt kapjuk vissza?</>}
          options={[
            { label: <>A 15.7-es Jacobi-tételt</> },
            { label: <>Green-tétel cirkulációs alakját (<M t="\oint M\,dx + N\,dy = \iint (N_x - M_y)\,dA" />)</>, ok: true },
            { label: <>Green-tétel fluxus-alakját</> },
            { label: <>Kepler II. törvényét</> },
          ]}
          explain={
            <>
              <M t="(\nabla\times\mathbf{F})\cdot\mathbf{k} = N_x - M_y" />, így Stokes-tétel lapos síkban szó szerint
              megegyezik Green-tétellel!
            </>
          }
        />

        <Task n={3} q={<>Ellenőrizd Stokes-tétel mindkét oldalát az <M t="\mathbf{F} = \langle -y, x, 0 \rangle" /> mezőre a <M t="z = \sqrt{1 - x^2 - y^2}" /> felső félgömbön!</>}>
          <p>
            Bal oldal (egységkör <M t="z=0" />-ban): <M t="\oint (-y\,dx + x\,dy) = 2\pi" />. Jobb oldal:{' '}
            <M t="\nabla\times\mathbf{F} = \langle 0, 0, 2 \rangle" />, fluxusa a félgömbön{' '}
            <M t="\iint_{x^2+y^2\le 1} 2\,dA = 2\pi" /> — pontos egyezés!
          </p>
        </Task>

        <Task n={4} q={<>Mi történik Stokes-tétel jobb oldalával, ha a <M t="C" /> peremgörbét ellentétes irányban járjuk be?</>}>
          <p>
            A jobbkéz-szabály miatt <M t="\mathbf{n}" /> helyére <M t="-\mathbf{n}" /> lép, így mindkét oldal
            előjelet vált!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Stokes-tétel használata: 3D görbe → sík felület',
    body: (
      <>
        <p>
          Ha egy 3D zárt görbe egy ferde síkban fekszik (pl. henger és ferde sík metszete, vagy egy 3D háromszög),
          Stokes-tétel segítségével a 3D vonalintegrált egyetlen kényelmes síklap-integrállá alakítjuk!
        </p>

        <TiltedPlaneStokes3DWidget />

        <Steps
          title="3D ferde ellipszis vonalintegrálja Stokes-tétellel"
          problem={
            <>
              Számítsd ki az <M t="\oint_C (-y^2\,dx + x\,dy + z^2\,dz)" /> integrált, ahol <M t="C" /> az{' '}
              <M t="x^2 + y^2 = 1" /> henger és a <M t="y + z = 2" /> sík metszésgörbéje (felülről nézve CCW)!
            </>
          }
          steps={[
            {
              title: 'Számítsuk ki ∇ × F-et',
              body: (
                <>
                  <M t="\mathbf{F} = \langle -y^2, x, z^2 \rangle \Rightarrow \nabla\times\mathbf{F} = \langle 0,\; 0,\; 1 - (-2y) \rangle = \langle 0,\; 0,\; 1 + 2y \rangle" />.
                </>
              ),
            },
            {
              title: 'Válasszuk S-nek a ferde z = 2 − y síklapot',
              body: (
                <>
                  Felfelé irányított normális (CCW peremhez): <M t="\mathbf{n}\,d\sigma = \langle -z_x, -z_y, 1 \rangle\,dA = \langle 0,\; 1,\; 1 \rangle\,dA" />.
                </>
              ),
            },
            {
              title: 'Skalárszorzat és integrálás az xy-árnyékon',
              body: (
                <>
                  <M t="(\nabla\times\mathbf{F})\cdot\mathbf{n}\,d\sigma = (1 + 2y)\,dA" />. Az <M t="x^2+y^2\le 1" />{' '}
                  egységkörön szimmetriából <M t="\iint 2y\,dA = 0" />, így marad <M t="\iint 1\,dA = \pi" />!
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki Stokes-tétellel az <M t="\oint_C (z\,dx + x\,dy + y\,dz)" /> integrált a <M t="(1;0;0) \to (0;1;0) \to (0;0;1) \to (1;0;0)" /> háromszög kerületén!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle 1, 1, 1 \rangle" />. A háromszög síkja <M t="z = 1 - x - y" />,{' '}
            <M t="\mathbf{n}\,d\sigma = \langle 1, 1, 1 \rangle\,dA" />. Skalárszorzat: <M t="3\,dA" />. Az{' '}
            <M t="xy" />-árnyék területe <M t="\frac{1}{2}" />, tehát az eredmény <M t="3\cdot\frac{1}{2} = \frac{3}{2}" />!
          </p>
        </Task>

        <Task n={6} q={<>Mennyi az <M t="\oint_C (y\,dx + z\,dy + x\,dz)" /> integrál ugyanezen a háromszögön?</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle -1, -1, -1 \rangle" />, így az előző feladat ellentettje:{' '}
            <M t="-\frac{3}{2}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Felületfüggetlenség: bonyolult kupola → lapos körlemez!',
    body: (
      <>
        <p>
          Stokes-tétel <strong>visszafelé</strong> is zseniális: ha egy bonyolult <M t="S_1" /> kupolán kell kiszámolni{' '}
          <M t="\nabla\times\mathbf{F}" /> fluxusát, egyszerűen lecserélhetjük egy másik,{' '}
          <strong>ugyanazzal a <M t="C" /> peremmel</strong> rendelkező, lapos <M t="S_2" /> felületre (vagy
          közvetlenül a <M t="C" /> perem vonalintegráljára)!
        </p>

        <SurfaceIndependence3DWidget />

        <Quiz
          q={<>Mennyi az <M t="\iint_S (\nabla \times \mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrál egy <em>zárt</em>, sima felületen (pl. egy teljes gömbön vagy tóruszon)?</>}
          options={[
            { label: <M t="4\pi" /> },
            { label: <M t="0" />, ok: true },
            { label: <>A térfogat háromszorosa</> },
            { label: <>Csak konzervatív mezőnél 0</> },
          ]}
          explain={
            <>
              Egy zárt felületnek <strong>nincs pereme</strong> (<M t="C = \emptyset" />), ezért a rotáció fluxusa
              minden zárt felületen azonosan <M t="0" />!
            </>
          }
        />

        <Task n={7} q={<>Számítsd ki az <M t="\iint_S (\nabla \times \mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrált a <M t="z = 4 - x^2 - y^2" /> (<M t="z \ge 0" />) paraboloidon, ha <M t="\mathbf{F} = \langle -y + z^5,\; x + e^z,\; x^2 y^2 z \rangle" />!</>}>
          <p>
            Cseréljük le a paraboloidot a <M t="z = 0" /> síkbeli <M t="x^2 + y^2 \le 4" /> körlemezre (<M t="\mathbf{n}=\mathbf{k}" />)!
            Vagy a <M t="z = 0" /> peremkörön (<M t="dz = 0" />): <M t="\oint (-y\,dx + x\,dy) = 2\cdot (4\pi) = 8\pi" />!
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki az <M t="\iint_S (\nabla \times \mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrált az <M t="x^2 + y^2 + z^2 = 9,\; z \ge 0" /> félgömbön, ha <M t="\mathbf{F} = \langle 2y,\; 5x,\; z^3 \rangle" />!</>}>
          <p>
            A lapos <M t="z = 0" /> körlemezen (<M t="R = 3" />): <M t="(\nabla\times\mathbf{F})\cdot\mathbf{k} = 5 - 2 = 3" />.
            Így az integrál <M t="3 \cdot 9\pi = 27\pi" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A két nagy vektoranalitikai azonosság',
    body: (
      <>
        <p>
          A három alapvető differenciáloperátor (<strong>gradiens</strong>, <strong>rotáció</strong>,{' '}
          <strong>divergencia</strong>) között két mély, egyetemes azonosság áll fenn, amelyet minden fizikus és
          matematikus álmából felkeltve is tud:
        </p>

        <VectorIdentitiesChainWidget />

        <Task n={9} q={<>Ellenőrizd közvetlen deriválással, hogy <M t="\mathbf{F} = \langle xy,\; yz,\; zx \rangle" /> esetén valóban <M t="\nabla\cdot(\nabla\times\mathbf{F}) = 0" />!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle -y,\; -z,\; -x \rangle" />. Ennek divergenciája:{' '}
            <M t="\frac{\partial(-y)}{\partial x} + \frac{\partial(-z)}{\partial y} + \frac{\partial(-x)}{\partial z} = 0 + 0 + 0 = 0" />!
          </p>
        </Task>

        <Task n={10} q={<>Létezhet-e olyan <M t="\mathbf{F}" /> vektormező, amelyre <M t="\nabla\times\mathbf{F} = \langle x,\; y,\; z \rangle" />?</>}>
          <p>
            <strong>Nem!</strong> Mert <M t="\nabla\cdot\langle x, y, z \rangle = 3 \neq 0" />, márpedig minden rotáció
            divergenciája kötelezően <M t="0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Zárt felületek és az „5 fal helyett 1 fedőlap” trükk',
    body: (
      <>
        <p>
          Ha egy zárt felületet kettévágunk az Egyenlítő mentén, a két félgömb peremintegrálja kioltja egymást.
          Ugyanez a logika teszi lehetővé, hogy egy 5 oldallapból álló nyitott doboz rotáció-fluxusát egyetlen
          hiányzó alaplapon számoljuk ki!
        </p>

        <ClosedSphereCancel3DWidget />

        <Task n={11} q={<>Mennyi az <M t="\iint_S (\nabla\times\mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrál a teljes <M t="x^2 + 4y^2 + 9z^2 = 36" /> ellipszoidon bármely sima <M t="\mathbf{F}" /> esetén?</>}>
          <p>
            Mivel az ellipszoid zárt felület (nincs pereme), az integrál automatikusan <M t="0" />!
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki az <M t="\mathbf{F} = \langle -y,\; x,\; xyz \rangle" /> mező rotációjának kifelé fluxusát a <M t="[0, 1]^3" /> kocka felső és oldalsó 5 lapján (az alsó <M t="z = 0" /> lap hiányzik)!</>}>
          <p>
            Az 5 lap pereme a <M t="z = 0" /> négyzet (CCW) — cseréljük le a felfelé irányított (<M t="\mathbf{n}=\mathbf{k}" />)
            alsó négyzetre! <M t="(\nabla\times\mathbf{F})\cdot\mathbf{k} = 1 - (-1) = 2 \Rightarrow 2 \cdot 1 = 2" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Maxwell-egyenletek: Faraday és Ampère törvénye',
    body: (
      <>
        <p>
          Az elektromágnesség két alappillére — a generátorok működését leíró <strong>Faraday-törvény</strong> és a
          mágneses teret leíró <strong>Ampère-törvény</strong> — pontosan Stokes-tétellel köti össze az integrálos és
          a differenciális alakot!
        </p>

        <MaxwellFaradayWidget />

        <Quiz
          q={<>Az 5 oldallapból álló nyitott kockán (<M t="z = 0" /> hiányzik) <M t="\iint_{S_5} (\nabla\times\mathbf{F})\cdot\mathbf{n}\,d\sigma" /> kiszámításához melyik irányú <M t="z = 0" /> lapra cserélhetjük le <M t="S_5" />-öt?</>}
          options={[
            { label: <>A felfelé (<M t="+\mathbf{k}" />) irányított <M t="z = 0" /> lapra</>, ok: true },
            { label: <>A lefelé (<M t="-\mathbf{k}" />) irányított <M t="z = 0" /> lapra</> },
            { label: <>Nem cserélhető le, mind az 5 lapot integrálni kell</> },
            { label: <>Csak akkor, ha <M t="\nabla\times\mathbf{F} = \mathbf{0}" /></> },
          ]}
          explain={
            <>
              Az <M t="S_5" /> kifelé normálisa a <M t="z=0" /> peremen CCW irányt indukál — ehhez a jobbkéz-szabály
              szerint a <strong>felfelé</strong> (<M t="+\mathbf{k}" />) mutató normális tartozik a lapos alaplapon!
            </>
          }
        />

        <Task n={13} q={<>Egy végtelen egyenes vezetékben <M t="I" /> áram folyik. Ampère-törvénnyel (<M t="\oint_C \mathbf{B}\cdot d\mathbf{r} = \mu_0 I" />) határozd meg a <M t="B" /> mágneses indukció nagyságát <M t="r" /> távolságban!</>}>
          <p>
            Szimmetriából a <M t="r" /> sugarú körön <M t="B" /> állandó és érintőirányú:{' '}
            <M t="B \cdot 2\pi r = \mu_0 I \Rightarrow B = \dfrac{\mu_0 I}{2\pi r}" />!
          </p>
        </Task>

        <Task n={14} q={<>Miért következik Stokes-tételből, hogy ha <M t="\nabla\times\mathbf{F} = \mathbf{0}" /> az egész <M t="\mathbb{R}^3" /> térben, akkor <M t="\mathbf{F}" /> konzervatív?</>}>
          <p>
            Minden zárt <M t="C" /> görbére kifeszíthető egy <M t="S" /> felület <M t="\mathbb{R}^3" />-ban, így{' '}
            <M t="\oint_C \mathbf{F}\cdot d\mathbf{r} = \iint_S \mathbf{0}\cdot\mathbf{n}\,d\sigma = 0" /> →
            útfüggetlen, tehát konzervatív!
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
        <StokesMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 2z,\; 3x,\; 4y \rangle" /> mező rotációját!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle 4,\; 2,\; 3 \rangle" />.
          </p>
        </Task>

        <Task n={16} q={<>Mennyi az <M t="\iint_S (\nabla\times\mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrál a 7 sugarú teljes gömbön, ha <M t="\mathbf{F} = \langle e^{yz}, \sin(xz), x^3 y \rangle" />?</>}>
          <p>
            Zárt felület → pontosan <M t="0" />!
          </p>
        </Task>

        <Task n={17} q={<>Igaz-e, hogy <M t="\nabla\times\langle x^2, y^3, z^4 \rangle = \mathbf{0}" />?</>}>
          <p>
            Igen, minden vegyes parciális derivált <M t="0" />!
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki Stokes-tétellel: <M t="\oint_C (2y\,dx + 5x\,dy + z^2\,dz)" />, ahol <M t="C" /> a <M t="z = 3" /> síkban fekvő, 2 sugarú CCW kör!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle 0, 0, 3 \rangle" />, a körlemez területe <M t="4\pi" /> →{' '}
            <M t="3\cdot 4\pi = 12\pi" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\iint_S (\nabla\times\mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrált a <M t="z = 9 - x^2 - y^2" /> (<M t="z \ge 0" />) paraboloidon, ha <M t="\mathbf{F} = \langle -3y,\; x,\; z^2 \rangle" />!</>}>
          <p>
            A <M t="z = 0" /> körlemezen (<M t="R = 3" />): <M t="(\nabla\times\mathbf{F})\cdot\mathbf{k} = 1 - (-3) = 4" />.
            Eredmény: <M t="4 \cdot 9\pi = 36\pi" />!
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x^2 y,\; y^2 z,\; z^2 x \rangle" /> mező rotációját és ellenőrizd, hogy a divergenciája 0!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle -y^2,\; -z^2,\; -x^2 \rangle" />. Divergenciája:{' '}
            <M t="0 + 0 + 0 = 0" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="\oint_C \mathbf{F}\cdot d\mathbf{r}" /> integrált, ahol <M t="\mathbf{F} = \langle y,\; 2z,\; 3x \rangle" />, <M t="C" /> pedig az <M t="x^2 + y^2 = 4" /> henger és a <M t="z = x + 3" /> sík metszése (felülről CCW)!</>}>
          <p>
            <M t="\nabla\times\mathbf{F} = \langle -2,\; -3,\; -1 \rangle" />. A ferde sík felfelé normálisa{' '}
            <M t="\mathbf{n}\,d\sigma = \langle -1, 0, 1 \rangle\,dA" />. Skalárszorzat:{' '}
            <M t="(-2)(-1) + 0 + (-1)(1) = 1" />. Az <M t="R = 2" /> körlemez területe <M t="4\pi" />, így az
            eredmény <M t="4\pi" />!
          </p>
        </Task>

        <Task n={22} q={<>Bizonyítsd be, hogy egy állandó <M t="\mathbf{c}" /> vektorra <M t="\mathbf{F} = \mathbf{c} \times \mathbf{r}" /> esetén <M t="\nabla\times\mathbf{F} = 2\mathbf{c}" />!</>}>
          <p>
            Legyen <M t="\mathbf{c} = \langle c_1, c_2, c_3 \rangle" />. Ekkor{' '}
            <M t="\mathbf{c}\times\mathbf{r} = \langle c_2 z - c_3 y,\; c_3 x - c_1 z,\; c_1 y - c_2 x \rangle" />.
            Rotációja: <M t="\langle c_1 - (-c_1),\; c_2 - (-c_2),\; c_3 - (-c_3) \rangle = 2\mathbf{c}" />!
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki az <M t="\iint_S (\nabla\times\mathbf{F})\cdot\mathbf{n}\,d\sigma" /> integrált a <M t="z = \sqrt{1 - x^2 - y^2}" /> félgömbön, ha <M t="\mathbf{F} = \langle yz,\; -xz,\; z^3 \rangle" />!</>}>
          <p>
            A <M t="z = 0" /> peremkörön <M t="\mathbf{F}(x, y, 0) = \langle 0, 0, 0 \rangle" />! Így Stokes-tétellel{' '}
            <M t="\oint_C \mathbf{0}\cdot d\mathbf{r} = 0" /> egyetlen másodperc alatt!
          </p>
        </Task>
      </>
    ),
  },
];
