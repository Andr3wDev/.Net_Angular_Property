export interface IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  furnishingType: string;
  price: number;
  bedrooms: number;
  landArea: number;
  city: string;
  readyToMove: boolean;
  photo?: string;
  estPossessionOn?: string;
}
