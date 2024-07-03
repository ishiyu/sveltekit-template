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

  const todo = await prisma.todos.update({
    where: { id: Number(id) },
    data: {
      isCompleted: true,
    },
  });
  return json(todo);
}
