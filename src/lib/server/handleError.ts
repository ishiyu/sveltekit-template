import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { error } from "@sveltejs/kit";
import * as v from "valibot";
import prisma from "./prisma";

export function handleError(e: unknown) {
  // valibot のエラーか判定します
  if (v.isValiError(e)) {
    error(400, e.message);
  }
  // prisma でのエラー判定処理
  // refs: https://www.prisma.io/docs/orm/reference/error-reference
  if (e instanceof PrismaClientKnownRequestError) {
    console.error(`e.code: ${e.code}`);
    console.error(`e.meta: ${JSON.stringify(e.meta)}`);

    // it depends on one or more records that were required but not found.
    if (e.code === "P2025") {
      return error(404, "Not found");
    }
    return error(500, "unexpected db known error");
  }
  if (
    e instanceof PrismaClientUnknownRequestError ||
    e instanceof PrismaClientRustPanicError
  ) {
    console.error(`e.message: ${e.message}`);
    console.error(`e.cause: ${JSON.stringify(e.cause)}`);

    // failover を見越して connection を貼り直す
    // refs: https://qiita.com/kurab/items/5428dcdafe49cf4138c3
    prisma.$disconnect();

    return error(500, "unexpected db unknown error");
  }

  return error(500, "unexpected error");
}
