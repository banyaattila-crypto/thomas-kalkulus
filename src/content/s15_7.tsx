import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  EllipseToDiskWidget,
  Jacobian3DUnifierWidget,
  JacobianAreaStretchWidget,
  JacobianMasterMapDiagram,
  OrientationSignWidget,
  ParallelogramStraightenerWidget,
  TrapezoidTransformWidget,
  UVtoXYTransformWidget,
} from '../components/Widgets157';
import type { Page } from './s1_1';

export const S15_7: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Új koordináták: a tartomány „kiegyenesítése”',
    body: (
      <>
        <Story>
          <p>
            Az egyváltozós kalkulusban a helyettesítési szabály (<M t="dx = g'(u)\,du" />) volt a legerősebb
            integrálási trükkünk. Két és három dimenzióban a polár-, henger- és gömbi koordináták mind ugyanannak az
            egyetlen, mindent átfogó elvnek a különleges esetei: <strong>egy ügyes koordináta-transzformációval
            kiegyenesítjük a bonyolult tartományt</strong>, a terület/térfogat nyújtását pedig a{' '}
            <strong>Jacobi-determináns</strong> méri!
          </p>
        </Story>

        <Def title="Koordináta-transzformáció a síkban">
          <p>
            Egy <M t="T(u, v) = \big(x(u, v),\; y(u, v)\big)" /> leképezés az <M t="uv" />-sík egy egyszerű{' '}
            <M t="G" /> tartományát (pl. téglalapot vagy kört) az <M t="xy" />-sík <M t="R = T(G)" /> tartományára
            képezi le. Ha <M t="T" /> lineáris (<M t="x = au + bv,\; y = cu + dv" />), akkor minden téglalapot
            paralelogrammává alakít, a területeket pedig pontosan <M t="|ad - bc|" />-szeresére skálázza!
          </p>
        </Def>

        <UVtoXYTransformWidget />

        <Task n={1} q={<>Mi a képe a <M t="[0, 1] \times [0, 1]" /> egységnégyzetnek az <M t="x = 2u + v,\; y = u - v" /> leképezés alatt, és mekkora a területe?</>}>
          <p>
            A négy csúcs képe: <M t="(0;0), (2;1), (3;0), (1;-1)" /> — egy paralelogramma, amelynek területe{' '}
            <M t="|2\cdot(-1) - 1\cdot 1| = |-3| = 3" />!
          </p>
        </Task>

        <Task n={2} q={<>Milyen <M t="(u, v)" /> helyettesítéssel válik az <M t="x + 2y = 1,\; x + 2y = 5,\; 3x - y = 0,\; 3x - y = 4" /> paralelogramma sima téglalappá?</>}>
          <p>
            Válasszuk az <M t="u = x + 2y" /> és <M t="v = 3x - y" /> új változókat! Ekkor a tartomány egyszerűen a{' '}
            <M t="1 \le u \le 5,\; 0 \le v \le 4" /> téglalap!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'A 2D Jacobi-determináns és a helyettesítési tétel',
    body: (
      <>
        <p>
          Nemlineáris leképezésnél (pl. polárkoordináták!) a területi nyújtási arány pontról pontra változik. Egy apró{' '}
          <M t="\Delta u \times \Delta v" /> téglalapot lokálisan a parciális deriváltak mátrixa közelít — ennek
          determinánsa a híres <strong>Jacobi-determináns</strong>!
        </p>

        <Def title="2D Jacobi-determináns és helyettesítési tétel">
          <M block t="J(u, v) = \frac{\partial(x, y)}{\partial(u, v)} = \begin{vmatrix} \dfrac{\partial x}{\partial u} & \dfrac{\partial x}{\partial v} \\[8pt] \dfrac{\partial y}{\partial u} & \dfrac{\partial y}{\partial v} \end{vmatrix} = x_u y_v - x_v y_u." />
          <M block t="\iint_R f(x, y)\,dx\,dy = \iint_G f\big(x(u, v),\, y(u, v)\big)\,\big|J(u, v)\big|\,du\,dv." />
        </Def>

        <JacobianAreaStretchWidget />

        <Quiz
          q={<>Ha egy 2D koordináta-transzformáció Jacobi-determinánsa <M t="J(u, v) = -3" />, milyen szorzó kerül a kettős integrálba a <M t="du\,dv" /> mellé?</>}
          options={[
            { label: <M t="-3" /> },
            { label: <M t="3" />, ok: true },
            { label: <M t="-\frac{1}{3}" /> },
            { label: <M t="\frac{1}{3}" /> },
          ]}
          explain={
            <>
              A képletben mindig a Jacobi-determináns <strong>abszolút értéke</strong> szerepel:{' '}
              <M t="|J(u, v)| = |-3| = 3" />!
            </>
          }
        />

        <Task n={3} q={<>Igazold a 2D Jacobi-determinánssal, hogy polárkoordinátákban (<M t="x = r\cos\theta,\; y = r\sin\theta" />) valóban <M t="dA = r\,dr\,d\theta" />!</>}>
          <p>
            <M t="J(r, \theta) = \begin{vmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{vmatrix} = r\cos^2\theta + r\sin^2\theta = r" />.
            Mivel <M t="r \ge 0" />, <M t="|J| = r" />!
          </p>
        </Task>

        <Task n={4} q={<>Számítsd ki az <M t="x = u^2 - v^2,\; y = 2uv" /> parabolikus leképezés Jacobi-determinánsát!</>}>
          <p>
            <M t="J(u, v) = \begin{vmatrix} 2u & -2v \\ 2v & 2u \end{vmatrix} = 4u^2 + 4v^2 = 4(u^2 + v^2)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Lineáris helyettesítés és a reciprok Jacobi-trükk',
    body: (
      <>
        <p>
          Gyakran sokkal egyszerűbb <M t="u, v" />-t felírni <M t="x, y" /> függvényében (pl. <M t="u = x + y,\; v = x - y" />),
          mint fordítva megoldani az egyenletrendszert. A láncszabály miatt azonban <strong>nem is kell kifejeznünk
          <M t="x, y" />-t a Jacobihoz</strong>!
        </p>

        <Def title="Reciprok Jacobi-szabály">
          <M block t="\frac{\partial(x, y)}{\partial(u, v)} = \left(\frac{\partial(u, v)}{\partial(x, y)}\right)^{-1}." />
        </Def>

        <ParallelogramStraightenerWidget />

        <Steps
          title="Kettős integrál ferde paralelogrammán"
          problem={
            <>
              Számítsd ki az <M t="\iint_R (x - y)e^{x+y}\,dx\,dy" /> integrált az <M t="x + y = 0,\; x + y = 2,\; x - y = 0,\; x - y = 2" />{' '}
              egyenesek által határolt <M t="R" /> tartományon!
            </>
          }
          steps={[
            {
              title: 'Vezessük be az új változókat és határokat',
              body: (
                <>
                  Legyen <M t="u = x + y" /> és <M t="v = x - y" />. Ekkor <M t="G = [0, 2] \times [0, 2]" />.
                </>
              ),
            },
            {
              title: 'Számítsuk ki a reciprok Jacobi-determinánst',
              body: (
                <>
                  <M t="\dfrac{\partial(u, v)}{\partial(x, y)} = \begin{vmatrix} 1 & 1 \\ 1 & -1 \end{vmatrix} = -2 \;\Longrightarrow\; \left|\dfrac{\partial(x, y)}{\partial(u, v)}\right| = \left|\dfrac{1}{-2}\right| = \dfrac{1}{2}" />.
                </>
              ),
            },
            {
              title: 'Írjuk át az integrált és bontsuk szorzatra',
              body: (
                <>
                  <M t="\iint_G v\,e^u \cdot \frac{1}{2}\,du\,dv = \frac{1}{2}\left(\int_0^2 e^u\,du\right)\!\left(\int_0^2 v\,dv\right)" />.
                </>
              ),
            },
            {
              title: 'Értékeljük ki a két 1D integrált',
              body: (
                <>
                  <M t="\frac{1}{2}(e^2 - 1) \cdot \big[\frac{v^2}{2}\big]_0^2 = \frac{1}{2}(e^2 - 1)\cdot 2 = e^2 - 1" />!
                </>
              ),
            },
          ]}
        />

        <Task n={5} q={<>Számítsd ki az <M t="\iint_R (2x + y)\,dA" /> integrált a <M t="0 \le 2x + y \le 3,\; 0 \le x - y \le 2" /> paralelogrammán!</>}>
          <p>
            <M t="u = 2x + y \in [0, 3],\; v = x - y \in [0, 2]" />.{' '}
            <M t="\frac{\partial(u,v)}{\partial(x,y)} = \begin{vmatrix} 2 & 1 \\ 1 & -1 \end{vmatrix} = -3 \Rightarrow |J| = \frac{1}{3}" />.
            Integrál: <M t="\frac{1}{3}\int_0^3 u\,du \int_0^2 dv = \frac{1}{3}\cdot\frac{9}{2}\cdot 2 = 3" />.
          </p>
        </Task>

        <Task n={6} q={<>Mi a reciprok Jacobi-determinánsa az <M t="u = 3x + 2y,\; v = x + 4y" /> transzformációnak?</>}>
          <p>
            <M t="\frac{\partial(u,v)}{\partial(x,y)} = 3\cdot 4 - 2\cdot 1 = 10 \Rightarrow \frac{\partial(x,y)}{\partial(u,v)} = \frac{1}{10}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Ellipszisek és hiperbolás tartományok',
    body: (
      <>
        <p>
          A Jacobi-determinánssal az ellipszis területe (<M t="\pi ab" />) két sorra rövidül, a hiperbolák által
          határolt görbe „négyszögek” pedig varázsütésre sima téglalapokká alakulnak!
        </p>

        <EllipseToDiskWidget />

        <Task n={7} q={<>Bizonyítsd be két sorban az <M t="x = au,\; y = bv" /> helyettesítéssel, hogy az <M t="\frac{x^2}{a^2} + \frac{y^2}{b^2} \le 1" /> ellipszis területe <M t="\pi ab" />!</>}>
          <p>
            Az ellipszis képe az <M t="u^2 + v^2 \le 1" /> egységkör, a Jacobi-determináns <M t="J = ab" />. Így{' '}
            <M t="\operatorname{Ter}(R) = \iint_{u^2+v^2\le 1} ab\,du\,dv = ab \cdot \pi = \pi ab" />!
          </p>
        </Task>

        <Task n={8} q={<>Számítsd ki az <M t="\iint_R xy\,dA" /> integrált az I. síknegyedben az <M t="xy = 1,\; xy = 3,\; y = x,\; y = 2x" /> görbék által bezárt tartományon!</>}>
          <p>
            Legyen <M t="u = xy \in [1, 3]" />, <M t="v = \frac{y}{x} \in [1, 2]" />.{' '}
            <M t="\frac{\partial(u,v)}{\partial(x,y)} = \begin{vmatrix} y & x \\ -y/x^2 & 1/x \end{vmatrix} = \frac{2y}{x} = 2v \Rightarrow |J| = \frac{1}{2v}" />.
            Az integrál: <M t="\int_1^3 \int_1^2 u \cdot \frac{1}{2v}\,dv\,du = \frac{1}{2}\big[\frac{u^2}{2}\big]_1^3 [\ln v]_1^2 = 2\ln 2" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'A 3D Jacobi-determináns — a 15.6 fejezet nagy egyesítése',
    body: (
      <>
        <p>
          Három dimenzióban minden pontosan ugyanígy működik, csak a <M t="2\times 2" />-es determináns helyébe a{' '}
          <M t="3\times 3" />-as Jacobi-determináns lép — és egyetlen képletből kiesik a hengerkoordinátás{' '}
          <M t="r" />, a gömbi <M t="\rho^2\sin\phi" /> és az ellipszoid térfogata is!
        </p>

        <Def title="Helyettesítési tétel három dimenzióban">
          <M block t="J(u, v, w) = \frac{\partial(x, y, z)}{\partial(u, v, w)} = \begin{vmatrix} x_u & x_v & x_w \\ y_u & y_v & y_w \\ z_u & z_v & z_w \end{vmatrix}," />
          <M block t="\iiint_D f(x, y, z)\,dx\,dy\,dz = \iiint_G f(x, y, z)\,\big|J(u, v, w)\big|\,du\,dv\,dw." />
        </Def>

        <Jacobian3DUnifierWidget />

        <Quiz
          q={<>Mekkora a térfogata az <M t="\frac{x^2}{4} + \frac{y^2}{9} + \frac{z^2}{25} \le 1" /> ellipszoidnak az <M t="x = 2u,\; y = 3v,\; z = 5w" /> helyettesítéssel?</>}
          options={[
            { label: <M t="30\pi" /> },
            { label: <M t="40\pi" />, ok: true },
            { label: <M t="60\pi" /> },
            { label: <M t="120\pi" /> },
          ]}
          explain={
            <>
              <M t="a = 2,\; b = 3,\; c = 5 \Rightarrow J = 30" />. Az egységgömb térfogata <M t="\frac{4}{3}\pi" />,
              így <M t="V = 30 \cdot \frac{4}{3}\pi = 40\pi" />!
            </>
          }
        />

        <Task n={9} q={<>Igazold a 3×3-as Jacobi-determináns kifejtésével a 3. sor szerint, hogy gömbi koordinátákban <M t="J(\rho, \phi, \theta) = \rho^2\sin\phi" />!</>}>
          <p>
            A 3. sor elemei <M t="(\cos\phi,\; -\rho\sin\phi,\; 0)" />. Kifejtve:{' '}
            <M t="\cos\phi(\rho^2\sin\phi\cos\phi) + \rho\sin\phi(\rho\sin^2\phi) = \rho^2\sin\phi(\cos^2\phi + \sin^2\phi) = \rho^2\sin\phi" />!
          </p>
        </Task>

        <Task n={10} q={<>Számítsd ki az <M t="\iiint_E (x^2/a^2 + y^2/b^2 + z^2/c^2)\,dV" /> integrált az <M t="\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2} \le 1" /> ellipszoidon!</>}>
          <p>
            Az <M t="x=au, y=bv, z=cw" /> helyettesítéssel (<M t="J = abc" />) az egységgömbön integráljuk{' '}
            <M t="u^2+v^2+w^2 = \rho^2" />-et: <M t="abc \cdot 4\pi \int_0^1 \rho^2\cdot\rho^2\,d\rho = \frac{4\pi}{5}abc" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Orientáció és a Jacobi-determináns előjele',
    body: (
      <>
        <p>
          Miért kell abszolút értéket tenni <M t="J" /> köré? Mert a determináns <em>előjeles</em> térfogat-skálázás:
          ha pozitív, a leképezés megtartja a körüljárási irányt (orientációt); ha negatív, tükrözi (mint amikor
          felcseréljük az <M t="x" /> és <M t="y" /> tengelyeket); ha nulla, lokálisan összelapítja a teret!
        </p>

        <OrientationSignWidget />

        <Warn>
          Az sem baj, ha a Jacobi-determináns a tartomány <strong>peremén</strong> vagy elszigetelt pontokban nulla
          (például polárban <M t="r = 0" />-nál vagy gömbiben a pólusokon <M t="\phi = 0, \pi" />-nél): ezeknek a
          halmazoknak a 2D területe / 3D térfogata nulla, így nem befolyásolják az integrál értékét!
        </Warn>

        <Task n={11} q={<>Orientációtartó vagy orientációváltó az <M t="x = v,\; y = u" /> tengelycsere?</>}>
          <p>
            <M t="J = \begin{vmatrix} 0 & 1 \\ 1 & 0 \end{vmatrix} = -1 < 0" />, tehát <strong>orientációváltó</strong>{' '}
            (tükrözés az <M t="y = x" /> egyenesre), de területtartó (<M t="|J| = 1" />).
          </p>
        </Task>

        <Task n={12} q={<>Igazold, hogy az <M t="x = u + kv,\; y = v" /> nyírás bármely <M t="k \in \mathbb{R}" /> esetén pontosan területtartó!</>}>
          <p>
            <M t="J = \begin{vmatrix} 1 & k \\ 0 & 1 \end{vmatrix} = 1" /> (független <M t="k" />-tól!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Klasszikus vizsgatrükk: trapéz és szimmetria',
    body: (
      <>
        <p>
          Nem csak téglalappá, hanem <em>szimmetrikus</em> tartománnyá is érdemes átalakítani egy integrált — főleg,
          ha az integrandusban a <M t="\frac{y-x}{y+x}" /> hányados szerepel!
        </p>

        <TrapezoidTransformWidget />

        <Quiz
          q={<>Ha <M t="u = 2x + 3y" /> és <M t="v = x - y" />, mennyi a <M t="\left|\frac{\partial(x, y)}{\partial(u, v)}\right|" /> Jacobi-szorzó?</>}
          options={[
            { label: <M t="5" /> },
            { label: <M t="\frac{1}{5}" />, ok: true },
            { label: <M t="1" /> },
            { label: <M t="-\frac{1}{5}" /> },
          ]}
          explain={
            <>
              <M t="\frac{\partial(u,v)}{\partial(x,y)} = 2(-1) - 3(1) = -5" />, ezért a reciprok abszolút értéke{' '}
              <M t="\left|\frac{1}{-5}\right| = \frac{1}{5}" />!
            </>
          }
        />

        <Task n={13} q={<>Számítsd ki az <M t="\iint_R \cos\!\left(\frac{y-x}{y+x}\right)\,dA" /> integrált az <M t="1 \le x+y \le 2,\; x \ge 0,\; y \ge 0" /> trapézon!</>}>
          <p>
            <M t="u = x+y \in [1, 2],\; v = y-x \in [-u, u],\; |J| = \frac{1}{2}" />:{' '}
            <M t="\frac{1}{2}\int_1^2 \int_{-u}^u \cos\!\big(\frac{v}{u}\big)\,dv\,du = \frac{1}{2}\int_1^2 2u\sin(1)\,du = \sin(1)\big[\frac{u^2}{2}\big]_1^2 = \frac{3}{2}\sin 1" />!
          </p>
        </Task>

        <Task n={14} q={<>Mekkora a térfogata a <M t="0 \le x + y \le 2,\; 0 \le y + z \le 3,\; 0 \le z + x \le 4" /> paralelepipedonnak?</>}>
          <p>
            <M t="u = x+y,\; v = y+z,\; w = z+x" />.{' '}
            <M t="\frac{\partial(u,v,w)}{\partial(x,y,z)} = \begin{vmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{vmatrix} = 2 \Rightarrow |J| = \frac{1}{2}" />.
            Így <M t="V = \frac{1}{2} \cdot 2 \cdot 3 \cdot 4 = 12" />!
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
        <JacobianMasterMapDiagram />

        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Számítsd ki az <M t="x = 4u - v,\; y = 2u + 3v" /> transzformáció Jacobi-determinánsát!</>}>
          <p>
            <M t="J = 4\cdot 3 - (-1)\cdot 2 = 14" />.
          </p>
        </Task>

        <Task n={16} q={<>Mennyi az <M t="x = e^u\cos v,\; y = e^u\sin v" /> leképezés Jacobi-determinánsa?</>}>
          <p>
            <M t="J = e^{2u}(\cos^2 v + \sin^2 v) = e^{2u}" />.
          </p>
        </Task>

        <Task n={17} q={<>Mekkora a térfogata az <M t="\frac{x^2}{1} + \frac{y^2}{4} + \frac{z^2}{9} \le 1" /> ellipszoidnak?</>}>
          <p>
            <M t="a = 1,\; b = 2,\; c = 3 \Rightarrow V = \frac{4}{3}\pi \cdot 1 \cdot 2 \cdot 3 = 8\pi" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Számítsd ki az <M t="\iint_R (x + y)^2\,dA" /> integrált a <M t="(0;0), (1;1), (2;0), (1;-1)" /> csúcsú négyzeten!</>}>
          <p>
            <M t="u = x+y \in [0, 2],\; v = x-y \in [0, 2],\; |J| = \frac{1}{2}" />:{' '}
            <M t="\frac{1}{2}\int_0^2 u^2\,du \int_0^2 dv = \frac{1}{2}\cdot\frac{8}{3}\cdot 2 = \frac{8}{3}" />.
          </p>
        </Task>

        <Task n={19} q={<>Számítsd ki az <M t="\iint_E (x^2/4 + y^2/9)\,dA" /> integrált az <M t="\frac{x^2}{4} + \frac{y^2}{9} \le 1" /> ellipszisen!</>}>
          <p>
            <M t="x = 2u,\; y = 3v" /> (<M t="J = 6" />):{' '}
            <M t="6 \iint_{u^2+v^2\le 1} (u^2+v^2)\,du\,dv = 6 \cdot 2\pi \int_0^1 r^3\,dr = 12\pi \cdot \frac{1}{4} = 3\pi" />.
          </p>
        </Task>

        <Task n={20} q={<>Határozd meg az <M t="x = u/v,\; y = v" /> (<M t="v > 0" />) leképezés Jacobi-determinánsát!</>}>
          <p>
            <M t="J = \begin{vmatrix} 1/v & -u/v^2 \\ 0 & 1 \end{vmatrix} = \frac{1}{v}" />.
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az I. negyedben az <M t="y = x^2,\; y = 2x^2,\; x = y^2,\; x = 3y^2" /> parabolák által közbezárt tartomány területét!</>}>
          <p>
            Legyen <M t="u = \frac{y}{x^2} \in [1, 2]" />, <M t="v = \frac{x}{y^2} \in [1, 3]" />.{' '}
            <M t="\frac{\partial(u,v)}{\partial(x,y)} = \begin{vmatrix} -2y/x^3 & 1/x^2 \\ 1/y^2 & -2x/y^3 \end{vmatrix} = \frac{3}{x^2 y^2}" />.
            Mivel <M t="uv = \frac{1}{xy}" />, <M t="\frac{1}{x^2 y^2} = u^2 v^2" />, tehát{' '}
            <M t="|J| = \frac{1}{3u^2 v^2}" />!
            Így <M t="\operatorname{Ter} = \frac{1}{3}\int_1^2 u^{-2}\,du \int_1^3 v^{-2}\,dv = \frac{1}{3}\big(1 - \frac{1}{2}\big)\big(1 - \frac{1}{3}\big) = \frac{1}{9}" />!
          </p>
        </Task>

        <Task n={22} q={<>Számítsd ki az <M t="\iint_R e^{(y-x)/(y+x)}\,dA" /> integrált a <M t="(0;0), (1;0), (0;1)" /> csúcsú háromszögön!</>}>
          <p>
            <M t="u = x+y \in [0, 1],\; v = y-x \in [-u, u],\; |J| = \frac{1}{2}" />:{' '}
            <M t="\frac{1}{2}\int_0^1 \int_{-u}^u e^{v/u}\,dv\,du = \frac{1}{2}\int_0^1 u(e - e^{-1})\,du = \frac{e - e^{-1}}{4} = \frac{1}{2}\sinh 1" />!
          </p>
        </Task>

        <Task n={23} q={<>Számítsd ki az <M t="x^2/a^2 + y^2/b^2 + z^2/c^2 \le 1" /> homogén ellipszoid <M t="I_z" /> tehetetlenségi nyomatékát (<M t="M" /> tömeg) az <M t="x=au, y=bv, z=cw" /> helyettesítéssel!</>}>
          <p>
            <M t="I_z = \delta abc \iiint_{B_1} (a^2 u^2 + b^2 v^2)\,du\,dv\,dw" />. Szimmetriából{' '}
            <M t="\iiint_{B_1} u^2\,dV = \iiint_{B_1} v^2\,dV = \frac{1}{3}\iiint_{B_1} \rho^2\,dV = \frac{4\pi}{15}" />.
            Így <M t="I_z = \delta abc \cdot \frac{4\pi}{15}(a^2 + b^2) = \frac{1}{5}M(a^2 + b^2)" />! (Ha <M t="a=b=R" />,
            visszakapjuk a gömb <M t="\frac{2}{5}MR^2" /> képletét!)
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={<>Mi az <M t="x = 2u + v" />, <M t="y = u + 3v" /> transzformáció Jacobi-determinánsa?</>}
          options={[
            { label: <><M t="5" /></>, ok: true },
            { label: <><M t="7" /></> },
            { label: <><M t="6" /></> },
            { label: <><M t="1" /></> },
          ]}
          explain={
            <>
              <M t="J(u, v) = \begin{vmatrix} 2 & 1 \\ 1 & 3 \end{vmatrix} = 2\cdot 3 - 1\cdot 1 = 5" />.
            </>
          }
        />
      </>
    ),
  },
];
