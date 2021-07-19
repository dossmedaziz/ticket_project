<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $table = "replies" ; 
    protected $fillable = [
         'content','ticket_id','user_id'
    ] ; 


    public function user()
    {
        return $this->belongsTo(User::class) ;
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class) ;
    }

}
