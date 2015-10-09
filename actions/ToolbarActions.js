var alt = require('../alt');

class ToolbarActions {
  get() {
    this.dispatch();
  }
  set(toolbarState) {
    this.dispatch(toolbarState);
  }
}

module.exports = alt.createActions(ToolbarActions);
