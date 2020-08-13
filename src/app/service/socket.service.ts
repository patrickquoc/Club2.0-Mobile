import { Injectable, OnInit } from '@angular/core';
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
    const dto = {discussionId, rounds: JSON.stringify(rounds)}
    console.log(dto);
    return this.socket.emit("forceStartDiscussion", JSON.stringify(dto));
  }

  discussionStarts() {
    return this.socket.fromEvent("forceStartDiscussion");
  }

  sendArgument(discussionId: string, username: string, text: string) {
    return this.socket.emit("newArgument", JSON.stringify({discussionId, username, text}))
  }

  getRoundArguments() : Observable<STDArgument[]> {
    return this.socket.fromEvent("roundArguments");
  }

  submitArgumentRating(discussionId: string, argumentRating: STDArgument[]) {
    return this.socket.emit("rateArgument", JSON.stringify({discussionId, arguments: argumentRating}))
  }

}
