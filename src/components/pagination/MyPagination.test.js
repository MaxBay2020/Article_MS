import {render, screen} from '@testing-library/react'
import Wrapper from '../../testing/Wrapper'
import MyPagination from './MyPagination'

describe('<MyPagination /> Component Testing', () => {
    it('Should render MyPagination component in the DOM', async () => {
        render(<Wrapper><MyPagination /></Wrapper>)
        const paginationComponent = screen.getByTestId('myPagination')
        expect(paginationComponent).toBeInTheDocument()
    })
})
