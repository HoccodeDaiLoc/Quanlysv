import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Renter } from "./Renter";


@Table({
    tableName: Account.ACCOUNT_TABLE_NAME
})
export class Account extends Model {
    private static ACCOUNT_TABLE_NAME = "accounts" as string;
    private static ACCOUNT_ID = "id" as string;
    private static ACCOUNT_AVATAR = "avatar" as string;
    private static ACCOUNT_USERNAME = "username" as string;
    private static ACCOUNT_PASSWORD = "password" as string;
    private static ACCOUNT_PASSWORD_CHANGE_AT = "password_change_at" as string;
    private static ACCOUNT_PASSWORD_RESET_TOKEN = "password_reset_token" as string;
    private static ACCOUNT_PASSWORD_RESET_EXPIRES = "password_reset_expires" as string;
    private static ACCOUNT_IS_ADMIN = "is_admin" as string;


    @Column({
        type: DataType.INTEGER,
        field: Account.ACCOUNT_ID,
        autoIncrement: true,
        primaryKey: true
    })
    id!: number;

    @Column({
        type: DataType.TEXT,
        field: Account.ACCOUNT_AVATAR,
    })
    avatar!: string;

    @Column({
        type: DataType.TEXT,
        field: Account.ACCOUNT_USERNAME,
        unique: true,
    })
    username!: string;

    @Column({
        type: DataType.TEXT,
        field: Account.ACCOUNT_PASSWORD
    })
    password!: string;

    @Column({
        type: DataType.DATE,
        field: Account.ACCOUNT_PASSWORD_CHANGE_AT
    })
    passwordChangeAt!: Date;

    @Column({
        type: DataType.TEXT,
        field: Account.ACCOUNT_PASSWORD_RESET_TOKEN
    })
    passwordResetToken!: string;

    @Column({
        type: DataType.DATE,
        field: Account.ACCOUNT_PASSWORD_RESET_EXPIRES
    })
    passwordResetExpires!: string;

    @Column({
        type: DataType.BOOLEAN,
        field: Account.ACCOUNT_IS_ADMIN,
        defaultValue: false,
    })
    isAdmin!: string;

    @ForeignKey(() => Renter)
    @Column({
        type: DataType.INTEGER,
        field: "renter_id",
        allowNull: false
    })
    renterId!: number | null;

    @BelongsTo(() => Renter)
    renter!: Renter;
}