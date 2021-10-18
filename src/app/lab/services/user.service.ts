import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '@lab/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userListSubject: BehaviorSubject<Array<User>>
  private userSubject: BehaviorSubject<User>;

  private apiUrl = environment.API_URL;
  private httpHeaders: HttpHeaders;

  private dataSource = {
    items: Array<User>(),
    error: ''
  }  

  constructor(private httpClient: HttpClient) { 
    
    this.userListSubject = new BehaviorSubject<User[]>([]);
    this.userSubject = new BehaviorSubject<User>({} as User);

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });    
  }

  public get users() : Observable<Array<User>> {
    return this.userListSubject.asObservable();
  }

  public getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public setUser(user: User) {
    this.userSubject.next(user);
  }

  public unsetUser() {
    this.userSubject.next({} as User);
  }


  public loadUsers(): void {

    let url = this.apiUrl + '/users/?page=1&size=50&order=asc';
    this.httpClient.get<User[]>(url, {headers: this.httpHeaders})
      .subscribe( items => {
        this.dataSource.items = items;
        this.userListSubject.next([...this.dataSource.items]);
      }, 
        error => console.log(`[x] error: ${error}`)
      );
    
  }

  public addUser(user: User): Observable<User> {
    
    let url = this.apiUrl + '/users';
    return this.httpClient.post<User>(url, user, {headers: this.httpHeaders})
              .pipe(
                tap( res => {
                  this.dataSource.items.push(res);
                  this.userListSubject.next([...this.dataSource.items]);
                })
              );

  }

  public updateUser(user: User) {

    let url = this.apiUrl + '/users';
    return this.httpClient.post<User>(url, user, {headers: this.httpHeaders})
              .pipe(
                tap( res => {
                  
                  this.dataSource.items = this.dataSource.items.map( x => {
                    if (x.documentId === res.documentId) {
                      x.firstName = res.firstName;
                      x.lastName = res.lastName;
                      x.gender = res.gender;
                      x.emailAddress = res.emailAddress;
                      x.phoneNumber = res.phoneNumber;
                    }
                    return x;
                  })
                  this.userListSubject.next([...this.dataSource.items]);
                })
              );

  }


  public deleteUser(user: User) {

    let url = this.apiUrl + '/users/' + user.documentId;
    return this.httpClient.delete<User>(url, {headers: this.httpHeaders})
            .pipe(
              tap( res => {
                this.dataSource.items = this.dataSource.items.filter(item => item.documentId !== user.documentId);
                this.userListSubject.next([...this.dataSource.items]);
              })
            );

  }




}
