const handleCategoriesStats = (arr) => {
  // initializing counters for the different categories and statuses
  var completedApps = 0;
  var targetApps = 0;
  var completedDevices = 0;
  var targetDevices = 0;
  var completedIdentitys = 0;
  var targetIdentitys = 0;

  // initializing points variables
  var totalpoints = 0;
  var pointsAchieved = 0;

  // initializing status variables
  var completed = 0;
  var toAddress = 0;

  // looping through the array of objects
  arr.forEach((x) => {
    // accumulating points achieved and total points
    pointsAchieved += parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
    totalpoints += parseFloat(x["Points achieved"].toString().trim().split("/")[1]);

    // counting statuses
    if (x["Status"] == "To address") {
      toAddress++;
    } else if (x["Status"] == "Completed") {
      completed++;
    }
    // counting categories and their points
    if (x["Category"] === "Apps") {
      completedApps += parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
      targetApps += parseFloat(x["Points achieved"].toString().trim().split("/")[1]);
    } else if (x["Category"] === "Device") {
      completedDevices += parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
      targetDevices += parseFloat(x["Points achieved"].toString().trim().split("/")[1]);
    } else if (x["Category"] === "Identity") {
      completedIdentitys += parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
      targetIdentitys += parseFloat(x["Points achieved"].toString().trim().split("/")[1]);
    }
  });
  // returning an object with all the counted and calculated values
  return {
    points: { total: totalpoints, achieved: pointsAchieved },
    status: { completed, toAddress },
    apps: { completed: completedApps, toAddress: targetApps },
    devices: { completed: completedDevices, toAddress: targetDevices },
    identitys: { completed: completedIdentitys, toAddress: targetIdentitys },
  };
};

// Exported function that takes in data, processes it using handleCategoriesStats, and returns the results
export const ModelData = (data) => {
  const results = handleCategoriesStats(data);

  return results;
};