import React from 'react'
import {Modal,Button,Nav,Tab,Container,Row,Col} from 'bootstrap-4-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment'
import axios from '../config/axios'
class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            userDetails:[],
            selectedUser:{},
            titleSelected:'Front-End Developer',
            jobTitles:['Front-End Developer',' Node.js Developer',' MEAN Stack Developer','FULL Stack Developer']
        }
    }
    componentDidMount(){
        axios.get('/users/application-forms')
        .then((response)=>{
            console.log(response)
            const userDetails=response.data
            this.setState({userDetails})
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    selectedUser=(id)=>{
      console.log(id)
      const selectedUser=this.state.userDetails.find(user=>user._id==id)
      console.log(selectedUser)
      this.setState({selectedUser})
    }

    handleStatus=(id,status)=>{
      console.log(id,status)
      const formData={
        status
      }
      axios.put(`/users/application-form/update/${id}`,formData)
     
      .then((response)=>{
        console.log(response)
        const userStatus=response.data
        alert(`candidate status has been ${userStatus.status}`)
        this.setState(function(prevState){
          return{
              userDetails:prevState.userDetails.map(user=>{
                if(user._id==id){
                  return Object.assign({},user,userStatus) //{...userStatus}
                }
                else{
                  return Object.assign({},user)//{...user}
                }
          })

                }
            })
        })
        
      .catch((err)=>{
        console.log(err.message)
      })
    }

    handleDesignation=(name)=>{
        console.log(name)
        this.setState({titleSelected:name})
      
      }
    render(){
        return(
            <div>
              <Container>
                <h1>AdminDashboard</h1>
                <React.Fragment>
                  <Nav tabs role="tablist">
                    <Nav.ItemLink  href="#frontend"  id="frontend-tab" data-toggle="tab" show active aria-selected="false" onClick={()=>this.handleDesignation('Front-End Developer')}>
                      Front-End Developer
                    </Nav.ItemLink>
                    <Nav.ItemLink href="#nodejs" id="nodejs-tab" data-toggle="tab" aria-selected="false" onClick={()=>this.handleDesignation('Node.js Developer')}>
                      Node.js Developer
                    </Nav.ItemLink>
                    <Nav.ItemLink href="#meanstack" id="meanstack-tab" data-toggle="tab" aria-selected="false" onClick={()=>this.handleDesignation('MEAN Stack Developer')}>
                      MEAN Stack Developer
                    </Nav.ItemLink>
                    <Nav.ItemLink href="#fullstack" id="fullstack-tab" data-toggle="tab" aria-selected="false" onClick={()=>this.handleDesignation('FULL Stack Developer')}>
                      FULL Stack Developer
                    </Nav.ItemLink>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane id="frontend" aria-labelledby="frontend-tab" active>
                      <h1>{this.state.titleSelected}s</h1>
                      <p>List of candidates for {this.state.titleSelected} job</p>
                    </Tab.Pane>
                    <Tab.Pane id="nodejs" aria-labelledby="nodejs-tab">
                      <h1>{this.state.titleSelected}s</h1>
                      <p>List of candidates for {this.state.titleSelected} job</p>
                    </Tab.Pane>
                    <Tab.Pane id="meanstack" aria-labelledby="meanstack-tab">
                      <h1>{this.state.titleSelected}s</h1>
                      <p>List of candidates for {this.state.titleSelected} job</p>
                    </Tab.Pane>
                    <Tab.Pane id="fullstack" aria-labelledby="fullstack-tab">
                      <h1>{this.state.titleSelected}s</h1>
                      <p>List of candidates for {this.state.titleSelected} job</p>
                    </Tab.Pane>
                  </Tab.Content>
                  </React.Fragment>
                        <div className='table-responsive'>
                          <table className='table'>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Technical Skills</th>
                                      <th>Experience</th>
                                      <th>Applied Date</th>
                                      <th>View Details</th>
                                      <th>Update Application Status</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                      this.state.userDetails.filter(user=>{
                                            if(user.jobTitle==this.state.titleSelected){
                                              return user
                                            }
                                      }).map(user=>{
                                          return(
                                              <tr key={user._id}>
                                                  <td>{user.name}</td>
                                                  <td>{user.skills}</td>
                                                  <td>{user.experience}</td>
                                                  <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                                                  <td><Button primary data-toggle="modal" data-target="#exampleModal" onClick={()=>{this.selectedUser(user._id)}}>view Details</Button></td>
                                                  <td>{user.status=='applied'&&<div style={{display:'flex'}}><Button success onClick={()=>{this.handleStatus(user._id,'shortlisted')}}>shortlisted</Button><Button danger onClick={()=>{this.handleStatus(user._id,'rejected')}}>rejected</Button></div>}{user.status=='shortlisted' && <Button success>shortlisted</Button>}{user.status=='rejected' && <Button danger>rejected</Button>}</td>
                                              </tr>
                                          )
                                      })
                                  }
                              </tbody>
                          </table>
                        </div>
                        
                        <Modal id="exampleModal" fade>
                          <Modal.Dialog>
                            <Modal.Content>
                              <Modal.Header>
                                <Modal.Title>{this.state.selectedUser.name} profile</Modal.Title>
                                <Modal.Close>
                                  <span aria-hidden="true">&times;</span>
                                </Modal.Close>
                              </Modal.Header>
                              <Modal.Body>
                              <Row style={{padding:'8px'}}>
                                <Col col='sm-6 md-5 6'>contact number</Col> 
                                <Col col='sm-6 md-7 6'>{this.state.selectedUser.phone}</Col>
                              </Row>
                              <Row style={{padding:'8px'}}>
                                <Col col='sm-6 md-5 6'>Email </Col>
                                <Col col='sm-6 md-7 6'>{this.state.selectedUser.email}</Col>
                              </Row>
                              <Row style={{padding:'8px'}}>
                                <Col col='sm-6 md-5 6'>Skills</Col> 
                                <Col col='sm-6 md-7 6'>{this.state.selectedUser.skills}</Col>
                              </Row>
                              <Row style={{padding:'8px'}}>
                                <Col col='sm-6 md-5 6'>Experience </Col>
                                <Col col='sm-6 md-7 6'>{this.state.selectedUser.experience}</Col>
                              </Row>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button secondary data-dismiss="modal">Close</Button>
                                <Button primary>Save changes</Button>
                              </Modal.Footer>
                            </Modal.Content>
                          </Modal.Dialog>
                        </Modal>
                          
                </Container>
              
            </div>
        )
    }
}

export default AdminDashboard