import { Component, OnInit,EventEmitter,Output  } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
isConnected = localStorage.getItem('token') ? true : false
isAdmin
@Output() updatePage: EventEmitter<any> = new EventEmitter()

  constructor(private router : Router) { }

  ngOnInit(): void {   
    if(JSON.parse(localStorage.getItem('user'))){
      if(JSON.parse(localStorage.getItem('user')).role == 'admin' ){
        this.isAdmin = true
      }else{
        this.isAdmin = false
      }
    }
  }


  logout(){
    localStorage.clear()
    this.updatePage.emit()
    this.router.navigate(['/login'])
  }
}
