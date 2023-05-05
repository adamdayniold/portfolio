import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeInAnimation, hingeAnimation } from 'angular-animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [hingeAnimation(), fadeInAnimation()]
})
export class DescriptionComponent implements OnInit {
  title = 'adam_portfolio';
  introduction: boolean = true;
  hinge: boolean = false;
  timelineOccur: boolean = false;

  ngOnInit() {
  }

  intro() {
    this.hinge = true;
    setTimeout(() => {
      this.introduction = false;
      this.timelineOccur = true;
    }, 2000);
  }
}
