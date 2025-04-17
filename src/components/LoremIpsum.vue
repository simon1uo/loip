<script setup lang="ts">
import type { LoremIpsumOptions } from '../utils/lorem-ipsum'
import { computed } from 'vue'
import { loremIpsum } from '../utils/lorem-ipsum'

interface Props {
  p?: number
  avgWordsPerSentence?: number
  avgSentencesPerParagraph?: number
  startWithLoremIpsum?: boolean
  random?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  p: 1,
  avgWordsPerSentence: 8,
  avgSentencesPerParagraph: 8,
  startWithLoremIpsum: true,
  random: true,
})

const paragraphs = computed(() => {
  const options: LoremIpsumOptions = {
    p: props.p,
    avgWordsPerSentence: props.avgWordsPerSentence,
    avgSentencesPerParagraph: props.avgSentencesPerParagraph,
    startWithLoremIpsum: props.startWithLoremIpsum,
    random: props.random,
  }

  return loremIpsum(options)
})
</script>

<template>
  <div class="lorem-ipsum">
    <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-4">
      {{ paragraph }}
    </p>
  </div>
</template>

<style scoped>
.lorem-ipsum {
  line-height: 1.6;
}
</style>
