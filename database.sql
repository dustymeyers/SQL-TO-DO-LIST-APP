--Table to store Project Tasks
--In the case that tasks table needs to be reset
DROP TABLE IF EXISTS "tasks";

--Table to store Project Tasks
CREATE TABLE "tasks" (
	"task_id" SERIAL PRIMARY KEY,
	"task" VARCHAR(256) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE
);

--Sample Data for Testing
-- INSERT INTO "tasks"
-- 	("task")
-- VALUES
-- 	('test task 1'),
-- 	('test task 2'),
-- 	('test task 3'),
-- 	('test task 4');