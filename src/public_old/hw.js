import GCSDK from "/dist/index.js";

async function postHandshake(output, response) {
  if (!response?.sdkToken) {
    output.push("NO TOKEN, failed handshake");
  } else {
    output.push("ok, run HELLO WORLD");

    const hwResponse = await GCSDK.helloWorld();
    output.push(`hello world response: ${JSON.stringify(hwResponse, null, 2)}`);
  }
}

// good data (happy path)
document.getElementById("start-btn").addEventListener("click", async () => {
  let output = [];

  const response = await GCSDK.init(
    "testpublicid",
    // "https://auth.greencheck.world"
    "https://greencheck-secure.local"
  );

  output.push(`init response: ${JSON.stringify(response, null, 2)}`);

  await postHandshake(output, response);

  document.getElementById("output").value = output.join("\n\n");
});

// bad client ID
document.getElementById("start-btn2").addEventListener("click", async () => {
  let output = [];

  const response = await GCSDK.init("bad-id", "https://greencheck-secure.local");

  output.push(`init response: ${JSON.stringify(response, null, 2)}`);

  await postHandshake(output, response);

  document.getElementById("output").value = output.join("\n\n");
});

// bad server domain
document.getElementById("start-btn3").addEventListener("click", async () => {
  let output = [];

  const response = await GCSDK.init("bad-id", "https://not-a-site.local");

  output.push(`init response: ${JSON.stringify(response, null, 2)}`);

  await postHandshake(output, response);

  document.getElementById("output").value = output.join("\n\n");
});

document.getElementById("pkce-test").addEventListener("click", async () => {
  let output = [];

  const testPkceToken = await GCSDK.getTestPkceToken();

  output.push(`test token: ${testPkceToken}`);

  if (testPkceToken) {
    const exchangeResponse = await GCSDK.handleTestPkceToken(testPkceToken);

    output.push(`test exchange response: ${JSON.stringify(exchangeResponse)}`);
  } else {
    output.push("no testPkceToken to process");
  }

  document.getElementById("output").value = output.join("\n\n");
});
