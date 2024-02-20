import React, { useMemo, useState } from 'react'
import { Image, Pressable, StyleProp, StyleSheet, Switch, View, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'
import SettingsItemLabel from '../components/Settings/shared/SettingsItemLabel'
import { SECONDARY_COLOR, WHITE_COLOR } from '../constants'
import AppsModule from '../native-modules/AppsModule'
import { selectDisplayAllApps } from '../slices/appState'

function Logo() {
  return (
    <Image
      source={{
        uri: 'https://cdn.discordapp.com/attachments/1011253519648559185/1209499022818017342/Heineken_logo3-2697333718.jpg?ex=65e724be&is=65d4afbe&hm=90746102914147e0d9644886c0cf83033477dbbe7c523ae250b38f85faefaca8&',
      }}
      style={{
        width: 60,
        height: '100%',
        backgroundColor: 'black',
      }}
      resizeMode='cover'
    />
  )
}

const BottomContainer = () => {
  const displayAllApps = useSelector(selectDisplayAllApps)

  const adaptiveStyle: StyleProp<ViewStyle> = useMemo(() => {
    return { backgroundColor: displayAllApps ? SECONDARY_COLOR : WHITE_COLOR }
  }, [displayAllApps])

  const [socialModeEnable, setSocialModeEnable] = useState(false)

  const toggleSwitch = (newValue: boolean) => {
    if (newValue) {
      AppsModule.showLauncherSelector()
    }
    setSocialModeEnable(prevValue => !prevValue)
  }

  return (
    <View style={[styles.wrapper, adaptiveStyle]}>
      {/* <AllAppsIcon /> */}

      <Logo />
      {/* <Search />
      <SettingsIcon /> */}

      <Pressable
        style={{
          alignItem: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          height: 60,
        }}>
        <SettingsItemLabel
          titleStyle={{
            // backgroundColor: 'pink',
            fontWeight: 'bold',
          }}
          wrapperStyle={{
            alignSelf: 'center',
          }}
          title='Social Mode'
        />

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={socialModeEnable ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={socialModeEnable}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default BottomContainer
