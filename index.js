// Function for show output of the console function
function consoleViewer() {
  let htmlCode = `<mainHTML>${document.getElementById("htmlCode").value}</mainHTML>
  <console-output></console-output>`;

  let cssCode = "console-output { width: 100%; } mainHTML { display: none; }";

  let text = `<!docType html>
  <html>
    <head><style>${cssCode}</style></head>
    ${htmlCode}
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
    </script>
  </html>`;

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
  let text = `<!doctype html>
  <html>
    <head><style>${cssCode}</style></head>
    <body>
      ${htmlCode}
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

function downloadFile(filename) {
  let content = `<!doctype html>
  <html>
    <head>
      <title>Real-Time Editor</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        ${document.getElementById("cssCode").value}
      </style>
    </head>
    <body>
      ${document.getElementById("htmlCode").value}
      <script>
        ${document.getElementById("javascriptCode").value}
      </script>
    </body>
  </html>`;

  // HTML يحتوي على كود ال  Bolb إنشاء
  const blob = new Blob([content], { type: "text/html" });

  // Blob موقت لهذا ال  URL إنشاء رابط
  const url = URL.createObjectURL(blob);

  // مخفي لتنفيذ التحميل <a> إنشاء عنصر
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // اسم الملف عند التحميل

  document.body.appendChild(a); // إضافة العنصر
  a.click(); // الضغط عليه
  document.body.removeChild(a); // حذف العنصر

  // تنظيف الذاكرة بحذف الرابط المؤقت
  URL.revokeObjectURL(url);
}
