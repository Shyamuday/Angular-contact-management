import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyContact } from '../Models/myContact';
import { myGroup } from '../Models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addForm!: FormGroup;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public contact: MyContact = {} as MyContact;
  public groups: myGroup[] = [] as myGroup[];
  constructor(public fb: FormBuilder, public addservice: ContactService, public router: Router) { }
  getalldat: any;
  ngOnInit(): void {
    this.getAllGroupsData();
    this.addForm = this.fb.group({
name: ['',Validators.required],
      photo: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      mobile: ['',[Validators.required,Validators.minLength(10)]],
      company: ['',Validators.required],
      title: ['',Validators.required],      
      group: ['',Validators.required]
    })

  }



  addFormData() {
   this.contact.name = this.addForm.value.name;
   this.contact.photo = this.addForm.value.photo;
   this.contact.email = this.addForm.value.email;
   this.contact.mobile = this.addForm.value.mobile;
   this.contact.company = this.addForm.value.company;
   this.contact.title = this.addForm.value.title;
   this.contact.groupId = this.addForm.value.group
    this.addservice.Createcontacts(this.contact).subscribe((data: MyContact[]) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['contacts/add']).then();
    })
  }

  getAllGroupsData() {
    this.addservice.getAllGroups().subscribe((data:myGroup[])=>{
      this.groups = data
    }, (error) => {
      this.errorMessage = error;
    })
  }
}
