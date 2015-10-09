var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class LocationStore {
  constructor() {
    this.location = {
      latitude: 59.33640477604537,
      longitude: 18.05935107885739,
      showUserLocation: true
    };

    this.bindListeners({
      handleSetLocation: LocationActions.set,
      handleGetLocation: LocationActions.get
    });
  }

  handleSetLocation(location) {
    this.location = location;
  }

  handleGetLocation(location) {
    return this.location;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
