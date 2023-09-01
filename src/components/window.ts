import { v4 } from 'uuid';
import { Component } from '../@types/component';
import { Draggable } from '../attributes/draggable';
import { Resizable } from '../attributes/resizable';
import { Stackable } from '../attributes/stackable';
import { eventEmitter } from '../system/event-emitter';
import { ApplicationCloseEvent } from '../system/events/application-close.event';
import { registry } from '../system/registry';

export class Window implements Component {
  public readonly id: string;
  public readonly container: HTMLElement;

  private title: string;

  constructor(title: string) {
    this.id = v4();

    this.title = title;

    this.container = document.createElement('div');
    this.container.classList.add('window');
    this.container.id = this.id;

    const header = this.container.appendChild(this.createHeader());

    this.container.appendChild(this.createContentBody());

    new Draggable(this, header);
    new Stackable(this);
    new Resizable(this, {
      top: true,
      left: true,
      right: true,
      bottom: true,
      topLeft: true,
      topRight: true,
      bottomLeft: true,
      bottomRight: true,
    });

    this.applyStyling();
    this.update();
  }

  update(): void {}

  applyStyling(): void {
    this.container.style.position = 'absolute';
    this.container.style.top = '200px';
    this.container.style.left = '200px';
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';
    this.container.style.gap = '8px';
    this.container.style.width = '700px';
    this.container.style.height = '450px';
    this.container.style.padding = '8px';
    this.container.style.background = `
    ${registry.get('glassColor')}
    linear-gradient(
      180deg,
      rgba(255,255,255,0) 35px,
      rgba(255,255,255,0.5) 30%,
      rgba(255,255,255,0) 30%,
      rgba(255,255,255,0) 0%
    )`;
    this.container.style.borderRadius = '7px';
    this.container.style.backdropFilter = `blur(${registry.get('blurAmount')}px)`;
    this.container.style.boxShadow = `
      inset 0 0 0 1px rgba(255, 255, 255, 0.5),
      0 0 0 1px rgba(0, 0, 0, 0.65),
      0 0 10px rgba(0, 0, 0, 0.75),
      0 0 10px rgba(0, 0, 0, 0.75)
    `;
    this.container.style.boxSizing = 'border-box';
  }

  createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');

    header.style.margin = '-8px';
    header.style.padding = '8px';
    header.style.overflow = 'hidden';
    header.style.whiteSpace = 'nowrap';
    header.style.textOverflow = 'ellipsis';

    const title = document.createElement('span');
    title.innerText = this.title;

    title.style.color = '#000000';
    title.style.fontFamily = 'Segoe UI, Open Sans, sans-serif';
    title.style.fontSize = '12px';
    title.style.fontWeight = 'normal';
    title.style.textShadow = `
      0 0 10px rgba(255, 255, 255, 1),
      0 0 10px rgba(255, 255, 255, 1)
    `;
    title.style.userSelect = 'none';

    header.appendChild(title);

    return header;
  }

  createContentBody() {
    const contentBody = document.createElement('div');
    contentBody.classList.add('content-body');

    contentBody.style.flex = '1';
    contentBody.style.backgroundColor = '#FFFFFF';
    contentBody.style.borderRadius = '2px';
    contentBody.style.boxShadow = `
      inset 0 0 0 1px rgba(0, 0, 0, 1),
      0 0 0 1px rgba(255, 255, 255, 0.5)
    `;

    const content = document.createElement('div');
    const button = document.createElement('button');

    button.innerText = 'Close Window';
    button.addEventListener('click', () => {
      eventEmitter.emit(ApplicationCloseEvent, { applicationId: this.id });
    });

    content.appendChild(button);

    contentBody.appendChild(content);

    return contentBody;
  }
}
