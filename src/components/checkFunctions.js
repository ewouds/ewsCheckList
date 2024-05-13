import { useCheckListStore } from "@/stores/checklist";

export function useReset() {
  const storeChecklist = useCheckListStore();
  console.log("reset clicked");
  let activeItem = storeChecklist.checkItems.find(
    (check) => check.active === true
  );
  let checkItemsInCurrentList = storeChecklist.checkItems.filter(
    (check) => check.checklistID === activeItem.checklistID
  );
  //unchecked all checks in current list
  checkItemsInCurrentList.forEach((check) => {
    check.checked = false;
    check.active = false;
    check.checkedByButton = false;
    check.failed = false;
  });
  //reset prorgress of current lsit
  storeChecklist.checkLists.find(
    (list) => list.id === activeItem.checklistID
  ).progress = 0;
  //activate first unchecked check active
  let newActiveItem = storeChecklist.checkItems.find(
    (check) =>
      check.checklistID === activeItem.checklistID && check.checked === false
  );
  newActiveItem.active = true;
  newActiveItem.checkable = true;
}

export function useCheckActiveList() {
  const storeChecklist = useCheckListStore();

  let activeItem = storeChecklist.checkItems.find(
    (check) => check.active === true
  );
  let checkItemsInCurrentList = storeChecklist.checkItems.filter(
    (check) => check.checklistID === activeItem.checklistID
  );
  //checked all checks in current list
  checkItemsInCurrentList.forEach((check) => {
    check.checked = true;
    check.active = false;
    check.checkedByButton = false;
    check.failed = false;
  });
  //complete prorgress of current lsit
  storeChecklist.checkLists.find(
    (list) => list.id === activeItem.checklistID
  ).progress = list.totalChecks;

  //activate first unchecked check active
  let newActiveItem = storeChecklist.checkItems.find(
    (check) =>
      check.checklistID === activeItem.checklistID && check.checked === false
  );
  newActiveItem.active = true;
  newActiveItem.checkable = true;
}

export function useResetAll() {
  const storeChecklist = useCheckListStore();
  let activeItem = storeChecklist.checkItems.find(
    (check) => check.active === true
  );
  //let checkItemsInCurrentList = storeChecklist.checkItems.filter(check => check.checklistID === activeItem.checklistID)
  //unchecked all checks in current list
  storeChecklist.checkItems.forEach((check) => {
    check.checked = false;
    check.active = false;
    check.checkedByButton = false;
    check.failed = false;
  });
  //reset prorgress of current lists
  storeChecklist.checkLists.forEach((list) => {
    list.progress = 0;
    list.active = false;
  });
  //activate first unchecked check active
  let newActiveItem = storeChecklist.checkItems[0];
  newActiveItem.active = true;
  newActiveItem.checkable = true;
  //activate first list
  storeChecklist.checkLists[0].active = true;
}

export function useChecked() {
  const storeChecklist = useCheckListStore();
  let checkItem = storeChecklist.checkItems.find(
    (check) => check.active === true
  );
  checkItem.checkedByButton = true;
  checkItem.failed = false;
}

export function useFailed() {
  const storeChecklist = useCheckListStore();
  let checkItem = storeChecklist.checkItems.find(
    (check) => check.active === true
  );
  checkItem.checkedByButton = true;
  checkItem.failed = true;
}
