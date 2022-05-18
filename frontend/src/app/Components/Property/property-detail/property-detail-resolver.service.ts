import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Property } from 'src/app/Models/property';
import { EMPTY, Observable, of } from 'rxjs';
import { HousingService } from 'src/app/Services/housing.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

    constructor(private router: Router,
                private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any> {
    const propId = route.params['id'];
    return this.housingService.getProperty(+propId).pipe(
        catchError(error => {
            this.router.navigate(['/']);
            return of(null);
        })
    );
  }
}
