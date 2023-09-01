export interface ISystemEvent {
  context: unknown;
}

export abstract class SystemEvent<Context = unknown> implements ISystemEvent {
  public readonly context: Context;

  constructor(context: Context) {
    this.context = context;
  }
}
