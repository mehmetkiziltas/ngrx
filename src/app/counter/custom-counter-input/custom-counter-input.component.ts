import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as fromCounterActions from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  count: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onAddCounter() {
    const regex = new RegExp('^[0-9]+$');
    if (
      !regex.test(this.count) ||
      this.count === undefined ||
      this.count === null ||
      this.count === ''
    ) {
      return;
    }

    this.store.dispatch(fromCounterActions.addCounter({ count: +this.count }));
  }
}
