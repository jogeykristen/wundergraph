import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CustomerOtp } from "./customerOtp.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  first_name!: string;

  @Column({ type: "varchar", nullable: true })
  middle_name?: string;

  @Column({ type: "varchar", nullable: false })
  last_name!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  mobile!: string;

  @Column({ type: "varchar", default: "PENDING" })
  status!: string;

  @Column({ type: "boolean", default: false })
  is_citizen!: boolean;

  @Column({ type: "varchar", nullable: true })
  nic_number?: string;

  @Column({ type: "varchar", nullable: true })
  passport_number?: string;

  @Column({ type: "varchar", nullable: true })
  token!: string;

  @OneToMany(() => CustomerOtp, (otp) => otp.user)
  otps!: CustomerOtp[];
}
