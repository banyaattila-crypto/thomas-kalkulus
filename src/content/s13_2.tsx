import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  AirDragCompareWidget,
  ElevatedLaunchWidget,
  InclineLaunchWidget,
  ProjectileFormulaMapDiagram,
  ProjectileLaunchWidget,
  RangeComplementaryWidget,
  TargetParabolaWidget,
  Wind3DProjectileWidget,
} from '../components/Widgets132';
import type { Page } from './s1_1';

export const S13_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Az ideális lövedék modellje (vákuumban)',
    body: (
      <>
        <Story>
          <p>
            Elrúgunk egy focilabdát, elhajítunk egy gerelyt, vagy kilövünk egy ágyúgolyót. Ha elhanyagoljuk a
            légellenállást és a Föld görbületét, az egyetlen ható erő a lefelé mutató gravitáció! A 13.1 fejezet
            vektorintegráljával két lépésben megkapjuk a teljes mozgástörvényt.
          </p>
        </Story>

        <Def title="Az ideális lövedék helyvektora">
          <p>
            Az origóból <M t="v_0" /> kezdősebességgel és a vízszinteshez képest <M t="\alpha" /> emelkedési szöggel
            indított lövedék gyorsulása <M t="\mathbf{a}(t) = -g\,\mathbf{j}" />, kezdeti sebessége{' '}
            <M t="\mathbf{v}(0) = (v_0\cos\alpha)\,\mathbf{i} + (v_0\sin\alpha)\,\mathbf{j}" />. Kétszer integrálva:
          </p>
          <M block t="\mathbf{v}(t) = (v_0\cos\alpha)\,\mathbf{i} + (v_0\sin\alpha - gt)\,\mathbf{j}," />
          <M block t="\mathbf{r}(t) = (v_0\cos\alpha)\,t\,\mathbf{i} + \Big((v_0\sin\alpha)\,t - \tfrac{1}{2}gt^2\Big)\,\mathbf{j}." />
          <p>
            <strong>Kulcsészrevétel:</strong> a vízszintes mozgás egyenletes (<M t="v_x = v_0\cos\alpha = \text{áll.}" />),
            a függőleges pedig egyenletesen gyorsuló szabadesés! A két irány teljesen független egymástól.
          </p>
        </Def>

        <ProjectileLaunchWidget />

        <Task n={1} q={<>Egy lövedéket <M t="v_0 = 40\text{ m/s}" /> sebességgel, <M t="\alpha = 30^\circ" /> szögben indítunk az origóból (<M t="g = 10\text{ m/s}^2" />). Írd fel <M t="\mathbf{r}(t)" />-t és <M t="\mathbf{v}(t)" />-t!</>}>
          <p>
            <M t="v_0\cos 30^\circ = 20\sqrt{3}" />, <M t="v_0\sin 30^\circ = 20" />. Tehát{' '}
            <M t="\mathbf{v}(t) = \langle 20\sqrt{3},\; 20 - 10t \rangle" /> és{' '}
            <M t="\mathbf{r}(t) = \langle 20\sqrt{3}\,t,\; 20t - 5t^2 \rangle" />.
          </p>
        </Task>

        <Task n={2} q={<>Hol van az 1. feladat lövedéke <M t="t = 2\text{ s}" />-nál, és mekkora ekkor a sebességnagysága?</>}>
          <p>
            <M t="\mathbf{r}(2) = \langle 40\sqrt{3},\; 40 - 20 \rangle = \langle 40\sqrt{3},\; 20 \rangle\text{ m}" />.
            Sebessége <M t="\mathbf{v}(2) = \langle 20\sqrt{3},\; 0 \rangle" />, nagysága{' '}
            <M t="20\sqrt{3} \approx 34{,}6\text{ m/s}" /> — ez épp a pálya csúcspontja!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Repülési idő, csúcsmagasság és lőtávolság',
    body: (
      <>
        <p>
          Vízszintes terepen (<M t="y_0 = 0" />) a három legfontosabb kérdés: mikor éri el a tetőpontot, milyen
          magasra jut, és milyen messze ér földet? Mindhárom egyetlen sor algebra az <M t="\mathbf{r}(t)" /> képletből!
        </p>

        <Def title="Vízszintes terep (y₀ = 0) kulcsképletei">
          <ul>
            <li>
              <strong>Csúcspont ideje</strong> (<M t="v_y = 0" />): <M t="t_{\text{cs}} = \dfrac{v_0\sin\alpha}{g}" />.
            </li>
            <li>
              <strong>Legnagyobb magasság:</strong> <M t="y_{\max} = \dfrac{(v_0\sin\alpha)^2}{2g}" />.
            </li>
            <li>
              <strong>Teljes repülési idő</strong> (<M t="y(T) = 0" />): <M t="T = \dfrac{2v_0\sin\alpha}{g} = 2t_{\text{cs}}" />.
            </li>
            <li>
              <strong>Lőtávolság (hatótáv):</strong>{' '}
              <M t="R = x(T) = \dfrac{v_0^2\sin(2\alpha)}{g}" />.
            </li>
          </ul>
          <p>
            Mivel <M t="\sin(2\alpha) \le 1" />, a maximális lőtávolság <M t="2\alpha = 90^\circ \Rightarrow \alpha = 45^\circ" />-nál
            adódik (<M t="R_{\max} = v_0^2/g" />). Továbbá <M t="\sin(2(90^\circ - \alpha)) = \sin(2\alpha)" />, ezért
            két <strong>kiegészítő szög</strong> (<M t="\alpha" /> és <M t="90^\circ - \alpha" />) pontosan ugyanarra a
            pontra talál!
          </p>
        </Def>

        <RangeComplementaryWidget />

        <Quiz
          q={<>Vízszintes síkon egy lövedéket <M t="25^\circ" />-os szögben lövünk ki. Melyik másik szög adja pontosan ugyanazt a lőtávolságot azonos <M t="v_0" /> mellett?</>}
          options={[
            { label: <M t="45^\circ" /> },
            { label: <M t="50^\circ" /> },
            { label: <M t="65^\circ" />, ok: true },
            { label: <M t="75^\circ" /> },
          ]}
          explain={
            <>
              A kiegészítő szög <M t="90^\circ - 25^\circ = 65^\circ" />, hiszen{' '}
              <M t="\sin(50^\circ) = \sin(130^\circ)" />.
            </>
          }
        />

        <Task n={3} q={<>Egy golfütéssel a labda <M t="v_0 = 30\text{ m/s}" /> sebességgel, <M t="\alpha = 45^\circ" /> szögben indul (<M t="g = 10\text{ m/s}^2" />). Számítsd ki <M t="y_{\max}" />, <M t="T" /> és <M t="R" /> értékét!</>}>
          <p>
            <M t="\sin 45^\circ = \frac{\sqrt{2}}{2}" />. Így{' '}
            <M t="y_{\max} = \frac{900 \cdot 1/2}{20} = 22{,}5\text{ m}" />,{' '}
            <M t="T = \frac{60 \cdot \sqrt{2}/2}{10} = 3\sqrt{2} \approx 4{,}24\text{ s}" />,{' '}
            <M t="R = \frac{900 \cdot \sin 90^\circ}{10} = 90\text{ m}" />.
          </p>
        </Task>

        <Task n={4} q={<>Ha <M t="v_0 = 20\text{ m/s}" /> (<M t="g = 10\text{ m/s}^2" />), milyen <M t="\alpha" /> szögekkel érhetünk el <M t="R = 20\text{ m}" /> lőtávolságot?</>}>
          <p>
            <M t="R = \frac{400\sin(2\alpha)}{10} = 40\sin(2\alpha) = 20 \Rightarrow \sin(2\alpha) = \frac{1}{2}" />.
            Így <M t="2\alpha = 30^\circ" /> vagy <M t="150^\circ" />, tehát{' '}
            <M t="\alpha_1 = 15^\circ" /> és <M t="\alpha_2 = 75^\circ" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A pálya Descartes-egyenlete és a biztonsági parabola',
    body: (
      <>
        <p>
          Ha nem az idő érdekel minket, hanem az, hogy a labda <em>átrepül-e egy fal fölött</em>, vagy{' '}
          <em>milyen szögben kell célozni egy magasabban lévő pontra</em>, kiküszöböljük a <M t="t" /> paramétert!
        </p>

        <Def title="A röppálya Descartes-egyenlete">
          <p>
            Az <M t="x = (v_0\cos\alpha)t" /> egyenletből <M t="t = \dfrac{x}{v_0\cos\alpha}" />. Ezt{' '}
            <M t="y(t)" />-be helyettesítve (és használva az <M t="\frac{1}{\cos^2\alpha} = 1 + \tan^2\alpha" />{' '}
            azonosságot):
          </p>
          <M block t="y = (\tan\alpha)\,x - \frac{g}{2v_0^2\cos^2\alpha}\,x^2 = (\tan\alpha)\,x - \frac{g(1+\tan^2\alpha)}{2v_0^2}\,x^2." />
          <p>
            Ez <M t="x" />-ben lefelé nyíló <strong>parabola</strong>, <M t="u = \tan\alpha" />-ban pedig{' '}
            <strong>másodfokú egyenlet</strong> — ezért egy elérhető <M t="(x_1; y_1)" /> célponthoz általában{' '}
            <em>két</em> kilövési szög tartozik (egy lapos és egy meredek ív). A diszkrimináns <M t="\ge 0" /> feltétele
            adja a <strong>biztonsági parabolát</strong>: <M t="y \le \frac{v_0^2}{2g} - \frac{g}{2v_0^2}x^2" />.
          </p>
        </Def>

        <TargetParabolaWidget />

        <Task n={5} q={<>Egy kosárlabdát <M t="v_0 = 10\text{ m/s}" /> sebességgel, <M t="\alpha = 45^\circ" /> szögben dobunk (<M t="g = 10\text{ m/s}^2" />). Írd fel a pálya <M t="y(x)" /> Descartes-egyenletét!</>}>
          <p>
            <M t="\tan 45^\circ = 1" />, <M t="\cos^2 45^\circ = \frac{1}{2}" />. Behelyettesítve:{' '}
            <M t="y = x - \frac{10}{2 \cdot 100 \cdot (1/2)}\,x^2 = x - 0{,}1\,x^2" />.
          </p>
        </Task>

        <Task n={6} q={<>Az 5. feladat labdája átrepül-e egy <M t="x = 4\text{ m}" /> távolságban álló, <M t="2{,}2\text{ m}" /> magas akadály fölött?</>}>
          <p>
            <M t="y(4) = 4 - 0{,}1 \cdot 16 = 2{,}4\text{ m} > 2{,}2\text{ m}" />, tehát <strong>igen</strong>,{' '}
            <M t="20\text{ cm}" /> ráhagyással átrepül fölötte!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Magasabbról indított dobás (y₀ > 0)',
    body: (
      <>
        <p>
          A valóságban ritkán dobunk pontosan a talaj szintjéről: egy súlylökő vállmagasságból, egy vízesés szikláról,
          egy teniszszerva pedig több mint 2 méter magasról indul. Ekkor <M t="\mathbf{r}(0) = y_0\,\mathbf{j}" />, így
          a függőleges egyenletben megjelenik a <M t="+y_0" /> tag:
        </p>
        <M block t="\mathbf{r}(t) = (v_0\cos\alpha)\,t\,\mathbf{i} + \Big(y_0 + (v_0\sin\alpha)\,t - \tfrac{1}{2}gt^2\Big)\,\mathbf{j}." />

        <ElevatedLaunchWidget />

        <Steps
          title="Szikláról indított lövedék teljes elemzése"
          problem={
            <>
              Egy <M t="y_0 = 40\text{ m}" /> magas szikláról <M t="v_0 = 20\text{ m/s}" /> sebességgel,{' '}
              <M t="\alpha = 30^\circ" /> szögben dobunk el egy követ (<M t="g = 10\text{ m/s}^2" />). Határozd meg a
              repülési időt, a vízszintes távolságot és a becsapódási sebességnagyságot!
            </>
          }
          steps={[
            {
              title: 'Kezdősebesség komponensei',
              body: (
                <>
                  <M t="v_{0x} = 20\cos 30^\circ = 10\sqrt{3}\text{ m/s}" />,{' '}
                  <M t="v_{0y} = 20\sin 30^\circ = 10\text{ m/s}" />.
                </>
              ),
            },
            {
              title: 'Repülési idő az y(t) = 0 egyenletből',
              body: (
                <>
                  <M t="40 + 10t - 5t^2 = 0 \;\Rightarrow\; t^2 - 2t - 8 = 0 \;\Rightarrow\; (t-4)(t+2) = 0" />. Mivel{' '}
                  <M t="t > 0" />, a repülési idő <M t="T = 4\text{ s}" />.
                </>
              ),
            },
            {
              title: 'Vízszintes lőtávolság',
              body: (
                <>
                  <M t="R = x(4) = 10\sqrt{3}\cdot 4 = 40\sqrt{3} \approx 69{,}3\text{ m}" />.
                </>
              ),
            },
            {
              title: 'Becsapódási sebességvektor és nagyság',
              body: (
                <>
                  <M t="v_x(4) = 10\sqrt{3}" />, <M t="v_y(4) = 10 - 10\cdot 4 = -30\text{ m/s}" />. Nagysága:{' '}
                  <M t="|\mathbf{v}(4)| = \sqrt{300 + 900} = 20\sqrt{3} \approx 34{,}6\text{ m/s}" />.
                </>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Egy <M t="45\text{ m}" /> magas toronyból vízszintesen (<M t="\alpha = 0^\circ" />) dobunk el egy labdát <M t="v_0 = 12\text{ m/s}" /> sebességgel (<M t="g = 10\text{ m/s}^2" />). Milyen messze ér földet?</>}>
          <p>
            <M t="y(t) = 45 - 5t^2 = 0 \Rightarrow t = 3\text{ s}" />. Vízszintes távolság:{' '}
            <M t="x(3) = 12 \cdot 3 = 36\text{ m}" />.
          </p>
        </Task>

        <Task n={8} q={<>Miért kisebb az optimális dobásszög <M t="45^\circ" />-nál, ha <M t="y_0 > 0" />?</>}>
          <p>
            Mert a magasabb indulás „ajándék” repülési időt ad, így kevesebb sebességet érdemes felfelé áldozni, és
            többet a vízszintes <M t="v_0\cos\alpha" /> komponensre! (A pontos optimum:{' '}
            <M t="\sin\alpha_{\text{opt}} = \frac{1}{\sqrt{2 + 2gy_0/v_0^2}} < \frac{1}{\sqrt{2}}" />.)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Dobás ferde síkra (lejtőre és emelkedőre)',
    body: (
      <>
        <p>
          Mi történik, ha a talaj nem vízszintes, hanem <M t="\beta" /> szöget zár be a vízszintessel (azaz egyenlete{' '}
          <M t="y = x\tan\beta" />)? A becsapódási időt egyszerűen az <M t="y(t) = x(t)\tan\beta" /> egyenletből
          kapjuk!
        </p>

        <Def title="Becsapódás ferde síkon">
          <M block t="(v_0\sin\alpha)\,t - \tfrac{1}{2}gt^2 = (v_0\cos\alpha)\,t\tan\beta \;\Longrightarrow\; T = \frac{2v_0\sin(\alpha - \beta)}{g\cos\beta}." />
          <p>
            A ferde sík mentén mért legnagyobb távolságot az <M t="\alpha_{\text{opt}} = 45^\circ + \dfrac{\beta}{2}" />{' '}
            szög adja — geometriailag ez pontosan a lejtő és a függőleges közötti szög <strong>szögfelezője</strong>!
          </p>
        </Def>

        <InclineLaunchWidget />

        <Quiz
          q={<>Mi igaz egy ideális lövedékre a röppályája legmagasabb pontjában (csúcspontján)?</>}
          options={[
            { label: <>A sebessége és a gyorsulása is nulla</> },
            { label: <>A függőleges sebessége nulla, a gyorsulása pedig <M t="-g\,\mathbf{j}" /></>, ok: true },
            { label: <>A gyorsulása nulla, mert ott megfordul</> },
            { label: <>A sebességvektora párhuzamos a gyorsulásvektorával</> },
          ]}
          explain={
            <>
              A csúcsponton csak <M t="v_y = 0" />, miközben <M t="v_x = v_0\cos\alpha" /> továbbra is vízszintes,
              a gravitációs gyorsulás pedig végig állandó: <M t="\mathbf{a} = -g\,\mathbf{j}" />!
            </>
          }
        />

        <Task n={9} q={<>Egy <M t="\beta = 30^\circ" />-os emelkedő aljáról mekkora <M t="\alpha" /> (vízszintestől mért) szögben kell dobni a maximális lejtő menti távolsághoz?</>}>
          <p>
            <M t="\alpha_{\text{opt}} = 45^\circ + \frac{30^\circ}{2} = 60^\circ" /> (a lejtőhöz képest{' '}
            <M t="30^\circ" />).
          </p>
        </Task>

        <Task n={10} q={<>Ha egy síugró <M t="\beta = -30^\circ" />-os lejtőn ugrik el, mekkora a maximális ugrástávolságot adó elrugaszkodási szög a vízszinteshez képest?</>}>
          <p>
            <M t="\alpha_{\text{opt}} = 45^\circ + \frac{-30^\circ}{2} = 30^\circ" />. (Valós síugrásnál az
            aerodinamikai felhajtóerő ezt még laposabbra csökkenti.)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Légellenállással fékezett lövedék',
    body: (
      <>
        <p>
          A valóságban a levegő fékezi a mozgást. A legegyszerűbb, analitikusan is zárt alakban megoldható modell a{' '}
          <strong>lineáris közegellenállás</strong>, amelyben a fékező gyorsulás arányos a sebességgel:{' '}
          <M t="\mathbf{a}(t) = -k\,\mathbf{v}(t) - g\,\mathbf{j}" /> (<M t="k > 0" />).
        </p>

        <Def title="Lineáris közegellenállású pályaegyenletek">
          <p>
            A <M t="\mathbf{v}' + k\mathbf{v} = -g\,\mathbf{j}" /> elsőrendű lineáris differenciálegyenletet (9.2
            fejezet!) megoldva és integrálva:
          </p>
          <M block t="x(t) = \frac{v_0\cos\alpha}{k}\big(1 - e^{-kt}\big), \qquad y(t) = y_0 + \frac{1}{k}\!\left(v_0\sin\alpha + \frac{g}{k}\right)\!\big(1 - e^{-kt}\big) - \frac{g}{k}t." />
          <p>
            Két drámai különbség a vákuumhoz képest:
          </p>
          <ul>
            <li>
              Ha <M t="t \to \infty" />, akkor <M t="x(t) \to \dfrac{v_0\cos\alpha}{k}" />: a pályának{' '}
              <strong>függőleges aszimptotája</strong> van!
            </li>
            <li>
              A függőleges sebesség a <M t="v_\infty = -\dfrac{g}{k}" /> <strong>határsebességhez</strong> tart.
            </li>
          </ul>
        </Def>

        <AirDragCompareWidget />

        <Warn>
          A légellenállás miatt a pálya <strong>nem szimmetrikus</strong>: a leszálló ág mindig rövidebb és meredekebb,
          mint a felszálló ág, és a maximális lőtávolságot adó szög is <M t="45^\circ" /> alá csökken!
        </Warn>

        <Task n={11} q={<>Egy tollaslabda <M t="v_0 = 20\text{ m/s}" />, <M t="\alpha = 60^\circ" /> és <M t="k = 0{,}5\text{ s}^{-1}" /> mellett indul. Mi a vízszintes elmozdulás elméleti felső korlátja (aszimptotája)?</>}>
          <p>
            <M t="x_{\max} = \frac{v_0\cos 60^\circ}{k} = \frac{20 \cdot 0{,}5}{0{,}5} = 20\text{ m}" />. Ennél
            távolabbra még végtelen mély szakadék fölött sem juthat el!
          </p>
        </Task>

        <Task n={12} q={<>Mutasd meg L’Hôpital-szabállyal, hogy <M t="\lim_{k\to 0^+} \frac{v_0\cos\alpha}{k}(1 - e^{-kt}) = (v_0\cos\alpha)t" />!</>}>
          <p>
            A <M t="k \to 0^+" /> határérték <M t="0/0" /> alakú. A számlálót és nevezőt <M t="k" /> szerint deriválva:{' '}
            <M t="\lim_{k\to 0^+} \frac{v_0\cos\alpha \cdot t e^{-kt}}{1} = (v_0\cos\alpha)t" /> — visszakaptuk a
            vákuumképletet!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Háromdimenziós dobás és oldalszél',
    body: (
      <>
        <p>
          A vektoros leírás legnagyobb előnye, hogy egy szempillantás alatt általánosítható három dimenzióra! Ha egy
          labdát <M t="\mathbf{v}(0) = \langle v_{0x}, v_{0y}, v_{0z} \rangle" /> sebességgel indítunk, és állandó{' '}
          <M t="a_y" /> oldalszél is fúj, a gyorsulás egyszerűen <M t="\mathbf{a}(t) = \langle 0,\; a_y,\; -g \rangle" />.
        </p>

        <Def title="3D lövedék állandó oldalszélben">
          <M block t="\mathbf{r}(t) = \Big\langle x_0 + v_{0x}t,\;\; y_0 + v_{0y}t + \tfrac{1}{2}a_y t^2,\;\; z_0 + v_{0z}t - \tfrac{1}{2}gt^2 \Big\rangle." />
          <p>
            Mivel a <M t="z(t)" /> koordinátát csak <M t="v_{0z}" /> és <M t="-g" /> befolyásolja, a vízszintes
            oldalszél <strong>egyáltalán nem változtatja meg a repülési időt</strong> — csak oldalra sodorja a
            becsapódási pontot <M t="\Delta y = \frac{1}{2}a_y T^2" /> távolsággal!
          </p>
        </Def>

        <Wind3DProjectileWidget />

        <Quiz
          q={<>Ha egy szabadrúgásnál erős, tisztán vízszintes oldalszél fúj (<M t="a_y = 3\text{ m/s}^2" />), hogyan változik a labda repülési ideje (ha a kezdősebesség változatlan)?</>}
          options={[
            { label: <>Meghosszabbodik, mert hosszabb ívet fut be</> },
            { label: <>Lerövidül a szél miatt</> },
            { label: <>Változatlan marad, mert a <M t="z(t)" /> egyenlet független <M t="a_y" />-tól</>, ok: true },
            { label: <>Megduplázódik</> },
          ]}
          explain={
            <>
              A földet érés feltétele <M t="z(t) = v_{0z}t - \frac{1}{2}gt^2 = 0" />, amiben az <M t="a_y" />{' '}
              oldalszél nem szerepel!
            </>
          }
        />

        <Task n={13} q={<>Egy golflabda <M t="\mathbf{v}(0) = \langle 30,\; 0,\; 20 \rangle\text{ m/s}" /> sebességgel indul az origóból, és <M t="a_y = 1{,}5\text{ m/s}^2" /> oldalszél fúj (<M t="g = 10\text{ m/s}^2" />). Hol ér földet?</>}>
          <p>
            <M t="z(t) = 20t - 5t^2 = 0 \Rightarrow T = 4\text{ s}" />. Ekkor <M t="x(4) = 120\text{ m}" />,{' '}
            <M t="y(4) = \frac{1}{2}\cdot 1{,}5 \cdot 16 = 12\text{ m}" />. Becsapódási pont:{' '}
            <M t="(120;\; 12;\; 0)\text{ m}" />.
          </p>
        </Task>

        <Task n={14} q={<>Mekkora a 13. feladat labdájának sebességvektora a becsapódás pillanatában?</>}>
          <p>
            <M t="\mathbf{v}(t) = \langle 30,\; 1{,}5t,\; 20 - 10t \rangle" />, tehát{' '}
            <M t="\mathbf{v}(4) = \langle 30,\; 6,\; -20 \rangle\text{ m/s}" />.
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
        <ProjectileFormulaMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Egy lövedéket <M t="v_0 = 50\text{ m/s}" /> sebességgel, <M t="45^\circ" />-ban lövünk ki vízszintes terepen (<M t="g = 10\text{ m/s}^2" />). Mennyi a maximális lőtávolsága?</>}>
          <p>
            <M t="R_{\max} = \frac{v_0^2}{g} = \frac{2500}{10} = 250\text{ m}" />.
          </p>
        </Task>

        <Task n={16} q={<>Egy <M t="20\text{ m}" /> magas hídról vízszintesen gurul le egy kavics <M t="8\text{ m/s}" /> sebességgel (<M t="g = 10\text{ m/s}^2" />). Mennyi idő múlva csobban a vízbe, és milyen messze a hídpillértől?</>}>
          <p>
            <M t="20 - 5t^2 = 0 \Rightarrow T = 2\text{ s}" />. Vízszintes távolság:{' '}
            <M t="x(2) = 8 \cdot 2 = 16\text{ m}" />.
          </p>
        </Task>

        <Task n={17} q={<>Mekkora a repülési idő és a csúcsmagasság, ha <M t="v_0 = 20\text{ m/s}" />, <M t="\alpha = 60^\circ" /> (<M t="g = 10\text{ m/s}^2" />)?</>}>
          <p>
            <M t="v_{0y} = 10\sqrt{3}" />. <M t="T = \frac{2v_{0y}}{g} = 2\sqrt{3} \approx 3{,}46\text{ s}" />,{' '}
            <M t="y_{\max} = \frac{300}{20} = 15\text{ m}" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Mekkora <M t="\alpha" /> szög esetén egyenlő a lőtávolság (<M t="R" />) a csúcsmagasság négyszeresével (<M t="4y_{\max}" />)?</>}>
          <p>
            <M t="\frac{v_0^2 \cdot 2\sin\alpha\cos\alpha}{g} = 4 \cdot \frac{v_0^2\sin^2\alpha}{2g} \Rightarrow 2\sin\alpha\cos\alpha = 2\sin^2\alpha \Rightarrow \tan\alpha = 1 \Rightarrow \alpha = 45^\circ" />!
            (Szép geometriai tény: <M t="45^\circ" />-nál mindig <M t="R = 4y_{\max}" />.)
          </p>
        </Task>

        <Task n={19} q={<>Egy baseball-labdát <M t="y_0 = 1\text{ m}" /> magasról, <M t="v_0 = 30\text{ m/s}" /> sebességgel és <M t="45^\circ" />-os szögben ütnek meg (<M t="g = 10\text{ m/s}^2" />). Átrepül-e egy <M t="80\text{ m}" />-re lévő, <M t="4\text{ m}" /> magas kerítés fölött?</>}>
          <p>
            Descartes-egyenlet: <M t="y(x) = 1 + x - \frac{10}{2 \cdot 900 \cdot (1/2)}x^2 = 1 + x - \frac{x^2}{90}" />.{' '}
            <M t="x = 80" />-nál: <M t="y(80) = 1 + 80 - \frac{6400}{90} = 81 - 71{,}11 = 9{,}89\text{ m} > 4\text{ m}" />{' '}
            → bőven átrepül (hazafutás!).
          </p>
        </Task>

        <Task n={20} q={<>Egy <M t="30\text{ m}" />-re lévő célponttal azonos magasságból lövünk ki egy nyilat <M t="v_0 = 20\text{ m/s}" /> sebességgel (<M t="g = 10\text{ m/s}^2" />). Mekkora a két lehetséges kilövési szög?</>}>
          <p>
            <M t="R = \frac{400\sin(2\alpha)}{10} = 30 \Rightarrow \sin(2\alpha) = 0{,}75" />. Így{' '}
            <M t="2\alpha \approx 48{,}6^\circ" /> vagy <M t="131{,}4^\circ" />, tehát{' '}
            <M t="\alpha_1 \approx 24{,}3^\circ" /> és <M t="\alpha_2 \approx 65{,}7^\circ" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Mutasd meg, hogy a <M t="v_0" /> sebességgel indított lövedék <M t="y = \frac{v_0^2}{2g} - \frac{g}{2v_0^2}x^2" /> biztonsági parabolája pontosan a <M t="\tan\alpha" />-ra kapott másodfokú egyenlet <M t="\Delta = 0" /> feltétele!</>}>
          <p>
            A pályaegyenlet <M t="u = \tan\alpha" />-ban:{' '}
            <M t="\frac{gx^2}{2v_0^2}u^2 - xu + \Big(y + \frac{gx^2}{2v_0^2}\Big) = 0" />. Diszkriminánsa:{' '}
            <M t="\Delta = x^2 - 4\frac{gx^2}{2v_0^2}\Big(y + \frac{gx^2}{2v_0^2}\Big) \ge 0" />. Pozitív <M t="x^2" />-tel
            osztva: <M t="1 \ge \frac{2g}{v_0^2}y + \frac{g^2x^2}{v_0^4} \Rightarrow y \le \frac{v_0^2}{2g} - \frac{g}{2v_0^2}x^2" />!
          </p>
        </Task>

        <Task n={22} q={<>Egy lövedéket <M t="v_0" /> sebességgel egy <M t="\beta" /> hajlásszögű emelkedő aljáról indítunk. Igazold, hogy a ferde sík mentén mért távolság <M t="d(\alpha) = \frac{2v_0^2\cos\alpha\sin(\alpha-\beta)}{g\cos^2\beta}" />, és maximuma <M t="\alpha = \frac{\pi}{4} + \frac{\beta}{2}" />-nél van!</>}>
          <p>
            <M t="d = \frac{x(T)}{\cos\beta} = \frac{v_0\cos\alpha}{\cos\beta}\cdot\frac{2v_0\sin(\alpha-\beta)}{g\cos\beta}" />.
            Szorzat–összeg azonossággal:{' '}
            <M t="2\cos\alpha\sin(\alpha-\beta) = \sin(2\alpha - \beta) - \sin\beta" />. Ez akkor maximális, ha{' '}
            <M t="\sin(2\alpha - \beta) = 1 \Rightarrow 2\alpha - \beta = \frac{\pi}{2} \Rightarrow \alpha = \frac{\pi}{4} + \frac{\beta}{2}" />!
          </p>
        </Task>

        <Task n={23} q={<>Lineáris közegellenállásnál (<M t="\mathbf{a} = -k\mathbf{v} - g\mathbf{j}" />) egy ejtőernyős <M t="v_y(0) = 0" />-val ugrik ki (<M t="g = 10\text{ m/s}^2" />, <M t="k = 2\text{ s}^{-1}" />). Mennyi a határsebessége, és mennyi idő múlva éri el annak 90%-át?</>}>
          <p>
            <M t="v_y(t) = -\frac{g}{k}(1 - e^{-kt}) = -5(1 - e^{-2t})" />. Határsebesség:{' '}
            <M t="|v_\infty| = 5\text{ m/s}" />. A 90%-hoz <M t="1 - e^{-2t} = 0{,}9 \Rightarrow e^{-2t} = 0{,}1 \Rightarrow t = \frac{\ln 10}{2} \approx 1{,}15\text{ s}" />!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q="Vízszintes terepen (légellenállás nélkül) melyik kilövési szög adja a legnagyobb lőtávolságot?"
          options={[
            { label: <M t="45^\circ" />, ok: true },
            { label: <M t="30^\circ" /> },
            { label: <M t="60^\circ" /> },
            { label: <M t="90^\circ" /> },
          ]}
          explain={
            <>
              Az <M t="R = \dfrac{v_0^2}{g}\sin(2\alpha)" /> képlet akkor maximális, ha{' '}
              <M t="\sin(2\alpha) = 1 \implies 2\alpha = 90^\circ \implies \alpha = 45^\circ" />.
            </>
          }
        />
      </>
    ),
  },
];
