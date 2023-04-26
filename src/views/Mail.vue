<template>
    <div class="container">
        <h3>메일 보내기</h3>
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="email">답장 받을 이메일</label>
                <input
                    v-model="email"
                    :rules="emailRules"
                    type="email"
                    class="form-control"
                    id="email"
                    required="required"></div>
                <div class="form-group">
                    <label for="title">제목</label>
                    <input
                        v-model="title"
                        type="text"
                        class="form-control"
                        id="title"
                        required="required"
                        autocapitalize="off"></div>
                    <div class="form-group">
                        <label for="content">본문</label>
                        <textarea
                            v-model="content"
                            class="form-control"
                            id="content"
                            rows="6"
                            required="required"></textarea>
                    </div>
                    <button :disabled="!valid" class="btn btn-warning" type="submit">전송하기</button>
                </form>
            </div>
        </template>

        <script>
            import axios from 'axios';
            const API_FROM_AWS_API_GATEWAY = 'https://nykow9f4wj.execute-api.ap-northeast-2.amazonaws.com/default/audiodefence' +
                    'ce';
            export default {
                methods: {
                    isValid: function () {
                        if (this.title == '' || this.content == '') {
                            this.valid = false
                        } else {
                            this.valid = true
                        }
                    },
                    submit: function () {
                        axios
                            .post(
                                API_FROM_AWS_API_GATEWAY,
                                JSON.stringify({email: this.email, title: this.title, content: this.content})
                            )
                            .then((res) => {
                                alert('이메일이 발송되었습니다.')
                                console.log(res)
                            })
                            .catch((e) => {
                                alert('이메일 발송에 실패하였습니다.')
                                console.log(e)
                            })
                        }
                },
                data: function () {
                    return {
                        email: '',
                        title: '',
                        content: '',
                        valid: false,
                        emailRules: [
                            v => !!v || 'E-mail is required',
                            v => /.+@.+/.test(v) || 'E-mail must be valid'
                        ]
                    }
                },
                watch: {
                    title: function () {
                        this.isValid();
                    },
                    content: function () {
                        this.isValid();
                    }
                }
            }
        </script>