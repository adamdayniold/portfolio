import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [
    trigger('introduction-smaller', [
      state('true', style({
        opacity: 1
      })),
      state('false', style({
        opacity: 0
      })),
      transition('* => *', animate('200ms ease'))
    ])
  ]
})
export class DescriptionComponent implements OnInit {
  title = 'adam_portfolio';
  introduction: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.introduction = false;
    }, 1000)
  }
}
