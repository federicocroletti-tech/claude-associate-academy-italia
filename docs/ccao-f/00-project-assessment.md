# CCAO-F — valutazione iniziale del progetto

**Data dell'analisi:** 5 novembre 2026
**Repository esaminato:** `claude-associate-academy-italia`
**Commit osservato:** `8e546d5` — `Add reliable Academy progress reset`
**Stato iniziale del worktree:** pulito
**Perimetro:** ricognizione in sola lettura del progetto e dei controlli esistenti. In questo step non sono stati modificati sorgenti applicativi.

## 1. Sintesi dello stato attuale

Il repository è una web app didattica già esistente, non uno scheletro da sostituire:

- frontend Angular standalone, TypeScript strict e SCSS;
- rendering SSR/prerender tramite Angular SSR;
- server Node/Express con file statici e un endpoint di health check;
- moduli didattici tipizzati in TypeScript;
- stato di completamento salvato nel `localStorage` del browser, senza account o sincronizzazione;
- workflow GitHub Actions per test dei contenuti e pubblicazione su GitHub Pages; configurazione di deploy alternativa su Render.

Lo scopo attuale è un percorso indipendente di apprendimento tecnico su Claude e AI, non un corso che dichiari di seguire un blueprint CCAO-F verificato. L'interfaccia avverte già che il nome «Claude Associate» non è verificato come certificazione ufficiale e distingue la certificazione Architect – Foundations documentata dal progetto. La corrispondenza tra la certificazione richiesta e le fonti ufficiali resta da rivalutare nello STEP 2, senza assumere come dato certo il codice CCAO-F o i sette domini forniti nella richiesta.

La cartella di lavoro superiore contiene altri progetti indipendenti e un prototipo statico `ai-certification-study-lab`; non è la root Git. Questo rapporto riguarda esclusivamente il repository `claude-associate-academy-italia`, che è il progetto versionato con finalità e contenuti più direttamente pertinenti. Il prototipo statico non viene incorporato né modificato.

## 2. Architettura e funzionalità esistenti

| Area | Stato osservato |
|---|---|
| UI | Una pagina Angular standalone (`AcademyPageComponent`) visualizza panoramica, moduli, lezione, ripasso/quiz, risultato e fonti. La navigazione interna usa un signal `page`, non percorsi URL distinti; il router Angular espone la root e reindirizza gli altri percorsi alla root. |
| Contenuti | `MODULES` è una raccolta TypeScript tipizzata con 17 moduli, numerati da 0 a 16. Ogni modulo contiene obiettivo, spiegazione semplice e tecnica, argomenti, esercitazione e una domanda a risposta singola. |
| Quiz | Sessione sequenziale delle 17 domande, una per modulo; feedback con spiegazione della risposta corretta e motivazioni delle alternative errate; riepilogo del punteggio. Il quiz non è una simulazione d'esame ufficiale. |
| Progressi | `ProgressService` registra soltanto gli ID dei moduli completati in `localStorage`. Legge e filtra gli ID rispetto ai moduli noti, segnala errori di memoria e consente un reset confermato. Nessuna persistenza account/server. |
| Fonti | La pagina associa ai moduli collegamenti a documentazione Anthropic e di terzi. I dati dei collegamenti sono nel componente e non in un registro strutturato con provenienza e stato per affermazione. |
| Server | Express serve l'app SSR e `/api/health`. Non risultano endpoint per utenti, progressi, quiz o contenuti; non è presente autenticazione né database applicativo. |
| Qualità/CI | Test Node per i contenuti; test Node del health endpoint e dell'assenza dell'endpoint `/api/progress`; workflow Pages che esegue `npm ci`, `npm test` e build per Pages. Non è configurato uno script lint. |

### Materiale didattico già disponibile

Il curriculum presente copre orientamento, fondamenti LLM, AI Fluency, prompt engineering, API Anthropic, structured output, tool use, MCP, RAG, agenti/workflow, Claude Code, evaluation, sicurezza, produzione, cloud provider, governance e preparazione tecnica indipendente. Il materiale è in italiano e conserva diversi termini tecnici inglesi.

Sono già riutilizzabili:

