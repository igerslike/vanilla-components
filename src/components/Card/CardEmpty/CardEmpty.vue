<template>
  <div :class="classesList.emptyStateContainer">
    <div :class="classesList.emptyState">
      <slot />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaCardEmpty',
    compatConfig: {
        MODE: 3,
    },
    setup(props){

        const classesList = useInjectsClassesList()!;

        return {
            classesList,
            props,
        };
    },
});
</script>
