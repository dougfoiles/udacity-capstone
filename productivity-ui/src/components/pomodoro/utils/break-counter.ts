const itemIdentifier = "shortBreaksTaken";

const getShortBreaksTaken = () => {
  return Number(localStorage.getItem(itemIdentifier)) || 0;
};

const incrementShortBreaksTaken = () => {
  localStorage.setItem(itemIdentifier, `${getShortBreaksTaken() + 1}`);
};

const resetShortBreaksTaken = () => {
  localStorage.setItem(itemIdentifier, "0");
};

const breakCounter = {
  getShortBreaksTaken,
  incrementShortBreaksTaken,
  resetShortBreaksTaken,
};

export { breakCounter };
