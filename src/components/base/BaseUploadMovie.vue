<template>
    <input ref="uploadRef" type="file" :accept="acceptTypeList" @change="onChangeFile" />
</template>

<script setup lang="ts">
import { VideoFileType } from '@/common/constants';
import { showErrorMessage } from '@/common/helpers';
import type { UploadRawFile } from 'element-plus';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const emit = defineEmits(['onChangeFile']);

const uploadRef = ref();
const acceptTypeList = Object.values(VideoFileType).join(', ');

const onChangeFile = (event: Event) => {
    const rawFile = (event.target as any).files[0] as UploadRawFile;
    if (!Object.values(VideoFileType).includes(rawFile.type)) {
        showErrorMessage(i18n.t('app.uploadFile.videoWrongFormat'));
        return;
    }
    emit('onChangeFile', rawFile);
};
</script>
