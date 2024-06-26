import { defineStore } from "pinia";

export const useCheckListStore = defineStore({
  persist: true,

  id: "checklist",
  state: () => ({
    checkItems: [],
    checkLists: [],
    test: false,
    userName: "ewouds",
    planeName: "OO-OOO",
    storedAt: new Date(),
  }),
  actions: {
    addChecksTolist(lists) {
      lists.forEach((list) => {
        let checklistObj = {
          progress: 0,
          totalChecks: list.checks.length,
          active: false,
          name: list.name,
          id: list.id,
        };
        this.checkLists.push(checklistObj);
        list.checks.forEach((check) => {
          check.checked = false;
          check.active = false;
          check.uniqueID = list.id * 100 + check.id;
          check.checklistID = list.id;
          check.checkable = false;
          check.checkedByButton = false;
          check.failed = false;
          this.checkItems.push(check);
        });
      });
    },
  },
});
