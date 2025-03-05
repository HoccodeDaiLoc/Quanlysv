import { Service } from "typedi";
import { RoomImage } from "../models/RoomImage";
import { BaseRepository } from "./BaseRepository";
import { IRoomImageRepository } from "./Interfaces/IRoomImageRepository";

@Service()
export class RoomImageRepository extends BaseRepository<RoomImage> implements IRoomImageRepository {
    async createRoomImage(roomId: number, imageId: number): Promise<RoomImage> {
        try {
            const roomImage = await RoomImage.create({
                roomId: roomId,
                imageId: imageId
            });
            return roomImage;
        }catch (err) {
            throw err;
        }
    }
}