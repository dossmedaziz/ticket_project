import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    children : [
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'login',
        component : LoginComponent,
      },
      {
        path : 'register',
        component : RegisterComponent
      },
      {
        path : 'moreInfo/:id',
        component : MoreInfoComponent
      },
      {
        path : 'myTickets',
        component : MyTicketsComponent
      },
      {
        path : 'admin',
        component : AdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
