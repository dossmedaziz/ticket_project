import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin
tickets
  constructor(private router : Router,private ticketService : TicketService,private tostr : ToastrService) { }

  ngOnInit(): void {

    if(JSON.parse(localStorage.getItem('user'))){
      if(JSON.parse(localStorage.getItem('user')).role == 'admin' ){
        
      }else{
       this.router.navigate(['/'])
      }
    }

    this.ticketService.getAllTickets().subscribe(
      res=>{
       this.tickets = res
       console.log(res);
       
        
      }
    )
  }

  filterStatus(id)
  {
    if(id==1){
      return {color :'success', text : 'Solved'}
    }else if(id == 0 ){
      return {color :'danger', text : 'Declined'}
    }else {
      return {color :'warning', text : 'New'}
    }
  }
  changeStatus(id,tId)
  {
     this.ticketService.changeStatus(id,tId).subscribe(
       res=>{
         this.tostr.success("status changed!")
         this.ngOnInit()
         
       }
     )
  }
}
