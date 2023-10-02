import { Helper } from '../classes/Helper.js';
import { ServiceConstants } from './ServiceConstants.js';

/**
 * class that is used for timer in each question
 */
export class Timer {
  #counter = parseInt(ServiceConstants.TIMER_PER_QUESTION_IN_SECS);
  #timerCounterEl = document.getElementById(
    ServiceConstants.HTML_ID_TIMER_COUNTER
  );
  #previousSetIntervalCounterId;
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
  #getPreviousSetIntervalCounterId() {
    return this.#previousSetIntervalCounterId;
  }
  #setPreviousSetIntervalCounterId(prevId) {
    Helper.checkIllegalTypeParam(prevId, 'number');
    this.#previousSetIntervalCounterId = prevId;
  }

  /**
   * Stops the timer and removes from UI
   */
  stopTimer() {
    clearInterval(this.#getPreviousSetIntervalCounterId());
    this.#setCounter(0);
    this.#getTimerCounterEl().innerText = `${this.#getCounter()}s`;
  }

  /**
   * This method restarts the timer from required timer and display a clock like system decrementing counter
   * every second till it hits 0 which will invoke timerHitsZeroCb method
   * @param {*} syncUI - instance of syncUI class providing the method that will be invoked when timer hits 0
   */
  restartTimer(syncUI) {
    clearInterval(this.#getPreviousSetIntervalCounterId());
    this.#setCounter(parseInt(ServiceConstants.TIMER_PER_QUESTION_IN_SECS));
    this.#getTimerCounterEl().innerText = `${this.#getCounter()}s`;
    const setIntervalId = setInterval(() => {
      this.#setPreviousSetIntervalCounterId(setIntervalId);
      this.#setCounter(this.#getCounter() - 1);
      this.#getTimerCounterEl().innerText = `${this.#getCounter()}s`;
      if (this.#getCounter() <= 0) {
        clearInterval(setIntervalId);
        syncUI.submitQuestionHandler();
      }
    }, 1000);
  }
}
