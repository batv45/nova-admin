<script setup lang="ts">
import { mapEntries } from 'radash'

interface Props {
  disabled?: boolean
}

const {
  disabled = false,
} = defineProps<Props>()

interface IconList {
  prefix: string
  icons: string[]
  title: string
  total: number
  categories: Record<string, string[]>
}
const value = defineModel('value', { type: String })

// Including icon library series name
const nameList = ['icon-park-outline', 'carbon']

// Get a single icon database data
async function fetchIconList(name: string): Promise<IconList> {
  return await fetch(`https://api.iconify.design/collection?prefix=${name}`).then(res => res.json())
}

// Get all icon database data
async function fetchIconAllList(nameList: string[]) {
  const namePromises = nameList.map(name => fetchIconList(name))
  const targets = await Promise.all(namePromises)

  return targets.map((i) => {
    i.icons = Object.entries(i.categories).reduce((prev, next) => {
      const [_key, value] = next
      return prev.concat(value)
    }, [] as string[])
    return i
  })
}
// Get SVG file name
function getSvgName(path: string) {
  const regex = /\/([^/]+)\.svg$/
  const match = path.match(regex)
  if (match) {
    const fileName = match[1]
    return fileName
  }
  return path
}

// Get all this icon icon
function generateLocalIconList() {
  const localSvgList = import.meta.glob('@/assets/svg-icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })

  return mapEntries(localSvgList, (key, value) => {
    return [getSvgName(key), value]
  })
}

const iconList = shallowRef<IconList[]>([])
const LocalIconList = shallowRef({})

onMounted(async () => {
  iconList.value = await fetchIconAllList(nameList)
  LocalIconList.value = generateLocalIconList()
})

// Current TAB
const currentTab = shallowRef(0)
// Current tag
const currentTag = shallowRef('')

// Switch tab
function handleChangeTab(index: number) {
  currentTab.value = index
  currentTag.value = ''
}
// Search icon input box value
const searchValue = ref('')

// Current page number
const currentPage = shallowRef(1)

// Select classification tag
function handleSelectIconTag(icon: string) {
  currentTag.value = currentTag.value === icon ? '' : icon
  currentPage.value = 1
}

// Including the current classification or all icon lists
const icons = computed(() => {
  const hasTag = !!currentTag.value
  if (hasTag)
    return iconList.value[currentTab.value]?.categories[currentTag.value]
  else
    return iconList.value[currentTab.value].icons
})

// List of icons that meet the search conditions
const visibleIcons = computed(() => {
  return icons.value?.filter(i => i
    .includes(searchValue.value))?.slice((currentPage.value - 1) * 200, (currentPage.value) * 200)
})

const showModal = ref(false)

// Select icon
function handleSelectIcon(icon: string) {
  value.value = icon
  showModal.value = false
}

// Icon
function clearIcon() {
  value.value = ''
  showModal.value = false
}
</script>

<template>
  <n-input-group disabled>
    <n-button v-if="value" :disabled="disabled" type="primary">
      <template #icon>
        <nova-icon :icon="value" />
      </template>
    </n-button>
    <n-input :value="value" readonly :placeholder="$t('components.iconSelector.inputPlaceholder')" />
    <n-button type="primary" ghost :disabled="disabled" @click="showModal = true">
      {{ $t('common.choose') }}
    </n-button>
  </n-input-group>
  <n-modal
    v-model:show="showModal" preset="card" :title="$t('components.iconSelector.selectorTitle')" size="small" class="w-800px" :bordered="false"
  >
    <template #header-extra>
      <n-button type="warning" size="small" ghost @click="clearIcon">
        {{ $t('components.iconSelector.clearIcon') }}
      </n-button>
    </template>

    <n-tabs :value="currentTab" type="line" animated placement="left" @update:value="handleChangeTab">
      <n-tab-pane name="local" tab="local">
        <n-flex :size="2">
          <n-el
            v-for="(_icon, key) in LocalIconList" :key="key"
            class="hover:(text-[var(--primary-color)] ring-1) ring-[var(--primary-color)] p-1 rounded flex-center"
            :title="`local:${key}`"
            @click="handleSelectIcon(`local:${key}`)"
          >
            <nova-icon :icon="`local:${key}`" :size="24" />
          </n-el>
        </n-flex>
      </n-tab-pane>
      <n-tab-pane v-for="(list, index) in iconList" :key="list.prefix" :name="index" :tab="list.title">
        <n-flex vertical>
          <n-flex size="small">
            <n-tag
              v-for="(_v, k) in list.categories" :key="k"
              :checked="currentTag === k" round checkable size="small"
              @update:checked="handleSelectIconTag(k)"
            >
              {{ k }}
            </n-tag>
          </n-flex>

          <n-input
            v-model:value="searchValue" type="text" clearable
            :placeholder="$t('components.iconSelector.searchPlaceholder')"
          />

          <div>
            <n-flex :size="2">
              <n-el
                v-for="(icon) in visibleIcons" :key="icon"
                class="hover:(text-[var(--primary-color)] ring-1) ring-[var(--primary-color)] p-1 rounded flex-center"
                :title="`${list.prefix}:${icon}`"
                @click="handleSelectIcon(`${list.prefix}:${icon}`)"
              >
                <nova-icon :icon="`${list.prefix}:${icon}`" :size="24" />
              </n-el>
              <n-empty v-if="visibleIcons.length === 0" class="w-full" />
            </n-flex>
          </div>

          <n-flex justify="center">
            <n-pagination
              v-model:page="currentPage"
              :item-count="icons?.length"
              :page-size="200"
            />
          </n-flex>
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>
