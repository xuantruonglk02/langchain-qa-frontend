<template>
    <el-header>
        <div class="header text-right">
            <div>Chat</div>
            <div>
                <router-link :to="{ name: PageName.CHAT_PAGE }">
                    <el-button>Chat</el-button>
                </router-link>
                <router-link :to="{ name: PageName.TOPIC_PAGE }">
                    <el-button>Topics</el-button>
                </router-link>
                <router-link :to="{ name: PageName.CHECK_DOCUMENT_PAGE }">
                    <el-button>Check document</el-button>
                </router-link>
                <el-button @click="logout()">Logout</el-button>
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { PageName } from '@/common/constants';
import authLocalStorage from '@/common/storages/authStorage';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    authLocalStorage.resetAll();
    router.push({ name: PageName.LOGIN_PAGE });
};
</script>

<style scoped lang="scss">
.el-header {
    /* position: relative; */
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
    height: 70px;
}
.header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    right: 20px;
    font-size: 24px;
    .el-button {
        padding: 20px;
        font-size: 20px;
    }
}
</style>
