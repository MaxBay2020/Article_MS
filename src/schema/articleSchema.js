import * as yup from 'yup'

const articleSchema = yup.object().shape({
    isbn: yup.string().required('Please enter isbn'),
    title: yup.string().required('Please enter title')
})

export default articleSchema
