# Kalkulus – látványos tananyag

Interaktív, vizuális kalkulus-tananyag, amely a *Thomas-féle Kalkulus* (I–III. kötet, Typotex, 2006) fejezet- és szakaszsorrendjét követi.

A szövegek, a példák, a feladatok és az ábrák **saját készítésűek**; az oldal a könyv tematikáját követi, de nem a szövegét. Nem hivatalos kiegészítő, nem üzleti célú.

## Állapot

| Szakasz | Állapot |
|---|---|
| 1.1. A valós számok és a valós számegyenes | kész |
| a többi szakasz | folyamatban |

## Fejlesztés

```bash
npm install
npm run dev      # fejlesztői szerver (sablon: app.html)
npm run build    # kimenet: index.html és docs/index.html
```

A GitHub Pages bármelyik beállítással működik: Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, mappa: `/ (root)` vagy `/docs`. A build mindkét helyre a kész oldalt írja (`index.html` és `docs/index.html`).

## Szerkezet

- `src/data/toc.ts`: a három kötet fejezet- és szakaszsorrendje
- `src/content/`: szakaszonkénti tartalom (oldalak)
- `src/components/`: képletek (KaTeX), számegyenes és interaktív eszközök
