import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';

export const ErrorComponent = ({ error }: { error: Error }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex min-h-[40px] flex-col gap-2 bg-white p-6">
        <h2 className="flex text-lg font-semibold text-red-500">
          <b>Error Message: </b> &nbsp; <div>{error.message}</div>
        </h2>
      </div>
      <div>
        <Button id="refresh" variant="outline" className="text-gray-800" onClick={() => navigate(location.pathname)}>
          Refresh
        </Button>
      </div>
    </div>
  );
};
