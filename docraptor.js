import request from 'request';
import fs from 'fs';

const data = fs.readFileSync('test.json');
const content = `<html><body>${data.toString()}</body></html>`;

const config = {
  url: 'https://api.docraptor.com/docs',
  encoding: null, //IMPORTANT! This produces a binary body response instead of text
  headers: {
    'Content-Type': 'application/json',
  },
  json: {
    user_credentials: 'X2Z4vDRymcqRzXKYWBtu',
    doc: {
      document_content: content,
      type: 'pdf',
      test: true,
      // prince_options: {
      //   media:   "screen",          // use screen styles instead of print styles
      //   baseurl: "http://hello.com" // URL to use for generating absolute URLs for assets from relative URLs
      // }
    },
  },
};

request.post(config, (err, response, body) => {
  fs.writeFile('doc_raptor_sample.pdf', body, 'binary', function (writeErr) {
    console.log('Saved!');
  });
});
