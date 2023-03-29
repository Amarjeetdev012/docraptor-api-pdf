import axios from 'axios';
import fs from 'fs';

const data = fs.readFileSync('test.json');
const document_content = `
  <h2>Custom Fonts</h2>
  <p>Hi, my name is Arial.</p>
  <p class='custom-font'>${data};</p>

  <style>
    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 300;
      src: local('Open Sans Light'), local('OpenSans-Light'), url(http://themes.googleusercontent.com/static/fonts/opensans/v8/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff) format('woff');
    }
    p {
      font-family: Arial, Helvetica, sans-serif;
    }
    p.custom-font {
      font-family: 'Open Sans', sans-serif;
    }
  </style>
`;

const config = {
  url: 'https://api.docraptor.com/docs',
  method: 'post',
  responseType: 'arraybuffer', //IMPORTANT! Required to fetch the binary PDF
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    user_credentials: 'YOUR_API_KEY_HERE', // this key works in test mode!
    doc: {
      test: true, // test documents are free but watermarked
      document_type: 'pdf',
      document_content: document_content,
      //   document_url: "https://docraptor.com/examples/invoice.html",
      //   javascript: true,
      //   prince_options: {
      //     media: "print", // @media 'screen' or 'print' CSS
      //     baseurl: "https://yoursite.com", // the base URL for any relative URLs
      //     }
    },
  },
};

axios(config)
  .then(function (response) {
    fs.writeFile(
      'custom-fonts.pdf',
      response.data,
      'binary',
      function (writeErr) {
        if (writeErr) throw writeErr;
        console.log('Saved custom-fonts.pdf!');
      }
    );
  })
  .catch(function (error) {
    // DocRaptor error messages are contained in the response body
    // Since the response is binary encoded, let's decode
    var decoder = new TextDecoder('utf-8');
    console.log(decoder.decode(error.response.data));
  });
