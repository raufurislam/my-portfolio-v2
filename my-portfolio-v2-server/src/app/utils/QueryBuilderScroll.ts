// utils/QueryBuilderScroll.ts
import { Query } from "mongoose";

export class QueryBuilderScroll<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /** Apply basic filters (excluding certain query params) */
  filter(
    excludeFields: string[] = [
      "lastId",
      "limit",
      "searchTerm",
      "sort",
      "fields",
    ]
  ) {
    const filter: Record<string, any> = { ...this.query };

    for (const field of excludeFields) {
      delete filter[field];
    }

    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  /** Search by multiple fields */
  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm?.trim();
    if (!searchTerm) return this;

    const searchQuery = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };

    this.modelQuery = this.modelQuery.find(searchQuery);
    return this;
  }

  /** Sort results */
  sort() {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  /** Select fields */
  fields() {
    const fields = this.query.fields?.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  /** Cursor-based pagination */
  paginate() {
    const limit = Number(this.query.limit) || 10;
    const lastId = this.query.lastId;

    if (lastId) {
      this.modelQuery = this.modelQuery.find({ _id: { $lt: lastId } });
    }

    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }

  /** Build query */
  build() {
    return this.modelQuery;
  }
}
