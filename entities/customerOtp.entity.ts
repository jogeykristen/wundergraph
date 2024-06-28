// customerOtp.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "customerOtp" })
export class CustomerOtp {
  @PrimaryGeneratedColumn()
  id!: number; // Primary key for the customer_otp table

  @Column({ type: "varchar" })
  otp!: string; // Column to store OTP

  @ManyToOne(() => User, (user) => user.otps)
  user!: User; // This defines the many-to-one relationship and will create a userId column
}
