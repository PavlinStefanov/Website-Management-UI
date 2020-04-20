import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';

import { WebsiteForCreation } from '../website-model';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { WebsiteService } from '../website.service';
import { SiteCategory } from '../website-model'

@Component({
    selector: 'app-website-create',
    templateUrl: './website-create.component.html',
    styleUrls: ['./website-create.component.css']
})
export class WebsiteCreateComponent implements OnInit {
    private websiteForm: FormGroup;
    private dialogConfig;
    public selectOptions: SiteCategory[] = [];
    public selectedCategory: SiteCategory;

    constructor(
        private location: Location, 
        private _websiteService: WebsiteService, 
        private dialog: MatDialog, 
        private _errorService: ErrorHandlerService
    ) { }

    ngOnInit() {
        this.getSiteCategories();
        this.websiteForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            url: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            dateCreated: new FormControl(new Date()),
            category: new FormControl('', [Validators.required])
        });
        
        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        }
    }

    public getSiteCategories = () => {
        this._websiteService.getSiteCategories()
        .subscribe((data: {}) => {
            this.selectOptions = data as SiteCategory[]
        },
        (error) => {
            this._errorService.handleError(error);
        });
    }

    public onChange = (event) => {
        this.selectedCategory = this.selectOptions.find(x => x.id == event.value);
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.websiteForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

    public createWebsite = (websiteFormValue) => {
        if (this.websiteForm.valid) {
            this.executeOwnerCreation(websiteFormValue);
        }
    }

    private executeOwnerCreation = (websiteFormValue) => {
        let website: WebsiteForCreation = {
            name: websiteFormValue.name,
            url: websiteFormValue.url,
            dateCreated: websiteFormValue.dateCreated,
            category: this.selectedCategory
        }

        console.log(website);

        this._websiteService.createWebsite(website)
        .subscribe(res => {
            let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

            // we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
            dialogRef.afterClosed()
            .subscribe(result => {
                this.location.back();
            });
        },
            (error => {
                this._errorService.dialogConfig = { ...this.dialogConfig };
                this._errorService.handleError(error);
            })
        )
    }
}
