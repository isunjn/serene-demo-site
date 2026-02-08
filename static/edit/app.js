// Blog editor SPA — static/edit/app.js

import { initAuth, getToken, setToken } from "./auth.js";

async function init() {
  const app = document.getElementById("app");
  app.textContent = "";

  const token = await initAuth();

  if (!token) {
    showLogin(app);
    return;
  }

  showEditor(app);
}

function showLogin(app) {
  const form = document.createElement("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const token = form.querySelector("input[type=password]").value.trim();
    if (token) {
      setToken(token);
      init();
    }
  });

  // Hidden username field for password manager matching
  const user = document.createElement("input");
  user.type = "text";
  user.autocomplete = "username";
  user.value = "editor";
  user.style.display = "none";
  form.appendChild(user);

  const input = document.createElement("input");
  input.type = "password";
  input.autocomplete = "current-password";
  input.placeholder = "GitHub PAT";
  input.required = true;
  form.appendChild(input);

  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Go";
  form.appendChild(btn);

  app.appendChild(form);
}

function showEditor(app) {
  const heading = document.createElement("h1");
  heading.textContent = "Blog Editor";
  app.appendChild(heading);

  const content = document.createElement("div");
  content.id = "editor-content";
  content.textContent = "Loading posts…";
  app.appendChild(content);
}

init();
