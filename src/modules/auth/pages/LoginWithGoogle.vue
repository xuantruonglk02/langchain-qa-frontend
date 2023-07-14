<template></template>

<script setup lang="ts">
import { PageName } from '@/common/constants';
import { showErrorNotification } from '@/common/helpers';
import authLocalStore from '@/common/storages/authStorage';
import { ElLoading } from 'element-plus';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authApiService } from '../services/api.service';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
    const loading = ElLoading.service({});
    const response = await authApiService.loginWithGoogle({
        code: route.query.code as string,
        scope: route.query.scope as string,
        authuser: route.query.authuser as string,
        prompt: route.query.prompt as string,
    });
    if (response.success) {
        authLocalStore.setLoggedUser({
            _id: response.data.profile._id,
            email: response.data.profile.email,
            name: response.data.profile.name,
            picture: response.data.profile.picture,
        });
        authLocalStore.setTokens(response.data.tokens);
        loading.close();
        router.push({ name: PageName.CHAT_PAGE });
    } else {
        loading.close();
        showErrorNotification(response.message);
        router.push({ name: PageName.LOGIN_PAGE });
    }
});
</script>
