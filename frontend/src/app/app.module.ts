import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabsModule} from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './Components/Property/property-card/property-card.component';
import { PropertyListComponent } from './Components/Property/property-list/property-list.component';
import { PropertyDetailComponent } from './Components/Property/property-detail/property-detail.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { NavBarComponent } from './Components/Navbar/nav-bar.component';
import { HousingService } from './Services/housing.service';
import { AddPropertyComponent } from './Components/Property/add-property/add-property.component';
import { UserLoginComponent } from './Components/User/user-login/user-login.component';
import { UserRegisterComponent } from './Components/User/user-register/user-register.component';
import { AlertifyService } from './Services/alertify.service';
import { AuthService } from './Services/auth.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyDetailResolverService } from './Components/Property/property-detail/property-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipe/filter.pipe';
import { SortPipe } from './Pipe/sort.pipe';
import { HttpErrorInterceptorService } from './Services/http-error-interceptor';
import { DatePipe } from '@angular/common';
import { ValidationService } from './Services/validation.service';

const appRoutes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'rent-property', component: PropertyListComponent },
  { path: 'property-detail/:id',
        component: PropertyDetailComponent,
        resolve: {prp: PropertyDetailResolverService} },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: '**', component: PropertyListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyListComponent,
      NavBarComponent,
      AddPropertyComponent,
      UserLoginComponent,
      UserRegisterComponent,
      FilterPipe,
      SortPipe
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    DatePipe,
    HousingService,
    AlertifyService,
    AuthService,
    ValidationService,
    PropertyDetailResolverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
