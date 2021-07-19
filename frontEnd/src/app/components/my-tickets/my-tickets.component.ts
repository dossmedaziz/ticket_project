import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
myTickets
ticketForm : FormGroup
selectedTicketId
  constructor(private ticketService : TicketService,private fb : FormBuilder,private toastr : ToastrService,private router : Router) { 
    let formControls = {
      category : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Z a-z 0-9 .'-]+")
        ]),
      subject : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Z a-z 0-9 .'-]+")
        ]),
        description : new FormControl('',[
          Validators.required,
          Validators.pattern("[A-Z a-z 0-9 .'-]+")
        ])
    }
    this.ticketForm = this.fb.group(formControls) ;
  }
  get category() { return this.ticketForm.get('category') }
  get subject() { return this.ticketForm.get('subject') }
  get description() { return this.ticketForm.get('description') }

  ngOnInit(): void {


   !localStorage.getItem('token') ? this.router.navigate(['/']) : null

    this.ticketService.getTicketByUser().subscribe(
      res=>{
        this.myTickets = res
        console.log(res);
        
        
      }, err =>{
        console.log(err);
        
      }
    )
  }
  addTicket()
  {
 
  this.ticketService.addTicket(this.ticketForm.value).subscribe(
    res=>{
     this.toastr.success("ticket added!")
     this.ngOnInit()
      
    }, err =>{
      console.log(err);
      
    }
  )
    
  }
  openmodal(t)
  {

    this.selectedTicketId = t.id
this.ticketForm.patchValue({
  category : t.category,
  description : t.description,
  subject : t.subject
})

  }
  resetForm()
  {
    this.ticketForm.reset()
  }


  update(){
   this.ticketService.updateTicket(this.ticketForm.value,this.selectedTicketId).subscribe(
     res =>{
      this.toastr.success("Updated ! ")
      this.ngOnInit()
       
     },err=>{
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
