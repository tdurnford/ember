import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { deleteHabitLog } from "@repo/db/habit-logs";

export async function DeleteHabitLog(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const id = request.params.id;

    if (!id) {
      return { status: 400, body: "Bad Request" };
    }

    const habitLog = await deleteHabitLog(id);

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

app.http("DeleteHabitLog", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: DeleteHabitLog,
  route: "habitLogs/{id}",
});
