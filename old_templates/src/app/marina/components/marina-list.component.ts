import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MarinaService } from '../services';
import { Marina } from '../model';

@Component({
    selector: "marina-list",
    templateUrl: "./marina-list.component.html",
    encapsulation: ViewEncapsulation.None
    //styleUrls: ["./rental-type-list.component.scss"]
})
export class MarinaListComponent implements OnInit {
    public list: Marina[];

    constructor(private router: Router,
        private marinaService: MarinaService) {}

    ngOnInit() {
        this.marinaService.list().subscribe(result => {
            this.list = result;
        });
    }

    onRowSelect(event) {
        this.router.navigateByUrl(`marina/${event.data.id}`);
    }
}
