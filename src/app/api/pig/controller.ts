import { Context } from 'koa';
import { getManager } from 'typeorm';
import * as fs from 'fs';

import { Media } from '../../../entity/Media';

export default {
  index: async (ctx: Context) => {
    const { request, response } = ctx;
    const mediaRepository = getManager().getRepository(Media);
    const fileName = ctx.params.fileName;

    const foundMedia = await mediaRepository.findOne({ name: fileName });

    console.log(foundMedia);

    const src = fs.createReadStream(foundMedia.internalFilePath);
    ctx.response.set('content-type', foundMedia.mimeType);
    ctx.body = src;
  }
};
