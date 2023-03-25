import RNFS from 'react-native-fs';

export const unlinkTmpFiles = async (tempFilePaths: Array<string>) => {
  try {
    await Promise.all(tempFilePaths.map(tempFilePath => {
      return RNFS.unlink(tempFilePath)
    }))

    console.log(`${tempFilePaths.length} temporary file(s) deleted successfully`);
  } catch(error) {
    console.log('Error deleting temporary files: ', error);
  };
}