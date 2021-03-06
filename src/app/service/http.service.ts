import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../dto/register-user';
import { environment } from 'src/environments/environment';
import { LongTermDiscussion } from '../entity/long-term-discussion';
import { CreateLTDDto } from '../dto/create-ltddto';
import { Argument } from '../entity/argument';
import { CreateArgumentDto } from '../dto/create-argument-dto';
import { RatingDto } from '../dto/rating-dto';
import { ShortTermDiscussion } from '../entity/short-term-discussion';
import { CreateSTDDto } from '../dto/create-stddto';
import { CreateCommentDto } from '../dto/create-comment-dto';
import { STDArgument } from '../entity/stdargument';

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
      credential: username, 
      password: password
    }

    return this.http.post<any>(`${environment.connection}/api/users/login`, credential, this.httpOptions).toPromise();
  }

  async getLtdsPaged(pageIndex: number, fetchSize: number): Promise<LongTermDiscussion[]> {
    return this.http.get<LongTermDiscussion[]>(`${environment.connection}/api/ltds/paged?index=${pageIndex}&size=${fetchSize}`)
      .toPromise();
  }

  async getLtdsByCategory(pageIndex: number, fetchSize: number, categories: string[]): Promise<LongTermDiscussion[]>  {
    return this.http.get<LongTermDiscussion[]>(`${environment.connection}/api/ltds/byCategory?`+
      `index=${pageIndex}&size=${fetchSize}&categories=${JSON.stringify(categories)}`)
      .toPromise();
  }

  async getLtdsByName(name: String): Promise<LongTermDiscussion[]> {
    return this.http.get<LongTermDiscussion[]>(`${environment.connection}/api/ltds/byName?name=${name}`).toPromise();
  }

  async createLtd(ltd :CreateLTDDto): Promise<LongTermDiscussion> {
    return this.http.post<LongTermDiscussion>(`${environment.connection}/api/ltds/create`, ltd, this.httpOptions).toPromise();
  }

  async getArgumentsById(pageIndex: number, fetchSize: number, discussionId: string, username: string, password: string) {
    return this.http.get<Argument[]>(`${environment.connection}/api/ltds/arguments?index=${pageIndex}&size=${fetchSize}`+ 
      `&discussionId=${discussionId}&username=${username}&password=${password}`)
      .toPromise();
  }

  async sendArgument(argument: CreateArgumentDto): Promise<Argument> {
    return this.http.post<Argument>(`${environment.connection}/api/ltds/argument`, argument).toPromise();
  }

  async getComments(argumentId: string, username: string) {
    return this.http.get<Argument[]>(`${environment.connection}/api/ltds/followingArguments?`+
      `argumentId=${argumentId}&username=${username}`)
      .toPromise();
  }

  async sendComment(comment: CreateCommentDto): Promise<Argument> {
    return this.http.post<Argument>(`${environment.connection}/api/ltds/followingArgument`, comment)
      .toPromise();
  }

  async sendRating(rating: RatingDto) {
    return this.http.put<any>(`${environment.connection}/api/ltds/rateArgument?`, rating).toPromise();
  }

  async getStdsPaged(pageIndex: number, fetchSize: number) {
    return this.http.get<ShortTermDiscussion[]>(`${environment.connection}/api/stds/paged?index=${pageIndex}&size=${fetchSize}`)
      .toPromise();
  }

  async getStdsByCategory(pageIndex: number, fetchSize: number, categories: string[]) {
    return this.http.get<ShortTermDiscussion[]>(`${environment.connection}/api/stds/byCategory?`+
      `index=${pageIndex}&size=${fetchSize}&categories=${JSON.stringify(categories)}`)
      .toPromise();
  }

  async getStdsByName(name: String) {
    return this.http.get<ShortTermDiscussion[]>(`${environment.connection}/api/stds/byName?name=${name}`).toPromise();
  }

  async createStd(std: CreateSTDDto) {
    return this.http.post<any>(`${environment.connection}/api/stds/create`, std, this.httpOptions).toPromise();
  }

  async getStdArguments(discussionId: string) {
    return this.http.get<STDArgument[]>(`${environment.connection}/api/stds/arguments?discussionId=${discussionId}`).toPromise();
  }

  async joinStd(discussionId: string, username: string, password?: string): Promise<ShortTermDiscussion> {
    console.log(discussionId);
    const dto = {
      discussionId,
      username,
      password
    }
    return this.http.put<ShortTermDiscussion>(`${environment.connection}/api/stds/join`, dto).toPromise();
  }

  async leaveStd(discussionId: string, username: string) {
    const dto = {
      discussionId,
      username,
    }

    return this.http.put<any>(`${environment.connection}/api/stds/leave`, dto).toPromise();
  }

  async getStdHistoryFromUser(): Promise<ShortTermDiscussion[]> {
    return this.http.get<ShortTermDiscussion[]>(`${environment.connection}/api/stds/byParticipant`).toPromise();
  } 
}
