import {sqliteTable,text,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const posts=sqliteTable('posts',{
 slug:text('slug').primaryKey(),title:text('title').notNull(),category:text('category').notNull(),
 status:text('status',{enum:['draft','published']}).notNull(),publishedAt:text('published_at').notNull(),updatedAt:text('updated_at').notNull(),
 contentHash:text('content_hash').notNull(),revision:text('revision').notNull(),payload:text('payload').notNull(),
},t=>[index('idx_posts_status_published').on(t.status,t.publishedAt),uniqueIndex('idx_posts_content_hash').on(t.contentHash)]);
