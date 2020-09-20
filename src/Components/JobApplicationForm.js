import React from 'react'
import axios from '../config/axios'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {Container,Row,Col,Card,Button} from 'bootstrap-4-react'
class JobApplicationForm extends React.Component{
    constructor(){
        super()
        this.state={
            submitMsg:''
        }
    }
     handleSubmit=(values,actions)=>{
        axios.post('/users/application-form',values)
        .then((response)=>{
            console.log('resolve',response.data)
            if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
            }
            else{
            this.setState({submitMsg:'Your Details has been Submitted'})
            actions.resetForm()
            }
          
        })
        .catch((err)=>{
            console.log('reject',err.message)
        })
       
            setTimeout(() => {
                this.setState({
                    submitMsg: ''
                })
            }, 7000)
        
    }

     formSchema=Yup.object().shape({
       name:Yup.string()
            .min(3,'too short')
            .max(50,'name should not be more than 50 characters')
            .required('please enter your name'),
        email:Yup.string()
              .email('Invalid format')
              .required('please enter your email'),
       jobTitle:Yup.string()
                .required('please select from given designation'),
        experience:Yup.string()
                    .required('please specify your experience'),     
        skills:Yup.string()
                .required('please enter your skills'),
        phone:Yup.string().matches( /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, {message: "Please enter valid mobile number."}).required('please enter your mobile number')
    })
    render(){
    return(
        <div className='form-color'>
             <Container>
                <h1 style={{color:'white'}}>Apply for Job</h1>
                <Formik
                    initialValues={{
                        name:'',
                        email:'',
                        phone:'',
                        jobTitle:'',
                        experience:'',
                        skills:''
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.formSchema}
                >
                
            <Card className='card-space'>
                <Form className='main_form'>
                    <Row className='row_space'>
                        <Col col='sm-4 md-3 xs-12'><label htmlFor='name' className='input-style'>Full name</label></Col>
                        <Col col='sm-8 md-9 xs-12'><Field type='text' name='name' id='name' className='input-style'/></Col>
                        <ErrorMessage name='name' className='errorMsg input-style' component='div'/>
                    </Row>
                    
                    <Row className='row_space'>
                        <Col col='sm-4 md-3 xs-12'><label htmlFor='email' className='input-style'>Email address</label></Col>
                        <Col col='sm-8 md-9 xs-12'><Field type='text' name='email' id='email' className='input-style' placeholder='example@email.com'/></Col>
                        <ErrorMessage name='email' className='errorMsg input-style' component='div'/>
                    </Row>
                    <Row className='row_space'>
                        <Col col='sm-4 md-3 xs-12'><label htmlFor='phone' className='input-style'>Contact number</label></Col>
                        <Col col='sm-8 md-9 xs-12'><Field type='text' name='phone' id='phone' className='input-style' placeholder='+91 8798765436'/></Col>
                        <ErrorMessage name='phone' className='errorMsg input-style' component='div'/>
                    </Row>
                    <Row className='row_space'>
                        <Col col='sm-4 md-3 xs-12'><label htmlFor='title' className='input-style'>Applying for Job</label></Col>
                        <Col col='sm-8 md-9 xs-12'><Field name='jobTitle' as='select' id='title' className='input-style'>
                            <option defaultValue>---Select---</option>
                            <option value='Front-End Developer'>Front-End Developer</option>
                            <option value='Node.js Developer'>Node.js Developer</option>
                            <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                            <option value='fULL Stack Developer'>fULL Stack Developer</option>
                        </Field></Col>
                        <ErrorMessage name='jobTitle' className='errorMsg input-style' component='div'/>
                    </Row>
                    <Row className='row_space'>
                        <Col col='sm-4 md-3 xs-12'><label htmlFor='experience' className='input-style'>Experience</label></Col>
                        <Col col='sm-8 md-9 xs-12'><Field type='text' className='input-style' name='experience' id='experience' placeholder='Experience(2 years,3 months)'/></Col>
                        <ErrorMessage name='experience' className='errorMsg input-style' component='div'/>
                    </Row>
                    <Row className='row_space'>
                        <Col col='sm-4 md-3 xs-12'><label htmlFor='techskills' className='input-style'>Technical Skills</label></Col>
                        <Col col='sm-8 md-9 xs-12'><Field component='textarea' name='skills' id='techskills' className='input-style' placeholder='Technical Skills'/></Col>
                        <ErrorMessage name='skills' className='errorMsg input-style' component='div'/>
                    </Row>
                    <div className='center-button'>
                        <Button primary type='submit'>Send Application</Button>
                    </div>
                    <p className='success-msg'>{this.state.submitMsg}</p>
                </Form>
            </Card>
                
            </Formik>
            
            </Container>
        </div>
      
    );
}
    
}

export default JobApplicationForm
