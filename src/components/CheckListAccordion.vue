<template>
    <div>
        <div class="accordion" id="checkListsAccordion" ref="checkListAccordion">
            <div v-for="list in storeChecklist.checkLists" :key="list.id" class="accordion-item">
                <CheckList ref="checkList" :name=list.name :checklistId=list.id>
                </CheckList>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted } from 'vue'
import CheckList from './CheckList.vue'
import { useCheckListStore } from '@/stores/checklist'

const storeChecklist = useCheckListStore()
const props = defineProps({
    lists: Object
})

console.log("Disk Checklists", props.lists.planeName)
console.log("localCache CheckLists", JSON.parse(localStorage.getItem("checklist"))?.planeName)
if (props.lists.planeName !== JSON.parse(localStorage.getItem("checklist"))?.planeName) {
    console.log("Refreshing the local cache of checklists")
    storeChecklist.$reset()
    storeChecklist.addChecksTolist(props.lists.checklists)
    storeChecklist.storedAt = new Date()
}
else {
    console.log("Checklists are the same, no local cache refresh needed")
}


storeChecklist.planeName = props.lists.planeName
//console("Vliegtuig : " + storeChecklist.planeName)
onMounted(() => {
    //update store
    const activateCheckList = 1
    //set checklist active on load
    storeChecklist.checkLists.find(list => list.id === activateCheckList).active = true

    //set first unchecked check active on load
    storeChecklist.checkItems.find(check => (check.checklistID === activateCheckList && check.checked === false)).active = true



})

</script>
