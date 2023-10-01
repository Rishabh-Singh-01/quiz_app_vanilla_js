export class Helper {
  // this is to prevent developer illegal type parameter passing
  static checkIllegalTypeParam(variable, type) {
    if (typeof variable !== type) {
      console.error(
        `Dev Issue: Type of ${variable} doesnot match ${type}. Please provide valid type`
      );
      alert(
        `Dev Issue: Type of ${variable} doesnot match ${type}. Please provide valid type`
      );
      // TODO - add better prevention/rollback for these issues
    }
  }
  static getRandomNumber(startNo, endNo) {
    return Math.floor(Math.random() * (endNo - startNo + 1) + startNo);
  }
}
