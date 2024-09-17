<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import CopyText from '@/components/custom/CopyText.vue'
import { Gender } from '@/constants'
import { useBoolean } from '@/hooks'
import { fetchUserPage } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
}
const model = ref({ ...initialModel })
function handleResetSearch() {
  model.value = { ...initialModel }
}

const formRef = ref<FormInst | null>()
const modalRef = ref()

function delteteUser(id: number) {
  window.$message.success(`Delete user ID:${id}`)
}

const columns: DataTableColumns<Entity.User> = [
  {
    title: 'Name',
    align: 'center',
    key: 'userName',
  },
  {
    title: 'gender',
    align: 'center',
    key: 'gender',
    render: (row) => {
      const tagType = {
        0: 'primary',
        1: 'success',
      } as const
      if (row.gender) {
        return (
          <NTag type={tagType[row.gender]}>
            {Gender[row.gender]}
          </NTag>
        )
      }
    },
  },
  {
    title: 'Mail',
    align: 'center',
    key: 'email',
  },
  {
    title: 'Contact information',
    align: 'center',
    key: 'tel',
    render: (row) => {
      return (
        <CopyText value={row.tel} />
      )
    },
  },
  {
    title: 'state',
    align: 'center',
    key: 'status',
    render: (row) => {
      return (
        <NSwitch
          value={row.status}
          checked-value={1}
          unchecked-value={0}
          onUpdateValue={(value: 0 | 1) =>
            handleUpdateDisabled(value, row.id!)}
        >
          {{ checked: () => 'Open up', unchecked: () => 'Disable' }}
        </NSwitch>
      )
    },
  },
  {
    title: 'operate',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => modalRef.value.openModal('edit', row)}
          >
            edit
          </NButton>
          <NPopconfirm onPositiveClick={() => delteteUser(row.id!)}>
            {{
              default: () => 'Confirm delete',
              trigger: () => <NButton size="small" type="error">delete</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const count = ref(0)
const listData = ref<Entity.User[]>([])
function handleUpdateDisabled(value: 0 | 1, id: number) {
  const index = listData.value.findIndex(item => item.id === id)
  if (index > -1)
    listData.value[index].status = value
}

async function getUserList() {
  startLoading()
  await fetchUserPage().then((res: any) => {
    listData.value = res.data.list
    count.value = res.data.count
    endLoading()
  })
}

onMounted(() => {
  getUserList()
})

function changePage(page: number, size: number) {
  window.$message.success(`Pagothe:${page},${size}`)
}

const treeData = ref([
  {
    id: '1',
    label: 'Anhui Corporation',
    children: [
      {
        id: '2',
        label: 'Hefei Branch',
        children: [
          {
            id: '4',
            label: 'Financial department',
          },
          {
            id: '5',
            label: 'Procurement department',
          },
        ],
      },
      {
        id: '3',
        label: 'Wuhu Branch',
      },
    ],
  },
])
</script>

<template>
  <n-flex>
    <n-card class="w-70">
      <n-tree
        block-line
        :data="treeData"
        key-field="id"
      />
    </n-card>

    <NSpace vertical class="flex-1">
      <n-card>
        <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
          <n-flex>
            <n-form-item label="Name" path="condition_1">
              <n-input v-model:value="model.condition_1" placeholder="Please enter" />
            </n-form-item>
            <n-form-item label="gender" path="condition_2">
              <n-input v-model:value="model.condition_2" placeholder="Please enter" />
            </n-form-item>
            <n-flex class="ml-auto">
              <NButton type="primary" @click="getUserList">
                <template #icon>
                  <icon-park-outline-search />
                </template>
                Search
              </NButton>
              <NButton strong secondary @click="handleResetSearch">
                <template #icon>
                  <icon-park-outline-redo />
                </template>
                Repossess
              </NButton>
            </n-flex>
          </n-flex>
        </n-form>
      </n-card>

      <n-card class="flex-1">
        <template #header>
          <NButton type="primary" @click="modalRef.openModal('add')">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            New user
          </NButton>
        </template>
        <NSpace vertical>
          <n-data-table :columns="columns" :data="listData" :loading="loading" />
          <Pagination :count="count" @change="changePage" />
        </NSpace>

        <TableModal ref="modalRef" modal-name="user" />
      </n-card>
    </NSpace>
  </n-flex>
</template>
