import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AwreqService {

  constructor(private http: HttpClient) {

  }

  getCred():any{
    return this.http.post<any>('',{allow:"api"});
  }

  getMsgs():any{
    return this.http.post<any>('',{__getMsg:"fetch"});
  }

  sendTyping():any{
    return this.http.post<any>('',{tpg:!0});
  }

  sendFinishedTyping():any{
    return this.http.post<any>('',{tpgf:!0});
  }

  endChat():any{
    return this.http.post<any>('',{exit:!0});
  }

  sendMessage($data:any):any{
   return this.http.post<any>('',$data);
  }

  sendFileMessage($data:any):any{
   return this.http.post<any>('',$data,{reportProgress: true, observe: "events"});
  }

  convertSize(val:number){
    let sizing=`${val}&nbsp;o`;
    //
    if(val>=1073741824)
        sizing=`${Math.round(val/1073741824)}&nbsp;GB`;
    else if(val>=1048576)
        sizing=`${Math.round(val/1048576)}&nbsp;MB`;
    else if(val>=1000)
        sizing=`${Math.round(val/1024)}&nbsp;KB`;
    //
    return sizing;
  }
}
