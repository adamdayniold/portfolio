import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeInAnimation, hingeAnimation, lightSpeedOutAnimation, lightSpeedInAnimation, bounceInAnimation, bounceOutAnimation, bounceOutOnLeaveAnimation } from 'angular-animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [
    hingeAnimation(),
    fadeInAnimation(),
    lightSpeedOutAnimation({ duration: 1000, translate: '500px' }),
    lightSpeedInAnimation(),
    bounceInAnimation(),
    bounceOutAnimation(),
    bounceOutOnLeaveAnimation()
  ]
})
export class DescriptionComponent implements OnInit {
  title = 'adam_portfolio';
  introduction: boolean = true;
  hinge: boolean = false;
  timelineOccur: boolean = false;
  lightSpeedIn: boolean = false;

  ngOnInit() {
  }

  intro() {
    this.hinge = true;
    setTimeout(() => {
      this.introduction = false;
      this.timelineOccur = true;
      this.lightSpeedInInformation();
    }, 1010);
  }

  lightSpeedInInformation() {
    setTimeout(() => {
      this.lightSpeedIn = true;
    }, 1000)
  }

}
