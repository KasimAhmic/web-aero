import { Component } from '../@types/component';
import { registry } from '../system/registry';
import { DesktopShortcut } from './desktop-shortcut';
import { Taskbar } from './taskbar';
import { Window } from './window';
import { eventEmitter } from '../system/event-emitter';
import { ApplicationLaunchEvent } from '../system/events/application-launch';
import { ApplicationCloseEvent } from '../system/events/application-close.event';
import { v4 } from 'uuid';

export class Desktop implements Component {
  public readonly id: string;
  public readonly container: HTMLDivElement;

  private windows: Window[] = [];
  private shortcuts: DesktopShortcut[] = [];

  constructor() {
    this.id = v4();
    this.container = document.createElement('div');
    this.container.id = this.id;

    eventEmitter.on(ApplicationLaunchEvent, (context) => {
      this.windows.push(new Window(context.name));
      this.update();
    });

    eventEmitter.on(ApplicationCloseEvent, (context) => {
      this.windows = this.windows.filter((window) => window.id !== context.applicationId);

      for (const node of this.container.childNodes) {
        if ((node as HTMLElement).id === context.applicationId) {
          this.container.removeChild(node);
          break;
        }
      }
    });

    this.createDesktopShortcuts();
    this.createTaskbar();

    this.applyStyling();
    this.update();
  }

  update() {
    for (const window of this.windows) {
      this.container.appendChild(window.container);
    }

    for (const shortcut of this.shortcuts) {
      this.container.appendChild(shortcut.container);
    }
  }

  applyStyling() {
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.backgroundSize = 'cover';
    this.container.style.overflow = 'hidden';
    this.container.style.backgroundImage = registry.get('wallpaper');
  }

  createDesktopShortcuts() {
    this.shortcuts.push(new DesktopShortcut('Firefox'));
  }

  createTaskbar() {
    this.container.appendChild(new Taskbar().container);
  }
}
