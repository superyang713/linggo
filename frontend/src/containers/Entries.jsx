import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {Col, Form} from 'react-bootstrap';

import "./Entries.css";


class Entries extends Component {
    state = {
        entries: [],
        word: "",
        example: "",
    }

    async componentDidMount() {
        const user_name = this.props.match.params.user_name;
        const api_call_entries = await fetch(
            `http://127.0.0.1:5000/api/entry?user_name=${user_name}`
        );
        const data = await api_call_entries.json();
        this.setState({ entries: data.entries });
    }

    addEntry = async (e) => {
        e.preventDefault();
        const user_name = this.props.match.params.user_name;
        const payload = {
            "user_name": user_name,
            "word": this.state.word,
            "example": this.state.example,
        };
        this.setState({ entries: [...this.state.entries, payload]});

        await fetch("http://127.0.0.1:5000/api/entry", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
    }

    removeEntry = async (e) => {
        e.preventDefault();
        const user_name = this.props.match.params.user_name;
        const word = e.target.getAttribute("word");
        const example = e.target.getAttribute("example");

        const payload = {
            "user_name": user_name,
            "word": word,
            "example": example,
        };

        await fetch("http://127.0.0.1:5000/api/entry", {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const api_call_entries = await fetch(
            `http://127.0.0.1:5000/api/entry?user_name=${user_name}`
        );
        const data = await api_call_entries.json();
        this.setState({ entries: data.entries });
    }

    render() {
        return (
            <div className="Entries">
              <h1>Adposition Words</h1>
              <Form onSubmit={this.addEntry} style={{ marginBottom: "2rem"}}>

                <Form.Row >
                  <Col>
                    <Form.Control
                      placeholder="New Word"
                      onChange={e => this.setState({word: e.target.value})}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Example"
                      onChange={e => this.setState({example: e.target.value})}
                    />
                  </Col>
                  <Col>
                    <Button variant="primary" onClick={this.addEntry}>Add</Button>
                  </Col>
                </Form.Row>

              </Form>

              {this.state.entries.map((entry, idx) => (
                  <ListGroup horizontal className="my-2" key={idx}>

                    <ListGroup.Item className="Item">
                      <Button
                        word={entry.word}
                        example={entry.example}
                        idx={idx}
                        variant="danger"
                        onClick={this.removeEntry}>remove
                      </Button>
                    </ListGroup.Item>

                    <ListGroup.Item>{ entry.word }</ListGroup.Item>
                    <ListGroup.Item>{ entry.example }</ListGroup.Item>
                  </ListGroup>))}
            </div>
        );
    }
}

export default Entries;
