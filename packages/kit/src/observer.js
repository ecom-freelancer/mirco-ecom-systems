/**
 * @interface
 */
function Observer() {}

/**
 * @param {Observable} o
 * @param {Object} arg
 * @returns {void}
 */
Observer.prototype.update = async function (o, arg) {
  throw new Error('not implemented');
};

class Observable {
  constructor() {
    /**
     * @type {Observer[]}
     */
    this.observers = [];
  }

  /**
   * @param {Observer} observer
   * @returns {void}
   */
  addObserver(observer) {
    this.observers.push(observer);
  }

  /**
   * @param {Observer} o
   * @returns {void}
   */
  deleteObserver(o) {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  deleteObservers() {
    this.observers = [];
  }

  /**
   * @param {Object} arg
   * @returns {Promise<void>}
   */
  async notifyObservers(arg) {
    await Promise.all(
      this.observers.map((observer) => observer.update(this, arg)),
    );
  }
}

module.exports = {
  Observable,
  Observer,
};
