import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("messages").order("desc").take(100);
    },
});

export const send = mutation({
    args: { body: v.string(), author: v.string() },
    handler: async (ctx, { body, author }) => {
        await ctx.db.insert("messages", { body, author });
    },
});
