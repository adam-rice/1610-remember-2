import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editReminder() {
      this.transitionTo('reminders');
    },
    rollbackChanges() {
      this.transitionTo('reminders');
    }
  }
});
