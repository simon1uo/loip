<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { reactive } from 'vue'
import { fullname, username } from '../utils/lorem-ipsum'
import Avatar from './Avatar.vue'
import LoremIpsum from './LoremIpsum.vue'

// Use VueUse's useDark hook to detect and toggle dark mode
const isDark = useDark()
const toggleDark = useToggle(isDark)

const options = reactive({
  p: 2,
  avgWordsPerSentence: 8,
  avgSentencesPerParagraph: 6,
  startWithLoremIpsum: true,
  random: true,
})
</script>

<template>
  <div class="demo-container p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-center text-dark dark:text-white">
        LOIP
      </h1>
      <button class="theme-toggle px-3 py-2 rounded-lg bg-gray-200 text-black dark:bg-gray-700 dark:text-white" @click="toggleDark()">
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>
    <p class="text-center mb-8 text-gray-700 dark:text-gray-300">
      A Vue 3 component for generating placeholder text
    </p>

    <div class="controls p-4 rounded-lg mb-8 bg-gray-100 dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4 text-dark dark:text-white">
        Options
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label for="paragraphs" class="block mb-2 text-gray-700 dark:text-gray-300">Paragraphs</label>
          <input
            id="paragraphs" v-model.number="options.p" type="number" min="1" max="10"
            class="w-full p-2 border rounded bg-white text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
        </div>

        <div class="form-group">
          <label for="avgWordsPerSentence" class="block mb-2 text-gray-700 dark:text-gray-300">Avg. Words Per Sentence</label>
          <input
            id="avgWordsPerSentence" v-model.number="options.avgWordsPerSentence" type="number" min="3" max="15"
            class="w-full p-2 border rounded bg-white text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
        </div>

        <div class="form-group">
          <label for="avgSentencesPerParagraph" class="block mb-2 text-gray-700 dark:text-gray-300">Avg. Sentences Per Paragraph</label>
          <input
            id="avgSentencesPerParagraph" v-model.number="options.avgSentencesPerParagraph" type="number" min="1"
            max="10" class="w-full p-2 border rounded bg-white text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
        </div>

        <div class="form-group flex items-center">
          <div class="mr-4">
            <input id="startWithLoremIpsum" v-model="options.startWithLoremIpsum" type="checkbox" class="mr-2 dark:accent-blue-500">
            <label for="startWithLoremIpsum" class="text-gray-700 dark:text-gray-300">Start with "Lorem ipsum"</label>
          </div>

          <div>
            <input id="random" v-model="options.random" type="checkbox" class="mr-2 dark:accent-blue-500">
            <label for="random" class="text-gray-700 dark:text-gray-300">Random text</label>
          </div>
        </div>
      </div>
    </div>

    <div class="output p-6 rounded-lg shadow mb-8 bg-white dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4 text-dark dark:text-white">
        Lorem Ipsum Text
      </h2>
      <LoremIpsum
        :p="options.p" :avg-words-per-sentence="options.avgWordsPerSentence"
        :avg-sentences-per-paragraph="options.avgSentencesPerParagraph"
        :start-with-lorem-ipsum="options.startWithLoremIpsum" :random="options.random"
      />
    </div>

    <div class="user-info p-6 rounded-lg shadow mb-8 bg-white dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4 text-dark dark:text-white">
        User Information
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="user-card p-4 border rounded-lg text-center border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-700">
          <Avatar gender="male" class="w-24 h-24 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-800 dark:text-white">
            {{ fullname('male') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            @{{ username() }}
          </p>
        </div>

        <div class="user-card p-4 border rounded-lg text-center border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-700">
          <Avatar gender="female" class="w-24 h-24 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-800 dark:text-white">
            {{ fullname('female') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            @{{ username() }}
          </p>
        </div>

        <div class="user-card p-4 border rounded-lg text-center border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-700">
          <Avatar class="w-24 h-24 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-800 dark:text-white">
            {{ fullname() }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            @{{ username() }}
          </p>
        </div>
      </div>
    </div>

    <div class="code-examples p-6 rounded-lg shadow bg-white dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4 text-dark dark:text-white">
        Usage Examples
      </h2>

      <div class="example mb-6">
        <h3 class="text-lg font-medium mb-2 text-gray-800 dark:text-white">
          Basic Usage
        </h3>
        <pre class="p-4 rounded overflow-x-auto bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
import { LoremIpsum, Avatar } from 'loip'

&lt;LoremIpsum :p="2" /&gt;
        </pre>
      </div>

      <div class="example mb-6">
        <h3 class="text-lg font-medium mb-2 text-gray-800 dark:text-white">
          With Options
        </h3>
        <pre class="p-4 rounded overflow-x-auto bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
&lt;LoremIpsum
  :p="3"
  :avg-words-per-sentence="10"
  :avg-sentences-per-paragraph="5"
  :start-with-lorem-ipsum="true"
  :random="true"
/&gt;
        </pre>
      </div>

      <div class="example">
        <h3 class="text-lg font-medium mb-2 text-gray-800 dark:text-white">
          Using Functions
        </h3>
        <pre class="p-4 rounded overflow-x-auto bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
import { loremIpsum, name, surname, fullname, username } from 'loip'

const paragraphs = loremIpsum({ p: 2 })
const userName = name('male')
const userSurname = surname()
const userFullName = fullname('female')
const userUsername = username()
        </pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s ease;
  background-color: #f5f5f5;
}

html.dark .demo-container {
  background-color: #1a1a1a;
}

.theme-toggle {
  transition: all 0.3s ease;
}
</style>
