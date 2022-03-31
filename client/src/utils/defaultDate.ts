export const defaultDate = (year: number, month: number) => {
    const today = new Date();

    if (year === today.getFullYear() && (month === today.getMonth() + 1 || month === 0)) {
        return today;
      }
      else {
    
        return new Date(year || today.getFullYear(), month ? month - 1 : today.getMonth(), 1);
  
      }

}