<template>
    <div>
        <div class="accordion" id="checkListsAccordion" ref="checkListAccordion">
            <div v-for="checklist in lists" :key="checklist.id" class="accordion-item">
                <CheckList ref="checkList" :list=checklist.checks :name=checklist.name :checklistId=checklist.id>
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
const checkList = ref(null)
const props = defineProps({
    lists: Array
})

storeChecklist.addChecksTolist(props.lists)

onMounted(() => {
    const activateCheckList = 1
    //set checklist active on load
    storeChecklist.checkLists.find(list => list.id === activateCheckList).active = true

    //set first unchecked check active on load
    storeChecklist.checkItems.find(check => (check.checklistID === activateCheckList && check.checked === false)).active = true
})

</script>
