<template>
    <el-container class="layout-container-demo" style="height: 100vh">
        <el-aside width="350px">
            <el-scrollbar>
                <el-menu></el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="font-size: 15px">
                <div class="header">
                    <span>Chat</span>
                </div>
            </el-header>

            <el-main class="chat-content">
                <el-scrollbar>
                    <el-row
                        v-for="(message, index) in messageList"
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
import axiosInstance from '@/plugins/axios';
import { Promotion } from '@element-plus/icons-vue';
import { useField, useForm } from 'vee-validate';
import { Ref, ref } from 'vue';
import * as yup from 'yup';
import { MessageType } from '../constants';
import { IMessage } from '../interfaces';
import { chatApiService } from '../services/api.service';

const messageList: Ref<IMessage[]> = ref([
    { type: MessageType.HUMAN, message: 'Hello' },
    { type: MessageType.AI, message: 'Hello. How can I help you?' },
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

const onSubmit = handleSubmit(async () => {
    const messageValue = message.value;
    clearChatInput();

    messageList.value.push({
        type: MessageType.HUMAN,
        message: messageValue,
    });

    const response = await chatApiService.chat(messageValue);
    if (response.success) {
        messageList.value.push({
            type: MessageType.AI,
            message: response.data.reply,
        });
    } else {
        messageList.value.push({
            type: MessageType.SYSTEM,
            message: response.message,
        });
    }
});

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
    justify-content: center;
    height: 100%;
    right: 20px;
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
</style>
