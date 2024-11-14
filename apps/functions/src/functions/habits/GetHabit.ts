import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { getHabits } from "@repo/db/habits";

export async function GetHabits(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const id = request.params.id;

    if (!id) {
      return { status: 400, body: "Bad Request" };
    }

    const habit = await getHabits(id);

    const response = new HttpResponse({
      body: JSON.stringify(habit, null, 2),
      status: 200,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);
    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("GetHabits", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: GetHabits,
  route: "habits/{userId}",
});
