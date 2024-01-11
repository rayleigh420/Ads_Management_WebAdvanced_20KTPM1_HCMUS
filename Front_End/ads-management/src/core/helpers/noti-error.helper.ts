import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function handleError(error: AxiosError | string) {
  if (typeof error === 'string') toast.error(error);
  else if (typeof error?.message === 'string' && !error.isAxiosError) toast.error(error.message);
  else if (!error.isAxiosError) toast.error(' axios error');
  else if (error.response) {
    const data: any = error.response.data;
    console.log('data', data?.message);
    if (typeof data?.message == 'string') {
      const message = JSON.parse(data?.message);
      console.log('data', message);
      if (Array.isArray(message?.errors)) {
        toast.error(
          message?.errors
            .map((m: { field: string; message: string }) => m.field + m.message)
            .join(', '),
        );
      } else {
        console.log('data', message?.errors);
        var keys = Object.keys(message?.errors);
        let x = '';
        for (let i in keys) {
          console.log('data', message?.errors[keys[i]]);
          x += message?.errors[keys[i]]['msg'] + ', ';
        }
        toast.error(x);
      }
    } else if (typeof data?.error == 'string') {
      const message = JSON.parse(data?.message);
      console.log('data', message);
      if (typeof message?.message == 'string') toast.error(message?.errors);
      else if (Array.isArray(message?.error))
        toast.error(message?.message.map((m: string) => m).join(', '));
    } else if (data?.data && 'message' in data.data) toast.error(data.data.message);
    else toast.error('A problem has occurred.');
  } else if (error.message) toast.error(error.message);
  else toast.error('A problem has occurred.'); // A problem has occurred.
}
