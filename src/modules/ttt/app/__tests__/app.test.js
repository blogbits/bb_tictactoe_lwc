import { createElement } from 'lwc';
import TicTacToeApp from 'ttt/app';

describe('ttt-app', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO....', () => {
        const element = createElement('ttt-app', {
            is: TicTacToeApp
        });
        document.body.appendChild(element);

        // Get link
        const el = element.shadowRoot.querySelector('div');

        expect(el).toBeDefined();
    });
});
