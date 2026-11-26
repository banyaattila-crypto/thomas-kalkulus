# Kalkulus – látványos tananyag

Interaktív, vizuális kalkulus-tananyag, amely a *Thomas-féle Kalkulus* (I–III. kötet, Typotex, 2006) fejezet- és szakaszsorrendjét követi.

A szövegek, a példák, a feladatok és az ábrák **saját készítésűek**; az oldal a könyv tematikáját követi, de nem a szövegét. Nem hivatalos kiegészítő, nem üzleti célú.

## Állapot

| Szakasz | Állapot |
|---|---|
| 1.1–1.7 (1. fejezet: Bevezetés) | kész |
| 2.1–2.7 (2. fejezet: Határérték és folytonosság) | kész |
| 3.1–3.8 (3. fejezet: Differenciálás) | kész |
| 4.1–4.8 (4. fejezet: A derivált alkalmazásai) | kész *(I. kötet teljes!)* |
| 5.1–5.6 (5. fejezet: Integrálszámítás) | kész *(5. fejezet teljes!)* |
| 6.1–6.7 (6. fejezet: A határozott integrál alkalmazásai) | kész *(6. fejezet teljes!)* |
| 7.1–7.8 (7. fejezet: Transzcendens függvények) | kész *(7. fejezet teljes!)* |
| 8.1–8.8 (8. fejezet: Integrálási technikák) | kész *(8. fejezet teljes!)* |
| 9.1–9.5 (9. fejezet: Az integrálás további alkalmazásai) | kész *(II. kötet teljes!)* |
| 10.1–10.8 (10. fejezet: Kúpszeletek és polárkoordináták) | kész *(10. fejezet teljes!)* |
| 11.1–11.11 (11. fejezet: Sorozatok és végtelen sorok) | kész *(11. fejezet teljes!)* |
| 12.1–12.6 (12. fejezet: Vektorok és a tér geometriája) | kész *(12. fejezet teljes!)* |
| 13.1–13.6 (13. fejezet: Vektor értékű függvények, mozgás a térben) | kész *(13. fejezet teljes!)* |
| 14.1–14.6 (14. fejezet: Parciális deriváltak) | folyamatban (14.1–14.6 kész — 101/120) |

## Fejlesztés

```bash
npm install
npm run dev          # fejlesztői szerver
npm run build        # webes, code-split build (kimenet: dist/)
npm run build:single # opcionális egyfájlos offline HTML (kimenet: dist/index.html)
```

A publikálás automatikusan történik a `.github/workflows/deploy.yml` munkafolyamattal (GitHub Settings → Pages → Source: **GitHub Actions**). Minden szakasz külön JS-chunkba fordul és csak megnyitáskor töltődik be.

## Szerkezet

- `src/data/toc.ts`: a három kötet fejezet- és szakaszsorrendje
- `src/content/`: szakaszonkénti tartalom (oldalak, dinamikus importtal)
- `src/components/`: képletek (KaTeX), számegyenes és interaktív eszközök
