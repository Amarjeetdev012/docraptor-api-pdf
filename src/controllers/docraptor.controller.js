import axios from 'axios';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createPdf = async (req, res) => {
  try {
    const indexFile = fs.readFileSync(
      path.join(__dirname, '..', 'views', 'index.ejs'),
      'utf8'
    );

    const templateFunction = ejs.compile(indexFile);

    const data = fs.readFileSync('test.json');
    const json = JSON.parse(data);
    const renderedHtml = templateFunction({ data: json });

    const config = {
      method: 'post',
      url: 'https://api.docraptor.com/docs',
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        user_credentials: 'X2Z4vDRymcqRzXKYWBtu',
        doc: {
          document_content: renderedHtml,
          type: 'pdf',
          test: true,
          callback_url:
            'https://409d-2405-201-200d-2af7-a067-60ab-97c5-5010.in.ngrok.io/callback',
        },
      },
    };

    const response = await axios(config);

    fs.writeFile(
      'doc_raptor_sample.pdf',
      response.data,
      'binary',
      function (writeErr) {
        console.log('Saved!');
      }
    );
    res.status(200).send({
      status: true,
      message: 'pdf generated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: 'pdf generation failed',
    });
  }
};

export const pdfCallback = (req, res) => {
  try {
    const { download_url, download_id } = req.body;
    console.log('download_url, download_id', download_url,'=======', download_id);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error,
    });
  }
};
