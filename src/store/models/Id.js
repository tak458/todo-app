export default class Id {
  constructor(id) {
    this.separator = ".";
    this.ids = id.toString().split(this.separator);
  }

  length() {
    return this.ids.length;
  }

  head() {
    return this.ids[0];
  }

  foot() {
    return this.ids.slice(-1)[0];
  }

  toString() {
    return this.ids.join(this.separator);
  }

  parentId() {
    return new Id(this.ids.slice(0, -1).join(this.separator));
  }

  excludeRootId() {
    return new Id(this.ids.slice(1).join(this.separator));
  }

  concatId(childId) {
    return new Id(
      this.ids.push(childId.split(this.separator).join()).join(this.separator)
    );
  }
}
