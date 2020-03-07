import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MarinaService } from '../../marina';
import { ContractTemplateService } from '../services'
import { ContractTemplate } from '../model'

@Component({
    selector: "contract-template-list",
    templateUrl: "./contract-template-list.component.html",
    encapsulation: ViewEncapsulation.None
    //styleUrls: ["./rental-type-list.component.scss"]
})
export class ContractTemplateListComponent implements OnInit {
    public list: ContractTemplate[];

    constructor(private router: Router,
        private marinaService: ContractTemplateService) {}

    ngOnInit() {
        this.marinaService.list().subscribe(result => {
            this.list = result;
        });
    }

    onRowSelect(event) {
        this.router.navigateByUrl(`contracttemplate/${event.data.id}`);
    }
}
