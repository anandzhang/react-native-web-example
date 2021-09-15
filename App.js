import React, { useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider'
import CheckBox from 'react-native-check-box'
import Sound from 'react-native-sound'
import Toast from 'react-native-easy-toast'

const music = require('./music.mp3')

const App = () => {
  const [checked, setChecked] = useState(false)
  const toast = useRef(null)

  const changeChecked = () => setChecked(!checked)

  const playMusic = () => {
    toast.current.show('Play Music')
    const sound = new Sound(music, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }

      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    })
  }

  return (
    <SafeAreaView>
      <View>
        <Text>React Native Web Example</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor='#0984E3'
          maximumTrackTintColor='#000000'
        />
        <CheckBox
          onClick={changeChecked}
          isChecked={checked}
          rightText='Hello World'
        />
        <TouchableOpacity onPress={playMusic}>
          <Text>Play</Text>
        </TouchableOpacity>
        <Toast ref={toast} />
      </View>
    </SafeAreaView>
  )
}

export default App
