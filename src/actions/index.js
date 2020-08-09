/*
* this action call when you dont want create the action type
* Example: If you want to clear list notifications
* you dont need create interface actionTypes because
* this action doesn't has params
* */
export function createAction(type, payload = {}) {
    return {
        type,
        ...payload
    }
}
