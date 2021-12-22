import StoreModule from "../module";

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      waiting: true,
      error: ''
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {

    this.updateState({
      waiting: true,
      data: {},
      error: ''
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        waiting: false
      });

    } catch (e) {
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

  async pushToServer(data) {
    this.updateState({
      waiting: true
    })

    try {
      const response = await fetch(`/api/v1/articles/${data._id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await response.json()
      if (json.error) throw new Error(json.error.message);

      this.load(data._id)
    } catch (e) {
      this.updateState({
        data: {},
        waiting: false,
        error: e.message
      });
    }
  }
}

export default ArticleStore;
