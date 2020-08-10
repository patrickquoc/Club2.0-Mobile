import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Argument } from '../entity/argument';

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

  async getRoundArguments() {
    return this.socket.fromEvent("roundArguments").toPromise();
  }

  submitArgumentRating(discussionId: string, argumentRating: Argument[]) {
    return this.socket.emit("roundArguments", JSON.stringify({discussionId, arguments: argumentRating}))
  }

}
