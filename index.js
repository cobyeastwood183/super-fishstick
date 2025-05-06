import * as Sentry from "@sentry/browser";
import {
    BrowserClient,
    defaultStackParser,
    getDefaultIntegrations,
    makeFetchTransport,
    Scope,
  } from "@sentry/browser";
  // filter integrations that use the global variable
  const integrations = getDefaultIntegrations({}).filter(
    (defaultIntegration) => {
      return !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(
        defaultIntegration.name,
      );
    },
  );

// Initialize Sentry
const clientOptions = {
  dsn: "https://3a8a5071ca1eed15eb44e85588c11838@o4508337845829632.ingest.us.sentry.io/4509277770809344", // Replace with your actual Sentry DSN
  transport: makeFetchTransport,
  stackParser: defaultStackParser,
  integrations: integrations,
  beforeSend(event) {
    console.log("client 1", event);
    return event; // Returning `null` prevents the event from being sent
  },
}

const scopeA = new Scope();
const clientA = new BrowserClient({...clientOptions, environment: "scope_a"});

scopeA.setClient(clientA);
clientA.init();

scopeA.captureException(new Error("example"));

export function testError() {
    scopeA.setTag("scopeA", "test scope A value");
    scopeA.captureMessage("testing");
    try {
        throw new Error("testing_2");
    } catch (error) {
       scopeA.captureException(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
}); 