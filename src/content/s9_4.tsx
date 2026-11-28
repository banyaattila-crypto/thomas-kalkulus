import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AutonomousVsNonDiagram,
  CoolingPhaseWidget,
  LogisticDerivativeDiagram,
  LogisticPhaseWidget,
  PhaseLineStepsDiagram,
  PhaseLineToCurvesWidget,
  StabilityTypesDiagram,
  TerminalVelocityWidget,
} from '../components/Widgets94';
import type { Page } from './s1_1';

export const S9_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Autonóm differenciálegyenletek és egyensúlyi értékek',
    body: (
      <>
        <Story>
          <p>
            A természet törvényei legtöbbször nem függenek attól, hogy kedden vagy szerdán végezzük-e el a kísérletet:
            egy forró leves hűlési sebessége csak az aktuális hőmérsékletétől függ, egy populáció szaporodási üteme
            pedig csak a jelenlegi létszámától! Az ilyen egyenleteket <strong>autonóm differenciálegyenleteknek</strong>{' '}
            hívjuk — és az a csodálatos bennük, hogy <strong>egyetlen integrálás nélkül</strong> meg tudjuk rajzolni a
            megoldásaik teljes hosszú távú viselkedését!
          </p>
        </Story>

        <Def title="Autonóm differenciálegyenlet és egyensúlyi érték">
          <p>
            Az <M t="\dfrac{dy}{dx} = g(y)" /> (vagy <M t="\dfrac{dy}{dt} = g(y)" />) egyenlet <strong>autonóm</strong>,
            ha a jobb oldalon kizárólag a függő <M t="y" /> változó szerepel (<M t="x" /> vagy <M t="t" /> nem!).
          </p>
          <p>
            Azokat az <M t="y_0" /> számokat, amelyekre <strong><M t="g(y_0) = 0" /></strong>,{' '}
            <strong>egyensúlyi (kritikus) értékeknek</strong> nevezzük — ezekhez a vízszintes{' '}
            <M t="y(x) \equiv y_0" /> konstans megoldások tartoznak!
          </p>
        </Def>

        <AutonomousVsNonDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Határozd meg az <M t="y' = y^2 - 4y" /> autonóm egyenlet összes egyensúlyi értékét!</>}
        >
          <p>
            <M t="g(y) = y(y - 4) = 0 \implies \mathbf{y = 0}" /> és <M t="\mathbf{y = 4}" />!
          </p>
        </Task>
        <Task
          n={2}
          q={<>Melyik autonóm az alábbiak közül: (a) <M t="y' = \sin y" />, (b) <M t="y' = \sin x" />, (c) <M t="y' = y^3 - 2y + 1" />?</>}
        >
          <p>
            <strong>(a) és (c) autonóm</strong>, mert csak <M t="y" /> szerepel a jobb oldalon; (b) nem autonóm!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A fázisegyenes és az egyensúlyok stabilitása',
    body: (
      <>
        <p>
          Hogyan viselkednek a megoldások az egyensúlyi értékek közelében? Rajzoljuk fel a <strong>fázisegyenest</strong>{' '}
          (a függőleges <M t="y" />-tengelyt): jelöljük be az egyensúlyi pontokat (<M t="g(y)=0" />), és nézzük meg{' '}
          <M t="g(y)" /> előjelét az egyes részintervallumokon!
        </p>
        <ul>
          <li>Ha <M t="g(y) > 0" />, akkor <M t="y' > 0" /> → az <M t="y(t)" /> megoldás <strong>növekszik</strong> (felfelé nyíl <M t="\uparrow" />).</li>
          <li>Ha <M t="g(y) < 0" />, akkor <M t="y' < 0" /> → az <M t="y(t)" /> megoldás <strong>csökken</strong> (lefelé nyíl <M t="\downarrow" />).</li>
        </ul>

        <Def title="Stabil, instabil és félig stabil egyensúly">
          <ul>
            <li><strong>Stabil (vonzó):</strong> mindkét oldalról felé mutatnak a nyilak (alulról <M t="+" />, felülről <M t="-" />). Kis zavarás után a rendszer visszatér hozzá!</li>
            <li><strong>Instabil (taszító):</strong> mindkét oldalról elfelé mutatnak a nyilak (alulról <M t="-" />, felülről <M t="+" />). A legkisebb eltérés is elsodorja tőle!</li>
            <li><strong>Félig stabil (szemistabil):</strong> egyik oldalról vonz, a másikról taszít (<M t="+\to +" /> vagy <M t="-\to -" />), pl. <M t="y' = (y-1)^2" />!</li>
          </ul>
        </Def>

        <StabilityTypesDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Osztályozd az <M t="y' = y(4 - y)" /> egyenlet egyensúlyi pontjait stabilitás szerint!</>}
        >
          <p>
            Egyensúlyok: <M t="y=0" /> és <M t="y=4" />. Előjelek: <M t="y<0" />: <M t="-" />; <M t="0<y<4" />: <M t="+" />; <M t="y>4" />: <M t="-" />.
          </p>
          <p>
            Így <M t="y=0" /> <strong>instabil</strong> (<M t="-\to +" />), <M t="y=4" /> pedig <strong>stabil</strong> (<M t="+\to -" />)!
          </p>
        </Task>
        <Task
          n={4}
          q={<>Milyen típusú egyensúly az <M t="y = 2" /> pont az <M t="y' = -(y - 2)^2" /> egyenletben?</>}
        >
          <p>
            Mivel <M t="g(y) \le 0" /> mindkét oldalon (<M t="-\to -" />), felülről közelednek hozzá, alulról távolodnak tőle → <strong>félig stabil</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Konvexitás megoldás nélkül: a teljes fázisegyenes',
    body: (
      <>
        <p>
          Az autonóm egyenletek legnagyobb trükkje: a megoldásgörbék <strong>konvexitását (<M t="y''" />)</strong> és{' '}
          <strong>inflexiós szintjeit</strong> is meg tudjuk határozni pusztán a láncszabállyal, anélkül, hogy valaha is
          kiszámolnánk <M t="y(x)" />-et!
        </p>
        <Def title="Második derivált autonóm egyenletből">
          <M block t="y' = g(y) \;\xrightarrow{\;d/dx\;}\; y'' = g'(y)\cdot y' = \mathbf{g'(y)\cdot g(y)}." />
          <p>
            Azokban a vízszintes <M t="y" />-szintekben, ahol <M t="g'(y) = 0" /> (és nem egyensúlyi pont),{' '}
            <M t="y''" /> előjelet válthat → ezek a megoldásgörbék <strong>inflexiós szintjei</strong>!
          </p>
        </Def>
        <p>
          Ha a fázisegyenesre <M t="y'" /> előjele mellé <M t="y'' = g'(y)g(y)" /> előjelét is felírjuk, megkapjuk a{' '}
          <strong>teljes fázisegyenest</strong> — és a sík minden sávjában pontosan tudjuk a görbe alakját (⤴, ↱, ↳, ⤵)!
        </p>

        <PhaseLineToCurvesWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Számítsd ki <M t="y''" /> képletét <M t="y" /> függvényében az <M t="y' = (y+1)(2-y)" /> egyenletre, és add meg az inflexiós szintet!</>}
        >
          <p>
            <M t="g(y) = 2 + y - y^2 \implies g'(y) = 1 - 2y" />, így <M t="y'' = (1 - 2y)(y+1)(2-y)" />.
          </p>
          <p>
            A nem egyensúlyi zérushely: <M t="1 - 2y = 0 \implies \mathbf{y = 0{,}5}" /> (ez az inflexiós szint!).
          </p>
        </Task>
        <Task
          n={6}
          q={<>Igaz-e, hogy egy autonóm egyenlet két különböző megoldásgörbéje metszheti egymást?</>}
        >
          <p>
            Sima <M t="g(y)" /> esetén <strong>nem!</strong> (Létezési és egyértelműségi tétel.) Ezért egyetlen
            megoldásgörbe sem tudja <em>átlépni</em> az egyensúlyi vízszintes egyeneseket — csak aszimptotikusan
            közelítheti őket!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: '1. alkalmazás: Newton-féle hűlési törvény (Thomas 3. példa)',
    body: (
      <>
        <p>
          Egy tál forró leves (vagy egy hideg üdítő) hőmérséklete <M t="H(t)" /> egy állandó <M t="H_s" />{' '}
          hőmérsékletű szobában a Newton-féle hűlési törvényt követi:
        </p>
        <M block t="\frac{dH}{dt} = -k(H - H_s) \qquad (k > 0)." />
        <ul>
          <li><strong>Egyensúlyi pont:</strong> <M t="H = H_s" /> (a szobahőmérséklet!).</li>
          <li><strong>Első derivált (<M t="H'" />):</strong> ha <M t="H > H_s" />, <M t="H' < 0" /> (hűl); ha <M t="H < H_s" />, <M t="H' > 0" /> (melegszik) ⇒ <M t="H = H_s" /> <strong>stabil</strong>!</li>
          <li><strong>Második derivált:</strong> <M t="H'' = (-k)\cdot H' = k^2(H - H_s)" />! Ha <M t="H > H_s" />, <M t="H'' > 0" /> (konvex); ha <M t="H < H_s" />, <M t="H'' < 0" /> (konkáv)!</li>
        </ul>

        <CoolingPhaseWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>A <M t="dH/dt = -0{,}1(H - 18)" /> modellben milyen konvexitású a <M t="H(t)" /> görbe, ha <M t="H(0) = 5^\circ\text{C}" />?</>}
        >
          <p>
            Mivel <M t="H < 18" />, <M t="H' > 0" /> és <M t="H'' = 0{,}01(H - 18) < 0" /> → a görbe <strong>növekvő és konkáv</strong>!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Miért nincs inflexiós pontja a Newton-féle hűlési görbének?</>}
        >
          <p>
            Mert <M t="g'(H) = -k \ne 0" /> sehol nem nulla, így <M t="H''" /> csak magán az egyensúlyi{' '}
            <M t="H = H_s" /> vonalon vált előjelet, amelyet a görbék sosem lépnek át!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: '2. alkalmazás: Szabadesés és végsebesség (Thomas 4. példa)',
    body: (
      <>
        <p>
          Ha egy <M t="m" /> tömegű testre esés közben lefelé az <M t="mg" /> nehézségi erő, felfelé pedig a
          sebességgel arányos <M t="kv" /> közegellenállás hat (lefelé a pozitív irány), Newton II. törvényéből:
        </p>
        <M block t="m\frac{dv}{dt} = mg - kv \;\Longleftrightarrow\; \frac{dv}{dt} = g - \frac{k}{m}v." />
        <ul>
          <li>
            <strong>Egyensúlyi érték (végsebesség):</strong> <M t="g - \frac{k}{m}v = 0 \implies \mathbf{v_\infty = \dfrac{mg}{k}}" />!
          </li>
          <li>
            <strong>Fázisegyenes:</strong> <M t="v < v_\infty" /> esetén <M t="v' > 0,\; v'' < 0" /> (konkáv módon gyorsul);{' '}
            <M t="v > v_\infty" /> esetén <M t="v' < 0,\; v'' > 0" /> (konvex módon lassul) ⇒ <M t="v_\infty" />{' '}
            <strong>stabil egyensúly</strong>!
          </li>
        </ul>

        <TerminalVelocityWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Egy <M t="80" /> kg-os ejtőernyősre (<M t="g = 9{,}8\;\text{m/s}^2" />) nyitott ernyővel <M t="k = 160\;\text{kg/s}" /> közegellenállás hat. Mekkora a stabil végsebessége?</>}
        >
          <p>
            <M t="v_\infty = \dfrac{mg}{k} = \dfrac{80 \cdot 9{,}8}{160} = \mathbf{4{,}9\;\text{m/s}}" />!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Ha a közegellenállás négyzetes (<M t="m\frac{dv}{dt} = mg - kv^2" />, <M t="v \ge 0" />), mennyi a végsebesség?</>}
        >
          <p>
            <M t="mg - kv^2 = 0 \implies v_\infty = \mathbf{\sqrt{\dfrac{mg}{k}}}" /> (szintén stabil egyensúly <M t="v \ge 0" />-ra!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: '3. alkalmazás: Logisztikus növekedés (Thomas 5. példa)',
    body: (
      <>
        <p>
          Korlátozott erőforrású környezetben (eltartóképesség: <M t="M" />) egy populáció növekedését a{' '}
          <strong>logisztikus differenciálegyenlet</strong> írja le:
        </p>
        <M block t="\frac{dP}{dt} = rP(M - P) \qquad (r > 0,\; M > 0)." />
        <ul>
          <li><strong>Egyensúlyok:</strong> <M t="P = 0" /> (<strong>instabil</strong>) és <M t="P = M" /> (<strong>stabil</strong>).</li>
          <li>
            <strong>Inflexiós szint:</strong> <M t="g'(P) = r(M - 2P) = 0 \implies \mathbf{P = \dfrac{M}{2}}" />! Ezen a
            szinten a populáció a <strong>leggyorsabban növekszik</strong> (és itt vált a görbe konvexből konkávba,
            kialakítva a híres <strong>S-görbét</strong>)!
          </li>
        </ul>

        <LogisticPhaseWidget />
        <LogisticDerivativeDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Egy halastóban a halállomány a <M t="\dfrac{dP}{dt} = 0{,}002\,P(500 - P)" /> egyenlet szerint nő. Melyik létszámnál nő a leggyorsabban az állomány, és mi a stabil egyensúly?</>}
        >
          <p>
            Eltartóképesség (stabil egyensúly): <M t="M = \mathbf{500}" /> hal. Leggyorsabb növekedés (inflexiós szint):{' '}
            <M t="\dfrac{M}{2} = \mathbf{250}" /> hal!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Mi történik a 11. feladatban, ha kezdetben <M t="P(0) = 700" /> halat telepítenek a tóba?</>}
        >
          <p>
            Mivel <M t="P > 500" />, <M t="P' < 0" /> és <M t="P'' > 0" />: az állomány csökkenni fog (konvex görbén) és
            aszimptotikusan beáll az <M t="M = 500" /> stabil egyensúlyra!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <PhaseLineStepsDiagram />

        <table className="tbl">
          <thead>
            <tr>
              <th>fogalom</th>
              <th>képlet / feltétel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Autonóm DE</td>
              <td><M t="y' = g(y)" /> (nincs <M t="x" /> vagy <M t="t" />!)</td>
            </tr>
            <tr>
              <td>Egyensúlyi érték</td>
              <td><M t="g(y_0) = 0" /> (vízszintes egyenes megoldás)</td>
            </tr>
            <tr>
              <td>Stabilitás</td>
              <td><M t="+\to -" /> stabil · <M t="-\to +" /> instabil · <M t="+\to +" /> / <M t="-\to -" /> félig stabil</td>
            </tr>
            <tr>
              <td>Konvexitás</td>
              <td><M t="y'' = g'(y)\cdot g(y)" /> (inflexió: <M t="g'(y)=0" />)</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy klasszikus buktató</h3>
        <Warn>
          <p>
            <strong>1. Elfelejtett <M t="g(y)" /> tényező <M t="y''" />-ben:</strong> <M t="y''" /> NEM egyenlő{' '}
            <M t="g'(y)" />-nal, hanem a láncszabály miatt <M t="y'' = g'(y)\cdot \mathbf{g(y)}" />!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Fázisegyenes használata nem autonóm egyenletre:</strong> az <M t="y' = y - x" /> egyenletre TILOS
            1D fázisegyenest rajzolni, mert a meredekség <M t="x" />-től is függ!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Egyensúlyi vonal átlépése rajzoláskor:</strong> a megoldásgörbék <em>soha</em> nem metszik át a
            vízszintes egyensúlyi egyeneseket (csak belesimulnak, vagy eltávolodnak tőlük)!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. A <M t="g'(y_0)" /> gyorsteszt félreértése:</strong> ha <M t="g'(y_0) < 0" /> ⇒ stabil;{' '}
            <M t="g'(y_0) > 0" /> ⇒ instabil; de ha <M t="g'(y_0) = 0" />, akkor előjelvizsgálat kell (lehet félig stabil is)!
          </p>
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Ha egy autonóm egyenletnél <M t="g(3)=0" /> és <M t="g'(3)=-2 < 0" />, akkor <M t="y=3" /> stabil vagy instabil egyensúly?</>}
        >
          <p>
            Mivel <M t="g" /> csökkenve megy át a 0-n (<M t="+\to -" />), az <M t="y=3" /> egyensúly <strong>stabil</strong>!
          </p>
        </Task>
        <Task
          n={14}
          q={<>Az <M t="y' = y(y-2)" /> egyenletnek hány inflexiós szintje van?</>}
        >
          <p>
            <M t="g'(y) = 2y - 2 = 0 \implies \mathbf{y = 1}" /> — pontosan <strong>1</strong> inflexiós szint!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!</p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={15}
          q={<>Határozd meg az <M t="y' = 3 - y" /> egyenlet egyensúlyát és stabilitását!</>}
        >
          <p>
            <M t="y = 3" />. <M t="y<3" />-ra <M t="+" />, <M t="y>3" />-ra <M t="-" /> → <strong>stabil</strong> egyensúly!
          </p>
        </Task>
        <Task
          n={16}
          q={<>Határozd meg az <M t="y' = y^2 - 9" /> egyenlet egyensúlyait és stabilitásukat!</>}
        >
          <p>
            <M t="g(y)=(y-3)(y+3)=0 \implies y=-3,\; 3" />. Előjelek: <M t="+" />, <M t="-" />, <M t="+" />. Tehát{' '}
            <M t="y=-3" /> <strong>stabil</strong>, <M t="y=3" /> <strong>instabil</strong>!
          </p>
        </Task>
        <Task
          n={17}
          q={<>Add meg az <M t="y' = (y - 1)^2" /> egyenlet egyensúlyát és típusát!</>}
        >
          <p>
            <M t="y = 1" />, mindkét oldalon <M t="g(y) > 0" /> (<M t="+\to +" />) → <strong>félig stabil</strong>!
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={<>Végezd el az <M t="y' = y(y - 2)(y - 4)" /> egyenlet egyensúly- és stabilitáselemzését!</>}
        >
          <p>
            Egyensúlyok: <M t="0, 2, 4" />. Előjelek: <M t="(-\infty;\,0)" />: <M t="-" />; <M t="(0;\,2)" />: <M t="+" />;{' '}
            <M t="(2;\,4)" />: <M t="-" />; <M t="(4;\,\infty)" />: <M t="+" />.
          </p>
          <p>
            <strong>Instabil:</strong> <M t="y=0" /> és <M t="y=4" />; <strong>stabil:</strong> <M t="y=2" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Számítsd ki az <M t="y' = y^2 - 4" /> egyenlet inflexiós szintjét és a megoldások konvexitását a <M t="(-2;\,2)" /> sávban!</>}
        >
          <p>
            <M t="y'' = 2y(y^2 - 4)" />. Inflexiós szint: <M t="y = 0" />! A <M t="(-2;\,0)" /> sávban{' '}
            <M t="y'' = (-)(-)=+" /> (konvex), a <M t="(0;\,2)" /> sávban <M t="y'' = (+)(-)=-" /> (konkáv)!
          </p>
        </Task>
        <Task
          n={20}
          q={<>Egy <M t="y' = \sin y" /> autonóm egyenletnek hol vannak a <strong>stabil</strong> egyensúlyi pontjai?</>}
        >
          <p>
            Egyensúlyok: <M t="y = k\pi" />. Mivel <M t="g'(y) = \cos y" />, pontosan ott stabil (<M t="g' < 0" />),
            ahol <M t="\cos(k\pi) = -1" />, vagyis a <strong>páratlan</strong> <M t="\pi" />-többszörösöknél:{' '}
            <M t="y = (2m+1)\pi" />!
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={<><strong>Allee-effektus (küszöbös populációmodell):</strong> <M t="\dfrac{dP}{dt} = P(P - 100)(500 - P)" /> (<M t="P \ge 0" />). Mit jósol a fázisegyenes, ha <M t="P(0) = 80" />, illetve ha <M t="P(0) = 120" />?</>}
        >
          <p>
            Egyensúlyok: <M t="0" /> (stabil), <M t="100" /> (instabil — ez a <em>kihalási küszöb!</em>), <M t="500" /> (stabil).
          </p>
          <p>
            Ha <M t="P(0) = 80 < 100" />, akkor <M t="P' < 0" /> → a faj <strong>kihal</strong> (<M t="P\to 0" />)! Ha{' '}
            <M t="P(0) = 120 > 100" />, akkor <M t="P' > 0" /> → fennmarad és eléri az <M t="500" />-as egyensúlyt!
          </p>
        </Task>
        <Task
          n={22}
          q={<><strong>Halászattal terhelt logisztikus modell:</strong> <M t="\dfrac{dP}{dt} = P(4 - P) - h" />, ahol <M t="h > 0" /> az állandó lehalászás. Melyik kritikus <M t="h_{\max}" /> felett hal ki <em>minden</em> halállomány (nyereg-csomópont bifurkáció)?</>}
        >
          <p>
            Az egyensúlyi egyenlet <M t="P^2 - 4P + h = 0" />, diszkriminánsa <M t="\Delta = 16 - 4h" />!
          </p>
          <p>
            Ha <M t="\mathbf{h > 4}" />, nincs valós egyensúly, <M t="P' < 0" /> mindenütt, így a teljes állomány
            <strong>összeomlik</strong>! A maximálisan fenntartható halászat <M t="h_{\max} = 4" />!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Írj fel egy olyan <M t="y' = g(y)" /> autonóm differenciálegyenletet, amelynek <M t="y = 1" /> <strong>stabil</strong>, <M t="y = 3" /> pedig <strong>instabil</strong> egyensúlya (és nincs más egyensúlya)!</>}
        >
          <p>
            Kell, hogy <M t="g(1)=g(3)=0" />, <M t="1" />-nél <M t="+\to -" />, <M t="3" />-nál <M t="-\to +" />: a
            legegyszerűbb ilyen parabola az <M t="\mathbf{y' = (y - 1)(y - 3)}" />!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda és gyorsteszt</h3>
        <Steps
          title="Teljes fázisegyenes- és inflexió-elemzés"
          source="Analízis-labor"
          problem={
            <>
              Elemezzük az <M t="y' = y(3 - y)" /> autonóm egyenlet egyensúlyi pontjait és inflexiós szintjét!
            </>
          }
          steps={[
            {
              title: 'Egyensúlyi értékek',
              body: (
                <p>
                  <M t="y(3 - y) = 0 \implies y = 0" /> és <M t="y = 3" />.
                </p>
              ),
            },
            {
              title: 'Előjelek és stabilitás',
              body: (
                <p>
                  <M t="y < 0" />-ra <M t="y' < 0" />; <M t="0 < y < 3" />-ra <M t="y' > 0" />; <M t="y > 3" />-ra <M t="y' < 0" />. Tehát <M t="y = 0" /> <strong>instabil</strong>, <M t="y = 3" /> pedig <strong>stabil</strong> egyensúly.
                </p>
              ),
            },
            {
              title: 'Inflexiós szint meghatározása',
              body: (
                <p>
                  <M t="y'' = (3 - 2y)y' = 0" />, így a nem egyensúlyi inflexiós szint <M t="\mathbf{y = 1{,}5}" />.
                </p>
              ),
            },
          ]}
        />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              A logisztikus <M t="P' = rP\left(1 - \dfrac{P}{K}\right)" /> modellben melyik populációméretnél a legnagyobb a növekedési sebesség?
            </>
          }
          options={[
            { label: <M t="P = K/2" />, ok: true },
            { label: <M t="P = K" /> },
            { label: <M t="P = 0" /> },
            { label: <M t="P = 2K" /> },
          ]}
          explain={
            <>
              A <M t="g(P) = rP(1 - P/K)" /> parabola a két gyök (<M t="0" /> és <M t="K" />) felezőpontjában, <M t="P = K/2" />-nél maximális.
            </>
          }
        />
      </>
    ),
  },
];
