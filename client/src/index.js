import React from "react";
// import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { IngredientProvider } from "./context/IngredientProvider";
import { LoadingProvider } from "./context/LoadingProvider";
import { RecipeProvider } from "./context/RecipeProvider";
import { UserProvider } from "./context/UserProvider";
import "./scss/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <UserProvider>
            <RecipeProvider>
              <IngredientProvider>
                <App />
              </IngredientProvider>
            </RecipeProvider>
          </UserProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
