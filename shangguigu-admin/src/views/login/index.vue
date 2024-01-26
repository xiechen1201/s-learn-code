<template>
  <div class="login_continer">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12">
        <el-form
          class="login_form"
          ref="formRef"
          :model="loginForm"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              placeholder="请输入账号"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="isLoading"
              @click="onClickLoginBtn"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import type { FormInstance } from 'element-plus';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const formRef = ref<FormInstance>();
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
});
const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 10, message: '账号长度最少为5位', trigger: 'change' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 10, message: '密码长度最少为6位', trigger: 'change' },
  ],
});
let isLoading = ref(false);

const getTitle = () => {
  let hours = new Date().getHours();

  if (hours > 6 && hours < 12) {
    return '早上好';
  } else if (hours >= 12 && hours < 18) {
    return '下午好';
  } else if (hours >= 18 && hours < 24) {
    return '晚上好';
  } else if (hours >= 0 && hours < 6) {
    return '凌晨好';
  }
};

const handleLogin = () => {
  isLoading.value = true;

  userStore
    .userLogin(loginForm)
    .then(() => {
      if (route.query.redirect) {
        router.replace(route.query.redirect as string);
      } else {
        router.replace('/');
      }

      ElNotification({
        type: 'success',
        title: 'HI，' + getTitle(),
        message: '欢迎回来',
      });
    })
    .catch((err) => {
      ElNotification({
        type: 'error',
        message: err,
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onClickLoginBtn = async () => {
  await formRef.value!.validate((valid) => {
    if (valid) {
      handleLogin();
    } else {
      console.log('error submit!');
    }
  });
};
</script>

<style lang="scss">
.login_continer {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    padding: 40px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
      color: #fff;
      font-size: 40px;
    }

    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
