# CCAO-F — modello didattico e proposta del modello dati

**Data:** 5 novembre 2026
**Perimetro:** progettazione dello STEP 3. Questo documento descrive un modello, non implementa il modulo pilota né modifica il codice applicativo.
**Blueprint di riferimento:** *Claude Certified Associate – Foundations Exam Guide*, v1.0, effective July 2026 (inventario S01; obiettivi e pesi in [02-exam-objectives-matrix.md](./02-exam-objectives-matrix.md)). Pearson VUE ha annunciato la disponibilità di una guida aggiornata dal 17 novembre 2026 e un aggiornamento degli item dal 7 dicembre 2026: il modello deve versionare il blueprint e i contenuti, senza congelare pesi o nomi delle feature.

## 1. Principi didattici

1. **Un obiettivo alla volta.** Ogni attività ha un solo obiettivo primario riconducibile a un `objectiveId`; il suo dominio ufficiale resta visibile. Non confondere gli obiettivi del blueprint con il curriculum tecnico già presente nell'app.
2. **Recuperare prima di rileggere.** Alternare breve richiamo senza appunti, studio mirato e verifica; mostrare spiegazioni dopo la risposta, non prima.
3. **Pratica con feedback.** Gli esempi partono da scenari di lavoro quotidiano e mostrano perché una scelta è appropriata e perché le alternative lo sono meno.
4. **Spaced repetition basata sulla prestazione.** Pianificare card e concetti da ripassare, accelerare dopo gli errori e registrare il risultato; non riproporre subito lo stesso quesito.
5. **Interleaving moderato.** Dopo avere introdotto il singolo obiettivo, mescolare al massimo un breve richiamo da un obiettivo già studiato. Non mescolare domini nuovi nella stessa micro-sessione.
6. **Inglese funzionale.** Conservare il termine inglese accanto alla spiegazione italiana quando compare nel blueprint o nell'interfaccia Claude; le informazioni sull'eventuale lingua dell'esame restano da verificare.
7. **Tracciabilità e prudenza.** Ogni contenuto pubblicabile ha fonti e stato di verifica; distinguere istruzione ufficiale, evidenza secondaria e esempio didattico originale. Nessuna domanda viene presentata come quesito reale Anthropic.
8. **Niente sovraccarico.** Offrire un'unica azione principale alla volta, una sintesi scansionabile e istruzioni di ripresa brevi.

## 2. Sessione standard (20–25 minuti)

| Fase | Tempo indicativo | Attività e risultato |
|---|---:|---|
| Richiamo prerequisiti | 2 min | 1–2 domande brevi su concetti già visti; se l'errore è ripetuto, suggerire un ripasso mirato prima della lezione nuova. |
| Spiegazione | 5–6 min | Una lezione in italiano sul singolo obiettivo, con termini inglesi, concetti essenziali, errori comuni e criteri per decidere. Includere il livello di affidabilità editoriale. |
| Esempio guidato | 3–4 min | Scenario concreto con contesto, problema, alternative, scelta, motivazione, limiti delle alternative e fonte. Può includere un controesempio esplicito. |
| Richiamo attivo e feedback | 5–7 min | 3–5 quiz sul medesimo obiettivo; risposta singola o multipla dichiarata, seguita da spiegazione della risposta corretta e di ciascun distrattore. |
| Sintesi personale | 2–3 min | Domanda finale senza opzioni: l'utente formula la regola da ricordare; poi può rivelare la scheda di ripasso (massimo 10 punti). |
| Pianificazione | 1 min | Registrare esiti e proporre la prossima attività o data di ripasso, spiegando il motivo. |

Il tempo è una guida, non un limite che tronca un'esercitazione. Un quiz corretto non segna da solo il modulo come padroneggiato.

### Modalità energia bassa (5–10 minuti)

- Un obiettivo già introdotto; nessuna lezione lunga o contenuto nuovo denso.
- Una sintesi rapida da 100–150 parole, oppure la scheda di ripasso.
- Tre flashcard distinte, con risposta rivelabile dopo il tentativo.
- Una domanda di richiamo attivo.
- Un solo suggerimento per la prossima sessione; salvare il progresso come ripasso, senza attribuire completamento automatico all'intero dominio.