- micro-lezioni con spiegazione semplice e spiegazione più tecnica;
- obiettivi e argomenti per modulo;
- esercitazioni pratiche;
- domande originali a scelta singola e spiegazioni degli errori;
- stato di avanzamento per modulo;
- sezione fonti e avvertenze di indipendenza/non affiliazione;
- layout responsive e alcuni accorgimenti accessibili (landmark, etichette, stato ARIA, focus visibile).

La raccolta attuale non contiene flashcard, lezioni da 400–700 parole o sintesi multilivello, esempi strutturati con confronto tra opzioni, sessioni guidate secondo il formato richiesto, né domande a risposta multipla. Le 17 lezioni e i relativi quiz sono un punto di partenza riusabile, non ancora un modulo pilota conforme al brief.

## 3. Parti mancanti rispetto all'obiettivo

1. **Allineamento alla certificazione:** mancano una mappatura verificata tra Exam Guide e obiettivi didattici, i pesi ufficiali e il registro delle verifiche. La struttura corrente è tecnica e non è già suddivisa nei sette domini dichiarati.
2. **Provenienza editoriale:** non sono modellati `Source`, identificativi di obiettivi d'esame, stato `VERIFIED_OFFICIAL`/altri stati, versioni, data di validità, responsabile della verifica o changelog per singolo contenuto. README e pagina fonti riportano date di consultazione diverse (15 e 21 ottobre 2026); occorre un'unica fonte di verità e riconciliazione editoriale.
3. **Didattica richiesta:** mancano flashcard, active recall strutturato, modalità energia bassa, ripassi pianificati, interleaving, apprendimento dagli errori ripetuti e contenuti specifici per obiettivo con criteri di verifica.
4. **Quiz e simulazioni:** l'attuale modello supporta una sola risposta corretta e una domanda per modulo. Mancano risposta multipla con cardinalità dichiarata, tag, difficoltà, spiegazioni per opzione strutturate, storico tentativi, selezione per dominio, test progressivi/finali e report d'errore.
5. **Dashboard e prontezza:** è mostrata la percentuale di moduli completati e il risultato della sessione corrente; non esistono accuratezza storica/per dominio, copertura degli obiettivi, stabilità nel tempo, aree deboli o stima motivata della preparazione.
6. **Modello e validazione:** non ci sono entità separate per certificazione/domini/obiettivi, lezioni, esempi, flashcard, tentativi, sessioni, calendario di ripasso, progressi o record di verifica. I controlli esistenti non verificano riferimenti a fonti esistenti, stato di verifica, opzioni duplicate, cardinalità di risposte multiple, link o distribuzioni.
7. **Manutenzione e documentazione:** nel repository non esiste la directory `docs/ccao-f/`; vanno creati i documenti richiesti e un processo di aggiornamento che non promuova dati non verificati a fatti.

## 4. Rischi e debito tecnico osservati

- **Rischio editoriale primario:** il nome e il codice CCAO-F non sono dichiarati verificati nell'app. I contenuti tecnici già presenti non dimostrano copertura dell'esame richiesto. Non vanno presentati come programma ufficiale né usati per inferire formato o soglia d'esame.
- **Rischio di freschezza:** informazioni su modelli, funzionalità, policy e URL possono cambiare. Il registro attuale fornisce collegamenti e date di consultazione a livello di pagina, senza collegare in modo verificabile ogni singola affermazione alla relativa versione della fonte.
- **Rischio di misura:** il completamento manuale di un modulo è la sola metrica persistente; può sovrastimare la preparazione e non misura ritenzione o accuratezza.
- **Limite di persistenza:** cancellazione/blocco dei dati browser o cambio dispositivo comportano perdita/non disponibilità dei progressi; è una scelta coerente con la privacy dichiarata, da mantenere esplicita finché non venga richiesto un account.
- **Limite di estendibilità:** dati e interfaccia sono raggruppati in un singolo file curriculum e un componente principale; la mappa fonti è nel componente. Aggiungere i nuovi contenuti direttamente in questi punti aumenterebbe accoppiamento e difficoltà di verifica.
- **Copertura dei test:** i test controllano identificativi e campi obbligatori delle domande e verificano l'endpoint health, ma non il comportamento UI, la persistenza browser, accessibilità, scheduling, punteggio storico o qualità dei collegamenti.
- **Inventario progetto:** la cartella superiore non è un repository e include vari progetti. I prossimi interventi devono restare nella root Git `claude-associate-academy-italia`; il prototipo statico sibling non va trattato come parte di questo repository.

