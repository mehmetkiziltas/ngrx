import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as fromCounterActions from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css'],
})
export class CounterButtonsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onIncrement() {
    this.store.dispatch(fromCounterActions.increment());
  }

  onDecrement() {
    this.store.dispatch(fromCounterActions.decrement());
  }

  onReset() {
    this.store.dispatch(fromCounterActions.reset());
  }
}
