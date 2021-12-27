import StoreModule from "../module";

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      form: {},
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
      form: {},
      error: ''
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        form: json.result,
        waiting: false
      });

    } catch (e) {
      this.updateState({
        data: {},
        form: {},
        waiting: false
      });
    }
  }

  async pushToServer() {
    this.updateState({
      waiting: true,
      data: this.getState().form
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
        form: {},
        waiting: false,
        error: e.message
      });
    }
  }

  setArticle(e, item = null) {
    if (item) {
      this.updateState({
        form: { ...this.getState().form, [e.target.name]: { ...item, title: item.title.replace(/-\s/gm, '') } }
      })
    } else {
      this.updateState({
        form: { ...this.getState().form, [e.target.name]: e.target.value }
      })
    }
  }
}

export default ArticleStore;
