
import { MyLog } from "./log";




export class EventEmitter<TypeMapInterface extends { [x: string]: any[] }> {
  events: { [x in keyof TypeMapInterface]?: Array<(...args: TypeMapInterface[x]) => void> } = {};
  constructor() { }

  addListener<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    let existing = this.events[event];
    if (!existing) {
      this.events[event] = existing = [];
    }
    existing.includes(listener) || existing.push(listener)

    return this;
  }
  on<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    // this.off(event, listener)
    return this.addListener(event, listener);
  }
  on_cb<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void) {
    // this.off(event, listener)
    this.addListener(event, listener);
    return listener
  }
  on_rm<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void) {
    // this.off(event, listener)
    this.addListener(event, listener);
    return () => {
      this.off(event, listener)
    }
  }
  static logger = new MyLog('EventEmitter')

  emit<T extends keyof TypeMapInterface>(event: T, ...args: TypeMapInterface[T]): boolean {
    let existing = this.events[event];
    // EventEmitter.logger.log({ event, args })
    if (!existing) {
      return false;
    }
    existing.forEach(fn => {
      fn(...args);
    });
    return true;
  }
  removeAllListeners<T extends keyof TypeMapInterface>(event: T): this {
    this.events[event] = [];
    return this;
  }

  off<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    let existing = this.events[event];
    if (!existing) {
      return this;
    }
    const index = existing.findIndex(_ => _ === listener)
    if (index < 0) {
      return this
    }
    existing.splice(index, 1)
    return this;
  }

  once<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    const fn = (...a: TypeMapInterface[T]) => {
      listener(...a)
      this.off(event, fn)
    }
    this.on(event, fn)
    return this;
  }
  prependListener<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface, listener: (...args: any[]) => void): this {
    return this;
  }
  prependOnceListener<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface, listener: (...args: any[]) => void): this {
    return this;
  }
  removeListener<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface, listener: (...args: any[]) => void): this {
    return this;
  }

  setMaxListeners(n: number): this {
    return this;
  }
  getMaxListeners(): number {
    return 0;
  }
  listeners<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface): Function[] {
    return [];
  }
  rawListeners<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface): Function[] {
    return [];
  }

  eventNames(): Array<keyof TypeMapInterface> {
    return [];
  }
  listenerCount(type: string): number {
    return 0;
  }
}




