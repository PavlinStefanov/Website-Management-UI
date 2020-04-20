import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { WebsiteService } from '../website.service';
import { ActivatedRoute } from '@angular/router';
import { Website, SiteCategory } from '../website-model';

@Component({
  selector: 'app-website-update',
  templateUrl: './website-update.component.html',
  styleUrls: ['./website-update.component.css']
})
export class WebsiteUpdateComponent implements OnInit {

    public websiteForm: FormGroup;
    private dialogConfig;
    public website: Website;
    public selectOptions: SiteCategory[] = [];
    public selectedCategory: SiteCategory;

    constructor (
        private location: Location,
        private _websiteService: WebsiteService, 
        private dialog: MatDialog, 
        private _errorService: ErrorHandlerService,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {

        this.getWebsiteById();
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

    public onChange = (event) => {
        this.selectedCategory = this.selectOptions.find(x => x.id == event.value);
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

    public hasError = (controlName: string, errorName: string) => {
        return this.websiteForm.controls[controlName].hasError(errorName);
    }

    public onCancel = () => {
        this.location.back();
    }

    private getWebsiteById = () => {
        let websiteId: string = this.activeRoute.snapshot.params['id'];
   
        this._websiteService.getWebsiteById(websiteId)
        .subscribe(res => {
                this.website = res as Website;
                this.websiteForm.patchValue(this.website);
                this.websiteForm.controls['category'].setValue(this.website.category.id);
            },
            (error) => {
                this._errorService.dialogConfig = this.dialogConfig;
                this._errorService.handleError(error);
            }
        );
    }

    public updateWebsite = (websiteFormValue) => {
        if (this.websiteForm.valid) {
            this.executeWebsiteUpdate(websiteFormValue);
        }
    }

    private executeWebsiteUpdate = (websiteFormValue) => {
        this.website.name = websiteFormValue.name;
        this.website.url = websiteFormValue.url;
        this.website.dateCreated = websiteFormValue.dateCreated;
        this.website.category = this.selectOptions.find(x => x.id == websiteFormValue.category); 
        
        this._websiteService.updateWebsite(this.website)
        .subscribe(res => {
                let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
                dialogRef.afterClosed()
                .subscribe(result => {
                    this.location.back();
                });
            },
                (error => {
                    this._errorService.dialogConfig = this.dialogConfig;
                    this._errorService.handleError(error);
                }
            )
        )
    }
}
