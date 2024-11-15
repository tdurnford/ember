import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { createHabitLog, isNewHabitLog } from "@repo/db/habit-logs";

export async function CreateHabitLog(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const json = await request.json();

    if (!isNewHabitLog(json)) {
      return { status: 400, body: "Bad Request" };
    }

    const habitLog = await createHabitLog(json);

    const response = new HttpResponse({
      body: JSON.stringify(habitLog, null, 2),
      status: 201,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);

    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("CreateHabitLog", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: CreateHabitLog,
  route: "habitLogs",
});
