import {Directive, AfterViewChecked} from '@angular/core';

import 'material-design-lite/material.js';

declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewChecked{

    ngAfterViewChecked() {

         componentHandler.upgradeAllRegistered();
    }
}