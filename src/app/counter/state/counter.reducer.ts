import { on, createReducer } from '@ngrx/store';
import * as fromCounterActions from './counter.actions';
import { counterInitialState } from './counter.state';

const _counterReducer = createReducer(
  counterInitialState,
  on(fromCounterActions.increment, (state) => ({
    ...state,
    counter: state.counter + 1,
  })),
  on(fromCounterActions.decrement, (state) => ({
    ...state,
    counter: state.counter - 1,
  })),
  on(fromCounterActions.reset, (state) => ({ ...state, counter: 0 })),
  on(fromCounterActions.addCounter, (state, action) => ({
    ...state,
    counter: state.counter + action.count,
  }))
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
