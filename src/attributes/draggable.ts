import { Component } from '../@types/component';
import { clamp } from '../util/math';

export class Draggable {
  private readonly component: Component;
  private readonly handle: HTMLElement;

  constructor(component: Component, handle: HTMLElement) {
    this.component = component;
    this.handle = handle;

    this.handle.addEventListener('mousedown', (event) => this.handleDrag(event));
  }

  private handleDrag(event: MouseEvent) {
    const initialX = event.clientX - this.component.container.offsetLeft;
    const initialY = event.clientY - this.component.container.offsetTop;

    const mouseMoveCallback = (event: MouseEvent) => {
      const positionX = clamp(
        event.clientX - initialX,
        0,
        window.innerWidth - this.component.container.clientWidth,
      );
      const positionY = clamp(
        event.clientY - initialY,
        0,
        window.innerHeight - this.component.container.clientHeight,
      );

      this.component.container.style.left = `${positionX}px`;
      this.component.container.style.top = `${positionY}px`;
    };

    const mouseUpCallback = () => {
      window.removeEventListener('mousemove', mouseMoveCallback);
      window.removeEventListener('mouseup', mouseUpCallback);
    };

    window.addEventListener('mousemove', mouseMoveCallback);
    window.addEventListener('mouseup', mouseUpCallback);
  }
}
