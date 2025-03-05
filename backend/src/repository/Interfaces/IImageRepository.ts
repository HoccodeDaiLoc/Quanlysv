import { Image } from "../../models/Image";
import { BaseInterface } from "./BaseInterface";

export interface IImageRepository extends BaseInterface{
    createImage(urlImage: string): Promise<Image>;
    createImages(images: string[]): Promise<void>;
}