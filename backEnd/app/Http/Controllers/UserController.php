<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth ;
class UserController extends Controller
{
    
    


    public function register(Request $request){
        $user = new User($request->user) ;
        $isFound = User::where('email',$request->user['email'])->first() ; 
        if($isFound)
        {
             return response()->json(["message" => "Email already Used"],409) ;
        }



        $user->password = Hash::make($request->user['password']);
        $user->role = "user" ; 
        $user->save() ; 
        return response()->json(['msg'=>'User created !']);
    }


    public function login(Request $request){
        $login = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]) ;
        if(!Auth::attempt($login))
        {
            return response(['message'=>'invalid login credentials'],403);
        }
  
        $accessToken = Auth::user()->createToken('authToken')->accessToken ;
        return response()->json(['user'=>Auth::user(),'token'=>$accessToken]);


    }
}
