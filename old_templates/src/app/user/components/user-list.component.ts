import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../model'; 
import { page } from '../../shared';
import { Store } from '@ngrx/store';
import { LoadUsers,UserState,Redirect  } from '../store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    public list: user[];
    public totalRecords: number;
    public searchItem: user;
    public pageItem: page;
    constructor(private router: Router,
        private store: Store<any>) {
            this.searchItem = this.pageItem = new user();
            this.pageItem.sortField = 'Email'
            this.pageItem.pageSize = 10;
            this.pageItem.rowNumber = 0;
            this.pageItem.sortOrder = 0;
           this.store.select('usersList').subscribe(userStore => {              
               if(userStore){
                this.list = userStore.data;
                this.totalRecords = userStore.totalRecords;
               }               
           })
        }

    ngOnInit() {         
    }

    onRowSelect(event) {
        this.router.navigateByUrl(`user/${event.data.id}`);
        this.store.dispatch(new Redirect());
    }

    addUser() {
        this.router.navigateByUrl(`user/0`);
        this.store.dispatch(new Redirect());
    }

    pageClicked(event) {         
        this.searchItem.pageSize = event.rows ? event.rows : this.pageItem.pageSize;
        this.searchItem.rowNumber = event.first || event.first == 0 ? event.first : this.pageItem.rowNumber;
        this.searchItem.sortField = event.sortField ? event.sortField : this.pageItem.sortField ;
        this.searchItem.sortOrder = event.sortOrder ? event.sortOrder : this.pageItem.sortOrder; 
          
        this.store.dispatch(new LoadUsers(this.searchItem));
    
    }
    search(){
      this.searchItem.pageSize =  this.pageItem.pageSize ; 
      this.searchItem.rowNumber = this.pageItem.rowNumber;
      this.searchItem.sortField = this.pageItem.sortField;
      this.searchItem.sortOrder = this.pageItem.sortOrder;
      this.store.dispatch(new LoadUsers(this.searchItem));
    }
}

