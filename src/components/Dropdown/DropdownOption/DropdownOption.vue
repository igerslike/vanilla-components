<template>
  <MenuItem
    v-slot="{ active }"
    :as="as"
    :disabled="disabled"
  >
    <div
      :class="[
        classesList.menuItem,
        withDefaultPadding ? classesList.menuItemSpacing : '',
        active ? classesList.menuItemHighlighted : classesList.menuItemNotHighlighted
      ]"
    >
      <slot
        v-bind="{
          active,
          classes: classesList.menuItemSpacing
        }"
      >
        <span v-text="text" />
      </slot>
    </div>
  </MenuItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useInjectsClassesList } from '@/core';
import { MenuItem } from '@headlessui/vue';

export default defineComponent({
    name: 'VanillaDropdownOption',
    compatConfig: {
        MODE: 3,
    },
    components: {
        MenuItem,
    },
    props: {
        text: {
            type: [String] as PropType<string>,
            required: false,
            default: undefined,
        },
        disabled: {
            type: [Boolean] as PropType<boolean>,
            required: false,
            default: false,
        },
        as: {
            type: [String] as PropType<string>,
            required: false,
            default: 'template',
        },
        withDefaultPadding: {
            type: [Boolean] as PropType<boolean>,
            required: false,
            default: false,
        },
    },
    setup(props) {
        const classesList = useInjectsClassesList()!;

        return {
            classesList,
        };
    },
});
</script>
