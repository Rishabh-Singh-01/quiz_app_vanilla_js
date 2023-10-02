import { Helper } from '../classes/Helper.js';
import { ServiceConstants } from './ServiceConstants.js';

/**
 * class that is used for timer in each question
 */
export class Timer {
  #counter;
  #timerCounterEl;
  constructor() {
    this.#counter = parseInt(ServiceConstants.TIMER_PER_QUESTION_IN_SECS);
    this.#timerCounterEl = document.getElementById(
      ServiceConstants.HTML_ID_TIMER_COUNTER
    );
  }

  #getCounter() {
    return this.#counter;
  }
  #setCounter(count) {
    Helper.checkIllegalTypeParam(count, 'number');
    this.#counter = count;
  }
  #getTimerCounterEl() {
    return this.#timerCounterEl;
  }

  /**
   * This method restarts the timer from required timer and display a clock like system decrementing counter
   * every second till it hits 0 which will invoke timerHitsZeroCb method
   * @param {*} timerHitsZeroCb - function representing the method that will be invoked when timer hits 0
   */
  restartTimer(timerHitsZeroCb) {
    console.log(timerHitsZeroCb);
    this.#setCounter(parseInt(ServiceConstants.TIMER_PER_QUESTION_IN_SECS));
    this.#getTimerCounterEl().innerText = `${this.#getCounter()}s`;
    const setIntervalId = setInterval(() => {
      this.#setCounter(this.#getCounter() - 1);
      this.#getTimerCounterEl().innerText = `${this.#getCounter()}s`;
      if (this.#getCounter() <= 0) {
        clearInterval(setIntervalId);
        timerHitsZeroCb();
      }
    }, 1000);
  }
}
