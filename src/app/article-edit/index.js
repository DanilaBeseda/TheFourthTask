import React, { useCallback, useEffect } from 'react'
import ArticleEditForm from '../../components/article-edit-form';
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import { useParams } from 'react-router-dom';
import useInit from '../../utils/use-init';

function ArticleEdit() {
  const store = useStore();

  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.id);
    await store.countries.setCountries()
    await store.categories.setCategories();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: [state.article.waiting, state.countries.waiting, state.categories.waiting],
    countries: state.countries.countries,
    categories: state.categories.categories
  }));

  const callbacks = {
    pushToServer: useCallback(data => store.article.pushToServer(data), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>

      <Header />

      <Spinner arrOfWaiting={select.waiting}>
        <ArticleEditForm article={select.article} countries={select.countries} categories={select.categories} pushToServer={callbacks.pushToServer} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit)
