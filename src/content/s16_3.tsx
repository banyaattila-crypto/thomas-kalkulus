import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ComponentTestCheckerWidget,
  ConservativeMasterMapDiagram,
  EnergyConservationRollerWidget,
  ExactDiffFormWidget,
  PathIndependenceDemoWidget,
  PotentialBuilderWidget,
  PotentialContourWidget,
  PuncturedPlaneTrapWidget,
} from '../components/Widgets163';
import type { Page } from './s1_1';

export const S16_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Konzervatív vektormezők és potenciálfüggvény',
    body: (
      <>
        <Story>
          <p>
            Ha felcipelsz egy hátizsákot a hegytetőre a meredek ösvényen vagy a kanyargós szerpentinen, a gravitáció
            ellen végzett munkád pontosan ugyanannyi — csak a <em>magasságkülönbség</em> számít! A gravitációs tér
            ugyanis <strong>konzervatív vektormező</strong>: egyetlen skalárfüggvény (a <em>potenciálfüggvény</em>)
            gradiense.
          </p>
        </Story>

        <Def title="Konzervatív vektormező és potenciálfüggvény">
          <p>
            Az <M t="\mathbf{F}" /> vektormezőt <strong>konzervatívnak</strong> nevezzük egy <M t="D" /> tartományon,
            ha létezik olyan differenciálható <M t="f" /> skalárfüggvény (<strong>potenciálfüggvény</strong>),
            amelyre minden pontban:
          </p>
          <M block t="\mathbf{F} = \nabla f = \left\langle \frac{\partial f}{\partial x},\; \frac{\partial f}{\partial y},\; \frac{\partial f}{\partial z} \right\rangle." />
        </Def>

        <PotentialContourWidget />

        <Task n={1} q={<>Igazold, hogy az <M t="\mathbf{F}(x, y) = \langle 2xy,\; x^2 \rangle" /> vektormező konzervatív, és adj meg hozzá potenciálfüggvényt!</>}>
          <p>
            Legyen <M t="f(x, y) = x^2 y" />. Ekkor <M t="\nabla f = \langle 2xy,\; x^2 \rangle = \mathbf{F}" />, tehát
            valóban konzervatív!
          </p>
        </Task>

        <Task n={2} q={<>Mutasd meg, hogy a Newton-féle gravitációs erőtér <M t="\mathbf{F}(x,y,z) = -\dfrac{GMm}{(x^2+y^2+z^2)^{3/2}}\langle x, y, z \rangle" /> konzervatív az <M t="f(x,y,z) = \dfrac{GMm}{\sqrt{x^2+y^2+z^2}}" /> potenciállal!</>}>
          <p>
            Parciálisan deriválva <M t="x" /> szerint: <M t="\frac{\partial}{\partial x}(r^{-1}) = -r^{-2}\frac{x}{r} = -\frac{x}{r^3}" />.
            Ugyanígy <M t="y, z" />-re is, tehát <M t="\nabla f = \mathbf{F}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A vonalintegrálok alaptétele (Newton–Leibniz 3D-ben!)',
    body: (
      <>
        <p>
          Az egyváltozós kalkulus legfontosabb tétele a Newton–Leibniz-tétel volt:{' '}
          <M t="\int_a^b f'(x)\,dx = f(b) - f(a)" />. Konzervatív vektormezőkre ennek pontosan ugyanilyen gyönyörű
          többváltozós párja van!
        </p>

        <Def title="A vonalintegrálok alaptétele">
          <p>
            Ha <M t="\mathbf{F} = \nabla f" /> egy összefüggő nyílt <M t="D" /> tartományon, és <M t="C" /> bármely
            szakaszonként sima görbe az <M t="A" /> pontból a <M t="B" /> pontba <M t="D" />-n belül, akkor:
          </p>
          <M block t="\int_C \mathbf{F}\cdot d\mathbf{r} = \int_C \nabla f\cdot d\mathbf{r} = f(B) - f(A)." />
          <p>
            <strong>Azonnali következmények:</strong> az integrál <strong>útfüggetlen</strong>, és minden zárt{' '}
            <M t="C" /> görbén <M t="\oint_C \mathbf{F}\cdot d\mathbf{r} = f(A) - f(A) = 0" />!
          </p>
        </Def>

        <PathIndependenceDemoWidget />

        <Quiz
          q={<>Mennyi az <M t="\int_C \nabla(x^2 y + e^z)\cdot d\mathbf{r}" /> integrál egy bonyolult spirális görbe mentén <M t="A(0; 5; 0)" />-ból <M t="B(2; 3; 0)" />-ba?</>}
          options={[
            { label: <M t="6" /> },
            { label: <M t="12" />, ok: true },
            { label: <M t="13" /> },
            { label: <>A spirál paraméterezése nélkül nem számítható ki</> },
          ]}
          explain={
            <>
              Az alaptétel alapján csak a végpontok számítanak:{' '}
              <M t="f(2,3,0) - f(0,5,0) = (4\cdot 3 + 1) - (0 + 1) = 12" />!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki az <M t="\int_C \nabla(x^2 y z)\cdot d\mathbf{r}" /> integrált <M t="A(1; 1; 1)" />-ből <M t="B(2; 0; 3)" />-ba bármely görbe mentén!</>}>
          <p>
            <M t="f(2,0,3) - f(1,1,1) = 0 - 1 = -1" />.
          </p>
        </Task>

        <Task n={4} q={<>Mennyi az <M t="\oint_C \big(2xy\,dx + x^2\,dy\big)" /> integrál az <M t="\frac{x^2}{9} + \frac{y^2}{16} = 1" /> zárt ellipszis mentén?</>}>
          <p>
            Mivel <M t="\mathbf{F} = \nabla(x^2 y)" /> mindenhol konzervatív, bármely zárt görbén a cirkulációja{' '}
            <M t="0" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A komponens-teszt: mikor konzervatív egy vektormező?',
    body: (
      <>
        <p>
          Honnan tudjuk előre, hogy egy adott <M t="\mathbf{F} = \langle M, N, P \rangle" /> mezőhöz egyáltalán{' '}
          <em>létezik-e</em> potenciálfüggvény? A 14.3 fejezet Clairaut-tételéből (<M t="f_{xy} = f_{yx}" />) azonnal
          adódik a gyors <strong>komponens-teszt</strong>!
        </p>

        <Def title="Konzervativitási komponens-teszt (egyszeresen összefüggő tartományon)">
          <ul>
            <li>
              <strong>2D-ben:</strong> <M t="\mathbf{F} = \langle M, N \rangle" /> konzervatív <M t="\iff \dfrac{\partial M}{\partial y} = \dfrac{\partial N}{\partial x}" />.
            </li>
            <li>
              <strong>3D-ben:</strong> <M t="\mathbf{F} = \langle M, N, P \rangle" /> konzervatív <M t="\iff" />
              <M block t="\frac{\partial P}{\partial y} = \frac{\partial N}{\partial z}, \qquad \frac{\partial M}{\partial z} = \frac{\partial P}{\partial x}, \qquad \frac{\partial N}{\partial x} = \frac{\partial M}{\partial y}." />
            </li>
          </ul>
        </Def>

        <ComponentTestCheckerWidget />

        <Task n={5} q={<>Konzervatív-e az <M t="\mathbf{F}(x, y) = \langle e^x\sin y,\; e^x\cos y + 2y \rangle" /> mező <M t="\mathbb{R}^2" />-en?</>}>
          <p>
            <M t="M_y = e^x\cos y" /> és <M t="N_x = e^x\cos y" />. Egyeznek, és <M t="\mathbb{R}^2" /> egyszeresen
            összefüggő → <strong>igen, konzervatív</strong>!
          </p>
        </Task>

        <Task n={6} q={<>Konzervatív-e az <M t="\mathbf{F}(x, y, z) = \langle y,\; x,\; z^2 \rangle" /> mező <M t="\mathbb{R}^3" />-ban?</>}>
          <p>
            <M t="P_y = 0 = N_z" />, <M t="M_z = 0 = P_x" />, <M t="N_x = 1 = M_y" /> → <strong>igen</strong>! (A
            potenciálja <M t="f = xy + \frac{z^3}{3}" />.)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A potenciálfüggvény megtalálása parciális integrálással',
    body: (
      <>
        <p>
          Ha a komponens-teszt zöld utat adott, a potenciálfüggvényt három egyszerű, mechanikus lépésben
          visszaépíthetjük!
        </p>

        <PotentialBuilderWidget />

        <Steps
          title="3D potenciálfüggvény meghatározása"
          problem={
            <>
              Határozd meg az <M t="\mathbf{F}(x, y, z) = \langle e^x\cos y + yz,\; xz - e^x\sin y,\; xy + 2z \rangle" />{' '}
              konzervatív vektormező <M t="f(x, y, z)" /> potenciálfüggvényét!
            </>
          }
          steps={[
            {
              title: '1. Integráljuk M-et x szerint',
              body: (
                <>
                  <M t="f(x, y, z) = \int (e^x\cos y + yz)\,dx = e^x\cos y + xyz + g(y, z)" />.
                </>
              ),
            },
            {
              title: '2. Deriváljunk y szerint és egyeztessünk N-nel',
              body: (
                <>
                  <M t="f_y = -e^x\sin y + xz + g_y(y, z) = xz - e^x\sin y \Rightarrow g_y(y, z) = 0 \Rightarrow g(y, z) = h(z)" />.
                </>
              ),
            },
            {
              title: '3. Deriváljunk z szerint és egyeztessünk P-vel',
              body: (
                <>
                  <M t="f_z = xy + h'(z) = xy + 2z \Rightarrow h'(z) = 2z \Rightarrow h(z) = z^2 + C" />.
                </>
              ),
            },
            {
              title: 'Végeredmény',
              body: (
                <>
                  <M t="f(x, y, z) = e^x\cos y + xyz + z^2 + C" />. (Ellenőrizd gyorsan <M t="\nabla f" />-fel!)
                </>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Találd meg az <M t="\mathbf{F} = \langle 2xy + 3,\; x^2 - 4y \rangle" /> potenciálját, majd számítsd ki a munkát <M t="(0;0)" />-ból <M t="(2;1)" />-be!</>}>
          <p>
            <M t="f(x, y) = x^2 y + 3x - 2y^2" />. Munka: <M t="f(2,1) - f(0,0) = (4 + 6 - 2) - 0 = 8" />.
          </p>
        </Task>

        <Task n={8} q={<>Add meg az <M t="\mathbf{F}(x, y, z) = \langle yz,\; xz,\; xy \rangle" /> mező potenciálfüggvényét!</>}>
          <p>
            <M t="f(x, y, z) = xyz + C" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A „lyukas tartomány” csapdája',
    body: (
      <>
        <p>
          Miért ragaszkodott a komponens-teszt az <strong>egyszeresen összefüggő</strong> (lyukmentes) tartományhoz?
          Mert ha van egyetlen lyuk a tartományban, a helyi feltétel (<M t="M_y = N_x" />) teljesülhet úgy is, hogy a
          mező globálisan <em>nem</em> konzervatív!
        </p>

        <PuncturedPlaneTrapWidget />

        <Quiz
          q={<>Igaz-e, hogy az <M t="\mathbf{F}(x, y) = \Big\langle \frac{-y}{x^2+y^2},\; \frac{x}{x^2+y^2} \Big\rangle" /> mező konzervatív a lyukas <M t="\mathbb{R}^2 \setminus \{(0,0)\}" /> síkon?</>}
          options={[
            { label: <>Igen, mert <M t="M_y = N_x" /> mindenhol teljesül</> },
            { label: <>Nem, mert a lyukas sík nem egyszeresen összefüggő, és az egységkörön <M t="\oint \mathbf{F}\cdot d\mathbf{r} = 2\pi \neq 0" /></>, ok: true },
            { label: <>Igen, a potenciálja globálisan <M t="\arctan(y/x)" /></> },
            { label: <>Nem, mert <M t="M_y \neq N_x" /></> },
          ]}
          explain={
            <>
              A 16.2 fejezet 21. feladatában kiszámoltuk, hogy az egységkörön a cirkuláció <M t="2\pi \neq 0" />, így
              nem létezhet egyértékű potenciál a teljes lyukas síkon!
            </>
          }
        />

        <Task n={9} q={<>Ellenőrizd, hogy <M t="M = \frac{-y}{x^2+y^2},\; N = \frac{x}{x^2+y^2}" /> esetén valóban <M t="M_y = N_x" /> minden <M t="(x,y)\neq(0,0)" /> pontban!</>}>
          <p>
            <M t="M_y = \frac{-(x^2+y^2) - (-y)(2y)}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2}" />, és{' '}
            <M t="N_x = \frac{(x^2+y^2) - x(2x)}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2}" /> — megegyeznek!
          </p>
        </Task>

        <Task n={10} q={<>Miért <em>konzervatív</em> ugyanez az <M t="\mathbf{F}" /> mező, ha leszűkítjük a jobb félsíkra (<M t="x > 0" />)?</>}>
          <p>
            Mert az <M t="x > 0" /> félsík <strong>egyszeresen összefüggő</strong> (nem tartalmazza az origót, nem lehet
            körbejárni a lyukat!), és ott <M t="f(x, y) = \arctan(y/x)" /> sima, egyértékű potenciálfüggvény!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Egzakt differenciálformák',
    body: (
      <>
        <p>
          Az <M t="M\,dx + N\,dy + P\,dz" /> differenciálformát <strong>egzaktnak</strong> nevezzük, ha pontosan egy{' '}
          <M t="f" /> függvény teljes differenciálja (<M t="df" />) — vagyis az <M t="\langle M, N, P \rangle" /> mező
          konzervatív!
        </p>

        <ExactDiffFormWidget />

        <Task n={11} q={<>Oldd meg a <M t="(2x + y)\,dx + (x - 2y)\,dy = 0" /> egzakt differenciálegyenletet!</>}>
          <p>
            <M t="M_y = 1 = N_x" /> → egzakt! Potenciál: <M t="f(x, y) = x^2 + xy - y^2" />. Mivel{' '}
            <M t="df = 0" />, az általános megoldás: <M t="x^2 + xy - y^2 = C" />.
          </p>
        </Task>

        <Task n={12} q={<>Számítsd ki egyetlen sorban: <M t="\int_{(1;2)}^{(3;4)} (y\,dx + x\,dy)" />!</>}>
          <p>
            Mivel <M t="y\,dx + x\,dy = d(xy)" />, az eredmény <M t="[xy]_{(1;2)}^{(3;4)} = 12 - 2 = 10" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Energiamegmaradás a fizikában',
    body: (
      <>
        <p>
          Miért hívják a konzervatív erőtereket „konzervatívnak” (megőrzőnek)? Mert{' '}
          <strong>megőrzik a mechanikai energiát</strong>! A fizikában a potenciális energiát{' '}
          <M t="\mathbf{F} = -\nabla U" /> előjellel definiálják (az erő lefelé húz a potenciálgödörbe). Ekkor a
          munkatételből és az alaptételből:
        </p>
        <M block t="K(B) - K(A) = W = \int_A^B \mathbf{F}\cdot d\mathbf{r} = U(A) - U(B) \;\Longrightarrow\; K(A) + U(A) = K(B) + U(B)." />

        <EnergyConservationRollerWidget />

        <Warn>
          Figyelj az előjel-különbségre! A <strong>matematikában</strong> <M t="\mathbf{F} = +\nabla f" />{' '}
          (potenciálfüggvény), a <strong>fizikában</strong> <M t="\mathbf{F} = -\nabla U" /> (potenciális energia,{' '}
          <M t="U = -f" />).
        </Warn>

        <Quiz
          q={<>Ha egy súrlódásmentes <M t="h" /> magas csúszdáról két különböző görbe mentén (egyenes vs. kanyargós) engedünk le egy golyót nyugalomból, melyik ér le nagyobb sebességgel az aljára?</>}
          options={[
            { label: <>Az egyenes csúszdán leérő</> },
            { label: <>A kanyargós csúszdán leérő</> },
            { label: <>Pontosan azonos <M t="v = \sqrt{2gh}" /> sebességgel érnek le</>, ok: true },
            { label: <>A golyó tömegétől függ</> },
          ]}
          explain={
            <>
              A gravitáció konzervatív, így <M t="\frac{1}{2}mv^2 = mgh \Rightarrow v = \sqrt{2gh}" /> teljesen
              független a pálya alakjától! (Az <em>idő</em> viszont függ a pályától — lásd brachisztokron!)
            </>
          }
        />

        <Task n={13} q={<>Mutasd meg, hogy a 3D rugóerő <M t="\mathbf{F} = -k\langle x, y, z \rangle" /> konzervatív, és add meg az <M t="U(x, y, z)" /> potenciális energiáját!</>}>
          <p>
            <M t="U(x, y, z) = \frac{1}{2}k(x^2 + y^2 + z^2)" />, hiszen{' '}
            <M t="-\nabla U = -k\langle x, y, z \rangle = \mathbf{F}" />!
          </p>
        </Task>

        <Task n={14} q={<>Mennyi munkát végez az <M t="\mathbf{F} = -k\langle x, y, z \rangle" /> rugóerő, miközben egy testet az origóból a <M t="(3; 4; 0)" /> pontba viszünk?</>}>
          <p>
            <M t="W = U(0,0,0) - U(3,4,0) = 0 - \frac{1}{2}k(25) = -\frac{25}{2}k" />.
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
        <ConservativeMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Konzervatív-e az <M t="\mathbf{F} = \langle 4x,\; 6y \rangle" /> mező? Ha igen, mi a potenciálja?</>}>
          <p>
            <M t="M_y = 0 = N_x" /> → igen! <M t="f(x, y) = 2x^2 + 3y^2 + C" />.
          </p>
        </Task>

        <Task n={16} q={<>Konzervatív-e az <M t="\mathbf{F} = \langle y^2,\; x^2 \rangle" /> mező?</>}>
          <p>
            <M t="M_y = 2y \neq 2x = N_x" /> → <strong>nem</strong> konzervatív.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki: <M t="\oint_C (3x^2\,dx + 2y\,dy + 4z^3\,dz)" /> bármely zárt 3D görbén!</>}>
          <p>
            Mivel ez <M t="d(x^3 + y^2 + z^4)" /> teljes differenciálja, bármely zárt görbén pontosan <M t="0" />!
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\int_{(0;0)}^{(1;\pi)} (e^x\sin y\,dx + e^x\cos y\,dy)" /> integrált!</>}>
          <p>
            <M t="f(x, y) = e^x\sin y \Rightarrow f(1, \pi) - f(0, 0) = 0 - 0 = 0" />.
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg az <M t="\mathbf{F} = \langle 3x^2 y + 2,\; x^3 + 4y \rangle" /> mező munkáját <M t="(0; 1)" />-ből <M t="(2; 0)" />-ba!</>}>
          <p>
            <M t="M_y = 3x^2 = N_x" />, potenciál <M t="f(x, y) = x^3 y + 2x + 2y^2" />. Munka:{' '}
            <M t="f(2, 0) - f(0, 1) = 4 - 2 = 2" />.
          </p>
        </Task>

        <Task n={20} q={<>Milyen <M t="a" /> valós szám esetén konzervatív az <M t="\mathbf{F}(x, y) = \langle axy^2 + 1,\; 6x^2 y - 3 \rangle" /> mező?</>}>
          <p>
            <M t="M_y = 2axy" />, <M t="N_x = 12xy" />. Egyezéshez <M t="2a = 12 \Rightarrow a = 6" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Találd meg az <M t="\mathbf{F}(x, y, z) = \langle 2xy + z^3,\; x^2 + 2yz,\; 3xz^2 + y^2 \rangle" /> potenciálját, majd számítsd ki a munkát <M t="(0;0;0)" />-ból <M t="(1;2;1)" />-be!</>}>
          <p>
            <M t="f(x, y, z) = x^2 y + xz^3 + y^2 z" /> (minden parciális stimmel!). Munka:{' '}
            <M t="f(1, 2, 1) - 0 = 2 + 1 + 4 = 7" />!
          </p>
        </Task>

        <Task n={22} q={<>Mutasd meg, hogy bármely csak a távolságtól függő radiális erőtér <M t="\mathbf{F}(\mathbf{r}) = g(r)\,\mathbf{r}" /> (<M t="r = |\mathbf{r}|" />) konzervatív, és add meg a potenciálját!</>}>
          <p>
            Legyen <M t="G(r)" /> az <M t="r\,g(r)" /> primitív függvénye (<M t="G'(r) = r\,g(r)" />). Ekkor{' '}
            <M t="\nabla G(r) = G'(r)\nabla r = r\,g(r)\cdot\frac{\mathbf{r}}{r} = g(r)\,\mathbf{r} = \mathbf{F}" />!
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki az <M t="\int_C \Big(\frac{x}{x^2+y^2}\,dx + \frac{y}{x^2+y^2}\,dy\Big)" /> integrált <M t="(1; 0)" />-ból <M t="(0; e)" />-be bármely az origót elkerülő görbén!</>}>
          <p>
            Ez a 2D pontforrás mezője, amelynek a <strong>teljes</strong> lyukas síkon is van globális potenciálja:{' '}
            <M t="f(x, y) = \frac{1}{2}\ln(x^2 + y^2) = \ln r" />! Így az integrál{' '}
            <M t="\ln e - \ln 1 = 1" />!
          </p>
        </Task>

        <h3>Kiegészítő mintapélda</h3>
        <Steps
          source="Analízis-labor"
          title="2D potenciálfüggvény és munka kiszámítása"
          problem={<>Mutasd meg, hogy az <M t="\mathbf{F}(x, y) = (2xy + 1)\mathbf{i} + (x^2 + 3y^2)\mathbf{j}" /> vektormező konzervatív, keresd meg a potenciálját, és számítsd ki a munkáját a <M t="(0; 0)" /> pontból az <M t="(1; 2)" /> pontba!</>}
          steps={[
            {
              title: '1. Konzervativitási teszt',
              body: (
                <>
                  <M t="\frac{\partial M}{\partial y} = 2x = \frac{\partial N}{\partial x}" />, és <M t="\mathbb{R}^2" />{' '}
                  egyszeresen összefüggő <M t="\implies" /> a vektormező konzervatív.
                </>
              ),
            },
            {
              title: '2. Potenciálfüggvény meghatározása',
              body: (
                <>
                  Integráljunk <M t="x" /> szerint: <M t="f(x, y) = \int (2xy + 1)\,dx = x^2 y + x + g(y)" />.
                  Deriválva <M t="y" /> szerint: <M t="x^2 + g'(y) = x^2 + 3y^2 \implies g'(y) = 3y^2 \implies g(y) = y^3" />.
                </>
              ),
            },
            {
              title: '3. Munka a vonalintegrálok alaptételével',
              body: (
                <>
                  A potenciál <M t="f(x, y) = x^2 y + x + y^3" />, így a munka{' '}
                  <M t="W = f(1, 2) - f(0, 0) = (2 + 1 + 8) - 0 = 11" />.
                </>
              ),
            },
          ]}
        />

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Melyik 2D vektormező konzervatív az egész síkon?</>}
          options={[
            { label: <><M t="\mathbf{F} = y\mathbf{i} + x\mathbf{j}" /></>, ok: true },
            { label: <><M t="\mathbf{F} = -y\mathbf{i} + x\mathbf{j}" /></> },
            { label: <><M t="\mathbf{F} = x^2\mathbf{i} + xy\mathbf{j}" /></> },
            { label: <><M t="\mathbf{F} = y^2\mathbf{i} + x^2\mathbf{j}" /></> },
          ]}
          explain={
            <>
              Az <M t="\mathbf{F} = y\mathbf{i} + x\mathbf{j}" /> mezőre <M t="M_y = 1 = N_x" />, potenciálfüggvénye{' '}
              <M t="f(x, y) = xy" />.
            </>
          }
        />
      </>
    ),
  },
];
