<template>
    <div class="container">
        <div class="input-group mb-3">
            <div class="custom-file">
                <input
                    type="file"
                    multiple="multiple"
                    @change="onFileChange"
                    class="hidden-input"
                    id="fileInput"></div>
                <div class="input-group-append">
                    <button
                        class="btn btn-primary"
                        onclick="document.getElementById('fileInput').click();">내 컴퓨터</button>
                </div>
                <button @click="cancelAllUploads" class="btn btn-danger">Cancel All Uploads</button>
                <button @click="addToQueue" class="btn btn-primary">Add to Queue</button>
            </div>
            <div
                class="drop-zone border rounded p-3 mb-3 text-center"
                @dragover="onDragOver"
                @drop="onDrop"
                @dragleave="onDragLeave"
                :class="{'bg-info': isDraggingOver}">
                <p v-if="showDropMessage">여기에 파일을 끌어오세요.</p>
                <div class="mt-4">
                    <h2>음원 목록</h2>
                    <table class="table table-bordered table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"/></th>
                                <th>Play</th>
                                <th>Name</th>
                                <th>Size (bytes)</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(file, index) in files" :key="index">
                                <td>
                                    <input type="checkbox" v-model="file.selected"/>
                                </td>
                                <td>
                                    <button @click="playAudio(index)" v-if="file.type.startsWith('audio')">
                                        <i class="bi bi-play-circle"></i>
                                    </button>
                                </td>
                                <td>{{ file.name }}</td>
                                <td>{{ bytesToMB(file.size) }}
                                    MB</td>
                                <td>{{ file.type }}</td>
                                <td>{{ file.status }}</td>
                                <td>
                                    <div v-if="file.status === 'uploading'">
                                        <button @click="cancelUpload(index)" class="btn btn-sm btn-danger">Cancel</button>
                                        <button
                                            @click="pauseUpload(index)"
                                            v-if="file.status === 'uploading'"
                                            class="btn btn-sm btn-warning">Pause</button>
                                        <button
                                            @click="resumeUpload(index)"
                                            v-if="file.status === 'paused'"
                                            class="btn btn-sm btn-success">Resume</button>
                                    </div>
                                    <div v-if="file.status === 'done'">
                                        <button @click="deleteFile(index)" class="btn btn-sm btn-danger">Remove from List</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-4">
                    <h2>대기열 목록</h2>
                    <table class="table table-bordered table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th><input type="checkbox" v-model="selectAllQueue" @change="toggleSelectAllQueue"/></th>
                                <th>Name</th>
                                <th>Progress (%)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(file, index) in queuedFiles" :key="index">
                                <td><input type="checkbox" v-model="file.selected"/></td>
                                <td>{{ file.name }}</td>
                                <td>
                                    <div class="progress">
                                        <div
                                            class="progress-bar"
                                            role="progressbar"
                                            :style="{ width: file.progress + '%' }"
                                            :aria-valuenow="file.progress"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                            {{ file.progress }}%
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button @click="removeFromQueue(index)" class="btn btn-sm btn-danger">Remove from Queue</button>
                                    <button @click="deleteFileFromServer(index)" class="btn btn-sm btn-danger">Delete from Server</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="uploadSelectedQueuedFiles" class="btn btn-primary">Upload Selected</button>
                    <!-- 변경된 Upload 버튼 -->
                </div>
            </div>
        </div>
    </template>
    <script>
        import axios from 'axios';
        export default {
            data() {
                return {
                    files: [],
                    queuedFiles: [],
                    isDraggingOver: false,
                    selectAll: false,
                    playingAudio: null,
                    playingIndex: -1,
                    showDropMessage: true,
                    selectAllQueue: false
                };
            },
            methods: {
                onFileChange(event) {
                    const newFiles = [...event.target.files].map(file => ({
                        file,
                        progress: 0,
                        status: "ready",
                        xhr: null,
                        selected: false,
                        name: file.name,
                        type: file.type,
                        size: file.size
                    }));
                    this.files = [
                        ...this.files,
                        ...newFiles
                    ];
                    this.showDropMessage = false;
                },
                bytesToMB(bytes) {
                    return (bytes / (1024 * 1024)).toFixed(2);
                },
                toggleSelectAll() {
                    this.files = this
                        .files
                        .map(file => ({
                            ...file,
                            selected: this.selectAll
                        }));
                },
                toggleSelectAllQueue() { // 대기열 전체 선택 기능
                    this.queuedFiles = this
                        .queuedFiles
                        .map(file => ({
                            ...file,
                            selected: this.selectAllQueue
                        }));
                },
                async uploadSelectedQueuedFiles() { // 선택된 대기열 목록에 있는 파일들만 업로드하는 메서드
                    for (let i = 0; i < this.queuedFiles.length; i++) {
                        const {file, selected,} = this.queuedFiles[i];
                        if (!selected) 
                            continue;
                        
                        const formData = new FormData();
                        formData.append("file", file, encodeURIComponent(file.name));
                        this
                            .queuedFiles[i]
                            .status = "uploading";

                        try {
                            const response = await axios.post("http://localhost:3000/upload", formData, {
                                onUploadProgress: (progressEvent) => {
                                    this
                                        .queuedFiles[i]
                                        .progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                }
                            });

                            if (response.status === 200) {
                                this
                                    .queuedFiles[i]
                                    .status = "done";
                            } else {
                                this
                                    .queuedFiles[i]
                                    .status = "error";
                            }
                        } catch (error) {
                            this
                                .queuedFiles[i]
                                .status = "error";
                        }
                    }
                },
                addToQueue() {
                    const selectedFiles = this
                        .files
                        .filter(file => file.selected && file.status === "ready");
                    selectedFiles.forEach(file => {
                        file.status = "queued";
                        this
                            .queuedFiles
                            .push(file);
                    });
                    this.files = this
                        .files
                        .filter(file => !file.selected || file.status !== "ready");
                },
                removeFromQueue(index) {
                    this
                        .queuedFiles
                        .splice(index, 1);
                },
                cancelUpload(index) {
                    const {xhr} = this.files[index];
                    xhr.abort();
                    this
                        .files[index]
                        .status = "canceled";
                },
                pauseUpload(index) {
                    const {xhr} = this.files[index];
                    xhr.abort();
                    this
                        .files[index]
                        .status = "paused";
                },
                async resumeUpload(index) {
                    const {file, xhr} = this.files[index];
                    const formData = new FormData();
                    formData.append("file", file);
                    this
                        .files[index]
                        .status = "uploading";
                    xhr
                        .upload
                        .addEventListener("progress", progressEvent => {
                            this
                                .files[index]
                                .progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        });
                    xhr.open("POST", "/upload");
                    xhr.send(formData);
                    await new Promise(resolve => {
                        xhr.onload = () => {
                            this
                                .files[index]
                                .status = "done";
                            resolve();
                        };
                    });
                },
                cancelAllUploads() {
                    for (let i = 0; i < this.files.length; i++) {
                        if (this.files[i].status === "uploading") {
                            this.cancelUpload(i);
                        }
                    }
                    this.files = [];
                },
                deleteFile(index) {
                    const file = this.files[index];
                    if (file.status === "uploading") {
                        file
                            .xhr
                            .abort();
                    }
                    this
                        .files
                        .splice(index, 1);
                },
                async deleteFileFromServer(index) {
                    const {name} = this.files[index];
                    try {
                        const response = await fetch(
                            `http://localhost:3000/delete/${encodeURIComponent(name)}`,
                            {method: "DELETE"}
                        );
                        if (response.ok) {
                            this
                                .files[index]
                                .status = "deleted";
                            alert("File deleted from server.");

                            // Remove the file from the queuedFiles array
                            const queuedFileIndex = this
                                .queuedFiles
                                .findIndex(file => file.name === name);
                            if (queuedFileIndex !== -1) {
                                this
                                    .queuedFiles
                                    .splice(queuedFileIndex, 1);
                            }
                        } else {
                            throw new Error("File deletion failed.");
                        }
                    } catch (error) {
                        alert(`Error: ${error.message}`);
                    }
                },
                onDragOver(event) {
                    event.preventDefault();
                    this.isDraggingOver = true;
                },
                onDragLeave(event) {
                    event.preventDefault();
                    this.isDraggingOver = false;
                },
                async onDrop(event) {
                    event.preventDefault();
                    this.isDraggingOver = false;
                    const newFiles = [...event.dataTransfer.files].map(file => ({
                        file,
                        progress: 0,
                        status: "ready",
                        xhr: null,
                        selected: false,
                        name: file.name, // 파일 이름 추가
                        type: file.type, // 파일 타입 추가
                        size: file.size // 파일 크기 추가
                    }));
                    this.files = [
                        ...this.files,
                        ...newFiles
                    ];
                    this.showDropMessage = false;
                    await this.uploadSelectedQueuedFiles();
                },
                playAudio(index) {
                    if (this.playingAudio) {
                        this
                            .playingAudio
                            .pause();
                        this.playingAudio = null;
                        this.playingIndex = -1;
                    }

                    if (index !== this.playingIndex) {
                        const audio = new Audio(URL.createObjectURL(this.files[index].file));
                        audio.play();
                        this.playingAudio = audio;
                        this.playingIndex = index;
                    }
                }
            }
        };
    </script>
    <style>
        .hidden-input {
            display: none;
        }
    </style>