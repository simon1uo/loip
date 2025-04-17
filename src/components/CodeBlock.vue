<script setup lang="ts">
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki'
import { createHighlighter } from 'shiki'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  code: string
  lang?: string
  lineNumbers?: boolean
  theme?: 'light' | 'dark'
}>()

const highlightedCode = ref('')
const isLoading = ref(true)
const highlighter = ref<HighlighterGeneric<BundledLanguage, BundledTheme> | null>(null)
const isCopied = ref(false)

// Default values
const language = computed(() => props.lang || 'javascript')
const showLineNumbers = computed(() => props.lineNumbers !== false)
const currentTheme = computed(() => props.theme || 'light')

// Theme mapping
const themeMap = {
  light: 'github-light',
  dark: 'github-dark',
}

// Function to highlight code
async function highlightCode() {
  if (!highlighter.value)
    return

  try {
    // Preserve indentation by using the original code
    const html = highlighter.value.codeToHtml(props.code, {
      lang: language.value,
      theme: themeMap[currentTheme.value],
    })

    // Process the HTML to add line numbers if needed
    if (showLineNumbers.value) {
      const processedHtml = addLineNumbers(html)
      highlightedCode.value = processedHtml
    }
    else {
      highlightedCode.value = html
    }

    // Add a class to the pre element to ensure proper indentation
    highlightedCode.value = highlightedCode.value.replace(
      /<pre class="shiki/g,
      '<pre class="shiki preserve-whitespace',
    )
  }
  catch (error) {
    console.error('Error highlighting code:', error)
    // Fallback to plain text if highlighting fails
    highlightedCode.value = `<pre class="shiki preserve-whitespace">${escapeHtml(props.code)}</pre>`
  }
}

// Initialize highlighter
onMounted(async () => {
  try {
    highlighter.value = await createHighlighter({
      themes: [themeMap.light, themeMap.dark],
      langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'bash', 'jsx', 'tsx'],
    })

    // Initial highlighting
    await highlightCode()
  }
  catch (error) {
    console.error('Error initializing highlighter:', error)
    highlightedCode.value = `<pre class="shiki">${escapeHtml(props.code)}</pre>`
  }
  finally {
    isLoading.value = false
  }
})

// Watch for theme, code, or language changes
watch([() => props.theme, () => props.code, () => props.lang], async () => {
  if (highlighter.value) {
    await highlightCode()
  }
})

// Function to copy code to clipboard
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
  catch (error) {
    console.error('Failed to copy code:', error)
  }
}

// Helper function to add line numbers
function addLineNumbers(html: string): string {
  // Extract the code content from the HTML
  const codeMatch = html.match(/<code>([\s\S]*?)<\/code>/)
  if (!codeMatch || !codeMatch[1])
    return html

  const codeContent = codeMatch[1]
  const lines = codeContent.split('\n')

  // Create line numbers
  let lineNumbersHtml = '<div class="line-numbers">'
  for (let i = 1; i <= lines.length; i++) {
    lineNumbersHtml += `<div class="line-number">${i}</div>`
  }
  lineNumbersHtml += '</div>'

  // Replace the original code with line numbers + code
  // Preserve the original HTML with indentation
  const newHtml = html.replace(
    /<code>([\s\S]*?)<\/code>/,
    `<div class="code-with-lines"><div class="line-numbers-wrapper">${lineNumbersHtml}</div><code class="preserve-indentation">$1</code></div>`,
  )

  return newHtml
}

// Helper function to escape HTML
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
</script>

<template>
  <div class="code-block-wrapper font-mono" :class="{ 'with-line-numbers': showLineNumbers }">
    <div v-if="isLoading" class="code-loading">
      Loading...
    </div>
    <div v-else class="code-container-wrapper relative">
      <div class="code-container font-mono" v-html="highlightedCode" />
      <button class="copy-button absolute right-2 top-2 z-10 rounded-md p-1.5 transition-colors duration-200" :class="{
        'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600': !isCopied,
        'bg-green-100 dark:bg-green-800': isCopied,
      }" :title="isCopied ? 'Copied!' : 'Copy code'" @click="copyToClipboard">
        <div v-if="!isCopied" class="i-lucide-clipboard h-4 w-4 text-gray-600 dark:text-gray-300" />
        <div v-else class="i-lucide-check h-4 w-4 text-green-600 dark:text-green-300" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.code-block-wrapper {
  position: relative;
  margin: 1rem 0;
  border-radius: 0.375rem;
  overflow: hidden;
}

.code-container-wrapper {
  position: relative;
}

.code-container {
  overflow-x: auto;
  font-family: 'Roboto Mono', monospace;
}

.copy-button {

  opacity: 0.7;
}

.code-container-wrapper:hover .copy-button {
  opacity: 1;
}

.code-container :deep(.shiki) {
  margin: 0;
  padding: 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  -moz-tab-size: 2;
}

.code-container :deep(.preserve-whitespace) {
  white-space: pre !important;
}

.code-container :deep(.preserve-indentation) {
  white-space: pre !important;
  display: block;
  tab-size: 2;
  -moz-tab-size: 2;
}

.code-container :deep(.code-with-lines) {
  display: flex;
  width: 100%;
}

.code-container :deep(.line-numbers-wrapper) {
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
}

.code-container :deep(.line-numbers) {
  display: flex;
  flex-direction: column;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: #6e7781;
  user-select: none;
  text-align: right;
}

.code-container :deep(.line-number) {
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-container :deep(code) {
  flex: 1;
  padding: 1rem;
  overflow-x: auto;
  white-space: pre !important;
  display: block;
  font-family: 'Roboto Mono', monospace;
}

/* Theme adjustments */
:deep(.shiki.github-light) {
  background-color: #f8f8f8 !important;
  color: #24292e !important;
}

:deep(.shiki.github-dark) {
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
}

:deep(.shiki.github-light) .line-numbers-wrapper {
  background-color: rgba(0, 0, 0, 0.05);
}

:deep(.shiki.github-dark) .line-numbers-wrapper {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Responsive styles */
@media (max-width: 640px) {
  .code-container :deep(.shiki) {
    font-size: 0.75rem;
    padding: 0.75rem;
  }

  .code-container :deep(.line-number) {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .code-container :deep(.shiki) {
    font-size: 0.7rem;
    padding: 0.5rem;
  }

  .code-container :deep(.line-numbers-wrapper) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .code-container :deep(.line-numbers) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .code-container :deep(.line-number) {
    font-size: 0.7rem;
  }

  .code-container :deep(code) {
    padding: 0.5rem;
  }
}
</style>
