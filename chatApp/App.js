import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'
import io from 'socket.io-client'

export class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    }
  }

  componentDidMount() {
    this.socket = io("http://192.168.10.10:3000");
    this.socket.on("chat message", msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    })
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    // console.log(this.state.chatMessage);
    this.setState({chatMessage: ""})
  }


  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage =>(
      <Text key={chatMessage}>{chatMessage}</Text>
    ))
    return (
      <View>
        <TextInput 
          style={{height: 40, borderWidth: 2}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onChangeText={chatMessage=>{
            this.setState({chatMessage});
          }}
          onSubmitEditing={()=>{this.submitChatMessage()}}
        />
        {chatMessages} 
      </View>
    )
  }
}

export default App
