import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
} from 'react-bootstrap'
import useRouter from 'hooks/useRouter'
import { useProvideAuth } from 'hooks/useAuth'
import { LandingHeader, LoadingSpinner } from 'components'
import { setAuthToken } from 'utils/axiosConfig'
import AvatarPicker from 'components/AvatarPicker/AvatarPicker'
import { toast } from 'react-toastify'

const initialState = {
  username: '',
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}

export default function RegisterPage() {
  const [data, setData] = useState(initialState)
  const auth = useProvideAuth()
  const router = useRouter()

  const [profileImage, setProfileImage] = useState(getRandomProfileUrl())

  function getRandomProfileUrl() {
    //geneartes random pic in img
    let imgs = [
      'bird.svg',
      'dog.svg',
      'fox.svg',
      'frog.svg',
      'lion.svg',
      'owl.svg',
      'tiger.svg',
      'whale.svg',
    ]
    let img = imgs[Math.floor(Math.random() * imgs.length)]
    return `/${img}`
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
    console.log(data)
  }

  const handleSignup = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity() === false) {
    }

    if (!(data.password === document.getElementById("confirmPassword").value)) {
      toast("Passwords do not match")
    } else {
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null,
      })
      setProfileImage(getRandomProfileUrl())
      try {
        const res = await auth.signup(data.username, data.email, data.password, profileImage)
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: null,
        })
        setAuthToken(res.token)
        router.push('/')
      } catch (error) {
        toast.error(error.message)
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error ? error.message || error.statusText : null,
        })
      }
    }
  }

  return (
    <div style={{overflow: "auto", height: "100vh"}}>
      <LandingHeader/>
      <Container className='mb-5'>
        <Row className='pt-5 justify-content-center'>
            <Form
                noValidate
                validated
                style={{ width: '350px' }}
                onSubmit={handleSignup}
            >
                <h3 className="mb-3">Join Us!</h3>
                <Form.Group controlId='username-register'>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    type='text'
                    name='username'
                    placeholder='Username'
                    aria-describedby='inputGroupPrepend'
                    required
                    value={data.username}
                    onChange={handleInputChange}
                    />
                </InputGroup>
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor='Register'>Email</Form.Label>
                <Form.Control
                    type='text'
                    name='email'
                    required
                    id="inputEmailRegister"
                    value={data.email}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor='Register'>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    required
                    id='inputPasswordRegister'
                    value={data.password}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor='Register'>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    required
                    id='confirmPassword'
                />
                </Form.Group>
                <AvatarPicker pickAvatar={(avatar) => setProfileImage(avatar)}></AvatarPicker>
                {data.errorMessage && (
                <span className='form-error text-warning'>{data.errorMessage}</span>
                )}
                <Row className='mr-0'>
                <Col>
                    Already Registered?
                    <Button
                    as='a'
                    variant='link'
                    onClick={() => router.push("/login")}
                    >
                    Login
                    </Button>
                </Col>
                <Button type='submit' disabled={data.isSubmitting}>
                    {data.isSubmitting ? <LoadingSpinner /> : 'Sign up'}
                </Button>
                </Row>
            </Form>
        </Row>
      </Container>
    </div>
  )
}
