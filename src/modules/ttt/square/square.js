import { LightningElement, api } from 'lwc';

export default class Square extends LightningElement {
    @api symbol;
    @api idx;
}
