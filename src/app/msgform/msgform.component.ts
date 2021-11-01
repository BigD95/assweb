import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, AfterViewInit, Input, Output, Injectable, ElementRef } from '@angular/core';

import { AwreqService } from '../awreq.service';

import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'msgform',
  templateUrl: './msgform.component.html',
  styleUrls: ['./msgform.component.css']
})
export class MsgformComponent implements OnInit, AfterViewInit {

  JS_STRING=Object(window).JS_STRING;

  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  @Output() clearFormData = new EventEmitter<any>();

  @Input() got?:any;

  @Input() gotFormData?:any;

  messageSent?:boolean=false;

  fileLoaded?:string;

  fileTotal?:string;

  syncing?:string='state fa fa-sync fa-spin fa-1x';
  synced?:string='state fa fa-check-circle fa-1x';

  titleTool?:boolean=true;

  constructor(public el:ElementRef, private AwreqService: AwreqService) { }

  ngOnInit(): void {
    this.onCreate.emit();//not send data even if we can use $event to use data it send
  }

  ngAfterViewInit(): void{
    //message
    if(this.got.role && this.got.role=="sendMsg") this.#sendMsg();
    //file
    if(this.got.role && this.got.role=="sendFile") this.#sendFile();
  }

  #sendMsg():void{
   this.AwreqService.sendMessage(this.got).subscribe({
      next:(g:any)=>{
       this.messageSent=true;
      },
      error:()=>{
      setTimeout(()=>{this.#sendMsg()},2000);
      }
    });
  }

  #sendFile():void{
   if(this.gotFormData==undefined) return void 0;
   const $formData=this.gotFormData;
   this.clearFormData.emit();

   $formData.append("TIME",this.got.MSG[0]);
   $formData.append("FULLTIME",this.got.MSG[1]);
   $formData.append("role",this.got.role);

   this.AwreqService.sendFileMessage($formData).subscribe({
      next:(g:any)=>{
       if(g.type === HttpEventType.UploadProgress) {
            this.fileLoaded=this.AwreqService.convertSize(g.loaded);
            this.fileTotal=this.AwreqService.convertSize(g.total);
        } else if (g instanceof HttpResponse) {
            this.messageSent=true;
            //use g.body to handle response data
        }
      },
      error:()=>{
       setTimeout(()=>{this.#sendFile()},2000);
      },
    });
  }

  String(str:string):string{
    return String(str);
  }

}
