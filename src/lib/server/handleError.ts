import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "@sveltejs/kit";
import * as v from "valibot";

export function handleError(e: unknown) {
  console.error(`e: ${e}`);

  // valibot のエラーか判定します
  if (v.isValiError(e)) {
    error(400, e.message);
  }
  // prisma でのエラー判定処理
  if (e instanceof PrismaClientKnownRequestError) {
    console.error(e.code);
    console.error(e.meta);

    if (e.code === "P2025") {
      return error(404, "Not found");
    }
    return error(500, "unexpected error");
  }

  return error(500, "unexpected error");
}
