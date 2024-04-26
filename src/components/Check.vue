<template>
    <div>
        <div @click="checkItem(check.uniqueID)" class="form-check d-flex justify-content-between"
            :class="{ active: check.active, disableclick: (!check.active && !check.checkable) }">
            <div><input type="checkbox" v-model="check.checked" :value="check.uniqueID" class="form-check-input"
                    value="">
                <p>{{ check.id }}. {{ check.check }}</p>
            </div>
            <p>{{ check.desired }}</p>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useCheckListStore } from '@/stores/checklist'
const storeChecklist = useCheckListStore()

const props = defineProps({
    'check': Object
})
const emit = defineEmits(['activateNextCheck'])
let check = storeChecklist.checkItems.find(checkitem => checkitem.uniqueID === props.check.uniqueID)

function checkItem(uniqueID) {
    console.log("checkItem : ", uniqueID)
    console.log("Previous checkedState : ", check.checked)
    check.checked = !check.checked
    const currentIndex = storeChecklist.checkItems.findIndex(checkitem => checkitem.uniqueID === props.check.uniqueID)
    let currentCheckList = storeChecklist.checkLists.find(checklist => checklist.id === props.check.checklistID)

    // diasble checkable for all checks
    storeChecklist.checkItems.forEach(checkitem => checkitem.checkable = false)
    if (check.checked) { //Checked a chceck
        // deactivate current check
        check.active = false

        // keep previous check active to undo check
        storeChecklist.checkItems[currentIndex].checkable = true

        let nextCheck = storeChecklist.checkItems[currentIndex + 1]
        if (nextCheck.checklistID !== props.check.checklistID) {
            // activate new list
            currentCheckList.active = false
            storeChecklist.checkLists.find(checklist => checklist.id === nextCheck.checklistID).active = true
        }
        nextCheck.active = true
        currentCheckList.progress++
    }
    else { // unchecked a check
        // activate previous check
        check.active = false

        // keep previous check active to undo check        
        if (currentIndex > 0) storeChecklist.checkItems[currentIndex - 1].checkable = true

        // deactivate all checks
        storeChecklist.checkItems.forEach(checkitem => checkitem.active = false)
        // activcate next unchecked check
        storeChecklist.checkItems.find(checkitem => checkitem.checklistID === props.check.checklistID && checkitem.checked === false).active = true
        currentCheckList.progress--
    }
}





</script>

<style scoped>
.active {
    background-color: #4d4d4d;
    color: #ffffff;
    text-shadow: #4d4d4d;
    padding: 28px;
    pointer-events: auto;
}

.disableclick {
    pointer-events: none;
}
</style>