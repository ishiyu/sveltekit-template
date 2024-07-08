import prisma from "$lib/server/prisma";

export async function setup() {
  await prisma.todos.deleteMany();
}

export async function teardown() {
  await prisma.todos.deleteMany();
}
