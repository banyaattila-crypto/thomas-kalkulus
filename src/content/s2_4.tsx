import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  AsymptoteWidget,
  InfLimitWidget,
  OneSidedEpsDeltaWidget,
  OneSidedWidget,
  SinThetaWidget,
} from '../components/Widgets24';
import type { Page } from './s1_1';

export const S2_4: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Jobb és bal oldali határérték',
    body: (
      <>
        <Story>
          <p>
            Egy termosztát 20 °C-nál kapcsolja le a fűtést: 20 °C alatt 2000 W-tal fűt, 20 °C fölött 0 W-tal. Ha alulról közelítjük a 20 °C-ot, a teljesítmény 2000 W felé tart; ha felülről, akkor 0 W felé. Egyetlen „kétoldali” határértéke nincs, mégis pontosan leírható, mi történik az egyik és a másik oldalon.
          </p>
        </Story>
        <p>
          Az eddigi határértékek <strong>kétoldaliak</strong> voltak: <M t="x" /> mindkét oldalról közelíthetett a <M t="c" /> ponthoz, és a függvényértékeknek ugyanazon <M t="L" /> szám felé kellett tartaniuk. Gyakran azonban csak az egyik oldalról érdemes (vagy lehetséges) közelíteni — például ugrásnál vagy az értelmezési tartomány végpontjában.
        </p>
        <Def title="Jobb és bal oldali határérték (szemléletesen)">
          <p>
            A <strong>jobb oldali határérték</strong> <M t="c" />-ben <M t="L" />, jelölése <M t="\lim_{x\to c^+} f(x)=L" />, ha <M t="f(x)" /> tetszőlegesen közel kerül <M t="L" />-hez, amikor <M t="x" /> <em>jobbról</em> (<M t="x>c" />) elég közel van <M t="c" />-hez.
          </p>
          <p>
            A <strong>bal oldali határérték</strong> <M t="c" />-ben <M t="L" />, jelölése <M t="\lim_{x\to c^-} f(x)=L" />, ha <M t="f(x)" /> tetszőlegesen közel kerül <M t="L" />-hez, amikor <M t="x" /> <em>balról</em> (<M t="x<c" />) elég közel van <M t="c" />-hez.
          </p>
        </Def>
        <p>
          A 2.2-es szakasz összes határértékszabálya (összeg, szorzat, hányados, szendvicstétel) érvényes a féloldali határértékekre is. A kétoldali és a féloldali határértékek kapcsolatát az alábbi tétel foglalja össze:
        </p>
        <Def title="Tétel (kétoldali és féloldali határérték kapcsolata)">
          <p>
            Az <M t="f" /> függvénynek pontosan akkor létezik a <M t="c" /> helyen a kétoldali határértéke, ha létezik mind a bal, mind a jobb oldali határértéke, és ezek egyenlők:
          </p>
          <M block t="\lim_{x\to c}f(x)=L \iff \lim_{x\to c^-}f(x)=L \;\text{ és }\; \lim_{x\to c^+}f(x)=L." />
        </Def>
        <OneSidedWidget />
        <p>
          Próbáld végig a négy példát! Figyeld meg a félkörnél (<M t="\sqrt{9-x^2}" />), hogy a <M t="c=3" /> végpontban csak bal oldali határérték van — jobbról a függvény nincs is értelmezve. A „kiugró pont” példánál pedig a két féloldali határérték megegyezik (<M t="3" />), tehát a kétoldali határérték létezik, függetlenül attól, hogy <M t="f(2)=5" />.
        </p>
        <h3>Feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Legyen <M t="f(x)=\begin{cases}2x+1,&x<1\\ 6,&x=1\\ 4-x,&x>1\end{cases}" />. Határozd meg a <M t="\lim_{x\to1^-}f(x)" />, <M t="\lim_{x\to1^+}f(x)" /> és <M t="\lim_{x\to1}f(x)" /> értékeket!
            </>
          }
        >
          <p>
            Balról (<M t="x<1" />): <M t="\lim_{x\to1^-}(2x+1)=3" />. Jobbról (<M t="x>1" />): <M t="\lim_{x\to1^+}(4-x)=3" />.
          </p>
          <p>
            Mivel a két féloldali határérték megegyezik, <M t="\lim_{x\to1}f(x)=3" /> (az <M t="f(1)=6" /> érték nem számít).
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Számítsd ki a <M t="\lim_{x\to -3^+}\dfrac{x^2-9}{|x+3|}" /> és a <M t="\lim_{x\to -3^-}\dfrac{x^2-9}{|x+3|}" /> határértékeket! Létezik-e a kétoldali határérték <M t="x=-3" />-ban?
            </>
          }
        >
          <p>
            Ha <M t="x>-3" />, akkor <M t="|x+3|=x+3" />, így <M t="\dfrac{(x-3)(x+3)}{x+3}=x-3\to -6" />.
          </p>
          <p>
            Ha <M t="x<-3" />, akkor <M t="|x+3|=-(x+3)" />, így <M t="\dfrac{(x-3)(x+3)}{-(x+3)}=-(x-3)\to 6" />. Mivel <M t="-6\ne 6" />, a kétoldali határérték nem létezik.
          </p>
        </Task>
        <Task
          n={3}
          q={
            <>
              Az alsó egészrészfüggvényre (<M t="\lfloor x\rfloor" />) mennyi <M t="\lim_{x\to 2^-}(x-\lfloor x\rfloor)" /> és <M t="\lim_{x\to 2^+}(x-\lfloor x\rfloor)" />?
            </>
          }
        >
          <p>
            Ha <M t="1\le x<2" />, akkor <M t="\lfloor x\rfloor=1" />, ezért <M t="\lim_{x\to 2^-}(x-1)=1" />.
          </p>
          <p>
            Ha <M t="2\le x<3" />, akkor <M t="\lfloor x\rfloor=2" />, ezért <M t="\lim_{x\to 2^+}(x-2)=0" />. A törtrészfüggvény az egészeknél 1-ről 0-ra ugrik.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'A féloldali határérték precíz definíciója',
    body: (
      <>
        <p>
          A 2.3-as szakasz <M t="\varepsilon" />–<M t="\delta" /> definíciója egyetlen apró változtatással adja meg a féloldali határértékek pontos fogalmát: a teljes, kétoldali <M t="(x_0-\delta;\,x_0+\delta)" /> ablak helyett csak az egyik félintervallumot vizsgáljuk.
        </p>
        <Def title="Jobb és bal oldali határérték (ε–δ definíció)">
          <p>
            <strong>Jobb oldali:</strong> <M t="\lim_{x\to x_0^+}f(x)=L" />, ha minden <M t="\varepsilon>0" />-hoz létezik <M t="\delta>0" />, hogy minden <M t="x" />-re:
          </p>
          <M block t="x_0 < x < x_0 + \delta \;\Longrightarrow\; |f(x)-L| < \varepsilon." />
          <p>
            <strong>Bal oldali:</strong> <M t="\lim_{x\to x_0^-}f(x)=L" />, ha minden <M t="\varepsilon>0" />-hoz létezik <M t="\delta>0" />, hogy minden <M t="x" />-re:
          </p>
          <M block t="x_0 - \delta < x < x_0 \;\Longrightarrow\; |f(x)-L| < \varepsilon." />
        </Def>
        <h3>Mintabizonyítás</h3>
        <p>
          Igazoljuk, hogy <M t="\lim_{x\to 1^+}\sqrt{x-1}=0" />! Legyen adott egy tetszőleges <M t="\varepsilon>0" />. Olyan <M t="\delta>0" />-t keresünk, amelyre <M t="1<x<1+\delta" /> esetén <M t="|\sqrt{x-1}-0|<\varepsilon" />.
        </p>
        <p>
          Mivel <M t="x>1" />, a gyök pozitív, tehát az egyenlőtlenség <M t="\sqrt{x-1}<\varepsilon" />, ami négyzetre emeléssel ekvivalens azzal, hogy <M t="x-1<\varepsilon^2" />, vagyis <M t="x<1+\varepsilon^2" />. Így a <M t="\delta=\varepsilon^2" /> választás minden <M t="\varepsilon>0" />-ra működik.
        </p>
        <OneSidedEpsDeltaWidget />
        <Warn>
          <p>
            A <M t="g(x)=\sin(1/x)" /> függvénynek a 0 helyen <em>sem</em> jobb, <em>sem</em> bal oldali határértéke nincs. Bármilyen kicsi <M t="\delta>0" /> esetén a <M t="(0;\,\delta)" /> intervallumban végtelen sok olyan pont van, ahol <M t="\sin(1/x)=1" />, és végtelen sok, ahol <M t="\sin(1/x)=-1" />. Így <M t="\varepsilon=1" /> esetén egyetlen <M t="L" /> szám körüli <M t="(L-1;\,L+1)" /> sáv sem foghatja közre mindkettőt.
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={4}
          q={
            <>
              Bizonyítsd be a féloldali <M t="\varepsilon" />–<M t="\delta" /> definícióval, hogy <M t="\lim_{x\to 4^-}\sqrt{4-x}=0" />!
            </>
          }
        >
          <p>
            Legyen <M t="\varepsilon>0" />. Azt szeretnénk, hogy <M t="4-\delta<x<4" /> esetén <M t="|\sqrt{4-x}-0|=\sqrt{4-x}<\varepsilon" /> teljesüljön.
          </p>
          <p>
            Négyzetre emelve: <M t="4-x<\varepsilon^2 \iff 4-\varepsilon^2<x" />. Tehát <M t="\delta=\varepsilon^2" /> minden <M t="\varepsilon>0" />-ra megfelelő.
          </p>
        </Task>
        <Task
          n={5}
          q={
            <>
              Igaz-e, hogy <M t="\lim_{x\to 0^+}\sqrt{x}\sin\!\left(\tfrac{1}{x}\right)=0" />? Mi a helyzet balról (<M t="x\to 0^-" />)?
            </>
          }
        >
          <p>
            Jobbról (<M t="x>0" />): mivel <M t="|\sin(1/x)|\le 1" />, ezért <M t="-\sqrt{x}\le \sqrt{x}\sin(1/x)\le \sqrt{x}" />. A szendvicstétel alapján a jobb oldali határérték <M t="0" />.
          </p>
          <p>
            Balról (<M t="x<0" />): a <M t="\sqrt{x}" /> valós számként nincs értelmezve, ezért a bal oldali (és így a kétoldali) határérték nem létezik.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A (sin θ) / θ nevezetes határérték',
    body: (
      <>
        <p>
          A kalkulus egyik legfontosabb speciális határértéke a <M t="0/0" /> alakú <M t="\frac{\sin\theta}{\theta}" /> tört viselkedése a 0 közelében. Később ebből következik az összes trigonometrikus függvény deriváltja.
        </p>
        <Def title="Nevezetes trigonometrikus határérték">
          <p>
            Ha a <M t="\theta" /> szöget <strong>radiánban</strong> mérjük, akkor
          </p>
          <M block t="\lim_{\theta\to 0}\frac{\sin\theta}{\theta}=1." />
        </Def>
        <h3>Bizonyítás a szendvicstétellel</h3>
        <p>
          Tekintsünk először <M t="0<\theta<\frac{\pi}{2}" /> szögeket az egységkörön! Az ábrán három egymásba ágyazott síkidomot látunk: az <M t="OAP" /> háromszöget, az <M t="OAP" /> körcikket és a körhöz az <M t="A(1;\,0)" /> pontban húzott érintő által bezárt <M t="OAT" /> derékszögű háromszöget. Területeik sorrendje:
        </p>
        <M block t="T_{\triangle OAP} < T_{\text{körcikk}} < T_{\triangle OAT} \iff \frac{1}{2}\sin\theta < \frac{1}{2}\theta < \frac{1}{2}\operatorname{tg}\theta." />
        <p>
          Itt használtuk ki, hogy <M t="\theta" /> radiánban van (az egységsugarú körcikk területe pontosan <M t="\frac{1}{2}r^2\theta=\frac{1}{2}\theta" />). Mindhárom tagot osztva a pozitív <M t="\frac{1}{2}\sin\theta" /> számmal:
        </p>
        <M block t="1 < \frac{\theta}{\sin\theta} < \frac{1}{\cos\theta} \;\Longrightarrow\; \cos\theta < \frac{\sin\theta}{\theta} < 1." />
        <p>
          Mivel <M t="\lim_{\theta\to 0^+}\cos\theta = 1" />, a szendvicstétel szerint <M t="\lim_{\theta\to 0^+}\frac{\sin\theta}{\theta}=1" />. A <M t="\frac{\sin\theta}{\theta}" /> függvény <em>páros</em> (<M t="\frac{\sin(-\theta)}{-\theta}=\frac{\sin\theta}{\theta}" />), így a bal oldali határérték is <M t="1" />, tehát a kétoldali határérték is <M t="1" />.
        </p>
        <SinThetaWidget />
        <h3>Hogyan alkalmazzuk?</h3>
        <p>
          Két tipikus trükkre lesz szükség:
        </p>
        <ul>
          <li>
            <strong>Argumentum egyeztetése:</strong> <M t="\lim_{x\to 0}\dfrac{\sin(3x)}{7x} = \dfrac{3}{7}\lim_{x\to 0}\dfrac{\sin(3x)}{3x} = \dfrac{3}{7}\cdot 1 = \dfrac{3}{7}" /> (itt <M t="\theta=3x\to 0" />).
          </li>
          <li>
            <strong>Félszögképlet koszinusznál:</strong> <M t="1-\cos h = 2\sin^2(h/2)" />, amiből
            <M block t="\lim_{h\to 0}\frac{\cos h - 1}{h} = -\lim_{h\to 0}\frac{\sin(h/2)}{h/2}\cdot\sin(h/2) = -1\cdot 0 = 0." />
          </li>
        </ul>
        <Warn>
          <p>
            A képlet <strong>csak radiánban</strong> ad 1-et! Fokmértékben <M t="x^\circ = \frac{\pi}{180}x" /> rad, ezért <M t="\lim_{x\to 0}\frac{\sin(x^\circ)}{x}=\frac{\pi}{180}\approx 0{,}0175" />. Ezért használ a kalkulus mindenhol radiánt.
          </p>
        </Warn>
        <h3>Feladatok</h3>
        <Task
          n={6}
          q={
            <>
              Számítsd ki: (a) <M t="\lim_{x\to 0}\dfrac{\sin(4x)}{x}" />, (b) <M t="\lim_{x\to 0}\dfrac{\operatorname{tg}(5x)}{2x}" />!
            </>
          }
        >
          <p>
            (a) <M t="\lim_{x\to 0} 4\cdot\dfrac{\sin(4x)}{4x} = 4\cdot 1 = 4" />.
          </p>
          <p>
            (b) <M t="\dfrac{\operatorname{tg}(5x)}{2x}=\dfrac{5}{2}\cdot\dfrac{\sin(5x)}{5x}\cdot\dfrac{1}{\cos(5x)}\to \dfrac{5}{2}\cdot 1\cdot 1 = \dfrac{5}{2}" />.
          </p>
        </Task>
        <Task
          n={7}
          q={
            <>
              Számítsd ki a <M t="\lim_{x\to 0}\dfrac{\sin(3x)}{\sin(5x)}" /> határértéket!
            </>
          }
        >
          <p>
            Alakítsuk át a számlálót és a nevezőt külön:
          </p>
          <M block t="\frac{\sin(3x)}{\sin(5x)} = \frac{3}{5}\cdot\frac{\sin(3x)}{3x}\cdot\frac{5x}{\sin(5x)} \longrightarrow \frac{3}{5}\cdot 1 \cdot \frac{1}{1} = \frac{3}{5}." />
        </Task>
        <Task
          n={8}
          q={
            <>
              Mennyi <M t="\lim_{x\to 0}\dfrac{1-\cos x}{x^2}" />?
            </>
          }
        >
          <p>
            A <M t="1-\cos x = 2\sin^2(x/2)" /> azonossággal:
          </p>
          <M block t="\frac{1-\cos x}{x^2} = \frac{2\sin^2(x/2)}{4(x/2)^2} = \frac{1}{2}\left(\frac{\sin(x/2)}{x/2}\right)^2 \longrightarrow \frac{1}{2}\cdot 1^2 = \frac{1}{2}." />
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'Határérték a végtelenben',
    body: (
      <>
        <Story>
          <p>
            Egy forró teáscsészét 22 °C-os szobában hagyunk az asztalon. Az első percekben gyorsan hűl, egy óra múlva már alig érezhetően, és ha bármilyen sokáig várunk, a hőmérséklete egyre pontosabban 22 °C-hoz simul. A „végtelenben vett határérték” épp ezt a hosszú távú egyensúlyi értéket ragadja meg.
          </p>
        </Story>
        <p>
          Most nem egy véges <M t="x_0" /> pont körül vizsgálódunk, hanem arra vagyunk kíváncsiak, merre tart <M t="f(x)" />, ha <M t="x" /> minden határon túl nő (<M t="x\to\infty" />) vagy negatív irányban minden határon túl csökken (<M t="x\to-\infty" />).
        </p>
        <Warn>
          <p>
            A <M t="\infty" /> és <M t="-\infty" /> szimbólum <strong>nem valós szám</strong> — nem lehet vele összeadni vagy osztani. Egy irányt és egy korlátlan folyamatot jelöl.
          </p>
        </Warn>
        <Def title="Határérték a végtelenben (precíz definíció)">
          <p>
            <strong>Pozitív végtelenben:</strong> <M t="\lim_{x\to\infty}f(x)=L" />, ha minden <M t="\varepsilon>0" />-hoz létezik olyan <M t="M" /> küszöb, hogy minden <M t="x" />-re:
          </p>
          <M block t="x > M \;\Longrightarrow\; |f(x)-L| < \varepsilon." />
          <p>
            <strong>Negatív végtelenben:</strong> <M t="\lim_{x\to-\infty}f(x)=L" />, ha minden <M t="\varepsilon>0" />-hoz létezik olyan <M t="N" /> küszöb, hogy minden <M t="x" />-re:
          </p>
          <M block t="x < N \;\Longrightarrow\; |f(x)-L| < \varepsilon." />
        </Def>
        <p>
          A két alapépítőkő (amelyekből a többi következik): minden <M t="k" /> konstansra
        </p>
        <M block t="\lim_{x\to\pm\infty} k = k \qquad\text{és}\qquad \lim_{x\to\pm\infty}\frac{1}{x}=0." />
        <p>
          Az utóbbi bizonyítása azonnal adódik: adott <M t="\varepsilon>0" />-ra elég <M t="M=1/\varepsilon" /> küszöböt választani, mert <M t="x>1/\varepsilon" /> esetén <M t="|1/x - 0|=1/x<\varepsilon" />. (Negatív végtelenben ugyanígy <M t="N=-1/\varepsilon" />.)
        </p>
        <p>
          A 2.2-es szakasz <strong>összes műveleti szabálya</strong> (összeg, különbség, szorzat, konstansszoros, hányados nem nulla nevezővel, racionális kitevőjű hatvány és szendvicstétel) változtatás nélkül igaz <M t="x\to\pm\infty" /> esetén is.
        </p>
        <InfLimitWidget />
        <h3>Feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Adj meg olyan <M t="M" /> küszöböt, amelyre <M t="x>M" /> esetén <M t="\left|\dfrac{3x-1}{x+2}-3\right|<0{,}05" /> teljesül!
            </>
          }
        >
          <p>
            Közös nevezőre hozva: <M t="\left|\dfrac{3x-1-3(x+2)}{x+2}\right|=\dfrac{7}{|x+2|}" />. Pozitív <M t="x" />-re ez <M t="\dfrac{7}{x+2}<0{,}05 \iff x+2>140 \iff x>138" />.
          </p>
          <p>
            Tehát <M t="M=138" /> (vagy bármely nagyobb szám) megfelel.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Számítsd ki a műveleti szabályokkal: (a) <M t="\lim_{x\to\infty}\left(7-\dfrac{4}{x}+\dfrac{9}{x^2}\right)" />, (b) <M t="\lim_{x\to-\infty}\dfrac{6+\frac{1}{x}}{2-\frac{5}{x^3}}" />!
            </>
          }
        >
          <p>
            (a) Mivel <M t="1/x\to 0" /> és <M t="1/x^2=(1/x)^2\to 0" />, a határérték <M t="7-0+0=7" />.
          </p>
          <p>
            (b) A számláló <M t="6+0=6" />-hoz, a nevező <M t="2-0=2" />-höz tart, így a határérték <M t="6/2=3" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Racionális függvények, vízszintes és ferde aszimptoták',
    body: (
      <>
        <p>
          Ha egy racionális törtfüggvényben <M t="x\to\pm\infty" />, a számláló és a nevező is a végtelenbe tart — közvetlen behelyettesítésről szó sem lehet. A biztos módszer mindig ugyanaz: <strong>osszuk el a számlálót és a nevezőt is a nevező legmagasabb kitevőjű x-hatványával!</strong>
        </p>
        <p>
          Például azonos fokszám esetén (<M t="x^2" />-tel osztva):
        </p>
        <M block t="\lim_{x\to\infty}\frac{4x^2-3x+1}{2x^2+5} = \lim_{x\to\infty}\frac{4-\frac{3}{x}+\frac{1}{x^2}}{2+\frac{5}{x^2}} = \frac{4-0+0}{2+0} = 2." />
        <p>
          Ha a számláló fokszáma <em>kisebb</em> a nevezőénél, a számláló minden tagja <M t="0" />-hoz tart, a nevező főegyütthatója pedig nem nulla, így a határérték <M t="0" />.
        </p>
        <Def title="Vízszintes aszimptota">
          <p>
            Az <M t="y=b" /> vízszintes egyenes az <M t="y=f(x)" /> grafikon <strong>vízszintes aszimptotája</strong>, ha
          </p>
          <M block t="\lim_{x\to\infty}f(x)=b \qquad\text{vagy}\qquad \lim_{x\to-\infty}f(x)=b." />
        </Def>
        <h3>Változócsere és szendvicstétel a végtelenben</h3>
        <p>
          Sok határérték a <M t="t=1/x" /> helyettesítéssel visszavezethető 0-beli határértékre: ha <M t="x\to\infty" />, akkor <M t="t\to 0^+" />. Például:
        </p>
        <M block t="\lim_{x\to\infty} x\sin\!\left(\frac{1}{x}\right) = \lim_{t\to 0^+}\frac{\sin t}{t} = 1." />
        <p>
          A szendvicstétel segítségével pedig látható, hogy <M t="\lim_{x\to\pm\infty}\left(1+\frac{2\sin x}{x}\right)=1" />, hiszen <M t="\left|\frac{2\sin x}{x}\right|\le \frac{2}{|x|}\to 0" />. Ez egyben cáfol egy elterjedt tévhitet: <strong>egy görbe akár végtelen sokszor is metszheti a saját vízszintes aszimptotáját!</strong>
        </p>
        <h3>Ferde aszimptoták</h3>
        <p>
          Ha egy racionális törtfüggvény számlálója <strong>eggyel magasabb fokú</strong> a nevezőnél, a grafikon a végtelenben nem vízszintes, hanem <em>ferde egyeneshez</em> simul. Polinomosztással szétválasztjuk a lineáris részt és a maradékot:
        </p>
        <M block t="f(x)=\frac{x^2-2x+3}{x+1} = (x-3) + \frac{6}{x+1}." />
        <p>
          Mivel <M t="\lim_{x\to\pm\infty}\frac{6}{x+1}=0" />, a görbe és az <M t="y=x-3" /> egyenes függőleges távolsága 0-hoz tart: az <M t="y=x-3" /> a függvény <strong>ferde aszimptotája</strong>.
        </p>
        <AsymptoteWidget />
        <h3>Feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Határozd meg a határértékeket: (a) <M t="\lim_{x\to-\infty}\dfrac{3x^3-2x}{6x^3+x^2-5}" />, (b) <M t="\lim_{x\to\infty}\dfrac{7x^2+1}{x^3-4x}" />!
            </>
          }
        >
          <p>
            (a) <M t="x^3" />-nel osztva: <M t="\dfrac{3-2/x^2}{6+1/x-5/x^3}\to\dfrac{3}{6}=\dfrac{1}{2}" />.
          </p>
          <p>
            (b) <M t="x^3" />-nel osztva: <M t="\dfrac{7/x+1/x^3}{1-4/x^2}\to\dfrac{0}{1}=0" />.
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Keresd meg az <M t="f(x)=\dfrac{3x-5}{\sqrt{4x^2+1}}" /> függvény mindkét vízszintes aszimptotáját (<M t="x\to\infty" /> és <M t="x\to-\infty" />)!
            </>
          }
        >
          <p>
            Osszunk <M t="|x|=\sqrt{x^2}" />-szel! A nevező <M t="\sqrt{4+1/x^2}\to 2" />.
          </p>
          <p>
            Ha <M t="x\to\infty" />, akkor <M t="x=|x|" />, így a számláló <M t="3-5/x\to 3" />, határérték: <M t="\dfrac{3}{2}" />. Ha <M t="x\to-\infty" />, akkor <M t="x=-|x|" />, így a számláló <M t="-3-5/|x|\to -3" />, határérték: <M t="-\dfrac{3}{2}" />. A két aszimptota: <M t="y=\frac{3}{2}" /> és <M t="y=-\frac{3}{2}" />.
          </p>
        </Task>
        <Task
          n={13}
          q={
            <>
              Add meg az <M t="f(x)=\dfrac{2x^2+x-5}{x-2}" /> függvény ferde aszimptotájának egyenletét!
            </>
          }
        >
          <p>
            Polinomosztással: <M t="2x^2+x-5 = (2x+5)(x-2) + 5" />, tehát
          </p>
          <M block t="f(x)=2x+5+\frac{5}{x-2}." />
          <p>
            Mivel <M t="\frac{5}{x-2}\to 0" /> (<M t="x\to\pm\infty" />), a ferde aszimptota <M t="y=2x+5" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Összefoglalás, buktatók és vegyes gyakorlás',
    body: (
      <>
        <p>
          Az alábbi táblázat segít gyorsan kiválasztani a megfelelő eszközt, amikor féloldali vagy végtelenbeli határértékkel találkozol:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>helyzet</th>
              <th>eszköz / módszer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Darabos függvény, abszolútérték, <M t="\lfloor x\rfloor" /></td>
              <td>Bal és jobb oldali határérték külön, majd egyezés ellenőrzése</td>
            </tr>
            <tr>
              <td>Értelmezési tartomány végpontja (pl. gyök)</td>
              <td>Csak a belső oldal felőli féloldali határérték létezhet</td>
            </tr>
            <tr>
              <td><M t="0/0" /> alak szinusszal, tangenssel, <M t="1-\cos" />-szal</td>
              <td>Visszavezetés <M t="\lim_{\theta\to 0}\frac{\sin\theta}{\theta}=1" />-re (radiánban!)</td>
            </tr>
            <tr>
              <td>Racionális tört, <M t="x\to\pm\infty" /></td>
              <td>Osztás a nevező legmagasabb <M t="x" />-hatványával</td>
            </tr>
            <tr>
              <td>Számláló foka = nevező foka + 1</td>
              <td>Polinomosztás → ferde aszimptota + 0-hoz tartó maradék</td>
            </tr>
            <tr>
              <td>Oszcilláló tag (pl. <M t="\frac{\sin x}{x}" />) vagy <M t="1/x" />-es argumentum</td>
              <td>Szendvicstétel, illetve <M t="t=1/x" /> változócsere</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy gyakori hiba</h3>
        <Warn>
          <p>
            <strong>1. Előjelhiba gyöknél:</strong> negatív <M t="x" /> esetén <M t="\sqrt{x^2}=-x" />, nem <M t="+x" />! Ha <M t="x\to-\infty" />, és <M t="x" />-et beviszed a négyzetgyök alá, elé mínuszjelet kell tenni.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Féloldali ≠ kétoldali:</strong> az, hogy <M t="\lim_{x\to 0^+}\sqrt{x}=0" />, még nem jelenti azt, hogy <M t="\lim_{x\to 0}\sqrt{x}=0" />. Kétoldali határértékhez mindkét oldalról közelíteni kell tudni.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Rossz argumentum a szinusznál:</strong> <M t="\lim_{x\to 0}\frac{\sin(3x)}{x}" /> nem 1, hanem 3! A nevezőnek pontosan meg kell egyeznie a szinusz argumentumával.
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. „Az aszimptotát nem szabad metszeni”:</strong> tévhit! A vízszintes aszimptota a <em>végtelenbeli</em> viselkedést írja le, véges távolságban (vagy akár végtelen sokszor, mint a <M t="1+\frac{2\sin x}{x}" /> esetén) a görbe nyugodtan átvághatja.
          </p>
        </Warn>
        <h3>Vegyes feladatok</h3>
        <Task
          n={14}
          q={
            <>
              Milyen <M t="a" /> valós szám esetén létezik a <M t="\lim_{x\to 2} f(x)" /> kétoldali határérték, ha <M t="f(x)=\begin{cases}ax^2-1,&x<2\\ 3x+a,&x>2\end{cases}" />? Mennyi ekkor a határérték?
            </>
          }
        >
          <p>
            A bal oldali határérték: <M t="\lim_{x\to 2^-}(ax^2-1)=4a-1" />. A jobb oldali: <M t="\lim_{x\to 2^+}(3x+a)=6+a" />.
          </p>
          <p>
            A kettő pontosan akkor egyenlő, ha <M t="4a-1=6+a \iff 3a=7 \iff a=\dfrac{7}{3}" />. Ekkor a közös határérték <M t="6+\dfrac{7}{3}=\dfrac{25}{3}" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Számítsd ki a <M t="\lim_{x\to\infty}\left(\sqrt{x^2+6x}-x\right)" /> határértéket! (Tipp: szorozz a konjugálttal!)
            </>
          }
        >
          <p>
            Ez <M t="\infty-\infty" /> alakú, ezért bővítsük a konjugálttal (<M t="\sqrt{x^2+6x}+x" />):
          </p>
          <M block t="\sqrt{x^2+6x}-x = \frac{(x^2+6x)-x^2}{\sqrt{x^2+6x}+x} = \frac{6x}{\sqrt{x^2+6x}+x}." />
          <p>
            Mivel <M t="x>0" />, osszunk <M t="x=\sqrt{x^2}" />-szel:
          </p>
          <M block t="\frac{6}{\sqrt{1+\frac{6}{x}}+1} \longrightarrow \frac{6}{\sqrt{1+0}+1} = 3." />
        </Task>
      </>
    ),
  },
];
