# WebSocket File Watcher and Refresher

This project integrates WebSocket communication with file watching capabilities to automatically refresh browser tabs based on specific file changes. It uses `chokidar` npm package for efficient file watching and `ws` for WebSocket communication, allowing developers to see their changes reflected in real-time without manual browser refreshes. This tool is particularly useful for web development workflows, especially when working with Salesforce Lightning Web Components (LWC) or similar technologies.
I have created [Chrome Browser Extension](https://github.com/anujsingla/WebSocketFileTrackerChromeExtension) that receive message from the server websocket and refresh the tab as per hostname.

## Features

- Real-time file watching for `.html`, `.js`, `.css`, and `.cls` files or you can add more file extensions.
- WebSocket server to broadcast refresh commands to connected clients.
- Debounce mechanism to minimize unnecessary refreshes.
- Easy configuration through a `config.json` file for project directory, host URL or file extension settings.

## Setup

**Prerequisites:**

- Node.js and npm ([https://nodejs.org/](https://nodejs.org/))

**Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/anujsingla/WebSocketFileTracker
   cd WebSocketFileTracker
   ```
2. **Install Dependencies**  
   Ensure you have Node.js installed on your system, then run:

   ```bash
   npm install
   ```

3. **Configuration**  
   Edit the `config.json` file in the root directory to specify your project directory, host URL and file extension:  
   **Note: This is just an example, you can change as per your requirement.**
   ```json
   {
     "projectDir": "Documents/development/salesforce_lightning/FriendShips/force-app/",
     "hostUrl": "https://www.npmjs.com",
     "fileExtensions": ["**/*.html", "**/*.js", "**/*.css", "**/*.cls"]
   }
   ```

## Usage

To effectively use this WebSocket File Watcher and Refresher in your development workflow, follow these steps:

### Starting the WebSocket Server

1. Navigate to your project directory in the terminal.
2. Execute the command to start the WebSocket server:
   ```bash
   npm run start
   ```

### Connecting the Browser Extension

I have created browser chrome extension to work with this server to receive the message and refresh the browser. Make sure you have installed the browser extension in your chrome browser. The server will connect on here: `ws://localhost:9995`.

### Making File Changes

Any changes made to `.html`, `.js`, `.css`, or `.cls` files within the specified project directory will be detected by the server. After a 2-second debounce period, a refresh command will be send to browser extension client to refresh the browser tab as per config hostname.

### Configuring for Your Project

Edit the `config.json` file to specify the path to your project directory, host URL and file extensions that clients should refresh.
