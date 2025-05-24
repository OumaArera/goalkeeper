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

export const getTotalStats = (player) => {
  const totalAppearances = player.kenyaPremierLeagueRecord.reduce((sum, record) => sum + record.appearances, 0);
  const totalCleanSheets = player.kenyaPremierLeagueRecord.reduce((sum, record) => sum + record.cleanSheets, 0);
  const totalAssists = player.kenyaPremierLeagueRecord.reduce((sum, record) => sum + record.assists, 0);
  return { totalAppearances, totalCleanSheets, totalAssists };
};