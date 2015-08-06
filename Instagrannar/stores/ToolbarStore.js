var alt = require('../alt');
var ToolbarActions = require('../actions/ToolbarActions');

class ToolbarStore {
  constructor() {
    this.toolbarState = {
      left: '',
      right: 'Search'
    }

    this.bindListeners({
      handleSetToolbarState: ToolbarActions.set,
      handleGetToolbarState: ToolbarActions.get
    });
  }

  handleSetToolbarState(toolbarState) {
    this.toolbarState = toolbarState;
  }

  handleGetToolbarState(toolbarState) {
    return this.toolbarState;
  }
}

module.exports = alt.createStore(ToolbarStore, 'ToolbarStore');
