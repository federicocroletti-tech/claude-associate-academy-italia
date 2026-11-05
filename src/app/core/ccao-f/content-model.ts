export type VerificationStatus =
  | 'VERIFIED_OFFICIAL'
  | 'VERIFIED_SECONDARY'
  | 'UNVERIFIED'
  | 'CONFLICTING'
  | 'OUTDATED';

export type ContentDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface ContentSource {
  id: string;
  title: string;
  url: string;
  organization: string;
  sourceType: 'EXAM_GUIDE' | 'OFFICIAL_DOCUMENTATION' | 'OFFICIAL_COURSE';
  language: string;
  sourceVersion?: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  supports: string;
  limitations: string;
}

export interface ExamObjective {
  id: string;
  description: string;
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
}

export interface Summary {
  id: string;
  level: 'QUICK' | 'REVIEW';
  body: string;
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
}

export interface Lesson {
  id: string;
  updatedAt: string;
  title: string;
  objectiveIds: readonly string[];
  body: string;
  keyTerms: readonly string[];
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
}

export interface ExampleOption {
  id: string;
  text: string;
  rationale: string;
}

export interface Example {
  id: string;
  domainId: string;
  objectiveId: string;
  title: string;
  context: string;
  problem: string;
  options: readonly ExampleOption[];
  bestChoiceId: string;
  rationale: string;
  limitations: string;
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
  isOriginalPractice: true;
}

export interface Flashcard {
  id: string;
  domainId: string;
  objectiveId: string;
  type:
    | 'DEFINITION'
    | 'COMPREHENSION'
    | 'APPLICATION'
    | 'COMPARISON'
    | 'SCENARIO'
    | 'ERROR_RECOGNITION'
    | 'REVERSE';
  difficulty: ContentDifficulty;
  front: string;
  back: string;
  explanation: string;
  example: string;
  tags: readonly string[];
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
  reviewIntervalDays: number;
  createdAt: string;
  reviewedAt: string | null;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  rationale: string;
}

export interface QuizQuestion {
  id: string;
  domainId: string;
  objectiveId: string;
  type: 'SINGLE_SELECT' | 'MULTI_SELECT';
  difficulty: ContentDifficulty;
  prompt: string;
  simplifiedEnglish?: string;
  options: readonly QuizOption[];
  selectCount: number;
  explanation: string;
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
  tags: readonly string[];
  estimatedTimeSeconds: number;
  isOriginalPractice: true;
}

export interface GuidedMicroSession {
  id: string;
  objectiveId: string;
  title: string;
  durationMinutes: number;
  steps: readonly {
    id: string;
    activity:
      | 'PREREQUISITE_CHECK'
      | 'READ_SUMMARY'
      | 'STUDY_LESSON'
      | 'WORK_EXAMPLE'
      | 'ANSWER_QUIZ'
      | 'ACTIVE_RECALL'
      | 'SCHEDULE_REVIEW';
    instruction: string;
    contentId?: string;
    durationMinutes: number;
  }[];
  sourceIds: readonly string[];
  verificationStatus: VerificationStatus;
}

export interface ExamDomainModule {
  id: string;
  certificationCode: string;
  blueprintVersion: string;
  title: string;
  weightPercent: number;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  objectives: readonly ExamObjective[];
  summaries: readonly Summary[];
  lesson: Lesson;
  examples: readonly Example[];
  flashcards: readonly Flashcard[];
  questions: readonly QuizQuestion[];
  microSession: GuidedMicroSession;
  sources: readonly ContentSource[];
}
