import React, { MutableRefObject, useCallback, useRef } from 'react'
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { BACKGROUND_COLOR } from '../constants'
import { AppDetails } from '../models/app-details'
import { RenderedIn } from '../models/rendered-in'
import { selectAppsListMemoized } from '../slices/appsList'
import { getListItemLayout, getListKey } from '../utils/apps'
import AllAppsLetterIndex from './AllAppsLetterIndex'
import AppItem from './AppItem'

const allowedPackageNames = [
  'com.android.settings',
  'com.google.android.dialer',
  'com.google.android.apps.photos',
  'com.google.android.contacts',
  'com.google.android.calendar',
  'com.android.camera2',
  'com.android.chrome',
  'com.heinekenmy.dsr',
]

const AllApps = () => {
  const apps = useSelector(selectAppsListMemoized)
  const listRef: MutableRefObject<FlatList<AppDetails> | null> = useRef(null)

  const scrollToIndex = useCallback(
    (index: number) => listRef.current?.scrollToIndex({ index, animated: true }),
    [listRef]
  )

  const renderItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.ALL_APPS} />
  )

  console.log('AllApps', { appNames: apps.map(app => app.packageName) })

  return (
    <Animated.View style={styles.wrapper} entering={SlideInDown}>
      <FlatList
        data={apps.filter(app => allowedPackageNames.includes(app.packageName))}
        ref={listRef}
        renderItem={renderItem}
        initialNumToRender={3}
        keyExtractor={getListKey}
        getItemLayout={getListItemLayout}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      />

      <AllAppsLetterIndex onPress={scrollToIndex} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    borderRadius: 5,
    paddingVertical: 5,
    position: 'relative',
    backgroundColor: BACKGROUND_COLOR,
  },
})

export default AllApps
