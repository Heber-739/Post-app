import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  public redirectIn:number = 5;
  private interval!:any;

  constructor(private router:Router){}

  ngOnInit() {
    this.initInterval()
  }
  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  private initInterval():void{
    const interval = setInterval(()=>{
      this.redirectIn--
      if(this.redirectIn<=0){
        clearInterval(interval)
         this.interval = setTimeout(()=>this.router.navigate(['/']),500)
      }
    },1000)
  }
}
