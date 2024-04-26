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
                <Check ref="check" :check="check" :name="name" :uniqueID="check.uniqueID"
                    @activateNextCheck="activateNextCheck" />
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import Check from './Check.vue'
import { useCheckListStore } from '@/stores/checklist'
const storeChecklist = useCheckListStore()
const check = ref(null)

const props = defineProps({
    'list': Array,
    'name': String,
    'checklistId': Number
})

const checklist = storeChecklist.checkLists[storeChecklist.checkLists.findIndex(list => list.id === props.checklistId)]
const emit = defineEmits(['activateNextCheckList'])

/*STYLE accordion 
active: ?
T   button: accordion-button
F   button: accordion-button collapsed show
T   body: accordion-collapse collapse show
F   body: accordion-collapse collapse
*/

function deactivateAllChecks() {
    //decative all checks
    storeChecklist.checklist.forEach(check => check.active = false)
    check.value.forEach(check => check.activateCheck(false))
}
function activateCheck(uniqueID) {
    deactivateAllChecks()
    //activate check
    console.log("activateCheck : " + uniqueID)
    storeChecklist.checklist.find(check => check.uniqueID === uniqueID).active = true
    let checkObjIndex = storeChecklist.checklist.findIndex(check => check.uniqueID === uniqueID)
    console.log("CheckObjIndex : ", checkObjIndex)
    if (check.value[checkObjIndex]) {
        check.value[checkObjIndex].activateCheck(true)
        return true
    }
    else {
        console.log("Check not found")
        return false
    }
}
function activateNextCheck(currentId) {
    console.log("activateNextCheck currentId : ", currentId)
    let currentCheckIndex = storeChecklist.checklist.findIndex(check => check.id === currentId)
    let nextCheckIndex = currentCheckIndex + 1
    // is current check in this list?
    if (storeChecklist.checklist[nextCheckIndex].checklistID !== props.checklistId) {
        //activate next checkList
        emit('activateNextCheckList')
    }
    else {
        //activate next check
        activateCheck(storeChecklist.checklist[currentCheckIndex + 1].uniqueID)
    }



    /*
    
        console.log("NextCheck : ", nextCheck, nextCheck.checklistID, props.checklistId)
        // if next check in the list exists
        if (nextCheck && nextCheck.checklistID === props.checklistId) {
            deactivateAllChecks()
            storeChecklist.checklist.find(check => check.id === id).active = true
            check.value[id].activateCheck(true)
        }
        else {
            console.log("Activate next checklist ")
            emit('activateNextCheckList')
            //console.log("Activate next check ")
            //console.log(storeChecklist.activeChecklist)
            //activateCheck(201)
    
        }
    
        */
}

defineExpose({

    activateCheck
})
</script>

<style scoped></style>