import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, HostListener, Injectable, ElementRef} from '@angular/core';

import ncom from './ncom';

import { AwreqService } from './awreq.service';

import { FormBuilder } from '@angular/forms';

import { MsgformComponent } from './msgform/msgform.component';

@Component({
  selector: 'ass-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'Assistance';
  pushTitle = 'Vous avez un message:';
  JS_STRING = Object(window).JS_STRING;
  Data= Object(window).dataLayer[0]||[];

  @ViewChild("chatWrapr") chatWrapr?: ElementRef;
  @ViewChild("blueThumb") blueThumb?: ElementRef;
  @ViewChild("sendMsg") sendMsg?: ElementRef;
  @ViewChild("sendFile") sendFile?: ElementRef;
  @ViewChild("msgform") msgform?: ElementRef;
  @ViewChild("exit") exit?: ElementRef;
  @ViewChild("txtarea") txtarea?: ElementRef;
  @ViewChild("state") state?: ElementRef;
  @ViewChild("fileField") fileField?: ElementRef;
  @ViewChild("a1531") a1531?: ElementRef;
  
  //visitor type
  visitorPublic?:boolean;
  visitorAgent?:boolean;

  visitorName?:string;
  
  //check that page is auth.. from domain
  readyToAccess:boolean=this.Data.hasOwnProperty('pageSupport') && this.Data.pageSupport==='assistance.noud-incorporate.com';

  visibilitychange:string ="visibilitychange"||"msvisibilitychange"||"webkitvisibilitychange";
  hidden:string ="hidden"||"msHidden"||"webkitHidden";
  visibilityState?:boolean;

  body?:any;

  chatForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  MSGSX?:any=[];

  formDataToExternal?:any|undefined;

  statusTool?:boolean=true;

  appInnerHtml?:number;
  

  constructor(public assweb:ElementRef, private AwreqService: AwreqService, private formBuilder: FormBuilder){
   //app height
   this.returnInnerHeight();
   //visitor type
   this.visitorPublic = this.hasAllProperties(this.Data,["pageSupport", "supportEnabled", "supportCRED", "visitorType"]) && this.Data.visitorType==="public";
   this.visitorAgent = this.hasAllProperties(this.Data,["pageSupport", "supportEnabled", "visitorType"]) && this.Data.visitorType==="Agent";
   this.visitorName=this.visitorPublic?"_CUSTOMER_":"_ASSIST_";
   //document visibility
   this.visibilityState=Object(window).document.visibilityState==="visible";
   this.body=Object(window).document.querySelector(`body`);
   //get MESSAGE CACHE
   this.MSGSX=Object(window).APPCACHE;
   //
   if(this.readyToAccess && (this.visitorPublic && this.Data.supportEnabled==="NOT_VALIDATED" && this.Data.supportCRED==="CRED_OFF"))
   {  
      let app=this;
      let del0=new ncom({
      ctrlOpen:!1,
      title:this.JS_STRING.WELCOME,
      content:this.JS_STRING.WELCOME_TXT,
      buttons:{
        start:{
          text:this.JS_STRING.BUT_START,
          class:"btn-accept",
          action:function(){
          app.#start();
          }
        }
      }
      });
   }
   //
   if((this.visitorPublic && this.Data.supportEnabled==="NOT_VALIDATED" && this.Data.supportCRED==="CRED_ON"))
    this.#start();
   //
   if((this.visitorPublic || this.visitorAgent) && this.Data.supportEnabled==="VALIDATED")
   {
    this.#pushnot();
    this.#getMsgs();
   }
    
  }

  ngOnInit(): void {  

  }

  ngOnDestroy(): void{
   
  }

  ngAfterViewInit(): void{
    //bind on page visibility state
    Object(window).document.addEventListener(this.visibilitychange,(e:any)=>{
      this.visibilityState=e.target.visibilityState==="visible";
    });
  }

  ngAfterViewChecked():void{
    //always focus on txtarea
   /*if(this.Data.supportEnabled==="VALIDATED"){
    Object(this.txtarea).nativeElement.focus({preventScroll:true});
   }*/
  }

  hasAllProperties(obj:object, props:Array<string>): boolean{
    return !props.some((i:string)=>{
      return !obj.hasOwnProperty(i);
    });
    return true;
  }

  trackByMessage(index: number, item: MsgformComponent):number{
    return index;
  }

  //connected to msgform.component onCreate Event
  checkLast(islast:boolean):void{
    void islast;
  }

  //connected to msgform.component clearFormdata Event
  clearFormdata():void{
    this.formDataToExternal=undefined;
  }

  #start(): void{
    const app=this;
          const del=new ncom({
          title:this.JS_STRING.WTITLE,icon:this.JS_STRING.WICON,content:this.JS_STRING.WCONT,
          onOpen:function(){
            const handling=()=>{
              app.AwreqService.getCred().subscribe({
                next:(e:any)=>{
                  if(e.hasOwnProperty("ee"))
                  {
                   this.$$icon.html("");
                   this.$$title.html(app.JS_STRING.WAIT_OUT_T);
                   this.$$content.html(e.ee);
                   this.$$exit_attempt.remove();
                  }
                  else if(e.hasOwnProperty("a"))
                  {
                   if(e.a===404) handling();
                   else if (e.a===200) Object(window).location.reload();
                  }
                },
                error:()=>{
                  this.$$icon.html("");
                  this.$$title.html(app.JS_STRING.WAIT_OUT_T);
                  this.$$content.html(app.JS_STRING.WAIT_ERROR);
                }
              });
            }
            handling();    
          },
          buttons:{
            exit_attempt:{
              text:app.JS_STRING.EXIT_ATTEMPT,
              class:"btn-accept",
              action:function(){
                Object(this).destroy();
                Object(window).location.href=app.body.dataset.exatt;
              }
            }
          }
        });
  }


  #pushnot():void{
    if (Object(window).Notification && Object(window).Notification.permission !== "granted") {
     Object(window).Notification.requestPermission((status:string)=>{
      if (Object(window).Notification.permission !== status) {
        Object(window).Notification.permission = status;
      }
     });
    }
  }


  #chatEvt(o:any):void{
   const $o=Array.from(o);
   if(($o[1]==this.visitorName)) return void 0;
   
   if($o[0]=="cls"){
    this.statusTool=true;
    Object(this.state).nativeElement.innerHTML="";
   }
   if($o[0]!="cls"){
    this.statusTool=false;
    Object(this.state).nativeElement.innerHTML=$o[0];
   }
  }


  #getMsgs():void {
      const $rollit=()=>{
        this.AwreqService.getMsgs().subscribe({
          next:(e:any)=>{
            this.#chatEvt(e.event);
            if(e.hasOwnProperty("mg")){

               if(Object.entries(e.mg)){
              
                  if(Array.from(e.mg).length) {
                    let $w=e.mg;
                    $w=$w.map((e:any)=>{if(e.FROM==this.visitorName) return undefined; else return e;});
                    $w=$w.filter((el:any)=>{ return el!=undefined; });
                    this.MSGSX=Array.from(this.MSGSX).concat(Array.from($w));
                  }

                if(Object(window).Notification && Object(window).Notification.permission === "granted") 
                {
                  const $Arr=Array.from(e.mg);
                  const $last=Object($Arr[Math.abs($Arr.length-1)]);
                  if(e.z===$last.NO && $last.NAT!="BASE" && (e.zsdr!=this.visitorName) && !this.visibilityState)
                  {
                     const n = new Notification(this.pushTitle, {
                        //body: time \r\n message(text or filename)
                        body:`${$last.MSG[0]}\r\n${$last.MSG[2]}`,
                        tag:`amsgform${e.z}`
                      });
                     n.onclick=(event:any)=> {
                               Object(window).focus();
                               window.open(`#message${$last.NO}`,"_SELF");
                      };
                  }
                }
              }
            }
            $rollit();
          },
          error:()=>{
            $rollit();
          }
        });
      };
     
      $rollit();
  }


  sendMessage($event:any):void {
    $event.preventDefault();
    $event.stopPropagation();
    if(Object(this.txtarea).nativeElement.value.replace(/\s/g, "").length===0) return void 0;
      //MSG:['hour:Minutes','Full Datetime','message']
      const $message={
          "NO": `${Array.from(this.MSGSX).length+1}`,
          "NAT": "MSG",
          "FROM": `${this.visitorName}`,
          "MSG": [
              `${this.twoDigitTime(new Date().getHours())}:${this.twoDigitTime(new Date().getMinutes())}`,
              `${new Date().toUTCString()}`,
              `${Object(this.txtarea).nativeElement.value}`
          ],
          "role":"sendMsg"
      }; 

    this.MSGSX=this.MSGSX.concat([$message]);
    Object(this.txtarea).nativeElement.value="";
  }

  endChat($event:any):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.AwreqService.endChat().subscribe({
      next:(g:any)=>{
        if(g.hasOwnProperty("send")) Object(window).location.reload();
        else {const del=new ncom({title:g.STOP,content:this.JS_STRING.CHAT_ERROR,closeIcon:!0});}
      },
      error:(t:any)=>{
        const del=new ncom({title:`${t.name}:${t.statusText}`,content:this.JS_STRING.CHAT_ERROR,closeIcon:!0});
      }
    }); 
  }


  inChatFile($file:any):void{
      //MSG:[time, fulltime , realname, size`oKMGB`, tempname, extension, tempbasename, chattable]
      //chattable not set to hide download link to sender
    const $f= new FormData(Object(this.msgform).nativeElement);
    this.formDataToExternal=$f;
    const $message={
          "NO": `${Array.from(this.MSGSX).length+1}`,
          "NAT": "FILE",
          "FROM": `${this.visitorName}`,
          "MSG": [
              `${this.twoDigitTime(new Date().getHours())}:${this.twoDigitTime(new Date().getMinutes())}`,
              `${new Date().toUTCString()}`,
              `${$file.name}`,
              `${this.AwreqService.convertSize($file.size)}`,
              "",
              `${$file.type}`,
              "",
              ""
          ],
          "role":"sendFile"
      }; 

    this.MSGSX=this.MSGSX.concat([$message]);
  }

  twoDigitTime(part:number):string{
   return String('0'+(part)).slice(-2);
  }
  
  @HostListener('window:resize')
  returnInnerHeight():any{
    this.appInnerHtml=Object(window).innerHeight;
  }




}
