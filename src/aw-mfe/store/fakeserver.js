import BaseApisWrap from "../BaseApisWrap";
import store from "./store";


async function pushTodosToServer(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todoAppStore', serializedState);
    } catch (error){
        console.error(error);
    }
}

async function getTodosFromServer() {
    try {
        const serializedState = localStorage.getItem('todoAppStore');
        if (serializedState === null) {
            return undefined;
        }
        const data = JSON.parse(serializedState);
        return data.todoApp.todos;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

function getNotificationEventFromServer(itemId, time) {
    setTimeout(() => {
        onEventFromServer({ type: 'notification', itemId });
    }, time);
}

function onEventFromServer({ type, itemId }) {
   if (type === 'notification') {
     const state = store.getState();
     const { todoApp: { todos } } = state;
     const item = todos[itemId];
     const modifiedItem = {
        ...item,
        notificationCount: item.notificationCount + 1,
        modifiedAt: Date.now()
    }
    store.dispatch({ type: 'UPDATE_TODO', payload:{ id: item.id, changes: modifiedItem } });
    BaseApisWrap.updateItemInConnect(item.id);
    BaseApisWrap.showClientNotification({
            title: 'TodoApp',
            body: item.title,
            onClick: () => {
                if (!BaseApisWrap.hasItemInConnect(itemId)) {
                    BaseApisWrap.addItemToConnectRecent(itemId);
                }
                BaseApisWrap.navigateToRecentItem(itemId);
            }
        }
    );
   }
}

export {
    getNotificationEventFromServer,
    pushTodosToServer,
    getTodosFromServer,
}