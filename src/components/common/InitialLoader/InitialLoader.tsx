import Loader from '../Loader/Loader';

export const InitialLoader: React.FC = () => {
  return (
    <div className="h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <div className="flex min-h-[40px] bg-white p-6">
          <Loader show={true} className="px-1 text-white" spin />
        </div>
      </div>
    </div>
  );
};
