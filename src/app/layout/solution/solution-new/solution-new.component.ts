import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskIndexComponent} from "../../task/task-index/task-index.component";
import {NotificationService} from "../../../services/notification.service";
import {SolutionService} from "../../../services/solution.service";
import {Solution} from "../../../models/Solution";

@Component({
  selector: 'app-solution-new',
  templateUrl: './solution-new.component.html',
  styleUrls: ['./solution-new.component.css']
})
export class SolutionNewComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solutionService: SolutionService,
    private dialogRef: MatDialogRef<TaskIndexComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', Validators.compose([Validators.required])]
    });
  }

  save() {
    let solution = {
      code: this.form.value.code,
      taskId: this.data
    };

    this.solutionService.createSolution(this.data, solution as Solution).subscribe(data => {
      this.notificationService.showSnackBar(data.message);
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
