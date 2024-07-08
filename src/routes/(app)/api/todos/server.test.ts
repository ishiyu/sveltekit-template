import prisma from "$lib/server/prisma";
import { beforeEach, describe, expect, it } from "vitest";
import { GET, POST } from "./+server";

//
// ファイル名に + を付けると vitest でエラーとなるため、あえて外しておく
//
describe("api/todos", () => {
  beforeEach(async () => {
    await prisma.todos.deleteMany();
  });

  // ------------------------
  // GET METHOD
  // ------------------------
  describe("GET", () => {
    it("空データの場合", async () => {
      // Act
      const response = await GET({ params: {} });
      const json = await response.text();
      const results = JSON.parse(json);
      // Assert
      expect(results.length).toStrictEqual(0);
      expect(results).toStrictEqual([]);
    });

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
      expect(results.length).toStrictEqual(2);
      expect(results[0].body).toStrictEqual("abc");
      expect(results[1].body).toStrictEqual("def");
    });

    it("検索して取得", async () => {
      // Arrange
      await prisma.todos.createMany({
        data: [{ body: "abc" }, { body: "def" }],
      });
      // Act
      const response = await GET({ params: { search: "def" } });
      const json = await response.text();
      const results = JSON.parse(json);
      // Assert
      expect(results.length).toStrictEqual(1);
      expect(results[0].body).toStrictEqual("def");
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
      expect(results.length).toStrictEqual(2);
    });
  });

  // ------------------------
  // POST METHOD
  // ------------------------
  describe("POST", () => {
    it("登録成功", async () => {
      // Act
      const request = new Request("/", {
        method: "POST",
        body: '{"body": "abc"}',
      });
      const response = await POST({ request });
      const json = await response?.text();
      const results = JSON.parse(json ?? "");
      // Assert
      expect(results.body).toStrictEqual("abc");
      const count = await prisma.todos.count();
      expect(count).toStrictEqual(1);
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
