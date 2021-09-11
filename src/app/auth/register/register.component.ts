import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public regForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.tokenService.getAccount()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.regForm = this.createRegisteredForm();
  }

  createRegisteredForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    console.log(this.regForm.value);

    this.authService.register({
      firstName: this.regForm.value.firstName,
      lastName: this.regForm.value.lastName,
      login: this.regForm.value.login,
      password: this.regForm.value.password
    }).subscribe(data => {
      console.log(data)
      this.notificationService.showSnackBar('Successfully registered in');
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar("Something wrong");
    });
  }
}
