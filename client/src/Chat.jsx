import React from 'react';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import Messages from "./components/Messages";

const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true,
    },
});

const client = new ApolloClient({
    link,
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});



const POST_MESSAGE = gql`
mutation($user:String!,$content:String!){
    postMessage(user:$user,content:$content)
}
`
const CREATE_USER = gql`
mutation($name:String!){
    createUser(name:$name)
}
`


const Chat = () => {
    const [state, setState] = React.useState({
        user: 'Berkay',
        content: ''
    })
    const [postMessage] = useMutation(POST_MESSAGE)
    const [createUser] = useMutation(CREATE_USER)
    const onSend = () => {
        if (state.content.length > 0) {
            postMessage({
                variables: state,
            })
        }
        setState({
            ...state,
            content: ''
        })
    }
    return (
        < Container >
            
            <Messages user='Berkay' />
            <Row>
                <Col xs={2} style={{ padding: 0 }}>
                    <FormControl
                        type="text"
                        label="User"
                        value={state.user}
                        onChange={(val) => setState({ ...state, user: val.target.value, })}
                    />
                </Col>
                <Col xs={8}>
                    <FormControl
                        type="text"
                        label="Content"
                        value={state.content}
                        onChange={(val) => setState({ ...state, content: val.target.value, })}
                        onKeyUp={(val) => {
                            if (val.keyCode === 13) {
                                onSend();
                            }
                        }}
                    />
                </Col>
                <Col xs={2}>
                    <Button onClick={() => onSend()}> Send </Button>
                </Col>
            </Row>
        </Container >
    )
}


export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
)