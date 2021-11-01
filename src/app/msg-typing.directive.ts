import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

import { AwreqService } from './awreq.service';

@Directive({
  selector: '[dTarea]'
})
export class MsgTypingDirective {

  inputTimer?:any;
  inputInterval?:number=1000;

  constructor(public el:ElementRef, private AwreqService: AwreqService) { 

  }

  @HostListener("keydown",['$event'])
  @HostListener("keyup",['$event'])
  onType(e:any):void{
    const tping=()=>{
     this.AwreqService.sendTyping().subscribe();
    };

    const tpfinished=()=>{
     this.AwreqService.sendFinishedTyping().subscribe();
    };

    if(e.type==="keyup")
    {
      if(e.key!=="Backspace") tping();
      clearTimeout(this.inputTimer);
      this.inputTimer=setTimeout(tpfinished,this.inputInterval);
    }
    else if(e.type==="keydown")
    {
      clearTimeout(this.inputTimer);
    }
  }


}
