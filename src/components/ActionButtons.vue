<template>
    <div class="container position-fixed bottom-0 start-50 translate-middle-x" ref="ews">
        <div class="btn-group btn-group-lg " role="group" style="width:100%">
            <button @click="reset()" type="button" class="btn btn-secondary" id="btn-reset" style="width:20%"
                ref="resetBTNRef">Reset</button>
            <button @click="failed()" type="button" class="btn btn-danger" id="btn-fail" style="width:20%">Fail</button>
            <button @click="checked()" type="button" class="btn btn-success" id="btn-checked" style="width:60%">
                Checked</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCheckListStore } from '@/stores/checklist'
import { onLongPress } from '@vueuse/core'
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
    resetAll();
}


function reset() {
    let activeItem = storeChecklist.checkItems.find(check => check.active === true)
    let checkItemsInCurrentList = storeChecklist.checkItems.filter(check => check.checklistID === activeItem.checklistID)
    //unchecked all checks in current list
    checkItemsInCurrentList.forEach(check => {
        check.checked = false
        check.active = false
        check.checkedByButton = false
        check.failed = false
    });
    //reset prorgress of current lsit
    storeChecklist.checkLists.find(list => list.id === activeItem.checklistID).progress = 0
    //activate first unchecked check active
    let newActiveItem = storeChecklist.checkItems.find(check => (check.checklistID === activeItem.checklistID && check.checked === false))
    newActiveItem.active = true
    newActiveItem.checkable = true
}

function resetAll() {
    let activeItem = storeChecklist.checkItems.find(check => check.active === true)
    //let checkItemsInCurrentList = storeChecklist.checkItems.filter(check => check.checklistID === activeItem.checklistID)
    //unchecked all checks in current list
    storeChecklist.checkItems.forEach(check => {
        check.checked = false
        check.active = false
        check.checkedByButton = false
        check.failed = false
    });
    //reset prorgress of current lists
    storeChecklist.checkLists.forEach(list => {
        list.progress = 0
        list.active = false
    });
    //activate first unchecked check active
    let newActiveItem = storeChecklist.checkItems[0]
    newActiveItem.active = true
    newActiveItem.checkable = true
    //activate first list
    storeChecklist.checkLists[0].active = true
}

function checked() {
    let checkItem = storeChecklist.checkItems.find(check => check.active === true)
    checkItem.checkedByButton = true
    checkItem.failed = false
}

function failed() {
    let checkItem = storeChecklist.checkItems.find(check => check.active === true)
    checkItem.checkedByButton = true
    checkItem.failed = true
}

</script>