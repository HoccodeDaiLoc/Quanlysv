import { RoomImage } from "../../models/RoomImage";
import { BaseInterface } from "./BaseInterface";

export interface IRoomImageRepository extends BaseInterface {
    createRoomImage(roomId: number, imageId: number): Promise<RoomImage>;
}
