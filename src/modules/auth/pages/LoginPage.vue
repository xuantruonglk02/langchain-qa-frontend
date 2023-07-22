<template>
    <el-main
        class="d-flex flex-row justify-content-center align-items-center"
        style="height: 100vh"
    >
        <el-button
            type="primary"
            size="large"
            style="font-size: 20px"
            @click="onClickLoginWithGoogle"
            >Login with Google</el-button
        >
    </el-main>
</template>

<script setup lang="ts">
const onClickLoginWithGoogle = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_LOGIN_URL;
};
</script>
