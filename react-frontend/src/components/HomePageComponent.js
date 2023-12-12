import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button';
import '../homepage.css';

function HomePageComponent() {
    return (
        <div className='HomePage'>

            <div>
                <div className='Title'>My Calendar</div>
            </div>

            <section>
                <section>
                    <p>TODO: User profile info</p>
                </section>
                
                <section>
                    <p>TODO: Weather</p>
                </section>
            </section>

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

            <section className='TodaysEvents'>  
                <h2>Todays Events</h2>
                <p>You Have No Events for today</p>
            </section>

            <section className='UpcomingEvents'>
                <h2>Upcoming Events</h2>
                <Container>
                    <Row>
                        <Col>Johnnys Soccer Game</Col>
                        <Col>Chrismas!</Col>
                    </Row>
                    <Row>
                        <Col>12/17/23</Col>
                        <Col>12/25/23</Col>
                    </Row>
                </Container>
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