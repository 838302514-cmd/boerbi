import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
export const learners = sqliteTable('learners', {
 id:text('id').primaryKey(), learnerHash:text('learner_hash').notNull().unique(), viewerHash:text('viewer_hash').notNull().unique(), createdAt:integer('created_at').notNull(), updatedAt:integer('updated_at').notNull()
});
export const answers = sqliteTable('answers', {
 learnerId:text('learner_id').notNull().references(()=>learners.id), lessonId:text('lesson_id').notNull(), sectionIndex:integer('section_index').notNull(), attempts:integer('attempts').notNull(), correct:integer('correct').notNull(), lastAnswer:integer('last_answer').notNull(), updatedAt:integer('updated_at').notNull()
}, table=>[primaryKey({columns:[table.learnerId,table.lessonId,table.sectionIndex]})]);
export const practices = sqliteTable('practices', {
 learnerId:text('learner_id').notNull().references(()=>learners.id), lessonId:text('lesson_id').notNull(), checked:integer('checked').notNull(), updatedAt:integer('updated_at').notNull()
}, table=>[primaryKey({columns:[table.learnerId,table.lessonId]})]);
