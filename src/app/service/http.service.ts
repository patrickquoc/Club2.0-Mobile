import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../dto/register-user';
import { environment } from 'src/environments/environment';
import { User } from '../dto/user';
import { LongTermDiscussion } from '../entity/long-term-discussion';
import { CreateLTDDto } from '../dto/create-ltddto';
import { env } from 'process';
import { Argument } from '../entity/argument';
import { CreateArgumentDto } from '../dto/create-argument-dto';
import { RatingDto } from '../dto/rating-dto';
import { ShortTermDiscussion } from '../entity/short-term-discussion';
import { CreateSTDDto } from '../dto/create-stddto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpOptions = { responseType: "text" as "json"}
  constructor(private http: HttpClient) { }

  async registerUser(user: RegisterUser) {
    const httpOptions = { responseType: "text" as "json" }
    return this.http.post<string>(`${environment.connection}/api/users/register`, user, httpOptions).toPromise();
  }

  async login(username: string, password: string): Promise<any>{
    const credential = {
      username: username,
      password: password
    }

    return this.http.post<any>(`${environment.connection}/api/users/login`, credential, this.httpOptions).toPromise();
  }

  async getLtdsPaged(pageIndex: number, fetchSize: number) {
    return this.http.get<LongTermDiscussion[]>(`${environment.connection}/api/ltds/paged?index=${pageIndex}&size=${fetchSize}`)
      .toPromise();
  }

  async createLtd(ltd :CreateLTDDto) {
    return this.http.post<any>(`${environment.connection}/api/ltds/create`, ltd, this.httpOptions).toPromise();
  }

  async getArgumentsById(pageIndex: number, fetchSize: number, discussionId: string, username: string) {
    return this.http.get<Argument[]>(`${environment.connection}/api/ltds/arguments?index=${pageIndex}&size=${fetchSize}`+ 
      `&discussionId=${discussionId}&username=${username}`)
      .toPromise();
  }

  async sendArgument(argument: CreateArgumentDto) {
    return this.http.post<any>(`${environment.connection}/api/ltds/argument`, argument).toPromise();
  }

  async sendRating(rating: RatingDto) {
    return this.http.put<any>(`${environment.connection}/api/ltds/rateArgument?`, rating).toPromise();
  }

  async getStdsPaged(pageIndex: number, fetchSize: number) {
    return this.http.get<ShortTermDiscussion[]>(`${environment.connection}/api/stds/paged?index=${pageIndex}&size=${fetchSize}`)
      .toPromise();
  }

  async createStd(std: CreateSTDDto) {
    return this.http.post<any>(`${environment.connection}/api/stds/create`, std, this.httpOptions).toPromise();
  }

  async joinStd(discussionId: string, username: string) {
    return this.http.post<any>(`${environment.address}/api/stds/join`, {discussionId, username});
  }
}
