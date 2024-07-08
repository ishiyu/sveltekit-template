import prisma from "$lib/server/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { type RequestEvent, error, json } from "@sveltejs/kit";

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
    return error(400, "id notfound");
  }

  const body = await request.json();
  const todo = await prisma.todos.update({
    where: { id: Number(id) },
    data: {
      body: body.body ?? undefined,
      isCompleted: body.isCompleted ?? false,
    },
  });
  return json(todo);
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
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return error(400, "id notfound");
    }
  }
}
