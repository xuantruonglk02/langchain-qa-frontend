<template>
    <el-container class="layout-container-demo" style="height: 100vh">
        <el-aside width="350px">
            <el-scrollbar>
                <div style="padding: 16px">
                    <div>
                        <ul>
                            <li>
                                <a href="/logs" target="_blank">logs</a>
                            </li>
                            <li>
                                <a href="/logs.langchain" target="_blank"
                                    >langchain logs</a
                                >
                            </li>
                        </ul>
                    </div>
                    <BaseUploadDocument @onChangeFile="onDocumentLoaded" />
                    <ul style="margin-top: 10px">
                        <li
                            v-for="(document, index) in documentsList"
                            :key="index"
                            class="document"
                            :class="document.fileUrl ? '' : 'document-error'"
                        >
                            <el-tooltip
                                v-if="!document.fileUrl"
                                content="Document upload error"
                                placement="right"
                            >
                                <span>{{ document.name }}</span>
                            </el-tooltip>
                            <span v-else>{{ document.name }}</span>
                        </li>
                    </ul>
                </div>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="font-size: 15px">
                <div class="header text-right">
                    <div>Chat</div>
                </div>
            </el-header>

            <el-main class="chat-content">
                <el-scrollbar>
                    <el-row
                        v-for="(message, index) in messagesList"
                        :key="index"
                        :class="
                            message.type === MessageType.HUMAN
                                ? 'justify-content-end'
                                : ''
                        "
                    >
                        <div class="msg" :class="`msg-${message.type}`">
                            <span>{{ message.message }}</span>
                        </div>
                    </el-row>
                </el-scrollbar>
            </el-main>

            <el-footer height="70px" style="padding-top: 10px">
                <el-row>
                    <div style="width: calc(100% - 50px - 10px); min-width: 100px">
                        <form @submit="onSubmit">
                            <el-input
                                v-model="message"
                                style="height: 50px; font-size: 20px"
                            />
                        </form>
                    </div>
                    <div style="width: 50px; height: 50px; margin-left: 10px">
                        <el-button
                            @click="onSubmit"
                            type="primary"
                            :icon="Promotion"
                            circle
                            style="width: 100%; height: 100%"
                        />
                    </div>
                </el-row>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { DocumentFileExtension, DocumentFileType } from '@/common/constants';
import { showErrorNotification, showSuccessNotification } from '@/common/helpers';
import { s3ApiService } from '@/common/services/s3.api.service';
import BaseUploadDocument from '@/components/base/BaseUploadDocument.vue';
import { IDocument } from '@/modules/document/interfaces';
import { documentApiService } from '@/modules/document/services/api.service';
import { Promotion } from '@element-plus/icons-vue';
import { UploadFile } from 'element-plus';
import { useField, useForm } from 'vee-validate';
import { Ref, onBeforeMount, ref } from 'vue';
import * as yup from 'yup';
import { MessageType } from '../constants';
import { IMessage } from '../interfaces';
import { chatApiService } from '../services/api.service';

const documentsList: Ref<IDocument[]> = ref([]);
const messagesList: Ref<IMessage[]> = ref([
    {
        type: MessageType.AI,
        message:
            'Xin chào, tôi là Assistant. Tôi sẽ giúp trả lời mọi câu hỏi của bạn. Bạn cũng có thể tải tài liệu của bạn lên ở khung bên trái, và tôi có thể trả lời những câu hỏi liên quan đến tài liệu đó.',
    },
]);

const validationSchema = yup.object({
    message: yup.string().required(),
});
const { handleSubmit, setValues } = useForm({
    initialValues: {
        message: undefined,
    },
    validationSchema: validationSchema,
});
const { value: message } = useField<string>('message');

onBeforeMount(() => {
    getDocumentList();
});

const getDocumentList = () => {
    documentApiService.getDocumentsList({}).then((response) => {
        documentsList.value = response?.data?.items;
    });
};

const onSubmit = handleSubmit(async () => {
    const messageValue = message.value;
    clearChatInput();

    messagesList.value.push({
        type: MessageType.HUMAN,
        message: messageValue,
    });

    const response = await chatApiService.chat(messageValue);
    if (response.success) {
        messagesList.value.push({
            type: MessageType.AI,
            message: response.data.reply,
        });
    } else {
        messagesList.value.push({
            type: MessageType.SYSTEM,
            message: response.message,
        });
    }
});

const onDocumentLoaded = async (uploadFile: UploadFile) => {
    const fileExtension = uploadFile.name.split('.').at(-1) as DocumentFileExtension;
    const createDocumentResponse = await documentApiService.createDocument({
        name: uploadFile.name,
    });
    if (createDocumentResponse.success) {
        const getUrlResponse = await documentApiService.getUrlUploadDocument(
            createDocumentResponse.data._id,
            {
                fileExtension: fileExtension,
            },
        );
        if (getUrlResponse.success) {
            const s3Response = await s3ApiService.putObject(
                getUrlResponse.data.presignedUrlPutObject,
                uploadFile,
                {
                    headers: {
                        'Content-Type': DocumentFileType[fileExtension],
                    },
                },
            );
            if (s3Response.status === 200) {
                const confirm = await documentApiService.confirmDocumentUploaded(
                    createDocumentResponse.data._id,
                    {
                        fileId: getUrlResponse.data.file._id,
                        fileKey: getUrlResponse.data.file.key,
                    },
                );
                if (confirm.success) {
                    showSuccessNotification('Upload success');
                    getDocumentList();
                } else {
                    showErrorNotification(confirm.message);
                }
            } else {
                showErrorNotification(getUrlResponse.message);
            }
        } else {
            showErrorNotification(createDocumentResponse.message);
        }
    }
};

const clearChatInput = () => {
    setValues({
        message: undefined,
    });
};
</script>

<style scoped lang="scss">
.layout-container-demo .el-header {
    /* position: relative; */
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
    border-right: none;
}
.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    right: 20px;
    font-size: 18px;
}

.chat-content {
    padding: 10px !important;

    .el-row {
        margin-bottom: 4px;
    }
    .el-row:last-child {
        margin-bottom: 0;
    }
}

.msg {
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 30px;
}
.msg-human {
    background-color: antiquewhite;
}
.msg-ai {
    background-color: darkgray;
}
.msg-system {
    background-color: indianred;
}
.document {
    cursor: pointer;
}
.document-error {
    color: red;
}
</style>
