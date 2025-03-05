import { Service } from "typedi";
import { Image } from "../models/Image";
import { BaseRepository } from "./BaseRepository";
import { IImageRepository } from "./Interfaces/IImageRepository";

@Service()
export class ImageRepository
  extends BaseRepository<Image>
  implements IImageRepository
{
  async createImage(urlImage: string): Promise<Image> {
    try {
      const image = await Image.create({
        imageUrl: urlImage,
      });
      return image;
    } catch (err) {
      throw err;
    }
  }

  async createImages(images: string[]): Promise<void> {
    try {
        const imageObject = images.map(item => ({ imageUrl: item }));
        await this.model.bulkBuild(imageObject);
    }catch(err) {
        throw err;
    }
  }
}
