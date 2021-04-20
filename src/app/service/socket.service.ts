import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ArgumentSubmissionStateDto } from '../dto/argument-submission-state-dto';
import { RatingSubmissionStateDto } from '../dto/rating-submission-state-dto';
import { STDArgument } from '../entity/stdargument';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private currentDiscussionId: string = "";
  private username: string;
  private isAutomaticallyReconnecting: boolean = false;

  constructor(private socket: Socket) { 
    this.socket.on("reconnect", () => this.isAutomaticallyReconnecting = true);
    this.socket.on("connect", () => {
      //Rejoin room only on reconnect
      if (this.isAutomaticallyReconnecting) {
        if (this.currentDiscussionId == null || this.username.length < 1) {
          return;
        }
    
        var dto = {
          discussionId: this.currentDiscussionId, 
          username: this.username
        };
    
        this.socket.emit("rejoinRoom", JSON.stringify(dto));
        this.isAutomaticallyReconnecting = false;
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
    return this.socket.emit("joinRoom", JSON.stringify({discussionId, username}));
  }

  //Deprecated method
  leaveRoom(discussionId: string, username: string) {
    this.socket.emit("leaveRoom", JSON.stringify({discussionId, username}));
    return this.socket.disconnect();
  }

  userJoined(): Observable<any> {
    return this.socket.fromEvent('userJoined');
  }

  userLeft(): Observable<any> {
    return this.socket.fromEvent('userLeft');
  }

  startDiscussion(discussionId: string, rounds: number) {
    const dto = {discussionId, rounds};
    return this.socket.emit("forceStartDiscussion", JSON.stringify(dto));
  }

  discussionStarts() {
    return this.socket.fromEvent("forceStartDiscussion");
  }

  sendArgument(discussionId: string, username: string, argumentText: string) {
    return this.socket.emit("newArgument", JSON.stringify({discussionId, username, argumentText, date: new Date()}));
  }

  getRoundArguments() : Observable<STDArgument[]> {
    return this.socket.fromEvent("roundArguments");
  }

  submitArgumentRating(ratedArguments: STDArgument[]) {
    return this.socket.emit("rateArguments", JSON.stringify(ratedArguments));
  }

  getRoundResult() : Observable<STDArgument[]> {
    return this.socket.fromEvent("resultArguments");
  }

  endOfDiscussion() : Observable<Array<STDArgument[]>> {
    return this.socket.fromEvent("endOfDiscussion");
  }

  forceStartNextRound(discussionId: string) {
    return this.socket.emit("forceNextRound", JSON.stringify({discussionId}));
  }

  nextRound(): Observable<STDArgument> {
    return this.socket.fromEvent('nextRound');
  }

  sendComment(discussionId: string, username: string, argumentText: string, prevArgumentText: string) {
    return this.socket
      .emit("newArgument", JSON.stringify({discussionId, username, argumentText, prevArgumentText, date: new Date()}));
  }
  
  sendCommentRating(comments: STDArgument[]) {
    return this.socket.emit("rateComments", JSON.stringify(comments));
  }

  getRoundComments(): Observable<STDArgument[]> {
    return this.socket.fromEvent('roundComments');
  }

  getResultComments(): Observable<STDArgument[]> {
    return this.socket.fromEvent('resultComments');
  }

  getCurrentArgumentSubmission(): Observable<ArgumentSubmissionStateDto> {
    return this.socket.fromEvent('argumentSubmitted');
  }

  getCurrentArgumentsRated(): Observable<RatingSubmissionStateDto> {
    return this.socket.fromEvent('argumentsRated');
  }

  error(): Observable<string> {
    return this.socket.fromEvent('discussionError');
  }

  getNotificationBlocked(): Observable<string> {
    return this.socket.fromEvent('discussionBlocked');
  }

  getNotificationContinues(): Observable<string> {
    return this.socket.fromEvent('discussionContinued');
  }
}
