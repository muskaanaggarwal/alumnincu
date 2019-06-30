import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from './article.service';

import { TestingTest } from './testing.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  //Component properties
  // allArticles: Article[];
  allTest: TestingTest[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
//Create form
   articleForm = new FormGroup({
     name: new FormControl('', Validators.required),
     age: new FormControl('', Validators.required)
   });
  //Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    // this.getAllArticles();
    this.getAllTest();
  }
  //Fetch all articles

  // getAllArticles() {
  //   this.articleService.getAllArticles()
  //     .subscribe(
  //       data => this.allArticles = data,
  //       errorCode => this.statusCode = errorCode);

  // }

  getAllTest() {
    this.articleService.getAllTest()
      .subscribe(
        data => this.allTest = data,
        errorCode => this.statusCode = errorCode);

  }

  // //Handle create and update article
   onArticleFormSubmit() {
     this.processValidation = true;
     if (this.articleForm.invalid) {
      return; //Validation failed, exit from method.
     }
     //Form is valid, now perform create or update
     this.preProcessConfigurations();
     let article = this.articleForm.value;
     if (this.articleIdToUpdate === null) {
       //Generate article id then create article
       this.articleService.getAllTest()
         .subscribe(articles => {

  //         //Generate article id    
           let maxIndex = articles.length - 1;
           let articleWithMaxIndex = articles[maxIndex];
           let articleId = articleWithMaxIndex.id + 1;
           article.id = articleId;
           console.log(article, 'this is form data---');
           //Create article
           this.articleService.createTest(article)
             .subscribe(successCode => {
               this.statusCode = successCode;
               this.getAllTest();
               this.backToCreateArticle();
             },
               errorCode => this.statusCode = errorCode
             );
         });
     } else {
  //     //Handle update article
       article.id = this.articleIdToUpdate;
       this.articleService.updateArticle(article)
         .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAllTest();
           this.backToCreateArticle();
         },
           errorCode => this.statusCode = errorCode);
     }
   }
   //Load article by id to edit
   loadArticleToEdit(articleId: string) {
     this.preProcessConfigurations();
     this.articleService.getArticleById(articleId)
       .subscribe(article => {
         console.log(article, 'poiuytre');
       this.articleIdToUpdate = article.id;
         this.articleForm.setValue({ name: article.name, age: article.age });
         this.processValidation = true;
         this.requestProcessing = false;
       },
         errorCode => this.statusCode = errorCode);
   }
  // //Delete article
   deleteArticle(articleId: string) {
     this.preProcessConfigurations();
     this.articleService.deleteArticleById(articleId)
       .subscribe(successCode => {
         this.statusCode = successCode;
  //       //Expecting success code 204 from server
         this.statusCode = 204;
         this.getAllTest();
         this.backToCreateArticle();
       },
         errorCode => this.statusCode = errorCode);
   }
  //Perform preliminary processing configurations
  preProcessConfigurations(){
    this.statusCode = null;
    this.requestProcessing = true;
  }
  //Go back from update to create
   backToCreateArticle() {
     this.articleIdToUpdate = null;
     this.articleForm.reset();
     this.processValidation = false;
   }
}