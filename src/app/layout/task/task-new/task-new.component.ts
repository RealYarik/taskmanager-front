import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskIndexComponent} from "../task-index/task-index.component";
import {AccountService} from "../../../services/account.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Task} from "../../../models/Task";
import {Account} from "../../../models/Account";
import {TaskService} from "../../../services/task.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {

  form: FormGroup;
  filteredLogins: Observable<string[]>;
  logins: string[];
  isLoginsLoaded = false;
  currentAccount: Account;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private tokenService: TokenStorageService,
              private dialogRef: MatDialogRef<TaskIndexComponent>,
              private notificationService: NotificationService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      executor: ['', Validators.compose([Validators.required])],
    });
    this.accountService.getAccountLogins().subscribe(ref => {
      this.logins = ref;

      this.filteredLogins = this.form.get('executor')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.isLoginsLoaded = true;
    });
  }

  save() {
    let task = {
      name: this.form.value.name,
      description: this.form.value.description,
      executor: this.form.value.executor
    };

    this.taskService.createTask(task as Task).subscribe(data => {
      this.notificationService.showSnackBar(data.message);
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.logins.filter(option => option.toLowerCase().includes(filterValue));
  }
}
