import { Component } from '../@types/component';

export class Stackable {
  private readonly component: Component;

  constructor(component: Component) {
    this.component = component;

    this.component.container.addEventListener('mousedown', () => this.handleStack());
  }

  private handleStack() {
    const zIndex = this.component.container.style.zIndex;
    const maxZIndex = this.getMaxZIndex();

    if (zIndex === maxZIndex) {
      return;
    }

    this.component.container.style.zIndex = maxZIndex;
  }

  private getMaxZIndex(): string {
    const aeroWindows = document.getElementsByClassName('window') as HTMLCollectionOf<HTMLDivElement>;

    let maxZIndex = 0;

    for (const aeroWindow of aeroWindows) {
      const zIndex = parseInt(aeroWindow.style.zIndex);

      if (zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    }

    return `${maxZIndex + 1}`;
  }
}
