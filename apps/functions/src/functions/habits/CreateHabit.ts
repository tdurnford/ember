import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { createHabit, isNewHabit } from "@repo/db/habits";

export async function CreateHabit(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const json = await request.json();

    if (!isNewHabit(json)) {
      return { status: 400, body: "Bad Request" };
    }

    const habit = await createHabit(json);

    const response = new HttpResponse({
      body: JSON.stringify(habit, null, 2),
      status: 201,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);

    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("CreateHabit", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: CreateHabit,
  route: "habits",
});
