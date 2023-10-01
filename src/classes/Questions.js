import { ServiceConstants } from '../utils/ServiceConstants.js';
import { Helper } from './Helper.js';

export class Questions {
  /**
   *
   * Typeof -- Please use this specific types otherwise there might be somecases where application could break
   * questions : {
   *    id: {
   *        id: number,
   *        question: string,
   *        optionsList: String[],
   *        answerIndex: number
   *    }
   * }
   *
   * NOTE:
   *      --> id should always be same per question and number, both in key and value (inside nested object)
   *      --> answerIndex should always be in between {0,1,2,3} since only 4 options are available only
   *      --> question should be always is string
   *      --> OptionsList each element should be string otherwise there might be some cases where app could break down
   *      --> external questions could be hooked in as long as they follow above points and types/format
   */
  static #questions = {
    1: {
      id: 1,
      question: 'What is 2 + 2 ?',
      optionsList: ['2', '4', '5', '6'],
      answerIndex: 1,
    },
    2: {
      id: 2,
      question: 'What is 2 + 5 ?',
      optionsList: ['2', '4', '5', '7'],
      answerIndex: 3,
    },
    3: {
      id: 3,
      question: 'What is 1 + 5 ?',
      optionsList: ['2', '4', '6', '7'],
      answerIndex: 2,
    },
    4: {
      id: 4,
      question: 'What is 0 + 5 ?',
      optionsList: ['2', '4', '5', '7'],
      answerIndex: 2,
    },
    5: {
      id: 5,
      question: 'What is best bird?',
      optionsList: ['yellow', 'blue', 'green', 'peacock'],
      answerIndex: 3,
    },
    6: {
      id: 6,
      question: 'What is best show?',
      optionsList: ['noone', 'blue', 'green', 'black'],
      answerIndex: 0,
    },
    7: {
      id: 7,
      question: 'What is best pen?',
      optionsList: ['yellow', '3 rupee wala', 'green', 'black'],
      answerIndex: 1,
    },
    8: {
      id: 8,
      question: 'What is best diet?',
      optionsList: ['yellow', 'blue', 'green', 'veg'],
      answerIndex: 3,
    },
  };
  static getQuestionById(id) {
    Helper.checkIllegalTypeParam(id, ServiceConstants.CHECK_TYPE_NUMBER);
    return this.#questions[id];
  }
  static getRandomQuestion() {
    const randomQuestionIndex = Helper.getRandomNumber(1, 8);
    return this.#questions[randomQuestionIndex];
  }

  static checkProvidedAnsIsCorrect(questionId, ansGiven) {
    const question = this.#questions[questionId];

    // .toString is a workaround in case somebody passed a question with values as number
    return (
      question['optionsList'].at(question['answerIndex']).toString() ===
      ansGiven.toString()
    );
  }

  static checkQuestionsMoreThanRequirement() {
    return (
      Object.keys(this.#questions).length >= ServiceConstants.TOTAL_QUESTIONS
    );
  }
}
