import { Button, Heading, Stack } from '@chakra-ui/react';

import { trpc } from '@/lib/trpc/client';

import {
  AdminLayoutPage,
  AdminLayoutPageContent,
} from '../admin/AdminLayoutPage';
import PageAdminEpisode from './PageAdminEpisode';

export default function PageAdminEpisodes() {
  const episodes = trpc.episodes.get.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <AdminLayoutPage>
      <AdminLayoutPageContent>
        <Heading>Episodes de Rick & Morty</Heading>
        <Stack spacing={15}>
          {episodes.isSuccess &&
            episodes.data?.pages
              .flatMap((pages) => pages.items)
              .map((episode) => (
                <PageAdminEpisode key={episode.id} episode={episode} />
              ))}
          <Button
            onClick={() => episodes.fetchNextPage()}
            size="lg"
            colorScheme="blackAlpha"
            isLoading={episodes.isFetchingNextPage}
            isDisabled={!episodes.hasNextPage}
          >
            Afficher plus
          </Button>
        </Stack>
      </AdminLayoutPageContent>
    </AdminLayoutPage>
  );
}
