import { Howl } from 'howler'

/**
 * 替换 react-native-sound 库
 *
 * @class Sound
 */
class Sound {
    constructor(source, callback) {
        this.sound = new Howl({
            src: [source],
            onload: () => callback(null),
        });
    }

    static setCategory = () => null

    setNumberOfLoops = () => null

    play = (callback) => {
        this.sound.on('end', callback)
        this.sound.play()
    }

    release = () => null
}

export default Sound
