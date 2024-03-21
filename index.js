const fs = require('fs');
const TurndownService = require('turndown');
const htmlToRtf = require('html-to-rtf');

// Read the Markdown text from a file
const markdownText = fs.readFileSync('input.md', 'utf8');

// Create a Turndown instance
const turndownService = new TurndownService();

// Convert Markdown to HTML
const htmlText = turndownService.turndown(markdownText);

// Convert HTML to RTF
htmlToRtf.fromString(htmlText, (err, rtfText) => {
  if (err) {
    console.error('Error converting HTML to RTF:', err);
    return;
  }

  // Write the RTF text to a file
  fs.writeFileSync('output.rtf', rtfText);
  console.log('Conversion complete. RTF file saved as output.rtf');
});
