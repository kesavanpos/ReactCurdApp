import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { fetchUser, deleteUser } from "../../actions/user";
import { connect } from 'react-redux';
import Create from "../User/Create"
import Footer from "../shared/Footer";
import Loading from "../shared/Loader";

const initialState = {
    showEdit: false,
    showDeleteModal: false,
    selDeleteUserId: '',
    user: {
        id: "",
        firstname: "",
        lastname: "",
        picture: ""
    }
}


class List extends Component {

    constructor(props) {
        super(props);
        // sets up the intialState
        this.state = initialState;
    }

    componentDidMount() {
        // get all users
        this.props.fetchUser();
    }

    handleEdit = (e) => {
        // handle edit flow to pass the edit user to create component
        let user = this.props.users.filter((u) => u.id === e.currentTarget.value)[0];

        this.setState({
            showEdit: true,
            showDeleteModal: false,
            message:"Do you want to update the record ?",
            user: {
                id: user.id,
                firstname: user.name.first,
                lastname: user.name.last,
                picture: user.picture,
                error: []
            }
        });
    }

    handleSuccessModal = () => {
        // handle modal success to trigger delete call
        this.setState({ showDeleteModal: false });
        if(this.state.selDeleteUserId !== '')
        {
            this.props.deleteUser(this.state.selDeleteUserId);
        }
    }

    render() {
        const { users, error, pending } = this.props;

        if (error && error.length) {
            return <div>Please check Your NetworkConnection</div>;
        }
        else if (pending) {
          return  <Loading loading={pending} />
        }
        else {
            return (
                <>
                    <Container>

                        <Create user={this.state.user}
                            edit={this.state.showEdit}
                        />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Picture</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((u, i) => {
                                        return [
                                            <tr key={u.id}>
                                                <td>{u.name.first}</td>
                                                <td>{u.name.last}</td>
                                                <td><img src={u.picture} alt="Album Art" style={{ height: '50px' }} /></td>
                                                <td>
                                                    <Button value={u.id} onClick={this.handleEdit}>Edit</Button> <Button variant="danger" value={u.id} onClick={(e) => {
                                                        this.setState({ showDeleteModal: true, selDeleteUserId: u.id,message:'You are about to delete the record ?' });
                                                    }}>Delete</Button>
                                                </td>
                                            </tr>
                                        ];
                                    })
                                }
                            </tbody>
                        </Table>
                        <Footer/>
                    </Container>

                    <Modal show={this.state.showDeleteModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>User Management</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.message}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {this.setState({showDeleteModal:false})}}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={this.handleSuccessModal}>
                                Ok
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }

    }
}

const mapStateToProps = (state) => {    
    return {
        users: state.userReducer.payload,
        error: state.userReducer.error,
        pending: state.userReducer.pending
    };
};

export default connect(mapStateToProps, { fetchUser, deleteUser })(List);





