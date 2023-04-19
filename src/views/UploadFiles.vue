<template>
  <div>
    <label class="btn btn-default">
        <input type="file" multiple @change="selectFile" />
      </label>
    <div class="dropzone" @drop="dropHandler" @dragover.prevent>
      <div v-if="progressInfos">
        <div class="mb-2" v-for="(progressInfo, index) in progressInfos" :key="index">
          <span>{{progressInfo.fileName}}</span>
          <div class="progress">
            <div
              class="progress-bar progress-bar-info"
              role="progressbar"
              :aria-valuenow="progressInfo.percentage"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{ width: progressInfo.percentage + '%' }"
            >
              {{progressInfo.percentage}}%
            </div>
          </div>
        </div>
      </div>
      <div v-if="progressInfos">      
      </div>
    </div>
    <div v-if="message" class="alert alert-light" role="alert">
      <ul>
        <li v-for="(ms, i) in message.split('\n')" :key="i">
          {{ ms }}
        </li>
      </ul>
    </div>

    <div class="card">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(file, index) in fileInfos" :key="index">
          <a :href="file.url">{{ file.name }}</a>
          <button class="btn btn-danger float-right" @click="deleteFile(index, file.id)">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import UploadService from "../services/UploadFilesService";
export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: [],
      progressInfos: [],
      message: "",
      fileInfos: [],
    };
  },
  methods: {
    selectFile(event) {
      // 선택한 파일 목록에 새롭게 선택된 파일 추가
      if (!this.selectedFiles) {
        this.selectedFiles = event.target.files;
      } else {
        for (let i = 0; i < event.target.files.length; i++) {
          this.selectedFiles.push(event.target.files[i]);
        }
      }

      this.uploadFiles();
    },
    upload(idx, file) {
      this.progressInfos[idx] = { percentage: 0, fileName: file.name };
      UploadService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
      })
        .then((response) => {
          let prevMessage = this.message ? this.message + "\n" : "";
          this.message = prevMessage + response.data.message;
          return UploadService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progressInfos[idx].percentage = 0;
          this.message = "Could not upload the file:" + file.name;
        });
    },
    uploadFiles() {
      this.message = "";
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
    dragOverHandler(event) {
      event.preventDefault();
    },
    dropHandler(event) {
      event.preventDefault();
      // 드래그앤드롭으로 파일 추가 시, 선택한 파일 목록에 새롭게 선택된 파일 추가
      if (!this.selectedFiles) {
        this.selectedFiles = event.dataTransfer.files;
      } else {
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          this.selectedFiles.push(event.dataTransfer.files[i]);
        }
      }

      this.uploadFiles();
    },
    deleteFile(index, id) {
      UploadService.deleteFile(id)
        .then(() => {
          // 서버로부터 파일 삭제가 성공하면 해당 파일을 파일 리스트에서 제거합니다.
          this.fileInfos.splice(index, 1);
        })
        .catch(() => {
          // 파일 삭제가 실패하면 오류 메시지를 출력합니다.
          this.message = "Could not delete the file.";
        });
    },
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  }
};


</script>
  