export const loading = { type: 'LOADING_START' }
export const doneLoading = { type: 'LOADING_DONE' }
export function clearNotification() {
    return dispatch => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }
}

