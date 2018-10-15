import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalTypeDto, RentalTypeFeatureValueDto, RentalTypeImageDto } from '../model'; 
import { RentalTypeService } from '../services';
 
import { compare, deepClone } from "fast-json-patch";
import { MarinaService,Marina } from '../../marina'; 
import { environment } from "../../../environments/environment"
import Quill from 'quill';

@Component({
    selector: "rental-type",
    templateUrl: "./rental-type.component.html",
    encapsulation: ViewEncapsulation.None
    //styleUrls: ["./rental-type.component.scss"]
})
export class RentalTypeComponent implements OnInit {

    public rentalTypeId: number;

    private originalRentalType: RentalTypeDto;
    public rentalType: RentalTypeDto;

    public features = [
        {id: 1, name: 'Beds', value: '', enabled: false},
        {id: 2, name: 'Baths', value: '', enabled: false},
        {id: 3, name: 'Guests', value: '', enabled: false},
        {id: 4, name: 'Swim Access', value: '', enabled: false},
        {id: 5, name: 'Full Kitchen', value: '', enabled: false},
        {id: 6, name: 'Bed & Bath Linens', value: '', enabled: false},
        {id: 7, name: 'Satellite TV', value: '', enabled: false},
        {id: 8, name: 'Propane Grill', value: '', enabled: false},
        {id: 9, name: 'Lakefront', value: '', enabled: false},
        {id: 10, name: 'Max Capacity', value: '', enabled: false},
    ];
    public marinas: Marina[];

    public imageUploadUrl: string = environment.API_URL + 'RentalType/upload'

    constructor(private router: Router,
        private rentalTypeService: RentalTypeService,
        private route: ActivatedRoute,
        private marinaService: MarinaService) {
        this.rentalType = this.originalRentalType = new RentalTypeDto();
    }

    public ngOnInit() {
        this.rentalTypeId = this.route.snapshot.params['rentalTypeId'];

        this.marinaService.list().subscribe(result => this.marinas = result);

        this.rentalTypeService.get(this.rentalTypeId).subscribe(result => {
            this.originalRentalType = deepClone(result); //Need a clone so that we can detect changes
            this.rentalType = result;

            // We need to load the features and their values into our own array that includes all 
            // available features
            for (let i = 0; i < this.rentalType.features.length; i++) {
                this.features[this.rentalType.features[i].feature - 1].enabled = true;
                this.features[this.rentalType.features[i].feature - 1].value = this.rentalType.features[i].value;
            }
        });
    }

    public removeImage(image: RentalTypeImageDto): void {
        this.rentalType.images.splice(this.rentalType.images.indexOf(image), 1);
    }

    public addImage(): void {
        this.rentalType.images.push(new RentalTypeImageDto());
    }

    public save(): void {
        // Save out any feature changes
        for (let i = 0; i < this.features.length; i++) {
            // Determine if this feature already exists
            let feature = this.rentalType.features.find(x => x.feature == this.features[i].id);

            if (feature !== undefined && this.features[i].enabled) {
                // Update it
                feature.value = this.features[i].value;
            }
            else if (feature !== undefined && !this.features[i].enabled) {
                // Remove it
                this.rentalType.features.splice(this.rentalType.features.indexOf(feature), 1);
            }
            else if (this.features[i].enabled) {
                // Add it
                feature = new RentalTypeFeatureValueDto();
                feature.feature = this.features[i].id;
                feature.value = this.features[i].value;
                this.rentalType.features.push(feature);
            }
        }

        var patch = compare(this.originalRentalType, this.rentalType);

        this.rentalTypeService.patch(this.rentalTypeId, patch).subscribe(result => {
            this.router.navigateByUrl('admin/rentaltype');
        });
    }

    public onUpload(event: any): void {
        var response = JSON.parse(event.xhr.response);

        // Find the max sequence 
        let maxSeq = 0;
        for (let i = 0; i < this.rentalType.images.length; i++) {
            maxSeq = Math.max(maxSeq, this.rentalType.images[i].sequence);
        }
        

        for (let i = 0; i < response.length; i++) {
            var item = new RentalTypeImageDto(); 
            item.sequence = maxSeq + i + 1;
            item.url = response[i];
            this.rentalType.images.push(item);
        }
    }
}