import { test, skip } from 'qunit';
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
