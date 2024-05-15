<template>
    <h2 :id="`heading${name}`" class="accordion-header">
        <div v-bind:data-bs-target="`#collapse${checklist.id}`" v-bind:aria-controls="`collapse${checklist.id}`"
            class="accordion-button" :class="{ collapsed: !checklist.active, show: !checklist.active }" type="button"
            data-bs-toggle="collapse" aria-expanded="true">
            <!-- <input type="checkbox" v-model="allChecked" class="form-check-input me-2" @click=toggleAll() /> -->

            {{ checklist.id }} # {{ checklist.name }} [{{ checklist.progress }}/{{ checklist.totalChecks }}]

        </div>
        <div class="progress" role="progressbar" aria-label="Example 2px high" :aria-valuenow="`${progress}`"
            aria-valuemin="0" aria-valuemax="100" style="height: 2px">
            <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
    </h2>
    <div :id="`collapse${checklist.id}`" v-bind:aria-labelledby="`heading${checklist.id}`"
        class="accordion-collapse collapse" :class="{ show: checklist.active }" data-bs-parent="#checkListsAccordion">
        <div class="accordion-body">
            <div v-for="(check, index) in checks" :key="index">
                <Check @check-clicked="clickedCheck(index)" ref="checkRefx" :check="check" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Check from './Check.vue'
import reset from './ActionButtons.vue'

import { useCheckListStore } from '@/stores/checklist'
import { useReset, useCheckActiveList } from './checkFunctions.js'


const storeChecklist = useCheckListStore()
let allChecked = false
const checkRefx = ref(null)

const props = defineProps({
    'name': String,
    'checklistId': Number
})

const checklist = storeChecklist.checkLists[storeChecklist.checkLists.findIndex(list => list.id === props.checklistId)]
const checks = storeChecklist.checkItems.filter(check => check.checklistID === props.checklistId)

let progress = 0

function clickedCheck(index) {
    //scroll to clicked check
    checkRefx.value[index].$el.scrollIntoView({ behavior: 'smooth' });
    // update progressbar
    progress = (checklist.progress / checklist.totalChecks) * 100;
}

function toggleAll() {
    if (allChecked) {
        console.log("uncheck all items in lists")
        useReset()
    } else {
        console.log("check all items in lists")
        useCheckActiveList()
    }

}



</script>

<style scoped>
/*STYLE accordion 
active: ?
T   button: accordion-button
F   button: accordion-button collapsed show
T   body: accordion-collapse collapse show
F   body: accordion-collapse collapse
*/
</style>