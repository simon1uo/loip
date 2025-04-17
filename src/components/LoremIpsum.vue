<script setup lang="ts">
import type { LoremIpsumOptions } from '../types/lorem-ipsum'
import { ref, watch } from 'vue'
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

// Use ref instead of computed for paragraphs
const paragraphs = ref<string[]>([])

// Function to update paragraphs based on current props
function updateParagraphs() {
  const options: LoremIpsumOptions = {
    p: props.p,
    avgWordsPerSentence: props.avgWordsPerSentence,
    avgSentencesPerParagraph: props.avgSentencesPerParagraph,
    startWithLoremIpsum: props.startWithLoremIpsum,
    random: props.random,
  }

  paragraphs.value = loremIpsum(options)
}

// Watch all props for changes and update paragraphs when any prop changes
watch(
  () => ({
    p: props.p,
    avgWordsPerSentence: props.avgWordsPerSentence,
    avgSentencesPerParagraph: props.avgSentencesPerParagraph,
    startWithLoremIpsum: props.startWithLoremIpsum,
    random: props.random,
  }),
  () => updateParagraphs(),
  { immediate: true }, // Run immediately on component creation
)
</script>

<template>
  <div class="lorem-ipsum">
    <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-4 text-gray-800 dark:text-gray-300">
      {{ paragraph }}
    </p>
  </div>
</template>

<style scoped>
.lorem-ipsum {
  line-height: 1.6;
}
</style>
