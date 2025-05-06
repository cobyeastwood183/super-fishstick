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
  debug: true,
}

const scopeA = new Scope();
const clientA = new BrowserClient({...clientOptions, environment: "scope_a"});

scopeA.setClient(clientA);
clientA.init();

scopeA.captureException(new Error("example"));

export function testError() {
    Sentry.withScope(scopeA, () => {   
        scopeA.setTag("scopeA", "test scope A value");
        scopeA.captureMessage("test scope A message");
        try {
            throw new Error("This is a test error!");
        } catch (error) {
            Sentry.captureException(error);
        }
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');
    
    // Add a click event to the h1 element
    const heading = document.querySelector('h1');
    heading.addEventListener('click', () => {
        alert('You clicked the heading!');
    });

    // Add a click event to the p element
    const paragraph = document.querySelector('p');
    paragraph.addEventListener('click', () => {
        alert('You clicked the paragraph!');
    });
}); 