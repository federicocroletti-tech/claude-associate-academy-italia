import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { MODULES } from './learning-data';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly storageKey = 'claude-academy-progress';
  readonly completedModuleIds = signal<string[]>([]);
  readonly storageMessage = signal('Progressi salvati solo in questo browser.');

  constructor() {
    if (!this.isBrowser) return;

    afterNextRender(() => {
      this.completedModuleIds.set(this.readLocalProgress());
    });
  }

  isComplete(moduleId: string): boolean {
    return this.completedModuleIds().includes(moduleId);
  }

  complete(moduleId: string): void {
    if (!this.isBrowser || !MODULES.some((module) => module.id === moduleId)) return;
    const next = [...new Set([...this.completedModuleIds(), moduleId])];
    this.completedModuleIds.set(next);
    this.writeLocalProgress(next);
  }

  reset(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(this.storageKey);
      this.completedModuleIds.set([]);
      this.storageMessage.set('Progressi azzerati in questo browser.');
    } catch (error) {
      this.storageMessage.set('Azzeramento non riuscito: i progressi sono stati mantenuti.');
      console.error('Azzeramento dei progressi locali non riuscito.', error);
    }
  }

  private readLocalProgress(): string[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('Formato progressi non valido.');
      return [...new Set(parsed.filter(
        (value): value is string =>
          typeof value === 'string' && MODULES.some((module) => module.id === value),
      ))];
    } catch (error) {
      console.warn('Lettura dei progressi locali non riuscita.', error);
      this.storageMessage.set(
        'Lettura non riuscita: i progressi saranno disponibili solo in questa sessione.',
      );
      return [];
    }
  }

  private writeLocalProgress(ids: readonly string[]): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(ids));
    } catch (error) {
      this.storageMessage.set(
        'Memoria browser non disponibile: i progressi restano solo in questa sessione.',
      );
      console.error('Salvataggio locale dei progressi non riuscito.', error);
    }
  }
}
