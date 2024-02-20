const WebSocket = require("ws");
const chokidar = require("chokidar");
const os = require("os");
const path = require("path");

// Dynamically get the current user's home directory
const homeDirectory = os.homedir();

console.log("homeDirectory", homeDirectory);

// Define the base path relative to the user's home directory
const basePath = path.join(
  homeDirectory,
  "Documents/development/salesforce_lightning/FriendShips/force-app/"
);

// Define the patterns you want to watch within that directory
const patternsToWatch = ["**/*.html", "**/*.js", "**/*.css", "**/*.cls"].map(
  (pattern) => path.join(basePath, pattern)
); // Prepend the base path to each pattern

const wss = new WebSocket.Server({ port: 9995 });
const hostUrl =
  "https://empathetic-impala-er293r-dev-ed.trailblaze.lightning.force.com";

const watcher = chokidar.watch(patternsToWatch, {
  persistent: true,
});

let debounceTimer;
// Event listener for file changes
watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);

  // Clear the previous timer if it exists
  if (debounceTimer) {
    console.log("clear timeout");
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    // Send a message to all connected clients after the 2-second delay
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("refresh message send");
        const message = JSON.stringify({
          command: "refresh",
          host: hostUrl,
        });
        client.send(message);
      }
    });
  }, 2000);
});

wss.on("connection", function connection(ws) {
  console.log("A client connected");

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    // Send a message back to the same client
    ws.send("Hello, client. Your message was received!");
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Send a message to all connected clients every 7 seconds
// setInterval(() => {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       // console.log("client object", JSON.stringify(client));
//       client.send("refresh");
//     }
//   });
// }, 7000); // 7000 milliseconds = 7 seconds

console.log("WebSocket server started on ws://localhost:9995");
