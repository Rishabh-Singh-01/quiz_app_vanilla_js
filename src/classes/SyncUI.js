import { ServiceConstants } from '../utils/ServiceConstants.js';
import { Helper } from './Helper.js';
import { Questions } from './Questions.js';
import { User } from './User.js';

export class SyncUI {
  #user;
  #currentlySelectedOptionValue;
  #formTitleHtmlEl;
  #formOptionsHtmlEl;
  #formQuestionSubmitBtnEl;
  #totalScoreBoardEl;
  #scoreTrackerEl;

  constructor(user) {
    if (!(user instanceof User)) {
      console.error('User should be an instance of User class');
    }

    // check whether enough quewstions are available
    if (!Questions.checkQuestionsMoreThanRequirement()) {
      alert('Please provide enough questions');
    }

    this.#user = user;

    this.#formTitleHtmlEl = document.getElementById(
      ServiceConstants.HTML_ID_QUESTION_TITLE
    );

    this.#formOptionsHtmlEl = Array.from(
      document.getElementsByTagName('input')
    );

    this.#formQuestionSubmitBtnEl = document.getElementById(
      ServiceConstants.HTML_ID_QUESTION_SUBMIT_BTN
    );

    // since in starting first option is always selected
    this.#currentlySelectedOptionValue = Questions.getQuestionById(
      this.#user.getCurrentQuestionNo()
    ).optionsList.at(0);

    this.#totalScoreBoardEl = document.getElementById(
      ServiceConstants.HTML_ID_TOTAL_SCORE
    );

    this.#scoreTrackerEl = document.getElementById(
      ServiceConstants.HTML_ID_SCORE_TRACKER
    );
  }

  // getting dom elements
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
    return this.#formTitleHtmlEl;
  }

  #getFormOptionsHtmlEl() {
    return this.#formOptionsHtmlEl;
  }
  #getFormQuestionSubmitBtnEl() {
    return this.#formQuestionSubmitBtnEl;
  }
  #getTotalScoreBoardEl() {
    return this.#totalScoreBoardEl;
  }
  #getScoreTrackerEl() {
    return this.#scoreTrackerEl;
  }

  // cta methods
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

  #updateScoreTracker(isCorrect) {
    Helper.checkIllegalTypeParam(isCorrect, 'boolean');
    // creating a new li child to be appended
    console.log('jasdl;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
    const listItemList = Array.from(
      document.querySelectorAll(
        `.${ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_ICON}`
      )
    );
    console.log(this.#getScoreTrackerEl());
    console.log(listItemList.at(this.#user.getPreviousQuestions().length));
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

  #displayFinalScoreCard() {
    const finalScoreCard = document.getElementById(
      ServiceConstants.HTML_ID_FINAL_SCORE_CARD
    );
    console.log(finalScoreCard);
    finalScoreCard.classList.remove(ServiceConstants.HTML_CLASS_INVISIBLE);
    finalScoreCard.classList.add(
      ServiceConstants.HTML_CLASS_FINAL_SCORE_CARD_VISIBLE
    );
    this.#getFormQuestionSubmitBtnEl().remove();
    document
      .getElementById(ServiceConstants.HTML_ID_QUESTION_CONTAINER)
      .remove();
  }

  attachEventListeners() {
    // event handler for submit btn and check the question
    this.#getFormQuestionSubmitBtnEl().addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e);
      // TODO: right logic for checking the answer and updating score
      const isSubmittedAnsCorrect = Questions.checkProvidedAnsIsCorrect(
        this.#getCurrentQuestionInDisplay()['id'],
        this.#getCurrentlySelectedOptionValue()
      );
      console.log(isSubmittedAnsCorrect);
      this.#updateScoreTracker(isSubmittedAnsCorrect);

      // incase all the questions are finised then display score board and return
      if (
        this.#user.getPreviousQuestions().length ===
        parseInt(ServiceConstants.TOTAL_QUESTIONS) - 1
      ) {
        console.log('this is teh enddddddddddddddddddddddddddddddddd');
        this.#displayFinalScoreCard();
        // refactor this as well remove score card quest styles
        Array.from(
          document.getElementsByClassName(
            ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_TEXT
          )
        ).forEach((el) =>
          el.classList.remove(
            ServiceConstants.HTML_CLASS_SCORE_TRACKER_LI_CURRENT_QUES
          )
        );
        return;
      }
      this.#user.update(
        isSubmittedAnsCorrect
          ? parseInt(ServiceConstants.CORRECT_MARKS_PER_QUESTION)
          : parseInt(ServiceConstants.NEGATIVE_MARKS_PER_QUESTION)
      );
      console.log('below is the score');
      console.log(this.#user);
      this.renderForm();
    });

    // event handler for options in the form question
    this.#getFormOptionsHtmlEl().forEach((el) => {
      el.addEventListener('click', (e) => {
        console.log(e);
        this.#setCurrentlySelectedOptionValue(e.target.value);
        console.log(this.#getCurrentlySelectedOptionValue());

        // removing the styles (refactor)
        this.#getFormOptionsHtmlEl().forEach((el) => {
          Array.from(el.labels)
            .at(0)
            .classList.remove(ServiceConstants.HTML_CLASS_OPTION_CHOSEN);
        });
        Array.from(e.target.labels)
          .at(0)
          .classList.add(ServiceConstants.HTML_CLASS_OPTION_CHOSEN);
      });
    });
  }

  // this methods provide with necessary styling and other resets needed before rendering data
  #preRenderResets() {
    // 0) Making sure total questions as requirement are asked (we are on last question)
    if (
      this.#user.getPreviousQuestions().length ===
      parseInt(ServiceConstants.TOTAL_QUESTIONS) - 1
    ) {
      this.#getFormQuestionSubmitBtnEl().innerText =
        'Submit and Check your total';
    }

    // 1) marking the first option every time a question is rendered and default selecting first option as selected ans
    this.#getFormOptionsHtmlEl().at(0).checked = true;
    this.#setCurrentlySelectedOptionValue(
      Questions.getQuestionById(this.#user.getCurrentQuestionNo())
        ['optionsList'].at(0)
        .toString() // --> workaround incase somebody passed number as options (not complete feature)
    );

    this.#getFormOptionsHtmlEl().forEach((el) => {
      Array.from(el.labels)
        .at(0)
        .classList.remove(ServiceConstants.HTML_CLASS_OPTION_CHOSEN);
    });
    Array.from(this.#getFormOptionsHtmlEl().at(0).labels)
      .at(0)
      .classList.add(ServiceConstants.HTML_CLASS_OPTION_CHOSEN);

    // 2) changing current style to show which quesiton we are on
    console.log('fafsfasfa');
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

  // this methods render information in UI
  renderForm() {
    this.#preRenderResets();
    console.log(this.#getCurrentlySelectedOptionValue());
    console.log(this.#formTitleHtmlEl);
    this.#getFormTitleHtmlEl().innerHTML =
      this.#getCurrentQuestionInDisplay()['question'];
    console.log(this.#formOptionsHtmlEl);
    this.#getFormOptionsHtmlEl().forEach((element, i) => {
      console.log(element, i);
      element.innerText = this.#getCurrentQuestionInDisplay().optionsList.at(i);
      element.value = this.#getCurrentQuestionInDisplay().optionsList.at(i);
      const labelList = Array.from(element.labels);
      console.log(labelList);
      labelList.at(0).innerText =
        this.#getCurrentQuestionInDisplay().optionsList.at(i);
    });
    console.log(this.#formOptionsHtmlEl);
    this.#getTotalScoreBoardEl().innerText = this.#user.getScore();
  }
}
