<script setup lang="ts">
import type { Gender, Language } from '../types/lorem-ipsum'
import { computed } from 'vue'
import { avatarUrl } from '../utils/lorem-ipsum'

interface Props {
  gender?: Gender
  language?: Language
}

const props = withDefaults(defineProps<Props>(), {
  gender: 'all',
  language: 'en',
})

const avatarSrc = computed(() => {
  return avatarUrl(props.gender, props.language)
})
</script>

<template>
  <img :src="avatarSrc" v-bind="$attrs" class="avatar">
</template>

<style scoped>
.avatar {
  border-radius: 50%;
  object-fit: cover;
}
</style>
