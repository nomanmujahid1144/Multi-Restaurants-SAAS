import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';



export const getSingleRestaurantOrders = (id) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/order/getallrestaurantorders', {
            params: {
                restaurantId: id
            }
        })
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_ORDERS,
                payload: res.data.data
            })
        }
        else {
            alert.show('No Order Found')
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_ORDERS,
                payload: []
            })
        }
    }
}
// export const updateDriverStatus = (args, alert, navigate, id) => {
//     return async (dispatch) => {
//         let res = ''
//         if (args.checkVerify === true) {
//             res = await axiosInstance.patch('/api/v1/driver/updatedriverstatus', { verified: true }, {
//                 params: {
//                     id: id
//                 }
//             })
//         }
//         else if (args.checkBlock === false || args.checkBlock === true) {
//             res = await axiosInstance.patch('/api/v1/driver/updatedriverstatus', { blocked: args.checkBlock ? true : false }, {
//                 params: {
//                     id: id
//                 }
//             })
//         }
//         else if (args.checkBack === true) {
//             res = await axiosInstance.patch('/api/v1/driver/updatecheckstatus', { id : id })
//         }

//         if (res.data.success === true) {
//             alert.show('Driver status updated successfully', {
//                 onClose: () => {

//                     navigate('/drivers')

//                 }
//             })
//             setTimeout(() => {

//                 navigate('/drivers')

//             }, 5000)
//             dispatch({
//                 type: ACTION_TYPES.UPDATE_DRIVER_STATUS,
//                 payload: res.data.data
//             })
//             dispatch(getUnApprovedDrivers())
//         }
//         else {
//             alert.show('update failed')
//             dispatch({
//                 type: ACTION_TYPES.UPDATE_DRIVER_STATUS,
//                 payload: []
//             })
//         }
//     }
// }
