import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  query,
  mutation,
} from "./_generated/server";

// Query all todos
export const getTodos = query({
  args: {},
  async handler(ctx, args) {
    return await ctx.db.query("todos").collect();
  },
});

// Add a new todo
export const addTodo = mutation({
  args: { name: v.string(), notifyAt: v.null() },
  async handler(ctx, args) {
    const newTodo = { name, isDone: false, notifyAt: null, order: Date.now() };
    await ctx.db.insert("todos", newTodo);
  },
});

// Update a todo
// export const updateTodo = mutation({
//   args: { id: v.id("todos") },
//   async handler(ctx, args) {
//     await ctx.db.patch(args.id, updates);
//   },
// });

// Reorder todos
// export const reorderTodos = mutation(async ({ db }, { reordered }) => {
//   for (const { id, order } of reordered) {
//     await ctx.db.update(id, { order });
//   }
// });
