import { createElement } from 'lwc';
import TicTacToeApp from 'ttt/app';

const app = createElement('ttt-app', { is: TicTacToeApp });

// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
