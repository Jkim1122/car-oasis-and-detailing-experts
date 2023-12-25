import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { api } from "../src/utilities";
import { useNavigate, useOutletContext } from "react-router-dom"

const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [full_name, setFull_name] = useState('')
    const [number, setNumber] = useState(null)
    const [password, setPassword] = useState('')
    const {client, setClient} = useOutletContext()


    // console.log(email)
    const navigate = useNavigate()
//signup
    const handleSignUp = async(e) => {
        e.preventDefault()
        // console.log('button pressed')
        const data = {email, password, full_name, number}
        const response = await api
            .post("users/signup/", data)
            .catch(err => console.log(`signup err ${err}`))
        const clientEmail = response.data.client //email
        const token = response.data.token
        alert("sign up success")
        console.log(`Sign up success, email: ${clientEmail}, token: ${token}`)

        api.defaults.headers.common["Authorization"] = `Token ${token}`
        localStorage.setItem("token", token);
        localStorage.setItem("email", clientEmail);

        // Goto homepage after successful signup
        navigate("/signup")
    }   
    
//login
    const handleLogIn = async(e) => {
        e.preventDefault()
        // console.log(`email:${email}, password: ${password}`)
        let response = await api.post("users/login/", {
            email: email,
            password: password,
          });
        //   console.log(response)
          if (response.status === 200) {
            setClient(response.data);
            alert("login success")
            localStorage.setItem("token", response.data.token);
            api.defaults.headers.common[
              "Authorization"
            ] = `Token ${response.data.token}`;
            navigate("/user")
            } else {
            alert("Something Went wrong");
            }
    };
    

    return (
        <>
            <div className='signuplogin'>
                <Form className='signup' onSubmit={handleSignUp}>
                    <h3>Sign Up</h3>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address: </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Full name: </Form.Label>
                        <Form.Control type='text' placeholder='ie. John Smith' onChange={(e) => setFull_name(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password: </Form.Label>
                        <Form.Control className="form-control" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Number: </Form.Label>
                        <Form.Control type='text' placeholder='ie. (123) 456-7890'onChange={(e) => setNumber(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit"> Sign Up </Button>
                </Form>
                <h2>Already have an account? </h2>
                <Form className='login' onSubmit={handleLogIn}>
                        <h3>Log In</h3>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address: </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password: </Form.Label>
                        <Form.Control className="form-control" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit"> Log In </Button>
                </Form>
            </div>

        </>
    )
}
export default SignUpPage