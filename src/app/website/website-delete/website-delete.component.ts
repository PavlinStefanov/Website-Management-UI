import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';

import { WebsiteService } from '../website.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Website } from '../website-model';

@Component({
  selector: 'app-website-delete',
  templateUrl: './website-delete.component.html',
  styleUrls: ['./website-delete.component.css']
})
export class WebsiteDeleteComponent implements OnInit {

    constructor (
        private location: Location, 
        private _websiteService: WebsiteService, 
        private dialog: MatDialog, 
        private errorService: ErrorHandlerService,
        private activeRoute: ActivatedRoute
    ) { }

    private dialogConfig;
    public website: Website;

    ngOnInit() {
        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        }
        this.getWebsiteById();
    }

    public onCancel = () => {
        this.location.back();
    }

    private getWebsiteById = () => {
        let websiteId: string = this.activeRoute.snapshot.params['id'];
        this._websiteService.getWebsiteById(websiteId)
        .subscribe(res => {
            this.website = res as Website;
        },
        (error) => {
            this.errorService.dialogConfig = this.dialogConfig;
            this.errorService.handleError(error);
        })
    }

    public deleteWebsite = () => {
        this._websiteService.deleteWebsite(this.website.id)
        .subscribe(res => {
            let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
            dialogRef.afterClosed()
            .subscribe(result => {
                this.location.back();
            });
        },
        (error) => {
            this.errorService.dialogConfig = this.dialogConfig;
            this.errorService.handleError(error);
        })
    }
}
