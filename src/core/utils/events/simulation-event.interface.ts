export interface ISimulationEvent {
  destroy(): void;
  emit(event: string, ...args: any[]): boolean;
  on(event: string, fn: Function, context?: any): this;
  once(event: string, fn: Function, context?: any): this;
  addListener(event: string, fn: Function, context?: any): this;
  removeListener(event: string, fn?: Function, context?: any, once?: boolean): this;
  off(event: string, fn?: Function, context?: any, once?: boolean): this;
  removeAllListeners(event?: string): this;
}
