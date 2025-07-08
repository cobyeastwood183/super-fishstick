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
  dsn: "", // Replace with your actual Sentry DSN
  transport: makeFetchTransport,
  stackParser: defaultStackParser,
  integrations: integrations,
  beforeSend(event) {
    console.log("client 1", event);
    return event; // Returning `null` prevents the event from being sent
  },
}

const scopeA = new Scope();
const clientA = new BrowserClient({...clientOptions, environment: "scope_a", release: "1.0.0"});

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