import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { ThemeContext } from '..'
import { useMutation } from '../hooks'
import { AboutContent } from './about'
import { Button, Input } from './general'

const ErrorText = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  text-align: center;
`

type Inputs = {
  username: string
  password: string
}

type Props = {
  closeModal: () => void
}

export default function Login({ closeModal }: Props) {
  const { errorColor } = useContext(ThemeContext)
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const { error, loading, runMutation } = useMutation('user/login', 'post', res => {
    localStorage.setItem('token', res.data.token)
    closeModal()
  })

  const onSubmit = handleSubmit((data, event) => {
    event?.preventDefault()
    runMutation(data)
  })

  return (
    <AboutContent header='Login'>
      {loading ? (
        'Loading...'
      ) : (
        <form onSubmit={onSubmit}>
          <Input
            name='username'
            placeholder='Enter your username...'
            label='Username'
            error={errors.username ? 'Username is required' : undefined}
            ref={register({ required: true })}
            style={{ marginBottom: '1rem' }}
          />
          <Input
            type='password'
            name='password'
            placeholder='Enter your password...'
            label='Password'
            error={errors.password ? 'Password is required' : undefined}
            ref={register({ required: true })}
            style={{ marginBottom: '1rem' }}
          />
          {error && <ErrorText color={errorColor}>{error}</ErrorText>}
          <Button style={{ width: '100%' }}>Submit</Button>
        </form>
      )}
    </AboutContent>
  )
}
