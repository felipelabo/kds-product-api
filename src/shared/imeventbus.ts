import { EventEmitter } from 'events';
import { Injectable } from '@nestjs/common';
import { EventBus } from './eventbus';

@Injectable()
export class InMemoryEventBus implements EventBus {
  private readonly emitter = new EventEmitter();

  emit(event: string, payload: unknown): void {
    this.emitter.emit(event, payload);
  }

  on(event: string, handler: (payload: any) => void): void {
    this.emitter.on(event, handler);
  }
}
