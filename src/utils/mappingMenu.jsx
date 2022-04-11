import { removeDuplicatesArray } from "./removeDuplicatesArray";

const stringConverter = (str) => {
  return str.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
};

const mappingMenu = (listOfResources, listOfMenus) => {
  let listOfAllowedMenu = [];

  if (listOfResources && listOfResources.length) {
    for (let i = 0; i < listOfMenus.length; i++) {
      for (let j = 0; j < listOfResources.length; j++) {
        if (listOfMenus[i]?.childs?.length > 0) {
          const childs = mappingMenu(listOfResources, listOfMenus[i].childs);

          if (childs?.length > 0) {
            const objMenu = {
              ...listOfMenus[i],
              childs,
            };

            listOfAllowedMenu.push(objMenu);
          }
        } else if (
          stringConverter(listOfResources[j].name) ===
          stringConverter(listOfMenus[i].title)
        ) {
          let objMenu = {
            ...listOfMenus[i],
            actions: listOfResources[j].actions,
          };
          listOfAllowedMenu.push(objMenu);
        }
      }
    }
  }

  return removeDuplicatesArray(listOfAllowedMenu, "title");
};

export default mappingMenu;
