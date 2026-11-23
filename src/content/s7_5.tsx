import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  CarbonDatingWidget,
  ContinuousInterestWidget,
  DoublingAndDecayWidget,
  ExpChangeLawWidget,
  HalfLifeDecayWidget,
  ModelsMapDiagram,
  NewtonCoolingWidget,
  SemiLogLinearityWidget,
} from '../components/Widgets75';
import type { Page } from './s1_1';

export const S7_5: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Az exponenciális változás törvénye (y′ = ky ⇒ y = y₀eᵏᵗ)',
    body: (
      <>
        <Story>
          <p>
            A természet és a gazdaság tele van olyan folyamatokkal, amelyekben <strong>minél több van valamiből, annál gyorsabban nő — vagy annál gyorsabban fogy</strong>! Több baktérium többet osztódik, nagyobb tőke több kamatot hoz, több radioaktív atomban másodpercenként több bomlik el. Ez mind egyetlen híres differenciálegyenlethez vezet!
          </p>
        </Story>

        <Def title="Az exponenciális változás törvénye">
          <p>Az alábbi kezdetiérték-probléma egyetlen megoldása:</p>
          <M block t="\frac{dy}{dt} = ky, \qquad y(0) = y_0 \qquad\Longleftrightarrow\qquad y(t) \;=\; y_0\,e^{kt}." />
          <ul>
            <li>Ha <M t="k > 0" />: <strong>exponenciális növekedés</strong> (a <M t="k" /> a növekedési ütem).</li>
            <li>Ha <M t="k < 0" />: <strong>exponenciális csökkenés</strong> (bomlási/csökkenési ráta).</li>
          </ul>
        </Def>

        <p>
          <strong>Hogyan vezetjük le (és honnan tudjuk, hogy NINCS más megoldás)?</strong> Először szétválasztással (<M t="y \ne 0" />):
        </p>
        <M block t="\frac{1}{y}\frac{dy}{dt} = k \;\implies\; \int\frac{dy}{y} = \int k\,dt \;\implies\; \ln|y| = kt + C \;\implies\; y = Ae^{kt}." />
        <p>
          A <M t="t=0" /> feltételből <M t="A = y_0" />. <strong>Egyértelműség-bizonyítás:</strong> legyen <M t="y(t)" /> tetszőleges megoldás, és tekintsük a <M t="g(t) = y(t)e^{-kt}" /> függvényt! Deriváltja a szorzatszabállyal: <M t="g'(t) = y'e^{-kt} - kye^{-kt} = (y' - ky)e^{-kt} = 0" />, tehát <M t="g(t)" /> állandó (<M t="g(0) = y_0" />), amiből <M t="y(t) = y_0 e^{kt}" />!
        </p>

        <ExpChangeLawWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Oldd meg a kezdetiérték-feladatot: <M t="\dfrac{dy}{dt} = 0{,}4y" />, <M t="y(0) = 5" />! Mennyi <M t="y(5)" />?
            </>
          }
        >
          <p>
            Azonnal <M t="y(t) = \mathbf{5e^{0{,}4t}}" />, így <M t="y(5) = 5e^{2} \approx \mathbf{36{,}95}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy mennyiségre <M t="y' = -0{,}2y" />, és <M t="y(0) = 100" />. Mekkora a csökkenés sebessége abban a pillanatban, amikor <M t="y = 40" />?
            </>
          }
        >
          <p>
            Ehhez még <M t="t" />-t sem kell kiszámolni! A differenciálegyenletből: <M t="y' = -0{,}2\cdot 40 = \mathbf{-8}" /> egység/időegység!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Populáció, járvány-csökkenés és a 3 lépéses recept',
    body: (
      <>
        <Story>
          <p>
            A legtöbb vizsga- és gyakorlati feladatban nem adják meg közvetlenül a <M t="k" /> állandót, hanem két időpontbeli mérési adatot kapsz! Mindegyik ilyen feladat pontosan ugyanazzal a <strong>3 lépéses recepttel</strong> oldható meg!
          </p>
        </Story>

        <Def title="A 3 lépéses modellezési recept és a duplázódási idő">
          <ol className="steps">
            <li><strong>Rögzítsd <M t="y_0" />-t:</strong> válaszd a kiinduló pillanatot <M t="t = 0" />-nak, ekkor <M t="y(t) = y_0 e^{kt}" />.</li>
            <li><strong>Határozd meg <M t="k" />-t a második adatból (<M t="t_1,\; y_1" />):</strong> <M t="y_1 = y_0 e^{kt_1} \implies k = \dfrac{1}{t_1}\ln\!\left(\dfrac{y_1}{y_0}\right)" />.</li>
            <li><strong>Válaszolj a kérdésre:</strong> számítsd ki <M t="y(t)" />-t, vagy fejezd ki <M t="t" />-t természetes logaritmussal!</li>
          </ol>
          <p>
            <strong>Duplázódási idő (<M t="k > 0" />):</strong> <M t="2y_0 = y_0 e^{kT_2} \implies T_2 = \dfrac{\ln 2}{k}" /> — független <M t="y_0" />-tól!
          </p>
        </Def>

        <DoublingAndDecayWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy baktériumtenyészet 1 000 sejtről indul, és 3 óra alatt 4 000 sejtre nő. Hány sejt lesz 6 óra múlva, és mennyi a duplázódási idő?
            </>
          }
        >
          <p>
            3 óra alatt 4-szeresére (azaz kétszer duplájára!) nő, tehát a duplázódási idő <M t="T_2 = \mathbf{1{,}5\text{ óra}}" />. Újabb 3 óra alatt újra 4-szeresére nő: <M t="y(6) = 4000\cdot 4 = \mathbf{16\,000}" /> sejt! (Képlettel: <M t="k = \frac{\ln 4}{3} \implies y(6) = 1000 e^{2\ln 4} = 16\,000" /> ✓)
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Egy város lakossága évente 2%-kal nő exponenciálisan (<M t="k = 0{,}02" />). Körülbelül hány év alatt duplázódik meg a lakosság (<M t="\ln 2 \approx 0{,}693" />)?
            </>
          }
        >
          <p>
            <M t="T_2 = \dfrac{\ln 2}{0{,}02} \approx \dfrac{0{,}693}{0{,}02} \approx \mathbf{34{,}7\text{ év}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Folytonosan jóváírt kamat (A = A₀eʳᵗ) és a 70-es szabály',
    body: (
      <>
        <Story>
          <p>
            Ha egy bank évente <M t="m" />-szer írja jóvá a kamatot, <M t="t" /> év múlva <M t="A_0(1 + r/m)^{mt}" /> pénzed lesz. Mi történik, ha havonta, naponta, másodpercenként — sőt, <strong>minden egyes pillanatban folytonosan</strong> jóváírják a kamatot? Vajon végtelen sok pénzed lesz? A 7.3-as 4. Tétel megadja a választ!
          </p>
        </Story>

        <Def title="Folytonos kamatozás és a 70-es szabály">
          <M block t="A(t) \;=\; \lim_{m\to\infty} A_0\left(1 + \frac{r}{m}\right)^{mt} \;=\; A_0\,e^{rt}." />
          <ul>
            <li>Itt <M t="A_0" /> a kezdőtőke, <M t="r" /> az éves kamatláb <em>tizedestörtben</em> (pl. <M t="6\% \to r = 0{,}06" />), <M t="t" /> az évek száma.</li>
            <li><strong>A „70-es szabály” (pénzügyi ökölszabály):</strong> a pénz duplázódási ideje <M t="p\%" />-os kamatnál:
              <M block t="T_2 = \frac{\ln 2}{r} \approx \frac{0{,}693}{p/100} \approx \frac{70}{p}\text{ év!}" />
            </li>
          </ul>
        </Def>

        <ContinuousInterestWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Mennyi pénz lesz 8 év múlva 621 dollár befektetéséből 6%-os folytonos kamatozás mellett (Thomas 2. példa, <M t="e^{0{,}48} \approx 1{,}6161" />)?
            </>
          }
        >
          <p>
            <M t="A(8) = 621\,e^{0{,}06\cdot 8} = 621\,e^{0{,}48} \approx \mathbf{1003{,}58\text{ dollár}}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Mekkora <M t="r" /> folytonos kamatláb kell ahhoz, hogy egy befektetés pontosan <strong>10 év alatt megduplázódjon</strong>?
            </>
          }
        >
          <p>
            <M t="e^{10r} = 2 \implies r = \dfrac{\ln 2}{10} \approx \mathbf{0{,}0693 = 6{,}93\%}" /> (pontosan a 70-es szabály: <M t="70/10 = 7\%" />!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Radioaktív bomlás és a felezési idő (T₁/₂ = ln 2 / k)',
    body: (
      <>
        <Story>
          <p>
            A radioaktív izotópok bomlási sebessége arányos a még el nem bomlott atomok számával: <M t="y' = -ky" /> (<M t="k > 0" />). Ebből születik a fizika egyik legismertebb fogalma, a <strong>felezési idő</strong> — amely csodálatos módon teljesen független a minta méretétől!
          </p>
        </Story>

        <Def title="Radioaktív bomlás és felezési idő">
          <M block t="y(t) \;=\; y_0\,e^{-kt} \quad (k > 0), \qquad T_{1/2} \;=\; \frac{\ln 2}{k} \qquad \Longleftrightarrow \qquad y(t) \;=\; y_0\left(\frac{1}{2}\right)^{t / T_{1/2}}." />
          <p>
            <strong>Levezetés:</strong> <M t="\frac{1}{2}y_0 = y_0 e^{-kT_{1/2}} \implies e^{-kT_{1/2}} = \frac{1}{2} \implies -kT_{1/2} = -\ln 2 \implies T_{1/2} = \dfrac{\ln 2}{k}" />.
          </p>
        </Def>

        <HalfLifeDecayWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              A 210-es polóniumizotóp bomlási állandója <M t="k = 5\cdot 10^{-3}\text{ nap}^{-1}" />. Mennyi a felezési ideje (Thomas 4. példa)?
            </>
          }
        >
          <p>
            <M t="T_{1/2} = \dfrac{\ln 2}{5\cdot 10^{-3}} \approx \dfrac{0{,}6931}{0{,}005} \approx \mathbf{138{,}6\text{ nap}}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Egy radioaktív izotóp felezési ideje 8 nap (pl. jód-131). 24 nap elteltével az eredeti 160 mg mintából mennyi marad meg?
            </>
          }
        >
          <p>
            24 nap pontosan <M t="24/8 = 3" /> felezési idő, így <M t="160\cdot\left(\frac{1}{2}\right)^3 = 160/8 = \mathbf{20\text{ mg}}" /> marad meg!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Radiokarbonos (¹⁴C) kormeghatározás',
    body: (
      <>
        <Story>
          <p>
            Honnan tudjuk, hány éves egy fáraó sírjából előkerült fadarab vagy egy őskori barlangfestmény faszénrajza? A légkörben kozmikus sugárzás hatására folyamatosan keletkező radioaktív <strong>szén-14 izotóp</strong> (<M t="T_{1/2} = 5700" /> év) minden élőlényben ugyanabban az arányban van jelen — amíg él! Amint elpusztul, a szén-14 „atomórája” elkezd ketyegni!
          </p>
        </Story>

        <Def title="A karbon-14 kormeghatározás képlete">
          <p>
            Ha egy régészeti leletben az eredeti <M t="^{14}\text{C}" /> mennyiség <M t="p = \dfrac{y}{y_0}" /> hányada maradt meg (<M t="0 < p < 1" />), akkor <M t="k = \dfrac{\ln 2}{5700}" />, és a lelet kora:
          </p>
          <M block t="e^{-kt} = p \;\implies\; t \;=\; -\frac{\ln p}{k} \;=\; -5700\cdot\frac{\ln p}{\ln 2}\;\text{ év.}" />
        </Def>

        <CarbonDatingWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Egy fadarabban az eredeti <M t="^{14}\text{C}" /> szintnél <strong>10%-kal kevesebb</strong> izotóp található (Thomas 5. példa). Hány éves a lelet (<M t="\ln 0{,}9 \approx -0{,}1054,\; \ln 2 \approx 0{,}6931" />)?
            </>
          }
        >
          <p>
            Vigázz: 10%-kal kevesebb = <strong>90% maradt meg</strong> (<M t="p = 0{,}9" />)!
            <M block t="t = -5700\cdot\frac{\ln 0{,}9}{\ln 2} \approx -5700\cdot\frac{-0{,}1054}{0{,}6931} \approx \mathbf{867\text{ év}}." />
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy csontleletben a <M t="^{14}\text{C}" /> arány pontosan az eredeti <strong>egynegyede</strong> (25%). Mennyi idős a lelet számológép nélkül?
            </>
          }
        >
          <p>
            <M t="1/4 = (1/2)^2" />, vagyis pontosan <strong>2 felezési idő</strong> telt el: <M t="2\cdot 5700 = \mathbf{11\,400\text{ év}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Newton hűlési törvénye (H(t) = Hₛ + (H₀ − Hₛ)e⁻ᵏᵗ)',
    body: (
      <>
        <Story>
          <p>
            Egy csésze forró tea az asztalon nem fagy meg <M t="0^\circ\text{C}" />-ra, hanem a szoba hőmérsékletéhez simul hozzá — eleinte gyorsan hűl, majd a szobahőmérséklet közelében egyre lassabban! Newton felismerte, hogy a hűlés üteme pontosan a <strong>test és a környezet hőmérséklet-különbségével</strong> arányos!
          </p>
        </Story>

        <Def title="Newton-féle hűlési törvény">
          <p>Ha a környezet állandó hőmérséklete <M t="H_S" />, a test kezdeti hőmérséklete pedig <M t="H_0" />, akkor:</p>
          <M block t="\frac{dH}{dt} = -k(H - H_S) \qquad\Longleftrightarrow\qquad H(t) \;=\; H_S + (H_0 - H_S)\,e^{-kt} \quad (k > 0)." />
          <p>
            <strong>Levezetés 1 sorban:</strong> legyen <M t="y(t) = H(t) - H_S" /> a többlethőmérséklet! Mivel <M t="H_S" /> állandó, <M t="y' = H' = -ky \implies y(t) = y_0 e^{-kt}" />, amiből azonnal jön a képlet — és <strong>felmelegedésre</strong> (<M t="H_0 < H_S" />) is pontosan ugyanúgy érvényes!
          </p>
        </Def>

        <NewtonCoolingWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Egy <M t="98^\circ\text{C}" />-os főtt tojást <M t="18^\circ\text{C}" />-os vízbe teszünk; 5 perc alatt <M t="38^\circ\text{C}" />-ra hűl. Mennyi idő múlva lesz <M t="23^\circ\text{C}" />-os?
            </>
          }
        >
          <p>
            <M t="H(t) = 18 + 80e^{-kt}" />. Az <M t="5" /> perces adatból: <M t="38 - 18 = 80e^{-5k} \implies e^{-5k} = \frac{1}{4}" /> (tehát 5 percenként <strong>negyedelődik</strong> a hőmérséklet-különbség!).
          </p>
          <p>
            A <M t="23^\circ\text{C}" />-hoz <M t="23 - 18 = 5^\circ\text{C}" /> különbség tartozik: <M t="80 \to 20 \to 5" />, ami pontosan kétszeri negyedelődés, tehát <M t="t = \mathbf{10\text{ perc}}" />!
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy <M t="4^\circ\text{C}" />-os üdítőt kiveszünk a hűtőből egy <M t="24^\circ\text{C}" />-os szobába, és 10 perc alatt <M t="14^\circ\text{C}" />-ra melegszik. Hány fokos lesz 20 perc múlva?
            </>
          }
        >
          <p>
            A hőmérséklet-különbség kezdetben <M t="24 - 4 = 20^\circ\text{C}" />, 10 perc múlva <M t="24 - 14 = 10^\circ\text{C}" /> (feleződött!). Újabb 10 perc múlva újra feleződik (<M t="5^\circ\text{C}" />), tehát <M t="H(20) = 24 - 5 = \mathbf{19^\circ\text{C}}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Öt világ, egy egyenlet — és a féllogaritmikus teszt',
    body: (
      <>
        <Story>
          <p>
            Nézzük meg egyetlen összefoglaló térképen, hogyan alkotnak egy családot a 7.5-ös szakasz modelljei — majd nézd meg a mérnökök és tudósok kedvenc grafikus trükkjét, a <strong>féllogaritmikus ábrázolást</strong>!
          </p>
        </Story>

        <ModelsMapDiagram />

        <p>
          <strong>Honnan tudod mérési adatokból, hogy egy folyamat valóban exponenciális?</strong> Ha <M t="y = y_0 e^{kt}" />, akkor mindkét oldal logaritmusát véve <M t="\ln y = \ln y_0 + kt" /> — ez egy <strong>egyenes</strong>, amelynek meredeksége pontosan <M t="k" />! Ha tehát <M t="(t;\,\ln y)" /> pontpárjaid egy egyenesre illeszkednek, a folyamat biztosan exponenciális!
        </p>

        <SemiLogLinearityWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Egy kísérletben <M t="t=0" />-nál <M t="\ln y = 2" />, <M t="t=4" />-nél pedig <M t="\ln y = 5" />, és a pontok egyenesre illeszkednek. Mi az <M t="y(t)" /> exponenciális függvény képlete?
            </>
          }
        >
          <p>
            A meredekség <M t="k = \dfrac{5 - 2}{4 - 0} = \mathbf{0{,}75}" />, a tengelymetszet <M t="\ln y_0 = 2 \implies y_0 = e^2" />. Tehát <M t="y(t) = \mathbf{e^{2 + 0{,}75t}}" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Miért igaz az exponenciális folyamatokra, hogy egyenlő <M t="\Delta t" /> időközönként mindig <strong>ugyanazzal a szorzóval</strong> változik <M t="y" />?
            </>
          }
        >
          <p>
            Mert <M t="\dfrac{y(t + \Delta t)}{y(t)} = \dfrac{y_0 e^{k(t+\Delta t)}}{y_0 e^{kt}} = e^{k\Delta t}" />, amely csak <M t="\Delta t" />-től függ, <M t="t" />-től egyáltalán nem!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Összefoglalás, buktatók és lépcsőzetes gyakorlófeladatok',
    body: (
      <>
        <Def title="7.5 Puskakártya">
          <ul>
            <li><strong>Alaptörvény:</strong> <M t="y' = ky,\; y(0)=y_0 \iff y(t) = y_0 e^{kt}" /> (<M t="k>0" /> növekedés, <M t="k<0" /> csökkenés).</li>
            <li><strong>Duplázódási / felezési idő:</strong> <M t="T = \dfrac{\ln 2}{|k|}" /> (független <M t="y_0" />-tól!).</li>
            <li><strong>Folytonos kamatozás:</strong> <M t="A(t) = A_0 e^{rt}" /> · 70-es szabály: <M t="T_2 \approx 70/p\%" />.</li>
            <li><strong>Karbon-14 kormeghatározás:</strong> <M t="T_{1/2} = 5700\text{ év} \implies t = -5700\cdot\dfrac{\ln(y/y_0)}{\ln 2}" />.</li>
            <li><strong>Newton-féle hűlés:</strong> <M t="H(t) = H_S + (H_0 - H_S)e^{-kt}" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>5 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>„10%-kal csökkent” ≠ 10% maradt!</strong> Ha valami 10%-kal csökkent, akkor <M t="y = \mathbf{0{,}9}\,y_0" /> maradt meg (nem <M t="0{,}1\,y_0" />)!
            </li>
            <li>
              <strong>Newton-hűlésnél a <M t="H_S" /> környezeti hőmérsékletet MINDIG le kell vonni!</strong> Nem <M t="H = H_0 e^{-kt}" />, hanem <M t="H - H_S = (H_0 - H_S)e^{-kt}" />!
            </li>
            <li>
              <strong>Időegységek összhangja:</strong> ha <M t="k" /> percben van megadva, a <M t="t" />-t is percben (ne órában!) helyettesítsd be!
            </li>
            <li>
              <strong>Kamatláb tizedestörtben:</strong> 6%-os kamatnál <M t="r = \mathbf{0{,}06}" />, nem <M t="6" />!
            </li>
            <li>
              <strong>Előjel-ellenőrzés a végén:</strong> bomlásnál <M t="y(t) < y_0" />, növekedésnél <M t="y(t) > y_0" /> — mindig nézd meg, reális-e a kapott szám!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={
            <>
              Egy baktériumkultúra 500 sejttel indul, és 2 óránként megduplázódik. Hány sejt lesz 10 óra múlva?
            </>
          }
        >
          <p>
            10 óra pontosan <M t="10/2 = 5" /> duplázódás: <M t="500\cdot 2^5 = 500\cdot 32 = \mathbf{16\,000}" /> sejt.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              100 000 Ft-ot teszünk be 5%-os folytonos kamatra 10 évre. Mennyi pénzünk lesz (<M t="e^{0{,}5} \approx 1{,}6487" />)?
            </>
          }
        >
          <p>
            <M t="A(10) = 100\,000\,e^{0{,}05\cdot 10} = 100\,000\,e^{0{,}5} \approx \mathbf{164\,872\text{ Ft}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              A rádium-226 bomlási állandója <M t="k = 4{,}3\cdot 10^{-4}\text{ év}^{-1}" />. Mekkora a felezési ideje (<M t="\ln 2 \approx 0{,}6931" />)?
            </>
          }
        >
          <p>
            <M t="T_{1/2} = \dfrac{0{,}6931}{4{,}3\cdot 10^{-4}} \approx \mathbf{1612\text{ év}}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={18}
          q={
            <>
              Egy 8%-os folytonos kamatozású befektetés hány év alatt <strong>háromszorozódik</strong> meg (<M t="\ln 3 \approx 1{,}0986" />)?
            </>
          }
        >
          <p>
            <M t="3A_0 = A_0 e^{0{,}08t} \implies 0{,}08t = \ln 3 \implies t = \dfrac{1{,}0986}{0{,}08} \approx \mathbf{13{,}73\text{ év}}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Egy <M t="90^\circ\text{C}" />-os csésze kávé egy <M t="20^\circ\text{C}" />-os szobában 10 perc alatt <M t="55^\circ\text{C}" />-ra hűl. Hány perc múlva (a kezdettől számítva) lesz <M t="37{,}5^\circ\text{C}" />-os?
            </>
          }
        >
          <p>
            Kezdeti különbség: <M t="90 - 20 = 70^\circ\text{C}" />. 10 perc után: <M t="55 - 20 = 35^\circ\text{C}" /> (feleződött!). A <M t="37{,}5^\circ\text{C}" />-hoz <M t="17{,}5^\circ\text{C}" /> különbség tartozik (újabb feleződés!), tehát <M t="t = \mathbf{20\text{ perc}}" />!
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Egy csontleletben az eredeti <M t="^{14}\text{C}" /> 60%-a maradt meg. Hány éves a lelet (<M t="\ln 0{,}6 \approx -0{,}5108,\; \ln 2 \approx 0{,}6931" />)?
            </>
          }
        >
          <p>
            <M t="t = -5700\cdot\dfrac{-0{,}5108}{0{,}6931} \approx \mathbf{4201\text{ év}}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={21}
          q={
            <>
              <em>Két tetszőleges adatpont:</em> Egy exponenciálisan növekvő mennyiségre <M t="y(2) = 12" /> és <M t="y(5) = 96" />. Határozd meg <M t="y_0" /> és <M t="k" /> pontos értékét!
            </>
          }
        >
          <p>
            Osszuk el a két egyenletet: <M t="\dfrac{y(5)}{y(2)} = \dfrac{y_0 e^{5k}}{y_0 e^{2k}} = e^{3k} = \dfrac{96}{12} = 8 = 2^3 \implies e^k = 2 \implies k = \mathbf{\ln 2}" />!
          </p>
          <p>
            Visszahelyettesítve: <M t="y(2) = y_0\cdot 2^2 = 12 \implies y_0 = \mathbf{3}" />. Tehát <M t="y(t) = \mathbf{3\cdot 2^t = 3e^{(\ln 2)t}}" />!
          </p>
        </Task>
        <Task
          n={22}
          q={
            <>
              <em>Kriminalisztikai hűlés (időben visszafelé!):</em> Egy <M t="20^\circ\text{C}" />-os szobában délben (<M t="t=0" />) egy test hőmérséklete <M t="30^\circ\text{C}" />, egy órával később (<M t="t=1" />) pedig <M t="25^\circ\text{C}" />. Ha a test normál hőmérséklete <M t="37^\circ\text{C}" /> volt, mikor kezdődött a hűlés (<M t="\ln(1{,}7)/\ln 2 \approx 0{,}77" />)?
            </>
          }
        >
          <p>
            <M t="H(t) = 20 + 10e^{-kt}" />. Mivel <M t="H(1) = 25 \implies 5 = 10e^{-k} \implies k = \ln 2" />. Keressük azt a <M t="t < 0" /> időpontot, amikor <M t="H(t) = 37" />:
            <M block t="37 - 20 = 10\cdot 2^{-t} \implies 2^{-t} = 1{,}7 \implies -t = \frac{\ln 1{,}7}{\ln 2} \approx 0{,}77\text{ óra} \approx 46\text{ perc}." />
            Tehát kb. <strong>11:14-kor</strong> kezdődött a hűlés!
          </p>
        </Task>
        <Task
          n={23}
          q={
            <>
              <em>Időállandó (<M t="\tau = 1/k" />):</em> A fizikában és az elektronikában a felezési idő mellett gyakran használják a <M t="\tau = \dfrac{1}{k}" /> időállandót (<M t="y = y_0 e^{-t/\tau}" />). Mekkora része marad meg a mennyiségnek <M t="t = \tau" /> idő után, és hogyan aránylik <M t="\tau" /> a <M t="T_{1/2}" /> felezési időhöz?
            </>
          }
        >
          <p>
            <M t="t = \tau" /> esetén <M t="y(\tau) = y_0 e^{-1} = \mathbf{\dfrac{1}{e}\,y_0 \approx 36{,}8\%}" /> marad meg (63,2% lecseng). Mivel <M t="T_{1/2} = \frac{\ln 2}{k} = (\ln 2)\tau" />, ezért <M t="\mathbf{\tau = \dfrac{T_{1/2}}{\ln 2} \approx 1{,}443\,T_{1/2}}" />!
          </p>
        </Task>
      </>
    ),
  },
];
