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

export const calculateTotal = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((total, cartItem) => {
    const discountedPrice = cartItem.item.price * (1 - cartItem.item.discount / 100);
    return total + discountedPrice;
  }, 0);
};


export const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

export const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };