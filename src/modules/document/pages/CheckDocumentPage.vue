<template>
    <el-main>
        <div class="d-flex flex-row">
            <div class="document-list col-4">
                <div class="d-flex flex-row" style="height: 40px">
                    <h3>Tài liệu đã tải lên</h3>
                    <el-button
                        type="primary"
                        @click="onClickReloadDocumentList"
                        style="margin-left: 16px"
                        >Reload</el-button
                    >
                </div>
                <el-scrollbar style="height: calc(100vh - 70px - 40px - 48px)">
                    <ul>
                        <li
                            v-for="(document, index) in documentsList"
                            :key="index"
                            class="document"
                            :class="document.fileUrl ? '' : 'document-error'"
                        >
                            <div
                                class="d-flex flex-row justify-content-between"
                                style="margin-bottom: 8px"
                            >
                                <div>
                                    <el-tooltip
                                        v-if="!document.fileUrl"
                                        content="Document upload error"
                                        placement="right"
                                    >
                                        <span>{{ document.name }}</span>
                                    </el-tooltip>
                                    <el-tooltip
                                        v-else
                                        :content="document.status"
                                        placement="right"
                                    >
                                        <a :href="document.fileUrl" target="_blank">
                                            <span>{{ document.name }}</span>
                                        </a>
                                    </el-tooltip>
                                    <span class="document-status">{{
                                        document.status
                                    }}</span>
                                </div>
                                <div class="d-flex flex-row">
                                    <el-button
                                        type="warning"
                                        v-if="document.status !== DocumentStatus.PENDING"
                                        @click="onClickViewResult(document._id)"
                                        >View result</el-button
                                    >
                                    <el-button
                                        type="primary"
                                        v-if="
                                            document.status !== DocumentStatus.PROCESSING
                                        "
                                        @click="onClickCheckDocument(document._id)"
                                        >Check</el-button
                                    >
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
            <div style="margin-left: 24px" class="analysis-result">
                <div class="d-flex flex-row" style="height: 40px">
                    <h3>Kết quả phân tích</h3>
                    <el-button
                        v-if="selectedDocumentId"
                        type="primary"
                        @click="onClickReloadResult"
                        style="margin-left: 16px"
                        >Reload</el-button
                    >
                </div>
                <el-scrollbar style="height: calc(100vh - 70px - 40px - 48px)">
                    <ul>
                        <li
                            v-for="(analysisResult, index) in documentAnalysisResultsList"
                            :key="index"
                        >
                            <span>Time: {{ analysisResult.createdAt }}</span>
                            <ul>
                                <li
                                    v-for="(result, index) in analysisResult.result"
                                    :key="index"
                                    style="margin-bottom: 8px"
                                >
                                    <div>
                                        <b>Paragraph:</b> "{{ result.rawParagraph }}""
                                    </div>
                                    <div
                                        v-if="
                                            result.status ===
                                            DocumentAnalysisParagraphStatus.SUCCESS
                                        "
                                    >
                                        <b>Result:</b>
                                        <ul>
                                            <li
                                                v-for="(sResult, index) in JSON.parse(
                                                    JSON.parse(result.rawResult)?.text,
                                                )"
                                                :key="index"
                                            >
                                                <div>
                                                    <b>Sentence:</b>
                                                    "{{ sResult?.sentence }}""
                                                </div>
                                                <div>
                                                    <b>Topics:</b> {{ sResult?.topics }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-else style="color: red">
                                        <b>Result:</b> ERROR
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
    </el-main>
</template>

<script setup lang="ts">
import { ITopic } from '@/modules/topic/interfaces';
import { topicApiService } from '@/modules/topic/services/api.service';
import { Ref, onBeforeMount, ref } from 'vue';
import { DocumentAnalysisParagraphStatus, DocumentStatus } from '../constants';
import { IDocument, IDocumentAnalysisResult } from '../interfaces';
import { documentApiService } from '../services/api.service';

const documentsList: Ref<IDocument[]> = ref([]);
const topicsList: Ref<ITopic[]> = ref([]);
const documentAnalysisResultsList: Ref<IDocumentAnalysisResult[]> = ref([]);
const selectedDocumentId: Ref<string> = ref(undefined);

onBeforeMount(() => {
    getDocumentsList();
    getTopicsList();
});

const getDocumentsList = () => {
    documentApiService.getDocumentsList({}).then((response) => {
        documentsList.value = response?.data?.items;
    });
};

const getTopicsList = () => {
    topicApiService.getTopicsList({}).then((response) => {
        topicsList.value = response?.data?.items;
    });
};

const onClickCheckDocument = async (id: string) => {
    const response = await documentApiService.checkDocument(
        id,
        topicsList.value.map((topic) => topic._id),
    );
    if (response.success) {
        selectedDocumentId.value = id;
        const index = documentsList.value.findIndex((document) => document._id === id);
        documentsList.value[index].status = DocumentStatus.PROCESSING;
    }
};

const onClickViewResult = async (id: string) => {
    const response = await documentApiService.getDocumentAnalysisResultsList(id, {});
    if (response.success) {
        selectedDocumentId.value = id;
        documentAnalysisResultsList.value = response.data.items;
    }
};

const onClickReloadDocumentList = () => {
    getDocumentsList();
};

const onClickReloadResult = () => {
    onClickViewResult(selectedDocumentId.value);
};
</script>

<style scoped lang="scss">
.document-status {
    margin-left: 8px;
    font-size: 16px;
    color: gray;
}
</style>
