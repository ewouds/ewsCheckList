<template>
  <TopBar />
  <div style="height:59px"></div> <!-- spacer for top bar -->
  <CheckListAccordion ref="checkListAccordion" :lists=checklists />
  <ActionButtons />
</template>

<script setup>
import jsonPHDYX from './checklists/phdyx.json'
import TopBar from './components/TopBar.vue'
import CheckListAccordion from './components/CheckListAccordion.vue'
import ActionButtons from './components/ActionButtons.vue'

const checklists = jsonPHDYX



</script>
