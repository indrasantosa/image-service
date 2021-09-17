import imageSize from 'image-size';
import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  BeforeInsert,
  BeforeUpdate,
  Index
} from 'typeorm';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import * as path from 'path';

@Entity()
export class Media {
  @PrimaryColumn()
  @Generated('uuid')
  id: number;

  @Column()
  originalName: string;

  @Column()
  @Index()
  name: string;

  @Column()
  mimeType: string;

  @Column()
  internalFilePath: string;

  @Column()
  size: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @BeforeInsert()
  @BeforeUpdate()
  updateDimensions() {
    const dimensions = imageSize(this.internalFilePath);

    this.height = dimensions.height;
    this.width = dimensions.width;

    const filePath = path.parse(this.originalName);
    if (!this.name) {
      this.name = `${slugify(`${nanoid(7)}-${filePath.name}`, {
        strict: true,
        lower: true
      })}${filePath.ext}`;
    }
  }

  toJSON() {
    const mimeParts = this.mimeType.split('/');
    const imageType = mimeParts[1];

    const { internalFilePath, ...rest } = this;
    return {
      ...rest,
      url: `http://localhost:3000/v1/pig/tr/%7B%7D/${this.id}.${imageType}`,
      thumbnailUrl: `http://localhost:3000/v1/pig/tr/%7B%22resize%22:%7B%22height%22:200,%22width%22:200%7D%7D/${this.id}.${imageType}`
    };
  }
}
