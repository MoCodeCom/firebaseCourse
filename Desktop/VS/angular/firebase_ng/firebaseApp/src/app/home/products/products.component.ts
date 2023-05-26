import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { sFirebase } from 'src/app/services/sFirebase.service';
import { ICourse } from '../interface/ICourse';
import {  Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  arr:any[] = [];
  coursesCount:number[] = [];
  constructor(private serviceFirebase:sFirebase, 
              private router:Router){}

  

  ngOnInit(): void {
    this.getCoursesToDom();
    this.getCoursesWithPage();
  }

  getCoursesToDom(){
    const data = this.serviceFirebase.getCourses();   
    data.subscribe(res =>{
      let counts = 0;
      if(res.length % 2 == 0){
        counts = res.length/2;
      }else{
        counts = Math.trunc((res.length / 2)+1 );
      }

      this.coursesCount = [];
      for(let i = 1; i < counts+1 ;i++){
        this.coursesCount.push(i);
      }
    });
    
  }

  onDelete(data:ICourse){

    this.serviceFirebase.deleteCourse(data);
    this.getCoursesToDom();
    this.getCoursesWithPage();
  }

  onUpdate(data:any){
    this.serviceFirebase.oldDataToUpdate = data;
    localStorage.setItem('updatedata',JSON.stringify(data));
    this.router.navigateByUrl('/update');
  };

  getCoursesWithPage(pageList?:number){
    //this.serviceFirebase.getWithPagination();
    
    const resArr = this.serviceFirebase.getWithPagination(pageList);
    resArr.then(res =>{
      this.arr = [];
      res.forEach(element =>{
        this.arr.push(element.data());
      });
    })
    
  }


  //for dom buttons contents
  countOfList(data:any){
    //let selectedElement = document.getRootNode();
    let param = data.target.innerText;
    this.getCoursesWithPage(param - 1);
  }

}
