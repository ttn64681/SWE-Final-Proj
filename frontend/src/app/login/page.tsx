import { redirect } from 'next/navigation';

export default function LoginRouteAlias() {
  redirect('/auth/login');
}