## 3. Unità editoriali e contenuti

### Lezione e sintesi

Ogni `Lesson` copre un `ExamObjective` primario e include spiegazione in italiano, termini inglesi, concetti essenziali, errori comuni, criterio decisionale, esempio, controesempio, cosa ricordare e riferimenti. La lezione standard è un'entità; sintesi rapida e scheda sono entità `Summary` collegate, così restano tre viste dello stesso obiettivo senza duplicare o divergere i testi:

- `Summary(level=QUICK)`: 100–150 parole;
- `standardLesson`: 400–700 parole;
- `Summary(level=REVIEW)`: massimo 10 punti.

La lunghezza è una regola editoriale da validare automaticamente con test, con eccezioni esplicite soltanto se approvate in revisione.

### Esempi

Un esempio illustra un solo concetto centrale e segue uno schema stabile: contesto, problema, opzioni plausibili, scelta migliore, motivazione, perché le alternative sono meno adatte, limite o rischio, `sourceIds` e stato. Gli scenari sono originali e non ricostruiscono quesiti d'esame.

### Flashcard

Ogni card verifica preferibilmente un solo concetto. `type` distingue definizione, comprensione, applicazione, confronto, scenario, riconoscimento dell'errore e reverse card. Fronte breve; retro e spiegazione separati; un esempio aiuta a trasferire la regola. Gli ID sono stabili nel contenuto e non dipendono dall'ordine di visualizzazione.

### Domande e feedback

- `SINGLE_SELECT`: esattamente una risposta corretta.
- `MULTI_SELECT`: `selectCount` esplicito e uguale al numero di opzioni corrette; non pubblicare l'item se l'istruzione non chiarisce quante scelte effettuare.
- Ogni opzione ha un'identità stabile e una spiegazione individuale; per le corrette si spiega il principio, per le errate l'errore di ragionamento.
- Aggiungere dominio, obiettivo, difficoltà, tempo didattico, tag, fonti, stato editoriale e dichiarazione che il quesito è un esercizio originale.
- La v1.0 documenta item single- e multiple-response, ma non specifica qui nel modello una formula di scoring per risposte parziali: non inventarla. Il simulatore didattico userà una regola di punteggio trasparente, etichettata come pedagogica e distinta dal punteggio scalato ufficiale.

### Sessioni e simulazioni

Le attività da 5/10 domande sono verifiche formative, non un facsimile dell'esame. I test per dominio e l'intermedia vanno generati solo da quesiti validati per obiettivi. Una simulazione completa dovrà essere ridistribuita secondo la guida corrente, includere item originali singoli e multipli, rispettare i limiti di tempo verificati e produrre report per dominio, obiettivo ed errori ricorrenti. Il numero e la durata della v1.0 (60 item, 120 minuti) possono essere mostrati come metadati storici/versionati; non usarli per la configurazione definitiva successiva all'aggiornamento annunciato.

## 4. Proposta del modello dati

### Confini

Separare tre responsabilità:

1. **Blueprint e contenuti editoriali, read-only nell'app:** certificazione, versione del blueprint, domini, obiettivi, fonti, lezioni, esempi, flashcard e domande.
2. **Stato locale dello studente:** risposte, sessioni, pianificazione, progresso e aree deboli. Per la prima iterazione usare il browser, in continuità con `localStorage`; nessun account o invio a un server.
3. **Verifica e manutenzione editoriale:** record di verifica e cronologia fonti, separati dalle metriche dello studente. Un contenuto `OUTDATED` va archiviato o sostituito versionandolo, non sovrascritto senza traccia.

Riferimenti tra oggetti tramite ID stabili; date serializzate ISO 8601 UTC. Contenuto, statistiche personali e stato di verifica non vanno aggregati in un unico oggetto mutabile.

### Entità previste

