import { useForm } from 'react-hook-form'
import { AboutContent } from './about'
import { Button, Input } from './general'

type Inputs = {
  username: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const onSubmit = handleSubmit((data, event) => {
    event?.preventDefault()
    console.table(data)
  })

  return (
    <AboutContent header='Login'>
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
        <Button style={{width: '100%'}}>Submit</Button>
      </form>
    </AboutContent>
  )
}
