import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, Injectable } from '@angular/core';

import ncom from './ncom';

@Directive({
  selector: '[fileapplet]'
})
export class FileSelectionDirective {

  JS_STRING = Object(window).JS_STRING;

  fileMaxSize:number=104857600;

  @Output() onFileReady: EventEmitter<any> = new EventEmitter();

  constructor(public el:ElementRef) { }


  @HostListener("change",['$event'])
  onChange($event:any):void{
    $event.preventDefault();
    $event.stopPropagation();
    //===
    const file = this.el.nativeElement.files[0];
    const reader = new FileReader();
   //===
    if(file.size>this.fileMaxSize) 
    {
     const del=new ncom({title:this.JS_STRING.FILE_UP_ABORTED,content:this.JS_STRING.FILE_SIZE_EXC,closeIcon:!0});
     return void 0;
    }

    reader.readAsBinaryString(file);
    reader.onloadend=(e)=>{
       this.onFileReady.emit(file);
    };

    
  }

}
