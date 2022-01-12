import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

function ReactQueryContainer(props: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const { children } = props

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // query options
        retry: 2,
        retryDelay: 500,
        staleTime: 10000,
        suspense: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        // mutation options
        retry: 1,
        retryDelay: 500,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  )
}

export default ReactQueryContainer
