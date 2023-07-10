import { ElMessage, ElNotification } from 'element-plus';
import isPlainObject from 'lodash/isPlainObject';
import mapKeys from 'lodash/mapKeys';
import trim from 'lodash/trim';

export function isValidJSON(str: string) {
    try {
        const object = JSON.parse(str);
        if (object && typeof object === 'object') return true;
        return false;
    } catch (error) {
        return false;
    }
}

export function trimData(body: any): void {
    const trimValue = (item: any) => {
        mapKeys(item, (value, key) => {
            // remove string contain only space characters
            if (typeof value === 'string') {
                item[key] = value.trim();
            }

            // iterate array
            else if (Array.isArray(value)) {
                value.forEach((subValue, index) => {
                    // remove string contain only space characters
                    if (typeof subValue === 'string') {
                        value[index] = trim(subValue);
                    } else if (isPlainObject(subValue)) {
                        trimValue(subValue);
                    }
                });
            } else if (isPlainObject(value)) {
                trimValue(value);
            }
        });
    };

    trimValue(body);
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
}

export function showSuccessNotification(message: string) {
    ElNotification({
        title: 'Success',
        message,
        type: 'success',
    });
}

export function showErrorNotification(message: string) {
    ElNotification({
        title: 'Error',
        message,
        type: 'error',
    });
}

export function showSuccessMessage(message: string) {
    ElMessage({
        type: 'success',
        message,
    });
}

export function showErrorMessage(message: string) {
    ElMessage.error(message);
}

export function showMessage(message: string) {
    ElMessage(message);
}
