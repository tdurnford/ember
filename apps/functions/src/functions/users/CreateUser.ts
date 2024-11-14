import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { createUser, isNewUser } from "@repo/db/users";

export async function CreateUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const json = await request.json();

    if (!isNewUser(json)) {
      return { status: 400, body: "Bad Request" };
    }

    const user = await createUser(json);

    const response = new HttpResponse({
      body: JSON.stringify(user, null, 2),
      status: 201,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);

    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("CreateUser", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: CreateUser,
  route: "users",
});
