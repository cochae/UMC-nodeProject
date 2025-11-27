export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    gender: body.gender || "",
    birth: birth || "",
    address: body.address || "",
    detailAddress: body.detailAddress || "", 
    phoneNumber: body.phoneNumber || "",
    preferences: body.preferences || "",
    userId: body.userId
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
