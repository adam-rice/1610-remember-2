import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal($('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal($('.spec-reminder-item:first').text().trim(), $('.spec-reminder-title').text().trim());
  });
});

test('clicking the Add reminder button renders a new reminder', function(assert){
  server.createList('reminder', 5);

  visit('/reminders');
  click('.spec-add-new-form');
  andThen(function() {
    assert.equal(currentURL(), '/reminders/new');
  });

  click('.spec-add-new');
  andThen(function(){
    assert.equal(find('.spec-reminder-item').length, 6);
  });
});

test('if there is a reminder there should be no "Please add your first reminder" element', function(assert){
  server.createList('reminder', 1);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(find('.spec-no-reminder-status').length, 0);
  });
});

test('if there are no reminders there should be text "Please add your first reminder"', function(assert){
  server.createList('reminder', 0);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(find('.spec-no-reminder-status').text().trim(), 'Please add your first reminder!');
  });
});

test('if edit is selected a form is rendered where the user can update their reminder', function(assert){
  server.createList('reminder', 1);

  visit('/reminders/1/edit');

  andThen(function() {
    assert.equal(find('form').length, 1);
  });
});

test('a new reminder is rendered to the list when created', function(assert) {
  visit('/');
  click('.spec-add-new-form');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
    fillIn('.new-reminder-title', 'Dinasaur');
    fillIn('.new-reminder-note', 'Can eat meat.');
    click('.spec-add-new');
  });

  andThen(function(){
    assert.equal(currentURL(), '/reminders');
  });

  andThen(function(){
    assert.equal(find('.spec-reminder-item:first').text().trim(), 'Dinasaur');
  });
});

test('user should be able to edit the reminder', function(assert) {
  visit('/');
  click('.spec-add-new-form');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
    fillIn('.new-reminder-title', 'Gorilla');
    fillIn('.new-reminder-note', 'Wheelbarrel');
    click('.spec-add-new');
  });

  click('.spec-reminder-item:first');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1');
    click('.spec-edit-reminder');
  });

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1/edit');
  });

  andThen(function(){
    fillIn('.edit-reminder-title', 'Jellyfish');
    fillIn('.edit-reminder-note', 'Shovel');
    click('.spec-edit-save-btn');
  });

  andThen(function(){
    assert.equal(currentURL(), '/reminders');
  });

  andThen(function(){
    assert.equal(find('.spec-reminder-item:first').text().trim(), 'Jellyfish');
  });
});

test('clicking the Undo button in the edit form reverts to the original', function(assert){
  visit('/');
  click('.spec-add-new-form');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
    fillIn('.new-reminder-title', 'Megatron');
    fillIn('.new-reminder-note', 'I am evil');
    click('.spec-add-new');
    click('.spec-reminder-item:first');
  });

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1');
    click('.spec-edit-reminder');
  });

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1/edit');
    fillIn('.edit-reminder-title', 'HotRod');
    click('.spec-edit-destroy-btn');
  });

  andThen(function(){
    assert.equal(currentURL(),'/reminders');
    assert.equal(find('.spec-reminder-item:first').text().trim(), 'Megatron');
  });
});

test('User is instructed to save their changes when viewing the edit form', function(assert){
  visit('/');
  click('.spec-add-new-form');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
    fillIn('.new-reminder-title', 'Blue Whale');
    click('.spec-add-new');
    click('.spec-reminder-item:first');
  });

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1');
    click('.spec-edit-reminder');
  });

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1/edit');
    assert.equal(find('#spec-edit-status').text().trim(), 'Do not forget to save your changes!');
  });
});

test('A visual cue lets the user know they have unsaved changes when editing a specific reminder', function(assert) {
  visit('/');
  click('.spec-add-new-form');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
  });

  fillIn('.new-reminder-title', 'Learn Ember');
  click('.spec-add-new');
  click('.spec-reminder-item:first');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1');
  });

  click('.spec-edit-reminder');

  andThen(function() {
    assert.equal(find('.unsaved').length, 0, 'reminder should not have the unsaved class yet');
  });

  fillIn('.edit-reminder-title', 'Practice es6');

  andThen(function() {
    assert.equal(find('.unsaved').length, 1, 'reminder being edited will now have the unsaved class');
  });

  click('.spec-edit-save-btn');

  andThen(function() {
    assert.equal(find('.unsaved').length, 0, 'reminder should no longer have the unsaved class');
  });
});
