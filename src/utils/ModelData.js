const handleCategoriesStats = (arr) => {
  var completedApps = 0;
  var targetApps = 0;
  var completedDevices = 0;
  var targetDevices = 0;
  var completedIdentitys = 0;
  var targetIdentitys = 0;

  var totalpoints = 0;
  var pointsAchieved = 0;

  var completed = 0;
  var toAddress = 0;

  arr.forEach((x) => {
    pointsAchieved =
      pointsAchieved +
      parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
    totalpoints =
      totalpoints +
      parseFloat(x["Points achieved"].toString().trim().split("/")[1]);

    if (x["Status"] == "To address") {
      toAddress++;
    } else if (x["Status"] == "Completed") {
      completed++;
    }
    if (x["Category"] === "Apps") {
      completedApps =
        completedApps +
        parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
      targetApps =
        targetApps +
        parseFloat(x["Points achieved"].toString().trim().split("/")[1]);
    } else if (x["Category"] === "Device") {
      completedDevices =
        completedDevices +
        parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
      targetDevices =
        targetDevices +
        parseFloat(x["Points achieved"].toString().trim().split("/")[1]);
    } else if (x["Category"] === "Identity") {
      completedIdentitys =
        completedIdentitys +
        parseFloat(x["Points achieved"].toString().trim().split("/")[0]);
      targetIdentitys =
        targetIdentitys +
        parseFloat(x["Points achieved"].toString().trim().split("/")[1]);
    }
  });
  return {
    points: { total: totalpoints, achieved: pointsAchieved },
    status: { completed, toAddress },
    apps: { completed: completedApps, toAddress: targetApps },
    devices: { completed: completedDevices, toAddress: targetDevices },
    identitys: { completed: completedIdentitys, toAddress: targetIdentitys },
  };
};

export const ModelData = (data) => {
  const results = handleCategoriesStats(data);

  return results;
};
