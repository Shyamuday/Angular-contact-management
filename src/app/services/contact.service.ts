import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MyContact } from '../Models/myContact';
import { myGroup } from '../Models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public baseUrl = 'http://localhost:3000/'

  constructor(private http:HttpClient) { }

//  public getAllContacts() :Observable<MyContact[]>{
//   let dataUrl = `${this.baseUrl}\contacts`;
//     return this.http.get<MyContact[]>(dataUrl).pipe(map((res:any)=>{
//       return res;
//     }))
//   }
  // Get All Contact
  public getAllContacts() :Observable<MyContact[]> {
    let dataUrl:string = `${this.baseUrl}\contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError))
  }


  // get single contact data
  public getContacts(contactId: string):Observable<MyContact> {
    let dataUrl: string = `${this.baseUrl}\contacts/${contactId}`
    return this.http.get<MyContact>(dataUrl).pipe(catchError(
      this.handleError
    ));
  }
  // create contact
  public Createcontacts(contact: MyContact):Observable<MyContact[]> {
    let dataUrl: string = `${this.baseUrl}\contacts`;
    return this.http.post<MyContact[]>(dataUrl, contact).pipe(catchError(this.handleError))
  }
  // Update contact
  public updatecontacts(contact: MyContact, contactId: string):Observable<MyContact[]> {
    let dataUrl: string = `${this.baseUrl}\contacts/${contactId}`;
    return this.http.patch<MyContact[]>(dataUrl, contact).pipe(catchError(this.handleError))
  }
//   updateData(data: any, id: string): Observable<any> {
//     return this.http.patch(`${this.baseURL}/update/${id}`, data)
// }

  // Delete Contact

  public deleteContact(contactId: string):Observable<MyContact[]> {
    let dataUrl: string = `${this.baseUrl}\contacts/${contactId}`;
    return this.http.delete<MyContact[]>(dataUrl).pipe(catchError(this.handleError))
  }

  // get all groups
  // public getAllGroups(): Observable<myGroup[]> {
  //   let dataUrl: string = `${this.baseUrl}\groups`;
  //   return this.http.get<myGroup[]>(dataUrl).pipe(catchError(this.handleError))
  // }

  public getAllGroups() :Observable<myGroup[]> {
    let dataUrl:string = `${this.baseUrl}\groups`;
    return this.http.get<myGroup[]>(dataUrl).pipe(catchError(this.handleError))
  }

  // public getAllGroups():Observable<myGroup[]>{
  //     // let dataUrl: string = '${this.baseUrl}/groups';
  //       return this.http.get<myGroup[]>('http://localhost:3000/groups').
  //       pipe(map((res:any)=>{
  //         return res;
  //       }))
  //     }
  // get single groups data
  public getGroup(contact: MyContact):Observable<myGroup> {
    let dataUrl:string = `${this.baseUrl}\groups/${contact.groupId}`;
    return this.http.get<myGroup>(dataUrl).pipe(catchError(
      this.handleError
    ));
  }




  // public getContacts(contactId: string):Observable<MyContact> {
  //   let dataUrl: string = `${this.baseUrl}\contacts/${contactId}`
  //   return this.http.get<MyContact>(dataUrl).pipe(catchError(
  //     this.handleError
  //   ));
  // }

  // public  getGroup(contact: MyContact):Observable<myGroup>{
  //     let dataUrl = `${this.baseUrl}\groups/${contact.groupId}`;
  //       return this.http.get<myGroup>(dataUrl).pipe(map((res:any)=>{
  //         return res;
  //       }))
  //     }


  // Error solved
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = ''
    if (error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error :${error.error.message}`
    } else {
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage)
  }
}
