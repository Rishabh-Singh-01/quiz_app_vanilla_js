import { Helper } from '../classes/Helper.js';
import { ServiceConstants } from './ServiceConstants.js';

export class ToastMessage {
  static #getToastMessageEl() {
    return document.querySelector(
      `.${ServiceConstants.HTML_CLASS_TOAST_MESSAGE}`
    );
  }

  static #getToastContainerEl() {
    return document.querySelector(
      `.${ServiceConstants.HTML_CLASS_TOAST_CONTAINER}`
    );
  }

  /**
   * Display a toast/message on UI depicting message with correct/incorrect question styling
   *
   * @param {*} message - string represent the message that needed to be displayed
   * @param {*} isCorrect - boolean represents whether toast will display correct/incorrect type styles
   */
  static toast(message, isCorrect) {
    Helper.checkIllegalTypeParam(message, 'string');
    Helper.checkIllegalTypeParam(isCorrect, 'boolean');
    // check if any toast message exists if no then create a toast container
    if (!this.#getToastMessageEl()) {
      const toastContainer = document.createElement('div');
      toastContainer.className = ServiceConstants.HTML_CLASS_TOAST_CONTAINER;
      document.body.insertAdjacentElement('afterbegin', toastContainer);
    }

    // creation of toast dom element
    const toastParent = document.createElement('p');
    const toastChildText = document.createElement('span');
    const toastChildIcon = document.createElement('span');
    toastChildIcon.className = ServiceConstants.GOOGLE_ICON_GENERAL_CLASS;
    toastChildIcon.innerText = isCorrect
      ? ServiceConstants.SCORE_TRACKER_CORRECT_ANS
      : ServiceConstants.SCORE_TRACKER_INCORRECT_ANS;
    toastChildText.innerText = message;
    toastParent.appendChild(toastChildIcon);
    toastParent.appendChild(toastChildText);
    toastParent.className = ServiceConstants.HTML_CLASS_TOAST_MESSAGE;
    toastParent.className += ` ${
      isCorrect
        ? ServiceConstants.HTML_CLASS_TOAST_CORRECT
        : ServiceConstants.HTML_CLASS_TOAST_INCORRECT
    }`;
    toastParent.id = `${
      ServiceConstants.HTML_ID_TOAST_MESSAGE_BASE
    }-${message.at(-1)}`;
    // display of toast on UI
    this.#getToastContainerEl().insertAdjacentElement(
      'afterbegin',
      toastParent
    );

    // using timeout to make them disappear
    setTimeout(() => {
      document
        .getElementById(
          `${ServiceConstants.HTML_ID_TOAST_MESSAGE_BASE}-${message.at(-1)}`
        )
        .remove();
    }, parseInt(ServiceConstants.TIMER_TOAST_MESSAGE_IN_SECS) * 1000);
  }
}
