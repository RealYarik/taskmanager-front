import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProvider} from "./helper/error-interceptor.service";
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {IndexComponent} from './layout/index/index.component';
import {TaskComponent} from './layout/task/task.component';
import {MessageComponent} from './layout/message/message.component';
import {TaskShowComponent} from './layout/task/task-show/task-show.component';
import {TaskIndexComponent} from './layout/task/task-index/task-index.component';
import {TaskLeaderLineComponent} from './layout/task/task-leader-line/task-leader-line.component';
import {SolutionComponent} from './layout/solution/solution.component';
import {ChatComponent} from './layout/message/chat/chat.component';
import {MessageIndexComponent} from './layout/message/message-index/message-index.component';
import {DatePipe} from "@angular/common";
import {ProfileComponent} from './layout/profile/profile.component';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './layout/chart/chart.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from "@angular/material/dialog";
import { TaskNewComponent } from './layout/task/task-new/task-new.component';
import { SolutionNewComponent } from './layout/solution/solution-new/solution-new.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AdminUsersComponent } from './layout/admin/admin-users/admin-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    TaskComponent,
    MessageComponent,
    TaskShowComponent,
    TaskIndexComponent,
    TaskLeaderLineComponent,
    SolutionComponent,
    ChatComponent,
    MessageIndexComponent,
    ProfileComponent,
    ChartComponent,
    TaskNewComponent,
    SolutionNewComponent,
    AdminComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTooltipModule,
    ChartsModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProvider, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
