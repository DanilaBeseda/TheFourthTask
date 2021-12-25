import React, { useCallback, useEffect } from 'react'
import ArticleEditForm from '../../containers/article-edit-form';
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import { useParams } from 'react-router-dom';
import useInit from '../../utils/use-init';
import Error from '../../components/error';

function ArticleEdit() {
  const store = useStore();

  const params = useParams();

  useInit(() => {
    Promise.allSettled([
      store.get('article').load(params.id),
      store.get('countries').load(),
      store.get('categories').load(),
    ])
  }, [params.id]);


  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting || state.countries.waiting || state.categories.waiting,
    countries: state.countries.data,
    categories: state.categories.data,
    error: state.article.error
  }));

  const callbacks = {
    pushToServer: useCallback(data => store.article.pushToServer(data), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>

      <Header />

      <Spinner active={select.waiting}>
        <ArticleEditForm article={select.article} maidIn={select.countries} category={select.categories} onSubmit={callbacks.pushToServer} />
        {select.error && <Error error={select.error} />}
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit)
