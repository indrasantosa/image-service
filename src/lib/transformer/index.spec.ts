import sharp = require('sharp');
import {
  applyOutputTranformation,
  createTransformPipeline,
  getValidImageExt,
  ImageOutputType
} from '.';

describe('createTransformPipeline', () => {
  test('should return Sharp tranform instance when called', async () => {
    expect(createTransformPipeline({}, ImageOutputType.JPEG)).toBeInstanceOf(
      sharp
    );
  });

  test('should add resize transformation when resize object present on transformation option', async () => {
    const transformerObject = createTransformPipeline(
      { resize: { width: 100, height: 100 } },
      ImageOutputType.JPEG
    ) as any;
    expect(transformerObject.options.width).toBe(100);
    expect(transformerObject.options.width).toBe(100);
  });
});

describe('getValidImageExt', () => {
  test('Should return valid image ext when a supported extension is passed', () => {
    expect(getValidImageExt('png')).toBe('png');
    expect(getValidImageExt('jpeg')).toBe('jpeg');
    expect(getValidImageExt('jpg')).toBe('jpeg');
    expect(getValidImageExt('webp')).toBe('webp');
    expect(getValidImageExt('PNG')).toBe('png');
    expect(getValidImageExt('WEBP')).toBe('webp');
    expect(getValidImageExt('JPG')).toBe('jpeg');
    expect(getValidImageExt('JPEG')).toBe('jpeg');
  });
  test('Should return jpg if unsupported extension is passed', () => {
    expect(getValidImageExt('tiff')).toBe('jpeg');
    expect(getValidImageExt('gif')).toBe('jpeg');
    expect(getValidImageExt('')).toBe('jpeg');
    expect(getValidImageExt(undefined)).toBe('jpeg');
  });
});

describe('applyOutputTranformation', () => {
  test('should call intended tranformator when supported image output type is specified', () => {
    const mockSharp = {
      jpeg: jest.fn(),
      png: jest.fn(),
      webp: jest.fn()
    } as any;
    applyOutputTranformation(mockSharp as sharp.Sharp, ImageOutputType.JPEG);
    expect(mockSharp.jpeg.mock.calls.length).toBe(1);

    applyOutputTranformation(mockSharp as sharp.Sharp, ImageOutputType.PNG);
    expect(mockSharp.png.mock.calls.length).toBe(1);

    applyOutputTranformation(mockSharp as sharp.Sharp, ImageOutputType.WEBP);
    expect(mockSharp.webp.mock.calls.length).toBe(1);
  });

  test('should default to jpeg when it an output type is not specified', () => {
    const mockSharp = {
      jpeg: jest.fn(),
      png: jest.fn(),
      webp: jest.fn()
    } as any;
    applyOutputTranformation(mockSharp as sharp.Sharp);
    expect(mockSharp.jpeg.mock.calls.length).toBe(1);
  });
});
