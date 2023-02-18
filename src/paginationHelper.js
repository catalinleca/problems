class PaginationHelper {
  constructor(collection, itemsPerPage) {
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }

  itemCount() {
    return this.collection.length;
  }

  pageCount() {
    return Math.ceil(this.itemCount() / this.itemsPerPage);
  }

  // returns the number of items on the current page. page_index is zero based.
  // this method should return -1 for pageIndex values that are out of range
  pageItemCount(pageIndex) {
    const pageCount = this.pageCount();

    if (pageIndex < 0 || pageIndex + 1 > pageCount) {
      return -1;
    }

    if (pageIndex + 1 === pageCount) {
      const pageItemsMod = this.itemCount() % this.itemsPerPage;
      const lastPageItems = pageItemsMod || this.itemsPerPage;

      return lastPageItems;
    } else {
      return this.itemsPerPage;
    }
  }

  // 10 items, 4 per page -> 3 pages
  // determines what page an item is on. Zero based indexes
  // this method should return -1 for itemIndex values that are out of range
  pageIndex(itemIndex) {
    const itemCount = this.itemCount();

    if (itemIndex < 0 || itemIndex + 1 > itemCount) {
      return -1;
    }

    return Math.floor(itemIndex / this.itemsPerPage);
  }
}
