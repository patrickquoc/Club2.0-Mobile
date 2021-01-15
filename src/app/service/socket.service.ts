import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ArgumentSubmissionStateDto } from '../dto/argument-submission-state-dto';
import { RatingSubmissionStateDto } from '../dto/rating-submission-state-dto';
import { ShortTermDiscussion } from '../entity/short-term-discussion';
import { STDArgument } from '../entity/stdargument';
import { AuthService } from './auth.service';
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;
  private currentDiscussionId: string = "";
  private username: string;
  private reconnecting: boolean = false;

  constructor() { 
    this.socket = io.connect(environment.wsConnection);
    this.socket.on("reconnect", () => this.reconnecting = true);
    this.socket.on("connect", () => {
      console.log("connecting to socket server");

      //Rejoin room only on reconnect
      if (this.reconnecting) {
        console.log("trying to reconnect to "+ this.currentDiscussionId);

        if (this.currentDiscussionId == null || this.username.length < 1) {
          console.log("Error reconnecting");
          return;
        }
    
        var dto = {
          discussionId: this.currentDiscussionId, 
          username: this.username
        };
    
        this.socket.emit("rejoinRoom", JSON.stringify(dto));
        this.reconnecting = false;
      }
    });
  }

  connect() {
    return this.socket.connect();
  }

  disconnect() {
    return this.socket.disconnect();
  }

  joinRoom(discussionId: string, username: string) {
    this.currentDiscussionId = discussionId;
    this.username = username;
    console.log("Joining Room "+ discussionId);
    return this.socket.emit("joinRoom", JSON.stringify({discussionId, username}));
  }

  //Deprecated method
  leaveRoom(discussionId: string, username: string) {
    this.socket.emit("leaveRoom", JSON.stringify({discussionId, username}));
    return this.socket.disconnect();
  }

  userJoined(): Observable<string> {
    return new Observable (observer => {
      this.socket.on('userJoined', (user) => {
        observer.next(user);
      });
    });
  }

  userLeft(): Observable<string> {
    return new Observable (observer => {
      this.socket.on('userLeft', (user) => {
        observer.next(user);
      });
    });
  }

  startDiscussion(discussionId: string, rounds: number) {
    console.log("Force start discussion: "+ discussionId);
    const dto = {discussionId, rounds};
    return this.socket.emit("forceStartDiscussion", JSON.stringify(dto));
  }

  discussionStarts() {
    return new Observable (observer => {
      this.socket.on('forceStartDiscussion', () => {
        observer.next();
      });
    });
  }

  sendArgument(discussionId: string, username: string, argumentText: string) {
    console.log(argumentText);
    return this.socket.emit("newArgument", JSON.stringify({discussionId, username, argumentText, date: new Date()}));
  }

  getRoundArguments() : Observable<STDArgument[]> {
    return new Observable (observer => {
      this.socket.on('roundArguments', (args: STDArgument[]) => {
        observer.next(args);
      });
    });
  }

  submitArgumentRating(ratedArguments: STDArgument[]) {
    return this.socket.emit("rateArguments", JSON.stringify(ratedArguments));
  }

  getRoundResult() : Observable<STDArgument[]> {
    return new Observable (observer => {
      this.socket.on('resultArguments', (args: STDArgument[]) => {
        observer.next(args);
      });
    });
  }

  endOfDiscussion() : Observable<Array<STDArgument[]>> {
    return new Observable (observer => {
      this.socket.on('endOfDiscussion', (args: Array<STDArgument[]>) => {
        observer.next(args);
      });
    });
  }

  forceStartNextRound(discussionId: string) {
    return this.socket.emit("forceNextRound", JSON.stringify({discussionId}));
  }

  nextRound(): Observable<STDArgument> {
    return new Observable (observer => {
      this.socket.on('nextRound', (arg: STDArgument) => {
        observer.next(arg);
      });
    });
  }

  sendComment(discussionId: string, username: string, argumentText: string, prevArgumentText: string) {
    return this.socket
      .emit("newArgument", JSON.stringify({discussionId, username, argumentText, prevArgumentText, date: new Date()}));
  }
  
  sendCommentRating(comments: STDArgument[]) {
    return this.socket.emit("rateComments", JSON.stringify(comments));
  }

  getRoundComments(): Observable<STDArgument[]> {
    console.log("Received Round comments");
    return  new Observable (observer => {
      this.socket.on('roundComments', (comments: STDArgument[]) => {
        observer.next(comments);
      });
    });
  }

  getResultComments(): Observable<STDArgument[]> {
    return new Observable (observer => {
      this.socket.on('resultComments', (args: STDArgument[]) => {
        observer.next(args);
      });
    });
  }

  getCurrentArgumentSubmission(): Observable<ArgumentSubmissionStateDto> {
    return new Observable (observer => {
      this.socket.on('argumentSubmitted', (state: ArgumentSubmissionStateDto) => {
        observer.next(state);
      });
    });
  }

  getCurrentArgumentsRated(): Observable<RatingSubmissionStateDto> {
    return new Observable (observer => {
      this.socket.on('argumentsRated', (state: RatingSubmissionStateDto) => {
        observer.next(state);
      });
    });
  }

  error(): Observable<string> {
    return new Observable (observer => {
      this.socket.on('error', (error: string) => {
        observer.next(error);
      });
    });
  }

  getNotificationBlocked(): Observable<string> {
     return new Observable (observer => {
      this.socket.on('discussionBlocked', (message: string) => {
        observer.next(message);
      });
    });
  }

  getNotificationContinue(): Observable<string> {
    return new Observable (observer => {
      this.socket.on('discussionContinue', (message: string) => {
        observer.next(message);
      });
    });
  }
}
