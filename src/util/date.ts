export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString(localStorage.getItem('locale'), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
