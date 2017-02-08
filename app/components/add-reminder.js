import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['add-reminder'],

  text: '',

  actions: {
    createReminder() {
      const reminder = this.getProperties('text')
      this.get('store').createRecord('reminder', reminder).save().then(() => {
        this.setProperties({text: ''})
      })
    }
  }
});
