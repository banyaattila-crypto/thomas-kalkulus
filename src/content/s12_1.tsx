import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AxesDistanceDiagram,
  CoordinatePlanesWidget,
  CylinderVsCircle3DWidget,
  DistanceBox3DWidget,
  Map2Dvs3DDiagram,
  Space3DPointWidget,
  Sphere3DWidget,
  SphereSlice3DWidget,
} from '../components/Widgets121';
import type { Page } from './s1_1';

export const S12_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A jobbsodrású 3D koordináta-rendszer és az oktánsok',
    body: (
      <>
        <Story>
          <p>
            Az I–II. kötetben és a 10–11. fejezetben szinte végig a síkban éltünk. Most kinyitjuk a harmadik dimenziót!
            Ahhoz, hogy egy drón, egy műhold vagy egy molekula pontos helyét megadjuk a térben, két szám már nem elég:
            kell a <strong>magasság (<M t="z" />)</strong> is. Üdv a 12. fejezetben — a vektorok és a tér geometriájának
            világában!
          </p>
        </Story>

        <Def title="Derékszögű, jobbsodrású 3D koordináta-rendszer">
          <p>
            Három, az origóban páronként merőlegesen metsződő számegyenes (<M t="x" />, <M t="y" />, <M t="z" />) alkotja
            a <strong>háromdimenziós koordináta-rendszert</strong> (<M t="\mathbb{R}^3" />). A rendszer{' '}
            <strong>jobbsodrású</strong>, ha jobb kezed ujjait a pozitív <M t="x" />-tengelytől a pozitív <M t="y" />
            -tengely felé hajlítva a hüvelykujjad a pozitív <M t="z" />-tengely irányába mutat.
          </p>
          <p>
            A három koordinátasík (<M t="xy" />-, <M t="yz" />- és <M t="xz" />-sík) <strong>nyolc térnyolcadra (oktánsra)</strong>{' '}
            osztja a teret. Az <strong>első oktánsban</strong> mindhárom koordináta pozitív (<M t="x>0, y>0, z>0" />).
          </p>
        </Def>

        <Space3DPointWidget />

        <Task n={1} q={<>Add meg a <M t="P(2;\,-3;\,5)" /> pont merőleges vetületeit a három koordinátasíkra és a három koordinátatengelyre!</>}>
          <p>
            Vetületek a síkokra (a kimaradó koordinátát 0-ra állítjuk): <M t="xy" />-síkra <M t="(2;\,-3;\,0)" />,{' '}
            <M t="yz" />-síkra <M t="(0;\,-3;\,5)" />, <M t="xz" />-síkra <M t="(2;\,0;\,5)" />.
            <br />
            Vetületek a tengelyekre: <M t="x" />-tengelyre <M t="(2;\,0;\,0)" />, <M t="y" />-tengelyre{' '}
            <M t="(0;\,-3;\,0)" />, <M t="z" />-tengelyre <M t="(0;\,0;\,5)" />.
          </p>
        </Task>

        <Task n={2} q={<>Melyik koordinátasíkban vagy tengelyen fekszenek az alábbi pontok: (a) <M t="(0;\,4;\,-1)" />, (b) <M t="(0;\,0;\,-7)" />, (c) <M t="(-2;\,0;\,3)" />?</>}>
          <p>
            (a) <M t="x=0 \implies yz" />-síkban; (b) <M t="x=y=0 \implies z" />-tengelyen; (c) <M t="y=0 \implies xz" />-síkban.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Síkok és egyenesek egyszerű egyenletei a térben',
    body: (
      <>
        <p>
          A síkban (<M t="\mathbb{R}^2" />) az <M t="x = 2" /> egyenlet egy egyenest jelentett. A térben (<M t="\mathbb{R}^3" />)
          egy <em>egyetlen</em> egyenlet egy szabadsági fokot vesz el a háromból, ezért <strong>felületet (síkot)</strong>{' '}
          ír le! Egyeneshez már <em>két</em> egyenlet metszete kell.
        </p>

        <ul>
          <li><M t="z = c" /> — az <M t="xy" />-síkkal párhuzamos, <M t="c" /> magasságú vízszintes sík.</li>
          <li><M t="x = a" /> — az <M t="yz" />-síkkal párhuzamos függőleges sík.</li>
          <li><M t="y = b" /> — az <M t="xz" />-síkkal párhuzamos függőleges sík.</li>
          <li><M t="x = a \text{ és } y = b" /> együtt — a <M t="z" />-tengellyel párhuzamos egyenes az <M t="(a;\,b;\,0)" /> ponton át!</li>
        </ul>

        <CoordinatePlanesWidget />

        <Task n={3} q={<>Írd le geometriailag a következő halmazokat <M t="\mathbb{R}^3" />-ban: (a) <M t="y = -3" />, (b) <M t="x = 1,\; z = 4" />, (c) <M t="x = y" />!</>}>
          <p>
            (a) Az <M t="xz" />-síkkal párhuzamos sík <M t="y = -3" />-nál. (b) Az <M t="y" />-tengellyel párhuzamos
            egyenes, amely áthalad az <M t="(1;\,0;\,4)" /> ponton. (c) Függőleges sík, amely tartalmazza a{' '}
            <M t="z" />-tengelyt, és felezi az <M t="xy" />-sík I. és III. negyedét!
          </p>
        </Task>

        <Task n={4} q={<>Add meg annak a három koordinátasíkkal párhuzamos síknak az egyenletét, amelyek a <M t="(-2;\,5;\,1)" /> pontban metszik egymást!</>}>
          <p>
            <M t="x = -2" />, <M t="y = 5" /> és <M t="z = 1" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Távolság és felezőpont a térben',
    body: (
      <>
        <p>
          Két térbeli pont, <M t="P_1(x_1;\,y_1;\,z_1)" /> és <M t="P_2(x_2;\,y_2;\,z_2)" /> távolságát a Pitagorasz-tétel{' '}
          <strong>kétszeri alkalmazásával</strong> kapjuk meg: először az alaplap átlóját számoljuk ki, majd abból és{' '}
          <M t="\Delta z" />-ből a téglatest testátlóját!
        </p>

        <Def title="Térbeli távolság- és felezőpont-képlet">
          <M block t="|P_1 P_2| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}" />
          <p>
            A <M t="P_1 P_2" /> szakasz felezőpontja a koordináták átlaga:
            <M block t="M = \left(\frac{x_1 + x_2}{2};\; \frac{y_1 + y_2}{2};\; \frac{z_1 + z_2}{2}\right)." />
          </p>
        </Def>

        <DistanceBox3DWidget />

        <Quiz
          q={<>Mekkora a <M t="P(1;\,-2;\,3)" /> pont távolsága az <M t="xy" />-síktól és a <M t="z" />-tengelytől?</>}
          options={[
            { label: <><M t="xy" />-síktól: <M t="3" />, <M t="z" />-tengelytől: <M t="\sqrt{5}" /></>, ok: true },
            { label: <><M t="xy" />-síktól: <M t="\sqrt{5}" />, <M t="z" />-tengelytől: <M t="3" /></> },
            { label: <>Mindkettőtől <M t="\sqrt{14}" /></> },
            { label: <><M t="xy" />-síktól: <M t="1" />, <M t="z" />-tengelytől: <M t="2" /></> },
          ]}
          explain={
            <>
              Az <M t="xy" />-síktól (<M t="z=0" />) való távolság <M t="|z| = 3" />, a <M t="z" />-tengelytől (ahol a
              legközelebbi pont <M t="(0;\,0;\,3)" />) pedig <M t="\sqrt{x^2 + y^2} = \sqrt{1^2 + (-2)^2} = \sqrt{5}" />.
            </>
          }
        />

        <Task n={5} q={<>Számítsd ki az <M t="A(2;\,-1;\,4)" /> és <M t="B(-1;\,3;\,4)" /> pontok távolságát és felezőpontját!</>}>
          <p>
            <M t="|AB| = \sqrt{(-1-2)^2 + (3-(-1))^2 + (4-4)^2} = \sqrt{9 + 16 + 0} = 5" />. Felezőpont:{' '}
            <M t="M = \left(\frac{1}{2};\; 1;\; 4\right)" />.
          </p>
        </Task>

        <Task n={6} q={<>Derékszögű-e az <M t="A(1;\,0;\,1)" />, <M t="B(3;\,2;\,0)" />, <M t="C(2;\,3;\,3)" /> háromszög?</>}>
          <p>
            Oldalhosszak négyzetei: <M t="AB^2 = 4 + 4 + 1 = 9" />, <M t="AC^2 = 1 + 9 + 4 = 14" />,{' '}
            <M t="BC^2 = 1 + 1 + 9 = 11" />. Mivel <M t="9 + 11 = 20 \ne 14" /> (a két kisebb négyzetösszege nem egyenlő
            a legnagyobbal), a háromszög <strong>nem derékszögű</strong> (hegyesszögű).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A gömb egyenlete és teljes négyzetté alakítás',
    body: (
      <>
        <p>
          A kör háromdimenziós testvére a <strong>gömb</strong>: azoknak a <M t="P(x;\,y;\,z)" /> pontoknak a halmaza,
          amelyek a <M t="C(x_0;\,y_0;\,z_0)" /> középponttól pontosan <M t="a" /> távolságra vannak.
        </p>

        <Def title="A gömb kanonikus egyenlete">
          <M block t="(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = a^2" />
          <p>
            A gömb <em>belsejét</em> a <M t="< a^2" />, a <em>zárt gömbtestet</em> a <M t="\le a^2" />, a{' '}
            <em>külső teret</em> a <M t="> a^2" /> egyenlőtlenség írja le.
          </p>
        </Def>

        <Sphere3DWidget />

        <Steps
          title="Gömb középpontja és sugara teljes négyzetté alakítással"
          problem={<>Határozd meg az <M t="x^2 + y^2 + z^2 - 4x + 6y - 2z = 2" /> gömb középpontját és sugarát!</>}
          steps={[
            {
              title: 'Változók csoportosítása',
              body: (
                <p>
                  <M block t="(x^2 - 4x) + (y^2 + 6y) + (z^2 - 2z) = 2." />
                </p>
              ),
            },
            {
              title: 'Teljes négyzetté kiegészítés mindhárom változóra',
              body: (
                <p>
                  A fél együtthatók négyzeteit (<M t="(-2)^2 = 4" />, <M t="3^2 = 9" />, <M t="(-1)^2 = 1" />) mindkét
                  oldalhoz hozzáadjuk:
                  <M block t="(x^2 - 4x + 4) + (y^2 + 6y + 9) + (z^2 - 2z + 1) = 2 + 4 + 9 + 1 = 16." />
                </p>
              ),
            },
            {
              title: 'Középpont és sugár leolvasása',
              body: (
                <p>
                  <M t="(x - 2)^2 + (y + 3)^2 + (z - 1)^2 = 4^2" />, tehát a középpont <strong><M t="C(2;\,-3;\,1)" /></strong>,
                  a sugár pedig <strong><M t="a = \sqrt{16} = 4" /></strong>!
                </p>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Írd fel annak a gömbnek az egyenletét, amelynek egyik átmérője az <M t="A(1;\,-2;\,3)" /> és <M t="B(5;\,4;\,-1)" /> szakasz!</>}>
          <p>
            A középpont a felezőpont: <M t="C = (3;\,1;\,1)" />. A sugár <M t="|CA| = \sqrt{2^2 + (-3)^2 + 2^2} = \sqrt{17}" />.
            Az egyenlet: <M t="(x - 3)^2 + (y - 1)^2 + (z - 1)^2 = 17" />.
          </p>
        </Task>

        <Task n={8} q={<>Mi a középpontja és sugara a <M t="2x^2 + 2y^2 + 2z^2 + 4x - 8z = 6" /> gömbnek?</>}>
          <p>
            Először osszuk el az egész egyenletet 2-vel: <M t="x^2 + y^2 + z^2 + 2x - 4z = 3" />. Teljes négyzetté
            alakítva: <M t="(x + 1)^2 + y^2 + (z - 2)^2 = 3 + 1 + 4 = 8" />. Középpont: <M t="(-1;\,0;\,2)" />, sugár:{' '}
            <M t="a = \sqrt{8} = 2\sqrt{2}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Térbeli tartományok, hengerek és félgömbök',
    body: (
      <>
        <p>
          Az egyik legnagyobb „aha-élmény” 3D-ben, amikor egy 2D-ből ismerős egyenletben hiányzik a harmadik változó.
          Mivel a hiányzó változó <strong>bármilyen valós érték</strong> lehet, a 2D görbe végtelenül elcsúszik a
          hiányzó tengely mentén — így születik meg a <strong>hengerfelület</strong>!
        </p>

        <CylinderVsCircle3DWidget />

        <Quiz
          q={<>Milyen geometriai alakzatot ír le az <M t="x^2 + y^2 = 9" /> egyenlet a háromdimenziós térben (<M t="\mathbb{R}^3" />)?</>}
          options={[
            { label: <>Egy 3 sugarú kört az <M t="xy" />-síkban</> },
            { label: <>Egy 3 sugarú gömböt az origó körül</> },
            { label: <>Egy <M t="z" />-tengelyű, 3 sugarú végtelen körhengert</>, ok: true },
            { label: <>Egy 9 sugarú hengert az <M t="x" />-tengely mentén</> },
          ]}
          explain={
            <>
              Mivel <M t="z" /> nem szerepel az egyenletben, minden <M t="z \in \mathbb{R}" /> magasságban ugyanaz a 3
              sugarú kör jelenik meg — ezek együtt egy <M t="z" />-tengelyű, 3 sugarú körhengert alkotnak!
            </>
          }
        />

        <Task n={9} q={<>Írd le egyenlőtlenségekkel az origó középpontú, 2 belső és 5 külső sugarú zárt gömbhéj felső felét (<M t="z \ge 0" />)!</>}>
          <p>
            <M block t="4 \le x^2 + y^2 + z^2 \le 25 \qquad \text{és} \qquad z \ge 0." />
          </p>
        </Task>

        <Task n={10} q={<>Milyen térbeli alakzatot ír le az <M t="y^2 + z^2 \le 1,\; 0 \le x \le 4" /> egyenlőtlenségrendszer?</>}>
          <p>
            Az <M t="x" />-tengely mentén fekvő, <M t="1" /> sugarú és <M t="4" /> hosszú tömör körhenger (a két
            fedőlapjával együtt, <M t="x = 0" />-tól <M t="x = 4" />-ig).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Gömbök síkmetszetei és érintősíkjai',
    body: (
      <>
        <p>
          Ha egy gömböt egy koordinátasíkkal párhuzamos síkkal (pl. <M t="z = k" />) elmetszünk, egyszerűen
          behelyettesítjük <M t="z = k" />-t a gömb egyenletébe! Az így kapott 2D egyenlet azonnal megmondja, hogy a
          metszet <strong>kör</strong>, <strong>egyetlen érintési pont</strong>, vagy <strong>üres halmaz</strong>.
        </p>

        <SphereSlice3DWidget />

        <Task n={11} q={<>Milyen alakzatban metszi az <M t="(x-1)^2 + (y+2)^2 + (z-3)^2 = 25" /> gömböt a <M t="z = 7" /> sík?</>}>
          <p>
            Behelyettesítve <M t="z = 7" />-et: <M t="(x-1)^2 + (y+2)^2 + (7-3)^2 = 25 \implies (x-1)^2 + (y+2)^2 = 9" />.
            Ez egy <M t="(1;\,-2;\,7)" /> középpontú, <M t="3" /> sugarú kör a <M t="z = 7" /> síkban!
          </p>
        </Task>

        <Task n={12} q={<>Mekkora a sugara annak a <M t="C(3;\,-4;\,2)" /> középpontú gömbnek, amelyik pontosan érinti az <M t="yz" />-síkot?</>}>
          <p>
            Az <M t="yz" />-sík egyenlete <M t="x = 0" />, ettől <M t="C" /> távolsága <M t="|x_0| = |3| = 3" />. Tehát a
            sugár <M t="a = 3" />, és az egyenlet <M t="(x-3)^2 + (y+4)^2 + (z-2)^2 = 9" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: 2D vs. 3D és 4 tipikus hiba',
    body: (
      <>
        <Map2Dvs3DDiagram />

        <AxesDistanceDiagram />

        <Warn>
          Négy tipikus hiba 3D koordinátageometriában:
          <ol>
            <li>
              <strong><M t="x^2 + y^2 = r^2" /> körnek nézése 3D-ben:</strong> ha nincs külön <M t="z = c" /> feltétel,
              ez végtelen henger, nem kör!
            </li>
            <li>
              <strong>Sugár vs. sugár négyzete:</strong> az <M t="x^2 + y^2 + z^2 = 9" /> gömb sugara <M t="3" />, nem{' '}
              <M t="9" />!
            </li>
            <li>
              <strong>Síktól vs. tengelytől mért távolság összekeverése:</strong> az <M t="xy" />-síktól való távolság{' '}
              <M t="|z|" /> (csak 1 koordináta!), míg a <M t="z" />-tengelytől <M t="\sqrt{x^2+y^2}" /> (a másik kettő!).
            </li>
            <li>
              <strong>Főegyüttható elfelejtése teljes négyzetté alakítás előtt:</strong> ha{' '}
              <M t="2x^2 + 2y^2 + 2z^2 + \dots" /> áll az egyenletben, előbb mindig ossz le a főegyütthatóval!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Mekkora a sugara a <M t="C(2;\,-3;\,5)" /> középpontú gömbnek, ha érinti az <M t="xy" />-síkot?</>}
          options={[
            { label: <M t="a = 2" /> },
            { label: <M t="a = 3" /> },
            { label: <M t="a = 5" />, ok: true },
            { label: <M t="a = \sqrt{13}" /> },
          ]}
          explain={
            <>
              Az <M t="xy" />-sík (<M t="z=0" />) távolsága a középponttól <M t="|z_0| = 5" />, ezért az érintéshez{' '}
              <M t="a = 5" /> szükséges!
            </>
          }
        />

        <Task n={13} q={<>Igaz-e, hogy az <M t="x^2 + y^2 + z^2 - 2x + 4y + 6z + 15 = 0" /> egyenlet gömböt ír le?</>}>
          <p>
            Teljes négyzetté alakítva: <M t="(x-1)^2 + (y+2)^2 + (z+3)^2 = -15 + 1 + 4 + 9 = -1 < 0" />. Mivel három
            négyzet összege nem lehet negatív, ez <strong>üres halmaz</strong> (nincs valós pontja)!
          </p>
        </Task>

        <Task n={14} q={<>Add meg annak a legnagyobb sugarú gömbnek az egyenletét, amely <M t="C(4;\,3;\,6)" /> középpontú és teljes egészében az I. oktánsban marad!</>}>
          <p>
            A három koordinátasíktól mért távolságok <M t="4, 3, 6" />. A legkisebb ezek közül <M t="a = 3" /> (az{' '}
            <M t="xz" />-síktól), így az egyenlet: <M t="(x-4)^2 + (y-3)^2 + (z-6)^2 = 9" />.
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

        <Task n={15} q={<>Számítsd ki a <M t="P(1;\,2;\,-2)" /> és <M t="Q(4;\,-2;\,10)" /> pontok távolságát!</>}>
          <p>
            <M t="|PQ| = \sqrt{(4-1)^2 + (-2-2)^2 + (10-(-2))^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13" />.
          </p>
        </Task>

        <Task n={16} q={<>Írd fel a <M t="(-2;\,0;\,4)" /> középpontú, <M t="5" /> sugarú gömb egyenletét!</>}>
          <p>
            <M t="(x + 2)^2 + y^2 + (z - 4)^2 = 25" />.
          </p>
        </Task>

        <Task n={17} q={<>Add meg a <M t="P(-3;\,4;\,-12)" /> pont távolságát az origótól és az <M t="x" />-tengelytől!</>}>
          <p>
            Origótól: <M t="\sqrt{9 + 16 + 144} = 13" />. Az <M t="x" />-tengelytől:{' '}
            <M t="\sqrt{y^2 + z^2} = \sqrt{16 + 144} = \sqrt{160} = 4\sqrt{10}" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Határozd meg az <M t="x^2 + y^2 + z^2 + 6x - 2y + 4z + 5 = 0" /> gömb középpontját és sugarát!</>}>
          <p>
            <M t="(x+3)^2 + (y-1)^2 + (z+2)^2 = -5 + 9 + 1 + 4 = 9" />. Középpont: <M t="(-3;\,1;\,-2)" />, sugár:{' '}
            <M t="a = 3" />.
          </p>
        </Task>

        <Task n={19} q={<>Mely pontok egyenlő távolságra vannak az <M t="A(0;\,0;\,2)" /> és <M t="B(0;\,0;\,-6)" /> pontoktól?</>}>
          <p>
            <M t="x^2 + y^2 + (z-2)^2 = x^2 + y^2 + (z+6)^2 \implies -4z + 4 = 12z + 36 \implies 16z = -32 \implies z = -2" />.
            Ez a <M t="z = -2" /> vízszintes felezősík!
          </p>
        </Task>

        <Task n={20} q={<>Igazold, hogy az <M t="A(1;\,2;\,3)" />, <M t="B(4;\,0;\,5)" /> és <M t="C(3;\,6;\,4)" /> pontok derékszögű háromszöget alkotnak! Melyik csúcsnál van a derékszög?</>}>
          <p>
            <M t="AB^2 = 9 + 4 + 4 = 17" />, <M t="AC^2 = 4 + 16 + 1 = 21" />, <M t="BC^2 = 1 + 36 + 1 = 38" />. Mivel{' '}
            <M t="AB^2 + AC^2 = 17 + 21 = 38 = BC^2" />, a háromszög derékszögű, a derékszög az <strong><M t="A" /></strong>{' '}
            csúcsnál van!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Határozd meg az <M t="x^2 + y^2 + z^2 = 25" /> és az <M t="(x-6)^2 + y^2 + z^2 = 25" /> gömbök metszetkörének középpontját és sugarát!</>}>
          <p>
            Kivonva a két egyenletet: <M t="x^2 - (x-6)^2 = 0 \implies 12x - 36 = 0 \implies x = 3" />. Behelyettesítve
            az elsőbe: <M t="9 + y^2 + z^2 = 25 \implies y^2 + z^2 = 16" />. A metszet tehát a <M t="(3;\,0;\,0)" />{' '}
            középpontú, <M t="4" /> sugarú kör az <M t="x = 3" /> síkban!
          </p>
        </Task>

        <Task n={22} q={<>Milyen felületet alkotnak azok a <M t="P(x;\,y;\,z)" /> pontok, amelyek kétszer olyan messze vannak az <M t="A(3;\,0;\,0)" /> ponttól, mint az origótól (<M t="|PA| = 2|PO|" />)?</>}>
          <p>
            Négyzetre emelve: <M t="(x-3)^2 + y^2 + z^2 = 4(x^2 + y^2 + z^2)" />, rendezve:{' '}
            <M t="3x^2 + 3y^2 + 3z^2 + 6x = 9 \implies x^2 + 2x + y^2 + z^2 = 3 \implies (x+1)^2 + y^2 + z^2 = 4" />.
            Ez egy <M t="(-1;\,0;\,0)" /> középpontú, <M t="2" /> sugarú gömb (Apollóniosz-gömb)!
          </p>
        </Task>

        <Task n={23} q={<>Egy <M t="3" /> sugarú gömb középpontja a <M t="z" />-tengelyen van, és áthalad a <M t="P(2;\,1;\,5)" /> ponton. Mi lehet a gömb középpontja?</>}>
          <p>
            A középpont <M t="C(0;\,0;\,z_0)" />. A távolságfeltétel:{' '}
            <M t="2^2 + 1^2 + (5 - z_0)^2 = 3^2 \implies 5 + (5 - z_0)^2 = 9 \implies (5 - z_0)^2 = 4 \implies 5 - z_0 = \pm 2" />.
            Két megoldás van: <M t="C_1(0;\,0;\,3)" /> és <M t="C_2(0;\,0;\,7)" />!
          </p>
        </Task>
      </>
    ),
  },
];
