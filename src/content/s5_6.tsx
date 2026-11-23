import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AreaBetweenCurvesWidget,
  CrossingCurvesWidget,
  DefiniteSubCompareDiagram,
  HorizontalVsVerticalWidget,
  SymmetryIntegralWidget,
} from '../components/Widgets56';
import type { Page } from './s1_1';

export const S5_6: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Helyettesítés határozott integrálban (határok átszámítása)',
    body: (
      <>
        <Story>
          <p>
            Az 5.5-ben megtanultuk az <M t="u" />-helyettesítést határozatlan integrálokra. Amikor azonban <strong>határozott</strong> integrált számolunk helyettesítéssel, van egy zseniális gyorsítás: ha a változóval együtt az <strong>integrálási határokat is átszámítjuk <M t="u" />-ra</strong>, akkor a végén már <em>egyáltalán nem kell visszahelyettesíteni <M t="x" />-re</em>!
          </p>
        </Story>
        <Def title="6. Tétel — Helyettesítés a határozott integrálban">
          <p>
            Ha <M t="g'" /> folytonos az <M t="[a;\,b]" /> intervallumon, és <M t="f" /> folytonos <M t="g" /> értékkészletén, akkor <M t="u=g(x),\;du=g'(x)\,dx" /> választással:
          </p>
          <M block t="\int_{a}^{b} f\bigl(g(x)\bigr)\cdot g'(x)\,dx \;=\; \int_{g(a)}^{g(b)} f(u)\,du." />
        </Def>
        <h3>Kétsoros bizonyítás</h3>
        <p>
          Ha <M t="F" /> az <M t="f" /> egy primitív függvénye, akkor a láncszabály miatt <M t="F(g(x))" /> primitív függvénye <M t="f(g(x))g'(x)" />-nek. A Newton–Leibniz-tétellel:
        </p>
        <M block t="\int_{a}^{b} f(g(x))g'(x)\,dx = \Bigl[F(g(x))\Bigr]_{a}^{b} = F\bigl(g(b)\bigr) - F\bigl(g(a)\bigr) = \Bigl[F(u)\Bigr]_{g(a)}^{g(b)} = \int_{g(a)}^{g(b)} f(u)\,du. \quad\blacksquare" />
        <DefiniteSubCompareDiagram />
        <p>
          <em>Megjegyzés:</em> előfordulhat, hogy az új alsó határ nagyobb lesz az új felső határnál (<M t="g(a) > g(b)" />). Ne ijedj meg tőle — az 5.3 első szabályával egyszerűen megfordíthatod egy mínuszjel árán, vagy hagyhatod is úgy és kiértékelheted sorrendben!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Számítsd ki a határok átszámításával: <M t="\displaystyle\int_{0}^{1} 2x(x^2+1)^3\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x^2+1,\; du = 2x\,dx" />. Határok: <M t="x=0 \mapsto u=1" />, <M t="x=1 \mapsto u=2" />.
          </p>
          <M block t="\int_{1}^{2} u^3\,du = \left[\frac{u^4}{4}\right]_{1}^{2} = \frac{16-1}{4} = \mathbf{\frac{15}{4}}." />
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{0}^{\pi/2}\sin^3 x\cos x\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = \sin x,\; du = \cos x\,dx" />. Határok: <M t="x=0 \mapsto u=0" />, <M t="x=\frac{\pi}{2} \mapsto u=1" />.
          </p>
          <M block t="\int_{0}^{1} u^3\,du = \left[\frac{u^4}{4}\right]_{0}^{1} = \mathbf{\frac{1}{4}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Szimmetria-trükk: páros és páratlan függvények [−a; a]-n',
    body: (
      <>
        <Story>
          <p>
            Ha az integrál határai szimmetrikusak a nullára (például <M t="[-2;\,2]" /> vagy <M t="[-\pi;\,\pi]" />), <strong>mielőtt bármit integrálnál, nézd meg a paritást!</strong> Rengeteg számolást spórolhatsz meg — páratlan függvénynél akár egy egész oldalas rémség is azonnal <M t="0" />!
          </p>
        </Story>
        <Def title="7. Tétel — Szimmetrikus függvények határozott integrálja">
          <p>Legyen <M t="f" /> folytonos a szimmetrikus <M t="[-a;\,a]" /> intervallumon.</p>
          <ul>
            <li>
              Ha <M t="f" /> <strong>páros</strong> (<M t="f(-x)=f(x)" />), akkor:
              <M block t="\int_{-a}^{a} f(x)\,dx \;=\; 2\int_{0}^{a} f(x)\,dx." />
            </li>
            <li>
              Ha <M t="f" /> <strong>páratlan</strong> (<M t="f(-x)=-f(x)" />), akkor:
              <M block t="\int_{-a}^{a} f(x)\,dx \;=\; 0." />
            </li>
          </ul>
        </Def>
        <p>
          <strong>Miért igaz?</strong> Bontsuk fel <M t="0" />-nál: <M t="\int_{-a}^0 f(x)\,dx + \int_0^a f(x)\,dx" />. Az elsőben végezzük el az <M t="u=-x" /> helyettesítést (<M t="du=-dx" />, határok <M t="a\to 0" />): <M t="\int_{-a}^0 f(x)\,dx = \int_0^a f(-u)\,du" />. Ha <M t="f" /> páros, ez éppen <M t="+\int_0^a f" /> (duplázódik); ha páratlan, akkor <M t="-\int_0^a f" /> (kiejtik egymást)!
        </p>
        <SymmetryIntegralWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki szimmetriával: <M t="\displaystyle\int_{-2}^{2}(x^4 - 4x^2 + 6)\,dx" />!
            </>
          }
        >
          <p>
            Csupa páros hatvány, tehát a függvény páros:
          </p>
          <M block t="2\int_{0}^{2}(x^4-4x^2+6)\,dx = 2\left[\frac{x^5}{5}-\frac{4}{3}x^3+6x\right]_{0}^{2} = 2\left(\frac{32}{5}-\frac{32}{3}+12\right) = \mathbf{\frac{232}{15}}." />
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki szimmetriával: (a) <M t="\displaystyle\int_{-\pi/2}^{\pi/2}\dfrac{x^3\cos x}{1+x^4}\,dx" />, (b) <M t="\displaystyle\int_{-1}^{1}(x^5 - 3x^3 + 3x^2 + 1)\,dx" />!
            </>
          }
        >
          <p>
            (a) A számláló páratlan (<M t="x^3" /> páratlan, <M t="\cos x" /> páros), a nevező páros <M t="\implies" /> a teljes tört <strong>páratlan</strong>, így a szimmetrikus integrál azonnal <M t="\mathbf{0}" />!<br />
            (b) A páratlan tagok (<M t="x^5, -3x^3" />) eltűnnek, a párosak duplázódnak: <M t="2\int_0^1(3x^2+1)\,dx = 2\Bigl[x^3+x\Bigr]_0^1 = \mathbf{4}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Két görbe által közbezárt terület (függőleges szeletek, dx)',
    body: (
      <>
        <Story>
          <p>
            Eddig egy görbe és az <M t="x" />-tengely közötti területet számoltuk. Most egyetlen lépéssel általánosítjuk: mekkora a terület <strong>két tetszőleges görbe</strong> — egy felső <M t="y=f(x)" /> és egy alsó <M t="y=g(x)" /> — között?
          </p>
        </Story>
        <Def title="Két görbe közötti terület (függőleges szeletelés)">
          <p>
            Ha <M t="f" /> és <M t="g" /> folytonos, és <M t="f(x) \ge g(x)" /> minden <M t="x\in[a;\,b]" />-re, akkor a két görbe, valamint az <M t="x=a" /> és <M t="x=b" /> egyenesek által határolt tartomány területe:
          </p>
          <M block t="A \;=\; \int_{a}^{b} \bigl[f(x) - g(x)\bigr]\,dx \;=\; \int_{a}^{b} (\text{felső} - \text{alsó})\,dx." />
        </Def>
        <p>
          <strong>Fontos felismerés:</strong> a képlet akkor is <em>pontosan</em> igaz, ha az egyik vagy mindkét görbe az <M t="x" />-tengely <strong>alatt</strong> fut! Miért? Mert egy függőleges téglalap magassága mindig <M t="y_{\text{felső}} - y_{\text{alsó}} = f(x) - g(x) \ge 0" />, akár pozitívak, akár negatívak a koordináták! (Próbáld ki a 3. fület az ábrán!)
        </p>
        <AreaBetweenCurvesWidget />
        <h3>Ha nincsenek megadva az a, b határok</h3>
        <p>
          Ha a feladat azt mondja, hogy <em>„a két görbe által közrezárt tartomány területe”</em>, akkor először oldd meg az <strong><M t="f(x)=g(x)" /> egyenletet</strong> — a megoldások adják az <M t="a" /> és <M t="b" /> metszéspontokat!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Határozd meg az <M t="y=2-x^2" /> parabola és az <M t="y=-x" /> egyenes által közrezárt tartomány területét!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="2-x^2 = -x \implies x^2-x-2 = (x-2)(x+1) = 0 \implies x=-1,\;2" />. Közöttük a parabola van felül (<M t="x=0" />-nál <M t="2 > 0" />):
          </p>
          <M block t="A = \int_{-1}^{2}\bigl((2-x^2)-(-x)\bigr)\,dx = \left[2x+\frac{x^2}{2}-\frac{x^3}{3}\right]_{-1}^{2} = \frac{10}{3}-\left(-\frac{7}{6}\right) = \mathbf{\frac{9}{2}}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Határozd meg az <M t="y=\sqrt{x}" /> és az <M t="y=x^2" /> görbék által bezárt tartomány területét!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="\sqrt{x}=x^2 \implies x=0,\;1" />. A <M t="[0;\,1]" />-en <M t="\sqrt{x} \ge x^2" />:
          </p>
          <M block t="A = \int_{0}^{1}\left(x^{1/2}-x^2\right)dx = \left[\frac{2}{3}x^{3/2}-\frac{x^3}{3}\right]_{0}^{1} = \frac{2}{3}-\frac{1}{3} = \mathbf{\frac{1}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Amikor a görbék többször metszik egymást (szerepcsere!)',
    body: (
      <>
        <Story>
          <p>
            Mi történik, ha az <M t="[a;\,b]" /> intervallum belsejében a két görbe <strong>keresztezi egymást</strong>? Ilyenkor a metszéspontnál szerepet cserélnek: amelyik eddig felül volt, alulra kerül! Ha nem bontjuk fel az integrált a metszéspontnál, a két darab előjelesen kivonódna egymásból!
          </p>
        </Story>
        <Def title="Általános területképlet metsző görbékre">
          <M block t="A \;=\; \int_{a}^{b} \bigl|f(x) - g(x)\bigr|\,dx." />
          <p>
            Gyakorlatban: keresd meg az összes <M t="f(x)=g(x)" /> metszéspontot az <M t="(a;\,b)" /> belsejében, bontsd fel az intervallumot, és minden részintervallumon integráld a <strong>(felső − alsó)</strong> különbséget!
          </p>
        </Def>
        <CrossingCurvesWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Számítsd ki az <M t="y=x^3" /> és <M t="y=x" /> görbék által közrezárt teljes területet a <M t="[-1;\,1]" /> intervallumon!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="x^3=x \implies x=-1,\;0,\;1" />. Mivel a két tartomány szimmetrikus, elég a <M t="[0;\,1]" /> darabot (ahol <M t="x\ge x^3" />) megduplázni:
          </p>
          <M block t="A = 2\int_{0}^{1}(x-x^3)\,dx = 2\left[\frac{x^2}{2}-\frac{x^4}{4}\right]_{0}^{1} = 2\cdot\frac{1}{4} = \mathbf{\frac{1}{2}}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki az <M t="y=\sin x" /> és <M t="y=\cos x" /> görbék közötti területet a <M t="[0;\,\frac{\pi}{2}]" /> intervallumon!
            </>
          }
        >
          <p>
            Metszéspont: <M t="x=\frac{\pi}{4}" />. <M t="[0;\,\frac{\pi}{4}]" />-n <M t="\cos x\ge\sin x" />, <M t="[\frac{\pi}{4};\,\frac{\pi}{2}]" />-n fordítva:
          </p>
          <M block t="A = \int_{0}^{\pi/4}(\cos x-\sin x)\,dx + \int_{\pi/4}^{\pi/2}(\sin x-\cos x)\,dx = (\sqrt{2}-1) + (\sqrt{2}-1) = \mathbf{2\sqrt{2}-2}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Vízszintes szeletelés (y szerinti integrálás: jobb − bal)',
    body: (
      <>
        <Story>
          <p>
            Nem minden tartomány szeret függőleges csíkokra vágódni! Ha a határoló görbék <M t="x = f(y)" /> alakban sokkal egyszerűbbek (például egy jobbra nyíló <M t="x = y^2" /> parabola), akkor forgasd el fejben a koordinátarendszert, és szeletelj <strong>vízszintesen (<M t="dy" />)</strong>!
          </p>
        </Story>
        <Def title="Két görbe közötti terület — vízszintes szeletelés (dy)">
          <p>
            Ha a tartományt jobbról az <M t="x = f(y)" />, balról az <M t="x = g(y)" /> görbe határolja (<M t="f(y) \ge g(y)" />) a <M t="c \le y \le d" /> sávban, akkor:
          </p>
          <M block t="A \;=\; \int_{c}^{d} \bigl[f(y) - g(y)\bigr]\,dy \;=\; \int_{c}^{d} (\text{jobb} - \text{bal})\,dy." />
        </Def>
        <HorizontalVsVerticalWidget />
        <h3>Mikor válassz <M t="dy" />-t <M t="dx" /> helyett?</h3>
        <ul>
          <li>Ha az egyenletek eleve <M t="x = \dots" /> alakúak (pl. <M t="x=y^2" />, <M t="x=3-y^2" />).</li>
          <li>Ha függőlegesen vágva a felső vagy az alsó görbe képlete <em>megváltozik</em> közben (több integrálra kéne bontani), míg vízszintesen vágva végig ugyanaz a görbe van jobbra és balra!</li>
        </ul>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Számítsd ki részletesen <M t="y" /> szerint integrálva az <M t="x=y^2" /> és <M t="x=y+2" /> görbék által közrezárt területet!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="y^2 = y+2 \implies y^2-y-2 = (y-2)(y+1)=0 \implies y=-1,\;2" />. Jobbra az egyenes (<M t="y+2" />), balra a parabola (<M t="y^2" />):
          </p>
          <M block t="A = \int_{-1}^{2}(y+2-y^2)\,dy = \left[\frac{y^2}{2}+2y-\frac{y^3}{3}\right]_{-1}^{2} = \left(2+4-\frac{8}{3}\right)-\left(\frac{1}{2}-2+\frac{1}{3}\right) = \mathbf{\frac{9}{2}}." />
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki <M t="y" /> szerint integrálva az <M t="x=3-y^2" /> és <M t="x=y+1" /> görbék által bezárt területet!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="3-y^2 = y+1 \implies y^2+y-2 = (y+2)(y-1)=0 \implies y=-2,\;1" />. Jobbra <M t="3-y^2" />, balra <M t="y+1" /> (<M t="y=0" />-nál <M t="3 > 1" />):
          </p>
          <M block t="A = \int_{-2}^{1}(2-y-y^2)\,dy = \left[2y-\frac{y^2}{2}-\frac{y^3}{3}\right]_{-2}^{1} = \frac{7}{6}-\left(-\frac{10}{3}\right) = \mathbf{\frac{9}{2}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Eltolási invariancia és elegáns helyettesítési trükkök',
    body: (
      <>
        <Story>
          <p>
            A határozott integrál helyettesítési szabálya (6. tétel) nemcsak számolásra jó: néhány sor alatt elképesztően elegáns <strong>elméleti azonosságokat</strong> is bizonyít, amelyekkel látszólag „integrálhatatlan” kifejezések másodpercek alatt megoldódnak!
          </p>
        </Story>
        <Def title="Eltolási invariancia (ha a görbét eltolod, a terület nem változik)">
          <M block t="\int_{a}^{b} f(x)\,dx \;=\; \int_{a-c}^{b-c} f(x+c)\,dx." />
          <p>
            Bizonyítás: legyen <M t="u = x+c,\; du=dx" />. Ha <M t="x=a-c" />, akkor <M t="u=a" />; ha <M t="x=b-c" />, akkor <M t="u=b" />!
          </p>
        </Def>
        <Def title="A „Király-tulajdonság” (tükrözés: u = a − x)">
          <M block t="\int_{0}^{a} f(x)\,dx \;=\; \int_{0}^{a} f(a-x)\,dx." />
          <p>
            Ebből azonnal következik egy híres vizsgatrükk: ha <M t="I = \displaystyle\int_{0}^{a}\frac{f(x)}{f(x)+f(a-x)}\,dx" />, akkor az <M t="u=a-x" /> cserével <M t="I = \displaystyle\int_{0}^{a}\frac{f(a-u)}{f(a-u)+f(u)}\,du" />. A kettőt összeadva a számláló és nevező kiejti egymást:
          </p>
          <M block t="2I = \int_{0}^{a} 1\,dx = a \quad\Longrightarrow\quad I = \mathbf{\frac{a}{2}}!" />
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Az eltolási tulajdonsággal számítsd ki egyszerűbben: <M t="\displaystyle\int_{-2}^{-1}(x+2)^3\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = x+2" /> eltolással (<M t="-2\mapsto 0,\;-1\mapsto 1" />): <M t="\displaystyle\int_{0}^{1} u^3\,du = \left[\frac{u^4}{4}\right]_0^1 = \mathbf{\frac{1}{4}}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki a „Király-tulajdonsággal” (<M t="u=\frac{\pi}{2}-x" />): <M t="I = \displaystyle\int_{0}^{\pi/2}\dfrac{\sin x}{\sin x + \cos x}\,dx" />!
            </>
          }
        >
          <p>
            Mivel <M t="\sin\left(\frac{\pi}{2}-u\right)=\cos u" /> és <M t="\cos\left(\frac{\pi}{2}-u\right)=\sin u" />, kapjuk, hogy <M t="I = \int_0^{\pi/2}\frac{\cos u}{\cos u+\sin u}\,du" />. A két alakot összeadva:
          </p>
          <M block t="2I = \int_{0}^{\pi/2}\frac{\sin x+\cos x}{\sin x+\cos x}\,dx = \int_{0}^{\pi/2} 1\,dx = \frac{\pi}{2} \implies I = \mathbf{\frac{\pi}{4}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="5.6 Puskakártya">
          <ul>
            <li><strong>Határozott helyettesítés:</strong> <M t="\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du" />.</li>
            <li><strong>Szimmetria <M t="[-a;\,a]" />-n:</strong> páros <M t="\to 2\int_0^a" />; páratlan <M t="\to 0" />.</li>
            <li><strong>Terület (<M t="dx" />):</strong> <M t="A = \int_a^b (\text{felső}-\text{alsó})\,dx" /> (metszéspontoknál felbontva!).</li>
            <li><strong>Terület (<M t="dy" />):</strong> <M t="A = \int_c^d (\text{jobb}-\text{bal})\,dy" />.</li>
            <li><strong>Tükrözés:</strong> <M t="\int_0^a f(x)\,dx = \int_0^a f(a-x)\,dx" />.</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong>Ne keverd az <M t="u" />-t az <M t="x" />-határokkal!</strong> Ha átírtad az integrált <M t="u" />-ra, akkor vagy számold át a határokat <M t="g(a), g(b)" />-re, vagy írd vissza <M t="x" />-re a behelyettesítés előtt!
            </li>
            <li>
              <strong>Szimmetria CSAK <M t="[-a;\,a]" />-n működik!</strong> A <M t="\int_{-1}^2 x^3\,dx" /> integrál <em>nem</em> nulla, mert az intervallum nem szimmetrikus a nullára!
            </li>
            <li>
              <strong>Metszéspont átugrása:</strong> két görbe közti területnél mindig oldd meg az <M t="f(x)=g(x)" /> egyenletet, hogy lásd, cserélnek-e szerepet az intervallumon belül!
            </li>
            <li>
              <strong><M t="dy" />-integrálásnál <M t="y" />-határok kellenek!</strong> Mindkét görbét <M t="x=\dots" /> alakra rendezd, és a metszéspontok <em><M t="y" />-koordinátáit</em> írd az integráljelhez!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki a határok átszámításával: <M t="\displaystyle\int_{0}^{4}\sqrt{2x+1}\,dx" />!
            </>
          }
        >
          <p>
            <M t="u = 2x+1,\; dx = \frac{1}{2}\,du" />. Határok: <M t="0\mapsto 1,\; 4\mapsto 9" />.
          </p>
          <M block t="\frac{1}{2}\int_{1}^{9} u^{1/2}\,du = \frac{1}{3}\Bigl[u^{3/2}\Bigr]_{1}^{9} = \frac{27-1}{3} = \mathbf{\frac{26}{3}}." />
        </Task>
        <Task
          n={14}
          q={
            <>
              Számítsd ki szimmetriával: <M t="\displaystyle\int_{-3}^{3}(x^5 - 7x^3 + 2x^2 + 4x)\,dx" />!
            </>
          }
        >
          <p>
            Az <M t="x^5, -7x^3, 4x" /> páratlan tagok kiesnek, marad a páros <M t="2x^2" />:
          </p>
          <M block t="2\int_{0}^{3} 2x^2\,dx = 4\left[\frac{x^3}{3}\right]_{0}^{3} = 4\cdot 9 = \mathbf{36}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Határozd meg az <M t="y=x+2" /> egyenes és az <M t="y=x^2" /> parabola által bezárt tartomány területét!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="x^2=x+2 \implies x=-1,\;2" />. Felül az egyenes:
          </p>
          <M block t="A = \int_{-1}^{2}(x+2-x^2)\,dx = \left[\frac{x^2}{2}+2x-\frac{x^3}{3}\right]_{-1}^{2} = \frac{10}{3}-\left(-\frac{7}{6}\right) = \mathbf{\frac{9}{2}}." />
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Számítsd ki: <M t="\displaystyle\int_{\pi/4}^{\pi/2}\operatorname{ctg}\theta\csc^2\theta\,d\theta" />!
            </>
          }
        >
          <p>
            <M t="u = \operatorname{ctg}\theta \implies du = -\csc^2\theta\,d\theta" />. Határok: <M t="\frac{\pi}{4}\mapsto 1,\; \frac{\pi}{2}\mapsto 0" />.
          </p>
          <M block t="-\int_{1}^{0} u\,du = \int_{0}^{1} u\,du = \left[\frac{u^2}{2}\right]_{0}^{1} = \mathbf{\frac{1}{2}}." />
        </Task>
        <Task
          n={17}
          q={
            <>
              Határozd meg az <M t="y=4-x^2" /> és <M t="y=x^2-4" /> parabolák által közrezárt tartomány területét!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="4-x^2 = x^2-4 \implies 2x^2=8 \implies x=\pm 2" />. Páros integrandus:
          </p>
          <M block t="A = 2\int_{0}^{2}\bigl((4-x^2)-(x^2-4)\bigr)\,dx = 2\int_{0}^{2}(8-2x^2)\,dx = 2\left[8x-\frac{2}{3}x^3\right]_{0}^{2} = 2\left(16-\frac{16}{3}\right) = \mathbf{\frac{64}{3}}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              Számítsd ki <M t="y" /> szerint integrálva az <M t="x=y^2-2" /> és az <M t="x=y" /> görbék által bezárt területet!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="y^2-2 = y \implies (y-2)(y+1)=0 \implies y=-1,\;2" />. Jobbra az egyenes (<M t="y" />), balra a parabola (<M t="y^2-2" />):
          </p>
          <M block t="A = \int_{-1}^{2}\bigl(y-(y^2-2)\bigr)\,dy = \int_{-1}^{2}(y+2-y^2)\,dy = \mathbf{\frac{9}{2}}." />
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              <em>Területfelező egyenes:</em> az <M t="y=x^2" /> parabola és az <M t="y=4" /> egyenes által bezárt tartományt egy <M t="y=c\;(0 < c < 4)" /> vízszintes egyenes két egyenlő területű részre osztja. Határozd meg <M t="c" /> pontos értékét <M t="y" /> szerinti integrálással!
            </>
          }
        >
          <p>
            Egy adott <M t="y" /> magasságban a vízszintes szelet <M t="-\sqrt{y}" />-tól <M t="+\sqrt{y}" />-ig tart, tehát szélessége <M t="2\sqrt{y}" />. A teljes terület:
            <M block t="A_{\text{teljes}} = \int_{0}^{4} 2\sqrt{y}\,dy = \left[\frac{4}{3}y^{3/2}\right]_{0}^{4} = \frac{32}{3}." />
            Az alsó fél területe ennek a fele (<M t="\frac{16}{3}" />):
            <M block t="\int_{0}^{c} 2\sqrt{y}\,dy = \frac{4}{3}c^{3/2} = \frac{16}{3} \implies c^{3/2} = 4 \implies c = 4^{2/3} = \mathbf{2\sqrt[3]{2}} \approx 2{,}520." />
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              <em>Skálázási azonosság (előretekintés a logaritmusra):</em> igazold helyettesítéssel, hogy minden <M t="x,y > 0" /> számra <M t="\displaystyle\int_{x}^{xy}\frac{1}{t}\,dt = \int_{1}^{y}\frac{1}{u}\,du" />!
            </>
          }
        >
          <p>
            Legyen <M t="u = \frac{t}{x}" />, azaz <M t="t = xu" /> és <M t="dt = x\,du" /> (<M t="x" /> itt rögzített pozitív konstans!). Határok: <M t="t=x \mapsto u=1" />, <M t="t=xy \mapsto u=y" />:
          </p>
          <M block t="\int_{x}^{xy}\frac{1}{t}\,dt = \int_{1}^{y}\frac{1}{xu}\cdot x\,du = \int_{1}^{y}\frac{1}{u}\,du. \quad\blacksquare" />
        </Task>
        <Task
          n={21}
          q={
            <>
              Határozd meg az első síknegyedben az <M t="y" />-tengely, az <M t="y=\cos x" /> és az <M t="y=\sin x" /> görbék által közrezárt „görbe háromszög” pontos területét!
            </>
          }
        >
          <p>
            Az <M t="y" />-tengely (<M t="x=0" />) és az első metszéspont (<M t="x=\frac{\pi}{4}" />) között <M t="\cos x \ge \sin x" />:
          </p>
          <M block t="A = \int_{0}^{\pi/4}(\cos x - \sin x)\,dx = \Bigl[\sin x + \cos x\Bigr]_{0}^{\pi/4} = \left(\frac{\sqrt{2}}{2}+\frac{\sqrt{2}}{2}\right) - (0+1) = \mathbf{\sqrt{2} - 1}." />
        </Task>
      </>
    ),
  },
];
