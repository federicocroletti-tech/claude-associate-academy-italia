import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { MODULES } from './learning-data';

interface SavedProgress {
  completedModuleIds: string[];
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'claude-academy-progress';
  private readonly learnerKey = 'claude-academy-learner';
  readonly completedModuleIds = signal<string[]>(this.readLocalProgress());
  readonly syncMessage = signal('Progressi salvati in questo browser.');
  private readonly learnerId = this.getLearnerId();

  constructor() {
    this.http
      .get<SavedProgress>('/api/progress', { headers: this.headers() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.syncMessage.set('Server non disponibile: i progressi restano salvati in questo browser.');
          console.warn('Sincronizzazione progressi non riuscita.', error.message);
          return of(null);
        }),
      )
      .subscribe((remoteProgress) => {
        if (!remoteProgress) return;
        const validIds = remoteProgress.completedModuleIds.filter((id) =>
          MODULES.some((module) => module.id === id),
        );
        this.completedModuleIds.set(validIds);
        this.writeLocalProgress(validIds);
        this.syncMessage.set('Progressi sincronizzati con il server.');
      });
  }

  isComplete(moduleId: string): boolean {
    return this.completedModuleIds().includes(moduleId);
  }

  complete(moduleId: string): void {
    if (!MODULES.some((module) => module.id === moduleId)) return;
    const next = [...new Set([...this.completedModuleIds(), moduleId])];
    this.completedModuleIds.set(next);
    this.writeLocalProgress(next);
    this.http
      .post<SavedProgress>(
        '/api/progress',
        { completedModuleIds: next },
        { headers: this.headers() },
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.syncMessage.set('Salvato in questo browser; sincronizzazione server non riuscita.');
          console.warn('Salvataggio progressi sul server non riuscito.', error.message);
          return of(null);
        }),
      )
      .subscribe((saved) => {
        if (saved) this.syncMessage.set('Progressi salvati su questo dispositivo e sul server.');
      });
  }

  private readLocalProgress(): string[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('Formato progressi non valido.');
      return parsed.filter(
        (value): value is string =>
          typeof value === 'string' && MODULES.some((module) => module.id === value),
      );
    } catch (error) {
      console.warn('Lettura dei progressi locali non riuscita.', error);
      return [];
    }
  }

  private writeLocalProgress(ids: readonly string[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(ids));
    } catch (error) {
      this.syncMessage.set('Memoria browser non disponibile: i progressi non sono stati salvati.');
      console.error('Salvataggio locale dei progressi non riuscito.', error);
    }
  }

  private getLearnerId(): string {
    const saved = localStorage.getItem(this.learnerKey);
    if (saved && /^[0-9a-f-]{36}$/i.test(saved)) return saved;
    const generated = crypto.randomUUID();
    localStorage.setItem(this.learnerKey, generated);
    return generated;
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.learnerId}` });
  }
}
