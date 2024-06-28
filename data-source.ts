import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { CustomerOtp } from "./entities/customerOtp.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wundergraph_new",
  synchronize: true,
  logging: false,
  entities: [User, CustomerOtp],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
