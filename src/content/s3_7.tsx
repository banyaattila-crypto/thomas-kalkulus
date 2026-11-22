import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  BalloonAngleWidget,
  ConeTankWidget,
  RelatedRatesStepsDiagram,
  SlidingLadderWidget,
} from '../components/Widgets37';
import type { Page } from './s1_1';

export const S3_7: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Mi az a kapcsolt derivált? + A 6 lépéses recept',
    body: (
      <>
        <Story>
          <p>
            Felfújsz egy gömb alakú léggömböt: a pumpa másodpercenként állandó mennyiségű levegőt nyom bele (<M t="dV/dt" /> állandó). Eleinte a sugár rohamosan nő, később viszont alig látszik, hogy tágul! Miért? Mert a térfogat és a sugár között minden pillanatban fennáll a <M t="V=\frac{4}{3}\pi r^3" /> kapcsolat — és ha ezt az idő szerint deriváljuk, <strong>összekapcsoljuk</strong> a két változási sebességet!
          </p>
        </Story>
        <p>
          A <strong>kapcsolt deriváltak</strong> (angolul <em>related rates</em>) feladataiban egy könnyen mérhető változási sebességből (pl. mennyivel nő a térfogat) számolunk ki egy nehezebben mérhetőt (pl. milyen gyorsan nő a sugár vagy emelkedik a vízszint). A titok egyszerű: <strong>minden változót a <M t="t" /> idő függvényének tekintünk</strong>, és a geometriai egyenletet <M t="t" /> szerint deriváljuk a láncszabállyal!
        </p>
        <M block t="V=\frac{4}{3}\pi r^3 \;\xrightarrow{\;d/dt\;}\; \frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt} \;\Longrightarrow\; \frac{dr}{dt} = \frac{1}{4\pi r^2}\frac{dV}{dt}." />
        <RelatedRatesStepsDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Egy henger alakú, <M t="r=2" /> m sugarú tartályból percenként <M t="3000" /> liter (<M t="3\;\text{m}^3" />) vizet engedünk le. Milyen gyorsan csökken a vízszint (<M t="dh/dt" />)?
            </>
          }
        >
          <p>
            A henger térfogata <M t="V=\pi r^2 h = 4\pi h" /> (<M t="\text{m}^3" />-ben), mert <M t="r=2" /> m állandó!
          </p>
          <p>
            Deriválva: <M t="\dfrac{dV}{dt}=4\pi\dfrac{dh}{dt}" />. Mivel <M t="\dfrac{dV}{dt}=-3\;\text{m}^3/\text{perc}" />, <M t="\dfrac{dh}{dt}=-\dfrac{3}{4\pi}\approx -0{,}24\;\text{m/perc}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy gömb alakú léggömbbe <M t="100\;\text{cm}^3/\text{s}" /> levegőt fújunk. Milyen gyorsan nő a sugara, amikor <M t="r=5" /> cm?
            </>
          }
        >
          <p>
            <M t="\dfrac{dr}{dt}=\dfrac{1}{4\pi\cdot 5^2}\cdot 100 = \dfrac{1}{\pi}\approx 0{,}318\;\text{cm/s}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Pitagorasz-tételes kapcsolt deriváltak',
    body: (
      <>
        <p>
          A kapcsolt deriváltak leggyakoribb geometriai modellje a <strong>derékszögű háromszög</strong>: <M t="x^2 + y^2 = s^2" />. Ha ezt <M t="t" /> szerint deriváljuk és elosztjuk <M t="2" />-vel, megkapjuk a három sebesség gyönyörű kapcsolatát:
        </p>
        <Def title="A derékszögű háromszög sebesség-egyenlete">
          <M block t="x\frac{dx}{dt} + y\frac{dy}{dt} = s\frac{ds}{dt}." />
        </Def>
        <ul>
          <li>
            <strong>1. eset — állandó átfogó (csúszó létra):</strong> a létra hossza nem változik (<M t="ds/dt=0" />), tehát <M t="x\frac{dx}{dt}+y\frac{dy}{dt}=0" />!
          </li>
          <li>
            <strong>2. eset — változó átfogó (autós üldözés):</strong> északról közeledő járőr (<M t="y=0{,}6" /> km, <M t="dy/dt=-60" /> km/h) és keletre menekülő autó (<M t="x=0{,}8" /> km), a radar <M t="ds/dt=+20" /> km/h-t mér. Ekkor <M t="s=\sqrt{0{,}8^2+0{,}6^2}=1" /> km, tehát <M t="0{,}8\frac{dx}{dt}+0{,}6(-60)=1\cdot 20 \Rightarrow \frac{dx}{dt}=\frac{56}{0{,}8}=70" /> km/h!
          </li>
        </ul>
        <SlidingLadderWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Egy <M t="13" /> m-es létra alját <M t="1{,}2" /> m/s sebességgel húzzák el a faltól. Milyen gyorsan csúszik lefelé a teteje, amikor az alja <M t="5" /> m-re van a faltól?
            </>
          }
        >
          <p>
            Pitagoraszból <M t="y=\sqrt{13^2-5^2}=12" /> m. Az <M t="x\frac{dx}{dt}+y\frac{dy}{dt}=0" /> egyenletből: <M t="\dfrac{dy}{dt}=-\dfrac{5}{12}\cdot 1{,}2 = -0{,}5\;\text{m/s}" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Egy kereszteződésből két autó egyszerre indul merőleges utakon: az egyik <M t="60" /> km/h, a másik <M t="80" /> km/h sebességgel távolodik. Milyen gyorsan nő köztük a távolság?
            </>
          }
        >
          <p>
            <M t="x=60t,\; y=80t \Rightarrow s=100t" />, tehát állandó <M t="100" /> km/h sebességgel! (Az egyenletből is: <M t="\frac{ds}{dt}=\frac{60t\cdot 60 + 80t\cdot 80}{100t}=100" /> km/h.)
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Hasonló háromszögek és a kúpos tartály',
    body: (
      <>
        <p>
          Egy csúcsával lefelé álló kúpba állandó ütemben öntjük a vizet. A víz térfogata <M t="V=\dfrac{1}{3}\pi r^2 h" />, amelyben <strong>két változó</strong> (<M t="r" /> és <M t="h" />) szerepel, miközben mi csak <M t="dh/dt" />-t keressük (és <M t="dr/dt" />-t nem ismerjük).
        </p>
        <p>
          <strong>A megoldás kulcsa:</strong> a kúp metszetében a víz-háromszög mindig <em>hasonló</em> a teljes kúp háromszögéhez! Ha a kúp sugara <M t="R=50" /> cm és magassága <M t="H=100" /> cm, akkor minden pillanatban:
        </p>
        <M block t="\frac{r}{h} = \frac{50}{100} = \frac{1}{2} \;\Longrightarrow\; r = \frac{h}{2} \;\Longrightarrow\; V = \frac{1}{3}\pi\left(\frac{h}{2}\right)^2 h = \frac{\pi}{12}h^3." />
        <p>
          Így egyetlen változó maradt! Most már nyugodtan deriválhatunk <M t="t" /> szerint: <M t="\dfrac{dV}{dt}=\dfrac{\pi}{4}h^2\dfrac{dh}{dt}" />!
        </p>
        <ConeTankWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Egy futószalagról percenként <M t="2\;\text{m}^3" /> homok hullik egy kúpos kupacra, amelynek sugara mindig megegyezik a magasságával (<M t="r=h" />). Milyen gyorsan nő a kupac magassága, amikor <M t="h=2" /> m?
            </>
          }
        >
          <p>
            <M t="V=\dfrac{1}{3}\pi h^3 \Rightarrow \dfrac{dV}{dt}=\pi h^2\dfrac{dh}{dt}" />. Behelyettesítve: <M t="2=\pi\cdot 4\cdot\dfrac{dh}{dt} \Rightarrow \dfrac{dh}{dt}=\dfrac{1}{2\pi}\approx 0{,}159\;\text{m/perc}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              A fenti kúpos tartályban (<M t="r=h/2" />, <M t="dV/dt=9000\;\text{cm}^3/\text{perc}" />) mennyi <M t="dh/dt" /> pontosan <M t="h=60" /> cm-nél?
            </>
          }
        >
          <p>
            <M t="\dfrac{dh}{dt}=\dfrac{4\cdot 9000}{\pi\cdot 60^2}=\dfrac{36\,000}{3600\pi}=\dfrac{10}{\pi}\approx 3{,}18\;\text{cm/perc}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Szögek változási sebessége',
    body: (
      <>
        <p>
          Ha egy kamerával vagy szögmérővel követünk egy mozgó tárgyat (hőlégballont, rakétát, versenyautót), a távolságot és a látószöget egy <strong>trigonometrikus függvény</strong> (leggyakrabban <M t="\operatorname{tg}\theta" />) köti össze!
        </p>
        <p>
          Egy <M t="500" /> méterre lévő megfigyelőnél <M t="\operatorname{tg}\theta = \dfrac{y}{500} \iff y = 500\operatorname{tg}\theta" />. Az idő szerint deriválva (a láncszabállyal!):
        </p>
        <M block t="\frac{dy}{dt} = 500\sec^2\theta\cdot\frac{d\theta}{dt}." />
        <p>
          Amikor <M t="\theta=\dfrac{\pi}{4}" /> (<M t="\sec^2(\pi/4)=2" />) és <M t="\dfrac{d\theta}{dt}=0{,}14" /> rad/perc, akkor <M t="\dfrac{dy}{dt}=500\cdot 2\cdot 0{,}14 = 140" /> m/perc!
        </p>
        <BalloonAngleWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Ha a hőlégballon állandó <M t="100" /> m/perc sebességgel emelkedik, mekkora <M t="\dfrac{d\theta}{dt}" />, amikor <M t="\theta=\dfrac{\pi}{4}" />?
            </>
          }
        >
          <p>
            <M t="100 = 500\cdot 2\cdot\dfrac{d\theta}{dt} \Rightarrow \dfrac{d\theta}{dt}=0{,}1\;\text{rad/perc}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Miért kötelező <M t="d\theta/dt" />-t <strong>radián/idő</strong> egységben behelyettesíteni a <M t="\sec^2\theta\cdot\frac{d\theta}{dt}" /> képletbe?
            </>
          }
        >
          <p>
            Mert a <M t="(\operatorname{tg}\theta)'=\sec^2\theta" /> deriválási szabály csak radiánban érvényes! Ha a válasz fok/s-ban kell, a legvégén szorozd meg <M t="\frac{180}{\pi}" />-vel.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'További klasszikus modellek (jég, árnyék, koszinusztétel)',
    body: (
      <>
        <p>
          Három további, gyakran előforduló alaphelyzet, amelyeket ugyanazzal a 6 lépéses recepttel oldunk meg:
        </p>
        <ul>
          <li>
            <strong>Olvadó jégréteg gömbön:</strong> egy <M t="R_0" /> sugarú vasgolyón lévő <M t="x" /> vastagságú jég térfogata <M t="V=\dfrac{4}{3}\pi(R_0+x)^3-\dfrac{4}{3}\pi R_0^3" />, így <M t="\dfrac{dV}{dt}=4\pi(R_0+x)^2\dfrac{dx}{dt}" />!
          </li>
          <li>
            <strong>Sétáló ember árnyéka:</strong> ha egy <M t="H" /> magas lámpaoszloptól <M t="x" /> távolságra sétál egy <M t="h" /> magas ember, az árnyéka <M t="s" /> hosszú, akkor hasonlóságból <M t="\dfrac{s}{h}=\dfrac{x+s}{H}" />!
          </li>
          <li>
            <strong>Nem derékszögű pályák (koszinusztétel):</strong> ha két hajó <M t="\gamma" /> állandó szögben távolodik egymástól, távolságukra <M t="s^2 = a^2 + b^2 - 2ab\cos\gamma" /> (deriválva szorzatszabállyal az <M t="ab" /> tagra!).
          </li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Egy <M t="4" /> cm sugarú vasgolyót jégréteg borít, amelynek térfogata <M t="10\;\text{cm}^3/\text{perc}" /> ütemben olvad (<M t="dV/dt=-10" />). Milyen gyorsan vékonyodik a jégréteg, amikor <M t="x=2" /> cm vastag?
            </>
          }
        >
          <p>
            <M t="-10 = 4\pi(4+2)^2\dfrac{dx}{dt} = 144\pi\dfrac{dx}{dt} \Rightarrow \dfrac{dx}{dt}=-\dfrac{5}{72\pi}\approx -0{,}022\;\text{cm/perc}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy <M t="6" /> m magas utcai lámpa alól egy <M t="1{,}8" /> m magas gyalogos <M t="1{,}4" /> m/s sebességgel sétál el. Milyen gyorsan nő az árnyéka hossza (<M t="ds/dt" />)?
            </>
          }
        >
          <p>
            Hasonlóságból: <M t="\dfrac{s}{1{,}8}=\dfrac{x+s}{6} \iff 6s = 1{,}8x + 1{,}8s \iff 4{,}2s = 1{,}8x \iff s=\dfrac{3}{7}x" />.
          </p>
          <p>
            Deriválva: <M t="\dfrac{ds}{dt}=\dfrac{3}{7}\dfrac{dx}{dt}=\dfrac{3}{7}\cdot 1{,}4 = 0{,}6\;\text{m/s}" /> (állandó!).
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
              <th>problématípus</th>
              <th>alapegyenlet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Létra / merőleges utak</td>
              <td><M t="x^2 + y^2 = s^2" /></td>
            </tr>
            <tr>
              <td>Kúpos tartály / homokkupac</td>
              <td><M t="V=\frac{1}{3}\pi r^2 h" /> + hasonlóság (<M t="r/h = R/H" />)</td>
            </tr>
            <tr>
              <td>Kamera / hőlégballon szöge</td>
              <td><M t="\operatorname{tg}\theta = y/d" /> (radiánban!)</td>
            </tr>
            <tr>
              <td>Árnyék hossza</td>
              <td><M t="s/h = (x+s)/H" /> (hasonló háromszögek)</td>
            </tr>
            <tr>
              <td>Tetszőleges szögű pályák</td>
              <td><M t="s^2 = a^2 + b^2 - 2ab\cos\gamma" /> (koszinusztétel)</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. Túl korai behelyettesítés!</strong> A vizsgált pillanat adatait (pl. <M t="h=60" /> cm, <M t="x=3" /> m) <strong>CSAK a deriválás UTÁN</strong> szabad behelyettesíteni! Különben konstansnak deriválod és <M t="0" />-t kapsz!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A negatív előjel elhagyása:</strong> ha egy távolság, térfogat vagy magasság <em>csökken</em>, a deriváltja negatív!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Kevert mértékegységek:</strong> ha <M t="V" /> literben van, <M t="r" /> pedig cm-ben, előbb váltsd át (<M t="1\text{ liter}=1000\;\text{cm}^3" />)!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Láncszabály elfelejtése:</strong> <M t="t" /> szerint deriválva <em>minden</em> változó mögé odakerül a <M t="\frac{d(\cdot)}{dt}" /> tényező!
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
              Egy kavics vízbe dobásakor kör alakú hullámgyűrű keletkezik, amelynek sugara <M t="20" /> cm/s sebességgel nő. Milyen gyorsan nő a gyűrű területe, amikor <M t="r=50" /> cm?
            </>
          }
        >
          <p>
            <M t="A=\pi r^2 \Rightarrow \dfrac{dA}{dt}=2\pi r\dfrac{dr}{dt} = 2\pi(50)(20)=2000\pi \approx 6283\;\text{cm}^2/\text{s}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Egy kocka éle <M t="3" /> cm/s sebességgel nő. Milyen gyorsan nő a térfogata és a felszíne, amikor az éle <M t="10" /> cm?
            </>
          }
        >
          <p>
            <M t="V=a^3 \Rightarrow \dfrac{dV}{dt}=3a^2\dfrac{da}{dt}=3\cdot 100\cdot 3 = 900\;\text{cm}^3/\text{s}" />.
          </p>
          <p>
            <M t="S=6a^2 \Rightarrow \dfrac{dS}{dt}=12a\dfrac{da}{dt}=12\cdot 10\cdot 3 = 360\;\text{cm}^2/\text{s}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Egy pont az <M t="y=x^2+1" /> parabolán mozog úgy, hogy <M t="\dfrac{dx}{dt}=4" />. Mennyi <M t="\dfrac{dy}{dt}" />, amikor <M t="x=3" />?
            </>
          }
        >
          <p>
            <M t="\dfrac{dy}{dt}=2x\dfrac{dx}{dt}=2\cdot 3\cdot 4 = 24" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Egy <M t="10" /> m hosszú létra alját <M t="0{,}8" /> m/s sebességgel húzzák el a faltól. Milyen gyorsan csúszik lefelé a teteje, amikor az alja <M t="6" /> m-re van a faltól?
            </>
          }
        >
          <p>
            <M t="y=\sqrt{10^2-6^2}=8" /> m. <M t="\dfrac{dy}{dt}=-\dfrac{6}{8}\cdot 0{,}8 = -0{,}6\;\text{m/s}" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Egy kereszteződéshez északról közeledik egy autó (<M t="y=3" /> km, <M t="60" /> km/h), keletről pedig egy másik (<M t="x=4" /> km, <M t="80" /> km/h). Milyen gyorsan csökken köztük a távolság?
            </>
          }
        >
          <p>
            <M t="s=5" /> km, <M t="\frac{dx}{dt}=-80" />, <M t="\frac{dy}{dt}=-60" />. <M t="\dfrac{ds}{dt}=\dfrac{4(-80)+3(-60)}{5}=-100\;\text{km/h}" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy <M t="4" /> m magas és <M t="2" /> m sugarú (csúcsával lefelé álló) kúpos tartályból <M t="0{,}5\;\text{m}^3/\text{perc}" /> ütemben folyik ki a víz. Milyen gyorsan süllyed a vízszint, amikor <M t="h=2" /> m?
            </>
          }
        >
          <p>
            Hasonlóságból <M t="r=h/2" />, így <M t="V=\dfrac{\pi}{12}h^3" /> és <M t="\dfrac{dV}{dt}=\dfrac{\pi}{4}h^2\dfrac{dh}{dt}" />.
          </p>
          <p>
            <M t="-0{,}5=\pi\dfrac{dh}{dt} \Rightarrow \dfrac{dh}{dt}=-\dfrac{1}{2\pi}\approx -0{,}159\;\text{m/perc}" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Egy pályától <M t="40" /> m-re álló kamera egy <M t="60" /> m/s sebességgel száguldó versenyautót követ. Milyen gyorsan forog a kamera <M t="\theta" /> szöge abban a pillanatban, amikor az autó pontosan előttünk halad el (<M t="\theta=0" />), illetve amikor <M t="x=40" /> m-re jár (<M t="\theta=\pi/4" />)?
            </>
          }
        >
          <p>
            <M t="x=40\operatorname{tg}\theta \Rightarrow \dfrac{dx}{dt}=40\sec^2\theta\dfrac{d\theta}{dt} \Rightarrow \dfrac{d\theta}{dt}=\dfrac{60}{40}\cos^2\theta = 1{,}5\cos^2\theta" />.
          </p>
          <p>
            Előttünk (<M t="\theta=0" />): <M t="1{,}5\;\text{rad/s}" />. <M t="x=40" /> m-nél (<M t="\cos^2(\pi/4)=\frac{1}{2}" />): <M t="0{,}75\;\text{rad/s}" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Két hajó az <M t="O" /> kikötőből <M t="120^\circ" />-os szögben távolodik: az <M t="A" /> hajó <M t="14" /> km/h, a <M t="B" /> hajó <M t="30" /> km/h sebességgel. Milyen gyorsan nő a távolságuk, amikor <M t="a=9" /> km és <M t="b=5" /> km?
            </>
          }
        >
          <p>
            Koszinusztétel (<M t="\cos 120^\circ=-1/2" />): <M t="s^2=a^2+b^2+ab" />. A megadott pillanatban <M t="s=\sqrt{81+25+45}=\sqrt{151}" /> km.
          </p>
          <p>
            Deriválva: <M t="2s\dfrac{ds}{dt}=(2a+b)\dfrac{da}{dt}+(2b+a)\dfrac{db}{dt} = 23\cdot 14 + 19\cdot 30 = 892 \Rightarrow \dfrac{ds}{dt}=\dfrac{446}{\sqrt{151}}\approx 36{,}3\;\text{km/h}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              A 10. feladatban (<M t="H=6" /> m lámpa, <M t="h=1{,}8" /> m gyalogos, <M t="dx/dt=1{,}4" /> m/s) milyen gyorsan mozog az <strong>árnyék csúcsa</strong> a talajon (vagyis <M t="\frac{d}{dt}(x+s)" />)?
            </>
          }
        >
          <p>
            Mivel <M t="\dfrac{ds}{dt}=0{,}6" /> m/s, az árnyék csúcsának sebessége <M t="\dfrac{dx}{dt}+\dfrac{ds}{dt}=1{,}4+0{,}6=2{,}0\;\text{m/s}" />!
          </p>
        </Task>
      </>
    ),
  },
];
