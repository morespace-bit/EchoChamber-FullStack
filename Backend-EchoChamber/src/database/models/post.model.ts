import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import User from "./user.model";

@Table({
  tableName: "posts",
  modelName: "Post",
  timestamps: true,
})
class Post extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  imageUrl?: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User)
  author!: User;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  likes!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  reports!: number;
}

export default Post;
