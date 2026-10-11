export const INSTAGRAM_REMINDER_DELAYS = [12000, 30000, 60000];

export class InstagramReminders {
  constructor({ count = 0, onShow, setTimer = (callback, delay) => setTimeout(callback, delay), clearTimer = timer => clearTimeout(timer) }) {
    this.count = Math.max(0, Math.min(3, count));
    this.onShow = onShow;
    this.setTimer = setTimer;
    this.clearTimer = clearTimer;
    this.eligible = false;
    this.open = false;
    this.timer = null;
  }
  update({ eligible, open }) {
    if (this.eligible === eligible && this.open === open) return;
    this.eligible = eligible;
    this.open = open;
    this.cancel();
    this.schedule();
  }
  schedule() {
    if (!this.eligible || this.open || this.count >= 3) return;
    this.timer = this.setTimer(() => {
      this.timer = null;
      if (!this.eligible || this.open || this.count >= 3) return;
      this.open = true;
      this.count += 1;
      this.onShow(this.count);
    }, INSTAGRAM_REMINDER_DELAYS[this.count]);
  }
  cancel() {
    if (this.timer !== null) this.clearTimer(this.timer);
    this.timer = null;
  }
  stop() { this.count = 3; this.cancel(); }
  destroy() { this.eligible = false; this.cancel(); }
}

