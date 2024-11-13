import {
  app,
  HttpRequest,
  HttpResponse,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { deleteUser } from "@repo/db/users";

export async function DeleteUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const id = request.params.id;

    if (!id) {
      return { status: 400, body: "Bad Request" };
    }

    const user = await deleteUser(id);

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

app.http("DeleteUser", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: DeleteUser,
  route: "users/{id}",
});
