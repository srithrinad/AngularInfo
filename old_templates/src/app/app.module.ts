//All External imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule } from '@angular/forms'
import { DataTableModule, SharedModule as PrimeNgSharedModule, EditorModule, Button, TemplateWrapper, DropdownModule, CheckboxModule, InputTextModule, FileUploadModule, MenuModule, MenuItem, DialogModule  } from 'primeng/primeng';
import { MDL } from './materialDesignLiteUpgradeElements';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import  Quill from 'quill';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

//Internal 
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { MarinaComponent,MarinaListComponent,MarinaService } from './marina';
import { RentalTypeComponent,RentalTypeListComponent,RentalTypeService } from './rental-type';
import { ContractTemplateComponent,ContractTemplateListComponent,ContractTemplateService } from './contract-template';
import { UserComponent,UserListComponent,UserService,userReducer,UserEffects,usersListReducer } from './user'
import { TokenInterceptor } from './http-interceptor';
import { HeaderComponent, LoginGaurdService, AuthenticationService } from './shared';
import { AdminUserListComponent, AdminUserComponent, AdminService } from './admin';



@NgModule({
  declarations: [
    MDL,
    AppComponent,
    HomeComponent,
    LoginComponent,
    ContractTemplateComponent,
    MarinaComponent,
    RentalTypeComponent,
    ContractTemplateListComponent,
    ContractTemplateComponent,
    MarinaComponent,
    MarinaListComponent,
    RentalTypeComponent,
    RentalTypeListComponent,
    HeaderComponent,    
    UserComponent,
    UserListComponent,
    AdminUserListComponent,
    AdminUserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRouting,
    FormsModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    StoreModule.forRoot({
      
        usersList: usersListReducer,
        user: userReducer
      
    }),
    EffectsModule.forRoot([UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    PrimeNgSharedModule,
    DataTableModule,
    EditorModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    FileUploadModule,
    MenuModule,
    DialogModule
  ],
  providers: [LoginGaurdService, AuthenticationService, MarinaService, RentalTypeService, ContractTemplateService, UserService, AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
