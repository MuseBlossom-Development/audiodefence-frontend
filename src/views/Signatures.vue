<template>
    <div class="content-body">
        <div class="container">
            <h1>This page is 모든 서명</h1>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>음원명</th>
                            <th>저작자</th>
                            <th>장르</th>
                            <th>설명</th>
                            <th>링크</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.author }}</td>
                            <td>{{ item.genre }}</td>
                            <td>{{ item.description }}</td>
                            <td>
                                <a :href="item.url">[Link]</a>
                            </td>
                            <td>
                                <button @click="deleteFileFromServer(item)" class="btn btn-sm btn-danger">완전 삭제</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/compat/app';
    import {database} from '../firebase/firebase.js';

    export default {
        data() {
            return {
                items: [], // 데이터를 저장할 배열
            };
        },
        created() {
            // Firebase 실시간 데이터베이스 참조
            const dataRef = database.ref('files');

            // 데이터 가져오기
            dataRef
                .once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        // 가져온 데이터를 배열로 변환
                        const items = Object
                            .entries(data)
                            .map(([key, value]) => ({
                                ...value,
                                key
                            }));
                        this.items = items;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        methods: {
            async deleteFileFromServer(file) {
                const {name, key} = file;
                const storageRef = firebase
                    .storage()
                    .ref()
                    .child(name);

                try {
                    // 스토리지에서 파일 삭제
                    await storageRef.delete();
                    console.log(`[${name}] file deleted from storage`);

                    // 데이터베이스에서 파일 정보 삭제
                    database
                        .ref(`files/${key}`)
                        .remove();
                    console.log(`[${key}] data removed from database`);

                    // 화면에서도 제거
                    const index = this
                        .items
                        .findIndex((item) => item.key === key);
                    if (index !== -1) {
                        this
                            .items
                            .splice(index, 1);
                    }
                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    };
</script>