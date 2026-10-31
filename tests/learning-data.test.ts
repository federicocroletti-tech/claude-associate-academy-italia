import assert from "node:assert/strict";
import test from "node:test";
import { MODULES } from "../src/app/core/learning-data.ts";

test("i moduli hanno identificativi e numerazione univoci", () => {
  const ids = MODULES.map((module) => module.id);
  const numbers = MODULES.map((module) => module.number);

  assert.ok(MODULES.length > 0);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(numbers).size, numbers.length);
  assert.deepEqual(
    numbers,
    MODULES.map((_, index) => index),
  );
});

test("ogni quiz ha una risposta corretta e spiegazioni complete", () => {
  for (const module of MODULES) {
    const { question } = module;

    assert.ok(module.title.trim(), `${module.id}: titolo mancante`);
    assert.ok(module.objective.trim(), `${module.id}: obiettivo mancante`);
    assert.ok(module.practice.trim(), `${module.id}: esercitazione mancante`);
    assert.ok(question.prompt.trim(), `${module.id}: domanda mancante`);
    assert.ok(
      question.options.length >= 2,
      `${module.id}: opzioni insufficienti`,
    );
    assert.ok(
      Number.isInteger(question.correctIndex) &&
        question.correctIndex >= 0 &&
        question.correctIndex < question.options.length,
      `${module.id}: indice risposta corretta fuori intervallo`,
    );
    assert.equal(
      question.wrongOptions.length,
      question.options.length - 1,
      `${module.id}: spiegazioni delle risposte errate incomplete`,
    );
    assert.ok(
      question.explanation.trim(),
      `${module.id}: spiegazione corretta mancante`,
    );
    assert.ok(
      question.review.trim(),
      `${module.id}: argomento di ripasso mancante`,
    );
    assert.ok(question.sourceId.trim(), `${module.id}: fonte mancante`);
  }
});
