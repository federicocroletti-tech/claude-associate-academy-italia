import assert from 'node:assert/strict';
import test from 'node:test';
import { validateExamDomainModule } from '../src/app/core/ccao-f/content-validator.ts';
import { OUTPUT_EVALUATION } from '../src/app/core/ccao-f/output-evaluation.ts';

test('il pilota copre il dominio v1.0 con contenuti e quantità richieste', () => {
  assert.equal(OUTPUT_EVALUATION.certificationCode, 'CCAO-F');
  assert.equal(OUTPUT_EVALUATION.weightPercent, 21);
  assert.equal(OUTPUT_EVALUATION.objectives.length, 4);
  assert.equal(OUTPUT_EVALUATION.summaries.length, 2);
  assert.equal(OUTPUT_EVALUATION.examples.length, 3);
  assert.equal(OUTPUT_EVALUATION.flashcards.length, 10);
  assert.equal(OUTPUT_EVALUATION.questions.length, 10);
  assert.equal(OUTPUT_EVALUATION.microSession.durationMinutes, 22);
  assert.equal(
    OUTPUT_EVALUATION.microSession.steps.filter((step) => step.activity === 'ANSWER_QUIZ').length,
    3,
  );
  assert.deepEqual(validateExamDomainModule(OUTPUT_EVALUATION), []);
});

test('il validatore intercetta errori di schema e riferimenti', () => {
  const invalid = structuredClone(OUTPUT_EVALUATION);
  invalid.questions[0].selectCount = 2;
  invalid.questions[0].sourceIds = ['S-DOES-NOT-EXIST'];
  Object.assign(invalid.flashcards[0], { verificationStatus: 'INVALID' });
  invalid.summaries[0].body = 'Sintesi troppo breve.';

  const errors = validateExamDomainModule(invalid);
  assert.ok(errors.some((error) => error.includes('selectCount')));
  assert.ok(errors.some((error) => error.includes('fonte inesistente')));
  assert.ok(errors.some((error) => error.includes('stato di verifica')));
  assert.ok(errors.some((error) => error.includes('sintesi rapida')));
});

test('gli item del pilota sono marcati come esercizi originali, mai ufficiali', () => {
  assert.ok(OUTPUT_EVALUATION.examples.every((example) => example.isOriginalPractice));
  assert.ok(OUTPUT_EVALUATION.questions.every((question) => question.isOriginalPractice));
  assert.ok(OUTPUT_EVALUATION.questions.every((question) => question.sourceIds.length > 0));
});
