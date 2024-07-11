import prisma from "$lib/server/prisma";
import { describe, expect, it } from "vitest";
import { PUT } from "./+server";

//
// ファイル名に + を付けると vitest でエラーとなるため、あえて外しておく
//
describe("api/todos/[id]/complete", () => {
  // ------------------------
  // PUT METHOD
  // ------------------------
  describe("PUT", () => {
    it("更新成功", async () => {
      // Arrange
      const todoRecord = await prisma.todos.create({
        data: { body: "abc", isCompleted: false },
      });
      // Act
      const params = { id: String(todoRecord.id) };
      const response = await PUT({ params });
      const json = await response?.text();
      const results = JSON.parse(json ?? "");
      // Assert
      expect(results.isCompleted).toStrictEqual(true);
      const updatedRecord = await prisma.todos.findFirst({
        where: { id: todoRecord.id },
      });
      expect(updatedRecord?.isCompleted).toStrictEqual(true);
    });

    it("存在しない id を指定", async () => {
      // Act
      try {
        const params = { id: 1234567 };
        await PUT({ params });
      } catch (e) {
        const response = e as { status: number; body: { message: string } };
        // Assert
        expect(response.status).toStrictEqual(404);
        expect(response.body.message).toStrictEqual("Not found");
      }
    });

    it("id が存在しない", async () => {
      // Act
      try {
        const params = {};
        await PUT({ params });
      } catch (e) {
        const response = e as { status: number; body: { message: string } };
        // Assert
        expect(response.status).toStrictEqual(404);
        expect(response.body.message).toStrictEqual("Not found");
      }
    });
  });
});
