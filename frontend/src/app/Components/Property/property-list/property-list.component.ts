import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/Services/housing.service';
import { IPropertyBase } from "src/app/Models/ipropertybase";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  isLoading: boolean = true;
  properties: IPropertyBase[];
  Today = new Date();
  city = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute,
              private housingService: HousingService) {}

  ngOnInit(): void {

    if(this.route.snapshot.url.toString())
    {
      this.sellRent = 2;
    }

    this.housingService.getAllProperties(this.sellRent)
      .subscribe(
        (data) => { this.properties = data;},
        (error) => { console.log(error); })
      .add(() => {
        this.isLoading = false;
      });
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
