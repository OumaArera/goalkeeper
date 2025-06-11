export const getTotalStats = (player) => {
  const kplRecords = player.kplRecords || [];

  return {
    totalAppearances: kplRecords.reduce((sum, record) => sum + (record.appearances || 0), 0),
    totalCleanSheets: kplRecords.reduce((sum, record) => sum + (record.cleanSheets || 0), 0),
    totalAssists: kplRecords.reduce((sum, record) => sum + (record.assists || 0), 0),
  };
};

export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};