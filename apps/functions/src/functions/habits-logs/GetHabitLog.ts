import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { getHabitLog } from "@repo/db/habit-logs";

export async function GetHabitLog(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const habitLogId = request.params.id;

    if (!habitLogId) {
      return { status: 400, body: "Bad Request" };
    }

    const habitLog = await getHabitLog(habitLogId);

    const response = new HttpResponse({
      body: JSON.stringify(habitLog, null, 2),
      status: 200,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);
    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("GetHabitLog", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: GetHabitLog,
  route: "habitlogs/{id}",
});
