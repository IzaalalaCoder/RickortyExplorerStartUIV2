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
import PageAdminCharacter from './PageAdminCharacter';

export default function PageAdminCharacters() {
  const characters = trpc.characters.get.useInfiniteQuery(
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
        <Heading>Personnages de Rick & Morty</Heading>
        <Stack spacing={15}>
          {characters.isLoading && <Spinner />}
          {characters.isError && (
            <Alert status="error">
              <AlertIcon />
              Une erreur est survenue lors de la lecture des personnages.
            </Alert>
          )}
          {characters.isSuccess &&
            !characters.data.pages.flatMap((page) => page.items).length && (
              <Alert status="info">
                <AlertIcon />
                Absence de personnages.
              </Alert>
            )}
          {characters.isSuccess &&
            characters.data?.pages
              .flatMap((pages) => pages.items)
              .map((character) => (
                <PageAdminCharacter key={character.id} character={character} />
              ))}
          <Button
            onClick={() => characters.fetchNextPage()}
            size="lg"
            colorScheme="blackAlpha"
            isLoading={characters.isFetchingNextPage}
            isDisabled={!characters.hasNextPage}
          >
            Afficher plus
          </Button>
        </Stack>
      </AdminLayoutPageContent>
    </AdminLayoutPage>
  );
}
