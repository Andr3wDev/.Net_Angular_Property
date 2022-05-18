import { IPropertyBase } from './ipropertybase';
import { Photo } from './photo';

export class Property implements IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyTypeId: number;
  propertyType: string;
  bedrooms: number;
  furnishingTypeId: number;
  furnishingType: string;
  price: number;
  landArea: number;
  address: string;
  address2?: string;
  CityId: number;
  city: string;
  readyToMove: boolean;
  age?: string;
  bond?: number;
  maintenance?: number;
  estPossessionOn?: string;
  photo?: string;
  description?: string;
  photos?: Photo[];
}
