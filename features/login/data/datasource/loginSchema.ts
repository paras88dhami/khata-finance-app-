import {
  createTable,
  schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: "users",
          columns: [
            { name: "full_name", type: "string" },
            { name: "identifier", type: "string", isIndexed: true },
            { name: "identifier_type", type: "string" },
            { name: "password_hash", type: "string" },
            { name: "created_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
      ],
    },
  ],
});
