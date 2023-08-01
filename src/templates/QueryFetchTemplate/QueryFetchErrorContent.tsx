const GlobalFetchErrorContent: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div className="flex flex-col">
      <div className="text-red-500">{error.message}</div>
    </div>
  );
};

interface ErrorContentProps {
  error: Error | null;
  render?: (error: Error) => React.ReactNode;
}

export const QueryFetchErrorContent: React.FC<ErrorContentProps> = ({ error, render }) => {
  if (!error) return null;

  if (render) {
    return <>{render(error)}</>;
  }

  return <GlobalFetchErrorContent error={error} />;
};
