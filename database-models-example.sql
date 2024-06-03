CREATE TABLE "subjects"(
    "id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL,
    "description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "subjects" ADD PRIMARY KEY("id");
CREATE TABLE "teacher_groups"(
    "id" BIGINT NOT NULL,
    "group_id" BIGINT NOT NULL,
    "teacher_id" BIGINT NOT NULL
);
ALTER TABLE
    "teacher_groups" ADD PRIMARY KEY("id");
CREATE TABLE "grades"(
    "id" BIGINT NOT NULL,
    "student_id" BIGINT NOT NULL,
    "teacher_id" BIGINT NOT NULL,
    "subject_id" BIGINT NOT NULL,
    "grade" VARCHAR(255) CHECK
        ("grade" IN('')) NOT NULL
);
ALTER TABLE
    "grades" ADD PRIMARY KEY("id");
CREATE TABLE "groups"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "groups" ADD PRIMARY KEY("id");
CREATE TABLE "teachers"(
    "id" BIGINT NOT NULL,
    "fullname" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL
);
ALTER TABLE
    "teachers" ADD PRIMARY KEY("id");
CREATE TABLE "students"(
    "id" BIGINT NOT NULL,
    "group_id" BIGINT NOT NULL,
    "rating" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL
);
ALTER TABLE
    "students" ADD PRIMARY KEY("id");
CREATE TABLE "roles"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "desc" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "roles" ADD PRIMARY KEY("id");
CREATE TABLE "subject_groups"(
    "id" BIGINT NOT NULL,
    "group_id" BIGINT NOT NULL,
    "subject_id" BIGINT NOT NULL,
    "starts_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "ends_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "subject_groups" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "grades" ADD CONSTRAINT "grades_subject_id_foreign" FOREIGN KEY("subject_id") REFERENCES "subject_groups"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY("role_id") REFERENCES "roles"("id");
ALTER TABLE
    "grades" ADD CONSTRAINT "grades_student_id_foreign" FOREIGN KEY("student_id") REFERENCES "students"("id");
ALTER TABLE
    "grades" ADD CONSTRAINT "grades_teacher_id_foreign" FOREIGN KEY("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE
    "subject_groups" ADD CONSTRAINT "subject_groups_subject_id_foreign" FOREIGN KEY("subject_id") REFERENCES "subjects"("id");
ALTER TABLE
    "students" ADD CONSTRAINT "students_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "teacher_groups" ADD CONSTRAINT "teacher_groups_teacher_id_foreign" FOREIGN KEY("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE
    "students" ADD CONSTRAINT "students_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "teachers" ADD CONSTRAINT "teachers_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "subject_groups" ADD CONSTRAINT "subject_groups_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "teacher_groups" ADD CONSTRAINT "teacher_groups_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");