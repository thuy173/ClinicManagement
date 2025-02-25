import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";
import "dotenv/config";

// Khởi tạo một đối tượng ClinicManagementDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let ClinicManagementDatabaseInstance = null;

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Đọc thêm ở đây: https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến ClinicManagementDatabaseInstance ở trên của chúng ta
  ClinicManagementDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);

  try {
    await mongoClientInstance.connect();
    ClinicManagementDatabaseInstance = mongoClientInstance.db(
      env.DATABASE_NAME
    );
    // eslint-disable-next-line no-undef
    console.log("Kết nối tới MongoDB thành công!");
  } catch (err) {
    // eslint-disable-next-line no-undef
    console.error("Lỗi khi kết nối tới MongoDB:", err);
  }
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

// Function GET_DB (không async) này có nhiệm vụ export ra cái ClinicManagement Database Instance sau khi đã connect thành công tới MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.
export const GET_DB = () => {
  if (!ClinicManagementDatabaseInstance)
    throw new Error("Must connect to Database first!");
  return ClinicManagementDatabaseInstance;
};
