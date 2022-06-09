import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/Services/housing.service';
import { IPropertyBase } from "src/app/Models/ipropertybase";
import { ActivatedRoute, Router } from '@angular/router';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  properties: IPropertyBase[];
  Today = new Date();
  city = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute,
              private housingService: HousingService,
              private loadingService: LoadingService) {}

  ngOnInit(): void {

    this.loadingService.showLoader();

    // Set buy parameter
    if(this.route.snapshot.url.toString())
    {
      this.sellRent = 2;
    }

    this.housingService.getAllProperties(this.sellRent)
      .subscribe(
        (data) => { this.properties = data; },
        (error) => { console.log(error); })
      .add(() => { this.loadingService.hideLoader(); });
  };

  onCityFilter(){
    this.SearchCity = this.city;
  }
  onCityFilterClear(){
    this.SearchCity = '';
    this.city = '';
  }
  onSortDirection(){
    if(this.SortDirection === 'desc')
    {
      this.SortDirection = 'asc'
    }
    else{
      this.SortDirection = 'desc'
    }
  }
}
