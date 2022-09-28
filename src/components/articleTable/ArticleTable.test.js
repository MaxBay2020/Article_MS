import {render, fireEvent, screen, act} from '@testing-library/react'
import ArticleTable from './ArticleTable'
import Wrapper from "../../testing/Wrapper";

describe('<ArticleTable /> Component Testing', () => {
    it('Should render ArticleTable component in the DOM', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const articleTableComponent = screen.getByTestId('ArticleTableComponent')
        expect(articleTableComponent).toBeInTheDocument()
    })

    it('Should have \'Articles\' text', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const articlesElement = screen.getByText(/Articles/i)
        expect(articlesElement).toBeInTheDocument()
    })

    it('Should have \'Author\' text', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const authorElement = screen.getByText(/Author/i)
        expect(authorElement).toBeInTheDocument()
    })

    it('Should have \'Created At\' text', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const createdAtElement = screen.getByText(/Created At/i)
        expect(createdAtElement).toBeInTheDocument()
    })

    it('Should have \'Actions\' text', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const actionsElement = screen.getByText(/Actions/i)
        expect(actionsElement).toBeInTheDocument()
    })

    it('Should have \'ADD NEW\' button', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const addNewButton = screen.getByText(/ADD NEW/i)
        expect(addNewButton).toBeInTheDocument()
    })

    it('Should render <ArticleForm /> component when clicking \'ADD NEW\' button', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const addNewButton = screen.getByRole('button', {
            name: /ADD NEW/i
        })
        fireEvent.click(addNewButton)

        const articleFormComponent = screen.getByTestId('ArticleFormComponent')
        expect(articleFormComponent).toBeInTheDocument()
    })

    it('Should render correct fields of <ArticleForm /> component on  when clicking \'ADD NEW\' button', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const addNewButton = screen.getByRole('button', {
            name: /ADD NEW/i
        })

        await act(() => {
            fireEvent.click(addNewButton)
        })

        const articleDetailsElement = screen.getByRole('heading', {
            name: /article details/i
        })
        expect(articleDetailsElement).toBeInTheDocument()

        const isbnElement = screen.getByRole('heading', {
            name: /isbn/i
        })
        expect(isbnElement).toBeInTheDocument()

        const titleElement = screen.getByRole('heading', {
            name: 'Title'
        })
        expect(titleElement).toBeInTheDocument()

        const subtitleElement = screen.getByRole('heading', {
            name: /subtitle/i
        })
        expect(subtitleElement).toBeInTheDocument()

        const authorElement = screen.getByRole('heading', {
            name: 'Author'
        })
        expect(authorElement).toBeInTheDocument()

        const publisherElement = screen.getByRole('heading', {
            name: /publisher/i
        })
        expect(publisherElement).toBeInTheDocument()

        const pagesElement = screen.getByRole('heading', {
            name: /pages/i
        })
        expect(pagesElement).toBeInTheDocument()

        const descriptionElement = screen.getByRole('heading', {
            name: /description/i
        })
        expect(descriptionElement).toBeInTheDocument()

        const websiteElement = screen.getByRole('heading', {
            name: /website/i
        })
        expect(websiteElement).toBeInTheDocument()

        const confirmButton = screen.getByRole('button', {
            name: /confirm/i
        })
        expect(confirmButton).toBeInTheDocument()
    })


    it('Should disappear when clicking gray bg', async () => {
        render(<Wrapper><ArticleTable /></Wrapper>)
        const addNewButton = screen.getByRole('button', {
            name: /ADD NEW/i
        })

        await act(() => {
            fireEvent.click(addNewButton)
        })

        const grayBgElement = screen.getByTestId('grayBg')

        await act(() => {
            fireEvent.click(grayBgElement)
        })
        expect(grayBgElement).not.toBeInTheDocument()
    })
})
