import CONSTANTS from "./constants";
import store from "./store/store";

const defaultTranslation = {
    "todomicro": {
        "recentitem": {
          "maintabitem" : {
            "name": "Todo List"
          }
        },
        "maintab" : {
          "createtodo" : {
           "addtodo" : "add todo",
           "cancel" : "cancel",
           "add": "add"
          }
    }
  }
}

function getTranslation(loc) {
    const props = loc.split('.');
    let currentTree = defaultTranslation;
    for (const prop of props) {
        currentTree = currentTree[prop];
        if (!currentTree) return loc;
    }
    return currentTree || loc;
}


function getTodoItemFromStore(id) {
    return store.getState().todoApp.todos[id];
}

function onRecentElementClose(item) {
    const { itemId } = item;
    store.dispatch({ type: 'UPDATE_TODO', payload: { id: itemId, changes: { inRecentList: false } }})
}

class BaseApisWrap {

    constructor(FrontOffice) {
        this.FrontOffice = FrontOffice;
        this.ComponentId = '';
        this.baseOk = !!(FrontOffice);
        this.hasI18n = (!!FrontOffice?.i18n);
    }

    setFrontOffice(FrontOffice) {
       this.FrontOffice = FrontOffice;
       this.baseOk = !!(FrontOffice);
       this.hasI18n = (!!FrontOffice?.i18n);
    }

    i18nTranslate(loc) {
        return this.hasI18n ? this.FrontOffice?.i18n.commonInstance.t(loc) : getTranslation(loc);
    }

    geti18nUseTranslationHook() {
        return this.hasI18n ? this.FrontOffice.i18n.useTranslation : () => ({ t: getTranslation });
    }

    setComponentId(id) {
        this.ComponentId = id;
    }

    getComponentId() {
        return this.ComponentId;
    }

    getFrontOffice() {
        return this.FrontOffice;
    }

    getBaseEventEmitter() {
        return this.getFrontOffice()?.EventEmitter;
    }

    // can write the apis here
    // { itemId, componentId }
    addItemToConnectRecent(itemId) {
        const item = getTodoItemFromStore(itemId);
        this.getFrontOffice()?.connect.shared.services.recents.addItem({
            itemId,
            componentId: this.getComponentId(),
            notificationCount: item.notificationCount,
            recentTime: item.modifiedAt,
        });
    }

    addMainRecentItem() {
        this.getFrontOffice()?.connect.shared.services.recents.addItem({
            itemId: CONSTANTS.MAIN_TAB_ID,
            componentId: this.getComponentId(),
            notificationCount: 0,
            recentTime: Date.now(),
        }); 
    }

    updateItemInConnect(itemId) {
        const item = getTodoItemFromStore(itemId);
        this.getFrontOffice()?.connect.shared.services.recents.updateItem({
            itemId,
            componentId: this.getComponentId(),
            notificationCount: item.notificationCount,
            recentTime: item.modifiedAt,
        });
    }

    removeItemInConnectRecent(itemId) {
        this.getFrontOffice()?.connect.shared.services.recents.removeItem({ itemId, componentId: this.getComponentId()});
    }
    
    showClientNotification(notificationData) {
        this.getFrontOffice()?.Notification.showDesktopNotification({ componentId: this.getComponentId(), ...notificationData });
    }

    addPluginComponentsToConnect(componentId, components) {
        this.getFrontOffice()?.connect.shared.services.addPluginComponents(componentId, components);
    }

    navigateToRecentItem(itemId) {
        this.getFrontOffice()?.connect.shared.services.recents.navigate({ itemId , componentId: this.getComponentId()})
    }

    attachDefaultEventEmitterListeners() {
        const EventEmitter = this.getBaseEventEmitter();
        if (EventEmitter) {
          EventEmitter.addListener(`${this.getComponentId()}_RECENT_ITEM_CLOSED`, onRecentElementClose);
        }
    }

    hasItemInConnect(itemId) {
        return this.getFrontOffice()?.connect.shared.services.recents.hasItem({ itemId , componentId: this.getComponentId()});
    }

    listenModuleStatus(moduleName, listener) {
       return this.getFrontOffice()?.ModuleRegistry.listenModuleStatus(moduleName, listener);
    }

    waitTillModuleLoads(moduleName) {
        return this.getFrontOffice()?.ModuleRegistry.waitTillModuleLoads(moduleName);
    }
}

export default new BaseApisWrap();
export {
    getTranslation,
}