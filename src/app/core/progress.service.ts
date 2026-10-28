import { Injectable, signal } from "@angular/core";
import { MODULES } from "./learning-data";

@Injectable({ providedIn: "root" })
export class ProgressService {
  private readonly storageKey = "claude-academy-progress";
  readonly completedModuleIds = signal<string[]>(this.readLocalProgress());
  readonly storageMessage = signal("Progressi salvati solo in questo browser.");

  isComplete(moduleId: string): boolean {
    return this.completedModuleIds().includes(moduleId);
  }

  complete(moduleId: string): void {
    if (!MODULES.some((module) => module.id === moduleId)) return;
    const next = [...new Set([...this.completedModuleIds(), moduleId])];
    this.completedModuleIds.set(next);
    this.writeLocalProgress(next);
  }

  private readLocalProgress(): string[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed))
        throw new Error("Formato progressi non valido.");
      return parsed.filter(
        (value): value is string =>
          typeof value === "string" &&
          MODULES.some((module) => module.id === value),
      );
    } catch (error) {
      console.warn("Lettura dei progressi locali non riuscita.", error);
      return [];
    }
  }

  private writeLocalProgress(ids: readonly string[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(ids));
    } catch (error) {
      this.storageMessage.set(
        "Memoria browser non disponibile: i progressi restano solo in questa sessione.",
      );
      console.error("Salvataggio locale dei progressi non riuscito.", error);
    }
  }
}
