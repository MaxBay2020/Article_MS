import {render, screen} from '@testing-library/react'
import Wrapper from '../../testing/Wrapper'
import Header from './Header'

describe('<Header /> Component Testing', () => {
    it('Should render Header component in the DOM', async () => {
        render(<Wrapper><Header /></Wrapper>)
        const headerComponent = screen.getByTestId('HeaderComponent')
        expect(headerComponent).toBeInTheDocument()
    })
})