| Entità | Campi essenziali proposti | Confini e vincoli |
|---|---|---|
| `Certification` | `id`, `name`, `examCode`, `issuer`, `blueprintVersion`, `validFrom`, `validUntil`, `lastVerifiedAt`, `verificationStatus`, `sourceIds`, `changeLog` | Un record per versione rilevante; distinguere il nome ufficiale da eventuali etichette locali dell'app. |
| `ExamDomain` | `id`, `certificationId`, `name`, `weightPercent`, `order`, `blueprintVersion`, `sourceIds`, `verificationStatus` | Il peso vale solo per la versione del blueprint collegata; controllare somma e domini univoci per versione. |
| `ExamObjective` | `id`, `domainId`, `text`, `order`, `blueprintVersion`, `sourceIds`, `verificationStatus` | Identificatore stabile per collegare lezioni, esempi, card e domande; testo riformulato se non è opportuno copiarlo. |
| `Source` | `id`, `title`, `url`, `publisher`, `sourceType`, `officiality`, `language`, `publishedAt?`, `sourceVersion?`, `lastVerifiedAt`, `validFrom?`, `validUntil?`, `verificationStatus`, `limitations`, `usageNotes` | URL e stato riferiti alla fonte; una fonte secondaria non promuove automaticamente claim a `VERIFIED_OFFICIAL`. |
| `Lesson` | `id`, `domainId`, `objectiveIds`, `title`, `terms`, `standardLesson`, `summaryIds`, `commonErrors`, `decisionCriteria`, `exampleIds`, `counterexample`, `sourceIds`, `verificationStatus`, `updatedAt` | La lezione standard e i riferimenti vengono convalidati; una lezione può coprire più obiettivi solo se ciascuno è dichiarato. |
| `Summary` | `id`, `lessonId`, `level` (`QUICK`/`REVIEW`), `body`, `wordLimit`, `sourceIds`, `verificationStatus` | Le sintesi rapide e le schede di ripasso sono viste riusabili collegate alla lezione, senza duplicare testi divergenti. |
| `Example` | `id`, `domainId`, `objectiveIds`, `context`, `problem`, `options`, `bestChoiceId`, `rationale`, `alternativeRationales`, `limitations`, `sourceIds`, `verificationStatus`, `isOriginalPractice` | Opzioni plausibili; `isOriginalPractice` deve essere `true` per materiale originale presentato nell'app. |
| `Flashcard` | `id`, `domainId`, `objectiveId`, `type`, `difficulty`, `front`, `back`, `explanation`, `example`, `tags`, `sourceIds`, `verificationStatus`, `reviewInterval`, `createdAt` | Una card controlla un concetto; `reviewInterval` è un valore iniziale editoriale. La vista utente può esporre `reviewedAt`, ma l'ultimo tentativo resta nello stato di ripasso, non nel contenuto condiviso. |
| `QuizQuestion` | `id`, `domainId`, `objectiveId`, `type`, `difficulty`, `stem`, `simplifiedEnglish?`, `options`, `selectCount`, `correctOptionIds`, `explanation`, `sourceIds`, `verificationStatus`, `tags`, `estimatedTimeSeconds`, `isOriginalPractice` | `SINGLE_SELECT` richiede un ID corretto; `MULTI_SELECT` richiede `selectCount === correctOptionIds.length`; opzioni con ID univoci e spiegazione. |
| `QuizAttempt` | `id`, `questionId`, `selectedOptionIds`, `isCorrect`, `occurredAt`, `responseTimeSeconds`, `sessionId`, `confidence?` | Solo stato utente locale; evitare di salvare testo libero sensibile. Il risultato è ricalcolabile dai dati, non una proprietà editoriale. |
| `StudySession` | `id`, `mode`, `startedAt`, `completedAt?`, `objectiveIds`, `activityIds`, `attemptIds`, `resultSummary`, `sourceSnapshot?` | Registra una sessione rapida/standard/esercitazione/simulazione e la versione del contenuto utilizzata. |
| `ReviewSchedule` | `id`, `flashcardId`, `dueAt`, `box`, `lastGrade`, `lastReviewedAt?`, `consecutiveCorrect`, `repeatedErrors`, `history` | Stato personale derivato dai tentativi, versionabile e sottoposto a test; separato dal `reviewInterval` editoriale. |
| `Progress` | `learnerId` locale, `completedLessonIds`, `completedObjectiveIds`, `attemptIds`, `sessionIds`, `lastActivityAt`, `schemaVersion` | Memoria limitata al browser. Mantenere reset/esportazione eventuali; migrare chiave legacy senza perdere i moduli completati. |
| `WeakArea` | `domainId`, `objectiveId`, `errorCount`, `recentAccuracy`, `repeatedErrorCount`, `lastErrorAt`, `recommendedActivityId`, `reason` | Calcolata dai tentativi recenti; spiegare perché l'area è debole, evitare una valutazione definitiva con pochi dati. |
| `MockExam` | `id`, `blueprintVersion`, `questionIds`, `questionCount`, `timeLimitSeconds`, `domainDistribution`, `isOfficial`, `createdAt`, `retiredAt?` | Le simulazioni del progetto hanno `isOfficial: false`; la distribuzione va derivata da una guida verificata e ricalcolata per versione. |
| `VerificationRecord` | `id`, `claimOrContentId`, `sourceId`, `verificationStatus`, `checkedAt`, `checkedBy`, `sourceVersion`, `validFrom?`, `validUntil?`, `notes`, `changeLog` | Traccia claim/verifica, divergenze e sostituzioni; non elimina verifiche precedenti. |

