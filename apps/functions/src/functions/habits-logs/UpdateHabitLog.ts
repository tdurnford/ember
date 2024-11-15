import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { isHabitLog, updateHabitLog } from "@repo/db/habit-logs";

export async function UpdateHabitLog(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const id = request.params.id;
    const json = await request.json();

    if (!(isHabitLog(json) && id)) {
      return { status: 400, body: "Bad Request" };
    }

    const habitLog = await updateHabitLog(id, json);

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

app.http("UpdateHabitLog", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: UpdateHabitLog,
  route: "habitlogs/{id}",
});
