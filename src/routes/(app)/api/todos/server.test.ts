import prisma from "$lib/server/prisma";
import { GET, POST } from "./+server";

//
// ファイル名に + を付けると vitest でエラーとなるため、あえて外しておく
//
describe("api/todos", () => {
  // ------------------------
  // GET METHOD
  // ------------------------
  describe("GET", () => {
    it("全データを取得してくる", async () => {
      // Arrange
      await prisma.todos.createMany({
        data: [{ body: "abc" }, { body: "def" }],
      });
      // Act
      const response = await GET({ params: {} });
      const json = await response.text();
      const results = JSON.parse(json);
      // Assert
      expect(results.length).greaterThanOrEqual(2);
    });

    it("検索して取得", async () => {
      // Arrange
      const record = await prisma.todos.findFirst({
        where: { body: "検索して取得2" },
      });
      if (record === null) {
        await prisma.todos.createMany({
          data: [{ body: "検索して取得1" }, { body: "検索して取得2" }],
        });
      }

      // Act
      const response = await GET({ params: { search: "検索して取得2" } });
      const json = await response.text();
      const results = JSON.parse(json);
      // Assert
      expect(results.length).toStrictEqual(1);
      expect(results[0].body).toStrictEqual("検索して取得2");
    });

    it("params のキーが想定しない値の場合は無視して全件取得", async () => {
      // Arrange
      await prisma.todos.createMany({
        data: [{ body: "abc" }, { body: "def" }],
      });
      // Act
      const response = await GET({ params: { hoge: "fuga" } });
      const json = await response.text();
      const results = JSON.parse(json);
      // Assert
      expect(response.status).toStrictEqual(200);
      expect(results[0]).keys(["id", "body", "createdAt", "isCompleted"]);
    });
  });

  // ------------------------
  // POST METHOD
  // ------------------------
  describe("POST", () => {
    it("登録成功", async () => {
      // Act
      const body = "POST - SUCCESS";
      const request = new Request("/", {
        method: "POST",
        body: `{"body": "${body}"}`,
      });
      const response = await POST({ request });
      const json = await response?.text();
      const results = JSON.parse(json ?? "");
      // Assert
      expect(results.body).toStrictEqual(body);
      const todoRecord = await prisma.todos.findFirst({
        where: { body: body },
      });
      expect(todoRecord?.body).toStrictEqual(body);
    });

    it("登録失敗", async () => {
      try {
        // Act
        const request = new Request("/", {
          method: "POST",
          body: '{"hoge": "fuga"}',
        });
        await POST({ request });
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
});