Questi punti sono osservazioni di ricognizione, non una revisione di sicurezza o un audit completo di accessibilità.

## 5. Proposta di integrazione

1. Proseguire con lo STEP 2: verificare accessibilità e contenuto delle fonti richieste, con priorità alle fonti ufficiali; registrare esplicitamente le fonti non accessibili e non dedurre il blueprint dai moduli esistenti.
2. Prima di ampliare il curriculum, definire il modello didattico e dati nello STEP 3. Separare dati di certificazione/fonti, contenuti, logica di scheduling e stato utente; mantenere i dati di studio sul dispositivo nella prima iterazione, coerentemente con l'app attuale.
3. Usare il codice esistente come base: conservare shell, stile, lezione e flusso di quiz dove adeguati, estendendo i tipi senza rimuovere proprietà in uso. Organizzare contenuti per dominio/obiettivo e aggiungere validazione automatica; non duplicare l'app.
4. Implementare e convalidare un solo modulo pilota (preferibilmente Output Evaluation and Validation) prima di modificare gli altri moduli o stimare la readiness complessiva.
5. Solo dopo l'approvazione del pilota, estendere progressivamente i domini, il ripasso e le simulazioni. Evitare di introdurre backend/account finché non emerge un requisito concreto di sincronizzazione.

## 6. File suggeriti per le fasi successive

L'elenco è una proposta d'integrazione, non un'autorizzazione a procedere oltre lo STEP 1.

### Documentazione richiesta

- **Creare** `docs/ccao-f/00-project-assessment.md` (questo rapporto).
- **Creare** `docs/ccao-f/01-source-inventory.md`, `docs/ccao-f/02-exam-objectives-matrix.md`, `docs/ccao-f/03-learning-design.md`, `docs/ccao-f/04-content-maintenance.md` e `docs/ccao-f/CHANGELOG.md` negli step previsti.
- **Aggiornare** `README.md` dopo aver definito il rapporto effettivo tra progetto e certificazione e il perimetro editoriale verificato.

### Dati e logica applicativa, da definire nello STEP 3

- **Creare** `src/app/core/ccao-f/` per tipi/modelli, registro fonti, contenuti e validazione; mantenere un confine distinto per scheduling e stato di studio.
- **Estendere con compatibilità** `src/app/core/learning-data.ts` solo dove necessario per migrare o collegare i moduli esistenti agli obiettivi; non eliminare i campi consumati dalla UI prima di averli sostituiti.
- **Evolvere** `src/app/core/progress.service.ts` per registrare tentativi e ripassi se e quando il modello approvato lo richiede, mantenendo gestione esplicita degli errori di storage.
- **Integrare** contenuti nelle viste esistenti tramite `src/app/features/academy-page.component.ts`, `academy-page.component.html` e `academy-page.component.scss`. Modificare `src/app/app.routes.ts` solo se i flussi approvati necessitano realmente di URL distinti.

### Test e automazione

- **Estendere** `tests/learning-data.test.ts` per struttura, fonti, obiettivi, opzioni e stati di verifica.
- **Creare** test unitari dedicati per validazione contenuti e scheduler; aggiungere test UI/integration per sessione e persistenza quando il relativo flusso verrà implementato.
- **Aggiornare** `.github/workflows/deploy-pages.yml` solo se le nuove verifiche richiedono un passaggio CI aggiuntivo; conservare i controlli già presenti.

## 7. Verifiche iniziali

- `npm test`: **superato**, 2 test.
- `npm run build`: **superato** (Angular production/SSR e compilazione TypeScript server); warning preesistente: `academy-page.component.scss` è 12,88 kB, sopra il warning budget di 12 kB ma sotto l'errore budget di 20 kB.
- `npm run test:server`: **superato**, 1 test.
- Script lint: **non presente** in `package.json`.
- Verifiche di accessibilità, responsive browser e flussi end-to-end: **non eseguite** in questo step.

## 8. Prossimo passo consigliato

**STEP 2 — inventariare e verificare le fonti e gli obiettivi d'esame, senza ancora ampliare il curriculum o modificare l'applicazione.**
