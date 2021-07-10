import { Component, OnInit } from '@angular/core';
import { faTree, faDog, faPersonBooth, faHeartbeat, faGraduationCap, faQuestion, faBalanceScale } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  faTree = faTree;
  faDog = faDog;
  faPerson = faPersonBooth;
  faHeartbeat = faHeartbeat;
  faGraduationCap = faGraduationCap;
  faQuestion = faQuestion;
  faBalanceScale = faBalanceScale;

  constructor() { }

  ngOnInit(): void {
  }

}
