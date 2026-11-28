import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  EquilibriumAndBlowupWidget,
  IsoclinePatternDiagram,
  OrthogonalTrajectoriesWidget,
  SeparableCheckChecklistDiagram,
  SeparationStepFlowDiagram,
  SlopeFieldExplorerWidget,
  SolutionFamilyWidget,
  TorricelliTankWidget,
} from '../components/Widgets91';
import type { Page } from './s1_1';

export const S9_1: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Elsőrendű differenciálegyenletek és megoldásaik',
    body: (
      <>
        <Story>
          <p>
            A természet törvényei szinte soha nem magát a keresett mennyiséget adják meg, hanem a{' '}
            <strong>változásának sebességét</strong>: a radioaktív bomlás, a hűlés, a tartály kiürülése vagy egy
            populáció növekedése mind olyan egyenlethez vezet, amelyben az ismeretlen <M t="y(x)" /> függvény{' '}
            <em>és</em> a deriváltja is szerepel. Ezek a <strong>differenciálegyenletek</strong>!
          </p>
        </Story>

        <Def title="Alapfogalmak: elsőrendű DE, általános és partikuláris megoldás">
          <ul>
            <li>
              <strong>Elsőrendű differenciálegyenlet:</strong> <M t="\frac{dy}{dx} = f(x, y)" /> (vagy{' '}
              <M t="y' = f(x, y)" />), mert csak az első derivált szerepel benne.
            </li>
            <li>
              <strong>Általános megoldás:</strong> egy <M t="C" /> tetszőleges konstanst tartalmazó görbesereg,
              amely az egyenlet összes megoldását leírja.
            </li>
            <li>
              <strong>Kezdetiérték-probléma (IVP):</strong> a differenciálegyenlet + egy{' '}
              <M t="y(x_0) = y_0" /> kezdeti feltétel, amely egyetlen <strong>partikuláris megoldást</strong>{' '}
              választ ki a seregből.
            </li>
          </ul>
        </Def>

        <p>
          <strong>Thomas 1. és 2. példa (megoldás ellenőrzése):</strong> Egy jelölt függvény ellenőrzéséhez{' '}
          <em>nem</em> kell megoldani az egyenletet — elég kiszámítani <M t="y'" />-t, és behelyettesíteni mindkét
          oldalba! Az <M t="y = (x+1) - \frac{1}{3}e^x" /> függvényre <M t="y' = 1 - \frac{1}{3}e^x" />, és{' '}
          <M t="y - x = (x+1) - \frac{1}{3}e^x - x = 1 - \frac{1}{3}e^x" />, továbbá{' '}
          <M t="y(0) = 1 - \frac{1}{3} = \frac{2}{3}" /> ✓.
        </p>

        <SolutionFamilyWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Ellenőrizd, hogy <M t="y = \frac{C}{x} + 2" /> megoldása-e az <M t="y' = \frac{1}{x}(2-y)" /> egyenletnek <M t="x > 0" />-ra (Thomas 1. példa)!</>}
        >
          <p>
            Bal oldal: <M t="y' = -\frac{C}{x^2}" />. Jobb oldal:{' '}
            <M t="\frac{1}{x}\left(2 - \left(\frac{C}{x}+2\right)\right) = -\frac{C}{x^2}" />. Megegyezik minden{' '}
            <M t="C" />-re!
          </p>
        </Task>
        <Task
          n={2}
          q={<>Határozd meg <M t="C" /> értékét az <M t="y = x + 1 + Ce^x" /> általános megoldásban úgy, hogy <M t="y(0) = 3" /> teljesüljön!</>}
        >
          <p>
            <M t="y(0) = 0 + 1 + C\cdot 1 = 3 \implies C = 2" />, tehát a partikuláris megoldás{' '}
            <M t="y = x + 1 + 2e^x" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Az iránymező: a megoldás látása számolás nélkül',
    body: (
      <>
        <p>
          A legtöbb differenciálegyenletet nem lehet zárt képlettel megoldani — mégis <strong>teljes képet</strong>{' '}
          kaphatunk a megoldásgörbéiről! Az <M t="y' = f(x, y)" /> egyenlet ugyanis minden <M t="(x, y)" /> pontban
          megadja az azon áthaladó megoldásgörbe <em>érintőjének meredekségét</em>. Ha rácsmentén berajzoljuk
          ezeket a kis meredekség-szakaszokat, megkapjuk az <strong>iránymezőt</strong>!
        </p>

        <SlopeFieldExplorerWidget />

        <p>
          Próbáld ki a fenti szimulátorban mind a 4 egyenletet, és mozgasd az <M t="y(0)" /> kezdeti értéket!
          Figyeld meg a <strong>logisztikus egyenletnél</strong> (<M t="y' = y(2-y)" />), hogyan hajlik minden
          pozitív megoldásgörbe az <M t="y = 2" /> egyensúlyi szint felé!
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Mekkora az <M t="y' = y - x" /> iránymező meredeksége a <M t="(1, 1)" />, <M t="(0, 2)" /> és <M t="(3, 1)" /> pontokban?</>}
        >
          <p>
            <M t="(1,1)" />-ben <M t="1-1=0" /> (vízszintes); <M t="(0,2)" />-ben <M t="2-0=2" /> (meredeken emelkedik);
            <M t="(3,1)" />-ben <M t="1-3=-2" /> (meredeken süllyed).
          </p>
        </Task>
        <Task
          n={4}
          q={<>Az <M t="y' = y(2-y)" /> egyenlet mely <M t="y" />-szinteken ad vízszintes pálcikákat (konstans egyensúlyi megoldásokat)?</>}
        >
          <p>
            Ahol <M t="y(2-y) = 0" />, vagyis <M t="\mathbf{y = 0}" /> és <M t="\mathbf{y = 2}" /> mentén!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Iránymező-olvasás és izoklinák',
    body: (
      <>
        <p>
          Vizsgán és mérnöki elemzésben is gyakori feladat egy iránymező párosítása a megfelelő egyenlettel.
          Nem kell pontról pontra számolnod: elég három szerkezeti mintát (és a <strong>nulla-izoklinát</strong>,
          ahol <M t="y' = 0" />) megnézni!
        </p>

        <IsoclinePatternDiagram />

        <Def title="Izoklina">
          <p>
            Azokat a görbéket, amelyek mentén <M t="f(x, y) = k" /> állandó (tehát az iránymező összes pálcikája
            egyenlő <M t="k" /> meredekségű), <strong>izoklináknak</strong> nevezzük. Különösen hasznos a{' '}
            <M t="k=0" /> nulla-izoklina, mert a megoldásgörbék itt fordulnak meg (szélsőértékük lehet)!
          </p>
        </Def>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Párosítsd az egyenleteket a tulajdonságukkal: (a) <M t="y' = x^2" />, (b) <M t="y' = y - 1" />, (c) <M t="y' = x + y" />! Melyikben párhuzamosak a pálcikák oszloponként, melyikben soronként, és melyiknek az <M t="y=-x" /> a nulla-izoklinája?</>}
        >
          <p>
            (a) csak <M t="x" />-től függ → <strong>oszloponként</strong> párhuzamos; (b) csak <M t="y" />-tól
            függ → <strong>soronként</strong> párhuzamos; (c) <M t="x+y=0 \iff y=-x" /> a nulla-izoklinája.
          </p>
        </Task>
        <Task
          n={6}
          q={<>Mi az <M t="y' = y^2 - x^2" /> egyenlet nulla-izoklinája?</>}
        >
          <p>
            <M t="y^2 - x^2 = 0 \iff y = x" /> vagy <M t="y = -x" /> (két egymásra merőleges egyenes, amelyek
            mentén minden érintő vízszintes!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Szétválasztható változójú (szeparábilis) egyenletek',
    body: (
      <>
        <p>
          Az első nagy analitikus megoldási módszer akkor működik, ha a jobb oldal egy <em>csak <M t="x" />-től</em>{' '}
          és egy <em>csak <M t="y" />-tól</em> függő tényező szorzatára bontható:
        </p>
        <M block t="\frac{dy}{dx} = g(x)H(y) \quad\xrightarrow{H(y)\neq 0}\quad \frac{1}{H(y)}\,dy = g(x)\,dx \quad\Longrightarrow\quad \int \frac{dy}{H(y)} = \int g(x)\,dx." />

        <SeparationStepFlowDiagram />

        <p>
          <strong>Thomas 3. példa:</strong> Oldjuk meg a <M t="\frac{dy}{dx} = (1+y^2)e^x" /> egyenletet! Mivel{' '}
          <M t="1+y^2 > 0" /> soha nem nulla, gond nélkül oszthatunk vele:
        </p>
        <M block t="\int \frac{dy}{1+y^2} = \int e^x\,dx \;\Longrightarrow\; \operatorname{arctg} y = e^x + C \;\Longrightarrow\; y = \operatorname{tg}(e^x + C)." />

        <p>
          <strong>Thomas 4. példa:</strong> Oldjuk meg az <M t="(x+1)\frac{dy}{dx} = x(y^2+1)" /> egyenletet (<M t="x\neq -1" />):
        </p>
        <M block t="\int \frac{dy}{1+y^2} = \int \frac{x}{x+1}\,dx = \int\left(1 - \frac{1}{x+1}\right)dx \;\Longrightarrow\; \operatorname{arctg} y = x - \ln|x+1| + C." />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>Oldd meg a <M t="\frac{dy}{dx} = 2xy" /> egyenletet az <M t="y(0) = 3" /> kezdeti feltétellel!</>}
        >
          <p>
            <M t="\int \frac{dy}{y} = \int 2x\,dx \implies \ln|y| = x^2 + C \implies y = A e^{x^2}" />. Mivel{' '}
            <M t="y(0)=3" />, <M t="A=3" />, tehát <M t="\mathbf{y = 3e^{x^2}}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={<>Oldd meg a <M t="\frac{dy}{dx} = e^{x-y}" /> egyenletet!</>}
        >
          <p>
            Írjuk át: <M t="e^{x-y} = e^x e^{-y}" />. Szétválasztva <M t="e^y\,dy = e^x\,dx" />, integrálva{' '}
            <M t="e^y = e^x + C \implies \mathbf{y = \ln(e^x + C)}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Elveszett egyensúlyi megoldások és a +C csapdája',
    body: (
      <>
        <Warn>
          <strong>Két klasszikus hiba szeparábilis egyenleteknél:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>
              <strong>Elveszett konstans megoldás:</strong> amikor osztasz <M t="H(y)" />-nal, elveszítheted a{' '}
              <M t="H(y) = 0" /> egyensúlyi megoldásokat! Mindig ellenőrizd őket külön!
            </li>
            <li>
              <strong>Rossz helyre tett <M t="+C" />:</strong> ha <M t="\ln|y| = x + C" />, akkor exponentiálva{' '}
              <M t="y = A e^x" /> (szorzó konstans!), <em>nem</em> pedig <M t="e^x + C" />!
            </li>
          </ol>
        </Warn>

        <p>
          Nézd meg az <M t="y' = y^2" /> egyenletet: ha <M t="y\neq 0" />, akkor{' '}
          <M t="\int y^{-2}\,dy = \int dx \implies -\frac{1}{y} = x + C \implies y = -\frac{1}{x+C}" />. Ez a
          képlet egyetlen véges <M t="C" />-vel sem adja vissza az <M t="y \equiv 0" /> megoldást — pedig{' '}
          <M t="0' = 0^2" /> nyilvánvalóan igaz!
        </p>

        <EquilibriumAndBlowupWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Keresd meg az <M t="y' = y^2 - 1" /> egyenlet összes konstans (egyensúlyi) megoldását!</>}
        >
          <p>
            <M t="H(y) = y^2 - 1 = 0 \implies \mathbf{y \equiv 1}" /> és <M t="\mathbf{y \equiv -1}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={<>Oldd meg az <M t="y' = y^2,\; y(0) = 2" /> kezdetiérték-problémát, és add meg a maximális értelmezési intervallumot (hol robban fel)!</>}
        >
          <p>
            <M t="-\frac{1}{y} = x + C" />; <M t="y(0)=2 \Rightarrow C = -\frac{1}{2}" />, így{' '}
            <M t="y(x) = \frac{1}{\frac{1}{2} - x} = \frac{2}{1-2x}" />. A robbanás <M t="x = \frac{1}{2}" />-nél
            van, így a <M t="0" />-t tartalmazó maximális intervallum <M t="(-\infty, \frac{1}{2})" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Implicit megoldások és ortogonális trajektóriák',
    body: (
      <>
        <p>
          Sokszor a szétválasztás után kapott egyenletből nem érdemes (vagy nem is lehet) kifejezni <M t="y" />-t:
          az <strong>implicit alak</strong> önmagában is tökéletes megoldás! Például az{' '}
          <M t="\frac{dy}{dx} = -\frac{x}{y}" /> egyenletből <M t="y\,dy = -x\,dx \implies x^2 + y^2 = C" />{' '}
          adódik: origó középpontú körök serege!
        </p>

        <Def title="Ortogonális trajektóriák">
          <p>
            Két görbesereg <strong>ortogonális</strong>, ha minden metszéspontjukban merőlegesek egymásra (az
            érintőik meredekségének szorzata <M t="-1" />). Ezért ha az első sereg differenciálegyenlete{' '}
            <M t="y' = f(x, y)" />, akkor a rá merőleges sereg egyenlete:
          </p>
          <M block t="y' = -\frac{1}{f(x, y)}." />
        </Def>

        <OrthogonalTrajectoriesWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Oldd meg implicit alakban az <M t="y' = \frac{3x^2+4x+2}{2(y-1)}" /> egyenletet az <M t="y(0) = -1" /> feltétellel (Thomas 36. feladat)!</>}
        >
          <p>
            <M t="\int 2(y-1)\,dy = \int (3x^2+4x+2)\,dx \implies y^2 - 2y = x^3 + 2x^2 + 2x + C" />.
            Behelyettesítve <M t="(0,-1)" />-et: <M t="1 + 2 = C \Rightarrow C = 3" />, tehát{' '}
            <M t="\mathbf{y^2 - 2y = x^3 + 2x^2 + 2x + 3}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={<>Keresd meg az <M t="y = c x^2" /> parabolák ortogonális trajektóriáit!</>}
        >
          <p>
            Deriválva <M t="y' = 2cx = 2\frac{y}{x^2}x = \frac{2y}{x}" />. A merőleges sereg egyenlete{' '}
            <M t="y' = -\frac{x}{2y}" />, szétválasztva <M t="2y\,dy = -x\,dx \implies \mathbf{x^2 + 2y^2 = k}" />{' '}
            (ellipszisek!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Torricelli törvénye: tartály kiürítése',
    body: (
      <>
        <p>
          <strong>Thomas 5. példa (Torricelli törvénye):</strong> Egy <M t="r = 1{,}5\text{ m}" /> sugarú,{' '}
          <M t="4\text{ m}" /> magas hengeres tartály tele van vízzel. A kifolyás sebessége arányos a{' '}
          <M t="h" /> vízmagasság négyzetgyökével: <M t="\frac{dV}{dt} = -0{,}1\sqrt{h}\;\text{m}^3/\text{perc}" />.
          Mennyi idő alatt ürül ki a tartály?
        </p>

        <p>
          A víz térfogata <M t="V = \pi r^2 h = 2{,}25\pi h" />, így <M t="\frac{dV}{dt} = 2{,}25\pi\frac{dh}{dt}" />.
          Egyenlővé téve és szétválasztva:
        </p>
        <M block t="2{,}25\pi\frac{dh}{dt} = -0{,}1\sqrt{h} \;\Longrightarrow\; \int h^{-1/2}\,dh = -\frac{0{,}1}{2{,}25\pi}\int dt \;\Longrightarrow\; 2\sqrt{h} = -\frac{2}{45\pi}t + C." />
        <p>
          Mivel <M t="h(0) = 4" />, adódik <M t="C = 2\sqrt{4} = 4" />. A tartály akkor ürül ki (<M t="h=0" />),
          amikor <M t="\frac{2}{45\pi}t = 4 \implies t = \mathbf{90\pi \approx 282{,}7\text{ perc}}" />!
        </p>

        <TorricelliTankWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>A fenti tartályból mennyi idő alatt folyik ki a víz <strong>első fele</strong> (4 m-ről 2 m-re), és mennyi ideig tart a <strong>második fele</strong> (2 m-ről 0 m-re)?</>}
        >
          <p>
            <M t="h=2" />-nél <M t="2\sqrt{2} = 4 - \frac{2}{45\pi}t \implies t_1 = 90\pi\left(1 - \frac{\sqrt{2}}{2}\right) \approx \mathbf{82{,}8\text{ perc}}" />.
            A második fél tehát <M t="282{,}7 - 82{,}8 \approx \mathbf{199{,}9\text{ perc}}" /> (több mint kétszer annyi,
            mert csökken a hidrosztatikai nyomás!).
          </p>
        </Task>
        <Task
          n={14}
          q={<>Ha a tartály sugara kétszer akkora lenne (<M t="r = 3\text{ m}" />), ugyanazzal a leeresztő nyílással hányszorosára nőne a kiürülési idő?</>}
        >
          <p>
            A keresztmetszet <M t="\pi r^2" /> a <strong>4-szeresére</strong> nő, így az ürülési idő is pontosan{' '}
            <strong>4-szeres</strong> (<M t="360\pi \approx 1131\text{ perc}" />)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok (50%-os mérföldkő!)',
    body: (
      <>
        <SeparableCheckChecklistDiagram />

        <Def title="9.1 Puskakártya — Kulcsfogalmak egy helyen">
          <ul>
            <li>
              <strong>Kezdetiérték-probléma:</strong> <M t="y' = f(x, y),\; y(x_0) = y_0" /> → egyetlen
              partikuláris megoldásgörbét jelöl ki.
            </li>
            <li>
              <strong>Iránymező:</strong> minden <M t="(x,y)" /> pontban <M t="f(x,y)" /> meredekségű érintődarabka;
              az <M t="f(x,y)=0" /> görbe a nulla-izoklina.
            </li>
            <li>
              <strong>Szeparábilis recept:</strong> <M t="\frac{dy}{dx} = g(x)H(y) \implies \int\frac{dy}{H(y)} = \int g(x)\,dx" />{' '}
              + <M t="H(y)=0" /> egyensúlyok ellenőrzése!
            </li>
            <li>
              <strong>Ortogonális trajektória:</strong> <M t="y'_{\perp} = -1/y'" />.
            </li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 9.1-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Nem szeparábilis egyenletet próbálni szétválasztani (pl. <M t="y' = x + y" /> nem bontható szorzatba!).</li>
            <li>Osztás <M t="H(y)" />-nal anélkül, hogy megvizsgálnád a <M t="H(y) = 0" /> elveszett megoldásokat.</li>
            <li>A <M t="+C" /> elhagyása integráláskor, vagy rossz algebra (<M t="\ln|y|=x+C \implies y=Ae^x" />, NEM <M t="e^x+C" />!).</li>
            <li>Az <M t="\ln|y|" /> abszolút értékének elfelejtése (negatív kezdeti értéknél elrontja az előjelet!).</li>
            <li>A kezdeti feltétel késői behelyettesítése bonyolult átalakítások után — sokszor kényelmesebb már az implicit alakban megkeresni <M t="C" />-t!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Oldd meg a <M t="\frac{dy}{dx} = \frac{x}{y}" /> egyenletet!</>}
        >
          <p>
            <M t="y\,dy = x\,dx \implies \frac{y^2}{2} = \frac{x^2}{2} + C_1 \implies \mathbf{y^2 - x^2 = C}" />{' '}
            (hiperbolák).
          </p>
        </Task>
        <Task
          n={16}
          q={<>Oldd meg az <M t="\frac{dy}{dx} = 3x^2 y,\; y(0) = 5" /> kezdetiérték-problémát!</>}
        >
          <p>
            <M t="\ln|y| = x^3 + C \implies y = Ae^{x^3}" />. Mivel <M t="y(0)=5" />, <M t="\mathbf{y = 5e^{x^3}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Ellenőrizd, hogy <M t="y = e^{-2x} + 3" /> megoldása-e az <M t="y' + 2y = 6" /> egyenletnek!</>}
        >
          <p>
            <M t="y' = -2e^{-2x}" />, így <M t="y' + 2y = -2e^{-2x} + 2(e^{-2x}+3) = 6" /> ✓.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Oldd meg az <M t="\frac{dy}{dx} = y\sin x,\; y(\pi) = -3" /> kezdetiérték-problémát!</>}
        >
          <p>
            <M t="\ln|y| = -\cos x + C \implies y = A e^{-\cos x}" />. Behelyettesítve <M t="x=\pi" />-t:{' '}
            <M t="-3 = A e^1 \Rightarrow A = -3/e" />, így <M t="\mathbf{y = -3e^{-1-\cos x}}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={<>Oldd meg a <M t="\frac{dy}{dx} = \frac{1+y^2}{1+x^2},\; y(0) = 1" /> egyenletet!</>}
        >
          <p>
            <M t="\operatorname{arctg} y = \operatorname{arctg} x + C" />. Mivel <M t="y(0)=1" />,{' '}
            <M t="C = \frac{\pi}{4}" />, így <M t="y = \operatorname{tg}\!\left(\operatorname{arctg} x + \frac{\pi}{4}\right) = \mathbf{\frac{x+1}{1-x}}" />!
          </p>
        </Task>
        <Task
          n={20}
          q={<>Oldd meg a <M t="\frac{dy}{dx} = xy + 2x - y - 2" /> egyenletet!</>}
        >
          <p>
            Faktorizálva: <M t="y' = (x-1)(y+2)" />! Egyensúly: <M t="y\equiv -2" />. Különben{' '}
            <M t="\ln|y+2| = \frac{x^2}{2} - x + C \implies \mathbf{y = -2 + A e^{\frac{1}{2}x^2 - x}}" />{' '}
            (amely <M t="A=0" />-ra az egyensúlyt is tartalmazza).
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Oldd meg a logisztikus egyenletet: <M t="\frac{dy}{dt} = y(2-y),\; y(0) = \frac{1}{2}" /> (Thomas 31. feladat)!</>}
        >
          <p>
            Parciális törtekkel: <M t="\frac{1}{y(2-y)} = \frac{1}{2}\left(\frac{1}{y} + \frac{1}{2-y}\right)" />.
            Integrálva: <M t="\frac{1}{2}\ln\left|\frac{y}{2-y}\right| = t + C \implies \frac{y}{2-y} = A e^{2t}" />.
            Mivel <M t="y(0)=\frac{1}{2}" />, <M t="A = \frac{1/2}{3/2} = \frac{1}{3}" />, amiből{' '}
            <M t="\mathbf{y(t) = \frac{2}{1 + 3e^{-2t}}}" />.
          </p>
        </Task>
        <Task
          n={22}
          q={<>Keresd meg az <M t="x^2 - y^2 = c" /> egyenlő szárú hiperbolák ortogonális trajektóriáit!</>}
        >
          <p>
            Implicit deriválva: <M t="2x - 2yy' = 0 \implies y' = \frac{x}{y}" />. A merőleges sereg egyenlete{' '}
            <M t="y' = -\frac{y}{x}" /> → <M t="\frac{dy}{y} = -\frac{dx}{x} \implies \ln|y| = -\ln|x| + C \implies \mathbf{xy = k}" />{' '}
            (45°-kal elforgatott hiperbolák!).
          </p>
        </Task>
        <Task
          n={23}
          q={<>Oldd meg az <M t="y' = \sqrt{y},\; y(0) = 0" /> egyenletet! Hány megoldása van ennek a kezdetiérték-problémának?</>}
        >
          <p>
            <strong>Végtelen sok!</strong> Egyrészt <M t="y \equiv 0" /> megoldás, másrészt szétválasztva{' '}
            <M t="y(x) = \frac{x^2}{4}" /> (<M t="x\ge 0" />), sőt bármely <M t="a\ge 0" />-ra a „késleltetve induló”{' '}
            <M t="y(x) = 0" /> (<M t="x\le a" />), <M t="y(x) = \frac{(x-a)^2}{4}" /> (<M t="x>a" />) is megoldás!
            (Azért nem egyértelmű, mert <M t="\frac{\partial}{\partial y}\sqrt{y} = \frac{1}{2\sqrt{y}}" /> nem folytonos <M t="y=0" />-nál.)
          </p>
        </Task>

        <h3>Kiegészítő mintapélda és gyorsteszt</h3>
        <Steps
          title="Szeparábilis kezdetiérték-probléma megoldása"
          source="Analízis-labor"
          problem={
            <>
              Oldjuk meg a <M t="\dfrac{dy}{dx} = 2xy^2" />, <M t="y(0) = -1" /> kezdetiérték-problémát!
            </>
          }
          steps={[
            {
              title: 'Változók szétválasztása',
              body: (
                <p>
                  Mivel <M t="y(0) = -1 \ne 0" />, oszthatunk <M t="y^2" />-tel: <M t="y^{-2}\,dy = 2x\,dx" />.
                </p>
              ),
            },
            {
              title: 'Mindkét oldal integrálása',
              body: (
                <p>
                  <M t="-y^{-1} = x^2 + C \implies y = -\dfrac{1}{x^2 + C}" />.
                </p>
              ),
            },
            {
              title: 'Kezdeti feltétel behelyettesítése',
              body: (
                <p>
                  <M t="x = 0,\; y = -1" /> alapján <M t="-1 = -\dfrac{1}{C} \implies C = 1" />, tehát a megoldás <M t="\mathbf{y(x) = -\dfrac{1}{x^2 + 1}}" />.
                </p>
              ),
            },
          ]}
        />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Melyik differenciálegyenlet szétválasztható változójú?
            </>
          }
          options={[
            { label: <M t="y' = e^{x + y}" />, ok: true },
            { label: <M t="y' = x + y" /> },
            { label: <M t="y' = \sin(xy)" /> },
            { label: <M t="y' = x^2 + y^2" /> },
          ]}
          explain={
            <>
              Mivel <M t="e^{x+y} = e^x\cdot e^y" />, a jobb oldal tisztán <M t="x" />-es és <M t="y" />-os tényező szorzata.
            </>
          }
        />
      </>
    ),
  },
];
