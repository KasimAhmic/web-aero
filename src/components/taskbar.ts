import { v4 } from 'uuid';
import { Component } from '../@types/component';
import { registry } from '../system/registry';

export class Taskbar implements Component {
  public readonly id: string;
  public readonly container: HTMLDivElement;

  constructor() {
    this.id = v4();
    this.container = document.createElement('div');
    this.container.id = 'taskbar';

    this.applyStyling();
    this.update();
  }

  update() {}

  applyStyling() {
    this.container.style.width = '100%';
    this.container.style.height = '40px';
    this.container.style.position = 'absolute';
    this.container.style.bottom = '0';
    this.container.style.left = '0';
    this.container.style.backgroundColor = registry.get('glassColor');
    this.container.style.backdropFilter = `blur(${registry.get('blurAmount')}px)`;
    this.container.style.zIndex = '999999';
    this.container.style.boxShadow = `
      inset 0 1px 0 0 rgba(255, 255, 255, 0.35),
      0 0 0 1px rgba(0, 0, 0, 0.65)
    `;
  }
}
