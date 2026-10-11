import test from 'node:test';
import assert from 'node:assert/strict';
import { InstagramReminders } from '../src/components/social/InstagramReminders.js';
function setup(count = 0) {
  let timer;
  const shown = [];
  const reminder = new InstagramReminders({ count, onShow: value => shown.push(value), setTimer: (callback, delay) => { timer = { callback, delay }; return 1; }, clearTimer: () => { timer = undefined; } });
  return { reminder, shown, delay: () => timer?.delay, fire: () => { assert.ok(timer); const callback = timer.callback; timer = undefined; callback(); } };
}
test('three reminders use 12, 30, 60 seconds after closing; no fourth reminder', () => {
  const r = setup();
  r.reminder.update({ eligible: true, open: false });
  for (const delay of [12000, 30000, 60000]) {
    assert.equal(r.delay(), delay);
    r.fire();
    assert.equal(r.delay(), undefined, 'no timer while modal is open');
    r.reminder.update({ eligible: true, open: false });
  }
  assert.deepEqual(r.shown, [1, 2, 3]);
  assert.equal(r.delay(), undefined);
});
test('editing, hidden page and other modals cancel eligibility; manual opening never consumes reminder', () => {
  const r = setup();
  r.reminder.update({ eligible: true, open: false });
  r.reminder.update({ eligible: false, open: false });
  assert.equal(r.delay(), undefined);
  r.reminder.update({ eligible: true, open: true });
  assert.equal(r.delay(), undefined);
  r.reminder.update({ eligible: true, open: false });
  assert.equal(r.delay(), 12000);
});
test('restored session continues at second reminder and Instagram visit stops scheduling', () => {
  const r = setup(1);
  r.reminder.update({ eligible: true, open: false });
  assert.equal(r.delay(), 30000);
  r.reminder.stop();
  r.reminder.update({ eligible: true, open: true });
  r.reminder.update({ eligible: true, open: false });
  assert.equal(r.delay(), undefined);
});
