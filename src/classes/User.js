import { Questions } from './Questions.js';
import { Helper } from './Helper.js';

export class User {
  #score;
  #currentQuestionNo;
  #previousQuestions;

  constructor() {
    this.#score = 0;
    this.#currentQuestionNo = Questions.getRandomQuestion()['id'];
    this.#previousQuestions = [];
  }

  // getters and setters for the required fields
  getScore() {
    return this.#score;
  }

  getCurrentQuestionNo() {
    return this.#currentQuestionNo;
  }

  getPreviousQuestions() {
    return this.#previousQuestions;
  }

  setScore(score) {
    Helper.checkIllegalTypeParam(score, 'number');
    this.#score = score;
  }
  setCurrentQuestionNo(quesNo) {
    Helper.checkIllegalTypeParam(quesNo, 'number');
    this.#currentQuestionNo = quesNo;
  }
  addToPreviousQuestions(prevQuesNo) {
    Helper.checkIllegalTypeParam(prevQuesNo, 'number');
    this.#previousQuestions.push(prevQuesNo);
  }

  // updating the user
  update(updateScore, nextQuesRequired) {
    Helper.checkIllegalTypeParam(updateScore, 'number');
    Helper.checkIllegalTypeParam(nextQuesRequired, 'boolean');

    // if next question is not required then only update score
    if (!nextQuesRequired) {
      this.setScore(this.getScore() + updateScore);
      return;
    }

    // storing the previous question
    this.addToPreviousQuestions(this.getCurrentQuestionNo());
    // incrementign the score
    this.setScore(this.getScore() + updateScore);
    // selecting a new random question but not same as previous question
    let currentQuesNo = Questions.getRandomQuestion()['id'];
    while (this.getPreviousQuestions().includes(currentQuesNo)) {
      currentQuesNo = Questions.getRandomQuestion()['id'];
    }
    // setting the new random question as current question
    this.setCurrentQuestionNo(currentQuesNo);
  }
}
