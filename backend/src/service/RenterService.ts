import { Inject, Service } from "typedi";
import { Renter } from "../models/Renter";
import { IRenterService } from "./Interfaces/IRenterService";
import { RenterRepository } from "../repository/RenterRepository";
import { IRenterRepository } from "../repository/Interfaces/IRenterRepository";
import { RentalRecordRepository } from "../repository/RentalRecordRepository";
import { IRentalRecordRepository } from "../repository/Interfaces/IRentalRecordRepository";
import { RoomRepository } from "../repository/RoomRepository";
import { IRoomRepository } from "../repository/Interfaces/IRoomRepository";
import { AppError } from "../errors/AppError";

@Service()
export class RenterService implements IRenterService {
  @Inject(() => RenterRepository)
  renterRepository!: IRenterRepository;

  @Inject(() => RentalRecordRepository)
  rentalRecordRepository!: IRentalRecordRepository;

  @Inject(() => RoomRepository)
  roomRepository!: IRoomRepository;

  async getAllRenter(page: number, limit: number): Promise<{rows: Renter[], count: number}> {
    try {
      return await this.renterRepository.getAllRenter(page, limit);
    } catch (err) {
      throw err;
    }
  }

  async getRenterById(id: number): Promise<Renter | null> {
    try {
      return await this.renterRepository.getRenterById(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteRenterById(id: number): Promise<void> {
    try {
      await this.renterRepository.deleteRenterById(id);
    } catch (err) {
      throw err;
    }
  }

  async getAllRenterOfRoom(roomId: number, limit: number, page: number): Promise<{ rows: Renter[]; count: number; }> {
    try {
      return await this.renterRepository.getAllRenterOfRoom(roomId, limit, page);
    }catch(err) {
      throw err;
    }
  }

  async addRenter(
    name: string,
    dateOfBirth: Date,
    address: string,
    phone: string,
    email: string,
    cccd: string,
    roomId: number | undefined,
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined
  ): Promise<Renter> {
    try {
      let existRenter: Renter | null = null;
      if(email) {
        existRenter = await this.renterRepository.getRenterByEmail(email);
      }
      let newRenter: Renter;
      if(existRenter) {
        newRenter = await this.renterRepository.updateRenterById(existRenter.renterId, {name, dateOfBirth, address, phone, cccd});
      } else {
        newRenter = await this.renterRepository.createRenter(
          name,
          dateOfBirth,
          address,
          phone,
          email,
          cccd
        );
      }
      if(roomId){
        const room = await this.roomRepository.getRoomById(roomId!);
        if(!room) {
          throw new AppError("Phòng không tồn tại", 404);
        }
        await this.rentalRecordRepository.createRentalRecord(
          checkInDate,
          checkOutDate,
          roomId,
          newRenter.renterId
        );
        if (room.roomStatus === "Phòng trống") {

          await this.roomRepository.updateRoomById(roomId.toString(), {roomStatus: "Đang cho thuê"});
        }
      }
      return newRenter;
    } catch (err) {
      throw err;
    }
  }
  
  async updateRenterById(id: number, newData: any): Promise<Renter> {
    try {
      return await this.renterRepository.updateRenterById(id, newData);
    } catch (err) {
      throw err;
    }
  }
}
