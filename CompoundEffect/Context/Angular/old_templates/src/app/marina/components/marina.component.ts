import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalTypeDto, RentalTypeFeatureValueDto, RentalTypeImageDto,RentalTypeService } from '../../rental-type'; 
import { compare, deepClone } from "fast-json-patch";
import { MarinaService } from '../services';
import { Marina } from '../model';
import Quill from 'quill';

@Component({
    selector: "marina",
    templateUrl: "./marina.component.html",
    encapsulation: ViewEncapsulation.None
    //styleUrls: ["./rental-type.component.scss"]
})
export class MarinaComponent implements OnInit {

    public marinaId: number;

    public item: Marina;
    private original: Marina;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private marinaService: MarinaService) {
        this.item = this.original = new Marina();
    }

    public ngOnInit() {
        this.marinaId = this.route.snapshot.params['marinaId'];

        this.marinaService.get(this.marinaId).subscribe(result => {
            this.original = deepClone(result); //Need a clone so that we can detect changes
            this.item = result;
        });
    }

    public save(): void {
        var patch = compare(this.original, this.item);

        this.marinaService.patch(this.marinaId, patch).subscribe(result => {
            this.router.navigateByUrl('admin/marina');
        });
    }
}