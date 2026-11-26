import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ChainRuleMasterGalleryDiagram,
  ChainTree1ParamWidget,
  CylinderRateWidget,
  HelixRateWidget,
  ImplicitShortcutWidget,
  MultiBranchTreeWidget,
  PolarChainWidget,
  SecondOrderChainDiagram,
} from '../components/Widgets144';
import type { Page } from './s1_1';

export const S14_4: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'A kétváltozós láncszabály és a fadiagram',
    body: (
      <>
        <Story>
          <p>
            Képzeld el, hogy egy drón repül egy dombvidék felett az <M t="(x(t), y(t))" /> pályán, és közben méri a
            levegő hőmérsékletét: <M t="w = f(x, y)" />. A hőmérséklet két okból is változik egyszerre: mert{' '}
            <M t="x(t)" /> változik, <em>és</em> mert <M t="y(t)" /> is változik! A <strong>többváltozós láncszabály</strong>{' '}
            egyszerűen összeadja a két hatást!
          </p>
        </Story>

        <Def title="5. tétel — Láncszabály 2 köztes és 1 független változóval">
          <p>
            Ha <M t="w = f(x, y)" /> differenciálható, és <M t="x = g(t),\; y = h(t)" /> differenciálható függvények,
            akkor:
          </p>
          <M block t="\frac{dw}{dt} = \frac{\partial w}{\partial x}\frac{dx}{dt} + \frac{\partial w}{\partial y}\frac{dy}{dt}." />
        </Def>

        <ChainTree1ParamWidget />

        <Quiz
          q={<>Ha <M t="w = x^2 + y^2" />, <M t="x = t" />, <M t="y = 2t" />, mennyi <M t="\frac{dw}{dt}" /> a <M t="t = 1" /> időpontban?</>}
          options={[
            { label: <><M t="6" /></> },
            { label: <><M t="10" /></>, ok: true },
            { label: <><M t="5" /></> },
            { label: <><M t="8" /></> },
          ]}
          explain={
            <>
              <M t="\frac{dw}{dt} = (2x)(1) + (2y)(2) = 2t + 8t = 10t" />. A <M t="t=1" /> helyen pontosan{' '}
              <M t="\mathbf{10}" />! (Ellenőrzés: <M t="w = t^2 + 4t^2 = 5t^2 \Rightarrow w'(1)=10" /> ✓.)
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={<>Számítsd ki <M t="\frac{dw}{dt}" />-t a láncszabállyal, ha <M t="w = x^2 y" />, <M t="x = e^t" />, <M t="y = e^{-t}" />!</>}
        >
          <p>
            <M t="\frac{dw}{dt} = (2xy)(e^t) + (x^2)(-e^{-t}) = 2e^t - e^t = \mathbf{e^t}" /> (valóban,{' '}
            <M t="w = e^{2t}e^{-t} = e^t" />!).
          </p>
        </Task>
        <Task
          n={2}
          q={<>Miért használunk <M t="\frac{dw}{dt}" />-t (közönséges d), miközben a jobb oldalon <M t="\frac{\partial w}{\partial x}" /> (kerek ∂) szerepel?</>}
        >
          <p>
            Mert a végső összetett függvény <M t="w(t)" /> már csak <em>egyetlen</em> változótól (<M t="t" />-től) függ,
            míg <M t="f(x, y)" /> kétváltozós!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Háromváltozós láncszabály térgörbe mentén',
    body: (
      <>
        <Def title="6. tétel — Láncszabály 3 köztes változóval">
          <M block t="\frac{dw}{dt} = \frac{\partial w}{\partial x}\frac{dx}{dt} + \frac{\partial w}{\partial y}\frac{dy}{dt} + \frac{\partial w}{\partial z}\frac{dz}{dt}." />
        </Def>

        <HelixRateWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={<>Számítsd ki <M t="\frac{dw}{dt}" />-t a <M t="t = 0" /> helyen, ha <M t="w = x^2 e^{2y}\cos 3z" />, <M t="x = \cos t,\; y = \ln(t+2),\; z = t" /> (Thomas 46. feladat)!</>}
        >
          <p>
            <M t="t=0" />-nál <M t="(x,y,z) = (1, \ln 2, 0)" />, <M t="(\dot{x},\dot{y},\dot{z}) = (0, \frac{1}{2}, 1)" />,
            és <M t="e^{2\ln 2} = 4" />. Parciálisok: <M t="w_x = 8,\; w_y = 8,\; w_z = 0" />. Így{' '}
            <M t="\frac{dw}{dt} = 8(0) + 8\left(\frac{1}{2}\right) + 0(1) = \mathbf{4}" />!
          </p>
        </Task>
        <Task
          n={4}
          q={<>Ha <M t="f_x = \cos t,\; f_y = \sin t,\; f_z = t^2 + t - 2" /> az <M t="(\cos t, \sin t, t)" /> csavarvonalon (Thomas 45. feladat), mely <M t="t" />-knél van <M t="\frac{df}{dt} = 0" />?</>}
        >
          <p>
            <M t="\frac{df}{dt} = (\cos t)(-\sin t) + (\sin t)(\cos t) + (t^2+t-2)(1) = t^2 + t - 2 = (t+2)(t-1) = 0" />,
            tehát <M t="\mathbf{t = 1}" /> és <M t="\mathbf{t = -2}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Parciális láncszabály több független változóval',
    body: (
      <>
        <p>
          Ha a köztes változók (<M t="x, y, z" />) <em>két</em> független változótól (<M t="r" /> és <M t="s" />)
          függenek, akkor <M t="w" /> is kétváltozós függvénye <M t="(r, s)" />-nek — ezért mindkét derivált{' '}
          <strong>parciális</strong>! A fadiagram-szabály viszont változatlan: kövesd az <em>összes</em> utat{' '}
          <M t="w" />-től a keresett változóig!
        </p>

        <MultiBranchTreeWidget />

        <Steps
          title="Thomas 3. példa — 3 köztes és 2 független változó"
          problem={<>Fejezzük ki <M t="\frac{\partial w}{\partial r}" />-t és <M t="\frac{\partial w}{\partial s}" />-t, ha <M t="w = x + 2y + z^2" />, <M t="x = \frac{r}{s},\; y = r^2 + \ln s,\; z = 2r" />!</>}
          steps={[
            {
              title: 'Parciális deriváltak kiszámítása',
              body: (
                <>
                  <M t="w_x = 1,\; w_y = 2,\; w_z = 2z = 4r" />. Továbbá{' '}
                  <M t="x_r = \frac{1}{s},\; y_r = 2r,\; z_r = 2" /> és{' '}
                  <M t="x_s = -\frac{r}{s^2},\; y_s = \frac{1}{s},\; z_s = 0" />.
                </>
              ),
            },
            {
              title: '∂w/∂r összerakása',
              body: (
                <>
                  <M t="\frac{\partial w}{\partial r} = 1\cdot\frac{1}{s} + 2(2r) + (4r)(2) = \mathbf{\frac{1}{s} + 12r}" />.
                </>
              ),
            },
            {
              title: '∂w/∂s összerakása',
              body: (
                <>
                  <M t="\frac{\partial w}{\partial s} = 1\left(-\frac{r}{s^2}\right) + 2\left(\frac{1}{s}\right) + (4r)(0) = \mathbf{\frac{2}{s} - \frac{r}{s^2}}" />.
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={<>Számítsd ki <M t="\frac{\partial w}{\partial r}" />-t és <M t="\frac{\partial w}{\partial s}" />-t, ha <M t="w = x^2 + y^2,\; x = r - s,\; y = r + s" /> (Thomas 4. példa)!</>}
        >
          <p>
            <M t="w_r = 2x(1) + 2y(1) = 2(r-s) + 2(r+s) = \mathbf{4r}" />;{' '}
            <M t="w_s = 2x(-1) + 2y(1) = -2(r-s) + 2(r+s) = \mathbf{4s}" />!
          </p>
        </Task>
        <Task
          n={6}
          q={<>Számítsd ki <M t="\frac{\partial w}{\partial u}" />-t, ha <M t="w = \ln(x^2 + y^2)" />, <M t="x = u e^v,\; y = u e^{-v}" />!</>}
        >
          <p>
            <M t="w_u = \frac{2x}{x^2+y^2}e^v + \frac{2y}{x^2+y^2}e^{-v} = \frac{2u(e^{2v}+e^{-2v})}{u^2(e^{2v}+e^{-2v})} = \mathbf{\frac{2}{u}}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Implicit deriválás újratárgyalva: a −Fₓ / Fᵧ villámképlet',
    body: (
      <>
        <Def title="8. tétel — Implicit differenciálás parciális deriváltakkal">
          <p>
            Ha <M t="F(x, y) = 0" /> differenciálhatóan definiálja <M t="y(x)" />-et és <M t="F_y \neq 0" />, akkor:
          </p>
          <M block t="\frac{dy}{dx} = -\frac{F_x}{F_y}." />
          <p>
            Hasonlóan, három változóban <M t="F(x, y, z) = 0" /> esetén (<M t="F_z \neq 0" />):
          </p>
          <M block t="\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}, \qquad \frac{\partial z}{\partial y} = -\frac{F_y}{F_z}." />
        </Def>

        <ImplicitShortcutWidget />

        <Quiz
          q={<>Miért van <strong>mínuszjel</strong> a <M t="\frac{dy}{dx} = -\frac{F_x}{F_y}" /> képletben?</>}
          options={[
            { label: <>Mert az <M t="F_x + F_y y' = 0" /> egyenletből <M t="F_x" />-et a másik oldalra átvíve mínuszjelet kap!</>, ok: true },
            { label: <>Csak megállapodás, el is hagyható</> },
            { label: <>Mert <M t="F_y" /> mindig negatív</> },
          ]}
          explain={
            <>
              Mivel <M t="F(x, y(x)) \equiv 0" />, a láncszabály <M t="F_x\cdot 1 + F_y\cdot y' = 0" />-t ad, ahonnan{' '}
              <M t="y' = -F_x / F_y" />!
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={<>A villámképlettel határozd meg <M t="\frac{dy}{dx}" />-et az <M t="e^{xy} + y^2 - x = 4" /> egyenletből!</>}
        >
          <p>
            <M t="F(x,y) = e^{xy} + y^2 - x - 4" />. <M t="F_x = ye^{xy} - 1" />, <M t="F_y = xe^{xy} + 2y" />, így{' '}
            <M t="\mathbf{\frac{dy}{dx} = \frac{1 - ye^{xy}}{xe^{xy} + 2y}}" />!
          </p>
        </Task>
        <Task
          n={8}
          q={<>Az <M t="x^2 + y^2 + z^2 + xyz = 4" /> egyenletből számítsd ki <M t="\frac{\partial z}{\partial x}" />-et a <M t="(1, 1, 1)" /> pontban!</>}
        >
          <p>
            <M t="F_x = 2x + yz = 3" />, <M t="F_z = 2z + xy = 3" />, tehát{' '}
            <M t="\frac{\partial z}{\partial x}(1,1,1) = -\frac{3}{3} = \mathbf{-1}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Polárkoordinátás láncszabály',
    body: (
      <>
        <p>
          Ha egy <M t="w = f(x, y)" /> függvényt polárkoordinátákban (<M t="x = r\cos\theta,\; y = r\sin\theta" />)
          vizsgálunk, a láncszabály azonnal megadja a sugárirányú és a szögirányú deriváltat:
        </p>
        <M block t="\frac{\partial w}{\partial r} = f_x\cos\theta + f_y\sin\theta, \qquad \frac{\partial w}{\partial\theta} = -r f_x\sin\theta + r f_y\cos\theta." />
        <p>
          Az elsőt négyzetre emelve és a másodikat <M t="r" />-rel osztva majd négyzetre emelve, a vegyes tagok
          kiejtik egymást, és megkapjuk a híres <M t="f_x^2 + f_y^2 = w_r^2 + \frac{1}{r^2}w_\theta^2" /> azonosságot!
        </p>

        <PolarChainWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={<>Ha <M t="f(x, y)" /> csak az origótól való <M t="r = \sqrt{x^2+y^2}" /> távolságtól függ (<M t="w = g(r)" />), mennyi <M t="w_\theta" /> és <M t="f_x^2 + f_y^2" />?</>}
        >
          <p>
            Mivel nem függ <M t="\theta" />-tól, <M t="w_\theta = 0" />, így <M t="f_x^2 + f_y^2 = \big(g'(r)\big)^2" />!
          </p>
        </Task>
        <Task
          n={10}
          q={<>Számítsd ki <M t="w_r" />-t és <M t="w_\theta" />-t, ha <M t="w = x^2 - y^2" />!</>}
        >
          <p>
            <M t="w_r = 2x\cos\theta - 2y\sin\theta = 2r\cos(2\theta)" />;{' '}
            <M t="w_\theta = -2r x\sin\theta - 2r y\cos\theta = -2r^2\sin(2\theta)" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Másodrendű láncszabály és koordinátatranszformációk',
    body: (
      <>
        <p>
          Másodrendű parciális deriváltaknál a láncszabályt <strong>kétszer</strong> kell alkalmazni — és közben
          gyakran bejön a szorzatszabály is!
        </p>

        <SecondOrderChainDiagram />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={<>Ha <M t="w = f(x - y)" /> (egyváltozós <M t="f" />), igazold, hogy <M t="w_x + w_y = 0" />!</>}
        >
          <p>
            Legyen <M t="u = x - y" />. Ekkor <M t="w_x = f'(u)\cdot 1" /> és <M t="w_y = f'(u)\cdot(-1)" />,
            összegük pontosan <M t="0" />!
          </p>
        </Task>
        <Task
          n={12}
          q={<>Ha <M t="w = f(u)" />, ahol <M t="u = x^2 + y^2" />, mennyi a 2D Laplace-operátor: <M t="w_{xx} + w_{yy}" />?</>}
        >
          <p>
            Az ábra alapján <M t="w_{xx} = 2f'(u) + 4x^2 f''(u)" /> és <M t="w_{yy} = 2f'(u) + 4y^2 f''(u)" />,
            összegük: <M t="\mathbf{4f'(u) + 4u f''(u)}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Kapcsolt ütemek és a Leibniz-féle integrálderiválás',
    body: (
      <>
        <p>
          A többváltozós láncszabály két gyönyörű gyakorlati alkalmazása: (1) a <strong>kapcsolt változási ütemek</strong>,
          amikor egyszerre több méret is változik, és (2) a <strong>paraméteres integrálok deriválása</strong>
          (Thomas 49–50. feladat):
        </p>
        <M block t="\frac{d}{dx}\int_a^{b(x)} g(t, x)\,dt = g\big(b(x), x\big)\,b'(x) + \int_a^{b(x)} g_x(t, x)\,dt." />

        <CylinderRateWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={13}
          q={<>Egy téglatest élei <M t="x=2,\; y=3,\; z=4" /> cm, és változási ütemük <M t="\dot{x}=1,\; \dot{y}=-0{,}5,\; \dot{z}=2" /> cm/s. Milyen gyorsan változik a <M t="V = xyz" /> térfogat?</>}
        >
          <p>
            <M t="\dot{V} = yz\dot{x} + xz\dot{y} + xy\dot{z} = 12(1) + 8(-0{,}5) + 6(2) = \mathbf{20\text{ cm}^3/\text{s}}" />!
          </p>
        </Task>
        <Task
          n={14}
          q={<>A Leibniz-szabállyal írd fel <M t="F'(x)" />-et, ha <M t="F(x) = \int_0^{x^2} \sqrt{t^4 + x^3}\,dt" /> (Thomas 49. feladat)!</>}
        >
          <p>
            <M t="b(x)=x^2 \Rightarrow b'(x)=2x" />, <M t="g_x = \frac{3x^2}{2\sqrt{t^4+x^3}}" />. Tehát:{' '}
            <M t="\mathbf{F'(x) = 2x\sqrt{x^8 + x^3} + \int_0^{x^2} \frac{3x^2}{2\sqrt{t^4 + x^3}}\,dt}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglalás, buktatók és gyakorlófeladatok',
    body: (
      <>
        <ChainRuleMasterGalleryDiagram />

        <Def title="14.4 Puskakártya — A fadiagram aranyszabálya">
          <ul>
            <li>Rajzold fel a függőségi fát: felül a függő változó, középen a köztesek, alul a függetlenek!</li>
            <li>Minden ág mentén <strong>szorozz</strong>, a különböző ágak eredményeit <strong>add össze</strong>!</li>
            <li><strong>Implicit villámképlet:</strong> <M t="\frac{dy}{dx} = -\frac{F_x}{F_y}" />, 3D-ben <M t="\frac{\partial z}{\partial x} = -\frac{F_x}{F_z}" />.</li>
            <li><strong>Polár invariáns:</strong> <M t="f_x^2 + f_y^2 = w_r^2 + \frac{1}{r^2}w_\theta^2" />.</li>
          </ul>
        </Def>

        <Warn>
          <strong>5 tipikus buktató a 14.4-ben:</strong>
          <ol style={{ margin: '6px 0 0 18px' }}>
            <li>Egy ág kifelejtése a fadiagramból (ha egy változó közvetlenül ÉS közvetve is szerepel, pl. <M t="w = f(x, y(x))" />!).</li>
            <li>A mínuszjel elhagyása az <M t="\frac{dy}{dx} = -\frac{F_x}{F_y}" /> implicit képletből.</li>
            <li>A <M t="\frac{\partial w}{\partial x}\frac{\partial x}{\partial r}" /> kifejezésben „leegyszerűsíteni” <M t="\partial x" />-szel — <strong>TILOS</strong>, mert az összeg többi tagjától elválasztva értelmetlen!</li>
            <li>Másodrendű láncszabályban elfelejteni, hogy <M t="f_u(u, v)" /> is összetett függvény.</li>
            <li>Végeredményben benne hagyni vegyesen <M t="x, y" />-t és <M t="r, s" />-et, amikor a feladat tisztán <M t="(r, s)" />-ben kéri!</li>
          </ol>
        </Warn>

        <h3>Könnyebb gyakorlófeladatok</h3>
        <Task
          n={15}
          q={<>Számítsd ki <M t="\frac{dw}{dt}" />-t, ha <M t="w = x^2 + y^2,\; x = \cos t,\; y = \sin t" />!</>}
        >
          <p>
            <M t="\frac{dw}{dt} = 2x(-\sin t) + 2y(\cos t) = -2\cos t\sin t + 2\sin t\cos t = \mathbf{0}" />{' '}
            (mert <M t="w \equiv 1" />!).
          </p>
        </Task>
        <Task
          n={16}
          q={<>Számítsd ki <M t="\frac{dw}{dt}" />-t <M t="t=1" />-nél, ha <M t="w = \frac{x}{y},\; x = t^2,\; y = 3t" />!</>}
        >
          <p>
            <M t="\frac{1}{y}(2t) - \frac{x}{y^2}(3) = \frac{2t}{3t} - \frac{3t^2}{9t^2} = \frac{2}{3} - \frac{1}{3} = \mathbf{\frac{1}{3}}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={<>Az implicit képlettel határozd meg <M t="\frac{dy}{dx}" />-et: <M t="x^2 y + y^3 = 10" />!</>}
        >
          <p>
            <M t="F_x = 2xy,\; F_y = x^2 + 3y^2 \implies \mathbf{\frac{dy}{dx} = -\frac{2xy}{x^2 + 3y^2}}" />.
          </p>
        </Task>

        <h3>Közepes gyakorlófeladatok</h3>
        <Task
          n={18}
          q={<>Számítsd ki <M t="w_u" />-t és <M t="w_v" />-t, ha <M t="w = e^{xy},\; x = u + v,\; y = u - v" />!</>}
        >
          <p>
            <M t="w_u = ye^{xy}(1) + xe^{xy}(1) = (x+y)e^{xy} = \mathbf{2u\,e^{u^2-v^2}}" />;{' '}
            <M t="w_v = ye^{xy}(1) + xe^{xy}(-1) = (y-x)e^{xy} = \mathbf{-2v\,e^{u^2-v^2}}" />!
          </p>
        </Task>
        <Task
          n={19}
          q={<>Számítsd ki <M t="\frac{\partial z}{\partial x}" />-et és <M t="\frac{\partial z}{\partial y}" />-t a <M t="\sin(xyz) = x + 2y + 3z" /> egyenletből!</>}
        >
          <p>
            <M t="F = \sin(xyz) - x - 2y - 3z" />:{' '}
            <M t="\frac{\partial z}{\partial x} = -\frac{yz\cos(xyz) - 1}{xy\cos(xyz) - 3}" />,{' '}
            <M t="\frac{\partial z}{\partial y} = -\frac{xz\cos(xyz) - 2}{xy\cos(xyz) - 3}" />.
          </p>
        </Task>
        <Task
          n={20}
          q={<>A <M t="T(x, y) = 4x^2 - 4xy + 4y^2" /> hőmérséklet az <M t="x=\cos t,\; y=\sin t" /> egységkörön hol veszi fel a maximumát (Thomas 47. feladat)?</>}
        >
          <p>
            <M t="T(t) = 4 - 2\sin(2t)" />, <M t="T'(t) = -4\cos(2t) = 0 \Rightarrow 2t = \frac{\pi}{2}, \frac{3\pi}{2}" />.
            Maximum: <M t="\mathbf{T_{\max} = 6}" /> (<M t="t = \frac{3\pi}{4}, \frac{7\pi}{4}" />), minimum:{' '}
            <M t="\mathbf{T_{\min} = 2}" />!
          </p>
        </Task>

        <h3>Haladó gyakorlófeladatok</h3>
        <Task
          n={21}
          q={<>Igazold, hogy ha <M t="w = f(u, v)" /> kielégíti a <M t="f_{uu} + f_{vv} = 0" /> Laplace-egyenletet, és <M t="u = \frac{x^2-y^2}{2},\; v = xy" /> (Thomas 43. feladat), akkor <M t="w_{xx} + w_{yy} = 0" /> is igaz!</>}
        >
          <p>
            <M t="w_x = x f_u + y f_v \Rightarrow w_{xx} = f_u + x^2 f_{uu} + 2xy f_{uv} + y^2 f_{vv}" />,{' '}
            <M t="w_y = -y f_u + x f_v \Rightarrow w_{yy} = -f_u + y^2 f_{uu} - 2xy f_{uv} + x^2 f_{vv}" />.
            Összeadva: <M t="w_{xx}+w_{yy} = (x^2+y^2)(f_{uu}+f_{vv}) = \mathbf{0}" />!
          </p>
        </Task>
        <Task
          n={22}
          q={<><strong>Euler-tétel homogén függvényekre:</strong> ha <M t="f(tx, ty) = t^n f(x, y)" /> minden <M t="t>0" />-ra, deriváld mindkét oldalt <M t="t" /> szerint, majd tegyél <M t="t=1" />-et! Milyen híres azonosság jön ki?</>}
        >
          <p>
            Bal oldal: <M t="f_x(tx, ty)\cdot x + f_y(tx, ty)\cdot y" />. Jobb oldal: <M t="n t^{n-1} f(x, y)" />.
            <M t="t=1" />-nél: <M t="\mathbf{x f_x(x, y) + y f_y(x, y) = n\,f(x, y)}" />!
          </p>
        </Task>
        <Task
          n={23}
          q={<>Használd a Leibniz-szabályt az <M t="F(x) = \int_{x^2}^{1} \sqrt{t^3 + x^2}\,dt" /> deriválására (Thomas 50. feladat)!</>}
        >
          <p>
            Az alsó határnál mínuszjel jön: <M t="-2x\sqrt{x^6 + x^2} + \int_{x^2}^{1}\frac{x}{\sqrt{t^3+x^2}}\,dt" />!
          </p>
        </Task>
      </>
    ),
  },
];
