import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
tickets
  constructor(private tickeService : TicketService) { }

  ngOnInit(): void {
     this.tickeService.getAllTickets().subscribe(
       res =>{
         this.tickets = res 
console.log(res);

       }, err =>{
         console.log(err);
         
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


}
