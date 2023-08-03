export const modelDevices = (devices) => {
  // Count the number of devices managed by each manager.
  const countManagedBy = devices.reduce((acc, device) => {
    const managedBy = device["Managed By"];
    if (managedBy) {
      const existing = acc.find(({ name }) => name === managedBy);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ name: managedBy, count: 1 });
      }
    }
    return acc;
  }, []);
  // Sort managers by the number of devices they manage.
  const managedBy = countManagedBy.sort((a, b) => b.count - a.count);

  // Count the number of devices for each OS platform.
  const countOsPlatform = devices.reduce((acc, device) => {
    const platform = device["OS Platform"];
    if (platform) {
      const existing = acc.find(({ name }) => name === platform);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ name: platform, count: 1 });
      }
    }
    return acc;
  }, []);
  // Sort OS platforms by the number of devices they have.
  const osPlatform = countOsPlatform.sort((a, b) => b.count - a.count);

  // Count the number of devices for each risk level and store the device data.
  const countRisks = devices.reduce((acc, device) => {
    const risk = device["Risk Level"];
    if (risk) {
      const existing = acc[risk];
      if (existing) {
        existing.count++;
        existing.risks.push(device);
      } else {
        acc[risk] = { count: 1, risks: [device] };
      }
    }
    return acc;
  }, {});

  // Define the order of risk levels.
  const riskLevelsOrder = ["High", "Medium", "Low", "Informational", "No known risks"];
  // Sort risk levels according to the predefined order and format the data.
  const risks = Object.keys(countRisks)
    .sort((a, b) => {
      const indexA = riskLevelsOrder.indexOf(a);
      const indexB = riskLevelsOrder.indexOf(b);
      return indexA - indexB;
    })
    .map((risk) => ({
      name: risk,
      count: countRisks[risk].count,
      risks: countRisks[risk].risks,
    }));

  // Count the number of devices for each exposure level and store the device data.
  const countExposures = devices.reduce((acc, device) => {
    const exposure = device["Exposure Level"];
    if (exposure) {
      const existing = acc[exposure];
      if (existing) {
        existing.count++;
        existing.risks.push(device);
      } else {
        acc[exposure] = { count: 1, risks: [device] };
      }
    }
    return acc;
  }, {});

  // Define the order of exposure levels.
  const exposureLevelsOrder = ["High", "Medium", "Low","No data available"];
  // Sort exposure levels according to the predefined order and format the data.
  const exposures = Object.keys(countExposures)
    .sort((a, b) => {
      const indexA = exposureLevelsOrder.indexOf(a);
      const indexB = exposureLevelsOrder.indexOf(b);
      return indexA - indexB;
    })
    .map((exposure) => ({
      name: exposure,
      count: countExposures[exposure].count,
      risks: countExposures[exposure].risks,
    }));

  // Count the number of devices for each health status.
  const healthStatus = devices.reduce((acc, device) => {
    const health = device["Health Status"];
    if (health) {
      const existing = acc.find(({ name }) => name === health);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ name: health, count: 1 });
      }
    }
    return acc;
  }, []);

  // Count the number of devices for each antivirus status.
  const antiVirus = devices.reduce((acc, device) => {
    const anti = device["Antivirus status"];
    if (anti) {
      const existing = acc.find(({ name }) => name === anti);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ name: anti, count: 1 });
      }
    }
    return acc;
  }, []);

  // Return the counts for each property.
  return {managedBy, osPlatform, risks, exposures, healthStatus, antiVirus};
};