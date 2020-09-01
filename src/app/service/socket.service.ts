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
    console.log("Joining room "+ discussionId);
    console.log(username);
    return this.socket.emit("joinRoom", JSON.stringify({discussionId, username}));
  }

  userJoined(): Observable<any> {
    return this.socket.fromEvent('userJoined');
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
    return this.socket.emit("newArgument", JSON.stringify({discussionId, username, argumentText, date: new Date()}))
  }

  getRoundArguments() : Observable<STDArgument[]> {
    return this.socket.fromEvent("roundArguments");
  }

  submitArgumentRating(ratedArguments: STDArgument[]) {
    return this.socket.emit("rateArguments", JSON.stringify(ratedArguments))
  }

  getRoundResult() : Observable<STDArgument[]> {
    return this.socket.fromEvent("resultArguments");
  }

  endOfDiscussion() : Observable<Array<STDArgument[]>> {
    return this.socket.fromEvent("endOfDiscussion");
  }

  forceStartNextRound(discussionId: string) {
    return this.socket.emit("forceNextRound", discussionId);
  }

  nextRound(): Observable<STDArgument> {
    return this.socket.fromEvent('nextRound');
  }
}
