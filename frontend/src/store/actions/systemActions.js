export const loading = { type: 'LOADING_START' }
export const doneLoading = { type: 'LOADING_DONE' }

export function clearNotification() {
    return dispatch => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }
}
export function sendNotification(notification) {
    return dispatch => {
        dispatch({ type: 'SEND_NOTIFICATION', notification })
    }
}

export function toggleLoading(isLoading) {
    return dispatch => {
        dispatch(isLoading ? loading : doneLoading)
    }
}
