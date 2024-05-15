<template>
    <div class="container position-fixed bottom-0 start-50 translate-middle-x" ref="ews">
        <div class="btn-group btn-group-lg " role="group" style="width:100%">
            <button @click="useReset()" type="button" class="btn btn-secondary" id="btn-reset" style="width:20%"
                ref="resetBTNRef">Reset</button>
            <button @click="useFailed()" type="button" class="btn btn-danger" id="btn-fail"
                style="width:20%">Fail</button>
            <button @click="useChecked()" type="button" class="btn btn-success" id="btn-checked" style="width:60%">
                Checked</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCheckListStore } from '@/stores/checklist'
import { onLongPress } from '@vueuse/core'
import { useReset, useResetAll, useFailed, useChecked } from './checkFunctions.js'
const storeChecklist = useCheckListStore()
const resetBTNRef = ref(null)

onMounted(() => {
    onLongPress(
        resetBTNRef.value,
        onLongPressCallbackHook,
        {
            modifiers: {
                prevent: true
            }
        }
    )
})

function onLongPressCallbackHook() {
    console.log("Long press detected")
    useResetAll();
}

</script>