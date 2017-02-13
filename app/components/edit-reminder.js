import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editReminder(model) {
      //date
      model.save();
      this.sendAction();
    }
  }
});
