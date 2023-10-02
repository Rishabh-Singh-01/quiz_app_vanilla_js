import { ServiceConstants } from '../utils/ServiceConstants.js';
import { Timer } from '../utils/Timer.js';
import { TransitionAnimation } from '../utils/TransitionAnimation.js';
import { Helper } from './Helper.js';
import { Questions } from './Questions.js';
import { User } from './User.js';

/**
 * class that acts as both event listener and dispatcher which syncs data with UI in real time
 */
export class SyncUI {
  #user;
  #currentlySelectedOptionValue;
  #timerCounter;

  constructor(user) {
    if (!(user instanceof User)) {
      console.error('User should be an instance of User class');
    }

    // check whether enough quewstions are available
    if (!Questions.checkQuestionsMoreThanRequirement()) {
      alert('Please provide enough questions');
    }

    this.#user = user;

    // since in starting first option is always selected
    this.#currentlySelectedOptionValue = Questions.getQuestionById(
      this.#user.getCurrentQuestionNo()
    ).optionsList.at(0);

    // embedding timer counter - no need for DI
    this.#timerCounter = new Timer();
  }

  // Refactored to directly fetch dom elements instead of storing as fields
  // since project is very small so no major perf issue

  // Getters/Setters for dom elements
  #getCurrentQuestionInDisplay() {
    return Questions.getQuestionById(this.#user.getCurrentQuestionNo());
  }
  #getCurrentlySelectedOptionValue() {
    return this.#currentlySelectedOptionValue;
  }
  #setCurrentlySelectedOptionValue(val) {
    Helper.checkIllegalTypeParam(val, ServiceConstants.CHECK_TYPE_STRING);
    this.#currentlySelectedOptionValue = val;
  }
  #getFormTitleHtmlEl() {
    return document.getElementById(ServiceConstants.HTML_ID_QUESTION_TITLE);
  }

  #getFormOptionsHtmlEl() {
    return Array.from(document.getElementsByTagName('input'));
  }
  #getFormQuestionSubmitBtnEl() {
    return document.getElementById(
      ServiceConstants.HTML_ID_QUESTION_SUBMIT_BTN
    );
  }
  #getTotalScoreBoardEl() {
    return document.getElementById(ServiceConstants.HTML_ID_TOTAL_SCORE);
  }
  #getScoreTrackerEl() {
    return document.getElementById(ServiceConstants.HTML_ID_SCORE_TRACKER);
  }
  #getRestartBtnEl() {
    return document.querySelector(
      `.${ServiceConstants.HTML_CLASS_RESTART_BTN}`
    );
  }
  #getTimerCounter() {
    return this.#timerCounter;
  }

  // cta methods
  /**
   * @param {*} isSubmittedAnsCorrect - Boolean representing the question submitted is correct or not
   * @param {*} nextQuesRequired - Boolean repesents whether next quest if required by user or not
   * update the user details/data
   */
  #updateUserData(isSubmittedAnsCorrect, nextQuesRequired) {
    this.#user.update(
      isSubmittedAnsCorrect
        ? parseInt(ServiceConstants.CORRECT_MARKS_PER_QUESTION)
        : parseInt(ServiceConstants.NEGATIVE_MARKS_PER_QUESTION),
      nextQuesRequired
    );
  }

  /**
   * Tells whether its the last question or not
   * @returns boolean representing the current question is the last question
   */
  #checkLastQuestion() {
    return (
      this.#user.getPreviousQuestions().length ===
      parseInt(ServiceConstants.TOTAL_QUESTIONS) - 1
    );
  }

  /**
   * dynamically creates the score tracker as per questions requirement
   */
  createScoreTracker() {
    for (let i = 0; i < ServiceConstants.TOTAL_QUESTIONS; i++) {
      const li = document.createElement('li');
      li.className = ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI;
      const liSpanIcon = document.createElement('span');
      liSpanIcon.className =
        ServiceConstants.GOOGLE_ICON_GENERAL_CLASS +
        ' ' +
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON;
      liSpanIcon.innerText = ServiceConstants.SCORE_TRACKER_NON_ATTEMPTED;
      const liSpanText = document.createElement('span');
      liSpanText.className += ` ${ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_TEXT}`;
      liSpanText.innerText = `Ques ${i + 1}`;
      li.appendChild(liSpanText);
      li.appendChild(liSpanIcon);
      this.#getScoreTrackerEl().appendChild(li);
    }
  }

  /**
   * Resets the icons from score tracker to default value ie question mark
   */
  #resetScoreTrackerIcons() {
    const listItemList = Array.from(
      document.querySelectorAll(
        `.${ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON}`
      )
    );
    listItemList.forEach((el) => {
      el.innerText = ServiceConstants.SCORE_TRACKER_NON_ATTEMPTED;
      el.classList.remove(
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON_CORRECT
      );
      el.classList.remove(
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON_INCORRECT
      );
    });
  }

  /**
   * @param {boolean} isCorrect - represents the question submitted is correct or not
   * Display tick icon if the isCorrect parameter is true else cross icon
   */
  #updateScoreTrackerIcon(isCorrect) {
    Helper.checkIllegalTypeParam(isCorrect, 'boolean');
    const listItemList = Array.from(
      document.querySelectorAll(
        `.${ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON}`
      )
    );
    listItemList.at(this.#user.getPreviousQuestions().length).innerText =
      isCorrect
        ? ServiceConstants.SCORE_TRACKER_CORRECT_ANS
        : ServiceConstants.SCORE_TRACKER_INCORRECT_ANS;
    listItemList.at(this.#user.getPreviousQuestions().length).className += ` ${
      isCorrect
        ? ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON_CORRECT
        : ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON_INCORRECT
    }`;
  }

  /**
   * displayes the final score card after all the questions submission are done
   */
  #displayFinalScoreCard() {
    const finalScoreCard = document.getElementById(
      ServiceConstants.HTML_ID_FINAL_SCORE_CARD
    );
    finalScoreCard.classList.remove(ServiceConstants.HTML_CLASS_INVISIBLE);
    finalScoreCard.classList.add(
      ServiceConstants.HTML_CLASS_FINAL_SCORE_CARD_VISIBLE
    );
    this.#getFormQuestionSubmitBtnEl().remove();
    document
      .getElementById(ServiceConstants.HTML_ID_QUESTION_CONTAINER)
      .remove();
    this.#getTotalScoreBoardEl().innerText = this.#user.getScore();
  }

  /**
   *
   * @param { NodeListOf<HTMLLabelElement>} selectedOptionlabelList - List of labels mapped with selected radio button
   * update the selected option label with new styles
   */
  #updateSelectedOptionLabelStyle(selectedOptionlabelList) {
    this.#getFormOptionsHtmlEl().forEach((el) => {
      Array.from(el.labels)
        .at(0)
        .classList.remove(ServiceConstants.HTML_CLASS_OPTION_CHOSEN);
    });
    Array.from(selectedOptionlabelList)
      .at(0)
      .classList.add(ServiceConstants.HTML_CLASS_OPTION_CHOSEN);
  }

  /**
   * removes the current display question styling in score tracker list
   */
  #removeScoreTrackerQuestionsStyle() {
    Array.from(
      document.getElementsByClassName(
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_TEXT
      )
    ).forEach((el) =>
      el.classList.remove(
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_CURRENT_QUES
      )
    );
  }

  /**
   * update the current question styles in score/question tracker list
   */
  #updateScoreTrackerCurrentQuesStyle() {
    const scoreTrackerQuestionsList = Array.from(
      document.getElementsByClassName(
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_TEXT
      )
    );
    scoreTrackerQuestionsList.forEach((el) =>
      el.classList.remove(
        ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_CURRENT_QUES
      )
    );
    scoreTrackerQuestionsList
      .at(this.#user.getPreviousQuestions().length)
      .classList.add(ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_CURRENT_QUES);
  }

  /**
   * update the input radios to default value ie first or index 0
   * also updates currently selected option value
   * called in pre rendering of every question change/ submission of question
   */
  #updateSelectedInputToDefault() {
    this.#getFormOptionsHtmlEl().at(0).checked = true;
    this.#setCurrentlySelectedOptionValue(
      Questions.getQuestionById(this.#user.getCurrentQuestionNo())
        ['optionsList'].at(0)
        .toString() // --> workaround incase somebody passed number as options (not complete feature)
    );
  }

  submitQuestionHandler() {
    const isSubmittedAnsCorrect = Questions.checkProvidedAnsIsCorrect(
      this.#getCurrentQuestionInDisplay()['id'],
      this.#getCurrentlySelectedOptionValue()
    );
    this.#updateScoreTrackerIcon(isSubmittedAnsCorrect);

    // incase all the questions are finised then display score board and return
    if (this.#checkLastQuestion()) {
      this.#updateUserData(isSubmittedAnsCorrect, false);
      this.#displayFinalScoreCard();
      this.#removeScoreTrackerQuestionsStyle();
      this.#getRestartBtnEl().remove();
      return;
    }

    TransitionAnimation.animateTransition();
    // incase there are remaining questions
    this.#updateUserData(isSubmittedAnsCorrect, true);
    this.renderForm();
  }

  /**
   * attaches event listener to the appropriate dom elements
   *
   * NOTE - Mainly handles click event for the submission/next button and click events for option radio btns
   */
  attachEventListeners() {
    // event handler for submit btn and check the question
    this.#getFormQuestionSubmitBtnEl().addEventListener('click', (e) => {
      e.preventDefault();
      this.submitQuestionHandler();
    });

    // event handler for options in the form question
    this.#getFormOptionsHtmlEl().forEach((el) => {
      el.addEventListener('click', (e) => {
        this.#setCurrentlySelectedOptionValue(e.target.value);
        this.#updateSelectedOptionLabelStyle(e.target.labels);
      });
    });

    // event listener for restart quiz button
    this.#getRestartBtnEl().addEventListener('click', (e) => {
      this.#user.resetUserData();
      this.#resetScoreTrackerIcons();
      this.renderForm();
      TransitionAnimation.animateTransition();
    });
  }

  /**
   * this methods provide with necessary styling and other resets needed before rendering data
   *
   * NOTE - No data is pouplated here, this just resets the styling for every question
   *        and provide some others styling
   */
  #preRenderStyling() {
    // 0) Making sure total questions as requirement are asked (we are on last question)
    if (this.#checkLastQuestion())
      this.#getFormQuestionSubmitBtnEl().innerText =
        ServiceConstants.TEXT_SUBMIT_BTN_LAST_QUES;

    // 1) marking the first option every time a question is rendered and default selecting first option as selected ans
    this.#updateSelectedInputToDefault();
    this.#updateSelectedOptionLabelStyle(
      this.#getFormOptionsHtmlEl().at(0).labels
    );

    // 2) changing current style to show which quesiton we are on
    this.#updateScoreTrackerCurrentQuesStyle();
  }

  /**
   * Renders current questions details on UI
   * Populate data like question title and their respective options
   *
   * DEV NOTE - when converting labels we only need first label as no other labels are present
   */
  #renderCurrentQuestionDetails() {
    this.#getFormTitleHtmlEl().innerHTML =
      this.#getCurrentQuestionInDisplay()['question'];
    this.#getFormOptionsHtmlEl().forEach((element, i) => {
      element.innerText = this.#getCurrentQuestionInDisplay().optionsList.at(i);
      element.value = this.#getCurrentQuestionInDisplay().optionsList.at(i);
      Array.from(element.labels).at(0).innerText =
        this.#getCurrentQuestionInDisplay().optionsList.at(i);
    });
  }

  /**
   * renders information and other necessary in UI
   */
  renderForm() {
    this.#preRenderStyling();
    this.#renderCurrentQuestionDetails();
    this.#getTimerCounter().restartTimer(this);
  }
}
