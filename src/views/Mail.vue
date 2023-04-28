<template>
    <div class="container">
      <h3>메일 보내기</h3>
      <form @submit.prevent="submit">
        <input
          v-model="email"
          :rules="emailRules"
          label="답장 받을 이메일"
          required
        />
        <input
          v-model="title"
          label="제목"
          required
          autocapitalize="off"
        />
        <textarea
          v-model="content"
          type="text"
          label="본문"
          required
        ></textarea>
        <br />
        <button
          :disabled="!valid"
          color="#ff9800"
          @click="submit"
          >전송하기</button
        >
      </form> 
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const API_FROM_AWS_API_GATEWAY = 'https://tgq8c5q5i8.execute-api.ap-northeast-2.amazonaws.com/default/Lambda-email';
  
  export default {
    name: 'Feedback',
    methods: {
      isValid: function () {
        if (this.title == '' || this.content == '') {
          this.valid = false
        } else {
          this.valid = true
        }
      },
      submit: function () {
        axios.post(API_FROM_AWS_API_GATEWAY, JSON.stringify({
          email: this.email,
          title: this.title,
          content: this.content,
          }
        ))
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
      },
    },
    data: function () {
      return {
        email: '',
        title: '',
        content: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    watch: {
      title: function () {
        this.isValid();
      },
      content: function () {
        this.isValid();
      },
    }
  }
  </script>