import { Context } from 'koa';
import { getManager } from 'typeorm';

import { Media } from '../../../entity/Media';

export default {
  /**
   * List uploaded image
   * @param ctx
   */
  index: async (ctx: Context) => {
    const mediaRepository = getManager().getRepository(Media);

    const allMedia = await mediaRepository.find();

    ctx.body = allMedia;
  },

  /**
   * Upload image into the storage
   * @param ctx
   */
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
