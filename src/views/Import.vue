<template>
    <div class="custom-file">
        <input
            type="file"
            multiple="multiple"
            @change="onFileChange"
            class="hidden-input"
            id="fileInput"
            accept="audio/*"></div>
        <div class="m-3">
            <b-button
                variant="dark"
                onclick="document.getElementById('fileInput').click();">내 컴퓨터</b-button>
            <b-button disabled="disabled" variant="primary">내 저장소</b-button>
        </div>
        <div
            class="drop-zone border rounded p-3 mb-3"
            @dragover="onDragOver"
            @drop="onDrop"
            @dragleave="onDragLeave"
            :class="{'bg-info': isDraggingOver}">
            <p v-if="showDropMessage" class="text-center">여기에 파일을 끌어오세요.</p>
            <div class="mt-4">
                <h2>음원 목록</h2>
                <div class="m-3">
                    <b-button @click="cancelAllUploads" variant="danger">전체 취소</b-button>
                </div>
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
        </div>
        <div class="text-center">
            <button @click="addToQueue" class="btn btn-primary">추가</button>
        </div>
        <div class="mt-4">
            <h2>대기열 목록</h2>
            <table class="table table-bordered table-hover">
                <thead class="thead-light">
                    <tr>
                        <th><input type="checkbox" v-model="selectAllQueue" @change="toggleSelectAllQueue"/></th>
                        <th>음원 명</th>
                        <th>저작자</th>
                        <th>장르</th>
                        <th>설명</th>
                        <th>Progress (%)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(file, index) in queuedFiles" :key="index">
                        <td><input type="checkbox" v-model="file.selected"/></td>
                        <td>
                            <input v-model="file.name" type="text"></td>
                            <td>
                                <input v-model="file.author" type="text"></td>
                                <td>
                                    <input v-model="file.genre" type="text"></td>
                                    <td>
                                        <input v-model="file.description" type="text"></td>
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
                    </template>
                    <script>
                    import { firebase, storage, database }  from '../firebase/firebase.js';
                    
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
                                    const newFiles = [...event.target.files]
                                        .filter(
                                            file => file.type.startsWith('audio/')
                                        )
                                        .map(file => ({
                                            file,
                                            progress: 0,
                                            status: "ready",
                                            xhr: null,
                                            selected: false,
                                            name: file.name,
                                            type: file.type,
                                            size: file.size
                                        }));
                                    if (newFiles.length === 0) {
                                        alert("오디오 파일만 선택해주세요.");
                                        return;
                                    }
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
                                async uploadSelectedQueuedFiles() {
                                    const storageRef = storage.ref();

                                    for (let i = 0; i < this.queuedFiles.length; i++) {
                                        const {
                                            file,
                                            selected,
                                            name,
                                            author,
                                            genre,
                                            description
                                        } = this.queuedFiles[i];
                                        if (!selected) 
                                            continue;
                                        
                                        const filePath = `${file.name}`;
                                        const uploadTask = storageRef
                                            .child(filePath)
                                            .put(file);

                                        this
                                            .queuedFiles[i]
                                            .status = "uploading";

                                        uploadTask.on("state_changed", (snapshot) => {
                                            this
                                                .queuedFiles[i]
                                                .progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                        }, (error) => {
                                            this
                                                .queuedFiles[i]
                                                .status = "error";
                                            console.error(error);
                                        }, async () => {
                                            this
                                                .queuedFiles[i]
                                                .status = "done";
                                            const url = await storageRef
                                                .child(filePath)
                                                .getDownloadURL();

                                            // Firebase Realtime Database에 파일 정보 추가
                                            const key = database
                                                .ref()
                                                .child('files')
                                                .push()
                                                .key;
                                            database
                                                .ref(`files/${key}`)
                                                .set({name, author, genre, description, url});

                                            this
                                                .queuedFiles[i]
                                                .url = url;
                                        });
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
                                    const storageRef = firebase
                                        .storage()
                                        .ref()
                                        .child(name);

                                    try {
                                        await storageRef.delete();
                                        this
                                            .files[index]
                                            .status = "deleted";
                                        alert("File deleted from server.");

                                        // Firebase Realtime Database에서 파일 정보 삭제
                                        const fileKey = this
                                            .files[index]
                                            .key;
                                        if (fileKey) {
                                            database
                                                .ref(`files/${fileKey}`)
                                                .remove();
                                        }

                                        const queuedFileIndex = this
                                            .queuedFiles
                                            .findIndex(file => file.name === name);
                                        if (queuedFileIndex !== -1) {
                                            this
                                                .queuedFiles
                                                .splice(queuedFileIndex, 1);
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
                                    const newFiles = [...event.dataTransfer.files]
                                        .filter(
                                            file => file.type.startsWith('audio/')
                                        )
                                        .map(file => ({
                                            file,
                                            progress: 0,
                                            status: "ready",
                                            xhr: null,
                                            selected: false,
                                            name: file.name, // 파일 이름 추가
                                            author: '', // 저작자 추가
                                            genre: '', // 장르 추가
                                            description: '', // 설명 추가
                                            type: file.type, // 파일 타입 추가
                                            size: file.size // 파일 크기 추가
                                        }));
                                    if (newFiles.length === 0) {
                                        alert("오디오 파일만 선택해주세요.");
                                        return;
                                    }
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