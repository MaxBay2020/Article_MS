import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "../../utils/axios";
import {useQuery} from "@tanstack/react-query";

const fetchTotalPages = async () => {
    const res = await axios.get('/totalArticles')
    if(res.status === 200)
        return res.data
}

const MyPagination = ({pageSize, setPage}) => {

    const {data} = useQuery(['getTotalPages'], fetchTotalPages, {
        refetchOnWindowFocus: false
    })


    const handlePageChange = (_e, page) => {
        setPage(page)
    }

    return (
        <Stack spacing={2}>
            <Pagination
                data-testid='myPagination'
                size='large'
                count={data ? Math.ceil(data?.length / pageSize) : 0}
                onChange={(e,page) => handlePageChange(e, page)}
            />
        </Stack>
    );
}

export default MyPagination
