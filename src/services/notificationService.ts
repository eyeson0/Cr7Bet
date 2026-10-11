export type ToastCallback = (toast: {
  id: string;
  title: string;
  message: string;
  matchId?: string;
  type: 'goal' | 'match_start' | 'info';
}) => void;

class NotificationService {
  private toastListeners: Set<ToastCallback> = new Set();

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (e) {
      console.warn('Failed to request notification permission', e);
      return 'denied';
    }
  }

  public playChime(): void {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay or permissions prevented
    }
  }

  public sendNotification(
    title: string,
    options?: {
      body?: string;
      tag?: string;
      matchId?: string;
      type?: 'goal' | 'match_start' | 'info';
      sound?: boolean;
    }
  ): boolean {
    const { body = '', tag, matchId, type = 'info', sound = true } = options || {};

    if (sound) {
      this.playChime();
    }

    // Always emit in-app toast notification
    this.emitToast({
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message: body,
      matchId,
      type,
    });

    // Check if Browser Notification API is allowed
    if (this.isSupported() && Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          body,
          tag: tag || `cr7bet-${Date.now()}`,
          badge: '/favicon.ico',
          icon: '/favicon.ico',
        });

        notif.onclick = () => {
          window.focus();
          notif.close();
        };

        return true;
      } catch (err) {
        console.warn('Browser notification invocation failed', err);
        return false;
      }
    }

    return false;
  }

  public subscribeToast(callback: ToastCallback): () => void {
    this.toastListeners.add(callback);
    return () => {
      this.toastListeners.delete(callback);
    };
  }

  private emitToast(toast: {
    id: string;
    title: string;
    message: string;
    matchId?: string;
    type: 'goal' | 'match_start' | 'info';
  }): void {
    this.toastListeners.forEach((listener) => {
      try {
        listener(toast);
      } catch (e) {
        console.error('Toast listener error', e);
      }
    });
  }

  public async sendTestNotification(): Promise<boolean> {
    if (this.getPermission() !== 'granted') {
      const res = await this.requestPermission();
      if (res !== 'granted') return false;
    }

    return this.sendNotification('CR7BET · Alerts Active ⚡', {
      body: 'Browser notification system is live! You will receive instant start times and score updates for your selected fixtures.',
      tag: 'test-notification',
      type: 'info',
    });
  }
}

export const notificationService = new NotificationService();