`Certification` e il titolo possono identificare la certificazione; il versionamento del blueprint rimane obbligatorio per dati e simulazioni. Le proprietà richieste nel brief (per esempio `createdAt`, `reviewedAt`, `reviewInterval`, `sourceIds` e `verificationStatus`) sono incluse nel disegno delle card; in implementazione le date di contenuto e quelle dei tentativi personali dovranno restare distinguibili.

## 5. Contratti e validazione proposta

Il progetto usa interfacce TypeScript in `src/app/core/learning-data.ts`, non una libreria di schema/runtime validation. Per minimizzare impatto:

- conservare i campi `AcademyModule` e `AcademyQuestion` finché la vista corrente li usa;
- introdurre gli ID dei domini/obiettivi e tipi del curriculum CCAO-F come estensione versionata, anziché reinterpretare `MODULES` o rimuovere proprietà;
- mantenere contenuti editoriali tipizzati in TypeScript e aggiungere un validatore puro, eseguibile da Node nel test esistente, per controllare riferimenti e vincoli a runtime/build;
- non aggiungere Zod o una nuova dipendenza finché il semplice contratto TS più validatore deterministico soddisfa le regole; TypeScript da solo non convalida i dati JSON caricati da storage;
- trattare lo stato browser come input non attendibile: controllare `schemaVersion`, struttura, ID referenziati e valori prima di aggiornare segnali UI; su storage malformato usare le notifiche e il logging già adottati, senza success-shaped fallback;
- spostare la vecchia chiave di progresso `claude-academy-progress` solo con migrazione testata e retrocompatibile. In particolare i vecchi ID modulo non equivalgono automaticamente a obiettivi CCAO-F completati.

### Invarianti automatiche da richiedere

- ID univoci e riferimenti risolvibili tra domini, obiettivi, contenuti e fonti;
- stato di verifica presente su ogni contenuto e record fonti; controllo di `validFrom`/`validUntil`;
- percentuali dei domini valide per versione (i sette pesi v1.0 sommano a 100%); nessun vincolo implicito sull'esame aggiornato non ancora pubblicato;
- lezioni con tre livelli e limiti editoriali; esempi con decisione e motivazioni;
- flashcard brevi, con concetto singolo e intervallo valido;
- quiz con opzioni uniche, spiegazioni complete, almeno una risposta corretta, cardinalità dichiarata corretta e ID fonte validi;
- simulazioni non ufficiali esplicitamente marcate, con conteggio e distribuzione coerenti con il blueprint snapshot;
- progressi e scheduling deserializzati solo da una versione supportata; nessun tentativo duplicato causato dal re-render;
- link testabili solo come raggiungibilità momentanea, senza confondere errore di rete o paywall con inesistenza della fonte.

