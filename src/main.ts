import { Desktop } from './components/desktop';
import './style.css';

const desktop = new Desktop();

document.getElementById('app')?.appendChild(desktop.container);
