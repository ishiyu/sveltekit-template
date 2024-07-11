import { handleError } from "$lib/server/handleError";
import prisma from "$lib/server/prisma";
import { type RequestEvent, error, json } from "@sveltejs/kit";

export async function PUT({
  params,
}: { params: PartialRecord<string, string> }) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const { id } = params;
  if (!id) {
    throw error(404, "Not found");
  }

  try {
    const todo = await prisma.todos.update({
      where: { id: Number(id) },
      data: {
        isCompleted: false,
      },
    });
    return json(todo);
  } catch (e) {
    return handleError(e);
  }
}
