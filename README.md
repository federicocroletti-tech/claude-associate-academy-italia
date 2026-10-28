# Claude Associate Academy Italia

Percorso didattico indipendente e trasparente sul tema dell'AI e di Claude, sviluppato come app web in Angular.

## Obiettivo

Questo progetto vuole essere una risorsa di studio pratica e autonoma, senza fare affermazioni di approvazione, certificazione o sponsorizzazione da parte di Anthropic.

## Contenuto

- curriculum modulare in italiano
- sezione di approfondimento e fonti ufficiali
- quiz interattivi con feedback
- salvataggio del progresso in localStorage
- progressi privati e limitati al browser corrente; non vengono sincronizzati con un account o un server

## Verifica ufficiale

Il progetto è indipendente e non presenta alcuna certificazione ufficiale o approvazione di Anthropic. Il percorso è un laboratorio di apprendimento basato su risorse pubbliche e documentate.

## Sviluppo locale

```bash
npm install
npm run build
npm start
```

Il progetto esporta l'app Angular in `dist/claude-associate-academy-italia/browser` e serve la build tramite Express.

## Deploy su GitHub Pages

Il workflow GitHub Actions pubblica la build statica su GitHub Pages. I progressi restano nel localStorage del browser.

## Deploy alternativo su Render

Il repository include anche un file `render.yaml` per servire la build con Node/Express e offrire l'endpoint di health check.

## Fonti principali

- Anthropic documentation and public certification materials
- Anthropic Partner Network / Skilljar / Pearson VUE references
- documentazione pubblica verificata e citata nel percorso
