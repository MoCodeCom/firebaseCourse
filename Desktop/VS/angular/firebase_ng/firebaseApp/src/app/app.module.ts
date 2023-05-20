import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './home/auth/auth.component';
import { ProductsComponent } from './home/products/products.component';
import { MainComponent } from './home/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


const appRoutes:Routes = [
  { path:'', component:HomeComponent , children:[
    {path:'auth', component:AuthComponent},
    {path:'products', component:ProductsComponent},
    {path:'main', component:MainComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ProductsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    provideFirestore(()=>getFirestore()),
    provideFirebaseApp(()=> initializeApp(environment.firebase)),

    


    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
