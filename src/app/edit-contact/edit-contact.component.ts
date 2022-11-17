import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MyContact } from '../Models/myContact';
import { myGroup } from '../Models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  // editForm!: FormGroup
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: MyContact = {} as MyContact;
  public errorMessage: string | null = null;
  public groups: myGroup[] = [] as myGroup[];
  public groupObj:myGroup = {} as myGroup;
  public groupId:string | null = null;
  constructor( private router:Router,
    private activatedRoute: ActivatedRoute, private editService: ContactService,
    private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId')
    });
    if (this.contactId) {
      this.loading = true;
      this.editService.getContacts(this.contactId).subscribe((data: MyContact) => {
        this.contact = data;
        this.loading = false;
        this.editService.getAllGroups().subscribe((data: myGroup[]) => {
          this.groups = data;
       })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

submitUpdate(){
if(this.contactId){
  this.editService.updatecontacts(this.contact, this.contactId).subscribe((data:MyContact[])=>{
    this.router.navigate(['/contacts/admin']).then();
  },(error)=>{
    this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
  })
}
}

}