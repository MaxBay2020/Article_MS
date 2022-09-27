import {render, screen} from '@testing-library/react'
import Wrapper from '../../testing/Wrapper'
import DeleteDialog from './DeleteDialog'

describe('<DeleteDialog /> Component Testing',  () => {
    it('Should be in the DOM when set open to true', async () => {
        render(<Wrapper><DeleteDialog open={true} /></Wrapper>)
        const deleteDialogComponent = screen.getByTestId('DeleteDialogComponent')
        expect(deleteDialogComponent).toBeInTheDocument()
    })
})

