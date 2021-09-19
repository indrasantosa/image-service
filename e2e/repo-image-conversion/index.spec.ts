import * as request from 'supertest';
import * as fs from 'fs';
import * as looksSame from 'looks-same';

const API_URL = 'http://localhost:3000';

let imageId: string;

describe('/v1/files/upload', () => {
  test('It should successfully upload an image', async () => {
    const response = await request(API_URL)
      .post('/v1/files/upload')
      .attach('file', `${__dirname}/doge_sample.jpg`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    imageId = response.body.id;
  });
});

describe('/v1/tr/:transformString/:fileName', () => {
  test('It should able to request a different format of image with query string', async () => {
    const response = await request(API_URL).get(
      `/v1/pig/tr/%7B%7D/${imageId}.png`
    );
    expect(response.status).toBe(200);

    const refImage = fs.readFileSync(`${__dirname}/doge_sample_converted.png`);

    looksSame(response.body, refImage, (error, { equal }) => {
      expect(equal).toBe(true);
    });
  });

  test('It should able to do image resizing based on passed tranformation object', async () => {
    const response = await request(API_URL).get(
      `/v1/pig/tr/%7B%22resize%22:%7B%22height%22:200,%22width%22:200%7D%7D/${imageId}.jpeg`
    );
    expect(response.status).toBe(200);

    const refImage = fs.readFileSync(`${__dirname}/doge_sample_resized.jpeg`);

    looksSame(response.body, refImage, (error, { equal }) => {
      expect(equal).toBe(true);
    });
  });

  test('It should able to do both transform and convert at the same time', async () => {
    const response = await request(API_URL).get(
      `/v1/pig/tr/%7B%22resize%22:%7B%22height%22:200,%22width%22:200%7D%7D/${imageId}.png`
    );
    expect(response.status).toBe(200);

    const refImage = fs.readFileSync(
      `${__dirname}/doge_sample_converted_resized.png`
    );

    looksSame(response.body, refImage, (error, { equal }) => {
      expect(equal).toBe(true);
    });
  });
});
