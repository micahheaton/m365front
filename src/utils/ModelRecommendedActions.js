import Papa from "papaparse";
import adminFile from "../assets/data/adminFile.js";

async function ModelRecommendedACtions(userFile) {

  // The function returns a promise. This is a JavaScript feature that allows asynchronous operations. 
  // We can wait for a promise to either resolve (complete successfully) or reject (fail), and then perform some action.
  return new Promise((resolve, reject) => {

    // Papa.parse is used to parse CSV data. In this case, it's parsing a user-provided file.
    Papa.parse(userFile, {
      download: true, // This option indicates that the file is to be fetched from a remote server.
      header: true, // This indicates that the first row of the CSV file contains the header.
      dynamicTyping: true, // This option will attempt to convert the type of the data to numbers or booleans, if applicable.

      // After parsing is complete, this function is called. 
      // It receives the parsed data (userDataResults) as an argument.
      complete: function (userDataResults) {

        // The 'data' property of userDataResults is assigned to 'input'.
        // This contains the actual data rows from the CSV file.
        const input = userDataResults.data;

        // Filtering the adminFile data to exclude elements where 'Type' is null.
        const adminFileData = adminFile.filter((el) => el["Type"] != null);

        // Initializing empty arrays for storing recommended and high impact items.
        let recommended = [];
        let highImpact = [];

        // Looping over each item in the input data.
        input.map((item) => {

          // For each item, loop over each element in the adminFileData.
          adminFileData.map((el) => {

            // If the 'Recommended action' of the item and element match...
            if (item["Recommended action"] == el["Recommended action"]) {

              // ...check if the 'Type' of the element is 'Green'.
              if (el["Type"] == "Green") {

                // If it is, push a new object to the 'recommended' array.
                // This object contains all properties from the item, and an additional 'color' property set to the 'Type' of the element.
                recommended.push({ ...item, color: el["Type"] });

              } else {

                // If 'Type' is not 'Green', push the item to the 'highImpact' array, with the 'color' property added.
                highImpact.push({ ...item, color: el["Type"] });

              }
            }
          });
        });

        // After all items have been processed, the promise is resolved with an object containing the 'recommended' and 'highImpact' arrays.
        resolve({ recommended, highImpact });
      },

      // If there is an error during parsing, this function is called with the error, and the promise is rejected with the error.
      error: function (error) {
        reject(error);
      },
    });
  });
}

// The ModelRecommendedACtions function is exported, so it can be imported and used in other parts of the application.
export default ModelRecommendedACtions;