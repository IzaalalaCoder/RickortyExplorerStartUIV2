import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import { trpc } from '@/lib/trpc/client';

import {
  AdminLayoutPage,
  AdminLayoutPageContent,
} from '../admin/AdminLayoutPage';
import PageAdminLocation from './PageAdminLocation';

export default function PageAdminLocations() {
  const locations = trpc.locations.get.useInfiniteQuery(
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
        <Heading>Lieux dans Rick & Morty</Heading>
        <Stack spacing={15}>
          {locations.isLoading && <Spinner />}
          {locations.isError && (
            <Alert status="error">
              <AlertIcon />
              Une erreur est survenue lors de la lecture des lieux.
            </Alert>
          )}
          {locations.isSuccess &&
            !locations.data.pages.flatMap((page) => page.items).length && (
              <Alert status="info">
                <AlertIcon />
                Absence de lieux.
              </Alert>
            )}
          {locations.isSuccess &&
            locations.data?.pages
              .flatMap((pages) => pages.items)
              .map((location) => (
                <PageAdminLocation key={location.id} location={location} />
              ))}
          <Button
            onClick={() => locations.fetchNextPage()}
            size="lg"
            colorScheme="blackAlpha"
            isLoading={locations.isFetchingNextPage}
            isDisabled={!locations.hasNextPage}
          >
            Afficher plus
          </Button>
        </Stack>
      </AdminLayoutPageContent>
    </AdminLayoutPage>
  );
}
