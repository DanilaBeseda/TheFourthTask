import StoreModule from "../module";

class CategoriesStore extends StoreModule {
  initState() {
    return {
      waiting: false,
      categories: []
    };
  }

  async setCategories() {
    this.updateState({
      categories: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`);
      const { result } = await response.json();
      /* const tree = this.createTree(result.items)
      const categories = []

      runTree(categories, tree)

      function runTree(arr, data) {
        Object.values(data).forEach(item => {
          arr.push(item)

          if (item.children) {
            runTree(arr, item.children)
          }
        })
      } */

      this.updateState({
        categories: result.items,
        waiting: false
      });
    } catch (e) {
      this.updateState({
        categories: [],
        waiting: false
      });
    }

  }

  /* createTree(data) {
    const obj = {}
    const newObj = {}

    data.forEach(item => obj[item._id] = Object.assign({}, item))

    Object.values(obj).forEach(item => {
      if (item.parent === null) {
        newObj[item._id] = item
      } else {
        const t = obj[item.parent._id]
        t.children = t.children || {}
        t.children[item._id] = item
      }
    })

    return newObj
  } */
}

export default CategoriesStore
