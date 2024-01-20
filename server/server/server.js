import { GraphQLServer, PubSub } from 'graphql-yoga';
const messages = []
const users = []
const rooms = []
const typeDefs = `
    type Message{
        id: ID!
        user: String!
        content: String!
    }
    type User{
        id:ID!
        name:String!
    }
    type Room {
        id:ID!
        name:String!
        users:[User!]!
    }
    type Query {
        messages:[Message!]
        rooms:[Room!]
        users:[User!]

    }
    type Mutation{
        postMessage(user:String!,content:String!):ID!
        addUserToRoom(roomId:ID!, user:String!):ID!
        createUser(name:String!):ID!
        createRoom(name:String!,id:ID!,user:String!):ID!
    }
    type Subscription{
        messages:[Message!]
    }
`;
const subscribers = []
const onMessagesUpdates = (fn) => subscribers.push(fn)
const resolvers = {
    Query: {
        messages: () => messages,
        rooms: () => rooms,
        users: () => users
    },
    Mutation: {
        postMessage: (_, { user, content }) => {
            const id = messages.length;
            messages.push({
                id,
                user,
                content
            });
            subscribers.forEach((fn) => fn());
            return id

        },

        addUserToRoom: (_, { user, roomId }) => {
            if (rooms.length > 0) {
                room = rooms.filter((room) => room.id === roomId)

                room.push({
                    users: {
                        ...users,
                        user
                    }

                })
                return user
            }
        },
        createUser: (_, { name }) => {
            const id = users.length
            users.push({
                name,
                id
            })
            return id

        },
        createRoom: (_, { name: roomName, id: roomId, user }) => {
            room = rooms.filter(room => room.id == roomId)
            if (room) {
                return;
            }
            rooms.push(
                {
                roomId,
                roomName,
                users: {
                    user,
                    id: Math.random() * 10
                }

            })
            return roomName
        }
    },
    Subscription: {
        messages: {
            subscribe: ({ pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onMessagesUpdates(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, { messages }), 0);
                return pubsub.asyncIterator(channel);
            },
        },
    },
};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => console.log(`Server started at http://localhost:${port}/`)
)