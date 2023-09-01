import { v4 } from 'uuid';
import { Component } from '../@types/component';
import { eventEmitter } from '../system/event-emitter';
import { ApplicationLaunchEvent } from '../system/events/application-launch';

export class DesktopShortcut implements Component {
  public readonly id: string;
  public readonly container: HTMLDivElement;

  private readonly label: string;

  constructor(label: string) {
    this.id = v4();
    this.container = document.createElement('div');

    this.label = label;

    this.container.classList.add('desktop-shortcut');

    this.container.appendChild(this.createIcon());
    this.container.appendChild(this.createLabel());

    this.applyStyling();
    this.update();
  }

  update(): void {}

  private createIcon() {
    const icon = document.createElement('div');

    icon.style.width = '64px';
    icon.style.height = '64px';
    icon.style.backgroundImage =
      'url(https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg)';
    icon.style.backgroundSize = '64px 64px';

    return icon;
  }

  private createLabel() {
    const label = document.createElement('div');
    label.innerText = this.label;

    label.style.fontFamily = 'Segoe UI, Open Sans, sans-serif';
    label.style.fontSize = '14px';
    label.style.color = '#FFFFFF';
    label.style.textShadow = '0 1px 1px rgba(0, 0, 0, 1)';

    return label;
  }

  private applyStyling(): void {
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';
    this.container.style.alignItems = 'center';
    this.container.style.justifyContent = 'center';
    this.container.style.width = '96px';
    this.container.style.height = '96px';
    this.container.style.margin = '10px';
    this.container.style.borderRadius = '5px';
    this.container.style.textAlign = 'center';
    this.container.style.boxSizing = 'border-box';

    this.container.addEventListener('mouseover', () => {
      this.container.style.backgroundColor = 'rgba(0, 162, 237, 0.25)';
      this.container.style.color = '#fff';
      this.container.style.boxShadow = 'inset 0 0 0 2px rgba(0, 162, 255, 0.75)';
    });

    this.container.addEventListener('mouseout', () => {
      this.container.style.backgroundColor = 'transparent';
      this.container.style.color = '#000';
      this.container.style.boxShadow = 'unset';
    });

    this.container.addEventListener('dblclick', () => {
      eventEmitter.emit(ApplicationLaunchEvent, {
        name: this.label,
      });
    });
  }
}
