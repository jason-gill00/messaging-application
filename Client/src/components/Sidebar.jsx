import React from 'react'
// import general_icon from '../img/icons_sidebar/chat_icon.png'
// import soccer_icon from '../img/icons_sidebar/soccer_icon.png'
// import basketball_icon from '../img/icons_sidebar/basketball_icon.png'
// import formula1_icon from '../img/icons_sidebar/formula1_icon.png'
import chat from '../img/sidebar_icons/chat-icon.png';

// import icons from './icons';


function Sidebar({participants, currentChat, setCurrentChat}) {



  return (
          <div className="lobby">
            <div className="lobby__info">
              <div className="lobby__img">
                <img src={`./img/icons_sidebar/${currentChat.chatName}_icon.png`} alt="logo"></img>
              </div>
              <h1>{currentChat.chatName}</h1>
            </div>
            <div className="lobby__participants">
                <h2>Participants</h2>
                {participants.map((participant, id) => {
                    return(
                        <div className="lobby__participant flex flex-jc-se flex-ai-c">
                            <p>{participant}</p>
                            <img src={chat} alt="logo"></img>
                        </div>
                    )}
                )}
            </div>
          </div>

    )
}

export default Sidebar
