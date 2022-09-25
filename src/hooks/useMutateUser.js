import axios from '../utils/axios'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

const addUser = async (newUser) => {
    await axios.post('/users', newUser)
}

// add user
export const useAddUser = () => {
    return useMutation(addUser)
}
