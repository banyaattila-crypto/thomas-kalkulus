import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  CartesianToPolarPlotterWidget,
  LemniscateAndSpiralWidget,
  LimaconExplorerWidget,
  PolarCurveGalleryDiagram,
  PolarIntersectionWidget,
  PolarSlopeWidget,
  PolarSymmetryDiagram,
  RoseCurveWidget,
} from '../components/Widgets106';
import type { Page } from './s1_1';

export const S10_6: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Szimmetriatesztek polárkoordinátákban',
    body: (
      <>
        <Story>
          <p>
            Polárkoordinátákban egészen elképesztő virág-, szív-, nyolcas- és csigavonal-formák írhatók fel egyetlen
            rövid képlettel — például <M t="r = \cos(3\theta)" /> egy háromszirmú rózsa, <M t="r = 1 - \cos\theta" />{' '}
            pedig egy szív alakú kardioid. Mielőtt pontokat számolnánk, a <strong>szimmetriatesztekkel</strong> akár a
            munka felét vagy háromnegyedét megspórolhatjuk!
          </p>
        </Story>

        <Def title="Három poláris szimmetriateszt">
          <ol>
            <li>
              <strong><M t="x" />-tengelyre szimmetrikus</strong>, ha <M t="(r;\,\theta)" /> helyére{' '}
              <M t="(r;\,-\theta)" /> <em>vagy</em> <M t="(-r;\,\pi - \theta)" /> írva ekvivalens egyenletet kapunk.
            </li>
            <li>
              <strong><M t="y" />-tengelyre szimmetrikus</strong>, ha <M t="(r;\,\theta)" /> helyére{' '}
              <M t="(r;\,\pi - \theta)" /> <em>vagy</em> <M t="(-r;\,-\theta)" /> írva ekvivalens egyenletet kapunk.
            </li>
            <li>
              <strong>Origóra (pólusra) szimmetrikus</strong>, ha <M t="(r;\,\theta)" /> helyére{' '}
              <M t="(-r;\,\theta)" /> <em>vagy</em> <M t="(r;\,\theta + \pi)" /> írva ekvivalens egyenletet kapunk.
            </li>
          </ol>
        </Def>

        <PolarSymmetryDiagram />

        <p>
          <em>Fontos megjegyzés:</em> ezek a tesztek <strong>elégségesek, de nem szükségesek</strong>! Mivel egy pontnak
          végtelen sok polárkoordinátája van, előfordulhat, hogy a teszt sikertelen, a görbe mégis szimmetrikus (pl. az{' '}
          <M t="r = \sin(2\theta)" /> négyágú rózsa szimmetrikus az <M t="x" />-tengelyre, pedig{' '}
          <M t="(r;\,-\theta)" /> nem hagyja változatlanul az egyenletet — viszont <M t="(-r;\,\pi-\theta)" /> igen!).
        </p>

        <Quiz
          q={<>Melyik szimmetria olvasható le azonnal az <M t="r = 2 + \sin\theta" /> poláregyenletről?</>}
          options={[
            { label: <>Szimmetrikus az <M t="x" />-tengelyre</> },
            { label: <>Szimmetrikus az <M t="y" />-tengelyre</>, ok: true },
            { label: <>Szimmetrikus az origóra</> },
            { label: <>Mindháromra szimmetrikus</> },
          ]}
          explain={
            <>
              Mivel <M t="\sin(\pi - \theta) = \sin\theta" />, az <M t="(r;\,\pi - \theta)" /> helyettesítés pontosan
              visszaadja az egyenletet, tehát a görbe az <strong><M t="y" />-tengelyre szimmetrikus</strong>.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Vizsgáld meg az <M t="r^2 = 9\cos\theta" /> görbe szimmetriáit!</>}>
          <p>
            Mivel <M t="\cos(-\theta) = \cos\theta" />, <strong><M t="x" />-tengelyre</strong> szimmetrikus. Mivel{' '}
            <M t="(-r)^2 = r^2" />, <strong>origóra</strong> is szimmetrikus. A kettő együtt automatikusan magával
            vonja az <strong><M t="y" />-tengelyre</strong> való szimmetriát is!
          </p>
        </Task>
        <Task n={2} q={<>Ha egy görbe az <M t="x" />-tengelyre is és az <M t="y" />-tengelyre is szimmetrikus, igaz-e, hogy az origóra is az?</>}>
          <p>
            <strong>Igen!</strong> Az <M t="(x;\,y) \to (x;\,-y) \to (-x;\,-y)" /> két tengelyes tükrözés egymás után
            pontosan az origóra való középpontos tükrözés.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Érintő és meredekség polárgörbéken',
    body: (
      <>
        <p>
          Az <M t="r = f(\theta)" /> görbe érintőjének meredekségét a Descartes-féle <M t="\dfrac{dy}{dx}" /> hányados
          adja meg, és <strong>nem</strong> a <M t="\dfrac{dr}{d\theta}" /> derivált! Ha a görbét{' '}
          <M t="x(\theta) = f(\theta)\cos\theta" />, <M t="y(\theta) = f(\theta)\sin\theta" /> paraméteres görbeként
          kezeljük, a szorzat deriválási szabályával azonnal megkapjuk a meredekséget:
        </p>

        <Def title="Az r = f(θ) polárgörbe meredeksége és origóbeli érintője">
          <M block t="\frac{dy}{dx} = \frac{dy/d\theta}{dx/d\theta} = \frac{f'(\theta)\sin\theta + f(\theta)\cos\theta}{f'(\theta)\cos\theta - f(\theta)\sin\theta} \qquad \left(\frac{dx}{d\theta} \neq 0\right)." />
          <p>
            <strong>Origóbeli érintők szabálya:</strong> ha a görbe egy <M t="\theta_0" /> szögnél áthalad a póluson
            (<M t="f(\theta_0) = 0" />, de <M t="f'(\theta_0) \neq 0" />), akkor a képlet gyönyörűen leegyszerűsödik:
          </p>
          <M block t="\left.\frac{dy}{dx}\right|_{(0;\,\theta_0)} = \frac{f'(\theta_0)\sin\theta_0}{f'(\theta_0)\cos\theta_0} = \tan\theta_0!" />
          <p>
            Vagyis a <M t="\theta = \theta_0" /> egyenes maga az érintő a pólusban!
          </p>
        </Def>

        <PolarSlopeWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Határozd meg az <M t="r = 1 + \cos\theta" /> kardioid meredekségét <M t="\theta = \tfrac{\pi}{2}" />-nél!</>}>
          <p>
            <M t="f(\tfrac{\pi}{2}) = 1" />, <M t="f'(\theta) = -\sin\theta \Rightarrow f'(\tfrac{\pi}{2}) = -1" />.
            Behelyettesítve (<M t="\sin\tfrac{\pi}{2} = 1,\ \cos\tfrac{\pi}{2} = 0" />):
            <M block t="\frac{dy}{dx} = \frac{(-1)\cdot 1 + 1\cdot 0}{(-1)\cdot 0 - 1\cdot 1} = \frac{-1}{-1} = 1." />
          </p>
        </Task>
        <Task n={4} q={<>Milyen egyenesek érintik a pólusban az <M t="r = \sin(2\theta)" /> négyszirmú rózsát?</>}>
          <p>
            A póluson akkor halad át, amikor <M t="\sin(2\theta) = 0 \Rightarrow 2\theta = k\pi \Rightarrow \theta = 0,\,\tfrac{\pi}{2},\,\pi,\,\tfrac{3\pi}{2}" />.
            Mivel itt <M t="f'(\theta) = 2\cos(2\theta) = \pm 2 \neq 0" />, a pólusbeli érintők éppen az{' '}
            <M t="x" />- és az <M t="y" />-tengely!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'A Descartes-féle (θ, r) hullám mint ábrázolási térkép',
    body: (
      <>
        <p>
          Egy polárgörbe kézi vázolásához a legjobb trükk, hogy <strong>először a szokásos Descartes-rendszerben</strong>{' '}
          felrajzoljuk <M t="r = f(\theta)" /> grafikonját (<M t="\theta" /> a vízszintes, <M t="r" /> a függőleges
          tengelyen), majd ezt használjuk „élő értéktáblázatként”:
        </p>
        <ol>
          <li>A hullám <strong>zérushelyei</strong> megmondják, milyen szögeknél (és milyen érintőkkel!) halad át a görbe a póluson.</li>
          <li>A hullám <strong>csúcsai és völgyei</strong> adják a pólustól legtávolabbi pontokat (szirmok csúcsait).</li>
          <li>A vízszintes tengely <strong>alatti</strong> szakaszok (<M t="r < 0" />) a szemközti síknegyedbe forduló hurkokat rajzolják!</li>
        </ol>

        <CartesianToPolarPlotterWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Az <M t="r = 1 + 2\cos\theta" /> csigavonal mely <M t="\theta \in [0;\,2\pi]" /> szakaszon rajzolja meg a belső hurkát?</>}>
          <p>
            A belső hurok ott keletkezik, ahol <M t="r < 0" />, vagyis <M t="1 + 2\cos\theta < 0 \Longleftrightarrow \cos\theta < -\tfrac{1}{2}" />.
            Ez a <M t="\left(\tfrac{2\pi}{3};\,\tfrac{4\pi}{3}\right)" /> intervallum! A pólusbeli érintők{' '}
            <M t="\theta = \tfrac{2\pi}{3}" /> és <M t="\theta = \tfrac{4\pi}{3}" />.
          </p>
        </Task>
        <Task n={6} q={<>Miért van az <M t="r = 1 - \cos\theta" /> kardioidnak hegyes csúcspontja (kuszpisa) a pólusban, és mi ott az érintője?</>}>
          <p>
            <M t="\theta = 0" />-nál <M t="r = 0" />, de <M t="r'(0) = \sin 0 = 0" /> is! Mivel <M t="r" /> mindkét
            oldalon pozitív és <M t="r \approx \tfrac{1}{2}\theta^2" />, a görbe vízszintes (<M t="\theta = 0" />)
            érintővel, „visszafordulva” érkezik a pólusba és indul ki onnan.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Csigavonalak (limaçonok) és a kardioid családja',
    body: (
      <>
        <p>
          Az <M t="r = a \pm b\cos\theta" /> és <M t="r = a \pm b\sin\theta" /> (<M t="a, b > 0" />) görbéket{' '}
          <strong>Pascal-féle csigavonalaknak (limaçonoknak)</strong> nevezzük. A <M t="\cos\theta" /> változat az{' '}
          <M t="x" />-tengelyre, a <M t="\sin\theta" /> változat az <M t="y" />-tengelyre szimmetrikus; az alakot
          egyedül az <M t="a/b" /> arány határozza meg:
        </p>

        <Def title="A limaçon négy típusa (a, b > 0)">
          <ul>
            <li><M t="\dfrac{a}{b} < 1" />: <strong>belső hurkos csigavonal</strong> (a póluson kétszer halad át);</li>
            <li><M t="\dfrac{a}{b} = 1" />: <strong>kardioid</strong> (szívgörbe, hegyes csúccsal a pólusban);</li>
            <li><M t="1 < \dfrac{a}{b} < 2" />: <strong>behorpadt csigavonal</strong> (nem éri el a pólust, de van egy „horpadása”);</li>
            <li><M t="\dfrac{a}{b} \ge 2" />: <strong>konvex csigavonal</strong> (tojásszerű, sehol sem horpad be).</li>
          </ul>
        </Def>

        <LimaconExplorerWidget />

        <Quiz
          q={<>Melyik alakú az <M t="r = 3 - 2\sin\theta" /> polárgörbe?</>}
          options={[
            { label: 'Belső hurkos csigavonal' },
            { label: 'Kardioid' },
            { label: 'Behorpadt csigavonal (y-tengelyre szimmetrikus)', ok: true },
            { label: 'Konvex csigavonal' },
          ]}
          explain={
            <>
              Itt <M t="a = 3, b = 2" />, tehát <M t="a/b = 1{,}5 \in (1;\,2)" />: <strong>behorpadt csigavonal</strong>!
              A <M t="\sin\theta" /> miatt az <M t="y" />-tengelyre szimmetrikus, a legnagyobb sugár (<M t="r = 5" />)
              alul (<M t="\theta = \tfrac{3\pi}{2}" />) van.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Add meg az <M t="r = 2 + 4\sin\theta" /> csigavonal külső és belső hurkának csúcspontját!</>}>
          <p>
            A külső hurok csúcsa <M t="\theta = \tfrac{\pi}{2}" />-nél: <M t="r = 6" />, Descartes-pont{' '}
            <M t="(0;\,6)" />. A belső hurok csúcsa <M t="\theta = \tfrac{3\pi}{2}" />-nél: <M t="r = 2 - 4 = -2" />,
            ami a <M t="(-2;\,\tfrac{3\pi}{2}) = (2;\,\tfrac{\pi}{2})" /> pont, vagyis Descartes-alakban <M t="(0;\,2)" />!
          </p>
        </Task>
        <Task n={8} q={<>A mikrofonok iránykarakterisztikájában miért kedvelt a <em>kardioid</em> (<M t="r = 1 + \cos\theta" />)?</>}>
          <p>
            Mert elölről (<M t="\theta = 0" />) maximális az érzékenysége (<M t="r = 2" />), oldalról mérsékelt (
            <M t="r = 1" />), hátulról (<M t="\theta = \pi" />) pedig pontosan <strong>nulla</strong> (<M t="r = 0" />),
            így kiszűri a színpadi visszhangot és gerjedést!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Rózsagörbék, lemniszkáták és spirálok',
    body: (
      <>
        <Def title="Rózsagörbék (r = a cos(nθ) és r = a sin(nθ))">
          <p>Legyen <M t="n \ge 2" /> egész szám és <M t="a > 0" />. A szirmok hossza <M t="a" />, darabszáma pedig:</p>
          <ul>
            <li>ha <M t="n" /> <strong>páratlan</strong>: pontosan <strong><M t="n" /> szirom</strong> (már <M t="0 \le \theta \le \pi" /> alatt bezárul!);</li>
            <li>ha <M t="n" /> <strong>páros</strong>: pontosan <strong><M t="2n" /> szirom</strong> (a teljes <M t="0 \le \theta \le 2\pi" /> kell).</li>
          </ul>
        </Def>

        <RoseCurveWidget />

        <p>
          A <strong>lemniszkáták</strong> (<M t="r^2 = a^2\cos(2\theta)" /> és <M t="r^2 = a^2\sin(2\theta)" />)
          fekvő vagy <M t="45^\circ" />-kal elforgatott nyolcas (∞) alakú görbék; a <strong>spirálok</strong> (például
          az arkhimédészi <M t="r = a\theta" /> vagy a logaritmikus <M t="r = a e^{b\theta}" />) pedig nem periodikusak,
          hanem végtelenül tekerednek kifelé.
        </p>

        <LemniscateAndSpiralWidget />

        <Quiz
          q={<>Hány szirma van az <M t="r = 5\sin(4\theta)" /> rózsagörbének, és mekkora egy szirom hossza?</>}
          options={[
            { label: '4 szirom, hosszuk 5' },
            { label: '8 szirom, hosszuk 5', ok: true },
            { label: '8 szirom, hosszuk 10' },
            { label: '4 szirom, hosszuk 2,5' },
          ]}
          explain={
            <>
              Mivel <M t="n = 4" /> páros, a szirmok száma <M t="2n = 8" />, a maximális távolság a pólustól pedig{' '}
              <M t="a = 5" />.
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Mely <M t="\theta \in [0;\,2\pi)" /> szögeknél nem értelmezett az <M t="r^2 = 4\cos(2\theta)" /> lemniszkáta?</>}>
          <p>
            Ahol <M t="\cos(2\theta) < 0" />, vagyis <M t="\left(\tfrac{\pi}{4};\,\tfrac{3\pi}{4}\right)" /> és{' '}
            <M t="\left(\tfrac{5\pi}{4};\,\tfrac{7\pi}{4}\right)" /> nyílt intervallumokon.
          </p>
        </Task>
        <Task n={10} q={<>Az <M t="r = 2\cos(3\theta)" /> háromszirmú rózsa szirmai milyen szögeknél érik el a csúcsukat?</>}>
          <p>
            Ahol <M t="|\cos(3\theta)| = 1 \Rightarrow 3\theta = k\pi \Rightarrow \theta = 0,\,\tfrac{\pi}{3},\,\tfrac{2\pi}{3}" />.
            (<M t="\theta = \tfrac{\pi}{3}" />-nál <M t="r = -2" />, tehát a csúcs a <M t="\tfrac{4\pi}{3}" /> irányban
            van — a 3 szirom pontosan <M t="120^\circ" />-onként helyezkedik el: <M t="0^\circ,\,120^\circ,\,240^\circ" />!)
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Polárgörbék metszéspontjai — a rejtett metszéspont csapdája',
    body: (
      <>
        <p>
          Descartes-koordinátákban két görbe metszéspontjait egyszerűen az egyenletrendszerük megoldása adja.
          Polárkoordinátákban viszont <strong>ez nem mindig elég!</strong> Mivel egy pontnak végtelen sok polárneve van,
          két görbe találkozhat ugyanabban a geometriai pontban úgy is, hogy <em>különböző</em> <M t="(r;\,\theta)" />{' '}
          értékekkel (különösen a <strong>pólusban</strong> vagy ellentétes előjelű <M t="r" />-rel) haladnak át rajta!
        </p>

        <PolarIntersectionWidget />

        <Steps
          title="Két polárgörbe ÖSSZES metszéspontjának megtalálása"
          problem={
            <>
              Határozzuk meg az <M t="r = 1 - \cos\theta" /> kardioid és az <M t="r = \cos\theta" /> kör összes
              metszéspontját!
            </>
          }
          steps={[
            {
              title: '1. Azonos koordinátájú (algebrai) megoldások',
              body: (
                <>
                  Egyenlővé tesszük a két sugarat: <M t="1 - \cos\theta = \cos\theta \Rightarrow 2\cos\theta = 1 \Rightarrow \cos\theta = \tfrac{1}{2}" />.
                  Innen <M t="\theta = \tfrac{\pi}{3}" /> és <M t="\theta = -\tfrac{\pi}{3}" /> (vagy{' '}
                  <M t="\tfrac{5\pi}{3}" />), mindkettőnél <M t="r = \tfrac{1}{2}" />. Megvan 2 pont:{' '}
                  <M t="\left(\tfrac{1}{2};\,\tfrac{\pi}{3}\right)" /> és <M t="\left(\tfrac{1}{2};\, -\tfrac{\pi}{3}\right)" />.
                </>
              ),
            },
            {
              title: '2. A pólus külön ellenőrzése!',
              body: (
                <>
                  Átmegy a kardioid a póluson? Igen: <M t="1 - \cos\theta = 0" />, amikor <M t="\theta = 0" />. Átmegy a
                  kör a póluson? Igen: <M t="\cos\theta = 0" />, amikor <M t="\theta = \tfrac{\pi}{2}" />. Mivel{' '}
                  <strong>mindkét</strong> görbe tartalmazza a pólust, <M t="O(0;\,0)" /> a <strong>3. metszéspont</strong>!
                </>
              ),
            },
            {
              title: '3. Ellenőrzés rajzzal / (-r; θ+π) helyettesítéssel',
              body: (
                <>
                  Ha az első görbébe <M t="(-r;\,\theta+\pi)" />-t írunk: <M t="-r = 1 - \cos(\theta+\pi) = 1 + \cos\theta \Rightarrow r = -1 - \cos\theta" />.
                  Egyenlővé téve a körrel: <M t="-1 - \cos\theta = \cos\theta \Rightarrow \cos\theta = -\tfrac{1}{2}" />,
                  ami <M t="\theta = \tfrac{2\pi}{3},\,r = -\tfrac{1}{2}" /> — de ez pontosan a már megtalált{' '}
                  <M t="\left(\tfrac{1}{2};\,-\tfrac{\pi}{3}\right)" /> pont! Így biztosan <strong>pontosan 3</strong>{' '}
                  metszéspont van.
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Hány metszéspontja van az <M t="r = \sin\theta" /> és az <M t="r = \cos\theta" /> körnek?</>}>
          <p>
            Algebrailag: <M t="\sin\theta = \cos\theta \Rightarrow \theta = \tfrac{\pi}{4},\,r = \tfrac{\sqrt{2}}{2}" />{' '}
            (egy pont). A pólus ellenőrzése: mindkét kör átmegy rajta (<M t="\theta = 0" /> és{' '}
            <M t="\theta = \tfrac{\pi}{2}" />). Összesen <strong>2 metszéspont</strong>:{' '}
            <M t="\left(\tfrac{\sqrt{2}}{2};\,\tfrac{\pi}{4}\right)" /> és a pólus!
          </p>
        </Task>
        <Task n={12} q={<>Keresd meg az <M t="r = 1" /> kör és az <M t="r = 2\sin\theta" /> kör metszéspontjait!</>}>
          <p>
            <M t="2\sin\theta = 1 \Rightarrow \sin\theta = \tfrac{1}{2} \Rightarrow \theta = \tfrac{\pi}{6},\,\tfrac{5\pi}{6}" />.
            A pólus itt <em>nem</em> közös (mert <M t="r = 1" /> nem megy át rajta). Így 2 metszéspont van:{' '}
            <M t="\left(1;\,\tfrac{\pi}{6}\right)" /> és <M t="\left(1;\,\tfrac{5\pi}{6}\right)" />.
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
        <PolarCurveGalleryDiagram />

        <h3>Polárgörbék gyors áttekintése</h3>
        <table className="tbl">
          <thead>
            <tr><th>Görbecsalád</th><th>Egyenlet</th><th>Kulcsjellemző</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Kardioid</strong></td>
              <td><M t="r = a(1 \pm \cos\theta)" /> vagy <M t="\sin\theta" /></td>
              <td>Szív alakú, csúcspont a pólusban, max. sugár <M t="2a" /></td>
            </tr>
            <tr>
              <td><strong>Csigavonal (limaçon)</strong></td>
              <td><M t="r = a \pm b\cos\theta" /> (<M t="a,b>0" />)</td>
              <td><M t="a<b" /> hurkos; <M t="a=b" /> kardioid; <M t="b<a<2b" /> behorpadt; <M t="a\ge 2b" /> konvex</td>
            </tr>
            <tr>
              <td><strong>Rózsagörbe</strong></td>
              <td><M t="r = a\cos(n\theta)" /> vagy <M t="\sin(n\theta)" /></td>
              <td>Páratlan <M t="n \to n" /> szirom (<M t="[0;\,\pi]" />); páros <M t="n \to 2n" /> szirom (<M t="[0;\,2\pi]" />)</td>
            </tr>
            <tr>
              <td><strong>Lemniszkáta</strong></td>
              <td><M t="r^2 = a^2\cos(2\theta)" /> vagy <M t="\sin(2\theta)" /></td>
              <td>∞ alak, csak nemnegatív jobb oldalon létezik</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. A meredekség összekeverése <M t="dr/d\theta" />-val:</strong> a <M t="dr/d\theta" /> csak azt
          mondja meg, hogyan változik a pólustól mért távolság — az érintő meredeksége mindig{' '}
          <M t="\dfrac{dy}{dx} = \dfrac{r'\sin\theta + r\cos\theta}{r'\cos\theta - r\sin\theta}" />!
        </Warn>
        <Warn>
          <strong>2. A pólus mint rejtett metszéspont elfelejtése:</strong> két polárgörbe metszéspontjainál{' '}
          <em>mindig</em> ellenőrizd külön, hogy mindkettő átmegy-e a póluson (<M t="r = 0" />), és készíts gyors vázlatot!
        </Warn>
        <Warn>
          <strong>3. Negatív <M t="r" /> elhagyása rajzoláskor:</strong> a hurkos csigavonal (<M t="r = 1 + 2\cos\theta" />)
          és a rózsagörbék lényeges részei <M t="r < 0" /> tartományon keletkeznek — ezeket az ellenkező (<M t="\theta+\pi" />)
          irányba kell felmérni, nem eldobni!
        </Warn>
        <Warn>
          <strong>4. Sikertelen szimmetriateszt félreértelmezése:</strong> ha az <M t="(r;\,-\theta)" /> behelyettesítés
          megváltoztatja az egyenletet, attól még a görbe lehet <M t="x" />-tengelyre szimmetrikus (pl.{' '}
          <M t="r = \sin(2\theta)" />)!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Miért nem elég az <M t="r = 1" /> és <M t="r = -1" /> egyenleteket egyenlővé tenni a metszéspontjukhoz?</>}>
          <p>
            Az <M t="1 = -1" /> egyenletnek nincs megoldása, pedig az <M t="r = 1" /> és az <M t="r = -1" /> pontosan{' '}
            <strong>ugyanaz az egységkör</strong>, tehát minden pontjuk közös!
          </p>
        </Task>
        <Task n={14} q={<>Melyik poláregyenletnek van pontosan 6 szirma: <M t="r = \cos(6\theta)" /> vagy <M t="r = \cos(3\theta)" />?</>}>
          <p>
            <strong>Egyiknek sem!</strong> Az <M t="r = \cos(6\theta)" /> görbének <M t="2\cdot 6 = 12" /> szirma van,
            az <M t="r = \cos(3\theta)" /> görbének pedig <M t="3" />. (6 szirmú szabványos <M t="\cos(n\theta)" /> rózsa
            nem is létezik, mert <M t="2n" /> mindig 4-gyel osztható, ha <M t="n" /> páros!)
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

        <Task n={15} q={<>Sorold be a megfelelő típusba: (a) <M t="r = 4 + 4\cos\theta" />, (b) <M t="r = 2 + 5\sin\theta" />, (c) <M t="r = 5 - 2\cos\theta" />!</>}>
          <ul>
            <li>(a) <M t="a/b = 1" /> <M t="\Rightarrow" /> <strong>kardioid</strong> (<M t="x" />-tengelyre szimmetrikus).</li>
            <li>(b) <M t="a/b = 0{,}4 < 1" /> <M t="\Rightarrow" /> <strong>belső hurkos csigavonal</strong> (<M t="y" />-tengelyre szimmetrikus).</li>
            <li>(c) <M t="a/b = 2{,}5 \ge 2" /> <M t="\Rightarrow" /> <strong>konvex csigavonal</strong> (<M t="x" />-tengelyre szimmetrikus).</li>
          </ul>
        </Task>

        <Task n={16} q={<>Hány szirma van és mekkora a sziromhossza az <M t="r = 4\cos(5\theta)" /> és az <M t="r = 3\sin(2\theta)" /> görbének?</>}>
          <ul>
            <li><M t="r = 4\cos(5\theta)" />: <M t="n = 5" /> páratlan <M t="\Rightarrow" /> <strong>5 szirom</strong>, hossz 4.</li>
            <li><M t="r = 3\sin(2\theta)" />: <M t="n = 2" /> páros <M t="\Rightarrow" /> <strong>4 szirom</strong>, hossz 3.</li>
          </ul>
        </Task>

        <Task n={17} q={<>Határozd meg az <M t="r = 2\sin\theta" /> kör meredekségét a <M t="\theta = \tfrac{\pi}{6}" /> pontban!</>}>
          <p>
            <M t="r = 1" />, <M t="r' = 2\cos\tfrac{\pi}{6} = \sqrt{3}" />.
            <M block t="\frac{dy}{dx} = \frac{\sqrt{3}\cdot\tfrac{1}{2} + 1\cdot\tfrac{\sqrt{3}}{2}}{\sqrt{3}\cdot\tfrac{\sqrt{3}}{2} - 1\cdot\tfrac{1}{2}} = \frac{\sqrt{3}}{1} = \sqrt{3}." />
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Határozd meg az <M t="r = 1 + \cos\theta" /> kardioid összes vízszintes érintőjének pontjait!</>}>
          <p>
            Vízszintes érintő ott van, ahol <M t="\dfrac{dy}{d\theta} = 0" /> és <M t="\dfrac{dx}{d\theta} \neq 0" />. Mivel{' '}
            <M t="y = (1+\cos\theta)\sin\theta" />:
            <M block t="\frac{dy}{d\theta} = -\sin^2\theta + (1+\cos\theta)\cos\theta = 2\cos^2\theta + \cos\theta - 1 = (2\cos\theta - 1)(\cos\theta + 1) = 0." />
            Innen <M t="\cos\theta = \tfrac{1}{2} \Rightarrow \theta = \tfrac{\pi}{3},\,\tfrac{5\pi}{3}" /> (mindkettőnél{' '}
            <M t="r = \tfrac{3}{2}" />). A <M t="\cos\theta = -1" /> (<M t="\theta = \pi" />) a pólus csúcspontja, ahol{' '}
            <M t="\tfrac{dx}{d\theta} = 0" /> is, de a határérték <M t="\lim_{\theta\to\pi}\tfrac{dy}{dx} = 0" />, így ott
            is vízszintes az érintő!
          </p>
        </Task>

        <Task n={19} q={<>Keresd meg az <M t="r = 1 + \cos\theta" /> és az <M t="r = 1 - \cos\theta" /> két kardioid összes metszéspontját!</>}>
          <p>
            Algebrailag: <M t="1 + \cos\theta = 1 - \cos\theta \Rightarrow \cos\theta = 0 \Rightarrow \theta = \tfrac{\pi}{2},\,\tfrac{3\pi}{2}" />,
            ezek a <M t="\left(1;\,\tfrac{\pi}{2}\right)" /> és <M t="\left(1;\,\tfrac{3\pi}{2}\right)" /> pontok.
            Mindkét kardioid átmegy a póluson (<M t="\theta = \pi" />, ill. <M t="\theta = 0" />), tehát a{' '}
            <strong>pólus</strong> a 3. metszéspont!
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="r^2 = 2\sin(2\theta)" /> lemniszkáta pólusbeli érintőit és legmagasabb pontjának koordinátáit!</>}>
          <p>
            A pólusban <M t="\sin(2\theta) = 0 \Rightarrow \theta = 0" /> és <M t="\theta = \tfrac{\pi}{2}" />, így az{' '}
            <M t="x" />- és az <M t="y" />-tengely érinti. A csúcsok <M t="\sin(2\theta) = 1 \Rightarrow \theta = \tfrac{\pi}{4}" />{' '}
            és <M t="\tfrac{5\pi}{4}" />-nél vannak (<M t="r = \sqrt{2}" />, azaz <M t="(\pm 1;\,\pm 1)" />).
            A legmagasabb pont: maximalizáljuk <M t="y^2 = r^2\sin^2\theta = 2\sin(2\theta)\sin^2\theta = 4\sin^3\theta\cos\theta" />-t!
            Deriválva: <M t="12\sin^2\theta\cos^2\theta - 4\sin^4\theta = 0 \Rightarrow \tan^2\theta = 3 \Rightarrow \theta = \tfrac{\pi}{3}" />,
            ahol <M t="y_{\max} = \sqrt{4\cdot\tfrac{3\sqrt{3}}{8}\cdot\tfrac{1}{2}} = \dfrac{3^{3/4}}{2} \approx 1{,}14" />!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Igazold, hogy a <strong>logaritmikus spirál</strong> (<M t="r = e^{k\theta},\ k > 0" />) minden sugárral
              (a pólusból induló félegyenessel) <strong>állandó <M t="\psi" /> szöget</strong> zár be!
            </>
          }
        >
          <p>
            A sugár irányszöge <M t="\theta" />, az érintő irányszöge <M t="\alpha" /> (<M t="\tan\alpha = dy/dx" />).
            A kettő közötti <M t="\psi = \alpha - \theta" /> szög tangense általánosan:
            <M block t="\tan\psi = \frac{\tan\alpha - \tan\theta}{1 + \tan\alpha\tan\theta} = \frac{r}{dr/d\theta}." />
            A logaritmikus spirálra <M t="dr/d\theta = k e^{k\theta} = kr" />, tehát{' '}
            <M t="\tan\psi = \dfrac{r}{kr} = \dfrac{1}{k} = \text{állandó}" />! (Ezért hívják <em>egyenlő szögű spirálnak</em>,
            és ez jelenik meg a nautilus csigaházán is.)
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Keresd meg az <M t="r = \cos(2\theta)" /> négyszirmú rózsa és az <M t="r = \tfrac{1}{2}" /> kör összes
              metszéspontjának számát! (Vigyázz a negatív <M t="r" /> értékekre!)
            </>
          }
        >
          <p>
            Az <M t="r = \tfrac{1}{2}" /> kör pontosan ugyanaz, mint az <M t="r = -\tfrac{1}{2}" /> kör! Ezért{' '}
            <em>mindkét</em> egyenletet meg kell oldani <M t="[0;\,2\pi)" />-ben:
          </p>
          <ul>
            <li><M t="\cos(2\theta) = \tfrac{1}{2}" />: 4 megoldás (<M t="2\theta = \tfrac{\pi}{3}, \tfrac{5\pi}{3}, \tfrac{7\pi}{3}, \tfrac{11\pi}{3}" />).</li>
            <li><M t="\cos(2\theta) = -\tfrac{1}{2}" />: további 4 megoldás (<M t="2\theta = \tfrac{2\pi}{3}, \tfrac{4\pi}{3}, \tfrac{8\pi}{3}, \tfrac{10\pi}{3}" />).</li>
          </ul>
          <p>
            Összesen <strong>8 metszéspont</strong> van — a 4 szirom mindkét oldalán 1-1! Ha csak az{' '}
            <M t="\cos(2\theta) = \tfrac{1}{2}" />-t oldottad volna meg, a metszéspontok felét elvesztetted volna!
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Mutasd meg, hogy az <M t="r = a(1 + \cos\theta)" /> és <M t="r = a(1 - \cos\theta)" /> kardioidok{' '}
              <strong>derékszögben</strong> metszik egymást az <M t="\left(a;\,\tfrac{\pi}{2}\right)" /> pontban!
            </>
          }
        >
          <p>
            A 3. feladat mintájára <M t="\theta = \tfrac{\pi}{2}" />-nél az első kardioid meredeksége:
            <M block t="m_1 = \frac{(-a)\cdot 1 + a\cdot 0}{(-a)\cdot 0 - a\cdot 1} = 1." />
            A másodikra (<M t="r' = a\sin\theta = a" />):
            <M block t="m_2 = \frac{a\cdot 1 + a\cdot 0}{a\cdot 0 - a\cdot 1} = -1." />
            Mivel <M t="m_1 \cdot m_2 = 1\cdot(-1) = -1" />, a két görbe pontosan derékszögben metszi egymást!
          </p>
        </Task>
      </>
    ),
  },
];
