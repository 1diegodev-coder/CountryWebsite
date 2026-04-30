import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
  beforeSend(event) {
    // Sanitization: remove sensitive data from error reports
    if (event.request && event.request.data) {
      delete event.request.data;
    }
    if (event.extra) {
      delete event.extra.profile;
      delete event.extra.answers;
      delete event.extra.token;
      delete event.extra.sessionToken;
    }
    return event;
  },
});
