function normalizedManualMemberEmails() {
  return new Set(
    (process.env.MANUAL_MEMBER_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isManualMemberEmail(email: string) {
  return normalizedManualMemberEmails().has(email.trim().toLowerCase());
}
