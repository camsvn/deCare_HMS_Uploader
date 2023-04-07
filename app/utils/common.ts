import RNFS from 'react-native-fs';

export const unlinkTmpFiles = async (tempFilePaths: Array<string>) => {
  try {
    await Promise.all(tempFilePaths.map(tempFilePath => {
      return RNFS.unlink(tempFilePath)
    }))
  } catch(error) {
    console.log('Error deleting temporary files: ', error);
  };
}