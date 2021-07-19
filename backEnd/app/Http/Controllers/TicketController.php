<?php

namespace App\Http\Controllers;

use App\models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ;

class TicketController extends Controller
{
   public function addTicket(Request $request){ 
       $ticket = new Ticket($request->ticket) ;
       $ticket->user_id = Auth::user()->id ; 
       $ticket->save() ; 
       return response()->json(["msg"=>"ticket created","ticket"=>$ticket],200);
   }




   public function updateTicket(Request $request , $id)
   {
       $ticket = Ticket::find($id) ; 
       $ticket->update($request->newTicket);
       $ticket->save() ; 
       return response()->json(["msg"=>"ticket updated","newTicket"=>$ticket],200);

   }


   public function getAllTickets(){
       return Ticket::with('user')->get() ; 
   }



   public function getTicketById($id){
       return Ticket::where('id',$id)->with('replies.user')->with('user')->first();
   }

   public function getTicketByUser(){
       return Ticket::where('user_id',Auth::user()->id)->get() ; 
   }


   public function changeStatus(Request $request){
       $ticket = Ticket::find($request->ticket_id) ; 
       $ticket->status = $request->status ; 
       $ticket->save() ; 
       return response()->json(['message'=>"status changesd !"]);
   }
}
