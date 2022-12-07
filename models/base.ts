import firebase from "firebase/compat/app";

export interface QueryOptions<T extends string = any> {
  limit?: number;
  where?: [T, firebase.firestore.WhereFilterOp, string | boolean][];
  orderBy?: [T, firebase.firestore.OrderByDirection];
  startAfter?: firebase.firestore.Timestamp;
}

export function applyOptions<T extends QueryOptions>(
  query: firebase.firestore.Query,
  options: T
) {
  if (!options) {
    return query;
  }

  if (options.where.length > 0) {
    for (const whereOpt of options.where) {
      query.where(whereOpt[0], whereOpt[1], whereOpt[2]);
    }
  }

  if (options.limit) {
    query.limit(options.limit);
  }

  if (options.startAfter) {
    query.startAfter(options.startAfter);
  }

  if (options.orderBy.length > 0) {
    query.orderBy(options.orderBy[0], options.orderBy[1]);
  }

  return query;
}
