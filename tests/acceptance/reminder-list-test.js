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
  click('.spec-view-form');
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

test('user should be able to edit the reminder', function(assert) {
  visit('/');
  click('.spec-view-form');

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
