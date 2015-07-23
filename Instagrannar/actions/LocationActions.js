var alt = require('../alt');

class LocationActions {
  get() {
    this.dispatch();
  }
  set(location) {
    this.dispatch(location);
  }
}

module.exports = alt.createActions(LocationActions);
