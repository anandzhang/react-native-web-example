import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider'
import CheckBox from 'react-native-check-box'
import Sound from 'react-native-sound'

const App = () => {
  const [checked, setChecked] = useState(false)

  const changeChecked = () => setChecked(!checked)

  const playMusic = () => {
    const sound = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }

      // Play the sound with an onEnd callback
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
      </View>
    </SafeAreaView>
  )
}

export default App
