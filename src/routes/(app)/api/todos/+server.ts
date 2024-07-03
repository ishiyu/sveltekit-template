import prisma from "$lib/server/prisma";
import { type RequestEvent, json } from "@sveltejs/kit";

export async function GET(requestEvent: RequestEvent) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const todos = await prisma.todos.findMany({ orderBy: { id: "asc" } });
  return json(todos);
}

export async function POST(requestEvent: RequestEvent) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const body = await requestEvent.request.json();
  console.log(`body.body: ${body.body}`);

  const todo = await prisma.todos.create({
    data: { body: body.body, createdAt: new Date() },
  });
  console.log(`todos: ${JSON.stringify(todo)}`);

  return json(todo);
}
