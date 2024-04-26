<template>
    <div class="container position-absolute bottom-0 start-50 translate-middle-x" ref="ews">
        <div class="btn-group btn-group-lg " role="group" style="width:100%">
            <button @click="reset()" type="button" class="btn btn-secondary" id="btn-reset"
                style="width:20%">Reset</button>
            <button type="button" class="btn btn-danger" id="btn-fail" style="width:20%">Fail</button>
            <button type="button" class="btn btn-warning" id="btn-warning" style="width:20%">Warning</button>
            <button @click="checked()" type="button" class="btn btn-success" id="btn-checked"
                style="width:40%">Checked</button>
        </div>
    </div>
</template>

<script setup>
import { useCheckListStore } from '@/stores/checklist'
const storeChecklist = useCheckListStore()

function reset() {
    console.log(storeChecklist.count)
}

function checked() {
    console.log(storeChecklist.count)
}

</script>