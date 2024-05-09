<template>
    <h2 :id="`heading${name}`" class="accordion-header">
        <div v-bind:data-bs-target="`#collapse${checklist.id}`" v-bind:aria-controls="`collapse${checklist.id}`"
            class="accordion-button" :class="{ collapsed: !checklist.active, show: !checklist.active }" type="button"
            data-bs-toggle="collapse" aria-expanded="true">
            {{ checklist.id }} # {{ checklist.name }} [
            {{
                checklist.progress }}/{{
                checklist.totalChecks }}]

        </div>
        <div class="progress" role="progressbar" aria-label="Example 2px high" :aria-valuenow="`${progress}`"
            aria-valuemin="0" aria-valuemax="100" style="height: 2px">
            <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>

    </h2>
    <div :id="`collapse${checklist.id}`" v-bind:aria-labelledby="`heading${checklist.id}`"
        class="accordion-collapse collapse" :class="{ show: checklist.active }" data-bs-parent="#checkListsAccordion">
        <div class="accordion-body">
            <div v-for="(check, index) in list" :key="index">
                <Check @focus-clicked="scrollTo(index)" ref="checkRefx" :check="check" :name="name"
                    :uniqueID="check.uniqueID" />
                <!-- <button @click="scrollTo(index)">Scroll to</button> -->

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Check from './Check.vue'
import { useCheckListStore } from '@/stores/checklist'

const storeChecklist = useCheckListStore()

const checkRefx = ref(null)

const props = defineProps({
    'list': Array,
    'name': String,
    'checklistId': Number
})

const checklist = storeChecklist.checkLists[storeChecklist.checkLists.findIndex(list => list.id === props.checklistId)]
let progress = (checklist.progress / checklist.totalChecks) * 100;

function scrollTo(index) {
    console.log("scrolling to: ")
    console.log(index)
    console.log(checkRefx.value[index])
    console.log(checkRefx.value[index].$el)
    checkRefx.value[index].$el.scrollIntoView({ behavior: 'smooth' });
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