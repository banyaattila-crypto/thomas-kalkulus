import { M } from '../components/M';
import { Def, Quiz, Steps, Story, Task, Warn } from '../components/ui';
import {
  BouncingBallWidget,
  DivergenceTestWidget,
  GeometricSeriesWidget,
  HarmonicGroupingDiagram,
  PartialSumsVisualizerWidget,
  SeriesToolboxDiagram,
  TelescopingSeriesWidget,
  UnitSquareSeriesDiagram,
} from '../components/Widgets112';
import type { Page } from './s1_1';

export const S11_2: Page[] = [
  /* ============================================================== 1. OLDAL */
  {
    title: 'Hogyan adunk össze végtelen sok számot? Részletösszegek',
    body: (
      <>
        <Story>
          <p>
            Zénón paradoxona óta izgatja az emberiséget a kérdés: hogyan érhetünk el egy véges célt végtelen sok, egyre
            kisebb lépésben? A modern analízis válasza kristálytiszta: nem „végtelen sokszor nyomjuk meg a plusz
            gombot”, hanem megnézzük az első <M t="n" /> tag összegének — a <strong>részletösszegek sorozatának</strong>{' '}
            — a határértékét!
          </p>
        </Story>

        <UnitSquareSeriesDiagram />

        <Def title="Végtelen sor, részletösszeg és összeg">
          <p>
            Az <M t="\{a_n\}_{n=1}^\infty" /> sorozatból képzett <M t="\sum_{n=1}^\infty a_n = a_1 + a_2 + a_3 + \cdots" />{' '}
            kifejezés <strong><M t="n" />-edik részletösszege</strong>:
          </p>
          <M block t="s_n = a_1 + a_2 + \cdots + a_n = \sum_{k=1}^n a_k." />
          <p>
            Ha az <M t="\{s_n\}" /> részletösszeg-sorozat konvergens és <M t="\lim_{n\to\infty} s_n = S" /> (véges),
            akkor a végtelen sor <strong>konvergens</strong>, és <strong>összege</strong> <M t="S" />. Különben a sor{' '}
            <strong>divergens</strong>.
          </p>
        </Def>

        <PartialSumsVisualizerWidget />

        <Quiz
          q={<>Egy végtelen sor <M t="n" />-edik részletösszege <M t="s_n = \dfrac{3n - 1}{n + 2}" />. Konvergens-e a sor, és ha igen, mennyi az összege?</>}
          options={[
            { label: <>Konvergens, összege <M t="S = 3" /></>, ok: true },
            { label: <>Divergens, mert <M t="\lim s_n = 3 \neq 0" /></> },
            { label: <>Konvergens, összege <M t="S = -\tfrac{1}{2}" /></> },
            { label: <>Nem dönthető el az <M t="a_n" /> ismerete nélkül</> },
          ]}
          explain={
            <>
              A sor összege definíció szerint a <strong>részletösszegek</strong> határértéke:{' '}
              <M t="S = \lim_{n\to\infty} s_n = \lim_{n\to\infty}\dfrac{3n-1}{n+2} = 3" />! (A 0-hoz tartás az{' '}
              <M t="a_n" /> tagokra vonatkozik, nem az <M t="s_n" /> részletösszegekre!)
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={1} q={<>Ha egy sor részletösszegei <M t="s_n = 2 - \dfrac{1}{n}" />, mennyi a sor összege, és mennyi a 4. tagja (<M t="a_4" />)?</>}>
          <p>
            Az összeg <M t="S = \lim_{n\to\infty}(2 - 1/n) = 2" />. A 4. tag:{' '}
            <M t="a_4 = s_4 - s_3 = \left(2 - \tfrac{1}{4}\right) - \left(2 - \tfrac{1}{3}\right) = \tfrac{1}{3} - \tfrac{1}{4} = \dfrac{1}{12}" />!
          </p>
        </Task>
        <Task n={2} q={<>Miért divergens az <M t="1 - 1 + 1 - 1 + \cdots = \sum_{n=1}^\infty (-1)^{n-1}" /> Grandi-sor?</>}>
          <p>
            Részletösszegei: <M t="s_1 = 1,\ s_2 = 0,\ s_3 = 1,\ s_4 = 0,\,\ldots" /> — ez a sorozat 0 és 1 között
            oszcillál, nincs határértéke, ezért a sor divergens!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 2. OLDAL */
  {
    title: 'Mértani sorok',
    body: (
      <>
        <p>
          A legfontosabb olyan végtelen sor, amelynek az összegét <strong>pontosan</strong> ki tudjuk számolni, a{' '}
          <strong>mértani sor</strong>: minden tag az előzőnek állandó <M t="r" />-szerese (<M t="a \neq 0" />):
        </p>
        <M block t="\sum_{n=0}^\infty a r^n = a + ar + ar^2 + \cdots + ar^n + \cdots" />

        <Def title="Mértani sor konvergenciája és összege">
          <ul>
            <li>
              Ha <M t="|r| < 1" />, a mértani sor <strong>konvergens</strong>, és összege:
              <M block t="\sum_{n=0}^\infty a r^n = \frac{a}{1 - r} = \frac{\text{első tag}}{1 - \text{hányados}}." />
            </li>
            <li>Ha <M t="|r| \ge 1" /> (és <M t="a \neq 0" />), a mértani sor <strong>divergens</strong>.</li>
          </ul>
        </Def>

        <p>
          <em>Levezetés:</em> ha <M t="r \neq 1" />, akkor <M t="s_n = a + ar + \cdots + ar^{n-1}" /> és{' '}
          <M t="r s_n = ar + ar^2 + \cdots + ar^n" />. Kivonva: <M t="(1 - r)s_n = a(1 - r^n)" />, így{' '}
          <M t="s_n = \dfrac{a(1 - r^n)}{1 - r}" />. Ha <M t="|r| < 1" />, akkor <M t="r^n \to 0" />, ezért{' '}
          <M t="s_n \to \dfrac{a}{1 - r}" />!
        </p>

        <GeometricSeriesWidget />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={3} q={<>Számítsd ki az összegét: (a) <M t="\sum_{n=0}^\infty \dfrac{5}{3^n}" />, (b) <M t="\sum_{n=1}^\infty \left(-\dfrac{2}{5}\right)^n" />!</>}>
          <ul>
            <li>(a) Első tag <M t="a = 5" />, <M t="r = \tfrac{1}{3}" />: <M t="S = \dfrac{5}{1 - 1/3} = \dfrac{15}{2}" />.</li>
            <li>(b) Vigyázz, <M t="n=1" />-től indul! Első tag <M t="a = -\tfrac{2}{5}" />, <M t="r = -\tfrac{2}{5}" />: <M t="S = \dfrac{-2/5}{1 - (-2/5)} = -\dfrac{2}{7}" />!</li>
          </ul>
        </Task>
        <Task n={4} q={<>Milyen <M t="x" /> valós számokra konvergens a <M t="\sum_{n=0}^\infty (2x - 1)^n" /> mértani sor, és mi az összege?</>}>
          <p>
            <M t="|2x - 1| < 1 \Longleftrightarrow -1 < 2x - 1 < 1 \Longleftrightarrow 0 < x < 1" />. Ezen az intervallumon
            az összeg <M t="S(x) = \dfrac{1}{1 - (2x - 1)} = \dfrac{1}{2 - 2x}" />.
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 3. OLDAL */
  {
    title: 'Alkalmazások: pattogó labda és szakaszos tizedes törtek',
    body: (
      <>
        <p>
          A mértani sor két kedvenc hétköznapi alkalmazása a <strong>pattogó labda teljes útja</strong> és a{' '}
          <strong>végtelen szakaszos tizedes törtek</strong> átírása közönséges törtté!
        </p>

        <BouncingBallWidget />

        <h3>Kidolgozott példa — Szakaszos tizedes tört mértani sorként</h3>
        <p>Írjuk fel tört alakban a <M t="5{,}2\overline{36} = 5{,}2363636\ldots" /> számot!</p>
        <M block t="5{,}2\overline{36} = 5{,}2 + \frac{36}{1000} + \frac{36}{100\,000} + \cdots = \frac{52}{10} + \frac{36/1000}{1 - 1/100} = \frac{26}{5} + \frac{36}{990} = \frac{26}{5} + \frac{2}{55} = \frac{288}{55}." />

        <Quiz
          q={<>Egy labdát <M t="6\text{ m}" /> magasságból ejtünk le, és minden ütközés után az előző magasság felére (<M t="r = \tfrac{1}{2}" />) pattan vissza. Összesen hány métert tesz meg függőlegesen?</>}
          options={[
            { label: <M t="12\text{ m}" /> },
            { label: <M t="18\text{ m}" />, ok: true },
            { label: <M t="24\text{ m}" /> },
            { label: 'Végtelen sokat' },
          ]}
          explain={
            <>
              <M t="D = H\dfrac{1+r}{1-r} = 6\cdot\dfrac{1 + 0{,}5}{1 - 0{,}5} = 6\cdot 3 = 18\text{ m}" /> (6 m az első
              esés + 6 m felfelé összesen + 6 m lefelé a pattanásokból).
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={5} q={<>Írd fel közönséges törtként a <M t="0{,}\overline{45}" /> számot mértani sor segítségével!</>}>
          <p>
            <M t="\dfrac{45}{100} + \dfrac{45}{10\,000} + \cdots = \dfrac{45/100}{1 - 1/100} = \dfrac{45}{99} = \dfrac{5}{11}" />.
          </p>
        </Task>
        <Task n={6} q={<>Egy betegnek naponta <M t="100\text{ mg}" /> gyógyszert adnak, amelynek 24 óra alatt 60%-a kiürül (40% marad a szervezetben). Mekkora gyógyszermennyiséghez tart az adag közvetlenül az <M t="n" />-edik bevétel után?</>}>
          <p>
            Az <M t="n" />-edik adag után bent lévő mennyiség <M t="100 + 100(0{,}4) + 100(0{,}4)^2 + \cdots" />,
            amelynek határértéke <M t="\dfrac{100}{1 - 0{,}4} = \dfrac{100}{0{,}6} \approx 166{,}7\text{ mg}" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 4. OLDAL */
  {
    title: 'Teleszkopikus sorok',
    body: (
      <>
        <p>
          A másik sorcsalád, amelynek pontos összegét gyakran zárt alakban megkapjuk, a <strong>teleszkopikus sor</strong>:
          a parciális törtekre bontás vagy logaritmus-azonosság után a szomszédos tagok úgy csúsznak egymásba és ejtik
          ki egymást, mint egy összecsukható távcső!
        </p>

        <TelescopingSeriesWidget />

        <Steps
          title="Teleszkopikus sor összege parciális törtekkel"
          problem={
            <>
              Számítsuk ki a <M t="\sum_{n=1}^\infty \dfrac{1}{n(n + 2)}" /> sor pontos összegét!
            </>
          }
          steps={[
            {
              title: '1. Parciális törtekre bontás',
              body: (
                <>
                  <M block t="\frac{1}{n(n+2)} = \frac{1}{2}\left(\frac{1}{n} - \frac{1}{n+2}\right)." />
                </>
              ),
            },
            {
              title: '2. Az n-edik részletösszeg kiírása (figyeld a 2 lépéses eltolást!)',
              body: (
                <>
                  <M block t="s_n = \frac{1}{2}\left[\left(1 - \frac{1}{3}\right) + \left(\frac{1}{2} - \frac{1}{4}\right) + \left(\frac{1}{3} - \frac{1}{5}\right) + \cdots + \left(\frac{1}{n} - \frac{1}{n+2}\right)\right]." />
                  Minden középső tag kiejti egymást, csak az <strong>első kettő</strong> és az <strong>utolsó kettő</strong>{' '}
                  marad:
                  <M block t="s_n = \frac{1}{2}\left(1 + \frac{1}{2} - \frac{1}{n+1} - \frac{1}{n+2}\right)." />
                </>
              ),
            },
            {
              title: '3. Határérték n → ∞ esetén',
              body: (
                <>
                  Mivel <M t="\tfrac{1}{n+1} \to 0" /> és <M t="\tfrac{1}{n+2} \to 0" />, a pontos összeg:{' '}
                  <M t="S = \dfrac{1}{2}\left(1 + \dfrac{1}{2}\right) = \dfrac{3}{4}" />!
                </>
              ),
            },
          ]}
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={7} q={<>Számítsd ki: <M t="\sum_{n=1}^\infty \left(\dfrac{1}{\sqrt{n}} - \dfrac{1}{\sqrt{n+1}}\right)" />!</>}>
          <p>
            <M t="s_n = 1 - \dfrac{1}{\sqrt{n+1}} \longrightarrow 1" />.
          </p>
        </Task>
        <Task n={8} q={<>Konvergens-e a <M t="\sum_{n=1}^\infty \ln\left(\dfrac{n+1}{n}\right)" /> teleszkopikus sor?</>}>
          <p>
            <M t="\ln\left(\tfrac{n+1}{n}\right) = \ln(n+1) - \ln n" />, így{' '}
            <M t="s_n = (\ln 2 - \ln 1) + (\ln 3 - \ln 2) + \cdots + (\ln(n+1) - \ln n) = \ln(n+1) \longrightarrow +\infty" />!
            Tehát <strong>divergens</strong> (pedig a tagok <M t="\ln(1 + 1/n) \to 0" />-hoz tartanak!).
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 5. OLDAL */
  {
    title: 'Az n-edik tag divergenciatesztje és a harmonikus sor',
    body: (
      <>
        <Def title="Az n-edik tag tesztje (7. tétel és divergenciateszt)">
          <p>
            Ha a <M t="\sum_{n=1}^\infty a_n" /> sor <strong>konvergens</strong>, akkor szükségképpen{' '}
            <M t="\lim_{n\to\infty} a_n = 0" />.
          </p>
          <p>
            <strong>Divergenciateszt (megfordított tagadás):</strong> ha <M t="\lim_{n\to\infty} a_n \neq 0" /> vagy a
            határérték nem létezik, akkor a <M t="\sum_{n=1}^\infty a_n" /> sor biztosan <strong>divergens</strong>!
          </p>
        </Def>

        <p>
          <em>Bizonyítás (3 sor!):</em> ha <M t="s_n \to S" />, akkor <M t="s_{n-1} \to S" /> is igaz, ezért{' '}
          <M t="a_n = s_n - s_{n-1} \to S - S = 0" />.
        </p>

        <DivergenceTestWidget />

        <p>
          <strong>De vigyázz:</strong> a megfordítás <strong>HAMIS</strong>! Attól, hogy <M t="a_n \to 0" />, a sor még
          lehet divergens! Ennek a leghíresebb példája a <strong>harmonikus sor</strong>:
        </p>
        <M block t="\sum_{n=1}^\infty \frac{1}{n} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots = +\infty!" />

        <HarmonicGroupingDiagram />

        <Quiz
          q={<>Mit mond az <M t="n" />-edik tag tesztje a <M t="\sum_{n=1}^\infty \dfrac{1}{\sqrt{n}}" /> sorról?</>}
          options={[
            { label: <>Konvergens, mert <M t="1/\sqrt{n} \to 0" />.</> },
            { label: <>Divergens, mert <M t="1/\sqrt{n} \to 0" />.</> },
            { label: <>A teszt nem dönt (<M t="a_n \to 0" />), más módszer kell (valójában divergens).</>, ok: true },
            { label: <>Mértani sor, összege 2.</> },
          ]}
          explain={
            <>
              Mivel <M t="\lim_{n\to\infty} \tfrac{1}{\sqrt{n}} = 0" />, a divergenciateszt <em>nem ad választ</em>.
              (Mivel <M t="\tfrac{1}{\sqrt{n}} \ge \tfrac{1}{n}" />, a harmonikus sorhoz hasonlítva valójában divergens!)
            </>
          }
        />

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={9} q={<>Mutasd meg az <M t="n" />-edik tag teszttel, hogy <M t="\sum_{n=1}^\infty \dfrac{n^2}{3n^2 + 1}" /> és <M t="\sum_{n=1}^\infty \cos\left(\dfrac{1}{n}\right)" /> is divergens!</>}>
          <ul>
            <li><M t="\lim_{n\to\infty}\dfrac{n^2}{3n^2+1} = \dfrac{1}{3} \neq 0 \Rightarrow" /> divergens.</li>
            <li><M t="\lim_{n\to\infty}\cos\left(\dfrac{1}{n}\right) = \cos 0 = 1 \neq 0 \Rightarrow" /> divergens!</li>
          </ul>
        </Task>
        <Task n={10} q={<>Miért divergens a <M t="\sum_{n=1}^\infty \dfrac{1}{2n}" /> sor?</>}>
          <p>
            Mert a harmonikus sor konstansszorosa: <M t="\sum \dfrac{1}{2n} = \dfrac{1}{2}\sum \dfrac{1}{n} = \infty" />!
          </p>
        </Task>
      </>
    ),
  },

  /* ============================================================== 6. OLDAL */
  {
    title: 'Sorok kombinálása, tagok elhagyása és átindexelés',
    body: (
      <>
        <Def title="Konvergens sorok algebrai szabályai (8. tétel)">
          <p>Ha <M t="\sum a_n = A" /> és <M t="\sum b_n = B" /> mindkettő konvergens, és <M t="c \in \mathbb{R}" />, akkor:</p>
          <ul>
            <li><M t="\sum (a_n \pm b_n) = A \pm B" />;</li>
            <li><M t="\sum (c \cdot a_n) = c A" />.</li>
          </ul>
          <p>
            Továbbá: (1) egy <strong>divergens</strong> sor nem nulla konstansszorosa is divergens; (2) egy konvergens
            és egy divergens sor összege mindig <strong>divergens</strong>; (3) <strong>véges sok tag</strong>{' '}
            hozzáadása vagy elhagyása <em>nem változtatja meg a konvergenciát</em> (csak az összeg értékét!).
          </p>
        </Def>

        <h3>1. példa — Két mértani sor összege</h3>
        <M block t="\sum_{n=0}^\infty \frac{2^n + 3^n}{6^n} = \sum_{n=0}^\infty \left(\frac{1}{3}\right)^n + \sum_{n=0}^\infty \left(\frac{1}{2}\right)^n = \frac{1}{1 - 1/3} + \frac{1}{1 - 1/2} = \frac{3}{2} + 2 = \frac{7}{2}." />

        <h3>2. példa — Átindexelés</h3>
        <p>
          A <M t="\sum_{n=2}^\infty \dfrac{3}{4^n}" /> sort a <M t="k = n - 2" /> (<M t="n = k + 2" />) cserével{' '}
          <M t="0" />-tól induló alakra hozhatjuk:
        </p>
        <M block t="\sum_{n=2}^\infty \frac{3}{4^n} = \sum_{k=0}^\infty \frac{3}{4^{k+2}} = \sum_{k=0}^\infty \frac{3}{16}\left(\frac{1}{4}\right)^k = \frac{3/16}{1 - 1/4} = \frac{1}{4}." />
        <p>
          (Vagy egyszerűen az „első tag / <M t="(1 - r)" />” szabályból: az első tag <M t="n=2" />-nél{' '}
          <M t="\tfrac{3}{16}" />, így <M t="\dfrac{3/16}{3/4} = \dfrac{1}{4}" />!)
        </p>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={11} q={<>Számítsd ki: <M t="\sum_{n=1}^\infty \dfrac{3^n - 2^n}{5^n}" />!</>}>
          <p>
            Két konvergens mértani sor különbsége (<M t="n=1" />-től!):
            <M block t="\sum_{n=1}^\infty \left(\frac{3}{5}\right)^n - \sum_{n=1}^\infty \left(\frac{2}{5}\right)^n = \frac{3/5}{1 - 3/5} - \frac{2/5}{1 - 2/5} = \frac{3}{2} - \frac{2}{3} = \frac{5}{6}." />
          </p>
        </Task>
        <Task n={12} q={<>Konvergens-e a <M t="\sum_{n=1}^\infty \left(\dfrac{1}{2^n} + \dfrac{1}{n}\right)" /> sor?</>}>
          <p>
            <strong>Divergens!</strong> Mert egy konvergens (<M t="\sum \tfrac{1}{2^n} = 1" />) és egy divergens (
            <M t="\sum \tfrac{1}{n}" />) sor összege mindig divergens.
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
        <SeriesToolboxDiagram />

        <h3>Összefoglaló táblázat</h3>
        <table className="tbl">
          <thead>
            <tr><th>Sor / Tétel</th><th>Feltétel</th><th>Eredmény</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Mértani sor</strong> <M t="\sum a r^n" /></td>
              <td><M t="|r| < 1" /> (különben div.)</td>
              <td><M t="S = \dfrac{\text{első tag}}{1 - r}" /></td>
            </tr>
            <tr>
              <td><strong>Teleszkopikus sor</strong></td>
              <td><M t="s_n = b_1 - b_{n+1}" /></td>
              <td><M t="S = b_1 - \lim b_{n+1}" /></td>
            </tr>
            <tr>
              <td><strong><M t="n" />-edik tag teszt</strong></td>
              <td><M t="\lim a_n \neq 0" /></td>
              <td>Biztosan <strong>divergens</strong></td>
            </tr>
            <tr>
              <td><strong>Harmonikus sor</strong> <M t="\sum 1/n" /></td>
              <td><M t="a_n \to 0" />, mégis…</td>
              <td><strong>Divergens</strong> (<M t="+\infty" />)</td>
            </tr>
          </tbody>
        </table>

        <h3>Négy tipikus hiba, amit érdemes elkerülni</h3>
        <Warn>
          <strong>1. A legnagyobb tévhit: „<M t="a_n \to 0" />, tehát konvergens!”</strong> NEM! A{' '}
          <M t="\lim a_n = 0" /> csak <em>szükséges</em> feltétel, nem elégséges — lásd a harmonikus sort (<M t="\sum 1/n" />).
        </Warn>
        <Warn>
          <strong>2. Rossz kezdőtag a mértani sornál:</strong> a <M t="\sum_{n=1}^\infty \left(\tfrac{1}{2}\right)^n" />{' '}
          összege <em>nem</em> <M t="\dfrac{1}{1 - 1/2} = 2" />, hanem <M t="\dfrac{1/2}{1 - 1/2} = 1" />, mert{' '}
          <M t="n=1" />-től indul!
        </Warn>
        <Warn>
          <strong>3. Divergens tagok szétbontása:</strong> a <M t="\sum_{n=1}^\infty \left(\tfrac{1}{n} - \tfrac{1}{n+1}\right)" />{' '}
          konvergens (összege 1), de <em>tilos</em> <M t="\sum \tfrac{1}{n} - \sum \tfrac{1}{n+1} = \infty - \infty" />{' '}
          alakban szétszedni! A 8. tétel csak akkor engedi szétválasztani, ha mindkét részsor külön-külön konvergens.
        </Warn>
        <Warn>
          <strong>4. A tagok (<M t="a_n" />) és a részletösszegek (<M t="s_n" />) összekeverése:</strong> egy sorozat
          határértéke <M t="\lim a_n" />, egy sor összege viszont <M t="\lim s_n" />!
        </Warn>

        <h3>Gyors ellenőrző feladatok</h3>
        <Task n={13} q={<>Lehet-e két <em>divergens</em> sor összege konvergens? Adj példát!</>}>
          <p>
            <strong>Igen!</strong> Például <M t="\sum \dfrac{1}{n}" /> és <M t="\sum \left(-\dfrac{1}{n}\right)" />{' '}
            mindkettő divergens, de összegük <M t="\sum 0 = 0" /> (vagy <M t="\sum \left(\tfrac{1}{n} - \tfrac{1}{n+1}\right) = 1" />)!
          </p>
        </Task>
        <Task n={14} q={<>Mennyi a <M t="\sum_{n=3}^\infty \dfrac{1}{2^n}" /> sor összege?</>}>
          <p>
            Első tag <M t="n=3" />-nál <M t="\dfrac{1}{8}" />, hányados <M t="r = \dfrac{1}{2}" />:{' '}
            <M t="S = \dfrac{1/8}{1 - 1/2} = \dfrac{1}{4}" />.
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

        <Task n={15} q={<>Számítsd ki: (a) <M t="\sum_{n=0}^\infty \dfrac{3}{5^n}" />, (b) <M t="\sum_{n=1}^\infty \dfrac{(-1)^n \cdot 2^n}{3^{n+1}}" />!</>}>
          <ul>
            <li>(a) <M t="a = 3,\ r = \tfrac{1}{5} \Rightarrow S = \dfrac{3}{4/5} = \dfrac{15}{4}" />.</li>
            <li>(b) Első tag (<M t="n=1" />): <M t="a = -\tfrac{2}{9}" />, hányados <M t="r = -\tfrac{2}{3}" />: <M t="S = \dfrac{-2/9}{1 + 2/3} = -\dfrac{2}{15}" />.</li>
          </ul>
        </Task>

        <Task n={16} q={<>Döntsd el, konvergens-e: (a) <M t="\sum_{n=1}^\infty \dfrac{2n - 1}{3n + 4}" />, (b) <M t="\sum_{n=1}^\infty \left(\dfrac{e}{\pi}\right)^n" />!</>}>
          <ul>
            <li>(a) <M t="\lim a_n = \tfrac{2}{3} \neq 0 \Rightarrow" /> <strong>divergens</strong>.</li>
            <li>(b) Mértani sor <M t="r = \tfrac{e}{\pi} \approx 0{,}865 < 1 \Rightarrow" /> <strong>konvergens</strong>, összege <M t="\dfrac{e/\pi}{1 - e/\pi} = \dfrac{e}{\pi - e}" />.</li>
          </ul>
        </Task>

        <Task n={17} q={<>Írd fel közönséges törtként a <M t="1{,}\overline{27}" /> számot!</>}>
          <p>
            <M t="1 + \dfrac{27/100}{1 - 1/100} = 1 + \dfrac{27}{99} = 1 + \dfrac{3}{11} = \dfrac{14}{11}" />.
          </p>
        </Task>

        <h3>Közepes</h3>

        <Task n={18} q={<>Számítsd ki a teleszkopikus összeget: <M t="\sum_{n=1}^\infty \dfrac{2}{(2n - 1)(2n + 1)}" />!</>}>
          <p>
            Parciális törtekkel <M t="\dfrac{2}{(2n-1)(2n+1)} = \dfrac{1}{2n-1} - \dfrac{1}{2n+1}" />. Az{' '}
            <M t="n" />-edik részletösszeg <M t="s_n = 1 - \dfrac{1}{2n+1} \longrightarrow 1" />!
          </p>
        </Task>

        <Task n={19} q={<>Milyen <M t="x" /> valós értékekre konvergens a <M t="\sum_{n=0}^\infty \left(\dfrac{x - 2}{3}\right)^n" /> sor, és mi az összege?</>}>
          <p>
            <M t="\left|\dfrac{x - 2}{3}\right| < 1 \Longleftrightarrow -3 < x - 2 < 3 \Longleftrightarrow -1 < x < 5" />.
            Összege: <M t="S(x) = \dfrac{1}{1 - \tfrac{x-2}{3}} = \dfrac{3}{5 - x}" />.
          </p>
        </Task>

        <Task n={20} q={<>Számítsd ki: <M t="\sum_{n=1}^\infty \left(\dfrac{1}{3^n} + \dfrac{1}{n(n+1)}\right)" />!</>}>
          <p>
            Mindkét részsor konvergens: <M t="\sum_{n=1}^\infty \tfrac{1}{3^n} = \dfrac{1/3}{2/3} = \dfrac{1}{2}" /> és{' '}
            <M t="\sum_{n=1}^\infty \tfrac{1}{n(n+1)} = 1" />. Az összeg <M t="\dfrac{1}{2} + 1 = \dfrac{3}{2}" />!
          </p>
        </Task>

        <h3>Nehéz</h3>

        <Task
          n={21}
          q={
            <>
              Számítsd ki a <M t="\sum_{n=2}^\infty \ln\left(1 - \dfrac{1}{n^2}\right)" /> teleszkopikus sor pontos
              összegét!
            </>
          }
        >
          <p>
            Alakítsuk szorzattá a belsejét: <M t="1 - \dfrac{1}{n^2} = \dfrac{(n-1)(n+1)}{n^2}" />. A logaritmusok
            összege a szorzat logaritmusa:
            <M block t="s_N = \ln\left(\frac{1\cdot 3}{2\cdot 2}\cdot\frac{2\cdot 4}{3\cdot 3}\cdot\frac{3\cdot 5}{4\cdot 4}\cdots\frac{(N-1)(N+1)}{N\cdot N}\right) = \ln\left(\frac{1}{2}\cdot\frac{N+1}{N}\right)." />
            Határértéket véve <M t="N \to \infty" />: <M t="S = \ln\left(\dfrac{1}{2}\right) = -\ln 2" />!
          </p>
        </Task>

        <Task
          n={22}
          q={
            <>
              Számítsd ki a <M t="\sum_{n=1}^\infty \dfrac{1}{n(n+1)(n+2)}" /> sor pontos összegét!
            </>
          }
        >
          <p>
            Vegyük észre, hogy <M t="\dfrac{1}{n(n+1)(n+2)} = \dfrac{1}{2}\left(\dfrac{1}{n(n+1)} - \dfrac{1}{(n+1)(n+2)}\right)" />!
            Ez tisztán teleszkopikus:
            <M block t="s_N = \frac{1}{2}\left(\frac{1}{1\cdot 2} - \frac{1}{(N+1)(N+2)}\right) \longrightarrow \frac{1}{4}!" />
          </p>
        </Task>

        <Task
          n={23}
          q={
            <>
              Bizonyítsd be, hogy ha <M t="\sum_{n=1}^\infty a_n" /> pozitív tagú sor konvergens, akkor{' '}
              <M t="\sum_{n=1}^\infty a_n^2" /> is konvergens!
            </>
          }
        >
          <p>
            Mivel <M t="\sum a_n" /> konvergens, az <M t="n" />-edik tag teszt miatt <M t="a_n \to 0" />. Tehát létezik
            olyan <M t="N" />, hogy minden <M t="n \ge N" />-re <M t="0 < a_n < 1" />. Ekkor <M t="0 < a_n^2 < a_n" />,
            így az <M t="s'_k = \sum_{n=N}^k a_n^2" /> részletösszegek monoton nőnek és felülről korlátosak{' '}
            <M t="\sum_{n=N}^\infty a_n" />-nel — Weierstrass tétele szerint tehát <M t="\sum a_n^2" /> konvergens!
          </p>
        </Task>

        <h3>Kiegészítő gyorsteszt</h3>
        <Quiz
          source="Analízis-labor"
          q={
            <>
              Mennyi a <M t="\sum_{n=0}^\infty 3\left(-\dfrac{1}{2}\right)^n" /> mértani sor összege?
            </>
          }
          options={[
            { label: <M t="2" />, ok: true },
            { label: <M t="6" /> },
            { label: <M t="1{,}5" /> },
            { label: 'Divergens' },
          ]}
          explain={
            <>
              Első tag <M t="a = 3" />, hányados <M t="r = -\dfrac{1}{2}" />, így{' '}
              <M t="S = \dfrac{3}{1 - (-1/2)} = \dfrac{3}{3/2} = 2" />.
            </>
          }
        />
      </>
    ),
  },
];
