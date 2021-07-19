<?php

namespace App\Http\Controllers;

use App\models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ;

class ReplyController extends Controller
{
   public function addReply(Request $request , $id){
    $reply = new Reply($request->reply) ;
    $reply->user_id = Auth::user()->id ;
    $reply->ticket_id = $id ;  
    $reply->save();
    return response()->json(["msg"=>"reply added","reply"=>$reply],200);

   }
}
