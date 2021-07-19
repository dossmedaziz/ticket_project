import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
ticket
replies
content =""
  constructor(private activatedRoute : ActivatedRoute,private ticketService: TicketService,private toastr : ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.ticketService.getTicketById(this.activatedRoute.snapshot.params.id).subscribe(
      res =>{
       this.ticket = res
       this.replies = res.replies
       console.log(res);
       
        
      }, err =>{
        console.log(err);
        
      }
    )
   }



   reply()
   {

    if(!localStorage.getItem('token')){
       this.toastr.warning('You should Connect first!')
       this.router.navigate(['login'])
    }else{
     let reply = {
       content : this.content
     }
this.ticketService.addReply(reply,this.activatedRoute.snapshot.params.id).subscribe(
  res=>{
    console.log(res);
    this.content = ""
    this.ngOnInit()
    
  }, err =>{
    console.log(err);
    
  }
)
}
   }
}
