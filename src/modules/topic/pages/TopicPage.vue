<template>
    <el-main>
        <div class="d-flex flex-row">
            <div style="width: 40%">
                <div>
                    <span>Tên chủ đề</span>
                    <el-input v-model="name" />
                </div>
                <div>
                    <span>Mô tả</span>
                    <el-input v-model="description" type="textarea" />
                </div>
                <el-button type="primary" @click="onSubmit">Tạo chủ đề mới</el-button>
            </div>
            <div style="width: 60%; padding: 20px">
                <ul>
                    <li
                        v-for="(topic, index) in topicsList"
                        :key="index"
                        style="margin-bottom: 16px"
                    >
                        <div class="d-flex flex-row justify-content-between">
                            <div>
                                <h3>{{ topic.name }}</h3>
                                <span>{{ topic.description }}</span>
                            </div>
                            <el-button
                                type="danger"
                                @click="onClickRemoveTopic(topic._id)"
                                >Xóa</el-button
                            >
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </el-main>
</template>

<script setup lang="ts">
import yup from '@/plugins/yup';
import { useField, useForm } from 'vee-validate';
import { Ref, onBeforeMount, ref } from 'vue';
import { ITopic } from '../interfaces';
import { topicApiService } from '../services/api.service';

const topicsList: Ref<ITopic[]> = ref([]);

const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
});
const { handleSubmit, setValues, resetForm } = useForm({
    initialValues: {
        name: undefined,
        description: undefined,
    },
    validationSchema: validationSchema,
});
const { value: name } = useField<string>('name');
const { value: description } = useField<string>('description');

const onSubmit = handleSubmit(async () => {
    const response = await topicApiService.createTopic({
        name: name.value,
        description: description.value,
    });
    if (response.success) {
        topicsList.value.push({
            _id: response.data._id,
            name: response.data.name,
            description: response.data.description,
        });
        resetForm();
    }
});

const onClickRemoveTopic = async (id: string) => {
    const response = await topicApiService.deleteTopic(id);
    if (response.success) {
        const index = topicsList.value.findIndex((topic) => topic._id === id);
        topicsList.value.splice(index, 1);
    }
};

onBeforeMount(() => {
    getTopicsList();
});

const getTopicsList = async () => {
    topicApiService.getTopicsList({}).then((response) => {
        topicsList.value = response?.data?.items;
    });
};
</script>
