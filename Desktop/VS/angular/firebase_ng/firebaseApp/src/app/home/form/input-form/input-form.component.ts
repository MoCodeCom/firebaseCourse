import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Firestore, Timestamp, addDoc, collection } from 'firebase/firestore';
import { sFirebase } from 'src/app/services/sFirebase.service';
import { Observable, catchError, pipe, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {



  constructor(private fb:FormBuilder,
              private fs:sFirebase,
              private router:Router,
              private serviceFirebase:sFirebase
              ){}



  onCreateCourse(form:NgForm){
    const formData = form.value;
    //const formDatainfo = Timestamp.fromDate(formData.value);
    this.router.navigateByUrl("/products");
    this.fs.createCourse(formData);
    //const fData = this.fs.createCourse(formData);
    /*return new Observable<void>(()=>{
      
    }).pipe( 
      tap(data =>{
        console.log('test start...');
        console.log(data);
      }),
      catchError(err =>{
        console.log(err);
        return throwError(err);
      }
    ))*/
    //console.log(formDatainfo);
  }

  
}
