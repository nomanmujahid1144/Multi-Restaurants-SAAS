import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';



export const getUnApprovedDrivers = () => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/driver/getalldrivers')
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_UNAPPROVED_DRIVERS,
                payload: res.data.data
            })
        }
        else {
            alert.show('No Un Approved Drivers Found')
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_UNAPPROVED_DRIVERS,
                payload: []
            })
        }
    }
}
export const updateDriverStatus = (args, alert, navigate, id) => {
    return async (dispatch) => {
        let res = ''
        if (args.checkVerify === true) {
            res = await axiosInstance.patch('/api/v1/driver/updatedriverstatus', { verified: true }, {
                params: {
                    id: id
                }
            })
        }
        else if (args.checkBlock === false || args.checkBlock === true) {
            res = await axiosInstance.patch('/api/v1/driver/updatedriverstatus', { blocked: args.checkBlock ? true : false }, {
                params: {
                    id: id
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,PATCH'
                }
            })
        }
        else if (args.checkBack === true) {
            res = await axiosInstance.patch('/api/v1/driver/updatecheckstatus', { id: id })
        }


        if (res.data.success === true) {
            alert.show('Driver status updated successfully', {
                onClose: () => {

                    navigate('/drivers')

                }
            })
            setTimeout(() => {

                navigate('/drivers')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.UPDATE_DRIVER_STATUS,
                payload: res.data.data
            })
            dispatch(getUnApprovedDrivers())
        }
        else {
            alert.show('update failed')
            dispatch({
                type: ACTION_TYPES.UPDATE_DRIVER_STATUS,
                payload: []
            })
        }
    }
}
