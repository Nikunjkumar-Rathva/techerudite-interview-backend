export const createConfirmationUrl = (userId: number) => {
  return `${process.env.FRONT_URL}/confirmation?userId=${userId}`;
};
