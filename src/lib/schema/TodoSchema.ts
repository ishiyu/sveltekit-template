import * as v from "valibot";

export const TodoSchema = v.object({
  id: v.number(),
  body: v.string(),
  isCompleted: v.boolean(),
  createdAt: v.number(),
});

// 作成時は body のみ必須
export const TodoCreateSchema = v.object({
  ...TodoSchema.entries,
  // 後勝ち
  id: v.optional(v.number()),
  body: v.pipe(v.string(), v.nonEmpty("Please enter a todo as required!")),
  isCompleted: v.optional(v.boolean()),
  createdAt: v.optional(v.number()),
});

export type TodoType = v.InferOutput<typeof TodoSchema>;
export type TodoCreateType = v.InferOutput<typeof TodoCreateSchema>;
