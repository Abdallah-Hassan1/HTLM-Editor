// Function for show output of the console function
function consoleViewer() {
  let htmlCode = `<mainHTML>${document.getElementById("htmlCode").value}</mainHTML>
  <console-output></console-output>`;

  let cssCode = "console-output { width: 100%; } mainHTML { display: none; }";

  let text = `${htmlCode}
  <style>${cssCode}</style>
  <script>
  console.log = function (...args) {
    //originalConsoleLog.apply(console, args);
    const message = document.createElement("div");

    const ouputMessage = args
      .map((arg) => {
        if (typeof arg === "object" && arg != null) return JSON.stringify(arg);
        return String(arg);
      })
      .join(" ");

    message.textContent = ouputMessage;
    document.querySelector("console-output").appendChild(message);
  };
  ${document.getElementById("javascriptCode").value}
  </script>`;

  let consoleIframe = document.querySelector("#console-viewer");
  consoleIframe.remove();
  consoleIframe = document.createElement("iframe");
  consoleIframe.setAttribute("id", "console-viewer");
  document
    .querySelector(".console-iframe-container")
    .appendChild(consoleIframe);

  consoleIframe.contentWindow.document.open();
  consoleIframe.contentWindow.document.write(text);
  consoleIframe.contentWindow.document.close();
}

//Function for live Rendering
function update() {
  let htmlCode = document.getElementById("htmlCode").value;
  let cssCode = document.getElementById("cssCode").value;
  let javascriptCode = document.getElementById("javascriptCode").value;
  let text = `<html>
    <body>
      ${htmlCode}
      <style>${cssCode}</style>
      <script>${javascriptCode}</script>
    </body>
  </html>`;

  let iframe = document.getElementById("viewer");
  iframe.remove();
  iframe = document.createElement("iframe");
  iframe.setAttribute("id", "viewer");
  document.querySelector(".iframe-container").appendChild(iframe);

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(text);
  iframe.contentWindow.document.close();
  consoleViewer();
}
