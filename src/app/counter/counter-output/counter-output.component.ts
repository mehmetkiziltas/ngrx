import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from '../state/counter.state';
import { getCounter } from '../state/counter.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  counter = 0;
  counterSubscription!: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.counterSubscription = this.store
      .select(getCounter)
      .subscribe((data) => {
        this.counter = data;
      });
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
