import { Service } from "egg";
import { ossClientFactory } from "../utils/oss";

export default class FileService extends Service {
  /**
   * 将文件流上传到云存储
   * @param filename 文件名
   * @param stream 文件可读流 
   */
  public async upload(filename: string, stream: any) {
    const ossClient = ossClientFactory(this.app);
    const timestamp = Date.now();
    const filePath = `/co-docs/${timestamp}/${filename}`;
    ossClient.putStream(filePath, stream)
  }
}