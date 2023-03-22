import CloudSync from './cloudSyncO.svg'; //
/**
 * Above import is for svg-transformer feature
 * Ref: https://www.npmjs.com/package/react-native-svg-transformer
 */
export const icons = {
  back: require("./arrow-left.png"),
  bullet: require("./bullet.png"),
  bug: require("./ladybug.png"),
  // checkMark: require("./checkmark.png")
}

export const vIcons = {
  cloudSync: require("./cloudSync").default,
  checkMark: require("./checkMark").default,
  close: require("./close").default,
  search: require("./search").default,
  removeCircle: require("./removeCircle").default,
  camera: require("./camera").default,
  arrow: require("./arrow").default,
  logout: require("./logout").default
  // cloudSync: CloudSync,
}

export type IconTypes = keyof typeof icons
export type VIconTypes = keyof typeof vIcons
