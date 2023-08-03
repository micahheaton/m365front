export const modelDevices = (devices) => {
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

  const managedBy = countManagedBy.sort((a, b) => b.count - a.count);

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

  const osPlatform = countOsPlatform.sort((a, b) => b.count - a.count);

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
  
  const riskLevelsOrder = ["High", "Medium", "Low", "Informational", "No known risks"];
  
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
  
    const exposureLevelsOrder = ["High", "Medium", "Low","No data available"];
  
    // Convert the countExposures object to an array of objects containing exposure level name, count, and devices
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

  return {managedBy,osPlatform,risks,exposures,healthStatus,antiVirus}
  
};
