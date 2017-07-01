declare class EventEmitter {
  constructor();

  on(event: string, listener: (...data: any[]) => void): () => void;

  emit(event: string, ...data: any[]): void;

  on(event: string, listener: (...data: any[]) => void): () => void;

  off(event: string): void;

  clear(): void;

  emitting(event: string, dataArray: any[], listener: Function): void;
}
