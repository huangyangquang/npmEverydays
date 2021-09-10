const async = require('async')
const fs  = require("fs")

let directoryList = ['dir1','dir2','dir3'];
let withMissingDirectoryList = ['dir1','dir2','dir3', 'dir4'];


// =======================================================================

// dir1 is a directory that contains file1.txt, file2.txt
// dir2 is a directory that contains file3.txt, file4.txt
// dir3 is a directory that contains file5.txt
// dir4 does not exist

const fileList = [ 'dir1/file2.txt', 'dir2/file3.txt', 'dir/file5.txt'];
const withMissingFileList = ['dir1/file1.txt', 'dir4/file2.txt'];

// asynchronous function that deletes a file
const deleteFile = function(file, callback) {
    fs.unlink(file, callback);
};

// Using callbacks
async.each(fileList, deleteFile, function(err) {
    if( err ) {
        console.log(err);
    } else {
        console.log('All files have been deleted successfully');
    }
});

// Error Handling
async.each(withMissingFileList, deleteFile, function(err){
    console.log(err);
    // [ Error: ENOENT: no such file or directory ]
    // since dir4/file2.txt does not exist
    // dir1/file1.txt could have been deleted
});

// Using Promises
async.each(fileList, deleteFile)
.then( () => {
    console.log('All files have been deleted successfully');
}).catch( err => {
    console.log(err);
});

// Error Handling
async.each(fileList, deleteFile)
.then( () => {
    console.log('All files have been deleted successfully');
}).catch( err => {
    console.log(err);
    // [ Error: ENOENT: no such file or directory ]
    // since dir4/file2.txt does not exist
    // dir1/file1.txt could have been deleted
});

// Using async/await
async () => {
    try {
        await async.each(files, deleteFile);
    }
    catch (err) {
        console.log(err);
    }
}

// Error Handling
async () => {
    try {
        await async.each(withMissingFileList, deleteFile);
    }
    catch (err) {
        console.log(err);
        // [ Error: ENOENT: no such file or directory ]
        // since dir4/file2.txt does not exist
        // dir1/file1.txt could have been deleted
    }
}


// =========================================================================

// dir1 is a directory that contains file1.txt, file2.txt
// dir2 is a directory that contains file3.txt, file4.txt
// dir3 is a directory that contains file5.txt

// // asynchronous function that checks if a file exists
// function fileExists(file, callback) {
//     fs.access(file, fs.constants.F_OK, (err) => {
//         callback(null, !err);
//     });
//  }
 
//  async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists,
//     function(err, result) {
//         console.log(result);
//         // dir1/file1.txt
//         // result now equals the first file in the list that exists
//     }
//  );
 
//  // Using Promises
//  async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists)
//  .then(result => {
//      console.log(result);
//      // dir1/file1.txt
//      // result now equals the first file in the list that exists
//  }).catch(err => {
//      console.log(err);
//  });
 
//  // Using async/await
//  async () => {
//      try {
//          let result = await async.detect(['file3.txt','file2.txt','dir1/file1.txt'], fileExists);
//          console.log(result);
//          // dir1/file1.txt
//          // result now equals the file in the list that exists
//      }
//      catch (err) {
//          console.log(err);
//      }
//  }


// =========================================================================

// async.concatSeries(directoryList, fs.readdir).then(res => {
//     console.log('res', res)
// }, err => {
//     console.log('err', err)
// }).catch(err => {
//     console.log('catch', err)
// })


// async.concatLimit(directoryList, 1, fs.readdir, (err, result) => {
//     if (err) {
//         console.log('err', err)
//     } else {
//         console.log('result', result);
//     }
// })


// // concat(coll, iteratee, callbackopt):
// // Using callbacks
// async.concat(directoryList, fs.readdir, function(err, results) {
//    if (err) {
//        console.log('Error Handling', err);
//    } else {
//        console.log('Using callbacks:', results);
//        // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
//    }
// });

// // Error Handling
// async.concat(withMissingDirectoryList, fs.readdir, function(err, results) {
//    if (err) {
//        console.log('Error Handling', err);
//        // [ Error: ENOENT: no such file or directory ]
//        // since dir4 does not exist
//    } else {
//        console.log(results);
//    }
// });

// // Using Promises
// async.concat(directoryList, fs.readdir)
// .then(results => {
//     console.log(results);
//     // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
// }).catch(err => {
//      console.log(err);
// });

// // Error Handling
// async.concat(withMissingDirectoryList, fs.readdir)
// .then(results => {
//     console.log(results);
// }).catch(err => {
//     console.log(err);
//     // [ Error: ENOENT: no such file or directory ]
//     // since dir4 does not exist
// });

// // Using async/await
// async () => {
//     try {
//         let results = await async.concat(directoryList, fs.readdir);
//         console.log('Using async/await:', results);
//         // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', file5.txt ]
//     } catch (err) {
//         console.log(err);
//     }
// }

// // Error Handling
// async () => {
//     try {
//         let results = await async.concat(withMissingDirectoryList, fs.readdir);
//         console.log(results);
//     } catch (err) {
//         console.log(err);
//         // [ Error: ENOENT: no such file or directory ]
//         // since dir4 does not exist
//     }
// }