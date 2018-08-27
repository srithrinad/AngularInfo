import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RentalTypeService } from '../services';
import { RentalTypeDto } from '../model';

@Component({
    selector: "rental-type-list",
    templateUrl: "./rental-type-list.component.html",
    encapsulation: ViewEncapsulation.None
    //styleUrls: ["./rental-type-list.component.scss"]
})
export class RentalTypeListComponent implements OnInit {
    public list: RentalTypeDto[];

    constructor(private router: Router,
        private rentalTypeService: RentalTypeService) {}

    ngOnInit() {
        this.rentalTypeService.list().subscribe(result => {
            this.list = result;
        });
    }

    onRowSelect(event) {
        this.router.navigateByUrl(`rentaltype/${event.data.id}`);
    }
}
