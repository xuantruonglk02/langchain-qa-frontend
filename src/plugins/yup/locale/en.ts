import capitalize from 'lodash/capitalize';
import type { MessageContext, MessageFunctionCallable } from '@intlify/runtime';

export const yupEn = {
    mixed: {
        required: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName || 'This field'}`) + ` is a required field`;
        }) as MessageFunctionCallable,
        default: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} invalid`);
        }) as MessageFunctionCallable,
        selectRequired: `This field is required`,
        oneOf: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` is a required field`;
        }) as MessageFunctionCallable,
        notOneOf: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} is a value that is not: ${ctx.named('values')}`,
            );
        }) as MessageFunctionCallable,
        defined: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be defined`);
        }) as MessageFunctionCallable,
    },

    string: {
        length: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have exact ${ctx.named('length')} characters`,
            );
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have at least  ${ctx.named('length')} characters`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must not exceed ${ctx.named('length')} characters`,
            );
        }) as MessageFunctionCallable,
        matches: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} invalid`);
        }) as MessageFunctionCallable,
        email: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} format invalid`);
        }) as MessageFunctionCallable,
        url: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` must be url-formated`;
        }) as MessageFunctionCallable,
        uuid: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` must be UUID-formated`;
        }) as MessageFunctionCallable,
        trim: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`The ${fieldName} must be a trimmed string`);
        }) as MessageFunctionCallable,
        lowercase: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`The ${fieldName} must be a lowercase string`);
        }) as MessageFunctionCallable,
        uppercase: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`The ${fieldName} must be a uppercase string`);
        }) as MessageFunctionCallable,
    },

    number: {
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field must be at least ${ctx.named('min')}`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field can not be over ${ctx.named('max')}`,
            );
        }) as MessageFunctionCallable,
        lessThan: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be less than ${ctx.named('less')}`);
        }) as MessageFunctionCallable,
        moreThan: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be greater than ${ctx.named('more')}`);
        }) as MessageFunctionCallable,
        positive: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be a positive number`);
        }) as MessageFunctionCallable,
        negative: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be a negative number`);
        }) as MessageFunctionCallable,
        integer: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be an integer`);
        }) as MessageFunctionCallable,
    },

    date: {
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field can not be over ${ctx.named('max')}`,
            );
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field must be at least ${ctx.named('min')}`,
            );
        }) as MessageFunctionCallable,
    },

    boolean: {
        isValue: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} field must be ${ctx.named('value')}`);
        }) as MessageFunctionCallable,
    },

    array: {
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field must have at least ${ctx.named('min')} items`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field must have less than or equal to ${ctx.named(
                    'max',
                )} items`,
            );
        }) as MessageFunctionCallable,
        length: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field must have ${ctx.named('length')} items`,
            );
        }) as MessageFunctionCallable,
    },

    object: {
        noUnknown: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `The ${fieldName} field has unspecified keys: ${ctx.named('unknown')}`,
            );
        }) as MessageFunctionCallable,
    },
};
