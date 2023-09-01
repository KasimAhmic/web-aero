import { Component } from '../@types/component';

type ResizeHandleLocation =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

type ResizeHandleOptions = Record<ResizeHandleLocation, boolean>;

export class Resizable {
  private readonly component: Component;

  private readonly resizeTargetSize = 5;

  constructor(component: Component, locations: ResizeHandleOptions) {
    this.component = component;

    this.createResizeHandles(locations);
  }

  private createResizeHandles(locations: ResizeHandleOptions) {
    for (const location in locations) {
      if (locations[location as ResizeHandleLocation]) {
        const handle = this.createResizeHandle(location as ResizeHandleLocation);

        handle.addEventListener('mousedown', (event) =>
          this.handleResize(event, location as ResizeHandleLocation),
        );

        this.component.container.appendChild(handle);
      }
    }
  }

  private createResizeHandle(direction: ResizeHandleLocation): HTMLDivElement {
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle', `resize-handle-${direction}`);

    resizeHandle.style.position = 'absolute';
    resizeHandle.style.cursor = `${direction}-resize`;

    resizeHandle.style.width = this.position(
      direction,
      `calc(100% - ${this.resizeTargetSize * 2}px)`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      `calc(100% - ${this.resizeTargetSize * 2}px)`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
    );
    resizeHandle.style.height = this.position(
      direction,
      `${this.resizeTargetSize}px`,
      `calc(100% - ${this.resizeTargetSize * 2}px)`,
      `calc(100% - ${this.resizeTargetSize * 2}px)`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
    );
    resizeHandle.style.top = this.position(
      direction,
      '0',
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      'unset',
      '0',
      '0',
      'unset',
      'unset',
    );
    resizeHandle.style.left = this.position(
      direction,
      `${this.resizeTargetSize}px`,
      '0',
      `calc(100% - ${this.resizeTargetSize}px)`,
      `${this.resizeTargetSize}px`,
      '0',
      'unset',
      '0',
      'unset',
    );
    resizeHandle.style.right = this.position(
      direction,
      `calc(100% - ${this.resizeTargetSize}px)`,
      '0',
      '0',
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      '0',
      `${this.resizeTargetSize}px`,
      '0',
    );
    resizeHandle.style.bottom = this.position(
      direction,
      `calc(100% - ${this.resizeTargetSize}px)`,
      `${this.resizeTargetSize}px`,
      `${this.resizeTargetSize}px`,
      '0',
      '0',
      '0',
      '0',
      '0',
    );
    resizeHandle.style.cursor = this.position(
      direction,
      'ns-resize',
      'ew-resize',
      'ew-resize',
      'ns-resize',
      'nwse-resize',
      'nesw-resize',
      'nesw-resize',
      'nwse-resize',
    );

    return resizeHandle;
  }

  private position(
    direction: ResizeHandleLocation,
    top: string,
    left: string,
    right: string,
    bottom: string,
    topLeft: string,
    topRight: string,
    bottomLeft: string,
    bottomRight: string,
  ) {
    switch (direction) {
      case 'top':
        return top;
      case 'left':
        return left;
      case 'right':
        return right;
      case 'bottom':
        return bottom;
      case 'topLeft':
        return topLeft;
      case 'topRight':
        return topRight;
      case 'bottomLeft':
        return bottomLeft;
      case 'bottomRight':
        return bottomRight;
    }
  }

  private handleResize(event: MouseEvent, location: ResizeHandleLocation) {
    const initialX = event.clientX;
    const initialY = event.clientY;
    const initialWidth = this.component.container.clientWidth;
    const initialHeight = this.component.container.clientHeight;

    const mouseMoveCallback = (event: MouseEvent) => {
      const deltaX = event.clientX - initialX;
      const deltaY = event.clientY - initialY;

      switch (location) {
        case 'top':
          this.setTop(initialY + deltaY);
          this.setHeight(initialHeight - deltaY);
          break;
        case 'left':
          this.setLeft(initialX + deltaX);
          this.setWidth(initialWidth - deltaX);
          break;
        case 'right':
          this.setWidth(initialWidth + deltaX);
          break;
        case 'bottom':
          this.setHeight(initialHeight + deltaY);
          break;
        case 'topLeft':
          this.setTop(initialY + deltaY);
          this.setLeft(initialX + deltaX);
          this.setWidth(initialWidth - deltaX);
          this.setHeight(initialHeight - deltaY);
          break;
        case 'topRight':
          this.setTop(initialY + deltaY);
          this.setWidth(initialWidth + deltaX);
          this.setHeight(initialHeight - deltaY);
          break;
        case 'bottomLeft':
          this.setLeft(initialX + deltaX);
          this.setWidth(initialWidth - deltaX);
          this.setHeight(initialHeight + deltaY);
          break;
        case 'bottomRight':
          this.setWidth(initialWidth + deltaX);
          this.setHeight(initialHeight + deltaY);
          break;
      }
    };

    const mouseUpCallback = () => {
      window.removeEventListener('mousemove', mouseMoveCallback);
      window.removeEventListener('mouseup', mouseUpCallback);
    };

    window.addEventListener('mousemove', mouseMoveCallback);
    window.addEventListener('mouseup', mouseUpCallback);
  }

  private setWidth(width: number) {
    this.component.container.style.width = `${width}px`;
  }

  private setHeight(height: number) {
    this.component.container.style.height = `${height}px`;
  }

  private setTop(top: number) {
    this.component.container.style.top = `${top}px`;
  }

  private setLeft(left: number) {
    this.component.container.style.left = `${left}px`;
  }
}
