export class RentalTypeFeatureValueDto {
    feature: number;
    value: string;
}

export class RentalTypeDto {
    id: number;
    name: string;
    title: string;
    startingAtPrice: number;
    location: string;
    locationLine2: string;
    description: string;
    latitude: number;
    longitude: number;
    rentalTypeCategory: string;
    features: RentalTypeFeatureValueDto[];
    images: RentalTypeImageDto[];
}

export enum RentalTypeFeature {
    Beds = 1,
    Baths = 2,
    Guests = 3,
    SwimAccess = 4
}

export class RentalTypeImageDto {
    id: number;
    url: string;
    sequence: number;
}