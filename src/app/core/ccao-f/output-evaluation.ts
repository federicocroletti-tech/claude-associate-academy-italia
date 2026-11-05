import { ExamDomainModule } from './content-model';

const OFFICIAL = 'VERIFIED_OFFICIAL' as const;
const VERIFIED_AT = '2026-11-05';
const EXAM_GUIDE = 'S01';
const EVALS_DOCS = 'S15';
const CAPABILITIES_COURSE = 'S16';
const EVALS_COURSE = 'S17';

export const OUTPUT_EVALUATION: ExamDomainModule = {
  id: 'output-evaluation-validation',
  certificationCode: 'CCAO-F',
  blueprintVersion: '1.0-effective-2026-07',
  title: 'Output Evaluation and Validation',
  weightPercent: 21,
  lastVerifiedAt: VERIFIED_AT,
  verificationStatus: OFFICIAL,
  objectives: [
    {
      id: 'oev-accuracy-completeness',
      description:
        'Valutare accuratezza e completezza di un output rispetto alla richiesta e alle evidenze disponibili.',
      sourceIds: [EXAM_GUIDE],
      verificationStatus: OFFICIAL,
    },
    {
      id: 'oev-claims-and-bias',
      description:
        'Riconoscere affermazioni non supportate, allucinazioni, contraddizioni e possibili bias; verificare i fatti.',
      sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
    },
    {
      id: 'oev-human-review',
      description:
        'Decidere quando servono revisione umana e controlli aggiuntivi, in base a rischio, impatto e incertezza.',
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
    },
    {
      id: 'oev-audience-and-format',
      description:
        'Adattare l’output al pubblico e scegliere una forma adatta, per esempio risposta inline, Artifact o dati strutturati.',
      sourceIds: [EXAM_GUIDE],
      verificationStatus: OFFICIAL,
    },
  ],
  summaries: [
    {
      id: 'oev-summary-quick',
      level: 'QUICK',
      body:
        'Un testo fluido non è automaticamente corretto. Valuta ogni output rispetto alla richiesta: controlla accuratezza, completezza, coerenza, utilità per il pubblico e formato. Scomponi le risposte in affermazioni verificabili; confronta date, numeri e citazioni con fonti primarie e segnala ciò che resta senza supporto. Per attività ricorrenti, definisci criteri osservabili e prova casi rappresentativi, inclusi quelli difficili, prima di affidarti al risultato. Aumenta la revisione umana quando un errore può avere conseguenze rilevanti o quando le evidenze sono incerte. Infine, scegli il formato in base all’uso: testo breve per una risposta immediata, struttura tabellare o dati validabili per confronti e sistemi, documento o Artifact per un elaborato da rivedere. Gli esercizi di questo modulo sono originali e non sono domande ufficiali.',
      sourceIds: [EXAM_GUIDE, EVALS_DOCS, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
    },
    {
      id: 'oev-summary-review',
      level: 'REVIEW',
      body: [
        'La qualità si misura rispetto alla richiesta, non alla sicurezza del tono.',
        'Controlla accuratezza, completezza, coerenza, pertinenza e formato.',
        'Scomponi un testo in affermazioni verificabili.',
        'Confronta numeri, date e citazioni con fonti primarie accessibili.',
        'Distingui fatti verificati, inferenze e informazioni mancanti.',
        'Definisci criteri di successo osservabili prima di confrontare output.',
        'Prova casi rappresentativi e casi limite; una singola risposta non dimostra affidabilità.',
        'Richiedi revisione umana proporzionata a impatto e incertezza.',
        'Scegli formato e livello di dettaglio in base a pubblico e uso successivo.',
        'Esempi e quiz del modulo sono esercizi originali, non item d’esame.',
      ].join('\n'),
      sourceIds: [EXAM_GUIDE, EVALS_DOCS, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
    },
  ],
  lesson: {
    id: 'oev-standard-lesson',
    updatedAt: VERIFIED_AT,
    title: 'Valutare un output prima di usarlo',
    objectiveIds: [
      'oev-accuracy-completeness',
      'oev-claims-and-bias',
      'oev-human-review',
      'oev-audience-and-format',
    ],
    body: `Una risposta ben scritta può contenere errori. La valutazione parte quindi dal compito e dalle evidenze, non dalla fluidità, dalla sicurezza del tono o dalla quantità di dettagli. Prima di leggere l’output, chiarisci che cosa deve ottenere: per esempio, riassumere una policy senza omettere eccezioni, estrarre date da un documento o preparare una nota per un pubblico specifico. Trasforma questa aspettativa in criteri osservabili, come “ogni data è rintracciabile nella fonte”, “sono incluse tutte le eccezioni indicate” o “il riepilogo distingue fatti e punti non confermati”. La documentazione Anthropic sugli eval raccomanda criteri specifici e misurabili e una valutazione multidimensionale quando il caso d’uso lo richiede [S15].

Esamina poi l’output per parti. Se contiene fatti, numeri, citazioni o riferimenti aggiornabili, trattali come affermazioni da verificare. Cerca la fonte primaria pertinente, controlla che sostenga proprio quella frase e che riguardi il periodo corretto. Un collegamento presente non basta: potrebbe essere irrilevante, non contenere il dato o sostenere una conclusione più limitata. Se la fonte manca o non è accessibile, etichetta l’affermazione come non verificata invece di colmare il vuoto con un’altra supposizione. I modelli possono produrre con sicurezza informazioni inventate o citazioni inesistenti; conoscere questo limite aiuta a scegliere quando portare fonti proprie e quando non affidarsi alla sola risposta [S16].

Verifica anche completezza e coerenza. Confronta la risposta con la richiesta, con una lista di requisiti o con il documento di partenza; cerca omissioni, condizioni perse, date incompatibili e conclusioni che non seguono dalle premesse. Per un testo lungo, controlla sezioni o elementi uno per volta. Per valutare più versioni, applica gli stessi criteri e gli stessi casi: cambiare contemporaneamente prompt, modello e rubrica rende difficile capire che cosa abbia prodotto la differenza. Per un uso ripetuto, prepara esempi rappresentativi e casi limite, registra i risultati e ripeti la valutazione quando cambiano input, prompt o flusso. Un singolo esempio riuscito non prova che il sistema sia affidabile [S15, S17].

Errori comuni da evitare sono fidarsi del tono, trattare un link come prova, confondere un dato plausibile con uno verificato o misurare la qualità soltanto contando parole. Un criterio decisionale pratico è: se l’affermazione è importante, è rintracciabile in una fonte pertinente e attuale? Se la risposta è no, segnala il limite o sospendi l’uso. Esempio: prima di riutilizzare una scadenza estratta da una policy, trova la sezione che la specifica e conferma la versione del documento. Controesempio: una risposta con una citazione di pagina non è verificata se quella pagina non contiene la regola. Per l’esame, ricorda di distinguere evidenza, inferenza e informazione mancante.

La revisione umana va commisurata alle conseguenze. Un errore in un titolo interno può essere facile da correggere; un errore che influenza una decisione su persone, salute, denaro, obblighi o comunicazioni esterne richiede verifiche più forti e un responsabile competente. L’automazione può aiutare a evidenziare incertezze e fonti, ma non trasferisce la responsabilità della decisione. Se le evidenze sono incomplete, contraddittorie o fuori dal perimetro di competenza, sospendi l’uso, chiedi chiarimenti o passa il caso a una persona qualificata.

Infine, valuta se forma e dettaglio servono davvero al destinatario. Una risposta inline è adatta a un chiarimento breve; una tabella aiuta a confrontare elementi omogenei; dati strutturati sono utili quando un sistema deve validarli; un documento o Artifact è più adatto a un elaborato persistente da iterare. Il formato non rende vera un’informazione: controlla i contenuti anche dopo la riformattazione e verifica che non siano andati persi caveat o riferimenti. Mantieni il termine inglese *hallucination* accanto ad “allucinazione” e *evaluation/eval* accanto a “valutazione” quando li incontri nel materiale. Per l’esame, ricorda la sequenza: definire il criterio, controllare le evidenze, individuare omissioni e rischi, scegliere il livello di revisione e presentare il risultato nel formato adatto. Questo modulo è una risorsa didattica indipendente, basata sugli obiettivi pubblicati della guida v1.0; non contiene domande ufficiali.`,
    keyTerms: [
      'output evaluation (valutazione dell’output)',
      'hallucination (allucinazione)',
      'success criteria (criteri di successo)',
      'human review (revisione umana)',
      'structured output (output strutturato)',
    ],
    sourceIds: [EXAM_GUIDE, EVALS_DOCS, CAPABILITIES_COURSE, EVALS_COURSE],
    verificationStatus: OFFICIAL,
  },
  examples: [
    {
      id: 'oev-example-source-check',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      title: 'Una citazione convincente ma non rintracciabile',
      context:
        'Un collega chiede un riepilogo di una procedura interna e fornisce il PDF aggiornato. Claude restituisce tre punti e attribuisce a pagina 8 una scadenza che nel documento non trovi.',
      problem:
        'Il riepilogo è chiaro, ma una data potrebbe essere stata inventata o attribuita alla versione sbagliata.',
      options: [
        {
          id: 'accept',
          text: 'Mantenere la data perché la citazione di pagina rende la risposta credibile.',
          rationale:
            'Una citazione non dimostra che la fonte sostenga la frase: occorre controllare il passaggio originale.',
        },
        {
          id: 'verify',
          text: 'Cercare la data nel PDF, confrontare titolo e versione, poi correggere o segnalare il punto non confermato.',
          rationale:
            'Verifica sia il contenuto sia la versione della fonte; conserva l’incertezza se la prova non c’è.',
        },
        {
          id: 'web-search',
          text: 'Sostituire la data con quella trovata in una pagina web non ufficiale senza menzionare la differenza.',
          rationale:
            'Una fonte secondaria non risolve il conflitto con il documento primario fornito e nascondere la discrepanza rende il riepilogo meno affidabile.',
        },
      ],
      bestChoiceId: 'verify',
      rationale:
        'Scomponi l’output in affermazioni e verifica puntualmente quella contestabile contro la fonte primaria e la sua versione. Se non è supportata, rimuovila o dichiarala non verificata.',
      limitations:
        'L’esempio non stabilisce che ogni risposta debba includere citazioni né definisce una procedura universale per i documenti aziendali.',
      sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      isOriginalPractice: true,
    },
    {
      id: 'oev-example-evaluation-rubric',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      title: 'Due prompt, una rubrica comune',
      context:
        'Un team prova una nuova istruzione per estrarre scadenze da richieste di assistenza. La prima risposta sembra più ordinata, ma non è chiaro se abbia perso eccezioni.',
      problem:
        'Il team deve capire se la modifica migliora davvero accuratezza e completezza, senza scegliere in base allo stile.',
      options: [
        {
          id: 'single-impression',
          text: 'Scegliere la versione più elegante dopo aver letto un solo caso.',
          rationale:
            'Una singola impressione non misura omissioni né stabilità su casi diversi.',
        },
        {
          id: 'shared-cases',
          text: 'Preparare casi con risultati attesi e criteri espliciti, quindi valutare entrambe le versioni sugli stessi input.',
          rationale:
            'Casi e criteri comuni rendono il confronto più interpretabile e fanno emergere errori di completezza.',
        },
        {
          id: 'change-everything',
          text: 'Cambiare insieme modello, istruzione e dati di input, poi confrontare le risposte.',
          rationale:
            'Cambiare più variabili insieme impedisce di attribuire con chiarezza l’esito alla modifica valutata.',
        },
      ],
      bestChoiceId: 'shared-cases',
      rationale:
        'Definisci prima “corretto” e “completo”, usa input rappresentativi e confronta le versioni alle stesse condizioni. Registra anche i casi limite, non solo il punteggio medio.',
      limitations:
        'La rubrica e i casi sono didattici; la documentazione Anthropic non prescrive un dataset o una soglia universali per questo scenario.',
      sourceIds: [EVALS_DOCS, EVALS_COURSE],
      verificationStatus: OFFICIAL,
      isOriginalPractice: true,
    },
    {
      id: 'oev-example-review-format',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-human-review',
      title: 'Bozza interna con conseguenze esterne',
      context:
        'Claude prepara una bozza per comunicare a un cliente l’esito di una richiesta che può incidere su un rimborso. La risposta include una tabella utile, ma una regola di eleggibilità è ambigua.',
      problem:
        'Occorre decidere chi deve controllare la bozza e quale formato aiuta a individuare l’incertezza.',
      options: [
        {
          id: 'send-as-is',
          text: 'Inviare la tabella perché la struttura rende la risposta facile da leggere.',
          rationale:
            'La leggibilità non risolve un dubbio sostanziale né giustifica una decisione che può incidere sul cliente.',
        },
        {
          id: 'review-and-label',
          text: 'Mettere in evidenza la regola ambigua, verificare la policy e far approvare la decisione da una persona responsabile prima dell’invio.',
          rationale:
            'La revisione è proporzionata all’impatto; la tabella può aiutare il controllo ma la decisione va verificata.',
        },
        {
          id: 'hide-uncertainty',
          text: 'Chiedere a Claude di formulare la regola in modo più sicuro senza consultare la policy.',
          rationale:
            'Rendere il tono più deciso non aggiunge evidenza e può mascherare l’incertezza.',
        },
      ],
      bestChoiceId: 'review-and-label',
      rationale:
        'Quando l’output può influire su una decisione esterna, verifica la regola sulla fonte competente e assegna l’approvazione a una persona responsabile. Usa la struttura per rendere visibili prove e punti aperti.',
      limitations:
        'Il livello di approvazione concreto dipende da policy e responsabilità dell’organizzazione, non specificate dall’esempio.',
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
      isOriginalPractice: true,
    },
  ],
  flashcards: [
    {
      id: 'oev-fc-01',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      type: 'DEFINITION',
      difficulty: 'EASY',
      front: 'Che cosa significa valutare un output rispetto a criteri di successo?',
      back: 'Confrontarlo con requisiti espliciti e osservabili definiti prima dell’uso.',
      explanation:
        'Un criterio come “includere ogni eccezione presente nel testo” è controllabile; “sembra buono” non lo è.',
      example: 'Per un estrattore di date, controlla che ogni data abbia una fonte nel documento.',
      tags: ['evaluation', 'criteria'],
      sourceIds: [EVALS_DOCS],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-02',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      type: 'ERROR_RECOGNITION',
      difficulty: 'EASY',
      front: 'Un testo fluido e sicuro è prova sufficiente di accuratezza?',
      back: 'No. Verifica le affermazioni rispetto a evidenze pertinenti.',
      explanation:
        'La forma persuasiva non garantisce che i fatti siano corretti; i modelli possono essere sicuri anche quando sbagliano.',
      example: 'Controlla una citazione nel documento originale, non solo nel riepilogo.',
      tags: ['accuracy', 'hallucination'],
      sourceIds: [CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-03',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      type: 'APPLICATION',
      difficulty: 'MEDIUM',
      front: 'Qual è il primo controllo per una statistica aggiornata citata da Claude?',
      back: 'Individuare una fonte primaria attuale e verificare che sostenga la statistica e il periodo indicati.',
      explanation:
        'Controlla fonte, contenuto, data e ambito; se uno manca, dichiara il limite.',
      example: 'Una pagina con una percentuale simile ma di un anno diverso non conferma il dato richiesto.',
      tags: ['sources', 'verification'],
      sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-04',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      type: 'COMPARISON',
      difficulty: 'MEDIUM',
      front: 'Accuratezza e completezza: quale differenza?',
      back: 'Accuratezza: ciò che è affermato è corretto. Completezza: sono inclusi gli elementi richiesti.',
      explanation:
        'Una risposta può essere corretta ma omettere un’eccezione; oppure completa ma contenere una data errata.',
      example: 'Confronta un riepilogo con una checklist di condizioni e con la fonte.',
      tags: ['accuracy', 'completeness'],
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-05',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      type: 'SCENARIO',
      difficulty: 'MEDIUM',
      front: 'La risposta riporta una citazione ma non trovi il passaggio. Come la tratti?',
      back: 'Non considerarla verificata: cerca la fonte, controlla il passaggio e correggi o segnala l’incertezza.',
      explanation:
        'La presenza di un riferimento non prova che supporti la frase specifica.',
      example: 'Verifica titolo, versione e pagina del documento originale.',
      tags: ['citations', 'hallucination'],
      sourceIds: [CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-06',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-human-review',
      type: 'COMPREHENSION',
      difficulty: 'MEDIUM',
      front: 'Da che cosa dipende il livello di revisione umana?',
      back: 'Da impatto potenziale, incertezza e possibilità di verificare l’output.',
      explanation:
        'La supervisione è proporzionata al rischio: un errore con conseguenze rilevanti richiede controlli più forti.',
      example: 'Una bozza interna a basso impatto può richiedere controlli diversi da una decisione che incide su una persona.',
      tags: ['human-review', 'risk'],
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-07',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-audience-and-format',
      type: 'APPLICATION',
      difficulty: 'EASY',
      front: 'Quando può essere utile un formato strutturato?',
      back: 'Quando il risultato deve essere confrontato, elaborato o validato con una struttura prevedibile.',
      explanation:
        'Un formato strutturato facilita l’uso successivo, ma non rende corretto il contenuto.',
      example: 'Un elenco di date e riferimenti può essere validato campo per campo.',
      tags: ['format', 'structured-output'],
      sourceIds: [EXAM_GUIDE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-08',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-audience-and-format',
      type: 'COMPARISON',
      difficulty: 'MEDIUM',
      front: 'Risposta inline o documento/Artifact: che cosa guida la scelta?',
      back: 'Se il destinatario ha bisogno di un chiarimento immediato o di un elaborato persistente da iterare.',
      explanation:
        'Scegli forma e dettaglio in base all’uso successivo, non alla presunta autorevolezza del formato.',
      example: 'Una risposta breve può stare inline; una bozza articolata da revisionare può essere separata.',
      tags: ['audience', 'artifacts'],
      sourceIds: [EXAM_GUIDE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-09',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      type: 'REVERSE',
      difficulty: 'HARD',
      front: 'Quale strategia di confronto evita di confondere l’effetto del prompt con quello del modello?',
      back: 'Cambiare una variabile per volta e valutare le versioni sugli stessi casi con criteri comuni.',
      explanation:
        'Se si cambiano più componenti insieme, non si sa quale abbia prodotto la differenza osservata.',
      example: 'Mantieni modello e input costanti mentre confronti due prompt.',
      tags: ['evaluation', 'comparison'],
      sourceIds: [EVALS_DOCS, EVALS_COURSE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
    {
      id: 'oev-fc-10',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-human-review',
      type: 'ERROR_RECOGNITION',
      difficulty: 'HARD',
      front: 'Qual è l’errore nel chiedere a Claude di “suonare più sicuro” quando manca una fonte?',
      back: 'Modifica il tono ma non aggiunge evidenze; può nascondere l’incertezza.',
      explanation:
        'La risposta corretta è cercare evidenza, chiedere chiarimenti o dichiarare il limite, non aumentare la sicurezza retorica.',
      example: 'Segnala “non verificato” finché non trovi una fonte che supporti l’affermazione.',
      tags: ['uncertainty', 'human-review'],
      sourceIds: [CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      reviewIntervalDays: 1,
      createdAt: VERIFIED_AT,
      reviewedAt: null,
    },
  ],
  questions: [
    {
      id: 'oev-q-01',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      type: 'SINGLE_SELECT',
      difficulty: 'EASY',
      prompt: 'Qual è il modo migliore per giudicare se una risposta è completa?',
      options: [
        {
          id: 'q1-a',
          text: 'Controllare se è lunga e ben organizzata.',
          isCorrect: false,
          rationale: 'La lunghezza e l’organizzazione non dimostrano che tutti i requisiti siano coperti.',
        },
        {
          id: 'q1-b',
          text: 'Confrontarla con la richiesta e con una lista dei punti attesi.',
          isCorrect: true,
          rationale: 'La checklist rende visibili omissioni rispetto al compito.',
        },
        {
          id: 'q1-c',
          text: 'Chiedere al modello se ha omesso qualcosa.',
          isCorrect: false,
          rationale: 'Un’autovalutazione può aiutare, ma non sostituisce un controllo rispetto ai requisiti.',
        },
        {
          id: 'q1-d',
          text: 'Assumere che il primo paragrafo contenga le informazioni più importanti.',
          isCorrect: false,
          rationale: 'La posizione nel testo non dimostra la copertura dei requisiti.',
        },
      ],
      selectCount: 1,
      explanation:
        'La completezza è relativa alla richiesta: identifica i punti richiesti e verifica che ciascuno sia trattato.',
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
      tags: ['completezza', 'rubrica'],
      estimatedTimeSeconds: 45,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-02',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      type: 'SINGLE_SELECT',
      difficulty: 'EASY',
      prompt: 'Claude cita un rapporto per sostenere un dato. Quale controllo è più importante?',
      options: [
        {
          id: 'q2-a',
          text: 'Verificare nel rapporto originale che il passaggio sostenga quel dato e quel periodo.',
          isCorrect: true,
          rationale: 'Il controllo va fatto sulla fonte e sull’affermazione specifica.',
        },
        {
          id: 'q2-b',
          text: 'Controllare soltanto che il link si apra.',
          isCorrect: false,
          rationale: 'Una pagina raggiungibile può non contenere o supportare il dato.',
        },
        {
          id: 'q2-c',
          text: 'Preferire la citazione più recente anche se parla di un altro indicatore.',
          isCorrect: false,
          rationale: 'La recenza da sola non rende pertinente una fonte.',
        },
        {
          id: 'q2-d',
          text: 'Mantenere il dato se compare in più risposte generate.',
          isCorrect: false,
          rationale: 'La ripetizione del modello non è una verifica indipendente.',
        },
      ],
      selectCount: 1,
      explanation:
        'Rintraccia il dato nella fonte primaria, controllando indicatore, periodo e contesto prima di riutilizzarlo.',
      sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      tags: ['fonti', 'allucinazioni'],
      estimatedTimeSeconds: 50,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-03',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      type: 'MULTI_SELECT',
      difficulty: 'MEDIUM',
      prompt: 'Seleziona 2 controlli utili per confrontare due versioni di un prompt.',
      options: [
        {
          id: 'q3-a',
          text: 'Usare gli stessi casi di prova per entrambe.',
          isCorrect: true,
          rationale: 'Input comuni rendono il confronto più controllato.',
        },
        {
          id: 'q3-b',
          text: 'Definire criteri di successo prima di leggere i risultati.',
          isCorrect: true,
          rationale: 'Criteri preventivi riducono la scelta basata solo su preferenze stilistiche.',
        },
        {
          id: 'q3-c',
          text: 'Cambiare anche modello e dati mentre si prova il nuovo prompt.',
          isCorrect: false,
          rationale: 'Più variabili cambiate insieme rendono difficile attribuire l’esito.',
        },
        {
          id: 'q3-d',
          text: 'Scegliere il risultato che sembra più convincente.',
          isCorrect: false,
          rationale: 'La persuasività non è un criterio di accuratezza o completezza.',
        },
      ],
      selectCount: 2,
      explanation:
        'Input e criteri comuni permettono un confronto più interpretabile; cambia una variabile per volta quando vuoi attribuire un effetto.',
      sourceIds: [EVALS_DOCS, EVALS_COURSE],
      verificationStatus: OFFICIAL,
      tags: ['valutazione', 'prompt'],
      estimatedTimeSeconds: 70,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-04',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      type: 'SINGLE_SELECT',
      difficulty: 'MEDIUM',
      prompt: 'Un riepilogo di una policy riporta una scadenza che non trovi nel documento. Che cosa fai?',
      options: [
        {
          id: 'q4-a',
          text: 'Mantieni la scadenza perché il resto del riepilogo è accurato.',
          isCorrect: false,
          rationale: 'La correttezza di altri punti non convalida questa affermazione.',
        },
        {
          id: 'q4-b',
          text: 'La segnali come non verificata, ricontrolli fonte e versione e poi correggi o rimuovi il punto.',
          isCorrect: true,
          rationale: 'È necessario verificare l’affermazione specifica e non inventare una soluzione.',
        },
        {
          id: 'q4-c',
          text: 'Sostituisci la data con una stima plausibile.',
          isCorrect: false,
          rationale: 'Una stima non supportata continua a presentare un fatto come se fosse fondato.',
        },
        {
          id: 'q4-d',
          text: 'Aggiungi un link generico alla home page dell’organizzazione.',
          isCorrect: false,
          rationale: 'Un link generico non dimostra la scadenza né la versione della policy.',
        },
      ],
      selectCount: 1,
      explanation:
        'Non colmare una lacuna con un’ipotesi: controlla il documento pertinente e conserva l’incertezza se non trovi evidenza.',
      sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      tags: ['verifica', 'incertezza'],
      estimatedTimeSeconds: 55,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-05',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-human-review',
      type: 'SINGLE_SELECT',
      difficulty: 'MEDIUM',
      prompt: 'Quando è più importante coinvolgere una persona competente prima di usare un output?',
      options: [
        {
          id: 'q5-a',
          text: 'Quando l’output influenza una decisione con conseguenze rilevanti e le evidenze restano incerte.',
          isCorrect: true,
          rationale: 'Impatto e incertezza aumentano la necessità di controllo e responsabilità umana.',
        },
        {
          id: 'q5-b',
          text: 'Ogni volta che la risposta contiene più di un paragrafo.',
          isCorrect: false,
          rationale: 'La lunghezza non è da sola una misura di rischio.',
        },
        {
          id: 'q5-c',
          text: 'Soltanto quando Claude dichiara di non conoscere la risposta.',
          isCorrect: false,
          rationale: 'L’incertezza non sempre è dichiarata; va valutata rispetto alle evidenze e all’uso.',
        },
        {
          id: 'q5-d',
          text: 'Mai, se il formato è una tabella.',
          isCorrect: false,
          rationale: 'Il formato non elimina il rischio né trasferisce la responsabilità.',
        },
      ],
      selectCount: 1,
      explanation:
        'La revisione va proporzionata a impatto, incertezza e possibilità di verifica; le decisioni rilevanti necessitano responsabilità chiara.',
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
      tags: ['revisione-umana', 'rischio'],
      estimatedTimeSeconds: 50,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-06',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-audience-and-format',
      type: 'SINGLE_SELECT',
      difficulty: 'EASY',
      prompt: 'Un utente vuole confrontare cinque opzioni secondo gli stessi attributi. Quale forma aiuta maggiormente la verifica?',
      options: [
        {
          id: 'q6-a',
          text: 'Una tabella con colonne coerenti e valori verificabili.',
          isCorrect: true,
          rationale: 'Una struttura omogenea facilita il confronto tra attributi equivalenti.',
        },
        {
          id: 'q6-b',
          text: 'Un unico paragrafo senza separatori.',
          isCorrect: false,
          rationale: 'Il testo continuo rende più difficile confrontare sistematicamente i campi.',
        },
        {
          id: 'q6-c',
          text: 'Una risposta più lunga, indipendentemente dai campi richiesti.',
          isCorrect: false,
          rationale: 'Aggiungere testo non crea una struttura di confronto.',
        },
        {
          id: 'q6-d',
          text: 'Un Artifact perché è sempre più accurato del testo inline.',
          isCorrect: false,
          rationale: 'Nessun formato garantisce accuratezza; va scelto in base all’uso.',
        },
      ],
      selectCount: 1,
      explanation:
        'Scegli una rappresentazione che aiuti il destinatario a svolgere il compito; la correttezza dei valori richiede comunque verifica.',
      sourceIds: [EXAM_GUIDE],
      verificationStatus: OFFICIAL,
      tags: ['formato', 'pubblico'],
      estimatedTimeSeconds: 45,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-07',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-claims-and-bias',
      type: 'MULTI_SELECT',
      difficulty: 'HARD',
      prompt: 'Seleziona 2 segnali che richiedono un controllo più attento di una sintesi.',
      options: [
        {
          id: 'q7-a',
          text: 'Una data precisa senza riferimento rintracciabile.',
          isCorrect: true,
          rationale: 'La data è verificabile e può dipendere dalla versione o dal periodo.',
        },
        {
          id: 'q7-b',
          text: 'Una conclusione che non segue dai punti elencati.',
          isCorrect: true,
          rationale: 'Una conclusione incoerente con le premesse può essere una contraddizione o inferenza non supportata.',
        },
        {
          id: 'q7-c',
          text: 'Un titolo breve che corrisponde al pubblico richiesto.',
          isCorrect: false,
          rationale: 'La brevità appropriata non è di per sé un segnale di errore.',
        },
        {
          id: 'q7-d',
          text: 'Un elenco con punti elenco invece di un paragrafo.',
          isCorrect: false,
          rationale: 'La forma dell’elenco non dimostra inesattezza o incoerenza.',
        },
      ],
      selectCount: 2,
      explanation:
        'Controlla affermazioni precise senza supporto e passaggi logici incoerenti; il tono o la forma non sostituiscono questo controllo.',
      sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
      verificationStatus: OFFICIAL,
      tags: ['contraddizioni', 'fonti'],
      estimatedTimeSeconds: 70,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-08',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-accuracy-completeness',
      type: 'SINGLE_SELECT',
      difficulty: 'MEDIUM',
      prompt: 'Il team vuole misurare se un prompt aggiornato riduce le omissioni. Quale approccio è più solido?',
      options: [
        {
          id: 'q8-a',
          text: 'Definire una rubrica di completezza e confrontare vecchio e nuovo prompt su casi rappresentativi comuni.',
          isCorrect: true,
          rationale: 'Rubrica e casi comuni rendono confrontabile la copertura.',
        },
        {
          id: 'q8-b',
          text: 'Contare le parole prodotte dal nuovo prompt.',
          isCorrect: false,
          rationale: 'Il numero di parole non misura se siano presenti gli elementi richiesti.',
        },
        {
          id: 'q8-c',
          text: 'Valutare un singolo output del vecchio prompt e uno su input diverso del nuovo.',
          isCorrect: false,
          rationale: 'Casi differenti confondono l’effetto del prompt con la difficoltà dell’input.',
        },
        {
          id: 'q8-d',
          text: 'Scegliere il prompt che usa più termini tecnici.',
          isCorrect: false,
          rationale: 'Il lessico tecnico non misura la completezza.',
        },
      ],
      selectCount: 1,
      explanation:
        'Definisci la metrica prima della prova e applicala a casi confrontabili, inclusi input rappresentativi e difficili.',
      sourceIds: [EVALS_DOCS, EVALS_COURSE],
      verificationStatus: OFFICIAL,
      tags: ['completezza', 'eval'],
      estimatedTimeSeconds: 60,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-09',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-human-review',
      type: 'SINGLE_SELECT',
      difficulty: 'HARD',
      prompt: 'Un output potrebbe influire sull’idoneità di una persona a un servizio. La policy di riferimento non chiarisce un caso limite. Qual è il passo più appropriato?',
      options: [
        {
          id: 'q9-a',
          text: 'Far decidere al modello quale interpretazione sia più probabile e applicarla automaticamente.',
          isCorrect: false,
          rationale: 'Una previsione non risolve un’ambiguità normativa né definisce chi è responsabile.',
        },
        {
          id: 'q9-b',
          text: 'Sospendere l’automazione sul caso, chiedere verifica al responsabile competente e documentare il limite.',
          isCorrect: true,
          rationale: 'L’impatto potenziale e la regola ambigua richiedono una decisione umana competente.',
        },
        {
          id: 'q9-c',
          text: 'Riformulare il testo finché la risposta appare meno ambigua.',
          isCorrect: false,
          rationale: 'La riformulazione non aggiunge una regola o evidenza mancante.',
        },
        {
          id: 'q9-d',
          text: 'Ignorare il caso limite perché è raro.',
          isCorrect: false,
          rationale: 'La rarità non rende trascurabili conseguenze potenzialmente rilevanti.',
        },
      ],
      selectCount: 1,
      explanation:
        'Quando le evidenze o le regole non bastano per una decisione ad alto impatto, non colmare il vuoto con una supposizione automatica.',
      sourceIds: [EXAM_GUIDE, EVALS_DOCS],
      verificationStatus: OFFICIAL,
      tags: ['rischio', 'supervisione'],
      estimatedTimeSeconds: 75,
      isOriginalPractice: true,
    },
    {
      id: 'oev-q-10',
      domainId: 'output-evaluation-validation',
      objectiveId: 'oev-audience-and-format',
      type: 'MULTI_SELECT',
      difficulty: 'MEDIUM',
      prompt: 'Seleziona 2 principi corretti per scegliere come presentare un output.',
      options: [
        {
          id: 'q10-a',
          text: 'Scegliere in base al pubblico e all’uso successivo del risultato.',
          isCorrect: true,
          rationale: 'Pubblico e compito determinano il livello di dettaglio e la struttura utile.',
        },
        {
          id: 'q10-b',
          text: 'Verificare che la riformattazione non abbia perso caveat o riferimenti importanti.',
          isCorrect: true,
          rationale: 'La trasformazione del formato non deve eliminare condizioni necessarie alla comprensione.',
        },
        {
          id: 'q10-c',
          text: 'Assumere che i dati strutturati siano sempre corretti perché validabili.',
          isCorrect: false,
          rationale: 'La validazione strutturale non garantisce la correttezza semantica dei valori.',
        },
        {
          id: 'q10-d',
          text: 'Usare sempre l’elaborato più lungo per dimostrare completezza.',
          isCorrect: false,
          rationale: 'Lunghezza e completezza non sono equivalenti; il formato deve servire al destinatario.',
        },
      ],
      selectCount: 2,
      explanation:
        'La forma va scelta in funzione dell’uso, poi ricontrollata per verificare che fatti, limiti e riferimenti siano rimasti chiari.',
      sourceIds: [EXAM_GUIDE],
      verificationStatus: OFFICIAL,
      tags: ['formato', 'pubblico'],
      estimatedTimeSeconds: 65,
      isOriginalPractice: true,
    },
  ],
  microSession: {
    id: 'oev-micro-session-01',
    objectiveId: 'oev-claims-and-bias',
    title: 'Verifica affermazioni e citazioni prima di riutilizzarle',
    durationMinutes: 22,
    steps: [
      {
        id: 'oev-step-prerequisite',
        activity: 'PREREQUISITE_CHECK',
        instruction: 'Senza consultare gli appunti: una citazione prova da sola che un’affermazione è vera?',
        durationMinutes: 2,
      },
      {
        id: 'oev-step-summary',
        activity: 'READ_SUMMARY',
        instruction: 'Leggi la sintesi rapida e individua la differenza tra un link e un’evidenza pertinente.',
        contentId: 'oev-summary-quick',
        durationMinutes: 2,
      },
      {
        id: 'oev-step-lesson',
        activity: 'STUDY_LESSON',
        instruction: 'Studia la lezione concentrandoti su affermazioni verificabili, fonti e incertezza.',
        contentId: 'oev-standard-lesson',
        durationMinutes: 6,
      },
      {
        id: 'oev-step-example',
        activity: 'WORK_EXAMPLE',
        instruction: 'Applica al caso della citazione non rintracciabile la regola: fonte, passaggio, versione.',
        contentId: 'oev-example-source-check',
        durationMinutes: 3,
      },
      {
        id: 'oev-step-quiz-01',
        activity: 'ANSWER_QUIZ',
        instruction: 'Rispondi alla domanda sul controllo della fonte e leggi la spiegazione.',
        contentId: 'oev-q-02',
        durationMinutes: 2,
      },
      {
        id: 'oev-step-quiz-02',
        activity: 'ANSWER_QUIZ',
        instruction: 'Verifica come trattare una scadenza che non compare nel documento.',
        contentId: 'oev-q-04',
        durationMinutes: 2,
      },
      {
        id: 'oev-step-quiz-03',
        activity: 'ANSWER_QUIZ',
        instruction: 'Riconosci i segnali che richiedono un controllo più attento.',
        contentId: 'oev-q-07',
        durationMinutes: 2,
      },
      {
        id: 'oev-step-recall',
        activity: 'ACTIVE_RECALL',
        instruction: 'Spiega a memoria cosa fai se una citazione non sostiene la frase attribuita.',
        durationMinutes: 2,
      },
      {
        id: 'oev-step-review',
        activity: 'SCHEDULE_REVIEW',
        instruction: 'Programma un nuovo richiamo per la prossima sessione utile; non ripetere subito la stessa domanda.',
        durationMinutes: 1,
      },
    ],
    sourceIds: [EXAM_GUIDE, CAPABILITIES_COURSE],
    verificationStatus: OFFICIAL,
  },
  sources: [
    {
      id: EXAM_GUIDE,
      title: 'Claude Certified Associate – Foundations Exam Guide, v1.0',
      url: 'https://everpath-course-content.s3-accelerate.amazonaws.com/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1783542847/Claude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf',
      organization: 'Anthropic Partner Academy',
      sourceType: 'EXAM_GUIDE',
      language: 'en',
      sourceVersion: '1.0, effective July 2026',
      lastVerifiedAt: VERIFIED_AT,
      verificationStatus: OFFICIAL,
      supports:
        'Identità e perimetro del dominio Output Evaluation and Validation, obiettivi pubblicati e peso del 21% nella guida v1.0 (pp. 4–5).',
      limitations:
        'Blueprint versionato: Pearson ha annunciato una guida aggiornata disponibile dal 17 novembre 2026 e item aggiornati dal 7 dicembre 2026. Non usare per affermare domande reali o criteri non presenti nella guida.',
    },
    {
      id: EVALS_DOCS,
      title: 'Define success criteria and build evaluations',
      url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests',
      organization: 'Anthropic',
      sourceType: 'OFFICIAL_DOCUMENTATION',
      language: 'en',
      lastVerifiedAt: VERIFIED_AT,
      verificationStatus: OFFICIAL,
      supports:
        'Criteri di successo specifici e misurabili, metriche quantitative o rubriche qualitative, casi di prova e valutazione multidimensionale.',
      limitations:
        'Documentazione tecnica generale sugli eval per applicazioni; non è il blueprint CCAO-F e non stabilisce una rubrica o una soglia universale per gli scenari del modulo.',
    },
    {
      id: CAPABILITIES_COURSE,
      title: 'AI capabilities and limitations',
      url: 'https://academy.claude.com/courses/ai-capabilities-and-limitations',
      organization: 'Anthropic / Claude Academy',
      sourceType: 'OFFICIAL_COURSE',
      language: 'en',
      lastVerifiedAt: VERIFIED_AT,
      verificationStatus: OFFICIAL,
      supports:
        'Limiti di conoscenza dei modelli, possibilità di risposte plausibili ma errate e utilità di valutare criticamente fonti e output.',
      limitations:
        'Pagina e descrizione del corso ufficiale consultate; i contenuti didattici del corso non sono usati come prova del blueprint o per attribuire domande d’esame.',
    },
    {
      id: EVALS_COURSE,
      title: 'Introduction to evals',
      url: 'https://academy.claude.com/courses/introduction-to-evals',
      organization: 'Anthropic / Claude Academy',
      sourceType: 'OFFICIAL_COURSE',
      language: 'en',
      lastVerifiedAt: VERIFIED_AT,
      verificationStatus: OFFICIAL,
      supports:
        'Descrizione ufficiale del corso: valutare prompt su casi propri, confrontare risultati in base a evidenze e mantenere controlli nel tempo.',
      limitations:
        'La descrizione delimita il corso a prompt per Messages API e non è una mappatura ufficiale di competenze CCAO-F; non si trasferiscono al modulo presupposti tecnici non necessari.',
    },
  ],
};
