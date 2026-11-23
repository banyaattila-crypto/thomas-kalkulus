import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  ExactAreaLimitWidget,
  GaussSumWidget,
  NormTrapWidget,
  RiemannSignedWidget,
  SigmaAnatomyDiagram,
} from '../components/Widgets52';
import type { Page } from './s1_1';

export const S5_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'A szumma jel (Σ) és az indexeltolás',
    body: (
      <>
        <Story>
          <p>
            Az 5.1-es szakaszban láttuk, hogy minél több téglalappal közelítünk, annál pontosabb a terület — akár 1000 vagy egymillió téglalapra is szükség lehet. Nyilván nem írhatunk ki egymillió tagot egyesével! Ezért használjuk a görög nagy szigma (<M t="\Sigma" />) jelet, amely egyetlen elegáns sorba sűríti a legbonyolultabb összegeket is.
          </p>
        </Story>
        <Def title="A szumma jelölés">
          <M block t="\sum_{k=m}^{n} a_k = a_m + a_{m+1} + a_{m+2} + \dots + a_n \qquad (m\le n\text{ egészek})." />
          <p>
            A <M t="k" /> a <strong>futó (szummációs) index</strong>: végiglépked az <M t="m" /> alsó határtól az <M t="n" /> felső határig. Az összeg pontosan <strong><M t="n - m + 1" /></strong> tagból áll!
          </p>
        </Def>
        <SigmaAnatomyDiagram />
        <h3>Ugyanaz az összeg többféle kezdőindexszel</h3>
        <p>
          Az index neve tetszőleges (<M t="i, j, k" />), és a kezdőértéknek sem kötelező 1-nek lennie! Nézd meg az <M t="1+3+5+7+9" /> összeget három különböző írásmóddal:
        </p>
        <M block t="\sum_{k=0}^{4}(2k+1) \;=\; \sum_{k=1}^{5}(2k-1) \;=\; \sum_{k=2}^{6}(2k-3) \;=\; 25." />
        <p>
          Ha az alsó és felső határt 1-gyel <em>növeled</em>, a képletben a <M t="k" /> helyére <M t="(k-1)" />-et kell írnod (ezt hívjuk <strong>indexeltolásnak</strong>).
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Írd ki tagonként és számítsd ki: (a) <M t="\sum_{k=1}^{4}(-1)^k k" />, (b) <M t="\sum_{k=4}^{5}\dfrac{k^2}{k-1}" />!
            </>
          }
        >
          <p>
            (a) <M t="-1+2-3+4=2" />. (b) <M t="\dfrac{16}{3}+\dfrac{25}{4}=\dfrac{64+75}{12}=\dfrac{139}{12}" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Írd fel szumma jellel az <M t="\dfrac{1}{2}+\dfrac{1}{4}+\dfrac{1}{8}+\dfrac{1}{16}" /> összeget (a) <M t="k=1" />-től, (b) <M t="k=0" />-tól indulva!
            </>
          }
        >
          <p>
            (a) <M t="\sum_{k=1}^{4}\dfrac{1}{2^k}" />. (b) <M t="\sum_{k=0}^{3}\dfrac{1}{2^{k+1}}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Algebrai szabályok és a 3 híres összegképlet',
    body: (
      <>
        <p>
          A szumma jelöléssel ugyanúgy számolhatunk, mint a hagyományos összegekkel — négy egyszerű szabályt érdemes magabiztosan használni:
        </p>
        <Def title="Véges összegek algebrai szabályai">
          <ol>
            <li><strong>Összeg / különbség:</strong> <M t="\sum_{k=1}^{n}(a_k \pm b_k) = \sum_{k=1}^{n} a_k \pm \sum_{k=1}^{n} b_k" />.</li>
            <li><strong>Konstans kiemelése:</strong> <M t="\sum_{k=1}^{n} c\cdot a_k = c\sum_{k=1}^{n} a_k" /> (minden <M t="k" />-tól <em>független</em> tényező — például <M t="1/n" /> is! — kiemelhető).</li>
            <li><strong>Állandó összegzése:</strong> <M t="\sum_{k=1}^{n} c = n\cdot c" /> (pl. <M t="\sum_{k=1}^{n}\frac{1}{n} = n\cdot\frac{1}{n} = 1" />).</li>
          </ol>
        </Def>
        <h3>A három nagy hatványösszeg-képlet</h3>
        <p>
          Carl Friedrich Gauss már 8 évesen pillanatok alatt összeadta a számokat 1-től 100-ig azzal, hogy párokba rendezte őket (<M t="1+100=101,\; 2+99=101,\dots" />). A négyzetek és köbök összegére is létezik zárt képlet (teljes indukcióval bizonyíthatók):
        </p>
        <Def title="Az első n szám, négyzetszám és köbszám összege">
          <M block t="\sum_{k=1}^{n} k = \frac{n(n+1)}{2}, \qquad \sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}, \qquad \sum_{k=1}^{n} k^3 = \left(\frac{n(n+1)}{2}\right)^2." />
        </Def>
        <GaussSumWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Számítsd ki a képletekkel: <M t="\sum_{k=1}^{10}(3k - 2)" />!
            </>
          }
        >
          <p>
            <M t="3\sum_{k=1}^{10} k - \sum_{k=1}^{10} 2 = 3\cdot\dfrac{10\cdot 11}{2} - 10\cdot 2 = 165 - 20 = 145" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Mennyi <M t="\sum_{k=1}^{6}(k^2 + k)" />?
            </>
          }
        >
          <p>
            <M t="\dfrac{6\cdot 7\cdot 13}{6} + \dfrac{6\cdot 7}{2} = 91 + 21 = 112" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'Véges összegek határértéke: pontos terület számítása!',
    body: (
      <>
        <p>
          Most végre beváltjuk az 5.1-es szakasz ígéretét: <strong>pontosan kiszámítjuk</strong> az <M t="y=1-x^2" /> görbe alatti területet a <M t="[0;\,1]" /> intervallumon!
        </p>
        <ol>
          <li>
            <strong>Felosztás:</strong> <M t="n" /> egyenlő sáv, szélesség <M t="\Delta x = \dfrac{1}{n}" />, jobb végpontok <M t="x_k = \dfrac{k}{n}" />.
          </li>
          <li>
            <strong>Téglalapok összege szummával:</strong>
            <M block t="S_n = \sum_{k=1}^{n} f\!\left(\frac{k}{n}\right)\frac{1}{n} = \sum_{k=1}^{n}\left(1-\frac{k^2}{n^2}\right)\frac{1}{n} = \sum_{k=1}^{n}\frac{1}{n} - \frac{1}{n^3}\sum_{k=1}^{n} k^2." />
          </li>
          <li>
            <strong>Zárt képlet behelyettesítése:</strong>
            <M block t="S_n = n\cdot\frac{1}{n} - \frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} = 1 - \frac{2n^3+3n^2+n}{6n^3}." />
          </li>
          <li>
            <strong>Határérték (<M t="n\to\infty" />):</strong> a 2.4-es szakasz szerint csak a főegyütthatók aránya számít!
            <M block t="\lim_{n\to\infty} S_n = 1 - \frac{2}{6} = \frac{2}{3}." />
          </li>
        </ol>
        <ExactAreaLimitWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Számítsd ki pontosan az <M t="y=x^2" /> görbe alatti területet a <M t="[0;\,1]" /> intervallumon jobb oldali összegek határértékével!
            </>
          }
        >
          <p>
            <M t="\Delta x=\frac{1}{n},\; x_k=\frac{k}{n} \Rightarrow S_n=\sum_{k=1}^n\left(\frac{k}{n}\right)^2\frac{1}{n}=\frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6}=\frac{2n^3+3n^2+n}{6n^3}\xrightarrow{n\to\infty}\dfrac{1}{3}" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Igazold véges összegek határértékével, hogy az <M t="y=2x" /> egyenes alatti háromszög területe <M t="[0;\,3]" />-on pontosan <M t="9" />!
            </>
          }
        >
          <p>
            <M t="\Delta x=\frac{3}{n},\; x_k=\frac{3k}{n} \Rightarrow S_n=\sum_{k=1}^n 2\cdot\frac{3k}{n}\cdot\frac{3}{n}=\frac{18}{n^2}\cdot\frac{n(n+1)}{2}=9\left(1+\frac{1}{n}\right)\xrightarrow{n\to\infty} 9" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Általános felosztás, norma és Riemann-összeg',
    body: (
      <>
        <p>
          Bernhard Riemann német matematikus a 19. században általánosította a téglalap-összegeket két fontos irányban: (1) a függvény vehet fel <strong>negatív értékeket is</strong>, (2) a részintervallumok <strong>nem feltétlenül egyenlő hosszúak</strong>, és a mintapont (<M t="c_k" />) bárhol lehet a sávon belül!
        </p>
        <Def title="Felosztás, norma és Riemann-összeg">
          <p>
            Az <M t="[a;\,b]" /> intervallum egy <strong>felosztása</strong> <M t="P=\{x_0, x_1, \dots, x_n\}" />, ahol <M t="a=x_0<x_1<\dots<x_n=b" />. A <M t="k" />-adik sáv hossza <M t="\Delta x_k = x_k - x_{k-1}" />.
          </p>
          <ul>
            <li>
              A felosztás <strong>normája</strong> a <em>leghosszabb</em> részintervallum hossza: <M t="\|P\| = \max\{\Delta x_1, \dots, \Delta x_n\}" />.
            </li>
            <li>
              Ha minden <M t="[x_{k-1};\,x_k]" /> sávból választunk egy <M t="c_k" /> mintapontot, az
              <M block t="S_P = \sum_{k=1}^{n} f(c_k)\,\Delta x_k" />
              összeget <strong>Riemann-összegnek</strong> (integrálközelítő összegnek) nevezzük.
            </li>
          </ul>
        </Def>
        <p>
          <strong>Figyelj az előjelre!</strong> Ha <M t="f(c_k)>0" />, a téglalap az <M t="x" />-tengely fölött áll, és <em>pozitív</em> tagot ad. Ha <M t="f(c_k)<0" />, a téglalap az <M t="x" />-tengely alatt van, és <strong>negatív</strong> tagot ad! A Riemann-összeg tehát <em>előjeles (nettó) területet</em> közelít.
        </p>
        <RiemannSignedWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Add meg a <M t="P=\{0;\; 0{,}2;\; 0{,}6;\; 1;\; 1{,}5;\; 2\}" /> felosztás részintervallumainak hosszát és a <M t="\|P\|" /> normáját!
            </>
          }
        >
          <p>
            Hosszak: <M t="0{,}2;\; 0{,}4;\; 0{,}4;\; 0{,}5;\; 0{,}5" />. A legnagyobb hossz <M t="\|P\|=0{,}5" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Számítsd ki az <M t="f(x)=x-2" /> függvény Riemann-összegét a <M t="[0;\,3]" /> intervallumon a <M t="P=\{0;\,1;\,3\}" /> felosztással, ha a mintapontok a részintervallumok felezőpontjai!
            </>
          }
        >
          <p>
            1. sáv <M t="[0;\,1]" />: <M t="\Delta x_1=1,\; c_1=0{,}5,\; f(0{,}5)=-1{,}5" />. 2. sáv <M t="[1;\,3]" />: <M t="\Delta x_2=2,\; c_2=2,\; f(2)=0" />.
          </p>
          <p>
            <M t="S_P = (-1{,}5)\cdot 1 + 0\cdot 2 = -1{,}5" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Miért ||P|| → 0 a pontos feltétel (és nem elég n → ∞)?',
    body: (
      <>
        <p>
          Egyenletes felosztásnál (<M t="\Delta x=(b-a)/n" />) az <M t="n\to\infty" /> és a <M t="\Delta x\to 0" /> ugyanazt jelenti. Általános (egyenetlen) felosztásnál azonban <strong>vigyázni kell</strong>!
        </p>
        <p>
          Képzeld el, hogy a <M t="[0;\,2]" /> intervallum bal felét (<M t="[0;\,1]" />) 1000 apró darabra vágod, de a jobb felét (<M t="[1;\,2]" />) meghagyod egyetlen óriási sávnak! Hiába tart <M t="n\to\infty" />, a jobb oldali óriási téglalap hibája sohasem csökken!
        </p>
        <NormTrapWidget />
        <p>
          Ha viszont előírjuk, hogy a <strong>norma tartson nullához (<M t="\|P\|\to 0" />)</strong>, az azt jelenti, hogy még a <em>legnagyobb</em> sáv szélessége is nullához tart — tehát <em>minden egyes</em> sáv egyszerre zsugorodik össze! A következő (5.3-as) szakaszban látni fogjuk, hogy folytonos függvényeknél ekkor minden Riemann-összeg ugyanazon egyetlen számhoz — a <strong>határozott integrálhoz</strong> — konvergál.
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Igaz-e, hogy ha <M t="\|P\|\to 0" />, akkor a részintervallumok <M t="n" /> száma biztosan <M t="\infty" />-hez tart?
            </>
          }
        >
          <p>
            <strong>Igen!</strong> Mivel <M t="b-a = \sum \Delta x_k \le n\cdot\|P\|" />, ezért <M t="n \ge \dfrac{b-a}{\|P\|} \to \infty" />. (Fordítva viszont nem igaz!)
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Egy <M t="[2;\,10]" /> intervallum egyenletes felosztásához legalább hány részintervallum kell, hogy <M t="\|P\|\le 0{,}04" /> legyen?
            </>
          }
        >
          <p>
            <M t="\dfrac{10-2}{n}\le 0{,}04 \iff n\ge \dfrac{8}{0{,}04}=200" /> részintervallum.
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
              <th>fogalom / képlet</th>
              <th>kifejezés</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Szumma lineáris szabályai</td>
              <td><M t="\sum(a_k\pm b_k)=\sum a_k\pm\sum b_k,\quad \sum c a_k = c\sum a_k" /></td>
            </tr>
            <tr>
              <td>Első <M t="n" /> szám összege</td>
              <td><M t="\sum_{k=1}^n k = \dfrac{n(n+1)}{2}" /></td>
            </tr>
            <tr>
              <td>Első <M t="n" /> négyzetszám</td>
              <td><M t="\sum_{k=1}^n k^2 = \dfrac{n(n+1)(2n+1)}{6}" /></td>
            </tr>
            <tr>
              <td>Első <M t="n" /> köbszám</td>
              <td><M t="\sum_{k=1}^n k^3 = \left(\dfrac{n(n+1)}{2}\right)^2" /></td>
            </tr>
            <tr>
              <td>Riemann-összeg és norma</td>
              <td><M t="S_P=\sum_{k=1}^n f(c_k)\Delta x_k,\quad \|P\|=\max_k \Delta x_k" /></td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba</h3>
        <Warn>
          <p>
            <strong>1. A tagok számának elnézése:</strong> <M t="\sum_{k=0}^{n} c = (n+1)c" />, NEM <M t="nc" />! (Mindig <M t="\text{felső} - \text{alsó} + 1" /> tag van!)
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. A futó index kiemelése:</strong> a <M t="k" /> változót SOHA nem emelheted ki a <M t="\sum_{k=1}^n" /> elé! Csak azt, amiben nincs <M t="k" /> (pl. <M t="1/n" /> vagy <M t="3" />).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. A <M t="\sum k^2" /> és <M t="\sum k^3" /> összekeverése:</strong> a <M t="\left(\frac{n(n+1)}{2}\right)^2" /> képlet a <em>köbök</em> összege, nem a négyzeteké!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Negatív függvényértékek előjele:</strong> a Riemann-összegben az <M t="x" />-tengely alatti téglalapok <em>negatív</em> előjellel számítanak!
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
              Számítsd ki: (a) <M t="\sum_{k=1}^{4}\cos(k\pi)" />, (b) <M t="\sum_{k=-2}^{2} k^2" />!
            </>
          }
        >
          <p>
            (a) <M t="-1+1-1+1=0" />. (b) <M t="4+1+0+1+4=10" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Írd fel szumma jellel: <M t="2+4+6+8+10+12" />!
            </>
          }
        >
          <p>
            <M t="\sum_{k=1}^{6} 2k" /> (vagy <M t="\sum_{k=0}^{5}(2k+2)" />).
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Számítsd ki a képlettel: <M t="\sum_{k=1}^{100} k" /> és <M t="\sum_{k=1}^{10} k^3" />!
            </>
          }
        >
          <p>
            <M t="\dfrac{100\cdot 101}{2}=5050" />, illetve <M t="\left(\dfrac{10\cdot 11}{2}\right)^2=55^2=3025" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Számítsd ki: <M t="\sum_{k=1}^{20}(3k^2 - 2k + 1)" />!
            </>
          }
        >
          <p>
            <M t="3\cdot\dfrac{20\cdot 21\cdot 41}{6} - 2\cdot\dfrac{20\cdot 21}{2} + 20\cdot 1 = 3\cdot 2870 - 420 + 20 = 8610 - 400 = 8210" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki a <M t="\sum_{k=5}^{15} k" /> összeget (nem 1-től indul!) a Gauss-képlet segítségével!
            </>
          }
        >
          <p>
            <M t="\sum_{k=1}^{15} k - \sum_{k=1}^{4} k = \dfrac{15\cdot 16}{2} - \dfrac{4\cdot 5}{2} = 120 - 10 = 110" />.
          </p>
        </Task>
        <Task
          n={16}
          q={
            <>
              Számítsd ki az <M t="f(x)=x^2-4" /> függvény Riemann-összegét a <M t="[0;\,3]" /> intervallumon a <M t="P=\{0;\,1;\,2;\,3\}" /> felosztással és a jobb végpontokkal!
            </>
          }
        >
          <p>
            <M t="\Delta x_k=1" />, jobb végpontok <M t="1, 2, 3" />: <M t="f(1)=-3,\; f(2)=0,\; f(3)=5" />.
          </p>
          <p>
            <M t="S_P = (-3)\cdot 1 + 0\cdot 1 + 5\cdot 1 = 2" />.
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={17}
          q={
            <>
              Határozd meg pontosan az <M t="f(x)=x^2" /> görbe alatti területet a <M t="[0;\,2]" /> intervallumon jobb oldali Riemann-összegek határértékével!
            </>
          }
        >
          <p>
            <M t="\Delta x=\frac{2}{n},\; x_k=\frac{2k}{n}" />. Így:
          </p>
          <M block t="S_n=\sum_{k=1}^n\left(\frac{2k}{n}\right)^2\frac{2}{n}=\frac{8}{n^3}\cdot\frac{n(n+1)(2n+1)}{6}=\frac{4(2n^2+3n+1)}{3n^2}\xrightarrow{n\to\infty}\frac{8}{3}." />
        </Task>
        <Task
          n={18}
          q={
            <>
              Határozd meg az <M t="f(x)=x^3" /> görbe alatti pontos területet a <M t="[0;\,1]" /> intervallumon véges összegek határértékével!
            </>
          }
        >
          <p>
            <M t="S_n=\sum_{k=1}^n\left(\frac{k}{n}\right)^3\frac{1}{n}=\frac{1}{n^4}\cdot\frac{n^2(n+1)^2}{4}=\frac{(n+1)^2}{4n^2}=\frac{1}{4}\left(1+\frac{1}{n}\right)^2\xrightarrow{n\to\infty}\dfrac{1}{4}" />.
          </p>
        </Task>
        <Task
          n={19}
          q={
            <>
              <em>Teleszkópikus összeg:</em> számítsd ki a <M t="\lim_{n\to\infty}\sum_{k=1}^{n}\left(\dfrac{1}{k}-\dfrac{1}{k+1}\right)" /> határértéket!
            </>
          }
        >
          <p>
            Kiírva a belső tagok párban kiejtik egymást: <M t="\left(1-\frac{1}{2}\right)+\left(\frac{1}{2}-\frac{1}{3}\right)+\dots+\left(\frac{1}{n}-\frac{1}{n+1}\right)=1-\dfrac{1}{n+1}" />.
          </p>
          <p>
            Határértéke <M t="n\to\infty" /> esetén: <M t="\lim_{n\to\infty}\left(1-\dfrac{1}{n+1}\right)=1" />!
          </p>
        </Task>
      </>
    ),
  },
];
