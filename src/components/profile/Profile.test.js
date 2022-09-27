import {render, screen} from '@testing-library/react'
import Wrapper from '../../testing/Wrapper'
import Profile from './Profile'

describe('<Profile /> Component Testing', () => {
    it('Should render Profile component in the DOM', async () => {
        render(<Wrapper><Profile /></Wrapper>)
        const profileComponent = screen.getByTestId('profile')
        expect(profileComponent).toBeInTheDocument()
    })

    it('Should render logout button', async () => {
        render(<Wrapper><Profile /></Wrapper>)
        const logoutButton = screen.getByText(/Log out/i)
        expect(logoutButton).toBeInTheDocument()
    })
})
