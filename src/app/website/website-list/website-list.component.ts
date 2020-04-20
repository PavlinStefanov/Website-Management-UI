import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { ErrorHandlerService } from '../../shared/error-handler.service';
import { WebsiteService } from '../website.service';
import { Website } from '../website-model';

  @Component({
    selector: 'app-website-list',
    templateUrl: './website-list.component.html',
    styleUrls: ['./website-list.component.css']
  })
  export class WebsiteListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['name', 'url', 'dateCreated', 'details', 'update', 'delete']; 
    public dataSource = new MatTableDataSource<Website>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(
        private _websiteService: WebsiteService, 
        private errorService: ErrorHandlerService, 
        private router: Router
    ) { }
  
    ngOnInit() {
      this.getAllWebsites();
    }
  
    ngAfterViewInit(): void {
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    }
  
    public getAllWebsites = () => {
      this._websiteService.fetchWebsites()
      .subscribe((data: {}) => {
        this.dataSource.data = data as Website[]
      },
      (error) => {
        this.errorService.handleError(error)
      });
    }
  
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  
    public redirectToDetails = (id: string) => {
      let url: string = `/website/details/${id}`;
      this.router.navigate([url]);
    }
  
    public redirectToUpdate = (id: string) => {
      let url: string = `/website/update/${id}`;
      this.router.navigate([url]);
    }
  
    public redirectToDelete = (id: string) => {
      let url: string = `/website/delete/${id}`;
      this.router.navigate([url]);
    }
  }
  