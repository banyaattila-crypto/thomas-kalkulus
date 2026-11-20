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
npm run dev      # fejlesztői szerver
npm run build    # kimenet: docs/index.html
```

A GitHub Pages beállítása: Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, mappa: `/docs`.

## Szerkezet

- `src/data/toc.ts`: a három kötet fejezet- és szakaszsorrendje
- `src/content/`: szakaszonkénti tartalom (oldalak)
- `src/components/`: képletek (KaTeX), számegyenes és interaktív eszközök
