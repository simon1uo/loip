<template>
  <img :src="avatarSrc" v-bind="$attrs" class="avatar" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { avatarUrl } from '../utils/lorem-ipsum'
import type { Gender } from '../utils/lorem-ipsum'

interface Props {
  gender?: Gender
}

const props = withDefaults(defineProps<Props>(), {
  gender: 'all'
})

const avatarSrc = computed(() => {
  return avatarUrl(props.gender)
})
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  object-fit: cover;
}
</style>
