import { format } from "fast-csv";
import studyService from "../services/studyService.js";

const exportStudySession = async (request, response, next) => {
  try {
    const result = await studyService.exportStudySession(request.user);
    if (!result || result.length === 0) {
      return response.status(404).json({
        error: {
          message: "no data available for export",
        },
      });
    }

    response.setHeader("Content-Disposition", "attachment; filename=study-session.csv");
    response.setHeader("Content-Type", "text/csv");

    const csvStream = format({ headers: true });
    csvStream.pipe(response).on("end", () => response.end());
    result.forEach((row) => csvStream.write(row));
    csvStream.end();
  } catch (error) {
    next(error);
  }
};

export default { exportStudySession };
