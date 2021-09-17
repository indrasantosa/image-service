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

/**
 * Apply output transformation to the existing transoformation object based on
 * output format param
 * @param {sharp.Sharp} transformObject existing transformation object
 * @param {ImageOutputType} outputFormat intended output format
 */
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
 * Create transformation pipe from parameterised tranformation object and output
 * @param {TransformationOptions} transformationObject transformation pipeline object
 * @param {ImageOutputType} output intended output format
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

/**
 * Get a valid image extension that supported by the system. Return jpeg if
 * image format is not supported
 * @param {string} fileExt - intended image format
 * @returns {ImageOutputType}
 */
export function getValidImageExt(fileExt: string = '') {
  const validExt = [
    ImageOutputType.JPEG,
    ImageOutputType.PNG,
    ImageOutputType.WEBP
  ];
  const normalizedExt = fileExt.toLowerCase();
  return validExt.indexOf(normalizedExt as ImageOutputType) > -1
    ? (normalizedExt as ImageOutputType)
    : ImageOutputType.JPEG;
}
