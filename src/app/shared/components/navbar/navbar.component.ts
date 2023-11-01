import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import {  NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private replaceBC:{[key:string]:string} = {
    "login":"Login",
    "register": "Nuevo registro",
    "home":"Home",
    "posts":"Lista de posts",
    "post":"Post",
    "user": "Usuario"
  }
  public breadcrumbs: string[]=[];
  public userName!:string;
  public photo:string|null=null;
  public isLoading:boolean = false
  private subscriptions: Subscription[]=[];

  constructor(private spinner:SpinnerService,
    private router: Router,
    private auth:AuthService){

    }

  ngOnInit(): void {
    this.urlSubscribe()
    this.getUser()
    this.spinnerSubscribe()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe());
  }

  private urlSubscribe(){
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
        this.getBreadCrumb();
    })
  }


  private getBreadCrumb():void {
    this.breadcrumbs = []
    let links: string[] = this.router.url.split('/') ?? []
    links.forEach((link:string)=>{
      if(link!='' && this.replaceBC[link]){
        this.breadcrumbs.push(this.replaceBC[link])
      } else {
        this.breadcrumbs.push(link)
      }
    })

}

  private getUser(){
    this.subscriptions.push(this.auth.getUser()
    .subscribe({next:({username,imageUrl})=>{
      this.userName = username;
      this.photo = imageUrl;
    }
    }))
  }

  private spinnerSubscribe(){
    this.subscriptions.push(
      this.spinner.subscribeLoading()
    .subscribe((res) => this.isLoading = res)
    )
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }


}
