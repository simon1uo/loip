<script setup lang="ts">
import type { Gender, Language, LoremIpsumOptions } from '../types/lorem-ipsum'
import { useDark, useToggle } from '@vueuse/core'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  avatarComponent,
  loremIpsumBasic,
  loremIpsumFunction,
  loremIpsumWithOptions,
  nameFunctions,
  usernameAndAvatarUrl,
} from '../utils/code-examples'
import { fullname, loremIpsum, username } from '../utils/lorem-ipsum'
import Avatar from './Avatar.vue'
import CodeBlock from './CodeBlock.vue'
import LoremIpsum from './LoremIpsum.vue'

// Setup i18n
const { t, locale } = useI18n()

// Use VueUse's useDark hook to detect and toggle dark mode
const isDark = useDark()
const toggleDark = useToggle(isDark)

// Compute theme for code blocks based on dark mode
const codeBlockTheme = computed(() => isDark.value ? 'dark' : 'light')

// Tab management
const activeTab = ref('lorem-ipsum')
function setActiveTab(tab: string) {
  activeTab.value = tab
}

// Lorem Ipsum options
const options = reactive({
  p: 2,
  avgWordsPerSentence: 8,
  avgSentencesPerParagraph: 6,
  startWithLoremIpsum: true,
  random: true,
})

// Compute formatted Lorem Ipsum text for CodeBlock
const loremIpsumText = computed(() => {
  const loremOptions: LoremIpsumOptions = {
    p: options.p,
    avgWordsPerSentence: options.avgWordsPerSentence,
    avgSentencesPerParagraph: options.avgSentencesPerParagraph,
    startWithLoremIpsum: options.startWithLoremIpsum,
    random: options.random,
  }

  // Get paragraphs from loremIpsum function
  const paragraphs = loremIpsum(loremOptions)

  // Join paragraphs with double line breaks for better readability
  return paragraphs.join('\n\n')
})

// Language selection for user data
const selectedLanguage = ref<Language>('en')

// Watch for i18n locale changes and update selectedLanguage
watch(locale, (newLocale) => {
  selectedLanguage.value = newLocale as Language
  shuffleUsers()
})

// User data for random user tab
const userData = reactive({
  maleUser: {
    fullname: fullname('male', selectedLanguage.value),
    username: username(selectedLanguage.value),
    avatarKey: Math.floor(Math.random() * 99) + 1,
  },
  femaleUser: {
    fullname: fullname('female', selectedLanguage.value),
    username: username(selectedLanguage.value),
    avatarKey: Math.floor(Math.random() * 99) + 1,
  },
  randomUser1: {
    fullname: fullname('all', selectedLanguage.value),
    username: username(selectedLanguage.value),
    avatarKey: Math.floor(Math.random() * 99) + 1,
    gender: Math.random() > 0.5 ? 'male' : 'female' as const,
  },
  randomUser2: {
    fullname: fullname('all', selectedLanguage.value),
    username: username(selectedLanguage.value),
    avatarKey: Math.floor(Math.random() * 99) + 1,
    gender: Math.random() > 0.5 ? 'male' : 'female' as const,
  },
})

// Reset options to default for Lorem Ipsum tab
function resetToDefaultProps() {
  options.p = 2
  options.avgWordsPerSentence = 8
  options.avgSentencesPerParagraph = 6
  options.startWithLoremIpsum = true
  options.random = true
  // The component will automatically refresh when props change
}

// Force refresh of the Lorem Ipsum text
function forceRefresh() {
  // This function is called when the random checkbox is toggled or refresh button is clicked
  // Toggle random to force a refresh
  options.random = !options.random
  setTimeout(() => {
    options.random = !options.random
  })
}

// No need for toggleLanguage function anymore since we're using v-model with select