## 6. Principi per scheduling e misura (proposta)

### Ripasso iniziale: Leitner semplice

Adottare inizialmente una variante Leitner deterministica, facilmente testabile e spiegabile, non una stima SM-2 non calibrata:

- nuovi concetti in box 0;
- risposta corretta senza esitazione: avanzamento di un box, fino al box 4;
- risposta errata: ritorno al box 0 e riproposta del concetto con una card diversa o un quiz riformulato;
- intervalli didattici iniziali: box 0 = successiva sessione utile, box 1 = 1 giorno, box 2 = 3 giorni, box 3 = 7 giorni, box 4 = 14 giorni;
- una risposta corretta alla ripetizione rientra nel normale incremento, ma un errore ripetuto rimane registrato e mantiene priorità alta;
- non ripetere immediatamente lo stesso identico item dopo un errore: prima spiegazione e un altro item/esempio; ripianificare la stessa card dalla sessione successiva o secondo il suo box;
- ogni transizione salva un evento storico con esito, data, box precedente/nuovo e ID dell'attività; scheduling e dati editoriali sono separati.

Gli intervalli sono una configurazione iniziale da valutare, non una promessa scientifica o una stima di retention. Rendere intervalli e transizioni unit-testabili con orologio iniettato.

### Accuratezza e prontezza stimata

Nessun indice è calcolato in questo step. Quando sarà implementato, la readiness sarà un indicatore formativo esplicitamente non ufficiale, che richiede campione minimo e deve mostrare i fattori: accuratezza recente e stabilità temporale, obiettivi effettivamente verificati, esiti di prove originali, pesi del blueprint versionato e errori ripetuti. Il completamento di pagine non basta; la soglia d'esame 720 è scalata e non può essere trattata come una percentuale quiz o una conversione lineare senza evidenza.

## 7. File d'implementazione ipotizzati (non creati in questo step)

- **Creare** `src/app/core/ccao-f/content-model.ts` per entità e discriminated union tipizzate.
- **Creare** `src/app/core/ccao-f/blueprint-v1.ts` per dati di certificazione, domini/obiettivi e `sourceIds`, distinguendoli da contenuti non verificati.
- **Creare** `src/app/core/ccao-f/content-validator.ts` e ampliare `tests/learning-data.test.ts` (o test dedicati) per invarianti editoriali.
- **Creare**, durante il pilota, una cartella contenuti separata per Output Evaluation and Validation e test di schema/quiz per tali contenuti.
- **Evolvere solo successivamente** `ProgressService` per stato quiz/ripassi e migrazione versionata; non farlo prima di approvare il modello e i contenuti.
- **Integrare le viste esistenti** solo in seguito e in modo incrementale; non introdurre routing, backend, login o database senza requisito.

## 8. Decisioni aperte e gate per lo STEP 4

- La guida v2 annunciata non è ancora pubblicata nella data di questo documento. Definire i tipi in modo versionato; la struttura può anticipare l'estensione, ma il contenuto didattico del pilota deve citare S01/v1.0 e sarà da rivedere dopo il cambio.
- L'Exam Guide v1.0 documenta i domini di output evaluation, ma l'associazione esatta di ogni futuro sotto-obiettivo `objectiveId` deve seguire la matrice v1.0 e mantenere il riferimento pagina.
- Per il pilota: un dominio, un obiettivo o sotto-obiettivo alla volta; 1 sintesi rapida, 1 lezione standard, 1 scheda, 3 esempi, 10 card, 10 quiz, una micro-sessione e un report fonti. I quiz devono essere originali e non presentati come quesiti ufficiali.
- Il prossimo step produce il solo modulo pilota e i suoi controlli automatici; non estende automaticamente gli altri sei domini né implementa dashboard, simulazioni finali o scheduling completo.
