import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  ClosedCylinderFlux3DWidget,
  ConeSurfaceIntegral3DWidget,
  ParaboloidCapArea3DWidget,
  ProjectionPlanePickerWidget,
  SphereFlux3DWidget,
  SurfaceFluxCancelWidget,
  SurfaceIntegralMasterMapDiagram,
  TiltedPatchProjection3DWidget,
} from '../components/Widgets165';
import type { Page } from './s1_1';

export const S16_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Implicit felület felszíne: a dőlésszög-tényező',
    body: (
      <>
        <Story>
          <p>
            Ha egy ferde háztetőt cseréppel akarsz befedni, több cserépre van szükséged, mint a ház vízszintes
            alapterülete — pontosan <M t="1/\cos\gamma" />-szor annyira, ahol <M t="\gamma" /> a tető hajlásszöge!
            Pontosan ugyanez a gondolat adja bármely görbült 3D felület <strong>felszínét</strong>!
          </p>
        </Story>

        <Def title="Implicit felület felszíne (F(x, y, z) = c)">
          <p>
            Egy sima <M t="F(x, y, z) = c" /> felület <M t="S" /> darabjának vetülete az <M t="xy" />-síkban (vagy
            bármely <M t="\mathbf{p}" /> normálisú koordinátasíkban, ahol <M t="\nabla F\cdot\mathbf{p} \neq 0" />)
            legyen <M t="R" />. Ekkor a <strong>felszínelem</strong> és a felszín:
          </p>
          <M block t="d\sigma = \frac{|\nabla F|}{|\nabla F \cdot \mathbf{p}|}\,dA, \qquad \text{Felszín}(S) = \iint_R \frac{|\nabla F|}{|\nabla F \cdot \mathbf{p}|}\,dA." />
        </Def>

        <TiltedPatchProjection3DWidget />

        <Task n={1} q={<>Számítsd ki a <M t="2x + 2y + z = 6" /> sík I. térnyolcadbeli (<M t="x, y, z \ge 0" />) háromszögének területét a felszínképlettel!</>}>
          <p>
            <M t="\nabla F = \langle 2, 2, 1 \rangle" />, <M t="|\nabla F| = 3" />, <M t="|\nabla F\cdot\mathbf{k}| = 1" />,
            így <M t="d\sigma = 3\,dA" />. Az <M t="xy" />-árnyék a <M t="2x + 2y \le 6" /> (<M t="x+y\le 3" />)
            derékszögű háromszög, amelynek területe <M t="\frac{9}{2}" />. Felszín: <M t="3\cdot\frac{9}{2} = \frac{27}{2}" />.
          </p>
        </Task>

        <Task n={2} q={<>Hogyan kapjuk meg a <M t="z = f(x, y)" /> grafikon <M t="d\sigma = \sqrt{1 + f_x^2 + f_y^2}\,dA" /> felszínelemét az implicit képletből?</>}>
          <p>
            Legyen <M t="F(x, y, z) = z - f(x, y) = 0" /> és <M t="\mathbf{p} = \mathbf{k}" />. Ekkor{' '}
            <M t="\nabla F = \langle -f_x, -f_y, 1 \rangle" />, <M t="|\nabla F\cdot\mathbf{k}| = 1" />, így{' '}
            <M t="d\sigma = \sqrt{f_x^2 + f_y^2 + 1}\,dA" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Függvénygrafikon felszíne: z = f(x, y)',
    body: (
      <>
        <p>
          Látod a gyönyörű analógiát? Egy dimenzióban a görbe íveleme <M t="ds = \sqrt{1 + (f')^2}\,dx" /> volt; két
          dimenzióban a felület felszíneleme <M t="d\sigma = \sqrt{1 + f_x^2 + f_y^2}\,dA" />!
        </p>

        <Def title="Függvénygrafikon felszíne">
          <M block t="\text{Felszín}(S) = \iint_R \sqrt{1 + \left(\frac{\partial f}{\partial x}\right)^2 + \left(\frac{\partial f}{\partial y}\right)^2}\,dA." />
        </Def>

        <ParaboloidCapArea3DWidget />

        <Quiz
          q={<>Mennyi a <M t="z = 3x + 4y + 7" /> síkdarab felszíne az <M t="R" /> síktartomány fölött, ha <M t="\operatorname{Ter}(R) = 5" />?</>}
          options={[
            { label: <M t="5" /> },
            { label: <M t="5\sqrt{26}" />, ok: true },
            { label: <M t="25" /> },
            { label: <M t="35" /> },
          ]}
          explain={
            <>
              <M t="f_x = 3,\; f_y = 4 \Rightarrow \sqrt{1 + 9 + 16} = \sqrt{26}" />, tehát{' '}
              <M t="\text{Felszín} = \sqrt{26}\cdot 5 = 5\sqrt{26}" />!
            </>
          }
        />

        <Task n={3} q={<>Számítsd ki a <M t="z = \sqrt{x^2 + y^2}" /> kúp felszínét az <M t="x^2 + y^2 \le R^2" /> körlemez fölött!</>}>
          <p>
            <M t="f_x = \frac{x}{\sqrt{x^2+y^2}},\; f_y = \frac{y}{\sqrt{x^2+y^2}} \Rightarrow \sqrt{1 + f_x^2 + f_y^2} = \sqrt{2}" />.
            Így a felszín <M t="\sqrt{2}\cdot \pi R^2 = \pi R^2\sqrt{2}" />! (Egyezik a középiskolai <M t="\pi R a" />{' '}
            palástképlettel, ahol az alkotó <M t="a = R\sqrt{2}" />!)
          </p>
        </Task>

        <Task n={4} q={<>Határozd meg a <M t="z = x^2 + y^2" /> paraboloid felszínét a <M t="z = 2" /> sík alatt!</>}>
          <p>
            Az árnyék <M t="r \le \sqrt{2}" />, <M t="d\sigma = \sqrt{1 + 4r^2}\,r\,dr\,d\theta" />. Integrálva:{' '}
            <M t="2\pi \cdot \frac{1}{8}\big[\frac{2}{3}(1+4r^2)^{3/2}\big]_0^{\sqrt{2}} = \frac{\pi}{6}(27 - 1) = \frac{13\pi}{3}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Skalárfüggvény felületi integrálja',
    body: (
      <>
        <p>
          Ha egy vékony görbült fémhéj felületi tömegsűrűsége <M t="\delta(x, y, z)" /> (kg/m²), vagy a hőmérséklete{' '}
          <M t="g(x, y, z)" />, akkor a teljes tömeget vagy átlaghőmérsékletet a <strong>skalár felületi integrál</strong>{' '}
          adja meg:
        </p>
        <M block t="\iint_S g(x, y, z)\,d\sigma = \iint_R g(x, y, z)\,\frac{|\nabla F|}{|\nabla F\cdot\mathbf{p}|}\,dA." />

        <ConeSurfaceIntegral3DWidget />

        <Steps
          title="Skalár felületi integrál kúpon"
          problem={
            <>
              Számítsd ki az <M t="\iint_S z\,d\sigma" /> integrált a <M t="z = \sqrt{x^2 + y^2}" /> kúp{' '}
              <M t="0 \le z \le 3" /> darabján!
            </>
          }
          steps={[
            {
              title: 'Számítsuk ki a felszínelemet',
              body: (
                <>
                  A 3. feladatból <M t="d\sigma = \sqrt{2}\,dA" />.
                </>
              ),
            },
            {
              title: 'Helyettesítsük be z-t és az xy-árnyékot',
              body: (
                <>
                  A kúpon <M t="z = \sqrt{x^2+y^2} = r" />, az árnyék pedig az <M t="0 \le r \le 3" /> körlemez.
                </>
              ),
            },
            {
              title: 'Integráljunk polárkoordinátákban',
              body: (
                <>
                  <M t="\int_0^{2\pi}\!d\theta \int_0^3 r\cdot\sqrt{2}\,r\,dr = 2\pi\sqrt{2}\big[\frac{r^3}{3}\big]_0^3 = 18\pi\sqrt{2}" />!
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki a fenti homogén kúphéj (<M t="0 \le z \le 3" />) <M t="\bar{z}" /> tömegközéppontját!</>}>
          <p>
            A felszín <M t="9\pi\sqrt{2}" />, az <M t="\iint_S z\,d\sigma = 18\pi\sqrt{2}" />, így{' '}
            <M t="\bar{z} = \frac{18\pi\sqrt{2}}{9\pi\sqrt{2}} = 2 = \frac{2}{3}H" />! (A csúcsától <M t="\frac{2}{3}H" />,
            míg a <em>tömör</em> kúpé <M t="\frac{3}{4}H" />!)
          </p>
        </Task>

        <Task n={6} q={<>Értékeld ki az <M t="\iint_S (x + y)\,d\sigma" /> integrált a <M t="z = 2x + 2y" /> síkon a <M t="[0, 1]\times[0, 1]" /> négyzet fölött!</>}>
          <p>
            <M t="d\sigma = \sqrt{1+4+4}\,dA = 3\,dA" />. Így{' '}
            <M t="3\int_0^1 \int_0^1 (x+y)\,dx\,dy = 3\cdot 1 = 3" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Irányított felületek és 3D fluxus (∬ F · n dσ)',
    body: (
      <>
        <p>
          Most lépünk be a 3D vektoranalízis szívébe! Egy kétoldalú, <strong>irányított felületen</strong> (ahol
          folytonosan választunk egy <M t="\mathbf{n}" /> egységnormálist — pl. zárt testnél <em>kifelé</em>,
          grafikonnál <em>felfelé</em>) az <M t="\mathbf{F}" /> vektormező <strong>fluxusa</strong>:
        </p>

        <Def title="3D fluxus (vektormező felületi integrálja)">
          <M block t="\text{Fluxus} = \iint_S \mathbf{F}\cdot\mathbf{n}\,d\sigma." />
          <p>
            Felfelé irányított <M t="z = f(x, y)" /> grafikonon a négyzetgyök <strong>kiesik</strong>:{' '}
            <M t="\mathbf{n}\,d\sigma = \langle -f_x,\; -f_y,\; 1 \rangle\,dA" />!
          </p>
        </Def>

        <SurfaceFluxCancelWidget />

        <Quiz
          q={<>Felfelé irányított <M t="z = f(x, y)" /> felületen mi az <M t="\mathbf{n}\,d\sigma" /> vektoriális felületelem képlete?</>}
          options={[
            { label: <M t="\langle f_x,\; f_y,\; 1 \rangle\,dA" /> },
            { label: <M t="\langle -f_x,\; -f_y,\; 1 \rangle\,dA" />, ok: true },
            { label: <M t="\langle -f_x,\; -f_y,\; -1 \rangle\,dA" /> },
            { label: <M t="\sqrt{1 + f_x^2 + f_y^2}\,dA" /> },
          ]}
          explain={
            <>
              <M t="\mathbf{n} = \frac{\langle -f_x, -f_y, 1 \rangle}{\sqrt{1+f_x^2+f_y^2}}" /> és{' '}
              <M t="d\sigma = \sqrt{1+f_x^2+f_y^2}\,dA" />, szorzatuk <M t="\langle -f_x, -f_y, 1 \rangle\,dA" />!
            </>
          }
        />

        <Task n={7} q={<>Számítsd ki az <M t="\mathbf{F} = \langle 0,\; 0,\; z \rangle" /> mező felfelé irányuló fluxusát a <M t="z = 4 - x^2 - y^2" /> paraboloid-kupolán (<M t="z \ge 0" />)!</>}>
          <p>
            <M t="\mathbf{F}\cdot\langle -f_x, -f_y, 1 \rangle = z = 4 - r^2" />. Polárban:{' '}
            <M t="2\pi\int_0^2 (4 - r^2)r\,dr = 2\pi[2r^2 - \frac{r^4}{4}]_0^2 = 8\pi" />!
          </p>
        </Task>

        <Task n={8} q={<>Miért nem értelmezhető egyértelműen a fluxus egy <em>Möbius-szalagon</em>?</>}>
          <p>
            Mert a Möbius-szalagnak csak <strong>egy oldala</strong> van (nem irányítható): ha elindítasz rajta egy
            normálvektort és körbemész, az ellentétes oldalára (<M t="-\mathbf{n}" />) érsz vissza!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Fluxus gömbön és hengeren: Gauss-törvény előképe',
    body: (
      <>
        <p>
          Egy origó középpontú, <M t="R" /> sugarú gömbön a kifelé mutató egységnormális rendkívül egyszerű:{' '}
          <M t="\mathbf{n} = \dfrac{\mathbf{r}}{R} = \dfrac{1}{R}\langle x, y, z \rangle" />! Ezzel két klasszikus
          fizikai mező fluxusa integrálás nélkül, két másodperc alatt kijön!
        </p>

        <SphereFlux3DWidget />

        <Task n={9} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x, y, z \rangle" /> mező kifelé irányuló fluxusát az <M t="x^2 + y^2 + z^2 = R^2" /> gömbön!</>}>
          <p>
            <M t="\mathbf{F}\cdot\mathbf{n} = \frac{x^2+y^2+z^2}{R} = R" /> (állandó!). Így{' '}
            <M t="\text{Fluxus} = R \cdot (4\pi R^2) = 4\pi R^3" />.
          </p>
        </Task>

        <Task n={10} q={<>Mennyi az <M t="\mathbf{F} = \langle x, y, 0 \rangle" /> mező kifelé irányuló fluxusa az <M t="x^2 + y^2 = a^2,\; 0 \le z \le h" /> nyitott hengerpaláston?</>}>
          <p>
            A paláston <M t="\mathbf{n} = \frac{1}{a}\langle x, y, 0 \rangle \Rightarrow \mathbf{F}\cdot\mathbf{n} = a" />.
            A palást felszíne <M t="2\pi ah" />, így a fluxus <M t="a \cdot 2\pi ah = 2\pi a^2 h" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Zárt felületek több darabból',
    body: (
      <>
        <p>
          Egy zárt kocka 6 lapból, egy zárt henger pedig 3 darabból (tető, palást, alaplap) áll. A teljes kifelé
          irányuló fluxus egyszerűen az egyes darabok kifelé fluxusainak összege!
        </p>

        <ClosedCylinderFlux3DWidget />

        <Task n={11} q={<>Számítsd ki az állandó <M t="\mathbf{F} = \langle 2, -5, 7 \rangle" /> mező teljes kifelé irányuló fluxusát a <M t="[0, 1]^3" /> egységkockán át!</>}>
          <p>
            Minden szemközti lappáron (pl. <M t="x=1" />-en <M t="+2" />, <M t="x=0" />-n <M t="-2" />) a fluxusok
            pontosan kioltják egymást: az összeg <M t="0" />!
          </p>
        </Task>

        <Task n={12} q={<>Mennyi az <M t="\mathbf{F} = \langle 0, 0, z^2 \rangle" /> mező teljes kifelé fluxusa a <M t="[0, 2]^3" /> kockán át?</>}>
          <p>
            Az oldallapokon <M t="\mathbf{F}\cdot\mathbf{n} = 0" />, az alaplapon (<M t="z=0" />) <M t="0" />, a
            tetőlapon (<M t="z=2, \mathbf{n}=\mathbf{k}" />) <M t="z^2 = 4" />. A tető területe <M t="4" />, így a
            teljes fluxus <M t="4\cdot 4 = 16" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Vetítés az xz- vagy yz-síkra',
    body: (
      <>
        <p>
          Ha a felület „oldalra néz” (pl. <M t="y = x^2 + z^2" /> vagy egy függőleges sík <M t="x = 3" />), akkor{' '}
          <M t="\nabla F\cdot\mathbf{k} = 0" />, így nem vetíthetünk az <M t="xy" />-síkra — ehelyett egyszerűen az{' '}
          <M t="xz" />- vagy <M t="yz" />-síkra vetítünk!
        </p>

        <ProjectionPlanePickerWidget />

        <Warn>
          A 16.6 fejezetben megtanuljuk a <strong>paraméteres felületeket</strong> (<M t="\mathbf{r}(u, v)" />),
          amelyeknél már egyáltalán nem kell vetítési síkot választani — egyetlen képlet működik teljes gömbre,
          tóruszra és csavarfelületre is!
        </Warn>

        <Quiz
          q={<>Ha a <M t="\mathbf{F} = \frac{\mathbf{r}}{|\mathbf{r}|^3}" /> elektromos mező kifelé fluxusa az 1 sugarú gömbön <M t="4\pi" />, mennyi a 10 sugarú gömbön?</>}
          options={[
            { label: <M t="4\pi" />, ok: true },
            { label: <M t="40\pi" /> },
            { label: <M t="400\pi" /> },
            { label: <M t="0{,}04\pi" /> },
          ]}
          explain={
            <>
              A térerősség <M t="1/R^2" />-tel csökken, a gömb felszíne <M t="R^2" />-tel nő — a szorzatuk mindig{' '}
              <M t="4\pi" />!
            </>
          }
        />

        <Task n={13} q={<>Számítsd ki az <M t="y = x^2 + z^2" /> paraboloid felszínét <M t="y \le 2" /> esetén az <M t="xz" />-síkra vetítve!</>}>
          <p>
            Teljesen szimmetrikus a 4. feladattal (<M t="y \leftrightarrow z" /> csere): az eredmény pontosan{' '}
            <M t="\frac{13\pi}{3}" />!
          </p>
        </Task>

        <Task n={14} q={<>Mennyi az <M t="\mathbf{F} = \langle x^2, y, z \rangle" /> mező <M t="+\mathbf{i}" /> irányú fluxusa az <M t="x = 3,\; 0 \le y \le 2,\; 0 \le z \le 2" /> négyzeten?</>}>
          <p>
            A négyzeten <M t="\mathbf{F}\cdot\mathbf{i} = x^2 = 9" />, a négyzet területe <M t="4" />, így a fluxus{' '}
            <M t="9\cdot 4 = 36" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Összefoglaló mester-képlettár és gyakorlófeladatok',
    body: (
      <>
        <SurfaceIntegralMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Add meg a <M t="z = 2x - 2y + 5" /> sík <M t="d\sigma" /> felszínelemét!</>}>
          <p>
            <M t="d\sigma = \sqrt{1 + 4 + 4}\,dA = 3\,dA" />.
          </p>
        </Task>

        <Task n={16} q={<>Számítsd ki az <M t="\iint_S 5\,d\sigma" /> integrált a 2 sugarú gömb teljes felszínén!</>}>
          <p>
            <M t="5 \cdot 4\pi(4) = 80\pi" />.
          </p>
        </Task>

        <Task n={17} q={<>Mennyi az <M t="\mathbf{F} = \langle 0, 0, 3 \rangle" /> mező felfelé fluxusa a <M t="z = 1" /> sík 4 területű darabján?</>}>
          <p>
            <M t="3 \cdot 4 = 12" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\iint_S x\,d\sigma" /> integrált a <M t="z = 2x + 2y" /> síkon a <M t="[0, 2]\times[0, 1]" /> téglalap fölött!</>}>
          <p>
            <M t="d\sigma = 3\,dA \Rightarrow 3\int_0^1 dy \int_0^2 x\,dx = 3\cdot 1\cdot 2 = 6" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\mathbf{F} = \langle x, y, 2 \rangle" /> mező felfelé fluxusát a <M t="z = 1 - x^2 - y^2" /> (<M t="z \ge 0" />) paraboloidon!</>}>
          <p>
            <M t="\langle -f_x, -f_y, 1 \rangle = \langle 2x, 2y, 1 \rangle" />. Skalárszorzat:{' '}
            <M t="2x^2 + 2y^2 + 2 = 2r^2 + 2" />. Polárban:{' '}
            <M t="2\pi\int_0^1 (2r^3 + 2r)\,dr = 2\pi\big(\frac{1}{2} + 1\big) = 3\pi" />!
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg a <M t="z = x + y^2" /> felület felszínét a <M t="0 \le x \le 1,\; 0 \le y \le 1" /> négyzet fölött (egyszeres integrálként felírva)!</>}>
          <p>
            <M t="f_x = 1,\; f_y = 2y \Rightarrow \int_0^1 \int_0^1 \sqrt{2 + 4y^2}\,dx\,dy = \int_0^1 \sqrt{2 + 4y^2}\,dy" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="x^2 + y^2 + z^2 = R^2" /> homogén gömbhéj (<M t="M" /> tömeg) <M t="I_z" /> tehetetlenségi nyomatékát felületi integrállal!</>}>
          <p>
            Szimmetriából <M t="\iint_S x^2\,d\sigma = \iint_S y^2\,d\sigma = \iint_S z^2\,d\sigma = \frac{1}{3}\iint_S R^2\,d\sigma = \frac{4\pi R^4}{3}" />!
            Így <M t="I_z = \delta\iint_S (x^2 + y^2)\,d\sigma = \frac{M}{4\pi R^2}\cdot \frac{8\pi R^4}{3} = \frac{2}{3}MR^2" />!
            (Egyezik a 15.6 fejezet határesetével!)
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki a <M t="z = \sqrt{R^2 - x^2 - y^2}" /> félgömb felszínét az <M t="R" /> sugarú körlemez fölött a grafikon-képlettel!</>}>
          <p>
            <M t="\sqrt{1 + f_x^2 + f_y^2} = \frac{R}{\sqrt{R^2 - r^2}}" />. Polárban:{' '}
            <M t="2\pi R\int_0^R \frac{r}{\sqrt{R^2-r^2}}\,dr = 2\pi R\big[-\sqrt{R^2-r^2}\big]_0^R = 2\pi R^2" />!
          </p>
        </Task>

        <Task n={23} q={<>Határozd meg a homogén <M t="R" /> sugarú felső félgömbhéj <M t="\bar{z}" /> tömegközéppontját!</>}>
          <p>
            <M t="\iint_S z\,d\sigma = \iint_{r\le R} \sqrt{R^2-r^2}\cdot\frac{R}{\sqrt{R^2-r^2}}\,dA = R\cdot \pi R^2 = \pi R^3" />!
            Elosztva a <M t="2\pi R^2" /> felszínnel: <M t="\bar{z} = \frac{\pi R^3}{2\pi R^2} = \frac{R}{2}" />!
            (Gyönyörű kontraszt: tömör félgömb <M t="\frac{3}{8}R" />, üreges félgömbhéj <M t="\frac{1}{2}R" />!)
          </p>
        </Task>
      </>
    ),
  },
];
