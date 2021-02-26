// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
  { userId: 8, title: "title1" },
  { userId: 11, title: "other" },
  { userId: 15, title: null },
  { userId: 19, title: "title2" },
];

var find = function (origin) {
  // your code are here...
  const bridgePrototype = {
    where: (config) => find(where(origin, config)),
    orderBy: (propName, order) => find(orderBy(origin, propName, order)),
  };

  Object.setPrototypeOf(bridgePrototype, Object.getPrototypeOf(origin));
  Object.setPrototypeOf(origin, bridgePrototype);
  return origin;
};
// 查找 data 中，符合条件的数据，并进⾏排序
var result = find(data)
  .where({
    title: /\d$/,
  })
  .orderBy("userId", "desc");
console.log(result); // [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];

var result = find(data)
  .where({
    title: /t/,
    userId: id => id < 15
  })
  .orderBy("userId", "asc");
console.log(result); // [ { userId: 8, title: 'title1' }, { userId: 11, title: 'other' } ]

function where(iterable, filterConfigs) {
  return Array.from(iterable).filter((item) => {
    for (const key in filterConfigs) {
      const filter = filterConfigs[key];
      const data = getOrUndefined(item, key);

      const filterFunction =
        filter instanceof RegExp
          ? (v) => filter.test(v)
          : typeof filter === "function"
          ? filter
          : () => true;

      if (!filterFunction(data)) {
        return false;
      }
    }
    return true;
  });
}

function orderBy(iterable, propName, order = "asc") {
  const desc = order === "desc" ? true : false;
  return Array.from(iterable).sort((itemA, itemB) => {
    const a = getOrUndefined(itemA, propName);
    const b = getOrUndefined(itemB, propName);
    if (a === b || (Number.isNaN(a) && Number.isNaN(b))) {
      return 0;
    }
    return (a > b ? 1 : -1) * (desc ? -1 : 1);
  });
}

function getOrUndefined(data, propName) {
  return data instanceof Object ? data[propName] : undefined;
}
