import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http : HttpClient) { }
  getAllTickets(){
    return this.http.get<any>(environment.BASE_URL+'/getAllTickets')
  }


  getTicketById(id){
    return this.http.get<any>(environment.BASE_URL+'/getAllTickets/'+id)
  }


  addReply(reply , id )
  {
    return this.http.post<any>(environment.BASE_URL+'/tickets/'+id+'/replies',{reply : reply},this.header)
  }

  
  getTicketByUser()
  {
    return this.http.get<any>(environment.BASE_URL+'/getTicketByUser',this.header)
  }
 addTicket(ticket){
  return this.http.post<any>(environment.BASE_URL+'/tickets',{ticket : ticket},this.header)
 }
 updateTicket(ticket,id){
   return this.http.put<any>(environment.BASE_URL+'/tickets/'+id,{newTicket:ticket},this.header)
 }

 changeStatus(status , ticket_id){
   return this.http.post<any>(environment.BASE_URL+'/changeStatus',{status : status , ticket_id : ticket_id},this.header)
 }
}
