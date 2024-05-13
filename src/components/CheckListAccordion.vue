<template>
    <div>
        <div class="accordion" id="checkListsAccordion" ref="checkListAccordion">
            <div v-for="list in props.lists.checklists" :key="list.id" class="accordion-item">
                <CheckList ref="checkList" :list=list.checks :name=list.name :checklistId=list.id>
                </CheckList>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import CheckList from './CheckList.vue'
import { useCheckListStore } from '@/stores/checklist'

const storeChecklist = useCheckListStore()
const props = defineProps({
    lists: Object
})

if (props.lists.checklists.length !== storeChecklist.checkLists.length) {
    storeChecklist.$reset()
    storeChecklist.addChecksTolist(props.lists.checklists)
}



storeChecklist.planeName = props.lists.planeName
//console("Vliegtuig : " + storeChecklist.planeName)
onMounted(() => {
    const activateCheckList = 1
    //set checklist active on load
    storeChecklist.checkLists.find(list => list.id === activateCheckList).active = true

    //set first unchecked check active on load
    storeChecklist.checkItems.find(check => (check.checklistID === activateCheckList && check.checked === false)).active = true
})

</script>
