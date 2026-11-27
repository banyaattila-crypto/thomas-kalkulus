import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ClosedIntervalMethodWidget,
  CriticalPointsGalleryWidget,
  DomainExtremaWidget,
  LocalVsGlobalWidget,
  WeierstrassCounterexampleWidget,
} from '../components/Widgets41';
import type { Page } from './s1_1';

export const S4_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Abszolút szélsőértékek: a csúcs és a völgy',
    body: (
      <>
        <Story>
          <p>
            A 4. fejezetben végre learatjuk a 3. fejezet gyümölcseit: a derivált segítségével megtaláljuk egy függvény <strong>legnagyobb és legkisebb értékeit</strong>! Akár egy repülőgép minimális üzemanyag-fogyasztását, akár egy híd maximális terhelését, akár egy doboz legnagyobb térfogatát keressük, minden optimalizálási feladat ugyanarra az alapkérdésre vezethető vissza: <em>hol vannak a függvény szélsőértékei?</em>
          </p>
        </Story>
        <Def title="Abszolút (globális) maximum és minimum">
          <p>
            Legyen <M t="f" /> egy <M t="D" /> tartományon értelmezett függvény, és <M t="c \in D" />.
          </p>
          <ul>
            <li>
              <M t="f(c)" /> az <M t="f" /> függvény <strong>abszolút maximuma</strong> <M t="D" />-n, ha <M t="f(x) \le f(c)" /> minden <M t="x \in D" /> esetén.
            </li>
            <li>
              <M t="f(c)" /> az <M t="f" /> függvény <strong>abszolút minimuma</strong> <M t="D" />-n, ha <M t="f(x) \ge f(c)" /> minden <M t="x \in D" /> esetén.
            </li>
          </ul>
        </Def>
        <p>
          Fontos megfigyelés: az, hogy egy függvénynek van-e abszolút maximuma vagy minimuma, <strong>nemcsak a képletétől, hanem az értelmezési tartományától is függ!</strong> Próbáld ki az alábbi ábrán ugyanazt az <M t="f(x)=x^2" /> parabolát négy különböző tartományon:
        </p>
        <DomainExtremaWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Van-e abszolút maximuma és abszolút minimuma az <M t="f(x)=\sin x" /> függvénynek a teljes <M t="(-\infty;\,\infty)" /> számegyenesen? Ha igen, mennyi és hol veszi fel?
            </>
          }
        >
          <p>
            Igen! Az abszolút maximum <M t="1" /> (minden <M t="x=\frac{\pi}{2}+2k\pi" /> helyen), az abszolút minimum <M t="-1" /> (minden <M t="x=-\frac{\pi}{2}+2k\pi" /> helyen). Egy szélsőértéket tehát <em>több helyen</em> is felvehet egy függvény!
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Mi az <M t="f(x)=2x-1" /> függvény abszolút maximuma és minimuma a <M t="[1;\,4]" /> intervallumon, illetve a <M t="(1;\,4)" /> nyílt intervallumon?
            </>
          }
        >
          <p>
            A <M t="[1;\,4]" /> zárt intervallumon: abszolút minimum <M t="f(1)=1" />, abszolút maximum <M t="f(4)=7" />.
          </p>
          <p>
            A <M t="(1;\,4)" /> nyílt intervallumon: <strong>sem abszolút minimuma, sem abszolút maximuma nincs</strong>, mert a végpontok nem tartoznak a tartományhoz!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A Szélsőérték-tétel (Weierstrass-tétel)',
    body: (
      <>
        <p>
          Mikor lehetünk <strong>100%-ig biztosak</strong> abban, hogy egy függvénynek létezik abszolút maximuma ÉS abszolút minimuma is, mielőtt még keresni kezdenénk? Ezt garantálja az analízis egyik alaptétele:
        </p>
        <Def title="Szélsőérték-tétel (Weierstrass-tétel)">
          <p>
            Ha az <M t="f" /> függvény <strong>folytonos</strong> egy <strong>zárt és korlátos</strong> <M t="[a;\,b]" /> intervallumon, akkor <M t="f" /> az <M t="[a;\,b]" /> intervallumon felveszi mind az abszolút maximumát <M t="M" />, mind az abszolút minimumát <M t="m" />. Vagyis léteznek olyan <M t="x_1, x_2 \in [a;\,b]" /> pontok, amelyekre:
          </p>
          <M block t="f(x_1) = m \;\le\; f(x) \;\le\; M = f(x_2) \qquad (\text{minden } x \in [a;\,b])." />
        </Def>
        <p>
          Mindkét feltétel létfontosságú: ha az intervallum nem zárt, vagy a függvénynek szakadása van rajta, a garancia azonnal megszűnik!
        </p>
        <WeierstrassCounterexampleWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Alkalmazható-e a Szélsőérték-tétel az <M t="f(x)=\dfrac{1}{x}" /> függvényre (a) a <M t="[1;\,5]" /> intervallumon, (b) a <M t="[-1;\,1]" /> intervallumon?
            </>
          }
        >
          <p>
            (a) <strong>Igen</strong>, mert <M t="[1;\,5]" /> zárt, korlátos, és <M t="1/x" /> folytonos rajta (<M t="0 \notin [1;\,5]" />). (Max: <M t="1" />, min: <M t="1/5" />.)
          </p>
          <p>
            (b) <strong>Nem</strong>, mert <M t="x=0" />-nál nem értelmezett (nem folytonos), és valóban nincs sem maximuma, sem minimuma!
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Ha egy függvény <em>nem</em> folytonos egy zárt intervallumon, az azt jelenti, hogy biztosan nincs abszolút szélsőértéke?
            </>
          }
        >
          <p>
            <strong>Nem!</strong> A tétel <em>elégséges</em> feltétel, nem szükséges. Például ha <M t="f(x)=0" /> (<M t="x\ne 0" />) és <M t="f(0)=1" /> a <M t="[-1;\,1]" /> intervallumon, akkor szakadásos, mégis van abszolút maximuma (<M t="1" />) és minimuma (<M t="0" />)!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Lokális szélsőértékek és Fermat tétele',
    body: (
      <>
        <p>
          Ha egy hegyláncon sétálsz, minden egyes dombtető magasabb a közvetlen környékénél — akkor is, ha távolabb van egy még magasabb csúcs. A matematikában ezek a <strong>lokális (helyi) szélsőértékek</strong>!
        </p>
        <Def title="Lokális (helyi) maximum és minimum">
          <p>
            Az <M t="f(c)" /> érték <strong>lokális maximum</strong>, ha létezik a <M t="c" /> pontnak olyan környezete (nyílt intervalluma), amelyben minden <M t="x \in D" />-re <M t="f(x) \le f(c)" />. Hasonlóan <strong>lokális minimum</strong>, ha <M t="c" /> valamely környezetében <M t="f(x) \ge f(c)" />.
          </p>
        </Def>
        <p>
          Mi történik egy <em>sima</em> görbe érintőjével a dombtetőn vagy a völgy alján? A görbe megáll az emelkedésben, mielőtt süllyedni kezdene — az érintője <strong>vízszintes</strong> lesz! Ezt mondja ki a kalkulus egyik leghíresebb tétele:
        </p>
        <Def title="Fermat tétele (első derivált tétel lokális szélsőértékekre)">
          <p>
            Ha az <M t="f" /> függvénynek egy <strong><M t="c" /> belső pontban</strong> lokális maximuma vagy lokális minimuma van, ÉS <M t="f'(c)" /> létezik, akkor:
          </p>
          <M block t="f'(c) = 0." />
        </Def>
        <LocalVsGlobalWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Igaz-e, hogy minden abszolút szélsőérték egyben lokális szélsőérték is? És fordítva?
            </>
          }
        >
          <p>
            <strong>Előre igaz:</strong> ami a teljes tartományon a legnagyobb (vagy legkisebb), az a közvetlen környezetében is az! <strong>Fordítva nem igaz:</strong> egy lokális csúcsnál lehet magasabb pont máshol a tartományon.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Miért szerepel Fermat tételében, hogy <M t="c" /> legyen <strong>belső pont</strong>? Mi lehet a helyzet egy végpontban?
            </>
          }
        >
          <p>
            Egy zárt intervallum végpontjában a függvény simán felvehet maximumot vagy minimumot úgy is, hogy a deriváltja ott nem nulla (pl. <M t="f(x)=x" /> a <M t="[0;\,2]" /> intervallumon: <M t="f'(x)=1\ne 0" />, mégis <M t="x=0" /> minimum, <M t="x=2" /> maximum!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Kritikus pontok: nem csak ott, ahol f′(x) = 0!',
    body: (
      <>
        <p>
          Fermat tétele szerint egy belső pontban két módon lehet szélsőérték: vagy <M t="f'(c)=0" />, vagy pedig <strong>nem létezik <M t="f'(c)" /></strong> (töréspont vagy tüske!). Ezért gyűjtjük össze az összes gyanús belső pontot egyetlen fogalomba:
        </p>
        <Def title="Kritikus pont">
          <p>
            Az <M t="f" /> függvény értelmezési tartományának egy <M t="c" /> belső pontját <strong>kritikus pontnak</strong> nevezzük, ha:
          </p>
          <M block t="f'(c) = 0 \qquad \text{vagy} \qquad f'(c) \text{ nem létezik.}" />
        </Def>
        <p>
          Ez azt jelenti, hogy egy függvénynek <strong>CSAK kétféle helyen lehet szélsőértéke</strong>: a kritikus pontokban és az intervallum végpontjaiban! Viszont vigyázz: <em>nem minden kritikus pont szélsőérték!</em>
        </p>
        <CriticalPointsGalleryWidget />
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Ha <M t="f'(c) = 0" />, akkor biztosan van lokális szélsőértéke az <M t="f" /> függvénynek <M t="c" />-ben?
            </>
          }
          options={[
            { label: <>Nem feltétlenül (ellenpélda: <M t="f(x) = x^3" /> a <M t="0" />-ban)</>, ok: true },
            { label: 'Igen, mindig' },
            { label: <>Csak akkor, ha <M t="f" /> polinom</> },
            { label: <>Igen, ha <M t="c > 0" /></> },
          ]}
          explain={
            <>
              Az <M t="f'(c) = 0" /> szükséges, de nem elégséges feltétel; az <M t="x^3" />-nak vízszintes érintőjű inflexiós pontja van <M t="0" />-ban, szélsőértéke nincs.
            </>
          }
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Keresd meg az <M t="f(x) = x^3 - 12x + 5" /> függvény összes kritikus pontját!
            </>
          }
        >
          <p>
            A derivált mindenütt létezik: <M t="f'(x) = 3x^2 - 12 = 3(x^2-4) = 3(x-2)(x+2)" />.
          </p>
          <p>
            <M t="f'(x)=0 \iff x=-2" /> és <M t="x=2" /> — ez a két kritikus pont!
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Add meg a <M t="g(x) = x^{2/3}(x - 5)" /> függvény összes kritikus pontját!
            </>
          }
        >
          <p>
            Szorozzuk be előbb: <M t="g(x) = x^{5/3} - 5x^{2/3}" />. Deriválva:
          </p>
          <M block t="g'(x) = \frac{5}{3}x^{2/3} - \frac{10}{3}x^{-1/3} = \frac{5(x - 2)}{3x^{1/3}}." />
          <p>
            Két kritikus pont van: <M t="x=2" /> (itt <M t="g'(2)=0" />) ÉS <M t="x=0" /> (itt a nevező <M t="0" />, tehát <M t="g'(0)" /> nem létezik, viszont <M t="g(0)=0" /> értelmezett!).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'A zárt intervallumos módszer (3 lépéses recept)',
    body: (
      <>
        <p>
          A Weierstrass-tétel és a kritikus pontok ismeretében gyerekjáték megtalálni egy folytonos függvény abszolút maximumát és abszolút minimumát egy zárt <M t="[a;\,b]" /> intervallumon!
        </p>
        <Def title="A zárt intervallumos módszer (3 lépés)">
          <ol>
            <li>
              <strong>Kritikus pontok:</strong> keresd meg <M t="f" /> összes kritikus pontját a nyílt <M t="(a;\,b)" /> intervallumon (<M t="f'(x)=0" /> és ahol <M t="f'(x)" /> nem létezik). <em>A tartományon kívül esőket dobd el!</em>
            </li>
            <li>
              <strong>Kiértékelés:</strong> számítsd ki az <strong>eredeti <M t="f(x)" /></strong> értékét minden talált kritikus pontban ÉS a két végpontban (<M t="f(a)" />, <M t="f(b)" />).
            </li>
            <li>
              <strong>Összehasonlítás:</strong> a lista legnagyobb száma az <strong>abszolút maximum</strong>, a legkisebb az <strong>abszolút minimum</strong>!
            </li>
          </ol>
        </Def>
        <ClosedIntervalMethodWidget />
        <Steps
          source="Analízis-labor"
          title="Abszolút szélsőértékek zárt intervallumon"
          problem={
            <>
              Keressük meg az <M t="f(x) = x^3 - 3x^2 - 9x + 5" /> függvény abszolút szélsőértékeit a <M t="[-2;\,4]" /> zárt intervallumon!
            </>
          }
          steps={[
            {
              title: 'Deriválás és szorzattá bontás',
              body: (
                <p>
                  <M t="f'(x) = 3x^2 - 6x - 9 = 3(x - 3)(x + 1)" />.
                </p>
              ),
            },
            {
              title: 'Kritikus pontok szűrése',
              body: (
                <p>
                  <M t="f'(x) = 0 \implies x = -1" /> és <M t="x = 3" /> (mindkettő beleesik a <M t="(-2;\,4)" /> intervallumba).
                </p>
              ),
            },
            {
              title: 'Kiértékelés a kritikus pontokban és a végpontokban',
              body: (
                <p>
                  <M t="f(-2) = 3" />, <M t="f(-1) = 10" />, <M t="f(3) = -22" />, <M t="f(4) = -15" />.
                </p>
              ),
            },
            {
              title: 'Abszolút szélsőértékek leolvasása',
              body: (
                <p>
                  <strong>Abszolút maximum: <M t="10" /></strong> (<M t="x = -1" />-nél), <strong>abszolút minimum: <M t="-22" /></strong> (<M t="x = 3" />-nál).
                </p>
              ),
            },
          ]}
        />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Határozd meg az <M t="f(x) = x^2 - 4x + 5" /> függvény abszolút szélsőértékeit a <M t="[0;\,3]" /> intervallumon!
            </>
          }
        >
          <p>
            1) <M t="f'(x) = 2x - 4 = 0 \Rightarrow x = 2 \in (0;\,3)" />.
          </p>
          <p>
            2) Jelöltek: <M t="f(0)=5" />, <M t="f(2)=1" />, <M t="f(3)=2" />.
          </p>
          <p>
            3) <strong>Abszolút minimum: <M t="1" /></strong> (<M t="x=2" />-nél), <strong>abszolút maximum: <M t="5" /></strong> (<M t="x=0" />-nál).
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Határozd meg az <M t="f(x) = x^{2/3}" /> függvény abszolút szélsőértékeit a <M t="[-2;\,3]" /> intervallumon!
            </>
          }
        >
          <p>
            1) <M t="f'(x)=\dfrac{2}{3x^{1/3}}" /> sosem nulla, de <M t="x=0 \in (-2;\,3)" />-nál nem létezik → kritikus pont: <M t="x=0" />.
          </p>
          <p>
            2) Jelöltek: <M t="f(-2)=\sqrt[3]{4}\approx 1{,}59" />, <M t="f(0)=0" />, <M t="f(3)=\sqrt[3]{9}\approx 2{,}08" />.
          </p>
          <p>
            3) <strong>Abszolút minimum: <M t="0" /></strong> (<M t="x=0" />-nál), <strong>abszolút maximum: <M t="\sqrt[3]{9}" /></strong> (<M t="x=3" />-nál).
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás és a 4 legnagyobb buktató',
    body: (
      <>
        <table className="tbl">
          <thead>
            <tr>
              <th>fogalom / tétel</th>
              <th>lényeg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Szélsőérték-tétel (Weierstrass)</td>
              <td>Folytonos <M t="f" /> a zárt <M t="[a;\,b]" />-n biztosan felvesz abs. max-ot és abs. min-t.</td>
            </tr>
            <tr>
              <td>Fermat tétele</td>
              <td>Belső lokális szélsőértékben, ha <M t="f'(c)" /> létezik, akkor <M t="f'(c)=0" />.</td>
            </tr>
            <tr>
              <td>Kritikus pont</td>
              <td>Belső pont, ahol <M t="f'(c)=0" /> <strong>vagy</strong> <M t="f'(c)" /> nem létezik.</td>
            </tr>
            <tr>
              <td>Zárt intervallumos módszer</td>
              <td>Hasonlítsd össze <M t="f" /> értékeit a kritikus pontokban és a végpontokban (<M t="a, b" />)!</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. A végpontok elfelejtése:</strong> egy zárt <M t="[a;\,b]" /> intervallumon az abszolút maximum vagy minimum nagyon gyakran <em>a végpontban</em> van — sose hagyd ki <M t="f(a)" /> és <M t="f(b)" /> kiszámítását!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A nem létező deriváltú pontok kihagyása:</strong> ne csak az <M t="f'(x)=0" /> egyenletet oldd meg — nézd meg mindig, hol lesz <M t="0" /> a derivált nevezője (pl. gyököknél, törtkitevőknél)!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. <M t="f'(c)=0" /> ≠ biztos szélsőérték:</strong> az <M t="f(x)=x^3" /> függvénynél <M t="f'(0)=0" />, még sincs ott szélsőérték! (Hogyan döntjük el biztosan? Ez jön a 4.3-as első derivált tesztnél!)
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Intervallumon kívüli kritikus pontok:</strong> ha <M t="[0;\,3]" /> a tartomány, és <M t="f'(x)=0" /> gyökei <M t="-2" /> és <M t="1" />, akkor <M t="-2" />-t <strong>ki kell dobni</strong>, mert nincs benne a tartományban!
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Oldd meg az alábbi 9 feladatot növekvő nehézségi sorrendben!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Keresd meg az <M t="f(x)=3x^2 - 12x + 7" /> függvény kritikus pontját, és add meg az abszolút szélsőértékeit a <M t="[0;\,5]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="f'(x)=6x-12=0 \Rightarrow x=2 \in (0;\,5)" />.
          </p>
          <p>
            Értékek: <M t="f(0)=7" />, <M t="f(2)=-5" />, <M t="f(5)=22" />. <strong>Abs. min: <M t="-5" /></strong> (<M t="x=2" />), <strong>abs. max: <M t="22" /></strong> (<M t="x=5" />).
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Határozd meg az <M t="f(x)=4 - |x - 1|" /> függvény kritikus pontját és abszolút szélsőértékeit a <M t="[-2;\,3]" /> intervallumon!
            </>
          }
        >
          <p>
            Az abszolút érték miatt <M t="x=1" /> töréspont (<M t="f'(1)" /> nem létezik) → kritikus pont: <M t="x=1" />.
          </p>
          <p>
            Értékek: <M t="f(-2)=1" />, <M t="f(1)=4" />, <M t="f(3)=2" />. <strong>Abs. max: <M t="4" /></strong> (<M t="x=1" />), <strong>abs. min: <M t="1" /></strong> (<M t="x=-2" />).
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Add meg az <M t="f(x)=x^3 - 3x^2 + 1" /> függvény összes kritikus pontját!
            </>
          }
        >
          <p>
            <M t="f'(x)=3x^2-6x=3x(x-2)=0 \Rightarrow x=0" /> és <M t="x=2" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Határozd meg az <M t="f(x)=x^3 - 3x^2 + 1" /> függvény abszolút maximumát és minimumát a <M t="\left[-\frac{1}{2};\,4\right]" /> intervallumon!
            </>
          }
        >
          <p>
            Mindkét kritikus pont (<M t="x=0" /> és <M t="x=2" />) beleesik az intervallumba.
          </p>
          <p>
            Értékek: <M t="f(-1/2)=\frac{1}{8}" />, <M t="f(0)=1" />, <M t="f(2)=-3" />, <M t="f(4)=17" />.
          </p>
          <p>
            <strong>Abs. min: <M t="-3" /></strong> (<M t="x=2" />), <strong>abs. max: <M t="17" /></strong> (<M t="x=4" />).
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Határozd meg az <M t="f(x)=\dfrac{x}{x^2+1}" /> függvény abszolút szélsőértékeit a <M t="[0;\,2]" /> intervallumon!
            </>
          }
        >
          <p>
            Hányadosszabállyal: <M t="f'(x)=\dfrac{(x^2+1)-2x^2}{(x^2+1)^2}=\dfrac{1-x^2}{(x^2+1)^2}=0 \Rightarrow x=\pm 1" />. Csak <M t="x=1 \in (0;\,2)" />!
          </p>
          <p>
            Értékek: <M t="f(0)=0" />, <M t="f(1)=\dfrac{1}{2}" />, <M t="f(2)=\dfrac{2}{5}=0{,}4" />. <strong>Abs. min: <M t="0" /></strong>, <strong>abs. max: <M t="1/2" /></strong> (<M t="x=1" />).
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Keresd meg az <M t="f(x)=\sin x + \cos x" /> függvény abszolút szélsőértékeit a <M t="\left[0;\,\frac{\pi}{2}\right]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="f'(x)=\cos x - \sin x = 0 \iff \operatorname{tg} x = 1 \Rightarrow x=\dfrac{\pi}{4} \in \left(0;\,\frac{\pi}{2}\right)" />.
          </p>
          <p>
            Értékek: <M t="f(0)=1" />, <M t="f(\pi/4)=\sqrt{2}\approx 1{,}414" />, <M t="f(\pi/2)=1" />. <strong>Abs. max: <M t="\sqrt{2}" /></strong> (<M t="x=\pi/4" />), <strong>abs. min: <M t="1" /></strong> (mindkét végpontban!).
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Határozd meg az <M t="f(x) = x\sqrt{4-x^2}" /> függvény abszolút szélsőértékeit a teljes <M t="[-2;\,2]" /> értelmezési tartományán!
            </>
          }
        >
          <p>
            Deriválva: <M t="f'(x)=\sqrt{4-x^2} + x\cdot\dfrac{-x}{\sqrt{4-x^2}} = \dfrac{4-2x^2}{\sqrt{4-x^2}}" />.
          </p>
          <p>
            <M t="f'(x)=0 \iff x=\pm\sqrt{2}" /> (mindkettő belső pont). A végpontokban <M t="f(-2)=f(2)=0" />, a kritikus pontokban <M t="f(-\sqrt{2})=-2" /> és <M t="f(\sqrt{2})=2" />.
          </p>
          <p>
            <strong>Abs. min: <M t="-2" /></strong> (<M t="x=-\sqrt{2}" />), <strong>abs. max: <M t="2" /></strong> (<M t="x=\sqrt{2}" />).
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Határozd meg az <M t="f(x)=3x^{2/3}-2x" /> függvény abszolút szélsőértékeit a <M t="[-1;\,1]" /> intervallumon!
            </>
          }
        >
          <p>
            <M t="f'(x)=2x^{-1/3}-2 = 2\left(\dfrac{1}{x^{1/3}}-1\right)" />. Kritikus pontok <M t="(-1;\,1)" />-ben: <M t="x=0" /> (<M t="f'(0)" /> nem létezik!). A másik gyök <M t="x=1" />, ami épp a jobb végpont.
          </p>
          <p>
            Értékek: <M t="f(-1)=3(1)-2(-1)=5" />, <M t="f(0)=0" />, <M t="f(1)=3-2=1" />. <strong>Abs. max: <M t="5" /></strong> (<M t="x=-1" />), <strong>abs. min: <M t="0" /></strong> (<M t="x=0" />).
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              Mutasd meg, hogy egy <M t="f(x)=ax^3+bx^2+cx+d" /> (<M t="a\ne 0" />) harmadfokú polinomnak legfeljebb <strong>2</strong>, de lehet <strong>1</strong> vagy <strong>0</strong> kritikus pontja is! Adj egy-egy egyszerű példát mindhárom esetre!
            </>
          }
        >
          <p>
            Mivel <M t="f'(x)=3ax^2+2bx+c" /> egy másodfokú polinom, a diszkriminánsa (<M t="\Delta=4b^2-12ac" />) előjelétől függően <M t="2" />, <M t="1" /> vagy <M t="0" /> valós gyöke lehet:
          </p>
          <ul>
            <li>2 kritikus pont: <M t="x^3-3x" /> (<M t="f'=3x^2-3" />, gyökök <M t="\pm 1" />).</li>
            <li>1 kritikus pont: <M t="x^3" /> (<M t="f'=3x^2" />, gyök <M t="0" />).</li>
            <li>0 kritikus pont: <M t="x^3+x" /> (<M t="f'=3x^2+1 > 0" />, nincs gyök).</li>
          </ul>
        </Task>
      </>
    ),
  },
];
