import React from "react";
import { createRoot } from "react-dom/client";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import registerTelemetry from "./telemetry";
import "./utils/theme";
import { HomePage } from "./react-components/home/HomePage";
import { AuthContextProvider } from "./react-components/auth/AuthContext";
import "./react-components/styles/global.scss";
import { ThemeProvider } from "./react-components/styles/theme";
import { store } from "./utils/store-instance";

registerTelemetry("/home", "Hubs Home Page");

window.APP = { store };

function HomeRoot() {
  return (
    <WrappedIntlProvider>
      <ThemeProvider store={store}>
        <AuthContextProvider store={store}>
          <HomePage />
        </AuthContextProvider>
      </ThemeProvider>
    </WrappedIntlProvider>
  );
}

const container = document.getElementById("home-root");
const root = createRoot(container);
root.render(<HomeRoot />);

// post access info to hubs-observer
const localStorageData = localStorage.getItem("___hubs_store");
var email = JSON.parse(localStorageData).credentials.email;
if (email == "" || email == null) {
  email = "anonymous";  
} 
const req = {
 visitor: { mail: email },
 visited_from: window.location.href,
};

fetch('https://hcce-observer-955595017457.us-central1.run.app/visited', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(req)
})