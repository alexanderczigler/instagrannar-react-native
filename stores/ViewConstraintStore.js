var alt = require('../alt');

class ViewConstraintStore {
  constructor() {
    this.toolbarHeight = 58;
    this.mapHeight = 120;
  }
}

module.exports = alt.createStore(ViewConstraintStore, 'ViewConstraintStore');
