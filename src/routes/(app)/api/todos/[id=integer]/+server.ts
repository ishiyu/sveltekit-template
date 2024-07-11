import { handleError } from "$lib/server/handleError";
import prisma from "$lib/server/prisma";
import { error, json } from "@sveltejs/kit";

export async function PUT({
  params,
  request,
}: { params: PartialRecord<string, string>; request: Request }) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const { id } = params;
  if (!id) {
    throw error(404, "Not found");
  }
  const body = await request.json();

  try {
    const todo = await prisma.todos.update({
      where: { id: Number(id) },
      data: {
        body: body.body ?? undefined,
        isCompleted: body.isCompleted ?? false,
      },
    });
    return json(todo);
  } catch (e: unknown) {
    return handleError(e);
  }
}

export async function DELETE({
  params,
}: { params: PartialRecord<string, string> }) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const { id } = params;
  if (!id) {
    throw error(400, "id がありません");
  }
  try {
    const todo = await prisma.todos.delete({ where: { id: Number(id) } });
    return json(todo);
  } catch (e: unknown) {
    return handleError(e);
  }
}
