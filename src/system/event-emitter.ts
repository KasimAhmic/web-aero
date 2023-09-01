import { ISystemEvent } from './events/system-event';

interface EventConstructor {
  ID: string;
  new (...args: any): ISystemEvent;
}

interface EventSubscription<T extends ISystemEvent> {
  id: Symbol;
  listener: (eventContext: T['context']) => void;
}

class EventEmitter {
  private readonly subscriptions: Map<string, EventSubscription<ISystemEvent>[]>;

  constructor() {
    this.subscriptions = new Map();
  }

  on<T extends EventConstructor>(
    eventConstructor: T,
    listener: (context: InstanceType<T>['context']) => void,
  ): Symbol {
    if (!this.subscriptions.has(eventConstructor.ID)) {
      this.subscriptions.set(eventConstructor.ID, []);
    }

    const id = Symbol();

    this.subscriptions.get(eventConstructor.ID)!.push({ id, listener });

    return id;
  }

  off<T extends EventConstructor>(
    eventConstructor: T,
    listener: (context: InstanceType<T>['context']) => void,
  ): void {
    if (!this.subscriptions.has(eventConstructor.ID)) {
      return;
    }

    const subscriptionIndex = this.subscriptions
      .get(eventConstructor.ID)!
      .findIndex((subscription) => subscription.listener === listener);

    if (subscriptionIndex === -1) {
      return;
    }

    this.subscriptions.get(eventConstructor.ID)!.splice(subscriptionIndex, 1);
  }

  emit<T extends EventConstructor>(eventConstructor: T, eventContext: InstanceType<T>['context']): void {
    if (!this.subscriptions.has(eventConstructor.ID)) {
      return;
    }

    const event = new eventConstructor(eventContext);

    for (const subscription of this.subscriptions.get(eventConstructor.ID)!) {
      try {
        subscription.listener(event.context);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export const eventEmitter = new EventEmitter();
