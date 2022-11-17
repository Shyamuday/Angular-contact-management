import { Component, OnInit } from '@angular/core';
import { MyContact } from '../Models/myContact';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts!: MyContact[] 
  public errorMessage: string | null = null;


 

  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
  
  
   this.getAllData()
   
  }
    getAllData() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: MyContact[]) => {
      this.contacts = data;
      // console.log(data);
      this.loading = false;

    }, (error) => {
      this.errorMessage = error;
    })
  }


  deleteData(contactId: string) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe((data: {}) => {
        this.getAllData();
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }
}
