import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Firestore, collectionData, doc } from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { NgForm } from '@angular/forms';

//import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  userDatabase:{address:string, course:string, full_name:string}[] = [];
  lessonsArr:any[] = [];
  arr:any[]=[]
  constructor(private fs:Firestore) { }
   



  onSubmitForm(data: NgForm) {
    console.log(data.value);
    const info = { username: data.value['username'], password: data.value['password'] };
    


    //this.http.post('url',{username:data.value['username'],password:data.value['password']});
    data.reset();
  }

  /*To get data form stor*/
  onGetData(){
    
    let users = collection( this.fs,'users');
    //console.log(users);
    return collectionData(users).subscribe(
      data =>{
        data.forEach(ele => {
          //this.userDatabase.push(ele)
          this.arr.push(ele);
          console.log(ele);
        });
      }
    );
  }

  onGetAngularLessons(){
    let lessons = collection(this.fs, 'users/8D8jqYzGkqqJ3Asi2WVq/lessons');
    let qry = query(lessons, where('lesson','==','routes'));
    return collectionData(qry)
    .subscribe(data =>{
      data.forEach(ele =>{

        this.lessonsArr.push(ele);
      });
      console.log(data);
    });
  }

  onAddData(){}

  onDeleteData(){}
}


