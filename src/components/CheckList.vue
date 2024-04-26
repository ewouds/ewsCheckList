<template>
    <h2 :id="`heading${name}`" class="accordion-header">
        <button v-bind:data-bs-target="`#collapse${checklist.id}`" v-bind:aria-controls="`collapse${checklist.id}`"
            class="accordion-button" :class="{ collapsed: !checklist.active, show: !checklist.active }" type="button"
            data-bs-toggle="collapse" aria-expanded="true">
            {{ checklist.id }} # {{ checklist.name }} [
            {{
                checklist.progress }}/{{
                checklist.totalChecks }}]
        </button>
    </h2>
    <div :id="`collapse${checklist.id}`" v-bind:aria-labelledby="`heading${checklist.id}`"
        class="accordion-collapse collapse" :class="{ show: checklist.active }" data-bs-parent="#checkListsAccordion">
        <div class="accordion-body">
            <div v-for="(check) in list">
                <Check ref="check" :check="check" :name="name" :uniqueID="check.uniqueID" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Check from './Check.vue'
import { useCheckListStore } from '@/stores/checklist'
const storeChecklist = useCheckListStore()

const props = defineProps({
    'list': Array,
    'name': String,
    'checklistId': Number
})

const checklist = storeChecklist.checkLists[storeChecklist.checkLists.findIndex(list => list.id === props.checklistId)]

defineExpose({
    // activateCheck
})
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