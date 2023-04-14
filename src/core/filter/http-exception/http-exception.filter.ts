import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    // 设置错误信息
    const message = exception.message ? exception.message : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      // data: {},
      message: message,
      code: -1,
    };
    // 设置返回的状态码， 请求头，发送错误信息
    // response.status(status); //状态码建议不返回，如果参数错误前端直接报错，就分析不出来什么错误
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.json(errorResponse);
  }
}
