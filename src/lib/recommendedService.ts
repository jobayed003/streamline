import { getSelf } from '@/lib/authService';
import db from '@/lib/db';

export const getRecommended = async () => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: { id: userId },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else
    users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

  return users;
};
