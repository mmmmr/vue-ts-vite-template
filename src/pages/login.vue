<template>
  <el-form :model="form" label-width="120px" ref="formRef"  :hide-required-asterisk="true">
    <el-form-item label="账号" :rules="[{required: true, message: '请输入账号!', trigger: 'blur'}]" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" :rules="[{required: true, message: '请输入密码!', trigger: 'blur'}]" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item label="验证码" :rules="[{required: true, message: '请输入验证码!', trigger: 'blur'}]" prop="verifyCode">
      <el-input v-model="form.verifyCode" style="width: 70%;"/>
      <img :src="codeImg" alt="" style="width: 30%; cursor: pointer;height: 32px;" @click="loadImg">
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="login">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/system/login.js'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/store/modules/user.ts'

interface loginData {
  token: string
}

const form = reactive({
  username: '',
  password: '',
  verifyCode: '',
  captchaId: ''
})

const formRef = ref()

const codeImg = ref('')

function loadImg() {
  fetch('/api/admin/captcha/img').then(response => {
    response.json().then(res => {
      codeImg.value = res.data.img
      form.captchaId = res.data.id
    })
  })
}

onMounted(() => {
  loadImg()
})

const userInfoStore = useUserInfoStore()

const router = useRouter()

const onSubmit = () => {
  formRef.value.validate(async (v:boolean) => {
    if (v) {
      try{
        const data = await login(form)
        const { token } = data as loginData
        userInfoStore.login(token)
        router.push('/layout')
      } catch(e) {
        ElMessage({
          message: <string>e,
          type: 'warning',
        })
        loadImg()
      }
    }
  })
}
</script>

<style scoped>
</style>