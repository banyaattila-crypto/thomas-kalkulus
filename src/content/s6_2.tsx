import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  HorizontalShellWidget,
  NapkinRingWidget,
  ShellUnrollDiagram,
  VerticalShellExplorerWidget,
  WasherVsShellTableDiagram,
} from '../components/Widgets62';
import type { Page } from './s1_1';

export const S6_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Miért kell új módszer? A kiterített hengerhéj ötlete',
    body: (
      <>
        <Story>
          <p>
            Képzeld el, hogy az <M t="y = 3x - x^2" /> parabola <M t="x" />-tengely fölötti darabját megforgatjuk az <M t="y" />-tengely körül! Ha a 6.1-es gyűrű-módszert próbálnád ráerőltetni, <M t="x" />-re kéne rendezned a másodfokú egyenletet két csúnya gyökös ágra. Van ennél sokkal elegánsabb út: ne vízszintes korongokra, hanem <strong>egymásba csúsztatott vékony hengerhéjakra</strong> (mint a hagyma rétegei vagy a fa évgyűrűi) bontsuk a testet!
          </p>
        </Story>
        <p>
          Ha egy <M t="r" /> sugarú, <M t="h" /> magasságú, <M t="\Delta x" /> falvastagságú vékony hengerhéjat függőlegesen elvágunk és síkba kiterítünk, egy <M t="2\pi r" /> hosszú, <M t="h" /> magas és <M t="\Delta x" /> vastag vékony téglatestet kapunk!
        </p>
        <ShellUnrollDiagram />
        <Def title="Hengerhéj-módszer (forgatás függőleges tengely körül)">
          <p>
            Ha az <M t="[a;\,b]" /> intervallumon a forgástengellyel <strong>párhuzamos</strong> függőleges csík távolsága a tengelytől <M t="r(x)" /> (<em>héjsugár</em>), magassága pedig <M t="h(x)" /> (<em>héjmagasság</em>), akkor a forgástest térfogata:
          </p>
          <M block t="V \;=\; \int_{a}^{b} 2\pi \cdot (\text{héjsugár}) \cdot (\text{héjmagasság})\,dx \;=\; 2\pi\int_{a}^{b} r(x)\,h(x)\,dx." />
        </Def>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Forgassuk meg az <M t="y=\sqrt{x}" />, <M t="y=0" />, <M t="x=4" /> által határolt tartományt az <strong><M t="y" />-tengely</strong> körül hengerhéj-módszerrel!
            </>
          }
        >
          <p>
            Héjsugár: <M t="r(x)=x" />, héjmagasság: <M t="h(x)=\sqrt{x}" /> a <M t="[0;\,4]" />-en:
          </p>
          <M block t="V = 2\pi\int_{0}^{4} x\sqrt{x}\,dx = 2\pi\int_{0}^{4} x^{3/2}\,dx = 2\pi\left[\frac{2}{5}x^{5/2}\right]_{0}^{4} = \mathbf{\frac{128\pi}{5}}." />
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki az <M t="y=3x-x^2" /> parabola <M t="[0;\,3]" /> darabjának <M t="y" />-tengely körüli forgatásával keletkező test térfogatát hengerhéjakkal!
            </>
          }
        >
          <p>
            <M t="r(x)=x" />, <M t="h(x)=3x-x^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{3} x(3x-x^2)\,dx = 2\pi\left[x^3 - \frac{x^4}{4}\right]_{0}^{3} = 2\pi\left(27 - \frac{81}{4}\right) = \mathbf{\frac{27\pi}{2}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Eltolt függőleges forgástengely (x = L) és két görbe',
    body: (
      <>
        <Story>
          <p>
            Mi változik, ha nem az <M t="y" />-tengely (<M t="x=0" />), hanem egy tetszőleges függőleges <M t="x=L" /> egyenes körül forgatunk? Egyetlen dolog: a <strong>héjsugár</strong> most nem <M t="x" />, hanem a csík és az <M t="x=L" /> tengely távolsága (<M t="|x-L|" />)!
          </p>
        </Story>
        <ul>
          <li>Ha a tartomány a tengelytől <strong>jobbra</strong> fekszik (<M t="x \ge L" />): <M t="r(x) = x - L" /> (pl. <M t="x=-1" /> tengelynél <M t="r(x) = x - (-1) = x + 1" />).</li>
          <li>Ha a tartomány a tengelytől <strong>balra</strong> fekszik (<M t="x \le L" />): <M t="r(x) = L - x" /> (pl. <M t="x=4" /> tengelynél <M t="r(x) = 4 - x" />).</li>
          <li>Ha a tartományt két görbe határolja (<M t="y=f(x)" /> felül, <M t="y=g(x)" /> alul): <M t="h(x) = f(x) - g(x)" />.</li>
        </ul>
        <VerticalShellExplorerWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Forgassuk meg az <M t="y=2-x^2" /> és <M t="y=x^2" /> görbék első síknegyedbeli (<M t="x\ge 0" />) tartományát az <M t="y" />-tengely körül!
            </>
          }
        >
          <p>
            Metszéspont: <M t="2-x^2=x^2 \implies x=1" />. Magasság: <M t="(2-x^2)-x^2 = 2-2x^2" />, sugár: <M t="x" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{1} x(2-2x^2)\,dx = 4\pi\left[\frac{x^2}{2}-\frac{x^4}{4}\right]_{0}^{1} = 4\pi\cdot\frac{1}{4} = \mathbf{\pi}." />
        </Task>
        <Task
          n={4}
          q={
            <>
              Számítsd ki az <M t="y=3x-x^2" /> (<M t="[0;\,3]" />) tartomány <M t="x=-1" /> egyenes körüli forgatásával keletkező test térfogatát!
            </>
          }
        >
          <p>
            Sugár: <M t="r(x)=x+1" />, magasság: <M t="h(x)=3x-x^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{3}(x+1)(3x-x^2)\,dx = 2\pi\int_{0}^{3}(3x+2x^2-x^3)\,dx = 2\pi\left[\frac{3}{2}x^2+\frac{2}{3}x^3-\frac{x^4}{4}\right]_{0}^{3} = \mathbf{\frac{45\pi}{2}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Vízszintes forgástengely (x-tengely vagy y = L — dy héjak)',
    body: (
      <>
        <Story>
          <p>
            Ha <strong>vízszintes</strong> tengely (<M t="x" />-tengely vagy <M t="y=L" />) körül forgatunk hengerhéj-módszerrel, akkor a csíknak a tengellyel párhuzamosnak — tehát <strong>vízszintesnek</strong> (<M t="dy" /> vastagságúnak) — kell lennie!
          </p>
        </Story>
        <Def title="Hengerhéj-módszer vízszintes tengely körül (dy)">
          <M block t="V \;=\; 2\pi\int_{c}^{d} (\text{héjsugár } |y-L|)\cdot(\text{héjhossz } x_{\text{jobb}}-x_{\text{bal}})\,dy." />
        </Def>
        <HorizontalShellWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Forgassuk meg az <M t="x=2y-y^2" /> parabola és az <M t="y" />-tengely (<M t="x=0" />) által bezárt tartományt az <strong><M t="x" />-tengely</strong> körül hengerhéjakkal!
            </>
          }
        >
          <p>
            Zérushelyek: <M t="2y-y^2=0 \implies y=0,\;2" />. Héjsugár: <M t="y" />, héjhossz: <M t="2y-y^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{2} y(2y-y^2)\,dy = 2\pi\left[\frac{2}{3}y^3-\frac{y^4}{4}\right]_{0}^{2} = 2\pi\left(\frac{16}{3}-4\right) = \mathbf{\frac{8\pi}{3}}." />
        </Task>
        <Task
          n={6}
          q={
            <>
              Számítsd ki részletesen az <M t="y=\sqrt{x}" />, <M t="y=0" />, <M t="x=4" /> tartomány <M t="y=2" /> egyenes körüli forgatásának térfogatát vízszintes héjakkal!
            </>
          }
        >
          <p>
            A <M t="[0;\,2]" /> intervallumon a sugár <M t="2-y" />, a héj hossza <M t="4-y^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{2}(2-y)(4-y^2)\,dy = 2\pi\int_{0}^{2}(8-4y-2y^2+y^3)\,dy = 2\pi\left(16-8-\frac{16}{3}+4\right) = \mathbf{\frac{40\pi}{3}}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Gyűrű (6.1) vs. Hengerhéj (6.2) — melyiket válaszd?',
    body: (
      <>
        <Story>
          <p>
            Most már két profi szerszám van a kezedben forgástestek térfogatához! Elméletben mindkettő mindig <em>ugyanazt a pontos számot</em> adja — a gyakorlatban viszont az egyik sokszor <strong>tízszer egyszerűbb</strong> a másiknál!
          </p>
        </Story>
        <WasherVsShellTableDiagram />
        <h3>Hogyan dönts 5 másodperc alatt?</h3>
        <ol className="steps">
          <li><strong>Nézd meg, melyik változóban szebbek a görbék!</strong> Ha <M t="y=f(x)" /> alakúak és nehéz <M t="x" />-re rendezni (pl. <M t="y=\sin(x^2)" /> vagy <M t="y=3x-x^2" />), akkor mindenképp <strong><M t="dx" /></strong>-szel integrálj!</li>
          <li><strong>Ha <M t="dx" />-szel integrálsz:</strong> vízszintes tengelynél válaszd a <em>gyűrűt</em>, függőleges tengelynél a <em>hengerhéjat</em>!</li>
          <li><strong>Ha <M t="dy" />-vel könnyebb</strong> (mert <M t="x=g(y)" /> alakúak a görbék): függőleges tengelynél <em>gyűrű</em>, vízszintes tengelynél <em>hengerhéj</em>!</li>
        </ol>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Forgassuk meg az <M t="y=\sin(x^2)" /> görbe első hullámát (<M t="0\le x\le\sqrt{\pi}" />) az <strong><M t="y" />-tengely</strong> körül! <em>(Gyűrűvel szinte lehetetlen, héjjal 2 sor!)</em>
            </>
          }
        >
          <p>
            Hengerhéjjal (<M t="u=x^2,\; du=2x\,dx" />, határok <M t="0\to\pi" />):
          </p>
          <M block t="V = 2\pi\int_{0}^{\sqrt{\pi}} x\sin(x^2)\,dx = \pi\int_{0}^{\pi}\sin u\,du = \pi\Bigl[-\cos u\Bigr]_{0}^{\pi} = \mathbf{2\pi}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki az <M t="y=x" /> és <M t="y=x^2" /> közötti tartomány <M t="y" />-tengely körüli forgatásának térfogatát <strong>mindkét</strong> módszerrel (héj + gyűrű), és ellenőrizd, hogy ugyanazt kapod!
            </>
          }
        >
          <p>
            <strong>Hengerhéj (<M t="dx" />):</strong> <M t="2\pi\int_0^1 x(x-x^2)\,dx = 2\pi\left(\frac{1}{3}-\frac{1}{4}\right) = \mathbf{\dfrac{\pi}{6}}" />.<br />
            <strong>Gyűrű (<M t="dy" />):</strong> <M t="\pi\int_0^1 \bigl((\sqrt{y})^2 - y^2\bigr)\,dy = \pi\left(\frac{1}{2}-\frac{1}{3}\right) = \mathbf{\dfrac{\pi}{6}}" /> ✓
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Különleges alkalmazások: az x-kioltás és a szalvétagyűrű',
    body: (
      <>
        <Story>
          <p>
            A hengerhéj képletében ott szerepel egy „ajándék” <M t="x" /> szorzó (<M t="2\pi x\,f(x)" />). Ez két fantasztikus dologra képes: egyrészt sokszor pont <strong>kiegyszerűsíti a nevezőben ülő <M t="x" />-et</strong>, másrészt pillanatok alatt bizonyítja a geometria egyik legmeglepőbb paradoxonját, a <strong>szalvétagyűrű-problémát</strong>!
          </p>
        </Story>
        <h3>A szalvétagyűrű-paradoxon</h3>
        <p>
          Fúrjunk át egy <M t="R" /> sugarú tömör gömb közepén egy hengeres lyukat úgy, hogy a visszamaradó gyűrű magassága pontosan <M t="h" /> legyen! A lyuk sugara Pitagorasz-tétellel <M t="r = \sqrt{R^2 - (h/2)^2}" />. Az <M t="x\in[r;\,R]" /> helyen a függőleges héj magassága <M t="2\sqrt{R^2-x^2}" />, így a térfogat (<M t="u=R^2-x^2" />):
        </p>
        <M block t="V = 2\pi\int_{r}^{R} x\cdot 2\sqrt{R^2-x^2}\,dx = 2\pi\left[-\frac{2}{3}(R^2-x^2)^{3/2}\right]_{r}^{R} = \frac{4\pi}{3}(R^2-r^2)^{3/2} = \frac{4\pi}{3}\left(\frac{h}{2}\right)^3 = \mathbf{\frac{\pi h^3}{6}}!" />
        <p>
          Az <M t="R" /> teljesen <strong>kiesett a végeredményből</strong>! Egy <M t="2\text{ cm}" /> magas szalvétagyűrűnek — függetlenül attól, hogy biliárdgolyóból vagy a Föld bolygóból fúrták-e ki — pontosan ugyanakkora a térfogata!
        </p>
        <NapkinRingWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Forgassuk meg az <M t="f(x)=\dfrac{\sin x}{x}" /> (<M t="f(0)=1" />) görbe <M t="[0;\,\pi]" /> alatti tartományát az <M t="y" />-tengely körül!
            </>
          }
        >
          <p>
            Az <M t="x" /> gyönyörűen kiegyszerűsödik:
          </p>
          <M block t="V = 2\pi\int_{0}^{\pi} x\cdot\frac{\sin x}{x}\,dx = 2\pi\int_{0}^{\pi}\sin x\,dx = 2\pi\Bigl[-\cos x\Bigr]_{0}^{\pi} = \mathbf{4\pi}." />
        </Task>
        <Task
          n={10}
          q={
            <>
              Forgassuk meg a <M t="g(x)=\dfrac{\operatorname{tg}^2 x}{x}" /> (<M t="g(0)=0" />) görbe <M t="[0;\,\frac{\pi}{4}]" /> alatti tartományát az <M t="y" />-tengely körül! <em>(Tipp: <M t="\operatorname{tg}^2 x = \sec^2 x - 1" />.)</em>
            </>
          }
        >
          <p>
            <M t="V = 2\pi\int_{0}^{\pi/4} \operatorname{tg}^2 x\,dx = 2\pi\int_{0}^{\pi/4}(\sec^2 x - 1)\,dx = 2\pi\Bigl[\operatorname{tg} x - x\Bigr]_{0}^{\pi/4} = 2\pi\left(1-\dfrac{\pi}{4}\right) = \mathbf{2\pi - \dfrac{\pi^2}{2}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <Def title="6.2 Puskakártya">
          <ul>
            <li><strong>Alapelv:</strong> a csík <strong>PÁRHUZAMOS</strong> a forgástengellyel!</li>
            <li><strong>Függőleges tengely (<M t="x=L" />):</strong> <M t="V = 2\pi\int_a^b |x-L|\cdot\bigl(f(x)-g(x)\bigr)\,dx" />.</li>
            <li><strong>Vízszintes tengely (<M t="y=L" />):</strong> <M t="V = 2\pi\int_c^d |y-L|\cdot\bigl(f(y)-g(y)\bigr)\,dy" />.</li>
            <li><strong>Ökölszabály:</strong> ha nehéz átrendezni <M t="x" />-re, válassz <M t="dx" />-et (függőleges tengelynél héj, vízszintesnél gyűrű!).</li>
          </ul>
        </Def>

        <Warn>
          <p><strong>4 tipikus buktató — ezekre vigyázz!</strong></p>
          <ol className="steps">
            <li>
              <strong><M t="2\pi r h" /> vs. <M t="\pi R^2" /> keverése:</strong> a hengerhéj képletében <strong><M t="2\pi" /></strong> van és a sugár <strong>első</strong> hatványon áll (nem négyzeten!).
            </li>
            <li>
              <strong>Elrontott integrálási változó:</strong> <M t="y" />-tengely körüli forgatásnál a héj-módszer <em><M t="dx" />-et</em> használ, az <M t="x" />-tengely körülinél <em><M t="dy" />-t</em> — pont fordítva, mint a korong/gyűrű módszer!
            </li>
            <li>
              <strong>Rossz előjel eltolt tengelynél:</strong> a sugár mindig pozitív (<M t="\text{nagyobb}-\text{kisebb}" />)! Ha a tartomány <M t="x=4" />-től balra van, akkor <M t="r = 4-x" />, nem <M t="x-4" />!
            </li>
            <li>
              <strong>Elfelejtett alsó/bal görbe kivonása:</strong> két görbe között a héj magassága <M t="f(x)-g(x)" />, nem csak <M t="f(x)" />!
            </li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={11}
          q={
            <>
              Forgassuk meg az <M t="y=x" />, <M t="y=0" />, <M t="x=2" /> háromszöget az <M t="y" />-tengely körül hengerhéjakkal!
            </>
          }
        >
          <p>
            <M t="V = 2\pi\int_0^2 x\cdot x\,dx = 2\pi\left[\frac{x^3}{3}\right]_0^2 = \mathbf{\dfrac{16\pi}{3}}" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Forgassuk meg az <M t="y=2x" />, <M t="y=\frac{x}{2}" /> és <M t="x=1" /> által határolt tartományt az <M t="y" />-tengely körül hengerhéjakkal!
            </>
          }
        >
          <p>
            Magasság: <M t="2x-\frac{x}{2}=\frac{3}{2}x" />, így <M t="V = 2\pi\int_0^1 x\cdot\frac{3}{2}x\,dx = 3\pi\left[\frac{x^3}{3}\right]_0^1 = \mathbf{\pi}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Forgassuk meg az <M t="x=y^2" />, <M t="x=0" />, <M t="y=2" /> tartományt az <M t="x" />-tengely körül vízszintes hengerhéjakkal!
            </>
          }
        >
          <p>
            <M t="V = 2\pi\int_0^2 y\cdot y^2\,dy = 2\pi\left[\frac{y^4}{4}\right]_0^2 = \mathbf{8\pi}" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Forgassuk meg az <M t="y=x^2" />, <M t="y=2-x" /> és <M t="x=0" /> (<M t="x\ge 0" />) által határolt tartományt az <M t="y" />-tengely körül hengerhéjakkal!
            </>
          }
        >
          <p>
            Metszéspont (<M t="x\ge 0" />): <M t="x^2=2-x \implies x=1" />. Magasság: <M t="(2-x)-x^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{1} x(2-x-x^2)\,dx = 2\pi\left[x^2-\frac{x^3}{3}-\frac{x^4}{4}\right]_{0}^{1} = 2\pi\cdot\frac{5}{12} = \mathbf{\frac{5\pi}{6}}." />
        </Task>
        <Task
          n={15}
          q={
            <>
              Forgassuk meg az <M t="x=2y-y^2" /> és <M t="x=y" /> görbék által bezárt tartományt az <M t="x" />-tengely körül hengerhéjakkal!
            </>
          }
        >
          <p>
            Metszéspontok: <M t="2y-y^2=y \implies y=0,\;1" />. Héjhossz: <M t="(2y-y^2)-y = y-y^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{1} y(y-y^2)\,dy = 2\pi\left(\frac{1}{3}-\frac{1}{4}\right) = \mathbf{\frac{\pi}{6}}." />
        </Task>
        <Task
          n={16}
          q={
            <>
              Forgassuk meg az <M t="y=x^2" />, <M t="y=0" />, <M t="x=2" /> tartományt az <strong><M t="x=-1" /> egyenes</strong> körül hengerhéjakkal!
            </>
          }
        >
          <p>
            Sugár: <M t="x+1" />, magasság: <M t="x^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{2}(x+1)x^2\,dx = 2\pi\left[\frac{x^4}{4}+\frac{x^3}{3}\right]_{0}^{2} = 2\pi\left(4+\frac{8}{3}\right) = \mathbf{\frac{40\pi}{3}}." />
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Forgassuk meg az <M t="y=\cos(x^2)" /> (<M t="0\le x\le\sqrt{\pi/2}" />) görbe alatti tartományt az <M t="y" />-tengely körül!
            </>
          }
        >
          <p>
            Hengerhéjjal (<M t="u=x^2,\; du=2x\,dx" />, határok <M t="0\to\frac{\pi}{2}" />):
          </p>
          <M block t="V = 2\pi\int_{0}^{\sqrt{\pi/2}} x\cos(x^2)\,dx = \pi\int_{0}^{\pi/2}\cos u\,du = \pi\Bigl[\sin u\Bigr]_{0}^{\pi/2} = \mathbf{\pi}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              Forgassuk meg az <M t="y=\sqrt{x}" />, <M t="y=0" /> és <M t="y=x-2" /> görbék által bezárt tartományt az <strong><M t="x" />-tengely</strong> körül vízszintes hengerhéjakkal!
            </>
          }
        >
          <p>
            Metszéspont: <M t="\sqrt{x}=x-2 \implies x=4,\;y=2" />. A <M t="[0;\,2]" /> intervallumon jobbra <M t="x=y+2" />, balra <M t="x=y^2" />:
          </p>
          <M block t="V = 2\pi\int_{0}^{2} y\bigl((y+2)-y^2\bigr)\,dy = 2\pi\left[\frac{y^3}{3}+y^2-\frac{y^4}{4}\right]_{0}^{2} = 2\pi\left(\frac{8}{3}+4-4\right) = \mathbf{\frac{16\pi}{3}}." />
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Szalvétagyűrű számmal:</em> egy <M t="R=5\text{ cm}" /> sugarú gömbből fúrunk ki egy hengeres lyukat úgy, hogy a maradó gyűrű magassága <M t="h=6\text{ cm}" /> legyen. Számítsd ki a térfogatát hengerhéj-módszerrel, és ellenőrizd a <M t="\frac{\pi h^3}{6}" /> képlettel!
            </>
          }
        >
          <p>
            A lyuk sugara <M t="r=\sqrt{5^2-3^2}=4\text{ cm}" />. A hengerhéj-integrál (<M t="u=25-x^2" />):
          </p>
          <M block t="V = 2\pi\int_{4}^{5} x\cdot 2\sqrt{25-x^2}\,dx = 2\pi\int_{0}^{9}\sqrt{u}\,du = 2\pi\cdot\frac{2}{3}\cdot 27 = \mathbf{36\pi\text{ cm}^3}." />
          <p>
            Ellenőrzés: <M t="\dfrac{\pi\cdot 6^3}{6} = 36\pi\text{ cm}^3" /> ✓
          </p>
        </Task>
      </>
    ),
  },
];
