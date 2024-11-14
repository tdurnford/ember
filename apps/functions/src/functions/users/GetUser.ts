import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { getUser } from "@repo/db/users";

export async function GetUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const id = request.params.id;

    if (!id) {
      return { status: 400, body: "Bad Request" };
    }

    const user = await getUser(id);

    if (!user) {
      return { status: 404, body: "Not Found" };
    }

    const response = new HttpResponse({
      body: JSON.stringify(user, null, 2),
      status: 200,
    });
    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (error) {
    context.error(error);
    return { status: 500, body: "Internal Server Error" };
  }
}

app.http("GetUser", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: GetUser,
  route: "users/{id}",
});
