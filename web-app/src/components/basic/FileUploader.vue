<template>
    <div class="file-uploader">
        <label class="text-center text-[#354665] font-semibold text-lg">
            {{ label }} <span v-if="requiredLabel" class="text-red-500">*</span>
        </label>
        <q-uploader 
            ref="uploaderRef" 
            :multiple="multiple" 
            :accept="acceptedFileTypes" 
            :max-file-size="maxSizeBytes"
            color="white" 
            flat 
            :auto-expand="true" 
            @added="onFileAdded" 
            @removed="onFileRemoved"
            @rejected="onFileRejected" 
            class="full-width mt-2"
        >
            <template v-slot:header>
                <div class="flex justify-center bg-white border border-dashed  border-slate-400  p-3 h-32 text-center rounded-3xl">
                    <div class="flex flex-col items-center justify-center gap-2">

                        <q-icon class="text-dark" size="lg">
                            <img src="~assets/icons/upload.svg" />
                        </q-icon>

                        <div class="flex flex-col">
                            <div class="text-md font-meduim text-black">
                                {{ dropzoneText }}
                            </div>
                            <div class="text-gray-400 text-subtitle2">
                                {{ formatText }}
                            </div>
                        </div>
                    </div>
                    <q-uploader-add-trigger />
                </div>
            </template>
        </q-uploader>

        <div v-if="uploadError" class="text-negative q-mt-md">
            {{ uploadError }}
        </div>

        <div v-if="errorMessage" class="text-negative q-mt-md">
            {{ errorMessage }}
        </div>

        <q-inner-loading :showing="isUploading">
            <q-spinner-oval size="5em" color="primary" />
            <div class="text-body1 text-bold q-pa-md">Uploading...</div>
        </q-inner-loading>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Notify, QUploader } from 'quasar'

// Define the shape of file-related configuration
interface FileConfig {
    // File type configuration
    fileTypes?: string[] | ((file: File) => boolean)
    // Optional pre-upload validation
    validator?: (file: File) => boolean | string
}

const props = withDefaults(defineProps<{
    // Basic upload configuration
    multiple?: boolean
    maxSizeBytes?: number
    maxSizePretty?: string

    // Customization texts
    label?: string
    requiredLabel?: boolean
    dropzoneText?: string
    formatText?: string
    hintText?: string
    uploadButtonText?: string

    // File configuration
    fileConfig?: FileConfig

    // Upload handler
    uploadHandler: (files: File[]) => Promise<{
        success: boolean
        successCount?: number
        errorCount?: number
        errorDetails?: string
        [key: string]: any
    }>

    errorMessage?: string
    modelValue?: File | null
}>(), {
    multiple: false,
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    maxSizePretty: '10 MB',
    dropzoneText: 'Drag and drop your files here',
    uploadButtonText: 'Upload',
    label: 'Upload File',
    requiredLabel: false,
    fileConfig: () => ({}),
    errorMessage: '',
    modelValue: null
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: File | null): void
    (e: 'upload-success', payload: any): void
    (e: 'upload-error', error: string): void
}>()

const uploaderRef = ref<QUploader | null>(null)
const isUploading = ref(false)
const uploadError = ref('')

// Compute accepted file types based on configuration
const acceptedFileTypes = computed(() => {
    if (!props.fileConfig?.fileTypes) return '*/*'

    const types = props.fileConfig.fileTypes
    if (Array.isArray(types)) {
        return types.join(',')
    }

    return '*/*'
})

const canUpload = computed(() =>
    uploaderRef.value?.canUpload ?? false
)

function onFileAdded(files: File[]) {
    console.debug('Files added', files)
    uploadError.value = ''

    // Custom file validation if provided
    if (props.fileConfig?.fileTypes) {
        const isValid = files.every(file => {
            const types = props.fileConfig.fileTypes

            if (Array.isArray(types)) {
                // Check file extension
                return types.some(type =>
                    file.name.toLowerCase().endsWith(type.toLowerCase())
                )
            } else if (typeof types === 'function') {
                // Custom validation function
                return types(file)
            }

            return true
        })

        if (!isValid) {
            uploadError.value = 'Invalid file type'
            uploaderRef.value?.removeQueuedFiles()
            return
        }
    }

    // Additional custom validator
    if (props.fileConfig?.validator) {
        const validationResult = files.every(file => {
            const result = props.fileConfig.validator(file)
            if (result === false) return false
            if (typeof result === 'string') {
                uploadError.value = result
                return false
            }
            return true
        })

        if (!validationResult) {
            uploaderRef.value?.removeQueuedFiles()
            return
        }
    }

    emit('update:modelValue', files[0])
}

function onFileRemoved(files: File[]) {
    console.debug('Files removed', files)
    emit('update:modelValue', null)
}

function onFileRejected(rejectedFiles: any[]) {
    const reasons = rejectedFiles.map(file => file.failedPropValidation)
    uploadError.value = reasons.join(', ')

    Notify.create({
        message: `File upload failed: ${uploadError.value}`,
        color: 'negative',
        position: 'top-right'
    })
}

async function triggerUpload() {
    if (!uploaderRef.value?.files?.length) return

    isUploading.value = true
    uploadError.value = ''

    // try {
    //     const result = await props.uploadHandler(uploaderRef.value.files)

    //     if (result.success) {
    //         emit('upload-success', result)
    //         Notify.create({
    //             message: 'File uploaded successfully',
    //             color: 'positive',
    //             position: 'top-right'
    //         })
    //     } else {
    //         const errorMsg = result.errorDetails || 'Upload failed'
    //         uploadError.value = errorMsg
    //         emit('upload-error', errorMsg)

    //         Notify.create({
    //             message: errorMsg,
    //             color: 'negative',
    //             position: 'top-right'
    //         })
    //     }
    // } catch (error) {
    //     const errorMsg = error instanceof Error ? error.message : 'Upload failed'
    //     uploadError.value = errorMsg
    //     emit('upload-error', errorMsg)

    //     Notify.create({
    //         message: errorMsg,
    //         color: 'negative',
    //         position: 'top-right'
    //     })
    // } finally {
    //     isUploading.value = false
    //     uploaderRef.value?.removeQueuedFiles()
    // }
}

// Watch for changes in modelValue and update the uploader accordingly
watch(() => props.modelValue, (newValue) => {
    if (!newValue) {
        uploaderRef.value?.removeQueuedFiles()
    }
})

// Expose methods
defineExpose({
    triggerUpload
})
</script>

<style scoped>
    .file-uploader{
        border-radius: 30px;
    }
    ::v-deep(.q-uploader__list) {
        min-height: 0px !important;
        padding: 0
    }
</style>