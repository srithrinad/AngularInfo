import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalTypeDto, RentalTypeFeatureValueDto, RentalTypeImageDto,RentalTypeService } from '../../rental-type';
import { compare, deepClone } from "fast-json-patch";
import { MarinaService,Marina } from '../../marina/' 
import Quill from 'quill';
import { ContractTemplateService } from '../services'
import { ContractTemplate } from '../model'

@Component({
    selector: "contract-template",
    templateUrl: "./contract-template.component.html",
    encapsulation: ViewEncapsulation.None
    //styleUrls: ["./rental-type.component.scss"]
})
export class ContractTemplateComponent implements OnInit {

    public marinaId: number;

    public item: ContractTemplate;
    private original: ContractTemplate;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private entityService: ContractTemplateService) {
        this.item = this.original = new ContractTemplate();
    }

    public ngOnInit() {
        this.marinaId = this.route.snapshot.params['itemId'];

        this.entityService.get(this.marinaId).subscribe(result => {
            this.original = deepClone(result); //Need a clone so that we can detect changes
            this.item = result;
        });
    }

    public save(): void {
        var patch = compare(this.original, this.item);

        this.entityService.patch(this.marinaId, patch).subscribe(result => {
            this.router.navigateByUrl('admin/contracttemplate');
        });
    }
}