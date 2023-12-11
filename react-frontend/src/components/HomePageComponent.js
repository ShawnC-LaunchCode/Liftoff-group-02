import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../homepage.css';

function HomePageComponent() {
    return (
        <body className='HomePage'>
           
            <Container className='TopBar'>
                <div className='Title'>My Calendar</div>
            </Container>

            <section className='CalendarPreview'>
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



        </body>





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