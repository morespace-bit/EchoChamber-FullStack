import {
  Model,
  AllowNull,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Unique,
  HasMany,
} from "sequelize-typescript";

import Post from "./post.model";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  username?: string;

  @Column(DataType.STRING)
  profile?: string;

  @Default("user")
  @Column({
    type: DataType.ENUM("user", "admin", "moderator"),
  })
  role!: string;

  // this defines many to one relationship like one user can have multiple post but that post can only
  // be made by one user
  @HasMany(() => Post)
  post!: Post[];
}

export default User;
