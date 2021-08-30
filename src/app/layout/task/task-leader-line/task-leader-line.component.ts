import {Component, Inject, Input, OnInit} from '@angular/core';
import {Task} from "../../../models/Task";
import {DOCUMENT} from "@angular/common";
import 'leader-line';
import {SolutionService} from 'src/app/services/solution.service';
import {BooleanMapOfSolution} from "../../../models/BooleanMapOfSolution";

declare let LeaderLine: any;

@Component({
  selector: 'app-task-leader-line',
  templateUrl: './task-leader-line.component.html',
  styleUrls: ['./task-leader-line.component.css']
})
export class TaskLeaderLineComponent implements OnInit {

  @Input() task: Task;
  booleanMapOfSolutions: BooleanMapOfSolution
  isDataLoaded = false;


  constructor(@Inject(DOCUMENT) private document,
              private solutionService: SolutionService) {
  }

  ngOnInit(): void {
    this.solutionService.getBooleanMapOfSolutions(this.task.id)
      .subscribe(data => {
        this.booleanMapOfSolutions = data;
        this.isDataLoaded = true;
        this.createSolutionPath();
      });
  }

  ngOnDestroy() {
    // @ts-ignore
    document.querySelectorAll('.leader-line').forEach(e => e.parentNode.removeChild(e));
  }

  createSolutionPath() {
    let pathSolution = document.getElementById('pathSolution');
    const solutionNumber = this.task.solutionNumber == undefined ? 0 : this.task.solutionNumber;
    let booleanMapOfSolutions = Object.values(this.booleanMapOfSolutions);
    if (solutionNumber !== 0) {
      for (let i = 1; i <= solutionNumber; i++) {
        let div = document.createElement('div');

        if (i % 2 === 0) {
          div.className = 'col';
        } else {
          div.className = 'col mt-3';
        }
        div.innerHTML = '<text id="el' + i + '"></text>\n';

        // @ts-ignore
        pathSolution.appendChild(div);
      }

      if (this.task.isClosed) {
        let divForClosedTask = document.createElement('div');

        if (solutionNumber % 2 === 0) {
          divForClosedTask.className = 'col mt-3';
        } else {
          divForClosedTask.className = 'col';
        }

        divForClosedTask.innerHTML = '<text id="end"></text>\n';

        // @ts-ignore
        pathSolution.appendChild(divForClosedTask);
      }

      new LeaderLine(document.getElementById('start'), document.getElementById('el1'), {
        color: '#b1babe',
        startLabel: LeaderLine.captionLabel(this.task.name, {color: '#0d6efd'}),
        endLabel: LeaderLine.captionLabel('Solution #1', {color: '#0d6efd'}),
        endPlugColor: booleanMapOfSolutions[0] ? '#198754' : '#ffc107',
        startPlugColor: '#198754',
        startPlug: 'disc',
        endPlug: 'disc'
      });

      if (solutionNumber > 1) {
        for (let i = 1; i < solutionNumber; i++) {
          new LeaderLine(document.getElementById('el' + i), document.getElementById('el' + (i + 1)), {
            color: '#b1babe',
            endLabel: LeaderLine.captionLabel('Solution #' + (i + 1), {color: '#0d6efd'}),
            startPlugColor: booleanMapOfSolutions[i - 1] ? '#198754' : '#ffc107',
            endPlugColor: booleanMapOfSolutions[i] ? '#198754' : '#ffc107',
            startPlug: 'disc',
            endPlug: 'disc'
          });
        }
      }
      if (this.task.isClosed) {
        new LeaderLine(document.getElementById('el' + solutionNumber), document.getElementById('end'), {
          color: '#b1babe',
          endLabel: LeaderLine.captionLabel('Closed', {color: '#0d6efd'}),
          startPlugColor: booleanMapOfSolutions[solutionNumber - 1] ? '#198754' : '#ffc107',
          startPlug: 'disc',
          endPlug: 'disc'
        });
      }
    }
  }
}
