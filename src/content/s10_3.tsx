import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AxesRotationDiagram,
  CordicRotationDiagram,
  CrossTermEliminatorWidget,
  DegenerateConicsDiagram,
  DiscriminantExplorerWidget,
  HyperbolaRotationWidget,
  MixedTermEffectWidget,
  RotationSummaryDiagram,
} from '../components/Widgets103';
import type { Page } from './s1_1';

export const S10_3: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Az általános másodfokú egyenlet és a vegyes xy tag',
    body: (
      <>
        <Story>
          <p>
            Az 10.1-es szakaszban csak olyan kúpszeleteket vizsgáltunk, amelyek tengelyei párhuzamosak voltak az{' '}
            <M t="x" />- és <M t="y" />-tengelyekkel. A természetben azonban egy bolygópálya vagy egy tükör tengelye
            ritkán igazodik a mi koordinátahálónkhoz! Ha egy kúpszelet „ferdén áll”, akkor az egyenletében megjelenik
            egy <strong>vegyes <M t="Bxy" /> tag</strong>.
          </p>
        </Story>

        <Def title="Általános másodfokú egyenlet két változóban">
          <M block t="Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0," />
          <p>
            ahol <M t="A, B, C" /> közül legalább az egyik nem nulla. Ha <M t="B \neq 0" />, akkor a kúpszelet
            szimmetriatengelyei szöget zárnak be a koordinátatengelyekkel.
          </p>
        </Def>

        <MixedTermEffectWidget />

        <p>
          A legegyszerűbb ferde kúpszelet az iskolából jól ismert <M t="y = \tfrac{1}{x}" /> hiperbola, amelyet{' '}
          <M t="xy - 1 = 0" /> alakban is írhatunk (<M t="A = 0, B = 1, C = 0" />). Tengelyei az <M t="y = x" /> és{' '}
          <M t="y = -x" /> egyenesek, amelyek <M t="45^\circ" />-os szöget zárnak be a tengelyekkel.
        </p>

        <Quiz
          q={<>Melyik egyenlet ír le olyan kúpszeletet, amelynek tengelyei NEM párhuzamosak a koordinátatengelyekkel?</>}
          options={[
            { label: <M t="4x^2 + 9y^2 - 16x + 18y = 11" /> },
            { label: <M t="x^2 - 4y^2 + 6x = 0" /> },
            { label: <M t="2x^2 + 3xy + 2y^2 = 7" />, ok: true },
            { label: <M t="y^2 - 8x + 4y = 12" /> },
          ]}
          explain={
            <>
              Csak a harmadik egyenletben szerepel nem nulla vegyes tag (<M t="B = 3 \neq 0" />), ezért ennek tengelyei
              elforgatottak. A többi három teljes négyzetté alakítással eltolt, tengelypárhuzamos kúpszelet.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Miért nem jelenik meg vegyes <M t="Bxy" /> tag egyetlen kör egyenletében sem?</>}>
          <p>
            A kör minden átmérője szimmetriatengely, tehát bármilyen szögű elforgatás változatlanul hagyja. Normálalakja{' '}
            <M t="(x-h)^2 + (y-k)^2 = r^2" />, amelyet kifejtve mindig <M t="A = C = 1" /> és <M t="B = 0" />.
          </p>
        </Task>
        <Task n={2} q={<>Melyik egyenesek az <M t="xy = 4" /> hiperbola szimmetriatengelyei és aszimptotái?</>}>
          <p>
            Aszimptotái az <M t="x" />- és az <M t="y" />-tengely, szimmetriatengelyei pedig az <M t="y = x" /> (valós
            tengely, ezen vannak a <M t="(\pm 2;\,\pm 2)" /> csúcsok) és az <M t="y = -x" /> egyenesek.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A koordinátatengelyek elforgatása',
    body: (
      <>
        <p>
          Hogyan tüntetjük el a kellemetlen <M t="Bxy" /> tagot? Nem a görbét mozgatjuk, hanem a{' '}
          <strong>koordinátatengelyeket forgatjuk el</strong> az origó körül az óramutató járásával ellentétes irányba{' '}
          <M t="\alpha" /> szöggel, hogy az új <M t="x'" />- és <M t="y'" />-tengelyek párhuzamosak legyenek a kúpszelet
          tengelyeivel!
        </p>

        <Def title="Forgatási egyenletek (régi és új koordináták kapcsolata)">
          <p>
            Ha az <M t="x, y" /> tengelyeket <M t="\alpha" /> szöggel elforgatjuk pozitív (óramutatóval ellentétes)
            irányba, akkor egy <M t="P" /> pont régi <M t="(x;\,y)" /> és új <M t="(x';\,y')" /> koordinátái között:
          </p>
          <M block t="\begin{cases} x = x'\cos\alpha - y'\sin\alpha, \\ y = x'\sin\alpha + y'\cos\alpha, \end{cases} \qquad\Longleftrightarrow\qquad \begin{cases} x' = x\cos\alpha + y\sin\alpha, \\ y' = -x\sin\alpha + y\cos\alpha. \end{cases}" />
        </Def>

        <p>
          <em>Levezetés:</em> Legyen <M t="r = OP" />, és zárjon be az <M t="OP" /> szakasz <M t="\theta" /> szöget az új{' '}
          <M t="x'" />-tengellyel. Ekkor <M t="x' = r\cos\theta" /> és <M t="y' = r\sin\theta" />. A régi{' '}
          <M t="x" />-tengellyel bezárt szög <M t="\theta + \alpha" />, ezért a szögösszeg-képletekkel:
        </p>
        <M block t="x = r\cos(\theta+\alpha) = (r\cos\theta)\cos\alpha - (r\sin\theta)\sin\alpha = x'\cos\alpha - y'\sin\alpha," />
        <M block t="y = r\sin(\theta+\alpha) = (r\cos\theta)\sin\alpha + (r\sin\theta)\cos\alpha = x'\sin\alpha + y'\cos\alpha." />

        <AxesRotationDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Mi a <M t="P(2;\,0)" /> pont új <M t="(x';\,y')" /> koordinátája, ha a tengelyeket <M t="\alpha = 60^\circ" />-kal forgatjuk el?</>}>
          <p>
            Az inverz képlettel: <M t="x' = 2\cos 60^\circ + 0\cdot\sin 60^\circ = 1" />,{' '}
            <M t="y' = -2\sin 60^\circ + 0\cdot\cos 60^\circ = -\sqrt{3}" />. Ellenőrzés: a távolság az origótól{' '}
            <M t="\sqrt{1^2 + (-\sqrt{3})^2} = 2" />, változatlan!
          </p>
        </Task>
        <Task n={4} q={<>Mutasd meg, hogy a forgatás megőrzi az origótól mért távolságot, vagyis <M t="x^2 + y^2 = x'^2 + y'^2" />!</>}>
          <p>
            Behelyettesítve:
            <M block t="x^2 + y^2 = (x'\cos\alpha - y'\sin\alpha)^2 + (x'\sin\alpha + y'\cos\alpha)^2 = x'^2(\cos^2\alpha + \sin^2\alpha) + y'^2(\sin^2\alpha + \cos^2\alpha) = x'^2 + y'^2," />
            mert a <M t="-2x'y'\sin\alpha\cos\alpha" /> és <M t="+2x'y'\sin\alpha\cos\alpha" /> vegyes tagok kiejtik egymást!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Példa: a 2xy = 8 hiperbola és az új együtthatók',
    body: (
      <>
        <p>
          Próbáljuk ki a forgatási képleteket a <M t="2xy = 8" /> hiperbolán! Forgassuk el a tengelyeket{' '}
          <M t="\alpha = \tfrac{\pi}{4}" /> (<M t="45^\circ" />) szöggel. Mivel{' '}
          <M t="\cos\tfrac{\pi}{4} = \sin\tfrac{\pi}{4} = \tfrac{1}{\sqrt{2}}" />:
        </p>
        <M block t="x = \frac{x' - y'}{\sqrt{2}}, \qquad y = \frac{x' + y'}{\sqrt{2}}." />
        <p>
          Behelyettesítve a <M t="2xy = 8" /> egyenletbe:
        </p>
        <M block t="2\cdot\frac{x'-y'}{\sqrt{2}}\cdot\frac{x'+y'}{\sqrt{2}} = 8 \ \Longrightarrow\ x'^2 - y'^2 = 8 \ \Longrightarrow\ \frac{x'^2}{8} - \frac{y'^2}{8} = 1." />
        <p>
          A vegyes tag nyomtalanul eltűnt, és azonnal leolvasható, hogy egyenlő szárú hiperboláról van szó (<M t="a=b=2\sqrt{2}" />,
          excentricitás <M t="e=\sqrt{2}" />)!
        </p>

        <HyperbolaRotationWidget />

        <Def title="Az általános egyenlet új együtthatói α szögű forgatás után">
          <p>
            Az <M t="Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0" /> egyenletbe behelyettesítve a forgatási képleteket az{' '}
            <M t="A'x'^2 + B'x'y' + C'y'^2 + D'x' + E'y' + F' = 0" /> egyenletet kapjuk, ahol:
          </p>
          <M block t="\begin{aligned} A' &= A\cos^2\alpha + B\cos\alpha\sin\alpha + C\sin^2\alpha, \\ B' &= B\cos 2\alpha + (C - A)\sin 2\alpha, \\ C' &= A\sin^2\alpha - B\sin\alpha\cos\alpha + C\cos^2\alpha, \\ D' &= D\cos\alpha + E\sin\alpha, \qquad E' = -D\sin\alpha + E\cos\alpha, \qquad F' = F. \end{aligned}" />
        </Def>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Add meg a <M t="2xy = 8" /> hiperbola csúcsainak és fókuszainak koordinátáit az eredeti <M t="(x;\,y)" /> rendszerben!</>}>
          <p>
            Az új rendszerben <M t="a = 2\sqrt{2}" />, így a csúcsok <M t="(x';\,y') = (\pm 2\sqrt{2};\,0)" />, a
            fókuszok <M t="c = \sqrt{8+8} = 4" /> miatt <M t="(\pm 4;\,0)" />. Visszatérve a régi rendszerbe (
            <M t="\alpha = 45^\circ" />): a csúcsok <M t="(2;\,2)" /> és <M t="(-2;\,-2)" />, a fókuszok pedig{' '}
            <M t="(2\sqrt{2};\,2\sqrt{2})" /> és <M t="(-2\sqrt{2};\,-2\sqrt{2})" />!
          </p>
        </Task>
        <Task n={6} q={<>Add össze az <M t="A'" /> és <M t="C'" /> fenti képleteit! Mit veszel észre?</>}>
          <p>
            <M t="A' + C' = A(\cos^2\alpha + \sin^2\alpha) + C(\sin^2\alpha + \cos^2\alpha) = A + C" />. A{' '}
            <M t="B\cos\alpha\sin\alpha" /> tagok kiejtik egymást, tehát <M t="A + C" /> (a kvadratikus rész nyoma){' '}
            <strong>forgatási invariáns</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'A vegyes tag eltüntetése: a forgatási szög képlete',
    body: (
      <>
        <p>
          Az új vegyes tag együtthatója <M t="B' = B\cos 2\alpha + (C - A)\sin 2\alpha" />. Ahhoz, hogy eltűnjön (
          <M t="B' = 0" />), egyszerűen megoldjuk ezt az egyenletet <M t="\alpha" />-ra:
        </p>

        <Def title="A vegyes tagot eltüntető forgatási szög">
          <p>
            Ha <M t="B \neq 0" />, akkor <M t="B' = 0" /> pontosan akkor teljesül, ha:
          </p>
          <M block t="\cot 2\alpha = \frac{A - C}{B} \qquad \left(\text{illetve } \tan 2\alpha = \frac{B}{A - C}, \text{ ha } A \neq C\right)." />
          <p>
            Speciálisan, ha <M t="A = C" />, akkor <M t="\cot 2\alpha = 0" />, így választhatjuk a{' '}
            <M t="2\alpha = \tfrac{\pi}{2} \Rightarrow \alpha = \tfrac{\pi}{4}" /> (<M t="45^\circ" />) szöget!
            Általában mindig választhatunk hegyesszöget: <M t="0 < \alpha < \tfrac{\pi}{2}" /> (azaz{' '}
            <M t="0 < 2\alpha < \pi" />).
          </p>
        </Def>

        <CrossTermEliminatorWidget />

        <Steps
          title="Elforgatott ellipszis normálalakra hozása"
          problem={
            <>
              Tüntessük el a vegyes tagot a <M t="7x^2 - 6\sqrt{3}\,xy + 13y^2 = 16" /> egyenletből, és azonosítsuk a
              görbét!
            </>
          }
          steps={[
            {
              title: 'A, B, C leolvasása és a szög kiszámítása',
              body: (
                <>
                  <M t="A = 7" />, <M t="B = -6\sqrt{3}" />, <M t="C = 13" />. Így{' '}
                  <M t="\cot 2\alpha = \dfrac{7 - 13}{-6\sqrt{3}} = \dfrac{-6}{-6\sqrt{3}} = \dfrac{1}{\sqrt{3}}" />.
                  Ebből <M t="2\alpha = 60^\circ" />, tehát <M t="\alpha = 30^\circ" /> (<M t="\tfrac{\pi}{6}" />).
                </>
              ),
            },
            {
              title: 'sin α és cos α felírása',
              body: (
                <>
                  <M t="\cos 30^\circ = \dfrac{\sqrt{3}}{2}" />, <M t="\sin 30^\circ = \dfrac{1}{2}" />.
                </>
              ),
            },
            {
              title: 'Az új A′ és C′ együtthatók kiszámítása',
              body: (
                <>
                  <M block t="A' = 7\cdot\frac{3}{4} - 6\sqrt{3}\cdot\frac{\sqrt{3}}{4} + 13\cdot\frac{1}{4} = \frac{21 - 18 + 13}{4} = 4," />
                  <M block t="C' = 7\cdot\frac{1}{4} + 6\sqrt{3}\cdot\frac{\sqrt{3}}{4} + 13\cdot\frac{3}{4} = \frac{7 + 18 + 39}{4} = 16." />
                  (Gyors ellenőrzés: <M t="A' + C' = 4 + 16 = 20 = 7 + 13 = A + C" />!)
                </>
              ),
            },
            {
              title: 'Normálalak és azonosítás',
              body: (
                <>
                  Az új egyenlet <M t="4x'^2 + 16y'^2 = 16" />, vagyis <M t="\dfrac{x'^2}{4} + \dfrac{y'^2}{1} = 1" />.
                  Ez egy <M t="30^\circ" />-kal elforgatott <strong>ellipszis</strong> (<M t="a = 2, b = 1" />)!
                </>
              ),
            },
          ]}
        />

        <p>
          <em>Hasznos trükk, ha <M t="2\alpha" /> nem nevezetes szög:</em> Ha például <M t="\cot 2\alpha = \tfrac{3}{4}" />,
          egy <M t="(3, 4, 5)" /> derékszögű háromszögből leolvasható <M t="\cos 2\alpha = \tfrac{3}{5}" />, majd a
          félszög-képletekkel pontosan megkapható:
        </p>
        <M block t="\cos\alpha = \sqrt{\frac{1 + \cos 2\alpha}{2}}, \qquad \sin\alpha = \sqrt{\frac{1 - \cos 2\alpha}{2}} \qquad (0 < \alpha < 90^\circ)." />

        <Quiz
          q={<>Mekkora hegyesszöggel kell elforgatni a tengelyeket a <M t="4x^2 + 5xy + 4y^2 = 9" /> egyenlet egyszerűsítéséhez?</>}
          options={[
            { label: <M t="\alpha = 30^\circ" /> },
            { label: <M t="\alpha = 45^\circ" />, ok: true },
            { label: <M t="\alpha = 60^\circ" /> },
            { label: <M t="\alpha = 15^\circ" /> },
          ]}
          explain={
            <>
              Mivel <M t="A = C = 4" />, <M t="\cot 2\alpha = \dfrac{4 - 4}{5} = 0" />, amiből <M t="2\alpha = 90^\circ" />,
              tehát <M t="\alpha = 45^\circ" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Határozd meg a forgatási szöget az <M t="x^2 + \sqrt{3}\,xy + 2y^2 = 5" /> egyenlethez!</>}>
          <p>
            <M t="A = 1, B = \sqrt{3}, C = 2" />, tehát <M t="\cot 2\alpha = \dfrac{1 - 2}{\sqrt{3}} = -\dfrac{1}{\sqrt{3}}" />.
            A <M t="(0^\circ;\,180^\circ)" /> tartományban <M t="2\alpha = 120^\circ" />, innen{' '}
            <M t="\alpha = 60^\circ" /> (<M t="\tfrac{\pi}{3}" />).
          </p>
        </Task>
        <Task n={8} q={<>Ha <M t="\cot 2\alpha = \tfrac{3}{4}" /> (<M t="0 < 2\alpha < 90^\circ" />), számítsd ki <M t="\cos\alpha" /> és <M t="\sin\alpha" /> pontos értékét!</>}>
          <p>
            <M t="\cos 2\alpha = \dfrac{3}{\sqrt{3^2+4^2}} = \dfrac{3}{5}" />. A félszög-képletekkel:{' '}
            <M t="\cos\alpha = \sqrt{\tfrac{1 + 3/5}{2}} = \sqrt{\tfrac{4}{5}} = \dfrac{2}{\sqrt{5}}" /> és{' '}
            <M t="\sin\alpha = \sqrt{\tfrac{1 - 3/5}{2}} = \sqrt{\tfrac{1}{5}} = \dfrac{1}{\sqrt{5}}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A diszkrimináns-teszt és a forgatási invariánsok',
    body: (
      <>
        <p>
          Mi van, ha nem akarjuk elvégezni a teljes forgatást, csak gyorsan el akarjuk dönteni, hogy egy bonyolult
          másodfokú egyenlet ellipszist, parabolát vagy hiperbolát ír-e le? Erre szolgál a <strong>diszkrimináns</strong>!
        </p>

        <Def title="A diszkrimináns invarianciája és a típusvizsgálat">
          <p>
            Az <M t="Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0" /> egyenlet bármely <M t="\alpha" /> szögű forgatása során a
            következő két mennyiség <strong>változatlan (invariáns)</strong> marad:
          </p>
          <M block t="A' + C' = A + C \qquad \text{és} \qquad B'^2 - 4A'C' = B^2 - 4AC." />
          <p>
            Ha az elforgatással <M t="B' = 0" />, akkor <M t="B^2 - 4AC = -4A'C'" />. Így az elfajult eseteket is
            megengedve a görbe:
          </p>
          <ul>
            <li><strong>ellipszis</strong> (vagy kör, pont, üres halmaz), ha <M t="B^2 - 4AC < 0" /> (<M t="A'C' > 0" />);</li>
            <li><strong>parabola</strong> (vagy párhuzamos egyenesek / egy egyenes), ha <M t="B^2 - 4AC = 0" /> (<M t="A'C' = 0" />);</li>
            <li><strong>hiperbola</strong> (vagy két metsző egyenes), ha <M t="B^2 - 4AC > 0" /> (<M t="A'C' < 0" />).</li>
          </ul>
        </Def>

        <DiscriminantExplorerWidget />

        <h3>Három gyors példa</h3>
        <ul>
          <li>
            <M t="4x^2 - 12xy + 9y^2 + x - 5y = 2" />: <M t="\Delta = (-12)^2 - 4\cdot 4\cdot 9 = 144 - 144 = 0" />{' '}
            <M t="\Rightarrow" /> <strong>parabola</strong> (figyeld meg: a kvadratikus rész teljes négyzet:{' '}
            <M t="(2x - 3y)^2" />!).
          </li>
          <li>
            <M t="2x^2 + 3xy + 4y^2 - 7 = 0" />: <M t="\Delta = 3^2 - 4\cdot 2\cdot 4 = 9 - 32 = -23 < 0" />{' '}
            <M t="\Rightarrow" /> <strong>ellipszis</strong>.
          </li>
          <li>
            <M t="xy - 3y^2 + 2x - 1 = 0" />: <M t="A = 0, B = 1, C = -3 \Rightarrow \Delta = 1^2 - 4\cdot 0\cdot(-3) = 1 > 0" />{' '}
            <M t="\Rightarrow" /> <strong>hiperbola</strong>.
          </li>
        </ul>

        <Quiz
          q={<>Milyen kúpszelet-típusba tartozik az <M t="x^2 + 4xy + 4y^2 - 6x + 2y = 5" /> egyenlet?</>}
          options={[
            { label: 'Ellipszis' },
            { label: 'Parabola', ok: true },
            { label: 'Hiperbola' },
            { label: 'Kör' },
          ]}
          explain={
            <>
              <M t="A = 1, B = 4, C = 4" />, így <M t="\Delta = B^2 - 4AC = 16 - 16 = 0" /> (a főrész{' '}
              <M t="(x+2y)^2" />), tehát <strong>parabola</strong>.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Milyen <M t="k" /> valós számokra ír le ellipszist (vagy elfajult ellipszist) az <M t="x^2 + kxy + 9y^2 = 1" /> egyenlet?</>}>
          <p>
            <M t="\Delta = k^2 - 4\cdot 1\cdot 9 = k^2 - 36 < 0 \Longleftrightarrow |k| < 6" />, azaz <M t="k \in (-6;\,6)" />.
          </p>
        </Task>
        <Task n={10} q={<>Ha egy egyenletben <M t="A = 0" /> és <M t="B \neq 0" /> (mint pl. <M t="2xy + 5y^2 = 3" />), milyen kúpszelet lehet belőle?</>}>
          <p>
            <M t="\Delta = B^2 - 4\cdot 0\cdot C = B^2 > 0" />, tehát <strong>mindig hiperbola</strong> (vagy metsző
            egyenespár)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Elfajult görbék és a forgatás szerepe a számológépekben',
    body: (
      <>
        <p>
          A diszkrimináns-tesztet érdemes pontosan érteni: a <M t="B^2 - 4AC" /> csak a <strong>kvadratikus főrész</strong>{' '}
          alapján osztályoz, a konstans <M t="F" /> és a lineáris <M t="Dx, Ey" /> tagok pedig eldönthetik, hogy valódi
          görbét kapunk-e, vagy <strong>elfajult</strong> (degenerált) alakzatot.
        </p>

        <DegenerateConicsDiagram />

        <p>
          A forgatási mátrixnak nemcsak a kúpszeletek elméletében van szerepe: a zsebszámológépek és beágyazott
          processzorok évtizedek óta (az ún. <strong>CORDIC-algoritmusban</strong>) apró szögek egymás utáni
          forgatásával számítják ki a <M t="\sin\theta" /> és <M t="\cos\theta" /> értékeket! Mindössze néhány előre
          tárolt szög (<M t="\alpha_k = \arctan(2^{-k})" />) kell hozzá, és az <M t="(1;\,0)" /> vektor lépésenkénti
          elforgatása tetszőleges pontossággal megadja a koszinuszt és a szinuszt.
        </p>

        <CordicRotationDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Mit ábrázol az <M t="x^2 - 2xy + y^2 - 9 = 0" /> egyenlet? Mit mond rá a diszkrimináns?</>}>
          <p>
            <M t="\Delta = (-2)^2 - 4\cdot 1\cdot 1 = 0" /> (parabola-család). Teljes négyzetté írva{' '}
            <M t="(x - y)^2 = 9 \Longleftrightarrow x - y = \pm 3" />, ami <strong>két párhuzamos egyenes</strong> (a
            parabola elfajult esete)!
          </p>
        </Task>
        <Task n={12} q={<>Mit ábrázol az <M t="x^2 - 4xy + 3y^2 = 0" /> egyenlet?</>}>
          <p>
            <M t="\Delta = 16 - 12 = 4 > 0" /> (hiperbola-család). Szorzattá alakítva{' '}
            <M t="(x - y)(x - 3y) = 0" />, vagyis <strong>két origón átmenő metsző egyenes</strong> (<M t="y = x" /> és{' '}
            <M t="y = \tfrac{1}{3}x" />)!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló és tipikus hibák',
    body: (
      <>
        <RotationSummaryDiagram />

        <h3>A szakasz kulcsképletei</h3>
        <table className="tbl">
          <thead>
            <tr><th>Téma</th><th>Képlet</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Forgatás (régi → új behelyettesítéshez)</strong></td>
              <td><M t="x = x'\cos\alpha - y'\sin\alpha,\quad y = x'\sin\alpha + y'\cos\alpha" /></td>
            </tr>
            <tr>
              <td><strong>Inverz forgatás (pont átszámításához)</strong></td>
              <td><M t="x' = x\cos\alpha + y\sin\alpha,\quad y' = -x\sin\alpha + y\cos\alpha" /></td>
            </tr>
            <tr>
              <td><strong>Vegyes tag eltüntetése</strong></td>
              <td><M t="\cot 2\alpha = \dfrac{A - C}{B}" /> (ha <M t="A = C" />, akkor <M t="\alpha = 45^\circ" />)</td>
            </tr>
            <tr>
              <td><strong>Invariánsok</strong></td>
              <td><M t="A' + C' = A + C" />, <M t="B'^2 - 4A'C' = B^2 - 4AC" /></td>
            </tr>
            <tr>
              <td><strong>Diszkrimináns-teszt</strong></td>
              <td><M t="\Delta < 0" /> ellipszis, <M t="\Delta = 0" /> parabola, <M t="\Delta > 0" /> hiperbola</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. A <M t="2\alpha" /> és az <M t="\alpha" /> összekeverése:</strong> a <M t="\cot 2\alpha = \tfrac{A-C}{B}" />{' '}
          képlet a szög <em>kétszeresét</em> adja meg! Ne felejtsd el elfelezni (<M t="\alpha = \tfrac{1}{2}(2\alpha)" />)
          a behelyettesítés előtt.
        </Warn>
        <Warn>
          <strong>2. Előjelhiba a forgatási képletben:</strong> az <M t="x = x'\cos\alpha - y'\sin\alpha" /> képletben
          van a mínuszjel, az <M t="y" />-ban plusz! Ha felcseréled, az ellentétes (<M t="-\alpha" />) irányba forgatsz,
          és a vegyes tag nem tűnik el (sőt, megkétszereződhet).
        </Warn>
        <Warn>
          <strong>3. A <M t="B" /> és <M t="C" /> szerepének felcserélése a diszkriminánsban:</strong> mindig{' '}
          <M t="B" /> az <M t="xy" /> együtthatója, <M t="A" /> az <M t="x^2" />-é és <M t="C" /> az <M t="y^2" />-é.
          Ha hiányzik egy tag (pl. <M t="xy + y^2 = 1" />), akkor a hiányzó együttható <M t="0" /> (<M t="A = 0" />).
        </Warn>
        <Warn>
          <strong>4. Invariáns-ellenőrzés elmulasztása:</strong> a forgatás sok számolással jár — 5 másodperc alatt
          ellenőrizheted a munkádat: ha <M t="A' + C' \neq A + C" /> vagy <M t="-4A'C' \neq B^2 - 4AC" />, biztosan
          számolási hiba van valahol!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Egy forgatás után valaki <M t="A' = 5, C' = 2" /> értéket kapott a <M t="4x^2 + 2xy + 4y^2 = 1" /> egyenletből. Miért biztos, hogy elszámolta?</>}>
          <p>
            Az invariáns miatt <M t="A' + C'" /> értékének meg kell egyeznie <M t="A + C = 4 + 4 = 8" />-cal, de{' '}
            <M t="5 + 2 = 7 \neq 8" />! (A helyes értékek <M t="A' = 5, C' = 3" />.)
          </p>
        </Task>
        <Task n={14} q={<>Mennyi az <M t="x^2 + 2xy + y^2 - 4x + 4y = 0" /> egyenlet diszkriminánsa, és mekkora <M t="\alpha" /> tünteti el a vegyes tagot?</>}>
          <p>
            <M t="\Delta = 2^2 - 4\cdot 1\cdot 1 = 0" /> (parabola). Mivel <M t="A = C = 1" />,{' '}
            <M t="\cot 2\alpha = 0 \Rightarrow \alpha = 45^\circ" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorló feladatok',
    body: (
      <>
        <p>Próbáld meg előbb önállóan megoldani, a megoldást csak utána nyisd ki.</p>

        <h3>Könnyű</h3>

        <Task n={15} q={<>Döntsd el a diszkriminánssal, milyen kúpszelet: (a) <M t="3x^2 - 4xy + 2y^2 = 5" />, (b) <M t="x^2 - 6xy + 9y^2 + 2x = 0" />, (c) <M t="2x^2 + 5xy - y^2 = 4" />!</>}>
          <ul>
            <li>(a) <M t="\Delta = 16 - 24 = -8 < 0" /> <M t="\Rightarrow" /> <strong>ellipszis</strong>.</li>
            <li>(b) <M t="\Delta = 36 - 36 = 0" /> <M t="\Rightarrow" /> <strong>parabola</strong>.</li>
            <li>(c) <M t="\Delta = 25 - 4(2)(-1) = 33 > 0" /> <M t="\Rightarrow" /> <strong>hiperbola</strong>.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Határozd meg a <M t="B'" /> eltüntetéséhez szükséges <M t="\alpha \in (0^\circ;\,90^\circ)" /> forgatási szöget a <M t="3x^2 + 2\sqrt{3}\,xy + y^2 = 12" /> egyenlethez!</>}>
          <p>
            <M t="\cot 2\alpha = \dfrac{3 - 1}{2\sqrt{3}} = \dfrac{1}{\sqrt{3}} \Rightarrow 2\alpha = 60^\circ \Rightarrow \alpha = 30^\circ" />.
          </p>
        </Task>

        <Task n={17} q={<>Írd fel az <M t="xy = -2" /> hiperbola egyenletét a <M t="45^\circ" />-kal elforgatott <M t="(x';\,y')" /> rendszerben!</>}>
          <p>
            <M t="x = \dfrac{x'-y'}{\sqrt{2}}" />, <M t="y = \dfrac{x'+y'}{\sqrt{2}}" /> behelyettesítve:{' '}
            <M t="\dfrac{x'^2 - y'^2}{2} = -2 \Longrightarrow \dfrac{y'^2}{4} - \dfrac{x'^2}{4} = 1" /> (fókuszai az{' '}
            <M t="y'" />-tengelyen vannak).
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Forgasd el a tengelyeket úgy, hogy eltűnjön a vegyes tag az <M t="5x^2 - 6xy + 5y^2 = 8" /> egyenletből, és add meg az ellipszis féltengelyeit!</>}>
          <p>
            <M t="A = C = 5 \Rightarrow \alpha = 45^\circ" />, <M t="\cos\alpha = \sin\alpha = \tfrac{1}{\sqrt{2}}" />.
            Az új együtthatók: <M t="A' = 5\cdot\tfrac{1}{2} - 6\cdot\tfrac{1}{2} + 5\cdot\tfrac{1}{2} = 2" />,{' '}
            <M t="C' = 5\cdot\tfrac{1}{2} + 6\cdot\tfrac{1}{2} + 5\cdot\tfrac{1}{2} = 8" />.
          </p>
          <p>
            Egyenlet: <M t="2x'^2 + 8y'^2 = 8 \Rightarrow \dfrac{x'^2}{4} + \dfrac{y'^2}{1} = 1" />. Féltengelyek:{' '}
            <M t="a = 2" /> és <M t="b = 1" /> (ellenőrzés: <M t="A'+C' = 10 = A+C" />).
          </p>
        </Task>

        <Task n={19} q={<>Egyszerűsítsd forgatással az <M t="x^2 + 2xy + y^2 - 4\sqrt{2}\,x + 4\sqrt{2}\,y = 0" /> parabolát!</>}>
          <p>
            <M t="A = C = 1 \Rightarrow \alpha = 45^\circ" />. Behelyettesítve{' '}
            <M t="x = \tfrac{x'-y'}{\sqrt{2}}" />, <M t="y = \tfrac{x'+y'}{\sqrt{2}}" />:
            <M block t="x + y = \sqrt{2}\,x', \qquad -x + y = \sqrt{2}\,y'." />
            Mivel <M t="x^2 + 2xy + y^2 = (x+y)^2 = 2x'^2" /> és <M t="4\sqrt{2}(-x + y) = 8y'" />, az egyenlet:
            <M block t="2x'^2 + 8y' = 0 \ \Longrightarrow\ x'^2 = -4y'." />
            Origó csúcsú parabola, amely a negatív <M t="y'" />-irányba nyílik!
          </p>
        </Task>

        <Task n={20} q={<>Tüntesd el a vegyes tagot a <M t="2x^2 + 4xy - y^2 = 6" /> egyenletből (nem nevezetes szögű forgatás)!</>}>
          <p>
            <M t="A = 2, B = 4, C = -1 \Rightarrow \cot 2\alpha = \dfrac{3}{4}" />, így{' '}
            <M t="\cos 2\alpha = \dfrac{3}{5}" />, <M t="\cos\alpha = \dfrac{2}{\sqrt{5}}" />,{' '}
            <M t="\sin\alpha = \dfrac{1}{\sqrt{5}}" />.
          </p>
          <p>
            <M t="A' = \dfrac{2(4) + 4(2) - 1(1)}{5} = \dfrac{15}{5} = 3" />,{' '}
            <M t="C' = \dfrac{2(1) - 4(2) - 1(4)}{5} = \dfrac{-10}{5} = -2" /> (ellenőrzés: <M t="A'+C'=1=A+C" />,{' '}
            <M t="-4A'C'=24=4^2-4(2)(-1)" />!).
          </p>
          <p>
            Új egyenlet: <M t="3x'^2 - 2y'^2 = 6 \Rightarrow \dfrac{x'^2}{2} - \dfrac{y'^2}{3} = 1" /> (hiperbola).
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Igazold algebrailag a <M t="B'^2 - 4A'C' = B^2 - 4AC" /> invarianciát a félszög- és kétszeresszög-azonosságok
              segítségével!
            </>
          }
        >
          <p>
            Írjuk át <M t="A'" />-t és <M t="C'" />-t <M t="2\alpha" /> segítségével (<M t="\cos^2\alpha = \tfrac{1+\cos 2\alpha}{2}" />,{' '}
            <M t="\sin^2\alpha = \tfrac{1-\cos 2\alpha}{2}" />):
            <M block t="A' + C' = A + C, \qquad A' - C' = (A - C)\cos 2\alpha + B\sin 2\alpha." />
            Emlékezzünk, hogy <M t="B' = B\cos 2\alpha - (A - C)\sin 2\alpha" />. Emeljük négyzetre és adjuk össze{' '}
            <M t="(A' - C')^2" />-et és <M t="B'^2" />-et:
            <M block t="(A' - C')^2 + B'^2 = (A - C)^2(\cos^2 2\alpha + \sin^2 2\alpha) + B^2(\sin^2 2\alpha + \cos^2 2\alpha) = (A - C)^2 + B^2." />
            Most vonjuk ki ebből az <M t="(A' + C')^2 = (A + C)^2" /> egyenletet! Mivel{' '}
            <M t="(A' - C')^2 - (A' + C')^2 = -4A'C'" />, pontosan azt kapjuk, hogy:
            <M block t="B'^2 - 4A'C' = B^2 - 4AC." />
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Az <M t="Ax^2 + Bxy + Cy^2 = 1" /> egyenlet egy ellipszist ír le (<M t="B^2 - 4AC < 0" />, <M t="A, C > 0" />).
              Mutasd meg az invariánsokból, hogy az ellipszis területe <M t="T = \dfrac{2\pi}{\sqrt{4AC - B^2}}" /> —
              vagyis a forgatás elvégzése nélkül is kiszámítható!
            </>
          }
        >
          <p>
            Forgatás után az ellipszis egyenlete <M t="A'x'^2 + C'y'^2 = 1" />, ahol a féltengelyek{' '}
            <M t="a = \tfrac{1}{\sqrt{A'}}" /> és <M t="b = \tfrac{1}{\sqrt{C'}}" />. A terület:
            <M block t="T = \pi a b = \frac{\pi}{\sqrt{A'C'}}." />
            Mivel <M t="4A'C' = 4AC - B^2" />, innen <M t="\sqrt{A'C'} = \dfrac{\sqrt{4AC - B^2}}{2}" />, tehát{' '}
            <M t="T = \dfrac{2\pi}{\sqrt{4AC - B^2}}" />!
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Határozd meg az összes olyan <M t="m" /> valós számot, amelyre a{' '}
              <M t="2x^2 + 3xy + y^2 + 5x + 3y + m = 0" /> egyenlet két metsző egyenesre esik szét!
            </>
          }
        >
          <p>
            A kvadratikus főrész szorzattá bontható: <M t="2x^2 + 3xy + y^2 = (2x + y)(x + y)" />. Keresünk olyan{' '}
            <M t="p, q" /> számokat, amelyekre <M t="(2x + y + p)(x + y + q) = 2x^2 + 3xy + y^2 + 5x + 3y + m" />.
          </p>
          <p>
            Az <M t="x" /> és <M t="y" /> együtthatóiból: <M t="p + 2q = 5" /> és <M t="p + q = 3" />. Kivonva{' '}
            <M t="q = 2" />, innen <M t="p = 1" />. A konstans tag tehát <M t="m = pq = 1\cdot 2 = 2" />! (Ekkor az
            egyenlet <M t="(2x + y + 1)(x + y + 2) = 0" />, két metsző egyenes.)
          </p>
        </Task>
      </>
    ),
  },
];
