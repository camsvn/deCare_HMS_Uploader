import { useEffect } from 'react';
import RNFS from 'react-native-fs';

const useDeleteTempFiles = (tempFilePaths = []) => {
  useEffect(() => {
    const promises = tempFilePaths.map(tempFilePath => RNFS.unlink(tempFilePath));
    Promise.allSettled(promises)
      .then(results => {
        const successfulDeletions = results.filter(result => result.status === 'fulfilled');
        console.log(`${successfulDeletions.length} temporary files deleted successfully`);
      })
      .catch(error => {
        console.log('Error deleting temporary files: ', error);
      });
  }, [tempFilePaths]);
};

export default useDeleteTempFiles;
