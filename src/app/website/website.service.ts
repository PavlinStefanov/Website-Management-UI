import { HttpClient, HttpResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { WebsiteForCreation, Website, SiteCategory } from './website-model';

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
};

@Injectable()
export class WebsiteService {
    private _rootUrl = "https://localhost:44359/";

    constructor(
        private _http: HttpClient
    ) { }
    
    public fetchWebsites() : Observable<Website> {
        const url = this._rootUrl + 'api/websites/fetchWebsites';
        return this._http.get<Website>(url)
        .pipe(
            retry(1)
        );
    } 

    public getSiteCategories(): Observable<SiteCategory> {
        const url = this._rootUrl + 'api/websites/fetchSiteCategories'
        return this._http.get<SiteCategory>(url)
        .pipe(
            retry(1)
        );
    }

    public getWebsiteById(id: string): Observable<Website> {
        const url = this._rootUrl + `api/websites/getWebsite/${id}`;
        return this._http.get<Website>(url)
        .pipe(
            retry(1)
        );
    }

    public updateWebsite(websiteToUpdate: Website): Observable<any> {
        const url = this._rootUrl + 'api/websites/updateWebsite';
        return this._http.put<Website>(url, websiteToUpdate, httpOptions);
    }

    public createWebsite(website: WebsiteForCreation): Observable<any> {
        const url = this._rootUrl + 'api/websites/createWebsite';
        return this._http.post<WebsiteForCreation>(url, website, httpOptions);
    }

    public deleteWebsite(id: number) {
        const url = this._rootUrl + `api/websites/deleteWebsite/${id}`;
        return this._http.delete(url);
    }
}