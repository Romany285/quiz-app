import { Component } from '@angular/core';
import { IResult } from '../../../instructor/modules/results/models/IResult';
import { ResultsService } from '../../../instructor/modules/results/services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
results:IResult[] = []
  constructor(private _resultsService:ResultsService) {
    this.getResults()
  }
  getResults(){
    this._resultsService.getAllResults().subscribe({
      next: (res) => {
        this.results = res
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  
}
