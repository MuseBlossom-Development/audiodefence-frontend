import http from "../http-common";
import axios from "axios";

const API_URL = "/api/files/";
class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }
  deleteFile(id) {
    return axios.delete(API_URL + id);
  }
  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();

