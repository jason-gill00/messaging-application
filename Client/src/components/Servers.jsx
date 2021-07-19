import React from 'react'
import general_icon from '../img/icons_sidebar/chat_icon.png'
import soccer_icon from '../img/icons_sidebar/soccer_icon.png'
import basketball_icon from '../img/icons_sidebar/basketball_icon.png'
import formula1_icon from '../img/icons_sidebar/formula1_icon.png'
// import immer from "immer";
// import chat from '../img/sidebar_icons/chat-icon.png';

function Servers({messages, setMessages, roomJoinCallback, socketRef, currentChat, setCurrentChat}) {
  function joinRoom(){
    socketRef.current.emit("join room", currentChat.chatName, (messages)=> roomJoinCallback(messages, currentChat.chatName))
    // socketRef.current.on("new message", ({content, sender, chatName}) => {
    //   setMessages(messages => {
    //     const newMessages = immer(messages, draft => {
    //       if (draft[chatName]) {
    //         draft[chatName].push({content, sender})
    //       } else{
    //         draft[chatName] = [{content, sender}]
    //       }
    //     })
    //     return newMessages
    //   })
    //   console.log(messages)
    // })
  }
    return (
          <div className="sidebar">
            <div className="sidebar__servers ">
              <div className="sidebar__server icon" onClick={()=>{setCurrentChat({isChannel:true, chatName:"general", receiverId:""});joinRoom();}}>
                <img src={general_icon} alt="logo"></img>
              </div>
              <div className="sidebar__server icon" onClick={()=>{setCurrentChat({isChannel:true, chatName:"soccer", receiverId:""});joinRoom();}}>
                <img src={soccer_icon} alt="logo"></img>
              </div>
              <div className="sidebar__server icon" onClick={()=>{setCurrentChat({isChannel:true, chatName:"basketball", receiverId:""});joinRoom();}}>
                <img src={basketball_icon} alt="logo"></img>
              </div>
              <div className="sidebar__server icon" onClick={()=>{setCurrentChat({isChannel:true, chatName:"formula1", receiverId:""});joinRoom();}}>
                <img src={formula1_icon} alt="logo"></img>
              </div>
            </div>
          </div>
    )
}

export default Servers
