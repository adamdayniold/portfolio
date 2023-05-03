import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

const enterTransition = transition(':enter', [
  style({ opacity: 0 }),
  animate('1s ease-in', style({ opacity: 1 }))
]);
const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [fadeIn]
})
export class DescriptionComponent implements OnInit {
  title = 'adam_portfolio';
  introduction: boolean = true;
  fadetrans: boolean = false;
  timelineOccur: boolean = false;

  ngOnInit() {
  }

  intro() {
    this.introduction = false;
    this.timelineOccur = true;
  }

  fadeAnim() {
    this.fadetrans = true;
  }
}
