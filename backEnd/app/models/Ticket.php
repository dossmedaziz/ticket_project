<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = "tickets" ; 
    protected $fillable = [
        'category' , 'subject' , 'description','status'
    ] ; 






    public function replies()
    {
        return $this->hasMany(Reply::class) ;
    }
    public function user()
    {
        return $this->belongsTo(User::class) ;
    }
}



