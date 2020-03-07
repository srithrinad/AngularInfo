import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { page } from '../../shared';
import { AdminUserSearch, AdminUser, AdminRole } from '../model';
import { AdminService } from '../services'
import { Marina } from '../../marina';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  public marinaId: string;
  public active: boolean;
  public search: string = "";
  public adminUserList: AdminUser[];
  public adminUserEdit: AdminUser = new AdminUser();
  public adminListCount: string;
  public marinaList: Marina[];
  public rolesList: AdminRole[];
  public pageItem: page;
  public showLoading: boolean = false;
  public popupDisplay: boolean = false;
  public totalRecords: number= 0;


  constructor(private router: Router,
    private adminService: AdminService) {
    this.pageItem = new AdminUser();
    this.pageItem.sortField = 'name';
    this.pageItem.pageSize = 10;
    this.pageItem.rowNumber = 0;
    this.pageItem.sortOrder = 0;

  }


  ngOnInit() {
    this.showLoading = true;

    this.adminService.GetAdminRoles().subscribe(result => {      
      this.rolesList = result;
    });

    this.adminService.GetMarinas().subscribe(result => {
      this.marinaList = result;
    });

    let admiUserModel: AdminUserSearch = new AdminUserSearch();
    this.adminService.GetAdminUsersList(admiUserModel).subscribe(result => {
      this.adminUserList = result;
      this.adminListCount = this.adminUserList.length.toString();
      this.totalRecords = this.adminUserList.length;
      this.showLoading = false;
    });
  }


  onRowSelect(event) {    

    let _adminUserEdit: AdminUser = new AdminUser();
    _adminUserEdit.Id = event.data.id;
    _adminUserEdit.Name = event.data.name;
    _adminUserEdit.Email = event.data.email;
    _adminUserEdit.MarinaId = event.data.marinaId;
    _adminUserEdit.MarinaName = event.data.marinaName;
    _adminUserEdit.Active = event.data.active;
    this.adminUserEdit = _adminUserEdit;
    this.popupDisplay = true;
  }


  btnSearch() {
    let admiUserModel: AdminUserSearch = new AdminUserSearch();
    admiUserModel.MarinaId = this.marinaId == undefined ? null : parseInt(this.marinaId);
    admiUserModel.Active = (this.active == undefined || this.active.toString() == 'undefined') ? null : (this.active.toString() == "1" ? true : false);
    admiUserModel.Search = this.search;
    this.showLoading = true;
    this.adminService.GetAdminUsersList(admiUserModel).subscribe(result => {
      this.adminUserList = result;
      this.adminListCount = this.adminUserList.length.toString();
      this.showLoading = false;
    });
  }


}
