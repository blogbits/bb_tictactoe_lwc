/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import { X, O } from 'ttt/game';

export default class SelectSymbol extends LightningElement {

    @api symbol

    get symbolX() {
        return X;
    }

    get symbolO() {
        return O;
    }

    setSelectedRadioBtn() {

        let elements = this.template.querySelectorAll('input[name="userSymbol"]');
        elements.forEach(elm => {
            if ((elm.getAttribute('value') === O) && (this.symbol === O)) {
                elm.setAttribute('checked', '');
            }
            else if ((elm.getAttribute('value') === X) && (this.symbol === X)) {
                elm.setAttribute('checked', '');
            }
        });
    }
    renderedCallback() {     
       this.setSelectedRadioBtn()
    }

    handleChange(evt){        
        this.dispatchEvent( new CustomEvent('symbolchange', {detail: evt.target.value}))
    }
}
