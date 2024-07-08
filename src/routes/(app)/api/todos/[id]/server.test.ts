import prisma from "$lib/server/prisma";
import { DELETE, PUT } from "./+server";

//
// ファイル名に + を付けると vitest でエラーとなるため、あえて外しておく
//
describe("api/todos", () => {
  // ------------------------
  // PUT METHOD
  // ------------------------
  describe("PUT", () => {
    it("更新成功", async () => {
      // Arrange
      const todoRecord = await prisma.todos.create({
        data: { body: "abc" },
      });
      // Act
      const params = { id: String(todoRecord.id) };
      const request = new Request(`/${todoRecord.id}`, {
        method: "PUT",
        body: '{"body": "123"}',
      });
      const response = await PUT({ params, request });
      const json = await response?.text();
      const results = JSON.parse(json ?? "");
      // Assert
      expect(results.body).toStrictEqual("123");
      const updatedRecord = await prisma.todos.findFirst({
        where: { id: todoRecord.id },
      });
      expect(updatedRecord?.body).toStrictEqual("123");
    });

    it("id が存在しない", async () => {
      // Act
      try {
        const params = {};
        const request = new Request("/", {
          method: "PUT",
          body: '{"body": "123"}',
        });
        await PUT({ params, request });
      } catch (e) {
        const response = e as { status: number; body: { message: string } };
        // Assert
        expect(response.status).toStrictEqual(400);
        expect(response.body.message).toStrictEqual("id notfound");
      }
    });

    it("更新失敗", async () => {
      // Arrange
      const todoRecord = await prisma.todos.create({
        data: { body: "abc" },
      });
      try {
        // Act
        const params = { id: String(todoRecord.id) };
        const request = new Request(`/${todoRecord.id}`, {
          method: "PUT",
          body: '{"hoge": "fuga"}',
        });
        await PUT({ params, request });
      } catch (e) {
        const response = e as { status: number; body: { message: string } };
        // Assert
        expect(response.status).toStrictEqual(400);
        expect(response.body.message).toStrictEqual(
          "Invalid type: Expected string but received undefined",
        );
      }
    });
  });

  // ------------------------
  // DELETE METHOD
  // ------------------------
  describe("DELETE", () => {
    it("削除成功", async () => {
      // Arrange
      const todoRecord = await prisma.todos.create({
        data: { body: "abc" },
      });
      // Act
      const params = { id: String(todoRecord.id) };
      await DELETE({ params });
      // Assert
      const deletedRecord = await prisma.todos.findFirst({
        where: { id: todoRecord.id },
      });
      expect(deletedRecord).toBeNull();
    });

    it("削除失敗", async () => {
      // Arrange
      const todoRecord = await prisma.todos.create({
        data: { body: "abc" },
      });
      // Act
      try {
        const params = { id: "-1" };
        await DELETE({ params });
      } catch (e) {
        const response = e as { status: number; body: { message: string } };

        // Assert
        expect(response.status).toStrictEqual(400);
        const notDeletedRecord = await prisma.todos.findFirst({
          where: { id: todoRecord.id },
        });
        expect(notDeletedRecord).keys(Object.keys(todoRecord));
      }
    });
  });
});
