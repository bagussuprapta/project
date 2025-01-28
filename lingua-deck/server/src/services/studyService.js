import { prismaClient } from "../apps/database.js";

const exportStudySession = async (user) => {
  return await prismaClient.studySession.findMany({
    where: {
      user_id: user.user_id,
    },
  });
};

export default { exportStudySession };
