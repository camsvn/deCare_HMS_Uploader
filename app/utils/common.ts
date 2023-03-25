import RNFS from 'react-native-fs';

export const unlinkTmpFiles = (tempFilePaths: Array<string>) => {
  // Promise.all(tempFilePaths.map(tempFilePath => RNFS.unlink(tempFilePath)))
  // .then(() => {
  //   console.log('All temporary files deleted successfully');
  // })
  // .catch(error => {
  //   console.log('Error deleting temporary files: ', error);
  // });

  Promise.allSettled(tempFilePaths.map(tempFilePath => RNFS.unlink(tempFilePath)))
  .then(results => {
    const successfulDeletions = results.filter(result => result.status === 'fulfilled');
    console.log(`${successfulDeletions.length} temporary files deleted successfully`);
  })
  .catch(error => {
    console.log('Error deleting temporary files: ', error);
  });
}