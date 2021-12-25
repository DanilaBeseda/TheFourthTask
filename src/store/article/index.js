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

  async pushToServer() {
    this.updateState({
      waiting: true
    })
    try {
      const response = await fetch(`/api/v1/articles/${this.getState().data._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.getState().data),
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await response.json()
      if (json.error) throw new Error(json.error.message);

      this.updateState({
        waiting: false
      })
    } catch (e) {
      this.updateState({
        data: {},
        waiting: false,
        error: e.message
      });
    }
  }

  setArticle(e, item = null) {
    if (item) {
      this.updateState({
        data: { ...this.getState().data, [e.target.name]: { ...item, title: item.title.replace(/-\s/gm, '') } }
      })
    } else {
      this.updateState({
        data: { ...this.getState().data, [e.target.name]: e.target.value }
      })
    }
  }
}

export default ArticleStore;
