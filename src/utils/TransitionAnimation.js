import { ServiceConstants } from './ServiceConstants.js';

/**
 * class that acts as transition animation using skeleton loading
 *
 * NOTE - called during the question submission only
 */
export class TransitionAnimation {
  static #getFormTitleHtmlEl() {
    return document.getElementById(ServiceConstants.HTML_ID_QUESTION_TITLE);
  }
  static #getGenericListItemEl() {
    return Array.from(
      document.getElementsByClassName(
        ServiceConstants.HTML_CLASS_GENERIC_LIST_ITEM
      )
    );
  }
  static #getFormQuestionSubmitBtnEl() {
    return document.getElementById(
      ServiceConstants.HTML_ID_QUESTION_SUBMIT_BTN
    );
  }

  static #addAnimationClassNameToRequiredElements() {
    this.#getFormTitleHtmlEl().classList.add(
      ServiceConstants.HTML_CLASS_TRANSITION_ANIMATION
    );
    this.#getGenericListItemEl().forEach((el) =>
      el.classList.add(ServiceConstants.HTML_CLASS_TRANSITION_ANIMATION)
    );
    this.#getFormQuestionSubmitBtnEl().classList.add(
      ServiceConstants.HTML_CLASS_TRANSITION_ANIMATION
    );
  }

  static #removeAnimationClassNameToRequiredElements() {
    this.#getFormTitleHtmlEl().classList.remove(
      ServiceConstants.HTML_CLASS_TRANSITION_ANIMATION
    );
    this.#getGenericListItemEl().forEach((el) =>
      el.classList.remove(ServiceConstants.HTML_CLASS_TRANSITION_ANIMATION)
    );
    this.#getFormQuestionSubmitBtnEl().classList.remove(
      ServiceConstants.HTML_CLASS_TRANSITION_ANIMATION
    );
  }

  static animateTransition() {
    this.#addAnimationClassNameToRequiredElements();
    setTimeout(() => {
      this.#removeAnimationClassNameToRequiredElements();
    }, parseInt(ServiceConstants.TIMER_TRANSITION_ANIMATION_IN_SECS) * 1000);
  }
}
