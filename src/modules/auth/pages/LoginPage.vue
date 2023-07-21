<template>
    <el-button @click="onClickLoginWithGoogle">Login with Google</el-button>
</template>

<script setup lang="ts">
const onClickLoginWithGoogle = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_LOGIN_URL;
};
</script>
