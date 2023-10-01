export class ServiceConstants {
  static HTML_ID_QUESTION_FROM = 'question_form';
  static HTML_ID_QUESTION_TITLE = 'question_title';
  static HTML_ID_QUESTION_SUBMIT_BTN = 'question_submit';
  static HTML_ID_TOTAL_SCORE = 'total_score';
  static HTML_ID_SCORE_TRACKER = 'score_tracker';
  static HTML_ID_FINAL_SCORE_CARD = 'final_score_card';
  static HTML_ID_QUESTION_CONTAINER = 'question_container';
  static HTML_CLASS_SCORE_TRACKER_LI = 'score-tracker-li';
  static HTML_CLASS_SCORE_TRACKER_LI_ICON = 'score-tracker-li-icon';
  static HTML_CLASS_SCORE_TRACKER_LI_ICON_CORRECT =
    'score-tracker-li-icon-correct';
  static HTML_CLASS_SCORE_TRACKER_LI_ICON_INCORRECT =
    'score-tracker-li-icon-incorrect';
  static HTML_CLASS_SCORE_TRACKER_LI_TEXT = 'score-tracker-li-text';
  static HTML_CLASS_SCORE_TRACKER_LI_CURRENT_QUES =
    'score-tracker-li-current-ques';
  static HTML_CLASS_OPTION_CHOSEN = 'option-selected';
  static HTML_CLASS_FINAL_SCORE_CARD_VISIBLE = 'final-score-card';
  static HTML_CLASS_INVISIBLE = 'invisible';

  // for type param
  static CHECK_TYPE_NUMBER = 'number';
  static CHECK_TYPE_STRING = 'string';

  // extra service params
  static TOTAL_QUESTIONS = '7';
  static CORRECT_MARKS_PER_QUESTION = '4';
  static NEGATIVE_MARKS_PER_QUESTION = '-1';

  // score tracker icons
  static GOOGLE_ICON_GENERAL_CLASS = 'material-symbols-outlined';
  static SCORE_TRACKER_NON_ATTEMPTED = 'question_mark';
  static SCORE_TRACKER_CORRECT_ANS = 'check';
  static SCORE_TRACKER_INCORRECT_ANS = 'close';
}
