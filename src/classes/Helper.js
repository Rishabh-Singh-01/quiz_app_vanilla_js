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

  /**
   *
   * @param {*} secs - number representing the wait that will occur syncronously
   *
   * NOTE - burdens CPU very much
   *      - should be used caustiously no more that couple of seconds
   *
   * TODO: remove and update the code as per async/await methods
   */
  static waitSync(secs) {
    this.checkIllegalTypeParam(secs, 'number');
    const start = Date.now();
    let now = start;
    while (now - start < secs * 1000) now = Date.now();
  }

  static waitAsync(secs) {
    return new Promise((resolve) => setTimeout(resolve, t, val));
  }
}
