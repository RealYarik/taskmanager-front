import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Account} from "../../models/Account";
import {NotificationService} from "../../services/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  account: Account;
  profileForm: FormGroup;
  isLoggedIn = false;
  isDataLoaded = false;


  constructor(private accountService: AccountService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.accountService.getCurrentAccount()
        .subscribe(data => {
          this.account = data;
          this.isDataLoaded = true;
          this.profileForm = this.createProfileForm();
        });
    }
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      firstName: [this.account.firstName, Validators.compose([Validators.required])],
      lastName: [this.account.lastName, Validators.compose([Validators.required])]
    })
  }

  submit(): void {

    this.account.firstName = this.profileForm.value.firstName;
    this.account.lastName = this.profileForm.value.lastName;

    this.accountService.updateAccount(this.account).subscribe(data => {
      window.location.reload();
      this.notificationService.showSnackBar(data.message);
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar("Something wrong");
    });
  }

}
