import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AxisChoiceComparatorWidget,
  CavalieriSlicingWidget,
  DiskMethodWidget,
  ShiftedAxisDiagram,
  WasherMethodWidget,
} from '../components/Widgets61';
import type { Page } from './s1_1';

export const S6_1: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Térfogatszámítás szeleteléssel és a Cavalieri-elv',
    body: (
      <>
        <Story>
          <p>
            Az 5. fejezetben 2D-s területeket számoltunk ki végtelenül vékony téglalapok összeadásával. Most belépünk a <strong>háromdimenziós térbe</strong>! Hogyan mérjük meg egy tetszőleges alakú test — egy gúla, egy gömb, egy váza vagy akár egy cipó — térfogatát? Pontosan úgy, ahogy a kenyeret szeleteljük: nagyon vékony, <M t="\Delta x" /> vastag lapokra vágjuk, amelyeknek a térfogata <M t="A(x)\cdot\Delta x" />, majd összegezzük őket!
          </p>
        </Story>
        <Def title="Térfogat keresztmetszeti területtel (szeleteléses módszer)">
          <p>
            Ha egy test <M t="x" />-tengelyre merőleges síkmetszetének területe az integrálható <M t="A(x)" /> függvény az <M t="[a;\,b]" /> intervallumon, akkor a test térfogata:
          </p>
          <M block t="V \;=\; \int_{a}^{b} A(x)\,dx." />
        </Def>
        <h3>A 4 lépéses terv minden térfogatfeladathoz</h3>
        <ol className="steps">
          <li><strong>Vázold fel</strong> a testet (vagy az alapját) és egy tipikus síkmetszetet!</li>
          <li><strong>Írd fel <M t="A(x)" />-et</strong> (a metszet területét <M t="x" /> függvényeként)!</li>
          <li><strong>Olvasd le az <M t="[a;\,b]" /> határokat</strong>, amelyeken a metszetek végigfutnak!</li>
          <li><strong>Integráld <M t="A(x)" />-et</strong> a Newton–Leibniz-tétellel!</li>
        </ol>
        <h3>A Cavalieri-elv</h3>
        <p>
          A képletből azonnal látszik <strong>Cavalieri híres elve</strong>: ha két test magassága azonos, és minden magasságban ugyanakkora a keresztmetszetük területe (<M t="A_1(x)=A_2(x)" />), akkor a <strong>térfogatuk is egyenlő</strong> — akkor is, ha az egyik ferde vagy elcsúsztatott!
        </p>
        <CavalieriSlicingWidget />
        <h3>Mintapélda: gúla térfogata</h3>
        <p>
          Egy <M t="3\text{ m}" /> magas gúla alapja <M t="3\text{ m}" /> oldalú négyzet; a csúcsától <M t="x" /> távolságra a metszete <M t="x" /> oldalú négyzet, így <M t="A(x)=x^2" />:
        </p>
        <M block t="V = \int_{0}^{3} x^2\,dx = \left[\frac{x^3}{3}\right]_{0}^{3} = \mathbf{9\text{ m}^3} \quad \left(\text{pontosan } \frac{1}{3}Ah = \frac{1}{3}\cdot 9\cdot 3\right)!" />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Egy test alapja az <M t="y=\sqrt{x}" /> és <M t="y=-\sqrt{x}" /> görbék között fekszik <M t="0\le x\le 4" /> esetén. Az <M t="x" />-tengelyre merőleges síkmetszetei olyan <strong>négyzetek</strong>, amelyek egyik oldala az alapsíkban fekszik. Mekkora a test térfogata?
            </>
          }
        >
          <p>
            Az <M t="x" /> helyen a négyzet oldala <M t="s = \sqrt{x}-(-\sqrt{x}) = 2\sqrt{x}" />, így <M t="A(x) = s^2 = 4x" />.
          </p>
          <M block t="V = \int_{0}^{4} 4x\,dx = \Bigl[2x^2\Bigr]_{0}^{4} = \mathbf{32}." />
        </Task>
        <Task
          n={2}
          q={
            <>
              Egy test alapja az <M t="x^2+y^2\le 1" /> egységkörlap, az <M t="x" />-tengelyre merőleges síkmetszetei pedig <strong>egyenlő oldalú háromszögek</strong>. Számítsd ki a térfogatát! <em>(Tipp: egy <M t="s" /> oldalú szabályos háromszög területe <M t="\frac{\sqrt{3}}{4}s^2" />.)</em>
            </>
          }
        >
          <p>
            Az <M t="x" /> helyen az alap húrja <M t="s = 2\sqrt{1-x^2}" />, ezért <M t="A(x) = \frac{\sqrt{3}}{4}\cdot 4(1-x^2) = \sqrt{3}(1-x^2)" />. Páros függvény <M t="[-1;\,1]" />-en:
          </p>
          <M block t="V = 2\sqrt{3}\int_{0}^{1}(1-x^2)\,dx = 2\sqrt{3}\left[x-\frac{x^3}{3}\right]_{0}^{1} = \mathbf{\frac{4\sqrt{3}}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Forgástestek: a korong-módszer (x-tengely körül)',
    body: (
      <>
        <Story>
          <p>
            A szeletelés leggyakoribb és leglátványosabb esete, amikor egy síktartományt megforgatunk az <M t="x" />-tengely körül — pont úgy, ahogy a fazekas korongján vagy az esztergapadon születik egy váza, kúp vagy gömb! Ilyenkor minden egyes szelet egy <strong>körlap (korong)</strong>!
          </p>
        </Story>
        <Def title="Korong-módszer (forgatás az x-tengely körül)">
          <p>
            Ha az <M t="y = R(x) \ge 0" /> görbe alatti tartományt az <M t="[a;\,b]" /> intervallumon megforgatjuk az <M t="x" />-tengely körül, akkor az <M t="x" /> helyen keletkező korong sugara <M t="R(x)" />, területe <M t="A(x)=\pi [R(x)]^2" />, így a forgástest térfogata:
          </p>
          <M block t="V \;=\; \int_{a}^{b} \pi\bigl[R(x)\bigr]^2\,dx." />
        </Def>
        <DiskMethodWidget />
        <h3>Híres levezetés: a gömb térfogata (<M t="\frac{4}{3}\pi r^3" />)</h3>
        <p>
          Forgassuk meg az <M t="y=\sqrt{r^2-x^2}" /> felső félkört az <M t="x" />-tengely körül a <M t="[-r;\,r]" /> intervallumon! A páros szimmetriával:
        </p>
        <M block t="V = \pi\int_{-r}^{r}\left(\sqrt{r^2-x^2}\right)^2 dx = 2\pi\int_{0}^{r}(r^2-x^2)\,dx = 2\pi\left[r^2x - \frac{x^3}{3}\right]_{0}^{r} = 2\pi\cdot\frac{2}{3}r^3 = \mathbf{\frac{4}{3}\pi r^3}!" />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Forgassuk meg az <M t="y=x^2" /> görbe alatti tartományt a <M t="[0;\,2]" /> intervallumon az <M t="x" />-tengely körül! Mekkora a keletkező forgástest térfogata?
            </>
          }
        >
          <p>
            <M t="R(x)=x^2 \implies [R(x)]^2 = x^4" />:
          </p>
          <M block t="V = \pi\int_{0}^{2} x^4\,dx = \pi\left[\frac{x^5}{5}\right]_{0}^{2} = \mathbf{\frac{32\pi}{5}}." />
        </Task>
        <Task
          n={4}
          q={
            <>
              Igazold a korong-módszerrel, hogy egy <M t="r" /> alapsugarú és <M t="h" /> magasságú egyenes körkúp térfogata <M t="\dfrac{1}{3}\pi r^2 h" />! <em>(Forgasd meg az <M t="y=\frac{r}{h}x" /> egyenest a <M t="[0;\,h]" />-n!)</em>
            </>
          }
        >
          <p>
            <M t="V = \pi\int_{0}^{h}\left(\frac{r}{h}x\right)^2 dx = \pi\frac{r^2}{h^2}\left[\frac{x^3}{3}\right]_{0}^{h} = \pi\frac{r^2}{h^2}\cdot\frac{h^3}{3} = \mathbf{\dfrac{1}{3}\pi r^2 h}" />!
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Forgatás az y-tengely vagy eltolt tengely körül',
    body: (
      <>
        <Story>
          <p>
            Mi történik, ha nem az <M t="x" />-tengely körül, hanem az <strong><M t="y" />-tengely</strong> vagy egy eltolt <strong><M t="y = c" /> / <M t="x = c" /> egyenes</strong> körül forgatunk? Semmi baj — a korong mindig <em>merőleges</em> a forgástengelyre, a sugara pedig mindig a görbe és a <strong>tengely közötti távolság</strong>!
          </p>
        </Story>
        <Def title="Forgatás függőleges (y-tengely) és eltolt tengelyek körül">
          <ul>
            <li>
              <strong>Függőleges tengely (<M t="y" />-tengely vagy <M t="x=c" />):</strong> vízszintes korongok <M t="dy" /> vastagsággal, a sugár <M t="y" /> függvénye:
              <M block t="V \;=\; \int_{c}^{d} \pi\bigl[R(y)\bigr]^2\,dy." />
            </li>
            <li>
              <strong>Eltolt vízszintes tengely (<M t="y=c" />):</strong> függőleges korongok <M t="dx" /> vastagsággal, a sugár <M t="R(x) = |f(x)-c|" />!
            </li>
          </ul>
        </Def>
        <ShiftedAxisDiagram />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Forgassuk meg az <M t="y=x^2\;(x\ge 0)" />, az <M t="y" />-tengely és az <M t="y=4" /> egyenes által határolt tartományt az <strong><M t="y" />-tengely</strong> körül!
            </>
          }
        >
          <p>
            Rendezzük <M t="x" />-re: <M t="x = \sqrt{y}" />, így <M t="R(y)=\sqrt{y}" /> a <M t="[0;\,4]" />-en:
          </p>
          <M block t="V = \pi\int_{0}^{4}(\sqrt{y})^2\,dy = \pi\int_{0}^{4} y\,dy = \pi\left[\frac{y^2}{2}\right]_{0}^{4} = \mathbf{8\pi}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Forgassuk meg az <M t="y=\sqrt{x}" />, az <M t="y=1" /> és az <M t="x=4" /> által határolt tartományt az <strong><M t="y=1" /> egyenes</strong> körül!
            </>
          }
        >
          <p>
            Az <M t="y=\sqrt{x}" /> és <M t="y=1" /> metszéspontja <M t="x=1" />, tehát az intervallum <M t="[1;\,4]" />. A sugár a tengelytől mérve <M t="R(x) = \sqrt{x}-1" />:
          </p>
          <M block t="V = \pi\int_{1}^{4}(\sqrt{x}-1)^2\,dx = \pi\int_{1}^{4}\left(x - 2x^{1/2} + 1\right)dx = \pi\left[\frac{x^2}{2}-\frac{4}{3}x^{3/2}+x\right]_{1}^{4} = \pi\left(\frac{4}{3}-\frac{1}{6}\right) = \mathbf{\frac{7\pi}{6}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A gyűrű-módszer (Washer Method — amikor lyuk van benne!)',
    body: (
      <>
        <Story>
          <p>
            Ha a megforgatott tartomány nem ér hozzá a forgástengelyhez (mert két görbe közé van szorítva), akkor a forgástest közepén egy <strong>üreg (lyuk)</strong> marad! Ilyenkor egy szelet már nem teli korong, hanem egy csavar-alátétre emlékeztető <strong>körgyűrű</strong> — amelynek a területe a nagy kör mínusz a kis kör!
          </p>
        </Story>
        <Def title="Gyűrű-módszer (külső sugár R, belső sugár r)">
          <p>
            Ha a forgástengelytől a távolabbi határ <M t="R(x)" />, a közelebbi határ <M t="r(x)" /> (<M t="R(x)\ge r(x)\ge 0" />), akkor a keresztmetszet területe <M t="A(x) = \pi R(x)^2 - \pi r(x)^2" />, és a térfogat:
          </p>
          <M block t="V \;=\; \int_{a}^{b} \pi\Bigl(\bigl[R(x)\bigr]^2 - \bigl[r(x)\bigr]^2\Bigr)\,dx." />
          <p>Függőleges forgástengely körül ugyanez <M t="y" /> szerint: <M t="V = \int_c^d \pi\bigl([R(y)]^2 - [r(y)]^2\bigr)\,dy" />.</p>
        </Def>
        <p>
          <strong>Óriási figyelmeztetés:</strong> a képletben a négyzetek különbsége áll (<M t="R^2 - r^2" />), <strong>NEM</strong> pedig a különbség négyzete (<M t="(R-r)^2" />)!
        </p>
        <WasherMethodWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Forgassuk meg az <M t="y=x" /> és <M t="y=x^2" /> görbék által bezárt tartományt az <M t="x" />-tengely körül!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="x=0,\;1" />. A <M t="[0;\,1]" />-en <M t="R(x)=x" /> (külső), <M t="r(x)=x^2" /> (belső):
          </p>
          <M block t="V = \pi\int_{0}^{1}\left(x^2 - (x^2)^2\right)dx = \pi\left[\frac{x^3}{3}-\frac{x^5}{5}\right]_{0}^{1} = \pi\left(\frac{1}{3}-\frac{1}{5}\right) = \mathbf{\frac{2\pi}{15}}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Forgassuk meg az <M t="y=x^2" /> parabola és az <M t="y=2x" /> egyenes által bezárt tartományt az <strong><M t="y" />-tengely</strong> körül!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="(0;\,0)" /> és <M t="(2;\,4)" />, tehát <M t="y\in[0;\,4]" />. Rendezzük <M t="x" />-re: a távolabbi (külső) görbe a parabola (<M t="R(y)=\sqrt{y}" />), a közelebbi (belső) az egyenes (<M t="r(y)=y/2" />):
          </p>
          <M block t="V = \pi\int_{0}^{4}\left((\sqrt{y})^2 - \left(\frac{y}{2}\right)^2\right)dy = \pi\int_{0}^{4}\left(y - \frac{y^2}{4}\right)dy = \pi\left[\frac{y^2}{2}-\frac{y^3}{12}\right]_{0}^{4} = \mathbf{\frac{8\pi}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Gyűrű-módszer eltolt tengely körül és különleges testek',
    body: (
      <>
        <Story>
          <p>
            Mi történik, ha ugyanazt a kis síkidomot nem az <M t="x" />-tengely, hanem az <M t="y=-1" /> vagy az <M t="y=2" /> egyenes körül forgatjuk meg? A sugarak megváltoznak — sőt, ha a tengely a tartomány <em>fölött</em> fut, akkor a „felső” és „alsó” görbe <strong>szerepet cserél</strong> abban, hogy melyik a külső sugár!
          </p>
        </Story>
        <AxisChoiceComparatorWidget />
        <h3>A biztos módszer eltolt tengelyhez</h3>
        <ol className="steps">
          <li><strong>Rajzold be szaggatottan a forgástengelyt</strong> (<M t="y=c" />)!</li>
          <li><strong>Külső sugár (<M t="R" />):</strong> a tengelytől <em>messzebb</em> lévő görbe távolsága (<M t="\text{nagyobb}-\text{kisebb}" />).</li>
          <li><strong>Belső sugár (<M t="r" />):</strong> a tengelyhez <em>közelebb</em> lévő görbe távolsága.</li>
        </ol>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki az <M t="y=x" /> és <M t="y=x^2" /> görbék közötti tartomány <M t="y=-1" /> egyenes körüli forgatásával keletkező test térfogatát!
            </>
          }
        >
          <p>
            <M t="R(x) = x - (-1) = x+1" />, <M t="r(x) = x^2 - (-1) = x^2+1" />. Különbségük négyzete:
            <M t="(x+1)^2 - (x^2+1)^2 = (x^2+2x+1)-(x^4+2x^2+1) = 2x - x^2 - x^4" />.
          </p>
          <M block t="V = \pi\int_{0}^{1}(2x-x^2-x^4)\,dx = \pi\left[x^2-\frac{x^3}{3}-\frac{x^5}{5}\right]_{0}^{1} = \mathbf{\frac{7\pi}{15}}." />
        </Task>
        <Task
          n={10}
          q={
            <>
              <em>Hengerből kivágott ék (Thomas klasszikus):</em> egy <M t="3" /> sugarú körhengerből egy alapsík és egy ahhoz <M t="45^\circ" />-ban hajló, az alap átmérőjén átmenő sík éket vág ki. Az <M t="x" /> helyen (<M t="0\le x\le 3" />) a metszet <M t="x" /> magas és <M t="2\sqrt{9-x^2}" /> széles téglalap. Mekkora az ék térfogata?
            </>
          }
        >
          <p>
            <M t="A(x) = 2x\sqrt{9-x^2}" />. Az <M t="u=9-x^2,\; du=-2x\,dx" /> helyettesítéssel (<M t="0\mapsto 9,\; 3\mapsto 0" />):
          </p>
          <M block t="V = \int_{0}^{3} 2x\sqrt{9-x^2}\,dx = \int_{0}^{9}\sqrt{u}\,du = \left[\frac{2}{3}u^{3/2}\right]_{0}^{9} = \frac{2}{3}\cdot 27 = \mathbf{18}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="6.1 Puskakártya">
          <ul>
            <li><strong>Általános szeletelés:</strong> <M t="V = \int_a^b A(x)\,dx" /> (Cavalieri-elv: azonos <M t="A(x) \implies" /> azonos <M t="V" />).</li>
            <li><strong>Korong (<M t="x" />-tengely / <M t="y=c" />):</strong> <M t="V = \pi\int_a^b [R(x)]^2\,dx" />.</li>
            <li><strong>Korong (<M t="y" />-tengely / <M t="x=c" />):</strong> <M t="V = \pi\int_c^d [R(y)]^2\,dy" />.</li>
            <li><strong>Gyűrű (alátét):</strong> <M t="V = \pi\int_a^b \bigl([R(x)]^2 - [r(x)]^2\bigr)\,dx" /> (vagy ugyanez <M t="dy" />-vel).</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong><M t="R^2 - r^2 \neq (R-r)^2" />!</strong> A gyűrű területe <M t="\pi R^2 - \pi r^2" />, SOHA ne vontsd ki a sugarakat négyzetre emelés előtt!
            </li>
            <li>
              <strong>Elfelejtett <M t="\pi" /> vagy négyzetre emelés:</strong> forgástestnél minden szelet kör vagy körgyűrű, a <M t="\pi" /> és a négyzet kötelező!
            </li>
            <li>
              <strong>Rossz integrálási változó:</strong> korong/gyűrű módszernél a szelet mindig <em>merőleges</em> a tengelyre — vízszintes tengelynél <M t="dx" />, függőleges tengelynél <M t="dy" />!
            </li>
            <li>
              <strong>Eltolt tengely:</strong> ha <M t="y=2" /> körül forgatsz, a sugár nem <M t="f(x)" />, hanem <M t="|f(x)-2|" />, és az alsóbb görbe lesz a külső sugár!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Forgassuk meg az <M t="y=2x" /> egyenes alatti tartományt a <M t="[0;\,3]" /> intervallumon az <M t="x" />-tengely körül! Ellenőrizd az eredményt a kúp képletével!
            </>
          }
        >
          <p>
            <M t="V = \pi\int_0^3 (2x)^2\,dx = 4\pi\left[\frac{x^3}{3}\right]_0^3 = \mathbf{36\pi}" />. Kúp-ellenőrzés (<M t="r=6,\;h=3" />): <M t="\frac{1}{3}\pi\cdot 6^2\cdot 3 = 36\pi" /> ✓
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Forgassuk meg az <M t="y=1-x^2" /> parabola <M t="x" />-tengely fölötti darabját (<M t="[-1;\,1]" />) az <M t="x" />-tengely körül!
            </>
          }
        >
          <p>
            Páros integrandus: <M t="V = 2\pi\int_0^1 (1-x^2)^2\,dx = 2\pi\int_0^1(1-2x^2+x^4)\,dx = 2\pi\left(1-\frac{2}{3}+\frac{1}{5}\right) = \mathbf{\dfrac{16\pi}{15}}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Forgassuk meg az <M t="x=\sqrt{y}" /> görbe és az <M t="y" />-tengely közti tartományt a <M t="[0;\,4]" /> szakaszon az <M t="y" />-tengely körül!
            </>
          }
        >
          <p>
            <M t="V = \pi\int_0^4 (\sqrt{y})^2\,dy = \pi\left[\frac{y^2}{2}\right]_0^4 = \mathbf{8\pi}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Forgassuk meg az <M t="y=\sqrt{x}" /> és az <M t="y=\frac{x}{2}" /> görbék által bezárt tartományt az <M t="x" />-tengely körül!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="\sqrt{x}=\frac{x}{2} \implies x=0,\;4" />. Gyűrű-módszerrel:
          </p>
          <M block t="V = \pi\int_{0}^{4}\left(x - \frac{x^2}{4}\right)dx = \pi\left[\frac{x^2}{2}-\frac{x^3}{12}\right]_{0}^{4} = \pi\left(8-\frac{16}{3}\right) = \mathbf{\frac{8\pi}{3}}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Forgassuk meg az <M t="y=x^2+1" /> és az <M t="y=-x+3" /> görbék által bezárt tartományt az <M t="x" />-tengely körül!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="x^2+1=-x+3 \implies (x+2)(x-1)=0 \implies x=-2,\;1" />. Külső: <M t="-x+3" />, belső: <M t="x^2+1" />:
          </p>
          <M block t="V = \pi\int_{-2}^{1}\bigl((-x+3)^2-(x^2+1)^2\bigr)\,dx = \pi\int_{-2}^{1}(8-6x-x^2-x^4)\,dx = \mathbf{\frac{117\pi}{5}}." />
        </Task>
        <Task
          n={16}
          q={
            <>
              Egy test alapja az <M t="x^2+y^2\le 4" /> körlap, és az <M t="x" />-tengelyre merőleges síkmetszetei <strong>négyzetek</strong>. Mekkora a test térfogata?
            </>
          }
        >
          <p>
            Az <M t="x" /> helyen a négyzet oldala <M t="2\sqrt{4-x^2}" />, így <M t="A(x) = 4(4-x^2)" />:
          </p>
          <M block t="V = 2\int_{0}^{2} 4(4-x^2)\,dx = 8\left[4x-\frac{x^3}{3}\right]_{0}^{2} = 8\left(8-\frac{8}{3}\right) = \mathbf{\frac{128}{3}}." />
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Forgassuk meg az <M t="y=x" /> és <M t="y=x^2" /> görbék által bezárt tartományt az <strong><M t="y=2" /> egyenes</strong> körül!
            </>
          }
        >
          <p>
            A tengely fölöttük van, így a távolabbi (külső) görbe <M t="x^2" />: <M t="R(x)=2-x^2" />, a közelebbi <M t="r(x)=2-x" />.
            <M t="R^2-r^2 = (4-4x^2+x^4)-(4-4x+x^2) = x^4-5x^2+4x" />:
          </p>
          <M block t="V = \pi\int_{0}^{1}(x^4-5x^2+4x)\,dx = \pi\left(\frac{1}{5}-\frac{5}{3}+2\right) = \mathbf{\frac{8\pi}{15}}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              <em>Gömbszelet térfogata:</em> egy <M t="r" /> sugarú gömbből levágunk egy <M t="h" /> magasságú (<M t="0\le h\le 2r" />) gömbszeletet. Igazold a korong-módszerrel, hogy a térfogata <M t="V = \pi h^2\left(r - \dfrac{h}{3}\right)" />!
            </>
          }
        >
          <p>
            Forgassuk meg az <M t="y=\sqrt{r^2-x^2}" /> ívet az <M t="[r-h;\,r]" /> intervallumon:
          </p>
          <M block t="V = \pi\int_{r-h}^{r}(r^2-x^2)\,dx = \pi\left[r^2x - \frac{x^3}{3}\right]_{r-h}^{r} = \pi\left(\frac{2}{3}r^3 - r^2(r-h) + \frac{(r-h)^3}{3}\right) = \mathbf{\pi h^2\left(r-\frac{h}{3}\right)}." />
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Csonkakúp térfogata:</em> forgasd meg az <M t="y = r_1 + \dfrac{r_2-r_1}{h}x" /> szakaszt a <M t="[0;\,h]" /> intervallumon az <M t="x" />-tengely körül, és igazold, hogy <M t="V = \dfrac{\pi h}{3}\left(r_1^2 + r_1 r_2 + r_2^2\right)" />!
            </>
          }
        >
          <p>
            Ha <M t="r_1=r_2" />, henger (<M t="\pi r_1^2 h" />). Ha <M t="r_1\neq r_2" />, legyen <M t="u = r_1 + \frac{r_2-r_1}{h}x" />, így <M t="dx = \frac{h}{r_2-r_1}\,du" />, határok <M t="r_1 \to r_2" />:
          </p>
          <M block t="V = \frac{\pi h}{r_2-r_1}\int_{r_1}^{r_2} u^2\,du = \frac{\pi h}{3}\cdot\frac{r_2^3-r_1^3}{r_2-r_1} = \mathbf{\frac{\pi h}{3}\left(r_1^2 + r_1 r_2 + r_2^2\right)}." />
        </Task>
      </>
    ),
  },
];
