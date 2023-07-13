<template>
    <el-button @click="onClickLoginWithGoogle">Login with Google</el-button>
</template>

<script setup lang="ts">
import { showErrorNotification } from '@/common/helpers';
import { authApiService } from '../services/api.service';

const onClickLoginWithGoogle = async () => {
    const response = await authApiService.getGoogleLoginUrl();
    if (response.success) {
        document.location.href = response.data.loginUrl;
    } else {
        showErrorNotification(response.message);
    }
};
</script>
