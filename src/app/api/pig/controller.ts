import { Context } from 'koa';
import { getManager } from 'typeorm';
import * as fs from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';

import { Media } from '../../../entity/Media';
import axios from 'axios';
import {
  createTransformPipeline,
  getValidImageExt
} from '../../../lib/transformer';

export default {
  transform: async (ctx: Context) => {
    const { transformString, fileName } = ctx.params;
    const filePath = path.parse(fileName);
    const requestedExtension = filePath.ext.slice(1, filePath.ext.length);
    const imageOutputType = getValidImageExt(requestedExtension);

    // Get media from storage
    const mediaRepository = getManager().getRepository(Media);
    const foundMedia = await mediaRepository.findOne(filePath.name);
    const mediaStream = fs.createReadStream(foundMedia.internalFilePath);

    const tranformPipeline = createTransformPipeline(
      JSON.parse(transformString),
      imageOutputType
    );

    // Response with transformed image
    ctx.response.set('content-type', `image/${imageOutputType}`);
    ctx.body = mediaStream.pipe(tranformPipeline);
  },
  remote: async (ctx: Context) => {
    const { sourceFile, transformString, fileName } = ctx.params;
    const filePath = path.parse(fileName);
    const requestedExtension = filePath.ext.slice(1, filePath.ext.length);
    const imageOutputType = getValidImageExt(requestedExtension);

    // Get media from remote url
    const image = await axios({
      method: 'GET',
      url: sourceFile,
      responseType: 'stream'
    });

    const tranformPipeline = createTransformPipeline(
      JSON.parse(transformString),
      imageOutputType
    );

    // Response with transformed image
    ctx.response.set('content-type', `image/${imageOutputType}`);
    ctx.body = image.data.pipe(tranformPipeline);
  },
  upload: async (ctx: Context) => {
    const { request } = ctx;
    const { sourceFile, transformString, fileName } = ctx.params;
    const filePath = path.parse(fileName);
    const requestedExtension = filePath.ext.slice(1, filePath.ext.length);
    const imageOutputType = getValidImageExt(requestedExtension);

    const uploadedImage = request.file;

    const mediaStream = fs.createReadStream(uploadedImage.path);

    const tranformPipeline = createTransformPipeline(
      JSON.parse(transformString),
      imageOutputType
    );

    // Response with transformed image
    ctx.response.set('content-type', `image/${imageOutputType}`);
    ctx.body = mediaStream.pipe(tranformPipeline);
  }
};
