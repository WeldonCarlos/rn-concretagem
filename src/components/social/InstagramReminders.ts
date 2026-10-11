export const INSTAGRAM_REMINDER_DELAYS = [12000, 30000, 60000];
type TimerHandle = ReturnType<typeof setTimeout> | number;
interface ReminderOptions {
  count?: number;
  onShow: (count: number) => void;
  setTimer?: (callback: () => void, delay: number) => TimerHandle;
  clearTimer?: (timer: TimerHandle) => void;
}
interface ReminderState { eligible: boolean; open: boolean }

export class InstagramReminders {
  count: number;
  private onShow: ReminderOptions['onShow'];
  private setTimer: NonNullable<ReminderOptions['setTimer']>;
  private clearTimer: NonNullable<ReminderOptions['clearTimer']>;
  private eligible: boolean;
  private open: boolean;
  private timer: TimerHandle | null;
  constructor({ count = 0, onShow, setTimer = (callback, delay) => setTimeout(callback, delay), clearTimer = timer => clearTimeout(timer) }: ReminderOptions) {
    this.count = Math.max(0, Math.min(3, count));
    this.onShow = onShow;
    this.setTimer = setTimer;
    this.clearTimer = clearTimer;
    this.eligible = false;
    this.open = false;
    this.timer = null;
  }
  update({ eligible, open }: ReminderState) {
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

