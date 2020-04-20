
export interface Website {
    id: number;
    name: string;
    url: string;
    dateCreated: Date;
    category: SiteCategory;
}

export interface WebsiteForCreation {
    name: string;
    url: string;
    dateCreated: Date;
    category: SiteCategory;
}

export interface SiteCategory {
    id: number,
    name: number
}