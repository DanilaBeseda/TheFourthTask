import StoreModule from "../module";

class EditionStore extends StoreModule {
  initState() {
    return {
      waiting: false,
      countries: []
    };
  }

  async load() {
    this.updateState({
      waiting: true,
      countries: []
    });

    try {
      const response = await fetch(`/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`)
      const { result } = await response.json()

      this.updateState({
        countries: result.items,
        waiting: false
      });
    }
    catch (e) {
      this.updateState({
        countries: [],
        waiting: false
      });
    }

  }
}

export default EditionStore
