import React, { Component } from 'react';
import Moment from "react-moment";
import { Card, Image, Container, Row, Col } from "react-bootstrap";

class Order extends Component {
    state = {
        worker: {},
    }
    async componentDidMount() {
        const workerId = this.props.order.workerId;
        const api_call = await fetch(`https://www.hatchways.io/api/assessment/workers/${workerId}`);
        const data = await api_call.json();
        this.setState({ worker: data.worker });
    }

    render() {
        const order = this.props.order;
        return (
            <Col md={6}>
              <Card style={{ width: "24rem", height: "30rem", marginBottom: "2rem" }}>

                <Card.Body>
                  <Card.Title>{ order.name }</Card.Title>
                  <Card.Text>{ order.description }</Card.Text>
                </Card.Body>

                <Card.Body>
                  <Container>
                    <Row>
                      <Col xs={12} md={6}>
                        <Image className="profile_img" roundedCircle src={this.state.worker.image} alt={this.state.worker.name}/>
                      </Col>
                      <Col xs={12} md={6}>
                        <Card.Text style={{ fontSize: 15}}>Name: { this.state.worker.name }</Card.Text>
                        <Card.Text style={{ fontSize: 12}}>Company: { this.state.worker.companyName }</Card.Text>
                        <Card.Text style={{ fontSize: 12}}>{ this.state.worker.email }</Card.Text>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer align="left">
                  Deadline: {" "}
                  <Moment unix format="MM/DD/YYYY, h:mm:ss a">
                    { order.deadline }
                  </Moment>
                </Card.Footer>
              </Card>
            </Col>
        );
    }
}

export default Order;

