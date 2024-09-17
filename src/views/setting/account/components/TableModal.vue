<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { fetchRoleList } from '@/service'

interface Props {
  modalName?: string
}

const {
  modalName = '',
} = defineProps<Props>()

const emit = defineEmits<{
  open: []
  close: []
}>()

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const formDefault: Entity.User = {
  userName: '',
  email: '',
  tel: '',
  role: [],
  status: 1,
}
const formModel = ref<Entity.User>({ ...formDefault })

type ModalType = 'add' | 'view' | 'edit'
const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: 'Add to',
    view: 'Check',
    edit: 'edit',
  }
  return `${titleMap[modalType.value]}${modalName}`
})

async function openModal(type: ModalType = 'add', data: any) {
  emit('open')
  modalType.value = type
  showModal()
  getRoleList()
  const handlers = {
    async add() {
      formModel.value = { ...formDefault }
    },
    async view() {
      if (!data)
        return
      formModel.value = { ...data }
    },
    async edit() {
      if (!data)
        return
      formModel.value = { ...data }
    },
  }
  await handlers[type]()
}

function closeModal() {
  hiddenModal()
  endLoading()
  emit('close')
}

defineExpose({
  openModal,
})

const formRef = ref()
async function submitModal() {
  const handlers = {
    async add() {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.$message.success('Simulation new success')
          resolve(true)
        }, 2000)
      })
    },
    async edit() {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.$message.success('Simulation edit')
          resolve(true)
        }, 2000)
      })
    },
    async view() {
      return true
    },
  }
  await formRef.value?.validate()
  startLoading()
  await handlers[modalType.value]() && closeModal()
}

const rules = {
  userName: {
    required: true,
    message: 'Please enter the user name',
    trigger: 'blur',
  },
}

const options = ref()
async function getRoleList() {
  const { data } = await fetchRoleList()
  options.value = data
}
</script>

<template>
  <n-modal
    v-model:show="modalVisible" :mask-closable="false" preset="card" :title="modalTitle" class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form
      ref="formRef" :rules="rules" label-placement="left" :model="formModel" :label-width="100"
      :disabled="modalType === 'view'"
    >
      <n-grid :cols="2" :x-gap="18">
        <n-form-item-grid-item :span="1" label="username" path="userName">
          <n-input v-model:value="formModel.userName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="gender" path="gender">
          <n-radio-group v-model:value="formModel.gender">
            <n-space>
              <n-radio :value="1">
                {{ $t('male') }}
              </n-radio>
              <n-radio :value="0">
                {{ $t('female') }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="Mail" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="Contact information" path="tel">
          <n-input v-model:value="formModel.tel" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" label="Role" path="role">
          <n-select
            v-model:value="formModel.role" multiple filterable label-field="role" value-field="id"
            :options="options"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" label="Remark" path="remark">
          <n-input v-model:value="formModel.remark" type="textarea" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="User status" path="status">
          <n-switch v-model:value="formModel.status" :checked-value="1" :unchecked-value="0">
            <template #checked>
              Open up
            </template>
            <template #unchecked>
              Disable
            </template>
          </n-switch>
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal">
          Cancel
        </n-button>
        <n-button type="primary" :loading="submitLoading" @click="submitModal">
          submit
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
