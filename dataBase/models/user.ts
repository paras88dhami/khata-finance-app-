import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

export class User extends Model {
  static table = "users";

  @text("name") readonly fullName!: string;
  @text("email") readonly email!: string;
  @text("phone") readonly phone!: string;
  @text("password") readonly password!: string;
}
