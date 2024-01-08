import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function handleError(error: AxiosError | string) {
  if (typeof error === 'string') toast.error(error);
  else if (typeof error?.message === 'string' && !error.isAxiosError) toast.error(error.message);
  else if (!error.isAxiosError) toast.error(' axios error');
  else if (error.response) {
    const data: any = error.response.data;
    if (Array.isArray(data?.data))
      toast.error(
        data?.data.map((m: { field: string; message: string }) => m.field + m.message).join(', '),
      );
    else if (typeof data?.message === 'string') toast.error(data?.message);
    else if (data?.data && 'message' in data.data) toast.error(data.data.message);
    else toast.error('A problem has occurred.');
  } else if (error.message) toast.error(error.message);
  else toast.error('A problem has occurred.'); // A problem has occurred.
}
