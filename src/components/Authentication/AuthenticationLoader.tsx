import Loader from '../common/Loader/Loader';

export const AuthenticationLoader: React.FC = () => {
  return (
    <div className="h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <div className="flex min-h-[40px] gap-2 bg-white p-6">
          <Loader show={true} className="text-white" spin />
          <h1 className="text-xl font-semibold text-gray-700">Authentication in progress...</h1>
        </div>
      </div>
    </div>
  );
};
