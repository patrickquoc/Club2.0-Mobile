import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../dto/register-user';
import { environment } from 'src/environments/environment';
import { User } from '../dto/user';
import { LongTermDiscussion } from '../entity/long-term-discussion';
import { CreateLTDDto } from '../dto/create-ltddto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async registerUser(user: RegisterUser) {
    const httpOptions = { responseType: "text" as "json" }
    return this.http.post<string>(`${environment.connection}/api/users/register`, user, httpOptions).toPromise();
  }

  async login(username: string, password: string): Promise<any>{
    const httpOptions = { responseType: "string" as "json" }
    const credential = {
      username: username,
      password: password
    }

    return this.http.post<any>(`${environment.connection}/api/users/login`, credential, httpOptions).toPromise();
  }

  async getLtdsPaged(pageIndex: number, fetchSize: number) {
    return this.http.get<LongTermDiscussion[]>(`${environment.connection}/api/ltds/paged?index=${pageIndex}&size=${fetchSize}`).toPromise();
  }

  async createLtd(ltd :CreateLTDDto) {
    const httpOptions = { responseType: "text" as "json"}
    return this.http.post<string>(`${environment.connection}/api/ltds/create`, ltd, httpOptions).toPromise();
  }

}
