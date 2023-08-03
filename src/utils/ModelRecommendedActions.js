import Papa from "papaparse";
import adminFile from "../assets/data/adminFile.js";

async function ModelRecommendedACtions(userFile) {
  return new Promise((resolve, reject) => {
    Papa.parse(userFile, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function (userDataResults) {
        const input = userDataResults.data;
        const adminFileData = adminFile.filter((el) => el["Type"] != null);

        let recommended = [];
        let highImpact = [];

        input.map((item) => {
          adminFileData.map((el) => {
            if (item["Recommended action"] == el["Recommended action"]) {
              if (el["Type"] == "Green") {
                recommended.push({ ...item, color: el["Type"] });
              } else {
                highImpact.push({ ...item, color: el["Type"] });
              }
            }
          });
        });

        resolve({ recommended, highImpact });
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}

export default ModelRecommendedACtions;