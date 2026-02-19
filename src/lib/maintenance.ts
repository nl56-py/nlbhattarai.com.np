const TRUE_ENV_VALUES = /^(1|true|yes|on)$/i;

export const adminWritesLocked = TRUE_ENV_VALUES.test(
  import.meta.env.VITE_ADMIN_WRITES_LOCKED ?? "",
);

export const ADMIN_WRITES_LOCK_REASON =
  "Admin writes are temporarily disabled during maintenance. Try again after cutover completes.";
