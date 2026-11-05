import { ExamDomainModule } from './content-model';

const VERIFICATION_STATUSES = new Set([
  'VERIFIED_OFFICIAL',
  'VERIFIED_SECONDARY',
  'UNVERIFIED',
  'CONFLICTING',
  'OUTDATED',
]);

export function validateExamDomainModule(module: ExamDomainModule): string[] {
  const errors: string[] = [];
  const sourceIds = new Set(module.sources.map((source) => source.id));
  const objectiveIds = new Set(module.objectives.map((objective) => objective.id));
  const ids = new Set<string>();

  const addId = (id: string, label: string): void => {
    if (ids.has(id)) errors.push(`ID duplicato: ${id} (${label})`);
    ids.add(id);
  };
  const checkStatus = (status: string, label: string): void => {
    if (!VERIFICATION_STATUSES.has(status)) errors.push(`${label}: stato di verifica non valido`);
  };
  const checkSources = (references: readonly string[], label: string): void => {
    if (references.length === 0) errors.push(`${label}: nessuna fonte`);
    for (const id of references) {
      if (!sourceIds.has(id)) errors.push(`${label}: fonte inesistente ${id}`);
    }
  };

  addId(module.id, 'dominio');
  checkStatus(module.verificationStatus, module.id);
  if (!module.certificationCode.trim()) errors.push('Codice certificazione mancante');
  if (!module.blueprintVersion.trim()) errors.push('Versione blueprint mancante');
  if (!Number.isFinite(module.weightPercent) || module.weightPercent <= 0 || module.weightPercent > 100) {
    errors.push(`${module.id}: peso fuori intervallo`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(module.lastVerifiedAt)) {
    errors.push(`${module.id}: data ultima verifica non valida`);
  }

  for (const source of module.sources) {
    addId(source.id, 'fonte');
    checkStatus(source.verificationStatus, source.id);
    if (!source.title.trim() || !source.organization.trim()) errors.push(`${source.id}: metadati fonte incompleti`);
    if (!/^https:\/\//.test(source.url)) errors.push(`${source.id}: URL non HTTPS`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.lastVerifiedAt)) {
      errors.push(`${source.id}: data ultima verifica non valida`);
    }
    if (!source.supports.trim() || !source.limitations.trim()) {
      errors.push(`${source.id}: ambito o limitazioni della fonte mancanti`);
    }
  }

  for (const objective of module.objectives) {
    addId(objective.id, 'obiettivo');
    checkStatus(objective.verificationStatus, objective.id);
    checkSources(objective.sourceIds, objective.id);
  }
  for (const summary of module.summaries) {
    addId(summary.id, 'sintesi');
    checkStatus(summary.verificationStatus, summary.id);
    checkSources(summary.sourceIds, summary.id);
    if (!summary.body.trim()) errors.push(`${summary.id}: testo mancante`);
    if (summary.level === 'QUICK') {
      const wordCount = summary.body.trim().split(/\s+/).length;
      if (wordCount < 100 || wordCount > 150) {
        errors.push(`${summary.id}: la sintesi rapida deve avere 100–150 parole (attuali: ${wordCount})`);
      }
    } else if (summary.body.split('\n').filter((line) => line.trim()).length > 10) {
      errors.push(`${summary.id}: la scheda di ripasso supera 10 punti`);
    }
  }

  addId(module.lesson.id, 'lezione');
  checkStatus(module.lesson.verificationStatus, module.lesson.id);
  checkSources(module.lesson.sourceIds, module.lesson.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(module.lesson.updatedAt)) {
    errors.push(`${module.lesson.id}: data aggiornamento non valida`);
  }
  if (!module.lesson.title.trim() || module.lesson.keyTerms.length === 0) {
    errors.push(`${module.lesson.id}: titolo o termini chiave mancanti`);
  }
  for (const objectiveId of module.lesson.objectiveIds) {
    if (!objectiveIds.has(objectiveId)) errors.push(`${module.lesson.id}: obiettivo inesistente ${objectiveId}`);
  }
  const lessonWords = module.lesson.body.trim().split(/\s+/).length;
  if (lessonWords < 400 || lessonWords > 700) {
    errors.push(`${module.lesson.id}: la lezione deve avere 400–700 parole (attuali: ${lessonWords})`);
  }
  if (module.summaries.length !== 2 || new Set(module.summaries.map(({ level }) => level)).size !== 2) {
    errors.push(`${module.id}: servono una sintesi QUICK e una REVIEW`);
  }

  for (const example of module.examples) {
    addId(example.id, 'esempio');
    checkStatus(example.verificationStatus, example.id);
    checkSources(example.sourceIds, example.id);
    if (example.domainId !== module.id) errors.push(`${example.id}: dominio non valido`);
    if (!objectiveIds.has(example.objectiveId)) errors.push(`${example.id}: obiettivo inesistente`);
    if (example.isOriginalPractice !== true) errors.push(`${example.id}: esempio non marcato come pratica originale`);
    if (!example.title.trim() || !example.context.trim() || !example.problem.trim()) {
      errors.push(`${example.id}: contesto, problema o titolo mancante`);
    }
    if (example.options.length < 2) errors.push(`${example.id}: opzioni insufficienti`);
    if (new Set(example.options.map(({ id }) => id)).size !== example.options.length) {
      errors.push(`${example.id}: ID opzioni duplicati`);
    }
    if (!example.options.some(({ id }) => id === example.bestChoiceId)) {
      errors.push(`${example.id}: scelta migliore non presente tra le opzioni`);
    }
    if (example.options.some(({ rationale }) => !rationale.trim())) {
      errors.push(`${example.id}: motivazione di un'opzione mancante`);
    }
    if (!example.rationale.trim() || !example.limitations.trim()) {
      errors.push(`${example.id}: motivazione o limiti mancanti`);
    }
  }

  for (const flashcard of module.flashcards) {
    addId(flashcard.id, 'flashcard');
    checkStatus(flashcard.verificationStatus, flashcard.id);
    checkSources(flashcard.sourceIds, flashcard.id);
    if (flashcard.domainId !== module.id) errors.push(`${flashcard.id}: dominio non valido`);
    if (!objectiveIds.has(flashcard.objectiveId)) errors.push(`${flashcard.id}: obiettivo inesistente`);
    if (!flashcard.front.trim() || !flashcard.back.trim() || !flashcard.explanation.trim() || !flashcard.example.trim()) {
      errors.push(`${flashcard.id}: fronte, retro, spiegazione ed esempio sono obbligatori`);
    }
    if (!Number.isInteger(flashcard.reviewIntervalDays) || flashcard.reviewIntervalDays < 1) {
      errors.push(`${flashcard.id}: intervallo di ripasso non valido`);
    }
    if (
      flashcard.reviewedAt !== null &&
      !/^\d{4}-\d{2}-\d{2}T/.test(flashcard.reviewedAt)
    ) {
      errors.push(`${flashcard.id}: data di revisione non valida`);
    }
    if (!flashcard.tags.length) errors.push(`${flashcard.id}: tag mancanti`);
  }

  for (const question of module.questions) {
    addId(question.id, 'quiz');
    checkStatus(question.verificationStatus, question.id);
    checkSources(question.sourceIds, question.id);
    if (question.domainId !== module.id) errors.push(`${question.id}: dominio non valido`);
    if (!objectiveIds.has(question.objectiveId)) errors.push(`${question.id}: obiettivo inesistente`);
    if (question.isOriginalPractice !== true) errors.push(`${question.id}: domanda non marcata come pratica originale`);
    if (!question.prompt.trim() || !question.explanation.trim()) {
      errors.push(`${question.id}: testo o spiegazione mancante`);
    }
    if (new Set(question.options.map(({ id }) => id)).size !== question.options.length) {
      errors.push(`${question.id}: ID opzioni duplicati`);
    }
    if (question.options.length < 2) errors.push(`${question.id}: opzioni insufficienti`);
    if (new Set(question.options.map(({ text }) => text.trim().toLocaleLowerCase())).size !== question.options.length) {
      errors.push(`${question.id}: testo di opzioni duplicato`);
    }
    if (question.options.some(({ text, rationale }) => !text.trim() || !rationale.trim())) {
      errors.push(`${question.id}: testo o motivazione di un'opzione mancante`);
    }
    const correctCount = question.options.filter(({ isCorrect }) => isCorrect).length;
    if (correctCount !== question.selectCount) {
      errors.push(`${question.id}: selectCount ${question.selectCount} diverso dalle risposte corrette ${correctCount}`);
    }
    if (question.type === 'SINGLE_SELECT' && question.selectCount !== 1) {
      errors.push(`${question.id}: una domanda SINGLE_SELECT deve avere selectCount 1`);
    }
    if (question.type === 'MULTI_SELECT' && question.selectCount < 2) {
      errors.push(`${question.id}: una domanda MULTI_SELECT deve richiedere almeno 2 risposte`);
    }
    if (
      question.type === 'MULTI_SELECT' &&
      !new RegExp(`\\bseleziona\\s+${question.selectCount}\\b`, 'i').test(question.prompt)
    ) {
      errors.push(`${question.id}: il testo deve indicare quante risposte selezionare`);
    }
    if (!Number.isInteger(question.estimatedTimeSeconds) || question.estimatedTimeSeconds <= 0) {
      errors.push(`${question.id}: tempo stimato non valido`);
    }
  }

  addId(module.microSession.id, 'micro-sessione');
  checkStatus(module.microSession.verificationStatus, module.microSession.id);
  checkSources(module.microSession.sourceIds, module.microSession.id);
  if (!objectiveIds.has(module.microSession.objectiveId)) {
    errors.push(`${module.microSession.id}: obiettivo inesistente`);
  }
  const sessionMinutes = module.microSession.steps.reduce((total, step) => total + step.durationMinutes, 0);
  if (sessionMinutes !== module.microSession.durationMinutes || sessionMinutes < 5 || sessionMinutes > 25) {
    errors.push(`${module.microSession.id}: durata passi incoerente o fuori dall'intervallo 5–25 minuti`);
  }
  for (const step of module.microSession.steps) {
    addId(step.id, 'passo micro-sessione');
    if (!step.instruction.trim() || !Number.isFinite(step.durationMinutes) || step.durationMinutes <= 0) {
      errors.push(`${step.id}: istruzione o durata non valida`);
    }
  }
  return errors;
}
