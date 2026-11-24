import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ForceEquilibriumWidget,
  MidpointVectorWidget,
  ScalarVsVectorDiagram,
  UnitVector3DWidget,
  VectorAdd3DWidget,
  VectorOpsSummaryDiagram,
  VectorShift2DWidget,
  WindVelocityWidget,
} from '../components/Widgets122';
import type { Page } from './s1_1';

export const S12_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Irányított szakaszok és a vektor komponensalakja',
    body: (
      <>
        <Story>
          <p>
            A hőmérsékletet vagy a tömeget egyetlen szám (<em>skalár</em>) leírja. Ha viszont azt mondom, hogy a szél
            „50 km/h-val fúj”, még nem tudod, segít-e vagy szembe fúj — kell az <strong>iránya</strong> is! Az ilyen,
            nagysággal és iránnyal is rendelkező mennyiségek a <strong>vektorok</strong>.
          </p>
        </Story>

        <Def title="Vektor és komponensalak">
          <p>
            A <M t="P(x_1;\,y_1;\,z_1)" /> kezdőpontból a <M t="Q(x_2;\,y_2;\,z_2)" /> végpontba mutató{' '}
            <M t="\overrightarrow{PQ}" /> <strong>vektor komponensalakja</strong>:
            <M block t="\mathbf{v} = \overrightarrow{PQ} = \langle x_2 - x_1,\; y_2 - y_1,\; z_2 - z_1 \rangle = \langle v_1, v_2, v_3 \rangle." />
            Két vektor <strong>egyenlő</strong>, ha azonos a hosszuk és az irányuk — vagyis ugyanazok a komponenseik
            (a kezdőpont eltolása nem változtatja meg a vektort!). A <M t="\mathbf{0} = \langle 0, 0, 0 \rangle" /> a{' '}
            <strong>nullvektor</strong>.
          </p>
        </Def>

        <VectorShift2DWidget />

        <Task n={1} q={<>Add meg a <M t="P(-1;\,3;\,2)" /> pontból a <M t="Q(4;\,0;\,-3)" /> pontba mutató <M t="\overrightarrow{PQ}" /> vektor komponensalakját és hosszát!</>}>
          <p>
            Végpont mínusz kezdőpont: <M t="\overrightarrow{PQ} = \langle 4-(-1),\; 0-3,\; -3-2 \rangle = \langle 5, -3, -5 \rangle" />.
            Hossza: <M t="|\overrightarrow{PQ}| = \sqrt{25 + 9 + 25} = \sqrt{59}" />.
          </p>
        </Task>

        <Task n={2} q={<>Ha <M t="\overrightarrow{AB} = \langle 2, -4, 1 \rangle" /> és <M t="A(3;\,1;\,-2)" />, hol van a <M t="B" /> végpont?</>}>
          <p>
            <M t="B = A + \overrightarrow{AB} = (3+2;\; 1-4;\; -2+1) = (5;\,-3;\,-1)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Vektorok összeadása, kivonása és skalárral szorzása',
    body: (
      <>
        <p>
          A vektorokkal komponensenként pont olyan könnyen számolhatunk, mint a számokkal, geometriailag pedig gyönyörű
          szabályok állnak mögöttük:
        </p>
        <ul>
          <li>
            <strong>Összeadás:</strong> <M t="\mathbf{u} + \mathbf{v} = \langle u_1+v_1,\; u_2+v_2,\; u_3+v_3 \rangle" />{' '}
            (<em>paralelogramma-</em> vagy <em>háromszög-szabály</em>).
          </li>
          <li>
            <strong>Kivonás:</strong> <M t="\mathbf{u} - \mathbf{v} = \mathbf{u} + (-\mathbf{v})" /> — közös
            kezdőpontból indítva a <M t="\mathbf{v}" /> csúcsából az <M t="\mathbf{u}" /> csúcsába mutató átló!
          </li>
          <li>
            <strong>Skalárral szorzás:</strong> <M t="k\mathbf{v} = \langle kv_1, kv_2, kv_3 \rangle" /> — hossza{' '}
            <M t="|k|\,|\mathbf{v}|" />, iránya azonos ha <M t="k>0" />, ellentétes ha <M t="k<0" />.
          </li>
        </ul>

        <VectorAdd3DWidget />

        <Quiz
          q={<>Ha az <M t="\mathbf{u}" /> és <M t="\mathbf{v}" /> vektorokat közös kezdőpontból indítjuk, hová mutat az <M t="\mathbf{u} - \mathbf{v}" /> vektor?</>}
          options={[
            { label: <>Az <M t="\mathbf{u}" /> végpontjából a <M t="\mathbf{v}" /> végpontjába</> },
            { label: <>A <M t="\mathbf{v}" /> végpontjából az <M t="\mathbf{u}" /> végpontjába</>, ok: true },
            { label: <>A közös kezdőpontból a paralelogramma szemközti csúcsába</> },
            { label: <>Mindig merőleges <M t="\mathbf{u}" />-ra és <M t="\mathbf{v}" />-re</> },
          ]}
          explain={
            <>
              Ellenőrizd összeadással: <M t="\mathbf{v} + (\mathbf{u} - \mathbf{v}) = \mathbf{u}" />! Tehát{' '}
              <M t="\mathbf{v}" /> végéhez illesztve <M t="\mathbf{u} - \mathbf{v}" />-t pontosan <M t="\mathbf{u}" />{' '}
              végpontjába jutunk.
            </>
          }
        />

        <Task n={3} q={<>Legyen <M t="\mathbf{u} = \langle 1, -2, 3 \rangle" /> és <M t="\mathbf{v} = \langle -2, 4, 1 \rangle" />. Számítsd ki <M t="2\mathbf{u} - 3\mathbf{v}" /> komponenseit és hosszát!</>}>
          <p>
            <M t="2\mathbf{u} - 3\mathbf{v} = \langle 2, -4, 6 \rangle - \langle -6, 12, 3 \rangle = \langle 8, -16, 3 \rangle" />.
            Hossza: <M t="\sqrt{64 + 256 + 9} = \sqrt{329}" />.
          </p>
        </Task>

        <Task n={4} q={<>Milyen <M t="k" /> skalár esetén párhuzamos a <M t="\mathbf{w} = \langle 6, -9, k \rangle" /> vektor a <M t="\mathbf{v} = \langle -2, 3, 5 \rangle" /> vektorral?</>}>
          <p>
            Az első két komponens aránya <M t="6/(-2) = -3" /> és <M t="(-9)/3 = -3" />, tehát{' '}
            <M t="\mathbf{w} = -3\mathbf{v}" />, innen <M t="k = -3\cdot 5 = -15" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A standard i, j, k bázis és az egységvektor',
    body: (
      <>
        <p>
          A három koordinátatengely pozitív irányába mutató, 1 hosszúságú vektorok a <strong>standard bázisvektorok</strong>:
          <M block t="\mathbf{i} = \langle 1, 0, 0 \rangle, \qquad \mathbf{j} = \langle 0, 1, 0 \rangle, \qquad \mathbf{k} = \langle 0, 0, 1 \rangle." />
          Minden térbeli vektor egyértelműen felírható ezek lineáris kombinációjaként:{' '}
          <M t="\mathbf{v} = \langle v_1, v_2, v_3 \rangle = v_1\mathbf{i} + v_2\mathbf{j} + v_3\mathbf{k}" />.
        </p>

        <Def title="Egységvektor és hossz–irány felbontás">
          <p>
            Az <M t="1" /> hosszúságú vektorokat <strong>egységvektornak</strong> nevezzük. Minden{' '}
            <M t="\mathbf{v} \ne \mathbf{0}" /> vektor irányába mutató egységvektor:
            <M block t="\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|} \qquad \Longleftrightarrow \qquad \mathbf{v} = |\mathbf{v}|\,\mathbf{u} \quad (\text{hossz} \times \text{irány})." />
          </p>
        </Def>

        <UnitVector3DWidget />

        <Steps
          title="Adott hosszúságú és irányú vektor előállítása"
          problem={<>Keress egy <M t="6" /> egység hosszú vektort, amely azonos irányú a <M t="\mathbf{v} = 2\mathbf{i} - \mathbf{j} + 2\mathbf{k}" /> vektorral!</>}
          steps={[
            {
              title: 'A v vektor hosszának kiszámítása',
              body: (
                <p>
                  <M t="|\mathbf{v}| = \sqrt{2^2 + (-1)^2 + 2^2} = \sqrt{4 + 1 + 4} = \sqrt{9} = 3" />.
                </p>
              ),
            },
            {
              title: 'Normálás (irányegységvektor)',
              body: (
                <p>
                  <M block t="\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|} = \frac{1}{3}(2\mathbf{i} - \mathbf{j} + 2\mathbf{k}) = \frac{2}{3}\mathbf{i} - \frac{1}{3}\mathbf{j} + \frac{2}{3}\mathbf{k}." />
                </p>
              ),
            },
            {
              title: 'Skálázás a kívánt 6 hosszra',
              body: (
                <p>
                  <M t="\mathbf{w} = 6\mathbf{u} = 4\mathbf{i} - 2\mathbf{j} + 4\mathbf{k}" /> (ellenőrzés:{' '}
                  <M t="\sqrt{16+4+16} = \sqrt{36} = 6" />!).
                </p>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Add meg a <M t="\mathbf{v} = 3\mathbf{i} - 4\mathbf{j}" /> vektorral ellentétes irányú egységvektort!</>}>
          <p>
            <M t="|\mathbf{v}| = \sqrt{9 + 16} = 5" />. Az ellentétes irányú egységvektor:{' '}
            <M t="-\frac{\mathbf{v}}{5} = -\frac{3}{5}\mathbf{i} + \frac{4}{5}\mathbf{j}" />.
          </p>
        </Task>

        <Task n={6} q={<>Egy síkbeli vektor hossza <M t="10" />, és a pozitív <M t="x" />-tengellyel <M t="120^\circ" />-os szöget zár be. Írd fel komponensalakban!</>}>
          <p>
            <M t="\mathbf{v} = 10\langle \cos 120^\circ, \sin 120^\circ \rangle = 10\left\langle -\frac{1}{2}, \frac{\sqrt{3}}{2} \right\rangle = \langle -5,\; 5\sqrt{3} \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Felezőpont és szakasz osztópontja vektorokkal',
    body: (
      <>
        <p>
          A vektorokkal gyerekjáték egy szakasz felezőpontját vagy tetszőleges arányú osztópontját felírni! Ha{' '}
          <M t="P_1" /> és <M t="P_2" /> helyvektora <M t="\mathbf{p}_1" /> és <M t="\mathbf{p}_2" />, akkor a szakasz
          minden pontja megkapható <M t="t \in [0, 1]" /> paraméterrel:
          <M block t="\mathbf{r}(t) = \mathbf{p}_1 + t(\mathbf{p}_2 - \mathbf{p}_1) = (1 - t)\mathbf{p}_1 + t\mathbf{p}_2." />
          Speciálisan <M t="t = \frac{1}{2}" /> esetén megkapjuk a <strong>felezőpontot</strong>:{' '}
          <M t="\mathbf{m} = \frac{1}{2}(\mathbf{p}_1 + \mathbf{p}_2)" />!
        </p>

        <MidpointVectorWidget />

        <Quiz
          q={<>Mi a <M t="P(2;\,-1;\,4)" /> és <M t="Q(6;\,3;\,-2)" /> pontokat összekötő szakasz felezőpontja?</>}
          options={[
            { label: <M t="(4;\,1;\,1)" />, ok: true },
            { label: <M t="(4;\,2;\,-3)" /> },
            { label: <M t="(8;\,2;\,2)" /> },
            { label: <M t="(2;\,2;\,-3)" /> },
          ]}
          explain={
            <>
              A koordináták átlaga: <M t="\left(\frac{2+6}{2};\; \frac{-1+3}{2};\; \frac{4-2}{2}\right) = (4;\,1;\,1)" />.
            </>
          }
        />

        <Task n={7} q={<>Határozd meg az <M t="A(1;\,2;\,-3)" /> és <M t="B(7;\,-4;\,3)" /> szakaszt <M t="1:2" /> arányban osztó (<M t="A" />-hoz közelebbi) pontot!</>}>
          <p>
            <M t="t = \frac{1}{3}" />-mal: <M t="\mathbf{r}\!\left(\frac{1}{3}\right) = \mathbf{a} + \frac{1}{3}\overrightarrow{AB} = (1;\,2;\,-3) + \frac{1}{3}\langle 6, -6, 6 \rangle = (3;\,0;\,-1)" />.
          </p>
        </Task>

        <Task n={8} q={<>Egy háromszög csúcsai <M t="A(0;\,0;\,0)" />, <M t="B(6;\,0;\,0)" /> és <M t="C(0;\,6;\,9)" />. Hol van a súlypontja (<M t="S" />)?</>}>
          <p>
            A súlypont a három helyvektor átlaga: <M t="S = \frac{A + B + C}{3} = (2;\,2;\,3)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Fizikai alkalmazás I.: sebességek összeadása',
    body: (
      <>
        <p>
          Ha egy repülőgép a levegőhöz képest <M t="\mathbf{v}_{\text{gép}}" /> sebességgel halad, miközben{' '}
          <M t="\mathbf{v}_{\text{szél}}" /> szél fúj, akkor a földhöz képesti valódi sebessége egyszerűen a két vektor
          összege: <M t="\mathbf{v}_{\text{föld}} = \mathbf{v}_{\text{gép}} + \mathbf{v}_{\text{szél}}" />!
        </p>

        <WindVelocityWidget />

        <Task n={9} q={<>Egy repülőgép <M t="400\text{ km/h}" /> sebességgel halad kelet felé, miközben északnyugatról délkelet felé (<M t="-45^\circ" />) <M t="60\text{ km/h}" /> szél fúj. Mi a gép föld feletti sebessége?</>}>
          <p>
            <M t="\mathbf{v}_{\text{gép}} = \langle 400, 0 \rangle" />,{' '}
            <M t="\mathbf{v}_{\text{szél}} = \langle 60\cos(-45^\circ), 60\sin(-45^\circ) \rangle \approx \langle 42{,}4,\; -42{,}4 \rangle" />.
            Az eredő <M t="\langle 442{,}4,\; -42{,}4 \rangle" />, nagysága{' '}
            <M t="\sqrt{442{,}4^2 + (-42{,}4)^2} \approx 444{,}4\text{ km/h}" />.
          </p>
        </Task>

        <Task n={10} q={<>Egy csónak <M t="5\text{ m/s}" /> sebességgel tud haladni állóvízben, a folyó <M t="3\text{ m/s}" /> sebességgel sodorja. Milyen szögben kell a partra merőleges iránytól felfelé tartani, hogy pontosan merőlegesen keljen át?</>}>
          <p>
            A folyás irányú komponensnek ki kell oltania a sodrást: <M t="5\sin\theta = 3 \implies \sin\theta = 0{,}6 \implies \theta \approx 36{,}9^\circ" />.
            Ekkor az átkelési sebesség <M t="5\cos\theta = 4\text{ m/s}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Fizikai alkalmazás II.: erők egyensúlya (statika)',
    body: (
      <>
        <p>
          Newton első törvénye szerint egy test akkor van <strong>egyensúlyban</strong> (nyugalomban vagy egyenletes
          mozgásban), ha a rá ható erők vektorösszege nullvektor:
          <M block t="\sum \mathbf{F}_i = \mathbf{0} \qquad \Longleftrightarrow \qquad \sum F_{ix} = 0,\quad \sum F_{iy} = 0,\quad \sum F_{iz} = 0." />
        </p>

        <ForceEquilibriumWidget />

        <Task n={11} q={<>Egy <M t="100\text{ N}" /> súlyú lámpát két szimmetrikus kötél tart, mindkettő <M t="30^\circ" />-os szöget zár be a vízszintes plafonnal. Mekkora erő ébred egy-egy kötélben?</>}>
          <p>
            Szimmetria miatt <M t="|T_1| = |T_2| = T" />. A függőleges egyensúly:{' '}
            <M t="2T\sin 30^\circ = 100 \implies 2T\cdot\frac{1}{2} = 100 \implies T = 100\text{ N}" />!
          </p>
        </Task>

        <Task n={12} q={<>Két erő hat egy pontra: <M t="\mathbf{F}_1 = \langle 3, -5, 2 \rangle" /> és <M t="\mathbf{F}_2 = \langle -1, 2, 4 \rangle" />. Milyen <M t="\mathbf{F}_3" /> erő hozza egyensúlyba a rendszert?</>}>
          <p>
            <M t="\mathbf{F}_3 = -(\mathbf{F}_1 + \mathbf{F}_2) = -\langle 2, -3, 6 \rangle = \langle -2, 3, -6 \rangle" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: jelölések, szabályok és 4 tipikus hiba',
    body: (
      <>
        <ScalarVsVectorDiagram />

        <VectorOpsSummaryDiagram />

        <Warn>
          Négy tipikus hiba vektoroknál:
          <ol>
            <li>
              <strong>Kezdőpont mínusz végpont:</strong> <M t="\overrightarrow{PQ}" /> mindig{' '}
              <strong>végpont mínusz kezdőpont</strong> (<M t="Q - P" />), nem <M t="P - Q" />!
            </li>
            <li>
              <strong><M t="|k\mathbf{v}| = k|\mathbf{v}|" /> abszolútérték nélkül:</strong> negatív <M t="k" />-nál a
              hossz pozitív marad, tehát <M t="|k\mathbf{v}| = |k|\,|\mathbf{v}|" />!
            </li>
            <li>
              <strong><M t="|\mathbf{u}+\mathbf{v}| = |\mathbf{u}|+|\mathbf{v}|" /> tévhit:</strong> ez csak akkor igaz,
              ha azonos irányúak; általában <M t="|\mathbf{u}+\mathbf{v}| \le |\mathbf{u}|+|\mathbf{v}|" />!
            </li>
            <li>
              <strong>Nullvektor normálása:</strong> <M t="\mathbf{0}" />-nak nincs iránya és nem osztható{' '}
              <M t="|\mathbf{0}| = 0" />-val!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Ha <M t="\mathbf{v} = \langle -3, 0, 4 \rangle" />, mennyi <M t="|-2\mathbf{v}|" />?</>}
          options={[
            { label: <M t="-10" /> },
            { label: <M t="10" />, ok: true },
            { label: <M t="20" /> },
            { label: <M t="5" /> },
          ]}
          explain={
            <>
              <M t="|\mathbf{v}| = \sqrt{(-3)^2 + 0^2 + 4^2} = 5" />, és <M t="|-2\mathbf{v}| = |-2|\cdot 5 = 10" />.
            </>
          }
        />

        <Task n={13} q={<>Igaz-e, hogy <M t="|\mathbf{u} - \mathbf{v}| = |\mathbf{v} - \mathbf{u}|" /> minden vektorra?</>}>
          <p>
            Igen! Mivel <M t="\mathbf{v} - \mathbf{u} = -(\mathbf{u} - \mathbf{v})" />, a két vektor ellentettje
            egymásnak, hosszuk pontosan egyenlő!
          </p>
        </Task>

        <Task n={14} q={<>Ha egy vektor komponensei <M t="\langle a, a, a \rangle" /> (<M t="a > 0" />), mi az irányegységvektora?</>}>
          <p>
            Hossza <M t="\sqrt{3a^2} = a\sqrt{3}" />, így az egységvektor{' '}
            <M t="\left\langle \frac{1}{\sqrt{3}},\; \frac{1}{\sqrt{3}},\; \frac{1}{\sqrt{3}} \right\rangle" />{' '}
            (független <M t="a" />-tól!).
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

        <Task n={15} q={<>Add meg a <M t="P(3;\,-1;\,0)" /> és <M t="Q(1;\,5;\,-3)" /> pontok közötti <M t="\overrightarrow{PQ}" /> vektort és hosszát!</>}>
          <p>
            <M t="\overrightarrow{PQ} = \langle -2, 6, -3 \rangle" />, hossza <M t="\sqrt{4 + 36 + 9} = 7" />.
          </p>
        </Task>

        <Task n={16} q={<>Legyen <M t="\mathbf{a} = 2\mathbf{i} - \mathbf{j} + 3\mathbf{k}" /> és <M t="\mathbf{b} = -\mathbf{i} + 4\mathbf{j} - \mathbf{k}" />. Számítsd ki <M t="\mathbf{a} + 2\mathbf{b}" />-t!</>}>
          <p>
            <M t="\mathbf{a} + 2\mathbf{b} = (2-2)\mathbf{i} + (-1+8)\mathbf{j} + (3-2)\mathbf{k} = 7\mathbf{j} + \mathbf{k}" />.
          </p>
        </Task>

        <Task n={17} q={<>Add meg a <M t="\mathbf{v} = \langle 0, -5, 12 \rangle" /> irányú egységvektort!</>}>
          <p>
            <M t="|\mathbf{v}| = \sqrt{25 + 144} = 13" />, így <M t="\mathbf{u} = \left\langle 0, -\frac{5}{13}, \frac{12}{13} \right\rangle" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Keress egy <M t="14" /> egység hosszú vektort, amely <em>ellentétes</em> irányú a <M t="\overrightarrow{AB}" /> vektorral, ha <M t="A(1;\,2;\,3)" /> és <M t="B(3;\,-1;\,9)" />!</>}>
          <p>
            <M t="\overrightarrow{AB} = \langle 2, -3, 6 \rangle" />, hossza <M t="\sqrt{4 + 9 + 36} = 7" />. Ellentétes
            irányú, 14 hosszú vektor: <M t="-2\overrightarrow{AB} = \langle -4, 6, -12 \rangle" />.
          </p>
        </Task>

        <Task n={19} q={<>Egy paralelogramma három csúcsa <M t="A(1;\,1;\,1)" />, <M t="B(3;\,4;\,2)" /> és <M t="C(5;\,2;\,6)" />. Hol lehet a negyedik <M t="D" /> csúcs, ha <M t="AB" /> és <M t="AC" /> két oldala?</>}>
          <p>
            <M t="\overrightarrow{OD} = \overrightarrow{OA} + \overrightarrow{AB} + \overrightarrow{AC} = (1;\,1;\,1) + \langle 2,3,1 \rangle + \langle 4,1,5 \rangle = (7;\,5;\,7)" />.
          </p>
        </Task>

        <Task n={20} q={<>Milyen <M t="t" /> valós számra lesz a <M t="\mathbf{v} = \langle t, 2t, -2t \rangle" /> vektor hossza pontosan <M t="9" />?</>}>
          <p>
            <M t="|\mathbf{v}| = \sqrt{t^2 + 4t^2 + 4t^2} = \sqrt{9t^2} = 3|t| = 9 \implies |t| = 3 \implies t = \pm 3" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Igazold vektorokkal, hogy bármely háromszög két oldalának felezőpontját összekötő középvonal párhuzamos a harmadik oldallal, és fele olyan hosszú!</>}>
          <p>
            Legyen <M t="A" /> az origó, a másik két csúcs helyvektora <M t="\mathbf{b}" /> és <M t="\mathbf{c}" />.
            Az <M t="AB" /> és <M t="AC" /> felezőpontjai <M t="\frac{1}{2}\mathbf{b}" /> és{' '}
            <M t="\frac{1}{2}\mathbf{c}" />. Az őket összekötő vektor:{' '}
            <M t="\frac{1}{2}\mathbf{c} - \frac{1}{2}\mathbf{b} = \frac{1}{2}(\mathbf{c} - \mathbf{b}) = \frac{1}{2}\overrightarrow{BC}" /> —
            pontosan párhuzamos <M t="\overrightarrow{BC}" />-vel és fele olyan hosszú!
          </p>
        </Task>

        <Task n={22} q={<>Egy <M t="200\text{ N}" /> súlyú testet két kötél tart: a bal kötél <M t="60^\circ" />-os, a jobb kötél <M t="30^\circ" />-os szöget zár be a vízszintes plafonnal. Számítsd ki pontosan <M t="|T_1|" />-et és <M t="|T_2|" />-t!</>}>
          <p>
            <M t="T_1 \cos 60^\circ = T_2 \cos 30^\circ \implies \frac{1}{2}T_1 = \frac{\sqrt{3}}{2}T_2 \implies T_1 = \sqrt{3}T_2" />.
            Függőleges egyensúly: <M t="T_1 \sin 60^\circ + T_2 \sin 30^\circ = 200 \implies \frac{3}{2}T_2 + \frac{1}{2}T_2 = 200 \implies 2T_2 = 200" />.
            Így <M t="T_2 = 100\text{ N}" /> és <M t="T_1 = 100\sqrt{3} \approx 173{,}2\text{ N}" />!
          </p>
        </Task>

        <Task n={23} q={<>Igazold, hogy egy <M t="\mathbb{R}^3" />-beli <M t="\mathbf{u}" /> egységvektor koordinátái a tengelyekkel bezárt iránykoszinuszok (<M t="\cos\alpha, \cos\beta, \cos\gamma" />), és <M t="\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1" />!</>}>
          <p>
            Az <M t="\mathbf{u} = \langle u_1, u_2, u_3 \rangle" /> egységvektor <M t="x" />-tengelyre vett vetülete{' '}
            <M t="u_1 = |\mathbf{u}|\cos\alpha = \cos\alpha" /> (és hasonlóan <M t="u_2 = \cos\beta" />,{' '}
            <M t="u_3 = \cos\gamma" />). Mivel <M t="|\mathbf{u}|^2 = 1" />, azonnal adódik:{' '}
            <M t="\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1" />!
          </p>
        </Task>
      </>
    ),
  },
];
