import Head from 'next/head';
import { GetServerSideProps } from 'next';
import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import {
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  Configure,
  DynamicWidgets,
} from 'react-instantsearch-hooks-web';
import { getServerState } from 'react-instantsearch-hooks-server';
import { Panel } from '../components/Panel';
import { HierarchicalMenu } from '../components/HierarchicalMenu';
import { Pills } from '../components/Pills';

import Menu from '../components/Menu';
import { useNextRouterHandler } from '../utils/useNextRouterHandler';
import { Breadcrumbs } from '../components/Breadcrumbs';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

type CategoryPageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
  category?: string;
};

function FallbackComponent({ attribute }: { attribute: string }) {
  return attribute.toLowerCase().includes('categor') ? null : (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

type RouteParams = {
  q?: string;
  brand?: string;
  category?: string;
};

export default function CategoryPage({
  serverState,
  url,
  category,
}: CategoryPageProps) {
  const { initialUiState, NextRouterHandler } = useNextRouterHandler<
    RouteParams
  >({
    dynamicRouteQuery: { category },
    url,
    // See https://www.algolia.com/doc/api-reference/widgets/ui-state/react-hooks/
    // for a more complete example structure of an UI State.
    routeToState(params) {
      return {
        instant_search: {
          query: params.q,
          refinementList: {
            brand: params.brand ? [...params.brand.split('---')] : [],
          },
          hierarchicalMenu: {
            'hierarchicalCategories.lvl0': params.category?.split('/'),
          },
        },
      };
    },
    stateToRoute(uiState) {
      const indexUiState = uiState.instant_search;
      return {
        q: indexUiState.query,
        brand: indexUiState.refinementList?.brand?.join('---'),
        category: indexUiState.hierarchicalMenu?.[
          'hierarchicalCategories.lvl0'
        ]?.join('/'),
      };
    },
  });

  return (
    <InstantSearchSSRProvider {...serverState}>
      <Head>
        <title>React InstantSearch Hooks - Next.js</title>
      </Head>

      <InstantSearch
        searchClient={client}
        indexName="instant_search"
        initialUiState={initialUiState}
        key={category}
      >
        <NextRouterHandler />
        <Menu />
        <div className="Container">
          <div>
            <Breadcrumbs />
            <HierarchicalMenu />
            <Pills />
            <div>
              <h3>Dynamic Widgets(widget)</h3>
              <DynamicWidgets fallbackComponent={FallbackComponent} />
            </div>
          </div>
          <div>
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
        </div>
        <Configure />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async function getServerSideProps({
  req,
  params,
}) {
  const protocol = req.headers.referer?.split('://')[0] || 'https';
  const url = `${protocol}://${req.headers.host}${req.url}`;
  const category = params.category as string;
  const serverState = await getServerState(
    <CategoryPage url={url} category={category} />
  );

  return {
    props: {
      serverState,
      url,
      category,
    },
  };
};
