import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['new'],

  title: '',
  date: '',
  notes: '',
  edit: false,

  actions: {
    createReminder() {
      const reminder = this.getProperties('title', 'date', 'notes', 'edit');
      reminder.date = new Date(reminder.date);
      this.get('store').createRecord('reminder', reminder).save()
      .then(() => {
        this.setProperties({title: '', date: '', notes: ''});
        this.sendAction();
      });
    }
  }
});
