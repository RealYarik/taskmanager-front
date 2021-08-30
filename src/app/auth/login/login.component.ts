import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.tokenStorage.getAccount()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      login: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.authService.login({
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data)

      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveAccount(data);

      this.notificationService.showSnackBar('Successfully logged in');
      this.router.navigate(['/']);
      window.location.reload();
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    });
  }

}
