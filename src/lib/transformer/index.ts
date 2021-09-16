import sharp = require('sharp');

export interface TransformationOptions {
  resize?: {
    width?: number;
    height?: number;
    options?: sharp.ResizeOptions;
  };
}

export enum ImageOutputType {
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp'
}

export function applyOutputTranformation(
  transformObject: sharp.Sharp,
  outputFormat: ImageOutputType = ImageOutputType.JPEG
) {
  switch (outputFormat) {
    case ImageOutputType.JPEG:
      transformObject.jpeg({ quality: 100 });
      break;
    case ImageOutputType.PNG:
      transformObject.png();
      break;
    case ImageOutputType.WEBP:
      transformObject.webp({ lossless: true });
      break;
  }
}

/**
 *
 * @param transformationObject transformation pipeline object
 */
export function createTransformPipeline(
  transformationObject: TransformationOptions,
  output: ImageOutputType
) {
  const pipeline = sharp();
  if (transformationObject.resize) {
    pipeline.resize(
      transformationObject.resize.width,
      transformationObject.resize.height,
      transformationObject.resize.options
    );
  }

  applyOutputTranformation(pipeline, output);

  return pipeline;
}

export function getValidImageExt(fileExt: string) {
  const validExt = [
    ImageOutputType.JPEG,
    ImageOutputType.PNG,
    ImageOutputType.WEBP
  ];
  return validExt.indexOf(fileExt as ImageOutputType) > -1
    ? (fileExt as ImageOutputType)
    : ImageOutputType.JPEG;
}
