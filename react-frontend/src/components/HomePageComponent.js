import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../homepage.css';

function HomePageComponent() {
    return (
        <div className='HomePage'>

            <div>
                <div className='Title'>My Calendar</div>
            </div>

            <section className='CalendarPreview'>
                <p>Calendar place holder</p>
                <Container>

                    <Row>
                        <Col>1 of 2</Col>
                        <Col>2 of 2</Col>
                    </Row>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                    </Row>
                </Container>
            </section>

            <section className='UpcomingEvents'>
                {/* <Button variant='primary'>Primary</Button>
                <Button variant = 'secondary'>Success</Button> */}
            </section>


        </div>





        // <Container>
        //   <Row>
        //     <Col>1 of 2</Col>
        //     <Col>2 of 2</Col>
        //   </Row>
        //   <Row>
        //     <Col>1 of 3</Col>
        //     <Col>2 of 3</Col>
        //   </Row>
        // </Container>
    );

}

export default HomePageComponent;