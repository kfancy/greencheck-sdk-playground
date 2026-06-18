import GCSDK from "/dist/index.js";

let progress = [];

function hideSteps() {
  Array.from(document.getElementsByClassName("demo-step")).forEach((el) => {
    el.style.display = "none";
  });
}

function reset() {
  const demoAppTree = document.getElementById("full-demo-app");
  demoAppTree.replaceWith(demoAppTree.cloneNode(true));
}

function showProgress() {
  document.getElementById("progress").innerHTML = progress.join("\n");
}

function updateOutput(rootEl, output) {
  rootEl.querySelector(".outputInfo").innerHTML = output.join("\n\n");
}

function init() {
  reset();
  hideSteps();
  const output = [];
  progress = ["waiting for handshake..."];
  showProgress();

  document.getElementById("app-auth-state").innerHTML = "";
  const rootEl = document.getElementById("start-container");
  rootEl.style.display = "block";
  const startButton = document.getElementById("start-btn");

  const initHandler = async () => {
    // alert("Vanilla JS loaded from local source 🎉");

    const response = await GCSDK.init(
      "testpublicid", // << good id (testing only)
      // "bad-id",
      "https://auth.greencheck.world"
      // "https://greencheck-secure.local"
    );
    output.push(`init response: ${JSON.stringify(response, null, 2)}`);

    if (!response?.sdkToken) {
      output.push("NO TOKEN, failed handshake");
      updateOutput(rootEl, output);
      // rootEl.querySelector(".outputInfo").innerHTML = output.join("\n\n");
      return;
    }

    progress.push(`Handshake complete`);
    progress.push(`token: ${response.sdkToken}`);
    showProgress();

    choosePlatform();

    startButton.removeEventListener("click", initHandler);
  };

  startButton.addEventListener("click", initHandler);
}

function choosePlatform() {
  hideSteps();

  const rootEl = document.getElementById("choose-platform");
  rootEl.style.display = "block";

  rootEl.querySelector("button.start-over").addEventListener("click", init);
  rootEl.querySelector("button.claim-phone").addEventListener("click", startPhone);
  rootEl.querySelector("button.claim-email").addEventListener("click", startEmail);
}

function startPhone() {
  hideSteps();

  const rootEl = document.getElementById("phone-container");
  rootEl.style.display = "block";

  rootEl.querySelector("button.start-over").addEventListener("click", init);

  updateOutput(rootEl, ["idle, waiting for phone input"]);

  rootEl.querySelector("button.send-2fa").addEventListener("click", async () => {
    const output = [];
    const phoneInput = rootEl.querySelector('input[name="phone"]');
    if (!phoneInput) {
      output.push("no phone input element");
      updateOutput(rootEl, output);
      return;
    }

    const phone = phoneInput.value;
    if (!phone) {
      output.push("no phone value found");
      updateOutput(rootEl, output);
      return;
    }

    try {
      const response = await GCSDK.startPhoneClaim(phone);
      if (response) {
        progress.push(`Phone is valid and 2FA code sent,`, `check your phone for 2FA code`);
        showProgress();
        validatePhone();
      } else {
        output.push("failed to start phone claim");
        updateOutput(rootEl, output);
      }
    } catch (e) {
      output.push("failed to start phone claim");
      output.push(e.toString());
      updateOutput(rootEl, output);
    }
  });
}

function validatePhone() {
  hideSteps();

  const rootEl = document.getElementById("validate-phone-2fa-container");
  rootEl.style.display = "block";

  rootEl.querySelector("button.start-over").addEventListener("click", init);

  updateOutput(rootEl, ["idle, waiting for 2fa token input"]);

  rootEl.querySelector("button.validate-2fa").addEventListener("click", async () => {
    const output = [];
    const _2faInput = rootEl.querySelector('input[name="phone_2fa"]');
    if (!_2faInput) {
      output.push("no 2fa input element");
      updateOutput(rootEl, output);
      return;
    }

    const _2fa = _2faInput.value;
    if (!_2fa) {
      output.push("no _2fa value found");
      updateOutput(rootEl, output);
      return;
    }

    try {
      const response = await GCSDK.validatePhoneClaim(_2fa);
      if (response) {
        progress.push(
          `2FA code validated,`,
          `and PKCE token securely exchanged`,
          `for GreenCheck ID profile`
        );
        showProgress();

        output.push("successful validation!");
        output.push(JSON.stringify(response));

        updateOutput(rootEl, output);
        rootEl.querySelector("button.validate-2fa").style.display = "none";
      } else {
        output.push("failed to validate phone 2fa");
        updateOutput(rootEl, output);
      }
    } catch (e) {
      output.push("failed to validate phone claim");
      output.push(e.toString());
      updateOutput(rootEl, output);
    }
  });
}

function startEmail() {
  hideSteps();

  const rootEl = document.getElementById("email-container");
  rootEl.style.display = "block";

  rootEl.querySelector("button.start-over").addEventListener("click", init);

  updateOutput(rootEl, ["idle, waiting for email input"]);

  rootEl.querySelector("button.send-2fa").addEventListener("click", async () => {
    const output = [];
    const emailInput = rootEl.querySelector('input[name="email"]');
    if (!emailInput) {
      output.push("no email input element");
      updateOutput(rootEl, output);
      return;
    }

    const email = emailInput.value;
    if (!email) {
      output.push("no email value found");
      updateOutput(rootEl, output);
      return;
    }

    try {
      const response = await GCSDK.startEmailClaim(email);
      if (response) {
        progress.push(`Email is valid and 2FA code sent,`, `check your email for 2FA code`);
        showProgress();
        validateEmail();
      } else {
        output.push("failed to start email claim");
        updateOutput(rootEl, output);
      }
    } catch (e) {
      output.push("failed to start email claim");
      output.push(e.toString());
      updateOutput(rootEl, output);
    }
  });
}

function validateEmail() {
  hideSteps();

  const rootEl = document.getElementById("validate-email-2fa-container");
  rootEl.style.display = "block";

  rootEl.querySelector("button.start-over").addEventListener("click", init);

  updateOutput(rootEl, ["idle, waiting for 2fa token input"]);

  rootEl.querySelector("button.validate-2fa").addEventListener("click", async () => {
    const output = [];
    const _2faInput = rootEl.querySelector('input[name="email_2fa"]');
    if (!_2faInput) {
      output.push("no 2fa input element");
      updateOutput(rootEl, output);
      return;
    }

    const _2fa = _2faInput.value;
    if (!_2fa) {
      output.push("no _2fa value found");
      updateOutput(rootEl, output);
      return;
    }

    try {
      const response = await GCSDK.validateEmailClaim(_2fa);
      if (response) {
        progress.push(
          `2FA code validated,`,
          `and PKCE token securely exchanged`,
          `for GreenCheck ID profile`
        );
        showProgress();

        output.push("successful validation!");
        output.push(JSON.stringify(response));

        updateOutput(rootEl, output);
        rootEl.querySelector("button.validate-2fa").style.display = "none";
      } else {
        output.push("failed to validate email 2fa");
        updateOutput(rootEl, output);
      }
    } catch (e) {
      output.push("failed to validate email claim");
      output.push(e.toString());
      updateOutput(rootEl, output);
    }
  });
}

init();
