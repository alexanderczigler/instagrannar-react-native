var alt = require('../alt');
var ToolbarActions = require('../actions/ToolbarActions');

class ToolbarStore {
  constructor() {
    this.toolbarState = {
      currentView: 'Home',
      left: '',
      right: 'Search'
    }

    this.bindListeners({
      handleSetToolbarState: ToolbarActions.set,
      handleGetToolbarState: ToolbarActions.get
    });
  }

  handleSetToolbarState(toolbarState) {

    if (toolbarState.currentView === 'Home') {
      toolbarState.left = '';
      toolbarState.right = 'Search';
    }

    if (toolbarState.currentView === 'Search') {
      toolbarState.left = 'Back';
      toolbarState.right = '';
    }

    this.toolbarState = toolbarState;
  }

  handleGetToolbarState(toolbarState) {
    return this.toolbarState;
  }
}

module.exports = alt.createStore(ToolbarStore, 'ToolbarStore');
