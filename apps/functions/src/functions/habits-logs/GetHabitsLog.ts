import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { getHabitLogs } from "@repo/db/habit-logs";

export async function GetHabitLogs(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const habitId = request.params.id;

    if (!habitId) {
      return { status: 400, body: "Bad Request" };
    }

    const habitLogs = await getHabitLogs(habitId);

    const response = new HttpResponse({
      body: JSON.stringify(habitLogs, null, 2),
      status: 200,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);
    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("GetHabitLogs", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: GetHabitLogs,
  route: "habitLogs",
});
