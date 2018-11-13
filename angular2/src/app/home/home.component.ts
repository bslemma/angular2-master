import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages=[];
  model=new Employee('','',true,'','default');
  hasPrimaryLanaguageError=false;
  // firstNameToUpperCase(value: string){
  //   if(value.length>0)
  //   this.model.firstName=value.charAt(0).toUpperCase()+ value.slice(1);
  //   else
  //     this.model.firstName=value;
  // }
  constructor(private fromposter: FormPoster){
    this.fromposter.getLanguages()
    .subscribe(
      data=> this.languages=data.languages,
      err=>console.log('get error: ', err)
    );

  }
  submitForm(form: NgForm){
    this.validatePrimaryLanaguage(this.model.primaryLanguage);
    if(this.hasPrimaryLanaguageError)
    return;

    this.fromposter.postEmployeeForm(this.model)
      .subscribe(
        data=>console.log('success: ', data),
        err=>console.log('error: ',err)
      )
  }
  validatePrimaryLanaguage(value){
    if (value ==='default')
      this.hasPrimaryLanaguageError=true;
    else
      this.hasPrimaryLanaguageError=false;
  }
}
