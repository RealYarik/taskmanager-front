import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {TaskComponent} from "./layout/task/task.component";
import {MessageComponent} from "./layout/message/message.component";
import {TaskShowComponent} from "./layout/task/task-show/task-show.component";
import {TaskIndexComponent} from "./layout/task/task-index/task-index.component";
import {SolutionComponent} from "./layout/solution/solution.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'reg', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {
    path: 'tasks', component: TaskComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: TaskIndexComponent, canActivate: [AuthGuardService]},
      {
        path: ':id', component: TaskShowComponent, canActivate: [AuthGuardService], children: [
          {path: 'solutions', component: SolutionComponent, canActivate: [AuthGuardService]}
        ]
      }
    ]
  },
  {path: 'messages', component: MessageComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
