// Patch window.fetch and Window.prototype.fetch to ensure it is writable and has both a getter & setter.
// This prevents "Uncaught TypeError: Cannot set property fetch of #<Window> which has only a getter"
// in Chromium / sandboxed iframe environments when tools or libraries attempt to wrap or polyfill fetch.

(function ensureFetchIsWritable() {
  if (typeof window === 'undefined') return;

  try {
    const rawFetch = window.fetch;
    if (typeof rawFetch === 'function') {
      let fetchStorage = function (this: any, ...args: any[]) {
        return rawFetch.apply(this || window, args);
      };

      const descriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
          return fetchStorage;
        },
        set(val: any) {
          fetchStorage = val;
        },
      };

      // Define on window instance
      try {
        Object.defineProperty(window, 'fetch', descriptor);
      } catch (_) {}

      // Define on Window.prototype if accessible
      try {
        if ((window as any).Window && (window as any).Window.prototype) {
          Object.defineProperty((window as any).Window.prototype, 'fetch', descriptor);
        }
      } catch (_) {}

      // Define on globalThis if distinct
      try {
        if (typeof globalThis !== 'undefined' && globalThis !== window) {
          Object.defineProperty(globalThis, 'fetch', descriptor);
        }
      } catch (_) {}
    }
  } catch (err) {
    // Graceful no-op
  }
})();
