<template>
    <input ref="uploadRef" type="file" :accept="acceptTypeList" @change="onChangeFile" />
</template>

<script setup lang="ts">
import { DocumentFileMimeType, DocumentFileType } from '@/common/constants';
import { showErrorMessage } from '@/common/helpers';
import type { UploadRawFile } from 'element-plus';
import { ref } from 'vue';

const emit = defineEmits(['onChangeFile']);

const uploadRef = ref();
const acceptTypeList = Object.values(DocumentFileType).join(', ');

const onChangeFile = (event: Event) => {
    const rawFile = (event.target as any).files[0] as UploadRawFile;
    if (!Object.values(DocumentFileMimeType).includes(rawFile.type)) {
        showErrorMessage('Wrong format');
        return;
    }
    emit('onChangeFile', rawFile);
};
</script>
