<template>
  <TopBar />
  <div style="height:59px"></div> <!-- spacer for top bar -->
  <CheckListAccordion ref="checkListAccordion" :lists=checklists />
  <ActionButtons />
</template>

<script setup>

import TopBar from './components/TopBar.vue'
import CheckListAccordion from './components/CheckListAccordion.vue'
import ActionButtons from './components/ActionButtons.vue'
import jsonPHDYX from './checklists/phdyx.json'
const checklists = jsonPHDYX
const checklistsTest = [
  {
    id: 1,
    name: "BEFORE START-UP",
    checks: [
      { id: 1, check: "POH", desired: "CHECK LATEST EDITION and WITHIN REACH" },
      { id: 2, check: "Canopy", desired: "CLOSED & LOCKED" },
      { id: 3, check: "Parking brake", desired: "ON" },
    ],
  },
  {
    id: 2,
    name: "ENGINE START",
    checks: [
      { id: 1, check: "Strobe light", desired: "ON" },
      { id: 2, check: "Fuel level and temperature", desired: "CHECK" },
      { id: 3, check: "Fuel selector", desired: "ON" },
      { id: 4, check: "Alternate induction air", desired: "CLOSED" },
      { id: 5, check: "Throttle", desired: "1/4 OPEN" },
      { id: 6, check: "Mixture", desired: "FULL RICH" },
      { id: 7, check: "Propeller area", desired: "CLEAR" },
      { id: 8, check: "Master switch", desired: "ON" },
      { id: 9, check: "Ignition switch", desired: "START" },
      { id: 10, check: "Oil pressure", desired: "CHECK" },
      { id: 11, check: "Ammeter", desired: "CHECK" },
      { id: 12, check: "Engine instruments", desired: "CHECK" },
      { id: 13, check: "Throttle", desired: "IDLE" },
      { id: 14, check: "Mixture", desired: "LEAN for ground operations" },
      { id: 15, check: "Avionics", desired: "ON" },
      { id: 16, check: "Transponder", desired: "ALT" },
      { id: 17, check: "Flaps", desired: "UP" },
      { id: 18, check: "Trim", desired: "SET" },
      { id: 19, check: "Flight controls", desired: "FREE" },
      { id: 20, check: "Brakes", desired: "TEST" },
      { id: 21, check: "Engine run-up", desired: "CHECK" },
    ],
  }
]



</script>
