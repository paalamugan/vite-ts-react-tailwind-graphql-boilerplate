import { Center } from '@/components/common/Layout/Center';
import { Heading } from '@/components/common/Layout/Heading';
import { Button } from '@/components/ui/button';
import { filmsQuery } from '@/graphql/queries';
import { useGraphQLQuery } from '@/hooks/useGraphQLQuery';
import { useAuth } from '@/providers/AuthProvider';

export const Home = () => {
  const { user, signOut } = useAuth();
  const { data, loading } = useGraphQLQuery(filmsQuery);
  return (
    <Center className="flex flex-col gap-3 pt-11">
      <h1>Home</h1>
      <div className="text-lg"> Successfully logged in as {user?.displayName}</div>
      <div className="flex flex-col gap-4">
        <Heading as="h2" className="text-center">
          Dummy Graphql Data
        </Heading>
        <div className="flex max-w-2xl justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="whitespace-pre">
              <code>{JSON.stringify(data, null, 2)}</code>
            </div>
          )}
        </div>
      </div>
      <Button variant="secondary" onClick={() => void signOut()}>
        Sign out
      </Button>
    </Center>
  );
};
export const Component = Home;
