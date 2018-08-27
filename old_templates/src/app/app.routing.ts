import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { MarinaComponent,MarinaListComponent } from './marina';
import { RentalTypeComponent,RentalTypeListComponent } from './rental-type';
import { ContractTemplateComponent,ContractTemplateListComponent } from './contract-template';
import { UserComponent,UserListComponent } from './user' 
import { LoginGaurdService } from './shared'
import { AdminUserListComponent, AdminUserComponent } from './admin'


const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [LoginGaurdService]
    } ,
    {
        path: 'login',
        component: LoginComponent
    },     
      {
        path: 'rentaltype',
        component: RentalTypeListComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'rentaltype/:rentalTypeId',
        component: RentalTypeComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'marina',
        component: MarinaListComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'marina/:marinaId',
        component: MarinaComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'contracttemplate',
        component: ContractTemplateListComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'contracttemplate/:itemId',
        component: ContractTemplateComponent,
        canActivate: [LoginGaurdService]
      } ,
      {
        path: 'user',
        component: UserListComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'user/:userId',
        component: UserComponent,
        canActivate: [LoginGaurdService]
      },
      {
        path: 'admin',
        component: AdminUserListComponent        
      },    

]
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
