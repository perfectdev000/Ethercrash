import { useState, useEffect, useRef } from 'react'

let Chat = (props) => {
    let { messages, $messages } = props
    let chatDivRef = useRef()
    useEffect(() => {
      let chatDiv = chatDivRef.current
  
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 1)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 8)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 16)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 64)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 125)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 250)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 500)
      setTimeout(() => {
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 1000)
    }, [])
  
    let [newMessageText, $newMessageText] = useState('')
  
    let onSend = () => {
      $messages([...messages,  { time: '5:53', name: 'You', text: newMessageText}])
      $newMessageText('')
    }
  
    let onChange = (e) => {
      $newMessageText(e.target.value)
    }
  
    return (
      <div class="Chat" ref={chatDivRef}>
        <div class="Chat_content">
          {messages.map((M, MInd) => (
            <div class="ChatRow">
              <div class="ChatRow_time">{M.time}</div>
              <div class="ChatRow_name">{M.name}:</div>
              <div class="ChatRow_text">{M.text}</div>
            </div>
          ))}
        </div>
        <div class="Chat_newMessage ChatNewMessage">
          <input class="ChatNewMessage_input" value={newMessageText} onChange={onChange} />
          <button class="ChatNewMessage_button" onClick={onSend}>Send</button>
        </div>
      </div>
    )
  }

  export default Chat
  