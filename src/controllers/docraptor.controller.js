import request from 'request';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createPdf = (req, res) => {
  const indexFile = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'index.ejs'),
    'utf8'
  );

  const templateFunction = ejs.compile(indexFile);

  const data = fs.readFileSync('test.json');
  const json = JSON.parse(data);
  const renderedHtml = templateFunction({ data: json });

  const config = {
    url: 'https://api.docraptor.com/docs',
    encoding: null, //IMPORTANT! This produces a binary body response instead of text
    headers: {
      'Content-Type': 'application/json',
    },
    json: {
      user_credentials: 'X2Z4vDRymcqRzXKYWBtu',
      doc: {
        document_content: renderedHtml,
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
    res
      .status(200)
      .send({ status: true, message: 'pdf generated successfully' });
  });
};
