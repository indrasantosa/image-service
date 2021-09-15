import imageSize from 'image-size';
import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  Timestamp,
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
    console.log(this);
    return {
      ...this,
      url: `http://localhost:3000/v1/pig/${this.name}`,
      thumbnailUrl: `http://localhost:3000/v1/pig/tr:thumbnail/${this.name}`
    };
  }
}
