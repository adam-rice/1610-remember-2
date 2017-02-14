import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editReminder(model) {
      model.date = model.date || new Date();
      model.save();
      this.sendAction();
    },
    rollbackChanges() {
      // if(model.get('hasDirtyAttributes')) {
      //   model.rollbackChanges();
      // }
      console.log('boom');
    }
  }
});
