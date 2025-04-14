import { Flex, HStack, Heading, Stack, VStack } from '@chakra-ui/react';

import {
  DataList,
  DataListCell,
  DataListEmptyState,
  DataListErrorState,
  DataListLoadingState,
  DataListRow,
  DataListText,
} from '@/components/DataList';
import { trpc } from '@/lib/trpc/client';

import {
  AdminLayoutPage,
  AdminLayoutPageContent,
} from '../admin/AdminLayoutPage';
import PageAdminCharacter from './PageAdminCharacter';

export default function PageAdminCharacters() {
  const characters = trpc.characters.get.useQuery();

  return (
    <AdminLayoutPage>
      <AdminLayoutPageContent>
        <Heading>Personnages de Rick & Morty</Heading>
        <Stack spacing={15}>
          {characters.isSuccess &&
            characters.data?.items.map((character) => (
              <PageAdminCharacter key={character.id} character={character} />
            ))}
        </Stack>
      </AdminLayoutPageContent>
    </AdminLayoutPage>
  );
}
