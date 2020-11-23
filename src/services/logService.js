import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn: "https://90e5f75a467a4c3ab48122cf19b768c5@o469819.ingest.sentry.io/5528937",
    integrations: function (integrations) {
      const newIntegrations = integrations.map((integration) =>
        integration.name === "TryCatch"
          ? new Sentry.Integrations.TryCatch({
              XMLHttpRequest: false,
            })
          : integration
      );
      newIntegrations.push(new Integrations.BrowserTracing());
      return newIntegrations;
    },

    // defaultIntegrations: false,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};

const log = (error) => {
  Sentry.captureException(error);
};

export default {
  init,
  log,
};
