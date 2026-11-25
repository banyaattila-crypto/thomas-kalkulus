import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  Line3DParamWidget,
  LinePlaneMasterDiagram,
  LinePlanePierce3DWidget,
  PlaneNormal3DWidget,
  PointLine3DDistWidget,
  PointPlaneDist3DWidget,
  SkewDistanceDiagram,
  SkewLines3DWidget,
} from '../components/Widgets125';
import type { Page } from './s1_1';

export const S12_5: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Egyenesek a térben: vektoros és paraméteres alak',
    body: (
      <>
        <Story>
          <p>
            A síkban egy egyeneshez elég volt egy pont és a meredekség. A térben viszont egy adott ponton át végtelen
            sok irányba húzhatunk egyenest — ezért a meredekség helyét az <strong>irányvektor (<M t="\mathbf{v}" />)</strong>{' '}
            veszi át!
          </p>
        </Story>

        <Def title="Térbeli egyenes vektoros és paraméteres egyenlete">
          <p>
            A <M t="P_0(x_0;\,y_0;\,z_0)" /> ponton átmenő, <M t="\mathbf{v} = \langle v_1, v_2, v_3 \rangle" />{' '}
            irányvektorú egyenes egyenlete:
            <M block t="\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v} \qquad \Longleftrightarrow \qquad \begin{cases} x = x_0 + v_1 t, \\ y = y_0 + v_2 t, \\ z = z_0 + v_3 t \end{cases} \quad (t \in \mathbb{R})." />
            Ha <M t="t" />-t a <M t="[0, 1]" /> intervallumra korlátozzuk, a <M t="P_0" /> és <M t="P_0 + \mathbf{v}" />{' '}
            közötti <strong>szakaszt</strong> kapjuk!
          </p>
        </Def>

        <Line3DParamWidget />

        <Task n={1} q={<>Írd fel a <M t="P(-2;\,0;\,4)" /> ponton átmenő, <M t="\mathbf{v} = \langle 2, 4, -2 \rangle" /> irányvektorú egyenes paraméteres egyenleteit!</>}>
          <p>
            <M t="x = -2 + 2t,\quad y = 4t,\quad z = 4 - 2t" /> (<M t="t \in \mathbb{R}" />).
          </p>
        </Task>

        <Task n={2} q={<>Paraméterezd az <M t="A(1;\,3;\,-1)" /> és <M t="B(4;\,1;\,5)" /> pontok közötti szakaszt!</>}>
          <p>
            Irányvektor: <M t="\overrightarrow{AB} = \langle 3, -2, 6 \rangle" />. Így:{' '}
            <M t="x = 1 + 3t,\; y = 3 - 2t,\; z = -1 + 6t" />, ahol <strong><M t="0 \le t \le 1" /></strong>.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Két térbeli egyenes: párhuzamos, metsző vagy kitérő?',
    body: (
      <>
        <p>
          A síkban két nem párhuzamos egyenes biztosan metszi egymást. A térben van egy harmadik eset is: két egyenes
          lehet <strong>kitérő</strong> (nem párhuzamosak és nem is metszik egymást — mint két különböző magasságban
          elhaladó repülőgép pályája!).
        </p>

        <SkewLines3DWidget />

        <Quiz
          q={<>Adott <M t="L_1: \langle 1+t,\; 2t,\; 3-t \rangle" /> és <M t="L_2: \langle 2-s,\; 1+s,\; 4+s \rangle" />. Miért kell <strong>két különböző paramétert</strong> (<M t="t" /> és <M t="s" />) használni a metszéspont keresésénél?</>}
          options={[
            { label: <>Csak megszokásból, ugyanazzal a <M t="t" />-vel is mindig megtaláljuk a metszéspontot</> },
            { label: <>Mert a két egyenes különböző <M t="t" /> és <M t="s" /> paraméterértéknél érhet ugyanabba a pontba</>, ok: true },
            { label: <>Mert két egyenesnek mindig két metszéspontja van</> },
            { label: <>Csak akkor kell, ha az egyenesek párhuzamosak</> },
          ]}
          explain={
            <>
              Ha ugyanazt a <M t="t" />-t használnád, csak azt vizsgálnád, mikor <em>ütközik</em> két pont ugyanabban az
              időpillanatban — a pályák metszéspontjához viszont <M t="t \ne s" /> is megengedett!
            </>
          }
        />

        <Task n={3} q={<>Döntsd el, hogy az <M t="L_1: (1+t,\; -2+3t,\; 4-t)" /> és <M t="L_2: (2s,\; 3+s,\; -3+4s)" /> egyenesek metszők vagy kitérők!</>}>
          <p>
            Irányvektoraik <M t="\langle 1,3,-1 \rangle" /> és <M t="\langle 2,1,4 \rangle" /> nem párhuzamosak.
            Egyenlővé téve <M t="x" />-et és <M t="y" />-t: <M t="1+t = 2s" /> és <M t="-2+3t = 3+s" />. Innen{' '}
            <M t="s = 3t - 5 \implies 1+t = 6t - 10 \implies t = \frac{11}{5},\; s = \frac{8}{5}" />. Ellenőrzés{' '}
            <M t="z" />-ben: <M t="4 - \frac{11}{5} = \frac{9}{5}" />, míg <M t="-3 + \frac{32}{5} = \frac{17}{5} \ne \frac{9}{5}" />!
            Tehát a két egyenes <strong>kitérő</strong>.
          </p>
        </Task>

        <Task n={4} q={<>Metszi-e egymást az <M t="L_1: (t,\; 1+t,\; 2+t)" /> és <M t="L_2: (2-s,\; 3-s,\; 2s)" /> egyenes? Ha igen, hol?</>}>
          <p>
            <M t="t = 2 - s" /> és <M t="1 + t = 3 - s" /> ugyanazt adja (<M t="t + s = 2" />). A harmadik egyenletből{' '}
            <M t="2 + t = 2s \implies 2 + (2 - s) = 2s \implies 3s = 4 \implies s = \frac{4}{3},\; t = \frac{2}{3}" />.
            Igen, metszők! Metszéspont: <M t="\left(\frac{2}{3};\; \frac{5}{3};\; \frac{8}{3}\right)" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Pont és egyenes távolsága a térben',
    body: (
      <>
        <p>
          A 12.4-ben láttuk, hogy két vektor által kifeszített paralelogramma magassága <M t="T / \text{alap}" />.
          Pontosan ez adja egy külső <M t="S" /> pont távolságát az <M t="L" /> egyenestől:
        </p>

        <Def title="Pont és egyenes távolsága ℝ³-ban">
          <p>
            Ha <M t="P" /> az <M t="L" /> egyenes egy pontja és <M t="\mathbf{v}" /> az irányvektora, akkor bármely{' '}
            <M t="S" /> pont távolsága <M t="L" />-től:
            <M block t="d = \frac{|\overrightarrow{PS} \times \mathbf{v}|}{|\mathbf{v}|}." />
          </p>
        </Def>

        <PointLine3DDistWidget />

        <Task n={5} q={<>Számítsd ki az <M t="S(1;\,1;\,5)" /> pont távolságát az <M t="L: x = 1 + t,\; y = 3 - t,\; z = 2t" /> egyenestől!</>}>
          <p>
            <M t="P(1;\,3;\,0) \in L" />, <M t="\mathbf{v} = \langle 1, -1, 2 \rangle" />,{' '}
            <M t="\overrightarrow{PS} = \langle 0, -2, 5 \rangle" />.{' '}
            <M t="\overrightarrow{PS}\times\mathbf{v} = \langle -4+5,\; -(0-5),\; 0+2 \rangle = \langle 1, 5, 2 \rangle" />.
            Így <M t="d = \frac{\sqrt{1 + 25 + 4}}{\sqrt{1 + 1 + 4}} = \frac{\sqrt{30}}{\sqrt{6}} = \sqrt{5}" />!
          </p>
        </Task>

        <Task n={6} q={<>Számítsd ki a <M t="P(2;\,1;\,3)" /> pont távolságát az <M t="x" />-tengelytől a fenti képlettel, és ellenőrizd a 12.1-es eredménnyel!</>}>
          <p>
            <M t="O(0;\,0;\,0)" />, <M t="\mathbf{v} = \mathbf{i} = \langle 1, 0, 0 \rangle" />.{' '}
            <M t="\langle 2,1,3 \rangle \times \langle 1,0,0 \rangle = \langle 0, 3, -1 \rangle" />, hossza{' '}
            <M t="\sqrt{10}" />, <M t="|\mathbf{i}| = 1" />, tehát <M t="d = \sqrt{10} = \sqrt{1^2 + 3^2}" /> ✓!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Síkok a térben: normálvektor és általános egyenlet',
    body: (
      <>
        <p>
          Egy térbeli síkot legkönnyebben nem az irányával, hanem a rá <strong>merőleges vektorral (normálvektorral)</strong>{' '}
          tudunk megadni! Minden a síkban fekvő <M t="\overrightarrow{P_0 P}" /> vektor merőleges{' '}
          <M t="\mathbf{n}" />-re:
        </p>

        <Def title="A sík egyenlete">
          <p>
            A <M t="P_0(x_0;\,y_0;\,z_0)" /> ponton átmenő, <M t="\mathbf{n} = \langle A, B, C \rangle \ne \mathbf{0}" />{' '}
            normálvektorú sík egyenlete:
            <M block t="A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \qquad \Longleftrightarrow \qquad Ax + By + Cz = D," />
            ahol <M t="D = Ax_0 + By_0 + Cz_0" />. Az <M t="x, y, z" /> együtthatói azonnal megadják a normálvektort!
          </p>
        </Def>

        <PlaneNormal3DWidget />

        <Steps
          title="Három ponton átmenő sík egyenlete lépésről lépésre"
          problem={<>Írd fel az <M t="A(1;\,0;\,1)" />, <M t="B(2;\,1;\,0)" /> és <M t="C(0;\,3;\,2)" /> pontokon átmenő sík egyenletét!</>}
          steps={[
            {
              title: 'Két síkbeli irányvektor felírása',
              body: (
                <p>
                  <M t="\overrightarrow{AB} = \langle 1, 1, -1 \rangle" /> és{' '}
                  <M t="\overrightarrow{AC} = \langle -1, 3, 1 \rangle" />.
                </p>
              ),
            },
            {
              title: 'Normálvektor vektoriális szorzattal',
              body: (
                <p>
                  <M block t="\mathbf{n} = \overrightarrow{AB}\times\overrightarrow{AC} = \langle 1+3,\; -(1-1),\; 3+1 \rangle = \langle 4, 0, 4 \rangle." />
                  Egyszerűsíthetjük 4-gyel: <M t="\mathbf{n}_0 = \langle 1, 0, 1 \rangle" />!
                </p>
              ),
            },
            {
              title: 'Sík egyenlete az A(1; 0; 1) ponttal',
              body: (
                <p>
                  <M t="1(x - 1) + 0(y - 0) + 1(z - 1) = 0 \implies x + z = 2" />. (Ellenőrzés: <M t="B: 2+0=2" /> ✓,{' '}
                  <M t="C: 0+2=2" /> ✓!)
                </p>
              ),
            },
          ]}
        />

        <Task n={7} q={<>Írd fel a <M t="P(2;\,-1;\,3)" /> ponton átmenő, a <M t="4x - 2y + z = 7" /> síkkal párhuzamos sík egyenletét!</>}>
          <p>
            Ugyanaz a normálvektor (<M t="\mathbf{n} = \langle 4, -2, 1 \rangle" />):{' '}
            <M t="4(x-2) - 2(y+1) + (z-3) = 0 \implies 4x - 2y + z = 13" />.
          </p>
        </Task>

        <Task n={8} q={<>Olvasd le a <M t="3y - 5z = 8" /> sík normálvektorát! Melyik koordinátatengellyel párhuzamos ez a sík?</>}>
          <p>
            <M t="\mathbf{n} = \langle 0, 3, -5 \rangle" />. Mivel <M t="x" /> hiányzik (<M t="\mathbf{n}\cdot\mathbf{i} = 0" />),
            a sík párhuzamos az <strong><M t="x" />-tengellyel</strong>!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Döféspont, két sík metszésvonala és hajlásszöge',
    body: (
      <>
        <p>
          <strong>Egyenes és sík döféspontja:</strong> behelyettesítjük az egyenes <M t="x(t), y(t), z(t)" /> képleteit
          a sík egyenletébe, és megoldjuk <M t="t" />-re!
        </p>
        <p>
          <strong>Két metsző sík:</strong> hajlásszögük a normálvektoraik közti hegyesszög:{' '}
          <M t="\cos\theta = \frac{|\mathbf{n}_1\cdot\mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}" />. Metszésvonaluk
          irányvektora pedig mindkét normálvektorra merőleges, tehát <strong><M t="\mathbf{v} = \mathbf{n}_1\times\mathbf{n}_2" /></strong>!
        </p>

        <LinePlanePierce3DWidget />

        <Quiz
          q={<>Mikor merőleges egymásra a <M t="2x - y + 3z = 5" /> és az <M t="x + ky - z = 1" /> sík?</>}
          options={[
            { label: <M t="k = -1" />, ok: true },
            { label: <M t="k = 1" /> },
            { label: <M t="k = 5" /> },
            { label: <M t="k = -5" /> },
          ]}
          explain={
            <>
              Két sík akkor merőleges, ha normálvektoraik merőlegesek: <M t="\langle 2,-1,3 \rangle \cdot \langle 1,k,-1 \rangle = 2 - k - 3 = 0 \implies k = -1" />!
            </>
          }
        />

        <Task n={9} q={<>Hol döfi át az <M t="x = 1 + 2t,\; y = -1 + t,\; z = 3 - t" /> egyenes az <M t="x + 2y - z = 4" /> síkot?</>}>
          <p>
            Behelyettesítve: <M t="(1+2t) + 2(-1+t) - (3-t) = 4 \implies 5t - 4 = 4 \implies t = \frac{8}{5}" />. A
            döféspont: <M t="\left(\frac{21}{5};\; \frac{3}{5};\; \frac{7}{5}\right)" />.
          </p>
        </Task>

        <Task n={10} q={<>Add meg az <M t="x + y + z = 1" /> és az <M t="x - 2y + 3z = 1" /> síkok metszésvonalának paraméteres egyenletét!</>}>
          <p>
            Irányvektor: <M t="\mathbf{v} = \langle 1,1,1 \rangle \times \langle 1,-2,3 \rangle = \langle 5, -2, -3 \rangle" />.
            Egy közös pont (pl. <M t="z = 0" /> választással): <M t="x + y = 1" /> és <M t="x - 2y = 1 \implies y = 0,\; x = 1" />,
            azaz <M t="(1;\,0;\,0)" />. A metszésvonal: <M t="x = 1 + 5t,\; y = -2t,\; z = -3t" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Pont és sík távolsága · Párhuzamos síkok',
    body: (
      <>
        <p>
          Pontosan úgy, ahogy a 12.3-ban síkbeli egyenesnél csináltuk, a térben egy <M t="S(x_1;\,y_1;\,z_1)" /> pont
          távolsága az <M t="Ax + By + Cz = D" /> síktól a <M t="\overrightarrow{P_0 S}" /> vektor normálvektorra vett
          vetületének hossza:
        </p>

        <Def title="Pont és sík távolsága">
          <M block t="d = \frac{|Ax_1 + By_1 + Cz_1 - D|}{\sqrt{A^2 + B^2 + C^2}}." />
          <p>
            Két párhuzamos sík (<M t="Ax+By+Cz = D_1" /> és <M t="Ax+By+Cz = D_2" />) távolsága:{' '}
            <M t="d = \dfrac{|D_1 - D_2|}{\sqrt{A^2 + B^2 + C^2}}" />.
          </p>
        </Def>

        <PointPlaneDist3DWidget />

        <Task n={11} q={<>Számítsd ki az <M t="S(1;\,-2;\,3)" /> pont távolságát a <M t="2x - 2y + z = 10" /> síktól!</>}>
          <p>
            <M t="d = \frac{|2(1) - 2(-2) + 3 - 10|}{\sqrt{4 + 4 + 1}} = \frac{|-1|}{3} = \frac{1}{3}" />.
          </p>
        </Task>

        <Task n={12} q={<>Mekkora a távolsága a <M t="3x - 4y + 12z = 5" /> és a <M t="6x - 8y + 24z = 36" /> párhuzamos síkoknak?</>}>
          <p>
            Hozzuk azonos együtthatókra! A másodikat 2-vel osztva: <M t="3x - 4y + 12z = 18" />. Így{' '}
            <M t="d = \frac{|18 - 5|}{\sqrt{9 + 16 + 144}} = \frac{13}{13} = 1" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 7. OLDAL */
  {
    title: 'Összefoglaló: térbeli egyenesek, síkok és 4 tipikus hiba',
    body: (
      <>
        <LinePlaneMasterDiagram />

        <SkewDistanceDiagram />

        <Warn>
          Négy tipikus hiba térbeli egyeneseknél és síkoknál:
          <ol>
            <li>
              <strong>Egyenes–sík párhuzamosság téves feltétele:</strong> egy egyenes akkor párhuzamos egy síkkal, ha{' '}
              <M t="\mathbf{v}" /> <strong>merőleges</strong> <M t="\mathbf{n}" />-re (<M t="\mathbf{v}\cdot\mathbf{n} = 0" />),
              nem pedig párhuzamos vele!
            </li>
            <li>
              <strong>Azonos paraméter két egyenes metszésénél:</strong> mindig használj két külön paramétert (<M t="t" /> és <M t="s" />)!
            </li>
            <li>
              <strong>Párhuzamos síkok távolsága eltérő együtthatókkal:</strong> <M t="|D_1 - D_2|/|\mathbf{n}|" />{' '}
              csak akkor igaz, ha a két egyenletben az <M t="A, B, C" /> együtthatók <em>megegyeznek</em>!
            </li>
            <li>
              <strong><M t="D" /> előjele pont–sík távolságnál:</strong> ha <M t="Ax+By+Cz = D" />, akkor a képletben{' '}
              <M t="-D" /> áll (<M t="|Ax_1+By_1+Cz_1 - D|" />)!
            </li>
          </ol>
        </Warn>

        <Quiz
          q={<>Mikor párhuzamos az <M t="L" /> egyenes (irányvektora <M t="\mathbf{v}" />) a <M t="\Sigma" /> síkkal (normálvektora <M t="\mathbf{n}" />)?</>}
          options={[
            { label: <M t="\mathbf{v} \times \mathbf{n} = \mathbf{0}" /> },
            { label: <M t="\mathbf{v} \cdot \mathbf{n} = 0" />, ok: true },
            { label: <M t="\mathbf{v} = \mathbf{n}" /> },
            { label: <M t="|\mathbf{v}| = |\mathbf{n}|" /> },
          ]}
          explain={
            <>
              Mivel <M t="\mathbf{n}" /> merőleges a síkra, a síkkal párhuzamos egyenes irányvektora merőleges{' '}
              <M t="\mathbf{n}" />-re — tehát <M t="\mathbf{v}\cdot\mathbf{n} = 0" />!
            </>
          }
        />

        <Task n={13} q={<>Párhuzamos-e az <M t="L: (2+t,\; 1-2t,\; 3+t)" /> egyenes a <M t="3x + y - z = 5" /> síkkal?</>}>
          <p>
            <M t="\mathbf{v} = \langle 1, -2, 1 \rangle" />, <M t="\mathbf{n} = \langle 3, 1, -1 \rangle" />.{' '}
            <M t="\mathbf{v}\cdot\mathbf{n} = 3 - 2 - 1 = 0" /> → <strong>igen, párhuzamos!</strong> (És mivel{' '}
            <M t="3(2)+1-3 = 4 \ne 5" />, nem fekszik benne.)
          </p>
        </Task>

        <Task n={14} q={<>Milyen feltétel mellett merőleges az <M t="L" /> egyenes a <M t="\Sigma" /> síkra?</>}>
          <p>
            Akkor, ha irányvektora párhuzamos a sík normálvektorával: <M t="\mathbf{v} = k\mathbf{n}" /> (vagy{' '}
            <M t="\mathbf{v}\times\mathbf{n} = \mathbf{0}" />).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 8. OLDAL */
  {
    title: 'Gyakorlófeladatok (könnyű · közepes · nehéz)',
    body: (
      <>
        <h3>Könnyű feladatok</h3>

        <Task n={15} q={<>Írd fel a <M t="P(3;\,-1;\,2)" /> ponton átmenő, <M t="\mathbf{n} = \langle 2, -5, 1 \rangle" /> normálvektorú sík egyenletét!</>}>
          <p>
            <M t="2(x-3) - 5(y+1) + (z-2) = 0 \implies 2x - 5y + z = 13" />.
          </p>
        </Task>

        <Task n={16} q={<>Írd fel az <M t="A(0;\,2;\,-1)" /> és <M t="B(3;\,-1;\,5)" /> pontokon átmenő egyenes paraméteres egyenleteit!</>}>
          <p>
            <M t="\mathbf{v} = \langle 3, -3, 6 \rangle" /> (egyszerűsítve <M t="\langle 1, -1, 2 \rangle" />):{' '}
            <M t="x = t,\; y = 2 - t,\; z = -1 + 2t" />.
          </p>
        </Task>

        <Task n={17} q={<>Számítsd ki az origó távolságát a <M t="2x + 3y - 6z = 14" /> síktól!</>}>
          <p>
            <M t="d = \frac{|0 + 0 - 0 - 14|}{\sqrt{4 + 9 + 36}} = \frac{14}{7} = 2" />.
          </p>
        </Task>

        <h3>Közepes feladatok</h3>

        <Task n={18} q={<>Írd fel a <M t="P(1;\,0;\,0)" />, <M t="Q(0;\,2;\,0)" /> és <M t="R(0;\,0;\,3)" /> tengelymetszetű sík egyenletét!</>}>
          <p>
            <M t="\overrightarrow{PQ} = \langle -1, 2, 0 \rangle" />, <M t="\overrightarrow{PR} = \langle -1, 0, 3 \rangle" />.
            <M t="\mathbf{n} = \langle 6, 3, 2 \rangle" />. Egyenlet: <M t="6x + 3y + 2z = 6" /> (vagy tengelymetszetes
            alakban: <M t="\frac{x}{1} + \frac{y}{2} + \frac{z}{3} = 1" />!).
          </p>
        </Task>

        <Task n={19} q={<>Határozd meg az <M t="x - y + z = 2" /> és a <M t="2x + y - 2z = 5" /> síkok hajlásszögét!</>}>
          <p>
            <M t="\mathbf{n}_1 = \langle 1, -1, 1 \rangle" /> (<M t="|\mathbf{n}_1|=\sqrt{3}" />),{' '}
            <M t="\mathbf{n}_2 = \langle 2, 1, -2 \rangle" /> (<M t="|\mathbf{n}_2|=3" />).{' '}
            <M t="\cos\theta = \frac{|2 - 1 - 2|}{3\sqrt{3}} = \frac{1}{3\sqrt{3}} \approx 0{,}192 \implies \theta \approx 78{,}9^\circ" />.
          </p>
        </Task>

        <Task n={20} q={<>Hol metszi a <M t="P(2;\,1;\,-3)" /> ponton átmenő, a <M t="x + 2y - z = 4" /> síkra <em>merőleges</em> egyenes a síkot (vagyis hol van <M t="P" /> merőleges vetülete a síkon)?</>}>
          <p>
            Az egyenes: <M t="x = 2 + t,\; y = 1 + 2t,\; z = -3 - t" />. Behelyettesítve:{' '}
            <M t="(2+t) + 2(1+2t) - (-3-t) = 4 \implies 6t + 7 = 4 \implies t = -\frac{1}{2}" />. A talppont:{' '}
            <M t="\left(\frac{3}{2};\; 0;\; -\frac{5}{2}\right)" />!
          </p>
        </Task>

        <h3>Nehéz feladatok</h3>

        <Task n={21} q={<>Számítsd ki az <M t="L_1: (t,\; 0,\; 0)" /> és <M t="L_2: (1,\; s,\; 2+s)" /> kitérő egyenesek távolságát!</>}>
          <p>
            <M t="P_1(0;\,0;\,0)" />, <M t="\mathbf{v}_1 = \langle 1,0,0 \rangle" />; <M t="P_2(1;\,0;\,2)" />,{' '}
            <M t="\mathbf{v}_2 = \langle 0,1,1 \rangle" />. Közös normális: <M t="\mathbf{n} = \mathbf{v}_1\times\mathbf{v}_2 = \langle 0,-1,1 \rangle" />{' '}
            (<M t="|\mathbf{n}| = \sqrt{2}" />). <M t="\overrightarrow{P_1P_2} = \langle 1,0,2 \rangle" />, így{' '}
            <M t="d = \frac{|\langle 1,0,2 \rangle \cdot \langle 0,-1,1 \rangle|}{\sqrt{2}} = \frac{2}{\sqrt{2}} = \sqrt{2}" />!
          </p>
        </Task>

        <Task n={22} q={<>Add meg a <M t="P(1;\,2;\,3)" /> pont tükörképét az <M t="x + y + z = 9" /> síkra!</>}>
          <p>
            A síkra merőleges egyenes: <M t="(1+t,\; 2+t,\; 3+t)" />. Döféspont:{' '}
            <M t="6 + 3t = 9 \implies t = 1" /> (talppont <M t="(2;\,3;\,4)" />). A tükörkép <M t="t = 2" />-nél van:{' '}
            <M t="P'(3;\,4;\,5)" />!
          </p>
        </Task>

        <Task n={23} q={<>Írd fel annak a síknak az egyenletét, amely tartalmazza az <M t="L: (1+t,\; 2-t,\; 3t)" /> egyenest és a rajta kívül fekvő <M t="Q(2;\,1;\,1)" /> pontot!</>}>
          <p>
            Az egyenes egy pontja <M t="P(1;\,2;\,0)" />, irányvektora <M t="\mathbf{v} = \langle 1, -1, 3 \rangle" />.
            A második síkbeli vektor <M t="\overrightarrow{PQ} = \langle 1, -1, 1 \rangle" />. Normálvektor:{' '}
            <M t="\mathbf{n} = \mathbf{v}\times\overrightarrow{PQ} = \langle -1+3,\; -(1-3),\; -1+1 \rangle = \langle 2, 2, 0 \rangle" />{' '}
            (egyszerűsítve <M t="\langle 1, 1, 0 \rangle" />). Egyenlet: <M t="1(x-1) + 1(y-2) = 0 \implies x + y = 3" />!
          </p>
        </Task>
      </>
    ),
  },
];
