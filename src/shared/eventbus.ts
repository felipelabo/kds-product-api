/*export interface EventBus {
  emit(event: string, payload: unknown): void;
  on(event: string, handler: (payload: any) => void): void;
}*/

export abstract class EventBus {
  abstract emit(event: string, payload: unknown): void;
  abstract on(event: string, handler: Function): void;
}
