import { M } from '../components/M';
import { Def, Story, Task, Warn } from '../components/ui';
import {
  HigherDerivWidget,
  HorizTangentWidget,
  PowerScaleWidget,
  ProductAreaWidget,
  QuotientSchemaDiagram,
  RuleChoiceWidget,
} from '../components/Widgets32';
import type { Page } from './s1_1';

export const S3_2: Page[] = [
  // ---------------------------------------------------------------- 1
  {
    title: 'Konstans, hatvány- és konstansszoros-szabály',
    body: (
      <>
        <Story>
          <p>
            Ha valaki minden szorzáshoz visszatérne az összeadáshoz (<M t="7\cdot 8 = 8+8+\dots+8" />), sosem végezne. A deriválásnál ugyanez a helyzet: a definíció alapvető a megértéshez, de a mindennapi számoláshoz megépítjük a kalkulus „szorzótábláját” — a <strong>deriválási szabályokat</strong>.
          </p>
        </Story>
        <p>
          Kezdjük a három legegyszerűbb építőkővel! Mindháromnak világos geometriai értelme van:
        </p>
        <Def title="1. szabály — Konstans függvény deriváltja">
          <p>
            Ha <M t="f(x)=c" /> állandó, akkor
          </p>
          <M block t="\frac{d}{dx}(c) = 0." />
          <p>
            <em>Miért?</em> Egy vízszintes egyenes sehol sem emelkedik és nem süllyed, meredeksége minden pontban <M t="0" />.
          </p>
        </Def>
        <Def title="2. szabály — Pozitív egész kitevőjű hatvány">
          <p>
            Minden <M t="n" /> pozitív egész számra:
          </p>
          <M block t="\frac{d}{dx}(x^n) = n x^{n-1}." />
          <p>
            <em>Hogyan jegyezd meg?</em> A kitevőt <strong>lehozod elé szorzóként</strong>, majd a kitevőt <strong>eggyel csökkented</strong>! (Pl. <M t="(x^5)' = 5x^4" />, <M t="(x)' = 1\cdot x^0 = 1" />.)
          </p>
        </Def>
        <p>
          A 2. szabály bizonyítása elegánsan kijön a <M t="z\to x" /> definícióból a <M t="z^n - x^n = (z-x)(z^{n-1}+z^{n-2}x+\dots+x^{n-1})" /> azonossággal: <M t="(z-x)" />-szel egyszerűsítve <M t="n" /> darab <M t="x^{n-1}" /> tag összege marad, vagyis <M t="nx^{n-1}" />.
        </p>
        <Def title="3. szabály — Konstansszoros deriváltja">
          <p>
            Ha <M t="u" /> differenciálható és <M t="c" /> állandó:
          </p>
          <M block t="\frac{d}{dx}(c\cdot u) = c\cdot \frac{du}{dx}." />
          <p>
            <em>Miért?</em> Ha egy görbét függőlegesen <M t="c" />-szeresére nyújtasz, minden érintője pontosan <M t="c" />-szer meredekebb lesz. Speciálisan <M t="c=-1" /> esetén <M t="(-u)' = -u'" />.
          </p>
        </Def>
        <PowerScaleWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={1}
          q={
            <>
              Deriváld: (a) <M t="y=7" />, (b) <M t="y=x^6" />, (c) <M t="y=-4x^3" />, (d) <M t="y=\dfrac{\pi}{2}x^4" />!
            </>
          }
        >
          <p>
            (a) <M t="0" />, (b) <M t="6x^5" />, (c) <M t="-12x^2" />, (d) <M t="\dfrac{\pi}{2}\cdot 4x^3 = 2\pi x^3" />.
          </p>
        </Task>
        <Task
          n={2}
          q={
            <>
              Mekkora az <M t="y=5x^3" /> görbe meredeksége az <M t="x=-2" /> helyen?
            </>
          }
        >
          <p>
            <M t="y'=15x^2" />, így <M t="y'(-2)=15\cdot(-2)^2=60" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    title: 'Összeg, különbség és polinomok deriválása',
    body: (
      <>
        <p>
          Ha két bankszámládon külön-külön nő a pénzed (az egyiken havi 30 ezerrel, a másikon 50 ezerrel), akkor az összes megtakarításod havi <M t="30+50=80" /> ezerrel nő. Ugyanez az egyszerű elv adja az összegszabályt!
        </p>
        <Def title="4. szabály — Összeg és különbség deriváltja">
          <p>
            Ha <M t="u" /> és <M t="v" /> differenciálható függvények:
          </p>
          <M block t="\frac{d}{dx}(u + v) = \frac{du}{dx} + \frac{dv}{dx}, \qquad\qquad \frac{d}{dx}(u - v) = \frac{du}{dx} - \frac{dv}{dx}." />
        </Def>
        <p>
          A szabály véges sok tagra is igaz (teljes indukcióval), ami azt jelenti, hogy <strong>bármely polinomot egyszerűen tagonként deriválhatunk</strong>! Például:
        </p>
        <M block t="\frac{d}{dx}\left(x^3+\frac{4}{3}x^2-5x+1\right) = 3x^2 + \frac{8}{3}x - 5 + 0 = 3x^2+\frac{8}{3}x-5." />
        <h3>Alkalmazás: hol vannak egy görbe vízszintes érintői?</h3>
        <p>
          Egy érintő pontosan akkor vízszintes, ha meredeksége <M t="0" />, vagyis <M t="f'(x)=0" />. Vegyük az <M t="y=x^4-2x^2+2" /> görbét: deriváltja <M t="y'=4x^3-4x=4x(x-1)(x+1)" />. Ez pontosan három helyen nulla: <M t="x=-1" />, <M t="x=0" /> és <M t="x=1" /> — itt találjuk a görbe két völgyét és középső dombját!
        </p>
        <HorizTangentWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={3}
          q={
            <>
              Deriváld: <M t="f(x)=2x^5-\dfrac{1}{2}x^4+3x^2-9x+\sqrt{7}" />!
            </>
          }
        >
          <p>
            Tagonként deriválva (a <M t="\sqrt{7}" /> konstans, deriváltja 0): <M t="f'(x)=10x^4-2x^3+6x-9" />.
          </p>
        </Task>
        <Task
          n={4}
          q={
            <>
              Mely pontokban van vízszintes érintője az <M t="y=x^3-12x+5" /> görbének?
            </>
          }
        >
          <p>
            <M t="y'=3x^2-12=3(x^2-4)=0 \iff x=2" /> vagy <M t="x=-2" />. A pontok: <M t="(2;\,-11)" /> és <M t="(-2;\,21)" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    title: 'A szorzatszabály (és a téglalap-bizonyítás)',
    body: (
      <>
        <p>
          Az összegszabály után csábító lenne azt hinni, hogy szorzat deriváltja a deriváltak szorzata. <strong>Ez azonban hamis!</strong> Nézzünk egy egyszerű ellenpéldát:
        </p>
        <M block t="\frac{d}{dx}(x\cdot x) = \frac{d}{dx}(x^2) = 2x \;\neq\; \frac{d}{dx}(x)\cdot\frac{d}{dx}(x) = 1\cdot 1 = 1." />
        <p>
          Miért nem? Gondolj egy <M t="u(x)" /> szélességű és <M t="v(x)" /> magasságú téglalapra, amelynek területe <M t="T(x)=u(x)\cdot v(x)" />! Amikor mindkét oldal megnő egy kicsit (<M t="\Delta u" /> és <M t="\Delta v" />), a terület <strong>két csíkkal</strong> (<M t="u\cdot\Delta v" /> és <M t="v\cdot\Delta u" />) plusz egy elenyésző saroknégyzettel (<M t="\Delta u\cdot\Delta v" />) gyarapszik!
        </p>
        <Def title="5. szabály — Szorzatfüggvény deriváltja (szorzatszabály)">
          <p>
            Ha <M t="u" /> és <M t="v" /> differenciálható függvények:
          </p>
          <M block t="\frac{d}{dx}(u\cdot v) = u\frac{dv}{dx} + v\frac{du}{dx}, \qquad\text{röviden:}\qquad (uv)' = uv' + vu'." />
          <p>
            <em>Szóban:</em> „az első szorozva a második deriváltjával, plusz a második szorozva az első deriváltjával”.
          </p>
        </Def>
        <ProductAreaWidget />
        <h3>Az algebrai bizonyítás trükkje</h3>
        <p>
          A definíció számlálójában (<M t="u(x+h)v(x+h)-u(x)v(x)" />) egyszerre változik <M t="u" /> és <M t="v" />. Hogy szétválasszuk őket, <strong>beillesztjük a <M t="-u(x+h)v(x)+u(x+h)v(x)" /> nullát</strong>:
        </p>
        <M block t="\frac{u(x+h)\big(v(x+h)-v(x)\big)}{h} + \frac{v(x)\big(u(x+h)-u(x)\big)}{h} \;\xrightarrow{h\to 0}\; u(x)v'(x) + v(x)u'(x)." />
        <p>
          (Itt azt is kihasználtuk, hogy <M t="u" /> differenciálható, ezért a 3.1-es 1. Tétel szerint folytonos is, tehát <M t="u(x+h)\to u(x)" />!)
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={5}
          q={
            <>
              Deriváld a szorzatszabállyal: <M t="y=(x^2+3)(2x^3-5x)" />! (Ellenőrizd zárójelfelbontással is!)
            </>
          }
        >
          <p>
            <M t="u=x^2+3\Rightarrow u'=2x" />, <M t="v=2x^3-5x\Rightarrow v'=6x^2-5" />.
          </p>
          <p>
            <M t="y'=(x^2+3)(6x^2-5)+(2x^3-5x)(2x)=(6x^4+13x^2-15)+(4x^4-10x^2)=10x^4+3x^2-15" />.
          </p>
        </Task>
        <Task
          n={6}
          q={
            <>
              Tudjuk, hogy <M t="u(2)=3" />, <M t="u'(2)=-4" />, <M t="v(2)=1" /> és <M t="v'(2)=2" />. Mennyi <M t="(uv)'(2)" />?
            </>
          }
        >
          <p>
            <M t="(uv)'(2) = u(2)v'(2)+v(2)u'(2) = 3\cdot 2 + 1\cdot(-4) = 6 - 4 = 2" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    title: 'A hányadosszabály',
    body: (
      <>
        <p>
          Ahogy a szorzatnál, úgy a hányadosnál sem igaz, hogy <M t="(u/v)' = u'/v'" />. A pontos képlet nagyon hasonlít a szorzatszabályra, de két dologban eltér: középen <strong>mínuszjel</strong> áll, és az egészet el kell osztani a nevező négyzetével!
        </p>
        <Def title="6. szabály — Hányados deriváltja (hányadosszabály)">
          <p>
            Ha <M t="u" /> és <M t="v" /> differenciálható függvények és <M t="v(x)\ne 0" />:
          </p>
          <M block t="\frac{d}{dx}\left(\frac{u}{v}\right) = \frac{v\dfrac{du}{dx} - u\dfrac{dv}{dx}}{v^2}, \qquad\text{röviden:}\qquad \left(\frac{u}{v}\right)' = \frac{vu' - uv'}{v^2}." />
        </Def>
        <QuotientSchemaDiagram />
        <h3>Mintapélda lépésről lépésre</h3>
        <p>
          Deriváljuk az <M t="y=\dfrac{t^2-1}{t^2+1}" /> függvényt! Itt a számláló <M t="u=t^2-1" /> (<M t="u'=2t" />), a nevező <M t="v=t^2+1" /> (<M t="v'=2t" />):
        </p>
        <M block t="\frac{dy}{dt} = \frac{(t^2+1)(2t) - (t^2-1)(2t)}{(t^2+1)^2} = \frac{(2t^3+2t) - (2t^3-2t)}{(t^2+1)^2} = \frac{4t}{(t^2+1)^2}." />
        <p>
          <em>Tipp:</em> a nevezőben lévő <M t="(t^2+1)^2" /> négyzetet <strong>szinte soha nem érdemes felbontani</strong> — szorzat alakban sokkal átláthatóbb, és könnyebb vele később egyszerűsíteni vagy előjelet vizsgálni!
        </p>
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={7}
          q={
            <>
              Deriváld: <M t="f(x)=\dfrac{2x+5}{3x-2}" />!
            </>
          }
        >
          <p>
            <M t="f'(x)=\dfrac{(3x-2)\cdot 2 - (2x+5)\cdot 3}{(3x-2)^2}=\dfrac{6x-4-6x-15}{(3x-2)^2}=\dfrac{-19}{(3x-2)^2}" />.
          </p>
        </Task>
        <Task
          n={8}
          q={
            <>
              Használd a 6. feladat adatait (<M t="u(2)=3" />, <M t="u'(2)=-4" />, <M t="v(2)=1" />, <M t="v'(2)=2" />): mennyi <M t="\left(\dfrac{u}{v}\right)'(2)" />?
            </>
          }
        >
          <p>
            <M t="\dfrac{v(2)u'(2)-u(2)v'(2)}{v(2)^2}=\dfrac{1\cdot(-4)-3\cdot 2}{1^2}=-10" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    title: 'Negatív egész kitevők és okos szabályválasztás',
    body: (
      <>
        <p>
          A hányadosszabály segítségével egyetlen mozdulattal kiterjeszthetjük a hatványszabályt a <strong>negatív egész kitevőkre</strong> is! Ha <M t="n=-m" /> (ahol <M t="m>0" />), akkor <M t="x^n = x^{-m} = \dfrac{1}{x^m}" />:
        </p>
        <M block t="\frac{d}{dx}\left(\frac{1}{x^m}\right) = \frac{x^m\cdot 0 - 1\cdot m x^{m-1}}{(x^m)^2} = \frac{-m x^{m-1}}{x^{2m}} = -m x^{-m-1} = n x^{n-1}." />
        <Def title="7. szabály — Negatív egész kitevőjű hatvány">
          <p>
            Minden <M t="n" /> <strong>negatív</strong> egész számra és <M t="x\ne 0" />-ra pontosan ugyanaz a képlet érvényes:
          </p>
          <M block t="\frac{d}{dx}(x^n) = n x^{n-1}." />
        </Def>
        <p>
          Így például <M t="\dfrac{d}{dx}\left(\dfrac{4}{x^3}\right)=\dfrac{d}{dx}(4x^{-3})=4(-3)x^{-4}=-\dfrac{12}{x^4}" />. Figyelj a kitevőre: <M t="-3 - 1 = -4" />, nem <M t="-2" />!
        </p>
        <h3>Mikor NE használd a hányadosszabályt?</h3>
        <p>
          Sok időt és előjelhibát spórolsz meg, ha deriválás előtt ránézel a kifejezésre: ha egyszerű algebrai átírással (zárójelfelbontás, tagonkénti osztás, negatív kitevő) polinom-szerű összeggé alakítható, <strong>mindig érdemes előbb átírni!</strong>
        </p>
        <RuleChoiceWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={9}
          q={
            <>
              Deriváld átírással (hányadosszabály nélkül!): <M t="y=\dfrac{x^3+7}{x}" />!
            </>
          }
        >
          <p>
            <M t="y=x^2+7x^{-1} \;\Longrightarrow\; y'=2x-7x^{-2}=2x-\dfrac{7}{x^2}" />.
          </p>
        </Task>
        <Task
          n={10}
          q={
            <>
              Írd fel az <M t="y=x+\dfrac{2}{x}" /> görbe <M t="(1;\,3)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            <M t="y=x+2x^{-1} \Rightarrow y'=1-2x^{-2}=1-\dfrac{2}{x^2}" />. Az <M t="x=1" /> helyen <M t="m=1-2=-1" />.
          </p>
          <p>
            Az érintő egyenlete: <M t="y=3-1(x-1)=-x+4" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    title: 'Másod- és magasabbrendű deriváltak',
    body: (
      <>
        <p>
          Mivel egy függvény <M t="f'(x)" /> deriváltja maga is függvény, ha differenciálható, <strong>újra deriválhatjuk</strong>! Így kapjuk a <strong>második deriváltat</strong> (<M t="f''" />), majd annak deriváltjaként a harmadikat (<M t="f'''" />), és általánosan az <M t="n" />-edik deriváltat (<M t="f^{(n)}" />).
        </p>
        <Def title="Magasabbrendű deriváltak jelölései">
          <table className="tbl">
            <thead>
              <tr>
                <th>rend</th>
                <th>Newton-féle</th>
                <th>Leibniz-féle</th>
                <th>operátoros</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. derivált</td>
                <td><M t="y' = f'(x)" /></td>
                <td><M t="\dfrac{dy}{dx}" /></td>
                <td><M t="Dy" /></td>
              </tr>
              <tr>
                <td>2. derivált</td>
                <td><M t="y'' = f''(x)" /></td>
                <td><M t="\dfrac{d^2 y}{dx^2}" /></td>
                <td><M t="D^2 y" /></td>
              </tr>
              <tr>
                <td>3. derivált</td>
                <td><M t="y''' = f'''(x)" /></td>
                <td><M t="\dfrac{d^3 y}{dx^3}" /></td>
                <td><M t="D^3 y" /></td>
              </tr>
              <tr>
                <td><M t="n" />-edik derivált</td>
                <td><M t="y^{(n)} = f^{(n)}(x)" /></td>
                <td><M t="\dfrac{d^n y}{dx^n}" /></td>
                <td><M t="D^n y" /></td>
              </tr>
            </tbody>
          </table>
        </Def>
        <p>
          <strong>Mit jelent a második derivált?</strong> A meredekség változási sebességét!
        </p>
        <ul>
          <li>
            <strong>Fizikában:</strong> ha <M t="s(t)" /> az út, akkor <M t="s'(t)=v(t)" /> a <em>sebesség</em>, <M t="s''(t)=a(t)" /> pedig a <strong>gyorsulás</strong>!
          </li>
          <li>
            <strong>Geometriában:</strong> ha <M t="f''(x)>0" />, a meredekség növekszik (a görbe felfelé kanyarodik, „mosolyog”); ha <M t="f''(x)<0" />, a meredekség csökken (lefelé hajlik).
          </li>
        </ul>
        <HigherDerivWidget />
        <h3>Gyors ellenőrző feladatok</h3>
        <Task
          n={11}
          q={
            <>
              Határozd meg az <M t="y=x^4-3x^2+5x-2" /> függvény első négy deriváltját!
            </>
          }
        >
          <p>
            <M t="y'=4x^3-6x+5" />, <M t="y''=12x^2-6" />, <M t="y'''=24x" />, <M t="y^{(4)}=24" /> (és <M t="y^{(5)}=0" />).
          </p>
        </Task>
        <Task
          n={12}
          q={
            <>
              Számítsd ki az <M t="s(t)=\dfrac{t^2+5t-1}{t^2}" /> függvény első és második deriváltját!
            </>
          }
        >
          <p>
            Átírva: <M t="s(t)=1+5t^{-1}-t^{-2}" />. Innen <M t="s'(t)=-5t^{-2}+2t^{-3}" /> és <M t="s''(t)=10t^{-3}-6t^{-4}=\dfrac{10}{t^3}-\dfrac{6}{t^4}" />.
          </p>
        </Task>
      </>
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    title: 'Összefoglaló szabálytábla és a 4 legnagyobb buktató',
    body: (
      <>
        <p>
          Az alábbi táblázat a 3.2-es szakasz mind a 7 szabályát összefoglalja — érdemes elővenni, amíg teljesen automatikussá nem válnak:
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>szabály</th>
              <th>képlet</th>
              <th>megjegyzés</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Konstans</td>
              <td><M t="(c)' = 0" /></td>
              <td>vízszintes egyenes meredeksége 0</td>
            </tr>
            <tr>
              <td>2. &amp; 7. Egész hatvány</td>
              <td><M t="(x^n)' = n x^{n-1}" /></td>
              <td>minden <M t="n\in\mathbb{Z}" />-re (<M t="n<0" /> esetén <M t="x\ne 0" />)</td>
            </tr>
            <tr>
              <td>3. Konstansszoros</td>
              <td><M t="(cu)' = c u'" /></td>
              <td>a szorzó kiemelhető a deriválás elé</td>
            </tr>
            <tr>
              <td>4. Összeg / különbség</td>
              <td><M t="(u\pm v)' = u'\pm v'" /></td>
              <td>polinomok tagonként deriválhatók</td>
            </tr>
            <tr>
              <td>5. Szorzatszabály</td>
              <td><M t="(uv)' = uv' + vu'" /></td>
              <td>NEM <M t="u'v'" />!</td>
            </tr>
            <tr>
              <td>6. Hányadosszabály</td>
              <td><M t="\left(\dfrac{u}{v}\right)' = \dfrac{vu'-uv'}{v^2}" /></td>
              <td>a sorrend a mínusz miatt kötött!</td>
            </tr>
          </tbody>
        </table>
        <h3>Négy klasszikus hiba, amit kerülj el</h3>
        <Warn>
          <p>
            <strong>1. „Szorzat deriváltja a deriváltak szorzata”:</strong> SOHA! Mindig használd az <M t="uv'+vu'" /> képletet (vagy előbb bontsd fel a zárójelet).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>2. Fordított sorrend a hányadosszabályban:</strong> ha <M t="uv'-vu'" />-t írsz <M t="vu'-uv'" /> helyett, az egész válasz pontosan <M t="-1" />-szeres lesz!
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>3. Rossz irányba léptetett negatív kitevő:</strong> <M t="(x^{-3})' = -3x^{-4}" />, mert <M t="-3-1=-4" /> (sokan tévedésből <M t="-2" />-t írnak!).
          </p>
        </Warn>
        <Warn>
          <p>
            <strong>4. Felesleges hányadosszabály konstansnál:</strong> <M t="\dfrac{x^4}{7}" /> nem igazi hányados — írd át <M t="\dfrac{1}{7}x^4" />-re, így azonnal <M t="\dfrac{4}{7}x^3" />!
          </p>
        </Warn>
      </>
    ),
  },

  // ---------------------------------------------------------------- 8
  {
    title: 'Lépcsőzetes gyakorlófeladatok (könnyűtől a haladóig)',
    body: (
      <>
        <p>
          Az alábbi 9 feladat három nehézségi szintre van bontva. Haladj sorban, és próbáld önállóan megoldani őket, mielőtt kinyitod a megoldást!
        </p>

        <h3>Könnyebb (alapozó) feladatok</h3>
        <Task
          n={13}
          q={
            <>
              Számítsd ki az első és a második deriváltat: <M t="y=3x^4-5x^2+7x-4" />!
            </>
          }
        >
          <p>
            <M t="y'=12x^3-10x+7" />, <M t="y''=36x^2-10" />.
          </p>
        </Task>
        <Task
          n={14}
          q={
            <>
              Deriváld: <M t="f(x)=\dfrac{6}{x^2}-\dfrac{1}{x^5}+3x" />!
            </>
          }
        >
          <p>
            Átírva <M t="f(x)=6x^{-2}-x^{-5}+3x" />, tehát <M t="f'(x)=-12x^{-3}+5x^{-6}+3=-\dfrac{12}{x^3}+\dfrac{5}{x^6}+3" />.
          </p>
        </Task>
        <Task
          n={15}
          q={
            <>
              Deriváld a szorzatszabállyal (majd ellenőrizd kibontva): <M t="g(t)=(3t-1)(t^2+4)" />!
            </>
          }
        >
          <p>
            <M t="g'(t)=(3t-1)(2t)+(t^2+4)(3)=6t^2-2t+3t^2+12=9t^2-2t+12" />.
          </p>
        </Task>

        <h3>Közepes nehézségű feladatok</h3>
        <Task
          n={16}
          q={
            <>
              Deriváld a hányadosszabállyal: <M t="h(x)=\dfrac{x^2-4}{x+3}" />!
            </>
          }
        >
          <p>
            <M t="h'(x)=\dfrac{(x+3)(2x)-(x^2-4)(1)}{(x+3)^2}=\dfrac{2x^2+6x-x^2+4}{(x+3)^2}=\dfrac{x^2+6x+4}{(x+3)^2}" />.
          </p>
        </Task>
        <Task
          n={17}
          q={
            <>
              Tudjuk, hogy <M t="u(1)=2" />, <M t="u'(1)=0" />, <M t="v(1)=5" /> és <M t="v'(1)=-1" />. Számítsd ki az <M t="x=1" /> helyen: (a) <M t="(7v-2u)'" />, (b) <M t="(uv)'" />, (c) <M t="(v/u)'" />!
            </>
          }
        >
          <p>
            (a) <M t="7(-1)-2(0)=-7" />. (b) <M t="2(-1)+5(0)=-2" />.
          </p>
          <p>
            (c) <M t="\dfrac{u(1)v'(1)-v(1)u'(1)}{u(1)^2}=\dfrac{2(-1)-5(0)}{4}=-\dfrac{1}{2}" />.
          </p>
        </Task>
        <Task
          n={18}
          q={
            <>
              Írd fel az <M t="y=x^3-4x+1" /> görbe <M t="(2;\,1)" /> pontbeli érintőjének és normálisának egyenletét! Melyik pontban a legkisebb a görbe meredeksége?
            </>
          }
        >
          <p>
            <M t="y'=3x^2-4" />, így <M t="x=2" />-ben <M t="m=8" />. Érintő: <M t="y=1+8(x-2)=8x-15" />. Normális (<M t="m_\perp=-1/8" />): <M t="y=1-\dfrac{1}{8}(x-2)=-\dfrac{1}{8}x+\dfrac{5}{4}" />.
          </p>
          <p>
            Mivel <M t="3x^2\ge 0" />, a meredekség <M t="x=0" />-ban, a <M t="(0;\,1)" /> pontban a legkisebb (értéke <M t="-4" />).
          </p>
        </Task>

        <h3>Nehezebb (haladó) feladatok</h3>
        <Task
          n={19}
          q={
            <>
              Írd fel az <em>Agnesi-görbe</em> (<M t="y=\dfrac{8}{x^2+4}" />) <M t="(2;\,1)" /> pontbeli érintőjének egyenletét!
            </>
          }
        >
          <p>
            Hányadosszabállyal: <M t="y'=\dfrac{(x^2+4)\cdot 0 - 8\cdot 2x}{(x^2+4)^2}=\dfrac{-16x}{(x^2+4)^2}" />.
          </p>
          <p>
            Az <M t="x=2" /> helyen <M t="m=\dfrac{-32}{8^2}=-\dfrac{1}{2}" />. Az érintő: <M t="y=1-\dfrac{1}{2}(x-2)=-\dfrac{1}{2}x+2" />.
          </p>
        </Task>
        <Task
          n={20}
          q={
            <>
              Az <M t="y=x^2+ax+b" /> és az <M t="y=cx-x^2" /> parabolák az <M t="(-1;\,0)" /> pontban érintik egymást (közös a pontjuk és az ottani érintőjük is). Határozd meg <M t="a" />, <M t="b" /> és <M t="c" /> értékét!
            </>
          }
        >
          <p>
            1. Mindkettő átmegy <M t="(-1;\,0)" />-n: <M t="1-a+b=0" /> és <M t="-c-1=0 \Rightarrow c=-1" />.
          </p>
          <p>
            2. A deriváltak <M t="x=-1" />-ben megegyeznek: <M t="2(-1)+a = c - 2(-1) \iff -2+a = -1+2=1 \Rightarrow a=3" />.
          </p>
          <p>
            Végül <M t="b=a-1=2" />. Tehát <M t="a=3" />, <M t="b=2" />, <M t="c=-1" />.
          </p>
        </Task>
        <Task
          n={21}
          q={
            <>
              Keresd meg az <M t="f(x)=\dfrac{1}{x}" /> függvény 1., 2., 3. és 4. deriváltját, majd írd fel az általános <M t="f^{(n)}(x)" /> képletet tetszőleges pozitív egész <M t="n" />-re!
            </>
          }
        >
          <p>
            <M t="f'(x)=-1\cdot x^{-2}" />, <M t="f''(x)=2\cdot x^{-3}" />, <M t="f'''(x)=-6\cdot x^{-4}" />, <M t="f^{(4)}(x)=24\cdot x^{-5}" />.
          </p>
          <p>
            Az előjel váltakozik (<M t="(-1)^n" />), az együttható pedig <M t="n!" /> (faktoriális):
          </p>
          <M block t="f^{(n)}(x) = \frac{(-1)^n \, n!}{x^{n+1}}." />
        </Task>
      </>
    ),
  },
];
