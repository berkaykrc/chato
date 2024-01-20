import { gql, useMutation } from "@apollo/client";
import {useParams, useRouteMatch} from "react-router-dom"
import Chat from "../Chat";

const ADD_USER_TO_ROOM = gql`
mutation($user:[User!])
`

export default function Room() {
    const { addUserToRoom } = useMutation(ADD_USER_TO_ROOM)
    
    addUserToRoom(
        {
            variables: "",
        }
    )
    return (
        <div>
            <Chat />
        </div>
    )
}

