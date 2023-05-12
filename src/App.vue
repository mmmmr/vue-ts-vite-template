<template>
  <el-form :model="form" label-width="120px">
    <!-- <el-form-item label="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="password">
      <el-input v-model="form.password" show-password/>
    </el-form-item>
    <el-form-item label="验证码">
      <div style="display:flex">
        <el-input  v-model="form.code" />
        <img @click="resetCode" :src="codeUrl" alt="">
      </div>
    </el-form-item> -->

    <el-form-item label="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="password">
      <el-input-number v-model="form.age" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">login</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({name: 'admin', password: '000000', code: ''})

const codeUrl = ref('api/user/code')

function resetCode() {
  codeUrl.value = codeUrl.value + '?' + Math.random()
}

function onSubmit() {
  fetch('api/user', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(response => response.json())
  .then(data => console.log(data));
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
