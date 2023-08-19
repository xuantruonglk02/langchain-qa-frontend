<template>
    <el-container class="d-flex flex-column" style="height: 100vh">
        <Header />
        <el-container class="layout-container-demo" style="height: calc(100vh - 70px)">
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>
