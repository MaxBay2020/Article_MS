import {render, screen, act, fireEvent} from '@testing-library/react'
import Wrapper from '../../../testing/Wrapper'
import RegisterForm from './RegisterForm'

describe('<RegisterForm /> Component Testing', () => {
    it('Should render correct content', async () => {
        render(<Wrapper><RegisterForm /></Wrapper>)
        const registerElement = screen.getByRole('heading', {
            name: 'Register'
        })
        expect(registerElement).toBeInTheDocument()

        const emailElement = screen.getByRole('heading', {
            name: /email/i
        })
        expect(emailElement).toBeInTheDocument()

        const passwordElement = screen.getByRole('heading', {
            name: /password/i
        })
        expect(passwordElement).toBeInTheDocument()

        const confirmationElement = screen.getByRole('heading', {
            name: /Confirmation/i
        })
        expect(confirmationElement).toBeInTheDocument()

        const registerButton = screen.getByRole('button', {
            name: /register/i
        })
        expect(registerButton).toBeInTheDocument()

        const loginLink = screen.getByText(/login/i)
        expect(loginLink).toBeInTheDocument()
    })

    it('Should display plain text when clicking eye icon', async () => {
        render(<Wrapper><RegisterForm /></Wrapper>)
        const eyeIconPasswordButton = screen.getByTestId('eyeIconPassword')
        const eyeIconConfirmationButton = screen.getByTestId('eyeIconConfirmation')

        await act(() => {
            fireEvent.click(eyeIconPasswordButton)
        })

        const passwordInput = screen.getByPlaceholderText(/Please enter your password/i)
        expect(passwordInput.type).toBe('text')

        await act(() => {
            fireEvent.click(eyeIconConfirmationButton)
        })

        const confirmationInput = screen.getByPlaceholderText(/Please confirm your password/i)
        expect(confirmationInput.type).toBe('text')
    })

})
