import {Component, Inject, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {SolutionService} from "../../services/solution.service";
import {ActivatedRoute} from "@angular/router";
import {Solution} from "../../models/Solution";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  taskId: number;
  isLoggedIn = false;
  isDataLoaded = false;
  solutions: Solution[];

  constructor(
    @Inject(DOCUMENT) private document,
    private tokenService: TokenStorageService,
    private solutionService: SolutionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    this.taskId = Number.parseInt(<string>this.route.snapshot.paramMap.get('id'));


    if (this.isLoggedIn) {
      this.solutionService.getSolutionsBySpecificTaskId(this.taskId)
        .subscribe(data => {
          this.solutions = data;
          this.isDataLoaded = true;
        });
    }
  }

  ngOnDestroy() {
    // @ts-ignore
    document.getElementById('solutions').remove();
  }

}
