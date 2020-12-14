import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { STDArgument } from '../entity/stdargument';

@Injectable({
  providedIn: 'root'
})
export class SocketService{

  constructor(private socket: Socket) {  }

  connect() {
    return this.socket.connect();
  }

  disconnect() {
    return this.socket.disconnect();
  }

  joinRoom(discussionId: string, username: string) {
    return this.socket.emit("joinRoom", JSON.stringify({discussionId, username}));
  }

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
    console.log("Force start discussion: "+ discussionId);
    const dto = {discussionId, rounds};
    return this.socket.emit("forceStartDiscussion", JSON.stringify(dto));
  }

  discussionStarts() {
    return this.socket.fromEvent("forceStartDiscussion");
  }

  sendArgument(discussionId: string, username: string, argumentText: string) {
    console.log(argumentText);
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
    //return this.socket.emit("newComment", JSON.stringify({discussionId, username, argumentText, prevArgumentText}));
    return this.socket
      .emit("newArgument", JSON.stringify({discussionId, username, argumentText, prevArgumentText, date: new Date()}));
  }
  
  sendCommentRating(comments: STDArgument[]) {
    return this.socket.emit("rateComments", JSON.stringify(comments));
  }

  getRoundComments(): Observable<STDArgument[]> {
    console.log("Received Round comments")
    return this.socket.fromEvent('roundComments');
  }

  getResultComments(): Observable<STDArgument[]> {
    return this.socket.fromEvent('resultComments');
  }
}
