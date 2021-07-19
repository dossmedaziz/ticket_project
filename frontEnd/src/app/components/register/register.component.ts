import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup
          constructor(private fb : FormBuilder,
                      private toastr : ToastrService ,
                      private userService : UserService,
                      private router : Router) { 

    let formControls = {
      
      name : new FormControl('',[
         Validators.required,
         Validators.minLength(4),
         Validators.pattern("[A-Z a-z 0-9 .'-]+")
           ]),
      email : new FormControl('',[
          Validators.required,
          Validators.email,
        ]),
      password : new FormControl('',[
          Validators.required,
        ]),
      conf_password : new FormControl('',[
        Validators.required,
      ]),
    }
    this.registerForm = this.fb.group(formControls) ;

  }
  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get conf_password() { return this.registerForm.get('conf_password') }

  ngOnInit(): void {
   localStorage.getItem('token') ? this.router.navigate(['/']) : null

  }


  register()
  {
this.userService.register(this.registerForm.value).subscribe(
  res =>{    
    this.toastr.success('Succefully Registred!')
    this.router.navigate(['/login'])
  }, err =>{
    if(err.status == 409){
      this.toastr.warning('Email already Used!')
    }else{
      this.toastr.error('Serveur issue !')
    }
  }
  )
 
 
    
  }
}
