import prisma from "$lib/server/prisma";
import { type RequestEvent, error, json } from "@sveltejs/kit";

export async function PUT(requestEvent: RequestEvent) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const { id } = requestEvent.params;
  if (!id) {
    throw error(400, "id がありません");
  }

  const body = await requestEvent.request.json();
  const todo = await prisma.todos.update({
    where: { id: Number(id) },
    data: {
      body: body.body ?? undefined,
      isCompleted: body.isCompleted ?? false,
    },
  });
  return json(todo);
}

export async function DELETE(requestEvent: RequestEvent) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const { id } = requestEvent.params;
  if (!id) {
    throw error(400, "id がありません");
  }

  const todo = await prisma.todos.delete({ where: { id: Number(id) } });
  return json(todo);
}
