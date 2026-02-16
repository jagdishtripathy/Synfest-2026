import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the formal events data
const formalEventsPath = path.join(__dirname, "src", "data", "formalEvents.js");
const fileContent = fs.readFileSync(formalEventsPath, "utf-8");

// Extract the export statement and parse it
// This is a simple regex-based extraction - works for the current file structure
const eventMatches = fileContent.matchAll(/{\s*title:\s*["']([^"']+)["']/g);

const titles = [];
for (const match of eventMatches) {
  titles.push(match[1]);
}

// Create the output file content
const outputContent = titles.join("\n");

// Write to file in root
const outputPath = path.join(__dirname, "event-titles.txt");
fs.writeFileSync(outputPath, outputContent, "utf-8");

console.log(
  `✅ Successfully extracted ${titles.length} event titles to event-titles.txt`,
);
console.log("\nTitles found:");
titles.forEach((title, index) => {
  console.log(`${title}`);
});
