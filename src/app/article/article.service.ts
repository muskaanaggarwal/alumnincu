import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { TestingTest } from './testing.model';

@Injectable()
export class ArticleService {
    //URL for CRUD operations
    articleUrl = "http://localhost:3000/article";
    //Create constructor to get Http instance
    constructor(private http: Http) {
    }

    // //Fetch all articles
    // getAllArticles(): Observable<Article[]> {
    //     return this.http.get(this.articleUrl + "/get-article")
    //         .map(this.extractData)
    //         .catch(this.handleError);

    // }

    //Fetch all articles
    getAllTest(): Observable<TestingTest[]> {
        return this.http.get(this.articleUrl + "/get-test")
            .map(this.extractData)
            .catch(this.handleError);
    }
    //Create article
     createTest(test: TestingTest): Observable<number> {
         let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: cpHeaders });
         return this.http.post(this.articleUrl + "/create-test", test, options)
             .map(success => success.status)
             .catch(this.handleError);
     }
    // //Fetch article by id
     getArticleById(articleId: string): Observable<TestingTest> {
         let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: cpHeaders });
         console.log(this.articleUrl + "/get-article-by-id?id=" + articleId);
         return this.http.get(this.articleUrl + "/get-article-by-id?id=" + articleId)
             .map(this.extractData)
             .catch(this.handleError);
     }
     //Update article
     updateArticle(test: TestingTest): Observable<number> {
         let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: cpHeaders });
         return this.http.put(this.articleUrl + "/update-article", test, options)
             .map(success => success.status)
             .catch(this.handleError);
     }
    // //Delete article    
     deleteArticleById(articleId: string): Observable<number> {
         let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: cpHeaders });
         return this.http.delete(this.articleUrl + "/delete-article?id=" + articleId)
             .map(success => success.status)
             .catch(this.handleError);
     }
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}