import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AcademyModule, MODULES } from '../core/learning-data';
import { ProgressService } from '../core/progress.service';

type Page = 'overview' | 'lesson' | 'quiz' | 'summary' | 'sources';
type StudyMode = 'rapida' | 'standard' | 'approfondita';

const SOURCES: Readonly<Record<string, { title: string; url: string }>> = {
  'claude-api': { title: 'Claude API: documentazione introduttiva', url: 'https://platform.claude.com/docs/en/intro' },
  'models-overview': { title: 'Modelli Claude', url: 'https://platform.claude.com/docs/en/about-claude/models/overview' },
  'ai-fluency': { title: 'AI Fluency: framework and foundations', url: 'https://academy.claude.com/' },
  'prompt-engineering': { title: 'Prompt engineering overview', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview' },
  'messages-api': { title: 'Messages API', url: 'https://platform.claude.com/docs/en/api/messages' },
  'structured-outputs': { title: 'Structured outputs', url: 'https://platform.claude.com/docs/en/build-with-claude/structured-outputs' },
  'tool-use': { title: 'Tool use overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview' },
  'mcp-spec': { title: 'Model Context Protocol: introduzione', url: 'https://modelcontextprotocol.io/docs/getting-started/intro' },
  'rag-docs': { title: 'Prompt engineering e document retrieval', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview' },
  'agents-overview': { title: 'Building with Claude: tool use e agenti', url: 'https://platform.claude.com/docs/en/agents-and-tools/overview' },
  'claude-code': { title: 'Claude Code: documentazione', url: 'https://code.claude.com/docs/en/overview' },
  evaluations: { title: 'Define success criteria and build evaluations', url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests' },
  'security-guidance': { title: 'Anthropic: approccio alla sicurezza', url: 'https://www.anthropic.com/safety' },
  'api-errors': { title: 'Gestione degli errori API', url: 'https://platform.claude.com/docs/en/api/errors' },
  'bedrock-models': { title: 'Amazon Bedrock: modelli supportati', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html' },
  'usage-policy': { title: 'Anthropic: Usage Policy', url: 'https://www.anthropic.com/legal/aup' },
  'academy-certification': { title: 'Claude Certified Architect – Foundations', url: 'https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification' },
};

@Component({
  selector: 'academy-root',
  standalone: true,
  templateUrl: './academy-page.component.html',
  styleUrl: './academy-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyPageComponent {
  private readonly progress = inject(ProgressService);
  readonly modules = MODULES;
  readonly page = signal<Page>('overview');
  readonly studyMode = signal<StudyMode>('standard');
  readonly selectedModule = signal<AcademyModule>(MODULES[0]);
  readonly clickOnly = signal(true);
  readonly completedModuleIds = this.progress.completedModuleIds;
  readonly syncMessage = this.progress.syncMessage;
  readonly progressPercent = computed(() =>
    Math.round((this.completedModuleIds().length / this.modules.length) * 100),
  );
  readonly quizIndex = signal(0);
  readonly answerIndex = signal<number | null>(null);
  readonly answerSubmitted = signal(false);
  readonly correctAnswers = signal(0);
  readonly quizModule = computed(() => this.modules[this.quizIndex()]);
  readonly quizQuestion = computed(() => this.quizModule().question);
  readonly questionCount = this.modules.length;
  readonly currentSource = computed(() => SOURCES[this.selectedModule().question.sourceId]);
  readonly quizSource = computed(() => SOURCES[this.quizQuestion().sourceId]);
  readonly summaryPercent = computed(() =>
    Math.round((this.correctAnswers() / this.questionCount) * 100),
  );

  chooseMode(mode: StudyMode): void {
    this.studyMode.set(mode);
  }

  openModule(module: AcademyModule): void {
    this.selectedModule.set(module);
    this.page.set('lesson');
  }

  startQuiz(): void {
    this.quizIndex.set(0);
    this.answerIndex.set(null);
    this.answerSubmitted.set(false);
    this.correctAnswers.set(0);
    this.page.set('quiz');
  }

  chooseAnswer(index: number): void {
    if (this.answerSubmitted()) return;
    this.answerIndex.set(index);
  }

  submitAnswer(): void {
    const chosen = this.answerIndex();
    if (chosen === null || this.answerSubmitted()) return;
    if (chosen === this.quizQuestion().correctIndex) {
      this.correctAnswers.update((score) => score + 1);
    }
    this.answerSubmitted.set(true);
  }

  nextQuestion(): void {
    const nextIndex = this.quizIndex() + 1;
    if (nextIndex >= this.questionCount) {
      this.page.set('summary');
      return;
    }
    this.quizIndex.set(nextIndex);
    this.answerIndex.set(null);
    this.answerSubmitted.set(false);
  }

  completeSelectedModule(): void {
    this.progress.complete(this.selectedModule().id);
  }

  isComplete(moduleId: string): boolean {
    return this.progress.isComplete(moduleId);
  }

  sourceFor(module: AcademyModule): { title: string; url: string } {
    return SOURCES[module.question.sourceId];
  }

  resetProgress(): void {
    if (this.completedModuleIds().length === 0) return;
    this.page.set('overview');
  }
}
