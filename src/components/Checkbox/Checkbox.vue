<template>
  <div
    class="vanilla-input"
    :class="configuration.classesList.container"
  >
    <div
      :class="[
        configuration.classesList.wrapper,
        align === 'center' ? configuration.classesList.wrapperCenter : '',
        align === 'left' ? configuration.classesList.wrapperLeft : '',
        align === 'right' ? configuration.classesList.wrapperRight : '',
      ]"
    >
      <input
        :id="name"
        ref="input"
        :checked="isChecked"
        :class="configuration.classesList.checkbox"
        :name="name"
        :value="value"
        type="checkbox"
        v-bind="$attrs"
        @change="emitUpdate"
      >
    </div>
    <slot
      name="errors"
      v-bind="{hasErrors, localErrors}"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useBootVariant, useVariantProps, useConfigurationWithClassesList, useVModel } from '@/core';
import { VanillaCheckboxValue, VanillaCheckboxProps, VanillaCheckboxClassesKeys, VanillaCheckboxConfig } from '@/components/Checkbox/index';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';

export default defineComponent({
    name: 'VanillaCheckbox',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        ...useVariantProps<VanillaCheckboxProps>(),
        modelValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaCheckboxValue>,
            default: undefined,
        },
        checked: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        value: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol, undefined] as PropType<VanillaCheckboxValue>,
            default: false,
        },
        checkedValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaCheckboxValue>,
            default: true,
        },
        uncheckedValue: {
            type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<VanillaCheckboxValue>,
            default: false,
        },
        align: {
            type: [String] as PropType<string>,
            required: false,
            default: 'left',
            validator(align: string){
                return ['left', 'right', 'center'].includes(align);
            },
        },
    },
    emits: [
        'update:modelValue',
    ],
    setup(props) {

        const localValue = useVModel(props, 'modelValue');

        // When toggle changes, emit the update in a different way.
        const emitUpdate = (event: Event | any) => {
            let isChecked = event.target?.checked;

            // It's an array
            if (localValue.value instanceof Array) {
                let newValue = [...localValue.value];

                if (isChecked) {
                    newValue.push(props.value);
                } else {
                    newValue.splice(newValue.indexOf(props.value), 1);
                }

                localValue.value = newValue;
                return;
            }

            // It's an object
            if (typeof localValue.value === 'object' && localValue.value !== null){
                let temporaryValue = props.value;
                let temporaryObject = localValue.value;
                if (isChecked){
                    // @ts-expect-error: We assume its a string or will throw an error
                    temporaryObject[temporaryValue] = true;
                } else {
                    // @ts-expect-error: We assume its a string or will throw an error
                    delete temporaryObject[temporaryValue];
                }
                localValue.value = temporaryObject;
                return;
            }

            // It's a boolean
            let toggleValue = isChecked ? props.checkedValue : props.uncheckedValue;
            localValue.value = toggleValue;
        };

        // Check if the value is checked
        const isChecked = computed(() => {
            if (localValue.value instanceof Array && typeof props.value === 'string') {
                return localValue.value.includes(props.value);
            }
            return localValue.value === props.checkedValue;
        });

        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaCheckboxProps>(
            VanillaCheckboxConfig,
            VanillaCheckboxClassesKeys,
            localVariant,
        );

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            props,
            emitUpdate,
            isChecked,
        };
    },
});
</script>

