export interface Component {
  id: string;
  container: HTMLElement;

  update(): void;
}
