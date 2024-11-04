export const getFilteredTabs = (genderData, isDevelopment) => {
    return genderData.filter(tab => tab.show || isDevelopment);
  };