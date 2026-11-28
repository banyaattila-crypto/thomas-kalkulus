import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CentralForcePlane3DWidget,
  HohmannTransferWidget,
  KeplerSecondLawWidget,
  KeplerSummaryMapDiagram,
  KeplerThirdLawWidget,
  OrbitConicTypesWidget,
  PolarBasisVectorsWidget,
  SatelliteOrbitsWidget,
} from '../components/Widgets136';
import type { Page } from './s1_1';

export const S13_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Polárkoordinátás egységvektorok (u_r és u_θ)',
    body: (
      <>
        <Story>
          <p>
            A 13. fejezet záróakkordjaként megcsodálhatjuk a tudománytörténet egyik legnagyobb diadalát: hogyan
            következik <strong>Kepler mindhárom bolygómozgási törvénye</strong> pusztán Newton gravitációs
            törvényéből és néhány sor vektorkalkulusból! Ehhez a legjobb eszköz a polárkoordinátás mozgó bázis.
          </p>
        </Story>

        <Def title="Mozgó polárbázis, sebesség és gyorsulás">
          <p>
            A sík minden pontjában bevezetjük a sugárirányú <M t="\mathbf{u}_r" /> és az erre merőleges{' '}
            <M t="\mathbf{u}_\theta" /> egységvektort:
          </p>
          <M block t="\mathbf{u}_r = (\cos\theta)\,\mathbf{i} + (\sin\theta)\,\mathbf{j}, \qquad \mathbf{u}_\theta = (-\sin\theta)\,\mathbf{i} + (\cos\theta)\,\mathbf{j}." />
          <p>
            Deriváltjaik gyönyörűen egyszerűek: <M t="\frac{d\mathbf{u}_r}{d\theta} = \mathbf{u}_\theta" /> és{' '}
            <M t="\frac{d\mathbf{u}_\theta}{d\theta} = -\mathbf{u}_r" />. Az <M t="\mathbf{r} = r\,\mathbf{u}_r" />{' '}
            helyvektort kétszer deriválva (ponttal jelölve az időderiváltat):
          </p>
          <M block t="\mathbf{v} = \dot{r}\,\mathbf{u}_r + r\dot{\theta}\,\mathbf{u}_\theta, \qquad \mathbf{a} = (\ddot{r} - r\dot{\theta}^2)\,\mathbf{u}_r + (r\ddot{\theta} + 2\dot{r}\dot{\theta})\,\mathbf{u}_\theta." />
        </Def>

        <PolarBasisVectorsWidget />

        <Task n={1} q={<>Írd fel <M t="\mathbf{u}_r" /> és <M t="\mathbf{u}_\theta" /> komponenseit <M t="\theta = \frac{\pi}{3}" />-nál, és ellenőrizd, hogy merőlegesek!</>}>
          <p>
            <M t="\mathbf{u}_r = \big\langle \frac{1}{2},\; \frac{\sqrt{3}}{2} \big\rangle" />,{' '}
            <M t="\mathbf{u}_\theta = \big\langle -\frac{\sqrt{3}}{2},\; \frac{1}{2} \big\rangle" />. Skalárszorzatuk:{' '}
            <M t="-\frac{\sqrt{3}}{4} + \frac{\sqrt{3}}{4} = 0" />!
          </p>
        </Task>

        <Task n={2} q={<>Egyenletes körmozgásnál (<M t="r = R" /> állandó, <M t="\dot{\theta} = \omega" /> állandó) mit ad a polár gyorsulásképlet?</>}>
          <p>
            Mivel <M t="\dot{r} = \ddot{r} = \ddot{\theta} = 0" />, marad{' '}
            <M t="\mathbf{a} = -R\omega^2\,\mathbf{u}_r" /> — pontosan a középpont felé mutató centripetális
            gyorsulás!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Centrális erőtér és a síkbeli mozgás tétele',
    body: (
      <>
        <p>
          Newton gravitációs törvénye szerint a Nap (<M t="M" /> tömeg) által az <M t="m" /> tömegű bolygóra kifejtett
          erő mindig pontosan a Nap felé mutat (<M t="-\mathbf{u}_r" /> irányú):
        </p>
        <M block t="m\mathbf{a} = -\frac{GMm}{r^2}\,\mathbf{u}_r \quad\Longrightarrow\quad \mathbf{a} = -\frac{GM}{r^2}\,\mathbf{u}_r." />

        <Def title="Az impulzusmomentum (r × v) megmaradása">
          <p>
            Mivel <M t="\mathbf{a}" /> párhuzamos <M t="\mathbf{r}" />-rel, keresztszorzatuk nulla! A 13.1 fejezet
            22. feladatából:
          </p>
          <M block t="\frac{d}{dt}(\mathbf{r} \times \mathbf{v}) = \mathbf{v}\times\mathbf{v} + \mathbf{r}\times\mathbf{a} = \mathbf{0} \quad\Longrightarrow\quad \mathbf{r}(t) \times \mathbf{v}(t) = \mathbf{h} \text{ (állandó vektor!)}" />
          <p>
            Mivel <M t="\mathbf{r}(t)\cdot\mathbf{h} = 0" /> minden <M t="t" />-re, a bolygó{' '}
            <strong>örökre egyetlen, az origón átmenő, <M t="\mathbf{h}" />-ra merőleges síkban marad</strong>!
          </p>
        </Def>

        <CentralForcePlane3DWidget />

        <Quiz
          q={<>Miért marad minden bolygó és műhold pályája egyetlen rögzített síkban (egy ideális kéttest-problémában)?</>}
          options={[
            { label: <>Mert a sebessége állandó vektor</> },
            { label: <>Mert a gravitációs erő centrális, így <M t="\mathbf{r}\times\mathbf{v} = \mathbf{h}" /> állandó, és <M t="\mathbf{r}\perp\mathbf{h}" /></>, ok: true },
            { label: <>Mert a gyorsulása nulla</> },
            { label: <>Csak körpálya esetén marad síkban</> },
          ]}
          explain={
            <>
              Centrális erőnél <M t="\mathbf{r}\times\mathbf{a}=\mathbf{0}" />, ezért <M t="\mathbf{h}=\mathbf{r}\times\mathbf{v}" />{' '}
              állandó normálvektora a pályasíknak.
            </>
          }
        />

        <Task n={3} q={<>Mutasd meg, hogy a polár gyorsulás <M t="\mathbf{u}_\theta" />-komponense (<M t="r\ddot{\theta} + 2\dot{r}\dot{\theta} = 0" />) pontosan ekvivalens az <M t="r^2\dot{\theta} = \text{állandó}" /> megmaradással!</>}>
          <p>
            Szorozzuk meg az egyenletet <M t="r" />-rel:{' '}
            <M t="r^2\ddot{\theta} + 2r\dot{r}\dot{\theta} = \frac{d}{dt}(r^2\dot{\theta}) = 0 \Rightarrow r^2\dot{\theta} = |\mathbf{h}| = \text{áll.}" />!
          </p>
        </Task>

        <Task n={4} q={<>A pálya legközelebbi pontjában (perihélium) <M t="\dot{r} = 0" />, <M t="r = r_0" /> és a sebesség <M t="v_0" />. Mennyi itt <M t="|\mathbf{h}|" />?</>}>
          <p>
            Mivel a perihéliumban <M t="\mathbf{r}_0 \perp \mathbf{v}_0" />,{' '}
            <M t="|\mathbf{h}| = |\mathbf{r}_0 \times \mathbf{v}_0| = r_0 v_0" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Kepler második törvénye (a területek törvénye)',
    body: (
      <>
        <p>
          A 10.7 fejezetben láttuk, hogy polárkoordinátákban a vezérsugár által súrolt terület differenciálja{' '}
          <M t="dA = \frac{1}{2}r^2\,d\theta" />. Osszuk el ezt <M t="dt" />-vel, és vessük össze a 2. oldal{' '}
          <M t="r^2\dot{\theta} = |\mathbf{h}|" /> eredményével!
        </p>

        <Def title="Kepler II. törvénye (területek törvénye)">
          <M block t="\frac{dA}{dt} = \frac{1}{2}r^2\dot{\theta} = \frac{|\mathbf{h}|}{2} = \text{állandó}." />
          <p>
            A Napot a bolygóval összekötő vezérsugár <strong>egyenlő idők alatt egyenlő területeket súrol</strong>!
            Ennek azonnali következménye, hogy a perihéliumban (<M t="r_{\min}" />) és az aféliumban (<M t="r_{\max}" />):
          </p>
          <M block t="r_{\min} v_{\max} = r_{\max} v_{\min} \quad\Longrightarrow\quad \frac{v_{\max}}{v_{\min}} = \frac{r_{\max}}{r_{\min}} = \frac{1 + e}{1 - e}." />
        </Def>

        <KeplerSecondLawWidget />

        <Task n={5} q={<>Egy bolygó ellipszispályájának excentricitása <M t="e = 0{,}5" />. Hányszor gyorsabb a perihéliumban, mint az aféliumban?</>}>
          <p>
            <M t="\frac{v_{\max}}{v_{\min}} = \frac{1 + 0{,}5}{1 - 0{,}5} = \frac{1{,}5}{0{,}5} = 3" /> — háromszor
            gyorsabb napközelben!
          </p>
        </Task>

        <Task n={6} q={<>A Halley-üstökös pályájának excentricitása <M t="e \approx 0{,}97" />. Körülbelül hányszor gyorsabb napközelben, mint naptávolban?</>}>
          <p>
            <M t="\frac{1 + 0{,}97}{1 - 0{,}97} = \frac{1{,}97}{0{,}03} \approx 65{,}7" />-szer gyorsabb! (Ezért csak
            rövid ideig látható a Nap közelében, és évtizedekig bolyong a külső Naprendszerben.)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Kepler első törvénye és a kozmikus sebességek',
    body: (
      <>
        <p>
          Ha a <M t="\dot{\mathbf{v}} = -\frac{GM}{r^2}\mathbf{u}_r" /> egyenletet keresztszorozzuk az állandó{' '}
          <M t="\mathbf{h} = r^2\dot{\theta}\,\mathbf{k}" /> vektorral, kapjuk, hogy{' '}
          <M t="\frac{d}{dt}(\mathbf{v}\times\mathbf{h}) = GM\frac{d\mathbf{u}_r}{dt}" />! Integrálva és{' '}
          <M t="\mathbf{r}" />-rel skalárszorozva pontosan a 10.8 fejezet polár kúpszelet-egyenlete ugrik ki!
        </p>

        <Def title="Kepler I. törvénye és a pálya típusa">
          <M block t="r(\theta) = \frac{r_0^2 v_0^2 / (GM)}{1 + e\cos\theta} = \frac{a(1 - e^2)}{1 + e\cos\theta}, \qquad e = \frac{r_0 v_0^2}{GM} - 1." />
          <ul>
            <li><strong>Körpálya (<M t="e = 0" />):</strong> <M t="v_{\text{kör}} = \sqrt{\dfrac{GM}{r_0}}" /> (1. kozmikus sebesség).</li>
            <li><strong>Ellipszis (<M t="0 < e < 1" />):</strong> zárt, periodikus bolygó- vagy műholdpálya.</li>
            <li><strong>Parabola (<M t="e = 1" />):</strong> <M t="v_{\text{sz}} = \sqrt{\dfrac{2GM}{r_0}} = \sqrt{2}\,v_{\text{kör}}" /> (2. kozmikus / szökési sebesség).</li>
            <li><strong>Hiperbola (<M t="e > 1" />):</strong> egyszeri áthaladás (csillagközi üstökösök, hintamanőver).</li>
          </ul>
        </Def>

        <OrbitConicTypesWidget />

        <Task n={7} q={<>Egy műhold Föld-középponttól mért legkisebb távolsága <M t="r_{\min} = 7000\text{ km}" />, legnagyobb távolsága <M t="r_{\max} = 21000\text{ km}" />. Mennyi a félnagytengely (<M t="a" />) és az excentricitás (<M t="e" />)?</>}>
          <p>
            <M t="a = \frac{r_{\min} + r_{\max}}{2} = 14000\text{ km}" />,{' '}
            <M t="e = \frac{r_{\max} - r_{\min}}{r_{\max} + r_{\min}} = \frac{14000}{28000} = 0{,}5" />.
          </p>
        </Task>

        <Task n={8} q={<>A Föld felszínén az első kozmikus sebesség <M t="v_{\text{kör}} \approx 7{,}91\text{ km/s}" />. Mennyi a szökési (második kozmikus) sebesség?</>}>
          <p>
            <M t="v_{\text{sz}} = \sqrt{2}\,v_{\text{kör}} \approx 1{,}414 \cdot 7{,}91 \approx 11{,}19\text{ km/s}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Kepler harmadik törvénye (T² / a³ = állandó)',
    body: (
      <>
        <p>
          Egy ellipszis teljes területe <M t="A = \pi ab = \pi a^2\sqrt{1 - e^2}" />. Mivel Kepler II. törvénye szerint
          a terület állandó <M t="\frac{|\mathbf{h}|}{2}" /> sebességgel telik meg, a teljes <M t="T" /> keringési idő
          egyszerűen <M t="T = \frac{A}{|\mathbf{h}|/2}" />. Négyzetre emelve és behelyettesítve a{' '}
          <M t="|\mathbf{h}|^2 = GMa(1-e^2)" /> összefüggést:
        </p>

        <Def title="Kepler III. törvénye (a periódusok törvénye)">
          <M block t="\frac{T^2}{a^3} = \frac{4\pi^2}{GM}." />
          <p>
            A <M t="T^2/a^3" /> arány <strong>csak a központi égitest <M t="M" /> tömegétől függ</strong>, a bolygó
            tömegétől és a pálya excentricitásától egyáltalán nem! Ha a Naprendszerben <M t="a" />-t csillagászati
            egységben (CSE), <M t="T" />-t földi évben mérjük, akkor egyszerűen <M t="T^2 = a^3" />!
          </p>
        </Def>

        <KeplerThirdLawWidget />

        <Quiz
          q={<>Egy bolygó félnagytengelye pontosan 4-szerese a Földének (<M t="a = 4\text{ CSE}" />). Hány földi év a keringési ideje?</>}
          options={[
            { label: <M t="2\text{ év}" /> },
            { label: <M t="4\text{ év}" /> },
            { label: <M t="8\text{ év}" />, ok: true },
            { label: <M t="16\text{ év}" /> },
          ]}
          explain={
            <>
              <M t="T^2 = a^3 = 4^3 = 64 \Rightarrow T = \sqrt{64} = 8\text{ év}" />!
            </>
          }
        />

        <Task n={9} q={<>Egy kisbolygó keringési ideje a Nap körül <M t="T = 27\text{ év}" />. Mekkora a pályája félnagytengelye CSE-ben?</>}>
          <p>
            <M t="a^3 = T^2 = 27^2 = 729 \Rightarrow a = 27^{2/3} = 3^2 = 9\text{ CSE}" />.
          </p>
        </Task>

        <Task n={10} q={<>Hogyan „mérjük meg” egy távoli csillag vagy a Jupiter tömegét Kepler III. törvényével?</>}>
          <p>
            Megmérjük egy körülötte keringő hold (vagy exobolygó) <M t="a" /> pályasugarát és <M t="T" /> keringési
            idejét, majd kifejezzük <M t="M" />-et: <M t="M = \dfrac{4\pi^2 a^3}{G T^2}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Műholdpályák és a geostacionárius pálya',
    body: (
      <>
        <p>
          Kepler törvényei pontosan ugyanúgy érvényesek a Föld körül keringő műholdakra is — csak a központi tömeg
          a Föld tömege (<M t="GM_\oplus \approx 3{,}986 \times 10^{14}\text{ m}^3/\text{s}^2" />, sugara{' '}
          <M t="R_\oplus \approx 6371\text{ km}" />).
        </p>

        <SatelliteOrbitsWidget />

        <Steps
          title="A geostacionárius műhold magasságának kiszámítása"
          problem={
            <>
              Milyen magasan a Föld felszíne fölött kell keringenie egy távközlési műholdnak az Egyenlítő síkjában,
              hogy mindig pontosan ugyanazon pont fölött „lebegjen” (<M t="T = 24\text{ óra} = 86\,400\text{ s}" />)?
            </>
          }
          steps={[
            {
              title: 'Fejezzük ki a pályasugarat Kepler III. törvényéből',
              body: <M t="r^3 = \dfrac{GM_\oplus T^2}{4\pi^2}." />,
            },
            {
              title: 'Helyettesítsük be az adatokat',
              body: (
                <>
                  <M t="r^3 = \dfrac{3{,}986\times 10^{14} \cdot (8{,}64\times 10^4)^2}{39{,}478} \approx 7{,}537 \times 10^{22}\text{ m}^3" />.
                </>
              ),
            },
            {
              title: 'Vonjunk köbgyököt',
              body: <M t="r \approx 4{,}224 \times 10^7\text{ m} = 42\,240\text{ km}." />,
            },
            {
              title: 'Vonjuk ki a Föld sugarát',
              body: (
                <>
                  <M t="h = r - R_\oplus \approx 42\,240 - 6\,371 = 35\,869\text{ km} \approx 35\,870\text{ km}" />!
                  (Pontosabban sziderikus nappal, <M t="86\,164\text{ s}" />-mal: <M t="h \approx 35\,786\text{ km}" />.)
                </>
              ),
            },
          ]}
        />

        <Task n={11} q={<>Egy műhold a Föld középpontjától <M t="r_1" /> távolságban 2 óra alatt kerüli meg a Földet. Mennyi a keringési ideje egy másik műholdnak <M t="r_2 = 4r_1" /> sugarú körpályán?</>}>
          <p>
            <M t="T_2 = T_1 \cdot (r_2/r_1)^{3/2} = 2 \cdot 4^{3/2} = 2 \cdot 8 = 16\text{ óra}" />.
          </p>
        </Task>

        <Task n={12} q={<>Miért halad lassabban egy geostacionárius műhold (<M t="3{,}07\text{ km/s}" />), mint a sokkal közelebbi ISS (<M t="7{,}67\text{ km/s}" />)?</>}>
          <p>
            Mert körpályán <M t="v = \sqrt{GM/r}" />: nagyobb sugárnál gyengébb a gravitációs vonzás, ezért kisebb
            sebesség is elég a körpályán maradáshoz!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Vis-viva egyenlet és Hohmann-átmeneti pálya',
    body: (
      <>
        <p>
          Az űrhajózás egyik legfontosabb munkaegyenlete az energiamegmaradásból következő{' '}
          <strong>vis-viva egyenlet</strong>, amely azonnal megadja egy műhold sebességét a pálya bármely pontjában!
        </p>

        <Def title="A vis-viva egyenlet">
          <M block t="v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)." />
          <p>
            Körpályán (<M t="a = r" />) visszakapjuk <M t="v^2 = GM/r" />-t; parabolapályán (<M t="a \to \infty" />)
            pedig a szökési sebességet: <M t="v^2 = 2GM/r" />!
          </p>
        </Def>

        <HohmannTransferWidget />

        <Warn>
          Az űrben a „gyorsítás” ellentmondásosan működik: ha egy körpályán lévő űrhajó előrefelé gyorsít (
          <M t="\Delta v_1" />), ellipszispályán <em>magasabbra</em> emelkedik, ahol végül <strong>lassabban</strong>{' '}
          fog keringeni! Ez a kétlépcsős <strong>Hohmann-átmenet</strong> a legüzemanyag-takarékosabb út két körpálya
          között.
        </Warn>

        <Quiz
          q={<>Hányszorosa egy adott <M t="r" /> magasságban a szökési sebesség (<M t="v_{\text{sz}}" />) a körpálya sebességének (<M t="v_{\text{kör}}" />)?</>}
          options={[
            { label: <M t="2\text{-szerese}" /> },
            { label: <M t="\sqrt{2}\text{-szerese}" />, ok: true },
            { label: <M t="\pi\text{-szerese}" /> },
            { label: <>Azonosak</> },
          ]}
          explain={
            <>
              <M t="v_{\text{sz}} = \sqrt{2GM/r} = \sqrt{2}\sqrt{GM/r} = \sqrt{2}\,v_{\text{kör}}" />.
            </>
          }
        />

        <Task n={13} q={<>Számítsd ki a Föld (<M t="r_1 = 1\text{ CSE}" />) és a Mars (<M t="r_2 = 1{,}52\text{ CSE}" />) közötti Hohmann-átmeneti repülés idejét!</>}>
          <p>
            Az átmeneti ellipszis félnagytengelye <M t="a = \frac{1 + 1{,}52}{2} = 1{,}26\text{ CSE}" />. Teljes
            keringési ideje <M t="T = 1{,}26^{3/2} \approx 1{,}414\text{ év}" />. A félellipszis ideje:{' '}
            <M t="t = \frac{T}{2} \approx 0{,}707\text{ év} \approx 8{,}5\text{ hónap}" />!
          </p>
        </Task>

        <Task n={14} q={<>Egy műhold körpályán kering <M t="v_{\text{kör}} = 6\text{ km/s}" /> sebességgel. Legalább mekkora <M t="\Delta v" /> gyorsítás kell ugyanott a teljes elszökéshez?</>}>
          <p>
            <M t="\Delta v = v_{\text{sz}} - v_{\text{kör}} = (\sqrt{2} - 1)\cdot 6 \approx 0{,}414 \cdot 6 \approx 2{,}49\text{ km/s}" />.
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
        <KeplerSummaryMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Mennyi <M t="\mathbf{u}_r \times \mathbf{u}_\theta" /> a jobbkezes 3D koordináta-rendszerben?</>}>
          <p>
            <M t="\mathbf{u}_r \times \mathbf{u}_\theta = (\cos^2\theta + \sin^2\theta)\,\mathbf{k} = \mathbf{k}" />.
          </p>
        </Task>

        <Task n={16} q={<>Egy üstökös félnagytengelye <M t="a = 16\text{ CSE}" />. Hány év a keringési ideje a Nap körül?</>}>
          <p>
            <M t="T = 16^{3/2} = 4^3 = 64\text{ év}" />.
          </p>
        </Task>

        <Task n={17} q={<>Egy bolygó keringési ideje <M t="T = 8\text{ év}" />. Mekkora a pályája félnagytengelye?</>}>
          <p>
            <M t="a = 8^{2/3} = 2^2 = 4\text{ CSE}" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Egy műhold perigeumában <M t="r_{\min} = 8000\text{ km}" />, sebessége <M t="v_{\max} = 9\text{ km/s}" />, apogeumában <M t="r_{\max} = 24000\text{ km}" />. Mekkora a sebessége az apogeumban?</>}>
          <p>
            Kepler II. törvénye alapján <M t="r_{\min} v_{\max} = r_{\max} v_{\min}" />, tehát{' '}
            <M t="v_{\min} = \frac{8000 \cdot 9}{24000} = 3\text{ km/s}" />.
          </p>
        </Task>

        <Task n={19} q={<>Egy részecske <M t="r(t) = e^t" />, <M t="\theta(t) = t" /> spirálon mozog. Írd fel <M t="\mathbf{v}(t)" /> és <M t="\mathbf{a}(t)" /> képletét a <M t="\{\mathbf{u}_r, \mathbf{u}_\theta\}" /> bázisban!</>}>
          <p>
            <M t="\dot{r} = \ddot{r} = e^t" />, <M t="\dot{\theta} = 1,\; \ddot{\theta} = 0" />. Így{' '}
            <M t="\mathbf{v} = e^t\mathbf{u}_r + e^t\mathbf{u}_\theta" /> és{' '}
            <M t="\mathbf{a} = (e^t - e^t)\mathbf{u}_r + (0 + 2e^t)\mathbf{u}_\theta = 2e^t\,\mathbf{u}_\theta" />{' '}
            (tisztán érintőirányú gyorsulás!).
          </p>
        </Task>

        <Task n={20} q={<>Egy exobolygó pályáján <M t="r_{\min} = 0{,}8\text{ CSE}" /> és <M t="r_{\max} = 1{,}2\text{ CSE}" />. Határozd meg <M t="a" />, <M t="e" /> és a keringési idő <M t="T" /> értékét (ha a csillag tömege 1 naptömeg)!</>}>
          <p>
            <M t="a = \frac{0{,}8+1{,}2}{2} = 1\text{ CSE}" />, <M t="e = \frac{1{,}2-0{,}8}{2} = 0{,}2" />. Mivel{' '}
            <M t="T" /> csak <M t="a" />-tól függ, <M t="T = 1^{3/2} = 1\text{ év}" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Egy <M t="r_0" /> távolságból érintőlegesen indított szonda ellipszispályán <M t="r_{\max} = 3r_0" /> távolságig jut. Mekkora volt az indítási sebessége <M t="v_{\text{kör}}" /> egységekben?</>}>
          <p>
            <M t="a = \frac{r_0 + 3r_0}{2} = 2r_0" />. A vis-viva egyenletből:{' '}
            <M t="v_0^2 = GM\big(\frac{2}{r_0} - \frac{1}{2r_0}\big) = \frac{3}{2}\frac{GM}{r_0} = \frac{3}{2}v_{\text{kör}}^2" />,
            tehát <M t="v_0 = \sqrt{\frac{3}{2}}\,v_{\text{kör}} \approx 1{,}225\,v_{\text{kör}}" />!
          </p>
        </Task>

        <Task n={22} q={<>A Hold keringési ideje a Föld körül <M t="T_H \approx 27{,}3\text{ nap}" />, átlagos távolsága <M t="a_H \approx 384\,400\text{ km}" />. Becsüld meg Kepler III. törvényéből a geostacionárius pálya sugarát (<M t="T_G = 1\text{ nap}" />)!</>}>
          <p>
            <M t="\frac{a_G^3}{a_H^3} = \frac{1^2}{27{,}3^2} \Rightarrow a_G = \frac{384\,400}{27{,}3^{2/3}} \approx \frac{384\,400}{9{,}07} \approx 42\,380\text{ km}" />{' '}
            — mindössze két sor osztással megkaptuk a pontos geostacionárius sugarat!
          </p>
        </Task>

        <Task n={23} q={<>Mutasd meg, hogy egy ellipszispályán a bolygó teljes fajlagos mechanikai energiája <M t="E = \frac{1}{2}v^2 - \frac{GM}{r} = -\frac{GM}{2a}" /> állandó (és csak a félnagytengelytől függ)!</>}>
          <p>
            A vis-viva egyenletet 2-vel osztva: <M t="\frac{1}{2}v^2 = \frac{GM}{r} - \frac{GM}{2a}" />, átrendezve{' '}
            <M t="\frac{1}{2}v^2 - \frac{GM}{r} = -\frac{GM}{2a}" />! Mivel <M t="E < 0" />, a pálya zárt (kötött);{' '}
            <M t="E = 0" /> esetén parabola (<M t="a\to\infty" />), <M t="E > 0" /> esetén hiperbola.
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q="Hol mozog a legnagyobb pályamenti sebességgel egy ellipszispályán keringő bolygó?"
          options={[
            { label: <>Perihéliumban (napközelben, ahol <M t="r" /> a legkisebb)</>, ok: true },
            { label: 'Aféliumban (naptávolban)' },
            { label: 'A kistengely végpontjaiban' },
            { label: 'Sebessége végig állandó' },
          ]}
          explain={
            <>
              Mivel <M t="r^2\dot{\theta} = r_0 v_0" /> állandó, kisebb <M t="r" /> távolságnál nagyobb szög- és
              pályamenti sebesség szükséges az azonos területi sebességhez.
            </>
          }
        />
      </>
    ),
  },
];
