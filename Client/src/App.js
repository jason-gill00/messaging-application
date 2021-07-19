import './App.css';
import React, { useState, useRef } from 'react';
import io from "socket.io-client";
import immer from "immer";
//Components
import Sidebar from './components/Sidebar'
import Nav from './components/Nav'
import Form from './components/Form'
import Servers from './components/Servers'
import Chat from './components/Chat'
//Testing 123

const initialMessageState = {
  general: [],
  soccer: [],
  basketball: [],
  formula1: []
}


function App() {

  const [username, setUsername] = useState("")
  const [connected, setConnected] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "general", receiverId: "" })
  const [messages, setMessages] = useState(initialMessageState)
  const [message, setMessage] = useState("")
  const socketRef = useRef();

  function handleChange(e) {
    setUsername(e.target.value)
  }

  function roomJoinCallback(incomingMessages, room) {
    const newMessages = immer(messages, draft => {
      draft[room] = incomingMessages
    })
    setMessages(newMessages)
  }


  function connect() {
    setConnected(true)
    console.log("inside connect function")
    socketRef.current = io.connect("/")
    socketRef.current.emit("join server", username)
    socketRef.current.on("new user", users => {
      const newUsers = immer(allUsers, draft => {
        users.forEach(user => draft.push(user.username))
      })
      setAllUsers(newUsers)
    })
    // const newUser = immer(allUsers, draft => {
    //   draft.push(username)
    // })
    // setAllUsers(newUser)
    // socketRef.current.on("new user", allUsers => {
    //   setAllUsers(allUsers)
    // })
    // console.log(allUsers)
    // socketRef.current.emit("join room", "general")
    socketRef.current.emit("join room", "general", (messages) => {roomJoinCallback(messages, "general")})
    // socketRef.current.on("new message", ({content, chatName, sender}) => {
    //   const newMessages = immer(messages, draft => {
    //     if(draft[chatName]){
    //       draft[chatName].push({content, sender})
    //     }
    //   })
    // })
    socketRef.current.on("new message", ({content, sender, chatName}) => {
      setMessages(messages => {
        const newMessages = immer(messages, draft => {
          if (draft[chatName]) {
            draft[chatName].push({content, sender})
          } else{
            draft[chatName] = [{content, sender}]
          }
        })
        return newMessages
      })
      console.log(messages)
    })
  }

  let body;

  if (connected) {
    body = (
      <div className="app__container">
        <Nav />
        <div className="container flex">
          <Servers messages={messages} setMessages={setMessages} roomJoinCallback={roomJoinCallback} socketRef = {socketRef} currentChat={currentChat} setCurrentChat={setCurrentChat} />
          <Sidebar participants={allUsers} currentChat={currentChat} />
          <Chat socketRef = {socketRef} message={message} setMessage={setMessage} messages={messages} setMessages={setMessages} username={username} currentChat={currentChat} />
        </div>
      </div>
    )
  } else {
    body = (<Form username={username} onChange={handleChange} connect={connect} />)
  }


  return (
    <div className="App">
      {body}
    </div>
  );
}

export default App;
