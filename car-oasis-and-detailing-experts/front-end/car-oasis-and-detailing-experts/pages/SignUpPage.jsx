import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const SignUpPage = () => {

    return (
        <>
            {/* <h1>Sign Up/Log In Page</h1> */}
            <div className='signuplogin'>
                <Form className='signup'>
                    <h3>Sign Up</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address: </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Full name: </Form.Label>
                        <Form.Control type='text' placeholder='ie. John Smith'/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Number: </Form.Label>
                        <Form.Control type='number' placeholder='ie. (123) 456-7890'/>
                    </Form.Group>

                    <Button variant="primary" type="submit"> Sign Up </Button>
                </Form>
                <h2>Already have an account? </h2>
                <Form className='login'>
                        <h3>Log In</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address: </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit"> Log In </Button>
                </Form>
            </div>

        </>
    )
}
export default SignUpPage