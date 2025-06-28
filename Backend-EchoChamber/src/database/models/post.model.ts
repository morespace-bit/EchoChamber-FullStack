import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

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
}
