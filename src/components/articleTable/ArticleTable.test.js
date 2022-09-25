import {fireEvent, render, screen} from '@testing-library/react'
import ArticleTable from './ArticleTable'
import Wrapper from "../../testing/Wrapper";


describe('ArticleTable Component Testing', () => {
    it('Should render \'Articles\' title', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const articlesElement = screen.getByText(/Articles/i)
        expect(articlesElement).toBeInTheDocument()
    })

    it('Should render \'Title\' in table header', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const titleElement = screen.getByText(/Title/i)
        expect(titleElement).toBeInTheDocument()
    })

    it('Should render \'Author\' in table header', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const authorElement = screen.getByText(/Author/i)
        expect(authorElement).toBeInTheDocument()
    })

    it('Should render \'Author\' in table header', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const authorElement = screen.getByText(/Author/i)
        expect(authorElement).toBeInTheDocument()
    })

    it('Should render \'Created At\' in table header', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const createdAtElement = screen.getByText(/created at/i)
        expect(createdAtElement).toBeInTheDocument()
    })

    it('Should render \'Actions\' in table header', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const actionsElement = screen.getByText(/actions/i)
        expect(actionsElement).toBeInTheDocument()
    })

    it('Should render \'Add New\' button', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const addNewButton = screen.getByText(/add new/i)
        expect(addNewButton).toBeInTheDocument()
    })

    it('Should render \'article details form\' when clicking \'Add New\' button', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const addNewButton = screen.getByText(/add new/i)
        fireEvent.click(addNewButton)
        const articleForm = screen.getByText(/ARTICLE DETAILS/i)
        expect(articleForm).toBeInTheDocument()
    })

    // it('Should render \'article details form\' when clicking \'edit button\' button', async () => {
    //     render(<Wrapper><ArticleTable /></Wrapper>)
    //     const editButton = screen.getByTestId('editButton')
    //     fireEvent.click(editButton)
    //     const articleForm = screen.getByText(/ARTICLE DETAILS/i)
    //     expect(articleForm).toBeInTheDocument()
    // })

    it('Should render 3 articles with MOCK HTTP request', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const articleRow = await screen.findByTestId('articleRow')
        expect(articleRow).toBeInTheDocument()
    })
})
