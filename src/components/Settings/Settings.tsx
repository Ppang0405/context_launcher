import React, { useState } from 'react'
import { Pressable, StyleSheet, Switch, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { BOTTOM_CONTAINER_HEIGHT_WITH_PADDINGS } from '../../constants'
import { selectDisplaySettings, setDisplaySettings } from '../../slices/appState'
import SettingsHeader from './SettingsHeader'
import SettingsItemLabel from './shared/SettingsItemLabel'

const Settings = () => {
  const dispatch = useDispatch()
  const displaySettings = useSelector(selectDisplaySettings)
  const [socialModeEnable, setSocialModeEnable] = useState(false)

  const closeSettings = () => {
    dispatch(setDisplaySettings(false))
  }

  const toggleSwitch = () => {
    setSocialModeEnable(prevValue => !prevValue)
  }

  return (
    <Portal>
      <Modal contentContainerStyle={styles.contentContainerStyle} visible={displaySettings} onDismiss={closeSettings}>
        <View testID='settings-wrapper'>
          <SettingsHeader />

          

          {/* <ToggleSettings title={'Pinned Apps'}>
            <PinnedAppsSettings />
          </ToggleSettings>

          <ToggleSettings title={'Favorite Apps'}>
            <FavoriteAppsSettings />
          </ToggleSettings> */}

          {/* <ToggleSettings title={'Advanced Settings'}>
            <AdvancedSettings />
          </ToggleSettings> */}
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: BOTTOM_CONTAINER_HEIGHT_WITH_PADDINGS,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
})

export default Settings
