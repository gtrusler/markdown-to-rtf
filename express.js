const express = require('express');
const TurndownService = require('turndown');
const htmlToRtf = require('html-to-rtf');

const app = express();
app.use(express.text({ type: '*/*' }));

app.post('/convert', (req, res) => {
  const markdownText = req.body;

  // Create a Turndown instance
  const turndownService = new TurndownService();

  // Convert Markdown to HTML
  const htmlText = turndownService.turndown(markdownText);

  // Convert HTML to RTF
  htmlToRtf.fromString(htmlText, (err, rtfText) => {
    if (err) {
      console.error('Error converting HTML to RTF:', err);
      res.status(500).send('Conversion failed');
      return;
    }

    // Set the response content type to RTF
    res.type('rtf');

    // Send the RTF text as the response
    res.send(rtfText);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
