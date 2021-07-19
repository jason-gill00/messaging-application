import React, {useEffect} from 'react'
import immer from "immer";

function Chat({socketRef, message, setMessage, messages, setMessages, username, currentChat}) {
    
    function handleMessageChange(e){
        setMessage(e.target.value)
    }
    useEffect(() => {
        setMessage("")
    }, [messages])

    
    function sendMessage(){
        console.log("CURRENT CHAT: ",currentChat.chatName)
        const payload = {
            content: message,
            to: currentChat.chatName,
            sender: username
        }
        socketRef.current.emit("send message", payload)

        const newMessages = immer(messages, draft => {
            draft[currentChat.chatName].push({
                sender:username,
                content:message
            })
        })
        setMessages(newMessages)
        console.log(messages)
    }
    function handleKeyPress(e){
        if (e.key === "Enter"){
            sendMessage()
        }
    }
    
    return (
        <div className="chat">
            <div className="chat__messages">
                {messages[currentChat.chatName].map((message, index) => {
                    let otherUser = false
                    if (message.sender !== username){
                        otherUser = true
                    }
                    return (
                        <div className={`chat__message ${otherUser ? "other" : ""}`} style={{minWidth:`${message.sender.length*20}px`,maxWidth:`${message.content.length*20}px`}}  key={index}>
                            <h3 >{message.sender}</h3>
                            <p style={{maxWidth:`500px`}}>{message.content}</p>
                        </div>
                    )
                })}
            </div>
            <div className="content__footer">
              <div className="sendNewMessage">
                <button className="addFiles">
                  <i className="fa fa-plus"></i>
                </button>
                <input type="text" placeholder="Type a message here" value={message} onChange={handleMessageChange} onKeyPress={handleKeyPress}/>
                <button className="btnSendMsg" id="sendMsgBtn">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
        </div>
    )
}

export default Chat
