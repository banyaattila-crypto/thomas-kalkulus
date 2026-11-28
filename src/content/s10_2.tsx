import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ConicSummaryDiagram,
  EccentricitySpectrumDiagram,
  EllipseDirectrixWidget,
  EllipseEccentricityWidget,
  FocusDirectrixLabWidget,
  HyperbolaDirectrixWidget,
  HyperbolaEccentricityWidget,
  OrbitEccentricityDiagram,
} from '../components/Widgets102';
import type { Page } from './s1_1';

export const S10_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Egyetlen szám, amely minden kúpszeletet azonosít',
    body: (
      <>
        <Story>
          <p>
            A 10.1-es szakaszban három külön definíciót tanultunk: a parabolát egy fókuszpont és egy vezéregyenes, az
            ellipszist a fókusztávolságok összege, a hiperbolát pedig a fókusztávolságok különbsége határozta meg.
            Meglepő módon azonban mindhárom alakzat leírható egyetlen közös tulajdonsággal és egyetlen nemnegatív
            számmal — az <strong>excentricitással</strong> (<M t="e" />). Ez a szám nemcsak a kúpszelet típusát árulja
            el, hanem pontosan méri a „megnyúltságát” is.
          </p>
        </Story>

        <Def title="Kúpszeletek osztályozása az excentricitás alapján">
          <p>
            Minden nem elfajult kúpszelethez tartozik egy <M t="e \ge 0" /> valós szám (<em>excentricitás</em>):
          </p>
          <ul>
            <li><M t="e = 0" />: <strong>kör</strong> (az ellipszis tökéletesen szimmetrikus határesete);</li>
            <li><M t="0 < e < 1" />: <strong>ellipszis</strong> (minél közelebb van <M t="e" /> az 1-hez, annál laposabb);</li>
            <li><M t="e = 1" />: <strong>parabola</strong> (a zárt és a nyílt görbék közötti pontos határ);</li>
            <li><M t="e > 1" />: <strong>hiperbola</strong> (minél nagyobb <M t="e" />, annál szélesebbre nyílnak az ágai).</li>
          </ul>
        </Def>

        <EccentricitySpectrumDiagram />

        <p>
          Az ellipszis és a hiperbola esetén az excentricitásnak egyszerű geometriai jelentése is van:
        </p>
        <M block t="e = \frac{c}{a} = \frac{2c}{2a} = \frac{\text{fókuszok távolsága}}{\text{tengelypontok (csúcsok) távolsága}}." />
        <p>
          Ellipszisnél a fókuszok a csúcsokon <em>belül</em> vannak (<M t="c < a" />), ezért <M t="e < 1" />.
          Hiperbolánál a fókuszok a csúcsokon <em>kívül</em> helyezkednek el (<M t="c > a" />), ezért <M t="e > 1" />.
        </p>

        <Quiz
          q={<>Egy kúpszelet fókuszai egymástól 10 egységre, csúcsai pedig 8 egységre vannak. Milyen görbe ez, és mennyi az excentricitása?</>}
          options={[
            { label: <>Ellipszis, <M t="e = 0{,}8" /></> },
            { label: <>Hiperbola, <M t="e = 1{,}25" /></>, ok: true },
            { label: <>Parabola, <M t="e = 1" /></> },
            { label: <>Hiperbola, <M t="e = 2" /></> },
          ]}
          explain={
            <>
              Mivel <M t="2c = 10" /> és <M t="2a = 8" />, az excentricitás <M t="e = \tfrac{2c}{2a} = \tfrac{10}{8} = 1{,}25 > 1" />,
              tehát a görbe <strong>hiperbola</strong>.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Miért nem lehet egy ellipszis excentricitása <M t="e = 1{,}05" />?</>}>
          <p>
            Ellipszisben <M t="c = \sqrt{a^2-b^2} < a" />, hiszen <M t="b > 0" />. Ezért <M t="e = c/a" /> mindig
            szigorúan 1 alatt marad. Az <M t="e = 1{,}05 > 1" /> érték már hiperbolát jelöl.
          </p>
        </Task>
        <Task n={2} q={<>Két ellipszis excentricitása <M t="e_1 = 0{,}15" /> és <M t="e_2 = 0{,}85" />. Melyik hasonlít jobban egy körre?</>}>
          <p>
            Az <M t="e_1 = 0{,}15" /> excentricitású ellipszis, mert a kör excentricitása <M t="e = 0" />, és minél kisebb
            <M t="e" />, annál közelebb van a <M t="b/a = \sqrt{1-e^2}" /> tengelyarány az 1-hez.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Az ellipszis excentricitása és arányai',
    body: (
      <>
        <Def title="Ellipszis excentricitása">
          <p>
            Az <M t="\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1" /> (ahol <M t="a \ge b > 0" />) vagy az{' '}
            <M t="\dfrac{x^2}{b^2} + \dfrac{y^2}{a^2} = 1" /> ellipszis excentricitása:
          </p>
          <M block t="e = \frac{c}{a} = \frac{\sqrt{a^2 - b^2}}{a} = \sqrt{1 - \left(\frac{b}{a}\right)^2}." />
        </Def>

        <p>
          Az utolsó alakból azonnal leolvasható, hogy az excentricitás csak a <M t="b/a" /> tengelyaránytól függ — vagyis
          két ellipszis pontosan akkor <strong>hasonló</strong> egymáshoz, ha az excentricitásuk megegyezik! Ha{' '}
          <M t="e" />-t ismerjük, a félkistengely és a félnagytengely aránya:
        </p>
        <M block t="\frac{b}{a} = \sqrt{1 - e^2}." />

        <EllipseEccentricityWidget />

        <h3>Kidolgozott példa — Adatokból egyenlet</h3>
        <p>
          Egy origó középpontú ellipszis fókuszai <M t="(0;\,\pm 6)" />, excentricitása pedig <M t="e = 0{,}75" />.
          Határozzuk meg a csúcsait és az egyenletét!
        </p>
        <ul>
          <li>A fókuszok az <M t="y" />-tengelyen fekszenek, tehát a nagytengely függőleges, és <M t="c = 6" />.</li>
          <li>
            Az <M t="e = c/a" /> összefüggésből <M t="a = \dfrac{c}{e} = \dfrac{6}{0{,}75} = 8" />, így a főtengely
            csúcsai <M t="(0;\,\pm 8)" />.
          </li>
          <li>
            A kistengely féltengelye: <M t="b^2 = a^2 - c^2 = 64 - 36 = 28" />, tehát <M t="b = 2\sqrt{7} \approx 5{,}29" />.
          </li>
          <li>
            Az ellipszis normálegyenlete: <M t="\dfrac{x^2}{28} + \dfrac{y^2}{64} = 1" />.
          </li>
        </ul>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Számítsd ki a <M t="9x^2 + 25y^2 = 225" /> ellipszis excentricitását!</>}>
          <p>
            225-tel osztva <M t="\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1" />, innen <M t="a = 5" />, <M t="b = 3" />,{' '}
            <M t="c = \sqrt{25-9} = 4" />. Tehát <M t="e = \tfrac{c}{a} = \tfrac{4}{5} = 0{,}8" />.
          </p>
        </Task>
        <Task n={4} q={<>Egy ellipszisben a nagytengely kétszerese a kistengelynek (<M t="a = 2b" />). Mennyi az excentricitása?</>}>
          <p>
            <M t="e = \sqrt{1 - (b/a)^2} = \sqrt{1 - (1/2)^2} = \sqrt{\tfrac{3}{4}} = \dfrac{\sqrt{3}}{2} \approx 0{,}866" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Csillagászati pályák: napközel, naptávol és üstökösök',
    body: (
      <>
        <p>
          Kepler első törvénye szerint a bolygók, kisbolygók és periodikus üstökösök ellipszispályán keringenek a Nap
          körül, és a Nap az ellipszis egyik <strong>fókuszpontjában</strong> foglal helyet. Ha a pálya félnagytengelye{' '}
          <M t="a" />, excentricitása pedig <M t="e" />, akkor a két szélső távolság egyszerűen felírható:
        </p>

        <Def title="Napközel (perihélium) és naptávol (aphélium)">
          <M block t="r_{\min} = a - c = a(1 - e), \qquad r_{\max} = a + c = a(1 + e)." />
          <p>
            Ebből két rendkívül praktikus fordított formula is adódik, ha a csillagászati mérésekből{' '}
            <M t="r_{\min}" /> és <M t="r_{\max}" /> ismert:
          </p>
          <M block t="a = \frac{r_{\max} + r_{\min}}{2}, \qquad e = \frac{r_{\max} - r_{\min}}{r_{\max} + r_{\min}}." />
        </Def>

        <OrbitEccentricityDiagram />

        <h3>Kidolgozott példa — Műholdpálya a Föld körül</h3>
        <p>
          Egy kutatóműhold ellipszispályán kering a Föld középpontja körül (amely az egyik fókuszban van). A Föld
          középpontjától mért legkisebb távolsága <M t="7\,000\text{ km}" />, a legnagyobb pedig{' '}
          <M t="21\,000\text{ km}" />. Mennyi a pálya félnagytengelye, félkistengelye és excentricitása?
        </p>
        <ul>
          <li>
            Félnagytengely: <M t="a = \dfrac{21\,000 + 7\,000}{2} = 14\,000\text{ km}" />.
          </li>
          <li>
            Excentricitás: <M t="e = \dfrac{21\,000 - 7\,000}{21\,000 + 7\,000} = \dfrac{14\,000}{28\,000} = 0{,}5" />.
          </li>
          <li>
            Félkistengely: <M t="b = a\sqrt{1-e^2} = 14\,000 \cdot \dfrac{\sqrt{3}}{2} = 7\,000\sqrt{3} \approx 12\,124\text{ km}" />.
          </li>
        </ul>

        <Quiz
          q={
            <>
              Egy kisbolygó naptávolban pontosan 3-szor messzebb van a Naptól, mint napközelben (<M t="r_{\max} = 3 r_{\min}" />).
              Mennyi a pálya excentricitása?
            </>
          }
          options={[
            { label: <M t="e = \tfrac{1}{3}" /> },
            { label: <M t="e = \tfrac{1}{2}" />, ok: true },
            { label: <M t="e = \tfrac{2}{3}" /> },
            { label: <M t="e = \tfrac{3}{4}" /> },
          ]}
          explain={
            <>
              <M t="e = \dfrac{r_{\max} - r_{\min}}{r_{\max} + r_{\min}} = \dfrac{3r_{\min} - r_{\min}}{3r_{\min} + r_{\min}} = \dfrac{2}{4} = \dfrac{1}{2}" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy üstökös félnagytengelye <M t="a = 10\text{ CSE}" />, excentricitása <M t="e = 0{,}92" />. Mekkora a
              napközel és a naptávol távolsága?
            </>
          }
        >
          <p>
            <M t="r_{\min} = 10(1 - 0{,}92) = 0{,}8\text{ CSE}" /> (beljebb kerül a Föld pályájánál!),{' '}
            <M t="r_{\max} = 10(1 + 0{,}92) = 19{,}2\text{ CSE}" /> (az Uránusz távolsága körül).
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Ha egy ellipszispálya excentricitása <M t="e = 0{,}02" /> (mint a Földé), nagyjából hány százalékkal
              rövidebb a kistengelye a nagytengelyénél?
            </>
          }
        >
          <p>
            <M t="\dfrac{b}{a} = \sqrt{1 - 0{,}02^2} = \sqrt{0{,}9996} \approx 0{,}9998" />. Ez mindössze{' '}
            <strong>0,02%</strong> eltérés — szabad szemmel tökéletes körnek látszik!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Az ellipszis vezéregyenesei és a PF = e · PD tulajdonság',
    body: (
      <>
        <p>
          A parabolánál már láttuk, hogy egyetlen fókusza és egyetlen vezéregyenese van, amelyekre{' '}
          <M t="PF = 1 \cdot PD" />. Az ellipszisnek két fókusza van, és mindkettőhöz tartozik egy-egy{' '}
          <strong>vezéregyenes (direktrix)</strong>, amely merőleges a főtengelyre.
        </p>

        <Def title="Az ellipszis vezéregyenesei">
          <p>
            Az <M t="\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1" /> (<M t="a > b > 0" />) ellipszis két fókusza{' '}
            <M t="F_1(-c;\,0)" /> és <M t="F_2(c;\,0)" />, a hozzájuk tartozó vezéregyenesek pedig:
          </p>
          <M block t="d_1:\ x = -\frac{a}{e} = -\frac{a^2}{c}, \qquad d_2:\ x = +\frac{a}{e} = +\frac{a^2}{c}." />
          <p>
            Az ellipszis tetszőleges <M t="P" /> pontjára teljesül az arányossági törvény:
          </p>
          <M block t="PF_1 = e \cdot PD_1 \qquad \text{és} \qquad PF_2 = e \cdot PD_2," />
          <p>
            ahol <M t="D_1, D_2" /> a <M t="P" /> pont merőleges vetülete a megfelelő vezéregyenesre.
          </p>
        </Def>

        <p>
          <em>Miért igaz ez?</em> Számoljuk ki <M t="PF_2^2" />-et az <M t="y^2 = b^2\left(1 - \frac{x^2}{a^2}\right)" />{' '}
          helyettesítéssel (<M t="b^2 = a^2 - c^2 = a^2(1 - e^2)" />):
        </p>
        <M block t="PF_2^2 = (x - c)^2 + y^2 = x^2 - 2aex + a^2e^2 + a^2(1-e^2)\left(1 - \frac{x^2}{a^2}\right) = e^2 x^2 - 2aex + a^2 = (a - ex)^2." />
        <p>
          Mivel az ellipszisen <M t="|x| \le a < a/e" />, ezért <M t="a - ex > 0" />, így gyököt vonva:
        </p>
        <M block t="PF_2 = a - ex = e\left(\frac{a}{e} - x\right) = e \cdot PD_2." />
        <p>
          És ha összeadjuk a két oldalra vonatkozó képletet: <M t="PF_1 + PF_2 = e\left(x + \frac{a}{e}\right) + e\left(\frac{a}{e} - x\right) = 2a" /> —
          visszakaptuk az ellipszis klasszikus definícióját!
        </p>

        <EllipseDirectrixWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Határozd meg az <M t="\dfrac{x^2}{169} + \dfrac{y^2}{144} = 1" /> ellipszis excentricitását, fókuszait és vezéregyeneseit!</>}>
          <p>
            <M t="a = 13" />, <M t="b = 12" />, <M t="c = \sqrt{169 - 144} = 5" />. Excentricitás:{' '}
            <M t="e = \tfrac{5}{13}" />. Fókuszok: <M t="(\pm 5;\,0)" />. Vezéregyenesek:{' '}
            <M t="x = \pm \dfrac{a}{e} = \pm \dfrac{169}{5} = \pm 33{,}8" />.
          </p>
        </Task>
        <Task n={8} q={<>Mi történik az ellipszis vezéregyeneseivel, ha <M t="e \to 0^+" /> (vagyis az ellipszis körhöz tart)?</>}>
          <p>
            A vezéregyenesek távolsága <M t="\dfrac{a}{e} \to \infty" />, tehát a végtelenbe távolodnak — ezért nincs a
            körnek véges távolságban lévő vezéregyenese.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A hiperbola excentricitása és vezéregyenesei',
    body: (
      <>
        <p>
          A hiperbolánál az excentricitás képlete formailag ugyanaz (<M t="e = c/a" />), de itt a fókusztávolság{' '}
          <M t="c = \sqrt{a^2 + b^2}" />, ezért <M t="c > a" />, és így az excentricitás mindig <strong>1-nél nagyobb</strong>.
        </p>

        <Def title="Hiperbola excentricitása és vezéregyenesei">
          <p>
            Az <M t="\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1" /> hiperbola excentricitása:
          </p>
          <M block t="e = \frac{c}{a} = \frac{\sqrt{a^2 + b^2}}{a} = \sqrt{1 + \left(\frac{b}{a}\right)^2} > 1." />
          <p>
            Aszimptotáinak meredeksége <M t="\pm \dfrac{b}{a} = \pm\sqrt{e^2 - 1}" />. Vezéregyenesei:
          </p>
          <M block t="d_1:\ x = -\frac{a}{e} = -\frac{a^2}{c}, \qquad d_2:\ x = +\frac{a}{e} = +\frac{a^2}{c}," />
          <p>
            amelyekre a hiperbola minden <M t="P" /> pontjában fennáll a <M t="PF_1 = e\cdot PD_1" /> és{' '}
            <M t="PF_2 = e\cdot PD_2" /> egyenlőség.
          </p>
        </Def>

        <HyperbolaEccentricityWidget />

        <p>
          Különösen szép eset az <strong>egyenlő szárú hiperbola</strong> (<M t="a = b" />), amelynek aszimptotái
          merőlegesek egymásra (<M t="y = \pm x" />). Ennek excentricitása mindig{' '}
          <M t="e = \sqrt{1 + 1^2} = \sqrt{2} \approx 1{,}414" />!
        </p>

        <HyperbolaDirectrixWidget />

        <Quiz
          q={<>Melyik hiperbolának merőlegesek az aszimptotái, és mennyi az excentricitása?</>}
          options={[
            { label: <><M t="x^2 - 4y^2 = 4" />, <M t="e = \tfrac{\sqrt{5}}{2}" /></> },
            { label: <><M t="x^2 - y^2 = 9" />, <M t="e = \sqrt{2}" /></>, ok: true },
            { label: <><M t="4x^2 - y^2 = 4" />, <M t="e = \sqrt{5}" /></> },
            { label: <><M t="x^2 - y^2 = 9" />, <M t="e = 2" /></> },
          ]}
          explain={
            <>
              Merőleges aszimptoták akkor adódnak, ha a meredekségeik <M t="\pm 1" />, vagyis <M t="a = b" />. Az{' '}
              <M t="x^2 - y^2 = 9" /> esetben <M t="a = b = 3" />, így <M t="e = \sqrt{1 + (b/a)^2} = \sqrt{2}" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Határozd meg a <M t="16x^2 - 9y^2 = 144" /> hiperbola excentricitását és vezéregyeneseit!</>}>
          <p>
            144-gyel osztva <M t="\tfrac{x^2}{9} - \tfrac{y^2}{16} = 1" />, tehát <M t="a = 3" />, <M t="b = 4" />,{' '}
            <M t="c = \sqrt{9+16} = 5" />. Excentricitás: <M t="e = \tfrac{5}{3}" />. Vezéregyenesek:{' '}
            <M t="x = \pm\dfrac{a}{e} = \pm\dfrac{9}{5} = \pm 1{,}8" />.
          </p>
        </Task>
        <Task n={10} q={<>Igaz-e, hogy a hiperbola vezéregyenesei mindig közelebb vannak a középponthoz, mint a csúcsai?</>}>
          <p>
            <strong>Igen!</strong> Mivel <M t="e > 1" />, ezért <M t="0 < \dfrac{a}{e} < a < c" />. A sorrend a
            középponttól kifelé mindig: vezéregyenes <M t="\to" /> csúcs <M t="\to" /> fókusz.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Az egységes fókusz–vezéregyenes tétel és egyenletfelírás',
    body: (
      <>
        <Def title="Fókusz–vezéregyenes tétel (egységes definíció)">
          <p>
            Adott a síkon egy <M t="F" /> pont (fókusz), egy rá nem illeszkedő <M t="d" /> egyenes (vezéregyenes) és
            egy <M t="e > 0" /> szám (excentricitás). Azon <M t="P" /> pontok halmaza, amelyekre
          </p>
          <M block t="PF = e \cdot PD," />
          <p>
            ahol <M t="PD" /> a <M t="P" /> pont távolsága a <M t="d" /> egyenestől:
          </p>
          <ul>
            <li><strong>ellipszis</strong>, ha <M t="0 < e < 1" />;</li>
            <li><strong>parabola</strong>, ha <M t="e = 1" />;</li>
            <li><strong>hiperbola</strong>, ha <M t="e > 1" />.</li>
          </ul>
        </Def>

        <FocusDirectrixLabWidget />

        <Steps
          title="Kúpszelet egyenlete fókuszból és vezéregyenesből"
          problem={
            <>
              Írjuk fel annak az origó középpontú kúpszeletnek a Descartes-koordinátás egyenletét, amelynek egyik
              fókusza <M t="F_2(4;\,0)" />, a hozzá tartozó vezéregyenes pedig <M t="x = 1" />!
            </>
          }
          steps={[
            {
              title: 'c és a/e leolvasása',
              body: (
                <>
                  Mivel a fókusz <M t="(c;\,0) = (4;\,0)" />, ezért <M t="c = 4" />. A hozzá tartozó vezéregyenes{' '}
                  <M t="x = \dfrac{a}{e} = 1" />, tehát <M t="a = e" />.
                </>
              ),
            },
            {
              title: 'Az excentricitás kiszámítása',
              body: (
                <>
                  Behelyettesítünk az <M t="e = c/a" /> definícióba: <M t="e = \dfrac{4}{e} \Rightarrow e^2 = 4 \Rightarrow e = 2" />.
                  Mivel <M t="e = 2 > 1" />, a görbe <strong>hiperbola</strong>, és <M t="a = e = 2" />!
                </>
              ),
            },
            {
              title: 'A PF = e · PD egyenlet felírása',
              body: (
                <>
                  Tetszőleges <M t="P(x;\,y)" /> pontra <M t="\sqrt{(x-4)^2 + y^2} = 2|x - 1|" />. Mindkét oldalt
                  négyzetre emeljük:
                  <M block t="x^2 - 8x + 16 + y^2 = 4(x^2 - 2x + 1) = 4x^2 - 8x + 4." />
                </>
              ),
            },
            {
              title: 'Normálalak és ellenőrzés',
              body: (
                <>
                  A <M t="-8x" /> tagok kiejtik egymást, marad <M t="3x^2 - y^2 = 12" />, vagyis{' '}
                  <M t="\dfrac{x^2}{4} - \dfrac{y^2}{12} = 1" />. Ellenőrzés: <M t="a^2 = 4, b^2 = 12 \Rightarrow c = \sqrt{4+12} = 4" />,{' '}
                  <M t="a/e = 2/2 = 1" /> — pontos!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Egy origó középpontú kúpszelet fókusza <M t="F_2(3;\,0)" />, a hozzá tartozó vezéregyenes pedig{' '}
              <M t="x = 12" />. Ellipszis vagy hiperbola ez? Add meg <M t="e" />-t és <M t="a" />-t!
            </>
          }
        >
          <p>
            <M t="c = 3" /> és <M t="a/e = 12 \Rightarrow a = 12e" />. Innen <M t="e = \dfrac{c}{a} = \dfrac{3}{12e} \Rightarrow e^2 = \dfrac{1}{4} \Rightarrow e = 0{,}5 < 1" />,
            tehát <strong>ellipszis</strong>! Félnagytengelye <M t="a = 12 \cdot 0{,}5 = 6" /> (és{' '}
            <M t="b^2 = 36 - 9 = 27" />).
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Írd fel a <M t="PF = 1\cdot PD" /> egyenletből annak a parabolának az egyenletét, amelynek fókusza{' '}
              <M t="F(0;\,2)" />, vezéregyenese pedig <M t="y = -2" />!
            </>
          }
        >
          <p>
            <M t="\sqrt{x^2 + (y-2)^2} = |y + 2|" />. Négyzetre emelve <M t="x^2 + y^2 - 4y + 4 = y^2 + 4y + 4" />,
            azaz <M t="x^2 = 8y" />.
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
        <ConicSummaryDiagram />

        <h3>A négy kúpszelet összehasonlítása</h3>
        <table className="tbl">
          <thead>
            <tr><th>Kúpszelet</th><th>Excentricitás</th><th>Fókusztávolság <M t="c" /></th><th>Vezéregyenes(ek)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Kör</strong></td>
              <td><M t="e = 0" /></td>
              <td><M t="c = 0" /></td>
              <td>nincs (a végtelenben)</td>
            </tr>
            <tr>
              <td><strong>Ellipszis</strong> (<M t="a>b" />)</td>
              <td><M t="0 < e < 1" /></td>
              <td><M t="c = \sqrt{a^2 - b^2}" /></td>
              <td><M t="x = \pm a/e" /> (vagy <M t="y = \pm a/e" />), <M t="a/e > a" /></td>
            </tr>
            <tr>
              <td><strong>Parabola</strong></td>
              <td><M t="e = 1" /></td>
              <td><M t="p" /> (csúcs–fókusz táv)</td>
              <td>1 db (<M t="x = -p" /> vagy <M t="y = -p" />)</td>
            </tr>
            <tr>
              <td><strong>Hiperbola</strong></td>
              <td><M t="e > 1" /></td>
              <td><M t="c = \sqrt{a^2 + b^2}" /></td>
              <td><M t="x = \pm a/e" /> (vagy <M t="y = \pm a/e" />), <M t="a/e < a" /></td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. Az <M t="a" /> és <M t="b" /> felcserélése függőleges ellipszisnél:</strong> a{' '}
          <M t="\dfrac{x^2}{9} + \dfrac{y^2}{25} = 1" /> egyenletben a <em>nagyobb</em> nevező adja <M t="a^2" />-et
          (<M t="a = 5, b = 3" />)! Ha rosszul választanád <M t="a = 3" />-nak, negatív szám kerülne a gyök alá, vagy{' '}
          <M t="e > 1" /> jönne ki.
        </Warn>
        <Warn>
          <strong>2. Ellentétes előjel <M t="c" /> képletében:</strong> ellipszisnél <M t="c = \sqrt{a^2 - b^2}" />{' '}
          (kivonás, így <M t="e < 1" />), hiperbolánál <M t="c = \sqrt{a^2 + b^2}" /> (összeadás, így <M t="e > 1" />).
          Hiperbolánál <M t="a" /> mindig a <em>pozitív</em> előjelű tag nevezőjéből jön, még akkor is, ha <M t="a < b" />!
        </Warn>
        <Warn>
          <strong>3. Rossz tengelyre írt vezéregyenes:</strong> ha a fókuszok az <M t="y" />-tengelyen vannak (pl.{' '}
          <M t="(0;\,\pm c)" />), akkor a vezéregyenesek vízszintesek (<M t="y = \pm a/e" />), nem <M t="x = \pm a/e" />!
        </Warn>
        <Warn>
          <strong>4. Nem egymáshoz tartozó fókusz és vezéregyenes párosítása:</strong> a <M t="PF_2 = e\cdot PD_2" />{' '}
          egyenlőségben az <M t="F_2(+c;\,0)" /> fókuszhoz mindig az azonos oldali <M t="x = +a/e" /> vezéregyenes
          tartozik, soha nem a túloldali <M t="x = -a/e" />.
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Add meg a <M t="\dfrac{y^2}{4} - \dfrac{x^2}{12} = 1" /> hiperbola excentricitását és vezéregyeneseit!</>}>
          <p>
            A pozitív tag az <M t="y^2" />-es, tehát <M t="a^2 = 4 \Rightarrow a = 2" />, <M t="b^2 = 12" />, és a
            fókuszok az <M t="y" />-tengelyen vannak. <M t="c = \sqrt{4 + 12} = 4" />, így <M t="e = \dfrac{4}{2} = 2" />.
            Vezéregyenesek: <M t="y = \pm \dfrac{a}{e} = \pm 1" />.
          </p>
        </Task>
        <Task n={14} q={<>Egy kúpszeletnél <M t="c = 5" /> és az egyik vezéregyenes <M t="x = 5" />. Létezik ilyen nem elfajult kúpszelet?</>}>
          <p>
            Ha <M t="c = a/e = 5" />, akkor <M t="ae = c = a/e \Rightarrow e^2 = 1 \Rightarrow e = 1" />, ami{' '}
            <M t="a = 5" />-öt adna — de ekkor a fókusz <em>ráesne</em> a vezéregyenesre! Nem elfajult kúpszeletnél a
            fókusz sosem eshet a saját vezéregyenesére (<M t="c \neq a/e" />).
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

        <Task n={15} q={<>Határozd meg a <M t="4x^2 + 9y^2 = 36" /> ellipszis excentricitását, fókuszait és vezéregyeneseit!</>}>
          <p>
            36-tal osztva <M t="\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1" />, tehát <M t="a = 3, b = 2" />,{' '}
            <M t="c = \sqrt{9 - 4} = \sqrt{5}" />. Excentricitás: <M t="e = \dfrac{\sqrt{5}}{3} \approx 0{,}745" />.
            Fókuszok: <M t="(\pm\sqrt{5};\,0)" />. Vezéregyenesek: <M t="x = \pm \dfrac{9}{\sqrt{5}} = \pm\dfrac{9\sqrt{5}}{5}" />.
          </p>
        </Task>

        <Task n={16} q={<>Határozd meg a <M t="4x^2 - 5y^2 = 20" /> hiperbola excentricitását, fókuszait és vezéregyeneseit!</>}>
          <p>
            20-szal osztva <M t="\dfrac{x^2}{5} - \dfrac{y^2}{4} = 1" />, tehát <M t="a = \sqrt{5}, b = 2" />,{' '}
            <M t="c = \sqrt{5 + 4} = 3" />. Excentricitás: <M t="e = \dfrac{3}{\sqrt{5}} = \dfrac{3\sqrt{5}}{5} \approx 1{,}342" />.
            Fókuszok: <M t="(\pm 3;\,0)" />. Vezéregyenesek: <M t="x = \pm \dfrac{a^2}{c} = \pm \dfrac{5}{3}" />.
          </p>
        </Task>

        <Task n={17} q={<>Írd fel annak az origó középpontú ellipszisnek az egyenletét, amelynek csúcsai <M t="(\pm 10;\,0)" />, excentricitása pedig <M t="e = 0{,}6" />!</>}>
          <p>
            <M t="a = 10" />, <M t="c = a e = 6" />, így <M t="b^2 = a^2 - c^2 = 100 - 36 = 64" /> (<M t="b = 8" />).
            Egyenlet: <M t="\dfrac{x^2}{100} + \dfrac{y^2}{64} = 1" />.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Írd fel annak az origó középpontú hiperbolának az egyenletét, amelynek fókuszai <M t="(0;\,\pm 10)" />, excentricitása pedig <M t="e = \tfrac{5}{4}" />!</>}>
          <p>
            A fókuszok az <M t="y" />-tengelyen vannak, <M t="c = 10" />. Mivel <M t="e = c/a" />, ezért{' '}
            <M t="a = \dfrac{10}{5/4} = 8" />, és <M t="b^2 = c^2 - a^2 = 100 - 64 = 36" />. Az egyenlet:{' '}
            <M t="\dfrac{y^2}{64} - \dfrac{x^2}{36} = 1" />.
          </p>
        </Task>

        <Task
          n={19}
          q={
            <>
              Egy origó középpontú ellipszis egyik fókusza <M t="F_2(2;\,0)" />, a hozzá tartozó vezéregyenes pedig{' '}
              <M t="x = 8" />. Határozd meg az excentricitását és a normálegyenletét!
            </>
          }
        >
          <p>
            <M t="c = 2" /> és <M t="\dfrac{a}{e} = 8 \Rightarrow a = 8e" />. Innen{' '}
            <M t="e = \dfrac{c}{a} = \dfrac{2}{8e} \Rightarrow e^2 = \dfrac{1}{4} \Rightarrow e = 0{,}5" />. Ekkor{' '}
            <M t="a = 4" />, <M t="b^2 = a^2 - c^2 = 16 - 4 = 12" />. Egyenlet:{' '}
            <M t="\dfrac{x^2}{16} + \dfrac{y^2}{12} = 1" />.
          </p>
        </Task>

        <Task
          n={20}
          q={
            <>
              Egy eltolt ellipszis nagytengelyének végpontjai <M t="(2;\,-1)" /> és <M t="(2;\,9)" />, kistengelyének
              hossza pedig 6. Add meg a középpontját, egyenletét, excentricitását, fókuszait és vezéregyeneseit!
            </>
          }
        >
          <p>
            Középpont a felezőpont: <M t="O(2;\,4)" />. A nagytengely függőleges, <M t="a = \tfrac{9-(-1)}{2} = 5" />,
            <M t="b = 3" />, így <M t="c = \sqrt{25 - 9} = 4" /> és <M t="e = \dfrac{4}{5} = 0{,}8" />.
          </p>
          <p>
            Egyenlet: <M t="\dfrac{(x-2)^2}{9} + \dfrac{(y-4)^2}{25} = 1" />. Fókuszok: <M t="(2;\,4 \pm 4)" />, azaz{' '}
            <M t="(2;\,0)" /> és <M t="(2;\,8)" />. Vezéregyenesek: <M t="y = 4 \pm \dfrac{a}{e} = 4 \pm 6{,}25" />,
            vagyis <M t="y = -2{,}25" /> és <M t="y = 10{,}25" />.
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Írd fel a <M t="PF = e \cdot PD" /> definícióból annak a kúpszeletnek az egyenletét, amelynek fókusza{' '}
              <M t="F(1;\,0)" />, vezéregyenese <M t="x = 4" />, excentricitása pedig <M t="e = \dfrac{1}{2}" />! Milyen
              görbe, és hol van a középpontja?
            </>
          }
        >
          <p>
            <M t="\sqrt{(x-1)^2 + y^2} = \dfrac{1}{2}|x - 4|" />. Négyzetre emelve és 4-gyel szorozva:
            <M block t="4(x^2 - 2x + 1 + y^2) = x^2 - 8x + 16 \ \Longrightarrow\ 3x^2 + 4y^2 = 12 \ \Longrightarrow\ \frac{x^2}{4} + \frac{y^2}{3} = 1." />
            Ez éppen egy origó középpontú ellipszis (<M t="a = 2, b = \sqrt{3}, c = 1, e = 0{,}5" />)!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Egy hiperbola és a konjugált hiperbolája (<M t="\tfrac{x^2}{a^2}-\tfrac{y^2}{b^2}=1" /> és{' '}
              <M t="\tfrac{y^2}{b^2}-\tfrac{x^2}{a^2}=1" />) excentricitásai <M t="e_1" /> és <M t="e_2" />. Bizonyítsd
              be, hogy <M t="\dfrac{1}{e_1^2} + \dfrac{1}{e_2^2} = 1" />!
            </>
          }
        >
          <p>
            Mindkét hiperbola közös fókusztávolsága <M t="c = \sqrt{a^2 + b^2}" />, ezért <M t="e_1 = c/a" /> és{' '}
            <M t="e_2 = c/b" />. A négyzetek reciprokait összeadva:
            <M block t="\frac{1}{e_1^2} + \frac{1}{e_2^2} = \frac{a^2}{c^2} + \frac{b^2}{c^2} = \frac{a^2 + b^2}{a^2 + b^2} = 1." />
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Egy exoplanéta ellipszispályájának excentricitása <M t="e" />, a csillag az <M t="F_2" /> fókuszban van.
              Mutasd meg, hogy a bolygó pontosan a kistengely végpontjaiban van <M t="a" /> távolságra a csillagtól, és a
              két fókuszból ide húzott szakaszok által bezárt <M t="\varphi" /> szögre{' '}
              <M t="\sin\left(\dfrac{\varphi}{2}\right) = e" />!
            </>
          }
        >
          <p>
            A kistengely felső végpontja <M t="B(0;\,b)" />. Távolsága az <M t="F_2(c;\,0)" /> fókusztól:{' '}
            <M t="BF_2 = \sqrt{c^2 + b^2} = \sqrt{a^2} = a" />. A szimmetria miatt <M t="BF_1 = a" /> is igaz, az{' '}
            <M t="OBF_2" /> derékszögű háromszögben pedig a <M t="B" /> csúcsnál lévő szög éppen <M t="\varphi/2" />. Így
            <M block t="\sin\left(\frac{\varphi}{2}\right) = \frac{OF_2}{BF_2} = \frac{c}{a} = e." />
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Milyen típusú kúpszeletet ad a <M t="PF = 1{,}4 \cdot PD" /> fókusz–direktrix egyenlet?
            </>
          }
          options={[
            { label: 'Hiperbolát', ok: true },
            { label: 'Ellipszist' },
            { label: 'Parabolát' },
            { label: 'Kört' },
          ]}
          explain={
            <>
              Mivel <M t="e = 1{,}4 > 1" />, a pontok mértani helye <strong>hiperbola</strong>.
            </>
          }
        />
      </>
    ),
  },
];
