import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild } from '@angular/core';

@Directive({
  selector: '[msgWrapper]'
})
export class MsgWrapperDirective {
  childCount:number=0;

  constructor(private el:ElementRef) { }

  ngAfterViewChecked():void{
   const $cWpr=this.el.nativeElement.querySelector("[data-chatWrapr]");
   if($cWpr.childElementCount>this.childCount){
     this.childCount=$cWpr.childElementCount;
     this.el.nativeElement.scrollTop=this.el.nativeElement.scrollHeight;
   }
  }


}
