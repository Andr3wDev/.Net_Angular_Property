import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/Models/property';
import { HousingService } from 'src/app/Services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { importType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public propertyId:number;
  public mainPhotoUrl: string = null;

  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
        console.log(this.property);
      }
    );

    this.property.age = this.housingService
      .getPropertyAge(this.property.estPossessionOn);

    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = this.getPropertyPhotos();
  }

  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for(const img of this.property.photos)
    {
      if(img.isPrimary){
        this.mainPhotoUrl = img.imageUrl;
      }
      else{
        photoUrls.push(
          {
            small: img.imageUrl,
            medium: img.imageUrl,
            big: img.imageUrl
          }
        );
      }
    }
    return photoUrls;
  }
}
