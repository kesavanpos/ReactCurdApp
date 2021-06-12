import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { createUser, updateUser } from "../../actions/user";
import { connect } from 'react-redux';
import * as validation from "../constants";

const initialState = {
    id: "",
    firstname: "",
    lastname: "",
    picture: "",
    errors: [],
    isUpdated: false
}

const validationStyle = {
    color: "red",
    float: "left"
}


class Create extends Component {

    constructor(props) {
        super(props);
        // sets up initial state
        this.state = initialState;
    }
    
    componentDidUpdate(prevProps, prevState) {        
        if (!this.state.isUpdated && this.props.edit) {
            this.firstnameinput.value = '';
            this.lastnameinput.value = '';
            this.pictureinput.value = '';
            // set the value from props to create/update form
            this.firstnameinput.value = (this.firstnameinput.value === '') ?
                                        this.props.user.firstname :this.firstnameinput.value;
            this.lastnameinput.value = (this.lastnameinput.value === '') ?
                                        this.props.user.lastname : this.lastnameinput.value;
            this.pictureinput.value = (this.pictureinput.value === '') ?
                                     this.props.user.picture: this.pictureinput.value;
        }
    }

    handleValidation = () => {
        // handles validation
        let errors = {};
        let formIsValid = true;

        //Name
        if (!this.firstnameinput.value) {
            formIsValid = false;
            errors["firstname"] = validation.VALIDATION_FIRSTNAME;
        }

        if (!this.lastnameinput.value) {
            formIsValid = false;
            errors["lastname"] = validation.VALIDATION_LASTNAME;
        }

        if (!this.pictureinput.value) {
            formIsValid = false;
            errors["picture"] = validation.VALIDATION_PICTURE;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = (e) => {
        this.setState({ isUpdated: true });
    }

    handleAddUser = (e) => {
        window.location.href = "/";
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        // call to handlevalidation to check whether validation is success or not
        if (this.handleValidation()) {
            let formValue = {
                firstname: this.firstnameinput.value,
                lastname: this.lastnameinput.value,
                picture: this.pictureinput.value,
                id: this.props.user.id
            }

            if (this.props.user.id === '') {
                this.props.createUser(formValue);
                window.location.href = "/";
            }
            else if (this.state.isUpdated) {
                this.props.updateUser(this.props.user.id, formValue);
                window.location.href = "/";
            }
        }
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit} style={{ margin: "10px 0 10px 0" }}>
                <Row>
                    <Col>
                        <Form.Control name="firstname" placeholder="First Name"
                            ref={myinput => (this.firstnameinput = myinput)}
                            onBlur={this.handleChange}
                        />
                        <span style={validationStyle}>{this.state.errors["firstname"]}</span>
                    </Col>
                    <Col>
                        <Form.Control name="lastname" placeholder="Last Name"
                            ref={myinput => (this.lastnameinput = myinput)}
                            onBlur={this.handleChange}
                        />
                        <span style={validationStyle}>{this.state.errors["lastname"]}</span>
                    </Col>
                    <Col>
                        <Form.Control name="picture" placeholder="Picture"
                            ref={myinput => (this.pictureinput = myinput)}
                            onBlur={this.handleChange}
                        />
                        <span style={validationStyle}>{this.state.errors["picture"]}</span>
                    </Col>
                    <Col>
                        {!this.props.edit ?
                            (
                                <Button onClick={this.handleSubmit}>Add User</Button>) :
                            (
                                <>
                                    <Button onClick={this.handleSubmit}>Update User</Button> <Button onClick={this.handleAddUser}>Cancel</Button>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </Form>
        )
    }

}

export default connect(null, { createUser, updateUser })(Create);