import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../Models/myContact';
import { myGroup } from '../Models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public group:myGroup = {} as myGroup;
  public contactId: string | null = null;
  public errorMessage: string | null = null;
  constructor(private activatedRoute: ActivatedRoute,
     private contactbyIdservice: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId')
    })
    if (this.contactId) {
      this.loading = true;
      this.contactbyIdservice.getContacts(this.contactId).subscribe(
        (data: MyContact) => {
          this.contact = data;
          this.loading = false;
          this.contactbyIdservice.getGroup(data).subscribe((data:myGroup)=>{
            this.group = data
          })
        }, (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      )
    }
  }
  isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length >0;
  }

}
