import ArticleTable from "../../components/articleTable/ArticleTable";
import {Container} from "@mui/material";
import Pagination from "../../components/pagination/MyPagination";
import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import axios from "../../utils/axios";
// import mockAxios from '../../__mocks__/axios'

const fetchArticles = async (url) => {
    const res = await axios.get(url)
    if(res.status === 200)
        return res.data
}

const ArticlePage = () => {
    const pageSize = 3
    const [page, setPage] = useState(1);

    const {
        data:articles,
    } = useQuery(['getArticlesByPage', page], () => fetchArticles(`/articles?_page=${page}&_limit=${pageSize}`), {
        refetchOnWindowFocus: false,
        keepPreviousData: true
    })


    return (
        <Container>
            <ArticleTable page={page} articles={articles} />
            <Pagination pageSize={pageSize} setPage={setPage} />
        </Container>
    )
}

export default ArticlePage
