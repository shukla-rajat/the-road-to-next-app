import { hashToken } from "@/utils/crypto";

import { prisma } from "./prisma";

// Define session duration constants
// SESSION_REFRESH_INTERVAL_MS: The window within which a session should be refreshed (15 days)
const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
// SESSION_MAX_DURATION_MS: The total maximum duration of a session (30 days)
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30 days

/**
 * Creates a new session for a user.
 *
 * @param sessionToken - The raw session token to be hashed and stored.
 * @param userId - The ID of the user for whom the session is created.
 * @returns The created session object including the session ID, user ID, and expiration date.
 */
export const createSession = async (sessionToken: string, userId: string) => {
  // Hash the session token to securely store it as the session ID
  const sessionId = hashToken(sessionToken);

  // Create the session object with an expiration time
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  // Persist the session to the database using Prisma
  await prisma.session.create({
    data: session,
  });

  return session;
};

/**
 * Validates a session token and retrieves the associated session and user.
 * It also handles session expiration and refreshing if the session is near expiry.
 *
 * @param sessionToken - The raw session token to validate.
 * @returns An object containing the session and user if valid, or nulls if invalid/expired.
 */
export const validateSession = async (sessionToken: string) => {
  // Hash the token to find the corresponding session ID
  const sessionId = hashToken(sessionToken);

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  // If no session is found, return null for both session and user
  if (!result) {
    return { session: null, user: null };
  }

  // Destructure to separate user and session data
  const { user, ...session } = result;

  // Check if the current time has passed the session's expiration time
  if (Date.now() >= session.expiresAt.getTime()) {
    // If expired, delete the session from the database
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return { session: null, user: null };
  }

  // If the session is within the refresh interval (15 days before expiry), extend its expiration
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    // Update the session's expiration time in the database
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  // Return the valid session and user
  return { session, user };
};

/**
 * Invalidates (deletes) a session by its ID.
 *
 * @param sessionId - The ID of the session to invalidate.
 */
export const invalidateSession = async (sessionId: string) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
