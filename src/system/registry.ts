import { Serializable } from '../@types/serializable';

const properties = {
  wallpaper: 'url(assets/wallpapers/bliss.jpg)',
  blurAmount: 5,
  glassColor: 'rgba(0, 162, 237, 0.25)',
};

type Properties = typeof properties;

export class Registry {
  private store: Map<string, Serializable> = new Map();

  // TODO: Load from local storage
  load() {
    for (const [key, value] of Object.entries(properties)) {
      this.set(key, value);
    }
  }

  // TODO: Persist to local storage
  persist() {}

  set(key: string, value: Serializable): void {
    this.store.set(key, value);
  }

  get<K extends keyof Properties>(key: K): Properties[K] {
    return this.store.get(key) as Properties[K];
  }

  delete(key: string): void {
    this.store.delete(key);
  }
}

export const registry = new Registry();
registry.load();
