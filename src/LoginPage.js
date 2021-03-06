import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from './_services/authenticationService';
import {Row, Card,Col, CardTitle,CardText, Button, } from 'reactstrap'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('LoginPage.js: within constructor of login page'); 
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/BillyDev_Demo');
        }
    }

    render() {
        return (

            <Row>
                <Col sm='3'>

                </Col>
                <Col sm='2'>
                <div>
                <div className="alert alert-info">
                    Username: alex123<br />
                    Password: alex123
                </div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        console.log('in LoginPage.js, onsubmit...');
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                  user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/BillyDev_Demo" } };
                                    this.props.history.push(from);
                                    console.log('LoginPage.js within  onSubmit  authentication back!');
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                            console.log('in LoginPage.js, onsubmit  authenticationservice login method is called!!');
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary form-control" disabled={isSubmitting}>Login</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {/* { status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            } */}
                        </Form>
                    )}
                />
            </div>
                </Col>
                <Col sm="4">
                    <Card body>
                    <CardTitle>Orange Process Management</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                    </Card>
                </Col>
                <Col sm='3'>

                </Col>
            </Row>


        )
    }
}

export default LoginPage 