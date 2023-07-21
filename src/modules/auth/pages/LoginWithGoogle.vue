<template></template>

<script setup lang="ts">
import { PageName } from '@/common/constants';
import authLocalStorage from '@/common/storages/authStorage';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
    authLocalStorage.setLoggedUser({
        _id: route.query._id as string,
        email: route.query.email as string,
        name: route.query.name as string,
        picture: route.query.picture as string,
    });
    authLocalStorage.setTokens({
        token: route.query.token as string,
        expiresIn: route.query.expiresIn as string,
    });
    router.push({ name: PageName.CHAT_PAGE });
});
</script>
