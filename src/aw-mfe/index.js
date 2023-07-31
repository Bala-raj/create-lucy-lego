import store from "./store/store";
import TabIcon from "./components/main/TabIcon";
import TabView from "./components/main/TabView";
import { getTodosFromServer } from "./store/fakeserver";
import BaseApisWrap from "./BaseApisWrap";
import RecentListItem from "./components/connect/RecentListItem";
import RightSideView from "./components/connect/RightSideView";
import CONSTANTS from "./constants";



async function fetchTodosAndUpdateStore() {
  const todos = await getTodosFromServer();
  store.dispatch({ type: 'INIT', payload: todos });
}

async function init({ FrontOfficeService }) {
  window[`${CONSTANTS.MODULE_NAME}_STORE`] = store;

  // store FrontOfficeService Reference
  BaseApisWrap.setFrontOffice(FrontOfficeService);
  BaseApisWrap.setComponentId(CONSTANTS.MODULE_NAME);
  BaseApisWrap.attachDefaultEventEmitterListeners();
  
  // sync data
  fetchTodosAndUpdateStore().then(() => {
     BaseApisWrap.waitTillModuleLoads('connect').then(() => {
        BaseApisWrap.addPluginComponentsToConnect(CONSTANTS.MODULE_NAME, {
                RecentListItem,
                RightSideView,
        });
        addPreviousRecentsToConnect(store);
     });
  });
  
  return {
      name: CONSTANTS.MODULE_NAME,
      components : {
        TabIcon: TabIcon,
        TabView: TabView,
      },
      shared: {
        services : {
          getAllTodos: () => {
            return store.getState()?.todos;
          }
        },
      }
  }
}

function addPreviousRecentsToConnect(store) {
  try {
    const state = store.getState();
    BaseApisWrap.addMainRecentItem();
    Object.keys(state.todoApp.todos).forEach((key) => {
      if(state.todoApp.todos[key].inRecentList) {
        BaseApisWrap.addItemToConnectRecent(key);
      }
    });
  } catch (error) {
    console.log('TODOAPP: failed to push previous recents to connect', error);
  }
}

window[CONSTANTS.MODULE_NAME] = {
  init: init,
};
