import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Property } from 'src/app/Models/property';
import { IPropertyBase } from 'src/app/Models/ipropertybase';
import { HousingService } from 'src/app/Services/housing.service';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { Ikeyvaluepair } from 'src/app/Models/ikeyvaluepair';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})

export class AddPropertyComponent implements OnInit {

  addPropertyForm: FormGroup;
  @ViewChild('addTabs') addTabs?: TabsetComponent;

  nextClicked: boolean;
  property = new Property();
  propertyTypes: Ikeyvaluepair[];
  furnishTypes: Ikeyvaluepair[];
  cityList: any[];
  bsValue = new Date();

  propertyView: IPropertyBase = {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    propertyType: null,
    furnishingType: null,
    bedrooms: null,
    landArea: null,
    city: '',
    readyToMove: null
  };

  selectTab(tabId: number, IsCurrentValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentValid && this.addTabs?.tabs[tabId]) {
      this.addTabs.tabs[tabId].active = true;
    }
  }

  constructor(private router: Router,
      private datePipe: DatePipe,
      private fb: FormBuilder,
      private housingService: HousingService,
      private alertify: AlertifyService) {}

  ngOnInit() {
    if(!localStorage.getItem("userName")){
        this.alertify.error("You must be logged in to add a property.");
        this.router.navigate(['/user/login']);
    }

    this.CreateAddPropertyForm();

    this.housingService.getAllCities().subscribe(data => {
        this.cityList = data;
    });

    this.housingService.getPropertyTypes().subscribe(data => {
        this.propertyTypes = data;
    });

    this.housingService.getFurnishingTypes().subscribe(data => {
        this.furnishTypes = data;
    });
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
        BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        Bedrooms: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: ['', Validators.required]
    }),

    PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        Bond: [0],
        Maintenance: [0],
        LandArea: [null, Validators.required]
    }),

    AddressInfo: this.fb.group({
        Address1: [null, Validators.required],
        Address2: [null],
    }),

    OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null, Validators.required],
        Description: [null]
    })

  });
}


get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
}

get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
}

get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
}

get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
}
get SellRent() {
  return this.BasicInfo.controls.SellRent as FormControl;
}

get Bedrooms() {
  return this.BasicInfo.controls.Bedrooms as FormControl;
}

get PType() {
  return this.BasicInfo.controls.PType as FormControl;
}

get FType() {
  return this.BasicInfo.controls.FType as FormControl;
}

get Name() {
  return this.BasicInfo.controls.Name as FormControl;
}

get City() {
  return this.BasicInfo.controls.City as FormControl;
}

get Price() {
  return this.PriceInfo.controls.Price as FormControl;
}

get LandArea() {
  return this.PriceInfo.controls.LandArea as FormControl;
}

get Bond() {
  return this.PriceInfo.controls.Bond as FormControl;
}

get Maintenance() {
  return this.PriceInfo.controls.Maintenance as FormControl;
}

get Address1() {
  return this.AddressInfo.controls.Address1 as FormControl;
}

get Address2() {
  return this.AddressInfo.controls.Address2 as FormControl;
}

get RTM() {
  return this.OtherInfo.controls.RTM as FormControl;
}

get PossessionOn() {
  return this.OtherInfo.controls.PossessionOn as FormControl;
}

get Description() {
  return this.OtherInfo.controls.Description as FormControl;
}

mapProperty(): void {
    this.property.id = this.housingService.newPropID();
    this.property.sellRent = +this.SellRent.value;
    this.property.bedrooms = this.Bedrooms.value;
    this.property.propertyTypeId = this.PType.value;
    this.property.name = this.Name.value;
    this.property.CityId = this.City.value;
    this.property.furnishingTypeId = this.FType.value;
    this.property.price = this.Price.value;
    this.property.bond = this.Bond.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.landArea = this.LandArea.value;
    this.property.address = this.Address1.value;
    this.property.address2 = this.Address2.value;
    this.property.readyToMove = this.RTM.value;
    this.property.estPossessionOn =
        this.datePipe.transform(this.PossessionOn.value,'MM/dd/yyyy');
    this.property.description = this.Description.value;
}

  onBack(){
    this.router.navigate(['/']);
  }

  onCancel(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    this.nextClicked = true;
    if(this.allTabsValid){
      this.mapProperty();
      console.log(this.property);

      this.housingService.addProperty(this.property).subscribe(

          () => {
            this.alertify.success('Success! Property added');

            if(this.SellRent.value === '2'){
              this.router.navigate(['/rent-property']);
            }
            else{
              this.router.navigate(['/']);
            }
          }
      );
    }
    else{
      this.alertify.error('An error occurred adding this property');
    }
  }

  allTabsValid(): boolean {

    if (this.BasicInfo.invalid) {
      this.addTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
        this.addTabs.tabs[1].active = true;
        return false;
    }

    if (this.AddressInfo.invalid) {
        this.addTabs.tabs[2].active = true;
        return false;
    }

    if (this.OtherInfo.invalid) {
        this.addTabs.tabs[3].active = true;
        return false;
    }

    return true;
  }
}
