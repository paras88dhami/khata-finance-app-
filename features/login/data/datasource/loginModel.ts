import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export class UserModel extends Model {
  static table = "users";

  @field("full_name") fullName!: string;
  @field("identifier") identifier!: string;
  @field("identifier_type") identifierType!: string;
  @field("password_hash") passwordHash!: string;
  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;
}
