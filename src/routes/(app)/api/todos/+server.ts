import type { TodoType } from "$lib/schema/TodoSchema";
import { TodoCreateSchema } from "$lib/schema/TodoSchema";
import { handleError } from "$lib/server/handleError";
import prisma from "$lib/server/prisma";
import { json } from "@sveltejs/kit";
import * as v from "valibot";

export async function GET({
  params,
}: { params: PartialRecord<string, string> }) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const where = params.search
    ? { body: { contains: params.search } }
    : undefined;
  const orderBy: PartialRecord<keyof TodoType, "asc" | "desc"> = { id: "asc" };

  try {
    const todos = await prisma.todos.findMany({ where, orderBy });
    return json(todos);
  } catch (e: unknown) {
    return handleError(e);
  }
}

export async function POST({ request }: { request: Request }) {
  // const session = await requestEvent.locals.auth();
  // if (!session?.user?.id) {
  //   throw redirect(303, "/login");
  // }

  const body = await request.json();
  try {
    // ここで検証するがバリデーションに引っかかると throw するので注意！
    const validData = v.parse(TodoCreateSchema, body);
    const todo = await prisma.todos.create({
      data: { body: body.body, createdAt: new Date() },
    });
    return json(todo);
  } catch (e: unknown) {
    return handleError(e);
  }
}
