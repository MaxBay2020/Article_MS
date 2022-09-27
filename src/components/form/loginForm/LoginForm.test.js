import {render, screen, act, fireEvent} from '@testing-library/react'
import Wrapper from '../../../testing/Wrapper'
import LoginForm from './LoginForm'

describe('<LoginForm /> Component Testing', () => {
    it('Should render correct content', async () => {
        render(<Wrapper><LoginForm /></Wrapper>)
        const loginElement = screen.getByRole('heading', {
            name: /login/i
        })
        expect(loginElement).toBeInTheDocument()

        const emailElement = screen.getByRole('heading', {
            name: /email/i
        })
        expect(emailElement).toBeInTheDocument()

        const passwordElement = screen.getByRole('heading', {
            name: /password/i
        })
        expect(passwordElement).toBeInTheDocument()

        const loginButton = screen.getByRole('button', {
            name: /log in/i
        })
        expect(loginButton).toBeInTheDocument()

        const registerLink = screen.getByText(/register/i)
        expect(registerLink).toBeInTheDocument()
    })

    it('Should display plain text when clicking eye icon', async () => {
        render(<Wrapper><LoginForm /></Wrapper>)
        const eyeIconButton = screen.getByTestId('eyeIcon')

        await act(() => {
            fireEvent.click(eyeIconButton)
        })

        const passwordInput = screen.getByPlaceholderText(/Please enter your password/i)
        expect(passwordInput.type).toBe('text')
    })

})
