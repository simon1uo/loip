<script setup lang="ts">
import { reactive } from 'vue'
import { fullname, username } from '../utils/lorem-ipsum'
import Avatar from './Avatar.vue'
import LoremIpsum from './LoremIpsum.vue'

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
    <h1 class="text-3xl font-bold mb-6 text-center text-dark">
      Vue Lorem Ipsum
    </h1>
    <p class="text-center mb-8">
      A Vue 3 component for generating placeholder text
    </p>

    <div class="controls bg-gray-100 p-4 rounded-lg mb-8">
      <h2 class="text-xl font-semibold mb-4">
        Options
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label for="paragraphs" class="block mb-2">Paragraphs</label>
          <input
            id="paragraphs" v-model.number="options.p" type="number" min="1" max="10"
            class="w-full p-2 border rounded"
          >
        </div>

        <div class="form-group">
          <label for="avgWordsPerSentence" class="block mb-2">Avg. Words Per Sentence</label>
          <input
            id="avgWordsPerSentence" v-model.number="options.avgWordsPerSentence" type="number" min="3" max="15"
            class="w-full p-2 border rounded"
          >
        </div>

        <div class="form-group">
          <label for="avgSentencesPerParagraph" class="block mb-2">Avg. Sentences Per Paragraph</label>
          <input
            id="avgSentencesPerParagraph" v-model.number="options.avgSentencesPerParagraph" type="number" min="1"
            max="10" class="w-full p-2 border rounded"
          >
        </div>

        <div class="form-group flex items-center">
          <div class="mr-4">
            <input id="startWithLoremIpsum" v-model="options.startWithLoremIpsum" type="checkbox" class="mr-2">
            <label for="startWithLoremIpsum">Start with "Lorem ipsum"</label>
          </div>

          <div>
            <input id="random" v-model="options.random" type="checkbox" class="mr-2">
            <label for="random">Random text</label>
          </div>
        </div>
      </div>
    </div>

    <div class="output bg-white p-6 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4">
        Lorem Ipsum Text
      </h2>
      <LoremIpsum
        :p="options.p" :avg-words-per-sentence="options.avgWordsPerSentence"
        :avg-sentences-per-paragraph="options.avgSentencesPerParagraph"
        :start-with-lorem-ipsum="options.startWithLoremIpsum" :random="options.random"
      />
    </div>

    <div class="user-info bg-white p-6 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4">
        User Information
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="user-card p-4 border rounded-lg text-center">
          <Avatar gender="male" class="w-24 h-24 mx-auto mb-4" />
          <h3 class="text-lg font-medium">
            {{ fullname('male') }}
          </h3>
          <p class="text-gray-600">
            @{{ username() }}
          </p>
        </div>

        <div class="user-card p-4 border rounded-lg text-center">
          <Avatar gender="female" class="w-24 h-24 mx-auto mb-4" />
          <h3 class="text-lg font-medium">
            {{ fullname('female') }}
          </h3>
          <p class="text-gray-600">
            @{{ username() }}
          </p>
        </div>

        <div class="user-card p-4 border rounded-lg text-center">
          <Avatar class="w-24 h-24 mx-auto mb-4" />
          <h3 class="text-lg font-medium">
            {{ fullname() }}
          </h3>
          <p class="text-gray-600">
            @{{ username() }}
          </p>
        </div>
      </div>
    </div>

    <div class="code-examples bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">
        Usage Examples
      </h2>

      <div class="example mb-6">
        <h3 class="text-lg font-medium mb-2">
          Basic Usage
        </h3>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
import { LoremIpsum, Avatar } from 'loip'

&lt;LoremIpsum :p="2" /&gt;
        </pre>
      </div>

      <div class="example mb-6">
        <h3 class="text-lg font-medium mb-2">
          With Options
        </h3>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
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
        <h3 class="text-lg font-medium mb-2">
          Using Functions
        </h3>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
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
}
</style>
