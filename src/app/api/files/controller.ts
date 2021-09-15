import { Context } from 'koa';
import { getManager } from 'typeorm';
import imageSize from 'image-size';

import { Media } from '../../../entity/Media';

export default {
  index: async (ctx: Context) => {
    const mediaRepository = getManager().getRepository(Media);

    const allMedia = await mediaRepository.find();

    ctx.body = allMedia;
  },
  upload: async (ctx: Context) => {
    const { request } = ctx;
    const mediaRepository = getManager().getRepository(Media);

    const uploadedImage = request.file;

    const media = new Media();
    media.originalName = uploadedImage.originalname;
    media.mimeType = uploadedImage.mimetype;
    media.internalFilePath = uploadedImage.path;
    media.size = uploadedImage.size;

    await mediaRepository.save(media);

    ctx.body = media;
  }
};
