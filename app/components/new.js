import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['new'],

  title: '',
  date: '',
  notes: '',

  actions: {
    createReminder() {
      const title = this.getProperties('title');
      // const date = this.getProperties('date');
      // const notes = this.getProperties('notes');
      this.get('store').createRecord('title', title).save()
      .then(() => {
        this.setProperties({title: ''});
      });
    }
  }
});
