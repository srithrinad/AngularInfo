import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef,ViewChild, TemplateRef } from '@angular/core';
import { AdminUser, AdminRole, UserMarinaRole } from '../model';
import { AdminService } from '../services'
import { Marina } from '../../marina';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  adminUserList: Array<UserMarinaRole>;
  public adminUserItem: AdminUser;
  public marinaList: Marina[];
  public rolesList: AdminRole[];
  public activeControl: string;
  statusMessage: string;
  public showLoading: boolean = false;

  @Output() closeMe: EventEmitter<any> = new EventEmitter();

  //Get the Marinas list from base page (To avoid multiple call to the DataBase)
  @Input() set setMarinaList(value: Marina[]) {
    this.marinaList = value;
  }

  //Get the Role List from the base page (To avoid multiple call to the DataBase)
  @Input() set setRolesList(value: AdminRole[]) {
    this.rolesList = value;
  }

  @Input() set setAdminUserItem(value: AdminUser) {
    this.adminUserItem = value;
    this.activeControl = this.adminUserItem.Active ? "1" : "0";
    this.bindData();
  }


  //-- New User
  newUser: UserMarinaRole;
  newUserList: Array<UserMarinaRole> = new Array<UserMarinaRole>();
  newUserItemCount: number = 0;


  //-- Existing User
  editUserList: Array<UserMarinaRole> = [];

  
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  bindData() {
    this.statusMessage = '';
    this.showLoading = true;
    if (this.adminUserItem.Id != null) {
      this.adminService.GetUserMarinaRoleList(this.adminUserItem.Id.toString()).subscribe(result => {
        this.adminUserList = result;
        this.showLoading = false;
      },
        error => {          
          this.showLoading = false;
        },
      );
    }
  }  
  

  btnMeClose() {    
    this.closeMe.emit(null);
  }


  btnSaveUserDetails() {
    this.statusMessage = '';
  //Save the user details to back end

  }

  //------------------- New User

  addNewAdminUser() {
    this.statusMessage = '';
    this.newUserItemCount = this.newUserItemCount - 1;
    this.newUser = new UserMarinaRole();
    this.newUser.id = this.newUserItemCount;
    this.newUser.userId = this.adminUserItem.Id;
    this.newUserList.push(this.newUser);
  }


  newAdminUserSave(adminUserItem: UserMarinaRole) {
    this.statusMessage = '';
    this.showLoading = true;
    // Save the new user to database
    if (this.adminUserItem.Id != null) {
      this.adminService.UpdateUserMarinaRole(adminUserItem).subscribe(result => {
        this.adminUserList = result;
        this.showLoading = false;
      });
    }

    this.showLoading = true;
    this.newUserList = this.newUserList.filter(item => item.id !== adminUserItem.id);
    this.statusMessage = 'Record Added Successfully.';
    this.showLoading = false;
  }

  newAdminUserCancel(adminUserItem: UserMarinaRole) {
    this.statusMessage = '';
    this.newUserList = this.newUserList.filter(item => item.id !== adminUserItem.id);
  }


  //--------------------------  Existing User


  loadTemplate(adminUser: UserMarinaRole) {
    if (adminUser.isEditable) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  editExistingAdminUser(adminUserItem: UserMarinaRole) {
    this.statusMessage = '';

    //persist this old data
    let item: UserMarinaRole = new UserMarinaRole();
    item.marinaId = adminUserItem.marinaId;
    item.marinaName = adminUserItem.marinaName;
    item.location = adminUserItem.location;
    item.userId = adminUserItem.userId;
    item.adminRoleId = adminUserItem.adminRoleId;
    item.adminRoleName = adminUserItem.adminRoleName;
    item.assignedPos = adminUserItem.assignedPos;
    item.currentPos = adminUserItem.currentPos;
    this.editUserList.push(item);

  
    this.adminUserList.forEach(item => {
      if (item.id == adminUserItem.id) {
        item.isEditable = true;
      }
    });    
  }

  deleteExistingAdminUser(adminUserItem: UserMarinaRole) {
    this.statusMessage = '';
    this.adminUserList = this.adminUserList.filter(item => item.id !== adminUserItem.id);
    this.showLoading = true;
    //delete from database and load
    if (this.adminUserItem.Id != null) {
      this.adminService.DeleteUserMarinaRole(adminUserItem).subscribe(result => {
        this.adminUserList = result;
        this.showLoading = false;
      });
    }

    this.statusMessage = 'Record Deleted Successfully.';
  }

  
  updateExistingAdminUser(adminUserItem: UserMarinaRole) {
    this.statusMessage = '';
    this.showLoading = true;

    //update to database and load
    if (this.adminUserItem.Id != null) {
      this.adminService.UpdateUserMarinaRole(adminUserItem).subscribe(result => {
        this.adminUserList = result;
        this.showLoading = false;
      });
    }
    this.statusMessage = 'Record Updated Successfully.'
  }  

  cancelExistingAdminUser(adminUserItem: UserMarinaRole) {
    this.statusMessage = '';
      this.adminUserList.forEach(item => {        
        if (item.id == adminUserItem.id) {
          item.isEditable = false;
          this.editUserList.forEach(x => {
            if (x => x.id === adminUserItem.id) {
              item.marinaId = x.marinaId;
              item.marinaName = x.marinaName;
              item.location = x.location;
              item.userId = x.userId;
              item.adminRoleId = x.adminRoleId;
              item.adminRoleName = x.adminRoleName;
              item.assignedPos = x.assignedPos;
              item.currentPos = x.currentPos;
            }
          });
          this.editUserList = this.editUserList.filter(item => item.id !== adminUserItem.id);
        }
      });
  }

}
