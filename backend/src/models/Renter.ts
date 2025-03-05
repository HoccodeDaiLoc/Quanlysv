import { Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import { RentalRecord } from "./RentalRecord";
import { Contract } from "./Contract";
import { Account } from "./Account";

@Table({
    tableName: Renter.RENTER_TABLE_NAME
})
export class Renter extends Model {
    private static RENTER_TABLE_NAME = "renters" as string;
    private static RENTER_ID = "renter_id" as string;
    private static RENTER_NAME = "name" as string;
    private static RENTER_DATE_OF_BIRTH = "date_of_birth" as string;
    private static RENTER_ADDRESS = "address" as string;
    private static RENTER_PHONE = "phone" as string;
    private static RENTER_EMAIL = "email" as string;
    private static RENTER_CCCD = "cccd" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        field: Renter.RENTER_ID,
        autoIncrement: true
    })
    renterId!: number;

    @Column({
        type: DataType.TEXT,
        field: Renter.RENTER_NAME
    })
    name!: string;

    @Column({
        type: DataType.DATE,
        field: Renter.RENTER_DATE_OF_BIRTH
    })
    dateOfBirth!: Date;

    @Column({
        type: DataType.TEXT,
        field: Renter.RENTER_ADDRESS
    })
    address!: string;

    @Column({
        type: DataType.STRING(10),
        field: Renter.RENTER_PHONE
    })
    phone!: string;

    @Column({
        type: DataType.TEXT,
        field: Renter.RENTER_EMAIL,
        unique: true
    })
    email!: number;

    @Column({
        type: DataType.STRING(12),
        field: Renter.RENTER_CCCD
    })
    cccd!: string;

    @HasOne(() => RentalRecord)
    rentalRecord!: RentalRecord;

    @HasOne(() => Contract)
    contract!: Contract;

    @HasOne(() => Account)
    account!: Account;
}