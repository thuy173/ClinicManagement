import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {
  try {
    // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
    const responseError = {
      statusCode: err.statusCode,
      message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
      stack: err.stack,
    };

    if (env.BUILD_MODE !== "dev") delete responseError.stack;

    // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file, bắn thông báo lỗi vào group Slack, Telegram, Email...vv
    // ...
    // console.error(responseError)

    // Trả responseError về phía Front-end
    return res.status(responseError.statusCode).json(responseError);
    
  } catch (error) {
    // Nếu có lỗi trong quá trình xử lý lỗi, trả về lỗi 500
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error in Error Handler',
      ...(env.BUILD_MODE === "dev" ? { stack: error.stack } : {})
    });
  }
};