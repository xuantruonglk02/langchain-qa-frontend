<template>
    <input ref="uploadRef" type="file" :accept="acceptTypeList" @change="onChangeFile" />
</template>

<script setup lang="ts">
import { ImageFileType } from '@/common/constants';
import { showErrorMessage } from '@/common/helpers';
import type { UploadRawFile } from 'element-plus';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const emit = defineEmits(['onChangeFile']);

const acceptTypeList = Object.values(ImageFileType).join(', ');
const uploadRef = ref();

const onChangeFile = (event: Event) => {
    const rawFile = (event.target as any).files[0] as UploadRawFile;
    if (!Object.values(ImageFileType).includes(rawFile.type)) {
        showErrorMessage(i18n.t('app.uploadFile.avatarWrongFormat'));
        return;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        showErrorMessage(i18n.t('app.uploadFile.avatarToLarge'));
        return;
    }
    emit('onChangeFile', rawFile);
};
</script>

<style scoped lang="scss"></style>
