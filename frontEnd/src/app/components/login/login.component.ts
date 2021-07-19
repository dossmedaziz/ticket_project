import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

          constructor(private fb : FormBuilder,
            private toastr : ToastrService ,
            private userService : UserService,
            private router : Router) { 


              let formControls = {
                email : new FormControl('',[
                    Validators.required,
                    Validators.email,
                  ]),
                password : new FormControl('',[
                    Validators.required,
                  ])
              }
              this.loginForm = this.fb.group(formControls) ;
            }
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  
  ngOnInit(): void {
   localStorage.getItem('token') ? this.router.navigate(['/']) : null
  }


  login(){
    this.userService.login(this.email.value,this.password.value).subscribe(
      res=>{
       localStorage.setItem('token',res.token)
       localStorage.setItem('user',JSON.stringify(res.user))
       this.toastr.success('welcome ')
       this.router.navigate(['/'])
       window.location.reload()
      },err =>{
        if(err.status == 403){
          this.toastr.warning(err.error.message)
        }
        
      }
    )
  }
}
