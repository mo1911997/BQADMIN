import { Injectable } from '@angular/core';
// const socket = require('socket.io-client')(environment.SOCKET_ENDPOINT,{transports: ['websocket'],upgrade: false});
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket : any;
  data :any;
  constructor() { }
  // tslint:disable-next-line: typedef
  // setupSocketConnection()
  // {
  //   socket.emit('message', 'Hello there from Angular.');
  //   socket.on('news', (data) => {
  //     // console.log(data);
  //     this.data = data;
  //   });
  //   socket.on('connect', () => {
  //     console.log('connected');
  //     // tslint:disable-next-line: typedef
  //   });
  //   return this.data;
  // }
}