// Shuffle users to get new random data
function shuffleUsers() {
  userData.maleUser.fullname = fullname('male', selectedLanguage.value)
  userData.maleUser.username = username(selectedLanguage.value)
  userData.maleUser.avatarKey = Math.floor(Math.random() * 99) + 1

  userData.femaleUser.fullname = fullname('female', selectedLanguage.value)
  userData.femaleUser.username = username(selectedLanguage.value)
  userData.femaleUser.avatarKey = Math.floor(Math.random() * 99) + 1

  userData.randomUser1.fullname = fullname('all', selectedLanguage.value)
  userData.randomUser1.username = username(selectedLanguage.value)
  userData.randomUser1.avatarKey = Math.floor(Math.random() * 99) + 1
  userData.randomUser1.gender = Math.random() > 0.5 ? 'male' : 'female' as const

  userData.randomUser2.fullname = fullname('all', selectedLanguage.value)
  userData.randomUser2.username = username(selectedLanguage.value)
  userData.randomUser2.avatarKey = Math.floor(Math.random() * 99) + 1
  userData.randomUser2.gender = Math.random() > 0.5 ? 'male' : 'female' as const
}
</script>

<template>
  <div
    class="demo-container max-w-full p-2 font-sans sm:mx-auto lg:max-w-4xl md:max-w-3xl sm:max-w-2xl md:p-6 sm:p-4 xs:p-3"
  >
    <div class="mb-3 flex flex-row items-center justify-between gap-3 sm:mb-6 xs:mb-4 sm:gap-0">
      <h1 class="text-center text-2xl text-dark font-bold sm:text-3xl dark:text-white">
        {{ t('app.title') }}
      </h1>
      <div class="flex gap-2">
        <!-- Language select dropdown -->
        <div class="language-select-container relative h-10 flex items-center">
          <select
            v-model="locale"
            class="language-select h-10 appearance-none rounded-lg bg-gray-200 pl-3 pr-8 text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select language"
          >
            <option value="en">
              {{ t('languages.en') }}
            </option>
            <option value="zh">
              {{ t('languages.zh') }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <div class="i-lucide-globe text-lg text-black dark:text-white" />
          </div>
        </div>
        <!-- Theme toggle button -->
        <button
          class="theme-toggle h-10 w-10 flex items-center justify-center rounded-lg bg-gray-200 p-2 text-black dark:bg-gray-700 dark:text-white"
          aria-label="Toggle dark mode" @click="toggleDark()"
        >
          <div v-if="isDark" class="i-lucide-sun text-lg" />
          <div v-else class="i-lucide-moon text-lg" />
        </button>

        <a href="https://github.com/simon1uo/loip" target="_blank">
          <button
            class="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-200 p-2 text-black dark:bg-gray-700 dark:text-white"
          >
            <div class="i-lucide-github" />
          </button>
        </a>
      </div>
    </div>
    <p class="mb-4 text-center text-sm text-gray-700 sm:mb-8 xs:mb-5 sm:text-base dark:text-gray-300">
      {{ t('app.description') }}
    </p>

    <!-- Tab Navigation -->
    <div class="tab-navigation mb-4 flex">
      <button
        class="tab-button flex-1 px-4 py-3 text-center font-medium transition-colors duration-200" :class="{
          'bg-blue-600 text-white': activeTab === 'lorem-ipsum',
          'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300': activeTab !== 'lorem-ipsum',
        }" @click="setActiveTab('lorem-ipsum')"
      >
        {{ t('tabs.loremIpsum') }}
      </button>
      <button
        class="tab-button flex-1 px-4 py-3 text-center font-medium transition-colors duration-200" :class="{
          'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300': activeTab !== 'random-user',
          'bg-blue-600 text-white': activeTab === 'random-user',
        }" @click="setActiveTab('random-user')"
      >
        {{ t('tabs.randomUser') }}
      </button>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab === 'lorem-ipsum'">
      <div class="controls mb-4 rounded-lg bg-gray-100 p-2 sm:mb-8 xs:mb-5 dark:bg-gray-800 sm:p-4 xs:p-3">
        <div class="mb-2 flex items-center justify-between sm:mb-4 xs:mb-3">
          <h2 class="mb-0 text-lg text-dark font-semibold sm:text-xl dark:text-white">
            {{ t('loremIpsum.options') }}
          </h2>
          <button
            class="refresh-button rounded-lg bg-blue-500 px-4 py-2 text-white dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
            @click="forceRefresh"
          >
            <span class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {{ t('loremIpsum.refresh') }}
            </span>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 xs:gap-3">
          <div class="form-group">
            <label for="paragraphs" class="mb-1 block text-sm text-gray-700 sm:mb-2 sm:text-base dark:text-gray-300">{{
              t('loremIpsum.paragraphs') }}</label>
            <input
              id="paragraphs" v-model.number="options.p" type="number" min="1" max="10"
              class="w-full border border-gray-300 rounded bg-white p-1.5 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 sm:p-2 sm:text-base dark:text-white"
            >
          </div>

          <div class="form-group">
            <label
              for="avgWordsPerSentence"
              class="mb-1 block text-sm text-gray-700 sm:mb-2 sm:text-base dark:text-gray-300"
            >{{
              t('loremIpsum.wordsPerSentence') }}</label>
            <input
              id="avgWordsPerSentence" v-model.number="options.avgWordsPerSentence" type="number" min="3" max="15"
              class="w-full border border-gray-300 rounded bg-white p-1.5 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 sm:p-2 sm:text-base dark:text-white"
            >
          </div>

          <div class="form-group">
            <label
              for="avgSentencesPerParagraph"
              class="mb-1 block text-sm text-gray-700 sm:mb-2 sm:text-base dark:text-gray-300"
            >{{
              t('loremIpsum.sentencesPerParagraph') }}</label>
            <input
              id="avgSentencesPerParagraph" v-model.number="options.avgSentencesPerParagraph" type="number" min="1"
              max="10"
              class="w-full border border-gray-300 rounded bg-white p-1.5 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 sm:p-2 sm:text-base dark:text-white"
            >
          </div>

          <div class="form-group flex flex-col gap-2 xs:flex-row xs:items-center">
            <div class="mr-0 xs:mr-4">
              <input
                id="startWithLoremIpsum" v-model="options.startWithLoremIpsum" type="checkbox"
                class="mr-1.5 xs:mr-2 dark:accent-blue-500"
              >
              <label for="startWithLoremIpsum" class="text-sm text-gray-700 xs:text-base dark:text-gray-300">{{
                t('loremIpsum.startWithLoremIpsum') }}</label>
            </div>

            <div>
              <input
                id="random" v-model="options.random" type="checkbox" class="mr-1.5 xs:mr-2 dark:accent-blue-500"
                @change="forceRefresh"
              >
              <label for="random" class="text-sm text-gray-700 xs:text-base dark:text-gray-300">{{
                t('loremIpsum.random') }}</label>
            </div>
          </div>

          <div class="form-group mt-4">
            <button
              class="reset-button w-full rounded-lg bg-blue-400 px-4 py-2 text-white dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700"
              @click="resetToDefaultProps"
            >
              {{ t('loremIpsum.resetToDefault') }}
            </button>
          </div>
        </div>
      </div>

      <div class="output mb-4 rounded-lg bg-white p-2 shadow sm:mb-8 xs:mb-5 dark:bg-gray-800 md:p-6 sm:p-4 xs:p-3">
        <h2 class="mb-2 text-lg text-dark font-semibold sm:mb-4 xs:mb-3 sm:text-xl dark:text-white">
          {{ t('loremIpsum.output') }}
        </h2>
        <!-- Hidden LoremIpsum component to maintain reactivity -->
        <div class="hidden">
          <LoremIpsum
            :p="options.p" :avg-words-per-sentence="options.avgWordsPerSentence"
            :avg-sentences-per-paragraph="options.avgSentencesPerParagraph"
            :start-with-lorem-ipsum="options.startWithLoremIpsum" :random="options.random"
          />
        </div>
        <!-- Display the Lorem Ipsum text using CodeBlock for copy functionality -->
        <CodeBlock
          :code="loremIpsumText" :theme="codeBlockTheme" :line-numbers="false" lang="text"
          class="lorem-ipsum-code-block"
        />
      </div>
    </div>

    <div v-if="activeTab === 'random-user'">
      <div class="controls mb-4 rounded-lg bg-gray-100 p-2 sm:mb-8 xs:mb-5 dark:bg-gray-800 sm:p-4 xs:p-3">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="mb-0 text-lg text-dark font-semibold sm:mb-0 xs:mb-0 sm:text-xl dark:text-white">
            {{ t('randomUser.title') }}
          </h2>
          <div class="flex gap-2">
            <div class="language-select-container relative h-10 flex items-center">
              <select
                v-model="selectedLanguage"
                class="language-select h-10 appearance-none rounded-lg bg-gray-200 pl-3 pr-8 text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select language" @change="shuffleUsers()"
              >
                <option value="en">
                  {{ t('languages.en') }}
                </option>
                <option value="zh">
                  {{ t('languages.zh') }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <div class="i-lucide-globe text-lg" />
              </div>
            </div>
            <button
              class="shuffle-button rounded-lg bg-blue-500 px-4 py-2 text-white dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
              @click="shuffleUsers"
            >
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {{ t('randomUser.shuffle') }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="user-info mb-4 rounded-lg bg-white p-2 shadow sm:mb-8 xs:mb-5 dark:bg-gray-800 md:p-6 sm:p-4 xs:p-3">
        <h2 class="mb-2 text-lg text-dark font-semibold sm:mb-4 xs:mb-3 sm:text-xl dark:text-white">
          Random User
        </h2>

        <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 sm:grid-cols-2 sm:gap-6 xs:gap-3">
          <div
            class="user-card border border-gray-200 rounded-lg bg-white p-2 text-center dark:border-gray-700 dark:bg-gray-700 sm:p-4 xs:p-3"
          >
            <Avatar
              :key="userData.maleUser.avatarKey" gender="male" :language="selectedLanguage"
              class="mx-auto mb-2 h-12 w-12 sm:mb-4 xs:mb-3 md:h-24 md:w-24 sm:h-20 sm:w-20 xs:h-16 xs:w-16"
            />
            <h3 class="text-base text-gray-800 font-medium sm:text-lg dark:text-white">
              {{ userData.maleUser.fullname }}
            </h3>
            <p class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
              @{{ userData.maleUser.username }}
            </p>
          </div>

          <div
            class="user-card border border-gray-200 rounded-lg bg-white p-2 text-center dark:border-gray-700 dark:bg-gray-700 sm:p-4 xs:p-3"
          >
            <Avatar
              :key="userData.femaleUser.avatarKey" gender="female" :language="selectedLanguage"
              class="mx-auto mb-2 h-12 w-12 sm:mb-4 xs:mb-3 md:h-24 md:w-24 sm:h-20 sm:w-20 xs:h-16 xs:w-16"
            />
            <h3 class="text-base text-gray-800 font-medium sm:text-lg dark:text-white">
              {{ userData.femaleUser.fullname }}
            </h3>
            <p class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
              @{{ userData.femaleUser.username }}
            </p>
          </div>

          <div
            class="user-card border border-gray-200 rounded-lg bg-white p-2 text-center dark:border-gray-700 dark:bg-gray-700 sm:p-4 xs:p-3"
          >
            <Avatar
              :key="userData.randomUser1.avatarKey" :gender="userData.randomUser1.gender as Gender"
              :language="selectedLanguage"
              class="mx-auto mb-2 h-12 w-12 sm:mb-4 xs:mb-3 md:h-24 md:w-24 sm:h-20 sm:w-20 xs:h-16 xs:w-16"
            />
            <h3 class="text-base text-gray-800 font-medium sm:text-lg dark:text-white">
              {{ userData.randomUser1.fullname }}
            </h3>
            <p class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
              @{{ userData.randomUser1.username }}
            </p>
          </div>

          <div
            class="user-card border border-gray-200 rounded-lg bg-white p-2 text-center dark:border-gray-700 dark:bg-gray-700 sm:p-4 xs:p-3"
          >
            <Avatar
              :key="userData.randomUser2.avatarKey" :gender="userData.randomUser2.gender as Gender"
              :language="selectedLanguage"
              class="mx-auto mb-2 h-12 w-12 sm:mb-4 xs:mb-3 md:h-24 md:w-24 sm:h-20 sm:w-20 xs:h-16 xs:w-16"
            />
            <h3 class="text-base text-gray-800 font-medium sm:text-lg dark:text-white">
              {{ userData.randomUser2.fullname }}
            </h3>
            <p class="text-sm text-gray-600 sm:text-base dark:text-gray-300">
              @{{ userData.randomUser2.username }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="code-examples rounded-lg bg-white p-2 shadow dark:bg-gray-800 sm:p-6 xs:p-3">
      <h2 class="mb-3 text-lg text-dark font-semibold xs:mb-4 xs:text-xl dark:text-white">
        {{ t('codeExamples.title') }}
      </h2>

      <!-- Lorem Ipsum Tab Examples -->
      <div v-if="activeTab === 'lorem-ipsum'">
        <div class="example mb-4 sm:mb-6 xs:mb-5">
          <h3 class="mb-1 text-base text-gray-800 font-medium xs:mb-2 xs:text-lg dark:text-white">
            {{ t('codeExamples.basicUsage') }}
          </h3>
          <CodeBlock :theme="codeBlockTheme" lang="javascript" :code="loremIpsumBasic" />
        </div>

        <div class="example mb-4 sm:mb-6 xs:mb-5">
          <h3 class="mb-1 text-base text-gray-800 font-medium xs:mb-2 xs:text-lg dark:text-white">
            {{ t('codeExamples.withOptions') }}
          </h3>
          <CodeBlock :theme="codeBlockTheme" lang="vue" :code="loremIpsumWithOptions" />
        </div>

        <div class="example">
          <h3 class="mb-1 text-base text-gray-800 font-medium xs:mb-2 xs:text-lg dark:text-white">
            {{ t('codeExamples.function') }}
          </h3>
          <CodeBlock :theme="codeBlockTheme" lang="javascript" :code="loremIpsumFunction" />
        </div>
      </div>

      <!-- Random User Tab Examples -->
      <div v-if="activeTab === 'random-user'">
        <div class="example mb-4 sm:mb-6 xs:mb-5">
          <h3 class="mb-1 text-base text-gray-800 font-medium xs:mb-2 xs:text-lg dark:text-white">
            {{ t('codeExamples.avatar') }}
          </h3>
          <CodeBlock :theme="codeBlockTheme" lang="vue" :code="avatarComponent" />
        </div>

        <div class="example mb-4 sm:mb-6 xs:mb-5">
          <h3 class="mb-1 text-base text-gray-800 font-medium xs:mb-2 xs:text-lg dark:text-white">
            {{ t('codeExamples.names') }}
          </h3>
          <CodeBlock :theme="codeBlockTheme" lang="javascript" :code="nameFunctions" />
        </div>

        <div class="example">
          <h3 class="mb-1 text-base text-gray-800 font-medium xs:mb-2 xs:text-lg dark:text-white">
            {{ t('codeExamples.usernameAndAvatar') }}
          </h3>
          <CodeBlock :theme="codeBlockTheme" lang="javascript" :code="usernameAndAvatarUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  transition: all 0.3s ease;
  min-height: 100vh;
  width: 100%;
}

.theme-toggle,
.language-select {
  transition: all 0.3s ease;
}

.language-select {
  min-width: 100px;
}

.tab-button {
  border-radius: 0;
  transition: all 0.3s ease;
}

.tab-button:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.tab-button:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

/* Custom styles for Lorem Ipsum CodeBlock to enable text wrapping */
.lorem-ipsum-code-block :deep(.shiki) {
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
}

.lorem-ipsum-code-block :deep(code) {
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
}

/* Add responsive breakpoint styles */
@media (max-width: 640px) {
  .demo-container {
    padding: 0.75rem;
    width: 100%;
    max-width: 100%;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .demo-container {
    padding: 0.5rem;
    width: 100%;
    max-width: 100%;
    margin: 0;
  }
}

/* Extra small screen styles */
@media (max-width: 375px) {
  .demo-container {
    padding: 0.25rem;
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  pre {
    font-size: 0.7rem;
    padding: 0.5rem;
  }

  .user-card {
    padding: 0.5rem;
  }

  .example {
    margin-bottom: 0.75rem;
  }

  .form-group {
    margin-bottom: 0.5rem;
  }

  input[type="number"] {
    padding: 0.25rem 0.5rem;
  }

  label {
    margin-bottom: 0.25rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1rem;
  }
}
</style>
