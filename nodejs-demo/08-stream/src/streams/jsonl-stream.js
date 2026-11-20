import { Transform } from "node:stream";

export class JSONLStream extends Transform {
  constructor() {
    super({
      // 输入端接收 JavaScript 对象
      writableObjectMode: true,
      // 输出端产生字符串
      readableObjectMode: false
    });
  }

  _transform(chunk, encoding, callback) {
    try {
      const json = JSON.stringify(chunk);
      callback(null, json + "\n");
    } catch (error) {
      callback(error);
    }
  }
}
