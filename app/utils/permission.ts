/* eslint-disable react-native/split-platform-components */
import { PermissionsAndroid, Permission } from "react-native"


export async function requestPermission(permissions: Array<Permission>) {
  try {
    const result = await PermissionsAndroid.requestMultiple(permissions);
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA
    // );

    if (_isPermissionGranted(result, permissions)) {
      return true
      // User granted camera permission
      // Do something here, like navigate to the camera screen
    } else {
      return false
      // User denied camera permission or pressed cancel
      // Navigate to fallback screen here
    }
  } catch (err) {
    console.warn(err);
    return false
  }
}

function _isPermissionGranted (permissionResult, permissions) {
  const granted = PermissionsAndroid.RESULTS.GRANTED
  let isGranted = true;
  permissions.forEach(permission => {
    if(permissionResult[permission] !== granted)
      isGranted = false
  });
  return isGranted
}